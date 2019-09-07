import config from "./config";
import { run, versionToNumber } from "./utils";

async function docker(...args) {
    return run('docker', ...args);
}

async function version() {
    return versionToNumber(/version\s+([0-9.]+)/gi.exec(await docker('-v'))[1]);
}

async function getContainers() {
    return (await docker('ps', '-a', '--format', '{{.ID}}\t{{.Image}}\t{{.Status}}\t{{.Names}}'))
        .split('\n')
        .map(x => `${x}`.trim().split('\t'))
        .filter(x => x.length === 4)
        .map(x => ({
            id: x[0],
            image: x[1],
            status: x[2],
            stopped: x[2].toLowerCase().startsWith('exited'),
            names: x[3],
        }));
}

async function start(id) {
    return docker('start', id);
}

async function exec(id, workingDirectory, ...args) {
    return docker('exec', '-u', 'root', '-w', workingDirectory, id, ...args);
}

async function inspectVolume(id) {
    return JSON.parse(await docker('volume', 'inspect', id));
}

async function createVolume(id) {
    return docker('volume', 'create', id);
}

async function inspectedOrNull(containers, name) {
    const existing = containers.find(x => x.names === name);
    if (!existing) {
        return null;
    }
    return JSON.parse(await docker('container', 'inspect', existing.id))[0] || null;
}

async function findContainers() {
    const containers = await getContainers();
    return {
        compilerKit: await inspectedOrNull(containers, config.compilerKit.container),
        localNode: await inspectedOrNull(containers, config.localNode.container)
    };
}

export default {
    version,
    containers: getContainers,
    start,
    exec,
    inspectVolume,
    createVolume,
    run: docker,
    findContainers,
}
