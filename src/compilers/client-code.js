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

import { parseFileArg } from "../utils/utils";
import Handlebars from 'handlebars';
import { parseSolidityFileArg } from "./solidity";

const path = require('path');
const fs = require('fs');

type Template = {
    build: any
}

Handlebars.registerHelper('LB', () => '{');
Handlebars.registerHelper('RB', () => '}');

function compileTemplate(...pathItems: string[]): Template {
    const templatePath = path.resolve(__dirname, '..', '..', ...pathItems);
    const templateText = fs.readFileSync(templatePath, { encoding: 'utf8' });
    return {
        build: Handlebars.compile(templateText, {
            noEscape: true,
        })
    };
}

async function applyTemplate(template: Template, context: any): Promise<string> {
    return template.build(context);
}

const jsContractTemplate = compileTemplate('js-templates', 'contract.js.hbs');

export const ClientCodeLevel = {
    none: 'none',
    run: 'run',
    deploy: 'deploy'
};

export type ClientCodeLevelType = $Keys<typeof ClientCodeLevel>;

export type ClientCodeLanguageType = string;

export const JSModule = {
    node: 'node',
    nodeNoDefault: 'nodeNoDefault',
    es: 'es',
    esNoDefault: 'esNoDefault',
};

export type JSModuleType = $Keys<typeof JSModule>;

export type ClientCodeOptions = {
    clientLanguages: ClientCodeLanguageType[],
    clientLevel: ClientCodeLevelType,
    jsModule: JSModuleType,
};

export interface ClientCodeLanguage {
    name: string,
    shortName: string,
    generate: (files: string[], options: ClientCodeOptions) => Promise<void>
}

export class ClientCode {
    static languages: { [string]: ClientCodeLanguage } = {};

    static register(language: ClientCodeLanguage) {
        ClientCode.languages[language.shortName.toLowerCase()] = language;
    }

    static async generate(files: string[], options: ClientCodeOptions) {
        for (const name of options.clientLanguages) {
            const language = ClientCode.languages[name.toLocaleLowerCase()];
            if (!language) {
                throw Error(`Unknown client code language: ${name}`);
            }
            await language.generate(files, options);
        }
    }
}

const JsClientCode = {
    name: 'JavaScript',
    shortName: 'js',
    getTemplateContext(fileArg: string, options: ClientCodeOptions): any {
        const file = parseSolidityFileArg(fileArg, false);
        const { dir, name } = file;
        const readText = (name: string, encoding: 'utf8' | 'base64'): string => {
            if (!fs.existsSync(dir(name))) {
                throw new Error(`File not exists: ${name}`);
            }
            return fs.readFileSync(dir(name)).toString(encoding);
        };

        const imageBase64 = options.clientLevel === ClientCodeLevel.deploy
            ? readText(name.tvc, 'base64')
            : '';
        const abiJson = readText(name.abi, 'utf8').trimRight();
        const abi = {
            functions: [],
            data: [],
            ...JSON.parse(abiJson)
        };

        const className = `${name.base[0].toUpperCase()}${name.base.substr(1)}Contract`;
        const isDeploy = (options.clientLevel || 'deploy') === 'deploy';

        const varContext = (v) => {
            const jsType = {
                address: 'string',
                'address[]': 'string[]',
                uint256: 'string',
                uint32: 'number',
                uint16: 'number',
                uint8: 'number',
                'uint256[]': 'string[]',
                'uint32[]': 'number[]',
                'uint16[]': 'number[]',
                'uint8[]': 'number[]',
            }[v.type] || v.type;
            return {
                ...v,
                jsType,
                isSameJsType: jsType === v.type,
            }
        };

        const funContext = (f) => {
            return {
                ...f,
                hasData: false,
                hasInputsAndData: false,
                hasInputs: f.inputs.length > 0,
                hasOutputs: f.outputs.length > 0,
                inputs: f.inputs.map(varContext),
                outputs: f.outputs.map(varContext),
            }
        };

        const constructor = funContext(abi.functions.find(x => x.name === 'constructor') || {
            name: 'constructor',
            inputs: [],
            outputs: [],
            data: [],
        });
        constructor.hasData = abi.data.length > 0;
        constructor.hasInputsAndData = constructor.hasInputs && constructor.hasData;
        constructor.data = abi.data.map(varContext);

        const functions = abi.functions.filter(x => x.name !== 'constructor').map(funContext);
        return {
            imageBase64,
            abiJson,
            abi,
            className,
            isDeploy,
            constructor,
            functions,
            jsModuleNode: options.jsModule === JSModule.node || options.jsModule === JSModule.nodeNoDefault,
            jsModuleNodeDefault: options.jsModule === JSModule.node,
            jsModuleEs: options.jsModule === JSModule.es || options.jsModule === JSModule.esNoDefault,
            jsModuleEsDefault: options.jsModule === JSModule.es,
        };
    },
    async generate(files: string[], options: ClientCodeOptions) {
        for (const file of files) {
            const { dir, base } = parseFileArg(file, '.sol', false);
            const js = await applyTemplate(jsContractTemplate, JsClientCode.getTemplateContext(file, options));
            fs.writeFileSync(dir(`${base}Contract.js`), js, { encoding: 'utf8' });
        }
    }
};

ClientCode.register(JsClientCode);
