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

var _texts = require("./texts");

var _utils = require("./utils");

var _setup = require("./setup");

var _sol = require("./sol");

function main() {
  return _main.apply(this, arguments);
}

function _main() {
  _main = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    var commands, command;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commands = {
              setup: _setup.setup,
              start: _setup.start,
              stop: _setup.stop,
              clean: _setup.clean,
              sol: _sol.sol
            };
            command = commands["".concat(process.argv[2]).toLowerCase()];

            if (!command) {
              _context2.next = 7;
              break;
            }

            _context2.next = 5;
            return command(process.argv.slice(3));

          case 5:
            _context2.next = 8;
            break;

          case 7:
            (0, _utils.showUsage)(_texts.texts.usage);

          case 8:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJtYWluIiwiY29tbWFuZHMiLCJzZXR1cCIsInN0YXJ0Iiwic3RvcCIsImNsZWFuIiwic29sIiwiY29tbWFuZCIsInByb2Nlc3MiLCJhcmd2IiwidG9Mb3dlckNhc2UiLCJzbGljZSIsInRleHRzIiwidXNhZ2UiLCJleGl0IiwiY29uc29sZSIsImVycm9yIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWVBOztBQUNBOztBQUNBOztBQUNBOztTQUVlQSxJOzs7Ozs7OytCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNVQyxZQUFBQSxRQURWLEdBQ3FCO0FBQ2JDLGNBQUFBLEtBQUssRUFBTEEsWUFEYTtBQUViQyxjQUFBQSxLQUFLLEVBQUxBLFlBRmE7QUFHYkMsY0FBQUEsSUFBSSxFQUFKQSxXQUhhO0FBSWJDLGNBQUFBLEtBQUssRUFBTEEsWUFKYTtBQUtiQyxjQUFBQSxHQUFHLEVBQUhBO0FBTGEsYUFEckI7QUFRVUMsWUFBQUEsT0FSVixHQVFvQk4sUUFBUSxDQUFDLFVBQUdPLE9BQU8sQ0FBQ0MsSUFBUixDQUFhLENBQWIsQ0FBSCxFQUFxQkMsV0FBckIsRUFBRCxDQVI1Qjs7QUFBQSxpQkFTUUgsT0FUUjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLG1CQVVjQSxPQUFPLENBQUNDLE9BQU8sQ0FBQ0MsSUFBUixDQUFhRSxLQUFiLENBQW1CLENBQW5CLENBQUQsQ0FWckI7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBWVEsa0NBQVVDLGFBQU1DLEtBQWhCOztBQVpSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7QUFnQkE7QUFBQTtBQUFBLDZCQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBRWFiLElBQUksRUFGakI7O0FBQUE7QUFHT1EsVUFBQUEsT0FBTyxDQUFDTSxJQUFSLENBQWEsQ0FBYjtBQUhQO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBS09DLFVBQUFBLE9BQU8sQ0FBQ0MsS0FBUjtBQUNBUixVQUFBQSxPQUFPLENBQUNNLElBQVIsQ0FBYSxDQUFiOztBQU5QO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLENBQUQiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5cblxuLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuXG5pbXBvcnQge3RleHRzfSBmcm9tICcuL3RleHRzJztcbmltcG9ydCB7c2hvd1VzYWdlfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7c2V0dXAsIHN0YXJ0LCBzdG9wLCBjbGVhbn0gZnJvbSAnLi9zZXR1cCc7XG5pbXBvcnQge3NvbH0gZnJvbSAnLi9zb2wnO1xuXG5hc3luYyBmdW5jdGlvbiBtYWluKCkge1xuICAgIGNvbnN0IGNvbW1hbmRzID0ge1xuICAgICAgICBzZXR1cCxcbiAgICAgICAgc3RhcnQsXG4gICAgICAgIHN0b3AsXG4gICAgICAgIGNsZWFuLFxuICAgICAgICBzb2wsXG4gICAgfTtcbiAgICBjb25zdCBjb21tYW5kID0gY29tbWFuZHNbYCR7cHJvY2Vzcy5hcmd2WzJdfWAudG9Mb3dlckNhc2UoKV07XG4gICAgaWYgKGNvbW1hbmQpIHtcbiAgICAgICAgYXdhaXQgY29tbWFuZChwcm9jZXNzLmFyZ3Yuc2xpY2UoMykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHNob3dVc2FnZSh0ZXh0cy51c2FnZSk7XG4gICAgfVxufVxuXG4oYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IG1haW4oKTtcbiAgICAgICAgcHJvY2Vzcy5leGl0KDApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYFxcbiR7ZXJyb3J9YCk7XG4gICAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICB9XG59KSgpO1xuIl19