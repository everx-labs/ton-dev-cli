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
        var checkers, seconds, serverMaxLength, multiBar, bars, updateLog, updateBar, updateProgress;
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
                seconds = 0;
                serverMaxLength = servers.reduce(function (maxLength, server) {
                  return Math.max(maxLength, server.length);
                }, 0);
                multiBar = new cliProgress.MultiBar({
                  format: '{status}{title}{time}{message}'
                });
                bars = checkers.map(function (checker) {
                  return multiBar.create(100, 0, checker.getStatus(seconds, serverMaxLength));
                });

                updateLog = function updateLog() {
                  console.log(checkers.map(function (x) {
                    return x.getStatus(seconds, serverMaxLength);
                  }).map(function (status) {
                    return "".concat(status.title).concat(status.time).concat(status.status);
                  }).join(' / '));
                };

                updateBar = function updateBar() {
                  for (var i = 0; i < checkers.length; i += 1) {
                    bars[i].update(1, checkers[i].getStatus(seconds, serverMaxLength));
                  }
                };

                updateProgress = bars[0] ? updateBar : updateLog;
                _context.next = 12;
                return Promise.all([new Promise(function (resolve) {
                  var timerId = setInterval(function () {
                    seconds += 1;
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

              case 12:
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
    value: function getStatus(seconds, serverMaxLength) {
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
        status.time = decor(" \u2026 ".concat(this.time / 1000, "s").concat(retries));
      } else if (seconds > 0) {
        status.time = decor(" \u2026 ".concat(seconds, "s").concat(retries));
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
        var first;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!true) {
                  _context4.next = 10;
                  break;
                }

                this.report({
                  message: 'sending 0.001G'
                });
                _context4.next = 4;
                return Promise.race([new Promise(function (resolve) {
                  setTimeout(resolve, 30000, {
                    retry: true
                  });
                }), this.client.contracts.run({
                  address: CheckNetwork.giverAddress,
                  functionName: 'sendTransaction',
                  abi: CheckNetwork.giverPackage.abi,
                  input: {
                    dest: '0:adb63a228837e478c7edf5fe3f0b5d12183e1f22246b67712b99ec538d6c5357',
                    value: 1000000,
                    bounce: false
                  },
                  keyPair: CheckNetwork.giverKeys
                })]);

              case 4:
                first = _context4.sent;

                if (!(first && first.transaction)) {
                  _context4.next = 7;
                  break;
                }

                return _context4.abrupt("return");

              case 7:
                this.retries += 1;
                _context4.next = 0;
                break;

              case 10:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvY2hlY2suanMiXSwibmFtZXMiOlsib3MiLCJyZXF1aXJlIiwiZnMiLCJwYXRoIiwiY2xpUHJvZ3Jlc3MiLCJfY29sb3JzIiwiQ2hlY2tOZXR3b3JrIiwic2VydmVycyIsInZlcmJvc2UiLCJyZXNvbHZlR2l2ZXJQYXJhbWV0ZXJzIiwiY2hlY2tlcnMiLCJtYXAiLCJzZXJ2ZXIiLCJzZWNvbmRzIiwic2VydmVyTWF4TGVuZ3RoIiwicmVkdWNlIiwibWF4TGVuZ3RoIiwiTWF0aCIsIm1heCIsImxlbmd0aCIsIm11bHRpQmFyIiwiTXVsdGlCYXIiLCJmb3JtYXQiLCJiYXJzIiwiY2hlY2tlciIsImNyZWF0ZSIsImdldFN0YXR1cyIsInVwZGF0ZUxvZyIsImNvbnNvbGUiLCJsb2ciLCJ4Iiwic3RhdHVzIiwidGl0bGUiLCJ0aW1lIiwiam9pbiIsInVwZGF0ZUJhciIsImkiLCJ1cGRhdGUiLCJ1cGRhdGVQcm9ncmVzcyIsIlByb21pc2UiLCJhbGwiLCJyZXNvbHZlIiwidGltZXJJZCIsInNldEludGVydmFsIiwidW5maW5pc2hlZCIsImZpbmQiLCJpc0ZpbmlzaGVkIiwiY2xlYXJJbnRlcnZhbCIsInByb2Nlc3MiLCJleGl0IiwiY2hlY2siLCJtZXNzYWdlIiwic3VjY2VlZGVkIiwiZmFpbGVkIiwic3RhcnQiLCJEYXRlIiwibm93IiwicmV0cmllcyIsImRlY29yIiwicmVzZXQiLCJncmVlbiIsInJlZCIsInBhZEVuZCIsIm9uVXBkYXRlIiwiVE9OQ2xpZW50Tm9kZUpzIiwibG9nX3ZlcmJvc2UiLCJjbGllbnQiLCJjaGVja0dpdmVyIiwiY2hlY2tTZW5kR3JhbXMiLCJyZXBvcnQiLCJlcnJvciIsInF1ZXJpZXMiLCJhY2NvdW50cyIsInF1ZXJ5IiwiaWQiLCJlcSIsImdpdmVyQWRkcmVzcyIsImdpdmVycyIsImdpdmVyQmFsYW5jZSIsIkJpZ0ludCIsImJhbGFuY2UiLCJjb2RlIiwiY29udHJhY3RzIiwiZGVwbG95IiwiZ2l2ZXJQYWNrYWdlIiwia2V5UGFpciIsImdpdmVyS2V5cyIsImNvbnN0cnVjdG9yUGFyYW1zIiwicmFjZSIsInNldFRpbWVvdXQiLCJyZXRyeSIsInJ1biIsImFkZHJlc3MiLCJmdW5jdGlvbk5hbWUiLCJhYmkiLCJpbnB1dCIsImRlc3QiLCJ2YWx1ZSIsImJvdW5jZSIsImZpcnN0IiwidHJhbnNhY3Rpb24iLCJvcHRpb25zIiwidW5kZWZpbmVkIiwidG9TdHJpbmciLCJrZXlzUGF0aCIsImhvbWVkaXIiLCJKU09OIiwicGFyc2UiLCJyZWFkRmlsZVN5bmMiLCJjcmVhdGVEZXBsb3lNZXNzYWdlIiwic2VjcmV0IiwiaW1hZ2VCYXNlNjQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQTs7QUFoQkE7Ozs7Ozs7Ozs7Ozs7O0FBbUJBLElBQU1BLEVBQUUsR0FBR0MsT0FBTyxDQUFDLElBQUQsQ0FBbEI7O0FBQ0EsSUFBTUMsRUFBRSxHQUFHRCxPQUFPLENBQUMsSUFBRCxDQUFsQjs7QUFDQSxJQUFNRSxJQUFJLEdBQUdGLE9BQU8sQ0FBQyxNQUFELENBQXBCOztBQUNBLElBQU1HLFdBQVcsR0FBR0gsT0FBTyxDQUFDLGNBQUQsQ0FBM0I7O0FBQ0EsSUFBTUksT0FBTyxHQUFHSixPQUFPLENBQUMsUUFBRCxDQUF2Qjs7SUFFYUssWTs7Ozs7Ozs7b0RBQ2tCQyxPLEVBQW1CQyxPOzs7Ozs7O3VCQUNwQ0YsWUFBWSxDQUFDRyxzQkFBYixFOzs7QUFDQUMsZ0JBQUFBLFEsR0FBMkJILE9BQU8sQ0FBQ0ksR0FBUixDQUFZLFVBQUFDLE1BQU07QUFBQSx5QkFBSSxJQUFJTixZQUFKLENBQWlCTSxNQUFqQixFQUF5QkosT0FBekIsQ0FBSjtBQUFBLGlCQUFsQixDO0FBQzdCSyxnQkFBQUEsTyxHQUFrQixDO0FBQ2hCQyxnQkFBQUEsZSxHQUFrQlAsT0FBTyxDQUFDUSxNQUFSLENBQWUsVUFBQ0MsU0FBRCxFQUFZSixNQUFaO0FBQUEseUJBQXVCSyxJQUFJLENBQUNDLEdBQUwsQ0FBU0YsU0FBVCxFQUFv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Ozs7Ozs7Ozs7Ozs7O2lDQTFPQ3RGLFksa0JBK0xhLG9FO2lDQS9MYkEsWSxlQWdNVTtBQUNmd0csRUFBQUEsTUFBTSxFQUFFLGtFQURPO0FBRWYsWUFBUTtBQUZPLEM7aUNBaE1WeEcsWSxrQkFvTWE7QUFDbEJ3RixFQUFBQSxHQUFHLEVBQUU7QUFDRCxtQkFBZSxDQURkO0FBRUQsaUJBQWEsQ0FDVDtBQUNJLGNBQVEsYUFEWjtBQUVJLGdCQUFVLEVBRmQ7QUFHSSxpQkFBVztBQUhmLEtBRFMsRUFNVDtBQUNJLGNBQVEsaUJBRFo7QUFFSSxnQkFBVSxDQUNOO0FBQUUsZ0JBQVEsTUFBVjtBQUFrQixnQkFBUTtBQUExQixPQURNLEVBRU47QUFBRSxnQkFBUSxPQUFWO0FBQW1CLGdCQUFRO0FBQTNCLE9BRk0sRUFHTjtBQUFFLGdCQUFRLFFBQVY7QUFBb0IsZ0JBQVE7QUFBNUIsT0FITSxDQUZkO0FBT0ksaUJBQVc7QUFQZixLQU5TLENBRlo7QUFrQkQsY0FBVSxFQWxCVDtBQW1CRCxZQUFRLENBQ0o7QUFBRSxhQUFPLEdBQVQ7QUFBYyxjQUFRLE9BQXRCO0FBQStCLGNBQVE7QUFBdkMsS0FESTtBQW5CUCxHQURhO0FBd0JsQmlCLEVBQUFBLFdBQVcsRUFBRTtBQXhCSyxDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuXG4vLyBAZmxvd1xuaW1wb3J0IHsgVE9OQ2xpZW50IGFzIFRPTkNsaWVudE5vZGVKcyB9IGZyb20gXCJ0b24tY2xpZW50LW5vZGUtanNcIjtcbmltcG9ydCB0eXBlIHsgVE9OQ2xpZW50IH0gZnJvbSBcInRvbi1jbGllbnQtanMvdHlwZXNcIjtcblxuY29uc3Qgb3MgPSByZXF1aXJlKCdvcycpO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IGNsaVByb2dyZXNzID0gcmVxdWlyZSgnY2xpLXByb2dyZXNzJyk7XG5jb25zdCBfY29sb3JzID0gcmVxdWlyZSgnY29sb3JzJyk7XG5cbmV4cG9ydCBjbGFzcyBDaGVja05ldHdvcmsge1xuICAgIHN0YXRpYyBhc3luYyBjaGVja05ldHdvcmtzKHNlcnZlcnM6IHN0cmluZ1tdLCB2ZXJib3NlOiBib29sZWFuKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGF3YWl0IENoZWNrTmV0d29yay5yZXNvbHZlR2l2ZXJQYXJhbWV0ZXJzKCk7XG4gICAgICAgIGNvbnN0IGNoZWNrZXJzOiBDaGVja05ldHdvcmtbXSA9IHNlcnZlcnMubWFwKHNlcnZlciA9PiBuZXcgQ2hlY2tOZXR3b3JrKHNlcnZlciwgdmVyYm9zZSkpO1xuICAgICAgICBsZXQgc2Vjb25kczogbnVtYmVyID0gMDtcbiAgICAgICAgY29uc3Qgc2VydmVyTWF4TGVuZ3RoID0gc2VydmVycy5yZWR1Y2UoKG1heExlbmd0aCwgc2VydmVyKSA9PiBNYXRoLm1heChtYXhMZW5ndGgsIHNlcnZlci5sZW5ndGgpLCAwKTtcbiAgICAgICAgY29uc3QgbXVsdGlCYXIgPSBuZXcgY2xpUHJvZ3Jlc3MuTXVsdGlCYXIoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZm9ybWF0OiAne3N0YXR1c317dGl0bGV9e3RpbWV9e21lc3NhZ2V9JyxcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgYmFycyA9IGNoZWNrZXJzLm1hcChjaGVja2VyID0+IG11bHRpQmFyLmNyZWF0ZSgxMDAsIDAsIGNoZWNrZXIuZ2V0U3RhdHVzKHNlY29uZHMsIHNlcnZlck1heExlbmd0aCkpKTtcbiAgICAgICAgY29uc3QgdXBkYXRlTG9nID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coY2hlY2tlcnNcbiAgICAgICAgICAgICAgICAubWFwKHggPT4geC5nZXRTdGF0dXMoc2Vjb25kcywgc2VydmVyTWF4TGVuZ3RoKSlcbiAgICAgICAgICAgICAgICAubWFwKHN0YXR1cyA9PiBgJHtzdGF0dXMudGl0bGV9JHtzdGF0dXMudGltZX0ke3N0YXR1cy5zdGF0dXN9YClcbiAgICAgICAgICAgICAgICAuam9pbignIC8gJylcbiAgICAgICAgICAgICk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHVwZGF0ZUJhciA9ICgpID0+IHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hlY2tlcnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBiYXJzW2ldLnVwZGF0ZSgxLCBjaGVja2Vyc1tpXS5nZXRTdGF0dXMoc2Vjb25kcywgc2VydmVyTWF4TGVuZ3RoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHVwZGF0ZVByb2dyZXNzID0gYmFyc1swXSA/IHVwZGF0ZUJhciA6IHVwZGF0ZUxvZztcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lcklkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWNvbmRzICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVByb2dyZXNzKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVuZmluaXNoZWQgPSBjaGVja2Vycy5maW5kKHggPT4gIXguaXNGaW5pc2hlZCgpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF1bmZpbmlzaGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVySWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIDFfMDAwKVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAuLi5jaGVja2Vycy5tYXAoKGNoZWNrZXI6IENoZWNrTmV0d29yaykgPT4gY2hlY2tlci5jaGVjayh1cGRhdGVQcm9ncmVzcykpXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIHNlcnZlcjogc3RyaW5nO1xuICAgIHZlcmJvc2U6IGJvb2xlYW47XG4gICAgY2xpZW50OiBUT05DbGllbnQ7XG4gICAgb25VcGRhdGU6ICgpID0+IHZvaWQ7XG5cbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgc3VjY2VlZGVkOiBib29sZWFuO1xuICAgIGZhaWxlZDogYm9vbGVhbjtcbiAgICBzdGFydDogbnVtYmVyO1xuICAgIHRpbWU6IG51bWJlcjtcbiAgICByZXRyaWVzOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihzZXJ2ZXI6IHN0cmluZywgdmVyYm9zZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLnNlcnZlciA9IHNlcnZlcjtcbiAgICAgICAgdGhpcy52ZXJib3NlID0gdmVyYm9zZTtcblxuICAgICAgICB0aGlzLm1lc3NhZ2UgPSAnJztcbiAgICAgICAgdGhpcy5zdWNjZWVkZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mYWlsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdGFydCA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMudGltZSA9IDA7XG4gICAgICAgIHRoaXMucmV0cmllcyA9IDA7XG4gICAgfVxuXG4gICAgZ2V0U3RhdHVzKHNlY29uZHM6IG51bWJlciwgc2VydmVyTWF4TGVuZ3RoOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGRlY29yID0gX2NvbG9ycy5yZXNldDtcbiAgICAgICAgaWYgKHRoaXMuc3VjY2VlZGVkKSB7XG4gICAgICAgICAgICBkZWNvciA9IF9jb2xvcnMuZ3JlZW47XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5mYWlsZWQpIHtcbiAgICAgICAgICAgIGRlY29yID0gX2NvbG9ycy5yZWQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3RhdHVzID0ge1xuICAgICAgICAgICAgc3RhdHVzOiAnICAnLFxuICAgICAgICAgICAgdGl0bGU6IGRlY29yKHRoaXMuc2VydmVyLnBhZEVuZChzZXJ2ZXJNYXhMZW5ndGgpKSxcbiAgICAgICAgICAgIHRpbWU6ICcnLFxuICAgICAgICAgICAgbWVzc2FnZTogJycsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHJldHJpZXMgPSB0aGlzLnJldHJpZXMgPiAwID8gYCAoJHt0aGlzLnJldHJpZXMgKyAxfSlgIDogJyc7XG4gICAgICAgIGlmICh0aGlzLmlzRmluaXNoZWQoKSkge1xuICAgICAgICAgICAgc3RhdHVzLnN0YXR1cyA9IGRlY29yKHRoaXMuc3VjY2VlZGVkID8gJ+KckyAnIDogJ+KcliAnKTtcbiAgICAgICAgICAgIHN0YXR1cy50aW1lID0gZGVjb3IoYCDigKYgJHt0aGlzLnRpbWUgLyAxXzAwMH1zJHtyZXRyaWVzfWApO1xuICAgICAgICB9IGVsc2UgaWYgKHNlY29uZHMgPiAwKSB7XG4gICAgICAgICAgICBzdGF0dXMudGltZSA9IGRlY29yKGAg4oCmICR7c2Vjb25kc31zJHtyZXRyaWVzfWApO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5zdWNjZWVkZWQpIHtcbiAgICAgICAgICAgIHN0YXR1cy5tZXNzYWdlID0gdGhpcy5tZXNzYWdlICE9PSAnJyA/IGRlY29yKGAg4oCmICR7dGhpcy5tZXNzYWdlfWApIDogJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0YXR1cztcbiAgICB9XG5cbiAgICBhc3luYyBjaGVjayhvblVwZGF0ZTogKCkgPT4gdm9pZCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICB0aGlzLm9uVXBkYXRlID0gb25VcGRhdGU7XG4gICAgICAgIHRoaXMuY2xpZW50ID0gYXdhaXQgVE9OQ2xpZW50Tm9kZUpzLmNyZWF0ZSh7XG4gICAgICAgICAgICBzZXJ2ZXJzOiBbdGhpcy5zZXJ2ZXJdLFxuICAgICAgICAgICAgbG9nX3ZlcmJvc2U6IHRoaXMudmVyYm9zZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmNoZWNrR2l2ZXIoKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY2hlY2tTZW5kR3JhbXMoKTtcbiAgICAgICAgICAgIHRoaXMucmVwb3J0KHsgc3VjY2VlZGVkOiB0cnVlIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhpcy5yZXBvcnQoeyBlcnJvciB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGNoZWNrR2l2ZXIoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHRoaXMucmVwb3J0KHsgbWVzc2FnZTogJ2xvb2tpbmcgZm9yIGdpdmVyJyB9KTtcbiAgICAgICAgY29uc3QgZ2l2ZXJzID0gYXdhaXQgdGhpcy5jbGllbnQucXVlcmllcy5hY2NvdW50cy5xdWVyeShcbiAgICAgICAgICAgIHsgaWQ6IHsgZXE6IENoZWNrTmV0d29yay5naXZlckFkZHJlc3MgfSB9LFxuICAgICAgICAgICAgJ2JhbGFuY2UgY29kZScpO1xuICAgICAgICBpZiAoZ2l2ZXJzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIHRoaXMucmVwb3J0KHsgZXJyb3I6ICdubyBnaXZlcicgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8kRmxvd0ZpeE1lXG4gICAgICAgIGNvbnN0IGdpdmVyQmFsYW5jZSA9IEJpZ0ludChnaXZlcnNbMF0uYmFsYW5jZSk7XG4gICAgICAgIGlmIChnaXZlckJhbGFuY2UgPT09IEJpZ0ludCgwKSkge1xuICAgICAgICAgICAgdGhpcy5yZXBvcnQoeyBlcnJvcjogJ2dpdmVyIGJhbGFuY2UgaXMgZW1wdHknIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChnaXZlckJhbGFuY2UgPCBCaWdJbnQoMV8wMDBfMDAwXzAwMCkpIHtcbiAgICAgICAgICAgIHRoaXMucmVwb3J0KHsgZXJyb3I6IGBnaXZlciBiYWxhbmNlIHRvbyBsb3c6ICR7Z2l2ZXJCYWxhbmNlfWAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFnaXZlcnNbMF0uY29kZSkge1xuICAgICAgICAgICAgdGhpcy5yZXBvcnQoeyBtZXNzYWdlOiBgZGVwbG95aW5nIGdpdmVyLCBiYWxhbmNlOiAke2dpdmVyQmFsYW5jZX1gIH0pO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5jbGllbnQuY29udHJhY3RzLmRlcGxveSh7XG4gICAgICAgICAgICAgICAgcGFja2FnZTogQ2hlY2tOZXR3b3JrLmdpdmVyUGFja2FnZSxcbiAgICAgICAgICAgICAgICBrZXlQYWlyOiBDaGVja05ldHdvcmsuZ2l2ZXJLZXlzLFxuICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yUGFyYW1zOiB7fSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5yZXBvcnQoeyBzdWNjZWVkZWQ6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBjaGVja1NlbmRHcmFtcygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMucmVwb3J0KHsgbWVzc2FnZTogJ3NlbmRpbmcgMC4wMDFHJyB9KTtcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0ID0gYXdhaXQgUHJvbWlzZS5yYWNlKFtcbiAgICAgICAgICAgICAgICBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHJlc29sdmUsIDMwXzAwMCwgeyByZXRyeTogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWVudC5jb250cmFjdHMucnVuKHtcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogQ2hlY2tOZXR3b3JrLmdpdmVyQWRkcmVzcyxcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb25OYW1lOiAnc2VuZFRyYW5zYWN0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgYWJpOiBDaGVja05ldHdvcmsuZ2l2ZXJQYWNrYWdlLmFiaSxcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc3Q6ICcwOmFkYjYzYTIyODgzN2U0NzhjN2VkZjVmZTNmMGI1ZDEyMTgzZTFmMjIyNDZiNjc3MTJiOTllYzUzOGQ2YzUzNTcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDFfMDAwXzAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdW5jZTogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAga2V5UGFpcjogQ2hlY2tOZXR3b3JrLmdpdmVyS2V5cyxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICBpZiAoZmlyc3QgJiYgZmlyc3QudHJhbnNhY3Rpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJldHJpZXMgKz0gMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzRmluaXNoZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN1Y2NlZWRlZCB8fCB0aGlzLmZhaWxlZDtcbiAgICB9XG5cbiAgICByZXBvcnQob3B0aW9uczoge1xuICAgICAgICBzdWNjZWVkZWQ/OiBib29sZWFuLFxuICAgICAgICBlcnJvcj86IGFueSxcbiAgICAgICAgbWVzc2FnZT86IHN0cmluZyxcbiAgICB9KSB7XG4gICAgICAgIGlmIChvcHRpb25zLnN1Y2NlZWRlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnN1Y2NlZWRlZCA9IG9wdGlvbnMuc3VjY2VlZGVkO1xuICAgICAgICAgICAgdGhpcy5mYWlsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9ICcnO1xuICAgICAgICAgICAgdGhpcy50aW1lID0gRGF0ZS5ub3coKSAtIHRoaXMuc3RhcnQ7XG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5lcnJvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSAob3B0aW9ucy5lcnJvciAmJiBvcHRpb25zLmVycm9yLm1lc3NhZ2UpXG4gICAgICAgICAgICAgICAgPyBvcHRpb25zLmVycm9yLm1lc3NhZ2VcbiAgICAgICAgICAgICAgICA6IChvcHRpb25zLmVycm9yIHx8ICcnKS50b1N0cmluZygpO1xuICAgICAgICAgICAgdGhpcy5mYWlsZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zdWNjZWVkZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMudGltZSA9IERhdGUubm93KCkgLSB0aGlzLnN0YXJ0O1xuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMubWVzc2FnZSAhPT0gdW5kZWZpbmVkICYmICF0aGlzLmlzRmluaXNoZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gb3B0aW9ucy5tZXNzYWdlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25VcGRhdGUoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2l2ZXJBZGRyZXNzID0gJzA6NWIxNjg5NzBhOWM2M2RkNWM0MmE2YWZiY2Y3MDZlZjY1MjQ3NmJiODk2MGEyMmUxZDhhMmFkMTQ4ZTYwYzBlYSc7XG4gICAgc3RhdGljIGdpdmVyS2V5cyA9IHtcbiAgICAgICAgc2VjcmV0OiAnMjI0NWU0ZjQ0YWY4YWY2YmJkMTVjNGE1M2ViNjdhOGYyMTFkNTQxZGRjN2MxOTdmNzRkNzgzMGRiYTZkMjdmZScsXG4gICAgICAgIHB1YmxpYzogJ2Q1NDJmNDQxNDZmMTY5YzY3MjZjOGNmNzBlNGNiYjNkMzNkOGQ4NDJhNGFmZDc5OWFjMTIyYzU4MDhkODFiYTMnLFxuICAgIH07XG4gICAgc3RhdGljIGdpdmVyUGFja2FnZSA9IHtcbiAgICAgICAgYWJpOiB7XG4gICAgICAgICAgICBcIkFCSSB2ZXJzaW9uXCI6IDEsXG4gICAgICAgICAgICBcImZ1bmN0aW9uc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJjb25zdHJ1Y3RvclwiLFxuICAgICAgICAgICAgICAgICAgICBcImlucHV0c1wiOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgXCJvdXRwdXRzXCI6IFtdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcInNlbmRUcmFuc2FjdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICBcImlucHV0c1wiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7IFwibmFtZVwiOiBcImRlc3RcIiwgXCJ0eXBlXCI6IFwiYWRkcmVzc1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IFwibmFtZVwiOiBcInZhbHVlXCIsIFwidHlwZVwiOiBcInVpbnQxMjhcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJib3VuY2VcIiwgXCJ0eXBlXCI6IFwiYm9vbFwiIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgXCJvdXRwdXRzXCI6IFtdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFwiZXZlbnRzXCI6IFtdLFxuICAgICAgICAgICAgXCJkYXRhXCI6IFtcbiAgICAgICAgICAgICAgICB7IFwia2V5XCI6IDEwMCwgXCJuYW1lXCI6IFwib3duZXJcIiwgXCJ0eXBlXCI6IFwidWludDI1NlwiIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgaW1hZ2VCYXNlNjQ6ICd0ZTZjY2dFQ0pRRUFCZDhBQWdFMEJnRUJBY0FDQWdQUElBVURBUUhlQkFBRDBDQUFRZGdBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUJBSW8vd0Fnd0FIMHBDQllrdlNnNFlydFUxZ3c5S0FUQndFSzlLUWc5S0VJQWdQTlFCQUpBZ0hPRFFvQ0FTQU1Dd0FIRERiTUlBQW5DRnd2Q0x3R2Jtdzh1Qm1JaUlpY2ZBS1h3T0FDQVNBUERnQTFPMUhieEZ2RU1qTC80Qms3VWR2RW9CQTlFUHRSd0Z2VXUxWGdBTlUvdnNCWkdWamIyUmxYMkZrWkhJZytrQXkra0lnYnhBZ2Nyb2hjN3F4OHVCOUlXOFJidkxnZmNoMHp3c0NJbThTendvSEltOFRJbks2bGlOdkV5TE9NcDhoZ1FFQUl0ZEpvYzlBTWlBaXpqTGkvdndCWkdWamIyUmxYMkZrWkhJd0ljblFKVlZCWHdYYk1JQUlCSUJJUkFDdWsvMzJBczdLNkw3RXd0akMzTWJMOEU3ZUliWmhBQUtXbGYzMkFzTEd2dWprd3R6bXpNcmxrT1dlZ0VXZUZBRGpub0h3VVo0c1NaNHNSL1FFNDU2QTRmUUU0ZlFGQUlHZWdmQkhuaFkrNVo2QVFaSkY5Z0g5L2dMQ3hyN281TUxjNXN6SzVMN0szTWkrQ3dBSUJJQm9VQWVELy92MEJiV0ZwYmw5bGVIUmxjbTVoYkNHT1dmNzhBV2RsZEY5emNtTmZZV1JrY2lEUUlOTUFNbkM5amhyKy9RRm5aWFJmYzNKalgyRmtaSEl3Y01qSjBGVVJYd0xiTU9BZ2N0Y2hNU0RUQURJaCtrQXovdjBCWjJWMFgzTnlZMTloWkdSeU1TRWhWVEZmQk5zdzJERWhGUUg0am5YKy9nRm5aWFJmYlhOblgzQjFZbXRsZVNESEFvNFcvdjhCWjJWMFgyMXpaMTl3ZFdKclpYa3hjREhiTU9EVklNY0JqaGYrL3dGblpYUmZiWE5uWDNCMVltdGxlVEp3TVRIYk1PQWdnUUlBMXlIWEMvOGkrUUVpSXZrUThxaisvd0ZuWlhSZmJYTm5YM0IxWW10bGVUTWdBMThEMnpEWUlzY0NzeFlCekpRaTFERXozaVFpSW80NC92a0JjM1J2Y21WZmMybG5id0FoYjR3aWI0d2piNHp0UnlGdmpPMUUwUFFGYjR3ZzdWZisvUUZ6ZEc5eVpWOXphV2RmWlc1a1h3WFlJc2NCamhQKy9BRnRjMmRmYVhOZlpXMXdkSGxmQnRzdzRDTFRIelFqMHo4MUlCY0JkbzZBMkk0di92NEJiV0ZwYmw5bGVIUmxjbTVoYkRJa0lsVnhYd2p4UUFIKy9nRnRZV2x1WDJWNGRHVnlibUZzTTE4STJ6RGdnSHp5OEY4SUdBSCsvdnNCY21Wd2JHRjVYM0J5YjNSd2NIRHRSTkFnOUFReU5DQ0JBSURYUlpvZzB6OHlNeURUUHpJeWxvSUlHM2RBTXVJaUpia2wrQ09CQStpb0pLQzVzSTRweUNRQjlBQWx6d3MvSXM4TFB5SFBGaURKN1ZUKy9BRnlaWEJzWVhsZmNISnZkREovQmw4RzJ6RGcvdndCY21Wd2JHRjVYM0J5YjNRemNBVmZCUmtBQk5zd0FnRWdIaHNDQW5NZEhBQVB0RDl4QTVodG1FQUF3N1FhWnV6Mm83ZUl0NGhBTW5hanQ0bEFJSG9IU2VuLzZNaTRjVjE1Y0RKOEFIZ1FhYi9wQUJoNEVYOStBTGc2dWJRNE1qR2J1amV4bW5haWFIb0E1SGFqdDRrQStnQVE1NHNRWlBhcWYzNkF1RHE1dERneU1adTZON0dhR0MrQmJaaEFBZ0ZJSWg4QkNiaUpBQ2RRSUFIKy92MEJZMjl1YzNSeVgzQnliM1JmTUhCd2dnZ2JkMER0Uk5BZzlBUXlOQ0NCQUlEWFJZNFVJTkkvTWpNZzBqOHlNaUJ4MTBXVWdIdnk4TjdleUNRQjlBQWp6d3MvSXM4TFAzSFBRU0hQRmlESjdWVCsvUUZqYjI1emRISmZjSEp2ZEY4eFh3WDRBRER3SWY3OEFYQjFjMmh3WkdNM2RHOWpOTzFFMFBRQnlDRUFSTzFIYnhJQjlBQWh6eFlneWUxVS92MEJjSFZ6YUhCa1l6ZDBiMk0wTUY4QzJ6QUI0dHorL1FGdFlXbHVYMmx1ZEdWeWJtRnNJWTVaL3Z3QloyVjBYM055WTE5aFpHUnlJTkFnMHdBeWNMMk9Hdjc5QVdkbGRGOXpjbU5mWVdSa2NqQnd5TW5RVlJGZkF0c3c0Q0J5MXlFeElOTUFNaUg2UURQKy9RRm5aWFJmYzNKalgyRmtaSEl4SVNGVk1WOEUyekRZSkNGd0l3SHFqamorK1FGemRHOXlaVjl6YVdkdkFDRnZqQ0p2akNOdmpPMUhJVytNN1VUUTlBVnZqQ0R0Vi83OUFYTjBiM0psWDNOcFoxOWxibVJmQmRnaXh3Q09IQ0Z3dW80U0lvSVFYSDdpQjFWUlh3YnhRQUZmQnRzdzRGOEcyekRnL3Y0QmJXRnBibDlwYm5SbGNtNWhiREVpMHg4MEluRzZKQUEybmlDQUkxVmhYd2Z4UUFGZkI5c3c0Q01oVldGZkIvRkFBVjhIJyxcbiAgICB9O1xuXG4gICAgc3RhdGljIGFzeW5jIHJlc29sdmVHaXZlclBhcmFtZXRlcnMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IFRPTkNsaWVudE5vZGVKcy5jcmVhdGUoeyBzZXJ2ZXJzOiBbJ25ldC50b24uZGV2J10gfSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQga2V5c1BhdGggPSBwYXRoLnJlc29sdmUob3MuaG9tZWRpcigpLCAnZ2l2ZXJLZXlzLmpzb24nKTtcbiAgICAgICAgICAgIENoZWNrTmV0d29yay5naXZlcktleXMgPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhrZXlzUGF0aCwgJ3V0ZjgnKSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIH1cbiAgICAgICAgQ2hlY2tOZXR3b3JrLmdpdmVyQWRkcmVzcyA9IChhd2FpdCBjbGllbnQuY29udHJhY3RzLmNyZWF0ZURlcGxveU1lc3NhZ2Uoe1xuICAgICAgICAgICAgcGFja2FnZTogQ2hlY2tOZXR3b3JrLmdpdmVyUGFja2FnZSxcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yUGFyYW1zOiB7fSxcbiAgICAgICAgICAgIGtleVBhaXI6IENoZWNrTmV0d29yay5naXZlcktleXMsXG4gICAgICAgIH0pKS5hZGRyZXNzO1xuICAgIH1cblxuXG59XG5cbiJdfQ==