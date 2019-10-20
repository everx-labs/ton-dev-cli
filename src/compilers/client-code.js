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
    static async generate(files: string[], options: ClientCodeOptions) {
        const generateLanguage = async (
            language: ClientCodeLanguageType,
            generator: (options: ClientCodeOptions) => Promise<void>
        ) => {
            if (options.clientLanguages.find(x => x.toLowerCase() === language.toLowerCase())) {
                await generator.bind(ClientCode)(files, options);
            }
        };

        await generateLanguage(ClientCodeLanguage.js, this.generateJavaScript);
        await generateLanguage(ClientCodeLanguage.rs, this.generateRust);
    }

    static generateJavascriptVarHelp(pragma, parent, v, desc, js) {
        const jsType = {
            uint256: 'string',
        }[v.type] || v.type;

        js.push(`
     * @${pragma} {${jsType}} ${parent ? `${parent}.` : ''}${v.name}${jsType !== v.type ? ` (${v.type})` : ''}${desc ? ` ${desc}` : ''}`);
    }

    static generateJavaScriptFunctionHelp(className, f, abi, js) {
        const isConstructor = f.name === 'constructor';
        js.push(`

    /**`);
        if (isConstructor) {
            js.push(`
     * @constructor`);
        }
        if (f.inputs.length > 0) {
            const paramsName = isConstructor ? 'constructorParams' : 'input';
            js.push(`
     * @param {Object} ${paramsName}`);
            f.inputs.forEach((i) => {
                ClientCode.generateJavascriptVarHelp('param', paramsName, i, '', js);
            });
        }
        if (isConstructor && abi.data.length > 0) {
            js.push(`
     * @param {Object} initParams`);
            abi.data.forEach((i) => {
                ClientCode.generateJavascriptVarHelp('param', 'initParams', i, '', js);
            });
        }
        if (f.outputs.length > 0) {
            js.push(`
     * @return {Promise.<${className}_${f.name}>}`);
        }
        js.push(`
     */`);
    }

    static generateJavaScriptFunctionResultType(className, f, abi, js) {
        js.push(`

    /**
     * @typedef ${className}_${f.name}
     * @type {object}`);
        f.outputs.forEach((o) => {
            ClientCode.generateJavascriptVarHelp('property', '', o, '', js);
        });
        js.push(`
     */`);
    }

    static async generateJavaScript(files: string[], options: ClientCodeOptions) {
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
                const f = abi.functions.find(x => x.name === 'constructor')
                    || { name: 'constructor', inputs: [], outputs: [] };
                ClientCode.generateJavaScriptFunctionHelp(className, f, abi, js);
                const hasParams = f.inputs.length > 0;
                const hasData = abi.data.length > 0;
                js.push(`
    async deploy(${hasParams ? 'constructorParams' : ''}${hasParams && hasData ? ', ' : ''}${hasData ? 'initParams' : ''}) {
        if (!this.keys) {
            this.keys = await this.client.crypto.ed25519Keypair();
        }
        this.address = (await this.client.contracts.deploy({
            package: pkg,
            constructorParams${hasParams ? '' : ': {}'},
            initParams${hasData ? '' : ': {}'},
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
                if (f.outputs.length > 0) {
                    ClientCode.generateJavaScriptFunctionResultType(className, f, abi, js);
                }
                ClientCode.generateJavaScriptFunctionHelp(className, f, abi, js);
                js.push(`
    ${f.name}(${f.inputs.length > 0 ? 'input' : ''}) {
        return this.run('${f.name}', ${f.inputs.length > 0 ? 'input' : '{}'});
    }`);
                ClientCode.generateJavaScriptFunctionHelp(className, f, abi, js);
                js.push(`
    ${f.name}Local(${f.inputs.length > 0 ? 'input' : ''}) {
        return this.runLocal('${f.name}', ${f.inputs.length > 0 ? 'input' : '{}'});
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


    static async generateRust(files: string[], options: ClientCodeOptions) {

    }
}
