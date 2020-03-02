"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spy = spy;

var _dev = require("../dev");

var _networks = require("../networks/networks");

var _texts = require("../utils/texts");

var _utils = require("../utils/utils");

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
//TODO: import { TONClient } from "ton-client-node-js";
async function createClient(netAddress) {
  return {}; //TODO: return TONClient.create({
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

async function spy(dev, names) {
  console.log(_texts.texts.usageHeader(_utils.version));
  await Promise.all(dev.networks.map(async net => {
    const netAddress = `http://0.0.0.0:${net.hostPort || '80'}`;
    console.log(`Spy for ${net.name} at ${netAddress}`);
    const localNet = await createClient(netAddress);
    const accounts = await localNet.queries.accounts.query({}, 'id', [{
      path: 'id',
      direction: 'ASC'
    }], 11);
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
  await (0, _utils.inputLine)();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvc3B5LmpzIl0sIm5hbWVzIjpbImNyZWF0ZUNsaWVudCIsIm5ldEFkZHJlc3MiLCJ0cmFuc2FjdGlvblByb2plY3Rpb24iLCJzcHkiLCJkZXYiLCJuYW1lcyIsImNvbnNvbGUiLCJsb2ciLCJ0ZXh0cyIsInVzYWdlSGVhZGVyIiwidmVyc2lvbiIsIlByb21pc2UiLCJhbGwiLCJuZXR3b3JrcyIsIm1hcCIsIm5ldCIsImhvc3RQb3J0IiwibmFtZSIsImxvY2FsTmV0IiwiYWNjb3VudHMiLCJxdWVyaWVzIiwicXVlcnkiLCJwYXRoIiwiZGlyZWN0aW9uIiwic2xpY2UiLCJmb3JFYWNoIiwieCIsImlkIiwibGVuZ3RoIiwidHJhbnNhY3Rpb25zIiwic3Vic2NyaWJlIiwiZSIsInRyIiwibXNnIiwiaW5fbWVzc2FnZSIsImludE1zZyIsImhlYWRlciIsIkludE1zZ0luZm8iLCJhY2NvdW50X2FkZHIiLCJ2YWx1ZSIsIkdyYW1zIiwic3JjIiwiQWRkclN0ZCIsImFkZHJlc3MiLCJkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBaUJBOztBQUNBOztBQUNBOztBQUNBOztBQXBCQTs7Ozs7Ozs7Ozs7Ozs7QUFnQkE7QUFNQSxlQUFlQSxZQUFmLENBQTRCQyxVQUE1QixFQUFnRDtBQUM1QyxTQUFPLEVBQVAsQ0FENEMsQ0FFNUM7QUFDQTtBQUNBO0FBQ0g7O0FBRUQsTUFBTUMscUJBQXFCLEdBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQUEvQjs7QUFtQ0EsZUFBZUMsR0FBZixDQUFtQkMsR0FBbkIsRUFBNkJDLEtBQTdCLEVBQThDO0FBQzFDQyxFQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsYUFBTUMsV0FBTixDQUFrQkMsY0FBbEIsQ0FBWjtBQUNBLFFBQU1DLE9BQU8sQ0FBQ0MsR0FBUixDQUFZUixHQUFHLENBQUNTLFFBQUosQ0FBYUMsR0FBYixDQUFpQixNQUFPQyxHQUFQLElBQXdCO0FBQ3ZELFVBQU1kLFVBQVUsR0FBSSxrQkFBaUJjLEdBQUcsQ0FBQ0MsUUFBSixJQUFnQixJQUFLLEVBQTFEO0FBQ0FWLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFhLFdBQVVRLEdBQUcsQ0FBQ0UsSUFBSyxPQUFNaEIsVUFBVyxFQUFqRDtBQUNBLFVBQU1pQixRQUFRLEdBQUcsTUFBTWxCLFlBQVksQ0FBQ0MsVUFBRCxDQUFuQztBQUNBLFVBQU1rQixRQUFRLEdBQUcsTUFBTUQsUUFBUSxDQUFDRSxPQUFULENBQWlCRCxRQUFqQixDQUEwQkUsS0FBMUIsQ0FBZ0MsRUFBaEMsRUFBb0MsSUFBcEMsRUFBMEMsQ0FBQztBQUFFQyxNQUFBQSxJQUFJLEVBQUUsSUFBUjtBQUFjQyxNQUFBQSxTQUFTLEVBQUU7QUFBekIsS0FBRCxDQUExQyxFQUE4RSxFQUE5RSxDQUF2QjtBQUNBakIsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksV0FBWjtBQUNBWSxJQUFBQSxRQUFRLENBQUNLLEtBQVQsQ0FBZSxDQUFmLEVBQWtCLEVBQWxCLEVBQXNCQyxPQUF0QixDQUE4QkMsQ0FBQyxJQUFJcEIsT0FBTyxDQUFDQyxHQUFSLENBQWEsS0FBSW1CLENBQUMsQ0FBQ0MsRUFBRyxFQUF0QixDQUFuQzs7QUFDQSxRQUFJUixRQUFRLENBQUNTLE1BQVQsR0FBa0IsRUFBdEIsRUFBMEI7QUFDdEJ0QixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxlQUFaO0FBQ0g7O0FBQ0RELElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEVBQVo7QUFDQUQsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksK0RBQVo7QUFDQVcsSUFBQUEsUUFBUSxDQUFDRSxPQUFULENBQWlCUyxZQUFqQixDQUE4QkMsU0FBOUIsQ0FBd0MsRUFBeEMsRUFBNEM1QixxQkFBNUMsRUFBbUUsQ0FBQzZCLENBQUQsRUFBSUMsRUFBSixLQUFXO0FBQzFFMUIsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksTUFBWixFQUFvQnlCLEVBQUUsQ0FBQ0wsRUFBdkI7QUFDQSxZQUFNTSxHQUFHLEdBQUdELEVBQUUsQ0FBQ0UsVUFBZjtBQUNBLFlBQU1DLE1BQU0sR0FBR0YsR0FBRyxDQUFDRyxNQUFKLENBQVdDLFVBQTFCOztBQUNBLFVBQUlGLE1BQUosRUFBWTtBQUNSN0IsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksTUFBWixFQUFxQixHQUFFeUIsRUFBRSxDQUFDTSxZQUFhLE9BQU1ILE1BQU0sQ0FBQ0ksS0FBUCxDQUFhQyxLQUFNLE9BQU1MLE1BQU0sQ0FBQ00sR0FBUCxDQUFXQyxPQUFYLENBQW1CQyxPQUFRLEVBQWpHO0FBQ0gsT0FGRCxNQUVPO0FBQ0hyQyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxNQUFaLEVBQXFCLEdBQUV5QixFQUFFLENBQUNNLFlBQWEsU0FBdkM7QUFDSDtBQUNKLEtBVEQ7QUFVQXBCLElBQUFBLFFBQVEsQ0FBQ0UsT0FBVCxDQUFpQkQsUUFBakIsQ0FBMEJXLFNBQTFCLENBQW9DLEVBQXBDLEVBQXdDLElBQXhDLEVBQThDLENBQUNDLENBQUQsRUFBSWEsQ0FBSixLQUFVO0FBQ3BEdEMsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksTUFBWixFQUFvQnFDLENBQUMsQ0FBQ2pCLEVBQXRCO0FBQ0gsS0FGRDtBQUdILEdBekJpQixDQUFaLENBQU47QUEyQkEsUUFBTSx1QkFBTjtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMjAgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuLy8gQGZsb3dcblxuLy9UT0RPOiBpbXBvcnQgeyBUT05DbGllbnQgfSBmcm9tIFwidG9uLWNsaWVudC1ub2RlLWpzXCI7XG5pbXBvcnQgeyBEZXYgfSBmcm9tIFwiLi4vZGV2XCI7XG5pbXBvcnQgeyBOZXR3b3JrIH0gZnJvbSBcIi4uL25ldHdvcmtzL25ldHdvcmtzXCI7XG5pbXBvcnQgeyB0ZXh0cyB9IGZyb20gXCIuLi91dGlscy90ZXh0c1wiO1xuaW1wb3J0IHsgaW5wdXRMaW5lLCB2ZXJzaW9uIH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxzXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUNsaWVudChuZXRBZGRyZXNzOiBzdHJpbmcpIHtcbiAgICByZXR1cm4ge307XG4gICAgLy9UT0RPOiByZXR1cm4gVE9OQ2xpZW50LmNyZWF0ZSh7XG4gICAgLy8gICAgIHNlcnZlcnM6IFtuZXRBZGRyZXNzXVxuICAgIC8vIH0pO1xufVxuXG5jb25zdCB0cmFuc2FjdGlvblByb2plY3Rpb24gPSBgXG4gICAgaWRcbiAgICBhY2NvdW50X2FkZHJcbiAgICBpbl9tZXNzYWdlIHtcbiAgICAgIGhlYWRlciB7XG4gICAgICAgIC4uLm9uIE1lc3NhZ2VIZWFkZXJFeHRPdXRNc2dJbmZvVmFyaWFudCB7XG4gICAgICAgICAgRXh0T3V0TXNnSW5mbyB7XG4gICAgICAgICAgICBkc3Qge1xuICAgICAgICAgICAgICAuLi5vbiBNc2dBZGRyZXNzRXh0QWRkck5vbmVWYXJpYW50IHsgQWRkck5vbmUgeyBOb25lIH0gfVxuICAgICAgICAgICAgICAuLi5vbiBNc2dBZGRyZXNzRXh0QWRkckV4dGVyblZhcmlhbnQgeyBBZGRyRXh0ZXJuIHsgQWRkckV4dGVybiB9IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLi4ub24gTWVzc2FnZUhlYWRlckV4dEluTXNnSW5mb1ZhcmlhbnQge1xuICAgICAgICAgIEV4dEluTXNnSW5mbyB7XG4gICAgICAgICAgICBzcmMge1xuICAgICAgICAgICAgICAuLi5vbiBNc2dBZGRyZXNzRXh0QWRkckV4dGVyblZhcmlhbnQgeyBBZGRyRXh0ZXJuIHsgQWRkckV4dGVybiB9IH1cbiAgICAgICAgICAgICAgLi4ub24gTXNnQWRkcmVzc0V4dEFkZHJOb25lVmFyaWFudCB7IEFkZHJOb25lIHsgTm9uZSB9IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLi4ub24gTWVzc2FnZUhlYWRlckludE1zZ0luZm9WYXJpYW50IHtcbiAgICAgICAgICBJbnRNc2dJbmZvIHtcbiAgICAgICAgICAgIHZhbHVlIHsgR3JhbXMgfVxuICAgICAgICAgICAgc3JjIHtcbiAgICAgICAgICAgICAgLi4ub24gTXNnQWRkcmVzc0ludEFkZHJWYXJWYXJpYW50IHsgQWRkclZhciB7IGFkZHJlc3MgfSB9XG4gICAgICAgICAgICAgIC4uLm9uIE1zZ0FkZHJlc3NJbnRBZGRyU3RkVmFyaWFudCB7IEFkZHJTdGQgeyBhZGRyZXNzIH0gfVxuICAgICAgICAgICAgICAuLi5vbiBNc2dBZGRyZXNzSW50QWRkck5vbmVWYXJpYW50IHsgQWRkck5vbmUgeyBOb25lIH0gfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbmA7XG5cbmFzeW5jIGZ1bmN0aW9uIHNweShkZXY6IERldiwgbmFtZXM6IHN0cmluZ1tdKSB7XG4gICAgY29uc29sZS5sb2codGV4dHMudXNhZ2VIZWFkZXIodmVyc2lvbikpO1xuICAgIGF3YWl0IFByb21pc2UuYWxsKGRldi5uZXR3b3Jrcy5tYXAoYXN5bmMgKG5ldDogTmV0d29yaykgPT4ge1xuICAgICAgICBjb25zdCBuZXRBZGRyZXNzID0gYGh0dHA6Ly8wLjAuMC4wOiR7bmV0Lmhvc3RQb3J0IHx8ICc4MCd9YDtcbiAgICAgICAgY29uc29sZS5sb2coYFNweSBmb3IgJHtuZXQubmFtZX0gYXQgJHtuZXRBZGRyZXNzfWApO1xuICAgICAgICBjb25zdCBsb2NhbE5ldCA9IGF3YWl0IGNyZWF0ZUNsaWVudChuZXRBZGRyZXNzKTtcbiAgICAgICAgY29uc3QgYWNjb3VudHMgPSBhd2FpdCBsb2NhbE5ldC5xdWVyaWVzLmFjY291bnRzLnF1ZXJ5KHt9LCAnaWQnLCBbeyBwYXRoOiAnaWQnLCBkaXJlY3Rpb246ICdBU0MnIH1dLCAxMSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdBY2NvdW50czonKTtcbiAgICAgICAgYWNjb3VudHMuc2xpY2UoMCwgMTApLmZvckVhY2goeCA9PiBjb25zb2xlLmxvZyhgICAke3guaWR9YCkpO1xuICAgICAgICBpZiAoYWNjb3VudHMubGVuZ3RoID4gMTApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcgIGFuZCBtb3JlLi4uJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coJycpO1xuICAgICAgICBjb25zb2xlLmxvZygnTG9va2luZyBmb3IgdHJhbnNhY3Rpb25zIGFuZCBtb3JlLi4uIFByZXNzIFtFbnRlcl0gdG8gc3RvcC4uLicpO1xuICAgICAgICBsb2NhbE5ldC5xdWVyaWVzLnRyYW5zYWN0aW9ucy5zdWJzY3JpYmUoe30sIHRyYW5zYWN0aW9uUHJvamVjdGlvbiwgKGUsIHRyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnVFJYOicsIHRyLmlkKTtcbiAgICAgICAgICAgIGNvbnN0IG1zZyA9IHRyLmluX21lc3NhZ2U7XG4gICAgICAgICAgICBjb25zdCBpbnRNc2cgPSBtc2cuaGVhZGVyLkludE1zZ0luZm87XG4gICAgICAgICAgICBpZiAoaW50TXNnKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJyAgICAnLCBgJHt0ci5hY2NvdW50X2FkZHJ9IDwtICR7aW50TXNnLnZhbHVlLkdyYW1zfSA8LSAke2ludE1zZy5zcmMuQWRkclN0ZC5hZGRyZXNzfWApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnICAgICcsIGAke3RyLmFjY291bnRfYWRkcn0gPC0gRVhUYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBsb2NhbE5ldC5xdWVyaWVzLmFjY291bnRzLnN1YnNjcmliZSh7fSwgJ2lkJywgKGUsIGQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBQ0M6JywgZC5pZCk7XG4gICAgICAgIH0pO1xuICAgIH0pKTtcblxuICAgIGF3YWl0IGlucHV0TGluZSgpO1xufVxuXG5cbmV4cG9ydCB7IHNweSB9O1xuIl19