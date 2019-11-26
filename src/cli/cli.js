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

import {TONClient} from "ton-client-node-js";
import {ClientCode, ClientCodeLevel, JSModule} from "../compilers/client-code";
import {Solidity} from "../compilers/solidity";
import {Dev} from "../dev";
import {Network} from "../networks/networks";
import type {NetworkConfig} from "../networks/networks";
import {web} from "../server/server";
import {compilersWithNetworks} from "./options";
import type {
    CleanOptions,
    RecreateOptions,
    RestartOptions, SetNetworkOptions,
    SetupOptions, SolOptions,
    StartOptions,
    StopOptions,
    UseOptions, WebOptions,
} from "./options";

import {infoCommand} from "./info.js";
import {spy} from "./spy";

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
    console.log(keys);
}

async function convertAddress(_dev: Dev, addr) {
    const client = await TONClient.create({
        servers: ['http://localhost'],
    });
    const showBase64 = async (bounce, test, url) => {
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
            bounce ? 'bounce' : '',
            test ? 'test' : 'main',
            url ? 'url' : '',
        ]
            .filter(x => x !== '')
            .join(', ');
        console.log(`${flags} = ${converted.address}`);
    };
    await showBase64(false, false, false);
    await showBase64(false, false, true);
    await showBase64(false, true, false);
    await showBase64(false, true, true);
    await showBase64(true, false, false);
    await showBase64(true, false, true);
    await showBase64(true, true, false);
    await showBase64(true, true, true);
}

async function useCommand(dev: Dev, version: string, options: UseOptions) {
    await dev.useVersion(version, compilersWithNetworks(dev, options));
}

async function solCommand(dev: Dev, files: string[], options: SolOptions) {
    await Solidity.build(dev, files, {
        clientLanguages: (options.clientLanguages || '').split(','),
        clientLevel: options.clientLevel || ClientCodeLevel.run,
        jsModule: options.jsModule || JSModule.node,
    });
}

async function genCommand(dev: Dev, files: string[], options: SolOptions) {
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

const sharedOptions = {
    n: ['-n, --networks [names]', 'apply command to specified network[s] (names must be separated with comma)'],
    m: ['-m, --compilers', 'apply command to the compilers container'],
};

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
        .option('-a, --available', 'show available versions')
        .description('TON Labs development tools');

    program
        .command('info', {isDefault: true}).description('Show summary about dev environment')
        .option('-a, --available', 'show available versions')
        .action(command(infoCommand));

    program
        .command('sol [files...]').description('Build solidity contract[s]')
        .option(
            '-l, --client-languages <languages>',
            'generate client code for languages: "js", "rs" (multiple languages must be separated with comma)',
        )
        .option(
            '-L, --client-level <client-level>',
            'client code level: "run" to run only, "deploy" to run and deploy (includes an imageBase64 of binary contract)',
            'deploy',
        )
        .option(
            '--js-module <module-type>',
            "Java Script module type: " +
            "`node` to use with `const FooContract = require('foo`)`, " +
            "`nodeNoDefault` to use with `const {FooContract} = require('foo`)`, " +
            "`es` to use with `import FooContract from 'foo'`, " +
            "`esNoDefault` to use with `import {FooContract} from 'foo'` (`node` is a default option)",
            'node',
        )
        .action(command(solCommand));

    program
        .command('gen [files...]').description('Generate client code for contract[s]')
        .option(
            '-l, --client-languages <languages>',
            'generate client code for languages: "js", "rs" (multiple languages must be separated with comma)',
        )
        .option(
            '-L, --client-level <client-level>',
            'client code level: "run" to run only, "deploy" to run and deploy (includes an imageBase64 of binary contract)',
            'deploy',
        )
        .option(
            '--js-module <module-type>',
            "Java Script module type: " +
            "`node` to use with `const FooContract = require('foo`)`, " +
            "`nodeNoDefault` to use with `const {FooContract} = require('foo`)`, " +
            "`es` to use with `import FooContract from 'foo'`, " +
            "`esNoDefault` to use with `import {FooContract} from 'foo'` (`node` is a default option)",
            'node',
        )
        .action(command(genCommand));

    program
        .command('start').description('Start dev containers')
        .option(...sharedOptions.n)
        .option(...sharedOptions.m)
        .action(command(startCommand));

    program
        .command('stop').description('Stop dev containers')
        .option(...sharedOptions.n)
        .option(...sharedOptions.m)
        .action(command(stopCommand));

    program
        .command('restart').description('Restart dev containers')
        .option(...sharedOptions.n)
        .option(...sharedOptions.m)
        .action(command(restartCommand));

    program
        .command('recreate').description('Recreate dev containers')
        .option(...sharedOptions.n)
        .option(...sharedOptions.m)
        .action(command(recreateCommand));

    program
        .command('setup').description('Setup dev environment')
        .option(...sharedOptions.n)
        .option(...sharedOptions.m)
        .action(command(setupCommand));

    program
        .command('clean').description('Remove docker containers and images related to TON Dev')
        .option('-n, --networks', 'clean local node docker containers and images')
        .option('-m, --compilers', 'clean compilers docker containers and images')
        .option('-c, --containers', 'clean containers only', false)
        .action(command(cleanCommand));

    program
        .command('use <version>').description('Use specified version for containers')
        .option(...sharedOptions.n)
        .option(...sharedOptions.m)
        .action(command(useCommand));

    program
        .command('set [network...]').description('Set network[s] options')
        .option('-p, --port <port>', 'host port to bound local node')
        .option(
            '-d, --db-port <binding>',
            'host port to bound local nodes Arango DB ("bind" to use default Arango DB port, "unbind" to unbind Arango DB port)',
        )
        .option('-n, --new-name <name>', 'set new name for network')
        .action(command(setCommand));

    program
        .command('add [network...]').description('Add network[s]')
        .action(command(addCommand));

    program
        .command('remove [network...]').alias('rm').description('Remove network[s]')
        .action(command(removeCommand));

    program
        .command('keys').alias('k').description('Generate random Key Pair')
        .action(command(generateKeysCommand));

    program
        .command('addr <addr>').alias('a').description('Convert address')
        .action(command(convertAddress));

    if (USE_EXPERIMENTAL_FEATURES) {
        program
            .command('spy [networks...]').description('Run network scanner')
            .action(command(spyCommand));

        program
            .command('web').description('Run web console')
            .option('-p, --port <port>', 'host port to bound web console (default: 8800)', '8800')
            .action(command(webConsoleCommand));
    }

    // .command('update', `update ${dev.name} docker images`).action(action)

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

export {handleCommandLine};
