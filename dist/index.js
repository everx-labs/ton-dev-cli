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

var _utils = require("./utils");

var _setup = require("./setup");

var _start = require("./start");

var _clean = require("./clean");

var _sol = require("./sol");

var usage = "Use: tondev command { argument ... }\n\nCommands:\n\nsetup\n    Looking for a required prerequisites and setup required TON Labs Dev Tools.\n    \nstart\n    Start local node.\n     \nclean\n    Remove all TON Dev docker containers and images.\n    \nsol <solidity-file-without-extension> [ -js ]\n    Build TON contract from solidity source code.\n    Options:\n    --javascript or -js\n        Generate JavaScript file with contract package (imageBase64 and ABI).\n        \n\nCopyright 2018-2019 TON DEV SOLUTIONS LTD.\n\nLicensed under the SOFTWARE EVALUATION License (the \"License\"); you may not use\nthis file except in compliance with the License.  You may obtain a copy of the\nLicense at: https://www.ton.dev/licenses\n\nUnless required by applicable law or agreed to in writing, software\ndistributed under the License is distributed on an \"AS IS\" BASIS,\nWITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\nSee the License for the specific TON DEV software governing permissions and\nlimitations under the License.         \n";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJ1c2FnZSIsIm1haW4iLCJjb21tYW5kcyIsInNldHVwIiwic3RhcnQiLCJjbGVhbiIsInNvbCIsImNvbW1hbmQiLCJwcm9jZXNzIiwiYXJndiIsInRvTG93ZXJDYXNlIiwic2xpY2UiLCJleGl0IiwiY29uc29sZSIsImVycm9yIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBLElBQU1BLEtBQUssMmlDQUFYOztTQWlDZUMsSTs7Ozs7OzsrQkFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDVUMsWUFBQUEsUUFEVixHQUNxQjtBQUNiQyxjQUFBQSxLQUFLLEVBQUxBLFlBRGE7QUFFYkMsY0FBQUEsS0FBSyxFQUFMQSxZQUZhO0FBR2JDLGNBQUFBLEtBQUssRUFBTEEsWUFIYTtBQUliQyxjQUFBQSxHQUFHLEVBQUhBO0FBSmEsYUFEckI7QUFPVUMsWUFBQUEsT0FQVixHQU9vQkwsUUFBUSxDQUFDLFVBQUdNLE9BQU8sQ0FBQ0MsSUFBUixDQUFhLENBQWIsQ0FBSCxFQUFxQkMsV0FBckIsRUFBRCxDQVA1Qjs7QUFBQSxpQkFRUUgsT0FSUjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLG1CQVNjQSxPQUFPLENBQUNDLE9BQU8sQ0FBQ0MsSUFBUixDQUFhRSxLQUFiLENBQW1CLENBQW5CLENBQUQsQ0FUckI7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBV1Esa0NBQVVYLEtBQVY7O0FBWFI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztBQWVBO0FBQUE7QUFBQSw2QkFBQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVhQyxJQUFJLEVBRmpCOztBQUFBO0FBR09PLFVBQUFBLE9BQU8sQ0FBQ0ksSUFBUixDQUFhLENBQWI7QUFIUDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUtPQyxVQUFBQSxPQUFPLENBQUNDLEtBQVI7QUFDQU4sVUFBQUEsT0FBTyxDQUFDSSxJQUFSLENBQWEsQ0FBYjs7QUFOUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxDQUFEIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuXG5cbi8qXG4gKiBDb3B5cmlnaHQgMjAxOC0yMDE5IFRPTiBERVYgU09MVVRJT05TIExURC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgU09GVFdBUkUgRVZBTFVBVElPTiBMaWNlbnNlICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbiAqIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxuICogTGljZW5zZSBhdDogaHR0cHM6Ly93d3cudG9uLmRldi9saWNlbnNlc1xuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgVE9OIERFViBzb2Z0d2FyZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cblxuaW1wb3J0IHsgc2hvd1VzYWdlIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBzZXR1cCB9IGZyb20gJy4vc2V0dXAnO1xuaW1wb3J0IHsgc3RhcnQgfSBmcm9tICcuL3N0YXJ0JztcbmltcG9ydCB7IGNsZWFuIH0gZnJvbSAnLi9jbGVhbic7XG5pbXBvcnQgeyBzb2wgfSBmcm9tICcuL3NvbCc7XG5cbmNvbnN0IHVzYWdlID0gYFVzZTogdG9uZGV2IGNvbW1hbmQgeyBhcmd1bWVudCAuLi4gfVxuXG5Db21tYW5kczpcblxuc2V0dXBcbiAgICBMb29raW5nIGZvciBhIHJlcXVpcmVkIHByZXJlcXVpc2l0ZXMgYW5kIHNldHVwIHJlcXVpcmVkIFRPTiBMYWJzIERldiBUb29scy5cbiAgICBcbnN0YXJ0XG4gICAgU3RhcnQgbG9jYWwgbm9kZS5cbiAgICAgXG5jbGVhblxuICAgIFJlbW92ZSBhbGwgVE9OIERldiBkb2NrZXIgY29udGFpbmVycyBhbmQgaW1hZ2VzLlxuICAgIFxuc29sIDxzb2xpZGl0eS1maWxlLXdpdGhvdXQtZXh0ZW5zaW9uPiBbIC1qcyBdXG4gICAgQnVpbGQgVE9OIGNvbnRyYWN0IGZyb20gc29saWRpdHkgc291cmNlIGNvZGUuXG4gICAgT3B0aW9uczpcbiAgICAtLWphdmFzY3JpcHQgb3IgLWpzXG4gICAgICAgIEdlbmVyYXRlIEphdmFTY3JpcHQgZmlsZSB3aXRoIGNvbnRyYWN0IHBhY2thZ2UgKGltYWdlQmFzZTY0IGFuZCBBQkkpLlxuICAgICAgICBcblxuQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG5MaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgVE9OIERFViBzb2Z0d2FyZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS4gICAgICAgICBcbmA7XG5cbmFzeW5jIGZ1bmN0aW9uIG1haW4oKSB7XG4gICAgY29uc3QgY29tbWFuZHMgPSB7XG4gICAgICAgIHNldHVwLFxuICAgICAgICBzdGFydCxcbiAgICAgICAgY2xlYW4sXG4gICAgICAgIHNvbCxcbiAgICB9O1xuICAgIGNvbnN0IGNvbW1hbmQgPSBjb21tYW5kc1tgJHtwcm9jZXNzLmFyZ3ZbMl19YC50b0xvd2VyQ2FzZSgpXTtcbiAgICBpZiAoY29tbWFuZCkge1xuICAgICAgICBhd2FpdCBjb21tYW5kKHByb2Nlc3MuYXJndi5zbGljZSgzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2hvd1VzYWdlKHVzYWdlKTtcbiAgICB9XG59XG5cbihhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgbWFpbigpO1xuICAgICAgICBwcm9jZXNzLmV4aXQoMCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgXFxuJHtlcnJvcn1gKTtcbiAgICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgIH1cbn0pKCk7XG4iXX0=