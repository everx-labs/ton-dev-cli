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

import { Dev } from "../dev";
import type { DockerContainer } from "../utils/docker";
import type { PathJoin } from "../utils/utils";
import { bindPathJoinTo, run } from "../utils/utils";
const os = require('os');

class CompilersJob {
    dev: Dev;
    container: DockerContainer;
    hostPath: PathJoin;
    guestPath: PathJoin;

    constructor(
        dev: Dev,
        container: DockerContainer,
        srcPath: PathJoin,
        dstPath: PathJoin,
    ) {
        this.dev = dev;
        this.container = container;
        this.hostPath = srcPath;
        this.guestPath = dstPath;
    }

    static async create(dev: Dev, path: string) {
        const hostPath = bindPathJoinTo(path);
        const {container, guestPath} = await dev.getCompilersMountedTo(hostPath());
        return new CompilersJob(dev, container, hostPath, guestPath);
    }

    async run(...args: string[]) {
        const container = this.container;
        if (os.platform() === 'win32') {
            return run('docker', 'exec', container.id, ...args);
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

}

export {
    CompilersJob
}
