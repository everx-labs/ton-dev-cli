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

function spyCommand(_x27, _x28) {
  return _spyCommand.apply(this, arguments);
}

function _spyCommand() {
  _spyCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee13(dev, networks) {
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return (0, _spy.spy)(dev, networks);

          case 2:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));
  return _spyCommand.apply(this, arguments);
}

var sharedOptions = {
  n: ['-n, --networks [names]', 'apply command to specified network[s] (names must be separated with comma)'],
  m: ['-m, --compilers', 'apply command to the compilers container']
};

function handleCommandLine(_x29, _x30) {
  return _handleCommandLine.apply(this, arguments);
}

function _handleCommandLine() {
  _handleCommandLine = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee14(dev, args) {
    var _program$command$desc, _program$command$desc2, _program$command$desc3, _program$command$desc4, _program$command$desc5, _program$command$desc6, _program$command$desc7, _program$command$desc8, _program$command$desc9, _program$command$desc10, _program$command$desc11, _program$command$desc12;

    var commandAction, commandArgs, command;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
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
              _context14.next = 28;
              break;
            }

            if (!(program.args.length === 0)) {
              _context14.next = 25;
              break;
            }

            _context14.next = 23;
            return (0, _info.infoCommand)(dev, program);

          case 23:
            _context14.next = 26;
            break;

          case 25:
            program.outputHelp();

          case 26:
            _context14.next = 30;
            break;

          case 28:
            _context14.next = 30;
            return commandAction.apply(void 0, [dev].concat((0, _toConsumableArray2["default"])(commandArgs)));

          case 30:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));
  return _handleCommandLine.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvY2xpLmpzIl0sIm5hbWVzIjpbInByb2dyYW0iLCJyZXF1aXJlIiwic2V0dXBDb21tYW5kIiwiZGV2Iiwib3B0aW9ucyIsInN0YXJ0Iiwic3RhcnRDb21tYW5kIiwic3RvcENvbW1hbmQiLCJzdG9wIiwicmVzdGFydENvbW1hbmQiLCJyZXN0YXJ0IiwicmVjcmVhdGVDb21tYW5kIiwicmVjcmVhdGUiLCJjbGVhbkNvbW1hbmQiLCJhbGwiLCJjb21waWxlcnMiLCJuZXR3b3JrcyIsImNsZWFuIiwiY29udGFpbmVycyIsInNldENvbW1hbmQiLCJuYW1lcyIsInVwZGF0ZU5ldHdvcmtDb25maWdzIiwibmV0d29ya3NPckFsbCIsImNvbmZpZyIsIm5ld05hbWUiLCJuYW1lIiwicG9ydCIsImhvc3RQb3J0IiwiZGJQb3J0IiwiYXJhbmdvSG9zdFBvcnQiLCJOZXR3b3JrIiwiZGVmYXVsdEFyYW5nb1BvcnQiLCJhZGRDb21tYW5kIiwiYWRkTmV0d29ya3MiLCJyZW1vdmVDb21tYW5kIiwicmVtb3ZlTmV0d29ya3MiLCJuZXR3b3Jrc0Zyb21OYW1lcyIsImdlbmVyYXRlS2V5c0NvbW1hbmQiLCJfZGV2IiwiVE9OQ2xpZW50IiwiY3JlYXRlIiwic2VydmVycyIsImNsaWVudCIsImNyeXB0byIsImVkMjU1MTlLZXlwYWlyIiwia2V5cyIsImNvbnNvbGUiLCJsb2ciLCJ1c2VDb21tYW5kIiwidmVyc2lvbiIsInVzZVZlcnNpb24iLCJzb2xDb21tYW5kIiwiZmlsZXMiLCJTb2xpZGl0eSIsImJ1aWxkIiwiY2xpZW50TGFuZ3VhZ2VzIiwic3BsaXQiLCJjbGllbnRMZXZlbCIsIkNsaWVudENvZGVMZXZlbCIsInJ1biIsInNweUNvbW1hbmQiLCJzaGFyZWRPcHRpb25zIiwibiIsIm0iLCJoYW5kbGVDb21tYW5kTGluZSIsImFyZ3MiLCJjb21tYW5kQWN0aW9uIiwiaW5mb0NvbW1hbmQiLCJjb21tYW5kQXJncyIsImNvbW1hbmQiLCJhY3Rpb24iLCJvcHRpb24iLCJkZXNjcmlwdGlvbiIsImFsaWFzIiwicGFyc2UiLCJsZW5ndGgiLCJvdXRwdXRIZWxwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFnQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBV0E7O0FBQ0E7O0FBbENBOzs7Ozs7Ozs7Ozs7OztBQW9DQSxJQUFNQSxPQUFPLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXZCOztTQUdlQyxZOzs7Ozs7OytCQUFmLGlCQUE0QkMsR0FBNUIsRUFBc0NDLE9BQXRDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNVRCxHQUFHLENBQUNFLEtBQUosQ0FBVSxvQ0FBc0JGLEdBQXRCLEVBQTJCQyxPQUEzQixDQUFWLENBRFY7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztTQUtlRSxZOzs7Ozs7OytCQUFmLGtCQUE0QkgsR0FBNUIsRUFBc0NDLE9BQXRDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNVRCxHQUFHLENBQUNFLEtBQUosQ0FBVSxvQ0FBc0JGLEdBQXRCLEVBQTJCQyxPQUEzQixDQUFWLENBRFY7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztTQUllRyxXOzs7Ozs7OytCQUFmLGtCQUEyQkosR0FBM0IsRUFBcUNDLE9BQXJDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNVRCxHQUFHLENBQUNLLElBQUosQ0FBUyxvQ0FBc0JMLEdBQXRCLEVBQTJCQyxPQUEzQixDQUFULENBRFY7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztTQUllSyxjOzs7Ozs7OytCQUFmLGtCQUE4Qk4sR0FBOUIsRUFBd0NDLE9BQXhDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNVRCxHQUFHLENBQUNPLE9BQUosQ0FBWSxvQ0FBc0JQLEdBQXRCLEVBQTJCQyxPQUEzQixDQUFaLENBRFY7O0FBQUE7QUFB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LE9BREwsQ0FDYSxNQURiLEVBQ3FCSSxLQURyQixDQUMyQixHQUQzQixFQUNnQ0QsV0FEaEMsQ0FDNEMsMEJBRDVDLEVBRUtGLE1BRkwsQ0FFWUQsT0FBTyxDQUFDaEMsbUJBQUQsQ0FGbkI7QUFJQXJDLFlBQUFBLE9BQU8sQ0FDRnFFLE9BREwsQ0FDYSxtQkFEYixFQUNrQ0csV0FEbEMsQ0FDOEMscUJBRDlDLEVBRUtGLE1BRkwsQ0FFWUQsT0FBTyxDQUFDVCxVQUFELENBRm5CLEVBakdKLENBcUdJOztBQUVBNUQsWUFBQUEsT0FBTyxDQUFDMEUsS0FBUixDQUFjVCxJQUFkOztBQXZHSixrQkF5R1FHLFdBQVcsQ0FBQ08sTUFBWixLQUF1QixDQXpHL0I7QUFBQTtBQUFBO0FBQUE7O0FBQUEsa0JBMEdZM0UsT0FBTyxDQUFDaUUsSUFBUixDQUFhVSxNQUFiLEtBQXdCLENBMUdwQztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLG1CQTJHa0IsdUJBQVl4RSxHQUFaLEVBQWlCSCxPQUFqQixDQTNHbEI7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBNkdZQSxZQUFBQSxPQUFPLENBQUM0RSxVQUFSOztBQTdHWjtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLG1CQWdIY1YsYUFBYSxNQUFiLFVBQWtCL0QsR0FBbEIsNkNBQTBCaUUsV0FBMUIsR0FoSGQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOC0yMDE5IFRPTiBERVYgU09MVVRJT05TIExURC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgU09GVFdBUkUgRVZBTFVBVElPTiBMaWNlbnNlICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbiAqIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxuICogTGljZW5zZSBhdDogaHR0cHM6Ly93d3cudG9uLmRldi9saWNlbnNlc1xuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgVE9OIERFViBzb2Z0d2FyZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbi8vIEBmbG93XG5cbmltcG9ydCB7IFRPTkNsaWVudCB9IGZyb20gXCJ0b24tY2xpZW50LW5vZGUtanNcIjtcbmltcG9ydCB7IENsaWVudENvZGVMZXZlbCB9IGZyb20gXCIuLi9jb21waWxlcnMvY2xpZW50LWNvZGVcIjtcbmltcG9ydCB7IFNvbGlkaXR5IH0gZnJvbSBcIi4uL2NvbXBpbGVycy9zb2xpZGl0eVwiO1xuaW1wb3J0IHsgRGV2IH0gZnJvbSBcIi4uL2RldlwiO1xuaW1wb3J0IHsgTmV0d29yayB9IGZyb20gXCIuLi9uZXR3b3Jrcy9uZXR3b3Jrc1wiO1xuaW1wb3J0IHR5cGUgeyBOZXR3b3JrQ29uZmlnIH0gZnJvbSBcIi4uL25ldHdvcmtzL25ldHdvcmtzXCI7XG5pbXBvcnQgeyBjb21waWxlcnNXaXRoTmV0d29ya3MgfSBmcm9tIFwiLi9vcHRpb25zXCI7XG5pbXBvcnQgdHlwZSB7XG4gICAgQ2xlYW5PcHRpb25zLFxuICAgIFJlY3JlYXRlT3B0aW9ucyxcbiAgICBSZXN0YXJ0T3B0aW9ucywgU2V0TmV0d29ya09wdGlvbnMsXG4gICAgU2V0dXBPcHRpb25zLCBTb2xPcHRpb25zLFxuICAgIFN0YXJ0T3B0aW9ucyxcbiAgICBTdG9wT3B0aW9ucyxcbiAgICBVc2VPcHRpb25zXG59IGZyb20gXCIuL29wdGlvbnNcIjtcblxuaW1wb3J0IHsgaW5mb0NvbW1hbmQgfSBmcm9tIFwiLi9pbmZvLmpzXCI7XG5pbXBvcnQgeyBzcHkgfSBmcm9tIFwiLi9zcHlcIjtcblxuY29uc3QgcHJvZ3JhbSA9IHJlcXVpcmUoJ2NvbW1hbmRlcicpO1xuXG5cbmFzeW5jIGZ1bmN0aW9uIHNldHVwQ29tbWFuZChkZXY6IERldiwgb3B0aW9uczogU2V0dXBPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnN0YXJ0KGNvbXBpbGVyc1dpdGhOZXR3b3JrcyhkZXYsIG9wdGlvbnMpKTtcbn1cblxuXG5hc3luYyBmdW5jdGlvbiBzdGFydENvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IFN0YXJ0T3B0aW9ucykge1xuICAgIGF3YWl0IGRldi5zdGFydChjb21waWxlcnNXaXRoTmV0d29ya3MoZGV2LCBvcHRpb25zKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHN0b3BDb21tYW5kKGRldjogRGV2LCBvcHRpb25zOiBTdG9wT3B0aW9ucykge1xuICAgIGF3YWl0IGRldi5zdG9wKGNvbXBpbGVyc1dpdGhOZXR3b3JrcyhkZXYsIG9wdGlvbnMpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVzdGFydENvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IFJlc3RhcnRPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnJlc3RhcnQoY29tcGlsZXJzV2l0aE5ldHdvcmtzKGRldiwgb3B0aW9ucykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZWNyZWF0ZUNvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IFJlY3JlYXRlT3B0aW9ucykge1xuICAgIGF3YWl0IGRldi5yZWNyZWF0ZShjb21waWxlcnNXaXRoTmV0d29ya3MoZGV2LCBvcHRpb25zKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNsZWFuQ29tbWFuZChkZXY6IERldiwgb3B0aW9uczogQ2xlYW5PcHRpb25zKSB7XG4gICAgY29uc3QgYWxsID0gIW9wdGlvbnMuY29tcGlsZXJzICYmICFvcHRpb25zLm5ldHdvcmtzO1xuICAgIGF3YWl0IGRldi5jbGVhbihvcHRpb25zLmNvbXBpbGVycyB8fCBhbGwsIG9wdGlvbnMubmV0d29ya3MgfHwgYWxsLCBvcHRpb25zLmNvbnRhaW5lcnMpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzZXRDb21tYW5kKGRldjogRGV2LCBuYW1lczogc3RyaW5nW10sIG9wdGlvbnM6IFNldE5ldHdvcmtPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnVwZGF0ZU5ldHdvcmtDb25maWdzKGRldi5uZXR3b3Jrc09yQWxsKG5hbWVzKSwgKGNvbmZpZzogTmV0d29ya0NvbmZpZykgPT4ge1xuICAgICAgICBpZiAob3B0aW9ucy5uZXdOYW1lKSB7XG4gICAgICAgICAgICBjb25maWcubmFtZSA9IG9wdGlvbnMubmV3TmFtZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5wb3J0KSB7XG4gICAgICAgICAgICBjb25maWcuaG9zdFBvcnQgPSBvcHRpb25zLnBvcnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuZGJQb3J0KSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5kYlBvcnQgPT09ICdiaW5kJykge1xuICAgICAgICAgICAgICAgIGNvbmZpZy5hcmFuZ29Ib3N0UG9ydCA9IE5ldHdvcmsuZGVmYXVsdEFyYW5nb1BvcnQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZGJQb3J0ID09PSAndW5iaW5kJykge1xuICAgICAgICAgICAgICAgIGNvbmZpZy5hcmFuZ29Ib3N0UG9ydCA9ICcnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25maWcuYXJhbmdvSG9zdFBvcnQgPSBvcHRpb25zLmRiUG9ydCB8fCAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBhZGRDb21tYW5kKGRldjogRGV2LCBuYW1lczogc3RyaW5nW10pIHtcbiAgICBhd2FpdCBkZXYuYWRkTmV0d29ya3MobmFtZXMpO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZW1vdmVDb21tYW5kKGRldjogRGV2LCBuYW1lczogc3RyaW5nW10pIHtcbiAgICBhd2FpdCBkZXYucmVtb3ZlTmV0d29ya3MoZGV2Lm5ldHdvcmtzRnJvbU5hbWVzKG5hbWVzKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdlbmVyYXRlS2V5c0NvbW1hbmQoX2RldjogRGV2KSB7XG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgVE9OQ2xpZW50LmNyZWF0ZSh7XG4gICAgICAgIHNlcnZlcnM6IFsnaHR0cDovL2xvY2FsaG9zdCddXG4gICAgfSk7XG4gICAgY29uc3Qga2V5cyA9IGF3YWl0IGNsaWVudC5jcnlwdG8uZWQyNTUxOUtleXBhaXIoKTtcbiAgICBjb25zb2xlLmxvZyhrZXlzKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gdXNlQ29tbWFuZChkZXY6IERldiwgdmVyc2lvbjogc3RyaW5nLCBvcHRpb25zOiBVc2VPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnVzZVZlcnNpb24odmVyc2lvbiwgY29tcGlsZXJzV2l0aE5ldHdvcmtzKGRldiwgb3B0aW9ucykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzb2xDb21tYW5kKGRldjogRGV2LCBmaWxlczogc3RyaW5nW10sIG9wdGlvbnM6IFNvbE9wdGlvbnMpIHtcbiAgICBhd2FpdCBTb2xpZGl0eS5idWlsZChkZXYsIGZpbGVzLCB7XG4gICAgICAgIGNsaWVudExhbmd1YWdlczogKG9wdGlvbnMuY2xpZW50TGFuZ3VhZ2VzIHx8ICcnKS5zcGxpdCgnLCcpLFxuICAgICAgICBjbGllbnRMZXZlbDogb3B0aW9ucy5jbGllbnRMZXZlbCB8fCBDbGllbnRDb2RlTGV2ZWwucnVuLFxuICAgIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzcHlDb21tYW5kKGRldjogRGV2LCBuZXR3b3Jrczogc3RyaW5nW10pIHtcbiAgICBhd2FpdCBzcHkoZGV2LCBuZXR3b3Jrcyk7XG59XG5cbmNvbnN0IHNoYXJlZE9wdGlvbnMgPSB7XG4gICAgbjogWyctbiwgLS1uZXR3b3JrcyBbbmFtZXNdJywgJ2FwcGx5IGNvbW1hbmQgdG8gc3BlY2lmaWVkIG5ldHdvcmtbc10gKG5hbWVzIG11c3QgYmUgc2VwYXJhdGVkIHdpdGggY29tbWEpJ10sXG4gICAgbTogWyctbSwgLS1jb21waWxlcnMnLCAnYXBwbHkgY29tbWFuZCB0byB0aGUgY29tcGlsZXJzIGNvbnRhaW5lciddLFxufTtcblxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlQ29tbWFuZExpbmUoZGV2OiBEZXYsIGFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgbGV0IGNvbW1hbmRBY3Rpb24gPSBpbmZvQ29tbWFuZDtcbiAgICBsZXQgY29tbWFuZEFyZ3MgPSBbXTtcblxuICAgIGNvbnN0IGNvbW1hbmQgPSAoYWN0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgY29tbWFuZEFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgIGNvbW1hbmRBcmdzID0gYXJncztcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAubmFtZShkZXYubmFtZSlcbiAgICAgICAgLnZlcnNpb24oZGV2LnZlcnNpb24pXG4gICAgICAgIC5vcHRpb24oJy1hLCAtLWF2YWlsYWJsZScsICdzaG93IGF2YWlsYWJsZSB2ZXJzaW9ucycpXG4gICAgICAgIC5kZXNjcmlwdGlvbignVE9OIExhYnMgZGV2ZWxvcG1lbnQgdG9vbHMnKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ2luZm8nKS5kZXNjcmlwdGlvbignU2hvdyBzdW1tYXJ5IGFib3V0IGRldiBlbnZpcm9ubWVudCcpXG4gICAgICAgIC5vcHRpb24oJy1hLCAtLWF2YWlsYWJsZScsICdzaG93IGF2YWlsYWJsZSB2ZXJzaW9ucycpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChpbmZvQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnc29sIFtmaWxlcy4uLl0nKS5kZXNjcmlwdGlvbignQnVpbGQgc29saWRpdHkgY29udHJhY3Rbc10nKVxuICAgICAgICAub3B0aW9uKFxuICAgICAgICAgICAgJy1sLCAtLWNsaWVudC1sYW5ndWFnZXMgPGxhbmd1YWdlcz4nLFxuICAgICAgICAgICAgJ2dlbmVyYXRlIGNsaWVudCBjb2RlIGZvciBsYW5ndWFnZXM6IFwianNcIiwgXCJyc1wiIChtdWx0aXBsZSBsYW5ndWFnZXMgbXVzdCBiZSBzZXBhcmF0ZWQgd2l0aCBjb21tYSknXG4gICAgICAgIClcbiAgICAgICAgLm9wdGlvbihcbiAgICAgICAgICAgICctTCwgLS1jbGllbnQtbGV2ZWwgPGNsaWVudC1sZXZlbD4nLFxuICAgICAgICAgICAgJ2NsaWVudCBjb2RlIGxldmVsOiBcInJ1blwiIHRvIHJ1biBvbmx5LCBcImRlcGxveVwiIHRvIHJ1biBhbmQgZGVwbG95IChpbmNsdWRlcyBhbiBpbWFnZUJhc2U2NCBvZiBiaW5hcnkgY29udHJhY3QpJyxcbiAgICAgICAgICAgICdkZXBsb3knXG4gICAgICAgIClcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHNvbENvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3N0YXJ0JykuZGVzY3JpcHRpb24oJ1N0YXJ0IGRldiBjb250YWluZXJzJylcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm4pXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5tKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoc3RhcnRDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdzdG9wJykuZGVzY3JpcHRpb24oJ1N0b3AgZGV2IGNvbnRhaW5lcnMnKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubilcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm0pXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChzdG9wQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgncmVzdGFydCcpLmRlc2NyaXB0aW9uKCdSZXN0YXJ0IGRldiBjb250YWluZXJzJylcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm4pXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5tKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQocmVzdGFydENvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3JlY3JlYXRlJykuZGVzY3JpcHRpb24oJ1JlY3JlYXRlIGRldiBjb250YWluZXJzJylcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm4pXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5tKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQocmVjcmVhdGVDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdzZXR1cCcpLmRlc2NyaXB0aW9uKCdTZXR1cCBkZXYgZW52aXJvbm1lbnQnKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubilcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm0pXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChzZXR1cENvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ2NsZWFuJykuZGVzY3JpcHRpb24oJ1JlbW92ZSBkb2NrZXIgY29udGFpbmVycyBhbmQgaW1hZ2VzIHJlbGF0ZWQgdG8gVE9OIERldicpXG4gICAgICAgIC5vcHRpb24oJy1uLCAtLW5ldHdvcmtzJywgJ2NsZWFuIGxvY2FsIG5vZGUgZG9ja2VyIGNvbnRhaW5lcnMgYW5kIGltYWdlcycpXG4gICAgICAgIC5vcHRpb24oJy1tLCAtLWNvbXBpbGVycycsICdjbGVhbiBjb21waWxlcnMgZG9ja2VyIGNvbnRhaW5lcnMgYW5kIGltYWdlcycpXG4gICAgICAgIC5vcHRpb24oJy1jLCAtLWNvbnRhaW5lcnMnLCAnY2xlYW4gY29udGFpbmVycyBvbmx5JywgZmFsc2UpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChjbGVhbkNvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3VzZSA8dmVyc2lvbj4nKS5kZXNjcmlwdGlvbignVXNlIHNwZWNpZmllZCB2ZXJzaW9uIGZvciBjb250YWluZXJzJylcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm4pXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5tKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQodXNlQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnc2V0IFtuZXR3b3JrLi4uXScpLmRlc2NyaXB0aW9uKCdTZXQgbmV0d29ya1tzXSBvcHRpb25zJylcbiAgICAgICAgLm9wdGlvbignLXAsIC0tcG9ydCA8cG9ydD4nLCAnaG9zdCBwb3J0IHRvIGJvdW5kIGxvY2FsIG5vZGUnKVxuICAgICAgICAub3B0aW9uKCctZCwgLS1kYi1wb3J0IDxiaW5kaW5nPicsICdob3N0IHBvcnQgdG8gYm91bmQgbG9jYWwgbm9kZXMgQXJhbmdvIERCIChcImJpbmRcIiB0byB1c2UgZGVmYXVsdCBBcmFuZ28gREIgcG9ydCwgXCJ1bmJpbmRcIiB0byB1bmJpbmQgQXJhbmdvIERCIHBvcnQpJylcbiAgICAgICAgLm9wdGlvbignLW4sIC0tbmV3LW5hbWUgPG5hbWU+JywgJ3NldCBuZXcgbmFtZSBmb3IgbmV0d29yaycpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChzZXRDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdhZGQgW25ldHdvcmsuLi5dJykuZGVzY3JpcHRpb24oJ0FkZCBuZXR3b3JrW3NdJylcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKGFkZENvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3JlbW92ZSBbbmV0d29yay4uLl0nKS5hbGlhcygncm0nKS5kZXNjcmlwdGlvbignUmVtb3ZlIG5ldHdvcmtbc10nKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQocmVtb3ZlQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgna2V5cycpLmFsaWFzKCdrJykuZGVzY3JpcHRpb24oJ0dlbmVyYXRlIHJhbmRvbSBLZXkgUGFpcicpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChnZW5lcmF0ZUtleXNDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdzcHkgW25ldHdvcmtzLi4uXScpLmRlc2NyaXB0aW9uKCdSdW4gbmV0d29yayBzY2FubmVyJylcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHNweUNvbW1hbmQpKTtcblxuICAgIC8vIC5jb21tYW5kKCd1cGRhdGUnLCBgdXBkYXRlICR7ZGV2Lm5hbWV9IGRvY2tlciBpbWFnZXNgKS5hY3Rpb24oYWN0aW9uKVxuXG4gICAgcHJvZ3JhbS5wYXJzZShhcmdzKTtcblxuICAgIGlmIChjb21tYW5kQXJncy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgaWYgKHByb2dyYW0uYXJncy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGF3YWl0IGluZm9Db21tYW5kKGRldiwgcHJvZ3JhbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9ncmFtLm91dHB1dEhlbHAoKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGF3YWl0IGNvbW1hbmRBY3Rpb24oLi4uW2RldiwgLi4uY29tbWFuZEFyZ3NdKTtcbiAgICB9XG59XG5cbmV4cG9ydCB7IGhhbmRsZUNvbW1hbmRMaW5lIH07XG4iXX0=