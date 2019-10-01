"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleCommandLine = handleCommandLine;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _clientCode = require("../compilers/client-code");

var _solidity = require("../compilers/solidity");

var _dev = require("../dev");

var _options = require("./options");

var _info = require("./info.js");

var _spy = require("./spy");

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
            return _solidity.Solidity.build(dev, files, {
              clientLanguages: (options.clientLanguages || '').split(','),
              clientLevel: options.clientLevel || _clientCode.ClientCodeLevel.run
            });

          case 2:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return _solCommand.apply(this, arguments);
}

function spyCommand(_x22, _x23) {
  return _spyCommand.apply(this, arguments);
}

function _spyCommand() {
  _spyCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee10(dev, networks) {
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return (0, _spy.spy)(dev, networks);

          case 2:
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

function handleCommandLine(_x24, _x25) {
  return _handleCommandLine.apply(this, arguments);
}

function _handleCommandLine() {
  _handleCommandLine = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee11(dev, args) {
    var _program$command$desc, _program$command$desc2, _program$command$desc3, _program$command$desc4, _program$command$desc5, _program$command$desc6, _program$command$desc7, _program$command$desc8, _program$command$desc9, _program$command$desc10, _program$command$desc11, _program$command$desc12, _program$command$desc13, _program$command$desc14;

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

            program.command('set [network...]').description('Set network[s] options').option('-p, --port <port>', 'host port to bound local node').option('-d, --db-port <binding>', 'host port to bound local nodes Arango DB ("bind" to use default Arango DB port, "unbind" to unbind Arango DB port)').action(command(setCommand));
            program.command('sol [files...]').description('Build solidity contract[s]').option('-l, --client-languages <languages>', 'generate client code for languages: "js", "rs" (multiple languages must be separated with comma)').option('-L, --client-level <client-level>', 'client code level: "run" to run only, "deploy" to run and deploy (includes an imageBase64 of binary contract)').action(command(solCommand));
            program.command('spy [networks...]').description('Run network scanner').action(command(spyCommand)); // .command('update', `update ${dev.name} docker images`).action(action)

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvY2xpLmpzIl0sIm5hbWVzIjpbInByb2dyYW0iLCJyZXF1aXJlIiwic2V0dXBDb21tYW5kIiwiZGV2Iiwib3B0aW9ucyIsInN0YXJ0Iiwic3RhcnRDb21tYW5kIiwic3RvcENvbW1hbmQiLCJzdG9wIiwicmVzdGFydENvbW1hbmQiLCJyZXN0YXJ0IiwicmVjcmVhdGVDb21tYW5kIiwicmVjcmVhdGUiLCJjbGVhbkNvbW1hbmQiLCJjbGVhbiIsInNldENvbW1hbmQiLCJuYW1lcyIsInNldE5ldHdvcmtzT3B0aW9ucyIsInVzZUNvbW1hbmQiLCJ2ZXJzaW9uIiwidXNlVmVyc2lvbiIsInNvbENvbW1hbmQiLCJmaWxlcyIsIlNvbGlkaXR5IiwiYnVpbGQiLCJjbGllbnRMYW5ndWFnZXMiLCJzcGxpdCIsImNsaWVudExldmVsIiwiQ2xpZW50Q29kZUxldmVsIiwicnVuIiwic3B5Q29tbWFuZCIsIm5ldHdvcmtzIiwic2hhcmVkT3B0aW9ucyIsIm4iLCJtIiwiaGFuZGxlQ29tbWFuZExpbmUiLCJhcmdzIiwiY29tbWFuZEFjdGlvbiIsImluZm9Db21tYW5kIiwiY29tbWFuZEFyZ3MiLCJjb21tYW5kIiwiYWN0aW9uIiwibmFtZSIsIm9wdGlvbiIsImRlc2NyaXB0aW9uIiwicGFyc2UiLCJsZW5ndGgiLCJvdXRwdXRIZWxwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFnQkE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBV0E7O0FBQ0E7O0FBaENBOzs7Ozs7Ozs7Ozs7OztBQWtDQSxJQUFNQSxPQUFPLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXZCOztTQUdlQyxZOzs7Ozs7OytCQUFmLGlCQUE0QkMsR0FBNUIsRUFBc0NDLE9BQXRDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNVRCxHQUFHLENBQUNFLEtBQUosQ0FBVSxvQ0FBc0JGLEdBQXRCLEVBQTJCQyxPQUEzQixDQUFWLENBRFY7O0FBQUE7QUFBQTtBQUFBO0FB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M0MsR0FBWixFQUFpQkgsT0FBakIsQ0F0RmxCOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQXdGWUEsWUFBQUEsT0FBTyxDQUFDK0MsVUFBUjs7QUF4Rlo7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxtQkEyRmNWLGFBQWEsTUFBYixVQUFrQmxDLEdBQWxCLDZDQUEwQm9DLFdBQTFCLEdBM0ZkOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG4gKiB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbiAqIExpY2Vuc2UgYXQ6IGh0dHBzOi8vd3d3LnRvbi5kZXYvbGljZW5zZXNcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIFRPTiBERVYgc29mdHdhcmUgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG4vLyBAZmxvd1xuXG5pbXBvcnQgeyBDbGllbnRDb2RlTGV2ZWwgfSBmcm9tIFwiLi4vY29tcGlsZXJzL2NsaWVudC1jb2RlXCI7XG5pbXBvcnQgeyBTb2xpZGl0eSB9IGZyb20gXCIuLi9jb21waWxlcnMvc29saWRpdHlcIjtcbmltcG9ydCB7IERldiB9IGZyb20gXCIuLi9kZXZcIjtcbmltcG9ydCB0eXBlIHsgU2V0TmV0d29ya09wdGlvbnMgfSBmcm9tIFwiLi4vbmV0d29ya3MvbmV0d29ya3NcIjtcbmltcG9ydCB7IGNvbXBpbGVyc1dpdGhOZXR3b3JrcyB9IGZyb20gXCIuL29wdGlvbnNcIjtcbmltcG9ydCB0eXBlIHtcbiAgICBDbGVhbk9wdGlvbnMsXG4gICAgUmVjcmVhdGVPcHRpb25zLFxuICAgIFJlc3RhcnRPcHRpb25zLFxuICAgIFNldHVwT3B0aW9ucywgU29sT3B0aW9ucyxcbiAgICBTdGFydE9wdGlvbnMsXG4gICAgU3RvcE9wdGlvbnMsXG4gICAgVXNlT3B0aW9uc1xufSBmcm9tIFwiLi9vcHRpb25zXCI7XG5cbmltcG9ydCB7IGluZm9Db21tYW5kIH0gZnJvbSBcIi4vaW5mby5qc1wiO1xuaW1wb3J0IHsgc3B5IH0gZnJvbSBcIi4vc3B5XCI7XG5cbmNvbnN0IHByb2dyYW0gPSByZXF1aXJlKCdjb21tYW5kZXInKTtcblxuXG5hc3luYyBmdW5jdGlvbiBzZXR1cENvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IFNldHVwT3B0aW9ucykge1xuICAgIGF3YWl0IGRldi5zdGFydChjb21waWxlcnNXaXRoTmV0d29ya3MoZGV2LCBvcHRpb25zKSk7XG59XG5cblxuYXN5bmMgZnVuY3Rpb24gc3RhcnRDb21tYW5kKGRldjogRGV2LCBvcHRpb25zOiBTdGFydE9wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYuc3RhcnQoY29tcGlsZXJzV2l0aE5ldHdvcmtzKGRldiwgb3B0aW9ucykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzdG9wQ29tbWFuZChkZXY6IERldiwgb3B0aW9uczogU3RvcE9wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYuc3RvcChjb21waWxlcnNXaXRoTmV0d29ya3MoZGV2LCBvcHRpb25zKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlc3RhcnRDb21tYW5kKGRldjogRGV2LCBvcHRpb25zOiBSZXN0YXJ0T3B0aW9ucykge1xuICAgIGF3YWl0IGRldi5yZXN0YXJ0KGNvbXBpbGVyc1dpdGhOZXR3b3JrcyhkZXYsIG9wdGlvbnMpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVjcmVhdGVDb21tYW5kKGRldjogRGV2LCBvcHRpb25zOiBSZWNyZWF0ZU9wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYucmVjcmVhdGUoY29tcGlsZXJzV2l0aE5ldHdvcmtzKGRldiwgb3B0aW9ucykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjbGVhbkNvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IENsZWFuT3B0aW9ucykge1xuICAgIGF3YWl0IGRldi5jbGVhbihjb21waWxlcnNXaXRoTmV0d29ya3MoZGV2LCBvcHRpb25zKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNldENvbW1hbmQoZGV2OiBEZXYsIG5hbWVzOiBzdHJpbmdbXSwgb3B0aW9uczogU2V0TmV0d29ya09wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYuc2V0TmV0d29ya3NPcHRpb25zKG5hbWVzLCBvcHRpb25zKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gdXNlQ29tbWFuZChkZXY6IERldiwgdmVyc2lvbjogc3RyaW5nLCBvcHRpb25zOiBVc2VPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnVzZVZlcnNpb24odmVyc2lvbiwgY29tcGlsZXJzV2l0aE5ldHdvcmtzKGRldiwgb3B0aW9ucykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzb2xDb21tYW5kKGRldjogRGV2LCBmaWxlczogc3RyaW5nW10sIG9wdGlvbnM6IFNvbE9wdGlvbnMpIHtcbiAgICBhd2FpdCBTb2xpZGl0eS5idWlsZChkZXYsIGZpbGVzLCB7XG4gICAgICAgIGNsaWVudExhbmd1YWdlczogKG9wdGlvbnMuY2xpZW50TGFuZ3VhZ2VzIHx8ICcnKS5zcGxpdCgnLCcpLFxuICAgICAgICBjbGllbnRMZXZlbDogb3B0aW9ucy5jbGllbnRMZXZlbCB8fCBDbGllbnRDb2RlTGV2ZWwucnVuLFxuICAgIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzcHlDb21tYW5kKGRldjogRGV2LCBuZXR3b3Jrczogc3RyaW5nW10pIHtcbiAgICBhd2FpdCBzcHkoZGV2LCBuZXR3b3Jrcyk7XG59XG5cbmNvbnN0IHNoYXJlZE9wdGlvbnMgPSB7XG4gICAgbjogWyctbiwgLS1uZXR3b3JrcyBbbmFtZXNdJywgJ2FwcGx5IGNvbW1hbmQgdG8gc3BlY2lmaWVkIG5ldHdvcmtbc10gKG5hbWVzIG11c3QgYmUgc2VwYXJhdGVkIHdpdGggY29tbWEpJ10sXG4gICAgbTogWyctbSwgLS1jb21waWxlcnMnLCAnYXBwbHkgY29tbWFuZCB0byB0aGUgY29tcGlsZXJzIGNvbnRhaW5lciddLFxufTtcblxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlQ29tbWFuZExpbmUoZGV2OiBEZXYsIGFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgbGV0IGNvbW1hbmRBY3Rpb24gPSBpbmZvQ29tbWFuZDtcbiAgICBsZXQgY29tbWFuZEFyZ3MgPSBbXTtcblxuICAgIGNvbnN0IGNvbW1hbmQgPSAoYWN0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgY29tbWFuZEFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgIGNvbW1hbmRBcmdzID0gYXJncztcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAubmFtZShkZXYubmFtZSlcbiAgICAgICAgLnZlcnNpb24oZGV2LnZlcnNpb24pXG4gICAgICAgIC5vcHRpb24oJy1hLCAtLWF2YWlsYWJsZScsICdzaG93IGF2YWlsYWJsZSB2ZXJzaW9ucycpXG4gICAgICAgIC5kZXNjcmlwdGlvbignVE9OIExhYnMgZGV2ZWxvcG1lbnQgdG9vbHMnKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ2luZm8nKS5kZXNjcmlwdGlvbignU2hvdyBzdW1tYXJ5IGFib3V0IGRldiBlbnZpcm9ubWVudCcpXG4gICAgICAgIC5vcHRpb24oJy1hLCAtLWF2YWlsYWJsZScsICdzaG93IGF2YWlsYWJsZSB2ZXJzaW9ucycpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChpbmZvQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnc2V0dXAnKS5kZXNjcmlwdGlvbignU2V0dXAgZGV2IGVudmlyb25tZW50JylcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm4pXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5tKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoc2V0dXBDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdzdGFydCcpLmRlc2NyaXB0aW9uKCdTdGFydCBkZXYgY29udGFpbmVycycpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHN0YXJ0Q29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnc3RvcCcpLmRlc2NyaXB0aW9uKCdTdG9wIGRldiBjb250YWluZXJzJylcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm4pXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5tKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoc3RvcENvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3Jlc3RhcnQnKS5kZXNjcmlwdGlvbignUmVzdGFydCBkZXYgY29udGFpbmVycycpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHJlc3RhcnRDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdyZWNyZWF0ZScpLmRlc2NyaXB0aW9uKCdSZWNyZWF0ZSBkZXYgY29udGFpbmVycycpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHJlY3JlYXRlQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnY2xlYW4nKS5kZXNjcmlwdGlvbignUmVtb3ZlIGRldiBjb250YWluZXJzIGFuZCBpbWFnZXMnKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubilcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm0pXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChjbGVhbkNvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3VzZSA8dmVyc2lvbj4nKS5kZXNjcmlwdGlvbignVXNlIHNwZWNpZmllZCB2ZXJzaW9uIGZvciBjb250YWluZXJzJylcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm4pXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5tKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQodXNlQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnc2V0IFtuZXR3b3JrLi4uXScpLmRlc2NyaXB0aW9uKCdTZXQgbmV0d29ya1tzXSBvcHRpb25zJylcbiAgICAgICAgLm9wdGlvbignLXAsIC0tcG9ydCA8cG9ydD4nLCAnaG9zdCBwb3J0IHRvIGJvdW5kIGxvY2FsIG5vZGUnKVxuICAgICAgICAub3B0aW9uKCctZCwgLS1kYi1wb3J0IDxiaW5kaW5nPicsICdob3N0IHBvcnQgdG8gYm91bmQgbG9jYWwgbm9kZXMgQXJhbmdvIERCIChcImJpbmRcIiB0byB1c2UgZGVmYXVsdCBBcmFuZ28gREIgcG9ydCwgXCJ1bmJpbmRcIiB0byB1bmJpbmQgQXJhbmdvIERCIHBvcnQpJylcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHNldENvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3NvbCBbZmlsZXMuLi5dJykuZGVzY3JpcHRpb24oJ0J1aWxkIHNvbGlkaXR5IGNvbnRyYWN0W3NdJylcbiAgICAgICAgLm9wdGlvbignLWwsIC0tY2xpZW50LWxhbmd1YWdlcyA8bGFuZ3VhZ2VzPicsICdnZW5lcmF0ZSBjbGllbnQgY29kZSBmb3IgbGFuZ3VhZ2VzOiBcImpzXCIsIFwicnNcIiAobXVsdGlwbGUgbGFuZ3VhZ2VzIG11c3QgYmUgc2VwYXJhdGVkIHdpdGggY29tbWEpJylcbiAgICAgICAgLm9wdGlvbignLUwsIC0tY2xpZW50LWxldmVsIDxjbGllbnQtbGV2ZWw+JywgJ2NsaWVudCBjb2RlIGxldmVsOiBcInJ1blwiIHRvIHJ1biBvbmx5LCBcImRlcGxveVwiIHRvIHJ1biBhbmQgZGVwbG95IChpbmNsdWRlcyBhbiBpbWFnZUJhc2U2NCBvZiBiaW5hcnkgY29udHJhY3QpJylcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHNvbENvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3NweSBbbmV0d29ya3MuLi5dJykuZGVzY3JpcHRpb24oJ1J1biBuZXR3b3JrIHNjYW5uZXInKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoc3B5Q29tbWFuZCkpO1xuXG4gICAgLy8gLmNvbW1hbmQoJ3VwZGF0ZScsIGB1cGRhdGUgJHtkZXYubmFtZX0gZG9ja2VyIGltYWdlc2ApLmFjdGlvbihhY3Rpb24pXG5cbiAgICBwcm9ncmFtLnBhcnNlKGFyZ3MpO1xuXG4gICAgaWYgKGNvbW1hbmRBcmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBpZiAocHJvZ3JhbS5hcmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgYXdhaXQgaW5mb0NvbW1hbmQoZGV2LCBwcm9ncmFtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb2dyYW0ub3V0cHV0SGVscCgpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYXdhaXQgY29tbWFuZEFjdGlvbiguLi5bZGV2LCAuLi5jb21tYW5kQXJnc10pO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgaGFuZGxlQ29tbWFuZExpbmUgfTtcbiJdfQ==