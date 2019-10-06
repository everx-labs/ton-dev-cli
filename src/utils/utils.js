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
import { texts } from './texts';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');
const version = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'package.json')).toString()).version;

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
        const sep = separator;
        return (...items: string[]): string => {
            let path = base;
            items.forEach(x => path = join(path, x, sep));
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


const https = require('https');

function httpsGetJson(url: string): Promise<any> {
    return new Promise<*[]>((resolve, reject) => {
        const tryUrl = (url) => {
            https.get(url, function (res) {
                let body = '';

                res.on('data', function (chunk) {
                    body += chunk;
                });

                res.on('end', function () {
                    if (res.statusCode === 301) {
                        const redirectUrl = res.headers['location'];
                        tryUrl(redirectUrl);
                        return;
                    }
                    const response = JSON.parse(body);
                    resolve(response);
                });
            }).on('error', (error) => {
                reject(error);
            });
        };
        tryUrl(url);
    })
}

function toIdentifier(s: string): string {
    let identifier = '';
    for (let i = 0; i < s.length; i += 1) {
        const c = s[i];
        const isLetter = c.toLowerCase() !== c.toUpperCase();
        const isDigit = !isLetter && '0123456789'.includes(c);
        if (isLetter || isDigit) {
            identifier += c;
        }
    }
    return identifier;
}

const userIdentifier = toIdentifier(os.userInfo().username).toLowerCase();
const tonlabsHomePath = bindPathJoinTo(path.join(os.homedir(), '.tonlabs'));

let _progressLine: string = '';

function progressLine(line: string) {
    process.stdout.write(`\r${line}`);
    const extra = _progressLine.length - line.length;
    if (extra > 0) {
        process.stdout.write(' '.repeat(extra) + '\b'.repeat(extra));
    }
    _progressLine = line;
}

function progress(info: string) {
    progressLine(`${info}...`);
}

function progressDone() {
    console.log(' ✓');
    _progressLine = '';
}

export type FileArg = {
    dir: PathJoin,
    base: string,
    name: string
}

function parseFileArg(fileArg: string, ext: string): FileArg {
    if (os.platform() === 'darwin' && fileArg.startsWith('~/')) {
        fileArg = path.join(os.homedir(), fileArg.substr(2));
    }
    const filePath = path.resolve(fileArg);
    const dir = bindPathJoinTo(path.dirname(filePath));
    const base = path.basename(filePath, ext);
    const name = base.includes('.') ? base : `${base}${ext}`;
    const result = {
        dir,
        base,
        name
    };
    if (!fs.existsSync(result.dir(name))) {
        console.error(texts.sourceFileNotFound(name));
        process.exit(1);
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
    bindPathJoinTo,
    inputLine,
    breakWords,
    httpsGetJson,
    toIdentifier,
    userIdentifier,
    tonlabsHomePath,
    progress,
    progressLine,
    progressDone,
    parseFileArg,
}
