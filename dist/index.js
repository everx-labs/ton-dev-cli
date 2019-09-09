#!/usr/bin/env node

/*
 * Copyright 2018-2019 TON DEV SOLUTIONS LTD.
 *
 * Licensed under the SOFTWARE EVALUATION License (the "License"); you may not use
 * this file except in compliance with the License.  You may obtain a copy of the
 * License at:
 *
 * http://www.ton.dev/licenses
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific TON DEV software governing permissions and
 * limitations under the License.
 */
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _utils = require("./utils");

var _setup = require("./setup");

var _start = require("./start");

var _clean = require("./clean");

var _sol = require("./sol");

var usage = "Use: tondev command { argument ... }\ncommand:\n    setup - looking for a required prerequisites and setup required TON Labs Dev Tools\n    clean - remove all TON Dev docker containers and images\n    sol - build TON contract from solidity source code\n";

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
              start: _start.start,
              clean: _clean.clean,
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
            (0, _utils.showUsage)(usage);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJ1c2FnZSIsIm1haW4iLCJjb21tYW5kcyIsInNldHVwIiwic3RhcnQiLCJjbGVhbiIsInNvbCIsImNvbW1hbmQiLCJwcm9jZXNzIiwiYXJndiIsInRvTG93ZXJDYXNlIiwic2xpY2UiLCJleGl0IiwiY29uc29sZSIsImVycm9yIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUEsSUFBTUEsS0FBSyxrUUFBWDs7U0FPZUMsSTs7Ozs7OzsrQkFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDVUMsWUFBQUEsUUFEVixHQUNxQjtBQUNiQyxjQUFBQSxLQUFLLEVBQUxBLFlBRGE7QUFFYkMsY0FBQUEsS0FBSyxFQUFMQSxZQUZhO0FBR2JDLGNBQUFBLEtBQUssRUFBTEEsWUFIYTtBQUliQyxjQUFBQSxHQUFHLEVBQUhBO0FBSmEsYUFEckI7QUFPVUMsWUFBQUEsT0FQVixHQU9vQkwsUUFBUSxDQUFDLFVBQUdNLE9BQU8sQ0FBQ0MsSUFBUixDQUFhLENBQWIsQ0FBSCxFQUFxQkMsV0FBckIsRUFBRCxDQVA1Qjs7QUFBQSxpQkFRUUgsT0FSUjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLG1CQVNjQSxPQUFPLENBQUNDLE9BQU8sQ0FBQ0MsSUFBUixDQUFhRSxLQUFiLENBQW1CLENBQW5CLENBQUQsQ0FUckI7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBV1Esa0NBQVVYLEtBQVY7O0FBWFI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztBQWVBO0FBQUE7QUFBQSw2QkFBQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVhQyxJQUFJLEVBRmpCOztBQUFBO0FBR09PLFVBQUFBLE9BQU8sQ0FBQ0ksSUFBUixDQUFhLENBQWI7QUFIUDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUtPQyxVQUFBQSxPQUFPLENBQUNDLEtBQVI7QUFDQU4sVUFBQUEsT0FBTyxDQUFDSSxJQUFSLENBQWEsQ0FBYjs7QUFOUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxDQUFEIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OlxuICpcbiAqIGh0dHA6Ly93d3cudG9uLmRldi9saWNlbnNlc1xuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgVE9OIERFViBzb2Z0d2FyZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5cbmltcG9ydCB7IHNob3dVc2FnZSB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgc2V0dXAgfSBmcm9tICcuL3NldHVwJztcbmltcG9ydCB7IHN0YXJ0IH0gZnJvbSAnLi9zdGFydCc7XG5pbXBvcnQgeyBjbGVhbiB9IGZyb20gJy4vY2xlYW4nO1xuaW1wb3J0IHsgc29sIH0gZnJvbSAnLi9zb2wnO1xuXG5jb25zdCB1c2FnZSA9IGBVc2U6IHRvbmRldiBjb21tYW5kIHsgYXJndW1lbnQgLi4uIH1cbmNvbW1hbmQ6XG4gICAgc2V0dXAgLSBsb29raW5nIGZvciBhIHJlcXVpcmVkIHByZXJlcXVpc2l0ZXMgYW5kIHNldHVwIHJlcXVpcmVkIFRPTiBMYWJzIERldiBUb29sc1xuICAgIGNsZWFuIC0gcmVtb3ZlIGFsbCBUT04gRGV2IGRvY2tlciBjb250YWluZXJzIGFuZCBpbWFnZXNcbiAgICBzb2wgLSBidWlsZCBUT04gY29udHJhY3QgZnJvbSBzb2xpZGl0eSBzb3VyY2UgY29kZVxuYDtcblxuYXN5bmMgZnVuY3Rpb24gbWFpbigpIHtcbiAgICBjb25zdCBjb21tYW5kcyA9IHtcbiAgICAgICAgc2V0dXAsXG4gICAgICAgIHN0YXJ0LFxuICAgICAgICBjbGVhbixcbiAgICAgICAgc29sLFxuICAgIH07XG4gICAgY29uc3QgY29tbWFuZCA9IGNvbW1hbmRzW2Ake3Byb2Nlc3MuYXJndlsyXX1gLnRvTG93ZXJDYXNlKCldO1xuICAgIGlmIChjb21tYW5kKSB7XG4gICAgICAgIGF3YWl0IGNvbW1hbmQocHJvY2Vzcy5hcmd2LnNsaWNlKDMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzaG93VXNhZ2UodXNhZ2UpO1xuICAgIH1cbn1cblxuKGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBtYWluKCk7XG4gICAgICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBcXG4ke2Vycm9yfWApO1xuICAgICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgfVxufSkoKTtcbiJdfQ==