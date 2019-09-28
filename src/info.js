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
import type { DContainerInfo } from "./docker";
import docker from "./docker";
import { texts } from "./texts";
import { version, httpsGetJson } from "./utils";

async function listTags(image: string): string[] {
    const url = `https://registry.hub.docker.com/v2/repositories/${image}/tags/`;
    const tags = await httpsGetJson(url);
    return tags.results.map(x => x.name).sort();
}

async function showTonDevImages() {
    const images = await docker.listTonDevImages();
    if (images.length > 0) {
        console.log();
        console.log(texts.tonDevImages(images.length));
        console.log();
        images.forEach((image) => {
            console.log(`  ${image.RepoTags}`);
        });
    } else {
        console.log(texts.noTonDevImages);
    }
}

function mapContainerName(name: string): string {
    return name.startsWith('/') ? name.substr(1) : name;
}

async function showTonDevContainers() {
    const containers = await docker.listTonDevContainers();
    if (containers.length > 0) {
        console.log();
        console.log(texts.tonDevContainers(containers.length));
        console.log();
        containers.forEach((container) => {
            console.log(`  ${container.Names.map(mapContainerName)} (${container.Image}) ${container.State}`);
        });
    } else {
        console.log(texts.noTonDevContainers);
    }
}

async function showAvailableVersions(imageFamily) {
    console.log(`  ${imageFamily}: ${(await listTags(imageFamily)).join(', ')}`);
}

function showContainerInfo(containers: DContainerInfo[], name: string) {
    const container = docker.findContainerInfo(containers, name);
    if (container) {
        console.log(`  Docker image: ${container.Image}`);
        console.log(`  Docker container: ${container.Names.map(mapContainerName)} ${container.State}`);
    } else {
        console.log(`  Docker container: missing`);
    }
}

async function info() {
    console.log(texts.usageHeader(version));
    const containers = await docker.listTonDevContainers();

    config.net.all.forEach((net) => {
        console.log();
        console.log(texts.netHeader(net.preferences.name));
        console.log();
        console.log(texts.usedVersion(net.preferences.version));
        console.log(texts.netHostPort(net.preferences.hostPort));
        if (net.preferences.arangoHostPort !== '') {
            console.log(texts.netArangoHostPort(net.preferences.arangoHostPort));
        }
        showContainerInfo(containers, net.container);
    });
    console.log();
    console.log(texts.compilerHeader);
    console.log();
    console.log(texts.usedVersion(config.compilers.preferences.version));
    showContainerInfo(containers, config.compilers.container);

    console.log();
    console.log(texts.availableVersions);
    console.log();
    await showAvailableVersions(defaultValues.compilers.image);
    await showAvailableVersions(defaultValues.net.image);
}


export { info };
