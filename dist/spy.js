"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spy = spy;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _tonClientNodeJs = require("ton-client-node-js");

var _config = require("./config");

var _texts = require("./texts");

var _utils = require("./utils");

var _apolloCacheInmemory = require("apollo-cache-inmemory");

var _qClientScheme = require("./q-client-scheme");

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
function createClient(_x) {
  return _createClient.apply(this, arguments);
}

function _createClient() {
  _createClient = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(netAddress) {
    var client, introspectionQueryResultData, fragmentMatcher;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            client = new _tonClientNodeJs.TONClient();
            client.config.setData({
              defaultWorkchain: 0,
              servers: [],
              requestsServer: netAddress,
              queriesServer: 'http://0.0.0.0:4000/graphql'
            });
            _qClientScheme.qClientScheme.data.__schema.types = _qClientScheme.qClientScheme.data.__schema.types.filter(function (type) {
              return type.possibleTypes !== null;
            });
            introspectionQueryResultData = _qClientScheme.qClientScheme.data;
            fragmentMatcher = new _apolloCacheInmemory.IntrospectionFragmentMatcher({
              introspectionQueryResultData: introspectionQueryResultData
            });
            console.log('>>>', fragmentMatcher);
            _context.next = 8;
            return client.setup();

          case 8:
            client.queries.client.setLocalStateFragmentMatcher(fragmentMatcher);
            return _context.abrupt("return", client);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _createClient.apply(this, arguments);
}

var transactionProjection = "\n    id\n    account_addr\n    in_message {\n      header {\n        ...on MessageHeaderExtOutMsgInfoVariant {\n          ExtOutMsgInfo {\n            dst {\n              ...on MsgAddressExtAddrNoneVariant { AddrNone { None } }\n              ...on MsgAddressExtAddrExternVariant { AddrExtern { AddrExtern } }\n            }\n          }\n        }\n        ...on MessageHeaderExtInMsgInfoVariant {\n          ExtInMsgInfo {\n            src {\n              ...on MsgAddressExtAddrExternVariant { AddrExtern { AddrExtern } }\n              ...on MsgAddressExtAddrNoneVariant { AddrNone { None } }\n            }\n          }\n        }\n        ...on MessageHeaderIntMsgInfoVariant {\n          IntMsgInfo {\n            value { Grams }\n            src {\n              ...on MsgAddressIntAddrVarVariant { AddrVar { address } }\n              ...on MsgAddressIntAddrStdVariant { AddrStd { address } }\n              ...on MsgAddressIntAddrNoneVariant { AddrNone { None } }\n            }\n          }\n        }\n      }\n    }\n";

function spy() {
  return _spy.apply(this, arguments);
}

function _spy() {
  _spy = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3() {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log(_texts.texts.usageHeader(_utils.version));
            _context3.next = 3;
            return Promise.all((0, _config.netsFromArgsOrDefault)().map(
            /*#__PURE__*/
            function () {
              var _ref = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee2(net) {
                var netAddress, localNet, accounts;
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        netAddress = "http://0.0.0.0:".concat(net.preferences.hostPort || '80');
                        console.log("Spy for ".concat(net.preferences.name, " at ").concat(netAddress));
                        _context2.next = 4;
                        return createClient(netAddress);

                      case 4:
                        localNet = _context2.sent;
                        _context2.next = 7;
                        return localNet.queries.accounts.query({}, 'id', [{
                          path: 'id',
                          direction: 'ASC'
                        }], 11);

                      case 7:
                        accounts = _context2.sent;
                        console.log('Accounts:');
                        accounts.slice(0, 10).forEach(function (x) {
                          return console.log("  ".concat(x.id));
                        });

                        if (accounts.length > 10) {
                          console.log('  and more...');
                        }

                        console.log('');
                        console.log('Looking for transactions and more... Press [Enter] to stop...');
                        localNet.queries.transactions.subscribe({}, transactionProjection, function (e, tr) {
                          console.log('TRX:', tr.id);
                          var msg = tr.in_message;
                          var intMsg = msg.header.IntMsgInfo;

                          if (intMsg) {
                            console.log('    ', "".concat(tr.account_addr, " <- ").concat(intMsg.value.Grams, " <- ").concat(intMsg.src.AddrStd.address));
                          } else {
                            console.log('    ', "".concat(tr.account_addr, " <- EXT"));
                          }
                        });
                        localNet.queries.accounts.subscribe({}, 'id', function (e, d) {
                          console.log('ACC:', d.id);
                        });

                      case 15:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x2) {
                return _ref.apply(this, arguments);
              };
            }()));

          case 3:
            _context3.next = 5;
            return (0, _utils.inputLine)();

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _spy.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zcHkuanMiXSwibmFtZXMiOlsiY3JlYXRlQ2xpZW50IiwibmV0QWRkcmVzcyIsImNsaWVudCIsIlRPTkNsaWVudCIsImNvbmZpZyIsInNldERhdGEiLCJkZWZhdWx0V29ya2NoYWluIiwic2VydmVycyIsInJlcXVlc3RzU2VydmVyIiwicXVlcmllc1NlcnZlciIsInFDbGllbnRTY2hlbWUiLCJkYXRhIiwiX19zY2hlbWEiLCJ0eXBlcyIsImZpbHRlciIsInR5cGUiLCJwb3NzaWJsZVR5cGVzIiwiaW50cm9zcGVjdGlvblF1ZXJ5UmVzdWx0RGF0YSIsImZyYWdtZW50TWF0Y2hlciIsIkludHJvc3BlY3Rpb25GcmFnbWVudE1hdGNoZXIiLCJjb25zb2xlIiwibG9nIiwic2V0dXAiLCJxdWVyaWVzIiwic2V0TG9jYWxTdGF0ZUZyYWdtZW50TWF0Y2hlciIsInRyYW5zYWN0aW9uUHJvamVjdGlvbiIsInNweSIsInRleHRzIiwidXNhZ2VIZWFkZXIiLCJ2ZXJzaW9uIiwiUHJvbWlzZSIsImFsbCIsIm1hcCIsIm5ldCIsInByZWZlcmVuY2VzIiwiaG9zdFBvcnQiLCJuYW1lIiwibG9jYWxOZXQiLCJhY2NvdW50cyIsInF1ZXJ5IiwicGF0aCIsImRpcmVjdGlvbiIsInNsaWNlIiwiZm9yRWFjaCIsIngiLCJpZCIsImxlbmd0aCIsInRyYW5zYWN0aW9ucyIsInN1YnNjcmliZSIsImUiLCJ0ciIsIm1zZyIsImluX21lc3NhZ2UiLCJpbnRNc2ciLCJoZWFkZXIiLCJJbnRNc2dJbmZvIiwiYWNjb3VudF9hZGRyIiwidmFsdWUiLCJHcmFtcyIsInNyYyIsIkFkZHJTdGQiLCJhZGRyZXNzIiwiZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQWdCQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUF2QkE7Ozs7Ozs7Ozs7Ozs7O1NBeUJlQSxZOzs7Ozs7OytCQUFmLGlCQUE0QkMsVUFBNUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1VD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OC0yMDE5IFRPTiBERVYgU09MVVRJT05TIExURC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgU09GVFdBUkUgRVZBTFVBVElPTiBMaWNlbnNlICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbiAqIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxuICogTGljZW5zZSBhdDogaHR0cHM6Ly93d3cudG9uLmRldi9saWNlbnNlc1xuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgVE9OIERFViBzb2Z0d2FyZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbi8vIEBmbG93XG5cbmltcG9ydCB7IFRPTkNsaWVudCB9IGZyb20gXCJ0b24tY2xpZW50LW5vZGUtanNcIjtcbmltcG9ydCB0eXBlIHsgTmV0Q29uZmlnIH0gZnJvbSBcIi4vY29uZmlnXCI7XG5pbXBvcnQgeyBuZXRzRnJvbUFyZ3NPckRlZmF1bHQgfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCB7IHRleHRzIH0gZnJvbSBcIi4vdGV4dHNcIjtcbmltcG9ydCB7IGlucHV0TGluZSwgdmVyc2lvbiB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmltcG9ydCB7IEludHJvc3BlY3Rpb25GcmFnbWVudE1hdGNoZXIgfSBmcm9tICdhcG9sbG8tY2FjaGUtaW5tZW1vcnknO1xuaW1wb3J0IHtxQ2xpZW50U2NoZW1lfSBmcm9tICcuL3EtY2xpZW50LXNjaGVtZSc7XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUNsaWVudChuZXRBZGRyZXNzOiBzdHJpbmcpIHtcbiAgICBjb25zdCBjbGllbnQgPSBuZXcgVE9OQ2xpZW50KCk7XG4gICAgY2xpZW50LmNvbmZpZy5zZXREYXRhKHtcbiAgICAgICAgZGVmYXVsdFdvcmtjaGFpbjogMCxcbiAgICAgICAgc2VydmVyczogW10sXG4gICAgICAgIHJlcXVlc3RzU2VydmVyOiBuZXRBZGRyZXNzLFxuICAgICAgICBxdWVyaWVzU2VydmVyOiAnaHR0cDovLzAuMC4wLjA6NDAwMC9ncmFwaHFsJ1xuICAgIH0pO1xuXG5cbiAgICBxQ2xpZW50U2NoZW1lLmRhdGEuX19zY2hlbWEudHlwZXMgPSBxQ2xpZW50U2NoZW1lLmRhdGEuX19zY2hlbWEudHlwZXMuZmlsdGVyKHR5cGUgPT4gdHlwZS5wb3NzaWJsZVR5cGVzICE9PSBudWxsKTtcbiAgICBjb25zdCBpbnRyb3NwZWN0aW9uUXVlcnlSZXN1bHREYXRhID0gcUNsaWVudFNjaGVtZS5kYXRhO1xuICAgIGNvbnN0IGZyYWdtZW50TWF0Y2hlciA9IG5ldyBJbnRyb3NwZWN0aW9uRnJhZ21lbnRNYXRjaGVyKHtcbiAgICAgICAgaW50cm9zcGVjdGlvblF1ZXJ5UmVzdWx0RGF0YVxuICAgIH0pO1xuY29uc29sZS5sb2coJz4+PicsIGZyYWdtZW50TWF0Y2hlcik7XG4gICAgYXdhaXQgY2xpZW50LnNldHVwKCk7XG4gICAgY2xpZW50LnF1ZXJpZXMuY2xpZW50LnNldExvY2FsU3RhdGVGcmFnbWVudE1hdGNoZXIoZnJhZ21lbnRNYXRjaGVyKTtcbiAgICByZXR1cm4gY2xpZW50O1xufVxuXG5jb25zdCB0cmFuc2FjdGlvblByb2plY3Rpb24gPSBgXG4gICAgaWRcbiAgICBhY2NvdW50X2FkZHJcbiAgICBpbl9tZXNzYWdlIHtcbiAgICAgIGhlYWRlciB7XG4gICAgICAgIC4uLm9uIE1lc3NhZ2VIZWFkZXJFeHRPdXRNc2dJbmZvVmFyaWFudCB7XG4gICAgICAgICAgRXh0T3V0TXNnSW5mbyB7XG4gICAgICAgICAgICBkc3Qge1xuICAgICAgICAgICAgICAuLi5vbiBNc2dBZGRyZXNzRXh0QWRkck5vbmVWYXJpYW50IHsgQWRkck5vbmUgeyBOb25lIH0gfVxuICAgICAgICAgICAgICAuLi5vbiBNc2dBZGRyZXNzRXh0QWRkckV4dGVyblZhcmlhbnQgeyBBZGRyRXh0ZXJuIHsgQWRkckV4dGVybiB9IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLi4ub24gTWVzc2FnZUhlYWRlckV4dEluTXNnSW5mb1ZhcmlhbnQge1xuICAgICAgICAgIEV4dEluTXNnSW5mbyB7XG4gICAgICAgICAgICBzcmMge1xuICAgICAgICAgICAgICAuLi5vbiBNc2dBZGRyZXNzRXh0QWRkckV4dGVyblZhcmlhbnQgeyBBZGRyRXh0ZXJuIHsgQWRkckV4dGVybiB9IH1cbiAgICAgICAgICAgICAgLi4ub24gTXNnQWRkcmVzc0V4dEFkZHJOb25lVmFyaWFudCB7IEFkZHJOb25lIHsgTm9uZSB9IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLi4ub24gTWVzc2FnZUhlYWRlckludE1zZ0luZm9WYXJpYW50IHtcbiAgICAgICAgICBJbnRNc2dJbmZvIHtcbiAgICAgICAgICAgIHZhbHVlIHsgR3JhbXMgfVxuICAgICAgICAgICAgc3JjIHtcbiAgICAgICAgICAgICAgLi4ub24gTXNnQWRkcmVzc0ludEFkZHJWYXJWYXJpYW50IHsgQWRkclZhciB7IGFkZHJlc3MgfSB9XG4gICAgICAgICAgICAgIC4uLm9uIE1zZ0FkZHJlc3NJbnRBZGRyU3RkVmFyaWFudCB7IEFkZHJTdGQgeyBhZGRyZXNzIH0gfVxuICAgICAgICAgICAgICAuLi5vbiBNc2dBZGRyZXNzSW50QWRkck5vbmVWYXJpYW50IHsgQWRkck5vbmUgeyBOb25lIH0gfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbmA7XG5cbmFzeW5jIGZ1bmN0aW9uIHNweSgpIHtcbiAgICBjb25zb2xlLmxvZyh0ZXh0cy51c2FnZUhlYWRlcih2ZXJzaW9uKSk7XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwobmV0c0Zyb21BcmdzT3JEZWZhdWx0KCkubWFwKGFzeW5jIChuZXQ6IE5ldENvbmZpZykgPT4ge1xuICAgICAgICBjb25zdCBuZXRBZGRyZXNzID0gYGh0dHA6Ly8wLjAuMC4wOiR7bmV0LnByZWZlcmVuY2VzLmhvc3RQb3J0IHx8ICc4MCd9YDtcbiAgICAgICAgY29uc29sZS5sb2coYFNweSBmb3IgJHtuZXQucHJlZmVyZW5jZXMubmFtZX0gYXQgJHtuZXRBZGRyZXNzfWApO1xuICAgICAgICBjb25zdCBsb2NhbE5ldCA9IGF3YWl0IGNyZWF0ZUNsaWVudChuZXRBZGRyZXNzKTtcbiAgICAgICAgY29uc3QgYWNjb3VudHMgPSBhd2FpdCBsb2NhbE5ldC5xdWVyaWVzLmFjY291bnRzLnF1ZXJ5KHt9LCAnaWQnLCBbeyBwYXRoOiAnaWQnLCBkaXJlY3Rpb246ICdBU0MnIH1dLCAxMSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdBY2NvdW50czonKTtcbiAgICAgICAgYWNjb3VudHMuc2xpY2UoMCwgMTApLmZvckVhY2goeCA9PiBjb25zb2xlLmxvZyhgICAke3guaWR9YCkpO1xuICAgICAgICBpZiAoYWNjb3VudHMubGVuZ3RoID4gMTApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcgIGFuZCBtb3JlLi4uJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coJycpO1xuICAgICAgICBjb25zb2xlLmxvZygnTG9va2luZyBmb3IgdHJhbnNhY3Rpb25zIGFuZCBtb3JlLi4uIFByZXNzIFtFbnRlcl0gdG8gc3RvcC4uLicpO1xuICAgICAgICBsb2NhbE5ldC5xdWVyaWVzLnRyYW5zYWN0aW9ucy5zdWJzY3JpYmUoe30sIHRyYW5zYWN0aW9uUHJvamVjdGlvbiwgKGUsIHRyKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnVFJYOicsIHRyLmlkKTtcbiAgICAgICAgICAgIGNvbnN0IG1zZyA9IHRyLmluX21lc3NhZ2U7XG4gICAgICAgICAgICBjb25zdCBpbnRNc2cgPSBtc2cuaGVhZGVyLkludE1zZ0luZm87XG4gICAgICAgICAgICBpZiAoaW50TXNnKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJyAgICAnLCBgJHt0ci5hY2NvdW50X2FkZHJ9IDwtICR7aW50TXNnLnZhbHVlLkdyYW1zfSA8LSAke2ludE1zZy5zcmMuQWRkclN0ZC5hZGRyZXNzfWApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnICAgICcsIGAke3RyLmFjY291bnRfYWRkcn0gPC0gRVhUYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBsb2NhbE5ldC5xdWVyaWVzLmFjY291bnRzLnN1YnNjcmliZSh7fSwgJ2lkJywgKGUsIGQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBQ0M6JywgZC5pZCk7XG4gICAgICAgIH0pO1xuICAgIH0pKTtcblxuICAgIGF3YWl0IGlucHV0TGluZSgpO1xufVxuXG5cbmV4cG9ydCB7IHNweSB9O1xuIl19