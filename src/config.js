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

import { argsToOptions, toIdentifier } from "./utils";

const path = require('path');
const os = require('os');
const fs = require('fs');

const tonlabsHome = path.join(os.homedir(), '.tonlabs');

const defaultValues = {
    version: 'latest',
    net: {
        name: 'default',
        image: 'tonlabs/local-node',
        container: 'tonlabs-local-node',
        port: '80',
        arangoPort: '8529',
    },
    compilers: {
        image: 'tonlabs/compilers',
        container: 'tonlabs-compilers',
    },
};

export type NetPreferences = {
    name: string,
    version: string,
    hostPort: string,
    arangoHostPort: string,
};

export type CompilersPreferences = {
    version: string,
};

const defaultPreferences = {
    net: {
        name: defaultValues.net.name,
        version: defaultValues.version,
        hostPort: defaultValues.net.port,
        arangoHostPort: '',
    },
    compilers: {
        version: defaultValues.version,
    },
};

export type NetConfig = {
    preferences: NetPreferences,
    image: string,
    container: string,
};

export type CompilersConfig = {
    preferences: CompilersPreferences,
    image: string,
    container: string,
    mountSource: string,
    mountDestination: string,
}


export type Preferences = {
    compilers: CompilersPreferences,
    nets: NetPreferences[],
}

const user = toIdentifier(os.userInfo().username).toLowerCase();

function createNetConfig(preferences: NetPreferences): NetConfig {
    const containerNameSuffix = preferences.name !== defaultValues.net.name ? `-${preferences.name}` : '';
    return {
        preferences,
        image: `${defaultValues.net.image}:${preferences.version}`,
        container: `${defaultValues.net.container}-${user}${containerNameSuffix}`,
    };
}

function createCompilersConfig(preferences: CompilersPreferences): CompilersConfig {
    return {
        preferences,
        image: `${defaultValues.compilers.image}:${preferences.version}`,
        container: `${defaultValues.compilers.container}-${user}`,
        mountSource: path.join(tonlabsHome, 'compilers', 'projects'),
        mountDestination: '/projects',
    };
}

let preferences: Preferences = {
    compilers: defaultPreferences.compilers,
    nets: [],
};

export type Config = {
    auth: {
        authconfig: {
            username: string,
            password: string,
        }
    },
    compilers: CompilersConfig,
    net: {
        default: NetConfig,
        all: NetConfig[],
        fromArgs: NetConfig[],
    }
};


const config: Config = {
    auth: {
        authconfig: {
            username: process.env.TONDEV_DH_USER || '',
            password: process.env.TONDEV_DH_PASSWORD || '',
        }
    },
    compilers: createCompilersConfig(defaultPreferences.compilers),
    net: {
        default: createNetConfig(defaultPreferences.net),
        all: [],
        fromArgs: []
    },
};


function preferencesFilePath() {
    return path.join(tonlabsHome, 'preferences.json');
}

let options: { net: string[] } = {
    net: [],
};

function readPreferencesOrDefault(path: string, def: Preferences): Preferences {
    try {
        return JSON.parse(fs.readFileSync(path, { encoding: 'utf8' }));
    } catch {
    }
    return def;
}

function writePreferences(path: string, preferences: Preferences) {
    fs.writeFileSync(path, JSON.stringify(preferences), { encoding: 'utf8' });
}

function ensureNetPreferences(name: string): NetPreferences {
    const existing = preferences.nets.find(x => x.name.toLowerCase() === name.toLowerCase());
    if (existing) {
        return existing;
    }
    const created = Object.assign({}, defaultPreferences.net);
    created.name = name;
    preferences.nets.push(created);
    return created;
}

function applyPreferences() {
    preferences.compilers = preferences.compilers || Object.assign({}, defaultPreferences.compilers);
    preferences.nets = preferences.nets || [];
    config.compilers = createCompilersConfig(preferences.compilers);

    ensureNetPreferences(defaultValues.net.name);
    options.net.forEach(ensureNetPreferences);
    const namesFromArgs = new Set<string>(options.net);
    config.net.all = preferences.nets.map(createNetConfig);
    config.net.default = config.net.all.find(x => x.preferences.name === defaultValues.net.name)
        || config.net.default;
    config.net.fromArgs = config.net.all.filter(x => namesFromArgs.has(x.preferences.name));
}

function updatePreferences() {
    writePreferences(preferencesFilePath(), preferences);
    applyPreferences();
}

function completeConfig(args: string[]) {
    options = argsToOptions(args, {
        net: { def: '', valueCount: 1000, short: 'n' }
    });
    preferences = readPreferencesOrDefault(preferencesFilePath(), preferences);
    applyPreferences();
    updatePreferences();
}

function netsFromArgsOrAll(): NetConfig[] {
    return config.net.fromArgs.length > 0 ? config.net.fromArgs : config.net.all;
}

function netsFromArgsOrDefault(): NetConfig[] {
    return config.net.fromArgs.length > 0 ? config.net.fromArgs : [config.net.default];

}

export { config, updatePreferences, defaultValues, completeConfig, netsFromArgsOrAll, netsFromArgsOrDefault };


