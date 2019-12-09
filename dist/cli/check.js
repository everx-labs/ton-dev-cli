"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckNetwork = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _tonClientNodeJs = require("ton-client-node-js");

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
var os = require('os');

var fs = require('fs');

var path = require('path');

var cliProgress = require('cli-progress');

var _colors = require('colors');

var CheckNetwork =
/*#__PURE__*/
function () {
  (0, _createClass2["default"])(CheckNetwork, null, [{
    key: "checkNetworks",
    value: function () {
      var _checkNetworks = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(servers, verbose) {
        var checkers, serverMaxLength, multiBar, bars, updateLog, updateBar, updateProgress;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return CheckNetwork.resolveGiverParameters();

              case 2:
                checkers = servers.map(function (server) {
                  return new CheckNetwork(server, verbose);
                });
                serverMaxLength = servers.reduce(function (maxLength, server) {
                  return Math.max(maxLength, server.length);
                }, 0);
                multiBar = new cliProgress.MultiBar({
                  format: '{status}{title}{time}{message}'
                });
                bars = checkers.map(function (checker) {
                  return multiBar.create(100, 0, checker.getStatus(serverMaxLength));
                });

                updateLog = function updateLog() {
                  console.log(checkers.map(function (x) {
                    return x.getStatus(serverMaxLength);
                  }).map(function (status) {
                    return "".concat(status.title).concat(status.time).concat(status.status);
                  }).join(' / '));
                };

                updateBar = function updateBar() {
                  for (var i = 0; i < checkers.length; i += 1) {
                    bars[i].update(1, checkers[i].getStatus(serverMaxLength));
                  }
                };

                updateProgress = bars[0] ? updateBar : updateLog;
                _context.next = 11;
                return Promise.all([new Promise(function (resolve) {
                  var timerId = setInterval(function () {
                    updateProgress();
                    var unfinished = checkers.find(function (x) {
                      return !x.isFinished();
                    });

                    if (!unfinished) {
                      clearInterval(timerId);
                      resolve();
                      console.log();
                      process.exit(0);
                    }
                  }, 1000);
                })].concat((0, _toConsumableArray2["default"])(checkers.map(function (checker) {
                  return checker.check(updateProgress);
                }))));

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function checkNetworks(_x, _x2) {
        return _checkNetworks.apply(this, arguments);
      }

      return checkNetworks;
    }()
  }]);

  function CheckNetwork(server, verbose) {
    (0, _classCallCheck2["default"])(this, CheckNetwork);
    (0, _defineProperty2["default"])(this, "server", void 0);
    (0, _defineProperty2["default"])(this, "verbose", void 0);
    (0, _defineProperty2["default"])(this, "client", void 0);
    (0, _defineProperty2["default"])(this, "onUpdate", void 0);
    (0, _defineProperty2["default"])(this, "message", void 0);
    (0, _defineProperty2["default"])(this, "succeeded", void 0);
    (0, _defineProperty2["default"])(this, "failed", void 0);
    (0, _defineProperty2["default"])(this, "start", void 0);
    (0, _defineProperty2["default"])(this, "time", void 0);
    (0, _defineProperty2["default"])(this, "retries", void 0);
    this.server = server;
    this.verbose = verbose;
    this.message = '';
    this.succeeded = false;
    this.failed = false;
    this.start = Date.now();
    this.time = 0;
    this.retries = 0;
  }

  (0, _createClass2["default"])(CheckNetwork, [{
    key: "getStatus",
    value: function getStatus(serverMaxLength) {
      var seconds = function seconds(ms, round) {
        return round ? Math.round(ms / 1000) : ms / 1000;
      };

      var decor = _colors.reset;

      if (this.succeeded) {
        decor = _colors.green;
      } else if (this.failed) {
        decor = _colors.red;
      }

      var status = {
        status: '  ',
        title: decor(this.server.padEnd(serverMaxLength)),
        time: '',
        message: ''
      };
      var retries = this.retries > 0 ? " (".concat(this.retries + 1, ")") : '';

      if (this.isFinished()) {
        status.status = decor(this.succeeded ? '✓ ' : '✖ ');
        status.time = decor(" \u2026 ".concat(seconds(this.time, false), "s").concat(retries));
      } else {
        var s = seconds(Date.now() - this.start, true);

        if (s > 0) {
          status.time = decor(" \u2026 ".concat(s, "s").concat(retries));
        } else if (retries !== '') {
          status.time = decor(" \u2026".concat(retries));
        }
      }

      if (!this.succeeded) {
        status.message = this.message !== '' ? decor(" \u2026 ".concat(this.message)) : '';
      }

      return status;
    }
  }, {
    key: "check",
    value: function () {
      var _check = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(onUpdate) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.onUpdate = onUpdate;
                _context2.next = 3;
                return _tonClientNodeJs.TONClient.create({
                  servers: [this.server],
                  log_verbose: this.verbose
                });

              case 3:
                this.client = _context2.sent;
                _context2.prev = 4;
                _context2.next = 7;
                return this.checkGiver();

              case 7:
                _context2.next = 9;
                return this.checkSendGrams();

              case 9:
                this.report({
                  succeeded: true
                });
                _context2.next = 15;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](4);
                this.report({
                  error: _context2.t0
                });

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 12]]);
      }));

      function check(_x3) {
        return _check.apply(this, arguments);
      }

      return check;
    }()
  }, {
    key: "checkGiver",
    value: function () {
      var _checkGiver = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3() {
        var givers, giverBalance;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.report({
                  message: 'looking for giver'
                });
                _context3.next = 3;
                return this.client.queries.accounts.query({
                  id: {
                    eq: CheckNetwork.giverAddress
                  }
                }, 'balance code');

              case 3:
                givers = _context3.sent;

                if (!(givers.length < 1)) {
                  _context3.next = 7;
                  break;
                }

                this.report({
                  error: 'no giver'
                });
                return _context3.abrupt("return");

              case 7:
                //$FlowFixMe
                giverBalance = BigInt(givers[0].balance);

                if (!(giverBalance === BigInt(0))) {
                  _context3.next = 11;
                  break;
                }

                this.report({
                  error: 'giver balance is empty'
                });
                return _context3.abrupt("return");

              case 11:
                if (!(giverBalance < BigInt(1000000000))) {
                  _context3.next = 14;
                  break;
                }

                this.report({
                  error: "giver balance too low: ".concat(giverBalance)
                });
                return _context3.abrupt("return");

              case 14:
                if (givers[0].code) {
                  _context3.next = 19;
                  break;
                }

                this.report({
                  message: "deploying giver, balance: ".concat(giverBalance)
                });
                _context3.next = 18;
                return this.client.contracts.deploy({
                  "package": CheckNetwork.giverPackage,
                  keyPair: CheckNetwork.giverKeys,
                  constructorParams: {}
                });

              case 18:
                this.report({
                  succeeded: true
                });

              case 19:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function checkGiver() {
        return _checkGiver.apply(this, arguments);
      }

      return checkGiver;
    }()
  }, {
    key: "checkSendGrams",
    value: function () {
      var _checkSendGrams = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4() {
        var message, first;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!true) {
                  _context4.next = 14;
                  break;
                }

                this.report({
                  message: 'sending 0.001G'
                });
                _context4.next = 4;
                return this.client.contracts.createRunMessage({
                  address: CheckNetwork.giverAddress,
                  functionName: 'sendTransaction',
                  abi: CheckNetwork.giverPackage.abi,
                  input: {
                    dest: '0:adb63a228837e478c7edf5fe3f0b5d12183e1f22246b67712b99ec538d6c5357',
                    value: 1000000,
                    bounce: false
                  },
                  keyPair: CheckNetwork.giverKeys
                });

              case 4:
                message = _context4.sent;
                _context4.next = 7;
                return Promise.race([new Promise(function (resolve) {
                  setTimeout(resolve, 30000, {
                    retry: true
                  });
                }), this.client.contracts.processRunMessage(message)]);

              case 7:
                first = _context4.sent;

                if (!(first && first.transaction)) {
                  _context4.next = 10;
                  break;
                }

                return _context4.abrupt("return");

              case 10:
                this.retries += 1;
                this.start = Date.now();
                _context4.next = 0;
                break;

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function checkSendGrams() {
        return _checkSendGrams.apply(this, arguments);
      }

      return checkSendGrams;
    }()
  }, {
    key: "isFinished",
    value: function isFinished() {
      return this.succeeded || this.failed;
    }
  }, {
    key: "report",
    value: function report(options) {
      if (options.succeeded !== undefined) {
        this.succeeded = options.succeeded;
        this.failed = false;
        this.message = '';
        this.time = Date.now() - this.start;
      } else if (options.error !== undefined) {
        this.message = options.error && options.error.message ? options.error.message : (options.error || '').toString();
        this.failed = true;
        this.succeeded = false;
        this.time = Date.now() - this.start;
      } else if (options.message !== undefined && !this.isFinished()) {
        this.message = options.message;
      }

      this.onUpdate();
    }
  }], [{
    key: "resolveGiverParameters",
    value: function () {
      var _resolveGiverParameters = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5() {
        var client, keysPath;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _tonClientNodeJs.TONClient.create({
                  servers: ['net.ton.dev']
                });

              case 2:
                client = _context5.sent;

                try {
                  keysPath = path.resolve(os.homedir(), 'giverKeys.json');
                  CheckNetwork.giverKeys = JSON.parse(fs.readFileSync(keysPath, 'utf8'));
                } catch (error) {}

                _context5.next = 6;
                return client.contracts.createDeployMessage({
                  "package": CheckNetwork.giverPackage,
                  constructorParams: {},
                  keyPair: CheckNetwork.giverKeys
                });

              case 6:
                CheckNetwork.giverAddress = _context5.sent.address;

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function resolveGiverParameters() {
        return _resolveGiverParameters.apply(this, arguments);
      }

      return resolveGiverParameters;
    }()
  }]);
  return CheckNetwork;
}();

exports.CheckNetwork = CheckNetwork;
(0, _defineProperty2["default"])(CheckNetwork, "giverAddress", '0:5b168970a9c63dd5c42a6afbcf706ef652476bb8960a22e1d8a2ad148e60c0ea');
(0, _defineProperty2["default"])(CheckNetwork, "giverKeys", {
  secret: '2245e4f44af8af6bbd15c4a53eb67a8f211d541ddc7c197f74d7830dba6d27fe',
  "public": 'd542f44146f169c6726c8cf70e4cbb3d33d8d842a4afd799ac122c5808d81ba3'
});
(0, _defineProperty2["default"])(CheckNetwork, "giverPackage", {
  abi: {
    "ABI version": 1,
    "functions": [{
      "name": "constructor",
      "inputs": [],
      "outputs": []
    }, {
      "name": "sendTransaction",
      "inputs": [{
        "name": "dest",
        "type": "address"
      }, {
        "name": "value",
        "type": "uint128"
      }, {
        "name": "bounce",
        "type": "bool"
      }],
      "outputs": []
    }],
    "events": [],
    "data": [{
      "key": 100,
      "name": "owner",
      "type": "uint256"
    }]
  },
  imageBase64: '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'
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvY2hlY2suanMiXSwibmFtZXMiOlsib3MiLCJyZXF1aXJlIiwiZnMiLCJwYXRoIiwiY2xpUHJvZ3Jlc3MiLCJfY29sb3JzIiwiQ2hlY2tOZXR3b3JrIiwic2VydmVycyIsInZlcmJvc2UiLCJyZXNvbHZlR2l2ZXJQYXJhbWV0ZXJzIiwiY2hlY2tlcnMiLCJtYXAiLCJzZXJ2ZXIiLCJzZXJ2ZXJNYXhMZW5ndGgiLCJyZWR1Y2UiLCJtYXhMZW5ndGgiLCJNYXRoIiwibWF4IiwibGVuZ3RoIiwibXVsdGlCYXIiLCJNdWx0aUJhciIsImZvcm1hdCIsImJhcnMiLCJjaGVja2VyIiwiY3JlYXRlIiwiZ2V0U3RhdHVzIiwidXBkYXRlTG9nIiwiY29uc29sZSIsImxvZyIsIngiLCJzdGF0dXMiLCJ0aXRsZSIsInRpbWUiLCJqb2luIiwidXBkYXRlQmFyIiwiaSIsInVwZGF0ZSIsInVwZGF0ZVByb2dyZXNzIiwiUHJvbWlzZSIsImFsbCIsInJlc29sdmUiLCJ0aW1lcklkIiwic2V0SW50ZXJ2YWwiLCJ1bmZpbmlzaGVkIiwiZmluZCIsImlzRmluaXNoZWQiLCJjbGVhckludGVydmFsIiwicHJvY2VzcyIsImV4aXQiLCJjaGVjayIsIm1lc3NhZ2UiLCJzdWNjZWVkZWQiLCJmYWlsZWQiLCJzdGFydCIsIkRhdGUiLCJub3ciLCJyZXRyaWVzIiwic2Vjb25kcyIsIm1zIiwicm91bmQiLCJkZWNvciIsInJlc2V0IiwiZ3JlZW4iLCJyZWQiLCJwYWRFbmQiLCJzIiwib25VcGRhdGUiLCJUT05DbGllbnROb2RlSnMiLCJsb2dfdmVyYm9zZSIsImNsaWVudCIsImNoZWNrR2l2ZXIiLCJjaGVja1NlbmRHcmFtcyIsInJlcG9ydCIsImVycm9yIiwicXVlcmllcyIsImFjY291bnRzIiwicXVlcnkiLCJpZCIsImVxIiwiZ2l2ZXJBZGRyZXNzIiwiZ2l2ZXJzIiwiZ2l2ZXJCYWxhbmNlIiwiQmlnSW50IiwiYmFsYW5jZSIsImNvZGUiLCJjb250cmFjdHMiLCJkZXBsb3kiLCJnaXZlclBhY2thZ2UiLCJrZXlQYWlyIiwiZ2l2ZXJLZXlzIiwiY29uc3RydWN0b3JQYXJhbXMiLCJjcmVhdGVSdW5NZXNzYWdlIiwiYWRkcmVzcyIsImZ1bmN0aW9uTmFtZSIsImFiaSIsImlucHV0IiwiZGVzdCIsInZhbHVlIiwiYm91bmNlIiwicmFjZSIsInNldFRpbWVvdXQiLCJyZXRyeSIsInByb2Nlc3NSdW5NZXNzYWdlIiwiZmlyc3QiLCJ0cmFuc2FjdGlvbiIsIm9wdGlvbnMiLCJ1bmRlZmluZWQiLCJ0b1N0cmluZyIsImtleXNQYXRoIiwiaG9tZWRpciIsIkpTT04iLCJwYXJzZSIsInJlYWRGaWxlU3luYyIsImNyZWF0ZURlcGxveU1lc3NhZ2UiLCJzZWNyZXQiLCJpbWFnZUJhc2U2NCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBOztBQWhCQTs7Ozs7Ozs7Ozs7Ozs7QUFtQkEsSUFBTUEsRUFBRSxHQUFHQyxPQUFPLENBQUMsSUFBRCxDQUFsQjs7QUFDQSxJQUFNQyxFQUFFLEdBQUdELE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQUNBLElBQU1FLElBQUksR0FBR0YsT0FBTyxDQUFDLE1BQUQsQ0FBcEI7O0FBQ0EsSUFBTUcsV0FBVyxHQUFHSCxPQUFPLENBQUMsY0FBRCxDQUEzQjs7QUFDQSxJQUFNSSxPQUFPLEdBQUdKLE9BQU8sQ0FBQyxRQUFELENBQXZCOztJQUVhSyxZOzs7Ozs7OztvREFDa0JDLE8sRUFBbUJDLE87Ozs7Ozs7dUJBQ3BDRixZQUFZLENBQUNHLHNCQUFiLEU7OztBQUNBQyxnQkFBQUEsUSxHQUEyQkgsT0FBTyxDQUFDSSxHQUFSLENBQVksVUFBQ0MsTUFBRCxFQUFZO0FBQ3JELHlCQUFPLElBQUlOLFlBQUosQ0FBaUJNLE1BQWpCLEVBQXlCSixPQUF6QixDQUFQO0FBQ0gsaUJBRmdDLEM7QUFHM0JLLGdCQUFBQSxlLEdBQWtCTixPQUFPLENBQUNPLE1BQVIsQ0FBZSxVQUFDQyxTQUFELEVBQVlILE1BQVo7QUFBQSx5QkFBdUJJ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SjtBQUFFLGFBQU8sR0FBVDtBQUFjLGNBQVEsT0FBdEI7QUFBK0IsY0FBUTtBQUF2QyxLQURJO0FBbkJQLEdBRGE7QUF3QmxCcUIsRUFBQUEsV0FBVyxFQUFFO0FBeEJLLEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG4gKiB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbiAqIExpY2Vuc2UgYXQ6IGh0dHBzOi8vd3d3LnRvbi5kZXYvbGljZW5zZXNcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIFRPTiBERVYgc29mdHdhcmUgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG5cbi8vIEBmbG93XG5pbXBvcnQgeyBUT05DbGllbnQgYXMgVE9OQ2xpZW50Tm9kZUpzIH0gZnJvbSBcInRvbi1jbGllbnQtbm9kZS1qc1wiO1xuaW1wb3J0IHR5cGUgeyBUT05DbGllbnQgfSBmcm9tIFwidG9uLWNsaWVudC1qcy90eXBlc1wiO1xuXG5jb25zdCBvcyA9IHJlcXVpcmUoJ29zJyk7XG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuY29uc3QgY2xpUHJvZ3Jlc3MgPSByZXF1aXJlKCdjbGktcHJvZ3Jlc3MnKTtcbmNvbnN0IF9jb2xvcnMgPSByZXF1aXJlKCdjb2xvcnMnKTtcblxuZXhwb3J0IGNsYXNzIENoZWNrTmV0d29yayB7XG4gICAgc3RhdGljIGFzeW5jIGNoZWNrTmV0d29ya3Moc2VydmVyczogc3RyaW5nW10sIHZlcmJvc2U6IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgYXdhaXQgQ2hlY2tOZXR3b3JrLnJlc29sdmVHaXZlclBhcmFtZXRlcnMoKTtcbiAgICAgICAgY29uc3QgY2hlY2tlcnM6IENoZWNrTmV0d29ya1tdID0gc2VydmVycy5tYXAoKHNlcnZlcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBDaGVja05ldHdvcmsoc2VydmVyLCB2ZXJib3NlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHNlcnZlck1heExlbmd0aCA9IHNlcnZlcnMucmVkdWNlKChtYXhMZW5ndGgsIHNlcnZlcikgPT4gTWF0aC5tYXgobWF4TGVuZ3RoLCBzZXJ2ZXIubGVuZ3RoKSwgMCk7XG4gICAgICAgIGNvbnN0IG11bHRpQmFyID0gbmV3IGNsaVByb2dyZXNzLk11bHRpQmFyKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZvcm1hdDogJ3tzdGF0dXN9e3RpdGxlfXt0aW1lfXttZXNzYWdlfScsXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGJhcnMgPSBjaGVja2Vycy5tYXAoY2hlY2tlciA9PiBtdWx0aUJhci5jcmVhdGUoMTAwLCAwLCBjaGVja2VyLmdldFN0YXR1cyhzZXJ2ZXJNYXhMZW5ndGgpKSk7XG4gICAgICAgIGNvbnN0IHVwZGF0ZUxvZyA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNoZWNrZXJzXG4gICAgICAgICAgICAgICAgLm1hcCh4ID0+IHguZ2V0U3RhdHVzKHNlcnZlck1heExlbmd0aCkpXG4gICAgICAgICAgICAgICAgLm1hcChzdGF0dXMgPT4gYCR7c3RhdHVzLnRpdGxlfSR7c3RhdHVzLnRpbWV9JHtzdGF0dXMuc3RhdHVzfWApXG4gICAgICAgICAgICAgICAgLmpvaW4oJyAvICcpXG4gICAgICAgICAgICApO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCB1cGRhdGVCYXIgPSAoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoZWNrZXJzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgYmFyc1tpXS51cGRhdGUoMSwgY2hlY2tlcnNbaV0uZ2V0U3RhdHVzKHNlcnZlck1heExlbmd0aCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCB1cGRhdGVQcm9ncmVzcyA9IGJhcnNbMF0gPyB1cGRhdGVCYXIgOiB1cGRhdGVMb2c7XG5cbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lcklkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVQcm9ncmVzcygpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB1bmZpbmlzaGVkID0gY2hlY2tlcnMuZmluZCh4ID0+ICF4LmlzRmluaXNoZWQoKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdW5maW5pc2hlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcklkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzLmV4aXQoMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0sIDFfMDAwKVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAuLi5jaGVja2Vycy5tYXAoKGNoZWNrZXI6IENoZWNrTmV0d29yaykgPT4gY2hlY2tlci5jaGVjayh1cGRhdGVQcm9ncmVzcykpXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIHNlcnZlcjogc3RyaW5nO1xuICAgIHZlcmJvc2U6IGJvb2xlYW47XG4gICAgY2xpZW50OiBUT05DbGllbnQ7XG4gICAgb25VcGRhdGU6ICgpID0+IHZvaWQ7XG5cbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgc3VjY2VlZGVkOiBib29sZWFuO1xuICAgIGZhaWxlZDogYm9vbGVhbjtcbiAgICBzdGFydDogbnVtYmVyO1xuICAgIHRpbWU6IG51bWJlcjtcbiAgICByZXRyaWVzOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihzZXJ2ZXI6IHN0cmluZywgdmVyYm9zZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLnNlcnZlciA9IHNlcnZlcjtcbiAgICAgICAgdGhpcy52ZXJib3NlID0gdmVyYm9zZTtcblxuICAgICAgICB0aGlzLm1lc3NhZ2UgPSAnJztcbiAgICAgICAgdGhpcy5zdWNjZWVkZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mYWlsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdGFydCA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMudGltZSA9IDA7XG4gICAgICAgIHRoaXMucmV0cmllcyA9IDA7XG4gICAgfVxuXG4gICAgZ2V0U3RhdHVzKHNlcnZlck1heExlbmd0aDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IHNlY29uZHMgPSAobXM6IG51bWJlciwgcm91bmQ6IGJvb2xlYW4pOiBudW1iZXIgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJvdW5kID8gTWF0aC5yb3VuZChtcyAvIDFfMDAwKSA6IChtcyAvIDFfMDAwKTtcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgZGVjb3IgPSBfY29sb3JzLnJlc2V0O1xuICAgICAgICBpZiAodGhpcy5zdWNjZWVkZWQpIHtcbiAgICAgICAgICAgIGRlY29yID0gX2NvbG9ycy5ncmVlbjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmZhaWxlZCkge1xuICAgICAgICAgICAgZGVjb3IgPSBfY29sb3JzLnJlZDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdGF0dXMgPSB7XG4gICAgICAgICAgICBzdGF0dXM6ICcgICcsXG4gICAgICAgICAgICB0aXRsZTogZGVjb3IodGhpcy5zZXJ2ZXIucGFkRW5kKHNlcnZlck1heExlbmd0aCkpLFxuICAgICAgICAgICAgdGltZTogJycsXG4gICAgICAgICAgICBtZXNzYWdlOiAnJyxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcmV0cmllcyA9IHRoaXMucmV0cmllcyA+IDAgPyBgICgke3RoaXMucmV0cmllcyArIDF9KWAgOiAnJztcbiAgICAgICAgaWYgKHRoaXMuaXNGaW5pc2hlZCgpKSB7XG4gICAgICAgICAgICBzdGF0dXMuc3RhdHVzID0gZGVjb3IodGhpcy5zdWNjZWVkZWQgPyAn4pyTICcgOiAn4pyWICcpO1xuICAgICAgICAgICAgc3RhdHVzLnRpbWUgPSBkZWNvcihgIOKApiAke3NlY29uZHModGhpcy50aW1lLCBmYWxzZSl9cyR7cmV0cmllc31gKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHMgPSBzZWNvbmRzKERhdGUubm93KCkgLSB0aGlzLnN0YXJ0LCB0cnVlKTtcbiAgICAgICAgICAgIGlmIChzID4gMCkge1xuICAgICAgICAgICAgICAgIHN0YXR1cy50aW1lID0gZGVjb3IoYCDigKYgJHtzfXMke3JldHJpZXN9YCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJldHJpZXMgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzLnRpbWUgPSBkZWNvcihgIOKApiR7cmV0cmllc31gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuc3VjY2VlZGVkKSB7XG4gICAgICAgICAgICBzdGF0dXMubWVzc2FnZSA9IHRoaXMubWVzc2FnZSAhPT0gJycgPyBkZWNvcihgIOKApiAke3RoaXMubWVzc2FnZX1gKSA6ICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdGF0dXM7XG4gICAgfVxuXG4gICAgYXN5bmMgY2hlY2sob25VcGRhdGU6ICgpID0+IHZvaWQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgdGhpcy5vblVwZGF0ZSA9IG9uVXBkYXRlO1xuICAgICAgICB0aGlzLmNsaWVudCA9IGF3YWl0IFRPTkNsaWVudE5vZGVKcy5jcmVhdGUoe1xuICAgICAgICAgICAgc2VydmVyczogW3RoaXMuc2VydmVyXSxcbiAgICAgICAgICAgIGxvZ192ZXJib3NlOiB0aGlzLnZlcmJvc2UsXG4gICAgICAgIH0pO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5jaGVja0dpdmVyKCk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmNoZWNrU2VuZEdyYW1zKCk7XG4gICAgICAgICAgICB0aGlzLnJlcG9ydCh7IHN1Y2NlZWRlZDogdHJ1ZSB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMucmVwb3J0KHsgZXJyb3IgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBjaGVja0dpdmVyKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICB0aGlzLnJlcG9ydCh7IG1lc3NhZ2U6ICdsb29raW5nIGZvciBnaXZlcicgfSk7XG4gICAgICAgIGNvbnN0IGdpdmVycyA9IGF3YWl0IHRoaXMuY2xpZW50LnF1ZXJpZXMuYWNjb3VudHMucXVlcnkoXG4gICAgICAgICAgICB7IGlkOiB7IGVxOiBDaGVja05ldHdvcmsuZ2l2ZXJBZGRyZXNzIH0gfSxcbiAgICAgICAgICAgICdiYWxhbmNlIGNvZGUnKTtcbiAgICAgICAgaWYgKGdpdmVycy5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICB0aGlzLnJlcG9ydCh7IGVycm9yOiAnbm8gZ2l2ZXInIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vJEZsb3dGaXhNZVxuICAgICAgICBjb25zdCBnaXZlckJhbGFuY2UgPSBCaWdJbnQoZ2l2ZXJzWzBdLmJhbGFuY2UpO1xuICAgICAgICBpZiAoZ2l2ZXJCYWxhbmNlID09PSBCaWdJbnQoMCkpIHtcbiAgICAgICAgICAgIHRoaXMucmVwb3J0KHsgZXJyb3I6ICdnaXZlciBiYWxhbmNlIGlzIGVtcHR5JyB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ2l2ZXJCYWxhbmNlIDwgQmlnSW50KDFfMDAwXzAwMF8wMDApKSB7XG4gICAgICAgICAgICB0aGlzLnJlcG9ydCh7IGVycm9yOiBgZ2l2ZXIgYmFsYW5jZSB0b28gbG93OiAke2dpdmVyQmFsYW5jZX1gIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZ2l2ZXJzWzBdLmNvZGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVwb3J0KHsgbWVzc2FnZTogYGRlcGxveWluZyBnaXZlciwgYmFsYW5jZTogJHtnaXZlckJhbGFuY2V9YCB9KTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY2xpZW50LmNvbnRyYWN0cy5kZXBsb3koe1xuICAgICAgICAgICAgICAgIHBhY2thZ2U6IENoZWNrTmV0d29yay5naXZlclBhY2thZ2UsXG4gICAgICAgICAgICAgICAga2V5UGFpcjogQ2hlY2tOZXR3b3JrLmdpdmVyS2V5cyxcbiAgICAgICAgICAgICAgICBjb25zdHJ1Y3RvclBhcmFtczoge30sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucmVwb3J0KHsgc3VjY2VlZGVkOiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgY2hlY2tTZW5kR3JhbXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLnJlcG9ydCh7IG1lc3NhZ2U6ICdzZW5kaW5nIDAuMDAxRycgfSk7XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gYXdhaXQgdGhpcy5jbGllbnQuY29udHJhY3RzLmNyZWF0ZVJ1bk1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIGFkZHJlc3M6IENoZWNrTmV0d29yay5naXZlckFkZHJlc3MsXG4gICAgICAgICAgICAgICAgZnVuY3Rpb25OYW1lOiAnc2VuZFRyYW5zYWN0aW9uJyxcbiAgICAgICAgICAgICAgICBhYmk6IENoZWNrTmV0d29yay5naXZlclBhY2thZ2UuYWJpLFxuICAgICAgICAgICAgICAgIGlucHV0OiB7XG4gICAgICAgICAgICAgICAgICAgIGRlc3Q6ICcwOmFkYjYzYTIyODgzN2U0NzhjN2VkZjVmZTNmMGI1ZDEyMTgzZTFmMjIyNDZiNjc3MTJiOTllYzUzOGQ2YzUzNTcnLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMV8wMDBfMDAwLFxuICAgICAgICAgICAgICAgICAgICBib3VuY2U6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBrZXlQYWlyOiBDaGVja05ldHdvcmsuZ2l2ZXJLZXlzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBmaXJzdCA9IGF3YWl0IFByb21pc2UucmFjZShbXG4gICAgICAgICAgICAgICAgbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChyZXNvbHZlLCAzMF8wMDAsIHsgcmV0cnk6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgdGhpcy5jbGllbnQuY29udHJhY3RzLnByb2Nlc3NSdW5NZXNzYWdlKG1lc3NhZ2UpXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIGlmIChmaXJzdCAmJiBmaXJzdC50cmFuc2FjdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmV0cmllcyArPSAxO1xuICAgICAgICAgICAgdGhpcy5zdGFydCA9IERhdGUubm93KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0ZpbmlzaGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdWNjZWVkZWQgfHwgdGhpcy5mYWlsZWQ7XG4gICAgfVxuXG4gICAgcmVwb3J0KG9wdGlvbnM6IHtcbiAgICAgICAgc3VjY2VlZGVkPzogYm9vbGVhbixcbiAgICAgICAgZXJyb3I/OiBhbnksXG4gICAgICAgIG1lc3NhZ2U/OiBzdHJpbmcsXG4gICAgfSkge1xuICAgICAgICBpZiAob3B0aW9ucy5zdWNjZWVkZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zdWNjZWVkZWQgPSBvcHRpb25zLnN1Y2NlZWRlZDtcbiAgICAgICAgICAgIHRoaXMuZmFpbGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSAnJztcbiAgICAgICAgICAgIHRoaXMudGltZSA9IERhdGUubm93KCkgLSB0aGlzLnN0YXJ0O1xuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZXJyb3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gKG9wdGlvbnMuZXJyb3IgJiYgb3B0aW9ucy5lcnJvci5tZXNzYWdlKVxuICAgICAgICAgICAgICAgID8gb3B0aW9ucy5lcnJvci5tZXNzYWdlXG4gICAgICAgICAgICAgICAgOiAob3B0aW9ucy5lcnJvciB8fCAnJykudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHRoaXMuZmFpbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc3VjY2VlZGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnRpbWUgPSBEYXRlLm5vdygpIC0gdGhpcy5zdGFydDtcbiAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zLm1lc3NhZ2UgIT09IHVuZGVmaW5lZCAmJiAhdGhpcy5pc0ZpbmlzaGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IG9wdGlvbnMubWVzc2FnZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uVXBkYXRlKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGdpdmVyQWRkcmVzcyA9ICcwOjViMTY4OTcwYTljNjNkZDVjNDJhNmFmYmNmNzA2ZWY2NTI0NzZiYjg5NjBhMjJlMWQ4YTJhZDE0OGU2MGMwZWEnO1xuICAgIHN0YXRpYyBnaXZlcktleXMgPSB7XG4gICAgICAgIHNlY3JldDogJzIyNDVlNGY0NGFmOGFmNmJiZDE1YzRhNTNlYjY3YThmMjExZDU0MWRkYzdjMTk3Zjc0ZDc4MzBkYmE2ZDI3ZmUnLFxuICAgICAgICBwdWJsaWM6ICdkNTQyZjQ0MTQ2ZjE2OWM2NzI2YzhjZjcwZTRjYmIzZDMzZDhkODQyYTRhZmQ3OTlhYzEyMmM1ODA4ZDgxYmEzJyxcbiAgICB9O1xuICAgIHN0YXRpYyBnaXZlclBhY2thZ2UgPSB7XG4gICAgICAgIGFiaToge1xuICAgICAgICAgICAgXCJBQkkgdmVyc2lvblwiOiAxLFxuICAgICAgICAgICAgXCJmdW5jdGlvbnNcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiY29uc3RydWN0b3JcIixcbiAgICAgICAgICAgICAgICAgICAgXCJpbnB1dHNcIjogW10sXG4gICAgICAgICAgICAgICAgICAgIFwib3V0cHV0c1wiOiBbXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJzZW5kVHJhbnNhY3Rpb25cIixcbiAgICAgICAgICAgICAgICAgICAgXCJpbnB1dHNcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJkZXN0XCIsIFwidHlwZVwiOiBcImFkZHJlc3NcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJ2YWx1ZVwiLCBcInR5cGVcIjogXCJ1aW50MTI4XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiYm91bmNlXCIsIFwidHlwZVwiOiBcImJvb2xcIiB9XG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIFwib3V0cHV0c1wiOiBbXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBcImV2ZW50c1wiOiBbXSxcbiAgICAgICAgICAgIFwiZGF0YVwiOiBbXG4gICAgICAgICAgICAgICAgeyBcImtleVwiOiAxMDAsIFwibmFtZVwiOiBcIm93bmVyXCIsIFwidHlwZVwiOiBcInVpbnQyNTZcIiB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIGltYWdlQmFzZTY0OiAndGU2Y2NnRUNKUUVBQmQ4QUFnRTBCZ0VCQWNBQ0FnUFBJQVVEQVFIZUJBQUQwQ0FBUWRnQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFCQUlvL3dBZ3dBSDBwQ0JZa3ZTZzRZcnRVMWd3OUtBVEJ3RUs5S1FnOUtFSUFnUE5RQkFKQWdIT0RRb0NBU0FNQ3dBSEREYk1JQUFuQ0Z3dkNMd0dibXc4dUJtSWlJaWNmQUtYd09BQ0FTQVBEZ0ExTzFIYnhGdkVNakwvNEJrN1VkdkVvQkE5RVB0UndGdlV1MVhnQU5VL3ZzQlpHVmpiMlJsWDJGa1pISWcra0F5K2tJZ2J4QWdjcm9oYzdxeDh1QjlJVzhSYnZMZ2ZjaDB6d3NDSW04U3p3b0hJbThUSW5LNmxpTnZFeUxPTXA4aGdRRUFJdGRKb2M5QU1pQWl6akxpL3Z3QlpHVmpiMlJsWDJGa1pISXdJY25RSlZWQlh3WGJNSUFJQklCSVJBQ3VrLzMyQXM3SzZMN0V3dGpDM01iTDhFN2VJYlpoQUFLV2xmMzJBc0xHdnVqa3d0em16TXJsa09XZWdFV2VGQURqbm9Id1VaNHNTWjRzUi9RRTQ1NkE0ZlFFNGZRRkFJR2VnZkJIbmhZKzVaNkFRWkpGOWdIOS9nTEN4cjdvNU1MYzVzeks1TDdLM01pK0N3QUlCSUJvVUFlRC8vdjBCYldGcGJsOWxlSFJsY201aGJDR09XZjc4QVdkbGRGOXpjbU5mWVdSa2NpRFFJTk1BTW5DOWpocisvUUZuWlhSZmMzSmpYMkZrWkhJd2NNakowRlVSWHdMYk1PQWdjdGNoTVNEVEFESWgra0F6L3YwQloyVjBYM055WTE5aFpHUnlNU0VoVlRGZkJOc3cyREVoRlFINGpuWCsvZ0ZuWlhSZmJYTm5YM0IxWW10bGVTREhBbzRXL3Y4QloyVjBYMjF6WjE5d2RXSnJaWGt4Y0RIYk1PRFZJTWNCamhmKy93Rm5aWFJmYlhOblgzQjFZbXRsZVRKd01USGJNT0FnZ1FJQTF5SFhDLzhpK1FFaUl2a1E4cWorL3dGblpYUmZiWE5uWDNCMVltdGxlVE1nQTE4RDJ6RFlJc2NDc3hZQnpKUWkxREV6M2lRaUlvNDQvdmtCYzNSdmNtVmZjMmxuYndBaGI0d2liNHdqYjR6dFJ5RnZqTzFFMFBRRmI0d2c3VmYrL1FGemRHOXlaVjl6YVdkZlpXNWtYd1hZSXNjQmpoUCsvQUZ0YzJkZmFYTmZaVzF3ZEhsZkJ0c3c0Q0xUSHpRajB6ODFJQmNCZG82QTJJNHYvdjRCYldGcGJsOWxlSFJsY201aGJESWtJbFZ4WHdqeFFBSCsvZ0Z0WVdsdVgyVjRkR1Z5Ym1Gc00xOEkyekRnZ0h6eThGOElHQUgrL3ZzQmNtVndiR0Y1WDNCeWIzUndjSER0Uk5BZzlBUXlOQ0NCQUlEWFJab2cwejh5TXlEVFB6SXlsb0lJRzNkQU11SWlKYmtsK0NPQkEraW9KS0M1c0k0cHlDUUI5QUFsendzL0lzOExQeUhQRmlESjdWVCsvQUZ5WlhCc1lYbGZjSEp2ZERKL0JsOEcyekRnL3Z3QmNtVndiR0Y1WDNCeWIzUXpjQVZmQlJrQUJOc3dBZ0VnSGhzQ0FuTWRIQUFQdEQ5eEE1aHRtRUFBdzdRYVp1ejJvN2VJdDRoQU1uYWp0NGxBSUhvSFNlbi82TWk0Y1YxNWNESjhBSGdRYWIvcEFCaDRFWDkrQUxnNnViUTRNakdidWpleG1uYWlhSG9BNUhhanQ0a0ErZ0FRNTRzUVpQYXFmMzZBdURxNXREZ3lNWnU2TjdHYUdDK0JiWmhBQWdGSUloOEJDYmlKQUNkUUlBSCsvdjBCWTI5dWMzUnlYM0J5YjNSZk1IQndnZ2diZDBEdFJOQWc5QVF5TkNDQkFJRFhSWTRVSU5JL01qTWcwajh5TWlCeDEwV1VnSHZ5OE43ZXlDUUI5QUFqendzL0lzOExQM0hQUVNIUEZpREo3VlQrL1FGamIyNXpkSEpmY0hKdmRGOHhYd1g0QUREd0lmNzhBWEIxYzJod1pHTTNkRzlqTk8xRTBQUUJ5Q0VBUk8xSGJ4SUI5QUFoenhZZ3llMVUvdjBCY0hWemFIQmtZemQwYjJNME1GOEMyekFCNHR6Ky9RRnRZV2x1WDJsdWRHVnlibUZzSVk1Wi92d0JaMlYwWDNOeVkxOWhaR1J5SU5BZzB3QXljTDJPR3Y3OUFXZGxkRjl6Y21OZllXUmtjakJ3eU1uUVZSRmZBdHN3NENCeTF5RXhJTk1BTWlINlFEUCsvUUZuWlhSZmMzSmpYMkZrWkhJeElTRlZNVjhFMnpEWUpDRndJd0hxampqKytRRnpkRzl5WlY5emFXZHZBQ0Z2akNKdmpDTnZqTzFISVcrTTdVVFE5QVZ2akNEdFYvNzlBWE4wYjNKbFgzTnBaMTlsYm1SZkJkZ2l4d0NPSENGd3VvNFNJb0lRWEg3aUIxVlJYd2J4UUFGZkJ0c3c0RjhHMnpEZy92NEJiV0ZwYmw5cGJuUmxjbTVoYkRFaTB4ODBJbkc2SkFBMm5pQ0FJMVZoWHdmeFFBRmZCOXN3NENNaFZXRmZCL0ZBQVY4SCcsXG4gICAgfTtcblxuICAgIHN0YXRpYyBhc3luYyByZXNvbHZlR2l2ZXJQYXJhbWV0ZXJzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBUT05DbGllbnROb2RlSnMuY3JlYXRlKHsgc2VydmVyczogWyduZXQudG9uLmRldiddIH0pO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IGtleXNQYXRoID0gcGF0aC5yZXNvbHZlKG9zLmhvbWVkaXIoKSwgJ2dpdmVyS2V5cy5qc29uJyk7XG4gICAgICAgICAgICBDaGVja05ldHdvcmsuZ2l2ZXJLZXlzID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoa2V5c1BhdGgsICd1dGY4JykpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICB9XG4gICAgICAgIENoZWNrTmV0d29yay5naXZlckFkZHJlc3MgPSAoYXdhaXQgY2xpZW50LmNvbnRyYWN0cy5jcmVhdGVEZXBsb3lNZXNzYWdlKHtcbiAgICAgICAgICAgIHBhY2thZ2U6IENoZWNrTmV0d29yay5naXZlclBhY2thZ2UsXG4gICAgICAgICAgICBjb25zdHJ1Y3RvclBhcmFtczoge30sXG4gICAgICAgICAgICBrZXlQYWlyOiBDaGVja05ldHdvcmsuZ2l2ZXJLZXlzLFxuICAgICAgICB9KSkuYWRkcmVzcztcbiAgICB9XG5cblxufVxuXG4iXX0=