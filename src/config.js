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

const config = {
    auth: {
        authconfig: {
            username: process.env.TONDEV_DH_USER,
            password: process.env.TONDEV_DH_PASSWORD,
        }
    },
    localNode: {
        image: 'tonlabs/local-node:0.11.0',
        container: 'tonlabs-local-node',
    },
    compilers: {
        image: 'tonlabs/compilers:0.11.0',
        container: 'tonlabs-compiler-kit',
        mountSource: path.join(os.homedir(), '.tonlabs', 'compilers', 'projects'),
        mountDestination: '/projects',

    }
};

export default config;


