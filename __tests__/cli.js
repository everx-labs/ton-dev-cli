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

import {handleCommandLine} from "../src/cli/cli";
import {Dev} from "../src/dev";

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

test.skip('Masterchain addr', async () => {
    // await cmd('a', '-1:0b0cb5e0bc0bc0baa3ea45a37d14dee1b1a24befa40c7be54aeaf8fcc7438b5c');

    const hexToAddresses = await cmd('a', '-1:5555555555555555555555555555555555555555555555555555555555555555');
    const bounceToHex = await cmd('a', 'Uf9VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVeGi');
    console.log('>>>', {
        hexToAddresses,
        bounceToHex
    });
});


async function expectError(code: number, source: string, message?: string, f) {
    try {
        await f();
        fail(`Expected error with code:${code} source: ${source}`);
    } catch (error) {
        expect({ code: error.code, source: error.source }).toEqual({ code, source });
        if (message)
            expect(error.message).toMatch(message);
    }
}


test('Should convert diff address format', async () => {
    const hexToAddresses = await cmd('a', '-1:5555555555555555555555555555555555555555555555555555555555555555');
    expect(hexToAddresses).toMatch("✓ hex = -1:5555555555555555555555555555555555555555555555555555555555555555");
    expect(hexToAddresses).toMatch("main = Uf9VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVeGi");
    expect(hexToAddresses).toMatch("main url = Uf9VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVeGi");
    expect(hexToAddresses).toMatch("main bounce = Ef9VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVbxn");
    expect(hexToAddresses).toMatch("main bounce url = Ef9VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVbxn")
    expect(hexToAddresses).toMatch("test = 0f9VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVoo");
    expect(hexToAddresses).toMatch("test url = 0f9VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVoo");
    expect(hexToAddresses).toMatch("test bounce = kf9VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQft");
    expect(hexToAddresses).toMatch("test bounce url = kf9VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQft");


    const bounceToHex = await cmd('a', 'Uf9VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVeGi');
    expect(bounceToHex).toMatch("hex = -1:5555555555555555555555555555555555555555555555555555555555555555");
    expect(bounceToHex).toMatch("✓ main = Uf9VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVeGi");
    expect(bounceToHex).toMatch("✓ main url = Uf9VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVeGi");

    const bounceToHexWithSlash = await cmd('addr', 'EQA9uzKPV4JLKXPoQM2ddKOAfo99hcO_NCBsHG-1Q-QE2ah8');
    expect(bounceToHexWithSlash).toMatch("main bounce = EQA9uzKPV4JLKXPoQM2ddKOAfo99hcO/NCBsHG+1Q+QE2ah8");
    expect(bounceToHexWithSlash).toMatch("✓ main bounce url = EQA9uzKPV4JLKXPoQM2ddKOAfo99hcO_NCBsHG-1Q-QE2ah8");


    const otherWorkchainId = await cmd('a', '0:0000000000000000000000000000000000000000000000000000000000000000');
    expect(otherWorkchainId).toMatch("✓ hex = 0:0000000000000000000000000000000000000000000000000000000000000000");

    const minWorkchainId = await cmd('a', '-128:0000000000000000000000000000000000000000000000000000000000000000');
    expect(minWorkchainId).toMatch("✓ hex = -128:0000000000000000000000000000000000000000000000000000000000000000");

    const maxWorkchainId = await cmd('a', '127:0000000000000000000000000000000000000000000000000000000000000000');
    expect(maxWorkchainId).toMatch("✓ hex = 127:0000000000000000000000000000000000000000000000000000000000000000");

    await expectError(2004, 'client', 'Invalid address [Non-std address]: 128:0000000000000000000000000000000000000000000000000000000000000000', async () => {
        await cmd('a', '128:0000000000000000000000000000000000000000000000000000000000000000');
    });

    await expectError(2004, 'client', 'Invalid address [Non-std address]: -129:0000000000000000000000000000000000000000000000000000000000000000', async () => {
        await cmd('a', '-129:0000000000000000000000000000000000000000000000000000000000000000');
    });

    await expectError(2004, 'client', 'Invalid address [fatal error]:', async () => {
        await cmd('a', 'wrong');
    });

    await expectError(2004, 'client', 'Invalid address [Invalid argument: account address should be 256 bits long in workchain 0]', async () => {
        await cmd('a', '00000000000000000000000');
    });

    await expectError(2004, 'client', 'Invalid address [Invalid argument: workchain_id is not correct number: invalid digit found in string]', async () => {
        await cmd('a', 'ff:0000000000000000000000000000000000000000000000000000000000000000');
    });
});
