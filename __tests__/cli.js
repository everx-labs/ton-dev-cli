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

import { handleCommandLine } from "../src/cli/cli";
import { Dev } from "../src/dev";

jest.setTimeout(60_000);

async function cmd(...args) {
    const argv = [process.argv0, 'index', ...args];
    const dev = new Dev();
    let out = '';
    const saveConsoleLog = console.log;
    console.log = (...args) => {
        out = `${out}${args.join('')}\n`;
    }
    await handleCommandLine(dev, argv);
    console.log = saveConsoleLog;
    return out;
}

test('Masterchain addr', async () => {
    await cmd('a', '-1:0b0cb5e0bc0bc0baa3ea45a37d14dee1b1a24befa40c7be54aeaf8fcc7438b5c');
});

