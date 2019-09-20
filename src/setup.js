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

import type { CompilersConfig, NetConfig } from "./config";
import type {
    DCreateContainerOptions,
    DContainerInfo, DImageInfo, DPortBindings,
} from "./docker";

import docker from "./docker";
import {
    config,
    defaultValues,
    netsFromArgsOrAll,
    netsFromArgsOrDefault,
    updatePreferences
} from './config';
import { texts } from "./texts";
import { argsToOptions, breakWords, inputLine, showUsage } from "./utils";

const fs = require('fs');
const path = require('path');

async function checkRequiredSoftware() {
    const version = await docker.numericVersion();
    if (version < 17_000_000) {
        throw texts.dockerVersionRequired;
    }
}

let skipLicenseAgreement = false;

async function checkLicenseAgreement() {
    if (skipLicenseAgreement || (await docker.listTonDevContainers()).length > 0) {
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
}

async function create(options: DCreateContainerOptions): Promise<void> {
    process.stdout.write(texts.containerDoesNotExists(options.name || ''));
    await docker.createContainer(options);
    console.log(texts.done);
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
        Env: ['USER_AGREEMENT=yes'],
        HostConfig: {
            Mounts: [
                {
                    Type: 'bind',
                    Source: config.compilers.mountSource,
                    Target: config.compilers.mountDestination,
                },
            ],
        },
    });
}

async function createLocalNodeContainer(net: NetConfig): Promise<void> {
    const ports: DPortBindings = {
        '80/tcp': [
            {
                HostIp: '',
                HostPort: `${net.preferences.hostPort}`,
            },
        ],
    };
    if (net.preferences.arangoHostPort !== '') {
        ports['8529/tcp'] = [
            {
                HostIp: '',
                HostPort: net.preferences.arangoHostPort,
            },
        ]
    }
    return create({
        name: net.container,
        interactive: true,
        Image: net.image,
        Env: ['USER_AGREEMENT=yes'],
        HostConfig: {
            PortBindings: ports,
        },
    });
}

async function ensureStartedContainer(
    container: string,
    image: string,
    create: () => Promise<void>,
): Promise<DContainerInfo> {
    let containerInfo = docker.findContainerInfo(await docker.listAllContainers(), container);
    if (!containerInfo) {
        await checkLicenseAgreement();
        if (!docker.findImageInfo(await docker.listAllImages(), image)) {
            process.stdout.write(texts.imageDoesNotExists(image));
            await docker.pullImage(image);
            console.log(texts.done);
        }
        await create();
        containerInfo = docker.findContainerInfo(await docker.listAllContainers(), container);
        if (!containerInfo) {
            throw texts.containerCanNotBeCreated(container);
        }
    }
    if (!docker.isRunning(containerInfo)) {
        const container = docker.getContainer(containerInfo.Id);
        await container.start();
    }
    return containerInfo;
}

async function ensureStartedLocalNode(net: NetConfig): Promise<DContainerInfo> {
    return ensureStartedContainer(net.container, net.image, () => createLocalNodeContainer(net));
}

async function ensureStartedCompilers(): Promise<DContainerInfo> {
    return ensureStartedContainer(config.compilers.container, config.compilers.image, createCompilersContainer);
}

async function setup(args: string[]) {
    const options = argsToOptions(args, {
        port: { def: '', valueCount: 1, short: 'p' },
        arango: { def: '', valueCount: 1, short: 'a' },
    });
    await checkRequiredSoftware();
    if (options.port !== '' || options.arango !== '') {
        skipLicenseAgreement = (await docker.listTonDevContainers()).length > 0;
        if (options.port !== '') {
            netsFromArgsOrDefault().forEach((net) => {
                net.preferences.hostPort = options.port;
            });
        }
        if (options.arango !== '') {
            let arangoHostPort = '';
            switch (options.arango.toLowerCase()) {
            case 'bind':
                arangoHostPort = defaultValues.net.arangoPort;
                break;
            case 'unbind':
                arangoHostPort = '';
                break;
            default:
                arangoHostPort = options.arango;
                break;
            }
            netsFromArgsOrDefault().forEach((net) => {
                net.preferences.arangoHostPort = arangoHostPort;
            });
        }
        updatePreferences();
        await clean(['-c']);
    }
    await Promise.all(netsFromArgsOrAll().map(ensureStartedLocalNode));
    await ensureStartedCompilers();
}

async function start() {
    return Promise.all(netsFromArgsOrAll().map(ensureStartedLocalNode));
}

async function stopContainer(info: DContainerInfo) {
    if (docker.isRunning(info)) {
        return docker.getContainer(info.Id).stop();
    }
}

async function stop() {
    return Promise.all((await docker.listTonDevContainers()).map(stopContainer));
}

async function cleanContainer(info: DContainerInfo): Promise<void> {
    const container = docker.getContainer(info.Id);
    if (docker.isRunning(info)) {
        await container.stop();
    }
    await container.remove();
    console.log(texts.containerHaveBeenRemoved(info.Id))
}

async function cleanImage(info: DImageInfo): Promise<void> {
    const image = docker.getImage(info.Id);
    await image.remove();
    console.log(texts.imageHaveBeenRemoved(info.Id))
}

async function clean(args: string[]) {
    const options = argsToOptions(args, {
        images: { def: false, short: 'i' },
        containers: { def: false, short: 'c' },
    });
    if (!options.images && !options.containers) {
        options.images = true;
        options.containers = true;
    }
    if (options.containers) {
        await Promise.all((await docker.listTonDevContainers()).map(cleanContainer));
    }
    if (options.images) {
        await Promise.all((await docker.listTonDevImages()).map(cleanImage));
    }
}

async function useVersion(args: string[]) {
    if (args.length !== 1) {
        showUsage(texts.usage);
        process.exit(1);
    }
    netsFromArgsOrAll().forEach((net) => {
        net.preferences.version = args[0];
    });
    updatePreferences();
    await setup([]);
}

export { setup, ensureStartedLocalNode, ensureStartedCompilers, start, stop, clean, useVersion };
