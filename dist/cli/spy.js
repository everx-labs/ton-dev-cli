"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spy = spy;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

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
//TODO: import { TONClient } from "ton-client-node-js";
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
            return _context.abrupt("return", {});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvc3B5LmpzIl0sIm5hbWVzIjpbImNyZWF0ZUNsaWVudCIsIm5ldEFkZHJlc3MiLCJ0cmFuc2FjdGlvblByb2plY3Rpb24iLCJzcHkiLCJkZXYiLCJuYW1lcyIsImNvbnNvbGUiLCJsb2ciLCJ0ZXh0cyIsInVzYWdlSGVhZGVyIiwidmVyc2lvbiIsIlByb21pc2UiLCJhbGwiLCJuZXR3b3JrcyIsIm1hcCIsIm5ldCIsImhvc3RQb3J0IiwibmFtZSIsImxvY2FsTmV0IiwicXVlcmllcyIsImFjY291bnRzIiwicXVlcnkiLCJwYXRoIiwiZGlyZWN0aW9uIiwic2xpY2UiLCJmb3JFYWNoIiwieCIsImlkIiwibGVuZ3RoIiwidHJhbnNhY3Rpb25zIiwic3Vic2NyaWJlIiwiZSIsInRyIiwibXNnIiwiaW5fbWVzc2FnZSIsImludE1zZyIsImhlYWRlciIsIkludE1zZ0luZm8iLCJhY2NvdW50X2FkZHIiLCJ2YWx1ZSIsIkdyYW1zIiwic3JjIiwiQWRkclN0ZCIsImFkZHJlc3MiLCJkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBaUJBOztBQUNBOztBQUNBOztBQUNBOztBQXBCQTs7Ozs7Ozs7Ozs7Ozs7QUFnQkE7U0FNZUEsWTs7Ozs7OzsrQkFBZixpQkFBNEJDLFVBQTVCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw2Q0FDVyxFQURYOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7QUFPQSxJQUFNQyxxQkFBcUIsOGdDQUEzQjs7U0FtQ2VDLEc7Ozs7Ozs7K0JBQWYsa0JBQW1CQyxHQUFuQixFQUE2QkMsS0FBN0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNJQyxZQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsYUFBTUMsV0FBTixDQUFrQkMsY0FBbEIsQ0FBWjtBQURKO0FBQUEsbUJBRVVDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZUixHQUFHLENBQUNTLFFBQUosQ0FBYUMsR0FBYjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkNBQWlCLGtCQUFPQyxHQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUN6QmQsd0JBQUFBLFVBRHlCLDRCQUNNYyxHQUFHLENBQUNDLFFBQUosSUFBZ0IsSUFEdEI7QUFFL0JWLHdCQUFBQSxPQUFPLENBQUNDLEdBQVIsbUJBQXVCUSxHQUFHLENBQUNFLElBQTNCLGlCQUFzQ2hCLFVBQXRDO0FBRitCO0FBQUEsK0JBR1JELFlBQVksQ0FBQ0MsVUFBRCxDQUhKOztBQUFBO0FBR3pCaUIsd0JBQUFBLFFBSHlCO0FBQUE7QUFBQSwrQkFJUkEsUUFBUSxDQUFDQyxPQUFULENBQWlCQyxRQUFqQixDQUEwQkMsS0FBMUIsQ0FBZ0MsRUFBaEMsRUFBb0MsSUFBcEMsRUFBMEMsQ0FBQztBQUFFQywwQkFBQUEsSUFBSSxFQUFFLElBQVI7QUFBY0MsMEJBQUFBLFNBQVMsRUFBRTtBQUF6Qix5QkFBRCxDQUExQyxFQUE4RSxFQUE5RSxDQUpROztBQUFBO0FBSXpCSCx3QkFBQUEsUUFKeUI7QUFLL0JkLHdCQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxXQUFaO0FBQ0FhLHdCQUFBQSxRQUFRLENBQUNJLEtBQVQsQ0FBZSxDQUFmLEVBQWtCLEVBQWxCLEVBQXNCQyxPQUF0QixDQUE4QixVQUFBQyxDQUFDO0FBQUEsaUNBQUlwQixPQUFPLENBQUNDLEdBQVIsYUFBaUJtQixDQUFDLENBQUNDLEVBQW5CLEVBQUo7QUFBQSx5QkFBL0I7O0FBQ0EsNEJBQUlQLFFBQVEsQ0FBQ1EsTUFBVCxHQUFrQixFQUF0QixFQUEwQjtBQUN0QnRCLDBCQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxlQUFaO0FBQ0g7O0FBQ0RELHdCQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxFQUFaO0FBQ0FELHdCQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSwrREFBWjtBQUNBVyx3QkFBQUEsUUFBUSxDQUFDQyxPQUFULENBQWlCVSxZQUFqQixDQUE4QkMsU0FBOUIsQ0FBd0MsRUFBeEMsRUFBNEM1QixxQkFBNUMsRUFBbUUsVUFBQzZCLENBQUQsRUFBSUMsRUFBSixFQUFXO0FBQzFFMUIsMEJBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLE1BQVosRUFBb0J5QixFQUFFLENBQUNMLEVBQXZCO0FBQ0EsOEJBQU1NLEdBQUcsR0FBR0QsRUFBRSxDQUFDRSxVQUFmO0FBQ0EsOEJBQU1DLE1BQU0sR0FBR0YsR0FBRyxDQUFDRyxNQUFKLENBQVdDLFVBQTFCOztBQUNBLDhCQUFJRixNQUFKLEVBQVk7QUFDUjdCLDRCQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxNQUFaLFlBQXVCeUIsRUFBRSxDQUFDTSxZQUExQixpQkFBNkNILE1BQU0sQ0FBQ0ksS0FBUCxDQUFhQyxLQUExRCxpQkFBc0VMLE1BQU0sQ0FBQ00sR0FBUCxDQUFXQyxPQUFYLENBQW1CQyxPQUF6RjtBQUNILDJCQUZELE1BRU87QUFDSHJDLDRCQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxNQUFaLFlBQXVCeUIsRUFBRSxDQUFDTSxZQUExQjtBQUNIO0FBQ0oseUJBVEQ7QUFVQXBCLHdCQUFBQSxRQUFRLENBQUNDLE9BQVQsQ0FBaUJDLFFBQWpCLENBQTBCVSxTQUExQixDQUFvQyxFQUFwQyxFQUF3QyxJQUF4QyxFQUE4QyxVQUFDQyxDQUFELEVBQUlhLENBQUosRUFBVTtBQUNwRHRDLDBCQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxNQUFaLEVBQW9CcUMsQ0FBQyxDQUFDakIsRUFBdEI7QUFDSCx5QkFGRDs7QUF0QitCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQWpCOztBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQUFaLENBRlY7O0FBQUE7QUFBQTtBQUFBLG1CQTZCVSx1QkE3QlY7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOC0yMDE5IFRPTiBERVYgU09MVVRJT05TIExURC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgU09GVFdBUkUgRVZBTFVBVElPTiBMaWNlbnNlICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbiAqIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxuICogTGljZW5zZSBhdDogaHR0cHM6Ly93d3cudG9uLmRldi9saWNlbnNlc1xuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgVE9OIERFViBzb2Z0d2FyZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbi8vIEBmbG93XG5cbi8vVE9ETzogaW1wb3J0IHsgVE9OQ2xpZW50IH0gZnJvbSBcInRvbi1jbGllbnQtbm9kZS1qc1wiO1xuaW1wb3J0IHsgRGV2IH0gZnJvbSBcIi4uL2RldlwiO1xuaW1wb3J0IHsgTmV0d29yayB9IGZyb20gXCIuLi9uZXR3b3Jrcy9uZXR3b3Jrc1wiO1xuaW1wb3J0IHsgdGV4dHMgfSBmcm9tIFwiLi4vdXRpbHMvdGV4dHNcIjtcbmltcG9ydCB7IGlucHV0TGluZSwgdmVyc2lvbiB9IGZyb20gXCIuLi91dGlscy91dGlsc1wiO1xuXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVDbGllbnQobmV0QWRkcmVzczogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHt9O1xuICAgIC8vVE9ETzogcmV0dXJuIFRPTkNsaWVudC5jcmVhdGUoe1xuICAgIC8vICAgICBzZXJ2ZXJzOiBbbmV0QWRkcmVzc11cbiAgICAvLyB9KTtcbn1cblxuY29uc3QgdHJhbnNhY3Rpb25Qcm9qZWN0aW9uID0gYFxuICAgIGlkXG4gICAgYWNjb3VudF9hZGRyXG4gICAgaW5fbWVzc2FnZSB7XG4gICAgICBoZWFkZXIge1xuICAgICAgICAuLi5vbiBNZXNzYWdlSGVhZGVyRXh0T3V0TXNnSW5mb1ZhcmlhbnQge1xuICAgICAgICAgIEV4dE91dE1zZ0luZm8ge1xuICAgICAgICAgICAgZHN0IHtcbiAgICAgICAgICAgICAgLi4ub24gTXNnQWRkcmVzc0V4dEFkZHJOb25lVmFyaWFudCB7IEFkZHJOb25lIHsgTm9uZSB9IH1cbiAgICAgICAgICAgICAgLi4ub24gTXNnQWRkcmVzc0V4dEFkZHJFeHRlcm5WYXJpYW50IHsgQWRkckV4dGVybiB7IEFkZHJFeHRlcm4gfSB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC4uLm9uIE1lc3NhZ2VIZWFkZXJFeHRJbk1zZ0luZm9WYXJpYW50IHtcbiAgICAgICAgICBFeHRJbk1zZ0luZm8ge1xuICAgICAgICAgICAgc3JjIHtcbiAgICAgICAgICAgICAgLi4ub24gTXNnQWRkcmVzc0V4dEFkZHJFeHRlcm5WYXJpYW50IHsgQWRkckV4dGVybiB7IEFkZHJFeHRlcm4gfSB9XG4gICAgICAgICAgICAgIC4uLm9uIE1zZ0FkZHJlc3NFeHRBZGRyTm9uZVZhcmlhbnQgeyBBZGRyTm9uZSB7IE5vbmUgfSB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC4uLm9uIE1lc3NhZ2VIZWFkZXJJbnRNc2dJbmZvVmFyaWFudCB7XG4gICAgICAgICAgSW50TXNnSW5mbyB7XG4gICAgICAgICAgICB2YWx1ZSB7IEdyYW1zIH1cbiAgICAgICAgICAgIHNyYyB7XG4gICAgICAgICAgICAgIC4uLm9uIE1zZ0FkZHJlc3NJbnRBZGRyVmFyVmFyaWFudCB7IEFkZHJWYXIgeyBhZGRyZXNzIH0gfVxuICAgICAgICAgICAgICAuLi5vbiBNc2dBZGRyZXNzSW50QWRkclN0ZFZhcmlhbnQgeyBBZGRyU3RkIHsgYWRkcmVzcyB9IH1cbiAgICAgICAgICAgICAgLi4ub24gTXNnQWRkcmVzc0ludEFkZHJOb25lVmFyaWFudCB7IEFkZHJOb25lIHsgTm9uZSB9IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5gO1xuXG5hc3luYyBmdW5jdGlvbiBzcHkoZGV2OiBEZXYsIG5hbWVzOiBzdHJpbmdbXSkge1xuICAgIGNvbnNvbGUubG9nKHRleHRzLnVzYWdlSGVhZGVyKHZlcnNpb24pKTtcbiAgICBhd2FpdCBQcm9taXNlLmFsbChkZXYubmV0d29ya3MubWFwKGFzeW5jIChuZXQ6IE5ldHdvcmspID0+IHtcbiAgICAgICAgY29uc3QgbmV0QWRkcmVzcyA9IGBodHRwOi8vMC4wLjAuMDoke25ldC5ob3N0UG9ydCB8fCAnODAnfWA7XG4gICAgICAgIGNvbnNvbGUubG9nKGBTcHkgZm9yICR7bmV0Lm5hbWV9IGF0ICR7bmV0QWRkcmVzc31gKTtcbiAgICAgICAgY29uc3QgbG9jYWxOZXQgPSBhd2FpdCBjcmVhdGVDbGllbnQobmV0QWRkcmVzcyk7XG4gICAgICAgIGNvbnN0IGFjY291bnRzID0gYXdhaXQgbG9jYWxOZXQucXVlcmllcy5hY2NvdW50cy5xdWVyeSh7fSwgJ2lkJywgW3sgcGF0aDogJ2lkJywgZGlyZWN0aW9uOiAnQVNDJyB9XSwgMTEpO1xuICAgICAgICBjb25zb2xlLmxvZygnQWNjb3VudHM6Jyk7XG4gICAgICAgIGFjY291bnRzLnNsaWNlKDAsIDEwKS5mb3JFYWNoKHggPT4gY29uc29sZS5sb2coYCAgJHt4LmlkfWApKTtcbiAgICAgICAgaWYgKGFjY291bnRzLmxlbmd0aCA+IDEwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnICBhbmQgbW9yZS4uLicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKCcnKTtcbiAgICAgICAgY29uc29sZS5sb2coJ0xvb2tpbmcgZm9yIHRyYW5zYWN0aW9ucyBhbmQgbW9yZS4uLiBQcmVzcyBbRW50ZXJdIHRvIHN0b3AuLi4nKTtcbiAgICAgICAgbG9jYWxOZXQucXVlcmllcy50cmFuc2FjdGlvbnMuc3Vic2NyaWJlKHt9LCB0cmFuc2FjdGlvblByb2plY3Rpb24sIChlLCB0cikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1RSWDonLCB0ci5pZCk7XG4gICAgICAgICAgICBjb25zdCBtc2cgPSB0ci5pbl9tZXNzYWdlO1xuICAgICAgICAgICAgY29uc3QgaW50TXNnID0gbXNnLmhlYWRlci5JbnRNc2dJbmZvO1xuICAgICAgICAgICAgaWYgKGludE1zZykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCcgICAgJywgYCR7dHIuYWNjb3VudF9hZGRyfSA8LSAke2ludE1zZy52YWx1ZS5HcmFtc30gPC0gJHtpbnRNc2cuc3JjLkFkZHJTdGQuYWRkcmVzc31gKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJyAgICAnLCBgJHt0ci5hY2NvdW50X2FkZHJ9IDwtIEVYVGApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgbG9jYWxOZXQucXVlcmllcy5hY2NvdW50cy5zdWJzY3JpYmUoe30sICdpZCcsIChlLCBkKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQUNDOicsIGQuaWQpO1xuICAgICAgICB9KTtcbiAgICB9KSk7XG5cbiAgICBhd2FpdCBpbnB1dExpbmUoKTtcbn1cblxuXG5leHBvcnQgeyBzcHkgfTtcbiJdfQ==