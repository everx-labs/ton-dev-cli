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

const presets = [
	["@babel/preset-env"],
	["@babel/preset-flow"],
];
const plugins = [
	["@babel/plugin-proposal-class-properties"],
	["@babel/plugin-proposal-do-expressions"],
	["@babel/plugin-proposal-export-default-from"],
	["@babel/plugin-proposal-export-namespace-from"],
	["@babel/plugin-proposal-function-bind"],
	["@babel/plugin-proposal-function-sent"],
	["@babel/plugin-proposal-json-strings"],
	["@babel/plugin-proposal-logical-assignment-operators"],
	["@babel/plugin-proposal-nullish-coalescing-operator"],
	["@babel/plugin-proposal-numeric-separator"],
	["@babel/plugin-proposal-optional-chaining"],
	["@babel/plugin-proposal-throw-expressions"],
	["@babel/plugin-syntax-bigint"],
	["@babel/plugin-syntax-dynamic-import"],
	["@babel/plugin-syntax-import-meta"],
	["@babel/plugin-transform-arrow-functions"],
	["@babel/plugin-transform-async-to-generator"],
	["@babel/plugin-transform-block-scoping"],
	["@babel/plugin-transform-classes"],
	["@babel/plugin-transform-runtime"],
];

module.exports = {presets, plugins};
