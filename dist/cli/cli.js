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

    var commandAction, commandArgs, command;
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
            program.command('spy [networks...]').description('Run network scanner').action(command(spyCommand));
            program.command('web').description('Run web console').option('-p, --port <port>', 'host port to bound web console (default: 8800)', '8800').action(command(webConsoleCommand)); // .command('update', `update ${dev.name} docker images`).action(action)

            program.parse(args);

            if (!(commandArgs.length === 0)) {
              _context16.next = 30;
              break;
            }

            if (!(program.args.length === 0)) {
              _context16.next = 27;
              break;
            }

            _context16.next = 25;
            return (0, _info.infoCommand)(dev, program);

          case 25:
            _context16.next = 28;
            break;

          case 27:
            program.outputHelp();

          case 28:
            _context16.next = 32;
            break;

          case 30:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvY2xpLmpzIl0sIm5hbWVzIjpbInByb2dyYW0iLCJyZXF1aXJlIiwic2V0dXBDb21tYW5kIiwiZGV2Iiwib3B0aW9ucyIsInN0YXJ0Iiwic3RhcnRDb21tYW5kIiwic3RvcENvbW1hbmQiLCJzdG9wIiwicmVzdGFydENvbW1hbmQiLCJyZXN0YXJ0IiwicmVjcmVhdGVDb21tYW5kIiwicmVjcmVhdGUiLCJjbGVhbkNvbW1hbmQiLCJhbGwiLCJjb21waWxlcnMiLCJuZXR3b3JrcyIsImNsZWFuIiwiY29udGFpbmVycyIsInNldENvbW1hbmQiLCJuYW1lcyIsInVwZGF0ZU5ldHdvcmtDb25maWdzIiwibmV0d29ya3NPckFsbCIsImNvbmZpZyIsIm5ld05hbWUiLCJuYW1lIiwicG9ydCIsImhvc3RQb3J0IiwiZGJQb3J0IiwiYXJhbmdvSG9zdFBvcnQiLCJOZXR3b3JrIiwiZGVmYXVsdEFyYW5nb1BvcnQiLCJhZGRDb21tYW5kIiwiYWRkTmV0d29ya3MiLCJyZW1vdmVDb21tYW5kIiwicmVtb3ZlTmV0d29ya3MiLCJuZXR3b3Jrc0Zyb21OYW1lcyIsImdlbmVyYXRlS2V5c0NvbW1hbmQiLCJfZGV2IiwiVE9OQ2xpZW50IiwiY3JlYXRlIiwic2VydmVycyIsImNsaWVudCIsImNyeXB0byIsImVkMjU1MTlLZXlwYWlyIiwia2V5cyIsImNvbnNvbGUiLCJsb2ciLCJ1c2VDb21tYW5kIiwidmVyc2lvbiIsInVzZVZlcnNpb24iLCJzb2xDb21tYW5kIiwiZmlsZXMiLCJTb2xpZGl0eSIsImJ1aWxkIiwiY2xpZW50TGFuZ3VhZ2VzIiwic3BsaXQiLCJjbGllbnRMZXZlbCIsIkNsaWVudENvZGVMZXZlbCIsInJ1biIsImdlbkNvbW1hbmQiLCJDbGllbnRDb2RlIiwiZ2VuZXJhdGUiLCJzcHlDb21tYW5kIiwid2ViQ29uc29sZUNvbW1hbmQiLCJzaGFyZWRPcHRpb25zIiwibiIsIm0iLCJoYW5kbGVDb21tYW5kTGluZSIsImFyZ3MiLCJjb21tYW5kQWN0aW9uIiwiaW5mb0NvbW1hbmQiLCJjb21tYW5kQXJncyIsImNvbW1hbmQiLCJhY3Rpb24iLCJvcHRpb24iLCJkZXNjcmlwdGlvbiIsImFsaWFzIiwicGFyc2UiLCJsZW5ndGgiLCJvdXRwdXRIZWxwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFnQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBV0E7O0FBQ0E7O0FBbkNBOzs7Ozs7Ozs7Ozs7OztBQXFDQSxJQUFNQSxPQUFPLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXZCOztTQUdlQyxZOzs7Ozs7OytCQUFmLGlCQUE0QkMsR0FBNUIsRUFBc0NDLE9BQXRDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNVRCxHQUFHLENBQUNFLEtBQUosQ0FBVSxvQ0FBc0JGLEdBQXRCLEVBQTJCQyxPQUEzQixDQUFWLENBRFY7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztTQUtlRSxZOzs7Ozs7OytCQUFmLGtCQUE0QkgsR0FBNUIsRUFBc0NDLE9BQXRDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNVRCxHQUFHLENBQUNFLEtBQUosQ0FBVSxvQ0FBc0JGLEdBQXRCLEVBQTJCQyxPQUEzQixDQUFWLENBRFY7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztTQUllRyxXOzs7Ozs7OytCQUFmLGtCQUEyQkosR0FBM0IsRUFBcUNDLE9BQXJDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNVRCxHQUFHLENBQUNLLElBQUosQ0FBUyxvQ0FBc0JMLEdBQXRCLEVBQTJCQyxPQUEzQixDQUFULENBRFY7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztTQUllSyxjOzs7Ozs7OytCQUFmLGtCQUE4Qk4sR0FBOUIsRUFBd0NDLE9BQXhDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNVRCxHQUFH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QzhDLHFCQUQ5QyxFQUVLRixNQUZMLENBRVlELE9BQU8sQ0FBQ1YsVUFBRCxDQUZuQjtBQUlBL0QsWUFBQUEsT0FBTyxDQUNGeUUsT0FETCxDQUNhLEtBRGIsRUFDb0JHLFdBRHBCLENBQ2dDLGlCQURoQyxFQUVLRCxNQUZMLENBRVksbUJBRlosRUFFaUMsZ0RBRmpDLEVBRW1GLE1BRm5GLEVBR0tELE1BSEwsQ0FHWUQsT0FBTyxDQUFDVCxpQkFBRCxDQUhuQixFQWxISixDQXVISTs7QUFFQWhFLFlBQUFBLE9BQU8sQ0FBQzhFLEtBQVIsQ0FBY1QsSUFBZDs7QUF6SEosa0JBMkhRRyxXQUFXLENBQUNPLE1BQVosS0FBdUIsQ0EzSC9CO0FBQUE7QUFBQTtBQUFBOztBQUFBLGtCQTRIWS9FLE9BQU8sQ0FBQ3FFLElBQVIsQ0FBYVUsTUFBYixLQUF3QixDQTVIcEM7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxtQkE2SGtCLHVCQUFZNUUsR0FBWixFQUFpQkgsT0FBakIsQ0E3SGxCOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQStIWUEsWUFBQUEsT0FBTyxDQUFDZ0YsVUFBUjs7QUEvSFo7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxtQkFrSWNWLGFBQWEsTUFBYixVQUFrQm5FLEdBQWxCLDZDQUEwQnFFLFdBQTFCLEdBbElkOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG4gKiB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbiAqIExpY2Vuc2UgYXQ6IGh0dHBzOi8vd3d3LnRvbi5kZXYvbGljZW5zZXNcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIFRPTiBERVYgc29mdHdhcmUgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG4vLyBAZmxvd1xuXG5pbXBvcnQgeyBUT05DbGllbnQgfSBmcm9tIFwidG9uLWNsaWVudC1ub2RlLWpzXCI7XG5pbXBvcnQgeyBDbGllbnRDb2RlLCBDbGllbnRDb2RlTGV2ZWwgfSBmcm9tIFwiLi4vY29tcGlsZXJzL2NsaWVudC1jb2RlXCI7XG5pbXBvcnQgeyBTb2xpZGl0eSB9IGZyb20gXCIuLi9jb21waWxlcnMvc29saWRpdHlcIjtcbmltcG9ydCB7IERldiB9IGZyb20gXCIuLi9kZXZcIjtcbmltcG9ydCB7IE5ldHdvcmsgfSBmcm9tIFwiLi4vbmV0d29ya3MvbmV0d29ya3NcIjtcbmltcG9ydCB0eXBlIHsgTmV0d29ya0NvbmZpZyB9IGZyb20gXCIuLi9uZXR3b3Jrcy9uZXR3b3Jrc1wiO1xuaW1wb3J0IHsgd2ViIH0gZnJvbSBcIi4uL3NlcnZlci9zZXJ2ZXJcIjtcbmltcG9ydCB7IGNvbXBpbGVyc1dpdGhOZXR3b3JrcyB9IGZyb20gXCIuL29wdGlvbnNcIjtcbmltcG9ydCB0eXBlIHtcbiAgICBDbGVhbk9wdGlvbnMsXG4gICAgUmVjcmVhdGVPcHRpb25zLFxuICAgIFJlc3RhcnRPcHRpb25zLCBTZXROZXR3b3JrT3B0aW9ucyxcbiAgICBTZXR1cE9wdGlvbnMsIFNvbE9wdGlvbnMsXG4gICAgU3RhcnRPcHRpb25zLFxuICAgIFN0b3BPcHRpb25zLFxuICAgIFVzZU9wdGlvbnMsIFdlYk9wdGlvbnNcbn0gZnJvbSBcIi4vb3B0aW9uc1wiO1xuXG5pbXBvcnQgeyBpbmZvQ29tbWFuZCB9IGZyb20gXCIuL2luZm8uanNcIjtcbmltcG9ydCB7IHNweSB9IGZyb20gXCIuL3NweVwiO1xuXG5jb25zdCBwcm9ncmFtID0gcmVxdWlyZSgnY29tbWFuZGVyJyk7XG5cblxuYXN5bmMgZnVuY3Rpb24gc2V0dXBDb21tYW5kKGRldjogRGV2LCBvcHRpb25zOiBTZXR1cE9wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYuc3RhcnQoY29tcGlsZXJzV2l0aE5ldHdvcmtzKGRldiwgb3B0aW9ucykpO1xufVxuXG5cbmFzeW5jIGZ1bmN0aW9uIHN0YXJ0Q29tbWFuZChkZXY6IERldiwgb3B0aW9uczogU3RhcnRPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnN0YXJ0KGNvbXBpbGVyc1dpdGhOZXR3b3JrcyhkZXYsIG9wdGlvbnMpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc3RvcENvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IFN0b3BPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnN0b3AoY29tcGlsZXJzV2l0aE5ldHdvcmtzKGRldiwgb3B0aW9ucykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZXN0YXJ0Q29tbWFuZChkZXY6IERldiwgb3B0aW9uczogUmVzdGFydE9wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYucmVzdGFydChjb21waWxlcnNXaXRoTmV0d29ya3MoZGV2LCBvcHRpb25zKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlY3JlYXRlQ29tbWFuZChkZXY6IERldiwgb3B0aW9uczogUmVjcmVhdGVPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnJlY3JlYXRlKGNvbXBpbGVyc1dpdGhOZXR3b3JrcyhkZXYsIG9wdGlvbnMpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY2xlYW5Db21tYW5kKGRldjogRGV2LCBvcHRpb25zOiBDbGVhbk9wdGlvbnMpIHtcbiAgICBjb25zdCBhbGwgPSAhb3B0aW9ucy5jb21waWxlcnMgJiYgIW9wdGlvbnMubmV0d29ya3M7XG4gICAgYXdhaXQgZGV2LmNsZWFuKG9wdGlvbnMuY29tcGlsZXJzIHx8IGFsbCwgb3B0aW9ucy5uZXR3b3JrcyB8fCBhbGwsIG9wdGlvbnMuY29udGFpbmVycyk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNldENvbW1hbmQoZGV2OiBEZXYsIG5hbWVzOiBzdHJpbmdbXSwgb3B0aW9uczogU2V0TmV0d29ya09wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYudXBkYXRlTmV0d29ya0NvbmZpZ3MoZGV2Lm5ldHdvcmtzT3JBbGwobmFtZXMpLCAoY29uZmlnOiBOZXR3b3JrQ29uZmlnKSA9PiB7XG4gICAgICAgIGlmIChvcHRpb25zLm5ld05hbWUpIHtcbiAgICAgICAgICAgIGNvbmZpZy5uYW1lID0gb3B0aW9ucy5uZXdOYW1lO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLnBvcnQpIHtcbiAgICAgICAgICAgIGNvbmZpZy5ob3N0UG9ydCA9IG9wdGlvbnMucG9ydDtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5kYlBvcnQpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmRiUG9ydCA9PT0gJ2JpbmQnKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLmFyYW5nb0hvc3RQb3J0ID0gTmV0d29yay5kZWZhdWx0QXJhbmdvUG9ydDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5kYlBvcnQgPT09ICd1bmJpbmQnKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLmFyYW5nb0hvc3RQb3J0ID0gJyc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbmZpZy5hcmFuZ29Ib3N0UG9ydCA9IG9wdGlvbnMuZGJQb3J0IHx8ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGFkZENvbW1hbmQoZGV2OiBEZXYsIG5hbWVzOiBzdHJpbmdbXSkge1xuICAgIGF3YWl0IGRldi5hZGROZXR3b3JrcyhuYW1lcyk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlbW92ZUNvbW1hbmQoZGV2OiBEZXYsIG5hbWVzOiBzdHJpbmdbXSkge1xuICAgIGF3YWl0IGRldi5yZW1vdmVOZXR3b3JrcyhkZXYubmV0d29ya3NGcm9tTmFtZXMobmFtZXMpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGVLZXlzQ29tbWFuZChfZGV2OiBEZXYpIHtcbiAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBUT05DbGllbnQuY3JlYXRlKHtcbiAgICAgICAgc2VydmVyczogWydodHRwOi8vbG9jYWxob3N0J11cbiAgICB9KTtcbiAgICBjb25zdCBrZXlzID0gYXdhaXQgY2xpZW50LmNyeXB0by5lZDI1NTE5S2V5cGFpcigpO1xuICAgIGNvbnNvbGUubG9nKGtleXMpO1xufVxuXG5hc3luYyBmdW5jdGlvbiB1c2VDb21tYW5kKGRldjogRGV2LCB2ZXJzaW9uOiBzdHJpbmcsIG9wdGlvbnM6IFVzZU9wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYudXNlVmVyc2lvbih2ZXJzaW9uLCBjb21waWxlcnNXaXRoTmV0d29ya3MoZGV2LCBvcHRpb25zKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNvbENvbW1hbmQoZGV2OiBEZXYsIGZpbGVzOiBzdHJpbmdbXSwgb3B0aW9uczogU29sT3B0aW9ucykge1xuICAgIGF3YWl0IFNvbGlkaXR5LmJ1aWxkKGRldiwgZmlsZXMsIHtcbiAgICAgICAgY2xpZW50TGFuZ3VhZ2VzOiAob3B0aW9ucy5jbGllbnRMYW5ndWFnZXMgfHwgJycpLnNwbGl0KCcsJyksXG4gICAgICAgIGNsaWVudExldmVsOiBvcHRpb25zLmNsaWVudExldmVsIHx8IENsaWVudENvZGVMZXZlbC5ydW4sXG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdlbkNvbW1hbmQoZGV2OiBEZXYsIGZpbGVzOiBzdHJpbmdbXSwgb3B0aW9uczogU29sT3B0aW9ucykge1xuICAgIGF3YWl0IENsaWVudENvZGUuZ2VuZXJhdGUoZmlsZXMsIHtcbiAgICAgICAgY2xpZW50TGFuZ3VhZ2VzOiAob3B0aW9ucy5jbGllbnRMYW5ndWFnZXMgfHwgJycpLnNwbGl0KCcsJyksXG4gICAgICAgIGNsaWVudExldmVsOiBvcHRpb25zLmNsaWVudExldmVsIHx8IENsaWVudENvZGVMZXZlbC5ydW4sXG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNweUNvbW1hbmQoZGV2OiBEZXYsIG5ldHdvcmtzOiBzdHJpbmdbXSkge1xuICAgIGF3YWl0IHNweShkZXYsIG5ldHdvcmtzKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gd2ViQ29uc29sZUNvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IFdlYk9wdGlvbnMpIHtcbiAgICBhd2FpdCB3ZWIoZGV2LCBvcHRpb25zKTtcbn1cblxuY29uc3Qgc2hhcmVkT3B0aW9ucyA9IHtcbiAgICBuOiBbJy1uLCAtLW5ldHdvcmtzIFtuYW1lc10nLCAnYXBwbHkgY29tbWFuZCB0byBzcGVjaWZpZWQgbmV0d29ya1tzXSAobmFtZXMgbXVzdCBiZSBzZXBhcmF0ZWQgd2l0aCBjb21tYSknXSxcbiAgICBtOiBbJy1tLCAtLWNvbXBpbGVycycsICdhcHBseSBjb21tYW5kIHRvIHRoZSBjb21waWxlcnMgY29udGFpbmVyJ10sXG59O1xuXG5hc3luYyBmdW5jdGlvbiBoYW5kbGVDb21tYW5kTGluZShkZXY6IERldiwgYXJnczogc3RyaW5nW10pIHtcbiAgICBsZXQgY29tbWFuZEFjdGlvbiA9IGluZm9Db21tYW5kO1xuICAgIGxldCBjb21tYW5kQXJncyA9IFtdO1xuXG4gICAgY29uc3QgY29tbWFuZCA9IChhY3Rpb24pID0+IHtcbiAgICAgICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICBjb21tYW5kQWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgY29tbWFuZEFyZ3MgPSBhcmdzO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5uYW1lKGRldi5uYW1lKVxuICAgICAgICAudmVyc2lvbihkZXYudmVyc2lvbilcbiAgICAgICAgLm9wdGlvbignLWEsIC0tYXZhaWxhYmxlJywgJ3Nob3cgYXZhaWxhYmxlIHZlcnNpb25zJylcbiAgICAgICAgLmRlc2NyaXB0aW9uKCdUT04gTGFicyBkZXZlbG9wbWVudCB0b29scycpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnaW5mbycpLmRlc2NyaXB0aW9uKCdTaG93IHN1bW1hcnkgYWJvdXQgZGV2IGVudmlyb25tZW50JylcbiAgICAgICAgLm9wdGlvbignLWEsIC0tYXZhaWxhYmxlJywgJ3Nob3cgYXZhaWxhYmxlIHZlcnNpb25zJylcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKGluZm9Db21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdzb2wgW2ZpbGVzLi4uXScpLmRlc2NyaXB0aW9uKCdCdWlsZCBzb2xpZGl0eSBjb250cmFjdFtzXScpXG4gICAgICAgIC5vcHRpb24oXG4gICAgICAgICAgICAnLWwsIC0tY2xpZW50LWxhbmd1YWdlcyA8bGFuZ3VhZ2VzPicsXG4gICAgICAgICAgICAnZ2VuZXJhdGUgY2xpZW50IGNvZGUgZm9yIGxhbmd1YWdlczogXCJqc1wiLCBcInJzXCIgKG11bHRpcGxlIGxhbmd1YWdlcyBtdXN0IGJlIHNlcGFyYXRlZCB3aXRoIGNvbW1hKSdcbiAgICAgICAgKVxuICAgICAgICAub3B0aW9uKFxuICAgICAgICAgICAgJy1MLCAtLWNsaWVudC1sZXZlbCA8Y2xpZW50LWxldmVsPicsXG4gICAgICAgICAgICAnY2xpZW50IGNvZGUgbGV2ZWw6IFwicnVuXCIgdG8gcnVuIG9ubHksIFwiZGVwbG95XCIgdG8gcnVuIGFuZCBkZXBsb3kgKGluY2x1ZGVzIGFuIGltYWdlQmFzZTY0IG9mIGJpbmFyeSBjb250cmFjdCknLFxuICAgICAgICAgICAgJ2RlcGxveSdcbiAgICAgICAgKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoc29sQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnZ2VuIFtmaWxlcy4uLl0nKS5kZXNjcmlwdGlvbignR2VuZXJhdGUgY2xpZW50IGNvZGUgZm9yIGNvbnRyYWN0W3NdJylcbiAgICAgICAgLm9wdGlvbihcbiAgICAgICAgICAgICctbCwgLS1jbGllbnQtbGFuZ3VhZ2VzIDxsYW5ndWFnZXM+JyxcbiAgICAgICAgICAgICdnZW5lcmF0ZSBjbGllbnQgY29kZSBmb3IgbGFuZ3VhZ2VzOiBcImpzXCIsIFwicnNcIiAobXVsdGlwbGUgbGFuZ3VhZ2VzIG11c3QgYmUgc2VwYXJhdGVkIHdpdGggY29tbWEpJ1xuICAgICAgICApXG4gICAgICAgIC5vcHRpb24oXG4gICAgICAgICAgICAnLUwsIC0tY2xpZW50LWxldmVsIDxjbGllbnQtbGV2ZWw+JyxcbiAgICAgICAgICAgICdjbGllbnQgY29kZSBsZXZlbDogXCJydW5cIiB0byBydW4gb25seSwgXCJkZXBsb3lcIiB0byBydW4gYW5kIGRlcGxveSAoaW5jbHVkZXMgYW4gaW1hZ2VCYXNlNjQgb2YgYmluYXJ5IGNvbnRyYWN0KScsXG4gICAgICAgICAgICAnZGVwbG95J1xuICAgICAgICApXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChnZW5Db21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdzdGFydCcpLmRlc2NyaXB0aW9uKCdTdGFydCBkZXYgY29udGFpbmVycycpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHN0YXJ0Q29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnc3RvcCcpLmRlc2NyaXB0aW9uKCdTdG9wIGRldiBjb250YWluZXJzJylcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm4pXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5tKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoc3RvcENvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3Jlc3RhcnQnKS5kZXNjcmlwdGlvbignUmVzdGFydCBkZXYgY29udGFpbmVycycpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHJlc3RhcnRDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdyZWNyZWF0ZScpLmRlc2NyaXB0aW9uKCdSZWNyZWF0ZSBkZXYgY29udGFpbmVycycpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHJlY3JlYXRlQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnc2V0dXAnKS5kZXNjcmlwdGlvbignU2V0dXAgZGV2IGVudmlyb25tZW50JylcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm4pXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5tKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoc2V0dXBDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdjbGVhbicpLmRlc2NyaXB0aW9uKCdSZW1vdmUgZG9ja2VyIGNvbnRhaW5lcnMgYW5kIGltYWdlcyByZWxhdGVkIHRvIFRPTiBEZXYnKVxuICAgICAgICAub3B0aW9uKCctbiwgLS1uZXR3b3JrcycsICdjbGVhbiBsb2NhbCBub2RlIGRvY2tlciBjb250YWluZXJzIGFuZCBpbWFnZXMnKVxuICAgICAgICAub3B0aW9uKCctbSwgLS1jb21waWxlcnMnLCAnY2xlYW4gY29tcGlsZXJzIGRvY2tlciBjb250YWluZXJzIGFuZCBpbWFnZXMnKVxuICAgICAgICAub3B0aW9uKCctYywgLS1jb250YWluZXJzJywgJ2NsZWFuIGNvbnRhaW5lcnMgb25seScsIGZhbHNlKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoY2xlYW5Db21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCd1c2UgPHZlcnNpb24+JykuZGVzY3JpcHRpb24oJ1VzZSBzcGVjaWZpZWQgdmVyc2lvbiBmb3IgY29udGFpbmVycycpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHVzZUNvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3NldCBbbmV0d29yay4uLl0nKS5kZXNjcmlwdGlvbignU2V0IG5ldHdvcmtbc10gb3B0aW9ucycpXG4gICAgICAgIC5vcHRpb24oJy1wLCAtLXBvcnQgPHBvcnQ+JywgJ2hvc3QgcG9ydCB0byBib3VuZCBsb2NhbCBub2RlJylcbiAgICAgICAgLm9wdGlvbignLWQsIC0tZGItcG9ydCA8YmluZGluZz4nLCAnaG9zdCBwb3J0IHRvIGJvdW5kIGxvY2FsIG5vZGVzIEFyYW5nbyBEQiAoXCJiaW5kXCIgdG8gdXNlIGRlZmF1bHQgQXJhbmdvIERCIHBvcnQsIFwidW5iaW5kXCIgdG8gdW5iaW5kIEFyYW5nbyBEQiBwb3J0KScpXG4gICAgICAgIC5vcHRpb24oJy1uLCAtLW5ldy1uYW1lIDxuYW1lPicsICdzZXQgbmV3IG5hbWUgZm9yIG5ldHdvcmsnKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoc2V0Q29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnYWRkIFtuZXR3b3JrLi4uXScpLmRlc2NyaXB0aW9uKCdBZGQgbmV0d29ya1tzXScpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChhZGRDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdyZW1vdmUgW25ldHdvcmsuLi5dJykuYWxpYXMoJ3JtJykuZGVzY3JpcHRpb24oJ1JlbW92ZSBuZXR3b3JrW3NdJylcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHJlbW92ZUNvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ2tleXMnKS5hbGlhcygnaycpLmRlc2NyaXB0aW9uKCdHZW5lcmF0ZSByYW5kb20gS2V5IFBhaXInKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoZ2VuZXJhdGVLZXlzQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnc3B5IFtuZXR3b3Jrcy4uLl0nKS5kZXNjcmlwdGlvbignUnVuIG5ldHdvcmsgc2Nhbm5lcicpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChzcHlDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCd3ZWInKS5kZXNjcmlwdGlvbignUnVuIHdlYiBjb25zb2xlJylcbiAgICAgICAgLm9wdGlvbignLXAsIC0tcG9ydCA8cG9ydD4nLCAnaG9zdCBwb3J0IHRvIGJvdW5kIHdlYiBjb25zb2xlIChkZWZhdWx0OiA4ODAwKScsICc4ODAwJylcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHdlYkNvbnNvbGVDb21tYW5kKSk7XG5cbiAgICAvLyAuY29tbWFuZCgndXBkYXRlJywgYHVwZGF0ZSAke2Rldi5uYW1lfSBkb2NrZXIgaW1hZ2VzYCkuYWN0aW9uKGFjdGlvbilcblxuICAgIHByb2dyYW0ucGFyc2UoYXJncyk7XG5cbiAgICBpZiAoY29tbWFuZEFyZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGlmIChwcm9ncmFtLmFyZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBhd2FpdCBpbmZvQ29tbWFuZChkZXYsIHByb2dyYW0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvZ3JhbS5vdXRwdXRIZWxwKCk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBhd2FpdCBjb21tYW5kQWN0aW9uKC4uLltkZXYsIC4uLmNvbW1hbmRBcmdzXSk7XG4gICAgfVxufVxuXG5leHBvcnQgeyBoYW5kbGVDb21tYW5kTGluZSB9O1xuIl19