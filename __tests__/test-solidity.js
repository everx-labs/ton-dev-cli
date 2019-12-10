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

import { Solidity } from "../src/compilers/solidity";
import { Dev } from "../src/dev";
const path = require('path');

jest.setTimeout(60_000);

test('Solidity Compiler', async () => {
    // const dev = new Dev();
    // await Solidity.build(dev, [
    //     path.resolve(__dirname, 'test')
    // ], {
    //     clientLevel: 'deploy',
    //     clientLanguages: ['js'],
    // })
});

