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
                  var decor = function decor(text) {
                    return text;
                  };

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvY2hlY2suanMiXSwibmFtZXMiOlsib3MiLCJyZXF1aXJlIiwiZnMiLCJwYXRoIiwiY2xpUHJvZ3Jlc3MiLCJfY29sb3JzIiwiQ2hlY2tOZXR3b3JrIiwic2VydmVycyIsInZlcmJvc2UiLCJyZXNvbHZlR2l2ZXJQYXJhbWV0ZXJzIiwiY2hlY2tlcnMiLCJtYXAiLCJzZXJ2ZXIiLCJzZWNvbmRzIiwic2VydmVyTWF4TGVuZ3RoIiwicmVkdWNlIiwibWF4TGVuZ3RoIiwiTWF0aCIsIm1heCIsImxlbmd0aCIsImdldFN0YXR1cyIsImNoZWNrZXIiLCJkZWNvciIsInRleHQiLCJzdWNjZWVkZWQiLCJncmVlbiIsImZhaWxlZCIsInJlZCIsInN0YXR1cyIsInRpdGxlIiwicGFkRW5kIiwidGltZSIsIm1lc3NhZ2UiLCJpc0ZpbmlzaGVkIiwibXVsdGlCYXIiLCJNdWx0aUJhciIsImZvcm1hdCIsImJhcnMiLCJjcmVhdGUiLCJ1cGRhdGVMb2ciLCJjb25zb2xlIiwibG9nIiwiam9pbiIsInVwZGF0ZUJhciIsImkiLCJ1cGRhdGUiLCJ1cGRhdGVQcm9ncmVzcyIsIlByb21pc2UiLCJhbGwiLCJyZXNvbHZlIiwidGltZXJJZCIsInNldEludGVydmFsIiwidW5maW5pc2hlZCIsImZpbmQiLCJ4IiwiY2xlYXJJbnRlcnZhbCIsInByb2Nlc3MiLCJleGl0IiwiY2hlY2siLCJzdGFydCIsIkRhdGUiLCJub3ciLCJvblVwZGF0ZSIsIlRPTkNsaWVudE5vZGVKcyIsImxvZ192ZXJib3NlIiwiY2xpZW50IiwiY2hlY2tHaXZlciIsImNoZWNrU2VuZEdyYW1zIiwicmVwb3J0IiwiZXJyb3IiLCJxdWVyaWVzIiwiYWNjb3VudHMiLCJxdWVyeSIsImlkIiwiZXEiLCJnaXZlckFkZHJlc3MiLCJnaXZlcnMiLCJnaXZlckJhbGFuY2UiLCJCaWdJbnQiLCJiYWxhbmNlIiwiY29kZSIsImNvbnRyYWN0cyIsInJ1biIsImFkZHJlc3MiLCJmdW5jdGlvbk5hbWUiLCJhYmkiLCJnaXZlclBhY2thZ2UiLCJpbnB1dCIsImRlc3QiLCJ2YWx1ZSIsImJvdW5jZSIsImtleVBhaXIiLCJnaXZlcktleXMiLCJvcHRpb25zIiwidW5kZWZpbmVkIiwidG9TdHJpbmciLCJrZXlzUGF0aCIsImhvbWVkaXIiLCJKU09OIiwicGFyc2UiLCJyZWFkRmlsZVN5bmMiLCJjcmVhdGVEZXBsb3lNZXNzYWdlIiwiY29uc3RydWN0b3JQYXJhbXMiLCJzZWNyZXQiLCJpbWFnZUJhc2U2NCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBOztBQWhCQTs7Ozs7Ozs7Ozs7Ozs7QUFtQkEsSUFBTUEsRUFBRSxHQUFHQyxPQUFPLENBQUMsSUFBRCxDQUFsQjs7QUFDQSxJQUFNQyxFQUFFLEdBQUdELE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQUNBLElBQU1FLElBQUksR0FBR0YsT0FBTyxDQUFDLE1BQUQsQ0FBcEI7O0FBQ0EsSUFBTUcsV0FBVyxHQUFHSCxPQUFPLENBQUMsY0FBRCxDQUEzQjs7QUFDQSxJQUFNSSxPQUFPLEdBQUdKLE9BQU8sQ0FBQyxRQUFELENBQXZCOztJQUVhSyxZOzs7Ozs7OztvREFDa0JDLE8sRUFBbUJDLE87Ozs7Ozs7dUJBQ3BDRixZQUFZLENBQUNHLHNCQUFiLEU7OztBQUNBQyxnQkFBQUEsUSxHQUEyQkgsT0FBTyxDQUFDSSxHQUFSLENBQVksVUFBQUMsTUFBTTtBQUFBLHlCQUFJLElBQUlOLFlBQUosQ0FBaUJNLE1BQWpCLEVBQXlCSixPQUF6QixDQUFKO0FBQUEsaUJBQWxCLEM7QUFDN0JLLGdCQUFBQSxPLEdBQWtCLEM7QUFDaEJDLGdCQUFBQSxlLEdBQWtCUCxPQUFPLENBQUNRLE1BQVIsQ0FBZSxVQUFDQyxTQUFELEVBQVlKLE1BQVo7QUFBQSx5QkFBdUJLLElBQUksQ0FBQ0MsR0FBTCxDQUFTRixTQUFULEVBQW9CSixNQUFNLENBQUNPLE1BQTNCLENBQXZCO0FBQUEsaUJBQWYsRUFBMEUsQ0FBMUUsQzs7QUFDbEJDLGdCQUFBQSxTLEdB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LDZCQUFTL0YsWUFBWSxDQUFDZ0YsWUFEOEM7QUFFcEVnQixrQkFBQUEsaUJBQWlCLEVBQUUsRUFGaUQ7QUFHcEVYLGtCQUFBQSxPQUFPLEVBQUVyRixZQUFZLENBQUNzRjtBQUg4QyxpQkFBckMsQzs7O0FBQW5DdEYsZ0JBQUFBLFlBQVksQ0FBQ3FFLFksa0JBSVRRLE87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQ0FyTkM3RSxZLGtCQTBLYSxvRTtpQ0ExS2JBLFksZUEyS1U7QUFDZmlHLEVBQUFBLE1BQU0sRUFBRSxrRUFETztBQUVmLFlBQVE7QUFGTyxDO2lDQTNLVmpHLFksa0JBK0thO0FBQ2xCK0UsRUFBQUEsR0FBRyxFQUFFO0FBQ0QsbUJBQWUsQ0FEZDtBQUVELGlCQUFhLENBQ1Q7QUFDSSxjQUFRLGFBRFo7QUFFSSxnQkFBVSxFQUZkO0FBR0ksaUJBQVc7QUFIZixLQURTLEVBTVQ7QUFDSSxjQUFRLGlCQURaO0FBRUksZ0JBQVUsQ0FDTjtBQUFFLGdCQUFRLE1BQVY7QUFBa0IsZ0JBQVE7QUFBMUIsT0FETSxFQUVOO0FBQUUsZ0JBQVEsT0FBVjtBQUFtQixnQkFBUTtBQUEzQixPQUZNLEVBR047QUFBRSxnQkFBUSxRQUFWO0FBQW9CLGdCQUFRO0FBQTVCLE9BSE0sQ0FGZDtBQU9JLGlCQUFXO0FBUGYsS0FOUyxDQUZaO0FBa0JELGNBQVUsRUFsQlQ7QUFtQkQsWUFBUSxDQUNKO0FBQUUsYUFBTyxHQUFUO0FBQWMsY0FBUSxPQUF0QjtBQUErQixjQUFRO0FBQXZDLEtBREk7QUFuQlAsR0FEYTtBQXdCbEJtQixFQUFBQSxXQUFXLEVBQUU7QUF4QkssQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOC0yMDE5IFRPTiBERVYgU09MVVRJT05TIExURC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgU09GVFdBUkUgRVZBTFVBVElPTiBMaWNlbnNlICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbiAqIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxuICogTGljZW5zZSBhdDogaHR0cHM6Ly93d3cudG9uLmRldi9saWNlbnNlc1xuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgVE9OIERFViBzb2Z0d2FyZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cblxuLy8gQGZsb3dcbmltcG9ydCB7IFRPTkNsaWVudCBhcyBUT05DbGllbnROb2RlSnMgfSBmcm9tIFwidG9uLWNsaWVudC1ub2RlLWpzXCI7XG5pbXBvcnQgdHlwZSB7IFRPTkNsaWVudCB9IGZyb20gXCJ0b24tY2xpZW50LWpzL3R5cGVzXCI7XG5cbmNvbnN0IG9zID0gcmVxdWlyZSgnb3MnKTtcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCBjbGlQcm9ncmVzcyA9IHJlcXVpcmUoJ2NsaS1wcm9ncmVzcycpO1xuY29uc3QgX2NvbG9ycyA9IHJlcXVpcmUoJ2NvbG9ycycpO1xuXG5leHBvcnQgY2xhc3MgQ2hlY2tOZXR3b3JrIHtcbiAgICBzdGF0aWMgYXN5bmMgY2hlY2tOZXR3b3JrcyhzZXJ2ZXJzOiBzdHJpbmdbXSwgdmVyYm9zZTogYm9vbGVhbik6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBhd2FpdCBDaGVja05ldHdvcmsucmVzb2x2ZUdpdmVyUGFyYW1ldGVycygpO1xuICAgICAgICBjb25zdCBjaGVja2VyczogQ2hlY2tOZXR3b3JrW10gPSBzZXJ2ZXJzLm1hcChzZXJ2ZXIgPT4gbmV3IENoZWNrTmV0d29yayhzZXJ2ZXIsIHZlcmJvc2UpKTtcbiAgICAgICAgbGV0IHNlY29uZHM6IG51bWJlciA9IDA7XG4gICAgICAgIGNvbnN0IHNlcnZlck1heExlbmd0aCA9IHNlcnZlcnMucmVkdWNlKChtYXhMZW5ndGgsIHNlcnZlcikgPT4gTWF0aC5tYXgobWF4TGVuZ3RoLCBzZXJ2ZXIubGVuZ3RoKSwgMCk7XG4gICAgICAgIGNvbnN0IGdldFN0YXR1cyA9IChjaGVja2VyOiBDaGVja05ldHdvcmspID0+IHtcbiAgICAgICAgICAgIGxldCBkZWNvciA9IHRleHQgPT4gdGV4dDtcbiAgICAgICAgICAgIGlmIChjaGVja2VyLnN1Y2NlZWRlZCkge1xuICAgICAgICAgICAgICAgIGRlY29yID0gX2NvbG9ycy5ncmVlbjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hlY2tlci5mYWlsZWQpIHtcbiAgICAgICAgICAgICAgICBkZWNvciA9IF9jb2xvcnMucmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgc3RhdHVzID0ge1xuICAgICAgICAgICAgICAgIHN0YXR1czogJyAgJyxcbiAgICAgICAgICAgICAgICB0aXRsZTogZGVjb3IoY2hlY2tlci5zZXJ2ZXIucGFkRW5kKHNlcnZlck1heExlbmd0aCkpLFxuICAgICAgICAgICAgICAgIHRpbWU6ICcnLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICcnLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChjaGVja2VyLmlzRmluaXNoZWQoKSkge1xuICAgICAgICAgICAgICAgIHN0YXR1cy5zdGF0dXMgPSBkZWNvcihjaGVja2VyLnN1Y2NlZWRlZCA/ICfinJMgJyA6ICfinJYgJyk7XG4gICAgICAgICAgICAgICAgc3RhdHVzLnRpbWUgPSBkZWNvcihgIOKApiAke2NoZWNrZXIudGltZSAvIDFfMDAwfXNgKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2Vjb25kcyA+IDApIHtcbiAgICAgICAgICAgICAgICBzdGF0dXMudGltZSA9IGRlY29yKGAg4oCmICR7c2Vjb25kc31zYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWNoZWNrZXIuc3VjY2VlZGVkKSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzLm1lc3NhZ2UgPSBjaGVja2VyLm1lc3NhZ2UgIT09ICcnID8gZGVjb3IoYCDigKYgJHtjaGVja2VyLm1lc3NhZ2V9YCkgOiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzdGF0dXM7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IG11bHRpQmFyID0gbmV3IGNsaVByb2dyZXNzLk11bHRpQmFyKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZvcm1hdDogJ3tzdGF0dXN9e3RpdGxlfXt0aW1lfXttZXNzYWdlfScsXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGJhcnMgPSBjaGVja2Vycy5tYXAoY2hlY2tlciA9PiBtdWx0aUJhci5jcmVhdGUoMTAwLCAwLCBnZXRTdGF0dXMoY2hlY2tlcikpKTtcbiAgICAgICAgY29uc3QgdXBkYXRlTG9nID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coY2hlY2tlcnNcbiAgICAgICAgICAgICAgICAubWFwKGdldFN0YXR1cylcbiAgICAgICAgICAgICAgICAubWFwKHN0YXR1cyA9PiBgJHtzdGF0dXMudGl0bGV9JHtzdGF0dXMudGltZX0ke3N0YXR1cy5zdGF0dXN9YClcbiAgICAgICAgICAgICAgICAuam9pbignIC8gJylcbiAgICAgICAgICAgICk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHVwZGF0ZUJhciA9ICgpID0+IHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hlY2tlcnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBiYXJzW2ldLnVwZGF0ZSgxLCBnZXRTdGF0dXMoY2hlY2tlcnNbaV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgdXBkYXRlUHJvZ3Jlc3MgPSBiYXJzWzBdID8gdXBkYXRlQmFyIDogdXBkYXRlTG9nO1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVySWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlY29uZHMgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlUHJvZ3Jlc3MoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdW5maW5pc2hlZCA9IGNoZWNrZXJzLmZpbmQoeCA9PiAheC5pc0ZpbmlzaGVkKCkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXVuZmluaXNoZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXJJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzcy5leGl0KDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgMV8wMDApXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIC4uLmNoZWNrZXJzLm1hcCgoY2hlY2tlcjogQ2hlY2tOZXR3b3JrKSA9PiBjaGVja2VyLmNoZWNrKHVwZGF0ZVByb2dyZXNzKSlcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgc2VydmVyOiBzdHJpbmc7XG4gICAgdmVyYm9zZTogYm9vbGVhbjtcbiAgICBjbGllbnQ6IFRPTkNsaWVudDtcbiAgICBvblVwZGF0ZTogKCkgPT4gdm9pZDtcblxuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICBzdWNjZWVkZWQ6IGJvb2xlYW47XG4gICAgZmFpbGVkOiBib29sZWFuO1xuICAgIHN0YXJ0OiBudW1iZXI7XG4gICAgdGltZTogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3Ioc2VydmVyOiBzdHJpbmcsIHZlcmJvc2U6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5zZXJ2ZXIgPSBzZXJ2ZXI7XG4gICAgICAgIHRoaXMudmVyYm9zZSA9IHZlcmJvc2U7XG5cbiAgICAgICAgdGhpcy5tZXNzYWdlID0gJyc7XG4gICAgICAgIHRoaXMuc3VjY2VlZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZmFpbGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3RhcnQgPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLnRpbWUgPSAwO1xuICAgIH1cblxuICAgIGFzeW5jIGNoZWNrKG9uVXBkYXRlOiAoKSA9PiB2b2lkKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHRoaXMub25VcGRhdGUgPSBvblVwZGF0ZTtcbiAgICAgICAgdGhpcy5jbGllbnQgPSBhd2FpdCBUT05DbGllbnROb2RlSnMuY3JlYXRlKHtcbiAgICAgICAgICAgIHNlcnZlcnM6IFt0aGlzLnNlcnZlcl0sXG4gICAgICAgICAgICBsb2dfdmVyYm9zZTogdGhpcy52ZXJib3NlLFxuICAgICAgICB9KTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY2hlY2tHaXZlcigpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5jaGVja1NlbmRHcmFtcygpO1xuICAgICAgICAgICAgdGhpcy5yZXBvcnQoeyBzdWNjZWVkZWQ6IHRydWUgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLnJlcG9ydCh7IGVycm9yIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgY2hlY2tHaXZlcigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgdGhpcy5yZXBvcnQoeyBtZXNzYWdlOiAnbG9va2luZyBmb3IgZ2l2ZXInIH0pO1xuICAgICAgICBjb25zdCBnaXZlcnMgPSBhd2FpdCB0aGlzLmNsaWVudC5xdWVyaWVzLmFjY291bnRzLnF1ZXJ5KFxuICAgICAgICAgICAgeyBpZDogeyBlcTogQ2hlY2tOZXR3b3JrLmdpdmVyQWRkcmVzcyB9IH0sXG4gICAgICAgICAgICAnYmFsYW5jZSBjb2RlJyk7XG4gICAgICAgIGlmIChnaXZlcnMubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgdGhpcy5yZXBvcnQoeyBlcnJvcjogJ25vIGdpdmVyJyB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyRGbG93Rml4TWVcbiAgICAgICAgY29uc3QgZ2l2ZXJCYWxhbmNlID0gQmlnSW50KGdpdmVyc1swXS5iYWxhbmNlKTtcbiAgICAgICAgaWYgKGdpdmVyQmFsYW5jZSA9PT0gQmlnSW50KDApKSB7XG4gICAgICAgICAgICB0aGlzLnJlcG9ydCh7IGVycm9yOiAnZ2l2ZXIgYmFsYW5jZSBpcyBlbXB0eScgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdpdmVyQmFsYW5jZSA8IEJpZ0ludCgxXzAwMF8wMDBfMDAwKSkge1xuICAgICAgICAgICAgdGhpcy5yZXBvcnQoeyBlcnJvcjogYGdpdmVyIGJhbGFuY2UgdG9vIGxvdzogJHtnaXZlckJhbGFuY2V9YCB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWdpdmVyc1swXS5jb2RlKSB7XG4gICAgICAgICAgICB0aGlzLnJlcG9ydCh7IGVycm9yOiBgZ2l2ZXIgY29kZSBtaXNzaW5nYCB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGNoZWNrU2VuZEdyYW1zKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICB0aGlzLnJlcG9ydCh7IG1lc3NhZ2U6ICdwcm9jZXNzaW5nIG1lc3NhZ2UnIH0pO1xuICAgICAgICBhd2FpdCB0aGlzLmNsaWVudC5jb250cmFjdHMucnVuKHtcbiAgICAgICAgICAgIGFkZHJlc3M6IENoZWNrTmV0d29yay5naXZlckFkZHJlc3MsXG4gICAgICAgICAgICBmdW5jdGlvbk5hbWU6ICdzZW5kVHJhbnNhY3Rpb24nLFxuICAgICAgICAgICAgYWJpOiBDaGVja05ldHdvcmsuZ2l2ZXJQYWNrYWdlLmFiaSxcbiAgICAgICAgICAgIGlucHV0OiB7XG4gICAgICAgICAgICAgICAgZGVzdDogJzA6YWRiNjNhMjI4ODM3ZTQ3OGM3ZWRmNWZlM2YwYjVkMTIxODNlMWYyMjI0NmI2NzcxMmI5OWVjNTM4ZDZjNTM1NycsXG4gICAgICAgICAgICAgICAgdmFsdWU6IDFfMDAwXzAwMCxcbiAgICAgICAgICAgICAgICBib3VuY2U6IGZhbHNlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAga2V5UGFpcjogQ2hlY2tOZXR3b3JrLmdpdmVyS2V5cyxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaXNGaW5pc2hlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3VjY2VlZGVkIHx8IHRoaXMuZmFpbGVkO1xuICAgIH1cblxuICAgIHJlcG9ydChvcHRpb25zOiB7XG4gICAgICAgIHN1Y2NlZWRlZD86IGJvb2xlYW4sXG4gICAgICAgIGVycm9yPzogYW55LFxuICAgICAgICBtZXNzYWdlPzogc3RyaW5nLFxuICAgIH0pIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuc3VjY2VlZGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3VjY2VlZGVkID0gb3B0aW9ucy5zdWNjZWVkZWQ7XG4gICAgICAgICAgICB0aGlzLmZhaWxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gJyc7XG4gICAgICAgICAgICB0aGlzLnRpbWUgPSBEYXRlLm5vdygpIC0gdGhpcy5zdGFydDtcbiAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmVycm9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IChvcHRpb25zLmVycm9yICYmIG9wdGlvbnMuZXJyb3IubWVzc2FnZSlcbiAgICAgICAgICAgICAgICA/IG9wdGlvbnMuZXJyb3IubWVzc2FnZVxuICAgICAgICAgICAgICAgIDogKG9wdGlvbnMuZXJyb3IgfHwgJycpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLmZhaWxlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnN1Y2NlZWRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy50aW1lID0gRGF0ZS5ub3coKSAtIHRoaXMuc3RhcnQ7XG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5tZXNzYWdlICE9PSB1bmRlZmluZWQgJiYgIXRoaXMuaXNGaW5pc2hlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSBvcHRpb25zLm1lc3NhZ2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vblVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHN0YXRpYyBnaXZlckFkZHJlc3MgPSAnMDo1YjE2ODk3MGE5YzYzZGQ1YzQyYTZhZmJjZjcwNmVmNjUyNDc2YmI4OTYwYTIyZTFkOGEyYWQxNDhlNjBjMGVhJztcbiAgICBzdGF0aWMgZ2l2ZXJLZXlzID0ge1xuICAgICAgICBzZWNyZXQ6ICcyMjQ1ZTRmNDRhZjhhZjZiYmQxNWM0YTUzZWI2N2E4ZjIxMWQ1NDFkZGM3YzE5N2Y3NGQ3ODMwZGJhNmQyN2ZlJyxcbiAgICAgICAgcHVibGljOiAnZDU0MmY0NDE0NmYxNjljNjcyNmM4Y2Y3MGU0Y2JiM2QzM2Q4ZDg0MmE0YWZkNzk5YWMxMjJjNTgwOGQ4MWJhMycsXG4gICAgfTtcbiAgICBzdGF0aWMgZ2l2ZXJQYWNrYWdlID0ge1xuICAgICAgICBhYmk6IHtcbiAgICAgICAgICAgIFwiQUJJIHZlcnNpb25cIjogMSxcbiAgICAgICAgICAgIFwiZnVuY3Rpb25zXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcImNvbnN0cnVjdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiaW5wdXRzXCI6IFtdLFxuICAgICAgICAgICAgICAgICAgICBcIm91dHB1dHNcIjogW11cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwic2VuZFRyYW5zYWN0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiaW5wdXRzXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiZGVzdFwiLCBcInR5cGVcIjogXCJhZGRyZXNzXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwidmFsdWVcIiwgXCJ0eXBlXCI6IFwidWludDEyOFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IFwibmFtZVwiOiBcImJvdW5jZVwiLCBcInR5cGVcIjogXCJib29sXCIgfVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBcIm91dHB1dHNcIjogW11cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgXCJldmVudHNcIjogW10sXG4gICAgICAgICAgICBcImRhdGFcIjogW1xuICAgICAgICAgICAgICAgIHsgXCJrZXlcIjogMTAwLCBcIm5hbWVcIjogXCJvd25lclwiLCBcInR5cGVcIjogXCJ1aW50MjU2XCIgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICBpbWFnZUJhc2U2NDogJ3RlNmNjZ0VDSlFFQUJkOEFBZ0UwQmdFQkFjQUNBZ1BQSUFVREFRSGVCQUFEMENBQVFkZ0FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQkFJby93QWd3QUgwcENCWWt2U2c0WXJ0VTFndzlLQVRCd0VLOUtRZzlLRUlBZ1BOUUJBSkFnSE9EUW9DQVNBTUN3QUhERGJNSUFBbkNGd3ZDTHdHYm13OHVCbUlpSWljZkFLWHdPQUNBU0FQRGdBMU8xSGJ4RnZFTWpMLzRCazdVZHZFb0JBOUVQdFJ3RnZVdTFYZ0FOVS92c0JaR1ZqYjJSbFgyRmtaSElnK2tBeStrSWdieEFnY3JvaGM3cXg4dUI5SVc4UmJ2TGdmY2gwendzQ0ltOFN6d29ISW04VEluSzZsaU52RXlMT01wOGhnUUVBSXRkSm9jOUFNaUFpempMaS92d0JaR1ZqYjJSbFgyRmtaSEl3SWNuUUpWVkJYd1hiTUlBSUJJQklSQUN1ay8zMkFzN0s2TDdFd3RqQzNNYkw4RTdlSWJaaEFBS1dsZjMyQXNMR3Z1amt3dHptek1ybGtPV2VnRVdlRkFEam5vSHdVWjRzU1o0c1IvUUU0NTZBNGZRRTRmUUZBSUdlZ2ZCSG5oWSs1WjZBUVpKRjlnSDkvZ0xDeHI3bzVNTGM1c3pLNUw3SzNNaStDd0FJQklCb1VBZUQvL3YwQmJXRnBibDlsZUhSbGNtNWhiQ0dPV2Y3OEFXZGxkRjl6Y21OZllXUmtjaURRSU5NQU1uQzlqaHIrL1FGblpYUmZjM0pqWDJGa1pISXdjTWpKMEZVUlh3TGJNT0FnY3RjaE1TRFRBREloK2tBei92MEJaMlYwWDNOeVkxOWhaR1J5TVNFaFZURmZCTnN3MkRFaEZRSDRqblgrL2dGblpYUmZiWE5uWDNCMVltdGxlU0RIQW80Vy92OEJaMlYwWDIxeloxOXdkV0pyWlhreGNESGJNT0RWSU1jQmpoZisvd0ZuWlhSZmJYTm5YM0IxWW10bGVUSndNVEhiTU9BZ2dRSUExeUhYQy84aStRRWlJdmtROHFqKy93Rm5aWFJmYlhOblgzQjFZbXRsZVRNZ0ExOEQyekRZSXNjQ3N4WUJ6SlFpMURFejNpUWlJbzQ0L3ZrQmMzUnZjbVZmYzJsbmJ3QWhiNHdpYjR3amI0enRSeUZ2ak8xRTBQUUZiNHdnN1ZmKy9RRnpkRzl5WlY5emFXZGZaVzVrWHdYWUlzY0JqaFArL0FGdGMyZGZhWE5mWlcxd2RIbGZCdHN3NENMVEh6UWowejgxSUJjQmRvNkEySTR2L3Y0QmJXRnBibDlsZUhSbGNtNWhiRElrSWxWeFh3anhRQUgrL2dGdFlXbHVYMlY0ZEdWeWJtRnNNMThJMnpEZ2dIenk4RjhJR0FIKy92c0JjbVZ3YkdGNVgzQnliM1J3Y0hEdFJOQWc5QVF5TkNDQkFJRFhSWm9nMHo4eU15RFRQekl5bG9JSUczZEFNdUlpSmJrbCtDT0JBK2lvSktDNXNJNHB5Q1FCOUFBbHp3cy9JczhMUHlIUEZpREo3VlQrL0FGeVpYQnNZWGxmY0hKdmRESi9CbDhHMnpEZy92d0JjbVZ3YkdGNVgzQnliM1F6Y0FWZkJSa0FCTnN3QWdFZ0hoc0NBbk1kSEFBUHREOXhBNWh0bUVBQXc3UWFadXoybzdlSXQ0aEFNbmFqdDRsQUlIb0hTZW4vNk1pNGNWMTVjREo4QUhnUWFiL3BBQmg0RVg5K0FMZzZ1YlE0TWpHYnVqZXhtbmFpYUhvQTVIYWp0NGtBK2dBUTU0c1FaUGFxZjM2QXVEcTV0RGd5TVp1Nk43R2FHQytCYlpoQUFnRklJaDhCQ2JpSkFDZFFJQUgrL3YwQlkyOXVjM1J5WDNCeWIzUmZNSEJ3Z2dnYmQwRHRSTkFnOUFReU5DQ0JBSURYUlk0VUlOSS9Nak1nMGo4eU1pQngxMFdVZ0h2eThON2V5Q1FCOUFBanp3cy9JczhMUDNIUFFTSFBGaURKN1ZUKy9RRmpiMjV6ZEhKZmNISnZkRjh4WHdYNEFERHdJZjc4QVhCMWMyaHdaR00zZEc5ak5PMUUwUFFCeUNFQVJPMUhieElCOUFBaHp4WWd5ZTFVL3YwQmNIVnphSEJrWXpkMGIyTTBNRjhDMnpBQjR0eisvUUZ0WVdsdVgybHVkR1Z5Ym1Gc0lZNVovdndCWjJWMFgzTnlZMTloWkdSeUlOQWcwd0F5Y0wyT0d2NzlBV2RsZEY5emNtTmZZV1JrY2pCd3lNblFWUkZmQXRzdzRDQnkxeUV4SU5NQU1pSDZRRFArL1FGblpYUmZjM0pqWDJGa1pISXhJU0ZWTVY4RTJ6RFlKQ0Z3SXdIcWpqaisrUUZ6ZEc5eVpWOXphV2R2QUNGdmpDSnZqQ052ak8xSElXK003VVRROUFWdmpDRHRWLzc5QVhOMGIzSmxYM05wWjE5bGJtUmZCZGdpeHdDT0hDRnd1bzRTSW9JUVhIN2lCMVZSWHdieFFBRmZCdHN3NEY4RzJ6RGcvdjRCYldGcGJsOXBiblJsY201aGJERWkweDgwSW5HNkpBQTJuaUNBSTFWaFh3ZnhRQUZmQjlzdzRDTWhWV0ZmQi9GQUFWOEgnLFxuICAgIH07XG5cbiAgICBzdGF0aWMgYXN5bmMgcmVzb2x2ZUdpdmVyUGFyYW1ldGVycygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgY2xpZW50ID0gYXdhaXQgVE9OQ2xpZW50Tm9kZUpzLmNyZWF0ZSh7IHNlcnZlcnM6IFsnbmV0LnRvbi5kZXYnXSB9KTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBrZXlzUGF0aCA9IHBhdGgucmVzb2x2ZShvcy5ob21lZGlyKCksICdnaXZlcktleXMuanNvbicpO1xuICAgICAgICAgICAgQ2hlY2tOZXR3b3JrLmdpdmVyS2V5cyA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKGtleXNQYXRoLCAndXRmOCcpKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgfVxuICAgICAgICBDaGVja05ldHdvcmsuZ2l2ZXJBZGRyZXNzID0gKGF3YWl0IGNsaWVudC5jb250cmFjdHMuY3JlYXRlRGVwbG95TWVzc2FnZSh7XG4gICAgICAgICAgICBwYWNrYWdlOiBDaGVja05ldHdvcmsuZ2l2ZXJQYWNrYWdlLFxuICAgICAgICAgICAgY29uc3RydWN0b3JQYXJhbXM6IHt9LFxuICAgICAgICAgICAga2V5UGFpcjogQ2hlY2tOZXR3b3JrLmdpdmVyS2V5cyxcbiAgICAgICAgfSkpLmFkZHJlc3M7XG4gICAgfVxuXG5cbn1cblxuIl19