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

var sharedOptions = {
  n: ['-n, --networks [names]', 'apply command to specified network[s] (names must be separated with comma)'],
  m: ['-m, --compilers', 'apply command to the compilers container']
};

function handleCommandLine(_x32, _x33) {
  return _handleCommandLine.apply(this, arguments);
}

function _handleCommandLine() {
  _handleCommandLine = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee15(dev, args) {
    var _program$command$desc, _program$command$desc2, _program$command$desc3, _program$command$desc4, _program$command$desc5, _program$command$desc6, _program$command$desc7, _program$command$desc8, _program$command$desc9, _program$command$desc10, _program$command$desc11, _program$command$desc12;

    var commandAction, commandArgs, command;
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
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
            program.command('spy [networks...]').description('Run network scanner').action(command(spyCommand)); // .command('update', `update ${dev.name} docker images`).action(action)

            program.parse(args);

            if (!(commandArgs.length === 0)) {
              _context15.next = 29;
              break;
            }

            if (!(program.args.length === 0)) {
              _context15.next = 26;
              break;
            }

            _context15.next = 24;
            return (0, _info.infoCommand)(dev, program);

          case 24:
            _context15.next = 27;
            break;

          case 26:
            program.outputHelp();

          case 27:
            _context15.next = 31;
            break;

          case 29:
            _context15.next = 31;
            return commandAction.apply(void 0, [dev].concat((0, _toConsumableArray2["default"])(commandArgs)));

          case 31:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }));
  return _handleCommandLine.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvY2xpLmpzIl0sIm5hbWVzIjpbInByb2dyYW0iLCJyZXF1aXJlIiwic2V0dXBDb21tYW5kIiwiZGV2Iiwib3B0aW9ucyIsInN0YXJ0Iiwic3RhcnRDb21tYW5kIiwic3RvcENvbW1hbmQiLCJzdG9wIiwicmVzdGFydENvbW1hbmQiLCJyZXN0YXJ0IiwicmVjcmVhdGVDb21tYW5kIiwicmVjcmVhdGUiLCJjbGVhbkNvbW1hbmQiLCJhbGwiLCJjb21waWxlcnMiLCJuZXR3b3JrcyIsImNsZWFuIiwiY29udGFpbmVycyIsInNldENvbW1hbmQiLCJuYW1lcyIsInVwZGF0ZU5ldHdvcmtDb25maWdzIiwibmV0d29ya3NPckFsbCIsImNvbmZpZyIsIm5ld05hbWUiLCJuYW1lIiwicG9ydCIsImhvc3RQb3J0IiwiZGJQb3J0IiwiYXJhbmdvSG9zdFBvcnQiLCJOZXR3b3JrIiwiZGVmYXVsdEFyYW5nb1BvcnQiLCJhZGRDb21tYW5kIiwiYWRkTmV0d29ya3MiLCJyZW1vdmVDb21tYW5kIiwicmVtb3ZlTmV0d29ya3MiLCJuZXR3b3Jrc0Zyb21OYW1lcyIsImdlbmVyYXRlS2V5c0NvbW1hbmQiLCJfZGV2IiwiVE9OQ2xpZW50IiwiY3JlYXRlIiwic2VydmVycyIsImNsaWVudCIsImNyeXB0byIsImVkMjU1MTlLZXlwYWlyIiwia2V5cyIsImNvbnNvbGUiLCJsb2ciLCJ1c2VDb21tYW5kIiwidmVyc2lvbiIsInVzZVZlcnNpb24iLCJzb2xDb21tYW5kIiwiZmlsZXMiLCJTb2xpZGl0eSIsImJ1aWxkIiwiY2xpZW50TGFuZ3VhZ2VzIiwic3BsaXQiLCJjbGllbnRMZXZlbCIsIkNsaWVudENvZGVMZXZlbCIsInJ1biIsImdlbkNvbW1hbmQiLCJDbGllbnRDb2RlIiwiZ2VuZXJhdGUiLCJzcHlDb21tYW5kIiwic2hhcmVkT3B0aW9ucyIsIm4iLCJtIiwiaGFuZGxlQ29tbWFuZExpbmUiLCJhcmdzIiwiY29tbWFuZEFjdGlvbiIsImluZm9Db21tYW5kIiwiY29tbWFuZEFyZ3MiLCJjb21tYW5kIiwiYWN0aW9uIiwib3B0aW9uIiwiZGVzY3JpcHRpb24iLCJhbGlhcyIsInBhcnNlIiwibGVuZ3RoIiwib3V0cHV0SGVscCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQVdBOztBQUNBOztBQWxDQTs7Ozs7Ozs7Ozs7Ozs7QUFvQ0EsSUFBTUEsT0FBTyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUF2Qjs7U0FHZUMsWTs7Ozs7OzsrQkFBZixpQkFBNEJDLEdBQTVCLEVBQXNDQyxPQUF0QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFDVUQsR0FBRyxDQUFDRSxLQUFKLENBQVUsb0NBQXNCRixHQUF0QixFQUEyQkMsT0FBM0IsQ0FBVixDQURWOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7U0FLZUUsWTs7Ozs7OzsrQkFBZixrQkFBNEJILEdBQTVCLEVBQXNDQyxPQUF0QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFDVUQsR0FBRyxDQUFDRSxLQUFKLENBQVUsb0NBQXNCRixHQUF0QixFQUEyQkMsT0FBM0IsQ0FBVixDQURWOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7U0FJZUcsVzs7Ozs7OzsrQkFBZixrQkFBMkJKLEdBQTNCLEVBQXFDQyxPQUFyQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFDVUQsR0FBRyxDQUFDSyxJQUFKLENBQVMsb0NBQXNCTCxHQUF0QixFQUEyQkMsT0FBM0IsQ0FBVCxDQURWOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7U0FJZUssYzs7Ozs7OzsrQkFBZixrQkFBOEJOLEdBQTlCLEVBQXdDQyxPQUF4QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFDVUQsR0FBRyxDQUFDTyxPQUFKLENBQVksb0NBQXNCUCxH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TyxDQUFDb0UsSUFBUixDQUFhVSxNQUFiLEtBQXdCLENBdkhwQztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLG1CQXdIa0IsdUJBQVkzRSxHQUFaLEVBQWlCSCxPQUFqQixDQXhIbEI7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBMEhZQSxZQUFBQSxPQUFPLENBQUMrRSxVQUFSOztBQTFIWjtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLG1CQTZIY1YsYUFBYSxNQUFiLFVBQWtCbEUsR0FBbEIsNkNBQTBCb0UsV0FBMUIsR0E3SGQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOC0yMDE5IFRPTiBERVYgU09MVVRJT05TIExURC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgU09GVFdBUkUgRVZBTFVBVElPTiBMaWNlbnNlICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbiAqIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxuICogTGljZW5zZSBhdDogaHR0cHM6Ly93d3cudG9uLmRldi9saWNlbnNlc1xuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgVE9OIERFViBzb2Z0d2FyZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbi8vIEBmbG93XG5cbmltcG9ydCB7IFRPTkNsaWVudCB9IGZyb20gXCJ0b24tY2xpZW50LW5vZGUtanNcIjtcbmltcG9ydCB7IENsaWVudENvZGUsIENsaWVudENvZGVMZXZlbCB9IGZyb20gXCIuLi9jb21waWxlcnMvY2xpZW50LWNvZGVcIjtcbmltcG9ydCB7IFNvbGlkaXR5IH0gZnJvbSBcIi4uL2NvbXBpbGVycy9zb2xpZGl0eVwiO1xuaW1wb3J0IHsgRGV2IH0gZnJvbSBcIi4uL2RldlwiO1xuaW1wb3J0IHsgTmV0d29yayB9IGZyb20gXCIuLi9uZXR3b3Jrcy9uZXR3b3Jrc1wiO1xuaW1wb3J0IHR5cGUgeyBOZXR3b3JrQ29uZmlnIH0gZnJvbSBcIi4uL25ldHdvcmtzL25ldHdvcmtzXCI7XG5pbXBvcnQgeyBjb21waWxlcnNXaXRoTmV0d29ya3MgfSBmcm9tIFwiLi9vcHRpb25zXCI7XG5pbXBvcnQgdHlwZSB7XG4gICAgQ2xlYW5PcHRpb25zLFxuICAgIFJlY3JlYXRlT3B0aW9ucyxcbiAgICBSZXN0YXJ0T3B0aW9ucywgU2V0TmV0d29ya09wdGlvbnMsXG4gICAgU2V0dXBPcHRpb25zLCBTb2xPcHRpb25zLFxuICAgIFN0YXJ0T3B0aW9ucyxcbiAgICBTdG9wT3B0aW9ucyxcbiAgICBVc2VPcHRpb25zXG59IGZyb20gXCIuL29wdGlvbnNcIjtcblxuaW1wb3J0IHsgaW5mb0NvbW1hbmQgfSBmcm9tIFwiLi9pbmZvLmpzXCI7XG5pbXBvcnQgeyBzcHkgfSBmcm9tIFwiLi9zcHlcIjtcblxuY29uc3QgcHJvZ3JhbSA9IHJlcXVpcmUoJ2NvbW1hbmRlcicpO1xuXG5cbmFzeW5jIGZ1bmN0aW9uIHNldHVwQ29tbWFuZChkZXY6IERldiwgb3B0aW9uczogU2V0dXBPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnN0YXJ0KGNvbXBpbGVyc1dpdGhOZXR3b3JrcyhkZXYsIG9wdGlvbnMpKTtcbn1cblxuXG5hc3luYyBmdW5jdGlvbiBzdGFydENvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IFN0YXJ0T3B0aW9ucykge1xuICAgIGF3YWl0IGRldi5zdGFydChjb21waWxlcnNXaXRoTmV0d29ya3MoZGV2LCBvcHRpb25zKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHN0b3BDb21tYW5kKGRldjogRGV2LCBvcHRpb25zOiBTdG9wT3B0aW9ucykge1xuICAgIGF3YWl0IGRldi5zdG9wKGNvbXBpbGVyc1dpdGhOZXR3b3JrcyhkZXYsIG9wdGlvbnMpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVzdGFydENvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IFJlc3RhcnRPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnJlc3RhcnQoY29tcGlsZXJzV2l0aE5ldHdvcmtzKGRldiwgb3B0aW9ucykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZWNyZWF0ZUNvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IFJlY3JlYXRlT3B0aW9ucykge1xuICAgIGF3YWl0IGRldi5yZWNyZWF0ZShjb21waWxlcnNXaXRoTmV0d29ya3MoZGV2LCBvcHRpb25zKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNsZWFuQ29tbWFuZChkZXY6IERldiwgb3B0aW9uczogQ2xlYW5PcHRpb25zKSB7XG4gICAgY29uc3QgYWxsID0gIW9wdGlvbnMuY29tcGlsZXJzICYmICFvcHRpb25zLm5ldHdvcmtzO1xuICAgIGF3YWl0IGRldi5jbGVhbihvcHRpb25zLmNvbXBpbGVycyB8fCBhbGwsIG9wdGlvbnMubmV0d29ya3MgfHwgYWxsLCBvcHRpb25zLmNvbnRhaW5lcnMpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzZXRDb21tYW5kKGRldjogRGV2LCBuYW1lczogc3RyaW5nW10sIG9wdGlvbnM6IFNldE5ldHdvcmtPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnVwZGF0ZU5ldHdvcmtDb25maWdzKGRldi5uZXR3b3Jrc09yQWxsKG5hbWVzKSwgKGNvbmZpZzogTmV0d29ya0NvbmZpZykgPT4ge1xuICAgICAgICBpZiAob3B0aW9ucy5uZXdOYW1lKSB7XG4gICAgICAgICAgICBjb25maWcubmFtZSA9IG9wdGlvbnMubmV3TmFtZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5wb3J0KSB7XG4gICAgICAgICAgICBjb25maWcuaG9zdFBvcnQgPSBvcHRpb25zLnBvcnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuZGJQb3J0KSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5kYlBvcnQgPT09ICdiaW5kJykge1xuICAgICAgICAgICAgICAgIGNvbmZpZy5hcmFuZ29Ib3N0UG9ydCA9IE5ldHdvcmsuZGVmYXVsdEFyYW5nb1BvcnQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZGJQb3J0ID09PSAndW5iaW5kJykge1xuICAgICAgICAgICAgICAgIGNvbmZpZy5hcmFuZ29Ib3N0UG9ydCA9ICcnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25maWcuYXJhbmdvSG9zdFBvcnQgPSBvcHRpb25zLmRiUG9ydCB8fCAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBhZGRDb21tYW5kKGRldjogRGV2LCBuYW1lczogc3RyaW5nW10pIHtcbiAgICBhd2FpdCBkZXYuYWRkTmV0d29ya3MobmFtZXMpO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZW1vdmVDb21tYW5kKGRldjogRGV2LCBuYW1lczogc3RyaW5nW10pIHtcbiAgICBhd2FpdCBkZXYucmVtb3ZlTmV0d29ya3MoZGV2Lm5ldHdvcmtzRnJvbU5hbWVzKG5hbWVzKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdlbmVyYXRlS2V5c0NvbW1hbmQoX2RldjogRGV2KSB7XG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgVE9OQ2xpZW50LmNyZWF0ZSh7XG4gICAgICAgIHNlcnZlcnM6IFsnaHR0cDovL2xvY2FsaG9zdCddXG4gICAgfSk7XG4gICAgY29uc3Qga2V5cyA9IGF3YWl0IGNsaWVudC5jcnlwdG8uZWQyNTUxOUtleXBhaXIoKTtcbiAgICBjb25zb2xlLmxvZyhrZXlzKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gdXNlQ29tbWFuZChkZXY6IERldiwgdmVyc2lvbjogc3RyaW5nLCBvcHRpb25zOiBVc2VPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnVzZVZlcnNpb24odmVyc2lvbiwgY29tcGlsZXJzV2l0aE5ldHdvcmtzKGRldiwgb3B0aW9ucykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzb2xDb21tYW5kKGRldjogRGV2LCBmaWxlczogc3RyaW5nW10sIG9wdGlvbnM6IFNvbE9wdGlvbnMpIHtcbiAgICBhd2FpdCBTb2xpZGl0eS5idWlsZChkZXYsIGZpbGVzLCB7XG4gICAgICAgIGNsaWVudExhbmd1YWdlczogKG9wdGlvbnMuY2xpZW50TGFuZ3VhZ2VzIHx8ICcnKS5zcGxpdCgnLCcpLFxuICAgICAgICBjbGllbnRMZXZlbDogb3B0aW9ucy5jbGllbnRMZXZlbCB8fCBDbGllbnRDb2RlTGV2ZWwucnVuLFxuICAgIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZW5Db21tYW5kKGRldjogRGV2LCBmaWxlczogc3RyaW5nW10sIG9wdGlvbnM6IFNvbE9wdGlvbnMpIHtcbiAgICBhd2FpdCBDbGllbnRDb2RlLmdlbmVyYXRlKGZpbGVzLCB7XG4gICAgICAgIGNsaWVudExhbmd1YWdlczogKG9wdGlvbnMuY2xpZW50TGFuZ3VhZ2VzIHx8ICcnKS5zcGxpdCgnLCcpLFxuICAgICAgICBjbGllbnRMZXZlbDogb3B0aW9ucy5jbGllbnRMZXZlbCB8fCBDbGllbnRDb2RlTGV2ZWwucnVuLFxuICAgIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzcHlDb21tYW5kKGRldjogRGV2LCBuZXR3b3Jrczogc3RyaW5nW10pIHtcbiAgICBhd2FpdCBzcHkoZGV2LCBuZXR3b3Jrcyk7XG59XG5cbmNvbnN0IHNoYXJlZE9wdGlvbnMgPSB7XG4gICAgbjogWyctbiwgLS1uZXR3b3JrcyBbbmFtZXNdJywgJ2FwcGx5IGNvbW1hbmQgdG8gc3BlY2lmaWVkIG5ldHdvcmtbc10gKG5hbWVzIG11c3QgYmUgc2VwYXJhdGVkIHdpdGggY29tbWEpJ10sXG4gICAgbTogWyctbSwgLS1jb21waWxlcnMnLCAnYXBwbHkgY29tbWFuZCB0byB0aGUgY29tcGlsZXJzIGNvbnRhaW5lciddLFxufTtcblxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlQ29tbWFuZExpbmUoZGV2OiBEZXYsIGFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgbGV0IGNvbW1hbmRBY3Rpb24gPSBpbmZvQ29tbWFuZDtcbiAgICBsZXQgY29tbWFuZEFyZ3MgPSBbXTtcblxuICAgIGNvbnN0IGNvbW1hbmQgPSAoYWN0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgY29tbWFuZEFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgIGNvbW1hbmRBcmdzID0gYXJncztcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAubmFtZShkZXYubmFtZSlcbiAgICAgICAgLnZlcnNpb24oZGV2LnZlcnNpb24pXG4gICAgICAgIC5vcHRpb24oJy1hLCAtLWF2YWlsYWJsZScsICdzaG93IGF2YWlsYWJsZSB2ZXJzaW9ucycpXG4gICAgICAgIC5kZXNjcmlwdGlvbignVE9OIExhYnMgZGV2ZWxvcG1lbnQgdG9vbHMnKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ2luZm8nKS5kZXNjcmlwdGlvbignU2hvdyBzdW1tYXJ5IGFib3V0IGRldiBlbnZpcm9ubWVudCcpXG4gICAgICAgIC5vcHRpb24oJy1hLCAtLWF2YWlsYWJsZScsICdzaG93IGF2YWlsYWJsZSB2ZXJzaW9ucycpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChpbmZvQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnc29sIFtmaWxlcy4uLl0nKS5kZXNjcmlwdGlvbignQnVpbGQgc29saWRpdHkgY29udHJhY3Rbc10nKVxuICAgICAgICAub3B0aW9uKFxuICAgICAgICAgICAgJy1sLCAtLWNsaWVudC1sYW5ndWFnZXMgPGxhbmd1YWdlcz4nLFxuICAgICAgICAgICAgJ2dlbmVyYXRlIGNsaWVudCBjb2RlIGZvciBsYW5ndWFnZXM6IFwianNcIiwgXCJyc1wiIChtdWx0aXBsZSBsYW5ndWFnZXMgbXVzdCBiZSBzZXBhcmF0ZWQgd2l0aCBjb21tYSknXG4gICAgICAgIClcbiAgICAgICAgLm9wdGlvbihcbiAgICAgICAgICAgICctTCwgLS1jbGllbnQtbGV2ZWwgPGNsaWVudC1sZXZlbD4nLFxuICAgICAgICAgICAgJ2NsaWVudCBjb2RlIGxldmVsOiBcInJ1blwiIHRvIHJ1biBvbmx5LCBcImRlcGxveVwiIHRvIHJ1biBhbmQgZGVwbG95IChpbmNsdWRlcyBhbiBpbWFnZUJhc2U2NCBvZiBiaW5hcnkgY29udHJhY3QpJyxcbiAgICAgICAgICAgICdkZXBsb3knXG4gICAgICAgIClcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHNvbENvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ2dlbiBbZmlsZXMuLi5dJykuZGVzY3JpcHRpb24oJ0dlbmVyYXRlIGNsaWVudCBjb2RlIGZvciBjb250cmFjdFtzXScpXG4gICAgICAgIC5vcHRpb24oXG4gICAgICAgICAgICAnLWwsIC0tY2xpZW50LWxhbmd1YWdlcyA8bGFuZ3VhZ2VzPicsXG4gICAgICAgICAgICAnZ2VuZXJhdGUgY2xpZW50IGNvZGUgZm9yIGxhbmd1YWdlczogXCJqc1wiLCBcInJzXCIgKG11bHRpcGxlIGxhbmd1YWdlcyBtdXN0IGJlIHNlcGFyYXRlZCB3aXRoIGNvbW1hKSdcbiAgICAgICAgKVxuICAgICAgICAub3B0aW9uKFxuICAgICAgICAgICAgJy1MLCAtLWNsaWVudC1sZXZlbCA8Y2xpZW50LWxldmVsPicsXG4gICAgICAgICAgICAnY2xpZW50IGNvZGUgbGV2ZWw6IFwicnVuXCIgdG8gcnVuIG9ubHksIFwiZGVwbG95XCIgdG8gcnVuIGFuZCBkZXBsb3kgKGluY2x1ZGVzIGFuIGltYWdlQmFzZTY0IG9mIGJpbmFyeSBjb250cmFjdCknLFxuICAgICAgICAgICAgJ2RlcGxveSdcbiAgICAgICAgKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoZ2VuQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnc3RhcnQnKS5kZXNjcmlwdGlvbignU3RhcnQgZGV2IGNvbnRhaW5lcnMnKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubilcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm0pXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChzdGFydENvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3N0b3AnKS5kZXNjcmlwdGlvbignU3RvcCBkZXYgY29udGFpbmVycycpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHN0b3BDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdyZXN0YXJ0JykuZGVzY3JpcHRpb24oJ1Jlc3RhcnQgZGV2IGNvbnRhaW5lcnMnKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubilcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm0pXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChyZXN0YXJ0Q29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgncmVjcmVhdGUnKS5kZXNjcmlwdGlvbignUmVjcmVhdGUgZGV2IGNvbnRhaW5lcnMnKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubilcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm0pXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChyZWNyZWF0ZUNvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3NldHVwJykuZGVzY3JpcHRpb24oJ1NldHVwIGRldiBlbnZpcm9ubWVudCcpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHNldHVwQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnY2xlYW4nKS5kZXNjcmlwdGlvbignUmVtb3ZlIGRvY2tlciBjb250YWluZXJzIGFuZCBpbWFnZXMgcmVsYXRlZCB0byBUT04gRGV2JylcbiAgICAgICAgLm9wdGlvbignLW4sIC0tbmV0d29ya3MnLCAnY2xlYW4gbG9jYWwgbm9kZSBkb2NrZXIgY29udGFpbmVycyBhbmQgaW1hZ2VzJylcbiAgICAgICAgLm9wdGlvbignLW0sIC0tY29tcGlsZXJzJywgJ2NsZWFuIGNvbXBpbGVycyBkb2NrZXIgY29udGFpbmVycyBhbmQgaW1hZ2VzJylcbiAgICAgICAgLm9wdGlvbignLWMsIC0tY29udGFpbmVycycsICdjbGVhbiBjb250YWluZXJzIG9ubHknLCBmYWxzZSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKGNsZWFuQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgndXNlIDx2ZXJzaW9uPicpLmRlc2NyaXB0aW9uKCdVc2Ugc3BlY2lmaWVkIHZlcnNpb24gZm9yIGNvbnRhaW5lcnMnKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubilcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm0pXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZCh1c2VDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdzZXQgW25ldHdvcmsuLi5dJykuZGVzY3JpcHRpb24oJ1NldCBuZXR3b3JrW3NdIG9wdGlvbnMnKVxuICAgICAgICAub3B0aW9uKCctcCwgLS1wb3J0IDxwb3J0PicsICdob3N0IHBvcnQgdG8gYm91bmQgbG9jYWwgbm9kZScpXG4gICAgICAgIC5vcHRpb24oJy1kLCAtLWRiLXBvcnQgPGJpbmRpbmc+JywgJ2hvc3QgcG9ydCB0byBib3VuZCBsb2NhbCBub2RlcyBBcmFuZ28gREIgKFwiYmluZFwiIHRvIHVzZSBkZWZhdWx0IEFyYW5nbyBEQiBwb3J0LCBcInVuYmluZFwiIHRvIHVuYmluZCBBcmFuZ28gREIgcG9ydCknKVxuICAgICAgICAub3B0aW9uKCctbiwgLS1uZXctbmFtZSA8bmFtZT4nLCAnc2V0IG5ldyBuYW1lIGZvciBuZXR3b3JrJylcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHNldENvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ2FkZCBbbmV0d29yay4uLl0nKS5kZXNjcmlwdGlvbignQWRkIG5ldHdvcmtbc10nKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoYWRkQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgncmVtb3ZlIFtuZXR3b3JrLi4uXScpLmFsaWFzKCdybScpLmRlc2NyaXB0aW9uKCdSZW1vdmUgbmV0d29ya1tzXScpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChyZW1vdmVDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdrZXlzJykuYWxpYXMoJ2snKS5kZXNjcmlwdGlvbignR2VuZXJhdGUgcmFuZG9tIEtleSBQYWlyJylcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKGdlbmVyYXRlS2V5c0NvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3NweSBbbmV0d29ya3MuLi5dJykuZGVzY3JpcHRpb24oJ1J1biBuZXR3b3JrIHNjYW5uZXInKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoc3B5Q29tbWFuZCkpO1xuXG4gICAgLy8gLmNvbW1hbmQoJ3VwZGF0ZScsIGB1cGRhdGUgJHtkZXYubmFtZX0gZG9ja2VyIGltYWdlc2ApLmFjdGlvbihhY3Rpb24pXG5cbiAgICBwcm9ncmFtLnBhcnNlKGFyZ3MpO1xuXG4gICAgaWYgKGNvbW1hbmRBcmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBpZiAocHJvZ3JhbS5hcmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgYXdhaXQgaW5mb0NvbW1hbmQoZGV2LCBwcm9ncmFtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb2dyYW0ub3V0cHV0SGVscCgpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYXdhaXQgY29tbWFuZEFjdGlvbiguLi5bZGV2LCAuLi5jb21tYW5kQXJnc10pO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgaGFuZGxlQ29tbWFuZExpbmUgfTtcbiJdfQ==