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

import type { CompilersWithNetworks } from "../dev";
import { Dev } from "../dev";
import { Network } from "../networks/networks";

export type NetworksOptions = {
    networks?: boolean | string,
}

export type CompilersOptions = {
    compilers?: boolean,
}

export type CompilersWithNetworksOptions = CompilersOptions & NetworksOptions;

export type InfoOptions = {
    available?: boolean
}

export type SetupOptions = CompilersWithNetworksOptions;

export type StartOptions = CompilersWithNetworksOptions;
export type StopOptions = CompilersWithNetworksOptions;
export type RestartOptions = CompilersWithNetworksOptions;
export type RecreateOptions = CompilersWithNetworksOptions;
export type CleanOptions = CompilersWithNetworksOptions;
export type UseOptions = CompilersWithNetworksOptions;

export type SolOptions = {
    clientLanguages?: string,
    clientLevel?: string,
}

function requiredNetwork(dev: Dev, name: string): Network {
    const network = dev.networks.find(x => x.name.toLowerCase() === name.toLowerCase());
    if (!network) {
        throw new Error(`Network not found: ${name}`)
    }
    return network;
}

function findNetworks(dev: Dev, options: NetworksOptions): ?(Network[]) {
    const names = options.networks;
    if (!names) {
        return null;
    }
    if (typeof names === 'boolean') {
        return dev.networks;
    }
    return names.split(',').map(name => requiredNetwork(dev, name.trim()));
}

export function compilersWithNetworks(
    dev: Dev,
    options: CompilersWithNetworksOptions
): CompilersWithNetworks {
    let compilers = !!options.compilers;

    let networks = findNetworks(dev, options);
    if (!compilers && !networks) {
        compilers = true;
        networks = dev.networks;
    }
    return {
        compilers,
        networks: networks || []
    };
}

export function networksOrDefault(dev: Dev, options: NetworksOptions): Network[] {
    return findNetworks(dev, options) || [requiredNetwork(dev, Network.defaultName)];
}

export function networksOrAll(dev: Dev, options: NetworksOptions): Network[] {
    return findNetworks(dev, options) || dev.networks;
}

