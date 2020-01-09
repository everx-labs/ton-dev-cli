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

//TODO: import { TONClient } from "ton-client-node-js";
import { Dev } from "../dev";
import { Network } from "../networks/networks";
import { texts } from "../utils/texts";
import { inputLine, version } from "../utils/utils";

async function createClient(netAddress: string) {
    return {};
    //TODO: return TONClient.create({
    //     servers: [netAddress]
    // });
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

async function spy(dev: Dev, names: string[]) {
    console.log(texts.usageHeader(version));
    await Promise.all(dev.networks.map(async (net: Network) => {
        const netAddress = `http://0.0.0.0:${net.hostPort || '80'}`;
        console.log(`Spy for ${net.name} at ${netAddress}`);
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
