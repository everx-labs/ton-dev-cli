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

import { ClientCode } from "./client-code";
import type { ClientCodeGenerationOptions, ClientCodeLanguageType } from "./client-code";
import { Compilers } from "./compilers";
import { CompilersJob } from "./job";

export type BuildOptions = {
    files: string[],
    clientCode: {
        [ClientCodeLanguageType]: ClientCodeGenerationOptions,
    }
};

export class LLVMC {
    static async build(compilers: Compilers, options: BuildOptions) {
        const job = CompilersJob.create(compilers, {
            keepContent: false,
        });

        await ClientCode.generate(job, options.clientCode);
    }
}
