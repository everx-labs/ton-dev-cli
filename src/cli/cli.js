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
// @flow

import { TONClient } from "ton-client-node-js";
import { ClientCode, ClientCodeLevel, JSModule } from "../compilers/client-code";
import { Solidity } from "../compilers/solidity";
import { Dev } from "../dev";
import { Network } from "../networks/networks";
import type { NetworkConfig } from "../networks/networks";
import { web } from "../server/server";
import { CheckNetwork } from "./check";
import { compilersWithNetworks } from "./options";
import type {
    CleanOptions,
    RecreateOptions,
    RestartOptions, SetNetworkOptions,
    SetupOptions, SolOptions,
    StartOptions,
    StopOptions,
    UseOptions, WebOptions,
} from "./options";

import { infoCommand } from "./info.js";
import { spy } from "./spy";
import { NetworkTracer } from "./trace";

const USE_EXPERIMENTAL_FEATURES = false;

const program = require('commander');


async function setupCommand(dev: Dev, options: SetupOptions) {
    await dev.start(compilersWithNetworks(dev, options));
}


async function startCommand(dev: Dev, options: StartOptions) {
    await dev.start(compilersWithNetworks(dev, options));
}

async function stopCommand(dev: Dev, options: StopOptions) {
    await dev.stop(compilersWithNetworks(dev, options));
}

async function restartCommand(dev: Dev, options: RestartOptions) {
    await dev.restart(compilersWithNetworks(dev, options));
}

async function recreateCommand(dev: Dev, options: RecreateOptions) {
    await dev.recreate(compilersWithNetworks(dev, options));
}

async function cleanCommand(dev: Dev, options: CleanOptions) {
    const all = !options.compilers && !options.networks;
    await dev.clean(options.compilers || all, options.networks || all, options.containers);
}

async function setCommand(dev: Dev, names: string[], options: SetNetworkOptions) {
    await dev.updateNetworkConfigs(dev.networksOrAll(names), (config: NetworkConfig) => {
        if (options.newName) {
            config.name = options.newName;
        }
        if (options.port) {
            config.hostPort = options.port;
        }
        if (options.dbPort) {
            if (options.dbPort === 'bind') {
                config.arangoHostPort = Network.defaultArangoPort;
            } else if (options.dbPort === 'unbind') {
                config.arangoHostPort = '';
            } else {
                config.arangoHostPort = options.dbPort || '';
            }
        }
    });
}

async function addCommand(dev: Dev, names: string[]) {
    await dev.addNetworks(names);
}

async function removeCommand(dev: Dev, names: string[]) {
    await dev.removeNetworks(dev.networksFromNames(names));
}

async function generateKeysCommand(_dev: Dev) {
    const client = await TONClient.create({
        servers: ['http://localhost'],
    });
    const keys = await client.crypto.ed25519Keypair();
    console.log(JSON.stringify(keys, undefined, 4));
}

async function testCommand(_dev: Dev, servers: string[], options: { verbose: boolean }) {
    await CheckNetwork.checkNetworks(servers, options.verbose);
}

async function convertAddress(_dev: Dev, addr) {
    const client = await TONClient.create({
        servers: ['http://localhost'],
    });
    const showConverted = (title, converted) => {
        console.log(`${converted.address === addr ? '✓' : ' '} ${title} = ${converted.address}`);
    };
    const showHex = async () => {
        const converted = await client.contracts.convertAddress({
            address: addr,
            convertTo: 'Hex',
        });
        showConverted('hex', converted);
    };
    const showBase64 = async (test, bounce, url) => {
        const converted = await client.contracts.convertAddress({
            address: addr,
            convertTo: 'Base64',
            base64Params: {
                bounce,
                test,
                url,
            },
        });
        const flags = [
            test ? 'test' : 'main',
            bounce ? 'bounce' : '',
            url ? 'url' : '',
        ]
            .filter(x => x !== '')
            .join(' ');
        showConverted(flags, converted);
    };
    await showHex();
    await showBase64(false, false, false);
    await showBase64(false, false, true);
    await showBase64(false, true, false);
    await showBase64(false, true, true);
    await showBase64(true, false, false);
    await showBase64(true, false, true);
    await showBase64(true, true, false);
    await showBase64(true, true, true);
}

async function traceCommand(_dev: Dev, server: string) {
    await NetworkTracer.traceNetwork(server);
}

async function useCommand(dev: Dev, version: string, options: UseOptions) {
    await dev.useVersion(version, compilersWithNetworks(dev, options));
}

async function solCommand(dev: Dev, files: string[], options: SolOptions) {
    if (files.length < 1) {
        throw new Error('You must specify at least one file name');
    }
    await Solidity.build(dev, files, {
        clientLanguages: (options.clientLanguages || '').split(','),
        clientLevel: options.clientLevel || ClientCodeLevel.run,
        jsModule: options.jsModule || JSModule.node,
    });
}

async function genCommand(dev: Dev, files: string[], options: SolOptions) {
    if (files.length < 1) {
        throw new Error('You must specify at least one file name');
    }
    await ClientCode.generate(files, {
        clientLanguages: (options.clientLanguages || '').split(','),
        clientLevel: options.clientLevel || ClientCodeLevel.run,
        jsModule: options.jsModule || JSModule.node,
    });
}

async function spyCommand(dev: Dev, networks: string[]) {
    await spy(dev, networks);
}

async function webConsoleCommand(dev: Dev, options: WebOptions) {
    await web(dev, options);
}

const networksOption = [
    '-n, --networks [names]',
    'Apply command to specified network[s] (names must be separated with comma).'
];

const compilersOption = [
    '-m, --compilers',
    'Apply command to the compilers container.'
];

function getSupportedLanguages(): string[] {
    return Object.values(ClientCode.languages).map((x: any) => x.shortName);
}

const clientLanguagesOption = [
    '-l, --client-languages <languages>',
    `Generate client code for specified languages separated by comma, ` +
    `supported languages: "${getSupportedLanguages().join('", "')}".`,
];

const clientLevelOption = [
    '-L, --client-level <client-level>',
    'Client code level: ' +
    '"run" to run only, ' +
    '"deploy" to run and deploy (includes an imageBase64 of binary contract)',
    'deploy'
];

const jsModuleTypeOption = [
    '--js-module <module-type>',
    "Java Script module type: " +
    "`node` to use with `const FooContract = require('foo')`, " +
    "`nodeNoDefault` to use with `const {FooContract} = require('foo')`, " +
    "`es` to use with `import FooContract from 'foo'`, " +
    "`esNoDefault` to use with `import {FooContract} from 'foo'`.",
    'node'
];


async function handleCommandLine(dev: Dev, args: string[]) {
    let commandAction = infoCommand;
    let commandArgs = [];

    const command = (action) => {
        return (...args) => {
            commandAction = action;
            commandArgs = args;
        };
    };

    program
        .name(dev.name)
        .version(dev.version)
        .option('-a, --available', 'Show available versions.')
        .description('TON Labs development tools');

    program
        .command('info', { isDefault: true }).description('Show summary about dev environment.')
        .option('-a, --available', 'Show available versions.')
        .action(command(infoCommand));

    program
        .command('sol [files...]').description('Build solidity contract[s].')
        .option(...clientLanguagesOption)
        .option(...clientLevelOption)
        .option(...jsModuleTypeOption)
        .action(command(solCommand));

    program
        .command('gen [files...]').description('Generate client code for contract[s].')
        .option(clientLanguagesOption[0], clientLanguagesOption[1], 'js')
        .option(...clientLevelOption)
        .option(...jsModuleTypeOption)
        .action(command(genCommand));

    program
        .command('start').description('Start dev containers.')
        .option(...networksOption)
        .option(...compilersOption)
        .action(command(startCommand));

    program
        .command('stop').description('Stop dev containers.')
        .option(...networksOption)
        .option(...compilersOption)
        .action(command(stopCommand));

    program
        .command('restart').description('Restart dev containers.')
        .option(...networksOption)
        .option(...compilersOption)
        .action(command(restartCommand));

    program
        .command('recreate').description('Recreate dev containers.')
        .option(...networksOption)
        .option(...compilersOption)
        .action(command(recreateCommand));

    program
        .command('setup').description('Setup dev environment.')
        .option(...networksOption)
        .option(...compilersOption)
        .action(command(setupCommand));

    program
        .command('clean').description('Remove docker containers and images related to TON Dev.')
        .option('-n, --networks', 'Clean local node docker containers and images.')
        .option('-m, --compilers', 'Clean compilers docker containers and images.')
        .option('-c, --containers', 'Clean containers only.', false)
        .action(command(cleanCommand));

    program
        .command('use <version>').description('Use specified version for containers.')
        .option(...networksOption)
        .option(...compilersOption)
        .action(command(useCommand));

    program
        .command('set [network...]').description('Set network[s] options.')
        .option('-p, --port <port>', 'Host port to bound local node.')
        .option(
            '-d, --db-port <binding>',
            'Host port to bound local nodes Arango DB ("bind" to use default Arango DB port, "unbind" to unbind Arango DB port).',
        )
        .option('-n, --new-name <name>', 'Set new name for network.')
        .action(command(setCommand));

    program
        .command('add [network...]').description('Add network[s].')
        .action(command(addCommand));

    program
        .command('remove [network...]').alias('rm').description('Remove network[s].')
        .action(command(removeCommand));

    program
        .command('test [servers...]').alias('t').description('Test network[s].')
        .option('-v, --verbose', 'Show verbose test log.', false)
        .action(command(testCommand));

    program
        .command('keys').alias('k').description('Generate random Key Pair.')
        .action(command(generateKeysCommand));

    program
        .command('addr <addr>').alias('a').description('Convert address.')
        .action(command(convertAddress));

    if (USE_EXPERIMENTAL_FEATURES) {
        program
            .command('spy [networks...]').description('Run network scanner.')
            .action(command(spyCommand));

        program
            .command('web').description('Run web console.')
            .option('-p, --port <port>', 'Host port to bound web console.', '8800')
            .action(command(webConsoleCommand));

        program
            .command('trace <server>').description('Trace message.')
            .action(command(traceCommand));

    }

    program.parse(args);

    if (commandArgs.length === 0) {
        if (program.args.length === 0) {
            await infoCommand(dev, program);
        } else {
            program.outputHelp();
        }
    } else {
        if (commandAction === infoCommand) {
            const options = commandArgs[commandArgs.length - 1];
            options.available = options.parent.available;
        }
        await commandAction(dev, ...commandArgs);
    }
}

export { handleCommandLine };
