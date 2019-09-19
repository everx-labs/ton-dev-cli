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

const path = require('path');
const os = require('os');
const fs = require('fs');

const tonlabsHome = path.join(os.homedir(), '.tonlabs');

const defaults = {
    localNodeImageFamily: 'tonlabs/local-node',
    compilersImageFamily: 'tonlabs/compilers',
    localNodeArangoHostPort: '8529',
};

const preferences = {
    version: 'latest',
    localNodeHostPort: '80',
    localNodeArangoHostPort: '',
};

function preferencesFilePath() {
    return path.join(tonlabsHome, 'preferences.json');
}

function readPreferences() {
    try {
        const read = JSON.parse(
            fs.readFileSync(preferencesFilePath(), { encoding: 'utf8' })
        );
        Object.assign(preferences, read);
    } catch {
    }
}



readPreferences();

const user = os.userInfo().username;

const config = {
    auth: {
        authconfig: {
            username: process.env.TONDEV_DH_USER,
            password: process.env.TONDEV_DH_PASSWORD,
        }
    },
    localNode: {
        image: `${defaults.localNodeImageFamily}:${preferences.version}`,
        container: `tonlabs-local-node-${user}`,
        hostPort: preferences.localNodeHostPort,
    },
    compilers: {
        image: `${defaults.compilersImageFamily}:${preferences.version}`,
        container: `tonlabs-compilers-${user}`,
        mountSource: path.join(tonlabsHome, 'compilers', 'projects'),
        mountDestination: '/projects',

    }
};

function updatePreferences() {
    fs.writeFileSync(
        preferencesFilePath(),
        JSON.stringify(preferences),
        { encoding: 'utf8' }
    );
    config.localNode.image = `${defaults.localNodeImageFamily}:${preferences.version}`;
    config.compilers.image = `${defaults.compilersImageFamily}:${preferences.version}`;
    config.localNode.hostPort = preferences.localNodeHostPort;
}

export { config, preferences, updatePreferences, defaults };


