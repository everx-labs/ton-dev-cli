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
import compilers from "./compilers";
import {texts} from './texts';
import { argsToOptions, bindPathJoinTo } from "./utils";

const os = require('os');
const fs = require('fs');
const path = require('path');

const solArgs = {
    javaScript: { def: false, short: 'js' },
    rust: { def: false, short: 'rs' },
};

function parseFileArg(fileArg) {
    if (os.platform() === 'darwin' && fileArg.startsWith('~/')) {
        fileArg = path.join(os.homedir(), fileArg.substr(2));
    }
    const filePath = path.resolve(fileArg);
    const dir = bindPathJoinTo(path.dirname(filePath));
    let base = path.basename(filePath, '.sol');
    const result = {
        dir,
        name: {
            base,
            sol: `${base}.sol`,
            tvc: `${base}.tvc`,
            code: `${base}.code`,
            abi: `${base}.abi.json`,
            package: `${base}Package`,
            result: `${base}.result`,
        },
    };
    if (!fs.existsSync(result.dir(result.name.sol))) {
        console.error(texts.sourceFileNotFound(result.name.sol));
        process.exit(1);
    }
    return result;
}

function genJavaScriptPackage(fileArg) {
    const {dir, name} = parseFileArg(fileArg);
    const imageBase64 = fs.readFileSync(dir(name.tvc)).toString('base64');
    const abi = fs.readFileSync(dir(name.abi)).toString().trimRight();
    const js =
        `const ${name.package} = {
    abi: ${abi},
    imageBase64: '${imageBase64}'
};

module.exports = ${name.package};
`;
    fs.writeFileSync(dir(`${name.package}.js`), js, { encoding: 'utf8' });
}

function prepareBuildJobForFie(file, job, options, srcJobPath) {
    const { dir, name } = parseFileArg(file);
    fs.copyFileSync(dir(name.sol), srcJobPath(name.sol));
    job.push(
        `solc ${name.sol} --tvm > ${name.code}`,
        `solc ${name.sol} --tvm_abi > ${name.abi}`,
        `tvm_linker compile ${name.code} --lib /usr/bin/stdlib_sol.tvm --abi-json ${name.abi} > ${name.result}`
    );
}

function prepareBuildJob(options, srcJobPath, dstJobPath) {
    const job = [];
    job.push(`cd ${dstJobPath()}`);
    options.files.forEach(file => prepareBuildJobForFie(file, job, options, srcJobPath));
    fs.writeFileSync(srcJobPath('job.sh'), job.join('\n'));
}

function completeBuild(options, srcJobPath) {
    options.files.forEach((fileArg) => {
        const {dir, name} = parseFileArg(fileArg);
        const linkerResult = fs.readFileSync(srcJobPath(name.result), { encoding: 'utf8' });
        const tvcFile = (/Saved contract to file\s*(.*\.tvc)/gi.exec(linkerResult) || [])[1];
        if (tvcFile) {
            fs.copyFileSync(srcJobPath(tvcFile), dir(name.tvc));
            fs.copyFileSync(srcJobPath(name.abi), dir(name.abi));
            if (options.javaScript) {
                genJavaScriptPackage(fileArg);
            }
        } else {
            console.log(linkerResult);
            process.exit()
        }
    });
}

async function sol(args: string[]) {
    const options = argsToOptions(args, solArgs);
    const compiler = await compilers.create();
    prepareBuildJob(options, compiler.srcJobPath, compiler.dstJobPath);
    await compiler.run('sh', `${compiler.dstJobPath()}/job.sh`);
    completeBuild(options, compiler.srcJobPath);
}

export { sol };
