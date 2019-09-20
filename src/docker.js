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
import { config, defaultValues } from "./config";
import Docker from 'dockerode';

import { versionToNumber } from "./utils";

const docker = new Docker();

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

export type DContainer = {
    modem: any,
    start(): Promise<void>,
    exec(options: DContainerExecOptions, callback: any): void,
    stop(): Promise<void>,
    remove(): Promise<void>,
}

export type DImage = {
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

async function numericVersion() {
    const version: DVersion = await docker.version();
    return versionToNumber(version.Version);
}

async function listAllContainers(): Promise<DContainerInfo[]> {
    return docker.listContainers({ all: true });
}

async function listAllImages(): Promise<DImageInfo[]> {
    return docker.listImages({ all: true });
}

function getContainer(id: string): DContainer {
    return docker.getContainer(id);
}

function getImage(name: string): DImage {
    return docker.getImage(name);
}

async function createContainer(options: DCreateContainerOptions): Promise<DContainer> {
    return docker.createContainer(options);
}

async function pullImage(repoTag: string): Promise<DImage> {
    return new Promise((resolve, reject) => {
        docker.pull(repoTag, config.auth, function (err, stream) {
            if (!stream) {
                reject(err);
                return;
            }
            let lastReportTime = Date.now();
            docker.modem.followProgress(stream, onFinished, onProgress);

            function onFinished(err, output) {
                resolve(output);
            }

            function onProgress(event) {
                const isTimeToReport = Date.now() > lastReportTime + 1000;
                if (isTimeToReport) {
                    lastReportTime = Date.now();
                    process.stdout.write('.');
                }
            }
        });

    })
}

function hasName(container: DContainerInfo, name: string): boolean {
    const nameToFind = `/${name}`.toLowerCase();
    return !!(container.Names || []).find(n => n.toLowerCase() === nameToFind);
}

function imageMatched(image: string, tag: string): boolean {
    image = image.toLowerCase();
    tag = tag.toLowerCase();
    const tagParts = tag.split(':');
    if (tagParts.length > 1) {
        return image === tag;
    }
    const imageParts = image.split(':');
    return imageParts[0] === tagParts[0];
}

function imageHasRepoTag(info: DImageInfo, tag: string): boolean {
    return !!(info.RepoTags || []).find(n => imageMatched(n, tag));
}

function findContainerInfo(containers: DContainerInfo[], name: string): ?DContainerInfo {
    return containers.find(x => hasName(x, name));
}

function findImageInfo(images: DImageInfo[], name: string): ?DImageInfo {
    return images.find(x => imageHasRepoTag(x, name));
}

function isRunning(info: ?DContainerInfo): boolean {
    return !!info && info.State.toLowerCase() === 'running';
}

function containerBelongsToImage(info: DContainerInfo, image: string): boolean {
    return imageMatched(info.Image, image);
}

function isTonDevContainer(info: DContainerInfo): boolean {
    return containerBelongsToImage(info, defaultValues.net.image)
        || containerBelongsToImage(info, defaultValues.compilers.image);
}

function isTonDevImage(info: DImageInfo): boolean {
    return imageHasRepoTag(info, defaultValues.net.image)
        || imageHasRepoTag(info, defaultValues.compilers.image);
}

async function listTonDevContainers(): Promise<DContainerInfo[]> {
    return (await listAllContainers()).filter(isTonDevContainer);
}

async function listTonDevImages(): Promise<DImageInfo[]> {
    return (await listAllImages()).filter(isTonDevImage);
}

export default {
    numericVersion,
    createContainer,
    getContainer,
    isRunning,
    listAllContainers,
    listAllImages,
    getImage,
    pullImage,
    findContainerInfo,
    findImageInfo,
    listTonDevImages,
    listTonDevContainers,
}
