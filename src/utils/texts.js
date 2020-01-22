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
    netsHeader: 'Local nets:',
    compilerHeader: 'Compilers:',
    availableVersions: 'Available versions:',
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
        return `Source file [${name}] not found.`;
    },
    usageHeader(version) {
        return `TON Labs Dev Tools ${version}`;
    },
    invalidOption(arg) {
        return `Invalid option: ${arg}`;
    },
    usage: `usage: tondev command { argument ... }

Options:
  -p, --port <number>   Set local port number for local net
  -n, --net <name>      Set local net name to which command applied, can be specified multiple times
  -i, --images          Apply command only to docker images
  -c, --containers      Apply command only to docker containers
  -js, --JavaScript     Generate additional JavaScript code
  
   
Commands:
  sol <files>   Build TON contract from solidity source code
  start         Start local net (if net name does not specified the all nets will be started)
  stop          Stop compilers and all nets    
  info          Show current status of compilers and nets
  setup         Looking for a required prerequisites and setup required additional components
  clean         Remove all TON Dev docker containers and images
  use <version> Select version for compilers and nets 
        
Copyright 2018-2020 TON DEV SOLUTIONS LTD.
Licensed under the SOFTWARE EVALUATION License (https://www.ton.dev/licenses)
`,
    tonDevImages() {
        return `Images:`;
    },
    tonDevContainers() {
        return `Containers:`;
    },
    netHeader(name) {
        return `${name} network/blockchain:`;
    },
    usedVersion(version) {
        return `  Used version: ${version}`;
    },
    netHostPort(port) {
        return `  Bound to host port: ${port}`;
    },
    netArangoHostPort(port) {
        return `  Arango DB is bound to host port: ${port}`;
    },
};

export { texts };
