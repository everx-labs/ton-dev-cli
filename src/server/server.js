/*
 * Copyright 2018-2020 TON DEV SOLUTIONS LTD.
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

import type { WebOptions } from "../cli/options";
import { Dev } from "../dev";
import { inputLine } from "../utils/utils";

const express = require('express');
const cors = require('cors');
import Handlebars from 'handlebars';

const path = require('path');
const fs = require('fs');

function applyTemplate(name: string, context: any): Promise<string> {
    const templatePath = path.resolve(__dirname, '..', '..', 'src', 'server', 'templates', `${name}.hbs`);
    const templateText = fs.readFileSync(templatePath, { encoding: 'utf8' });
    const template = Handlebars.compile(templateText, {
        noEscape: true,
    });
    return template(context);
}

export class TONDevWebConsole {
    dev: Dev;
    options: WebOptions;

    constructor(dev: Dev, options: WebOptions) {
        this.dev = dev;
        this.options = options;
    }

    start() {
        const app = express();
        app.use(express.json());
        app.use(cors());
        app.get('/', this.main.bind(this));
        app.listen({ port: this.options.port }, () => {
            const uri = `http://localhost:${this.options.port}`;
            console.debug(`TON Dev Web Console started on ${uri}`);
        });
    }

    async main(req: any, res: any) {
        try {
            await res.send(applyTemplate('main', this.dev));
            res.end();
        } catch (error) {
            console.log('[Web Console] request failed', error);
            await res.json({
                jsonrpc: '2.0',
                id: 1,
                error: {
                    code: Number.parseInt(error && error.code) || 1,
                    message: error.message || error.toString(),
                    data: error
                }
            });
        }
    }
}

export async function web(dev: Dev, options: WebOptions) {
    const server = new TONDevWebConsole(dev, options);
    server.start();
    return inputLine();
}
