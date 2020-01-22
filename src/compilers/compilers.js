/*
 * Copyright 2018-2020 TON DEV SOLUTIONS LTD.
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
import type { ContainerDef, DockerContainer } from "../utils/docker";
import { DevDocker } from "../utils/docker";
import { userIdentifier } from "../utils/utils";

export type CompilersConfig = {
    version: string,
}


export class Compilers implements ContainerDef {
    static imagePrefix = 'tonlabs/compilers';
    static containerPrefix = 'tonlabs-compilers';
    static defaultConfig: CompilersConfig = Object.freeze({
        version: 'latest'
    });

    version: string;
    requiredImage: string;
    containerName: string;
    mountDestination: string;

    constructor(config: CompilersConfig) {
        this.setConfig(config);
    }

    setConfig(config: CompilersConfig) {
        this.version = config.version;
        this.requiredImage = `${Compilers.imagePrefix}:${config.version}`;
        this.containerName = `${Compilers.containerPrefix}-${userIdentifier}`;
        this.mountDestination = '/projects';
    }

    getConfig(): CompilersConfig {
        return {
            version: this.version,
        }
    }

    async createContainer(docker: DevDocker): Promise<DockerContainer> {
        throw new Error('Internal error: invalid call to Compilers.createContainer');
    }

    async createContainerMountedTo(hostPath: string, docker: DevDocker): Promise<DockerContainer> {
        await docker.ensureImage(this.requiredImage);
        const existing = await docker.getContainerInfos();
        let name = '';
        let index = 0;
        do {
            name = `${this.containerName}${index > 0 ? `-${index}` : ''}`;
            index += 1;
        } while (existing.find(x => DevDocker.hasName(x, name)));
        docker.dropCache();
        return docker.client.createContainer({
            name,
            interactive: true,
            Image: this.requiredImage,
            Tty: true,
            Env: ['USER_AGREEMENT=yes'],
            HostConfig: {
                Mounts: [
                    {
                        Type: 'bind',
                        Source: hostPath,
                        Target: this.mountDestination,
                    },
                ],
            },
        });
    }
}
