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
        var checkers, seconds, serverMaxLength, getStatus, multiBar, bars, updateLog, updateBar, updateProgress;
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

                getStatus = function getStatus(checker) {
                  var decor = _colors.reset;

                  if (checker.succeeded) {
                    decor = _colors.green;
                  } else if (checker.failed) {
                    decor = _colors.red;
                  }

                  var status = {
                    status: '  ',
                    title: decor(checker.server.padEnd(serverMaxLength)),
                    time: '',
                    message: ''
                  };

                  if (checker.isFinished()) {
                    status.status = decor(checker.succeeded ? '✓ ' : '✖ ');
                    status.time = decor(" \u2026 ".concat(checker.time / 1000, "s"));
                  } else if (seconds > 0) {
                    status.time = decor(" \u2026 ".concat(seconds, "s"));
                  }

                  if (!checker.succeeded) {
                    status.message = checker.message !== '' ? decor(" \u2026 ".concat(checker.message)) : '';
                  }

                  return status;
                };

                multiBar = new cliProgress.MultiBar({
                  format: '{status}{title}{time}{message}'
                });
                bars = checkers.map(function (checker) {
                  return multiBar.create(100, 0, getStatus(checker));
                });

                updateLog = function updateLog() {
                  console.log(checkers.map(getStatus).map(function (status) {
                    return "".concat(status.title).concat(status.time).concat(status.status);
                  }).join(' / '));
                };

                updateBar = function updateBar() {
                  for (var i = 0; i < checkers.length; i += 1) {
                    bars[i].update(1, getStatus(checkers[i]));
                  }
                };

                updateProgress = bars[0] ? updateBar : updateLog;
                _context.next = 13;
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

              case 13:
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
    this.server = server;
    this.verbose = verbose;
    this.message = '';
    this.succeeded = false;
    this.failed = false;
    this.start = Date.now();
    this.time = 0;
  }

  (0, _createClass2["default"])(CheckNetwork, [{
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
                if (!givers[0].code) {
                  this.report({
                    error: "giver code missing"
                  });
                }

              case 15:
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
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.report({
                  message: 'processing message'
                });
                _context4.next = 3;
                return this.client.contracts.run({
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

              case 3:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvY2hlY2suanMiXSwibmFtZXMiOlsib3MiLCJyZXF1aXJlIiwiZnMiLCJwYXRoIiwiY2xpUHJvZ3Jlc3MiLCJfY29sb3JzIiwiQ2hlY2tOZXR3b3JrIiwic2VydmVycyIsInZlcmJvc2UiLCJyZXNvbHZlR2l2ZXJQYXJhbWV0ZXJzIiwiY2hlY2tlcnMiLCJtYXAiLCJzZXJ2ZXIiLCJzZWNvbmRzIiwic2VydmVyTWF4TGVuZ3RoIiwicmVkdWNlIiwibWF4TGVuZ3RoIiwiTWF0aCIsIm1heCIsImxlbmd0aCIsImdldFN0YXR1cyIsImNoZWNrZXIiLCJkZWNvciIsInJlc2V0Iiwic3VjY2VlZGVkIiwiZ3JlZW4iLCJmYWlsZWQiLCJyZWQiLCJzdGF0dXMiLCJ0aXRsZSIsInBhZEVuZCIsInRpbWUiLCJtZXNzYWdlIiwiaXNGaW5pc2hlZCIsIm11bHRpQmFyIiwiTXVsdGlCYXIiLCJmb3JtYXQiLCJiYXJzIiwiY3JlYXRlIiwidXBkYXRlTG9nIiwiY29uc29sZSIsImxvZyIsImpvaW4iLCJ1cGRhdGVCYXIiLCJpIiwidXBkYXRlIiwidXBkYXRlUHJvZ3Jlc3MiLCJQcm9taXNlIiwiYWxsIiwicmVzb2x2ZSIsInRpbWVySWQiLCJzZXRJbnRlcnZhbCIsInVuZmluaXNoZWQiLCJmaW5kIiwieCIsImNsZWFySW50ZXJ2YWwiLCJwcm9jZXNzIiwiZXhpdCIsImNoZWNrIiwic3RhcnQiLCJEYXRlIiwibm93Iiwib25VcGRhdGUiLCJUT05DbGllbnROb2RlSnMiLCJsb2dfdmVyYm9zZSIsImNsaWVudCIsImNoZWNrR2l2ZXIiLCJjaGVja1NlbmRHcmFtcyIsInJlcG9ydCIsImVycm9yIiwicXVlcmllcyIsImFjY291bnRzIiwicXVlcnkiLCJpZCIsImVxIiwiZ2l2ZXJBZGRyZXNzIiwiZ2l2ZXJzIiwiZ2l2ZXJCYWxhbmNlIiwiQmlnSW50IiwiYmFsYW5jZSIsImNvZGUiLCJjb250cmFjdHMiLCJydW4iLCJhZGRyZXNzIiwiZnVuY3Rpb25OYW1lIiwiYWJpIiwiZ2l2ZXJQYWNrYWdlIiwiaW5wdXQiLCJkZXN0IiwidmFsdWUiLCJib3VuY2UiLCJrZXlQYWlyIiwiZ2l2ZXJLZXlzIiwib3B0aW9ucyIsInVuZGVmaW5lZCIsInRvU3RyaW5nIiwia2V5c1BhdGgiLCJob21lZGlyIiwiSlNPTiIsInBhcnNlIiwicmVhZEZpbGVTeW5jIiwiY3JlYXRlRGVwbG95TWVzc2FnZSIsImNvbnN0cnVjdG9yUGFyYW1zIiwic2VjcmV0IiwiaW1hZ2VCYXNlNjQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQTs7QUFoQkE7Ozs7Ozs7Ozs7Ozs7O0FBbUJBLElBQU1BLEVBQUUsR0FBR0MsT0FBTyxDQUFDLElBQUQsQ0FBbEI7O0FBQ0EsSUFBTUMsRUFBRSxHQUFHRCxPQUFPLENBQUMsSUFBRCxDQUFsQjs7QUFDQSxJQUFNRSxJQUFJLEdBQUdGLE9BQU8sQ0FBQyxNQUFELENBQXBCOztBQUNBLElBQU1HLFdBQVcsR0FBR0gsT0FBTyxDQUFDLGNBQUQsQ0FBM0I7O0FBQ0EsSUFBTUksT0FBTyxHQUFHSixPQUFPLENBQUMsUUFBRCxDQUF2Qjs7SUFFYUssWTs7Ozs7Ozs7b0RBQ2tCQyxPLEVBQW1CQyxPOzs7Ozs7O3VCQUNwQ0YsWUFBWSxDQUFDRyxzQkFBYixFOzs7QUFDQUMsZ0JBQUFBLFEsR0FBMkJILE9BQU8sQ0FBQ0ksR0FBUixDQUFZLFVBQUFDLE1BQU07QUFBQSx5QkFBSSxJQUFJTixZQUFKLENBQWlCTSxNQUFqQixFQUF5QkosT0FBekIsQ0FBSjtBQUFBLGlCQUFsQixDO0FBQzdCSyxnQkFBQUEsTyxHQUFrQixDO0FBQ2hCQyxnQkFBQUEsZSxHQUFrQlAsT0FBTyxDQUFDUSxNQUFSLENBQWUsVUFBQ0MsU0FBRCxFQUFZSixNQUFaO0FBQUEseUJBQXVCSyxJQUFJLENBQUNDLEdBQUwsQ0FBU0YsU0FBVCxFQUFvQkosTUFBTSxDQUFDTyxNQUEzQixDQUF2QjtBQUFBLGlCQUFmLEVBQTBFLENBQTFFLEM7O0FBQ2xCQyxnQkFBQUEsUyxH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RixZQUQ4QztBQUVwRWdCLGtCQUFBQSxpQkFBaUIsRUFBRSxFQUZpRDtBQUdwRVgsa0JBQUFBLE9BQU8sRUFBRXJGLFlBQVksQ0FBQ3NGO0FBSDhDLGlCQUFyQyxDOzs7QUFBbkN0RixnQkFBQUEsWUFBWSxDQUFDcUUsWSxrQkFJVFEsTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lDQXJOQzdFLFksa0JBMEthLG9FO2lDQTFLYkEsWSxlQTJLVTtBQUNmaUcsRUFBQUEsTUFBTSxFQUFFLGtFQURPO0FBRWYsWUFBUTtBQUZPLEM7aUNBM0tWakcsWSxrQkErS2E7QUFDbEIrRSxFQUFBQSxHQUFHLEVBQUU7QUFDRCxtQkFBZSxDQURkO0FBRUQsaUJBQWEsQ0FDVDtBQUNJLGNBQVEsYUFEWjtBQUVJLGdCQUFVLEVBRmQ7QUFHSSxpQkFBVztBQUhmLEtBRFMsRUFNVDtBQUNJLGNBQVEsaUJBRFo7QUFFSSxnQkFBVSxDQUNOO0FBQUUsZ0JBQVEsTUFBVjtBQUFrQixnQkFBUTtBQUExQixPQURNLEVBRU47QUFBRSxnQkFBUSxPQUFWO0FBQW1CLGdCQUFRO0FBQTNCLE9BRk0sRUFHTjtBQUFFLGdCQUFRLFFBQVY7QUFBb0IsZ0JBQVE7QUFBNUIsT0FITSxDQUZkO0FBT0ksaUJBQVc7QUFQZixLQU5TLENBRlo7QUFrQkQsY0FBVSxFQWxCVDtBQW1CRCxZQUFRLENBQ0o7QUFBRSxhQUFPLEdBQVQ7QUFBYyxjQUFRLE9BQXRCO0FBQStCLGNBQVE7QUFBdkMsS0FESTtBQW5CUCxHQURhO0FBd0JsQm1CLEVBQUFBLFdBQVcsRUFBRTtBQXhCSyxDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuXG4vLyBAZmxvd1xuaW1wb3J0IHsgVE9OQ2xpZW50IGFzIFRPTkNsaWVudE5vZGVKcyB9IGZyb20gXCJ0b24tY2xpZW50LW5vZGUtanNcIjtcbmltcG9ydCB0eXBlIHsgVE9OQ2xpZW50IH0gZnJvbSBcInRvbi1jbGllbnQtanMvdHlwZXNcIjtcblxuY29uc3Qgb3MgPSByZXF1aXJlKCdvcycpO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IGNsaVByb2dyZXNzID0gcmVxdWlyZSgnY2xpLXByb2dyZXNzJyk7XG5jb25zdCBfY29sb3JzID0gcmVxdWlyZSgnY29sb3JzJyk7XG5cbmV4cG9ydCBjbGFzcyBDaGVja05ldHdvcmsge1xuICAgIHN0YXRpYyBhc3luYyBjaGVja05ldHdvcmtzKHNlcnZlcnM6IHN0cmluZ1tdLCB2ZXJib3NlOiBib29sZWFuKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGF3YWl0IENoZWNrTmV0d29yay5yZXNvbHZlR2l2ZXJQYXJhbWV0ZXJzKCk7XG4gICAgICAgIGNvbnN0IGNoZWNrZXJzOiBDaGVja05ldHdvcmtbXSA9IHNlcnZlcnMubWFwKHNlcnZlciA9PiBuZXcgQ2hlY2tOZXR3b3JrKHNlcnZlciwgdmVyYm9zZSkpO1xuICAgICAgICBsZXQgc2Vjb25kczogbnVtYmVyID0gMDtcbiAgICAgICAgY29uc3Qgc2VydmVyTWF4TGVuZ3RoID0gc2VydmVycy5yZWR1Y2UoKG1heExlbmd0aCwgc2VydmVyKSA9PiBNYXRoLm1heChtYXhMZW5ndGgsIHNlcnZlci5sZW5ndGgpLCAwKTtcbiAgICAgICAgY29uc3QgZ2V0U3RhdHVzID0gKGNoZWNrZXI6IENoZWNrTmV0d29yaykgPT4ge1xuICAgICAgICAgICAgbGV0IGRlY29yID0gX2NvbG9ycy5yZXNldDtcbiAgICAgICAgICAgIGlmIChjaGVja2VyLnN1Y2NlZWRlZCkge1xuICAgICAgICAgICAgICAgIGRlY29yID0gX2NvbG9ycy5ncmVlbjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hlY2tlci5mYWlsZWQpIHtcbiAgICAgICAgICAgICAgICBkZWNvciA9IF9jb2xvcnMucmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgc3RhdHVzID0ge1xuICAgICAgICAgICAgICAgIHN0YXR1czogJyAgJyxcbiAgICAgICAgICAgICAgICB0aXRsZTogZGVjb3IoY2hlY2tlci5zZXJ2ZXIucGFkRW5kKHNlcnZlck1heExlbmd0aCkpLFxuICAgICAgICAgICAgICAgIHRpbWU6ICcnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICcnLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChjaGVja2VyLmlzRmluaXNoZWQoKSkge1xuICAgICAgICAgICAgICAgIHN0YXR1cy5zdGF0dXMgPSBkZWNvcihjaGVja2VyLnN1Y2NlZWRlZCA/ICfinJMgJyA6ICfinJYgJyk7XG4gICAgICAgICAgICAgICAgc3RhdHVzLnRpbWUgPSBkZWNvcihgIOKApiAke2NoZWNrZXIudGltZSAvIDFfMDAwfXNgKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2Vjb25kcyA+IDApIHtcbiAgICAgICAgICAgICAgICBzdGF0dXMudGltZSA9IGRlY29yKGAg4oCmICR7c2Vjb25kc31zYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWNoZWNrZXIuc3VjY2VlZGVkKSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzLm1lc3NhZ2UgPSBjaGVja2VyLm1lc3NhZ2UgIT09ICcnID8gZGVjb3IoYCDigKYgJHtjaGVja2VyLm1lc3NhZ2V9YCkgOiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzdGF0dXM7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IG11bHRpQmFyID0gbmV3IGNsaVByb2dyZXNzLk11bHRpQmFyKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZvcm1hdDogJ3tzdGF0dXN9e3RpdGxlfXt0aW1lfXttZXNzYWdlfScsXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGJhcnMgPSBjaGVja2Vycy5tYXAoY2hlY2tlciA9PiBtdWx0aUJhci5jcmVhdGUoMTAwLCAwLCBnZXRTdGF0dXMoY2hlY2tlcikpKTtcbiAgICAgICAgY29uc3QgdXBkYXRlTG9nID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coY2hlY2tlcnNcbiAgICAgICAgICAgICAgICAubWFwKGdldFN0YXR1cylcbiAgICAgICAgICAgICAgICAubWFwKHN0YXR1cyA9PiBgJHtzdGF0dXMudGl0bGV9JHtzdGF0dXMudGltZX0ke3N0YXR1cy5zdGF0dXN9YClcbiAgICAgICAgICAgICAgICAuam9pbignIC8gJylcbiAgICAgICAgICAgICk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHVwZGF0ZUJhciA9ICgpID0+IHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hlY2tlcnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBiYXJzW2ldLnVwZGF0ZSgxLCBnZXRTdGF0dXMoY2hlY2tlcnNbaV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgdXBkYXRlUHJvZ3Jlc3MgPSBiYXJzWzBdID8gdXBkYXRlQmFyIDogdXBkYXRlTG9nO1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVySWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlY29uZHMgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlUHJvZ3Jlc3MoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdW5maW5pc2hlZCA9IGNoZWNrZXJzLmZpbmQoeCA9PiAheC5pc0ZpbmlzaGVkKCkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXVuZmluaXNoZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXJJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzcy5leGl0KDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgMV8wMDApXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIC4uLmNoZWNrZXJzLm1hcCgoY2hlY2tlcjogQ2hlY2tOZXR3b3JrKSA9PiBjaGVja2VyLmNoZWNrKHVwZGF0ZVByb2dyZXNzKSlcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgc2VydmVyOiBzdHJpbmc7XG4gICAgdmVyYm9zZTogYm9vbGVhbjtcbiAgICBjbGllbnQ6IFRPTkNsaWVudDtcbiAgICBvblVwZGF0ZTogKCkgPT4gdm9pZDtcblxuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICBzdWNjZWVkZWQ6IGJvb2xlYW47XG4gICAgZmFpbGVkOiBib29sZWFuO1xuICAgIHN0YXJ0OiBudW1iZXI7XG4gICAgdGltZTogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3Ioc2VydmVyOiBzdHJpbmcsIHZlcmJvc2U6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5zZXJ2ZXIgPSBzZXJ2ZXI7XG4gICAgICAgIHRoaXMudmVyYm9zZSA9IHZlcmJvc2U7XG5cbiAgICAgICAgdGhpcy5tZXNzYWdlID0gJyc7XG4gICAgICAgIHRoaXMuc3VjY2VlZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZmFpbGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3RhcnQgPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLnRpbWUgPSAwO1xuICAgIH1cblxuICAgIGFzeW5jIGNoZWNrKG9uVXBkYXRlOiAoKSA9PiB2b2lkKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHRoaXMub25VcGRhdGUgPSBvblVwZGF0ZTtcbiAgICAgICAgdGhpcy5jbGllbnQgPSBhd2FpdCBUT05DbGllbnROb2RlSnMuY3JlYXRlKHtcbiAgICAgICAgICAgIHNlcnZlcnM6IFt0aGlzLnNlcnZlcl0sXG4gICAgICAgICAgICBsb2dfdmVyYm9zZTogdGhpcy52ZXJib3NlLFxuICAgICAgICB9KTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY2hlY2tHaXZlcigpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5jaGVja1NlbmRHcmFtcygpO1xuICAgICAgICAgICAgdGhpcy5yZXBvcnQoeyBzdWNjZWVkZWQ6IHRydWUgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLnJlcG9ydCh7IGVycm9yIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgY2hlY2tHaXZlcigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgdGhpcy5yZXBvcnQoeyBtZXNzYWdlOiAnbG9va2luZyBmb3IgZ2l2ZXInIH0pO1xuICAgICAgICBjb25zdCBnaXZlcnMgPSBhd2FpdCB0aGlzLmNsaWVudC5xdWVyaWVzLmFjY291bnRzLnF1ZXJ5KFxuICAgICAgICAgICAgeyBpZDogeyBlcTogQ2hlY2tOZXR3b3JrLmdpdmVyQWRkcmVzcyB9IH0sXG4gICAgICAgICAgICAnYmFsYW5jZSBjb2RlJyk7XG4gICAgICAgIGlmIChnaXZlcnMubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgdGhpcy5yZXBvcnQoeyBlcnJvcjogJ25vIGdpdmVyJyB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyRGbG93Rml4TWVcbiAgICAgICAgY29uc3QgZ2l2ZXJCYWxhbmNlID0gQmlnSW50KGdpdmVyc1swXS5iYWxhbmNlKTtcbiAgICAgICAgaWYgKGdpdmVyQmFsYW5jZSA9PT0gQmlnSW50KDApKSB7XG4gICAgICAgICAgICB0aGlzLnJlcG9ydCh7IGVycm9yOiAnZ2l2ZXIgYmFsYW5jZSBpcyBlbXB0eScgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdpdmVyQmFsYW5jZSA8IEJpZ0ludCgxXzAwMF8wMDBfMDAwKSkge1xuICAgICAgICAgICAgdGhpcy5yZXBvcnQoeyBlcnJvcjogYGdpdmVyIGJhbGFuY2UgdG9vIGxvdzogJHtnaXZlckJhbGFuY2V9YCB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWdpdmVyc1swXS5jb2RlKSB7XG4gICAgICAgICAgICB0aGlzLnJlcG9ydCh7IGVycm9yOiBgZ2l2ZXIgY29kZSBtaXNzaW5nYCB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGNoZWNrU2VuZEdyYW1zKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICB0aGlzLnJlcG9ydCh7IG1lc3NhZ2U6ICdwcm9jZXNzaW5nIG1lc3NhZ2UnIH0pO1xuICAgICAgICBhd2FpdCB0aGlzLmNsaWVudC5jb250cmFjdHMucnVuKHtcbiAgICAgICAgICAgIGFkZHJlc3M6IENoZWNrTmV0d29yay5naXZlckFkZHJlc3MsXG4gICAgICAgICAgICBmdW5jdGlvbk5hbWU6ICdzZW5kVHJhbnNhY3Rpb24nLFxuICAgICAgICAgICAgYWJpOiBDaGVja05ldHdvcmsuZ2l2ZXJQYWNrYWdlLmFiaSxcbiAgICAgICAgICAgIGlucHV0OiB7XG4gICAgICAgICAgICAgICAgZGVzdDogJzA6YWRiNjNhMjI4ODM3ZTQ3OGM3ZWRmNWZlM2YwYjVkMTIxODNlMWYyMjI0NmI2NzcxMmI5OWVjNTM4ZDZjNTM1NycsXG4gICAgICAgICAgICAgICAgdmFsdWU6IDFfMDAwXzAwMCxcbiAgICAgICAgICAgICAgICBib3VuY2U6IGZhbHNlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAga2V5UGFpcjogQ2hlY2tOZXR3b3JrLmdpdmVyS2V5cyxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaXNGaW5pc2hlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3VjY2VlZGVkIHx8IHRoaXMuZmFpbGVkO1xuICAgIH1cblxuICAgIHJlcG9ydChvcHRpb25zOiB7XG4gICAgICAgIHN1Y2NlZWRlZD86IGJvb2xlYW4sXG4gICAgICAgIGVycm9yPzogYW55LFxuICAgICAgICBtZXNzYWdlPzogc3RyaW5nLFxuICAgIH0pIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuc3VjY2VlZGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3VjY2VlZGVkID0gb3B0aW9ucy5zdWNjZWVkZWQ7XG4gICAgICAgICAgICB0aGlzLmZhaWxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gJyc7XG4gICAgICAgICAgICB0aGlzLnRpbWUgPSBEYXRlLm5vdygpIC0gdGhpcy5zdGFydDtcbiAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmVycm9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IChvcHRpb25zLmVycm9yICYmIG9wdGlvbnMuZXJyb3IubWVzc2FnZSlcbiAgICAgICAgICAgICAgICA/IG9wdGlvbnMuZXJyb3IubWVzc2FnZVxuICAgICAgICAgICAgICAgIDogKG9wdGlvbnMuZXJyb3IgfHwgJycpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLmZhaWxlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnN1Y2NlZWRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy50aW1lID0gRGF0ZS5ub3coKSAtIHRoaXMuc3RhcnQ7XG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5tZXNzYWdlICE9PSB1bmRlZmluZWQgJiYgIXRoaXMuaXNGaW5pc2hlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSBvcHRpb25zLm1lc3NhZ2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vblVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHN0YXRpYyBnaXZlckFkZHJlc3MgPSAnMDo1YjE2ODk3MGE5YzYzZGQ1YzQyYTZhZmJjZjcwNmVmNjUyNDc2YmI4OTYwYTIyZTFkOGEyYWQxNDhlNjBjMGVhJztcbiAgICBzdGF0aWMgZ2l2ZXJLZXlzID0ge1xuICAgICAgICBzZWNyZXQ6ICcyMjQ1ZTRmNDRhZjhhZjZiYmQxNWM0YTUzZWI2N2E4ZjIxMWQ1NDFkZGM3YzE5N2Y3NGQ3ODMwZGJhNmQyN2ZlJyxcbiAgICAgICAgcHVibGljOiAnZDU0MmY0NDE0NmYxNjljNjcyNmM4Y2Y3MGU0Y2JiM2QzM2Q4ZDg0MmE0YWZkNzk5YWMxMjJjNTgwOGQ4MWJhMycsXG4gICAgfTtcbiAgICBzdGF0aWMgZ2l2ZXJQYWNrYWdlID0ge1xuICAgICAgICBhYmk6IHtcbiAgICAgICAgICAgIFwiQUJJIHZlcnNpb25cIjogMSxcbiAgICAgICAgICAgIFwiZnVuY3Rpb25zXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcImNvbnN0cnVjdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiaW5wdXRzXCI6IFtdLFxuICAgICAgICAgICAgICAgICAgICBcIm91dHB1dHNcIjogW11cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwic2VuZFRyYW5zYWN0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiaW5wdXRzXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiZGVzdFwiLCBcInR5cGVcIjogXCJhZGRyZXNzXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwidmFsdWVcIiwgXCJ0eXBlXCI6IFwidWludDEyOFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IFwibmFtZVwiOiBcImJvdW5jZVwiLCBcInR5cGVcIjogXCJib29sXCIgfVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBcIm91dHB1dHNcIjogW11cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgXCJldmVudHNcIjogW10sXG4gICAgICAgICAgICBcImRhdGFcIjogW1xuICAgICAgICAgICAgICAgIHsgXCJrZXlcIjogMTAwLCBcIm5hbWVcIjogXCJvd25lclwiLCBcInR5cGVcIjogXCJ1aW50MjU2XCIgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICBpbWFnZUJhc2U2NDogJ3RlNmNjZ0VDSlFFQUJkOEFBZ0UwQmdFQkFjQUNBZ1BQSUFVREFRSGVCQUFEMENBQVFkZ0FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQkFJby93QWd3QUgwcENCWWt2U2c0WXJ0VTFndzlLQVRCd0VLOUtRZzlLRUlBZ1BOUUJBSkFnSE9EUW9DQVNBTUN3QUhERGJNSUFBbkNGd3ZDTHdHYm13OHVCbUlpSWljZkFLWHdPQUNBU0FQRGdBMU8xSGJ4RnZFTWpMLzRCazdVZHZFb0JBOUVQdFJ3RnZVdTFYZ0FOVS92c0JaR1ZqYjJSbFgyRmtaSElnK2tBeStrSWdieEFnY3JvaGM3cXg4dUI5SVc4UmJ2TGdmY2gwendzQ0ltOFN6d29ISW04VEluSzZsaU52RXlMT01wOGhnUUVBSXRkSm9jOUFNaUFpempMaS92d0JaR1ZqYjJSbFgyRmtaSEl3SWNuUUpWVkJYd1hiTUlBSUJJQklSQUN1ay8zMkFzN0s2TDdFd3RqQzNNYkw4RTdlSWJaaEFBS1dsZjMyQXNMR3Z1amt3dHptek1ybGtPV2VnRVdlRkFEam5vSHdVWjRzU1o0c1IvUUU0NTZBNGZRRTRmUUZBSUdlZ2ZCSG5oWSs1WjZBUVpKRjlnSDkvZ0xDeHI3bzVNTGM1c3pLNUw3SzNNaStDd0FJQklCb1VBZUQvL3YwQmJXRnBibDlsZUhSbGNtNWhiQ0dPV2Y3OEFXZGxkRjl6Y21OZllXUmtjaURRSU5NQU1uQzlqaHIrL1FGblpYUmZjM0pqWDJGa1pISXdjTWpKMEZVUlh3TGJNT0FnY3RjaE1TRFRBREloK2tBei92MEJaMlYwWDNOeVkxOWhaR1J5TVNFaFZURmZCTnN3MkRFaEZRSDRqblgrL2dGblpYUmZiWE5uWDNCMVltdGxlU0RIQW80Vy92OEJaMlYwWDIxeloxOXdkV0pyWlhreGNESGJNT0RWSU1jQmpoZisvd0ZuWlhSZmJYTm5YM0IxWW10bGVUSndNVEhiTU9BZ2dRSUExeUhYQy84aStRRWlJdmtROHFqKy93Rm5aWFJmYlhOblgzQjFZbXRsZVRNZ0ExOEQyekRZSXNjQ3N4WUJ6SlFpMURFejNpUWlJbzQ0L3ZrQmMzUnZjbVZmYzJsbmJ3QWhiNHdpYjR3amI0enRSeUZ2ak8xRTBQUUZiNHdnN1ZmKy9RRnpkRzl5WlY5emFXZGZaVzVrWHdYWUlzY0JqaFArL0FGdGMyZGZhWE5mWlcxd2RIbGZCdHN3NENMVEh6UWowejgxSUJjQmRvNkEySTR2L3Y0QmJXRnBibDlsZUhSbGNtNWhiRElrSWxWeFh3anhRQUgrL2dGdFlXbHVYMlY0ZEdWeWJtRnNNMThJMnpEZ2dIenk4RjhJR0FIKy92c0JjbVZ3YkdGNVgzQnliM1J3Y0hEdFJOQWc5QVF5TkNDQkFJRFhSWm9nMHo4eU15RFRQekl5bG9JSUczZEFNdUlpSmJrbCtDT0JBK2lvSktDNXNJNHB5Q1FCOUFBbHp3cy9JczhMUHlIUEZpREo3VlQrL0FGeVpYQnNZWGxmY0hKdmRESi9CbDhHMnpEZy92d0JjbVZ3YkdGNVgzQnliM1F6Y0FWZkJSa0FCTnN3QWdFZ0hoc0NBbk1kSEFBUHREOXhBNWh0bUVBQXc3UWFadXoybzdlSXQ0aEFNbmFqdDRsQUlIb0hTZW4vNk1pNGNWMTVjREo4QUhnUWFiL3BBQmg0RVg5K0FMZzZ1YlE0TWpHYnVqZXhtbmFpYUhvQTVIYWp0NGtBK2dBUTU0c1FaUGFxZjM2QXVEcTV0RGd5TVp1Nk43R2FHQytCYlpoQUFnRklJaDhCQ2JpSkFDZFFJQUgrL3YwQlkyOXVjM1J5WDNCeWIzUmZNSEJ3Z2dnYmQwRHRSTkFnOUFReU5DQ0JBSURYUlk0VUlOSS9Nak1nMGo4eU1pQngxMFdVZ0h2eThON2V5Q1FCOUFBanp3cy9JczhMUDNIUFFTSFBGaURKN1ZUKy9RRmpiMjV6ZEhKZmNISnZkRjh4WHdYNEFERHdJZjc4QVhCMWMyaHdaR00zZEc5ak5PMUUwUFFCeUNFQVJPMUhieElCOUFBaHp4WWd5ZTFVL3YwQmNIVnphSEJrWXpkMGIyTTBNRjhDMnpBQjR0eisvUUZ0WVdsdVgybHVkR1Z5Ym1Gc0lZNVovdndCWjJWMFgzTnlZMTloWkdSeUlOQWcwd0F5Y0wyT0d2NzlBV2RsZEY5emNtTmZZV1JrY2pCd3lNblFWUkZmQXRzdzRDQnkxeUV4SU5NQU1pSDZRRFArL1FGblpYUmZjM0pqWDJGa1pISXhJU0ZWTVY4RTJ6RFlKQ0Z3SXdIcWpqaisrUUZ6ZEc5eVpWOXphV2R2QUNGdmpDSnZqQ052ak8xSElXK003VVRROUFWdmpDRHRWLzc5QVhOMGIzSmxYM05wWjE5bGJtUmZCZGdpeHdDT0hDRnd1bzRTSW9JUVhIN2lCMVZSWHdieFFBRmZCdHN3NEY4RzJ6RGcvdjRCYldGcGJsOXBiblJsY201aGJERWkweDgwSW5HNkpBQTJuaUNBSTFWaFh3ZnhRQUZmQjlzdzRDTWhWV0ZmQi9GQUFWOEgnLFxuICAgIH07XG5cbiAgICBzdGF0aWMgYXN5bmMgcmVzb2x2ZUdpdmVyUGFyYW1ldGVycygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgY2xpZW50ID0gYXdhaXQgVE9OQ2xpZW50Tm9kZUpzLmNyZWF0ZSh7IHNlcnZlcnM6IFsnbmV0LnRvbi5kZXYnXSB9KTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBrZXlzUGF0aCA9IHBhdGgucmVzb2x2ZShvcy5ob21lZGlyKCksICdnaXZlcktleXMuanNvbicpO1xuICAgICAgICAgICAgQ2hlY2tOZXR3b3JrLmdpdmVyS2V5cyA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKGtleXNQYXRoLCAndXRmOCcpKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgfVxuICAgICAgICBDaGVja05ldHdvcmsuZ2l2ZXJBZGRyZXNzID0gKGF3YWl0IGNsaWVudC5jb250cmFjdHMuY3JlYXRlRGVwbG95TWVzc2FnZSh7XG4gICAgICAgICAgICBwYWNrYWdlOiBDaGVja05ldHdvcmsuZ2l2ZXJQYWNrYWdlLFxuICAgICAgICAgICAgY29uc3RydWN0b3JQYXJhbXM6IHt9LFxuICAgICAgICAgICAga2V5UGFpcjogQ2hlY2tOZXR3b3JrLmdpdmVyS2V5cyxcbiAgICAgICAgfSkpLmFkZHJlc3M7XG4gICAgfVxuXG5cbn1cblxuIl19