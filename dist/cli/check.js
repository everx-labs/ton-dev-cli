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
                return Promise.race([(0, _utils.inputLine)(), Promise.all([new Promise(function (resolve) {
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
                }))))]);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvY2hlY2suanMiXSwibmFtZXMiOlsib3MiLCJyZXF1aXJlIiwiZnMiLCJwYXRoIiwiY2xpUHJvZ3Jlc3MiLCJfY29sb3JzIiwiQ2hlY2tOZXR3b3JrIiwic2VydmVycyIsInZlcmJvc2UiLCJyZXNvbHZlR2l2ZXJQYXJhbWV0ZXJzIiwiY2hlY2tlcnMiLCJtYXAiLCJzZXJ2ZXIiLCJzZXJ2ZXJNYXhMZW5ndGgiLCJyZWR1Y2UiLCJtYXhMZW5ndGgiLCJNYXRoIiwibWF4IiwibGVuZ3RoIiwibXVsdGlCYXIiLCJNdWx0aUJhciIsImZvcm1hdCIsImJhcnMiLCJjaGVja2VyIiwiY3JlYXRlIiwiZ2V0U3RhdHVzIiwidXBkYXRlTG9nIiwiY29uc29sZSIsImxvZyIsIngiLCJzdGF0dXMiLCJ0aXRsZSIsInRpbWUiLCJqb2luIiwidXBkYXRlQmFyIiwiaSIsInVwZGF0ZSIsInVwZGF0ZVByb2dyZXNzIiwiUHJvbWlzZSIsInJhY2UiLCJhbGwiLCJyZXNvbHZlIiwidGltZXJJZCIsInNldEludGVydmFsIiwidW5maW5pc2hlZCIsImZpbmQiLCJpc0ZpbmlzaGVkIiwiY2xlYXJJbnRlcnZhbCIsInByb2Nlc3MiLCJleGl0IiwiY2hlY2siLCJtZXNzYWdlIiwic3VjY2VlZGVkIiwiZmFpbGVkIiwic3RhcnQiLCJEYXRlIiwibm93IiwicmV0cmllcyIsInNlY29uZHMiLCJtcyIsInJvdW5kIiwiZGVjb3IiLCJyZXNldCIsImdyZWVuIiwicmVkIiwicGFkRW5kIiwicyIsIm9uVXBkYXRlIiwiVE9OQ2xpZW50Tm9kZUpzIiwibG9nX3ZlcmJvc2UiLCJjbGllbnQiLCJjaGVja0dpdmVyIiwiY2hlY2tTZW5kR3JhbXMiLCJyZXBvcnQiLCJlcnJvciIsInF1ZXJpZXMiLCJhY2NvdW50cyIsInF1ZXJ5IiwiaWQiLCJlcSIsImdpdmVyQWRkcmVzcyIsImdpdmVycyIsImdpdmVyQmFsYW5jZSIsIkJpZ0ludCIsImJhbGFuY2UiLCJjb2RlIiwiY29udHJhY3RzIiwiZGVwbG95IiwiZ2l2ZXJQYWNrYWdlIiwia2V5UGFpciIsImdpdmVyS2V5cyIsImNvbnN0cnVjdG9yUGFyYW1zIiwiY3JlYXRlUnVuTWVzc2FnZSIsImFkZHJlc3MiLCJmdW5jdGlvbk5hbWUiLCJhYmkiLCJpbnB1dCIsImRlc3QiLCJ2YWx1ZSIsImJvdW5jZSIsInNldFRpbWVvdXQiLCJyZXRyeSIsInByb2Nlc3NSdW5NZXNzYWdlIiwiZmlyc3QiLCJ0cmFuc2FjdGlvbiIsIm9wdGlvbnMiLCJ1bmRlZmluZWQiLCJ0b1N0cmluZyIsImtleXNQYXRoIiwiaG9tZWRpciIsIkpTT04iLCJwYXJzZSIsInJlYWRGaWxlU3luYyIsImNyZWF0ZURlcGxveU1lc3NhZ2UiLCJzZWNyZXQiLCJpbWFnZUJhc2U2NCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBOztBQUVBOztBQWxCQTs7Ozs7Ozs7Ozs7Ozs7QUFvQkEsSUFBTUEsRUFBRSxHQUFHQyxPQUFPLENBQUMsSUFBRCxDQUFsQjs7QUFDQSxJQUFNQyxFQUFFLEdBQUdELE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQUNBLElBQU1FLElBQUksR0FBR0YsT0FBTyxDQUFDLE1BQUQsQ0FBcEI7O0FBQ0EsSUFBTUcsV0FBVyxHQUFHSCxPQUFPLENBQUMsY0FBRCxDQUEzQjs7QUFDQSxJQUFNSSxPQUFPLEdBQUdKLE9BQU8sQ0FBQyxRQUFELENBQXZCOztJQUVhSyxZOzs7Ozs7OztvREFDa0JDLE8sRUFBbUJDLE87Ozs7Ozs7dUJBQ3BDRixZQUFZLENBQUNHLHNCQUFiLEU7OztBQUNBQyxnQkFBQUEsUSxHQUEyQkgsT0FBTyxDQUFDSSxHQUFSLENBQVksVUFBQ0MsTUFBRCxFQUFZO0FBQ3JELHlCQUFPLElBQUlOLFlBQUosQ0FBaUJNLE1BQWpCLEVBQXlCSixPQUF6QixDQUFQO0FBQ0gsaUJBRmdDLEM7QUFHM0JLLGdCQUFBQSxlLEdBQWtCTixPQUFPLENBQUNPLE1BQVIsQ0FBZSxVQUFDQyxTQUFELEVBQVlILE1BQVo7QUFBQSx5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SSxpQkFBVztBQVBmLEtBTlMsQ0FGWjtBQWtCRCxjQUFVLEVBbEJUO0FBbUJELFlBQVEsQ0FDSjtBQUFFLGFBQU8sR0FBVDtBQUFjLGNBQVEsT0FBdEI7QUFBK0IsY0FBUTtBQUF2QyxLQURJO0FBbkJQLEdBRGE7QUF3QmxCb0IsRUFBQUEsV0FBVyxFQUFFO0FBeEJLLEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG4gKiB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbiAqIExpY2Vuc2UgYXQ6IGh0dHBzOi8vd3d3LnRvbi5kZXYvbGljZW5zZXNcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIFRPTiBERVYgc29mdHdhcmUgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG5cbi8vIEBmbG93XG5pbXBvcnQgeyBUT05DbGllbnQgYXMgVE9OQ2xpZW50Tm9kZUpzIH0gZnJvbSBcInRvbi1jbGllbnQtbm9kZS1qc1wiO1xuaW1wb3J0IHR5cGUgeyBUT05DbGllbnQgfSBmcm9tIFwidG9uLWNsaWVudC1qcy90eXBlc1wiO1xuaW1wb3J0IHsgaW5wdXRMaW5lIH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxzXCI7XG5cbmNvbnN0IG9zID0gcmVxdWlyZSgnb3MnKTtcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCBjbGlQcm9ncmVzcyA9IHJlcXVpcmUoJ2NsaS1wcm9ncmVzcycpO1xuY29uc3QgX2NvbG9ycyA9IHJlcXVpcmUoJ2NvbG9ycycpO1xuXG5leHBvcnQgY2xhc3MgQ2hlY2tOZXR3b3JrIHtcbiAgICBzdGF0aWMgYXN5bmMgY2hlY2tOZXR3b3JrcyhzZXJ2ZXJzOiBzdHJpbmdbXSwgdmVyYm9zZTogYm9vbGVhbik6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBhd2FpdCBDaGVja05ldHdvcmsucmVzb2x2ZUdpdmVyUGFyYW1ldGVycygpO1xuICAgICAgICBjb25zdCBjaGVja2VyczogQ2hlY2tOZXR3b3JrW10gPSBzZXJ2ZXJzLm1hcCgoc2VydmVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IENoZWNrTmV0d29yayhzZXJ2ZXIsIHZlcmJvc2UpO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3Qgc2VydmVyTWF4TGVuZ3RoID0gc2VydmVycy5yZWR1Y2UoKG1heExlbmd0aCwgc2VydmVyKSA9PiBNYXRoLm1heChtYXhMZW5ndGgsIHNlcnZlci5sZW5ndGgpLCAwKTtcbiAgICAgICAgY29uc3QgbXVsdGlCYXIgPSBuZXcgY2xpUHJvZ3Jlc3MuTXVsdGlCYXIoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZm9ybWF0OiAne3N0YXR1c317dGl0bGV9e3RpbWV9e21lc3NhZ2V9JyxcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgYmFycyA9IGNoZWNrZXJzLm1hcChjaGVja2VyID0+IG11bHRpQmFyLmNyZWF0ZSgxMDAsIDAsIGNoZWNrZXIuZ2V0U3RhdHVzKHNlcnZlck1heExlbmd0aCkpKTtcbiAgICAgICAgY29uc3QgdXBkYXRlTG9nID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coY2hlY2tlcnNcbiAgICAgICAgICAgICAgICAubWFwKHggPT4geC5nZXRTdGF0dXMoc2VydmVyTWF4TGVuZ3RoKSlcbiAgICAgICAgICAgICAgICAubWFwKHN0YXR1cyA9PiBgJHtzdGF0dXMudGl0bGV9JHtzdGF0dXMudGltZX0ke3N0YXR1cy5zdGF0dXN9YClcbiAgICAgICAgICAgICAgICAuam9pbignIC8gJylcbiAgICAgICAgICAgICk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHVwZGF0ZUJhciA9ICgpID0+IHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hlY2tlcnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBiYXJzW2ldLnVwZGF0ZSgxLCBjaGVja2Vyc1tpXS5nZXRTdGF0dXMoc2VydmVyTWF4TGVuZ3RoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHVwZGF0ZVByb2dyZXNzID0gYmFyc1swXSA/IHVwZGF0ZUJhciA6IHVwZGF0ZUxvZztcblxuICAgICAgICBhd2FpdCBQcm9taXNlLnJhY2UoW1xuICAgICAgICAgICAgaW5wdXRMaW5lKCksXG4gICAgICAgICAgICBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGltZXJJZCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVByb2dyZXNzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1bmZpbmlzaGVkID0gY2hlY2tlcnMuZmluZCh4ID0+ICF4LmlzRmluaXNoZWQoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXVuZmluaXNoZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVySWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9LCAxXzAwMClcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAuLi5jaGVja2Vycy5tYXAoKGNoZWNrZXI6IENoZWNrTmV0d29yaykgPT4gY2hlY2tlci5jaGVjayh1cGRhdGVQcm9ncmVzcykpXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgc2VydmVyOiBzdHJpbmc7XG4gICAgdmVyYm9zZTogYm9vbGVhbjtcbiAgICBjbGllbnQ6IFRPTkNsaWVudDtcbiAgICBvblVwZGF0ZTogKCkgPT4gdm9pZDtcblxuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICBzdWNjZWVkZWQ6IGJvb2xlYW47XG4gICAgZmFpbGVkOiBib29sZWFuO1xuICAgIHN0YXJ0OiBudW1iZXI7XG4gICAgdGltZTogbnVtYmVyO1xuICAgIHJldHJpZXM6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHNlcnZlcjogc3RyaW5nLCB2ZXJib3NlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuc2VydmVyID0gc2VydmVyO1xuICAgICAgICB0aGlzLnZlcmJvc2UgPSB2ZXJib3NlO1xuXG4gICAgICAgIHRoaXMubWVzc2FnZSA9ICcnO1xuICAgICAgICB0aGlzLnN1Y2NlZWRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZhaWxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdGhpcy50aW1lID0gMDtcbiAgICAgICAgdGhpcy5yZXRyaWVzID0gMDtcbiAgICB9XG5cbiAgICBnZXRTdGF0dXMoc2VydmVyTWF4TGVuZ3RoOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3Qgc2Vjb25kcyA9IChtczogbnVtYmVyLCByb3VuZDogYm9vbGVhbik6IG51bWJlciA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcm91bmQgPyBNYXRoLnJvdW5kKG1zIC8gMV8wMDApIDogKG1zIC8gMV8wMDApO1xuICAgICAgICB9O1xuXG4gICAgICAgIGxldCBkZWNvciA9IF9jb2xvcnMucmVzZXQ7XG4gICAgICAgIGlmICh0aGlzLnN1Y2NlZWRlZCkge1xuICAgICAgICAgICAgZGVjb3IgPSBfY29sb3JzLmdyZWVuO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZmFpbGVkKSB7XG4gICAgICAgICAgICBkZWNvciA9IF9jb2xvcnMucmVkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN0YXR1cyA9IHtcbiAgICAgICAgICAgIHN0YXR1czogJyAgJyxcbiAgICAgICAgICAgIHRpdGxlOiBkZWNvcih0aGlzLnNlcnZlci5wYWRFbmQoc2VydmVyTWF4TGVuZ3RoKSksXG4gICAgICAgICAgICB0aW1lOiAnJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6ICcnLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCByZXRyaWVzID0gdGhpcy5yZXRyaWVzID4gMCA/IGAgKCR7dGhpcy5yZXRyaWVzICsgMX0pYCA6ICcnO1xuICAgICAgICBpZiAodGhpcy5pc0ZpbmlzaGVkKCkpIHtcbiAgICAgICAgICAgIHN0YXR1cy5zdGF0dXMgPSBkZWNvcih0aGlzLnN1Y2NlZWRlZCA/ICfinJMgJyA6ICfinJYgJyk7XG4gICAgICAgICAgICBzdGF0dXMudGltZSA9IGRlY29yKGAg4oCmICR7c2Vjb25kcyh0aGlzLnRpbWUsIGZhbHNlKX1zJHtyZXRyaWVzfWApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgcyA9IHNlY29uZHMoRGF0ZS5ub3coKSAtIHRoaXMuc3RhcnQsIHRydWUpO1xuICAgICAgICAgICAgaWYgKHMgPiAwKSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzLnRpbWUgPSBkZWNvcihgIOKApiAke3N9cyR7cmV0cmllc31gKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmV0cmllcyAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICBzdGF0dXMudGltZSA9IGRlY29yKGAg4oCmJHtyZXRyaWVzfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5zdWNjZWVkZWQpIHtcbiAgICAgICAgICAgIHN0YXR1cy5tZXNzYWdlID0gdGhpcy5tZXNzYWdlICE9PSAnJyA/IGRlY29yKGAg4oCmICR7dGhpcy5tZXNzYWdlfWApIDogJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0YXR1cztcbiAgICB9XG5cbiAgICBhc3luYyBjaGVjayhvblVwZGF0ZTogKCkgPT4gdm9pZCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICB0aGlzLm9uVXBkYXRlID0gb25VcGRhdGU7XG4gICAgICAgIHRoaXMuY2xpZW50ID0gYXdhaXQgVE9OQ2xpZW50Tm9kZUpzLmNyZWF0ZSh7XG4gICAgICAgICAgICBzZXJ2ZXJzOiBbdGhpcy5zZXJ2ZXJdLFxuICAgICAgICAgICAgbG9nX3ZlcmJvc2U6IHRoaXMudmVyYm9zZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmNoZWNrR2l2ZXIoKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY2hlY2tTZW5kR3JhbXMoKTtcbiAgICAgICAgICAgIHRoaXMucmVwb3J0KHsgc3VjY2VlZGVkOiB0cnVlIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhpcy5yZXBvcnQoeyBlcnJvciB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGNoZWNrR2l2ZXIoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHRoaXMucmVwb3J0KHsgbWVzc2FnZTogJ2xvb2tpbmcgZm9yIGdpdmVyJyB9KTtcbiAgICAgICAgY29uc3QgZ2l2ZXJzID0gYXdhaXQgdGhpcy5jbGllbnQucXVlcmllcy5hY2NvdW50cy5xdWVyeShcbiAgICAgICAgICAgIHsgaWQ6IHsgZXE6IENoZWNrTmV0d29yay5naXZlckFkZHJlc3MgfSB9LFxuICAgICAgICAgICAgJ2JhbGFuY2UgY29kZScpO1xuICAgICAgICBpZiAoZ2l2ZXJzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIHRoaXMucmVwb3J0KHsgZXJyb3I6ICdubyBnaXZlcicgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8kRmxvd0ZpeE1lXG4gICAgICAgIGNvbnN0IGdpdmVyQmFsYW5jZSA9IEJpZ0ludChnaXZlcnNbMF0uYmFsYW5jZSk7XG4gICAgICAgIGlmIChnaXZlckJhbGFuY2UgPT09IEJpZ0ludCgwKSkge1xuICAgICAgICAgICAgdGhpcy5yZXBvcnQoeyBlcnJvcjogJ2dpdmVyIGJhbGFuY2UgaXMgZW1wdHknIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChnaXZlckJhbGFuY2UgPCBCaWdJbnQoMV8wMDBfMDAwXzAwMCkpIHtcbiAgICAgICAgICAgIHRoaXMucmVwb3J0KHsgZXJyb3I6IGBnaXZlciBiYWxhbmNlIHRvbyBsb3c6ICR7Z2l2ZXJCYWxhbmNlfWAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFnaXZlcnNbMF0uY29kZSkge1xuICAgICAgICAgICAgdGhpcy5yZXBvcnQoeyBtZXNzYWdlOiBgZGVwbG95aW5nIGdpdmVyLCBiYWxhbmNlOiAke2dpdmVyQmFsYW5jZX1gIH0pO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5jbGllbnQuY29udHJhY3RzLmRlcGxveSh7XG4gICAgICAgICAgICAgICAgcGFja2FnZTogQ2hlY2tOZXR3b3JrLmdpdmVyUGFja2FnZSxcbiAgICAgICAgICAgICAgICBrZXlQYWlyOiBDaGVja05ldHdvcmsuZ2l2ZXJLZXlzLFxuICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yUGFyYW1zOiB7fSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5yZXBvcnQoeyBzdWNjZWVkZWQ6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBjaGVja1NlbmRHcmFtcygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMucmVwb3J0KHsgbWVzc2FnZTogJ3NlbmRpbmcgMC4wMDFHJyB9KTtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBhd2FpdCB0aGlzLmNsaWVudC5jb250cmFjdHMuY3JlYXRlUnVuTWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgYWRkcmVzczogQ2hlY2tOZXR3b3JrLmdpdmVyQWRkcmVzcyxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbk5hbWU6ICdzZW5kVHJhbnNhY3Rpb24nLFxuICAgICAgICAgICAgICAgIGFiaTogQ2hlY2tOZXR3b3JrLmdpdmVyUGFja2FnZS5hYmksXG4gICAgICAgICAgICAgICAgaW5wdXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgZGVzdDogJzA6YWRiNjNhMjI4ODM3ZTQ3OGM3ZWRmNWZlM2YwYjVkMTIxODNlMWYyMjI0NmI2NzcxMmI5OWVjNTM4ZDZjNTM1NycsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAxXzAwMF8wMDAsXG4gICAgICAgICAgICAgICAgICAgIGJvdW5jZTogZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGtleVBhaXI6IENoZWNrTmV0d29yay5naXZlcktleXMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0ID0gYXdhaXQgUHJvbWlzZS5yYWNlKFtcbiAgICAgICAgICAgICAgICBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHJlc29sdmUsIDMwXzAwMCwgeyByZXRyeTogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWVudC5jb250cmFjdHMucHJvY2Vzc1J1bk1lc3NhZ2UobWVzc2FnZSlcbiAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgaWYgKGZpcnN0ICYmIGZpcnN0LnRyYW5zYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5yZXRyaWVzICs9IDE7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzRmluaXNoZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN1Y2NlZWRlZCB8fCB0aGlzLmZhaWxlZDtcbiAgICB9XG5cbiAgICByZXBvcnQob3B0aW9uczoge1xuICAgICAgICBzdWNjZWVkZWQ/OiBib29sZWFuLFxuICAgICAgICBlcnJvcj86IGFueSxcbiAgICAgICAgbWVzc2FnZT86IHN0cmluZyxcbiAgICB9KSB7XG4gICAgICAgIGlmIChvcHRpb25zLnN1Y2NlZWRlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnN1Y2NlZWRlZCA9IG9wdGlvbnMuc3VjY2VlZGVkO1xuICAgICAgICAgICAgdGhpcy5mYWlsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9ICcnO1xuICAgICAgICAgICAgdGhpcy50aW1lID0gRGF0ZS5ub3coKSAtIHRoaXMuc3RhcnQ7XG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5lcnJvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSAob3B0aW9ucy5lcnJvciAmJiBvcHRpb25zLmVycm9yLm1lc3NhZ2UpXG4gICAgICAgICAgICAgICAgPyBvcHRpb25zLmVycm9yLm1lc3NhZ2VcbiAgICAgICAgICAgICAgICA6IChvcHRpb25zLmVycm9yIHx8ICcnKS50b1N0cmluZygpO1xuICAgICAgICAgICAgdGhpcy5mYWlsZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zdWNjZWVkZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMudGltZSA9IERhdGUubm93KCkgLSB0aGlzLnN0YXJ0O1xuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMubWVzc2FnZSAhPT0gdW5kZWZpbmVkICYmICF0aGlzLmlzRmluaXNoZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gb3B0aW9ucy5tZXNzYWdlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25VcGRhdGUoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2l2ZXJBZGRyZXNzID0gJzA6NWIxNjg5NzBhOWM2M2RkNWM0MmE2YWZiY2Y3MDZlZjY1MjQ3NmJiODk2MGEyMmUxZDhhMmFkMTQ4ZTYwYzBlYSc7XG4gICAgc3RhdGljIGdpdmVyS2V5cyA9IHtcbiAgICAgICAgc2VjcmV0OiAnMjI0NWU0ZjQ0YWY4YWY2YmJkMTVjNGE1M2ViNjdhOGYyMTFkNTQxZGRjN2MxOTdmNzRkNzgzMGRiYTZkMjdmZScsXG4gICAgICAgIHB1YmxpYzogJ2Q1NDJmNDQxNDZmMTY5YzY3MjZjOGNmNzBlNGNiYjNkMzNkOGQ4NDJhNGFmZDc5OWFjMTIyYzU4MDhkODFiYTMnLFxuICAgIH07XG4gICAgc3RhdGljIGdpdmVyUGFja2FnZSA9IHtcbiAgICAgICAgYWJpOiB7XG4gICAgICAgICAgICBcIkFCSSB2ZXJzaW9uXCI6IDEsXG4gICAgICAgICAgICBcImZ1bmN0aW9uc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJjb25zdHJ1Y3RvclwiLFxuICAgICAgICAgICAgICAgICAgICBcImlucHV0c1wiOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgXCJvdXRwdXRzXCI6IFtdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcInNlbmRUcmFuc2FjdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICBcImlucHV0c1wiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7IFwibmFtZVwiOiBcImRlc3RcIiwgXCJ0eXBlXCI6IFwiYWRkcmVzc1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IFwibmFtZVwiOiBcInZhbHVlXCIsIFwidHlwZVwiOiBcInVpbnQxMjhcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJib3VuY2VcIiwgXCJ0eXBlXCI6IFwiYm9vbFwiIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgXCJvdXRwdXRzXCI6IFtdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFwiZXZlbnRzXCI6IFtdLFxuICAgICAgICAgICAgXCJkYXRhXCI6IFtcbiAgICAgICAgICAgICAgICB7IFwia2V5XCI6IDEwMCwgXCJuYW1lXCI6IFwib3duZXJcIiwgXCJ0eXBlXCI6IFwidWludDI1NlwiIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgaW1hZ2VCYXNlNjQ6ICd0ZTZjY2dFQ0pRRUFCZDhBQWdFMEJnRUJBY0FDQWdQUElBVURBUUhlQkFBRDBDQUFRZGdBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUJBSW8vd0Fnd0FIMHBDQllrdlNnNFlydFUxZ3c5S0FUQndFSzlLUWc5S0VJQWdQTlFCQUpBZ0hPRFFvQ0FTQU1Dd0FIRERiTUlBQW5DRnd2Q0x3R2Jtdzh1Qm1JaUlpY2ZBS1h3T0FDQVNBUERnQTFPMUhieEZ2RU1qTC80Qms3VWR2RW9CQTlFUHRSd0Z2VXUxWGdBTlUvdnNCWkdWamIyUmxYMkZrWkhJZytrQXkra0lnYnhBZ2Nyb2hjN3F4OHVCOUlXOFJidkxnZmNoMHp3c0NJbThTendvSEltOFRJbks2bGlOdkV5TE9NcDhoZ1FFQUl0ZEpvYzlBTWlBaXpqTGkvdndCWkdWamIyUmxYMkZrWkhJd0ljblFKVlZCWHdYYk1JQUlCSUJJUkFDdWsvMzJBczdLNkw3RXd0akMzTWJMOEU3ZUliWmhBQUtXbGYzMkFzTEd2dWprd3R6bXpNcmxrT1dlZ0VXZUZBRGpub0h3VVo0c1NaNHNSL1FFNDU2QTRmUUU0ZlFGQUlHZWdmQkhuaFkrNVo2QVFaSkY5Z0g5L2dMQ3hyN281TUxjNXN6SzVMN0szTWkrQ3dBSUJJQm9VQWVELy92MEJiV0ZwYmw5bGVIUmxjbTVoYkNHT1dmNzhBV2RsZEY5emNtTmZZV1JrY2lEUUlOTUFNbkM5amhyKy9RRm5aWFJmYzNKalgyRmtaSEl3Y01qSjBGVVJYd0xiTU9BZ2N0Y2hNU0RUQURJaCtrQXovdjBCWjJWMFgzTnlZMTloWkdSeU1TRWhWVEZmQk5zdzJERWhGUUg0am5YKy9nRm5aWFJmYlhOblgzQjFZbXRsZVNESEFvNFcvdjhCWjJWMFgyMXpaMTl3ZFdKclpYa3hjREhiTU9EVklNY0JqaGYrL3dGblpYUmZiWE5uWDNCMVltdGxlVEp3TVRIYk1PQWdnUUlBMXlIWEMvOGkrUUVpSXZrUThxaisvd0ZuWlhSZmJYTm5YM0IxWW10bGVUTWdBMThEMnpEWUlzY0NzeFlCekpRaTFERXozaVFpSW80NC92a0JjM1J2Y21WZmMybG5id0FoYjR3aWI0d2piNHp0UnlGdmpPMUUwUFFGYjR3ZzdWZisvUUZ6ZEc5eVpWOXphV2RmWlc1a1h3WFlJc2NCamhQKy9BRnRjMmRmYVhOZlpXMXdkSGxmQnRzdzRDTFRIelFqMHo4MUlCY0JkbzZBMkk0di92NEJiV0ZwYmw5bGVIUmxjbTVoYkRJa0lsVnhYd2p4UUFIKy9nRnRZV2x1WDJWNGRHVnlibUZzTTE4STJ6RGdnSHp5OEY4SUdBSCsvdnNCY21Wd2JHRjVYM0J5YjNSd2NIRHRSTkFnOUFReU5DQ0JBSURYUlpvZzB6OHlNeURUUHpJeWxvSUlHM2RBTXVJaUpia2wrQ09CQStpb0pLQzVzSTRweUNRQjlBQWx6d3MvSXM4TFB5SFBGaURKN1ZUKy9BRnlaWEJzWVhsZmNISnZkREovQmw4RzJ6RGcvdndCY21Wd2JHRjVYM0J5YjNRemNBVmZCUmtBQk5zd0FnRWdIaHNDQW5NZEhBQVB0RDl4QTVodG1FQUF3N1FhWnV6Mm83ZUl0NGhBTW5hanQ0bEFJSG9IU2VuLzZNaTRjVjE1Y0RKOEFIZ1FhYi9wQUJoNEVYOStBTGc2dWJRNE1qR2J1amV4bW5haWFIb0E1SGFqdDRrQStnQVE1NHNRWlBhcWYzNkF1RHE1dERneU1adTZON0dhR0MrQmJaaEFBZ0ZJSWg4QkNiaUpBQ2RRSUFIKy92MEJZMjl1YzNSeVgzQnliM1JmTUhCd2dnZ2JkMER0Uk5BZzlBUXlOQ0NCQUlEWFJZNFVJTkkvTWpNZzBqOHlNaUJ4MTBXVWdIdnk4TjdleUNRQjlBQWp6d3MvSXM4TFAzSFBRU0hQRmlESjdWVCsvUUZqYjI1emRISmZjSEp2ZEY4eFh3WDRBRER3SWY3OEFYQjFjMmh3WkdNM2RHOWpOTzFFMFBRQnlDRUFSTzFIYnhJQjlBQWh6eFlneWUxVS92MEJjSFZ6YUhCa1l6ZDBiMk0wTUY4QzJ6QUI0dHorL1FGdFlXbHVYMmx1ZEdWeWJtRnNJWTVaL3Z3QloyVjBYM055WTE5aFpHUnlJTkFnMHdBeWNMMk9Hdjc5QVdkbGRGOXpjbU5mWVdSa2NqQnd5TW5RVlJGZkF0c3c0Q0J5MXlFeElOTUFNaUg2UURQKy9RRm5aWFJmYzNKalgyRmtaSEl4SVNGVk1WOEUyekRZSkNGd0l3SHFqamorK1FGemRHOXlaVjl6YVdkdkFDRnZqQ0p2akNOdmpPMUhJVytNN1VUUTlBVnZqQ0R0Vi83OUFYTjBiM0psWDNOcFoxOWxibVJmQmRnaXh3Q09IQ0Z3dW80U0lvSVFYSDdpQjFWUlh3YnhRQUZmQnRzdzRGOEcyekRnL3Y0QmJXRnBibDlwYm5SbGNtNWhiREVpMHg4MEluRzZKQUEybmlDQUkxVmhYd2Z4UUFGZkI5c3c0Q01oVldGZkIvRkFBVjhIJyxcbiAgICB9O1xuXG4gICAgc3RhdGljIGFzeW5jIHJlc29sdmVHaXZlclBhcmFtZXRlcnMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IFRPTkNsaWVudE5vZGVKcy5jcmVhdGUoeyBzZXJ2ZXJzOiBbJ25ldC50b24uZGV2J10gfSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQga2V5c1BhdGggPSBwYXRoLnJlc29sdmUob3MuaG9tZWRpcigpLCAnZ2l2ZXJLZXlzLmpzb24nKTtcbiAgICAgICAgICAgIENoZWNrTmV0d29yay5naXZlcktleXMgPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhrZXlzUGF0aCwgJ3V0ZjgnKSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIH1cbiAgICAgICAgQ2hlY2tOZXR3b3JrLmdpdmVyQWRkcmVzcyA9IChhd2FpdCBjbGllbnQuY29udHJhY3RzLmNyZWF0ZURlcGxveU1lc3NhZ2Uoe1xuICAgICAgICAgICAgcGFja2FnZTogQ2hlY2tOZXR3b3JrLmdpdmVyUGFja2FnZSxcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yUGFyYW1zOiB7fSxcbiAgICAgICAgICAgIGtleVBhaXI6IENoZWNrTmV0d29yay5naXZlcktleXMsXG4gICAgICAgIH0pKS5hZGRyZXNzO1xuICAgIH1cblxuXG59XG5cbiJdfQ==