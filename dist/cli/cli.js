"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleCommandLine = handleCommandLine;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _solidity = require("../compilers/solidity");

var _dev = require("../dev");

var _options = require("./options");

var _info = require("./info.js");

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
var program = require('commander');

function setupCommand(_x, _x2) {
  return _setupCommand.apply(this, arguments);
}

function _setupCommand() {
  _setupCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(dev, options) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return dev.start((0, _options.compilersWithNetworks)(dev, options));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _setupCommand.apply(this, arguments);
}

function startCommand(_x3, _x4) {
  return _startCommand.apply(this, arguments);
}

function _startCommand() {
  _startCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(dev, options) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return dev.start((0, _options.compilersWithNetworks)(dev, options));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _startCommand.apply(this, arguments);
}

function stopCommand(_x5, _x6) {
  return _stopCommand.apply(this, arguments);
}

function _stopCommand() {
  _stopCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(dev, options) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return dev.stop((0, _options.compilersWithNetworks)(dev, options));

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _stopCommand.apply(this, arguments);
}

function restartCommand(_x7, _x8) {
  return _restartCommand.apply(this, arguments);
}

function _restartCommand() {
  _restartCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(dev, options) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return dev.restart((0, _options.compilersWithNetworks)(dev, options));

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _restartCommand.apply(this, arguments);
}

function recreateCommand(_x9, _x10) {
  return _recreateCommand.apply(this, arguments);
}

function _recreateCommand() {
  _recreateCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(dev, options) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return dev.recreate((0, _options.compilersWithNetworks)(dev, options));

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _recreateCommand.apply(this, arguments);
}

function cleanCommand(_x11, _x12) {
  return _cleanCommand.apply(this, arguments);
}

function _cleanCommand() {
  _cleanCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6(dev, options) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return dev.clean((0, _options.compilersWithNetworks)(dev, options));

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _cleanCommand.apply(this, arguments);
}

function setCommand(_x13, _x14, _x15) {
  return _setCommand.apply(this, arguments);
}

function _setCommand() {
  _setCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7(dev, names, options) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return dev.setNetworksOptions(names, options);

          case 2:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _setCommand.apply(this, arguments);
}

function useCommand(_x16, _x17, _x18) {
  return _useCommand.apply(this, arguments);
}

function _useCommand() {
  _useCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee8(dev, version, options) {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return dev.useVersion(version, (0, _options.compilersWithNetworks)(dev, options));

          case 2:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _useCommand.apply(this, arguments);
}

function solCommand(_x19, _x20, _x21) {
  return _solCommand.apply(this, arguments);
}

function _solCommand() {
  _solCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee9(dev, files, options) {
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _solidity.Solidity.build(dev, files, options);

          case 2:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return _solCommand.apply(this, arguments);
}

function spyCommand(_x22, _x23, _x24) {
  return _spyCommand.apply(this, arguments);
}

function _spyCommand() {
  _spyCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee10(dev, networks, options) {
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return _spyCommand.apply(this, arguments);
}

var sharedOptions = {
  n: ['-n, --networks [names]', 'apply command to specified network[s] (names must be separated with comma)'],
  m: ['-m, --compilers', 'apply command to the compilers container']
};

function handleCommandLine(_x25, _x26) {
  return _handleCommandLine.apply(this, arguments);
}

function _handleCommandLine() {
  _handleCommandLine = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee11(dev, args) {
    var _program$command$desc, _program$command$desc2, _program$command$desc3, _program$command$desc4, _program$command$desc5, _program$command$desc6, _program$command$desc7, _program$command$desc8, _program$command$desc9, _program$command$desc10, _program$command$desc11, _program$command$desc12, _program$command$desc13, _program$command$desc14, _program$command$desc15;

    var commandAction, commandArgs, command;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            commandAction = _info.infoCommand;
            commandArgs = [];

            command = function command(action) {
              return function () {
                commandAction = action;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                commandArgs = args;
              };
            };

            program.name(dev.name).version(dev.version).option('-a, --available', 'show available versions').description('TON Labs development tools');
            program.command('info').description('Show summary about dev environment').option('-a, --available', 'show available versions').action(command(_info.infoCommand));

            (_program$command$desc = (_program$command$desc2 = program.command('setup').description('Setup dev environment')).option.apply(_program$command$desc2, (0, _toConsumableArray2["default"])(sharedOptions.n))).option.apply(_program$command$desc, (0, _toConsumableArray2["default"])(sharedOptions.m)).action(command(setupCommand));

            (_program$command$desc3 = (_program$command$desc4 = program.command('start').description('Start dev containers')).option.apply(_program$command$desc4, (0, _toConsumableArray2["default"])(sharedOptions.n))).option.apply(_program$command$desc3, (0, _toConsumableArray2["default"])(sharedOptions.m)).action(command(startCommand));

            (_program$command$desc5 = (_program$command$desc6 = program.command('stop').description('Stop dev containers')).option.apply(_program$command$desc6, (0, _toConsumableArray2["default"])(sharedOptions.n))).option.apply(_program$command$desc5, (0, _toConsumableArray2["default"])(sharedOptions.m)).action(command(stopCommand));

            (_program$command$desc7 = (_program$command$desc8 = program.command('restart').description('Restart dev containers')).option.apply(_program$command$desc8, (0, _toConsumableArray2["default"])(sharedOptions.n))).option.apply(_program$command$desc7, (0, _toConsumableArray2["default"])(sharedOptions.m)).action(command(restartCommand));

            (_program$command$desc9 = (_program$command$desc10 = program.command('recreate').description('Recreate dev containers')).option.apply(_program$command$desc10, (0, _toConsumableArray2["default"])(sharedOptions.n))).option.apply(_program$command$desc9, (0, _toConsumableArray2["default"])(sharedOptions.m)).action(command(recreateCommand));

            (_program$command$desc11 = (_program$command$desc12 = program.command('clean').description('Remove dev containers and images')).option.apply(_program$command$desc12, (0, _toConsumableArray2["default"])(sharedOptions.n))).option.apply(_program$command$desc11, (0, _toConsumableArray2["default"])(sharedOptions.m)).action(command(cleanCommand));

            (_program$command$desc13 = (_program$command$desc14 = program.command('use <version>').description('Use specified version for containers')).option.apply(_program$command$desc14, (0, _toConsumableArray2["default"])(sharedOptions.n))).option.apply(_program$command$desc13, (0, _toConsumableArray2["default"])(sharedOptions.m)).action(command(useCommand));

            program.command('set [network...]').description('Set network[s] options').option('-p, --port <port>', 'host port to bound local node').option('-d, --db-port <binding>', 'host port to bound local nodes DB ("bind" to use default DB port, "unbind" to unbind DB port)').action(command(setCommand));
            program.command('sol [files...]').description('Build solidity contract[s]').option('-l, --client-languages <languages>', 'generate client code for languages: "js", "rs" (multiple languages must be separated with comma)').option('-L, --client-level <client-level>', 'client code level: "run" to run only, "deploy" to run and deploy (includes an imageBase64 of binary contract)').action(command(solCommand));

            (_program$command$desc15 = program.command('spy [networks]').description('Run network scanner')).option.apply(_program$command$desc15, (0, _toConsumableArray2["default"])(sharedOptions.n)).action(command(spyCommand)); // .command('update', `update ${dev.name} docker images`).action(action)


            program.parse(args);

            if (!(commandArgs.length === 0)) {
              _context11.next = 25;
              break;
            }

            if (!(program.args.length === 0)) {
              _context11.next = 22;
              break;
            }

            _context11.next = 20;
            return (0, _info.infoCommand)(dev, program);

          case 20:
            _context11.next = 23;
            break;

          case 22:
            program.outputHelp();

          case 23:
            _context11.next = 27;
            break;

          case 25:
            _context11.next = 27;
            return commandAction.apply(void 0, [dev].concat((0, _toConsumableArray2["default"])(commandArgs)));

          case 27:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));
  return _handleCommandLine.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvY2xpLmpzIl0sIm5hbWVzIjpbInByb2dyYW0iLCJyZXF1aXJlIiwic2V0dXBDb21tYW5kIiwiZGV2Iiwib3B0aW9ucyIsInN0YXJ0Iiwic3RhcnRDb21tYW5kIiwic3RvcENvbW1hbmQiLCJzdG9wIiwicmVzdGFydENvbW1hbmQiLCJyZXN0YXJ0IiwicmVjcmVhdGVDb21tYW5kIiwicmVjcmVhdGUiLCJjbGVhbkNvbW1hbmQiLCJjbGVhbiIsInNldENvbW1hbmQiLCJuYW1lcyIsInNldE5ldHdvcmtzT3B0aW9ucyIsInVzZUNvbW1hbmQiLCJ2ZXJzaW9uIiwidXNlVmVyc2lvbiIsInNvbENvbW1hbmQiLCJmaWxlcyIsIlNvbGlkaXR5IiwiYnVpbGQiLCJzcHlDb21tYW5kIiwibmV0d29ya3MiLCJzaGFyZWRPcHRpb25zIiwibiIsIm0iLCJoYW5kbGVDb21tYW5kTGluZSIsImFyZ3MiLCJjb21tYW5kQWN0aW9uIiwiaW5mb0NvbW1hbmQiLCJjb21tYW5kQXJncyIsImNvbW1hbmQiLCJhY3Rpb24iLCJuYW1lIiwib3B0aW9uIiwiZGVzY3JpcHRpb24iLCJwYXJzZSIsImxlbmd0aCIsIm91dHB1dEhlbHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQWdCQTs7QUFDQTs7QUFFQTs7QUFXQTs7QUE5QkE7Ozs7Ozs7Ozs7Ozs7O0FBZ0NBLElBQU1BLE9BQU8sR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O1NBR2VDLFk7Ozs7Ozs7K0JBQWYsaUJBQTRCQyxHQUE1QixFQUFzQ0MsT0FBdEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQ1VELEdBQUcsQ0FBQ0UsS0FBSixDQUFVLG9DQUFzQkYsR0FBdEIsRUFBMkJDLE9BQTNCLENBQVYsQ0FEVjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O1NBS2VFLFk7Ozs7Ozs7K0JBQWYsa0JBQTRCSCxHQUE1QixFQUFzQ0MsT0FBdEM7QUFBQTtB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KlxuICogQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG4gKiB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbiAqIExpY2Vuc2UgYXQ6IGh0dHBzOi8vd3d3LnRvbi5kZXYvbGljZW5zZXNcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIFRPTiBERVYgc29mdHdhcmUgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG4vLyBAZmxvd1xuXG5pbXBvcnQgeyBTb2xpZGl0eSB9IGZyb20gXCIuLi9jb21waWxlcnMvc29saWRpdHlcIjtcbmltcG9ydCB7IERldiB9IGZyb20gXCIuLi9kZXZcIjtcbmltcG9ydCB0eXBlIHsgU2V0TmV0d29ya09wdGlvbnMgfSBmcm9tIFwiLi4vbmV0d29ya3MvbmV0d29ya3NcIjtcbmltcG9ydCB7IGNvbXBpbGVyc1dpdGhOZXR3b3JrcyB9IGZyb20gXCIuL29wdGlvbnNcIjtcbmltcG9ydCB0eXBlIHtcbiAgICBDbGVhbk9wdGlvbnMsXG4gICAgUmVjcmVhdGVPcHRpb25zLFxuICAgIFJlc3RhcnRPcHRpb25zLFxuICAgIFNldHVwT3B0aW9ucyxcbiAgICBTdGFydE9wdGlvbnMsXG4gICAgU3RvcE9wdGlvbnMsXG4gICAgVXNlT3B0aW9uc1xufSBmcm9tIFwiLi9vcHRpb25zXCI7XG5cbmltcG9ydCB7IGluZm9Db21tYW5kIH0gZnJvbSBcIi4vaW5mby5qc1wiO1xuXG5jb25zdCBwcm9ncmFtID0gcmVxdWlyZSgnY29tbWFuZGVyJyk7XG5cblxuYXN5bmMgZnVuY3Rpb24gc2V0dXBDb21tYW5kKGRldjogRGV2LCBvcHRpb25zOiBTZXR1cE9wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYuc3RhcnQoY29tcGlsZXJzV2l0aE5ldHdvcmtzKGRldiwgb3B0aW9ucykpO1xufVxuXG5cbmFzeW5jIGZ1bmN0aW9uIHN0YXJ0Q29tbWFuZChkZXY6IERldiwgb3B0aW9uczogU3RhcnRPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnN0YXJ0KGNvbXBpbGVyc1dpdGhOZXR3b3JrcyhkZXYsIG9wdGlvbnMpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc3RvcENvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IFN0b3BPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnN0b3AoY29tcGlsZXJzV2l0aE5ldHdvcmtzKGRldiwgb3B0aW9ucykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZXN0YXJ0Q29tbWFuZChkZXY6IERldiwgb3B0aW9uczogUmVzdGFydE9wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYucmVzdGFydChjb21waWxlcnNXaXRoTmV0d29ya3MoZGV2LCBvcHRpb25zKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlY3JlYXRlQ29tbWFuZChkZXY6IERldiwgb3B0aW9uczogUmVjcmVhdGVPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnJlY3JlYXRlKGNvbXBpbGVyc1dpdGhOZXR3b3JrcyhkZXYsIG9wdGlvbnMpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY2xlYW5Db21tYW5kKGRldjogRGV2LCBvcHRpb25zOiBDbGVhbk9wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYuY2xlYW4oY29tcGlsZXJzV2l0aE5ldHdvcmtzKGRldiwgb3B0aW9ucykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzZXRDb21tYW5kKGRldjogRGV2LCBuYW1lczogc3RyaW5nW10sIG9wdGlvbnM6IFNldE5ldHdvcmtPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnNldE5ldHdvcmtzT3B0aW9ucyhuYW1lcywgb3B0aW9ucyk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHVzZUNvbW1hbmQoZGV2OiBEZXYsIHZlcnNpb246IHN0cmluZywgb3B0aW9uczogVXNlT3B0aW9ucykge1xuICAgIGF3YWl0IGRldi51c2VWZXJzaW9uKHZlcnNpb24sIGNvbXBpbGVyc1dpdGhOZXR3b3JrcyhkZXYsIG9wdGlvbnMpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc29sQ29tbWFuZChkZXY6IERldiwgZmlsZXM6IHN0cmluZ1tdLCBvcHRpb25zOiBTb2xpZGl0eUJ1aWxkT3B0aW9ucykge1xuICAgIGF3YWl0IFNvbGlkaXR5LmJ1aWxkKGRldiwgZmlsZXMsIG9wdGlvbnMpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzcHlDb21tYW5kKGRldjogRGV2LCBuZXR3b3Jrczogc3RyaW5nW10sIG9wdGlvbnM6IEJ1aWxkT3B0aW9ucykge1xufVxuXG5jb25zdCBzaGFyZWRPcHRpb25zID0ge1xuICAgIG46IFsnLW4sIC0tbmV0d29ya3MgW25hbWVzXScsICdhcHBseSBjb21tYW5kIHRvIHNwZWNpZmllZCBuZXR3b3JrW3NdIChuYW1lcyBtdXN0IGJlIHNlcGFyYXRlZCB3aXRoIGNvbW1hKSddLFxuICAgIG06IFsnLW0sIC0tY29tcGlsZXJzJywgJ2FwcGx5IGNvbW1hbmQgdG8gdGhlIGNvbXBpbGVycyBjb250YWluZXInXSxcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZUNvbW1hbmRMaW5lKGRldjogRGV2LCBhcmdzOiBzdHJpbmdbXSkge1xuICAgIGxldCBjb21tYW5kQWN0aW9uID0gaW5mb0NvbW1hbmQ7XG4gICAgbGV0IGNvbW1hbmRBcmdzID0gW107XG5cbiAgICBjb25zdCBjb21tYW5kID0gKGFjdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgIGNvbW1hbmRBY3Rpb24gPSBhY3Rpb247XG4gICAgICAgICAgICBjb21tYW5kQXJncyA9IGFyZ3M7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLm5hbWUoZGV2Lm5hbWUpXG4gICAgICAgIC52ZXJzaW9uKGRldi52ZXJzaW9uKVxuICAgICAgICAub3B0aW9uKCctYSwgLS1hdmFpbGFibGUnLCAnc2hvdyBhdmFpbGFibGUgdmVyc2lvbnMnKVxuICAgICAgICAuZGVzY3JpcHRpb24oJ1RPTiBMYWJzIGRldmVsb3BtZW50IHRvb2xzJyk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdpbmZvJykuZGVzY3JpcHRpb24oJ1Nob3cgc3VtbWFyeSBhYm91dCBkZXYgZW52aXJvbm1lbnQnKVxuICAgICAgICAub3B0aW9uKCctYSwgLS1hdmFpbGFibGUnLCAnc2hvdyBhdmFpbGFibGUgdmVyc2lvbnMnKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoaW5mb0NvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3NldHVwJykuZGVzY3JpcHRpb24oJ1NldHVwIGRldiBlbnZpcm9ubWVudCcpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHNldHVwQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnc3RhcnQnKS5kZXNjcmlwdGlvbignU3RhcnQgZGV2IGNvbnRhaW5lcnMnKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubilcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm0pXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChzdGFydENvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3N0b3AnKS5kZXNjcmlwdGlvbignU3RvcCBkZXYgY29udGFpbmVycycpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHN0b3BDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdyZXN0YXJ0JykuZGVzY3JpcHRpb24oJ1Jlc3RhcnQgZGV2IGNvbnRhaW5lcnMnKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubilcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm0pXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChyZXN0YXJ0Q29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgncmVjcmVhdGUnKS5kZXNjcmlwdGlvbignUmVjcmVhdGUgZGV2IGNvbnRhaW5lcnMnKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubilcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm0pXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChyZWNyZWF0ZUNvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ2NsZWFuJykuZGVzY3JpcHRpb24oJ1JlbW92ZSBkZXYgY29udGFpbmVycyBhbmQgaW1hZ2VzJylcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm4pXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5tKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoY2xlYW5Db21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCd1c2UgPHZlcnNpb24+JykuZGVzY3JpcHRpb24oJ1VzZSBzcGVjaWZpZWQgdmVyc2lvbiBmb3IgY29udGFpbmVycycpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHVzZUNvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3NldCBbbmV0d29yay4uLl0nKS5kZXNjcmlwdGlvbignU2V0IG5ldHdvcmtbc10gb3B0aW9ucycpXG4gICAgICAgIC5vcHRpb24oJy1wLCAtLXBvcnQgPHBvcnQ+JywgJ2hvc3QgcG9ydCB0byBib3VuZCBsb2NhbCBub2RlJylcbiAgICAgICAgLm9wdGlvbignLWQsIC0tZGItcG9ydCA8YmluZGluZz4nLCAnaG9zdCBwb3J0IHRvIGJvdW5kIGxvY2FsIG5vZGVzIERCIChcImJpbmRcIiB0byB1c2UgZGVmYXVsdCBEQiBwb3J0LCBcInVuYmluZFwiIHRvIHVuYmluZCBEQiBwb3J0KScpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChzZXRDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdzb2wgW2ZpbGVzLi4uXScpLmRlc2NyaXB0aW9uKCdCdWlsZCBzb2xpZGl0eSBjb250cmFjdFtzXScpXG4gICAgICAgIC5vcHRpb24oJy1sLCAtLWNsaWVudC1sYW5ndWFnZXMgPGxhbmd1YWdlcz4nLCAnZ2VuZXJhdGUgY2xpZW50IGNvZGUgZm9yIGxhbmd1YWdlczogXCJqc1wiLCBcInJzXCIgKG11bHRpcGxlIGxhbmd1YWdlcyBtdXN0IGJlIHNlcGFyYXRlZCB3aXRoIGNvbW1hKScpXG4gICAgICAgIC5vcHRpb24oJy1MLCAtLWNsaWVudC1sZXZlbCA8Y2xpZW50LWxldmVsPicsICdjbGllbnQgY29kZSBsZXZlbDogXCJydW5cIiB0byBydW4gb25seSwgXCJkZXBsb3lcIiB0byBydW4gYW5kIGRlcGxveSAoaW5jbHVkZXMgYW4gaW1hZ2VCYXNlNjQgb2YgYmluYXJ5IGNvbnRyYWN0KScpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChzb2xDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdzcHkgW25ldHdvcmtzXScpLmRlc2NyaXB0aW9uKCdSdW4gbmV0d29yayBzY2FubmVyJylcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm4pXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChzcHlDb21tYW5kKSk7XG5cbiAgICAvLyAuY29tbWFuZCgndXBkYXRlJywgYHVwZGF0ZSAke2Rldi5uYW1lfSBkb2NrZXIgaW1hZ2VzYCkuYWN0aW9uKGFjdGlvbilcblxuICAgIHByb2dyYW0ucGFyc2UoYXJncyk7XG5cbiAgICBpZiAoY29tbWFuZEFyZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGlmIChwcm9ncmFtLmFyZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBhd2FpdCBpbmZvQ29tbWFuZChkZXYsIHByb2dyYW0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvZ3JhbS5vdXRwdXRIZWxwKCk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBhd2FpdCBjb21tYW5kQWN0aW9uKC4uLltkZXYsIC4uLmNvbW1hbmRBcmdzXSk7XG4gICAgfVxufVxuXG5leHBvcnQgeyBoYW5kbGVDb21tYW5kTGluZSB9O1xuIl19