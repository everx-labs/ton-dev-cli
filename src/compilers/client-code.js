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

import { parseFileArg } from "../utils/utils";
import { CompilersJob } from "./job";

const fs = require('fs');

export const ClientCodeLevel = {
    none: 'none',
    run: 'run',
    deploy: 'deploy'
};

export type ClientCodeLevelType = $Keys<typeof ClientCodeLevel>;

export const ClientCodeLanguage = {
    js: 'js',
    rs: 'rs',
};

export type ClientCodeLanguageType = $Keys<typeof ClientCodeLanguage>;

export type ClientCodeOptions = {
    clientLanguages: ClientCodeLanguageType[],
    clientLevel: ClientCodeLevelType,
};


export class ClientCode {
    static async generate(job = CompilersJob, files: string[], options: ClientCodeOptions) {
        const generateLanguage = async (
            language: ClientCodeLanguageType,
            generator: (job: CompilersJob, options: ClientCodeOptions) => Promise<void>
        ) => {
            if (options.clientLanguages.find(x => x.toLowerCase() === language.toLowerCase())) {
                await generator.bind(ClientCode)(job, files, options);
            }
        };

        await generateLanguage(ClientCodeLanguage.js, this.generateJavaScript);
        await generateLanguage(ClientCodeLanguage.rs, this.generateRust);
    }


    static generateJavaScriptFunctionHelp(f, js) {
        js.push(`

    /*`);
        if (f.name === 'constructor') {
            js.push(`
     * @constructor`);
        }
        js.push(`
     * @param {Object} input`);
        f.inputs.forEach((i) => {
            js.push(`
     * @param {${i.type}} input.${i.name}`)
        });
        js.push(`
     * @returns {Object}`);
        f.outputs.forEach((o) => {
            js.push(`
     * @returns {${o.type}} ${o.name}`)
        });
        js.push(`
     */`);
    }

    static async generateJavaScript(job: CompilersJob, files: string[], options: ClientCodeOptions) {
        files.forEach((file) => {
            const { dir, base } = parseFileArg(file, '.sol');
            const imageBase64 = options.clientLevel === ClientCodeLevel.deploy
                ? fs.readFileSync(dir(`${base}.tvc`)).toString('base64')
                : '';
            const abiJson = fs.readFileSync(dir(`${base}.abi.json`)).toString().trimRight();
            const abi = JSON.parse(abiJson);
            const className = `${base[0].toUpperCase()}${base.substr(1)}Contract`;
            const isDeploy = (options.clientLevel || 'deploy') === 'deploy';
            const js: string[] = [];
            js.push(`
//
// This file was generated using TON Labs developer tools.
//
 
const abi = ${abiJson};

const pkg = {
    abi,
    imageBase64: '${imageBase64}',
};

class ${className} {
    constructor(client, address, keys) {
        this.client = client;
        this.address = address;
        this.keys = keys;
        this.package = pkg;
        this.abi = abi;
    }`);
            if (isDeploy) {
                const f = abi.functions.find(x => x.name === 'constructor');
                if (f) {
                    ClientCode.generateJavaScriptFunctionHelp(f, js);
                }
                js.push(`
    async deploy(constructorParams) {
        if (!this.keys) {
            this.keys = await this.client.crypto.ed25519Keypair();
        }
        this.address = (await this.client.contracts.deploy({
            package: pkg,
            constructorParams,
            keyPair: this.keys,
        })).address;
    }`);
            }
            js.push(`

    async run(functionName, input) {
        const result = await this.client.contracts.run({
            address: this.address,
            functionName,
            abi,
            input,
            keyPair: this.keys,
        });
        return result.output;
    }    

    async runLocal(functionName, input) {
        const result = await this.client.contracts.runLocal({
            address: this.address,
            functionName,
            abi,
            input,
            keyPair: this.keys,
        });
        return result.output;
    }`);
            abi.functions.forEach((f) => {
                if (f.name === 'constructor') {
                    return;
                }
                ClientCode.generateJavaScriptFunctionHelp(f, js);
                js.push(`
    ${f.name}(input) {
        return this.run('${f.name}', input);
    }`);
            });

            js.push(`
}

${className}.package = pkg;

module.exports = ${className};
`);
            fs.writeFileSync(dir(`${base}Contract.js`), js.join(''), { encoding: 'utf8' });
        });
    }


    static async generateRust(job: CompilersJob, files: string[], options: ClientCodeOptions) {

    }
}
