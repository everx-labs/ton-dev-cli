import docker from "./docker";
import config from './config';
const fs = require('fs');

async function checkRequiredSoftware() {
    const version = await docker.version();
    if (version < 17_000_000) {
        throw "Docker version required ^17";
    }
}

async function createMissingContainers() {
    const containers = await docker.findContainers();
    if (!containers.compilerKit) {
        if (!fs.existsSync(config.compilerKit.mountSource)) {
            fs.mkdirSync(config.compilerKit.mountSource, { recursive: true });
        }
        process.stdout.write(`Container [${config.compilerKit.container}] does not exists...`);
        await docker.run('create',
            '-it',
            '--name', config.compilerKit.container,
            '-u', 'root',
            '--entrypoint', '/bin/bash',
            '--mount', `type=bind,src=${config.compilerKit.mountSource},dst=${config.compilerKit.mountDestination}`,
            config.compilerKit.image);
        console.log('created.');
    }
    if (!containers.localNode) {
        process.stdout.write(`Container [${config.localNode.container}] does not exists...`);
        await docker.run('create',
            '-i',
            '--name', config.localNode.container,
            '-p80:80',
            config.localNode.image);
        console.log('created.');
    }
}

async function startStoppedContainers() {
    const containers = await docker.findContainers();
    if (!containers.compilerKit.State.Running) {
        await docker.start(containers.compilerKit.Id);
        console.log(`Container [${config.compilerKit.container}] have been started.`);
    }
    if (!containers.localNode.State.Running) {
        await docker.start(containers.localNode.Id);
        console.log(`Container [${config.localNode.container}] have been started.`);
    }
}

async function setup() {
    await checkRequiredSoftware();
    await createMissingContainers();
    await startStoppedContainers();
}

export {setup};
