"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spy = spy;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _tonClientNodeJs = require("ton-client-node-js");

var _dev = require("../dev");

var _networks = require("../networks/networks");

var _texts = require("../utils/texts");

var _utils = require("../utils/utils");

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
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", _tonClientNodeJs.TONClient.create({
              defaultWorkchain: 0,
              servers: [],
              requestsServer: netAddress,
              queriesServer: 'http://0.0.0.0:4000/graphql'
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _createClient.apply(this, arguments);
}

var transactionProjection = "\n    id\n    account_addr\n    in_message {\n      header {\n        ...on MessageHeaderExtOutMsgInfoVariant {\n          ExtOutMsgInfo {\n            dst {\n              ...on MsgAddressExtAddrNoneVariant { AddrNone { None } }\n              ...on MsgAddressExtAddrExternVariant { AddrExtern { AddrExtern } }\n            }\n          }\n        }\n        ...on MessageHeaderExtInMsgInfoVariant {\n          ExtInMsgInfo {\n            src {\n              ...on MsgAddressExtAddrExternVariant { AddrExtern { AddrExtern } }\n              ...on MsgAddressExtAddrNoneVariant { AddrNone { None } }\n            }\n          }\n        }\n        ...on MessageHeaderIntMsgInfoVariant {\n          IntMsgInfo {\n            value { Grams }\n            src {\n              ...on MsgAddressIntAddrVarVariant { AddrVar { address } }\n              ...on MsgAddressIntAddrStdVariant { AddrStd { address } }\n              ...on MsgAddressIntAddrNoneVariant { AddrNone { None } }\n            }\n          }\n        }\n      }\n    }\n";

function spy(_x2, _x3) {
  return _spy.apply(this, arguments);
}

function _spy() {
  _spy = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(dev, names) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log(_texts.texts.usageHeader(_utils.version));
            _context3.next = 3;
            return Promise.all(dev.networks.map(
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
                        netAddress = "http://0.0.0.0:".concat(net.hostPort || '80');
                        console.log("Spy for ".concat(net.name, " at ").concat(netAddress));
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

              return function (_x4) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvc3B5LmpzIl0sIm5hbWVzIjpbImNyZWF0ZUNsaWVudCIsIm5ldEFkZHJlc3MiLCJUT05DbGllbnQiLCJjcmVhdGUiLCJkZWZhdWx0V29ya2NoYWluIiwic2VydmVycyIsInJlcXVlc3RzU2VydmVyIiwicXVlcmllc1NlcnZlciIsInRyYW5zYWN0aW9uUHJvamVjdGlvbiIsInNweSIsImRldiIsIm5hbWVzIiwiY29uc29sZSIsImxvZyIsInRleHRzIiwidXNhZ2VIZWFkZXIiLCJ2ZXJzaW9uIiwiUHJvbWlzZSIsImFsbCIsIm5ldHdvcmtzIiwibWFwIiwibmV0IiwiaG9zdFBvcnQiLCJuYW1lIiwibG9jYWxOZXQiLCJxdWVyaWVzIiwiYWNjb3VudHMiLCJxdWVyeSIsInBhdGgiLCJkaXJlY3Rpb24iLCJzbGljZSIsImZvckVhY2giLCJ4IiwiaWQiLCJsZW5ndGgiLCJ0cmFuc2FjdGlvbnMiLCJzdWJzY3JpYmUiLCJlIiwidHIiLCJtc2ciLCJpbl9tZXNzYWdlIiwiaW50TXNnIiwiaGVhZGVyIiwiSW50TXNnSW5mbyIsImFjY291bnRfYWRkciIsInZhbHVlIiwiR3JhbXMiLCJzcmMiLCJBZGRyU3RkIiwiYWRkcmVzcyIsImQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFnQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBcEJBOzs7Ozs7Ozs7Ozs7OztTQXNCZUEsWTs7Ozs7OzsrQkFBZixpQkFBNEJDLFVBQTVCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw2Q0FDV0MsMkJBQVVDLE1BQVYsQ0FBaUI7QUFDcEJDLGNBQUFBLGdCQUFnQixFQUFFLENBREU7QUFFcEJDLGNBQUFBLE9BQU8sRUFBRSxFQUZXO0FBR3BCQyxjQUFBQSxjQUFjLEVBQUVMLFVBSEk7QUFJcEJNLGNBQUFBLGFBQWEsRUFBRTtBQUpLLGFBQWpCLENBRFg7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztBQVNBLElBQU1DLHFC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QUFBO0FBQUE7QUFBQSxlQUFqQjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFBWixDQUZWOztBQUFBO0FBQUE7QUFBQSxtQkE2QlUsdUJBN0JWOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG4gKiB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbiAqIExpY2Vuc2UgYXQ6IGh0dHBzOi8vd3d3LnRvbi5kZXYvbGljZW5zZXNcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIFRPTiBERVYgc29mdHdhcmUgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG4vLyBAZmxvd1xuXG5pbXBvcnQgeyBUT05DbGllbnQgfSBmcm9tIFwidG9uLWNsaWVudC1ub2RlLWpzXCI7XG5pbXBvcnQgeyBEZXYgfSBmcm9tIFwiLi4vZGV2XCI7XG5pbXBvcnQgeyBOZXR3b3JrIH0gZnJvbSBcIi4uL25ldHdvcmtzL25ldHdvcmtzXCI7XG5pbXBvcnQgeyB0ZXh0cyB9IGZyb20gXCIuLi91dGlscy90ZXh0c1wiO1xuaW1wb3J0IHsgaW5wdXRMaW5lLCB2ZXJzaW9uIH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxzXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUNsaWVudChuZXRBZGRyZXNzOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gVE9OQ2xpZW50LmNyZWF0ZSh7XG4gICAgICAgIGRlZmF1bHRXb3JrY2hhaW46IDAsXG4gICAgICAgIHNlcnZlcnM6IFtdLFxuICAgICAgICByZXF1ZXN0c1NlcnZlcjogbmV0QWRkcmVzcyxcbiAgICAgICAgcXVlcmllc1NlcnZlcjogJ2h0dHA6Ly8wLjAuMC4wOjQwMDAvZ3JhcGhxbCdcbiAgICB9KTtcbn1cblxuY29uc3QgdHJhbnNhY3Rpb25Qcm9qZWN0aW9uID0gYFxuICAgIGlkXG4gICAgYWNjb3VudF9hZGRyXG4gICAgaW5fbWVzc2FnZSB7XG4gICAgICBoZWFkZXIge1xuICAgICAgICAuLi5vbiBNZXNzYWdlSGVhZGVyRXh0T3V0TXNnSW5mb1ZhcmlhbnQge1xuICAgICAgICAgIEV4dE91dE1zZ0luZm8ge1xuICAgICAgICAgICAgZHN0IHtcbiAgICAgICAgICAgICAgLi4ub24gTXNnQWRkcmVzc0V4dEFkZHJOb25lVmFyaWFudCB7IEFkZHJOb25lIHsgTm9uZSB9IH1cbiAgICAgICAgICAgICAgLi4ub24gTXNnQWRkcmVzc0V4dEFkZHJFeHRlcm5WYXJpYW50IHsgQWRkckV4dGVybiB7IEFkZHJFeHRlcm4gfSB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC4uLm9uIE1lc3NhZ2VIZWFkZXJFeHRJbk1zZ0luZm9WYXJpYW50IHtcbiAgICAgICAgICBFeHRJbk1zZ0luZm8ge1xuICAgICAgICAgICAgc3JjIHtcbiAgICAgICAgICAgICAgLi4ub24gTXNnQWRkcmVzc0V4dEFkZHJFeHRlcm5WYXJpYW50IHsgQWRkckV4dGVybiB7IEFkZHJFeHRlcm4gfSB9XG4gICAgICAgICAgICAgIC4uLm9uIE1zZ0FkZHJlc3NFeHRBZGRyTm9uZVZhcmlhbnQgeyBBZGRyTm9uZSB7IE5vbmUgfSB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC4uLm9uIE1lc3NhZ2VIZWFkZXJJbnRNc2dJbmZvVmFyaWFudCB7XG4gICAgICAgICAgSW50TXNnSW5mbyB7XG4gICAgICAgICAgICB2YWx1ZSB7IEdyYW1zIH1cbiAgICAgICAgICAgIHNyYyB7XG4gICAgICAgICAgICAgIC4uLm9uIE1zZ0FkZHJlc3NJbnRBZGRyVmFyVmFyaWFudCB7IEFkZHJWYXIgeyBhZGRyZXNzIH0gfVxuICAgICAgICAgICAgICAuLi5vbiBNc2dBZGRyZXNzSW50QWRkclN0ZFZhcmlhbnQgeyBBZGRyU3RkIHsgYWRkcmVzcyB9IH1cbiAgICAgICAgICAgICAgLi4ub24gTXNnQWRkcmVzc0ludEFkZHJOb25lVmFyaWFudCB7IEFkZHJOb25lIHsgTm9uZSB9IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5gO1xuXG5hc3luYyBmdW5jdGlvbiBzcHkoZGV2OiBEZXYsIG5hbWVzOiBzdHJpbmdbXSkge1xuICAgIGNvbnNvbGUubG9nKHRleHRzLnVzYWdlSGVhZGVyKHZlcnNpb24pKTtcbiAgICBhd2FpdCBQcm9taXNlLmFsbChkZXYubmV0d29ya3MubWFwKGFzeW5jIChuZXQ6IE5ldHdvcmspID0+IHtcbiAgICAgICAgY29uc3QgbmV0QWRkcmVzcyA9IGBodHRwOi8vMC4wLjAuMDoke25ldC5ob3N0UG9ydCB8fCAnODAnfWA7XG4gICAgICAgIGNvbnNvbGUubG9nKGBTcHkgZm9yICR7bmV0Lm5hbWV9IGF0ICR7bmV0QWRkcmVzc31gKTtcbiAgICAgICAgY29uc3QgbG9jYWxOZXQgPSBhd2FpdCBjcmVhdGVDbGllbnQobmV0QWRkcmVzcyk7XG4gICAgICAgIGNvbnN0IGFjY291bnRzID0gYXdhaXQgbG9jYWxOZXQucXVlcmllcy5hY2NvdW50cy5xdWVyeSh7fSwgJ2lkJywgW3sgcGF0aDogJ2lkJywgZGlyZWN0aW9uOiAnQVNDJyB9XSwgMTEpO1xuICAgICAgICBjb25zb2xlLmxvZygnQWNjb3VudHM6Jyk7XG4gICAgICAgIGFjY291bnRzLnNsaWNlKDAsIDEwKS5mb3JFYWNoKHggPT4gY29uc29sZS5sb2coYCAgJHt4LmlkfWApKTtcbiAgICAgICAgaWYgKGFjY291bnRzLmxlbmd0aCA+IDEwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnICBhbmQgbW9yZS4uLicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKCcnKTtcbiAgICAgICAgY29uc29sZS5sb2coJ0xvb2tpbmcgZm9yIHRyYW5zYWN0aW9ucyBhbmQgbW9yZS4uLiBQcmVzcyBbRW50ZXJdIHRvIHN0b3AuLi4nKTtcbiAgICAgICAgbG9jYWxOZXQucXVlcmllcy50cmFuc2FjdGlvbnMuc3Vic2NyaWJlKHt9LCB0cmFuc2FjdGlvblByb2plY3Rpb24sIChlLCB0cikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1RSWDonLCB0ci5pZCk7XG4gICAgICAgICAgICBjb25zdCBtc2cgPSB0ci5pbl9tZXNzYWdlO1xuICAgICAgICAgICAgY29uc3QgaW50TXNnID0gbXNnLmhlYWRlci5JbnRNc2dJbmZvO1xuICAgICAgICAgICAgaWYgKGludE1zZykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCcgICAgJywgYCR7dHIuYWNjb3VudF9hZGRyfSA8LSAke2ludE1zZy52YWx1ZS5HcmFtc30gPC0gJHtpbnRNc2cuc3JjLkFkZHJTdGQuYWRkcmVzc31gKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJyAgICAnLCBgJHt0ci5hY2NvdW50X2FkZHJ9IDwtIEVYVGApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgbG9jYWxOZXQucXVlcmllcy5hY2NvdW50cy5zdWJzY3JpYmUoe30sICdpZCcsIChlLCBkKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQUNDOicsIGQuaWQpO1xuICAgICAgICB9KTtcbiAgICB9KSk7XG5cbiAgICBhd2FpdCBpbnB1dExpbmUoKTtcbn1cblxuXG5leHBvcnQgeyBzcHkgfTtcbiJdfQ==