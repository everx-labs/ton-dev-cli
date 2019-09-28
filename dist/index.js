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

var _spy = require("./spy");

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
              sol: _sol.sol,
              spy: _spy.spy
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJtYWluIiwiY29tbWFuZHMiLCJpbmZvIiwic2V0dXAiLCJzdGFydCIsInN0b3AiLCJjbGVhbiIsInVzZSIsInVzZVZlcnNpb24iLCJzb2wiLCJzcHkiLCJjb21tYW5kIiwicHJvY2VzcyIsImFyZ3YiLCJ0b0xvd2VyQ2FzZSIsImFyZ3MiLCJzbGljZSIsInRleHRzIiwidXNhZ2UiLCJleGl0IiwiY29uc29sZSIsImVycm9yIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztTQUVlQSxJOzs7Ozs7OytCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNVQyxZQUFBQSxRQURWLEdBQ3FCO0FBQ2JDLGNBQUFBLElBQUksRUFBSkEsVUFEYTtBQUViQyxjQUFBQSxLQUFLLEVBQUxBLFlBRmE7QUFHYkMsY0FBQUEsS0FBSyxFQUFMQSxZQUhhO0FBSWJDLGNBQUFBLElBQUksRUFBSkEsV0FKYTtBQUtiQyxjQUFBQSxLQUFLLEVBQUxBLFlBTGE7QUFNYkMsY0FBQUEsR0FBRyxFQUFFQyxpQkFOUTtBQU9iQyxjQUFBQSxHQUFHLEVBQUhBLFFBUGE7QUFRYkMsY0FBQUEsR0FBRyxFQUFIQTtBQVJhLGFBRHJCO0FBV1VDLFlBQUFBLE9BWFYsR0FXb0JWLFFBQVEsQ0FBQyxVQUFHVyxPQUFPLENBQUNDLElBQVIsQ0FBYSxDQUFiLENBQUgsRUFBcUJDLFdBQXJCLEVBQUQsQ0FYNUI7O0FBQUEsaUJBWVFILE9BWlI7QUFBQTtBQUFBO0FBQUE7O0FBYWNJLFlBQUFBLElBYmQsR0FhcUJILE9BQU8sQ0FBQ0MsSUFBUixDQUFhRyxLQUFiLENBQW1CLENBQW5CLENBYnJCO0FBY1Esd0NBQWVELElBQWY7QUFkUjtBQUFBLG1CQWVjSixPQUFPLENBQUNJLElBQUQsQ0FmckI7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBaUJRLGtDQUFVRSxhQUFNQyxLQUFoQjs7QUFqQlI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztBQXFCQTtBQUFBO0FBQUEsNkJBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFFYWxCLElBQUksRUFGakI7O0FBQUE7QUFHT1ksVUFBQUEsT0FBTyxDQUFDTyxJQUFSLENBQWEsQ0FBYjtBQUhQO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBS09DLFVBQUFBLE9BQU8sQ0FBQ0MsS0FBUjtBQUNBVCxVQUFBQSxPQUFPLENBQUNPLElBQVIsQ0FBYSxDQUFiOztBQU5QO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLENBQUQiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5cblxuLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuXG5pbXBvcnQgeyBjb21wbGV0ZUNvbmZpZyB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0IHsgdGV4dHMgfSBmcm9tICcuL3RleHRzJztcbmltcG9ydCB7IHNob3dVc2FnZSB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgc2V0dXAsIHN0YXJ0LCBzdG9wLCBjbGVhbiwgdXNlVmVyc2lvbiB9IGZyb20gJy4vc2V0dXAnO1xuaW1wb3J0IHsgaW5mbyB9IGZyb20gJy4vaW5mbyc7XG5pbXBvcnQgeyBzb2wgfSBmcm9tICcuL3NvbCc7XG5pbXBvcnQgeyBzcHkgfSBmcm9tICcuL3NweSc7XG5cbmFzeW5jIGZ1bmN0aW9uIG1haW4oKSB7XG4gICAgY29uc3QgY29tbWFuZHMgPSB7XG4gICAgICAgIGluZm8sXG4gICAgICAgIHNldHVwLFxuICAgICAgICBzdGFydCxcbiAgICAgICAgc3RvcCxcbiAgICAgICAgY2xlYW4sXG4gICAgICAgIHVzZTogdXNlVmVyc2lvbixcbiAgICAgICAgc29sLFxuICAgICAgICBzcHksXG4gICAgfTtcbiAgICBjb25zdCBjb21tYW5kID0gY29tbWFuZHNbYCR7cHJvY2Vzcy5hcmd2WzJdfWAudG9Mb3dlckNhc2UoKV07XG4gICAgaWYgKGNvbW1hbmQpIHtcbiAgICAgICAgY29uc3QgYXJncyA9IHByb2Nlc3MuYXJndi5zbGljZSgzKTtcbiAgICAgICAgY29tcGxldGVDb25maWcoYXJncyk7XG4gICAgICAgIGF3YWl0IGNvbW1hbmQoYXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2hvd1VzYWdlKHRleHRzLnVzYWdlKTtcbiAgICB9XG59XG5cbihhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgbWFpbigpO1xuICAgICAgICBwcm9jZXNzLmV4aXQoMCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgXFxuJHtlcnJvcn1gKTtcbiAgICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgIH1cbn0pKCk7XG4iXX0=