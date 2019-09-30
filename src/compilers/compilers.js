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
const fs = require('fs');
import type { DockerContainer } from "../utils/docker";
import { DevDocker } from "../utils/docker";
import { tonlabsHomePath, userIdentifier } from "../utils/utils";

export type CompilersConfig = {
    version: string
}


export class Compilers {
    static imagePrefix = 'tonlabs/compilers';
    static containerPrefix = 'tonlabs-compilers';
    static defaultConfig: CompilersConfig = Object.freeze({
        version: 'latest'
    });

    version: string;
    requiredImage: string;
    containerName: string;
    mountSource: string;
    mountDestination: string;

    constructor(config: CompilersConfig) {
        this.setConfig(config);
    }



    setConfig(config: CompilersConfig) {
        this.version = config.version;
        this.requiredImage = `${Compilers.imagePrefix}:${config.version}`;
        this.containerName = `${Compilers.containerPrefix}-${userIdentifier}`;
        this.mountSource = tonlabsHomePath('compilers', 'projects');
        this.mountDestination = '/projects';
    }

    getConfig(): CompilersConfig {
        return {
            version: this.version
        }
    }

    async createContainer(docker: DevDocker): Promise<DockerContainer> {
        if (!fs.existsSync(this.mountSource)) {
            fs.mkdirSync(this.mountSource, ({ recursive: true }: any));
        }
        return docker.client.createContainer({
            name: this.containerName,
            interactive: true,
            Image: this.requiredImage,
            Tty: true,
            Env: ['USER_AGREEMENT=yes'],
            HostConfig: {
                Mounts: [
                    {
                        Type: 'bind',
                        Source: this.mountSource,
                        Target: this.mountDestination,
                    },
                ],
            },
        });
    }
}
