/*
 * Copyright 2018-2019 TON DEV SOLUTIONS LTD.
 *
 * Licensed under the SOFTWARE EVALUATION License (the "License"); you may not use
 * this file except in compliance with the License.  You may obtain a copy of the
 * License at: https://www.ton.dev/licenses
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific TON DEV software governing permissions and
 * limitations under the License.
 *
 */
// @flow
import Docker from 'dockerode';

import { progress, progressDone, versionToNumber } from "./utils";

export type DImageInfo = {
    Id: string,
    RepoTags: string[],
}

export type DContainerInfo = {
    Id: string,
    Names: string[],
    Image: string,
    ImageID: string,
    State: string,
}

export type DContainerExecOptions = {
    AttachStdin?: boolean,
    AttachStdout?: boolean,
    AttachStderr?: boolean,
    DetachKeys?: string,
    Tty?: boolean,
    Env?: string,
    Cmd?: string[],
    Privileged?: boolean,
    User?: string,
    WorkingDir?: string,
}

export type DockerModem = {
    followProgress(
        stream: any,
        onFinished: (err: any, output: any) => void,
        onProgress: (event: any) => void
    ): void,

    demuxStream(
        stream: any,
        stdout: any,
        stderr: any
    ): void,
}

export type DockerContainer = {
    id: string,
    modem: DockerModem,
    start(): Promise<void>,
    exec(options: DContainerExecOptions, callback: any): void,
    stop(): Promise<void>,
    remove(): Promise<void>,
}

export type DockerImage = {
    remove(): Promise<void>,
}

export type DMount = {
    Target: string,
    Source: string,
    Type: 'bind' | 'volume' | 'tmpfs',
}

export type DPortBindings = {
    [string]: { HostIp: string, HostPort: string }[]
};

export type DCreateContainerOptions = {
    name?: string,
    Image: string,
    Interactive?: boolean,
    Tty?: boolean,
    User?: string,
    Entrypoint?: string[],
    Env: string[],
    HostConfig?: {
        Mounts?: DMount[],
    },
    ExposedPorts?: {
        [string]: {},
    },
    HostConfig?: {
        PortBindings?: DPortBindings,
    }
}

export type DVersion = {
    Version: string,
}

export type DockerClient = {
    version(): Promise<DVersion>,

    listContainers(options?: { all?: true }): Promise<DContainerInfo[]>,

    listImages(options?: { all?: true }): Promise<DImageInfo[]>,

    getContainer(id: string): DockerContainer,

    getImage(name: string): DockerImage,

    createContainer(options: DCreateContainerOptions): Promise<DockerContainer>,

    pull(repoTag: string, auth: any, (err: any, stream: any) => void): void,

    modem: DockerModem,
}

export const ContainerStatus = {
    missing: 0,
    created: 1,
    running: 2,
};

export type ContainerStatusType = 0 | 1 | 2;

export interface ContainerDef {
    requiredImage: string,
    containerName: string,
    createContainer(docker: DevDocker): Promise<DockerContainer>
}


class DevDocker {
    client: DockerClient;
    _images: ?(DImageInfo[]);
    _containers: ?(DContainerInfo[]);
    _onStartupImagesPassed: boolean;
    onStartupImages: ?((images: DImageInfo[]) => void);
    onBeforePull: ?((repoTag: string) => Promise<void>);

    constructor() {
        this.client = new Docker();
        this.onStartupImages = null;
        this.onBeforePull = null;
        this._onStartupImagesPassed = false;
        this._images = null;
        this._containers = null;
    }

    dropCache() {
        this._images = null;
        this._containers = null;
    }

    async getImages(): Promise<DImageInfo[]> {
        if (!this._images) {
            const images = await this.client.listImages({ all: true });
            this._images = images;
            if (!this._onStartupImagesPassed) {
                this._onStartupImagesPassed = true;
                if (this.onStartupImages) {
                    this.onStartupImages(images);
                }
            }
            this._images = images;
        }
        return this._images || [];
    }

    async getContainers(): Promise<DContainerInfo[]> {
        if (!this._containers) {
            this._containers = await this.client.listContainers({ all: true });
        }
        return this._containers || [];
    }

    async numericVersion(): Promise<number> {
        const version: DVersion = await this.client.version();
        return versionToNumber(version.Version);
    }

    async pull(repoTag: string): Promise<DockerImage> {
        if (this.onBeforePull) {
            await this.onBeforePull(repoTag);
        }
        const client = this.client;
        return new Promise((resolve, reject) => {
            client.pull(repoTag, {}, function (err, stream) {
                if (!stream) {
                    reject(err);
                    return;
                }
                let lastReportTime = Date.now();
                client.modem.followProgress(stream, onFinished, onProgress);

                function onFinished(err, output) {
                    resolve(output);
                }

                function onProgress(_event) {
                    const isTimeToReport = Date.now() > lastReportTime + 1000;
                    if (isTimeToReport) {
                        lastReportTime = Date.now();
                        process.stdout.write('.');
                    }
                }
            });

        })
    }

    async findImageInfo(name: string): Promise<?DImageInfo> {
        return (await this.getImages()).find(x => DevDocker.imageHasRepoTag(x, name)) || null;
    }

    async findContainerInfo(name: string): Promise<?DContainerInfo> {
        return (await this.getContainers()).find(x => DevDocker.hasName(x, name)) || null;
    }

    async shutdownContainer(def: ContainerDef, downTo: ContainerStatusType) {
        const info = await this.findContainerInfo(def.containerName);
        if (!info) {
            return;
        }
        if (DevDocker.isRunning(info) && downTo < ContainerStatus.running) {
            progress(`Stopping ${def.containerName}`);
            await this.client.getContainer(info.Id).stop();
            progressDone();
            this.dropCache();
        }
        if (downTo < ContainerStatus.created) {
            progress(`Removing ${def.containerName}`);
            await this.client.getContainer(info.Id).remove();
            progressDone();
            this.dropCache();
        }
    }

    async ensureImage(def: ContainerDef) {
        if (!(await this.findImageInfo(def.requiredImage))) {
            progress(`Pulling ${def.containerName}`);
            await this.pull(def.requiredImage);
            progressDone();
            this.dropCache();
        }
    }

    async startupContainer(def: ContainerDef, upTo: ContainerStatusType) {
        await this.ensureImage(def);
        let info: ?DContainerInfo = await this.findContainerInfo(def.containerName);
        if (!info && upTo >= ContainerStatus.created) {
            progress(`Creating ${def.containerName}`);
            await def.createContainer(this);
            progressDone();
            this.dropCache();
            info = await this.findContainerInfo(def.containerName);
        }
        if (info && !DevDocker.isRunning(info) && upTo >= ContainerStatus.running) {
            progress(`Starting ${def.containerName}`);
            await this.client.getContainer(info.Id).start();
            progressDone();
            this.dropCache();
        }
    }

    async shutdownContainers(defs: ContainerDef[], downTo: ContainerStatusType) {
        for (let i = 0; i < defs.length; i += 1) {
            await this.shutdownContainer(defs[i], downTo);
        }
    }

    async startupContainers(defs: ContainerDef[], upTo: ContainerStatusType) {
        for (let i = 0; i < defs.length; i += 1) {
            await this.startupContainer(defs[i], upTo);
        }
    }

    async ensureRunning(def: ContainerDef): Promise<DockerContainer> {
        await this.startupContainer(def, ContainerStatus.running);
        const info = await this.findContainerInfo(def.containerName);
        return this.client.getContainer((info && info.Id) || def.containerName);
    }

    static hasName(container: DContainerInfo, name: string): boolean {
        const nameToFind = `/${name}`.toLowerCase();
        return !!(container.Names || []).find(n => n.toLowerCase() === nameToFind);
    }

    static imageMatched(image: string, tag: string): boolean {
        image = image.toLowerCase();
        tag = tag.toLowerCase();
        const tagParts = tag.split(':');
        if (tagParts.length > 1) {
            return image === tag;
        }
        const imageParts = image.split(':');
        return imageParts[0] === tagParts[0];
    }

    static imageHasRepoTag(info: DImageInfo, tag: string): boolean {
        return !!(info.RepoTags || []).find(n => this.imageMatched(n, tag));
    }

    static isRunning(info: ?DContainerInfo): boolean {
        return !!info && info.State.toLowerCase() === 'running';
    }

    static containerBelongsToImage(info: DContainerInfo, image: string): boolean {
        return this.imageMatched(info.Image, image);
    }
}


export {
    DevDocker
}
