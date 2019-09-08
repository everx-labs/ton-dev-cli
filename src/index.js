#!/usr/bin/env node

import { showUsage } from './utils';
import { setup } from './setup';
import { sol } from './sol';

const usage = `Use: tondev command { argument ... }
command:
    setup - looking for a required prerequisites and setup required TON Labs tools
    sol - compile TON contracts from solidity source code
`;

async function main() {
    const commands = {
        setup,
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
        console.error(error.toString());
        process.exit(1);
    }
})();
