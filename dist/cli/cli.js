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
              clientLevel: options.clientLevel || _clientCode.ClientCodeLevel.run,
              jsModule: options.jsModule || _clientCode.JSModule.node
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
              clientLevel: options.clientLevel || _clientCode.ClientCodeLevel.run,
              jsModule: options.jsModule || _clientCode.JSModule.node
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
            program.command('sol [files...]').description('Build solidity contract[s]').option('-l, --client-languages <languages>', 'generate client code for languages: "js", "rs" (multiple languages must be separated with comma)').option('-L, --client-level <client-level>', 'client code level: "run" to run only, "deploy" to run and deploy (includes an imageBase64 of binary contract)', 'deploy').option('--js-module <module-type>', "Java Script module type: " + "`node` to use with `const FooContract = require('foo`)`, " + "`nodeNoDefault` to use with `const {FooContract} = require('foo`)`, " + "`es` to use with `import FooContract from 'foo'`, " + "`esNoDefault` to use with `import {FooContract} from 'foo'` (`node` is a default option)", 'node').action(command(solCommand));
            program.command('gen [files...]').description('Generate client code for contract[s]').option('-l, --client-languages <languages>', 'generate client code for languages: "js", "rs" (multiple languages must be separated with comma)').option('-L, --client-level <client-level>', 'client code level: "run" to run only, "deploy" to run and deploy (includes an imageBase64 of binary contract)', 'deploy').option('--js-module <module-type>', "Java Script module type: " + "`node` to use with `const FooContract = require('foo`)`, " + "`nodeNoDefault` to use with `const {FooContract} = require('foo`)`, " + "`es` to use with `import FooContract from 'foo'`, " + "`esNoDefault` to use with `import {FooContract} from 'foo'` (`node` is a default option)", 'node').action(command(genCommand));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvY2xpLmpzIl0sIm5hbWVzIjpbIlVTRV9FWFBFUklNRU5UQUxfRkVBVFVSRVMiLCJwcm9ncmFtIiwicmVxdWlyZSIsInNldHVwQ29tbWFuZCIsImRldiIsIm9wdGlvbnMiLCJzdGFydCIsInN0YXJ0Q29tbWFuZCIsInN0b3BDb21tYW5kIiwic3RvcCIsInJlc3RhcnRDb21tYW5kIiwicmVzdGFydCIsInJlY3JlYXRlQ29tbWFuZCIsInJlY3JlYXRlIiwiY2xlYW5Db21tYW5kIiwiYWxsIiwiY29tcGlsZXJzIiwibmV0d29ya3MiLCJjbGVhbiIsImNvbnRhaW5lcnMiLCJzZXRDb21tYW5kIiwibmFtZXMiLCJ1cGRhdGVOZXR3b3JrQ29uZmlncyIsIm5ldHdvcmtzT3JBbGwiLCJjb25maWciLCJuZXdOYW1lIiwibmFtZSIsInBvcnQiLCJob3N0UG9ydCIsImRiUG9ydCIsImFyYW5nb0hvc3RQb3J0IiwiTmV0d29yayIsImRlZmF1bHRBcmFuZ29Qb3J0IiwiYWRkQ29tbWFuZCIsImFkZE5ldHdvcmtzIiwicmVtb3ZlQ29tbWFuZCIsInJlbW92ZU5ldHdvcmtzIiwibmV0d29ya3NGcm9tTmFtZXMiLCJnZW5lcmF0ZUtleXNDb21tYW5kIiwiX2RldiIsIlRPTkNsaWVudCIsImNyZWF0ZSIsInNlcnZlcnMiLCJjbGllbnQiLCJjcnlwdG8iLCJlZDI1NTE5S2V5cGFpciIsImtleXMiLCJjb25zb2xlIiwibG9nIiwidXNlQ29tbWFuZCIsInZlcnNpb24iLCJ1c2VWZXJzaW9uIiwic29sQ29tbWFuZCIsImZpbGVzIiwiU29saWRpdHkiLCJidWlsZCIsImNsaWVudExhbmd1YWdlcyIsInNwbGl0IiwiY2xpZW50TGV2ZWwiLCJDbGllbnRDb2RlTGV2ZWwiLCJydW4iLCJqc01vZHVsZSIsIkpTTW9kdWxlIiwibm9kZSIsImdlbkNvbW1hbmQiLCJDbGllbnRDb2RlIiwiZ2VuZXJhdGUiLCJzcHlDb21tYW5kIiwid2ViQ29uc29sZUNvbW1hbmQiLCJzaGFyZWRPcHRpb25zIiwibiIsIm0iLCJoYW5kbGVDb21tYW5kTGluZSIsImFyZ3MiLCJjb21tYW5kQWN0aW9uIiwiaW5mb0NvbW1hbmQiLCJjb21tYW5kQXJncyIsImNvbW1hbmQiLCJhY3Rpb24iLCJvcHRpb24iLCJkZXNjcmlwdGlvbiIsImlzRGVmYXVsdCIsImFsaWFzIiwicGFyc2UiLCJsZW5ndGgiLCJvdXRwdXRIZWxwIiwiYXZhaWxhYmxlIiwicGFyZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFnQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBV0E7O0FBQ0E7O0FBbkNBOzs7Ozs7Ozs7Ozs7OztBQXFDQSxJQUFNQSx5QkFBeUIsR0FBRyxLQUFsQzs7QUFFQSxJQUFNQyxPQUFPLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXZCOztTQUdlQyxZOzs7Ozs7OytCQUFmLGlCQUE0QkMsR0FBNUIsRUFBc0NDLE9BQXRDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNVRCxHQUFHLENBQUNFLEtBQUosQ0FBVSxvQ0FBc0JGLEdBQXRCLEVBQTJCQyxPQUEzQixDQUFWLENBRFY7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztTQUtlRSxZOzs7Ozs7OytCQUFmLGtCQUE0QkgsR0FBNUIsRUFBc0NDLE9BQXRDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNVRCxHQUFHLENBQUNFLEtBQUosQ0FBVSxvQ0FBc0JGLEdBQXRCLEVBQTJCQyxPQUEzQixDQUFWLENBRFY7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztTQUllRyxXOzs7Ozs7OytCQUFmLGtCQUEyQkosR0FBM0IsRUFBcUNDLE9BQXJDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNVRCxHQUFHLENBQUNLLElBQUosQ0FBUyxvQ0FBc0JMLEdBQXRCLEVBQTJCQyxPQUEzQixDQUFULENBRFY7O0FBQUE7QUFB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QkFBWWhGLEdBQVosRUFBaUJILE9BQWpCLENBakpsQjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFtSllBLFlBQUFBLE9BQU8sQ0FBQ29GLFVBQVI7O0FBbkpaO0FBQUE7QUFBQTs7QUFBQTtBQXNKUSxnQkFBSVgsYUFBYSxLQUFLQyxpQkFBdEIsRUFBbUM7QUFDekJ0RSxjQUFBQSxPQUR5QixHQUNmdUUsV0FBVyxDQUFDQSxXQUFXLENBQUNRLE1BQVosR0FBcUIsQ0FBdEIsQ0FESTtBQUUvQi9FLGNBQUFBLE9BQU8sQ0FBQ2lGLFNBQVIsR0FBb0JqRixPQUFPLENBQUNrRixNQUFSLENBQWVELFNBQW5DO0FBQ0g7O0FBekpUO0FBQUEsbUJBMEpjWixhQUFhLE1BQWIsVUFBY3RFLEdBQWQsNkNBQXNCd0UsV0FBdEIsR0ExSmQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOC0yMDE5IFRPTiBERVYgU09MVVRJT05TIExURC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgU09GVFdBUkUgRVZBTFVBVElPTiBMaWNlbnNlICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbiAqIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxuICogTGljZW5zZSBhdDogaHR0cHM6Ly93d3cudG9uLmRldi9saWNlbnNlc1xuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgVE9OIERFViBzb2Z0d2FyZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbi8vIEBmbG93XG5cbmltcG9ydCB7IFRPTkNsaWVudCB9IGZyb20gXCJ0b24tY2xpZW50LW5vZGUtanNcIjtcbmltcG9ydCB7IENsaWVudENvZGUsIENsaWVudENvZGVMZXZlbCwgSlNNb2R1bGUgfSBmcm9tIFwiLi4vY29tcGlsZXJzL2NsaWVudC1jb2RlXCI7XG5pbXBvcnQgeyBTb2xpZGl0eSB9IGZyb20gXCIuLi9jb21waWxlcnMvc29saWRpdHlcIjtcbmltcG9ydCB7IERldiB9IGZyb20gXCIuLi9kZXZcIjtcbmltcG9ydCB7IE5ldHdvcmsgfSBmcm9tIFwiLi4vbmV0d29ya3MvbmV0d29ya3NcIjtcbmltcG9ydCB0eXBlIHsgTmV0d29ya0NvbmZpZyB9IGZyb20gXCIuLi9uZXR3b3Jrcy9uZXR3b3Jrc1wiO1xuaW1wb3J0IHsgd2ViIH0gZnJvbSBcIi4uL3NlcnZlci9zZXJ2ZXJcIjtcbmltcG9ydCB7IGNvbXBpbGVyc1dpdGhOZXR3b3JrcyB9IGZyb20gXCIuL29wdGlvbnNcIjtcbmltcG9ydCB0eXBlIHtcbiAgICBDbGVhbk9wdGlvbnMsXG4gICAgUmVjcmVhdGVPcHRpb25zLFxuICAgIFJlc3RhcnRPcHRpb25zLCBTZXROZXR3b3JrT3B0aW9ucyxcbiAgICBTZXR1cE9wdGlvbnMsIFNvbE9wdGlvbnMsXG4gICAgU3RhcnRPcHRpb25zLFxuICAgIFN0b3BPcHRpb25zLFxuICAgIFVzZU9wdGlvbnMsIFdlYk9wdGlvbnNcbn0gZnJvbSBcIi4vb3B0aW9uc1wiO1xuXG5pbXBvcnQgeyBpbmZvQ29tbWFuZCB9IGZyb20gXCIuL2luZm8uanNcIjtcbmltcG9ydCB7IHNweSB9IGZyb20gXCIuL3NweVwiO1xuXG5jb25zdCBVU0VfRVhQRVJJTUVOVEFMX0ZFQVRVUkVTID0gZmFsc2U7XG5cbmNvbnN0IHByb2dyYW0gPSByZXF1aXJlKCdjb21tYW5kZXInKTtcblxuXG5hc3luYyBmdW5jdGlvbiBzZXR1cENvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IFNldHVwT3B0aW9ucykge1xuICAgIGF3YWl0IGRldi5zdGFydChjb21waWxlcnNXaXRoTmV0d29ya3MoZGV2LCBvcHRpb25zKSk7XG59XG5cblxuYXN5bmMgZnVuY3Rpb24gc3RhcnRDb21tYW5kKGRldjogRGV2LCBvcHRpb25zOiBTdGFydE9wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYuc3RhcnQoY29tcGlsZXJzV2l0aE5ldHdvcmtzKGRldiwgb3B0aW9ucykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzdG9wQ29tbWFuZChkZXY6IERldiwgb3B0aW9uczogU3RvcE9wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYuc3RvcChjb21waWxlcnNXaXRoTmV0d29ya3MoZGV2LCBvcHRpb25zKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlc3RhcnRDb21tYW5kKGRldjogRGV2LCBvcHRpb25zOiBSZXN0YXJ0T3B0aW9ucykge1xuICAgIGF3YWl0IGRldi5yZXN0YXJ0KGNvbXBpbGVyc1dpdGhOZXR3b3JrcyhkZXYsIG9wdGlvbnMpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVjcmVhdGVDb21tYW5kKGRldjogRGV2LCBvcHRpb25zOiBSZWNyZWF0ZU9wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYucmVjcmVhdGUoY29tcGlsZXJzV2l0aE5ldHdvcmtzKGRldiwgb3B0aW9ucykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjbGVhbkNvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IENsZWFuT3B0aW9ucykge1xuICAgIGNvbnN0IGFsbCA9ICFvcHRpb25zLmNvbXBpbGVycyAmJiAhb3B0aW9ucy5uZXR3b3JrcztcbiAgICBhd2FpdCBkZXYuY2xlYW4ob3B0aW9ucy5jb21waWxlcnMgfHwgYWxsLCBvcHRpb25zLm5ldHdvcmtzIHx8IGFsbCwgb3B0aW9ucy5jb250YWluZXJzKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2V0Q29tbWFuZChkZXY6IERldiwgbmFtZXM6IHN0cmluZ1tdLCBvcHRpb25zOiBTZXROZXR3b3JrT3B0aW9ucykge1xuICAgIGF3YWl0IGRldi51cGRhdGVOZXR3b3JrQ29uZmlncyhkZXYubmV0d29ya3NPckFsbChuYW1lcyksIChjb25maWc6IE5ldHdvcmtDb25maWcpID0+IHtcbiAgICAgICAgaWYgKG9wdGlvbnMubmV3TmFtZSkge1xuICAgICAgICAgICAgY29uZmlnLm5hbWUgPSBvcHRpb25zLm5ld05hbWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMucG9ydCkge1xuICAgICAgICAgICAgY29uZmlnLmhvc3RQb3J0ID0gb3B0aW9ucy5wb3J0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmRiUG9ydCkge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZGJQb3J0ID09PSAnYmluZCcpIHtcbiAgICAgICAgICAgICAgICBjb25maWcuYXJhbmdvSG9zdFBvcnQgPSBOZXR3b3JrLmRlZmF1bHRBcmFuZ29Qb3J0O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmRiUG9ydCA9PT0gJ3VuYmluZCcpIHtcbiAgICAgICAgICAgICAgICBjb25maWcuYXJhbmdvSG9zdFBvcnQgPSAnJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLmFyYW5nb0hvc3RQb3J0ID0gb3B0aW9ucy5kYlBvcnQgfHwgJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gYWRkQ29tbWFuZChkZXY6IERldiwgbmFtZXM6IHN0cmluZ1tdKSB7XG4gICAgYXdhaXQgZGV2LmFkZE5ldHdvcmtzKG5hbWVzKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVtb3ZlQ29tbWFuZChkZXY6IERldiwgbmFtZXM6IHN0cmluZ1tdKSB7XG4gICAgYXdhaXQgZGV2LnJlbW92ZU5ldHdvcmtzKGRldi5uZXR3b3Jrc0Zyb21OYW1lcyhuYW1lcykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZW5lcmF0ZUtleXNDb21tYW5kKF9kZXY6IERldikge1xuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IFRPTkNsaWVudC5jcmVhdGUoe1xuICAgICAgICBzZXJ2ZXJzOiBbJ2h0dHA6Ly9sb2NhbGhvc3QnXVxuICAgIH0pO1xuICAgIGNvbnN0IGtleXMgPSBhd2FpdCBjbGllbnQuY3J5cHRvLmVkMjU1MTlLZXlwYWlyKCk7XG4gICAgY29uc29sZS5sb2coa2V5cyk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHVzZUNvbW1hbmQoZGV2OiBEZXYsIHZlcnNpb246IHN0cmluZywgb3B0aW9uczogVXNlT3B0aW9ucykge1xuICAgIGF3YWl0IGRldi51c2VWZXJzaW9uKHZlcnNpb24sIGNvbXBpbGVyc1dpdGhOZXR3b3JrcyhkZXYsIG9wdGlvbnMpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc29sQ29tbWFuZChkZXY6IERldiwgZmlsZXM6IHN0cmluZ1tdLCBvcHRpb25zOiBTb2xPcHRpb25zKSB7XG4gICAgYXdhaXQgU29saWRpdHkuYnVpbGQoZGV2LCBmaWxlcywge1xuICAgICAgICBjbGllbnRMYW5ndWFnZXM6IChvcHRpb25zLmNsaWVudExhbmd1YWdlcyB8fCAnJykuc3BsaXQoJywnKSxcbiAgICAgICAgY2xpZW50TGV2ZWw6IG9wdGlvbnMuY2xpZW50TGV2ZWwgfHwgQ2xpZW50Q29kZUxldmVsLnJ1bixcbiAgICAgICAganNNb2R1bGU6IG9wdGlvbnMuanNNb2R1bGUgfHwgSlNNb2R1bGUubm9kZSxcbiAgICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2VuQ29tbWFuZChkZXY6IERldiwgZmlsZXM6IHN0cmluZ1tdLCBvcHRpb25zOiBTb2xPcHRpb25zKSB7XG4gICAgYXdhaXQgQ2xpZW50Q29kZS5nZW5lcmF0ZShmaWxlcywge1xuICAgICAgICBjbGllbnRMYW5ndWFnZXM6IChvcHRpb25zLmNsaWVudExhbmd1YWdlcyB8fCAnJykuc3BsaXQoJywnKSxcbiAgICAgICAgY2xpZW50TGV2ZWw6IG9wdGlvbnMuY2xpZW50TGV2ZWwgfHwgQ2xpZW50Q29kZUxldmVsLnJ1bixcbiAgICAgICAganNNb2R1bGU6IG9wdGlvbnMuanNNb2R1bGUgfHwgSlNNb2R1bGUubm9kZSxcbiAgICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc3B5Q29tbWFuZChkZXY6IERldiwgbmV0d29ya3M6IHN0cmluZ1tdKSB7XG4gICAgYXdhaXQgc3B5KGRldiwgbmV0d29ya3MpO1xufVxuXG5hc3luYyBmdW5jdGlvbiB3ZWJDb25zb2xlQ29tbWFuZChkZXY6IERldiwgb3B0aW9uczogV2ViT3B0aW9ucykge1xuICAgIGF3YWl0IHdlYihkZXYsIG9wdGlvbnMpO1xufVxuXG5jb25zdCBzaGFyZWRPcHRpb25zID0ge1xuICAgIG46IFsnLW4sIC0tbmV0d29ya3MgW25hbWVzXScsICdhcHBseSBjb21tYW5kIHRvIHNwZWNpZmllZCBuZXR3b3JrW3NdIChuYW1lcyBtdXN0IGJlIHNlcGFyYXRlZCB3aXRoIGNvbW1hKSddLFxuICAgIG06IFsnLW0sIC0tY29tcGlsZXJzJywgJ2FwcGx5IGNvbW1hbmQgdG8gdGhlIGNvbXBpbGVycyBjb250YWluZXInXSxcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZUNvbW1hbmRMaW5lKGRldjogRGV2LCBhcmdzOiBzdHJpbmdbXSkge1xuICAgIGxldCBjb21tYW5kQWN0aW9uID0gaW5mb0NvbW1hbmQ7XG4gICAgbGV0IGNvbW1hbmRBcmdzID0gW107XG5cbiAgICBjb25zdCBjb21tYW5kID0gKGFjdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgIGNvbW1hbmRBY3Rpb24gPSBhY3Rpb247XG4gICAgICAgICAgICBjb21tYW5kQXJncyA9IGFyZ3M7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLm5hbWUoZGV2Lm5hbWUpXG4gICAgICAgIC52ZXJzaW9uKGRldi52ZXJzaW9uKVxuICAgICAgICAub3B0aW9uKCctYSwgLS1hdmFpbGFibGUnLCAnc2hvdyBhdmFpbGFibGUgdmVyc2lvbnMnKVxuICAgICAgICAuZGVzY3JpcHRpb24oJ1RPTiBMYWJzIGRldmVsb3BtZW50IHRvb2xzJyk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdpbmZvJywgeyBpc0RlZmF1bHQ6IHRydWUgfSkuZGVzY3JpcHRpb24oJ1Nob3cgc3VtbWFyeSBhYm91dCBkZXYgZW52aXJvbm1lbnQnKVxuICAgICAgICAub3B0aW9uKCctYSwgLS1hdmFpbGFibGUnLCAnc2hvdyBhdmFpbGFibGUgdmVyc2lvbnMnKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoaW5mb0NvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3NvbCBbZmlsZXMuLi5dJykuZGVzY3JpcHRpb24oJ0J1aWxkIHNvbGlkaXR5IGNvbnRyYWN0W3NdJylcbiAgICAgICAgLm9wdGlvbihcbiAgICAgICAgICAgICctbCwgLS1jbGllbnQtbGFuZ3VhZ2VzIDxsYW5ndWFnZXM+JyxcbiAgICAgICAgICAgICdnZW5lcmF0ZSBjbGllbnQgY29kZSBmb3IgbGFuZ3VhZ2VzOiBcImpzXCIsIFwicnNcIiAobXVsdGlwbGUgbGFuZ3VhZ2VzIG11c3QgYmUgc2VwYXJhdGVkIHdpdGggY29tbWEpJ1xuICAgICAgICApXG4gICAgICAgIC5vcHRpb24oXG4gICAgICAgICAgICAnLUwsIC0tY2xpZW50LWxldmVsIDxjbGllbnQtbGV2ZWw+JyxcbiAgICAgICAgICAgICdjbGllbnQgY29kZSBsZXZlbDogXCJydW5cIiB0byBydW4gb25seSwgXCJkZXBsb3lcIiB0byBydW4gYW5kIGRlcGxveSAoaW5jbHVkZXMgYW4gaW1hZ2VCYXNlNjQgb2YgYmluYXJ5IGNvbnRyYWN0KScsXG4gICAgICAgICAgICAnZGVwbG95J1xuICAgICAgICApXG4gICAgICAgIC5vcHRpb24oXG4gICAgICAgICAgICAnLS1qcy1tb2R1bGUgPG1vZHVsZS10eXBlPicsXG4gICAgICAgICAgICBcIkphdmEgU2NyaXB0IG1vZHVsZSB0eXBlOiBcIiArXG4gICAgICAgICAgICBcImBub2RlYCB0byB1c2Ugd2l0aCBgY29uc3QgRm9vQ29udHJhY3QgPSByZXF1aXJlKCdmb29gKWAsIFwiICtcbiAgICAgICAgICAgIFwiYG5vZGVOb0RlZmF1bHRgIHRvIHVzZSB3aXRoIGBjb25zdCB7Rm9vQ29udHJhY3R9ID0gcmVxdWlyZSgnZm9vYClgLCBcIiArXG4gICAgICAgICAgICBcImBlc2AgdG8gdXNlIHdpdGggYGltcG9ydCBGb29Db250cmFjdCBmcm9tICdmb28nYCwgXCIgK1xuICAgICAgICAgICAgXCJgZXNOb0RlZmF1bHRgIHRvIHVzZSB3aXRoIGBpbXBvcnQge0Zvb0NvbnRyYWN0fSBmcm9tICdmb28nYCAoYG5vZGVgIGlzIGEgZGVmYXVsdCBvcHRpb24pXCIsXG4gICAgICAgICAgICAnbm9kZSdcbiAgICAgICAgKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoc29sQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnZ2VuIFtmaWxlcy4uLl0nKS5kZXNjcmlwdGlvbignR2VuZXJhdGUgY2xpZW50IGNvZGUgZm9yIGNvbnRyYWN0W3NdJylcbiAgICAgICAgLm9wdGlvbihcbiAgICAgICAgICAgICctbCwgLS1jbGllbnQtbGFuZ3VhZ2VzIDxsYW5ndWFnZXM+JyxcbiAgICAgICAgICAgICdnZW5lcmF0ZSBjbGllbnQgY29kZSBmb3IgbGFuZ3VhZ2VzOiBcImpzXCIsIFwicnNcIiAobXVsdGlwbGUgbGFuZ3VhZ2VzIG11c3QgYmUgc2VwYXJhdGVkIHdpdGggY29tbWEpJ1xuICAgICAgICApXG4gICAgICAgIC5vcHRpb24oXG4gICAgICAgICAgICAnLUwsIC0tY2xpZW50LWxldmVsIDxjbGllbnQtbGV2ZWw+JyxcbiAgICAgICAgICAgICdjbGllbnQgY29kZSBsZXZlbDogXCJydW5cIiB0byBydW4gb25seSwgXCJkZXBsb3lcIiB0byBydW4gYW5kIGRlcGxveSAoaW5jbHVkZXMgYW4gaW1hZ2VCYXNlNjQgb2YgYmluYXJ5IGNvbnRyYWN0KScsXG4gICAgICAgICAgICAnZGVwbG95J1xuICAgICAgICApXG4gICAgICAgIC5vcHRpb24oXG4gICAgICAgICAgICAnLS1qcy1tb2R1bGUgPG1vZHVsZS10eXBlPicsXG4gICAgICAgICAgICBcIkphdmEgU2NyaXB0IG1vZHVsZSB0eXBlOiBcIiArXG4gICAgICAgICAgICBcImBub2RlYCB0byB1c2Ugd2l0aCBgY29uc3QgRm9vQ29udHJhY3QgPSByZXF1aXJlKCdmb29gKWAsIFwiICtcbiAgICAgICAgICAgIFwiYG5vZGVOb0RlZmF1bHRgIHRvIHVzZSB3aXRoIGBjb25zdCB7Rm9vQ29udHJhY3R9ID0gcmVxdWlyZSgnZm9vYClgLCBcIiArXG4gICAgICAgICAgICBcImBlc2AgdG8gdXNlIHdpdGggYGltcG9ydCBGb29Db250cmFjdCBmcm9tICdmb28nYCwgXCIgK1xuICAgICAgICAgICAgXCJgZXNOb0RlZmF1bHRgIHRvIHVzZSB3aXRoIGBpbXBvcnQge0Zvb0NvbnRyYWN0fSBmcm9tICdmb28nYCAoYG5vZGVgIGlzIGEgZGVmYXVsdCBvcHRpb24pXCIsXG4gICAgICAgICAgICAnbm9kZSdcbiAgICAgICAgKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoZ2VuQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnc3RhcnQnKS5kZXNjcmlwdGlvbignU3RhcnQgZGV2IGNvbnRhaW5lcnMnKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubilcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm0pXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChzdGFydENvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3N0b3AnKS5kZXNjcmlwdGlvbignU3RvcCBkZXYgY29udGFpbmVycycpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHN0b3BDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdyZXN0YXJ0JykuZGVzY3JpcHRpb24oJ1Jlc3RhcnQgZGV2IGNvbnRhaW5lcnMnKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubilcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm0pXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChyZXN0YXJ0Q29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgncmVjcmVhdGUnKS5kZXNjcmlwdGlvbignUmVjcmVhdGUgZGV2IGNvbnRhaW5lcnMnKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubilcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm0pXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChyZWNyZWF0ZUNvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3NldHVwJykuZGVzY3JpcHRpb24oJ1NldHVwIGRldiBlbnZpcm9ubWVudCcpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHNldHVwQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnY2xlYW4nKS5kZXNjcmlwdGlvbignUmVtb3ZlIGRvY2tlciBjb250YWluZXJzIGFuZCBpbWFnZXMgcmVsYXRlZCB0byBUT04gRGV2JylcbiAgICAgICAgLm9wdGlvbignLW4sIC0tbmV0d29ya3MnLCAnY2xlYW4gbG9jYWwgbm9kZSBkb2NrZXIgY29udGFpbmVycyBhbmQgaW1hZ2VzJylcbiAgICAgICAgLm9wdGlvbignLW0sIC0tY29tcGlsZXJzJywgJ2NsZWFuIGNvbXBpbGVycyBkb2NrZXIgY29udGFpbmVycyBhbmQgaW1hZ2VzJylcbiAgICAgICAgLm9wdGlvbignLWMsIC0tY29udGFpbmVycycsICdjbGVhbiBjb250YWluZXJzIG9ubHknLCBmYWxzZSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKGNsZWFuQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgndXNlIDx2ZXJzaW9uPicpLmRlc2NyaXB0aW9uKCdVc2Ugc3BlY2lmaWVkIHZlcnNpb24gZm9yIGNvbnRhaW5lcnMnKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubilcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm0pXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZCh1c2VDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdzZXQgW25ldHdvcmsuLi5dJykuZGVzY3JpcHRpb24oJ1NldCBuZXR3b3JrW3NdIG9wdGlvbnMnKVxuICAgICAgICAub3B0aW9uKCctcCwgLS1wb3J0IDxwb3J0PicsICdob3N0IHBvcnQgdG8gYm91bmQgbG9jYWwgbm9kZScpXG4gICAgICAgIC5vcHRpb24oJy1kLCAtLWRiLXBvcnQgPGJpbmRpbmc+JywgJ2hvc3QgcG9ydCB0byBib3VuZCBsb2NhbCBub2RlcyBBcmFuZ28gREIgKFwiYmluZFwiIHRvIHVzZSBkZWZhdWx0IEFyYW5nbyBEQiBwb3J0LCBcInVuYmluZFwiIHRvIHVuYmluZCBBcmFuZ28gREIgcG9ydCknKVxuICAgICAgICAub3B0aW9uKCctbiwgLS1uZXctbmFtZSA8bmFtZT4nLCAnc2V0IG5ldyBuYW1lIGZvciBuZXR3b3JrJylcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHNldENvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ2FkZCBbbmV0d29yay4uLl0nKS5kZXNjcmlwdGlvbignQWRkIG5ldHdvcmtbc10nKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoYWRkQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgncmVtb3ZlIFtuZXR3b3JrLi4uXScpLmFsaWFzKCdybScpLmRlc2NyaXB0aW9uKCdSZW1vdmUgbmV0d29ya1tzXScpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChyZW1vdmVDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdrZXlzJykuYWxpYXMoJ2snKS5kZXNjcmlwdGlvbignR2VuZXJhdGUgcmFuZG9tIEtleSBQYWlyJylcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKGdlbmVyYXRlS2V5c0NvbW1hbmQpKTtcblxuICAgIGlmIChVU0VfRVhQRVJJTUVOVEFMX0ZFQVRVUkVTKSB7XG4gICAgICAgIHByb2dyYW1cbiAgICAgICAgICAgIC5jb21tYW5kKCdzcHkgW25ldHdvcmtzLi4uXScpLmRlc2NyaXB0aW9uKCdSdW4gbmV0d29yayBzY2FubmVyJylcbiAgICAgICAgICAgIC5hY3Rpb24oY29tbWFuZChzcHlDb21tYW5kKSk7XG5cbiAgICAgICAgcHJvZ3JhbVxuICAgICAgICAgICAgLmNvbW1hbmQoJ3dlYicpLmRlc2NyaXB0aW9uKCdSdW4gd2ViIGNvbnNvbGUnKVxuICAgICAgICAgICAgLm9wdGlvbignLXAsIC0tcG9ydCA8cG9ydD4nLCAnaG9zdCBwb3J0IHRvIGJvdW5kIHdlYiBjb25zb2xlIChkZWZhdWx0OiA4ODAwKScsICc4ODAwJylcbiAgICAgICAgICAgIC5hY3Rpb24oY29tbWFuZCh3ZWJDb25zb2xlQ29tbWFuZCkpO1xuICAgIH1cblxuICAgIC8vIC5jb21tYW5kKCd1cGRhdGUnLCBgdXBkYXRlICR7ZGV2Lm5hbWV9IGRvY2tlciBpbWFnZXNgKS5hY3Rpb24oYWN0aW9uKVxuXG4gICAgcHJvZ3JhbS5wYXJzZShhcmdzKTtcblxuICAgIGlmIChjb21tYW5kQXJncy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgaWYgKHByb2dyYW0uYXJncy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGF3YWl0IGluZm9Db21tYW5kKGRldiwgcHJvZ3JhbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9ncmFtLm91dHB1dEhlbHAoKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChjb21tYW5kQWN0aW9uID09PSBpbmZvQ29tbWFuZCkge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGNvbW1hbmRBcmdzW2NvbW1hbmRBcmdzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgb3B0aW9ucy5hdmFpbGFibGUgPSBvcHRpb25zLnBhcmVudC5hdmFpbGFibGU7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgY29tbWFuZEFjdGlvbihkZXYsIC4uLmNvbW1hbmRBcmdzKTtcbiAgICB9XG59XG5cbmV4cG9ydCB7IGhhbmRsZUNvbW1hbmRMaW5lIH07XG4iXX0=