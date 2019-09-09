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
 *
 */
// @flow

import type { DContainerInfo, DImageInfo } from "./docker";
import docker from "./docker";
import config from "./config";

async function cleanContainer(info: DContainerInfo): Promise<void> {
    const container = docker.getContainer(info.Id);
    if (docker.isRunning(info)) {
        await container.stop();
    }
    await container.remove();
    console.log(`Container [${info.Id} have been removed.`)
}

async function cleanImage(info: DImageInfo): Promise<void> {
    const image = docker.getImage(info.Id);
    await image.remove();
    console.log(`Image [${info.Id} have been removed.`)
}

function containerBelongsToImage(info: DContainerInfo, image: string): boolean {
    return info.Image.toLowerCase() === image.toLowerCase();
}

function imageHasRepoTag(info: DImageInfo, tag: string): boolean {
    return !!(info.RepoTags || []).find(n => n.toLowerCase() === tag.toLowerCase());
}

function isTonDevContainer(info: DContainerInfo): boolean {
    return containerBelongsToImage(info, config.localNode.image)
        || containerBelongsToImage(info, config.compilers.image);
}

function isTonDevImage(info: DImageInfo): boolean {
    return imageHasRepoTag(info, config.localNode.image)
        || imageHasRepoTag(info, config.compilers.image);
}

async function clean() {
    const containerCleaners = (await docker.listAllContainers())
        .filter(info => isTonDevContainer(info))
        .map(cleanContainer);
    await Promise.all(containerCleaners);
    const imageCleaners = (await docker.listAllImages())
        .filter(info => isTonDevImage(info))
        .map(cleanImage);
    await Promise.all(imageCleaners);
}

export {clean};
