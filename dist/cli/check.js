"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveGiverParameters = resolveGiverParameters;
exports.checkNetworks = checkNetworks;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

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

var giverAddress = '0:5b168970a9c63dd5c42a6afbcf706ef652476bb8960a22e1d8a2ad148e60c0ea';
var giverKeys = {
  secret: '2245e4f44af8af6bbd15c4a53eb67a8f211d541ddc7c197f74d7830dba6d27fe',
  "public": 'd542f44146f169c6726c8cf70e4cbb3d33d8d842a4afd799ac122c5808d81ba3'
};
var giverPackage = {
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
};

function resolveGiverParameters(_x) {
  return _resolveGiverParameters.apply(this, arguments);
}

function _resolveGiverParameters() {
  _resolveGiverParameters = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(client) {
    var keysPath;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {
              keysPath = path.resolve(os.homedir(), 'giverKeys.json');
              giverKeys = JSON.parse(fs.readFileSync(keysPath, 'utf8'));
            } catch (error) {}

            _context.next = 3;
            return client.contracts.createDeployMessage({
              "package": giverPackage,
              constructorParams: {},
              keyPair: giverKeys
            });

          case 3:
            giverAddress = _context.sent.address;

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _resolveGiverParameters.apply(this, arguments);
}

function checkGiver(_x2) {
  return _checkGiver.apply(this, arguments);
}

function _checkGiver() {
  _checkGiver = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(client) {
    var givers, giverBalance;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return client.queries.accounts.query({
              id: {
                eq: giverAddress
              }
            }, 'balance code');

          case 2:
            givers = _context2.sent;

            if (!(givers.length < 1)) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", 'no giver');

          case 5:
            //$FlowFixMe
            giverBalance = BigInt(givers[0].balance);

            if (!(giverBalance === BigInt(0))) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", 'giver balance empty');

          case 10:
            if (!(giverBalance < BigInt(1000000000))) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt("return", "giver balance too low: ".concat(giverBalance));

          case 12:
            if (givers[0].code) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt("return", "giver code missing");

          case 14:
            return _context2.abrupt("return", '');

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _checkGiver.apply(this, arguments);
}

function checkSendGrams(_x3) {
  return _checkSendGrams.apply(this, arguments);
}

function _checkSendGrams() {
  _checkSendGrams = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(client) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return client.contracts.run({
              address: giverAddress,
              functionName: 'sendTransaction',
              abi: giverPackage.abi,
              input: {
                dest: '0:adb63a228837e478c7edf5fe3f0b5d12183e1f22246b67712b99ec538d6c5357',
                value: 1000000,
                bounce: false
              },
              keyPair: giverKeys
            });

          case 2:
            return _context3.abrupt("return", '');

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _checkSendGrams.apply(this, arguments);
}

function checkNetwork(_x4) {
  return _checkNetwork.apply(this, arguments);
}

function _checkNetwork() {
  _checkNetwork = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(client) {
    var result, start;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return resolveGiverParameters(client);

          case 2:
            start = Date.now();
            _context4.prev = 3;
            _context4.next = 6;
            return checkGiver(client);

          case 6:
            _context4.t1 = _context4.sent;

            if (_context4.t1) {
              _context4.next = 11;
              break;
            }

            _context4.next = 10;
            return checkSendGrams(client);

          case 10:
            _context4.t1 = _context4.sent;

          case 11:
            _context4.t0 = _context4.t1;

            if (_context4.t0) {
              _context4.next = 14;
              break;
            }

            _context4.t0 = '';

          case 14:
            result = _context4.t0;
            _context4.next = 20;
            break;

          case 17:
            _context4.prev = 17;
            _context4.t2 = _context4["catch"](3);
            result = _context4.t2 && _context4.t2.message ? _context4.t2.message : (_context4.t2 || '').toString();

          case 20:
            return _context4.abrupt("return", "".concat((Date.now() - start) / 1000, "sec \u2026 ").concat(result || '✓'));

          case 21:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 17]]);
  }));
  return _checkNetwork.apply(this, arguments);
}

function checkNetworks(_x5, _x6) {
  return _checkNetworks.apply(this, arguments);
}

function _checkNetworks() {
  _checkNetworks = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(servers, verbose) {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _server, client;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context5.prev = 3;
            _iterator = servers[Symbol.iterator]();

          case 5:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context5.next = 19;
              break;
            }

            _server = _step.value;
            _context5.next = 9;
            return _tonClientNodeJs.TONClient.create({
              servers: [_server],
              log_verbose: verbose
            });

          case 9:
            client = _context5.sent;
            process.stdout.write("".concat(_server, " \u2026 "));
            _context5.t0 = console;
            _context5.next = 14;
            return checkNetwork(client);

          case 14:
            _context5.t1 = _context5.sent;

            _context5.t0.log.call(_context5.t0, _context5.t1);

          case 16:
            _iteratorNormalCompletion = true;
            _context5.next = 5;
            break;

          case 19:
            _context5.next = 25;
            break;

          case 21:
            _context5.prev = 21;
            _context5.t2 = _context5["catch"](3);
            _didIteratorError = true;
            _iteratorError = _context5.t2;

          case 25:
            _context5.prev = 25;
            _context5.prev = 26;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 28:
            _context5.prev = 28;

            if (!_didIteratorError) {
              _context5.next = 31;
              break;
            }

            throw _iteratorError;

          case 31:
            return _context5.finish(28);

          case 32:
            return _context5.finish(25);

          case 33:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[3, 21, 25, 33], [26,, 28, 32]]);
  }));
  return _checkNetworks.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvY2hlY2suanMiXSwibmFtZXMiOlsib3MiLCJyZXF1aXJlIiwiZnMiLCJwYXRoIiwiZ2l2ZXJBZGRyZXNzIiwiZ2l2ZXJLZXlzIiwic2VjcmV0IiwiZ2l2ZXJQYWNrYWdlIiwiYWJpIiwiaW1hZ2VCYXNlNjQiLCJyZXNvbHZlR2l2ZXJQYXJhbWV0ZXJzIiwiY2xpZW50Iiwia2V5c1BhdGgiLCJyZXNvbHZlIiwiaG9tZWRpciIsIkpTT04iLCJwYXJzZSIsInJlYWRGaWxlU3luYyIsImVycm9yIiwiY29udHJhY3RzIiwiY3JlYXRlRGVwbG95TWVzc2FnZSIsImNvbnN0cnVjdG9yUGFyYW1zIiwia2V5UGFpciIsImFkZHJlc3MiLCJjaGVja0dpdmVyIiwicXVlcmllcyIsImFjY291bnRzIiwicXVlcnkiLCJpZCIsImVxIiwiZ2l2ZXJzIiwibGVuZ3RoIiwiZ2l2ZXJCYWxhbmNlIiwiQmlnSW50IiwiYmFsYW5jZSIsImNvZGUiLCJjaGVja1NlbmRHcmFtcyIsInJ1biIsImZ1bmN0aW9uTmFtZSIsImlucHV0IiwiZGVzdCIsInZhbHVlIiwiYm91bmNlIiwiY2hlY2tOZXR3b3JrIiwic3RhcnQiLCJEYXRlIiwibm93IiwicmVzdWx0IiwibWVzc2FnZSIsInRvU3RyaW5nIiwiY2hlY2tOZXR3b3JrcyIsInNlcnZlcnMiLCJ2ZXJib3NlIiwic2VydmVyIiwiVE9OQ2xpZW50Tm9kZUpzIiwiY3JlYXRlIiwibG9nX3ZlcmJvc2UiLCJwcm9jZXNzIiwic3Rkb3V0Iiwid3JpdGUiLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQWdCQTs7QUFoQkE7Ozs7Ozs7Ozs7Ozs7O0FBa0JBLElBQU1BLEVBQUUsR0FBR0MsT0FBTyxDQUFDLElBQUQsQ0FBbEI7O0FBQ0EsSUFBTUMsRUFBRSxHQUFHRCxPQUFPLENBQUMsSUFBRCxDQUFsQjs7QUFDQSxJQUFNRSxJQUFJLEdBQUdGLE9BQU8sQ0FBQyxNQUFELENBQXBCOztBQUVB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S0FBZCxJQUF1QixJQWJyQyx3QkFhbURHLE1BQU0sSUFBSSxHQWI3RDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O1NBZ0JzQkcsYTs7Ozs7OzsrQkFBZixrQkFBNkJDLE9BQTdCLEVBQWdEQyxPQUFoRDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3QkFDa0JELE9BRGxCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQ1FFLFlBQUFBLE9BRFI7QUFBQTtBQUFBLG1CQUVzQkMsMkJBQWdCQyxNQUFoQixDQUF1QjtBQUN4Q0osY0FBQUEsT0FBTyxFQUFFLENBQUNFLE9BQUQsQ0FEK0I7QUFFeENHLGNBQUFBLFdBQVcsRUFBRUo7QUFGMkIsYUFBdkIsQ0FGdEI7O0FBQUE7QUFFT3pDLFlBQUFBLE1BRlA7QUFNQzhDLFlBQUFBLE9BQU8sQ0FBQ0MsTUFBUixDQUFlQyxLQUFmLFdBQXdCTixPQUF4QjtBQU5ELDJCQU9DTyxPQVBEO0FBQUE7QUFBQSxtQkFPbUJqQixZQUFZLENBQUNoQyxNQUFELENBUC9COztBQUFBO0FBQUE7O0FBQUEseUJBT1NrRCxHQVBUOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOC0yMDE5IFRPTiBERVYgU09MVVRJT05TIExURC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgU09GVFdBUkUgRVZBTFVBVElPTiBMaWNlbnNlICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbiAqIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxuICogTGljZW5zZSBhdDogaHR0cHM6Ly93d3cudG9uLmRldi9saWNlbnNlc1xuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgVE9OIERFViBzb2Z0d2FyZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cblxuLy8gQGZsb3dcbmltcG9ydCB7VE9OQ2xpZW50IGFzIFRPTkNsaWVudE5vZGVKc30gZnJvbSBcInRvbi1jbGllbnQtbm9kZS1qc1wiO1xuaW1wb3J0IHR5cGUgeyBUT05DbGllbnQgfSBmcm9tIFwidG9uLWNsaWVudC1qcy90eXBlc1wiO1xuY29uc3Qgb3MgPSByZXF1aXJlKCdvcycpO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcblxubGV0IGdpdmVyQWRkcmVzcyA9ICcwOjViMTY4OTcwYTljNjNkZDVjNDJhNmFmYmNmNzA2ZWY2NTI0NzZiYjg5NjBhMjJlMWQ4YTJhZDE0OGU2MGMwZWEnO1xubGV0IGdpdmVyS2V5cyA9IHtcbiAgICBzZWNyZXQ6ICcyMjQ1ZTRmNDRhZjhhZjZiYmQxNWM0YTUzZWI2N2E4ZjIxMWQ1NDFkZGM3YzE5N2Y3NGQ3ODMwZGJhNmQyN2ZlJyxcbiAgICBwdWJsaWM6ICdkNTQyZjQ0MTQ2ZjE2OWM2NzI2YzhjZjcwZTRjYmIzZDMzZDhkODQyYTRhZmQ3OTlhYzEyMmM1ODA4ZDgxYmEzJyxcbn07XG5jb25zdCBnaXZlclBhY2thZ2UgPSB7XG4gICAgYWJpOiB7XG4gICAgICAgIFwiQUJJIHZlcnNpb25cIjogMSxcbiAgICAgICAgXCJmdW5jdGlvbnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcImNvbnN0cnVjdG9yXCIsXG4gICAgICAgICAgICAgICAgXCJpbnB1dHNcIjogW10sXG4gICAgICAgICAgICAgICAgXCJvdXRwdXRzXCI6IFtdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcInNlbmRUcmFuc2FjdGlvblwiLFxuICAgICAgICAgICAgICAgIFwiaW5wdXRzXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJkZXN0XCIsIFwidHlwZVwiOiBcImFkZHJlc3NcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IFwibmFtZVwiOiBcInZhbHVlXCIsIFwidHlwZVwiOiBcInVpbnQxMjhcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IFwibmFtZVwiOiBcImJvdW5jZVwiLCBcInR5cGVcIjogXCJib29sXCIgfVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgXCJvdXRwdXRzXCI6IFtdXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwiZXZlbnRzXCI6IFtdLFxuICAgICAgICBcImRhdGFcIjogW1xuICAgICAgICAgICAgeyBcImtleVwiOiAxMDAsIFwibmFtZVwiOiBcIm93bmVyXCIsIFwidHlwZVwiOiBcInVpbnQyNTZcIiB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIGltYWdlQmFzZTY0OiAndGU2Y2NnRUNKUUVBQmQ4QUFnRTBCZ0VCQWNBQ0FnUFBJQVVEQVFIZUJBQUQwQ0FBUWRnQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFCQUlvL3dBZ3dBSDBwQ0JZa3ZTZzRZcnRVMWd3OUtBVEJ3RUs5S1FnOUtFSUFnUE5RQkFKQWdIT0RRb0NBU0FNQ3dBSEREYk1JQUFuQ0Z3dkNMd0dibXc4dUJtSWlJaWNmQUtYd09BQ0FTQVBEZ0ExTzFIYnhGdkVNakwvNEJrN1VkdkVvQkE5RVB0UndGdlV1MVhnQU5VL3ZzQlpHVmpiMlJsWDJGa1pISWcra0F5K2tJZ2J4QWdjcm9oYzdxeDh1QjlJVzhSYnZMZ2ZjaDB6d3NDSW04U3p3b0hJbThUSW5LNmxpTnZFeUxPTXA4aGdRRUFJdGRKb2M5QU1pQWl6akxpL3Z3QlpHVmpiMlJsWDJGa1pISXdJY25RSlZWQlh3WGJNSUFJQklCSVJBQ3VrLzMyQXM3SzZMN0V3dGpDM01iTDhFN2VJYlpoQUFLV2xmMzJBc0xHdnVqa3d0em16TXJsa09XZWdFV2VGQURqbm9Id1VaNHNTWjRzUi9RRTQ1NkE0ZlFFNGZRRkFJR2VnZkJIbmhZKzVaNkFRWkpGOWdIOS9nTEN4cjdvNU1MYzVzeks1TDdLM01pK0N3QUlCSUJvVUFlRC8vdjBCYldGcGJsOWxlSFJsY201aGJDR09XZjc4QVdkbGRGOXpjbU5mWVdSa2NpRFFJTk1BTW5DOWpocisvUUZuWlhSZmMzSmpYMkZrWkhJd2NNakowRlVSWHdMYk1PQWdjdGNoTVNEVEFESWgra0F6L3YwQloyVjBYM055WTE5aFpHUnlNU0VoVlRGZkJOc3cyREVoRlFINGpuWCsvZ0ZuWlhSZmJYTm5YM0IxWW10bGVTREhBbzRXL3Y4QloyVjBYMjF6WjE5d2RXSnJaWGt4Y0RIYk1PRFZJTWNCamhmKy93Rm5aWFJmYlhOblgzQjFZbXRsZVRKd01USGJNT0FnZ1FJQTF5SFhDLzhpK1FFaUl2a1E4cWorL3dGblpYUmZiWE5uWDNCMVltdGxlVE1nQTE4RDJ6RFlJc2NDc3hZQnpKUWkxREV6M2lRaUlvNDQvdmtCYzNSdmNtVmZjMmxuYndBaGI0d2liNHdqYjR6dFJ5RnZqTzFFMFBRRmI0d2c3VmYrL1FGemRHOXlaVjl6YVdkZlpXNWtYd1hZSXNjQmpoUCsvQUZ0YzJkZmFYTmZaVzF3ZEhsZkJ0c3c0Q0xUSHpRajB6ODFJQmNCZG82QTJJNHYvdjRCYldGcGJsOWxlSFJsY201aGJESWtJbFZ4WHdqeFFBSCsvZ0Z0WVdsdVgyVjRkR1Z5Ym1Gc00xOEkyekRnZ0h6eThGOElHQUgrL3ZzQmNtVndiR0Y1WDNCeWIzUndjSER0Uk5BZzlBUXlOQ0NCQUlEWFJab2cwejh5TXlEVFB6SXlsb0lJRzNkQU11SWlKYmtsK0NPQkEraW9KS0M1c0k0cHlDUUI5QUFsendzL0lzOExQeUhQRmlESjdWVCsvQUZ5WlhCc1lYbGZjSEp2ZERKL0JsOEcyekRnL3Z3QmNtVndiR0Y1WDNCeWIzUXpjQVZmQlJrQUJOc3dBZ0VnSGhzQ0FuTWRIQUFQdEQ5eEE1aHRtRUFBdzdRYVp1ejJvN2VJdDRoQU1uYWp0NGxBSUhvSFNlbi82TWk0Y1YxNWNESjhBSGdRYWIvcEFCaDRFWDkrQUxnNnViUTRNakdidWpleG1uYWlhSG9BNUhhanQ0a0ErZ0FRNTRzUVpQYXFmMzZBdURxNXREZ3lNWnU2TjdHYUdDK0JiWmhBQWdGSUloOEJDYmlKQUNkUUlBSCsvdjBCWTI5dWMzUnlYM0J5YjNSZk1IQndnZ2diZDBEdFJOQWc5QVF5TkNDQkFJRFhSWTRVSU5JL01qTWcwajh5TWlCeDEwV1VnSHZ5OE43ZXlDUUI5QUFqendzL0lzOExQM0hQUVNIUEZpREo3VlQrL1FGamIyNXpkSEpmY0hKdmRGOHhYd1g0QUREd0lmNzhBWEIxYzJod1pHTTNkRzlqTk8xRTBQUUJ5Q0VBUk8xSGJ4SUI5QUFoenhZZ3llMVUvdjBCY0hWemFIQmtZemQwYjJNME1GOEMyekFCNHR6Ky9RRnRZV2x1WDJsdWRHVnlibUZzSVk1Wi92d0JaMlYwWDNOeVkxOWhaR1J5SU5BZzB3QXljTDJPR3Y3OUFXZGxkRjl6Y21OZllXUmtjakJ3eU1uUVZSRmZBdHN3NENCeTF5RXhJTk1BTWlINlFEUCsvUUZuWlhSZmMzSmpYMkZrWkhJeElTRlZNVjhFMnpEWUpDRndJd0hxampqKytRRnpkRzl5WlY5emFXZHZBQ0Z2akNKdmpDTnZqTzFISVcrTTdVVFE5QVZ2akNEdFYvNzlBWE4wYjNKbFgzTnBaMTlsYm1SZkJkZ2l4d0NPSENGd3VvNFNJb0lRWEg3aUIxVlJYd2J4UUFGZkJ0c3c0RjhHMnpEZy92NEJiV0ZwYmw5cGJuUmxjbTVoYkRFaTB4ODBJbkc2SkFBMm5pQ0FJMVZoWHdmeFFBRmZCOXN3NENNaFZXRmZCL0ZBQVY4SCcsXG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVzb2x2ZUdpdmVyUGFyYW1ldGVycyhjbGllbnQ6IFRPTkNsaWVudCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICAgIGxldCBrZXlzUGF0aCA9IHBhdGgucmVzb2x2ZShvcy5ob21lZGlyKCksICdnaXZlcktleXMuanNvbicpO1xuICAgICAgICBnaXZlcktleXMgPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhrZXlzUGF0aCwgJ3V0ZjgnKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB9XG4gICAgZ2l2ZXJBZGRyZXNzID0gKGF3YWl0IGNsaWVudC5jb250cmFjdHMuY3JlYXRlRGVwbG95TWVzc2FnZSh7XG4gICAgICAgIHBhY2thZ2U6IGdpdmVyUGFja2FnZSxcbiAgICAgICAgY29uc3RydWN0b3JQYXJhbXM6IHt9LFxuICAgICAgICBrZXlQYWlyOiBnaXZlcktleXMsXG4gICAgfSkpLmFkZHJlc3M7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNoZWNrR2l2ZXIoY2xpZW50OiBUT05DbGllbnQpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IGdpdmVycyA9IGF3YWl0IGNsaWVudC5xdWVyaWVzLmFjY291bnRzLnF1ZXJ5KHsgaWQ6IHsgZXE6IGdpdmVyQWRkcmVzcyB9IH0sICdiYWxhbmNlIGNvZGUnKTtcbiAgICBpZiAoZ2l2ZXJzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgcmV0dXJuICdubyBnaXZlcic7XG4gICAgfVxuICAgIC8vJEZsb3dGaXhNZVxuICAgIGNvbnN0IGdpdmVyQmFsYW5jZSA9IEJpZ0ludChnaXZlcnNbMF0uYmFsYW5jZSk7XG4gICAgaWYgKGdpdmVyQmFsYW5jZSA9PT0gQmlnSW50KDApKSB7XG4gICAgICAgIHJldHVybiAnZ2l2ZXIgYmFsYW5jZSBlbXB0eSc7XG4gICAgfSBlbHNlIGlmIChnaXZlckJhbGFuY2UgPCBCaWdJbnQoMV8wMDBfMDAwXzAwMCkpIHtcbiAgICAgICAgcmV0dXJuIGBnaXZlciBiYWxhbmNlIHRvbyBsb3c6ICR7Z2l2ZXJCYWxhbmNlfWA7XG4gICAgfVxuICAgIGlmICghZ2l2ZXJzWzBdLmNvZGUpIHtcbiAgICAgICAgcmV0dXJuIGBnaXZlciBjb2RlIG1pc3NpbmdgO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNoZWNrU2VuZEdyYW1zKGNsaWVudDogVE9OQ2xpZW50KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBhd2FpdCBjbGllbnQuY29udHJhY3RzLnJ1bih7XG4gICAgICAgIGFkZHJlc3M6IGdpdmVyQWRkcmVzcyxcbiAgICAgICAgZnVuY3Rpb25OYW1lOiAnc2VuZFRyYW5zYWN0aW9uJyxcbiAgICAgICAgYWJpOiBnaXZlclBhY2thZ2UuYWJpLFxuICAgICAgICBpbnB1dDoge1xuICAgICAgICAgICAgZGVzdDogJzA6YWRiNjNhMjI4ODM3ZTQ3OGM3ZWRmNWZlM2YwYjVkMTIxODNlMWYyMjI0NmI2NzcxMmI5OWVjNTM4ZDZjNTM1NycsXG4gICAgICAgICAgICB2YWx1ZTogMV8wMDBfMDAwLFxuICAgICAgICAgICAgYm91bmNlOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICBrZXlQYWlyOiBnaXZlcktleXMsXG4gICAgfSk7XG4gICAgcmV0dXJuICcnO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjaGVja05ldHdvcmsoY2xpZW50OiBUT05DbGllbnQpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGF3YWl0IHJlc29sdmVHaXZlclBhcmFtZXRlcnMoY2xpZW50KTtcbiAgICBsZXQgcmVzdWx0O1xuICAgIGNvbnN0IHN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgICB0cnkge1xuICAgICAgICByZXN1bHQgPSAoYXdhaXQgY2hlY2tHaXZlcihjbGllbnQpKVxuICAgICAgICAgICAgfHwgKGF3YWl0IGNoZWNrU2VuZEdyYW1zKGNsaWVudCkpXG4gICAgICAgICAgICB8fCAnJztcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXN1bHQgPSAoZXJyb3IgJiYgZXJyb3IubWVzc2FnZSlcbiAgICAgICAgICAgID8gZXJyb3IubWVzc2FnZVxuICAgICAgICAgICAgOiAoZXJyb3IgfHwgJycpLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIHJldHVybiBgJHsoRGF0ZS5ub3coKSAtIHN0YXJ0KSAvIDFfMDAwfXNlYyDigKYgJHtyZXN1bHQgfHwgJ+Kckyd9YDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoZWNrTmV0d29ya3Moc2VydmVyczogc3RyaW5nW10sIHZlcmJvc2U6IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBmb3IgKGNvbnN0IHNlcnZlciBvZiBzZXJ2ZXJzKSB7XG4gICAgICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IFRPTkNsaWVudE5vZGVKcy5jcmVhdGUoe1xuICAgICAgICAgICAgc2VydmVyczogW3NlcnZlcl0sXG4gICAgICAgICAgICBsb2dfdmVyYm9zZTogdmVyYm9zZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGAke3NlcnZlcn0g4oCmIGApO1xuICAgICAgICBjb25zb2xlLmxvZyhhd2FpdCBjaGVja05ldHdvcmsoY2xpZW50KSk7XG4gICAgfVxuXG59XG4iXX0=