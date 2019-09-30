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

import { ClientCodeLevel } from "../compilers/client-code";
import { Solidity } from "../compilers/solidity";
import { Dev } from "../dev";
import type { SetNetworkOptions } from "../networks/networks";
import { compilersWithNetworks } from "./options";
import type {
    CleanOptions,
    RecreateOptions,
    RestartOptions,
    SetupOptions, SolOptions,
    StartOptions,
    StopOptions,
    UseOptions
} from "./options";

import { infoCommand } from "./info.js";
import { spy } from "./spy";

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
    await dev.clean(compilersWithNetworks(dev, options));
}

async function setCommand(dev: Dev, names: string[], options: SetNetworkOptions) {
    await dev.setNetworksOptions(names, options);
}

async function useCommand(dev: Dev, version: string, options: UseOptions) {
    await dev.useVersion(version, compilersWithNetworks(dev, options));
}

async function solCommand(dev: Dev, files: string[], options: SolOptions) {
    await Solidity.build(dev, files, {
        clientLanguages: (options.clientLanguages || '').split(','),
        clientLevel: options.clientLevel || ClientCodeLevel.run,
    });
}

async function spyCommand(dev: Dev, networks: string[]) {
    await spy(dev, networks);
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
        .command('info').description('Show summary about dev environment')
        .option('-a, --available', 'show available versions')
        .action(command(infoCommand));

    program
        .command('setup').description('Setup dev environment')
        .option(...sharedOptions.n)
        .option(...sharedOptions.m)
        .action(command(setupCommand));

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
        .command('clean').description('Remove dev containers and images')
        .option(...sharedOptions.n)
        .option(...sharedOptions.m)
        .action(command(cleanCommand));

    program
        .command('use <version>').description('Use specified version for containers')
        .option(...sharedOptions.n)
        .option(...sharedOptions.m)
        .action(command(useCommand));

    program
        .command('set [network...]').description('Set network[s] options')
        .option('-p, --port <port>', 'host port to bound local node')
        .option('-d, --db-port <binding>', 'host port to bound local nodes DB ("bind" to use default DB port, "unbind" to unbind DB port)')
        .action(command(setCommand));

    program
        .command('sol [files...]').description('Build solidity contract[s]')
        .option('-l, --client-languages <languages>', 'generate client code for languages: "js", "rs" (multiple languages must be separated with comma)')
        .option('-L, --client-level <client-level>', 'client code level: "run" to run only, "deploy" to run and deploy (includes an imageBase64 of binary contract)')
        .action(command(solCommand));

    program
        .command('spy [networks...]').description('Run network scanner')
        .action(command(spyCommand));

    // .command('update', `update ${dev.name} docker images`).action(action)

    program.parse(args);

    if (commandArgs.length === 0) {
        if (program.args.length === 0) {
            await infoCommand(dev, program);
        } else {
            program.outputHelp();
        }
    } else {
        await commandAction(...[dev, ...commandArgs]);
    }
}

export { handleCommandLine };
