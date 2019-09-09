/*
 * Copyright 2018-2019 TON DEV SOLUTIONS LTD.
 *
 * Licensed under the SOFTWARE EVALUATION License (the "License"); you may not use
 * this file except in compliance with the License.  You may obtain a copy of the
 * License at:
 *
 * http://www.ton.dev/licenses
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific TON DEV software governing permissions and
 * limitations under the License.
 */
// @flow
import type {
    DContainer,
    DCreateContainerOptions,
    DContainerInfo,
} from "./docker";

import docker from "./docker";
import config from './config';

const fs = require('fs');

async function checkRequiredSoftware() {
    const version = await docker.numericVersion();
    if (version < 17_000_000) {
        throw "Docker version required ^17";
    }
}

async function create(options: DCreateContainerOptions): Promise<void> {
    process.stdout.write(`Container [${options.name || ''}] does not exists. Creating...`);
    await docker.createContainer(options);
    console.log(' Done.');
}

async function createCompilersContainer(): Promise<void> {
    if (!fs.existsSync(config.compilers.mountSource)) {
        fs.mkdirSync(config.compilers.mountSource, ({ recursive: true }: any));
    }
    return create({
        name: config.compilers.container,
        interactive: true,
        Image: config.compilers.image,
        Tty: true,
        User: 'root',
        Entrypoint: ['/bin/bash'],
        HostConfig: {
            Mounts: [{
                Type: 'bind',
                Source: config.compilers.mountSource,
                Target: config.compilers.mountDestination,
            }]
        }
    });
}

async function createLocalNodeContainer(): Promise<void> {
    return create({
        name: config.localNode.container,
        interactive: true,
        Image: config.localNode.image,
        HostConfig: {
            PortBindings: {
                '80/tcp': [
                    { HostIp: '', HostPort: '80' }
                ]
            }
        }
    });
}

async function ensureStartedContainer(
    container: string,
    image: string,
    create: () => Promise<void>
): Promise<DContainerInfo> {
    let containerInfo = docker.findContainerInfo(await docker.listAllContainers(), container);
    if (!containerInfo) {
        if (!docker.findImageInfo(await docker.listAllImages(), image)) {
            process.stdout.write(`Image [${image}] is missing. Pulling (please wait)...`);
            await docker.pullImage(image);
            console.log(' Done.');
        }
        await create();
        containerInfo = docker.findContainerInfo(await docker.listAllContainers(), container);
        if (!containerInfo) {
            throw `Container [${container}] can not be created`;
        }
    }
    if (!docker.isRunning(containerInfo)) {
        const container = docker.getContainer(containerInfo.Id);
        await container.start();
    }
    return containerInfo;
}

async function ensureStartedLocalNode(): Promise<DContainerInfo> {
    return ensureStartedContainer(
        config.localNode.container,
        config.localNode.image,
        createLocalNodeContainer
    );
}

async function ensureStartedCompilers(): Promise<DContainerInfo> {
    return ensureStartedContainer(
        config.compilers.container,
        config.compilers.image,
        createCompilersContainer
    );
}

async function setup() {
    await checkRequiredSoftware();
    await ensureStartedLocalNode();
    await ensureStartedCompilers();
}

export { setup, ensureStartedLocalNode, ensureStartedCompilers };
