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

import {texts} from './texts';
import {showUsage} from './utils';
import {setup, start, stop, clean} from './setup';
import {sol} from './sol';

async function main() {
    const commands = {
        setup,
        start,
        stop,
        clean,
        sol,
    };
    const command = commands[`${process.argv[2]}`.toLowerCase()];
    if (command) {
        await command(process.argv.slice(3));
    } else {
        showUsage(texts.usage);
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
