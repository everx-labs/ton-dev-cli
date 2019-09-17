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
import {texts} from './texts';

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const version = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json')).toString()).version;

function showUsage(usage: string) {
    console.log(texts.usageHeader(version));
    console.log(usage);
}

const spawnEnv = {
    ...process.env,
};

function run(name: string, ...args: string[]): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            const spawned = spawn(name, args, { env: spawnEnv });
            const errors = [];
            const output = [];

            spawned.stdout.on('data', function (data) {
                output.push(data.toString());
            });

            spawned.stderr.on('data', (data) => {
                errors.push(data.toString());
            });

            spawned.on('error', (err) => {
                reject(err);
            });

            spawned.on('close', (code) => {
                if (code === 0) {
                    resolve(output.join(''));
                } else {
                    reject(errors.join(''));
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}

function versionToNumber(s: string): number {
    const parts = `${s || ''}`.split('.').map(x => Number.parseInt(x)).slice(0, 3);
    while (parts.length < 3) {
        parts.push(0);
    }
    return parts[0] * 1000000 + parts[1] * 1000 + parts[2];
}

function forceRmDir(dir: string) {
    fs.readdirSync(dir).forEach((item) => {
        const itemPath = path.join(dir, item);
        const stat = fs.statSync(itemPath);

        if (itemPath === "." || itemPath === "..") {
        } else if (stat.isDirectory()) {
            forceRmDir(itemPath);
        } else {
            fs.unlinkSync(itemPath);
        }
    });
    fs.rmdirSync(dir);
}

function ensureCleanDirectory(path: string) {
    if (fs.existsSync(path)) {
        forceRmDir(path);
    }
    fs.mkdirSync(path, ({ recursive: true }: any));
}


export type ArgType = {
    def: any,
    short?: string,
    valueCount?: number,
}

export type ArgTypes = {
    [string]: ArgType
}

function findOptionName(arg: string, types: ArgTypes) {
    if (arg.startsWith('--')) {
        const name = arg.substr(2);
        const optionName = Object.keys(types).find(x => x.toLowerCase() === name.toLowerCase());
        if (!optionName) {
            throw texts.invalidOption(arg);
        }
        return optionName;
    }
    if (arg.startsWith('-')) {
        const name = arg.substr(1);
        const optionEntry = Object.entries(types).find(([_, _type]) => {
            const type: ArgType = (_type: any);
            return `${type.short || ''}`.toLowerCase() === name.toLowerCase();
        });
        if (!optionEntry) {
            throw texts.invalidOption(arg);
        }
        return optionEntry[0];
    }
    return null;
}


function argsToOptions(args: string[], types: { [string]: ArgType }): any {
    const options = {
        files: [],
    };
    Object.entries(types).forEach(([name, _type]) => {
        const type: ArgType = (_type: any);
        if ((type.valueCount || 0) > 1) {
            options[name] = [];
        } else {
            options[name] = type.def;
        }
    });
    let pendingOption = null;
    args.forEach((arg) => {
        if (pendingOption) {
            const type = types[pendingOption];
            if ((type.valueCount || 0) > 1) {
                options[pendingOption].push(arg);
            } else {
                options[pendingOption] = arg;
            }
            pendingOption = null;
        } else {
            const optionName = findOptionName(arg, types);
            if (optionName) {
                const type = types[optionName];
                if ((type.valueCount || 0) > 0) {
                    pendingOption = optionName;
                } else {
                    options[optionName] = true;
                }
            } else {
                options.files.push(arg);
            }
        }
    });
    return options;
}

export type PathJoin = (...items: string[]) => string;

function join(base: string, item: string, separator: string): string {
    const baseWithSep = base.endsWith(separator);
    const itemWithSep = item.startsWith(separator);
    if (baseWithSep && itemWithSep) {
        return `${base}${item.substr(1)}`;
    }
    if (!baseWithSep && !itemWithSep) {
        return `${base}/${item}`;
    }
    return `${base}${item}`;
}

function bindPathJoinTo(base: string, separator?: string): PathJoin {
    if (separator) {
        return (...items: string[]): string => {
            let path = base;
            items.forEach(x => path = join(path, x));
            return path;
        }
    }
    return (...items: string[]): string => {
        return items.length > 0 ? path.join(base, ...items) : base;
    }
}


function inputLine(): Promise<string> {
    return new Promise((resolve) => {
        const standard_input = process.stdin;
        standard_input.setEncoding('utf-8');
        standard_input.once('data', function (data) {
            resolve(`${data}`.trim());
        });
    });
}

function breakWords(s: string): string {
    const words = s.split(' ');
    let result = '';
    let line = '';
    words.forEach((w) => {
        if (line.length + w.length > 80) {
            if (result !== '') {
                result += '\n';
            }
            result += line;
            line = '';
        }
        if (line !== '') {
            line += ' ';
        }
        line += w;
    });
    if (line !== '') {
        if (result !== '') {
            result += '\n';
        }
        result += line;
    }
    return result;
}



export {
    version,
    showUsage,
    run,
    versionToNumber,
    forceRmDir,
    ensureCleanDirectory,
    argsToOptions,
    bindPathJoinTo,
    inputLine,
    breakWords,
}
