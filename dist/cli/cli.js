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

function convertAddress(_x21, _x22) {
  return _convertAddress.apply(this, arguments);
}

function _convertAddress() {
  _convertAddress = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee13(_dev, addr) {
    var client, showHex, showBase64;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return _tonClientNodeJs.TONClient.create({
              servers: ['http://localhost']
            });

          case 2:
            client = _context13.sent;

            showHex =
            /*#__PURE__*/
            function () {
              var _ref = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee11() {
                var converted;
                return _regenerator["default"].wrap(function _callee11$(_context11) {
                  while (1) {
                    switch (_context11.prev = _context11.next) {
                      case 0:
                        _context11.next = 2;
                        return client.contracts.convertAddress({
                          address: addr,
                          convertTo: 'Hex'
                        });

                      case 2:
                        converted = _context11.sent;
                        console.log("hex = ".concat(converted.address));

                      case 4:
                      case "end":
                        return _context11.stop();
                    }
                  }
                }, _callee11);
              }));

              return function showHex() {
                return _ref.apply(this, arguments);
              };
            }();

            showBase64 =
            /*#__PURE__*/
            function () {
              var _ref2 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee12(bounce, test, url) {
                var converted, flags;
                return _regenerator["default"].wrap(function _callee12$(_context12) {
                  while (1) {
                    switch (_context12.prev = _context12.next) {
                      case 0:
                        _context12.next = 2;
                        return client.contracts.convertAddress({
                          address: addr,
                          convertTo: 'Base64',
                          base64Params: {
                            bounce: bounce,
                            test: test,
                            url: url
                          }
                        });

                      case 2:
                        converted = _context12.sent;
                        flags = [bounce ? 'bounce' : '', test ? 'test' : 'main', url ? 'url' : ''].filter(function (x) {
                          return x !== '';
                        }).join(', ');
                        console.log("".concat(flags, " = ").concat(converted.address));

                      case 5:
                      case "end":
                        return _context12.stop();
                    }
                  }
                }, _callee12);
              }));

              return function showBase64(_x38, _x39, _x40) {
                return _ref2.apply(this, arguments);
              };
            }();

            _context13.next = 7;
            return showHex();

          case 7:
            _context13.next = 9;
            return showBase64(false, false, false);

          case 9:
            _context13.next = 11;
            return showBase64(false, false, true);

          case 11:
            _context13.next = 13;
            return showBase64(false, true, false);

          case 13:
            _context13.next = 15;
            return showBase64(false, true, true);

          case 15:
            _context13.next = 17;
            return showBase64(true, false, false);

          case 17:
            _context13.next = 19;
            return showBase64(true, false, true);

          case 19:
            _context13.next = 21;
            return showBase64(true, true, false);

          case 21:
            _context13.next = 23;
            return showBase64(true, true, true);

          case 23:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));
  return _convertAddress.apply(this, arguments);
}

function useCommand(_x23, _x24, _x25) {
  return _useCommand.apply(this, arguments);
}

function _useCommand() {
  _useCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee14(dev, version, options) {
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return dev.useVersion(version, (0, _options.compilersWithNetworks)(dev, options));

          case 2:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));
  return _useCommand.apply(this, arguments);
}

function solCommand(_x26, _x27, _x28) {
  return _solCommand.apply(this, arguments);
}

function _solCommand() {
  _solCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee15(dev, files, options) {
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return _solidity.Solidity.build(dev, files, {
              clientLanguages: (options.clientLanguages || '').split(','),
              clientLevel: options.clientLevel || _clientCode.ClientCodeLevel.run,
              jsModule: options.jsModule || _clientCode.JSModule.node
            });

          case 2:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }));
  return _solCommand.apply(this, arguments);
}

function genCommand(_x29, _x30, _x31) {
  return _genCommand.apply(this, arguments);
}

function _genCommand() {
  _genCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee16(dev, files, options) {
    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return _clientCode.ClientCode.generate(files, {
              clientLanguages: (options.clientLanguages || '').split(','),
              clientLevel: options.clientLevel || _clientCode.ClientCodeLevel.run,
              jsModule: options.jsModule || _clientCode.JSModule.node
            });

          case 2:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16);
  }));
  return _genCommand.apply(this, arguments);
}

function spyCommand(_x32, _x33) {
  return _spyCommand.apply(this, arguments);
}

function _spyCommand() {
  _spyCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee17(dev, networks) {
    return _regenerator["default"].wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return (0, _spy.spy)(dev, networks);

          case 2:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17);
  }));
  return _spyCommand.apply(this, arguments);
}

function webConsoleCommand(_x34, _x35) {
  return _webConsoleCommand.apply(this, arguments);
}

function _webConsoleCommand() {
  _webConsoleCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee18(dev, options) {
    return _regenerator["default"].wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.next = 2;
            return (0, _server.web)(dev, options);

          case 2:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18);
  }));
  return _webConsoleCommand.apply(this, arguments);
}

var sharedOptions = {
  n: ['-n, --networks [names]', 'apply command to specified network[s] (names must be separated with comma)'],
  m: ['-m, --compilers', 'apply command to the compilers container']
};

function handleCommandLine(_x36, _x37) {
  return _handleCommandLine.apply(this, arguments);
}

function _handleCommandLine() {
  _handleCommandLine = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee19(dev, args) {
    var _program$command$desc, _program$command$desc2, _program$command$desc3, _program$command$desc4, _program$command$desc5, _program$command$desc6, _program$command$desc7, _program$command$desc8, _program$command$desc9, _program$command$desc10, _program$command$desc11, _program$command$desc12;

    var commandAction, commandArgs, command, options;
    return _regenerator["default"].wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
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
            program.command('addr <addr>').alias('a').description('Convert address').action(command(convertAddress));

            if (USE_EXPERIMENTAL_FEATURES) {
              program.command('spy [networks...]').description('Run network scanner').action(command(spyCommand));
              program.command('web').description('Run web console').option('-p, --port <port>', 'host port to bound web console (default: 8800)', '8800').action(command(webConsoleCommand));
            } // .command('update', `update ${dev.name} docker images`).action(action)


            program.parse(args);

            if (!(commandArgs.length === 0)) {
              _context19.next = 30;
              break;
            }

            if (!(program.args.length === 0)) {
              _context19.next = 27;
              break;
            }

            _context19.next = 25;
            return (0, _info.infoCommand)(dev, program);

          case 25:
            _context19.next = 28;
            break;

          case 27:
            program.outputHelp();

          case 28:
            _context19.next = 33;
            break;

          case 30:
            if (commandAction === _info.infoCommand) {
              options = commandArgs[commandArgs.length - 1];
              options.available = options.parent.available;
            }

            _context19.next = 33;
            return commandAction.apply(void 0, [dev].concat((0, _toConsumableArray2["default"])(commandArgs)));

          case 33:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19);
  }));
  return _handleCommandLine.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvY2xpLmpzIl0sIm5hbWVzIjpbIlVTRV9FWFBFUklNRU5UQUxfRkVBVFVSRVMiLCJwcm9ncmFtIiwicmVxdWlyZSIsInNldHVwQ29tbWFuZCIsImRldiIsIm9wdGlvbnMiLCJzdGFydCIsInN0YXJ0Q29tbWFuZCIsInN0b3BDb21tYW5kIiwic3RvcCIsInJlc3RhcnRDb21tYW5kIiwicmVzdGFydCIsInJlY3JlYXRlQ29tbWFuZCIsInJlY3JlYXRlIiwiY2xlYW5Db21tYW5kIiwiYWxsIiwiY29tcGlsZXJzIiwibmV0d29ya3MiLCJjbGVhbiIsImNvbnRhaW5lcnMiLCJzZXRDb21tYW5kIiwibmFtZXMiLCJ1cGRhdGVOZXR3b3JrQ29uZmlncyIsIm5ldHdvcmtzT3JBbGwiLCJjb25maWciLCJuZXdOYW1lIiwibmFtZSIsInBvcnQiLCJob3N0UG9ydCIsImRiUG9ydCIsImFyYW5nb0hvc3RQb3J0IiwiTmV0d29yayIsImRlZmF1bHRBcmFuZ29Qb3J0IiwiYWRkQ29tbWFuZCIsImFkZE5ldHdvcmtzIiwicmVtb3ZlQ29tbWFuZCIsInJlbW92ZU5ldHdvcmtzIiwibmV0d29ya3NGcm9tTmFtZXMiLCJnZW5lcmF0ZUtleXNDb21tYW5kIiwiX2RldiIsIlRPTkNsaWVudCIsImNyZWF0ZSIsInNlcnZlcnMiLCJjbGllbnQiLCJjcnlwdG8iLCJlZDI1NTE5S2V5cGFpciIsImtleXMiLCJjb25zb2xlIiwibG9nIiwiY29udmVydEFkZHJlc3MiLCJhZGRyIiwic2hvd0hleCIsImNvbnRyYWN0cyIsImFkZHJlc3MiLCJjb252ZXJ0VG8iLCJjb252ZXJ0ZWQiLCJzaG93QmFzZTY0IiwiYm91bmNlIiwidGVzdCIsInVybCIsImJhc2U2NFBhcmFtcyIsImZsYWdzIiwiZmlsdGVyIiwieCIsImpvaW4iLCJ1c2VDb21tYW5kIiwidmVyc2lvbiIsInVzZVZlcnNpb24iLCJzb2xDb21tYW5kIiwiZmlsZXMiLCJTb2xpZGl0eSIsImJ1aWxkIiwiY2xpZW50TGFuZ3VhZ2VzIiwic3BsaXQiLCJjbGllbnRMZXZlbCIsIkNsaWVudENvZGVMZXZlbCIsInJ1biIsImpzTW9kdWxlIiwiSlNNb2R1bGUiLCJub2RlIiwiZ2VuQ29tbWFuZCIsIkNsaWVudENvZGUiLCJnZW5lcmF0ZSIsInNweUNvbW1hbmQiLCJ3ZWJDb25zb2xlQ29tbWFuZCIsInNoYXJlZE9wdGlvbnMiLCJuIiwibSIsImhhbmRsZUNvbW1hbmRMaW5lIiwiYXJncyIsImNvbW1hbmRBY3Rpb24iLCJpbmZvQ29tbWFuZCIsImNvbW1hbmRBcmdzIiwiY29tbWFuZCIsImFjdGlvbiIsIm9wdGlvbiIsImRlc2NyaXB0aW9uIiwiaXNEZWZhdWx0IiwiYWxpYXMiLCJwYXJzZSIsImxlbmd0aCIsIm91dHB1dEhlbHAiLCJhdmFpbGFibGUiLCJwYXJlbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQWdCQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFXQTs7QUFDQTs7QUFuQ0E7Ozs7Ozs7Ozs7Ozs7O0FBcUNBLElBQU1BLHlCQUF5QixHQUFHLEtBQWxDOztBQUVBLElBQU1DLE9BQU8sR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O1NBR2VDLFk7Ozs7Ozs7K0JBQWYsaUJBQTRCQyxHQUE1QixFQUFzQ0MsT0FBdEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQ1VELEdBQUcsQ0FBQ0UsS0FBSixDQUFVLG9DQUFzQkYsR0FBdEIsRUFBMkJDLE9BQTNCLENBQVYsQ0FEVjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O1NBS2VFLFk7Ozs7Ozs7K0JBQWYsa0JBQTRCSCxHQUE1QixFQUFzQ0MsT0FBdEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQ1VELEdBQUcsQ0FBQ0UsS0FBSixDQUFVLG9DQUFzQkYsR0FBdEIsRUFBMkJDLE9BQTNCLENBQVYsQ0FEVjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFB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QSxPQUFPLENBQ0Y0RixPQURMLENBQ2EsS0FEYixFQUNvQkcsV0FEcEIsQ0FDZ0MsaUJBRGhDLEVBRUtELE1BRkwsQ0FFWSxtQkFGWixFQUVpQyxnREFGakMsRUFFbUYsTUFGbkYsRUFHS0QsTUFITCxDQUdZRCxPQUFPLENBQUNULGlCQUFELENBSG5CO0FBSUgsYUFoSkwsQ0FrSkk7OztBQUVBbkYsWUFBQUEsT0FBTyxDQUFDa0csS0FBUixDQUFjVixJQUFkOztBQXBKSixrQkFzSlFHLFdBQVcsQ0FBQ1EsTUFBWixLQUF1QixDQXRKL0I7QUFBQTtBQUFBO0FBQUE7O0FBQUEsa0JBdUpZbkcsT0FBTyxDQUFDd0YsSUFBUixDQUFhVyxNQUFiLEtBQXdCLENBdkpwQztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLG1CQXdKa0IsdUJBQVloRyxHQUFaLEVBQWlCSCxPQUFqQixDQXhKbEI7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBMEpZQSxZQUFBQSxPQUFPLENBQUNvRyxVQUFSOztBQTFKWjtBQUFBO0FBQUE7O0FBQUE7QUE2SlEsZ0JBQUlYLGFBQWEsS0FBS0MsaUJBQXRCLEVBQW1DO0FBQ3pCdEYsY0FBQUEsT0FEeUIsR0FDZnVGLFdBQVcsQ0FBQ0EsV0FBVyxDQUFDUSxNQUFaLEdBQXFCLENBQXRCLENBREk7QUFFL0IvRixjQUFBQSxPQUFPLENBQUNpRyxTQUFSLEdBQW9CakcsT0FBTyxDQUFDa0csTUFBUixDQUFlRCxTQUFuQztBQUNIOztBQWhLVDtBQUFBLG1CQWlLY1osYUFBYSxNQUFiLFVBQWN0RixHQUFkLDZDQUFzQndGLFdBQXRCLEdBaktkOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG4gKiB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbiAqIExpY2Vuc2UgYXQ6IGh0dHBzOi8vd3d3LnRvbi5kZXYvbGljZW5zZXNcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIFRPTiBERVYgc29mdHdhcmUgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG4vLyBAZmxvd1xuXG5pbXBvcnQge1RPTkNsaWVudH0gZnJvbSBcInRvbi1jbGllbnQtbm9kZS1qc1wiO1xuaW1wb3J0IHtDbGllbnRDb2RlLCBDbGllbnRDb2RlTGV2ZWwsIEpTTW9kdWxlfSBmcm9tIFwiLi4vY29tcGlsZXJzL2NsaWVudC1jb2RlXCI7XG5pbXBvcnQge1NvbGlkaXR5fSBmcm9tIFwiLi4vY29tcGlsZXJzL3NvbGlkaXR5XCI7XG5pbXBvcnQge0Rldn0gZnJvbSBcIi4uL2RldlwiO1xuaW1wb3J0IHtOZXR3b3JrfSBmcm9tIFwiLi4vbmV0d29ya3MvbmV0d29ya3NcIjtcbmltcG9ydCB0eXBlIHtOZXR3b3JrQ29uZmlnfSBmcm9tIFwiLi4vbmV0d29ya3MvbmV0d29ya3NcIjtcbmltcG9ydCB7d2VifSBmcm9tIFwiLi4vc2VydmVyL3NlcnZlclwiO1xuaW1wb3J0IHtjb21waWxlcnNXaXRoTmV0d29ya3N9IGZyb20gXCIuL29wdGlvbnNcIjtcbmltcG9ydCB0eXBlIHtcbiAgICBDbGVhbk9wdGlvbnMsXG4gICAgUmVjcmVhdGVPcHRpb25zLFxuICAgIFJlc3RhcnRPcHRpb25zLCBTZXROZXR3b3JrT3B0aW9ucyxcbiAgICBTZXR1cE9wdGlvbnMsIFNvbE9wdGlvbnMsXG4gICAgU3RhcnRPcHRpb25zLFxuICAgIFN0b3BPcHRpb25zLFxuICAgIFVzZU9wdGlvbnMsIFdlYk9wdGlvbnMsXG59IGZyb20gXCIuL29wdGlvbnNcIjtcblxuaW1wb3J0IHtpbmZvQ29tbWFuZH0gZnJvbSBcIi4vaW5mby5qc1wiO1xuaW1wb3J0IHtzcHl9IGZyb20gXCIuL3NweVwiO1xuXG5jb25zdCBVU0VfRVhQRVJJTUVOVEFMX0ZFQVRVUkVTID0gZmFsc2U7XG5cbmNvbnN0IHByb2dyYW0gPSByZXF1aXJlKCdjb21tYW5kZXInKTtcblxuXG5hc3luYyBmdW5jdGlvbiBzZXR1cENvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IFNldHVwT3B0aW9ucykge1xuICAgIGF3YWl0IGRldi5zdGFydChjb21waWxlcnNXaXRoTmV0d29ya3MoZGV2LCBvcHRpb25zKSk7XG59XG5cblxuYXN5bmMgZnVuY3Rpb24gc3RhcnRDb21tYW5kKGRldjogRGV2LCBvcHRpb25zOiBTdGFydE9wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYuc3RhcnQoY29tcGlsZXJzV2l0aE5ldHdvcmtzKGRldiwgb3B0aW9ucykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzdG9wQ29tbWFuZChkZXY6IERldiwgb3B0aW9uczogU3RvcE9wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYuc3RvcChjb21waWxlcnNXaXRoTmV0d29ya3MoZGV2LCBvcHRpb25zKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlc3RhcnRDb21tYW5kKGRldjogRGV2LCBvcHRpb25zOiBSZXN0YXJ0T3B0aW9ucykge1xuICAgIGF3YWl0IGRldi5yZXN0YXJ0KGNvbXBpbGVyc1dpdGhOZXR3b3JrcyhkZXYsIG9wdGlvbnMpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVjcmVhdGVDb21tYW5kKGRldjogRGV2LCBvcHRpb25zOiBSZWNyZWF0ZU9wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYucmVjcmVhdGUoY29tcGlsZXJzV2l0aE5ldHdvcmtzKGRldiwgb3B0aW9ucykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjbGVhbkNvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IENsZWFuT3B0aW9ucykge1xuICAgIGNvbnN0IGFsbCA9ICFvcHRpb25zLmNvbXBpbGVycyAmJiAhb3B0aW9ucy5uZXR3b3JrcztcbiAgICBhd2FpdCBkZXYuY2xlYW4ob3B0aW9ucy5jb21waWxlcnMgfHwgYWxsLCBvcHRpb25zLm5ldHdvcmtzIHx8IGFsbCwgb3B0aW9ucy5jb250YWluZXJzKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2V0Q29tbWFuZChkZXY6IERldiwgbmFtZXM6IHN0cmluZ1tdLCBvcHRpb25zOiBTZXROZXR3b3JrT3B0aW9ucykge1xuICAgIGF3YWl0IGRldi51cGRhdGVOZXR3b3JrQ29uZmlncyhkZXYubmV0d29ya3NPckFsbChuYW1lcyksIChjb25maWc6IE5ldHdvcmtDb25maWcpID0+IHtcbiAgICAgICAgaWYgKG9wdGlvbnMubmV3TmFtZSkge1xuICAgICAgICAgICAgY29uZmlnLm5hbWUgPSBvcHRpb25zLm5ld05hbWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMucG9ydCkge1xuICAgICAgICAgICAgY29uZmlnLmhvc3RQb3J0ID0gb3B0aW9ucy5wb3J0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmRiUG9ydCkge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZGJQb3J0ID09PSAnYmluZCcpIHtcbiAgICAgICAgICAgICAgICBjb25maWcuYXJhbmdvSG9zdFBvcnQgPSBOZXR3b3JrLmRlZmF1bHRBcmFuZ29Qb3J0O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmRiUG9ydCA9PT0gJ3VuYmluZCcpIHtcbiAgICAgICAgICAgICAgICBjb25maWcuYXJhbmdvSG9zdFBvcnQgPSAnJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLmFyYW5nb0hvc3RQb3J0ID0gb3B0aW9ucy5kYlBvcnQgfHwgJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gYWRkQ29tbWFuZChkZXY6IERldiwgbmFtZXM6IHN0cmluZ1tdKSB7XG4gICAgYXdhaXQgZGV2LmFkZE5ldHdvcmtzKG5hbWVzKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVtb3ZlQ29tbWFuZChkZXY6IERldiwgbmFtZXM6IHN0cmluZ1tdKSB7XG4gICAgYXdhaXQgZGV2LnJlbW92ZU5ldHdvcmtzKGRldi5uZXR3b3Jrc0Zyb21OYW1lcyhuYW1lcykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZW5lcmF0ZUtleXNDb21tYW5kKF9kZXY6IERldikge1xuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IFRPTkNsaWVudC5jcmVhdGUoe1xuICAgICAgICBzZXJ2ZXJzOiBbJ2h0dHA6Ly9sb2NhbGhvc3QnXSxcbiAgICB9KTtcbiAgICBjb25zdCBrZXlzID0gYXdhaXQgY2xpZW50LmNyeXB0by5lZDI1NTE5S2V5cGFpcigpO1xuICAgIGNvbnNvbGUubG9nKGtleXMpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjb252ZXJ0QWRkcmVzcyhfZGV2OiBEZXYsIGFkZHIpIHtcbiAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBUT05DbGllbnQuY3JlYXRlKHtcbiAgICAgICAgc2VydmVyczogWydodHRwOi8vbG9jYWxob3N0J10sXG4gICAgfSk7XG4gICAgY29uc3Qgc2hvd0hleCA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgY29udmVydGVkID0gYXdhaXQgY2xpZW50LmNvbnRyYWN0cy5jb252ZXJ0QWRkcmVzcyh7XG4gICAgICAgICAgICBhZGRyZXNzOiBhZGRyLFxuICAgICAgICAgICAgY29udmVydFRvOiAnSGV4JyxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBoZXggPSAke2NvbnZlcnRlZC5hZGRyZXNzfWApO1xuICAgIH07XG4gICAgY29uc3Qgc2hvd0Jhc2U2NCA9IGFzeW5jIChib3VuY2UsIHRlc3QsIHVybCkgPT4ge1xuICAgICAgICBjb25zdCBjb252ZXJ0ZWQgPSBhd2FpdCBjbGllbnQuY29udHJhY3RzLmNvbnZlcnRBZGRyZXNzKHtcbiAgICAgICAgICAgIGFkZHJlc3M6IGFkZHIsXG4gICAgICAgICAgICBjb252ZXJ0VG86ICdCYXNlNjQnLFxuICAgICAgICAgICAgYmFzZTY0UGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgYm91bmNlLFxuICAgICAgICAgICAgICAgIHRlc3QsXG4gICAgICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGZsYWdzID0gW1xuICAgICAgICAgICAgYm91bmNlID8gJ2JvdW5jZScgOiAnJyxcbiAgICAgICAgICAgIHRlc3QgPyAndGVzdCcgOiAnbWFpbicsXG4gICAgICAgICAgICB1cmwgPyAndXJsJyA6ICcnLFxuICAgICAgICBdXG4gICAgICAgICAgICAuZmlsdGVyKHggPT4geCAhPT0gJycpXG4gICAgICAgICAgICAuam9pbignLCAnKTtcbiAgICAgICAgY29uc29sZS5sb2coYCR7ZmxhZ3N9ID0gJHtjb252ZXJ0ZWQuYWRkcmVzc31gKTtcbiAgICB9O1xuICAgIGF3YWl0IHNob3dIZXgoKTtcbiAgICBhd2FpdCBzaG93QmFzZTY0KGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xuICAgIGF3YWl0IHNob3dCYXNlNjQoZmFsc2UsIGZhbHNlLCB0cnVlKTtcbiAgICBhd2FpdCBzaG93QmFzZTY0KGZhbHNlLCB0cnVlLCBmYWxzZSk7XG4gICAgYXdhaXQgc2hvd0Jhc2U2NChmYWxzZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgYXdhaXQgc2hvd0Jhc2U2NCh0cnVlLCBmYWxzZSwgZmFsc2UpO1xuICAgIGF3YWl0IHNob3dCYXNlNjQodHJ1ZSwgZmFsc2UsIHRydWUpO1xuICAgIGF3YWl0IHNob3dCYXNlNjQodHJ1ZSwgdHJ1ZSwgZmFsc2UpO1xuICAgIGF3YWl0IHNob3dCYXNlNjQodHJ1ZSwgdHJ1ZSwgdHJ1ZSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHVzZUNvbW1hbmQoZGV2OiBEZXYsIHZlcnNpb246IHN0cmluZywgb3B0aW9uczogVXNlT3B0aW9ucykge1xuICAgIGF3YWl0IGRldi51c2VWZXJzaW9uKHZlcnNpb24sIGNvbXBpbGVyc1dpdGhOZXR3b3JrcyhkZXYsIG9wdGlvbnMpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc29sQ29tbWFuZChkZXY6IERldiwgZmlsZXM6IHN0cmluZ1tdLCBvcHRpb25zOiBTb2xPcHRpb25zKSB7XG4gICAgYXdhaXQgU29saWRpdHkuYnVpbGQoZGV2LCBmaWxlcywge1xuICAgICAgICBjbGllbnRMYW5ndWFnZXM6IChvcHRpb25zLmNsaWVudExhbmd1YWdlcyB8fCAnJykuc3BsaXQoJywnKSxcbiAgICAgICAgY2xpZW50TGV2ZWw6IG9wdGlvbnMuY2xpZW50TGV2ZWwgfHwgQ2xpZW50Q29kZUxldmVsLnJ1bixcbiAgICAgICAganNNb2R1bGU6IG9wdGlvbnMuanNNb2R1bGUgfHwgSlNNb2R1bGUubm9kZSxcbiAgICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2VuQ29tbWFuZChkZXY6IERldiwgZmlsZXM6IHN0cmluZ1tdLCBvcHRpb25zOiBTb2xPcHRpb25zKSB7XG4gICAgYXdhaXQgQ2xpZW50Q29kZS5nZW5lcmF0ZShmaWxlcywge1xuICAgICAgICBjbGllbnRMYW5ndWFnZXM6IChvcHRpb25zLmNsaWVudExhbmd1YWdlcyB8fCAnJykuc3BsaXQoJywnKSxcbiAgICAgICAgY2xpZW50TGV2ZWw6IG9wdGlvbnMuY2xpZW50TGV2ZWwgfHwgQ2xpZW50Q29kZUxldmVsLnJ1bixcbiAgICAgICAganNNb2R1bGU6IG9wdGlvbnMuanNNb2R1bGUgfHwgSlNNb2R1bGUubm9kZSxcbiAgICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc3B5Q29tbWFuZChkZXY6IERldiwgbmV0d29ya3M6IHN0cmluZ1tdKSB7XG4gICAgYXdhaXQgc3B5KGRldiwgbmV0d29ya3MpO1xufVxuXG5hc3luYyBmdW5jdGlvbiB3ZWJDb25zb2xlQ29tbWFuZChkZXY6IERldiwgb3B0aW9uczogV2ViT3B0aW9ucykge1xuICAgIGF3YWl0IHdlYihkZXYsIG9wdGlvbnMpO1xufVxuXG5jb25zdCBzaGFyZWRPcHRpb25zID0ge1xuICAgIG46IFsnLW4sIC0tbmV0d29ya3MgW25hbWVzXScsICdhcHBseSBjb21tYW5kIHRvIHNwZWNpZmllZCBuZXR3b3JrW3NdIChuYW1lcyBtdXN0IGJlIHNlcGFyYXRlZCB3aXRoIGNvbW1hKSddLFxuICAgIG06IFsnLW0sIC0tY29tcGlsZXJzJywgJ2FwcGx5IGNvbW1hbmQgdG8gdGhlIGNvbXBpbGVycyBjb250YWluZXInXSxcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZUNvbW1hbmRMaW5lKGRldjogRGV2LCBhcmdzOiBzdHJpbmdbXSkge1xuICAgIGxldCBjb21tYW5kQWN0aW9uID0gaW5mb0NvbW1hbmQ7XG4gICAgbGV0IGNvbW1hbmRBcmdzID0gW107XG5cbiAgICBjb25zdCBjb21tYW5kID0gKGFjdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgIGNvbW1hbmRBY3Rpb24gPSBhY3Rpb247XG4gICAgICAgICAgICBjb21tYW5kQXJncyA9IGFyZ3M7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLm5hbWUoZGV2Lm5hbWUpXG4gICAgICAgIC52ZXJzaW9uKGRldi52ZXJzaW9uKVxuICAgICAgICAub3B0aW9uKCctYSwgLS1hdmFpbGFibGUnLCAnc2hvdyBhdmFpbGFibGUgdmVyc2lvbnMnKVxuICAgICAgICAuZGVzY3JpcHRpb24oJ1RPTiBMYWJzIGRldmVsb3BtZW50IHRvb2xzJyk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdpbmZvJywge2lzRGVmYXVsdDogdHJ1ZX0pLmRlc2NyaXB0aW9uKCdTaG93IHN1bW1hcnkgYWJvdXQgZGV2IGVudmlyb25tZW50JylcbiAgICAgICAgLm9wdGlvbignLWEsIC0tYXZhaWxhYmxlJywgJ3Nob3cgYXZhaWxhYmxlIHZlcnNpb25zJylcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKGluZm9Db21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdzb2wgW2ZpbGVzLi4uXScpLmRlc2NyaXB0aW9uKCdCdWlsZCBzb2xpZGl0eSBjb250cmFjdFtzXScpXG4gICAgICAgIC5vcHRpb24oXG4gICAgICAgICAgICAnLWwsIC0tY2xpZW50LWxhbmd1YWdlcyA8bGFuZ3VhZ2VzPicsXG4gICAgICAgICAgICAnZ2VuZXJhdGUgY2xpZW50IGNvZGUgZm9yIGxhbmd1YWdlczogXCJqc1wiLCBcInJzXCIgKG11bHRpcGxlIGxhbmd1YWdlcyBtdXN0IGJlIHNlcGFyYXRlZCB3aXRoIGNvbW1hKScsXG4gICAgICAgIClcbiAgICAgICAgLm9wdGlvbihcbiAgICAgICAgICAgICctTCwgLS1jbGllbnQtbGV2ZWwgPGNsaWVudC1sZXZlbD4nLFxuICAgICAgICAgICAgJ2NsaWVudCBjb2RlIGxldmVsOiBcInJ1blwiIHRvIHJ1biBvbmx5LCBcImRlcGxveVwiIHRvIHJ1biBhbmQgZGVwbG95IChpbmNsdWRlcyBhbiBpbWFnZUJhc2U2NCBvZiBiaW5hcnkgY29udHJhY3QpJyxcbiAgICAgICAgICAgICdkZXBsb3knLFxuICAgICAgICApXG4gICAgICAgIC5vcHRpb24oXG4gICAgICAgICAgICAnLS1qcy1tb2R1bGUgPG1vZHVsZS10eXBlPicsXG4gICAgICAgICAgICBcIkphdmEgU2NyaXB0IG1vZHVsZSB0eXBlOiBcIiArXG4gICAgICAgICAgICBcImBub2RlYCB0byB1c2Ugd2l0aCBgY29uc3QgRm9vQ29udHJhY3QgPSByZXF1aXJlKCdmb29gKWAsIFwiICtcbiAgICAgICAgICAgIFwiYG5vZGVOb0RlZmF1bHRgIHRvIHVzZSB3aXRoIGBjb25zdCB7Rm9vQ29udHJhY3R9ID0gcmVxdWlyZSgnZm9vYClgLCBcIiArXG4gICAgICAgICAgICBcImBlc2AgdG8gdXNlIHdpdGggYGltcG9ydCBGb29Db250cmFjdCBmcm9tICdmb28nYCwgXCIgK1xuICAgICAgICAgICAgXCJgZXNOb0RlZmF1bHRgIHRvIHVzZSB3aXRoIGBpbXBvcnQge0Zvb0NvbnRyYWN0fSBmcm9tICdmb28nYCAoYG5vZGVgIGlzIGEgZGVmYXVsdCBvcHRpb24pXCIsXG4gICAgICAgICAgICAnbm9kZScsXG4gICAgICAgIClcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHNvbENvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ2dlbiBbZmlsZXMuLi5dJykuZGVzY3JpcHRpb24oJ0dlbmVyYXRlIGNsaWVudCBjb2RlIGZvciBjb250cmFjdFtzXScpXG4gICAgICAgIC5vcHRpb24oXG4gICAgICAgICAgICAnLWwsIC0tY2xpZW50LWxhbmd1YWdlcyA8bGFuZ3VhZ2VzPicsXG4gICAgICAgICAgICAnZ2VuZXJhdGUgY2xpZW50IGNvZGUgZm9yIGxhbmd1YWdlczogXCJqc1wiLCBcInJzXCIgKG11bHRpcGxlIGxhbmd1YWdlcyBtdXN0IGJlIHNlcGFyYXRlZCB3aXRoIGNvbW1hKScsXG4gICAgICAgIClcbiAgICAgICAgLm9wdGlvbihcbiAgICAgICAgICAgICctTCwgLS1jbGllbnQtbGV2ZWwgPGNsaWVudC1sZXZlbD4nLFxuICAgICAgICAgICAgJ2NsaWVudCBjb2RlIGxldmVsOiBcInJ1blwiIHRvIHJ1biBvbmx5LCBcImRlcGxveVwiIHRvIHJ1biBhbmQgZGVwbG95IChpbmNsdWRlcyBhbiBpbWFnZUJhc2U2NCBvZiBiaW5hcnkgY29udHJhY3QpJyxcbiAgICAgICAgICAgICdkZXBsb3knLFxuICAgICAgICApXG4gICAgICAgIC5vcHRpb24oXG4gICAgICAgICAgICAnLS1qcy1tb2R1bGUgPG1vZHVsZS10eXBlPicsXG4gICAgICAgICAgICBcIkphdmEgU2NyaXB0IG1vZHVsZSB0eXBlOiBcIiArXG4gICAgICAgICAgICBcImBub2RlYCB0byB1c2Ugd2l0aCBgY29uc3QgRm9vQ29udHJhY3QgPSByZXF1aXJlKCdmb29gKWAsIFwiICtcbiAgICAgICAgICAgIFwiYG5vZGVOb0RlZmF1bHRgIHRvIHVzZSB3aXRoIGBjb25zdCB7Rm9vQ29udHJhY3R9ID0gcmVxdWlyZSgnZm9vYClgLCBcIiArXG4gICAgICAgICAgICBcImBlc2AgdG8gdXNlIHdpdGggYGltcG9ydCBGb29Db250cmFjdCBmcm9tICdmb28nYCwgXCIgK1xuICAgICAgICAgICAgXCJgZXNOb0RlZmF1bHRgIHRvIHVzZSB3aXRoIGBpbXBvcnQge0Zvb0NvbnRyYWN0fSBmcm9tICdmb28nYCAoYG5vZGVgIGlzIGEgZGVmYXVsdCBvcHRpb24pXCIsXG4gICAgICAgICAgICAnbm9kZScsXG4gICAgICAgIClcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKGdlbkNvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3N0YXJ0JykuZGVzY3JpcHRpb24oJ1N0YXJ0IGRldiBjb250YWluZXJzJylcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm4pXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5tKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoc3RhcnRDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdzdG9wJykuZGVzY3JpcHRpb24oJ1N0b3AgZGV2IGNvbnRhaW5lcnMnKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubilcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm0pXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChzdG9wQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgncmVzdGFydCcpLmRlc2NyaXB0aW9uKCdSZXN0YXJ0IGRldiBjb250YWluZXJzJylcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm4pXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5tKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQocmVzdGFydENvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3JlY3JlYXRlJykuZGVzY3JpcHRpb24oJ1JlY3JlYXRlIGRldiBjb250YWluZXJzJylcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm4pXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5tKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQocmVjcmVhdGVDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdzZXR1cCcpLmRlc2NyaXB0aW9uKCdTZXR1cCBkZXYgZW52aXJvbm1lbnQnKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubilcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm0pXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChzZXR1cENvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ2NsZWFuJykuZGVzY3JpcHRpb24oJ1JlbW92ZSBkb2NrZXIgY29udGFpbmVycyBhbmQgaW1hZ2VzIHJlbGF0ZWQgdG8gVE9OIERldicpXG4gICAgICAgIC5vcHRpb24oJy1uLCAtLW5ldHdvcmtzJywgJ2NsZWFuIGxvY2FsIG5vZGUgZG9ja2VyIGNvbnRhaW5lcnMgYW5kIGltYWdlcycpXG4gICAgICAgIC5vcHRpb24oJy1tLCAtLWNvbXBpbGVycycsICdjbGVhbiBjb21waWxlcnMgZG9ja2VyIGNvbnRhaW5lcnMgYW5kIGltYWdlcycpXG4gICAgICAgIC5vcHRpb24oJy1jLCAtLWNvbnRhaW5lcnMnLCAnY2xlYW4gY29udGFpbmVycyBvbmx5JywgZmFsc2UpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChjbGVhbkNvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3VzZSA8dmVyc2lvbj4nKS5kZXNjcmlwdGlvbignVXNlIHNwZWNpZmllZCB2ZXJzaW9uIGZvciBjb250YWluZXJzJylcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm4pXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5tKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQodXNlQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnc2V0IFtuZXR3b3JrLi4uXScpLmRlc2NyaXB0aW9uKCdTZXQgbmV0d29ya1tzXSBvcHRpb25zJylcbiAgICAgICAgLm9wdGlvbignLXAsIC0tcG9ydCA8cG9ydD4nLCAnaG9zdCBwb3J0IHRvIGJvdW5kIGxvY2FsIG5vZGUnKVxuICAgICAgICAub3B0aW9uKFxuICAgICAgICAgICAgJy1kLCAtLWRiLXBvcnQgPGJpbmRpbmc+JyxcbiAgICAgICAgICAgICdob3N0IHBvcnQgdG8gYm91bmQgbG9jYWwgbm9kZXMgQXJhbmdvIERCIChcImJpbmRcIiB0byB1c2UgZGVmYXVsdCBBcmFuZ28gREIgcG9ydCwgXCJ1bmJpbmRcIiB0byB1bmJpbmQgQXJhbmdvIERCIHBvcnQpJyxcbiAgICAgICAgKVxuICAgICAgICAub3B0aW9uKCctbiwgLS1uZXctbmFtZSA8bmFtZT4nLCAnc2V0IG5ldyBuYW1lIGZvciBuZXR3b3JrJylcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHNldENvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ2FkZCBbbmV0d29yay4uLl0nKS5kZXNjcmlwdGlvbignQWRkIG5ldHdvcmtbc10nKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoYWRkQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgncmVtb3ZlIFtuZXR3b3JrLi4uXScpLmFsaWFzKCdybScpLmRlc2NyaXB0aW9uKCdSZW1vdmUgbmV0d29ya1tzXScpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChyZW1vdmVDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdrZXlzJykuYWxpYXMoJ2snKS5kZXNjcmlwdGlvbignR2VuZXJhdGUgcmFuZG9tIEtleSBQYWlyJylcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKGdlbmVyYXRlS2V5c0NvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ2FkZHIgPGFkZHI+JykuYWxpYXMoJ2EnKS5kZXNjcmlwdGlvbignQ29udmVydCBhZGRyZXNzJylcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKGNvbnZlcnRBZGRyZXNzKSk7XG5cbiAgICBpZiAoVVNFX0VYUEVSSU1FTlRBTF9GRUFUVVJFUykge1xuICAgICAgICBwcm9ncmFtXG4gICAgICAgICAgICAuY29tbWFuZCgnc3B5IFtuZXR3b3Jrcy4uLl0nKS5kZXNjcmlwdGlvbignUnVuIG5ldHdvcmsgc2Nhbm5lcicpXG4gICAgICAgICAgICAuYWN0aW9uKGNvbW1hbmQoc3B5Q29tbWFuZCkpO1xuXG4gICAgICAgIHByb2dyYW1cbiAgICAgICAgICAgIC5jb21tYW5kKCd3ZWInKS5kZXNjcmlwdGlvbignUnVuIHdlYiBjb25zb2xlJylcbiAgICAgICAgICAgIC5vcHRpb24oJy1wLCAtLXBvcnQgPHBvcnQ+JywgJ2hvc3QgcG9ydCB0byBib3VuZCB3ZWIgY29uc29sZSAoZGVmYXVsdDogODgwMCknLCAnODgwMCcpXG4gICAgICAgICAgICAuYWN0aW9uKGNvbW1hbmQod2ViQ29uc29sZUNvbW1hbmQpKTtcbiAgICB9XG5cbiAgICAvLyAuY29tbWFuZCgndXBkYXRlJywgYHVwZGF0ZSAke2Rldi5uYW1lfSBkb2NrZXIgaW1hZ2VzYCkuYWN0aW9uKGFjdGlvbilcblxuICAgIHByb2dyYW0ucGFyc2UoYXJncyk7XG5cbiAgICBpZiAoY29tbWFuZEFyZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGlmIChwcm9ncmFtLmFyZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBhd2FpdCBpbmZvQ29tbWFuZChkZXYsIHByb2dyYW0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvZ3JhbS5vdXRwdXRIZWxwKCk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoY29tbWFuZEFjdGlvbiA9PT0gaW5mb0NvbW1hbmQpIHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBjb21tYW5kQXJnc1tjb21tYW5kQXJncy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIG9wdGlvbnMuYXZhaWxhYmxlID0gb3B0aW9ucy5wYXJlbnQuYXZhaWxhYmxlO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IGNvbW1hbmRBY3Rpb24oZGV2LCAuLi5jb21tYW5kQXJncyk7XG4gICAgfVxufVxuXG5leHBvcnQge2hhbmRsZUNvbW1hbmRMaW5lfTtcbiJdfQ==