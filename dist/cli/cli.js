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
    var all;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            all = !options.compilers && !options.networks;
            _context6.next = 3;
            return dev.clean(options.compilers || all, options.networks || all);

          case 3:
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
    var _program$command$desc, _program$command$desc2, _program$command$desc3, _program$command$desc4, _program$command$desc5, _program$command$desc6, _program$command$desc7, _program$command$desc8, _program$command$desc9, _program$command$desc10, _program$command$desc11, _program$command$desc12;

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

            program.command('clean').description('Remove docker containers and images related to TON Dev').option('-n, --networks', 'clean compilers docker containers and images').option('-m, --compilers', 'clean local node docker containers and images').action(command(cleanCommand));

            (_program$command$desc11 = (_program$command$desc12 = program.command('use <version>').description('Use specified version for containers')).option.apply(_program$command$desc12, (0, _toConsumableArray2["default"])(sharedOptions.n))).option.apply(_program$command$desc11, (0, _toConsumableArray2["default"])(sharedOptions.m)).action(command(useCommand));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvY2xpLmpzIl0sIm5hbWVzIjpbInByb2dyYW0iLCJyZXF1aXJlIiwic2V0dXBDb21tYW5kIiwiZGV2Iiwib3B0aW9ucyIsInN0YXJ0Iiwic3RhcnRDb21tYW5kIiwic3RvcENvbW1hbmQiLCJzdG9wIiwicmVzdGFydENvbW1hbmQiLCJyZXN0YXJ0IiwicmVjcmVhdGVDb21tYW5kIiwicmVjcmVhdGUiLCJjbGVhbkNvbW1hbmQiLCJhbGwiLCJjb21waWxlcnMiLCJuZXR3b3JrcyIsImNsZWFuIiwic2V0Q29tbWFuZCIsIm5hbWVzIiwidXBkYXRlTmV0d29ya0NvbmZpZ3MiLCJuZXR3b3Jrc09yQWxsIiwiY29uZmlnIiwibmV3TmFtZSIsIm5hbWUiLCJwb3J0IiwiaG9zdFBvcnQiLCJkYlBvcnQiLCJhcmFuZ29Ib3N0UG9ydCIsIk5ldHdvcmsiLCJkZWZhdWx0QXJhbmdvUG9ydCIsImFkZENvbW1hbmQiLCJhZGROZXR3b3JrcyIsInJlbW92ZUNvbW1hbmQiLCJyZW1vdmVOZXR3b3JrcyIsIm5ldHdvcmtzRnJvbU5hbWVzIiwidXNlQ29tbWFuZCIsInZlcnNpb24iLCJ1c2VWZXJzaW9uIiwic29sQ29tbWFuZCIsImZpbGVzIiwiU29saWRpdHkiLCJidWlsZCIsImNsaWVudExhbmd1YWdlcyIsInNwbGl0IiwiY2xpZW50TGV2ZWwiLCJDbGllbnRDb2RlTGV2ZWwiLCJydW4iLCJzcHlDb21tYW5kIiwic2hhcmVkT3B0aW9ucyIsIm4iLCJtIiwiaGFuZGxlQ29tbWFuZExpbmUiLCJhcmdzIiwiY29tbWFuZEFjdGlvbiIsImluZm9Db21tYW5kIiwiY29tbWFuZEFyZ3MiLCJjb21tYW5kIiwiYWN0aW9uIiwib3B0aW9uIiwiZGVzY3JpcHRpb24iLCJhbGlhcyIsInBhcnNlIiwibGVuZ3RoIiwib3V0cHV0SGVscCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQVdBOztBQUNBOztB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RCxPQUFPLENBQUMxQixVQUFELENBRm5CO0FBSUEvQixZQUFBQSxPQUFPLENBQ0Z5RCxPQURMLENBQ2EscUJBRGIsRUFDb0NJLEtBRHBDLENBQzBDLElBRDFDLEVBQ2dERCxXQURoRCxDQUM0RCxtQkFENUQsRUFFS0YsTUFGTCxDQUVZRCxPQUFPLENBQUN4QixhQUFELENBRm5CO0FBSUFqQyxZQUFBQSxPQUFPLENBQ0Z5RCxPQURMLENBQ2EsZ0JBRGIsRUFDK0JHLFdBRC9CLENBQzJDLDRCQUQzQyxFQUVLRCxNQUZMLENBRVksb0NBRlosRUFFa0Qsa0dBRmxELEVBR0tBLE1BSEwsQ0FHWSxtQ0FIWixFQUdpRCwrR0FIakQsRUFJS0QsTUFKTCxDQUlZRCxPQUFPLENBQUNsQixVQUFELENBSm5CLEVBL0VKLENBcUZJO0FBQ0E7QUFDQTtBQUVBOztBQUVBdkMsWUFBQUEsT0FBTyxDQUFDOEQsS0FBUixDQUFjVCxJQUFkOztBQTNGSixrQkE2RlFHLFdBQVcsQ0FBQ08sTUFBWixLQUF1QixDQTdGL0I7QUFBQTtBQUFBO0FBQUE7O0FBQUEsa0JBOEZZL0QsT0FBTyxDQUFDcUQsSUFBUixDQUFhVSxNQUFiLEtBQXdCLENBOUZwQztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLG1CQStGa0IsdUJBQVk1RCxHQUFaLEVBQWlCSCxPQUFqQixDQS9GbEI7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBaUdZQSxZQUFBQSxPQUFPLENBQUNnRSxVQUFSOztBQWpHWjtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLG1CQW9HY1YsYUFBYSxNQUFiLFVBQWtCbkQsR0FBbEIsNkNBQTBCcUQsV0FBMUIsR0FwR2Q7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOC0yMDE5IFRPTiBERVYgU09MVVRJT05TIExURC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgU09GVFdBUkUgRVZBTFVBVElPTiBMaWNlbnNlICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbiAqIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxuICogTGljZW5zZSBhdDogaHR0cHM6Ly93d3cudG9uLmRldi9saWNlbnNlc1xuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgVE9OIERFViBzb2Z0d2FyZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbi8vIEBmbG93XG5cbmltcG9ydCB7IENsaWVudENvZGVMZXZlbCB9IGZyb20gXCIuLi9jb21waWxlcnMvY2xpZW50LWNvZGVcIjtcbmltcG9ydCB7IFNvbGlkaXR5IH0gZnJvbSBcIi4uL2NvbXBpbGVycy9zb2xpZGl0eVwiO1xuaW1wb3J0IHsgRGV2IH0gZnJvbSBcIi4uL2RldlwiO1xuaW1wb3J0IHsgTmV0d29yayB9IGZyb20gXCIuLi9uZXR3b3Jrcy9uZXR3b3Jrc1wiO1xuaW1wb3J0IHR5cGUgeyBOZXR3b3JrQ29uZmlnIH0gZnJvbSBcIi4uL25ldHdvcmtzL25ldHdvcmtzXCI7XG5pbXBvcnQgeyBjb21waWxlcnNXaXRoTmV0d29ya3MsIHJlcXVpcmVkTmV0d29ya3MgfSBmcm9tIFwiLi9vcHRpb25zXCI7XG5pbXBvcnQgdHlwZSB7XG4gICAgQ2xlYW5PcHRpb25zLFxuICAgIFJlY3JlYXRlT3B0aW9ucyxcbiAgICBSZXN0YXJ0T3B0aW9ucywgU2V0TmV0d29ya09wdGlvbnMsXG4gICAgU2V0dXBPcHRpb25zLCBTb2xPcHRpb25zLFxuICAgIFN0YXJ0T3B0aW9ucyxcbiAgICBTdG9wT3B0aW9ucyxcbiAgICBVc2VPcHRpb25zXG59IGZyb20gXCIuL29wdGlvbnNcIjtcblxuaW1wb3J0IHsgaW5mb0NvbW1hbmQgfSBmcm9tIFwiLi9pbmZvLmpzXCI7XG5pbXBvcnQgeyBzcHkgfSBmcm9tIFwiLi9zcHlcIjtcblxuY29uc3QgcHJvZ3JhbSA9IHJlcXVpcmUoJ2NvbW1hbmRlcicpO1xuXG5cbmFzeW5jIGZ1bmN0aW9uIHNldHVwQ29tbWFuZChkZXY6IERldiwgb3B0aW9uczogU2V0dXBPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnN0YXJ0KGNvbXBpbGVyc1dpdGhOZXR3b3JrcyhkZXYsIG9wdGlvbnMpKTtcbn1cblxuXG5hc3luYyBmdW5jdGlvbiBzdGFydENvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IFN0YXJ0T3B0aW9ucykge1xuICAgIGF3YWl0IGRldi5zdGFydChjb21waWxlcnNXaXRoTmV0d29ya3MoZGV2LCBvcHRpb25zKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHN0b3BDb21tYW5kKGRldjogRGV2LCBvcHRpb25zOiBTdG9wT3B0aW9ucykge1xuICAgIGF3YWl0IGRldi5zdG9wKGNvbXBpbGVyc1dpdGhOZXR3b3JrcyhkZXYsIG9wdGlvbnMpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVzdGFydENvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IFJlc3RhcnRPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnJlc3RhcnQoY29tcGlsZXJzV2l0aE5ldHdvcmtzKGRldiwgb3B0aW9ucykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZWNyZWF0ZUNvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IFJlY3JlYXRlT3B0aW9ucykge1xuICAgIGF3YWl0IGRldi5yZWNyZWF0ZShjb21waWxlcnNXaXRoTmV0d29ya3MoZGV2LCBvcHRpb25zKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNsZWFuQ29tbWFuZChkZXY6IERldiwgb3B0aW9uczogQ2xlYW5PcHRpb25zKSB7XG4gICAgY29uc3QgYWxsID0gIW9wdGlvbnMuY29tcGlsZXJzICYmICFvcHRpb25zLm5ldHdvcmtzO1xuICAgIGF3YWl0IGRldi5jbGVhbihvcHRpb25zLmNvbXBpbGVycyB8fCBhbGwsIG9wdGlvbnMubmV0d29ya3MgfHwgYWxsKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2V0Q29tbWFuZChkZXY6IERldiwgbmFtZXM6IHN0cmluZ1tdLCBvcHRpb25zOiBTZXROZXR3b3JrT3B0aW9ucykge1xuICAgIGF3YWl0IGRldi51cGRhdGVOZXR3b3JrQ29uZmlncyhkZXYubmV0d29ya3NPckFsbChuYW1lcyksIChjb25maWc6IE5ldHdvcmtDb25maWcpID0+IHtcbiAgICAgICAgaWYgKG9wdGlvbnMubmV3TmFtZSkge1xuICAgICAgICAgICAgY29uZmlnLm5hbWUgPSBvcHRpb25zLm5ld05hbWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMucG9ydCkge1xuICAgICAgICAgICAgY29uZmlnLmhvc3RQb3J0ID0gb3B0aW9ucy5wb3J0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmRiUG9ydCkge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZGJQb3J0ID09PSAnYmluZCcpIHtcbiAgICAgICAgICAgICAgICBjb25maWcuYXJhbmdvSG9zdFBvcnQgPSBOZXR3b3JrLmRlZmF1bHRBcmFuZ29Qb3J0O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmRiUG9ydCA9PT0gJ3VuYmluZCcpIHtcbiAgICAgICAgICAgICAgICBjb25maWcuYXJhbmdvSG9zdFBvcnQgPSAnJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLmFyYW5nb0hvc3RQb3J0ID0gb3B0aW9ucy5kYlBvcnQgfHwgJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gYWRkQ29tbWFuZChkZXY6IERldiwgbmFtZXM6IHN0cmluZ1tdKSB7XG4gICAgYXdhaXQgZGV2LmFkZE5ldHdvcmtzKG5hbWVzKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVtb3ZlQ29tbWFuZChkZXY6IERldiwgbmFtZXM6IHN0cmluZ1tdKSB7XG4gICAgYXdhaXQgZGV2LnJlbW92ZU5ldHdvcmtzKGRldi5uZXR3b3Jrc0Zyb21OYW1lcyhuYW1lcykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiB1c2VDb21tYW5kKGRldjogRGV2LCB2ZXJzaW9uOiBzdHJpbmcsIG9wdGlvbnM6IFVzZU9wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYudXNlVmVyc2lvbih2ZXJzaW9uLCBjb21waWxlcnNXaXRoTmV0d29ya3MoZGV2LCBvcHRpb25zKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNvbENvbW1hbmQoZGV2OiBEZXYsIGZpbGVzOiBzdHJpbmdbXSwgb3B0aW9uczogU29sT3B0aW9ucykge1xuICAgIGF3YWl0IFNvbGlkaXR5LmJ1aWxkKGRldiwgZmlsZXMsIHtcbiAgICAgICAgY2xpZW50TGFuZ3VhZ2VzOiAob3B0aW9ucy5jbGllbnRMYW5ndWFnZXMgfHwgJycpLnNwbGl0KCcsJyksXG4gICAgICAgIGNsaWVudExldmVsOiBvcHRpb25zLmNsaWVudExldmVsIHx8IENsaWVudENvZGVMZXZlbC5ydW4sXG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNweUNvbW1hbmQoZGV2OiBEZXYsIG5ldHdvcmtzOiBzdHJpbmdbXSkge1xuICAgIGF3YWl0IHNweShkZXYsIG5ldHdvcmtzKTtcbn1cblxuY29uc3Qgc2hhcmVkT3B0aW9ucyA9IHtcbiAgICBuOiBbJy1uLCAtLW5ldHdvcmtzIFtuYW1lc10nLCAnYXBwbHkgY29tbWFuZCB0byBzcGVjaWZpZWQgbmV0d29ya1tzXSAobmFtZXMgbXVzdCBiZSBzZXBhcmF0ZWQgd2l0aCBjb21tYSknXSxcbiAgICBtOiBbJy1tLCAtLWNvbXBpbGVycycsICdhcHBseSBjb21tYW5kIHRvIHRoZSBjb21waWxlcnMgY29udGFpbmVyJ10sXG59O1xuXG5hc3luYyBmdW5jdGlvbiBoYW5kbGVDb21tYW5kTGluZShkZXY6IERldiwgYXJnczogc3RyaW5nW10pIHtcbiAgICBsZXQgY29tbWFuZEFjdGlvbiA9IGluZm9Db21tYW5kO1xuICAgIGxldCBjb21tYW5kQXJncyA9IFtdO1xuXG4gICAgY29uc3QgY29tbWFuZCA9IChhY3Rpb24pID0+IHtcbiAgICAgICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICBjb21tYW5kQWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgY29tbWFuZEFyZ3MgPSBhcmdzO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5uYW1lKGRldi5uYW1lKVxuICAgICAgICAudmVyc2lvbihkZXYudmVyc2lvbilcbiAgICAgICAgLm9wdGlvbignLWEsIC0tYXZhaWxhYmxlJywgJ3Nob3cgYXZhaWxhYmxlIHZlcnNpb25zJylcbiAgICAgICAgLmRlc2NyaXB0aW9uKCdUT04gTGFicyBkZXZlbG9wbWVudCB0b29scycpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnaW5mbycpLmRlc2NyaXB0aW9uKCdTaG93IHN1bW1hcnkgYWJvdXQgZGV2IGVudmlyb25tZW50JylcbiAgICAgICAgLm9wdGlvbignLWEsIC0tYXZhaWxhYmxlJywgJ3Nob3cgYXZhaWxhYmxlIHZlcnNpb25zJylcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKGluZm9Db21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdzZXR1cCcpLmRlc2NyaXB0aW9uKCdTZXR1cCBkZXYgZW52aXJvbm1lbnQnKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubilcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm0pXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChzZXR1cENvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3N0YXJ0JykuZGVzY3JpcHRpb24oJ1N0YXJ0IGRldiBjb250YWluZXJzJylcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm4pXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5tKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoc3RhcnRDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdzdG9wJykuZGVzY3JpcHRpb24oJ1N0b3AgZGV2IGNvbnRhaW5lcnMnKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubilcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm0pXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChzdG9wQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgncmVzdGFydCcpLmRlc2NyaXB0aW9uKCdSZXN0YXJ0IGRldiBjb250YWluZXJzJylcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm4pXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5tKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQocmVzdGFydENvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3JlY3JlYXRlJykuZGVzY3JpcHRpb24oJ1JlY3JlYXRlIGRldiBjb250YWluZXJzJylcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm4pXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5tKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQocmVjcmVhdGVDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdjbGVhbicpLmRlc2NyaXB0aW9uKCdSZW1vdmUgZG9ja2VyIGNvbnRhaW5lcnMgYW5kIGltYWdlcyByZWxhdGVkIHRvIFRPTiBEZXYnKVxuICAgICAgICAub3B0aW9uKCctbiwgLS1uZXR3b3JrcycsICdjbGVhbiBjb21waWxlcnMgZG9ja2VyIGNvbnRhaW5lcnMgYW5kIGltYWdlcycpXG4gICAgICAgIC5vcHRpb24oJy1tLCAtLWNvbXBpbGVycycsICdjbGVhbiBsb2NhbCBub2RlIGRvY2tlciBjb250YWluZXJzIGFuZCBpbWFnZXMnKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoY2xlYW5Db21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCd1c2UgPHZlcnNpb24+JykuZGVzY3JpcHRpb24oJ1VzZSBzcGVjaWZpZWQgdmVyc2lvbiBmb3IgY29udGFpbmVycycpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHVzZUNvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3NldCBbbmV0d29yay4uLl0nKS5kZXNjcmlwdGlvbignU2V0IG5ldHdvcmtbc10gb3B0aW9ucycpXG4gICAgICAgIC5vcHRpb24oJy1wLCAtLXBvcnQgPHBvcnQ+JywgJ2hvc3QgcG9ydCB0byBib3VuZCBsb2NhbCBub2RlJylcbiAgICAgICAgLm9wdGlvbignLWQsIC0tZGItcG9ydCA8YmluZGluZz4nLCAnaG9zdCBwb3J0IHRvIGJvdW5kIGxvY2FsIG5vZGVzIEFyYW5nbyBEQiAoXCJiaW5kXCIgdG8gdXNlIGRlZmF1bHQgQXJhbmdvIERCIHBvcnQsIFwidW5iaW5kXCIgdG8gdW5iaW5kIEFyYW5nbyBEQiBwb3J0KScpXG4gICAgICAgIC5vcHRpb24oJy1uLCAtLW5ldy1uYW1lIDxuYW1lPicsICdzZXQgbmV3IG5hbWUgZm9yIG5ldHdvcmsnKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoc2V0Q29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnYWRkIFtuZXR3b3JrLi4uXScpLmRlc2NyaXB0aW9uKCdBZGQgbmV0d29ya1tzXScpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChhZGRDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdyZW1vdmUgW25ldHdvcmsuLi5dJykuYWxpYXMoJ3JtJykuZGVzY3JpcHRpb24oJ1JlbW92ZSBuZXR3b3JrW3NdJylcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHJlbW92ZUNvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3NvbCBbZmlsZXMuLi5dJykuZGVzY3JpcHRpb24oJ0J1aWxkIHNvbGlkaXR5IGNvbnRyYWN0W3NdJylcbiAgICAgICAgLm9wdGlvbignLWwsIC0tY2xpZW50LWxhbmd1YWdlcyA8bGFuZ3VhZ2VzPicsICdnZW5lcmF0ZSBjbGllbnQgY29kZSBmb3IgbGFuZ3VhZ2VzOiBcImpzXCIsIFwicnNcIiAobXVsdGlwbGUgbGFuZ3VhZ2VzIG11c3QgYmUgc2VwYXJhdGVkIHdpdGggY29tbWEpJylcbiAgICAgICAgLm9wdGlvbignLUwsIC0tY2xpZW50LWxldmVsIDxjbGllbnQtbGV2ZWw+JywgJ2NsaWVudCBjb2RlIGxldmVsOiBcInJ1blwiIHRvIHJ1biBvbmx5LCBcImRlcGxveVwiIHRvIHJ1biBhbmQgZGVwbG95IChpbmNsdWRlcyBhbiBpbWFnZUJhc2U2NCBvZiBiaW5hcnkgY29udHJhY3QpJylcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHNvbENvbW1hbmQpKTtcblxuICAgIC8vIHByb2dyYW1cbiAgICAvLyAgICAgLmNvbW1hbmQoJ3NweSBbbmV0d29ya3MuLi5dJykuZGVzY3JpcHRpb24oJ1J1biBuZXR3b3JrIHNjYW5uZXInKVxuICAgIC8vICAgICAuYWN0aW9uKGNvbW1hbmQoc3B5Q29tbWFuZCkpO1xuXG4gICAgLy8gLmNvbW1hbmQoJ3VwZGF0ZScsIGB1cGRhdGUgJHtkZXYubmFtZX0gZG9ja2VyIGltYWdlc2ApLmFjdGlvbihhY3Rpb24pXG5cbiAgICBwcm9ncmFtLnBhcnNlKGFyZ3MpO1xuXG4gICAgaWYgKGNvbW1hbmRBcmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBpZiAocHJvZ3JhbS5hcmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgYXdhaXQgaW5mb0NvbW1hbmQoZGV2LCBwcm9ncmFtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb2dyYW0ub3V0cHV0SGVscCgpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYXdhaXQgY29tbWFuZEFjdGlvbiguLi5bZGV2LCAuLi5jb21tYW5kQXJnc10pO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgaGFuZGxlQ29tbWFuZExpbmUgfTtcbiJdfQ==