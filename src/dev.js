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

import { Compilers } from "./compilers/compilers";
import type { CompilersConfig } from "./compilers/compilers";
import type { NetworkConfig } from "./networks/networks";
import { Network } from "./networks/networks";
import type { ContainerDef, DContainerInfo, DImageInfo } from "./utils/docker";
import { ContainerStatus, DevDocker } from "./utils/docker";
import { texts } from "./utils/texts";
import { breakWords, inputLine, tonlabsHomePath, version } from "./utils/utils";

const fs = require('fs');
const path = require('path');

type DevConfig = {
    compilers: CompilersConfig,
    networks: NetworkConfig[],
};

export type CompilersWithNetworks = {
    compilers: boolean,
    networks: Network[],
}

class Dev {
    static defaultConfig: DevConfig = Object.freeze({
        compilers: Compilers.defaultConfig,
        networks: [Network.defaultConfig],
    });
    name: string;
    version: string;
    docker: DevDocker;
    networks: Network[];
    compilers: Compilers;
    agreementRequired: boolean;
    configFilePath: string;

    constructor() {
        this.name = 'tondev';
        this.version = version;
        this.agreementRequired = true;
        this.docker = new DevDocker();
        this.docker.onStartupImages = this.onStartupImages;
        this.docker.onBeforePull = this.onBeforePull;
        this.compilers = new Compilers(Compilers.defaultConfig);
        this.networks = [new Network(Network.defaultConfig)];
        this.configFilePath = tonlabsHomePath('config.json');
        fs.mkdirSync(tonlabsHomePath(), ({ recursive: true }: any));
        this.loadConfig();
    }

    loadConfig() {
        try {
            const config: DevConfig = JSON.parse(fs.readFileSync(this.configFilePath, { encoding: 'utf8' }));
            this.compilers.setConfig(config.compilers);
            this.networks = config.networks.map(x => new Network(x));
        } catch {
        }

    }

    saveConfig() {
        const config: DevConfig = {
            compilers: this.compilers.getConfig(),
            networks: this.networks.map(x => x.getConfig()),
        };
        fs.mkdirSync(tonlabsHomePath(''), ({ recursive: true }: any));
        fs.writeFileSync(this.configFilePath, JSON.stringify(config), { encoding: 'utf8' });
    }

    onStartupImages = (images: DImageInfo[]) => {
        this.agreementRequired = !images.find(Dev.isDevImage);
    };

    onBeforePull = async (_repoTag: string): Promise<void> => {
        if (!this.agreementRequired) {
            return;
        }
        const license = fs
            .readFileSync(path.join(__dirname, '..', 'LICENSE'))
            .toString()
            .split('\n')
            .map(breakWords).join('\n');
        console.log(license);
        process.stdout.write(texts.agreementConfirmation);
        const answer = (await inputLine()).trim().toLowerCase();
        if (answer !== 'yes') {
            console.log(texts.agreementRejected);
            process.exit(0);
        }
        console.log(texts.agreementAccepted);
        this.agreementRequired = false;
    };

    networksFromNames(names: string[]): Network[] {
        return names.map((name) => {
            const network = this.networks.find(x => x.name.toLowerCase() === name.toLowerCase());
            if (!network) {
                throw new Error(`Network not found: ${name}`)
            }
            return network;
        });
    }

    networksOrAll(names: string[]): Network[] {
        return names.length > 0 ? this.networksFromNames(names) : this.networks;
    }

    getDefs(source: CompilersWithNetworks): ContainerDef[] {
        return source.compilers ? source.networks.concat(this.compilers) : [...source.networks];
    }

    async start(source: CompilersWithNetworks) {
        await this.docker.startupContainers(this.getDefs(source), ContainerStatus.running);
    }

    async stop(source: CompilersWithNetworks) {
        await this.docker.shutdownContainers(this.getDefs(source), ContainerStatus.created);
    }

    async restart(source: CompilersWithNetworks) {
        const defs = this.getDefs(source);
        await this.docker.shutdownContainers(defs, ContainerStatus.created);
        await this.docker.startupContainers(defs, ContainerStatus.running);
    }

    async recreate(source: CompilersWithNetworks) {
        const defs = this.getDefs(source);
        await this.docker.shutdownContainers(defs, ContainerStatus.missing);
        await this.docker.startupContainers(defs, ContainerStatus.created);
    }


    async clean(source: CompilersWithNetworks) {
        const defs = this.getDefs(source);
        await this.docker.shutdownContainers(defs, ContainerStatus.missing);
    }

    async useVersion(version: string, source: CompilersWithNetworks) {
        const defs = this.getDefs(source);
        await this.docker.shutdownContainers(defs, ContainerStatus.missing);
        if (source.compilers) {
            this.compilers.setConfig({
                ...this.compilers.getConfig(),
                version
            });
        }
        source.networks.forEach((network) => {
            const config = network.getConfig();
            config.version = version;
            network.setConfig(config);
        });
        this.saveConfig();
        await this.docker.startupContainers(defs, ContainerStatus.running);
    }

    ensureNetwork(name: string): Network {
        const existing = this.networks.find(x => x.name.toLowerCase() === name.toLowerCase());
        if (existing) {
            return existing;
        }
        const network = new Network({
            ...Network.defaultConfig,
            name
        });
        this.networks.push(network);
        return network;
    }

    checkUniqueName(name: string) {
        if (this.networks.find(x => x.name.toLowerCase() === name.toLowerCase())) {
            throw new Error(`Network with name [${name}] already exists`);
        }
    }

    addNetworks(names: string[]) {
        names.forEach((name) => {
            this.checkUniqueName(name);
            const network = new Network({
                ...Network.defaultConfig,
                name
            });
            this.networks.push(network);
        });
        this.saveConfig();
    }


    async removeNetworks(networks: Network[]) {
        await this.docker.shutdownContainers(networks, ContainerStatus.missing);
        networks.forEach((network) => {
            const index = this.networks.findIndex(x => x === network);
            if (index >= 0) {
                this.networks.splice(index, 1);
            }
        });
        this.saveConfig();
    }


    async updateNetworkConfigs(networks: Network[], update: (config: NetworkConfig) => void) {
        const defs = [...networks];
        await this.docker.shutdownContainers(defs, ContainerStatus.missing);
        networks.forEach((network) => {
            const config = network.getConfig();
            const saveName = config.name;
            update(config);
            if (config.name.toLowerCase() !== saveName.toLowerCase()) {
                this.checkUniqueName(config.name);
            }
            network.setConfig(config)
        });
        this.saveConfig();
        await this.docker.startupContainers(defs, ContainerStatus.running);
    }

    static isDevContainer(info: DContainerInfo): boolean {
        return DevDocker.containerBelongsToImage(info, Compilers.imagePrefix)
            || DevDocker.containerBelongsToImage(info, Network.imagePrefix);
    }

    static isDevImage(info: DImageInfo): boolean {
        return DevDocker.imageHasRepoTag(info, Compilers.imagePrefix)
            || DevDocker.imageHasRepoTag(info, Network.imagePrefix);
    }
}

export { Dev };
