"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetworkTracer = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

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

var NetworkTracer =
/*#__PURE__*/
function () {
  (0, _createClass2["default"])(NetworkTracer, null, [{
    key: "traceNetwork",
    value: function () {
      var _traceNetwork = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(server) {
        var tracer;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return NetworkTracer.resolveGiverParameters();

              case 2:
                tracer = new NetworkTracer(server);
                _context.next = 5;
                return tracer.check();

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function traceNetwork(_x) {
        return _traceNetwork.apply(this, arguments);
      }

      return traceNetwork;
    }()
  }]);

  function NetworkTracer(server) {
    (0, _classCallCheck2["default"])(this, NetworkTracer);
    (0, _defineProperty2["default"])(this, "server", void 0);
    (0, _defineProperty2["default"])(this, "client", void 0);
    (0, _defineProperty2["default"])(this, "message", void 0);
    (0, _defineProperty2["default"])(this, "succeeded", void 0);
    (0, _defineProperty2["default"])(this, "failed", void 0);
    this.server = server;
    this.message = '';
    this.succeeded = false;
    this.failed = false;
  }

  (0, _createClass2["default"])(NetworkTracer, [{
    key: "check",
    value: function () {
      var _check = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _tonClientNodeJs.TONClient.create({
                  servers: [this.server],
                  log_verbose: true
                });

              case 2:
                this.client = _context2.sent;
                _context2.prev = 3;
                _context2.next = 6;
                return this.checkGiver();

              case 6:
                _context2.next = 8;
                return this.checkSendGrams();

              case 8:
                this.report({
                  succeeded: true
                });
                _context2.next = 14;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](3);
                this.report({
                  error: _context2.t0
                });

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 11]]);
      }));

      function check() {
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
                    eq: NetworkTracer.giverAddress
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
                  "package": NetworkTracer.giverPackage,
                  keyPair: NetworkTracer.giverKeys,
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
        var message, result;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.report({
                  message: 'sending 0.001G'
                });
                _context4.next = 3;
                return this.client.contracts.createRunMessage({
                  address: NetworkTracer.giverAddress,
                  functionName: 'sendTransaction',
                  abi: NetworkTracer.giverPackage.abi,
                  input: {
                    dest: '0:adb63a228837e478c7edf5fe3f0b5d12183e1f22246b67712b99ec538d6c5357',
                    value: 1000000,
                    bounce: false
                  },
                  keyPair: NetworkTracer.giverKeys
                });

              case 3:
                message = _context4.sent;
                console.log("Message ID: ".concat(message.message.messageId));
                console.log("Press [Return] to send...");
                _context4.next = 8;
                return (0, _utils.inputLine)();

              case 8:
                _context4.next = 10;
                return this.client.contracts.processRunMessage(message);

              case 10:
                result = _context4.sent;

                if (result && result.transaction) {
                  console.log('>>>', result.transaction);
                }

              case 12:
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
    key: "getStatus",
    value: function getStatus() {
      var status = '  ';
      var message = '';

      if (this.isFinished()) {
        status = this.succeeded ? '✓ ' : '✖ ';
      }

      if (!this.succeeded) {
        message = this.message !== '' ? " \u2026 ".concat(this.message) : '';
      }

      return "".concat(status).concat(message);
    }
  }, {
    key: "report",
    value: function report(options) {
      if (options.succeeded !== undefined) {
        this.succeeded = options.succeeded;
        this.failed = false;
        this.message = '';
      } else if (options.error !== undefined) {
        this.message = options.error && options.error.message ? options.error.message : (options.error || '').toString();
        this.failed = true;
        this.succeeded = false;
      } else if (options.message !== undefined && !this.isFinished()) {
        this.message = options.message;
      }

      console.log(this.getStatus());
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
                  NetworkTracer.giverKeys = JSON.parse(fs.readFileSync(keysPath, 'utf8'));
                } catch (error) {}

                _context5.next = 6;
                return client.contracts.createDeployMessage({
                  "package": NetworkTracer.giverPackage,
                  constructorParams: {},
                  keyPair: NetworkTracer.giverKeys
                });

              case 6:
                NetworkTracer.giverAddress = _context5.sent.address;

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
  return NetworkTracer;
}();

exports.NetworkTracer = NetworkTracer;
(0, _defineProperty2["default"])(NetworkTracer, "giverAddress", '0:5b168970a9c63dd5c42a6afbcf706ef652476bb8960a22e1d8a2ad148e60c0ea');
(0, _defineProperty2["default"])(NetworkTracer, "giverKeys", {
  secret: '2245e4f44af8af6bbd15c4a53eb67a8f211d541ddc7c197f74d7830dba6d27fe',
  "public": 'd542f44146f169c6726c8cf70e4cbb3d33d8d842a4afd799ac122c5808d81ba3'
});
(0, _defineProperty2["default"])(NetworkTracer, "giverPackage", {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvdHJhY2UuanMiXSwibmFtZXMiOlsib3MiLCJyZXF1aXJlIiwiZnMiLCJwYXRoIiwiTmV0d29ya1RyYWNlciIsInNlcnZlciIsInJlc29sdmVHaXZlclBhcmFtZXRlcnMiLCJ0cmFjZXIiLCJjaGVjayIsIm1lc3NhZ2UiLCJzdWNjZWVkZWQiLCJmYWlsZWQiLCJUT05DbGllbnROb2RlSnMiLCJjcmVhdGUiLCJzZXJ2ZXJzIiwibG9nX3ZlcmJvc2UiLCJjbGllbnQiLCJjaGVja0dpdmVyIiwiY2hlY2tTZW5kR3JhbXMiLCJyZXBvcnQiLCJlcnJvciIsInF1ZXJpZXMiLCJhY2NvdW50cyIsInF1ZXJ5IiwiaWQiLCJlcSIsImdpdmVyQWRkcmVzcyIsImdpdmVycyIsImxlbmd0aCIsImdpdmVyQmFsYW5jZSIsIkJpZ0ludCIsImJhbGFuY2UiLCJjb2RlIiwiY29udHJhY3RzIiwiZGVwbG95IiwiZ2l2ZXJQYWNrYWdlIiwia2V5UGFpciIsImdpdmVyS2V5cyIsImNvbnN0cnVjdG9yUGFyYW1zIiwiY3JlYXRlUnVuTWVzc2FnZSIsImFkZHJlc3MiLCJmdW5jdGlvbk5hbWUiLCJhYmkiLCJpbnB1dCIsImRlc3QiLCJ2YWx1ZSIsImJvdW5jZSIsImNvbnNvbGUiLCJsb2ciLCJtZXNzYWdlSWQiLCJwcm9jZXNzUnVuTWVzc2FnZSIsInJlc3VsdCIsInRyYW5zYWN0aW9uIiwic3RhdHVzIiwiaXNGaW5pc2hlZCIsIm9wdGlvbnMiLCJ1bmRlZmluZWQiLCJ0b1N0cmluZyIsImdldFN0YXR1cyIsImtleXNQYXRoIiwicmVzb2x2ZSIsImhvbWVkaXIiLCJKU09OIiwicGFyc2UiLCJyZWFkRmlsZVN5bmMiLCJjcmVhdGVEZXBsb3lNZXNzYWdlIiwic2VjcmV0IiwiaW1hZ2VCYXNlNjQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkE7O0FBRUE7O0FBbEJBOzs7Ozs7Ozs7Ozs7OztBQW9CQSxJQUFNQSxFQUFFLEdBQUdDLE9BQU8s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Y0FBUSxPQUF0QjtBQUErQixjQUFRO0FBQXZDLEtBREk7QUFuQlAsR0FEYTtBQXdCbEJ5QixFQUFBQSxXQUFXLEVBQUU7QUF4QkssQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOC0yMDIwIFRPTiBERVYgU09MVVRJT05TIExURC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgU09GVFdBUkUgRVZBTFVBVElPTiBMaWNlbnNlICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbiAqIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxuICogTGljZW5zZSBhdDogaHR0cHM6Ly93d3cudG9uLmRldi9saWNlbnNlc1xuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgVE9OIERFViBzb2Z0d2FyZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cblxuLy8gQGZsb3dcbmltcG9ydCB7IFRPTkNsaWVudCBhcyBUT05DbGllbnROb2RlSnMgfSBmcm9tIFwidG9uLWNsaWVudC1ub2RlLWpzXCI7XG5pbXBvcnQgdHlwZSB7IFRPTkNsaWVudCB9IGZyb20gXCJ0b24tY2xpZW50LWpzL3R5cGVzXCI7XG5pbXBvcnQgeyBpbnB1dExpbmUgfSBmcm9tIFwiLi4vdXRpbHMvdXRpbHNcIjtcblxuY29uc3Qgb3MgPSByZXF1aXJlKCdvcycpO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcblxuZXhwb3J0IGNsYXNzIE5ldHdvcmtUcmFjZXIge1xuICAgIHN0YXRpYyBhc3luYyB0cmFjZU5ldHdvcmsoc2VydmVyOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgYXdhaXQgTmV0d29ya1RyYWNlci5yZXNvbHZlR2l2ZXJQYXJhbWV0ZXJzKCk7XG4gICAgICAgIGNvbnN0IHRyYWNlcjogTmV0d29ya1RyYWNlciA9IG5ldyBOZXR3b3JrVHJhY2VyKHNlcnZlcik7XG4gICAgICAgIGF3YWl0IHRyYWNlci5jaGVjaygpO1xuICAgIH1cblxuICAgIHNlcnZlcjogc3RyaW5nO1xuICAgIGNsaWVudDogVE9OQ2xpZW50O1xuXG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIHN1Y2NlZWRlZDogYm9vbGVhbjtcbiAgICBmYWlsZWQ6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihzZXJ2ZXI6IHN0cmluZykge1xuICAgICAgICB0aGlzLnNlcnZlciA9IHNlcnZlcjtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gJyc7XG4gICAgICAgIHRoaXMuc3VjY2VlZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZmFpbGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgYXN5bmMgY2hlY2soKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHRoaXMuY2xpZW50ID0gYXdhaXQgVE9OQ2xpZW50Tm9kZUpzLmNyZWF0ZSh7XG4gICAgICAgICAgICBzZXJ2ZXJzOiBbdGhpcy5zZXJ2ZXJdLFxuICAgICAgICAgICAgbG9nX3ZlcmJvc2U6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5jaGVja0dpdmVyKCk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmNoZWNrU2VuZEdyYW1zKCk7XG4gICAgICAgICAgICB0aGlzLnJlcG9ydCh7IHN1Y2NlZWRlZDogdHJ1ZSB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMucmVwb3J0KHsgZXJyb3IgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBjaGVja0dpdmVyKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICB0aGlzLnJlcG9ydCh7IG1lc3NhZ2U6ICdsb29raW5nIGZvciBnaXZlcicgfSk7XG4gICAgICAgIGNvbnN0IGdpdmVycyA9IGF3YWl0IHRoaXMuY2xpZW50LnF1ZXJpZXMuYWNjb3VudHMucXVlcnkoXG4gICAgICAgICAgICB7IGlkOiB7IGVxOiBOZXR3b3JrVHJhY2VyLmdpdmVyQWRkcmVzcyB9IH0sXG4gICAgICAgICAgICAnYmFsYW5jZSBjb2RlJyk7XG4gICAgICAgIGlmIChnaXZlcnMubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgdGhpcy5yZXBvcnQoeyBlcnJvcjogJ25vIGdpdmVyJyB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyRGbG93Rml4TWVcbiAgICAgICAgY29uc3QgZ2l2ZXJCYWxhbmNlID0gQmlnSW50KGdpdmVyc1swXS5iYWxhbmNlKTtcbiAgICAgICAgaWYgKGdpdmVyQmFsYW5jZSA9PT0gQmlnSW50KDApKSB7XG4gICAgICAgICAgICB0aGlzLnJlcG9ydCh7IGVycm9yOiAnZ2l2ZXIgYmFsYW5jZSBpcyBlbXB0eScgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdpdmVyQmFsYW5jZSA8IEJpZ0ludCgxXzAwMF8wMDBfMDAwKSkge1xuICAgICAgICAgICAgdGhpcy5yZXBvcnQoeyBlcnJvcjogYGdpdmVyIGJhbGFuY2UgdG9vIGxvdzogJHtnaXZlckJhbGFuY2V9YCB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWdpdmVyc1swXS5jb2RlKSB7XG4gICAgICAgICAgICB0aGlzLnJlcG9ydCh7IG1lc3NhZ2U6IGBkZXBsb3lpbmcgZ2l2ZXIsIGJhbGFuY2U6ICR7Z2l2ZXJCYWxhbmNlfWAgfSk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmNsaWVudC5jb250cmFjdHMuZGVwbG95KHtcbiAgICAgICAgICAgICAgICBwYWNrYWdlOiBOZXR3b3JrVHJhY2VyLmdpdmVyUGFja2FnZSxcbiAgICAgICAgICAgICAgICBrZXlQYWlyOiBOZXR3b3JrVHJhY2VyLmdpdmVyS2V5cyxcbiAgICAgICAgICAgICAgICBjb25zdHJ1Y3RvclBhcmFtczoge30sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucmVwb3J0KHsgc3VjY2VlZGVkOiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgY2hlY2tTZW5kR3JhbXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHRoaXMucmVwb3J0KHsgbWVzc2FnZTogJ3NlbmRpbmcgMC4wMDFHJyB9KTtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGF3YWl0IHRoaXMuY2xpZW50LmNvbnRyYWN0cy5jcmVhdGVSdW5NZXNzYWdlKHtcbiAgICAgICAgICAgIGFkZHJlc3M6IE5ldHdvcmtUcmFjZXIuZ2l2ZXJBZGRyZXNzLFxuICAgICAgICAgICAgZnVuY3Rpb25OYW1lOiAnc2VuZFRyYW5zYWN0aW9uJyxcbiAgICAgICAgICAgIGFiaTogTmV0d29ya1RyYWNlci5naXZlclBhY2thZ2UuYWJpLFxuICAgICAgICAgICAgaW5wdXQ6IHtcbiAgICAgICAgICAgICAgICBkZXN0OiAnMDphZGI2M2EyMjg4MzdlNDc4YzdlZGY1ZmUzZjBiNWQxMjE4M2UxZjIyMjQ2YjY3NzEyYjk5ZWM1MzhkNmM1MzU3JyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogMV8wMDBfMDAwLFxuICAgICAgICAgICAgICAgIGJvdW5jZTogZmFsc2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBrZXlQYWlyOiBOZXR3b3JrVHJhY2VyLmdpdmVyS2V5cyxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBNZXNzYWdlIElEOiAke21lc3NhZ2UubWVzc2FnZS5tZXNzYWdlSWR9YCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBQcmVzcyBbUmV0dXJuXSB0byBzZW5kLi4uYCk7XG4gICAgICAgIGF3YWl0IGlucHV0TGluZSgpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLmNsaWVudC5jb250cmFjdHMucHJvY2Vzc1J1bk1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0LnRyYW5zYWN0aW9uKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnPj4+JywgcmVzdWx0LnRyYW5zYWN0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzRmluaXNoZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN1Y2NlZWRlZCB8fCB0aGlzLmZhaWxlZDtcbiAgICB9XG5cbiAgICBnZXRTdGF0dXMoKSB7XG4gICAgICAgIGxldCBzdGF0dXMgPSAnICAnO1xuICAgICAgICBsZXQgbWVzc2FnZSA9ICcnO1xuICAgICAgICBpZiAodGhpcy5pc0ZpbmlzaGVkKCkpIHtcbiAgICAgICAgICAgIHN0YXR1cyA9IHRoaXMuc3VjY2VlZGVkID8gJ+KckyAnIDogJ+KcliAnO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5zdWNjZWVkZWQpIHtcbiAgICAgICAgICAgIG1lc3NhZ2UgPSB0aGlzLm1lc3NhZ2UgIT09ICcnID8gYCDigKYgJHt0aGlzLm1lc3NhZ2V9YCA6ICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBgJHtzdGF0dXN9JHttZXNzYWdlfWA7XG4gICAgfVxuXG4gICAgcmVwb3J0KG9wdGlvbnM6IHtcbiAgICAgICAgc3VjY2VlZGVkPzogYm9vbGVhbixcbiAgICAgICAgZXJyb3I/OiBhbnksXG4gICAgICAgIG1lc3NhZ2U/OiBzdHJpbmcsXG4gICAgfSkge1xuICAgICAgICBpZiAob3B0aW9ucy5zdWNjZWVkZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zdWNjZWVkZWQgPSBvcHRpb25zLnN1Y2NlZWRlZDtcbiAgICAgICAgICAgIHRoaXMuZmFpbGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSAnJztcbiAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmVycm9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IChvcHRpb25zLmVycm9yICYmIG9wdGlvbnMuZXJyb3IubWVzc2FnZSlcbiAgICAgICAgICAgICAgICA/IG9wdGlvbnMuZXJyb3IubWVzc2FnZVxuICAgICAgICAgICAgICAgIDogKG9wdGlvbnMuZXJyb3IgfHwgJycpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLmZhaWxlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnN1Y2NlZWRlZCA9IGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMubWVzc2FnZSAhPT0gdW5kZWZpbmVkICYmICF0aGlzLmlzRmluaXNoZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gb3B0aW9ucy5tZXNzYWdlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ2V0U3RhdHVzKCkpO1xuICAgIH1cblxuICAgIHN0YXRpYyBnaXZlckFkZHJlc3MgPSAnMDo1YjE2ODk3MGE5YzYzZGQ1YzQyYTZhZmJjZjcwNmVmNjUyNDc2YmI4OTYwYTIyZTFkOGEyYWQxNDhlNjBjMGVhJztcbiAgICBzdGF0aWMgZ2l2ZXJLZXlzID0ge1xuICAgICAgICBzZWNyZXQ6ICcyMjQ1ZTRmNDRhZjhhZjZiYmQxNWM0YTUzZWI2N2E4ZjIxMWQ1NDFkZGM3YzE5N2Y3NGQ3ODMwZGJhNmQyN2ZlJyxcbiAgICAgICAgcHVibGljOiAnZDU0MmY0NDE0NmYxNjljNjcyNmM4Y2Y3MGU0Y2JiM2QzM2Q4ZDg0MmE0YWZkNzk5YWMxMjJjNTgwOGQ4MWJhMycsXG4gICAgfTtcbiAgICBzdGF0aWMgZ2l2ZXJQYWNrYWdlID0ge1xuICAgICAgICBhYmk6IHtcbiAgICAgICAgICAgIFwiQUJJIHZlcnNpb25cIjogMSxcbiAgICAgICAgICAgIFwiZnVuY3Rpb25zXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcImNvbnN0cnVjdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiaW5wdXRzXCI6IFtdLFxuICAgICAgICAgICAgICAgICAgICBcIm91dHB1dHNcIjogW11cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwic2VuZFRyYW5zYWN0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiaW5wdXRzXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiZGVzdFwiLCBcInR5cGVcIjogXCJhZGRyZXNzXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwidmFsdWVcIiwgXCJ0eXBlXCI6IFwidWludDEyOFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IFwibmFtZVwiOiBcImJvdW5jZVwiLCBcInR5cGVcIjogXCJib29sXCIgfVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBcIm91dHB1dHNcIjogW11cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgXCJldmVudHNcIjogW10sXG4gICAgICAgICAgICBcImRhdGFcIjogW1xuICAgICAgICAgICAgICAgIHsgXCJrZXlcIjogMTAwLCBcIm5hbWVcIjogXCJvd25lclwiLCBcInR5cGVcIjogXCJ1aW50MjU2XCIgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICBpbWFnZUJhc2U2NDogJ3RlNmNjZ0VDSlFFQUJkOEFBZ0UwQmdFQkFjQUNBZ1BQSUFVREFRSGVCQUFEMENBQVFkZ0FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQkFJby93QWd3QUgwcENCWWt2U2c0WXJ0VTFndzlLQVRCd0VLOUtRZzlLRUlBZ1BOUUJBSkFnSE9EUW9DQVNBTUN3QUhERGJNSUFBbkNGd3ZDTHdHYm13OHVCbUlpSWljZkFLWHdPQUNBU0FQRGdBMU8xSGJ4RnZFTWpMLzRCazdVZHZFb0JBOUVQdFJ3RnZVdTFYZ0FOVS92c0JaR1ZqYjJSbFgyRmtaSElnK2tBeStrSWdieEFnY3JvaGM3cXg4dUI5SVc4UmJ2TGdmY2gwendzQ0ltOFN6d29ISW04VEluSzZsaU52RXlMT01wOGhnUUVBSXRkSm9jOUFNaUFpempMaS92d0JaR1ZqYjJSbFgyRmtaSEl3SWNuUUpWVkJYd1hiTUlBSUJJQklSQUN1ay8zMkFzN0s2TDdFd3RqQzNNYkw4RTdlSWJaaEFBS1dsZjMyQXNMR3Z1amt3dHptek1ybGtPV2VnRVdlRkFEam5vSHdVWjRzU1o0c1IvUUU0NTZBNGZRRTRmUUZBSUdlZ2ZCSG5oWSs1WjZBUVpKRjlnSDkvZ0xDeHI3bzVNTGM1c3pLNUw3SzNNaStDd0FJQklCb1VBZUQvL3YwQmJXRnBibDlsZUhSbGNtNWhiQ0dPV2Y3OEFXZGxkRjl6Y21OZllXUmtjaURRSU5NQU1uQzlqaHIrL1FGblpYUmZjM0pqWDJGa1pISXdjTWpKMEZVUlh3TGJNT0FnY3RjaE1TRFRBREloK2tBei92MEJaMlYwWDNOeVkxOWhaR1J5TVNFaFZURmZCTnN3MkRFaEZRSDRqblgrL2dGblpYUmZiWE5uWDNCMVltdGxlU0RIQW80Vy92OEJaMlYwWDIxeloxOXdkV0pyWlhreGNESGJNT0RWSU1jQmpoZisvd0ZuWlhSZmJYTm5YM0IxWW10bGVUSndNVEhiTU9BZ2dRSUExeUhYQy84aStRRWlJdmtROHFqKy93Rm5aWFJmYlhOblgzQjFZbXRsZVRNZ0ExOEQyekRZSXNjQ3N4WUJ6SlFpMURFejNpUWlJbzQ0L3ZrQmMzUnZjbVZmYzJsbmJ3QWhiNHdpYjR3amI0enRSeUZ2ak8xRTBQUUZiNHdnN1ZmKy9RRnpkRzl5WlY5emFXZGZaVzVrWHdYWUlzY0JqaFArL0FGdGMyZGZhWE5mWlcxd2RIbGZCdHN3NENMVEh6UWowejgxSUJjQmRvNkEySTR2L3Y0QmJXRnBibDlsZUhSbGNtNWhiRElrSWxWeFh3anhRQUgrL2dGdFlXbHVYMlY0ZEdWeWJtRnNNMThJMnpEZ2dIenk4RjhJR0FIKy92c0JjbVZ3YkdGNVgzQnliM1J3Y0hEdFJOQWc5QVF5TkNDQkFJRFhSWm9nMHo4eU15RFRQekl5bG9JSUczZEFNdUlpSmJrbCtDT0JBK2lvSktDNXNJNHB5Q1FCOUFBbHp3cy9JczhMUHlIUEZpREo3VlQrL0FGeVpYQnNZWGxmY0hKdmRESi9CbDhHMnpEZy92d0JjbVZ3YkdGNVgzQnliM1F6Y0FWZkJSa0FCTnN3QWdFZ0hoc0NBbk1kSEFBUHREOXhBNWh0bUVBQXc3UWFadXoybzdlSXQ0aEFNbmFqdDRsQUlIb0hTZW4vNk1pNGNWMTVjREo4QUhnUWFiL3BBQmg0RVg5K0FMZzZ1YlE0TWpHYnVqZXhtbmFpYUhvQTVIYWp0NGtBK2dBUTU0c1FaUGFxZjM2QXVEcTV0RGd5TVp1Nk43R2FHQytCYlpoQUFnRklJaDhCQ2JpSkFDZFFJQUgrL3YwQlkyOXVjM1J5WDNCeWIzUmZNSEJ3Z2dnYmQwRHRSTkFnOUFReU5DQ0JBSURYUlk0VUlOSS9Nak1nMGo4eU1pQngxMFdVZ0h2eThON2V5Q1FCOUFBanp3cy9JczhMUDNIUFFTSFBGaURKN1ZUKy9RRmpiMjV6ZEhKZmNISnZkRjh4WHdYNEFERHdJZjc4QVhCMWMyaHdaR00zZEc5ak5PMUUwUFFCeUNFQVJPMUhieElCOUFBaHp4WWd5ZTFVL3YwQmNIVnphSEJrWXpkMGIyTTBNRjhDMnpBQjR0eisvUUZ0WVdsdVgybHVkR1Z5Ym1Gc0lZNVovdndCWjJWMFgzTnlZMTloWkdSeUlOQWcwd0F5Y0wyT0d2NzlBV2RsZEY5emNtTmZZV1JrY2pCd3lNblFWUkZmQXRzdzRDQnkxeUV4SU5NQU1pSDZRRFArL1FGblpYUmZjM0pqWDJGa1pISXhJU0ZWTVY4RTJ6RFlKQ0Z3SXdIcWpqaisrUUZ6ZEc5eVpWOXphV2R2QUNGdmpDSnZqQ052ak8xSElXK003VVRROUFWdmpDRHRWLzc5QVhOMGIzSmxYM05wWjE5bGJtUmZCZGdpeHdDT0hDRnd1bzRTSW9JUVhIN2lCMVZSWHdieFFBRmZCdHN3NEY4RzJ6RGcvdjRCYldGcGJsOXBiblJsY201aGJERWkweDgwSW5HNkpBQTJuaUNBSTFWaFh3ZnhRQUZmQjlzdzRDTWhWV0ZmQi9GQUFWOEgnLFxuICAgIH07XG5cbiAgICBzdGF0aWMgYXN5bmMgcmVzb2x2ZUdpdmVyUGFyYW1ldGVycygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgY2xpZW50ID0gYXdhaXQgVE9OQ2xpZW50Tm9kZUpzLmNyZWF0ZSh7IHNlcnZlcnM6IFsnbmV0LnRvbi5kZXYnXSB9KTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBrZXlzUGF0aCA9IHBhdGgucmVzb2x2ZShvcy5ob21lZGlyKCksICdnaXZlcktleXMuanNvbicpO1xuICAgICAgICAgICAgTmV0d29ya1RyYWNlci5naXZlcktleXMgPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhrZXlzUGF0aCwgJ3V0ZjgnKSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIH1cbiAgICAgICAgTmV0d29ya1RyYWNlci5naXZlckFkZHJlc3MgPSAoYXdhaXQgY2xpZW50LmNvbnRyYWN0cy5jcmVhdGVEZXBsb3lNZXNzYWdlKHtcbiAgICAgICAgICAgIHBhY2thZ2U6IE5ldHdvcmtUcmFjZXIuZ2l2ZXJQYWNrYWdlLFxuICAgICAgICAgICAgY29uc3RydWN0b3JQYXJhbXM6IHt9LFxuICAgICAgICAgICAga2V5UGFpcjogTmV0d29ya1RyYWNlci5naXZlcktleXMsXG4gICAgICAgIH0pKS5hZGRyZXNzO1xuICAgIH1cblxuXG59XG5cbiJdfQ==