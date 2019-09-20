#!/usr/bin/env node

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
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _config = require("./config");

var _texts = require("./texts");

var _utils = require("./utils");

var _setup = require("./setup");

var _info = require("./info");

var _sol = require("./sol");

function main() {
  return _main.apply(this, arguments);
}

function _main() {
  _main = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    var commands, command, args;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commands = {
              info: _info.info,
              setup: _setup.setup,
              start: _setup.start,
              stop: _setup.stop,
              clean: _setup.clean,
              use: _setup.useVersion,
              sol: _sol.sol
            };
            command = commands["".concat(process.argv[2]).toLowerCase()];

            if (!command) {
              _context2.next = 9;
              break;
            }

            args = process.argv.slice(3);
            (0, _config.completeConfig)(args);
            _context2.next = 7;
            return command(args);

          case 7:
            _context2.next = 10;
            break;

          case 9:
            (0, _utils.showUsage)(_texts.texts.usage);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _main.apply(this, arguments);
}

(0, _asyncToGenerator2["default"])(
/*#__PURE__*/
_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return main();

        case 3:
          process.exit(0);
          _context.next = 10;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.error("\n".concat(_context.t0));
          process.exit(1);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[0, 6]]);
}))();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJtYWluIiwiY29tbWFuZHMiLCJpbmZvIiwic2V0dXAiLCJzdGFydCIsInN0b3AiLCJjbGVhbiIsInVzZSIsInVzZVZlcnNpb24iLCJzb2wiLCJjb21tYW5kIiwicHJvY2VzcyIsImFyZ3YiLCJ0b0xvd2VyQ2FzZSIsImFyZ3MiLCJzbGljZSIsInRleHRzIiwidXNhZ2UiLCJleGl0IiwiY29uc29sZSIsImVycm9yIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztTQUVlQSxJOzs7Ozs7OytCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNVQyxZQUFBQSxRQURWLEdBQ3FCO0FBQ2JDLGNBQUFBLElBQUksRUFBSkEsVUFEYTtBQUViQyxjQUFBQSxLQUFLLEVBQUxBLFlBRmE7QUFHYkMsY0FBQUEsS0FBSyxFQUFMQSxZQUhhO0FBSWJDLGNBQUFBLElBQUksRUFBSkEsV0FKYTtBQUtiQyxjQUFBQSxLQUFLLEVBQUxBLFlBTGE7QUFNYkMsY0FBQUEsR0FBRyxFQUFFQyxpQkFOUTtBQU9iQyxjQUFBQSxHQUFHLEVBQUhBO0FBUGEsYUFEckI7QUFVVUMsWUFBQUEsT0FWVixHQVVvQlQsUUFBUSxDQUFDLFVBQUdVLE9BQU8sQ0FBQ0MsSUFBUixDQUFhLENBQWIsQ0FBSCxFQUFxQkMsV0FBckIsRUFBRCxDQVY1Qjs7QUFBQSxpQkFXUUgsT0FYUjtBQUFBO0FBQUE7QUFBQTs7QUFZY0ksWUFBQUEsSUFaZCxHQVlxQkgsT0FBTyxDQUFDQyxJQUFSLENBQWFHLEtBQWIsQ0FBbUIsQ0FBbkIsQ0FackI7QUFhUSx3Q0FBZUQsSUFBZjtBQWJSO0FBQUEsbUJBY2NKLE9BQU8sQ0FBQ0ksSUFBRCxDQWRyQjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFnQlEsa0NBQVVFLGFBQU1DLEtBQWhCOztBQWhCUjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O0FBb0JBO0FBQUE7QUFBQSw2QkFBQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVhakIsSUFBSSxFQUZqQjs7QUFBQTtBQUdPVyxVQUFBQSxPQUFPLENBQUNPLElBQVIsQ0FBYSxDQUFiO0FBSFA7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFLT0MsVUFBQUEsT0FBTyxDQUFDQyxLQUFSO0FBQ0FULFVBQUFBLE9BQU8sQ0FBQ08sSUFBUixDQUFhLENBQWI7O0FBTlA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsQ0FBRCIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcblxuXG4vKlxuICogQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG4gKiB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbiAqIExpY2Vuc2UgYXQ6IGh0dHBzOi8vd3d3LnRvbi5kZXYvbGljZW5zZXNcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIFRPTiBERVYgc29mdHdhcmUgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG5cbmltcG9ydCB7IGNvbXBsZXRlQ29uZmlnIH0gZnJvbSBcIi4vY29uZmlnXCI7XG5pbXBvcnQgeyB0ZXh0cyB9IGZyb20gJy4vdGV4dHMnO1xuaW1wb3J0IHsgc2hvd1VzYWdlIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBzZXR1cCwgc3RhcnQsIHN0b3AsIGNsZWFuLCB1c2VWZXJzaW9uIH0gZnJvbSAnLi9zZXR1cCc7XG5pbXBvcnQgeyBpbmZvIH0gZnJvbSAnLi9pbmZvJztcbmltcG9ydCB7IHNvbCB9IGZyb20gJy4vc29sJztcblxuYXN5bmMgZnVuY3Rpb24gbWFpbigpIHtcbiAgICBjb25zdCBjb21tYW5kcyA9IHtcbiAgICAgICAgaW5mbyxcbiAgICAgICAgc2V0dXAsXG4gICAgICAgIHN0YXJ0LFxuICAgICAgICBzdG9wLFxuICAgICAgICBjbGVhbixcbiAgICAgICAgdXNlOiB1c2VWZXJzaW9uLFxuICAgICAgICBzb2wsXG4gICAgfTtcbiAgICBjb25zdCBjb21tYW5kID0gY29tbWFuZHNbYCR7cHJvY2Vzcy5hcmd2WzJdfWAudG9Mb3dlckNhc2UoKV07XG4gICAgaWYgKGNvbW1hbmQpIHtcbiAgICAgICAgY29uc3QgYXJncyA9IHByb2Nlc3MuYXJndi5zbGljZSgzKTtcbiAgICAgICAgY29tcGxldGVDb25maWcoYXJncyk7XG4gICAgICAgIGF3YWl0IGNvbW1hbmQoYXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2hvd1VzYWdlKHRleHRzLnVzYWdlKTtcbiAgICB9XG59XG5cbihhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgbWFpbigpO1xuICAgICAgICBwcm9jZXNzLmV4aXQoMCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgXFxuJHtlcnJvcn1gKTtcbiAgICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgIH1cbn0pKCk7XG4iXX0=