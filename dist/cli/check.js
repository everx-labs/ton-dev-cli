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

var CheckNetwork =
/*#__PURE__*/
function () {
  (0, _createClass2["default"])(CheckNetwork, null, [{
    key: "checkNetworks",
    value: function () {
      var _checkNetworks = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(servers, verbose) {
        var checkers, seconds, getStatus, multiBar, bars, updateLog, updateBar, updateProgress;
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

                getStatus = function getStatus(checker) {
                  var status = {
                    status: '  ',
                    title: checker.server,
                    time: '',
                    message: ''
                  };

                  if (checker.isFinished()) {
                    status.status = checker.succeeded ? '✓ ' : '✖ ';
                    status.time = " \u2026 ".concat(checker.time / 1000, "s");
                  } else if (seconds > 0) {
                    status.time = " \u2026 ".concat(seconds, "s");
                  }

                  if (!checker.succeeded) {
                    status.message = checker.message !== '' ? " \u2026 ".concat(checker.message) : '';
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
                _context3.next = 2;
                return this.client.queries.accounts.query({
                  id: {
                    eq: CheckNetwork.giverAddress
                  }
                }, 'balance code');

              case 2:
                givers = _context3.sent;

                if (!(givers.length < 1)) {
                  _context3.next = 6;
                  break;
                }

                this.report({
                  error: 'no giver'
                });
                return _context3.abrupt("return");

              case 6:
                //$FlowFixMe
                giverBalance = BigInt(givers[0].balance);

                if (!(giverBalance === BigInt(0))) {
                  _context3.next = 10;
                  break;
                }

                this.report({
                  error: 'giver balance is empty'
                });
                return _context3.abrupt("return");

              case 10:
                if (!(giverBalance < BigInt(1000000000))) {
                  _context3.next = 13;
                  break;
                }

                this.report({
                  error: "giver balance too low: ".concat(giverBalance)
                });
                return _context3.abrupt("return");

              case 13:
                if (!givers[0].code) {
                  this.report({
                    error: "giver code missing"
                  });
                }

              case 14:
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
                _context4.next = 2;
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

              case 2:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvY2hlY2suanMiXSwibmFtZXMiOlsib3MiLCJyZXF1aXJlIiwiZnMiLCJwYXRoIiwiY2xpUHJvZ3Jlc3MiLCJDaGVja05ldHdvcmsiLCJzZXJ2ZXJzIiwidmVyYm9zZSIsInJlc29sdmVHaXZlclBhcmFtZXRlcnMiLCJjaGVja2VycyIsIm1hcCIsInNlcnZlciIsInNlY29uZHMiLCJnZXRTdGF0dXMiLCJjaGVja2VyIiwic3RhdHVzIiwidGl0bGUiLCJ0aW1lIiwibWVzc2FnZSIsImlzRmluaXNoZWQiLCJzdWNjZWVkZWQiLCJtdWx0aUJhciIsIk11bHRpQmFyIiwiZm9ybWF0IiwiYmFycyIsImNyZWF0ZSIsInVwZGF0ZUxvZyIsImNvbnNvbGUiLCJsb2ciLCJqb2luIiwidXBkYXRlQmFyIiwiaSIsImxlbmd0aCIsInVwZGF0ZSIsInVwZGF0ZVByb2dyZXNzIiwiUHJvbWlzZSIsImFsbCIsInJlc29sdmUiLCJ0aW1lcklkIiwic2V0SW50ZXJ2YWwiLCJ1bmZpbmlzaGVkIiwiZmluZCIsIngiLCJjbGVhckludGVydmFsIiwicHJvY2VzcyIsImV4aXQiLCJjaGVjayIsImZhaWxlZCIsInN0YXJ0IiwiRGF0ZSIsIm5vdyIsIm9uVXBkYXRlIiwiVE9OQ2xpZW50Tm9kZUpzIiwibG9nX3ZlcmJvc2UiLCJjbGllbnQiLCJjaGVja0dpdmVyIiwiY2hlY2tTZW5kR3JhbXMiLCJyZXBvcnQiLCJlcnJvciIsInF1ZXJpZXMiLCJhY2NvdW50cyIsInF1ZXJ5IiwiaWQiLCJlcSIsImdpdmVyQWRkcmVzcyIsImdpdmVycyIsImdpdmVyQmFsYW5jZSIsIkJpZ0ludCIsImJhbGFuY2UiLCJjb2RlIiwiY29udHJhY3RzIiwicnVuIiwiYWRkcmVzcyIsImZ1bmN0aW9uTmFtZSIsImFiaSIsImdpdmVyUGFja2FnZSIsImlucHV0IiwiZGVzdCIsInZhbHVlIiwiYm91bmNlIiwia2V5UGFpciIsImdpdmVyS2V5cyIsIm9wdGlvbnMiLCJ1bmRlZmluZWQiLCJ0b1N0cmluZyIsImtleXNQYXRoIiwiaG9tZWRpciIsIkpTT04iLCJwYXJzZSIsInJlYWRGaWxlU3luYyIsImNyZWF0ZURlcGxveU1lc3NhZ2UiLCJjb25zdHJ1Y3RvclBhcmFtcyIsInNlY3JldCIsImltYWdlQmFzZTY0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkE7O0FBaEJBOzs7Ozs7Ozs7Ozs7OztBQW1CQSxJQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQUNBLElBQU1DLEVBQUUsR0FBR0QsT0FBTyxDQUFDLElBQUQsQ0FBbEI7O0FBQ0EsSUFBTUUsSUFBSSxHQUFHRixPQUFPLENBQUMsTUFBRCxDQUFwQjs7QUFDQSxJQUFNRyxXQUFXLEdBQUdILE9BQU8sQ0FBQyxjQUFELENBQTNCOztJQUVhSSxZOzs7Ozs7OztvREFDa0JDLE8sRUFBbUJDLE87Ozs7Ozs7dUJBQ3BDRixZQUFZLENBQUNHLHNCQUFiLEU7OztBQUNBQyxnQkFBQUEsUSxHQUEyQkgsT0FBTyxDQUFDSSxHQUFSLENBQVksVUFBQUMsTUFBTTtBQUFBLHlCQUFJLElBQUlOLFlBQUosQ0FBaUJNLE1BQWpCLEVBQXlCSixPQUF6QixDQUFKO0FBQUEsaUJBQWxCLEM7QUFDN0JLLGdCQUFBQSxPLEdBQWtCLEM7O0FBQ2hCQyxnQkFBQUEsUyxHQUFZLFNBQVpBLFNBQVksQ0FBQ0MsT0FBRCxFQUEyQjtBQUN6QyxzQkFBTUMsTUFBTSxHQUFHO0FBQ1hBLG9CQUFBQSxNQUFNLEVBQUUsSUFERztBQUVYQyxvQkFBQUEsS0FBSyxFQUFFRixPQUFPLENBQUNILE1BRko7QUFHWE0sb0JBQUFBLElBQUksRUFBRSxFQUhLO0FBSVhDLG9CQUFBQSxPQUFPLEVBQUU7QUFKRSxtQkFBZjs7QUFNQSxzQkFBSUosT0FBTyxDQUFDSyxVQUFSLEVBQUosRUFBMEI7QUFDdEJKLG9CQUFBQSxNQUFNLENBQUNBLE1BQVAsR0FBZ0JELE9BQU8sQ0FBQ00sU0FBUixHQUFvQixJQUFwQixHQUEyQixJQUEzQztBQUNB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QUFYLENBQXpCO0FBQ0gsaUJBSEQsQ0FHRSxPQUFPM0IsS0FBUCxFQUFjLENBQ2Y7Ozt1QkFDa0NKLE1BQU0sQ0FBQ2dCLFNBQVAsQ0FBaUJvQixtQkFBakIsQ0FBcUM7QUFDcEUsNkJBQVNyRixZQUFZLENBQUNzRSxZQUQ4QztBQUVwRWdCLGtCQUFBQSxpQkFBaUIsRUFBRSxFQUZpRDtBQUdwRVgsa0JBQUFBLE9BQU8sRUFBRTNFLFlBQVksQ0FBQzRFO0FBSDhDLGlCQUFyQyxDOzs7QUFBbkM1RSxnQkFBQUEsWUFBWSxDQUFDMkQsWSxrQkFJVFEsTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lDQTNNQ25FLFksa0JBZ0thLG9FO2lDQWhLYkEsWSxlQWlLVTtBQUNmdUYsRUFBQUEsTUFBTSxFQUFFLGtFQURPO0FBRWYsWUFBUTtBQUZPLEM7aUNBaktWdkYsWSxrQkFxS2E7QUFDbEJxRSxFQUFBQSxHQUFHLEVBQUU7QUFDRCxtQkFBZSxDQURkO0FBRUQsaUJBQWEsQ0FDVDtBQUNJLGNBQVEsYUFEWjtBQUVJLGdCQUFVLEVBRmQ7QUFHSSxpQkFBVztBQUhmLEtBRFMsRUFNVDtBQUNJLGNBQVEsaUJBRFo7QUFFSSxnQkFBVSxDQUNOO0FBQUUsZ0JBQVEsTUFBVjtBQUFrQixnQkFBUTtBQUExQixPQURNLEVBRU47QUFBRSxnQkFBUSxPQUFWO0FBQW1CLGdCQUFRO0FBQTNCLE9BRk0sRUFHTjtBQUFFLGdCQUFRLFFBQVY7QUFBb0IsZ0JBQVE7QUFBNUIsT0FITSxDQUZkO0FBT0ksaUJBQVc7QUFQZixLQU5TLENBRlo7QUFrQkQsY0FBVSxFQWxCVDtBQW1CRCxZQUFRLENBQ0o7QUFBRSxhQUFPLEdBQVQ7QUFBYyxjQUFRLE9BQXRCO0FBQStCLGNBQVE7QUFBdkMsS0FESTtBQW5CUCxHQURhO0FBd0JsQm1CLEVBQUFBLFdBQVcsRUFBRTtBQXhCSyxDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuXG4vLyBAZmxvd1xuaW1wb3J0IHsgVE9OQ2xpZW50IGFzIFRPTkNsaWVudE5vZGVKcyB9IGZyb20gXCJ0b24tY2xpZW50LW5vZGUtanNcIjtcbmltcG9ydCB0eXBlIHsgVE9OQ2xpZW50IH0gZnJvbSBcInRvbi1jbGllbnQtanMvdHlwZXNcIjtcblxuY29uc3Qgb3MgPSByZXF1aXJlKCdvcycpO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IGNsaVByb2dyZXNzID0gcmVxdWlyZSgnY2xpLXByb2dyZXNzJyk7XG5cbmV4cG9ydCBjbGFzcyBDaGVja05ldHdvcmsge1xuICAgIHN0YXRpYyBhc3luYyBjaGVja05ldHdvcmtzKHNlcnZlcnM6IHN0cmluZ1tdLCB2ZXJib3NlOiBib29sZWFuKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGF3YWl0IENoZWNrTmV0d29yay5yZXNvbHZlR2l2ZXJQYXJhbWV0ZXJzKCk7XG4gICAgICAgIGNvbnN0IGNoZWNrZXJzOiBDaGVja05ldHdvcmtbXSA9IHNlcnZlcnMubWFwKHNlcnZlciA9PiBuZXcgQ2hlY2tOZXR3b3JrKHNlcnZlciwgdmVyYm9zZSkpO1xuICAgICAgICBsZXQgc2Vjb25kczogbnVtYmVyID0gMDtcbiAgICAgICAgY29uc3QgZ2V0U3RhdHVzID0gKGNoZWNrZXI6IENoZWNrTmV0d29yaykgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3RhdHVzID0ge1xuICAgICAgICAgICAgICAgIHN0YXR1czogJyAgJyxcbiAgICAgICAgICAgICAgICB0aXRsZTogY2hlY2tlci5zZXJ2ZXIsXG4gICAgICAgICAgICAgICAgdGltZTogJycsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJycsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKGNoZWNrZXIuaXNGaW5pc2hlZCgpKSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzLnN0YXR1cyA9IGNoZWNrZXIuc3VjY2VlZGVkID8gJ+KckyAnIDogJ+KcliAnO1xuICAgICAgICAgICAgICAgIHN0YXR1cy50aW1lID0gYCDigKYgJHtjaGVja2VyLnRpbWUgLyAxXzAwMH1zYDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2Vjb25kcyA+IDApIHtcbiAgICAgICAgICAgICAgICBzdGF0dXMudGltZSA9IGAg4oCmICR7c2Vjb25kc31zYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghY2hlY2tlci5zdWNjZWVkZWQpIHtcbiAgICAgICAgICAgICAgICBzdGF0dXMubWVzc2FnZSA9IGNoZWNrZXIubWVzc2FnZSAhPT0gJycgPyBgIOKApiAke2NoZWNrZXIubWVzc2FnZX1gIDogJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc3RhdHVzO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBtdWx0aUJhciA9IG5ldyBjbGlQcm9ncmVzcy5NdWx0aUJhcihcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmb3JtYXQ6ICd7c3RhdHVzfXt0aXRsZX17dGltZX17bWVzc2FnZX0nLFxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBiYXJzID0gY2hlY2tlcnMubWFwKGNoZWNrZXIgPT4gbXVsdGlCYXIuY3JlYXRlKDEwMCwgMCwgZ2V0U3RhdHVzKGNoZWNrZXIpKSk7XG4gICAgICAgIGNvbnN0IHVwZGF0ZUxvZyA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNoZWNrZXJzXG4gICAgICAgICAgICAgICAgLm1hcChnZXRTdGF0dXMpXG4gICAgICAgICAgICAgICAgLm1hcChzdGF0dXMgPT4gYCR7c3RhdHVzLnRpdGxlfSR7c3RhdHVzLnRpbWV9JHtzdGF0dXMuc3RhdHVzfWApXG4gICAgICAgICAgICAgICAgLmpvaW4oJyAvICcpXG4gICAgICAgICAgICApO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCB1cGRhdGVCYXIgPSAoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoZWNrZXJzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgYmFyc1tpXS51cGRhdGUoMSwgZ2V0U3RhdHVzKGNoZWNrZXJzW2ldKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHVwZGF0ZVByb2dyZXNzID0gYmFyc1swXSA/IHVwZGF0ZUJhciA6IHVwZGF0ZUxvZztcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lcklkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWNvbmRzICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVByb2dyZXNzKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVuZmluaXNoZWQgPSBjaGVja2Vycy5maW5kKHggPT4gIXguaXNGaW5pc2hlZCgpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF1bmZpbmlzaGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVySWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzcy5leGl0KDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgMV8wMDApXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIC4uLmNoZWNrZXJzLm1hcCgoY2hlY2tlcjogQ2hlY2tOZXR3b3JrKSA9PiBjaGVja2VyLmNoZWNrKHVwZGF0ZVByb2dyZXNzKSlcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgc2VydmVyOiBzdHJpbmc7XG4gICAgdmVyYm9zZTogYm9vbGVhbjtcbiAgICBjbGllbnQ6IFRPTkNsaWVudDtcbiAgICBvblVwZGF0ZTogKCkgPT4gdm9pZDtcblxuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICBzdWNjZWVkZWQ6IGJvb2xlYW47XG4gICAgZmFpbGVkOiBib29sZWFuO1xuICAgIHN0YXJ0OiBudW1iZXI7XG4gICAgdGltZTogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3Ioc2VydmVyOiBzdHJpbmcsIHZlcmJvc2U6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5zZXJ2ZXIgPSBzZXJ2ZXI7XG4gICAgICAgIHRoaXMudmVyYm9zZSA9IHZlcmJvc2U7XG5cbiAgICAgICAgdGhpcy5tZXNzYWdlID0gJyc7XG4gICAgICAgIHRoaXMuc3VjY2VlZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZmFpbGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3RhcnQgPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLnRpbWUgPSAwO1xuICAgIH1cblxuICAgIGFzeW5jIGNoZWNrKG9uVXBkYXRlOiAoKSA9PiB2b2lkKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHRoaXMub25VcGRhdGUgPSBvblVwZGF0ZTtcbiAgICAgICAgdGhpcy5jbGllbnQgPSBhd2FpdCBUT05DbGllbnROb2RlSnMuY3JlYXRlKHtcbiAgICAgICAgICAgIHNlcnZlcnM6IFt0aGlzLnNlcnZlcl0sXG4gICAgICAgICAgICBsb2dfdmVyYm9zZTogdGhpcy52ZXJib3NlLFxuICAgICAgICB9KTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY2hlY2tHaXZlcigpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5jaGVja1NlbmRHcmFtcygpO1xuICAgICAgICAgICAgdGhpcy5yZXBvcnQoeyBzdWNjZWVkZWQ6IHRydWUgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLnJlcG9ydCh7IGVycm9yIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgY2hlY2tHaXZlcigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgZ2l2ZXJzID0gYXdhaXQgdGhpcy5jbGllbnQucXVlcmllcy5hY2NvdW50cy5xdWVyeShcbiAgICAgICAgICAgIHsgaWQ6IHsgZXE6IENoZWNrTmV0d29yay5naXZlckFkZHJlc3MgfSB9LFxuICAgICAgICAgICAgJ2JhbGFuY2UgY29kZScpO1xuICAgICAgICBpZiAoZ2l2ZXJzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIHRoaXMucmVwb3J0KHsgZXJyb3I6ICdubyBnaXZlcicgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8kRmxvd0ZpeE1lXG4gICAgICAgIGNvbnN0IGdpdmVyQmFsYW5jZSA9IEJpZ0ludChnaXZlcnNbMF0uYmFsYW5jZSk7XG4gICAgICAgIGlmIChnaXZlckJhbGFuY2UgPT09IEJpZ0ludCgwKSkge1xuICAgICAgICAgICAgdGhpcy5yZXBvcnQoeyBlcnJvcjogJ2dpdmVyIGJhbGFuY2UgaXMgZW1wdHknIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChnaXZlckJhbGFuY2UgPCBCaWdJbnQoMV8wMDBfMDAwXzAwMCkpIHtcbiAgICAgICAgICAgIHRoaXMucmVwb3J0KHsgZXJyb3I6IGBnaXZlciBiYWxhbmNlIHRvbyBsb3c6ICR7Z2l2ZXJCYWxhbmNlfWAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFnaXZlcnNbMF0uY29kZSkge1xuICAgICAgICAgICAgdGhpcy5yZXBvcnQoeyBlcnJvcjogYGdpdmVyIGNvZGUgbWlzc2luZ2AgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBjaGVja1NlbmRHcmFtcygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5jbGllbnQuY29udHJhY3RzLnJ1bih7XG4gICAgICAgICAgICBhZGRyZXNzOiBDaGVja05ldHdvcmsuZ2l2ZXJBZGRyZXNzLFxuICAgICAgICAgICAgZnVuY3Rpb25OYW1lOiAnc2VuZFRyYW5zYWN0aW9uJyxcbiAgICAgICAgICAgIGFiaTogQ2hlY2tOZXR3b3JrLmdpdmVyUGFja2FnZS5hYmksXG4gICAgICAgICAgICBpbnB1dDoge1xuICAgICAgICAgICAgICAgIGRlc3Q6ICcwOmFkYjYzYTIyODgzN2U0NzhjN2VkZjVmZTNmMGI1ZDEyMTgzZTFmMjIyNDZiNjc3MTJiOTllYzUzOGQ2YzUzNTcnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAxXzAwMF8wMDAsXG4gICAgICAgICAgICAgICAgYm91bmNlOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGtleVBhaXI6IENoZWNrTmV0d29yay5naXZlcktleXMsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlzRmluaXNoZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN1Y2NlZWRlZCB8fCB0aGlzLmZhaWxlZDtcbiAgICB9XG5cbiAgICByZXBvcnQob3B0aW9uczoge1xuICAgICAgICBzdWNjZWVkZWQ/OiBib29sZWFuLFxuICAgICAgICBlcnJvcj86IGFueSxcbiAgICAgICAgbWVzc2FnZT86IHN0cmluZyxcbiAgICB9KSB7XG4gICAgICAgIGlmIChvcHRpb25zLnN1Y2NlZWRlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnN1Y2NlZWRlZCA9IG9wdGlvbnMuc3VjY2VlZGVkO1xuICAgICAgICAgICAgdGhpcy5mYWlsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9ICcnO1xuICAgICAgICAgICAgdGhpcy50aW1lID0gRGF0ZS5ub3coKSAtIHRoaXMuc3RhcnQ7XG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5lcnJvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSAob3B0aW9ucy5lcnJvciAmJiBvcHRpb25zLmVycm9yLm1lc3NhZ2UpXG4gICAgICAgICAgICAgICAgPyBvcHRpb25zLmVycm9yLm1lc3NhZ2VcbiAgICAgICAgICAgICAgICA6IChvcHRpb25zLmVycm9yIHx8ICcnKS50b1N0cmluZygpO1xuICAgICAgICAgICAgdGhpcy5mYWlsZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zdWNjZWVkZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMudGltZSA9IERhdGUubm93KCkgLSB0aGlzLnN0YXJ0O1xuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMubWVzc2FnZSAhPT0gdW5kZWZpbmVkICYmICF0aGlzLmlzRmluaXNoZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gb3B0aW9ucy5tZXNzYWdlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25VcGRhdGUoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2l2ZXJBZGRyZXNzID0gJzA6NWIxNjg5NzBhOWM2M2RkNWM0MmE2YWZiY2Y3MDZlZjY1MjQ3NmJiODk2MGEyMmUxZDhhMmFkMTQ4ZTYwYzBlYSc7XG4gICAgc3RhdGljIGdpdmVyS2V5cyA9IHtcbiAgICAgICAgc2VjcmV0OiAnMjI0NWU0ZjQ0YWY4YWY2YmJkMTVjNGE1M2ViNjdhOGYyMTFkNTQxZGRjN2MxOTdmNzRkNzgzMGRiYTZkMjdmZScsXG4gICAgICAgIHB1YmxpYzogJ2Q1NDJmNDQxNDZmMTY5YzY3MjZjOGNmNzBlNGNiYjNkMzNkOGQ4NDJhNGFmZDc5OWFjMTIyYzU4MDhkODFiYTMnLFxuICAgIH07XG4gICAgc3RhdGljIGdpdmVyUGFja2FnZSA9IHtcbiAgICAgICAgYWJpOiB7XG4gICAgICAgICAgICBcIkFCSSB2ZXJzaW9uXCI6IDEsXG4gICAgICAgICAgICBcImZ1bmN0aW9uc1wiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJjb25zdHJ1Y3RvclwiLFxuICAgICAgICAgICAgICAgICAgICBcImlucHV0c1wiOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgXCJvdXRwdXRzXCI6IFtdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcInNlbmRUcmFuc2FjdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICBcImlucHV0c1wiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7IFwibmFtZVwiOiBcImRlc3RcIiwgXCJ0eXBlXCI6IFwiYWRkcmVzc1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IFwibmFtZVwiOiBcInZhbHVlXCIsIFwidHlwZVwiOiBcInVpbnQxMjhcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJib3VuY2VcIiwgXCJ0eXBlXCI6IFwiYm9vbFwiIH1cbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgXCJvdXRwdXRzXCI6IFtdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFwiZXZlbnRzXCI6IFtdLFxuICAgICAgICAgICAgXCJkYXRhXCI6IFtcbiAgICAgICAgICAgICAgICB7IFwia2V5XCI6IDEwMCwgXCJuYW1lXCI6IFwib3duZXJcIiwgXCJ0eXBlXCI6IFwidWludDI1NlwiIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgaW1hZ2VCYXNlNjQ6ICd0ZTZjY2dFQ0pRRUFCZDhBQWdFMEJnRUJBY0FDQWdQUElBVURBUUhlQkFBRDBDQUFRZGdBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUJBSW8vd0Fnd0FIMHBDQllrdlNnNFlydFUxZ3c5S0FUQndFSzlLUWc5S0VJQWdQTlFCQUpBZ0hPRFFvQ0FTQU1Dd0FIRERiTUlBQW5DRnd2Q0x3R2Jtdzh1Qm1JaUlpY2ZBS1h3T0FDQVNBUERnQTFPMUhieEZ2RU1qTC80Qms3VWR2RW9CQTlFUHRSd0Z2VXUxWGdBTlUvdnNCWkdWamIyUmxYMkZrWkhJZytrQXkra0lnYnhBZ2Nyb2hjN3F4OHVCOUlXOFJidkxnZmNoMHp3c0NJbThTendvSEltOFRJbks2bGlOdkV5TE9NcDhoZ1FFQUl0ZEpvYzlBTWlBaXpqTGkvdndCWkdWamIyUmxYMkZrWkhJd0ljblFKVlZCWHdYYk1JQUlCSUJJUkFDdWsvMzJBczdLNkw3RXd0akMzTWJMOEU3ZUliWmhBQUtXbGYzMkFzTEd2dWprd3R6bXpNcmxrT1dlZ0VXZUZBRGpub0h3VVo0c1NaNHNSL1FFNDU2QTRmUUU0ZlFGQUlHZWdmQkhuaFkrNVo2QVFaSkY5Z0g5L2dMQ3hyN281TUxjNXN6SzVMN0szTWkrQ3dBSUJJQm9VQWVELy92MEJiV0ZwYmw5bGVIUmxjbTVoYkNHT1dmNzhBV2RsZEY5emNtTmZZV1JrY2lEUUlOTUFNbkM5amhyKy9RRm5aWFJmYzNKalgyRmtaSEl3Y01qSjBGVVJYd0xiTU9BZ2N0Y2hNU0RUQURJaCtrQXovdjBCWjJWMFgzTnlZMTloWkdSeU1TRWhWVEZmQk5zdzJERWhGUUg0am5YKy9nRm5aWFJmYlhOblgzQjFZbXRsZVNESEFvNFcvdjhCWjJWMFgyMXpaMTl3ZFdKclpYa3hjREhiTU9EVklNY0JqaGYrL3dGblpYUmZiWE5uWDNCMVltdGxlVEp3TVRIYk1PQWdnUUlBMXlIWEMvOGkrUUVpSXZrUThxaisvd0ZuWlhSZmJYTm5YM0IxWW10bGVUTWdBMThEMnpEWUlzY0NzeFlCekpRaTFERXozaVFpSW80NC92a0JjM1J2Y21WZmMybG5id0FoYjR3aWI0d2piNHp0UnlGdmpPMUUwUFFGYjR3ZzdWZisvUUZ6ZEc5eVpWOXphV2RmWlc1a1h3WFlJc2NCamhQKy9BRnRjMmRmYVhOZlpXMXdkSGxmQnRzdzRDTFRIelFqMHo4MUlCY0JkbzZBMkk0di92NEJiV0ZwYmw5bGVIUmxjbTVoYkRJa0lsVnhYd2p4UUFIKy9nRnRZV2x1WDJWNGRHVnlibUZzTTE4STJ6RGdnSHp5OEY4SUdBSCsvdnNCY21Wd2JHRjVYM0J5YjNSd2NIRHRSTkFnOUFReU5DQ0JBSURYUlpvZzB6OHlNeURUUHpJeWxvSUlHM2RBTXVJaUpia2wrQ09CQStpb0pLQzVzSTRweUNRQjlBQWx6d3MvSXM4TFB5SFBGaURKN1ZUKy9BRnlaWEJzWVhsZmNISnZkREovQmw4RzJ6RGcvdndCY21Wd2JHRjVYM0J5YjNRemNBVmZCUmtBQk5zd0FnRWdIaHNDQW5NZEhBQVB0RDl4QTVodG1FQUF3N1FhWnV6Mm83ZUl0NGhBTW5hanQ0bEFJSG9IU2VuLzZNaTRjVjE1Y0RKOEFIZ1FhYi9wQUJoNEVYOStBTGc2dWJRNE1qR2J1amV4bW5haWFIb0E1SGFqdDRrQStnQVE1NHNRWlBhcWYzNkF1RHE1dERneU1adTZON0dhR0MrQmJaaEFBZ0ZJSWg4QkNiaUpBQ2RRSUFIKy92MEJZMjl1YzNSeVgzQnliM1JmTUhCd2dnZ2JkMER0Uk5BZzlBUXlOQ0NCQUlEWFJZNFVJTkkvTWpNZzBqOHlNaUJ4MTBXVWdIdnk4TjdleUNRQjlBQWp6d3MvSXM4TFAzSFBRU0hQRmlESjdWVCsvUUZqYjI1emRISmZjSEp2ZEY4eFh3WDRBRER3SWY3OEFYQjFjMmh3WkdNM2RHOWpOTzFFMFBRQnlDRUFSTzFIYnhJQjlBQWh6eFlneWUxVS92MEJjSFZ6YUhCa1l6ZDBiMk0wTUY4QzJ6QUI0dHorL1FGdFlXbHVYMmx1ZEdWeWJtRnNJWTVaL3Z3QloyVjBYM055WTE5aFpHUnlJTkFnMHdBeWNMMk9Hdjc5QVdkbGRGOXpjbU5mWVdSa2NqQnd5TW5RVlJGZkF0c3c0Q0J5MXlFeElOTUFNaUg2UURQKy9RRm5aWFJmYzNKalgyRmtaSEl4SVNGVk1WOEUyekRZSkNGd0l3SHFqamorK1FGemRHOXlaVjl6YVdkdkFDRnZqQ0p2akNOdmpPMUhJVytNN1VUUTlBVnZqQ0R0Vi83OUFYTjBiM0psWDNOcFoxOWxibVJmQmRnaXh3Q09IQ0Z3dW80U0lvSVFYSDdpQjFWUlh3YnhRQUZmQnRzdzRGOEcyekRnL3Y0QmJXRnBibDlwYm5SbGNtNWhiREVpMHg4MEluRzZKQUEybmlDQUkxVmhYd2Z4UUFGZkI5c3c0Q01oVldGZkIvRkFBVjhIJyxcbiAgICB9O1xuXG4gICAgc3RhdGljIGFzeW5jIHJlc29sdmVHaXZlclBhcmFtZXRlcnMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IFRPTkNsaWVudE5vZGVKcy5jcmVhdGUoeyBzZXJ2ZXJzOiBbJ25ldC50b24uZGV2J10gfSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQga2V5c1BhdGggPSBwYXRoLnJlc29sdmUob3MuaG9tZWRpcigpLCAnZ2l2ZXJLZXlzLmpzb24nKTtcbiAgICAgICAgICAgIENoZWNrTmV0d29yay5naXZlcktleXMgPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhrZXlzUGF0aCwgJ3V0ZjgnKSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIH1cbiAgICAgICAgQ2hlY2tOZXR3b3JrLmdpdmVyQWRkcmVzcyA9IChhd2FpdCBjbGllbnQuY29udHJhY3RzLmNyZWF0ZURlcGxveU1lc3NhZ2Uoe1xuICAgICAgICAgICAgcGFja2FnZTogQ2hlY2tOZXR3b3JrLmdpdmVyUGFja2FnZSxcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yUGFyYW1zOiB7fSxcbiAgICAgICAgICAgIGtleVBhaXI6IENoZWNrTmV0d29yay5naXZlcktleXMsXG4gICAgICAgIH0pKS5hZGRyZXNzO1xuICAgIH1cblxuXG59XG5cbiJdfQ==