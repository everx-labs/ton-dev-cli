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
              servers: [netAddress]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvc3B5LmpzIl0sIm5hbWVzIjpbImNyZWF0ZUNsaWVudCIsIm5ldEFkZHJlc3MiLCJUT05DbGllbnQiLCJjcmVhdGUiLCJzZXJ2ZXJzIiwidHJhbnNhY3Rpb25Qcm9qZWN0aW9uIiwic3B5IiwiZGV2IiwibmFtZXMiLCJjb25zb2xlIiwibG9nIiwidGV4dHMiLCJ1c2FnZUhlYWRlciIsInZlcnNpb24iLCJQcm9taXNlIiwiYWxsIiwibmV0d29ya3MiLCJtYXAiLCJuZXQiLCJob3N0UG9ydCIsIm5hbWUiLCJsb2NhbE5ldCIsInF1ZXJpZXMiLCJhY2NvdW50cyIsInF1ZXJ5IiwicGF0aCIsImRpcmVjdGlvbiIsInNsaWNlIiwiZm9yRWFjaCIsIngiLCJpZCIsImxlbmd0aCIsInRyYW5zYWN0aW9ucyIsInN1YnNjcmliZSIsImUiLCJ0ciIsIm1zZyIsImluX21lc3NhZ2UiLCJpbnRNc2ciLCJoZWFkZXIiLCJJbnRNc2dJbmZvIiwiYWNjb3VudF9hZGRyIiwidmFsdWUiLCJHcmFtcyIsInNyYyIsIkFkZHJTdGQiLCJhZGRyZXNzIiwiZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQWdCQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFwQkE7Ozs7Ozs7Ozs7Ozs7O1NBc0JlQSxZOzs7Ozs7OytCQUFmLGlCQUE0QkMsVUFBNUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDZDQUNXQywyQkFBVUMsTUFBVixDQUFpQjtBQUNwQkMsY0FBQUEsT0FBTyxFQUFFLENBQUNILFVBQUQ7QUFEVyxhQUFqQixDQURYOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7QUFNQSxJQUFNSSxxQkFBcUIsOGdDQUEzQjs7U0FtQ2VDLEc7Ozs7Ozs7K0JBQWYsa0JBQW1CQyxHQUFuQixFQUE2QkMsS0FBN0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNJQyxZQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsYUFBTUMsV0FBTixD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c0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuLy8gQGZsb3dcblxuaW1wb3J0IHsgVE9OQ2xpZW50IH0gZnJvbSBcInRvbi1jbGllbnQtbm9kZS1qc1wiO1xuaW1wb3J0IHsgRGV2IH0gZnJvbSBcIi4uL2RldlwiO1xuaW1wb3J0IHsgTmV0d29yayB9IGZyb20gXCIuLi9uZXR3b3Jrcy9uZXR3b3Jrc1wiO1xuaW1wb3J0IHsgdGV4dHMgfSBmcm9tIFwiLi4vdXRpbHMvdGV4dHNcIjtcbmltcG9ydCB7IGlucHV0TGluZSwgdmVyc2lvbiB9IGZyb20gXCIuLi91dGlscy91dGlsc1wiO1xuXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVDbGllbnQobmV0QWRkcmVzczogc3RyaW5nKSB7XG4gICAgcmV0dXJuIFRPTkNsaWVudC5jcmVhdGUoe1xuICAgICAgICBzZXJ2ZXJzOiBbbmV0QWRkcmVzc11cbiAgICB9KTtcbn1cblxuY29uc3QgdHJhbnNhY3Rpb25Qcm9qZWN0aW9uID0gYFxuICAgIGlkXG4gICAgYWNjb3VudF9hZGRyXG4gICAgaW5fbWVzc2FnZSB7XG4gICAgICBoZWFkZXIge1xuICAgICAgICAuLi5vbiBNZXNzYWdlSGVhZGVyRXh0T3V0TXNnSW5mb1ZhcmlhbnQge1xuICAgICAgICAgIEV4dE91dE1zZ0luZm8ge1xuICAgICAgICAgICAgZHN0IHtcbiAgICAgICAgICAgICAgLi4ub24gTXNnQWRkcmVzc0V4dEFkZHJOb25lVmFyaWFudCB7IEFkZHJOb25lIHsgTm9uZSB9IH1cbiAgICAgICAgICAgICAgLi4ub24gTXNnQWRkcmVzc0V4dEFkZHJFeHRlcm5WYXJpYW50IHsgQWRkckV4dGVybiB7IEFkZHJFeHRlcm4gfSB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC4uLm9uIE1lc3NhZ2VIZWFkZXJFeHRJbk1zZ0luZm9WYXJpYW50IHtcbiAgICAgICAgICBFeHRJbk1zZ0luZm8ge1xuICAgICAgICAgICAgc3JjIHtcbiAgICAgICAgICAgICAgLi4ub24gTXNnQWRkcmVzc0V4dEFkZHJFeHRlcm5WYXJpYW50IHsgQWRkckV4dGVybiB7IEFkZHJFeHRlcm4gfSB9XG4gICAgICAgICAgICAgIC4uLm9uIE1zZ0FkZHJlc3NFeHRBZGRyTm9uZVZhcmlhbnQgeyBBZGRyTm9uZSB7IE5vbmUgfSB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC4uLm9uIE1lc3NhZ2VIZWFkZXJJbnRNc2dJbmZvVmFyaWFudCB7XG4gICAgICAgICAgSW50TXNnSW5mbyB7XG4gICAgICAgICAgICB2YWx1ZSB7IEdyYW1zIH1cbiAgICAgICAgICAgIHNyYyB7XG4gICAgICAgICAgICAgIC4uLm9uIE1zZ0FkZHJlc3NJbnRBZGRyVmFyVmFyaWFudCB7IEFkZHJWYXIgeyBhZGRyZXNzIH0gfVxuICAgICAgICAgICAgICAuLi5vbiBNc2dBZGRyZXNzSW50QWRkclN0ZFZhcmlhbnQgeyBBZGRyU3RkIHsgYWRkcmVzcyB9IH1cbiAgICAgICAgICAgICAgLi4ub24gTXNnQWRkcmVzc0ludEFkZHJOb25lVmFyaWFudCB7IEFkZHJOb25lIHsgTm9uZSB9IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5gO1xuXG5hc3luYyBmdW5jdGlvbiBzcHkoZGV2OiBEZXYsIG5hbWVzOiBzdHJpbmdbXSkge1xuICAgIGNvbnNvbGUubG9nKHRleHRzLnVzYWdlSGVhZGVyKHZlcnNpb24pKTtcbiAgICBhd2FpdCBQcm9taXNlLmFsbChkZXYubmV0d29ya3MubWFwKGFzeW5jIChuZXQ6IE5ldHdvcmspID0+IHtcbiAgICAgICAgY29uc3QgbmV0QWRkcmVzcyA9IGBodHRwOi8vMC4wLjAuMDoke25ldC5ob3N0UG9ydCB8fCAnODAnfWA7XG4gICAgICAgIGNvbnNvbGUubG9nKGBTcHkgZm9yICR7bmV0Lm5hbWV9IGF0ICR7bmV0QWRkcmVzc31gKTtcbiAgICAgICAgY29uc3QgbG9jYWxOZXQgPSBhd2FpdCBjcmVhdGVDbGllbnQobmV0QWRkcmVzcyk7XG4gICAgICAgIGNvbnN0IGFjY291bnRzID0gYXdhaXQgbG9jYWxOZXQucXVlcmllcy5hY2NvdW50cy5xdWVyeSh7fSwgJ2lkJywgW3sgcGF0aDogJ2lkJywgZGlyZWN0aW9uOiAnQVNDJyB9XSwgMTEpO1xuICAgICAgICBjb25zb2xlLmxvZygnQWNjb3VudHM6Jyk7XG4gICAgICAgIGFjY291bnRzLnNsaWNlKDAsIDEwKS5mb3JFYWNoKHggPT4gY29uc29sZS5sb2coYCAgJHt4LmlkfWApKTtcbiAgICAgICAgaWYgKGFjY291bnRzLmxlbmd0aCA+IDEwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnICBhbmQgbW9yZS4uLicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKCcnKTtcbiAgICAgICAgY29uc29sZS5sb2coJ0xvb2tpbmcgZm9yIHRyYW5zYWN0aW9ucyBhbmQgbW9yZS4uLiBQcmVzcyBbRW50ZXJdIHRvIHN0b3AuLi4nKTtcbiAgICAgICAgbG9jYWxOZXQucXVlcmllcy50cmFuc2FjdGlvbnMuc3Vic2NyaWJlKHt9LCB0cmFuc2FjdGlvblByb2plY3Rpb24sIChlLCB0cikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1RSWDonLCB0ci5pZCk7XG4gICAgICAgICAgICBjb25zdCBtc2cgPSB0ci5pbl9tZXNzYWdlO1xuICAgICAgICAgICAgY29uc3QgaW50TXNnID0gbXNnLmhlYWRlci5JbnRNc2dJbmZvO1xuICAgICAgICAgICAgaWYgKGludE1zZykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCcgICAgJywgYCR7dHIuYWNjb3VudF9hZGRyfSA8LSAke2ludE1zZy52YWx1ZS5HcmFtc30gPC0gJHtpbnRNc2cuc3JjLkFkZHJTdGQuYWRkcmVzc31gKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJyAgICAnLCBgJHt0ci5hY2NvdW50X2FkZHJ9IDwtIEVYVGApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgbG9jYWxOZXQucXVlcmllcy5hY2NvdW50cy5zdWJzY3JpYmUoe30sICdpZCcsIChlLCBkKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQUNDOicsIGQuaWQpO1xuICAgICAgICB9KTtcbiAgICB9KSk7XG5cbiAgICBhd2FpdCBpbnB1dExpbmUoKTtcbn1cblxuXG5leHBvcnQgeyBzcHkgfTtcbiJdfQ==