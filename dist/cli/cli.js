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

var _networks = require("../networks/networks");

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
            return dev.updateNetworkConfigs(dev.networksOrAll(names), function (config) {
              if (options.newName) {
                config.name = options.newName;
              }

              if (options.port) {
                config.hostPort = options.port;
              }

              if (options.dbPort) {
                if (options.dbPort === 'bind') {
                  config.arangoHostPort = _networks.Network.defaultArangoPort;
                } else if (options.dbPort === 'unbind') {
                  config.arangoHostPort = '';
                } else {
                  config.arangoHostPort = options.dbPort || '';
                }
              }
            });

          case 2:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _setCommand.apply(this, arguments);
}

function addCommand(_x16, _x17) {
  return _addCommand.apply(this, arguments);
}

function _addCommand() {
  _addCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee8(dev, names) {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return dev.addNetworks(names);

          case 2:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _addCommand.apply(this, arguments);
}

function removeCommand(_x18, _x19) {
  return _removeCommand.apply(this, arguments);
}

function _removeCommand() {
  _removeCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee9(dev, names) {
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return dev.removeNetworks(dev.networksFromNames(names));

          case 2:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return _removeCommand.apply(this, arguments);
}

function useCommand(_x20, _x21, _x22) {
  return _useCommand.apply(this, arguments);
}

function _useCommand() {
  _useCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee10(dev, version, options) {
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return dev.useVersion(version, (0, _options.compilersWithNetworks)(dev, options));

          case 2:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return _useCommand.apply(this, arguments);
}

function solCommand(_x23, _x24, _x25) {
  return _solCommand.apply(this, arguments);
}

function _solCommand() {
  _solCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee11(dev, files, options) {
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return _solidity.Solidity.build(dev, files, {
              clientLanguages: (options.clientLanguages || '').split(','),
              clientLevel: options.clientLevel || _clientCode.ClientCodeLevel.run
            });

          case 2:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));
  return _solCommand.apply(this, arguments);
}

function spyCommand(_x26, _x27) {
  return _spyCommand.apply(this, arguments);
}

function _spyCommand() {
  _spyCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee12(dev, networks) {
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return (0, _spy.spy)(dev, networks);

          case 2:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));
  return _spyCommand.apply(this, arguments);
}

var sharedOptions = {
  n: ['-n, --networks [names]', 'apply command to specified network[s] (names must be separated with comma)'],
  m: ['-m, --compilers', 'apply command to the compilers container']
};

function handleCommandLine(_x28, _x29) {
  return _handleCommandLine.apply(this, arguments);
}

function _handleCommandLine() {
  _handleCommandLine = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee13(dev, args) {
    var _program$command$desc, _program$command$desc2, _program$command$desc3, _program$command$desc4, _program$command$desc5, _program$command$desc6, _program$command$desc7, _program$command$desc8, _program$command$desc9, _program$command$desc10, _program$command$desc11, _program$command$desc12, _program$command$desc13, _program$command$desc14;

    var commandAction, commandArgs, command;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
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

            program.command('set [network...]').description('Set network[s] options').option('-p, --port <port>', 'host port to bound local node').option('-d, --db-port <binding>', 'host port to bound local nodes Arango DB ("bind" to use default Arango DB port, "unbind" to unbind Arango DB port)').option('-n, --new-name <name>', 'set new name for network').action(command(setCommand));
            program.command('add [network...]').description('Add network[s]').action(command(addCommand));
            program.command('remove [network...]').alias('rm').description('Remove network[s]').action(command(removeCommand));
            program.command('sol [files...]').description('Build solidity contract[s]').option('-l, --client-languages <languages>', 'generate client code for languages: "js", "rs" (multiple languages must be separated with comma)').option('-L, --client-level <client-level>', 'client code level: "run" to run only, "deploy" to run and deploy (includes an imageBase64 of binary contract)').action(command(solCommand)); // program
            //     .command('spy [networks...]').description('Run network scanner')
            //     .action(command(spyCommand));
            // .command('update', `update ${dev.name} docker images`).action(action)

            program.parse(args);

            if (!(commandArgs.length === 0)) {
              _context13.next = 26;
              break;
            }

            if (!(program.args.length === 0)) {
              _context13.next = 23;
              break;
            }

            _context13.next = 21;
            return (0, _info.infoCommand)(dev, program);

          case 21:
            _context13.next = 24;
            break;

          case 23:
            program.outputHelp();

          case 24:
            _context13.next = 28;
            break;

          case 26:
            _context13.next = 28;
            return commandAction.apply(void 0, [dev].concat((0, _toConsumableArray2["default"])(commandArgs)));

          case 28:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));
  return _handleCommandLine.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvY2xpLmpzIl0sIm5hbWVzIjpbInByb2dyYW0iLCJyZXF1aXJlIiwic2V0dXBDb21tYW5kIiwiZGV2Iiwib3B0aW9ucyIsInN0YXJ0Iiwic3RhcnRDb21tYW5kIiwic3RvcENvbW1hbmQiLCJzdG9wIiwicmVzdGFydENvbW1hbmQiLCJyZXN0YXJ0IiwicmVjcmVhdGVDb21tYW5kIiwicmVjcmVhdGUiLCJjbGVhbkNvbW1hbmQiLCJjbGVhbiIsInNldENvbW1hbmQiLCJuYW1lcyIsInVwZGF0ZU5ldHdvcmtDb25maWdzIiwibmV0d29ya3NPckFsbCIsImNvbmZpZyIsIm5ld05hbWUiLCJuYW1lIiwicG9ydCIsImhvc3RQb3J0IiwiZGJQb3J0IiwiYXJhbmdvSG9zdFBvcnQiLCJOZXR3b3JrIiwiZGVmYXVsdEFyYW5nb1BvcnQiLCJhZGRDb21tYW5kIiwiYWRkTmV0d29ya3MiLCJyZW1vdmVDb21tYW5kIiwicmVtb3ZlTmV0d29ya3MiLCJuZXR3b3Jrc0Zyb21OYW1lcyIsInVzZUNvbW1hbmQiLCJ2ZXJzaW9uIiwidXNlVmVyc2lvbiIsInNvbENvbW1hbmQiLCJmaWxlcyIsIlNvbGlkaXR5IiwiYnVpbGQiLCJjbGllbnRMYW5ndWFnZXMiLCJzcGxpdCIsImNsaWVudExldmVsIiwiQ2xpZW50Q29kZUxldmVsIiwicnVuIiwic3B5Q29tbWFuZCIsIm5ldHdvcmtzIiwic2hhcmVkT3B0aW9ucyIsIm4iLCJtIiwiaGFuZGxlQ29tbWFuZExpbmUiLCJhcmdzIiwiY29tbWFuZEFjdGlvbiIsImluZm9Db21tYW5kIiwiY29tbWFuZEFyZ3MiLCJjb21tYW5kIiwiYWN0aW9uIiwib3B0aW9uIiwiZGVzY3JpcHRpb24iLCJhbGlhcyIsInBhcnNlIiwibGVuZ3RoIiwib3V0cHV0SGVscCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQVdBOztBQUNBOztBQWpDQTs7Ozs7Ozs7Ozs7Ozs7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Q0FBQ3pCLGFBQUQsQ0FGbkI7QUFJQTlCLFlBQUFBLE9BQU8sQ0FDRnVELE9BREwsQ0FDYSxnQkFEYixFQUMrQkcsV0FEL0IsQ0FDMkMsNEJBRDNDLEVBRUtELE1BRkwsQ0FFWSxvQ0FGWixFQUVrRCxrR0FGbEQsRUFHS0EsTUFITCxDQUdZLG1DQUhaLEVBR2lELCtHQUhqRCxFQUlLRCxNQUpMLENBSVlELE9BQU8sQ0FBQ25CLFVBQUQsQ0FKbkIsRUEvRUosQ0FxRkk7QUFDQTtBQUNBO0FBRUE7O0FBRUFwQyxZQUFBQSxPQUFPLENBQUM0RCxLQUFSLENBQWNULElBQWQ7O0FBM0ZKLGtCQTZGUUcsV0FBVyxDQUFDTyxNQUFaLEtBQXVCLENBN0YvQjtBQUFBO0FBQUE7QUFBQTs7QUFBQSxrQkE4Rlk3RCxPQUFPLENBQUNtRCxJQUFSLENBQWFVLE1BQWIsS0FBd0IsQ0E5RnBDO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsbUJBK0ZrQix1QkFBWTFELEdBQVosRUFBaUJILE9BQWpCLENBL0ZsQjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFpR1lBLFlBQUFBLE9BQU8sQ0FBQzhELFVBQVI7O0FBakdaO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsbUJBb0djVixhQUFhLE1BQWIsVUFBa0JqRCxHQUFsQiw2Q0FBMEJtRCxXQUExQixHQXBHZDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuLy8gQGZsb3dcblxuaW1wb3J0IHsgQ2xpZW50Q29kZUxldmVsIH0gZnJvbSBcIi4uL2NvbXBpbGVycy9jbGllbnQtY29kZVwiO1xuaW1wb3J0IHsgU29saWRpdHkgfSBmcm9tIFwiLi4vY29tcGlsZXJzL3NvbGlkaXR5XCI7XG5pbXBvcnQgeyBEZXYgfSBmcm9tIFwiLi4vZGV2XCI7XG5pbXBvcnQgeyBOZXR3b3JrIH0gZnJvbSBcIi4uL25ldHdvcmtzL25ldHdvcmtzXCI7XG5pbXBvcnQgdHlwZSB7IE5ldHdvcmtDb25maWcgfSBmcm9tIFwiLi4vbmV0d29ya3MvbmV0d29ya3NcIjtcbmltcG9ydCB7IGNvbXBpbGVyc1dpdGhOZXR3b3JrcywgcmVxdWlyZWROZXR3b3JrcyB9IGZyb20gXCIuL29wdGlvbnNcIjtcbmltcG9ydCB0eXBlIHtcbiAgICBDbGVhbk9wdGlvbnMsXG4gICAgUmVjcmVhdGVPcHRpb25zLFxuICAgIFJlc3RhcnRPcHRpb25zLCBTZXROZXR3b3JrT3B0aW9ucyxcbiAgICBTZXR1cE9wdGlvbnMsIFNvbE9wdGlvbnMsXG4gICAgU3RhcnRPcHRpb25zLFxuICAgIFN0b3BPcHRpb25zLFxuICAgIFVzZU9wdGlvbnNcbn0gZnJvbSBcIi4vb3B0aW9uc1wiO1xuXG5pbXBvcnQgeyBpbmZvQ29tbWFuZCB9IGZyb20gXCIuL2luZm8uanNcIjtcbmltcG9ydCB7IHNweSB9IGZyb20gXCIuL3NweVwiO1xuXG5jb25zdCBwcm9ncmFtID0gcmVxdWlyZSgnY29tbWFuZGVyJyk7XG5cblxuYXN5bmMgZnVuY3Rpb24gc2V0dXBDb21tYW5kKGRldjogRGV2LCBvcHRpb25zOiBTZXR1cE9wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYuc3RhcnQoY29tcGlsZXJzV2l0aE5ldHdvcmtzKGRldiwgb3B0aW9ucykpO1xufVxuXG5cbmFzeW5jIGZ1bmN0aW9uIHN0YXJ0Q29tbWFuZChkZXY6IERldiwgb3B0aW9uczogU3RhcnRPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnN0YXJ0KGNvbXBpbGVyc1dpdGhOZXR3b3JrcyhkZXYsIG9wdGlvbnMpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc3RvcENvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IFN0b3BPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnN0b3AoY29tcGlsZXJzV2l0aE5ldHdvcmtzKGRldiwgb3B0aW9ucykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZXN0YXJ0Q29tbWFuZChkZXY6IERldiwgb3B0aW9uczogUmVzdGFydE9wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYucmVzdGFydChjb21waWxlcnNXaXRoTmV0d29ya3MoZGV2LCBvcHRpb25zKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlY3JlYXRlQ29tbWFuZChkZXY6IERldiwgb3B0aW9uczogUmVjcmVhdGVPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnJlY3JlYXRlKGNvbXBpbGVyc1dpdGhOZXR3b3JrcyhkZXYsIG9wdGlvbnMpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY2xlYW5Db21tYW5kKGRldjogRGV2LCBvcHRpb25zOiBDbGVhbk9wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYuY2xlYW4oY29tcGlsZXJzV2l0aE5ldHdvcmtzKGRldiwgb3B0aW9ucykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzZXRDb21tYW5kKGRldjogRGV2LCBuYW1lczogc3RyaW5nW10sIG9wdGlvbnM6IFNldE5ldHdvcmtPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnVwZGF0ZU5ldHdvcmtDb25maWdzKGRldi5uZXR3b3Jrc09yQWxsKG5hbWVzKSwgKGNvbmZpZzogTmV0d29ya0NvbmZpZykgPT4ge1xuICAgICAgICBpZiAob3B0aW9ucy5uZXdOYW1lKSB7XG4gICAgICAgICAgICBjb25maWcubmFtZSA9IG9wdGlvbnMubmV3TmFtZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5wb3J0KSB7XG4gICAgICAgICAgICBjb25maWcuaG9zdFBvcnQgPSBvcHRpb25zLnBvcnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuZGJQb3J0KSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5kYlBvcnQgPT09ICdiaW5kJykge1xuICAgICAgICAgICAgICAgIGNvbmZpZy5hcmFuZ29Ib3N0UG9ydCA9IE5ldHdvcmsuZGVmYXVsdEFyYW5nb1BvcnQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZGJQb3J0ID09PSAndW5iaW5kJykge1xuICAgICAgICAgICAgICAgIGNvbmZpZy5hcmFuZ29Ib3N0UG9ydCA9ICcnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25maWcuYXJhbmdvSG9zdFBvcnQgPSBvcHRpb25zLmRiUG9ydCB8fCAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBhZGRDb21tYW5kKGRldjogRGV2LCBuYW1lczogc3RyaW5nW10pIHtcbiAgICBhd2FpdCBkZXYuYWRkTmV0d29ya3MobmFtZXMpO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZW1vdmVDb21tYW5kKGRldjogRGV2LCBuYW1lczogc3RyaW5nW10pIHtcbiAgICBhd2FpdCBkZXYucmVtb3ZlTmV0d29ya3MoZGV2Lm5ldHdvcmtzRnJvbU5hbWVzKG5hbWVzKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHVzZUNvbW1hbmQoZGV2OiBEZXYsIHZlcnNpb246IHN0cmluZywgb3B0aW9uczogVXNlT3B0aW9ucykge1xuICAgIGF3YWl0IGRldi51c2VWZXJzaW9uKHZlcnNpb24sIGNvbXBpbGVyc1dpdGhOZXR3b3JrcyhkZXYsIG9wdGlvbnMpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc29sQ29tbWFuZChkZXY6IERldiwgZmlsZXM6IHN0cmluZ1tdLCBvcHRpb25zOiBTb2xPcHRpb25zKSB7XG4gICAgYXdhaXQgU29saWRpdHkuYnVpbGQoZGV2LCBmaWxlcywge1xuICAgICAgICBjbGllbnRMYW5ndWFnZXM6IChvcHRpb25zLmNsaWVudExhbmd1YWdlcyB8fCAnJykuc3BsaXQoJywnKSxcbiAgICAgICAgY2xpZW50TGV2ZWw6IG9wdGlvbnMuY2xpZW50TGV2ZWwgfHwgQ2xpZW50Q29kZUxldmVsLnJ1bixcbiAgICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc3B5Q29tbWFuZChkZXY6IERldiwgbmV0d29ya3M6IHN0cmluZ1tdKSB7XG4gICAgYXdhaXQgc3B5KGRldiwgbmV0d29ya3MpO1xufVxuXG5jb25zdCBzaGFyZWRPcHRpb25zID0ge1xuICAgIG46IFsnLW4sIC0tbmV0d29ya3MgW25hbWVzXScsICdhcHBseSBjb21tYW5kIHRvIHNwZWNpZmllZCBuZXR3b3JrW3NdIChuYW1lcyBtdXN0IGJlIHNlcGFyYXRlZCB3aXRoIGNvbW1hKSddLFxuICAgIG06IFsnLW0sIC0tY29tcGlsZXJzJywgJ2FwcGx5IGNvbW1hbmQgdG8gdGhlIGNvbXBpbGVycyBjb250YWluZXInXSxcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZUNvbW1hbmRMaW5lKGRldjogRGV2LCBhcmdzOiBzdHJpbmdbXSkge1xuICAgIGxldCBjb21tYW5kQWN0aW9uID0gaW5mb0NvbW1hbmQ7XG4gICAgbGV0IGNvbW1hbmRBcmdzID0gW107XG5cbiAgICBjb25zdCBjb21tYW5kID0gKGFjdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgIGNvbW1hbmRBY3Rpb24gPSBhY3Rpb247XG4gICAgICAgICAgICBjb21tYW5kQXJncyA9IGFyZ3M7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLm5hbWUoZGV2Lm5hbWUpXG4gICAgICAgIC52ZXJzaW9uKGRldi52ZXJzaW9uKVxuICAgICAgICAub3B0aW9uKCctYSwgLS1hdmFpbGFibGUnLCAnc2hvdyBhdmFpbGFibGUgdmVyc2lvbnMnKVxuICAgICAgICAuZGVzY3JpcHRpb24oJ1RPTiBMYWJzIGRldmVsb3BtZW50IHRvb2xzJyk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdpbmZvJykuZGVzY3JpcHRpb24oJ1Nob3cgc3VtbWFyeSBhYm91dCBkZXYgZW52aXJvbm1lbnQnKVxuICAgICAgICAub3B0aW9uKCctYSwgLS1hdmFpbGFibGUnLCAnc2hvdyBhdmFpbGFibGUgdmVyc2lvbnMnKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoaW5mb0NvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3NldHVwJykuZGVzY3JpcHRpb24oJ1NldHVwIGRldiBlbnZpcm9ubWVudCcpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHNldHVwQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnc3RhcnQnKS5kZXNjcmlwdGlvbignU3RhcnQgZGV2IGNvbnRhaW5lcnMnKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubilcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm0pXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChzdGFydENvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3N0b3AnKS5kZXNjcmlwdGlvbignU3RvcCBkZXYgY29udGFpbmVycycpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHN0b3BDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdyZXN0YXJ0JykuZGVzY3JpcHRpb24oJ1Jlc3RhcnQgZGV2IGNvbnRhaW5lcnMnKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubilcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm0pXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChyZXN0YXJ0Q29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgncmVjcmVhdGUnKS5kZXNjcmlwdGlvbignUmVjcmVhdGUgZGV2IGNvbnRhaW5lcnMnKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubilcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm0pXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChyZWNyZWF0ZUNvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ2NsZWFuJykuZGVzY3JpcHRpb24oJ1JlbW92ZSBkZXYgY29udGFpbmVycyBhbmQgaW1hZ2VzJylcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm4pXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5tKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoY2xlYW5Db21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCd1c2UgPHZlcnNpb24+JykuZGVzY3JpcHRpb24oJ1VzZSBzcGVjaWZpZWQgdmVyc2lvbiBmb3IgY29udGFpbmVycycpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHVzZUNvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3NldCBbbmV0d29yay4uLl0nKS5kZXNjcmlwdGlvbignU2V0IG5ldHdvcmtbc10gb3B0aW9ucycpXG4gICAgICAgIC5vcHRpb24oJy1wLCAtLXBvcnQgPHBvcnQ+JywgJ2hvc3QgcG9ydCB0byBib3VuZCBsb2NhbCBub2RlJylcbiAgICAgICAgLm9wdGlvbignLWQsIC0tZGItcG9ydCA8YmluZGluZz4nLCAnaG9zdCBwb3J0IHRvIGJvdW5kIGxvY2FsIG5vZGVzIEFyYW5nbyBEQiAoXCJiaW5kXCIgdG8gdXNlIGRlZmF1bHQgQXJhbmdvIERCIHBvcnQsIFwidW5iaW5kXCIgdG8gdW5iaW5kIEFyYW5nbyBEQiBwb3J0KScpXG4gICAgICAgIC5vcHRpb24oJy1uLCAtLW5ldy1uYW1lIDxuYW1lPicsICdzZXQgbmV3IG5hbWUgZm9yIG5ldHdvcmsnKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoc2V0Q29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnYWRkIFtuZXR3b3JrLi4uXScpLmRlc2NyaXB0aW9uKCdBZGQgbmV0d29ya1tzXScpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChhZGRDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdyZW1vdmUgW25ldHdvcmsuLi5dJykuYWxpYXMoJ3JtJykuZGVzY3JpcHRpb24oJ1JlbW92ZSBuZXR3b3JrW3NdJylcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHJlbW92ZUNvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3NvbCBbZmlsZXMuLi5dJykuZGVzY3JpcHRpb24oJ0J1aWxkIHNvbGlkaXR5IGNvbnRyYWN0W3NdJylcbiAgICAgICAgLm9wdGlvbignLWwsIC0tY2xpZW50LWxhbmd1YWdlcyA8bGFuZ3VhZ2VzPicsICdnZW5lcmF0ZSBjbGllbnQgY29kZSBmb3IgbGFuZ3VhZ2VzOiBcImpzXCIsIFwicnNcIiAobXVsdGlwbGUgbGFuZ3VhZ2VzIG11c3QgYmUgc2VwYXJhdGVkIHdpdGggY29tbWEpJylcbiAgICAgICAgLm9wdGlvbignLUwsIC0tY2xpZW50LWxldmVsIDxjbGllbnQtbGV2ZWw+JywgJ2NsaWVudCBjb2RlIGxldmVsOiBcInJ1blwiIHRvIHJ1biBvbmx5LCBcImRlcGxveVwiIHRvIHJ1biBhbmQgZGVwbG95IChpbmNsdWRlcyBhbiBpbWFnZUJhc2U2NCBvZiBiaW5hcnkgY29udHJhY3QpJylcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHNvbENvbW1hbmQpKTtcblxuICAgIC8vIHByb2dyYW1cbiAgICAvLyAgICAgLmNvbW1hbmQoJ3NweSBbbmV0d29ya3MuLi5dJykuZGVzY3JpcHRpb24oJ1J1biBuZXR3b3JrIHNjYW5uZXInKVxuICAgIC8vICAgICAuYWN0aW9uKGNvbW1hbmQoc3B5Q29tbWFuZCkpO1xuXG4gICAgLy8gLmNvbW1hbmQoJ3VwZGF0ZScsIGB1cGRhdGUgJHtkZXYubmFtZX0gZG9ja2VyIGltYWdlc2ApLmFjdGlvbihhY3Rpb24pXG5cbiAgICBwcm9ncmFtLnBhcnNlKGFyZ3MpO1xuXG4gICAgaWYgKGNvbW1hbmRBcmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBpZiAocHJvZ3JhbS5hcmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgYXdhaXQgaW5mb0NvbW1hbmQoZGV2LCBwcm9ncmFtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb2dyYW0ub3V0cHV0SGVscCgpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYXdhaXQgY29tbWFuZEFjdGlvbiguLi5bZGV2LCAuLi5jb21tYW5kQXJnc10pO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgaGFuZGxlQ29tbWFuZExpbmUgfTtcbiJdfQ==