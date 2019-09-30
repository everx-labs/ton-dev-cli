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

import type { DockerContainer, DPortBindings } from "../utils/docker";
import { DevDocker } from "../utils/docker";
import { userIdentifier } from "../utils/utils";

export type NetworkConfig = {
    name: string,
    version: string,
    hostPort: string,
    arangoHostPort: ?string,
};

export type SetNetworkOptions = {
    port?: string,
    arangoPort?: string,
}

class Network {
    static imagePrefix = 'tonlabs/local-node';
    static containerPrefix = 'tonlabs-local-node';
    static defaultName = 'default';
    static defaultConfig: NetworkConfig = Object.freeze({
        name: 'default',
        version: 'latest',
        hostPort: '80',
        arangoHostPort: null,
    });
    static defaultArangoPort: '8529';

    name: string;
    version: string;
    hostPort: string;
    arangoHostPort: ?string;
    requiredImage: string;
    containerName: string;

    constructor(config: NetworkConfig) {
        this.setConfig(config);
    }

    setConfig(config: NetworkConfig) {
        this.name = config.name;
        this.version = config.version;
        this.hostPort = config.hostPort;
        this.arangoHostPort = config.arangoHostPort;
        this.requiredImage = `${Network.imagePrefix}:${config.version}`;
        const suffix = config.name !== Network.defaultName ? `-${config.name}` : '';
        this.containerName = `${Network.containerPrefix}-${userIdentifier}${suffix}`;
    }

    getConfig(): NetworkConfig {
        return {
            name: this.name,
            version: this.version,
            hostPort: this.hostPort,
            arangoHostPort: this.arangoHostPort
        }
    }

    async createContainer(docker: DevDocker): Promise<DockerContainer> {
        const ports: DPortBindings = {
            '80/tcp': [
                {
                    HostIp: '',
                    HostPort: `${this.hostPort}`,
                },
            ],
        };
        if (this.arangoHostPort && this.arangoHostPort !== '') {
            ports['8529/tcp'] = [
                {
                    HostIp: '',
                    HostPort: this.arangoHostPort,
                },
            ]
        }
        return docker.client.createContainer({
            name: this.containerName,
            interactive: true,
            Image: this.requiredImage,
            Env: ['USER_AGREEMENT=yes'],
            HostConfig: {
                PortBindings: ports,
            },
        });
    }

    setOptions(options: SetNetworkOptions) {
        const config = this.getConfig();
        if (options.port) {
            config.hostPort = port;
        }
        if (options.arangoPort) {
            if (options.arangoPort === 'bind') {
                config.arangoHostPort = Network.defaultArangoPort;
            } else if (options.arangoPort === 'unbind') {
                config.arangoHostPort = null;
            } else {
                config.arangoHostPort = options.arangoPort;
            }
        }
        this.setConfig(config);
    }
}


export {
    Network
}
