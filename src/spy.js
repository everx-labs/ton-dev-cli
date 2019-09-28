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

import { TONClient } from "ton-client-node-js";
import type { NetConfig } from "./config";
import { netsFromArgsOrDefault } from "./config";
import { texts } from "./texts";
import { inputLine, version } from "./utils";

import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import {qClientScheme} from './q-client-scheme';

async function createClient(netAddress: string) {
    const client = new TONClient();
    client.config.setData({
        defaultWorkchain: 0,
        servers: [],
        requestsServer: netAddress,
        queriesServer: 'http://0.0.0.0:4000/graphql'
    });


    qClientScheme.data.__schema.types = qClientScheme.data.__schema.types.filter(type => type.possibleTypes !== null);
    const introspectionQueryResultData = qClientScheme.data;
    const fragmentMatcher = new IntrospectionFragmentMatcher({
        introspectionQueryResultData
    });
console.log('>>>', fragmentMatcher);
    await client.setup();
    client.queries.client.setLocalStateFragmentMatcher(fragmentMatcher);
    return client;
}

const transactionProjection = `
    id
    account_addr
    in_message {
      header {
        ...on MessageHeaderExtOutMsgInfoVariant {
          ExtOutMsgInfo {
            dst {
              ...on MsgAddressExtAddrNoneVariant { AddrNone { None } }
              ...on MsgAddressExtAddrExternVariant { AddrExtern { AddrExtern } }
            }
          }
        }
        ...on MessageHeaderExtInMsgInfoVariant {
          ExtInMsgInfo {
            src {
              ...on MsgAddressExtAddrExternVariant { AddrExtern { AddrExtern } }
              ...on MsgAddressExtAddrNoneVariant { AddrNone { None } }
            }
          }
        }
        ...on MessageHeaderIntMsgInfoVariant {
          IntMsgInfo {
            value { Grams }
            src {
              ...on MsgAddressIntAddrVarVariant { AddrVar { address } }
              ...on MsgAddressIntAddrStdVariant { AddrStd { address } }
              ...on MsgAddressIntAddrNoneVariant { AddrNone { None } }
            }
          }
        }
      }
    }
`;

async function spy() {
    console.log(texts.usageHeader(version));
    await Promise.all(netsFromArgsOrDefault().map(async (net: NetConfig) => {
        const netAddress = `http://0.0.0.0:${net.preferences.hostPort || '80'}`;
        console.log(`Spy for ${net.preferences.name} at ${netAddress}`);
        const localNet = await createClient(netAddress);
        const accounts = await localNet.queries.accounts.query({}, 'id', [{ path: 'id', direction: 'ASC' }], 11);
        console.log('Accounts:');
        accounts.slice(0, 10).forEach(x => console.log(`  ${x.id}`));
        if (accounts.length > 10) {
            console.log('  and more...');
        }
        console.log('');
        console.log('Looking for transactions and more... Press [Enter] to stop...');
        localNet.queries.transactions.subscribe({}, transactionProjection, (e, tr) => {
            console.log('TRX:', tr.id);
            const msg = tr.in_message;
            const intMsg = msg.header.IntMsgInfo;
            if (intMsg) {
                console.log('    ', `${tr.account_addr} <- ${intMsg.value.Grams} <- ${intMsg.src.AddrStd.address}`);
            } else {
                console.log('    ', `${tr.account_addr} <- EXT`);
            }
        });
        localNet.queries.accounts.subscribe({}, 'id', (e, d) => {
            console.log('ACC:', d.id);
        });
    }));

    await inputLine();
}


export { spy };
