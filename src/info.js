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

import { defaults, preferences } from "./config";
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
            console.log(`${image.RepoTags}`);
        });
    } else {
        console.log(texts.noTonDevImages);
    }
}

async function showTonDevContainers() {
    const containers = await docker.listTonDevContainers();
    if (containers.length > 0) {
        console.log();
        console.log(texts.tonDevContainers(containers.length));
        console.log();
        containers.forEach((container) => {
            console.log(`${container.Names} (${container.Image}) ${container.State}`);
        });
    } else {
        console.log(texts.noTonDevContainers);
    }
}
async function info() {
    console.log(texts.usageHeader(version));
    await showTonDevImages();
    await showTonDevContainers();

    console.log();
    console.log(texts.usedVersion(preferences.version));
    console.log(texts.availableVersions((await listTags(defaults.compilersImageFamily)).join(', ')));
    console.log();
    console.log(texts.localNodeBoundToPort(preferences.localNodeHostPort));
}


export {info};
