"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleCommandLine = handleCommandLine;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _tonClientNodeJs = require("ton-client-node-js");

var _clientCode = require("../compilers/client-code");

var _solidity = require("../compilers/solidity");

var _dev2 = require("../dev");

var _networks = require("../networks/networks");

var _server = require("../server/server");

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
var USE_EXPERIMENTAL_FEATURES = false;

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
            return dev.clean(options.compilers || all, options.networks || all, options.containers);

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

function generateKeysCommand(_x20) {
  return _generateKeysCommand.apply(this, arguments);
}

function _generateKeysCommand() {
  _generateKeysCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee10(_dev) {
    var client, keys;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _tonClientNodeJs.TONClient.create({
              servers: ['http://localhost']
            });

          case 2:
            client = _context10.sent;
            _context10.next = 5;
            return client.crypto.ed25519Keypair();

          case 5:
            keys = _context10.sent;
            console.log(keys);

          case 7:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return _generateKeysCommand.apply(this, arguments);
}

function useCommand(_x21, _x22, _x23) {
  return _useCommand.apply(this, arguments);
}

function _useCommand() {
  _useCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee11(dev, version, options) {
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return dev.useVersion(version, (0, _options.compilersWithNetworks)(dev, options));

          case 2:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));
  return _useCommand.apply(this, arguments);
}

function solCommand(_x24, _x25, _x26) {
  return _solCommand.apply(this, arguments);
}

function _solCommand() {
  _solCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee12(dev, files, options) {
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return _solidity.Solidity.build(dev, files, {
              clientLanguages: (options.clientLanguages || '').split(','),
              clientLevel: options.clientLevel || _clientCode.ClientCodeLevel.run
            });

          case 2:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));
  return _solCommand.apply(this, arguments);
}

function genCommand(_x27, _x28, _x29) {
  return _genCommand.apply(this, arguments);
}

function _genCommand() {
  _genCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee13(dev, files, options) {
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return _clientCode.ClientCode.generate(files, {
              clientLanguages: (options.clientLanguages || '').split(','),
              clientLevel: options.clientLevel || _clientCode.ClientCodeLevel.run
            });

          case 2:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));
  return _genCommand.apply(this, arguments);
}

function spyCommand(_x30, _x31) {
  return _spyCommand.apply(this, arguments);
}

function _spyCommand() {
  _spyCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee14(dev, networks) {
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return (0, _spy.spy)(dev, networks);

          case 2:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));
  return _spyCommand.apply(this, arguments);
}

function webConsoleCommand(_x32, _x33) {
  return _webConsoleCommand.apply(this, arguments);
}

function _webConsoleCommand() {
  _webConsoleCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee15(dev, options) {
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return (0, _server.web)(dev, options);

          case 2:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }));
  return _webConsoleCommand.apply(this, arguments);
}

var sharedOptions = {
  n: ['-n, --networks [names]', 'apply command to specified network[s] (names must be separated with comma)'],
  m: ['-m, --compilers', 'apply command to the compilers container']
};

function handleCommandLine(_x34, _x35) {
  return _handleCommandLine.apply(this, arguments);
}

function _handleCommandLine() {
  _handleCommandLine = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee16(dev, args) {
    var _program$command$desc, _program$command$desc2, _program$command$desc3, _program$command$desc4, _program$command$desc5, _program$command$desc6, _program$command$desc7, _program$command$desc8, _program$command$desc9, _program$command$desc10, _program$command$desc11, _program$command$desc12;

    var commandAction, commandArgs, command, options;
    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
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
            program.command('info', {
              isDefault: true
            }).description('Show summary about dev environment').option('-a, --available', 'show available versions').action(command(_info.infoCommand));
            program.command('sol [files...]').description('Build solidity contract[s]').option('-l, --client-languages <languages>', 'generate client code for languages: "js", "rs" (multiple languages must be separated with comma)').option('-L, --client-level <client-level>', 'client code level: "run" to run only, "deploy" to run and deploy (includes an imageBase64 of binary contract)', 'deploy').action(command(solCommand));
            program.command('gen [files...]').description('Generate client code for contract[s]').option('-l, --client-languages <languages>', 'generate client code for languages: "js", "rs" (multiple languages must be separated with comma)').option('-L, --client-level <client-level>', 'client code level: "run" to run only, "deploy" to run and deploy (includes an imageBase64 of binary contract)', 'deploy').action(command(genCommand));

            (_program$command$desc = (_program$command$desc2 = program.command('start').description('Start dev containers')).option.apply(_program$command$desc2, (0, _toConsumableArray2["default"])(sharedOptions.n))).option.apply(_program$command$desc, (0, _toConsumableArray2["default"])(sharedOptions.m)).action(command(startCommand));

            (_program$command$desc3 = (_program$command$desc4 = program.command('stop').description('Stop dev containers')).option.apply(_program$command$desc4, (0, _toConsumableArray2["default"])(sharedOptions.n))).option.apply(_program$command$desc3, (0, _toConsumableArray2["default"])(sharedOptions.m)).action(command(stopCommand));

            (_program$command$desc5 = (_program$command$desc6 = program.command('restart').description('Restart dev containers')).option.apply(_program$command$desc6, (0, _toConsumableArray2["default"])(sharedOptions.n))).option.apply(_program$command$desc5, (0, _toConsumableArray2["default"])(sharedOptions.m)).action(command(restartCommand));

            (_program$command$desc7 = (_program$command$desc8 = program.command('recreate').description('Recreate dev containers')).option.apply(_program$command$desc8, (0, _toConsumableArray2["default"])(sharedOptions.n))).option.apply(_program$command$desc7, (0, _toConsumableArray2["default"])(sharedOptions.m)).action(command(recreateCommand));

            (_program$command$desc9 = (_program$command$desc10 = program.command('setup').description('Setup dev environment')).option.apply(_program$command$desc10, (0, _toConsumableArray2["default"])(sharedOptions.n))).option.apply(_program$command$desc9, (0, _toConsumableArray2["default"])(sharedOptions.m)).action(command(setupCommand));

            program.command('clean').description('Remove docker containers and images related to TON Dev').option('-n, --networks', 'clean local node docker containers and images').option('-m, --compilers', 'clean compilers docker containers and images').option('-c, --containers', 'clean containers only', false).action(command(cleanCommand));

            (_program$command$desc11 = (_program$command$desc12 = program.command('use <version>').description('Use specified version for containers')).option.apply(_program$command$desc12, (0, _toConsumableArray2["default"])(sharedOptions.n))).option.apply(_program$command$desc11, (0, _toConsumableArray2["default"])(sharedOptions.m)).action(command(useCommand));

            program.command('set [network...]').description('Set network[s] options').option('-p, --port <port>', 'host port to bound local node').option('-d, --db-port <binding>', 'host port to bound local nodes Arango DB ("bind" to use default Arango DB port, "unbind" to unbind Arango DB port)').option('-n, --new-name <name>', 'set new name for network').action(command(setCommand));
            program.command('add [network...]').description('Add network[s]').action(command(addCommand));
            program.command('remove [network...]').alias('rm').description('Remove network[s]').action(command(removeCommand));
            program.command('keys').alias('k').description('Generate random Key Pair').action(command(generateKeysCommand));

            if (USE_EXPERIMENTAL_FEATURES) {
              program.command('spy [networks...]').description('Run network scanner').action(command(spyCommand));
              program.command('web').description('Run web console').option('-p, --port <port>', 'host port to bound web console (default: 8800)', '8800').action(command(webConsoleCommand));
            } // .command('update', `update ${dev.name} docker images`).action(action)


            program.parse(args);

            if (!(commandArgs.length === 0)) {
              _context16.next = 29;
              break;
            }

            if (!(program.args.length === 0)) {
              _context16.next = 26;
              break;
            }

            _context16.next = 24;
            return (0, _info.infoCommand)(dev, program);

          case 24:
            _context16.next = 27;
            break;

          case 26:
            program.outputHelp();

          case 27:
            _context16.next = 32;
            break;

          case 29:
            if (commandAction === _info.infoCommand) {
              options = commandArgs[commandArgs.length - 1];
              options.available = options.parent.available;
            }

            _context16.next = 32;
            return commandAction.apply(void 0, [dev].concat((0, _toConsumableArray2["default"])(commandArgs)));

          case 32:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16);
  }));
  return _handleCommandLine.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvY2xpLmpzIl0sIm5hbWVzIjpbIlVTRV9FWFBFUklNRU5UQUxfRkVBVFVSRVMiLCJwcm9ncmFtIiwicmVxdWlyZSIsInNldHVwQ29tbWFuZCIsImRldiIsIm9wdGlvbnMiLCJzdGFydCIsInN0YXJ0Q29tbWFuZCIsInN0b3BDb21tYW5kIiwic3RvcCIsInJlc3RhcnRDb21tYW5kIiwicmVzdGFydCIsInJlY3JlYXRlQ29tbWFuZCIsInJlY3JlYXRlIiwiY2xlYW5Db21tYW5kIiwiYWxsIiwiY29tcGlsZXJzIiwibmV0d29ya3MiLCJjbGVhbiIsImNvbnRhaW5lcnMiLCJzZXRDb21tYW5kIiwibmFtZXMiLCJ1cGRhdGVOZXR3b3JrQ29uZmlncyIsIm5ldHdvcmtzT3JBbGwiLCJjb25maWciLCJuZXdOYW1lIiwibmFtZSIsInBvcnQiLCJob3N0UG9ydCIsImRiUG9ydCIsImFyYW5nb0hvc3RQb3J0IiwiTmV0d29yayIsImRlZmF1bHRBcmFuZ29Qb3J0IiwiYWRkQ29tbWFuZCIsImFkZE5ldHdvcmtzIiwicmVtb3ZlQ29tbWFuZCIsInJlbW92ZU5ldHdvcmtzIiwibmV0d29ya3NGcm9tTmFtZXMiLCJnZW5lcmF0ZUtleXNDb21tYW5kIiwiX2RldiIsIlRPTkNsaWVudCIsImNyZWF0ZSIsInNlcnZlcnMiLCJjbGllbnQiLCJjcnlwdG8iLCJlZDI1NTE5S2V5cGFpciIsImtleXMiLCJjb25zb2xlIiwibG9nIiwidXNlQ29tbWFuZCIsInZlcnNpb24iLCJ1c2VWZXJzaW9uIiwic29sQ29tbWFuZCIsImZpbGVzIiwiU29saWRpdHkiLCJidWlsZCIsImNsaWVudExhbmd1YWdlcyIsInNwbGl0IiwiY2xpZW50TGV2ZWwiLCJDbGllbnRDb2RlTGV2ZWwiLCJydW4iLCJnZW5Db21tYW5kIiwiQ2xpZW50Q29kZSIsImdlbmVyYXRlIiwic3B5Q29tbWFuZCIsIndlYkNvbnNvbGVDb21tYW5kIiwic2hhcmVkT3B0aW9ucyIsIm4iLCJtIiwiaGFuZGxlQ29tbWFuZExpbmUiLCJhcmdzIiwiY29tbWFuZEFjdGlvbiIsImluZm9Db21tYW5kIiwiY29tbWFuZEFyZ3MiLCJjb21tYW5kIiwiYWN0aW9uIiwib3B0aW9uIiwiZGVzY3JpcHRpb24iLCJpc0RlZmF1bHQiLCJhbGlhcyIsInBhcnNlIiwibGVuZ3RoIiwib3V0cHV0SGVscCIsImF2YWlsYWJsZSIsInBhcmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQVdBOztBQUNBOztBQW5DQTs7Ozs7Ozs7Ozs7Ozs7QUFxQ0EsSUFBTUEseUJBQXlCLEdBQUcsS0FBbEM7O0FBRUEsSUFBTUMsT0FBTyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUF2Qjs7U0FHZUMsWTs7Ozs7OzsrQkFBZixpQkFBNEJDLEdBQTVCLEVBQXNDQyxPQUF0QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFDVUQsR0FBRyxDQUFDRSxLQUFKLENBQVUsb0NBQXNCRixHQUF0QixFQUEyQkMsT0FBM0IsQ0FBVixDQURWOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7U0FLZUUsWTs7Ozs7OzsrQkFBZixrQkFBNEJILEdBQTVCLEVBQXNDQyxPQUF0QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFDVUQsR0FBRyxDQUFDRSxLQUFKLENBQVUsb0NBQXNCRixHQUF0QixFQUEyQkMsT0FBM0IsQ0FBVixDQURWOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7U0FJZUcsVzs7Ozs7OzsrQkFBZixrQkFBMkJKLEdBQTNCLEVBQXFDQyxPQUFyQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFDVUQsR0FBRyxDQUFDSyxJQUFKLENBQVMsb0NBQXNCTCxHQUF0QixFQUEyQkMsT0FBM0IsQ0FBVCxDQURWOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7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Q0FBc0JxRSxXQUF0QixHQXhJZDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuLy8gQGZsb3dcblxuaW1wb3J0IHsgVE9OQ2xpZW50IH0gZnJvbSBcInRvbi1jbGllbnQtbm9kZS1qc1wiO1xuaW1wb3J0IHsgQ2xpZW50Q29kZSwgQ2xpZW50Q29kZUxldmVsIH0gZnJvbSBcIi4uL2NvbXBpbGVycy9jbGllbnQtY29kZVwiO1xuaW1wb3J0IHsgU29saWRpdHkgfSBmcm9tIFwiLi4vY29tcGlsZXJzL3NvbGlkaXR5XCI7XG5pbXBvcnQgeyBEZXYgfSBmcm9tIFwiLi4vZGV2XCI7XG5pbXBvcnQgeyBOZXR3b3JrIH0gZnJvbSBcIi4uL25ldHdvcmtzL25ldHdvcmtzXCI7XG5pbXBvcnQgdHlwZSB7IE5ldHdvcmtDb25maWcgfSBmcm9tIFwiLi4vbmV0d29ya3MvbmV0d29ya3NcIjtcbmltcG9ydCB7IHdlYiB9IGZyb20gXCIuLi9zZXJ2ZXIvc2VydmVyXCI7XG5pbXBvcnQgeyBjb21waWxlcnNXaXRoTmV0d29ya3MgfSBmcm9tIFwiLi9vcHRpb25zXCI7XG5pbXBvcnQgdHlwZSB7XG4gICAgQ2xlYW5PcHRpb25zLFxuICAgIFJlY3JlYXRlT3B0aW9ucyxcbiAgICBSZXN0YXJ0T3B0aW9ucywgU2V0TmV0d29ya09wdGlvbnMsXG4gICAgU2V0dXBPcHRpb25zLCBTb2xPcHRpb25zLFxuICAgIFN0YXJ0T3B0aW9ucyxcbiAgICBTdG9wT3B0aW9ucyxcbiAgICBVc2VPcHRpb25zLCBXZWJPcHRpb25zXG59IGZyb20gXCIuL29wdGlvbnNcIjtcblxuaW1wb3J0IHsgaW5mb0NvbW1hbmQgfSBmcm9tIFwiLi9pbmZvLmpzXCI7XG5pbXBvcnQgeyBzcHkgfSBmcm9tIFwiLi9zcHlcIjtcblxuY29uc3QgVVNFX0VYUEVSSU1FTlRBTF9GRUFUVVJFUyA9IGZhbHNlO1xuXG5jb25zdCBwcm9ncmFtID0gcmVxdWlyZSgnY29tbWFuZGVyJyk7XG5cblxuYXN5bmMgZnVuY3Rpb24gc2V0dXBDb21tYW5kKGRldjogRGV2LCBvcHRpb25zOiBTZXR1cE9wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYuc3RhcnQoY29tcGlsZXJzV2l0aE5ldHdvcmtzKGRldiwgb3B0aW9ucykpO1xufVxuXG5cbmFzeW5jIGZ1bmN0aW9uIHN0YXJ0Q29tbWFuZChkZXY6IERldiwgb3B0aW9uczogU3RhcnRPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnN0YXJ0KGNvbXBpbGVyc1dpdGhOZXR3b3JrcyhkZXYsIG9wdGlvbnMpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc3RvcENvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IFN0b3BPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnN0b3AoY29tcGlsZXJzV2l0aE5ldHdvcmtzKGRldiwgb3B0aW9ucykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZXN0YXJ0Q29tbWFuZChkZXY6IERldiwgb3B0aW9uczogUmVzdGFydE9wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYucmVzdGFydChjb21waWxlcnNXaXRoTmV0d29ya3MoZGV2LCBvcHRpb25zKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlY3JlYXRlQ29tbWFuZChkZXY6IERldiwgb3B0aW9uczogUmVjcmVhdGVPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnJlY3JlYXRlKGNvbXBpbGVyc1dpdGhOZXR3b3JrcyhkZXYsIG9wdGlvbnMpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY2xlYW5Db21tYW5kKGRldjogRGV2LCBvcHRpb25zOiBDbGVhbk9wdGlvbnMpIHtcbiAgICBjb25zdCBhbGwgPSAhb3B0aW9ucy5jb21waWxlcnMgJiYgIW9wdGlvbnMubmV0d29ya3M7XG4gICAgYXdhaXQgZGV2LmNsZWFuKG9wdGlvbnMuY29tcGlsZXJzIHx8IGFsbCwgb3B0aW9ucy5uZXR3b3JrcyB8fCBhbGwsIG9wdGlvbnMuY29udGFpbmVycyk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNldENvbW1hbmQoZGV2OiBEZXYsIG5hbWVzOiBzdHJpbmdbXSwgb3B0aW9uczogU2V0TmV0d29ya09wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYudXBkYXRlTmV0d29ya0NvbmZpZ3MoZGV2Lm5ldHdvcmtzT3JBbGwobmFtZXMpLCAoY29uZmlnOiBOZXR3b3JrQ29uZmlnKSA9PiB7XG4gICAgICAgIGlmIChvcHRpb25zLm5ld05hbWUpIHtcbiAgICAgICAgICAgIGNvbmZpZy5uYW1lID0gb3B0aW9ucy5uZXdOYW1lO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLnBvcnQpIHtcbiAgICAgICAgICAgIGNvbmZpZy5ob3N0UG9ydCA9IG9wdGlvbnMucG9ydDtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5kYlBvcnQpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmRiUG9ydCA9PT0gJ2JpbmQnKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLmFyYW5nb0hvc3RQb3J0ID0gTmV0d29yay5kZWZhdWx0QXJhbmdvUG9ydDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5kYlBvcnQgPT09ICd1bmJpbmQnKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLmFyYW5nb0hvc3RQb3J0ID0gJyc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbmZpZy5hcmFuZ29Ib3N0UG9ydCA9IG9wdGlvbnMuZGJQb3J0IHx8ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGFkZENvbW1hbmQoZGV2OiBEZXYsIG5hbWVzOiBzdHJpbmdbXSkge1xuICAgIGF3YWl0IGRldi5hZGROZXR3b3JrcyhuYW1lcyk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlbW92ZUNvbW1hbmQoZGV2OiBEZXYsIG5hbWVzOiBzdHJpbmdbXSkge1xuICAgIGF3YWl0IGRldi5yZW1vdmVOZXR3b3JrcyhkZXYubmV0d29ya3NGcm9tTmFtZXMobmFtZXMpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGVLZXlzQ29tbWFuZChfZGV2OiBEZXYpIHtcbiAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBUT05DbGllbnQuY3JlYXRlKHtcbiAgICAgICAgc2VydmVyczogWydodHRwOi8vbG9jYWxob3N0J11cbiAgICB9KTtcbiAgICBjb25zdCBrZXlzID0gYXdhaXQgY2xpZW50LmNyeXB0by5lZDI1NTE5S2V5cGFpcigpO1xuICAgIGNvbnNvbGUubG9nKGtleXMpO1xufVxuXG5hc3luYyBmdW5jdGlvbiB1c2VDb21tYW5kKGRldjogRGV2LCB2ZXJzaW9uOiBzdHJpbmcsIG9wdGlvbnM6IFVzZU9wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYudXNlVmVyc2lvbih2ZXJzaW9uLCBjb21waWxlcnNXaXRoTmV0d29ya3MoZGV2LCBvcHRpb25zKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNvbENvbW1hbmQoZGV2OiBEZXYsIGZpbGVzOiBzdHJpbmdbXSwgb3B0aW9uczogU29sT3B0aW9ucykge1xuICAgIGF3YWl0IFNvbGlkaXR5LmJ1aWxkKGRldiwgZmlsZXMsIHtcbiAgICAgICAgY2xpZW50TGFuZ3VhZ2VzOiAob3B0aW9ucy5jbGllbnRMYW5ndWFnZXMgfHwgJycpLnNwbGl0KCcsJyksXG4gICAgICAgIGNsaWVudExldmVsOiBvcHRpb25zLmNsaWVudExldmVsIHx8IENsaWVudENvZGVMZXZlbC5ydW4sXG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdlbkNvbW1hbmQoZGV2OiBEZXYsIGZpbGVzOiBzdHJpbmdbXSwgb3B0aW9uczogU29sT3B0aW9ucykge1xuICAgIGF3YWl0IENsaWVudENvZGUuZ2VuZXJhdGUoZmlsZXMsIHtcbiAgICAgICAgY2xpZW50TGFuZ3VhZ2VzOiAob3B0aW9ucy5jbGllbnRMYW5ndWFnZXMgfHwgJycpLnNwbGl0KCcsJyksXG4gICAgICAgIGNsaWVudExldmVsOiBvcHRpb25zLmNsaWVudExldmVsIHx8IENsaWVudENvZGVMZXZlbC5ydW4sXG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNweUNvbW1hbmQoZGV2OiBEZXYsIG5ldHdvcmtzOiBzdHJpbmdbXSkge1xuICAgIGF3YWl0IHNweShkZXYsIG5ldHdvcmtzKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gd2ViQ29uc29sZUNvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IFdlYk9wdGlvbnMpIHtcbiAgICBhd2FpdCB3ZWIoZGV2LCBvcHRpb25zKTtcbn1cblxuY29uc3Qgc2hhcmVkT3B0aW9ucyA9IHtcbiAgICBuOiBbJy1uLCAtLW5ldHdvcmtzIFtuYW1lc10nLCAnYXBwbHkgY29tbWFuZCB0byBzcGVjaWZpZWQgbmV0d29ya1tzXSAobmFtZXMgbXVzdCBiZSBzZXBhcmF0ZWQgd2l0aCBjb21tYSknXSxcbiAgICBtOiBbJy1tLCAtLWNvbXBpbGVycycsICdhcHBseSBjb21tYW5kIHRvIHRoZSBjb21waWxlcnMgY29udGFpbmVyJ10sXG59O1xuXG5hc3luYyBmdW5jdGlvbiBoYW5kbGVDb21tYW5kTGluZShkZXY6IERldiwgYXJnczogc3RyaW5nW10pIHtcbiAgICBsZXQgY29tbWFuZEFjdGlvbiA9IGluZm9Db21tYW5kO1xuICAgIGxldCBjb21tYW5kQXJncyA9IFtdO1xuXG4gICAgY29uc3QgY29tbWFuZCA9IChhY3Rpb24pID0+IHtcbiAgICAgICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICBjb21tYW5kQWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgY29tbWFuZEFyZ3MgPSBhcmdzO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5uYW1lKGRldi5uYW1lKVxuICAgICAgICAudmVyc2lvbihkZXYudmVyc2lvbilcbiAgICAgICAgLm9wdGlvbignLWEsIC0tYXZhaWxhYmxlJywgJ3Nob3cgYXZhaWxhYmxlIHZlcnNpb25zJylcbiAgICAgICAgLmRlc2NyaXB0aW9uKCdUT04gTGFicyBkZXZlbG9wbWVudCB0b29scycpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnaW5mbycsIHsgaXNEZWZhdWx0OiB0cnVlIH0pLmRlc2NyaXB0aW9uKCdTaG93IHN1bW1hcnkgYWJvdXQgZGV2IGVudmlyb25tZW50JylcbiAgICAgICAgLm9wdGlvbignLWEsIC0tYXZhaWxhYmxlJywgJ3Nob3cgYXZhaWxhYmxlIHZlcnNpb25zJylcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKGluZm9Db21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdzb2wgW2ZpbGVzLi4uXScpLmRlc2NyaXB0aW9uKCdCdWlsZCBzb2xpZGl0eSBjb250cmFjdFtzXScpXG4gICAgICAgIC5vcHRpb24oXG4gICAgICAgICAgICAnLWwsIC0tY2xpZW50LWxhbmd1YWdlcyA8bGFuZ3VhZ2VzPicsXG4gICAgICAgICAgICAnZ2VuZXJhdGUgY2xpZW50IGNvZGUgZm9yIGxhbmd1YWdlczogXCJqc1wiLCBcInJzXCIgKG11bHRpcGxlIGxhbmd1YWdlcyBtdXN0IGJlIHNlcGFyYXRlZCB3aXRoIGNvbW1hKSdcbiAgICAgICAgKVxuICAgICAgICAub3B0aW9uKFxuICAgICAgICAgICAgJy1MLCAtLWNsaWVudC1sZXZlbCA8Y2xpZW50LWxldmVsPicsXG4gICAgICAgICAgICAnY2xpZW50IGNvZGUgbGV2ZWw6IFwicnVuXCIgdG8gcnVuIG9ubHksIFwiZGVwbG95XCIgdG8gcnVuIGFuZCBkZXBsb3kgKGluY2x1ZGVzIGFuIGltYWdlQmFzZTY0IG9mIGJpbmFyeSBjb250cmFjdCknLFxuICAgICAgICAgICAgJ2RlcGxveSdcbiAgICAgICAgKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoc29sQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnZ2VuIFtmaWxlcy4uLl0nKS5kZXNjcmlwdGlvbignR2VuZXJhdGUgY2xpZW50IGNvZGUgZm9yIGNvbnRyYWN0W3NdJylcbiAgICAgICAgLm9wdGlvbihcbiAgICAgICAgICAgICctbCwgLS1jbGllbnQtbGFuZ3VhZ2VzIDxsYW5ndWFnZXM+JyxcbiAgICAgICAgICAgICdnZW5lcmF0ZSBjbGllbnQgY29kZSBmb3IgbGFuZ3VhZ2VzOiBcImpzXCIsIFwicnNcIiAobXVsdGlwbGUgbGFuZ3VhZ2VzIG11c3QgYmUgc2VwYXJhdGVkIHdpdGggY29tbWEpJ1xuICAgICAgICApXG4gICAgICAgIC5vcHRpb24oXG4gICAgICAgICAgICAnLUwsIC0tY2xpZW50LWxldmVsIDxjbGllbnQtbGV2ZWw+JyxcbiAgICAgICAgICAgICdjbGllbnQgY29kZSBsZXZlbDogXCJydW5cIiB0byBydW4gb25seSwgXCJkZXBsb3lcIiB0byBydW4gYW5kIGRlcGxveSAoaW5jbHVkZXMgYW4gaW1hZ2VCYXNlNjQgb2YgYmluYXJ5IGNvbnRyYWN0KScsXG4gICAgICAgICAgICAnZGVwbG95J1xuICAgICAgICApXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChnZW5Db21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdzdGFydCcpLmRlc2NyaXB0aW9uKCdTdGFydCBkZXYgY29udGFpbmVycycpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHN0YXJ0Q29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnc3RvcCcpLmRlc2NyaXB0aW9uKCdTdG9wIGRldiBjb250YWluZXJzJylcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm4pXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5tKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoc3RvcENvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3Jlc3RhcnQnKS5kZXNjcmlwdGlvbignUmVzdGFydCBkZXYgY29udGFpbmVycycpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHJlc3RhcnRDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdyZWNyZWF0ZScpLmRlc2NyaXB0aW9uKCdSZWNyZWF0ZSBkZXYgY29udGFpbmVycycpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHJlY3JlYXRlQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnc2V0dXAnKS5kZXNjcmlwdGlvbignU2V0dXAgZGV2IGVudmlyb25tZW50JylcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm4pXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5tKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoc2V0dXBDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdjbGVhbicpLmRlc2NyaXB0aW9uKCdSZW1vdmUgZG9ja2VyIGNvbnRhaW5lcnMgYW5kIGltYWdlcyByZWxhdGVkIHRvIFRPTiBEZXYnKVxuICAgICAgICAub3B0aW9uKCctbiwgLS1uZXR3b3JrcycsICdjbGVhbiBsb2NhbCBub2RlIGRvY2tlciBjb250YWluZXJzIGFuZCBpbWFnZXMnKVxuICAgICAgICAub3B0aW9uKCctbSwgLS1jb21waWxlcnMnLCAnY2xlYW4gY29tcGlsZXJzIGRvY2tlciBjb250YWluZXJzIGFuZCBpbWFnZXMnKVxuICAgICAgICAub3B0aW9uKCctYywgLS1jb250YWluZXJzJywgJ2NsZWFuIGNvbnRhaW5lcnMgb25seScsIGZhbHNlKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoY2xlYW5Db21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCd1c2UgPHZlcnNpb24+JykuZGVzY3JpcHRpb24oJ1VzZSBzcGVjaWZpZWQgdmVyc2lvbiBmb3IgY29udGFpbmVycycpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHVzZUNvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3NldCBbbmV0d29yay4uLl0nKS5kZXNjcmlwdGlvbignU2V0IG5ldHdvcmtbc10gb3B0aW9ucycpXG4gICAgICAgIC5vcHRpb24oJy1wLCAtLXBvcnQgPHBvcnQ+JywgJ2hvc3QgcG9ydCB0byBib3VuZCBsb2NhbCBub2RlJylcbiAgICAgICAgLm9wdGlvbignLWQsIC0tZGItcG9ydCA8YmluZGluZz4nLCAnaG9zdCBwb3J0IHRvIGJvdW5kIGxvY2FsIG5vZGVzIEFyYW5nbyBEQiAoXCJiaW5kXCIgdG8gdXNlIGRlZmF1bHQgQXJhbmdvIERCIHBvcnQsIFwidW5iaW5kXCIgdG8gdW5iaW5kIEFyYW5nbyBEQiBwb3J0KScpXG4gICAgICAgIC5vcHRpb24oJy1uLCAtLW5ldy1uYW1lIDxuYW1lPicsICdzZXQgbmV3IG5hbWUgZm9yIG5ldHdvcmsnKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoc2V0Q29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnYWRkIFtuZXR3b3JrLi4uXScpLmRlc2NyaXB0aW9uKCdBZGQgbmV0d29ya1tzXScpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChhZGRDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdyZW1vdmUgW25ldHdvcmsuLi5dJykuYWxpYXMoJ3JtJykuZGVzY3JpcHRpb24oJ1JlbW92ZSBuZXR3b3JrW3NdJylcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHJlbW92ZUNvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ2tleXMnKS5hbGlhcygnaycpLmRlc2NyaXB0aW9uKCdHZW5lcmF0ZSByYW5kb20gS2V5IFBhaXInKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoZ2VuZXJhdGVLZXlzQ29tbWFuZCkpO1xuXG4gICAgaWYgKFVTRV9FWFBFUklNRU5UQUxfRkVBVFVSRVMpIHtcbiAgICAgICAgcHJvZ3JhbVxuICAgICAgICAgICAgLmNvbW1hbmQoJ3NweSBbbmV0d29ya3MuLi5dJykuZGVzY3JpcHRpb24oJ1J1biBuZXR3b3JrIHNjYW5uZXInKVxuICAgICAgICAgICAgLmFjdGlvbihjb21tYW5kKHNweUNvbW1hbmQpKTtcblxuICAgICAgICBwcm9ncmFtXG4gICAgICAgICAgICAuY29tbWFuZCgnd2ViJykuZGVzY3JpcHRpb24oJ1J1biB3ZWIgY29uc29sZScpXG4gICAgICAgICAgICAub3B0aW9uKCctcCwgLS1wb3J0IDxwb3J0PicsICdob3N0IHBvcnQgdG8gYm91bmQgd2ViIGNvbnNvbGUgKGRlZmF1bHQ6IDg4MDApJywgJzg4MDAnKVxuICAgICAgICAgICAgLmFjdGlvbihjb21tYW5kKHdlYkNvbnNvbGVDb21tYW5kKSk7XG4gICAgfVxuXG4gICAgLy8gLmNvbW1hbmQoJ3VwZGF0ZScsIGB1cGRhdGUgJHtkZXYubmFtZX0gZG9ja2VyIGltYWdlc2ApLmFjdGlvbihhY3Rpb24pXG5cbiAgICBwcm9ncmFtLnBhcnNlKGFyZ3MpO1xuXG4gICAgaWYgKGNvbW1hbmRBcmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBpZiAocHJvZ3JhbS5hcmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgYXdhaXQgaW5mb0NvbW1hbmQoZGV2LCBwcm9ncmFtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb2dyYW0ub3V0cHV0SGVscCgpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGNvbW1hbmRBY3Rpb24gPT09IGluZm9Db21tYW5kKSB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0gY29tbWFuZEFyZ3NbY29tbWFuZEFyZ3MubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBvcHRpb25zLmF2YWlsYWJsZSA9IG9wdGlvbnMucGFyZW50LmF2YWlsYWJsZTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBjb21tYW5kQWN0aW9uKGRldiwgLi4uY29tbWFuZEFyZ3MpO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgaGFuZGxlQ29tbWFuZExpbmUgfTtcbiJdfQ==