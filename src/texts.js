import {version} from './utils';

const texts = {
    agreementConfirmation: `
This Agreement takes effect when you input a “YES” and press Enter 
or, if earlier, when you use any of the TON DEV Software: `,
    agreementRejected: '\n\nLicense terms were not accepted.\n',
    agreementAccepted: '\n\nLicense terms were accepted.\n',
    dockerVersionRequired: "Docker version required ^17",
    containerDoesNotExists(name) {
        return `Container [${name}] does not exists. Creating...`;
    },
    done: ' Done.',
    imageDoesNotExists(name) {
        return `Image [${name}] is missing. Pulling (please wait)...`;
    },
    containerCanNotBeCreated(name) {
        return `Container [${name}] can not be created`;
    },
    containerHaveBeenRemoved(id) {
        return `Container [${id} have been removed.`;
    },
    imageHaveBeenRemoved(id) {
        return `Image [${id} have been removed.`;
    },
    sourceFileNotFound(name) {
        return `Source file [${name.sol}] not found.`;
    },
    usageHeader(version) {
        return `TON Labs Dev Tools ${version}`;
    },
    invalidOption(arg) {
        return `Invalid option: ${arg}`;
    },
    usage: `Use: tondev command { argument ... }

Commands:

setup
    Looking for a required prerequisites and setup required TON Labs Dev Tools.
    
start
    Start local node.
     
stop
    Stop all TON Dev docker containers.
     
clean
    Remove all TON Dev docker containers and images.
    
sol <solidity-file-without-extension> [ -js ]
    Build TON contract from solidity source code.
    Options:
    --javascript or -js
        Generate JavaScript file with contract package (imageBase64 and ABI).
        

Copyright 2018-2019 TON DEV SOLUTIONS LTD.

Licensed under the SOFTWARE EVALUATION License (the "License"); you may not use
this file except in compliance with the License.  You may obtain a copy of the
License at: https://www.ton.dev/licenses

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific TON DEV software governing permissions and
limitations under the License.         
`,
};

export {texts};
