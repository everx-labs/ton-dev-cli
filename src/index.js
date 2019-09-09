#!/usr/bin/env node


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

import { showUsage } from './utils';
import { setup } from './setup';
import { start } from './start';
import { clean } from './clean';
import { sol } from './sol';

const usage = `Use: tondev command { argument ... }

Commands:

setup
    Looking for a required prerequisites and setup required TON Labs Dev Tools.
    
start
    Start local node.
     
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
`;

async function main() {
    const commands = {
        setup,
        start,
        clean,
        sol,
    };
    const command = commands[`${process.argv[2]}`.toLowerCase()];
    if (command) {
        await command(process.argv.slice(3));
    } else {
        showUsage(usage);
    }
}

(async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error(`\n${error}`);
        process.exit(1);
    }
})();
