#!/usr/bin/env node
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _utils = require("./utils");

var _setup = require("./setup");

var _sol = require("./sol");

var usage = "Use: tondev command { argument ... }\ncommand:\n    setup - looking for a required prerequisites and setup required TON Labs tools\n    sol - compile TON contracts from solidity source code\n";

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
          console.error(_context.t0.toString());
          process.exit(1);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[0, 6]]);
}))();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJ1c2FnZSIsIm1haW4iLCJjb21tYW5kcyIsInNldHVwIiwic29sIiwiY29tbWFuZCIsInByb2Nlc3MiLCJhcmd2IiwidG9Mb3dlckNhc2UiLCJzbGljZSIsImV4aXQiLCJjb25zb2xlIiwiZXJyb3IiLCJ0b1N0cmluZyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQUVBOztBQUNBOztBQUNBOztBQUVBLElBQU1BLEtBQUssb01BQVg7O1NBTWVDLEk7Ozs7Ozs7K0JBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1VDLFlBQUFBLFFBRFYsR0FDcUI7QUFDYkMsY0FBQUEsS0FBSyxFQUFMQSxZQURhO0FBRWJDLGNBQUFBLEdBQUcsRUFBSEE7QUFGYSxhQURyQjtBQUtVQyxZQUFBQSxPQUxWLEdBS29CSCxRQUFRLENBQUMsVUFBR0ksT0FBTyxDQUFDQyxJQUFSLENBQWEsQ0FBYixDQUFILEVBQXFCQyxXQUFyQixFQUFELENBTDVCOztBQUFBLGlCQU1RSCxPQU5SO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsbUJBT2NBLE9BQU8sQ0FBQ0MsT0FBTyxDQUFDQyxJQUFSLENBQWFFLEtBQWIsQ0FBbUIsQ0FBbkIsQ0FBRCxDQVByQjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFTUSxrQ0FBVVQsS0FBVjs7QUFUUjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O0FBYUE7QUFBQTtBQUFBLDZCQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBRWFDLElBQUksRUFGakI7O0FBQUE7QUFHT0ssVUFBQUEsT0FBTyxDQUFDSSxJQUFSLENBQWEsQ0FBYjtBQUhQO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBS09DLFVBQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLFlBQU1DLFFBQU4sRUFBZDtBQUNBUCxVQUFBQSxPQUFPLENBQUNJLElBQVIsQ0FBYSxDQUFiOztBQU5QO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLENBQUQiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5cbmltcG9ydCB7IHNob3dVc2FnZSB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgc2V0dXAgfSBmcm9tICcuL3NldHVwJztcbmltcG9ydCB7IHNvbCB9IGZyb20gJy4vc29sJztcblxuY29uc3QgdXNhZ2UgPSBgVXNlOiB0b25kZXYgY29tbWFuZCB7IGFyZ3VtZW50IC4uLiB9XG5jb21tYW5kOlxuICAgIHNldHVwIC0gbG9va2luZyBmb3IgYSByZXF1aXJlZCBwcmVyZXF1aXNpdGVzIGFuZCBzZXR1cCByZXF1aXJlZCBUT04gTGFicyB0b29sc1xuICAgIHNvbCAtIGNvbXBpbGUgVE9OIGNvbnRyYWN0cyBmcm9tIHNvbGlkaXR5IHNvdXJjZSBjb2RlXG5gO1xuXG5hc3luYyBmdW5jdGlvbiBtYWluKCkge1xuICAgIGNvbnN0IGNvbW1hbmRzID0ge1xuICAgICAgICBzZXR1cCxcbiAgICAgICAgc29sLFxuICAgIH07XG4gICAgY29uc3QgY29tbWFuZCA9IGNvbW1hbmRzW2Ake3Byb2Nlc3MuYXJndlsyXX1gLnRvTG93ZXJDYXNlKCldO1xuICAgIGlmIChjb21tYW5kKSB7XG4gICAgICAgIGF3YWl0IGNvbW1hbmQocHJvY2Vzcy5hcmd2LnNsaWNlKDMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzaG93VXNhZ2UodXNhZ2UpO1xuICAgIH1cbn1cblxuKGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBtYWluKCk7XG4gICAgICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yLnRvU3RyaW5nKCkpO1xuICAgICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgfVxufSkoKTtcbiJdfQ==