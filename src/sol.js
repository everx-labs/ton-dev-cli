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
import { argsToOptions, rootPath } from "./utils";
const fs = require('fs');

const solArgs = {
    javaScript: { def: false, short: 'js' },
    rust: { def: false, short: 'rs' },
};

function genJavaScriptPackage(file) {
    const imageBase64 = fs.readFileSync(rootPath(`${file}.tvc`)).toString('base64');
    const abi = fs.readFileSync(rootPath(`${file}.abi.json`)).toString().trimRight();
    const js =
`const ${file}Package = {
    abi: ${abi},
    imageBase64: '${imageBase64}'
};

module.exports = ${file}Package;
`;
    fs.writeFileSync(rootPath(`${file}Package.js`), js, { encoding: 'utf8' });
}

async function sol(args: string[]) {
    const options = argsToOptions(args, solArgs);

    const compiler = await compilers.create();
    const job = [];
    options.files.forEach((file) => {
        fs.copyFileSync(rootPath(`${file}.sol`), compiler.hostPath(`${file}.sol`));
        job.push(
            `solc ${file}.sol --tvm > ${file}.code`,
            `solc ${file}.sol --tvm_abi > ${file}.abi.json`,
            `tvm_linker compile ${file}.code --lib /usr/bin/stdlib_sol.tvm --abi-json ${file}.abi.json > ${file}.result`
        );
    });
    fs.writeFileSync(compiler.hostPath('job.sh'), job.join('\n'));
    await compiler.run('sh', './job.sh');
    options.files.forEach((file) => {
        const linkerResult = fs.readFileSync(compiler.hostPath(`${file}.result`), { encoding: 'utf8'});
        const tvcFile = (/Saved contract to file\s*(.*\.tvc)/gi.exec(linkerResult) || [])[1];
        fs.copyFileSync(compiler.hostPath(tvcFile), rootPath(`${file}.tvc`));
        fs.copyFileSync(compiler.hostPath(`${file}.abi.json`), rootPath(`${file}.abi.json`));
        if (options.javaScript) {
            genJavaScriptPackage(file);
        }
    });
}

export { sol };
