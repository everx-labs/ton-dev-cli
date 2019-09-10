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
const fs = require('fs');
const os = require('os');
const path = require('path');
import docker from "./docker";
import rootConfig from "./config";
import { ensureStartedCompilers } from "./setup";
import { ensureCleanDirectory, run } from "./utils";

const config = rootConfig.compilers;
export type CreateCompilerOptions = {
    keepContent?: boolean,
}

async function create(options?: CreateCompilerOptions) {
    const keepContent = options && options.keepContent || false;
    const containerInfo = await ensureStartedCompilers();
    const project = process.cwd().replace(/[\\/\:]/g, '_');
    const projectHostPath = `${config.mountSource}/${project}`;

    if (keepContent) {
        fs.mkdirSync(projectHostPath);
    } else {
        ensureCleanDirectory(projectHostPath);
    }

    const container = docker.getContainer(containerInfo.Id);
    function hostPath(...items: string[]) {
        return path.join(projectHostPath, ...items);
    }

    const workingDir = `${config.mountDestination}/${project}`;

    async function containerRun(...args: string[]) {
        if (os.platform() === 'win32') {
            return run('docker', 'exec', containerInfo.Id, 'sh', ...args);
        }
        return new Promise((resolve, reject) => {
            container.exec({
                Cmd: args,
                Tty: true,
                AttachStdin: true,
                AttachStdout: true,
                AttachStderr: true,
            }, (err, exec) => {
                if (err) {
                    reject(err);
                    return;
                }
                exec.start((err, stream) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    container.modem.demuxStream(stream, process.stdout, process.stderr);

                    const checkForResult = () => {
                        exec.inspect((err, data) => {
                            if (err) {
                                reject(err);
                                return;
                            }
                            if (data.Running) {
                                setTimeout(checkForResult, 10);
                            } else {
                                resolve(data);
                            }
                        });
                    };
                    checkForResult();
                });
            });
        });
    }

    return {
        workingDir,
        hostPath,
        run: containerRun,
    }
}
export default {
    create,
}
