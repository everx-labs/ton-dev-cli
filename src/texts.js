const texts = {
    agreementConfirmation: `
This Agreement takes effect when you input a “YES” and press Enter 
or, if earlier, when you use any of the TON DEV Software: `,
    agreementRejected: '\n\nLicense terms were not accepted.\n',
    agreementAccepted: '\n\nLicense terms were accepted.\n',
    dockerVersionRequired: "Docker version required ^17",
    noTonDevImages: 'There are no TON Dev Images',
    noTonDevContainers: 'There are no TON Dev Containers',
    done: ' Done.',
    availableVersions(versions) {
        return `Available versions: ${versions}`;
    },
    containerDoesNotExists(name) {
        return `Container [${name}] does not exists. Creating...`;
    },
    imageDoesNotExists(name) {
        return `Image [${name}] is missing. Pulling (please wait)...`;
    },
    containerCanNotBeCreated(name) {
        return `Container [${name}] can not be created`;
    },
    containerHaveBeenRemoved(id) {
        return `Container [${id} have been removed.`;
    },
    imageHaveBeenRemoved(id) {
        return `Image [${id} have been removed.`;
    },
    sourceFileNotFound(name) {
        return `Source file [${name.sol}] not found.`;
    },
    usageHeader(version) {
        return `TON Labs Dev Tools ${version}`;
    },
    invalidOption(arg) {
        return `Invalid option: ${arg}`;
    },
    usage: `Use: tondev command { argument ... }

Commands:

setup [ -p <number> ]
    Looking for a required prerequisites and setup required TON Labs Dev Tools.
    Options:
    --port <number> or -p <number>
        Set local port number for local node. Default is 80.       
    
start
    Start local node.
     
stop
    Stop all TON Dev docker containers.
     
clean [ -i ] [-c]
    Remove all TON Dev docker containers and images.
    Options (-i and -c are mutually exclusive):
    --images or -i
        Remove only images.
    --containers or -c
        Remove only containers.
    
info
    Show current status of TON Dev images and containers.

use <version>
    Select version for local-node and compilers. 
        
sol <solidity-file-without-extension> [ -js ]
    Build TON contract from solidity source code.
    Options:
    --javascript or -js
        Generate JavaScript file with contract package (imageBase64 and ABI).
        

Copyright 2018-2019 TON DEV SOLUTIONS LTD.
Licensed under the SOFTWARE EVALUATION License (https://www.ton.dev/licenses)
`,
    tonDevImages() {
        return `Images:`;
    },
    tonDevContainers() {
        return `Containers:`;
    },
    usedVersion(version) {
        return `Used version: ${version}`;
    },
    localNodeBoundToPort(port) {
        return `Local Node is bound to port: ${port}`;
    }
};

export { texts };
