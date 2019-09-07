const fs = require('fs');
const path = require('path');
import docker from "./docker";
import rootConfig from "./config";
import { ensureCleanDirectory } from "./utils";

const config = rootConfig.compilerKit;

async function create(options) {
    const keepContent = options && options.keepContent || false;
    const container = (await docker.findContainers()).compilerKit;
    if (!container) {
        throw `Docker container [${config.container}] does not found`;
    }
    if (container.stopped) {
        await docker.start(container.Id);
    }
    const project = process.cwd().split(path.delimiter).map(x => x.split(path.sep).join('_')).join('_');
    const projectHostPath = `${config.mountSource}/${project}`;

    if (keepContent) {
        fs.mkdirSync(projectHostPath);
    } else {
        ensureCleanDirectory(projectHostPath);
    }

    function hostPath(...items) {
        return path.join(projectHostPath, ...items);
    }

    async function run(...args) {
        return docker.exec(container.Id, `${config.mountDestination}/${project}`, ...args);
    }

    return {
        hostPath,
        run
    }
}
export default {
    create,
}
