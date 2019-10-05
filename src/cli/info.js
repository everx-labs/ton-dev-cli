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


import { Compilers } from "../compilers/compilers";
import { Dev } from "../dev";
import { Network } from "../networks/networks";
import type { DContainerInfo } from "../utils/docker";
import { texts } from "../utils/texts";
import { httpsGetJson, version } from "../utils/utils";
import type { InfoOptions } from "./options";

export async function infoCommand(dev: Dev, options: InfoOptions) {
    async function listTags(image: string): Promise<string[]> {
        const url = `https://registry.hub.docker.com/v2/repositories/${image}/tags/`;
        const tags = await httpsGetJson(url);
        return tags.results.map(x => x.name).sort();
    }

    async function showAvailableVersions(imagePrefix: string) {
        console.log(`  ${imagePrefix}: ${(await listTags(imagePrefix)).join(', ')}`);
    }

    function mapContainerName(name: string): string {
        return name.startsWith('/') ? name.substr(1) : name;
    }

    async function showContainerInfo(name: string) {
        const info: ?DContainerInfo = await dev.docker.findContainerInfo(name);
        if (info) {
            console.log(`  Docker image: ${info.Image}`);
            console.log(`  Docker container: ${info.Names.map(mapContainerName).join(', ')} ${info.State}`);
        } else {
            console.log(`  Docker container missing: ${name}`);
        }
    }

    console.log(texts.usageHeader(version));

    for (let i = 0; i < dev.networks.length; i += 1) {
        const network = dev.networks[i];
        console.log();
        console.log(texts.netHeader(network.name));
        console.log();
        console.log(texts.usedVersion(network.version));
        console.log(texts.netHostPort(network.hostPort));
        if (network.arangoHostPort !== '') {
            console.log(texts.netArangoHostPort(network.arangoHostPort));
        }
        await showContainerInfo(network.containerName);
    }
    console.log();
    console.log(texts.compilerHeader);
    console.log();
    console.log(texts.usedVersion(dev.compilers.version));
    await showContainerInfo(dev.compilers.containerName);


    if (options.available) {
        console.log();
        console.log(texts.availableVersions);
        console.log();
        await showAvailableVersions(Compilers.imagePrefix);
        await showAvailableVersions(Network.imagePrefix);
    }
}
