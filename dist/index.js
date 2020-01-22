#!/usr/bin/env node

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
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _cli = require("./cli/cli");

var _dev = require("./dev");

function main() {
  return _main.apply(this, arguments);
}

function _main() {
  _main = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    var dev;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dev = new _dev.Dev();
            _context2.next = 3;
            return (0, _cli.handleCommandLine)(dev, process.argv);

          case 3:
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

          if (_context.t0.message) {
            console.error("\n".concat(_context.t0.message));
          } else {
            console.error("\n".concat(_context.t0));
          }

          process.exit(1);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[0, 6]]);
}))();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJtYWluIiwiZGV2IiwiRGV2IiwicHJvY2VzcyIsImFyZ3YiLCJleGl0IiwibWVzc2FnZSIsImNvbnNvbGUiLCJlcnJvciJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlQTs7QUFDQTs7U0FHZUEsSTs7Ozs7OzsrQkFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDVUMsWUFBQUEsR0FEVixHQUNnQixJQUFJQyxRQUFKLEVBRGhCO0FBQUE7QUFBQSxtQkFFVSw0QkFBa0JELEdBQWxCLEVBQXVCRSxPQUFPLENBQUNDLElBQS9CLENBRlY7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztBQUtBO0FBQUE7QUFBQSw2QkFBQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVhSixJQUFJLEVBRmpCOztBQUFBO0FBR09HLFVBQUFBLE9BQU8sQ0FBQ0UsSUFBUixDQUFhLENBQWI7QUFIUDtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFLTyxjQUFJLFlBQU1DLE9BQVYsRUFBbUI7QUFDZkMsWUFBQUEsT0FBTyxDQUFDQyxLQUFSLGFBQW1CLFlBQU1GLE9BQXpCO0FBQ0gsV0FGRCxNQUVPO0FBQ0hDLFlBQUFBLE9BQU8sQ0FBQ0MsS0FBUjtBQUNIOztBQUNETCxVQUFBQSxPQUFPLENBQUNFLElBQVIsQ0FBYSxDQUFiOztBQVZQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLENBQUQiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5cblxuLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuXG5pbXBvcnQgeyBoYW5kbGVDb21tYW5kTGluZSB9IGZyb20gXCIuL2NsaS9jbGlcIjtcbmltcG9ydCB7IERldiB9IGZyb20gXCIuL2RldlwiO1xuXG5cbmFzeW5jIGZ1bmN0aW9uIG1haW4oKSB7XG4gICAgY29uc3QgZGV2ID0gbmV3IERldigpO1xuICAgIGF3YWl0IGhhbmRsZUNvbW1hbmRMaW5lKGRldiwgcHJvY2Vzcy5hcmd2KTtcbn1cblxuKGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBtYWluKCk7XG4gICAgICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3IubWVzc2FnZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgXFxuJHtlcnJvci5tZXNzYWdlfWApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgXFxuJHtlcnJvcn1gKTtcbiAgICAgICAgfVxuICAgICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgfVxufSkoKTtcbiJdfQ==