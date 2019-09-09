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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJ1c2FnZSIsIm1haW4iLCJjb21tYW5kcyIsInNldHVwIiwiY2xlYW4iLCJzb2wiLCJjb21tYW5kIiwicHJvY2VzcyIsImFyZ3YiLCJ0b0xvd2VyQ2FzZSIsInNsaWNlIiwiZXhpdCIsImNvbnNvbGUiLCJlcnJvciJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBOztBQUNBOztBQUNBOztBQUNBOztBQUVBLElBQU1BLEtBQUssa1FBQVg7O1NBT2VDLEk7Ozs7Ozs7K0JBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1VDLFlBQUFBLFFBRFYsR0FDcUI7QUFDYkMsY0FBQUEsS0FBSyxFQUFMQSxZQURhO0FBRWJDLGNBQUFBLEtBQUssRUFBTEEsWUFGYTtBQUdiQyxjQUFBQSxHQUFHLEVBQUhBO0FBSGEsYUFEckI7QUFNVUMsWUFBQUEsT0FOVixHQU1vQkosUUFBUSxDQUFDLFVBQUdLLE9BQU8sQ0FBQ0MsSUFBUixDQUFhLENBQWIsQ0FBSCxFQUFxQkMsV0FBckIsRUFBRCxDQU41Qjs7QUFBQSxpQkFPUUgsT0FQUjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLG1CQVFjQSxPQUFPLENBQUNDLE9BQU8sQ0FBQ0MsSUFBUixDQUFhRSxLQUFiLENBQW1CLENBQW5CLENBQUQsQ0FSckI7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBVVEsa0NBQVVWLEtBQVY7O0FBVlI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztBQWNBO0FBQUE7QUFBQSw2QkFBQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVhQyxJQUFJLEVBRmpCOztBQUFBO0FBR09NLFVBQUFBLE9BQU8sQ0FBQ0ksSUFBUixDQUFhLENBQWI7QUFIUDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUtPQyxVQUFBQSxPQUFPLENBQUNDLEtBQVI7QUFDQU4sVUFBQUEsT0FBTyxDQUFDSSxJQUFSLENBQWEsQ0FBYjs7QUFOUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxDQUFEIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OlxuICpcbiAqIGh0dHA6Ly93d3cudG9uLmRldi9saWNlbnNlc1xuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgVE9OIERFViBzb2Z0d2FyZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5cbmltcG9ydCB7IHNob3dVc2FnZSB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgc2V0dXAgfSBmcm9tICcuL3NldHVwJztcbmltcG9ydCB7IGNsZWFuIH0gZnJvbSAnLi9jbGVhbic7XG5pbXBvcnQgeyBzb2wgfSBmcm9tICcuL3NvbCc7XG5cbmNvbnN0IHVzYWdlID0gYFVzZTogdG9uZGV2IGNvbW1hbmQgeyBhcmd1bWVudCAuLi4gfVxuY29tbWFuZDpcbiAgICBzZXR1cCAtIGxvb2tpbmcgZm9yIGEgcmVxdWlyZWQgcHJlcmVxdWlzaXRlcyBhbmQgc2V0dXAgcmVxdWlyZWQgVE9OIExhYnMgRGV2IFRvb2xzXG4gICAgY2xlYW4gLSByZW1vdmUgYWxsIFRPTiBEZXYgZG9ja2VyIGNvbnRhaW5lcnMgYW5kIGltYWdlc1xuICAgIHNvbCAtIGJ1aWxkIFRPTiBjb250cmFjdCBmcm9tIHNvbGlkaXR5IHNvdXJjZSBjb2RlXG5gO1xuXG5hc3luYyBmdW5jdGlvbiBtYWluKCkge1xuICAgIGNvbnN0IGNvbW1hbmRzID0ge1xuICAgICAgICBzZXR1cCxcbiAgICAgICAgY2xlYW4sXG4gICAgICAgIHNvbCxcbiAgICB9O1xuICAgIGNvbnN0IGNvbW1hbmQgPSBjb21tYW5kc1tgJHtwcm9jZXNzLmFyZ3ZbMl19YC50b0xvd2VyQ2FzZSgpXTtcbiAgICBpZiAoY29tbWFuZCkge1xuICAgICAgICBhd2FpdCBjb21tYW5kKHByb2Nlc3MuYXJndi5zbGljZSgzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2hvd1VzYWdlKHVzYWdlKTtcbiAgICB9XG59XG5cbihhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgbWFpbigpO1xuICAgICAgICBwcm9jZXNzLmV4aXQoMCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgXFxuJHtlcnJvcn1gKTtcbiAgICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgIH1cbn0pKCk7XG4iXX0=