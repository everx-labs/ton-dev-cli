#!/usr/bin/env node


/*
 * Copyright 2018-2020 TON DEV SOLUTIONS LTD.
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

import { handleCommandLine } from "./cli/cli";
import { Dev } from "./dev";


async function main() {
    const dev = new Dev();
    await handleCommandLine(dev, process.argv);
}

(async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        if (error.message) {
            console.error(`\n${error.message}`);
        } else {
            console.error(`\n${error}`);
        }
        process.exit(1);
    }
})();
