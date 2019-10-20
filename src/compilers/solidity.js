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
import type { PathJoin } from "../utils/utils";
import { parseFileArg } from "../utils/utils";
import type { ClientCodeOptions } from "./client-code";
import { ClientCode } from "./client-code";
import { CompilersJob } from "./job";

const fs = require('fs');

export type SolidityBuildOptions = ClientCodeOptions;

type SolidityFileArg = {
    dir: PathJoin,
    name: {
        base: string,
        sol: string,
        tvc: string,
        code: string,
        abi: string,
        package: string,
        result: string,
    },
}

function parseSolidityFileArg(fileArg: string): SolidityFileArg {
    const parsed = parseFileArg(fileArg, '.sol');
    return {
        dir: parsed.dir,
        name: {
            base: parsed.base,
            sol: parsed.name,
            tvc: `${parsed.base}.tvc`,
            code: `${parsed.base}.code`,
            abi: `${parsed.base}.abi.json`,
            package: `${parsed.base}Package`,
            result: `${parsed.base}.result`,
        },
    };
}

export class Solidity {
    static async build(dev: Dev, files: string[], options: SolidityBuildOptions) {
        const sol = new Solidity(dev, files, options);
        await sol.build();
    }

    dev: Dev;
    files: string[];
    options: SolidityBuildOptions;

    constructor(dev: Dev, files: string[], options: SolidityBuildOptions) {
        this.dev = dev;
        this.files = files;
        this.options = options;
    }

    async build() {
        for (let i = 0; i < this.files.length; i += 1) {
            const file = parseSolidityFileArg(this.files[i]);
            const job = await CompilersJob.create(this.dev, file.dir());
            this.prepareBuildBatch(file, job);
            await job.run('sh', job.guestPath('job.sh'));
            this.cleanBuildResults(file, job);
            await ClientCode.generate([this.files[i]], this.options);
        }
    }

    prepareBuildBatchForFie(file: SolidityFileArg, batch: string[]) {
        const { name } = file;
        batch.push(
            `solc ${name.sol} --tvm > ${name.code}`,
            `solc ${name.sol} --tvm_abi > ${name.abi}`,
            `tvm_linker compile ${name.code} --lib /usr/bin/stdlib_sol.tvm --abi-json ${name.abi} > ${name.result}`
        );
    }

    prepareBuildBatch(file: SolidityFileArg, job: CompilersJob) {
        const batch = [];
        batch.push(`cd ${job.guestPath()}`);
        this.prepareBuildBatchForFie(file, batch);
        fs.writeFileSync(job.hostPath('job.sh'), batch.join('\n'));
    }

    cleanBuildResults(file: SolidityFileArg, job: CompilersJob) {
        const { name } = file;
        const linkerResult = fs.readFileSync(job.hostPath(name.result), { encoding: 'utf8' });
        const tvcFile = (/Saved contract to file\s*(.*\.tvc)/gi.exec(linkerResult) || [])[1];
        if (!tvcFile) {
            console.log(linkerResult);
            process.exit(1)
        }
        fs.renameSync(job.hostPath(tvcFile), job.hostPath(name.tvc));
        fs.unlinkSync(job.hostPath('job.sh'));
        fs.unlinkSync(job.hostPath(name.result));
        fs.unlinkSync(job.hostPath(name.code));
    }
}
