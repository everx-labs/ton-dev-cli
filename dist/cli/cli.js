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

var _check = require("./check");

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
            console.log(JSON.stringify(keys, undefined, 4));

          case 7:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return _generateKeysCommand.apply(this, arguments);
}

function testCommand(_x21, _x22, _x23) {
  return _testCommand.apply(this, arguments);
}

function _testCommand() {
  _testCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee11(_dev, servers, options) {
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return _check.CheckNetwork.checkNetworks(servers, options.verbose);

          case 2:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));
  return _testCommand.apply(this, arguments);
}

function convertAddress(_x24, _x25) {
  return _convertAddress.apply(this, arguments);
}

function _convertAddress() {
  _convertAddress = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee14(_dev, addr) {
    var client, showConverted, showHex, showBase64;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return _tonClientNodeJs.TONClient.create({
              servers: ['http://localhost']
            });

          case 2:
            client = _context14.sent;

            showConverted = function showConverted(title, converted) {
              console.log("".concat(converted.address === addr ? '✓' : ' ', " ").concat(title, " = ").concat(converted.address));
            };

            showHex =
            /*#__PURE__*/
            function () {
              var _ref = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee12() {
                var converted;
                return _regenerator["default"].wrap(function _callee12$(_context12) {
                  while (1) {
                    switch (_context12.prev = _context12.next) {
                      case 0:
                        _context12.next = 2;
                        return client.contracts.convertAddress({
                          address: addr,
                          convertTo: 'Hex'
                        });

                      case 2:
                        converted = _context12.sent;
                        showConverted('hex', converted);

                      case 4:
                      case "end":
                        return _context12.stop();
                    }
                  }
                }, _callee12);
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
              _regenerator["default"].mark(function _callee13(test, bounce, url) {
                var converted, flags;
                return _regenerator["default"].wrap(function _callee13$(_context13) {
                  while (1) {
                    switch (_context13.prev = _context13.next) {
                      case 0:
                        _context13.next = 2;
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
                        converted = _context13.sent;
                        flags = [test ? 'test' : 'main', bounce ? 'bounce' : '', url ? 'url' : ''].filter(function (x) {
                          return x !== '';
                        }).join(' ');
                        showConverted(flags, converted);

                      case 5:
                      case "end":
                        return _context13.stop();
                    }
                  }
                }, _callee13);
              }));

              return function showBase64(_x41, _x42, _x43) {
                return _ref2.apply(this, arguments);
              };
            }();

            _context14.next = 8;
            return showHex();

          case 8:
            _context14.next = 10;
            return showBase64(false, false, false);

          case 10:
            _context14.next = 12;
            return showBase64(false, false, true);

          case 12:
            _context14.next = 14;
            return showBase64(false, true, false);

          case 14:
            _context14.next = 16;
            return showBase64(false, true, true);

          case 16:
            _context14.next = 18;
            return showBase64(true, false, false);

          case 18:
            _context14.next = 20;
            return showBase64(true, false, true);

          case 20:
            _context14.next = 22;
            return showBase64(true, true, false);

          case 22:
            _context14.next = 24;
            return showBase64(true, true, true);

          case 24:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));
  return _convertAddress.apply(this, arguments);
}

function useCommand(_x26, _x27, _x28) {
  return _useCommand.apply(this, arguments);
}

function _useCommand() {
  _useCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee15(dev, version, options) {
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return dev.useVersion(version, (0, _options.compilersWithNetworks)(dev, options));

          case 2:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }));
  return _useCommand.apply(this, arguments);
}

function solCommand(_x29, _x30, _x31) {
  return _solCommand.apply(this, arguments);
}

function _solCommand() {
  _solCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee16(dev, files, options) {
    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            if (!(files.length < 1)) {
              _context16.next = 2;
              break;
            }

            throw new Error('You must specify at least one file name');

          case 2:
            _context16.next = 4;
            return _solidity.Solidity.build(dev, files, {
              clientLanguages: (options.clientLanguages || '').split(','),
              clientLevel: options.clientLevel || _clientCode.ClientCodeLevel.run,
              jsModule: options.jsModule || _clientCode.JSModule.node
            });

          case 4:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16);
  }));
  return _solCommand.apply(this, arguments);
}

function genCommand(_x32, _x33, _x34) {
  return _genCommand.apply(this, arguments);
}

function _genCommand() {
  _genCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee17(dev, files, options) {
    return _regenerator["default"].wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            if (!(files.length < 1)) {
              _context17.next = 2;
              break;
            }

            throw new Error('You must specify at least one file name');

          case 2:
            _context17.next = 4;
            return _clientCode.ClientCode.generate(files, {
              clientLanguages: (options.clientLanguages || '').split(','),
              clientLevel: options.clientLevel || _clientCode.ClientCodeLevel.run,
              jsModule: options.jsModule || _clientCode.JSModule.node
            });

          case 4:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17);
  }));
  return _genCommand.apply(this, arguments);
}

function spyCommand(_x35, _x36) {
  return _spyCommand.apply(this, arguments);
}

function _spyCommand() {
  _spyCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee18(dev, networks) {
    return _regenerator["default"].wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.next = 2;
            return (0, _spy.spy)(dev, networks);

          case 2:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18);
  }));
  return _spyCommand.apply(this, arguments);
}

function webConsoleCommand(_x37, _x38) {
  return _webConsoleCommand.apply(this, arguments);
}

function _webConsoleCommand() {
  _webConsoleCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee19(dev, options) {
    return _regenerator["default"].wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _context19.next = 2;
            return (0, _server.web)(dev, options);

          case 2:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19);
  }));
  return _webConsoleCommand.apply(this, arguments);
}

var sharedOptions = {
  n: ['-n, --networks [names]', 'apply command to specified network[s] (names must be separated with comma)'],
  m: ['-m, --compilers', 'apply command to the compilers container']
};

function handleCommandLine(_x39, _x40) {
  return _handleCommandLine.apply(this, arguments);
}

function _handleCommandLine() {
  _handleCommandLine = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee20(dev, args) {
    var _program$command$desc, _program$command$desc2, _program$command$desc3, _program$command$desc4, _program$command$desc5, _program$command$desc6, _program$command$desc7, _program$command$desc8, _program$command$desc9, _program$command$desc10, _program$command$desc11, _program$command$desc12;

    var commandAction, commandArgs, command, options;
    return _regenerator["default"].wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
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
            program.command('test [servers...]').alias('t').description('Test network[s]').option('-v, --verbose', 'show verbose test log', false).action(command(testCommand));
            program.command('keys').alias('k').description('Generate random Key Pair').action(command(generateKeysCommand));
            program.command('addr <addr>').alias('a').description('Convert address').action(command(convertAddress));

            if (USE_EXPERIMENTAL_FEATURES) {
              program.command('spy [networks...]').description('Run network scanner').action(command(spyCommand));
              program.command('web').description('Run web console').option('-p, --port <port>', 'host port to bound web console (default: 8800)', '8800').action(command(webConsoleCommand));
            } // .command('update', `update ${dev.name} docker images`).action(action)


            program.parse(args);

            if (!(commandArgs.length === 0)) {
              _context20.next = 31;
              break;
            }

            if (!(program.args.length === 0)) {
              _context20.next = 28;
              break;
            }

            _context20.next = 26;
            return (0, _info.infoCommand)(dev, program);

          case 26:
            _context20.next = 29;
            break;

          case 28:
            program.outputHelp();

          case 29:
            _context20.next = 34;
            break;

          case 31:
            if (commandAction === _info.infoCommand) {
              options = commandArgs[commandArgs.length - 1];
              options.available = options.parent.available;
            }

            _context20.next = 34;
            return commandAction.apply(void 0, [dev].concat((0, _toConsumableArray2["default"])(commandArgs)));

          case 34:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20);
  }));
  return _handleCommandLine.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvY2xpLmpzIl0sIm5hbWVzIjpbIlVTRV9FWFBFUklNRU5UQUxfRkVBVFVSRVMiLCJwcm9ncmFtIiwicmVxdWlyZSIsInNldHVwQ29tbWFuZCIsImRldiIsIm9wdGlvbnMiLCJzdGFydCIsInN0YXJ0Q29tbWFuZCIsInN0b3BDb21tYW5kIiwic3RvcCIsInJlc3RhcnRDb21tYW5kIiwicmVzdGFydCIsInJlY3JlYXRlQ29tbWFuZCIsInJlY3JlYXRlIiwiY2xlYW5Db21tYW5kIiwiYWxsIiwiY29tcGlsZXJzIiwibmV0d29ya3MiLCJjbGVhbiIsImNvbnRhaW5lcnMiLCJzZXRDb21tYW5kIiwibmFtZXMiLCJ1cGRhdGVOZXR3b3JrQ29uZmlncyIsIm5ldHdvcmtzT3JBbGwiLCJjb25maWciLCJuZXdOYW1lIiwibmFtZSIsInBvcnQiLCJob3N0UG9ydCIsImRiUG9ydCIsImFyYW5nb0hvc3RQb3J0IiwiTmV0d29yayIsImRlZmF1bHRBcmFuZ29Qb3J0IiwiYWRkQ29tbWFuZCIsImFkZE5ldHdvcmtzIiwicmVtb3ZlQ29tbWFuZCIsInJlbW92ZU5ldHdvcmtzIiwibmV0d29ya3NGcm9tTmFtZXMiLCJnZW5lcmF0ZUtleXNDb21tYW5kIiwiX2RldiIsIlRPTkNsaWVudCIsImNyZWF0ZSIsInNlcnZlcnMiLCJjbGllbnQiLCJjcnlwdG8iLCJlZDI1NTE5S2V5cGFpciIsImtleXMiLCJjb25zb2xlIiwibG9nIiwiSlNPTiIsInN0cmluZ2lmeSIsInVuZGVmaW5lZCIsInRlc3RDb21tYW5kIiwiQ2hlY2tOZXR3b3JrIiwiY2hlY2tOZXR3b3JrcyIsInZlcmJvc2UiLCJjb252ZXJ0QWRkcmVzcyIsImFkZHIiLCJzaG93Q29udmVydGVkIiwidGl0bGUiLCJjb252ZXJ0ZWQiLCJhZGRyZXNzIiwic2hvd0hleCIsImNvbnRyYWN0cyIsImNvbnZlcnRUbyIsInNob3dCYXNlNjQiLCJ0ZXN0IiwiYm91bmNlIiwidXJsIiwiYmFzZTY0UGFyYW1zIiwiZmxhZ3MiLCJmaWx0ZXIiLCJ4Iiwiam9pbiIsInVzZUNvbW1hbmQiLCJ2ZXJzaW9uIiwidXNlVmVyc2lvbiIsInNvbENvbW1hbmQiLCJmaWxlcyIsImxlbmd0aCIsIkVycm9yIiwiU29saWRpdHkiLCJidWlsZCIsImNsaWVudExhbmd1YWdlcyIsInNwbGl0IiwiY2xpZW50TGV2ZWwiLCJDbGllbnRDb2RlTGV2ZWwiLCJydW4iLCJqc01vZHVsZSIsIkpTTW9kdWxlIiwibm9kZSIsImdlbkNvbW1hbmQiLCJDbGllbnRDb2RlIiwiZ2VuZXJhdGUiLCJzcHlDb21tYW5kIiwid2ViQ29uc29sZUNvbW1hbmQiLCJzaGFyZWRPcHRpb25zIiwibiIsIm0iLCJoYW5kbGVDb21tYW5kTGluZSIsImFyZ3MiLCJjb21tYW5kQWN0aW9uIiwiaW5mb0NvbW1hbmQiLCJjb21tYW5kQXJncyIsImNvbW1hbmQiLCJhY3Rpb24iLCJvcHRpb24iLCJkZXNjcmlwdGlvbiIsImlzRGVmYXVsdCIsImFsaWFzIiwicGFyc2UiLCJvdXRwdXRIZWxwIiwiYXZhaWxhYmxlIiwicGFyZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFnQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBV0E7O0FBQ0E7O0FBcENBOzs7Ozs7Ozs7Ozs7OztBQXNDQSxJQUFNQSx5QkFBeUIsR0FBRyxLQUFsQzs7QUFFQSxJQUFNQyxPQUFPLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXZCOztTQUdlQyxZOzs7Ozs7OytCQUFmLGlCQUE0QkMsR0FBNUIsRUFBc0NDLE9BQXRDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNVRCxHQUFHLENBQUNFLEtBQUosQ0FBVSxvQ0FBc0JGLEdBQXRCLEVBQTJCQyxPQUEzQixDQUFWLENBRFY7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztTQUtlRSxZOzs7Ozs7OytCQUFmLGtCQUE0QkgsR0FBNUIsRUFBc0NDLE9BQXRDO0FBQUE7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VixVQUFELENBRm5CO0FBSUE3RixjQUFBQSxPQUFPLENBQ0Z1RyxPQURMLENBQ2EsS0FEYixFQUNvQkcsV0FEcEIsQ0FDZ0MsaUJBRGhDLEVBRUtELE1BRkwsQ0FFWSxtQkFGWixFQUVpQyxnREFGakMsRUFFbUYsTUFGbkYsRUFHS0QsTUFITCxDQUdZRCxPQUFPLENBQUNULGlCQUFELENBSG5CO0FBSUgsYUFySkwsQ0F1Skk7OztBQUVBOUYsWUFBQUEsT0FBTyxDQUFDNkcsS0FBUixDQUFjVixJQUFkOztBQXpKSixrQkEySlFHLFdBQVcsQ0FBQ3hCLE1BQVosS0FBdUIsQ0EzSi9CO0FBQUE7QUFBQTtBQUFBOztBQUFBLGtCQTRKWTlFLE9BQU8sQ0FBQ21HLElBQVIsQ0FBYXJCLE1BQWIsS0FBd0IsQ0E1SnBDO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsbUJBNkprQix1QkFBWTNFLEdBQVosRUFBaUJILE9BQWpCLENBN0psQjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUErSllBLFlBQUFBLE9BQU8sQ0FBQzhHLFVBQVI7O0FBL0paO0FBQUE7QUFBQTs7QUFBQTtBQWtLUSxnQkFBSVYsYUFBYSxLQUFLQyxpQkFBdEIsRUFBbUM7QUFDekJqRyxjQUFBQSxPQUR5QixHQUNma0csV0FBVyxDQUFDQSxXQUFXLENBQUN4QixNQUFaLEdBQXFCLENBQXRCLENBREk7QUFFL0IxRSxjQUFBQSxPQUFPLENBQUMyRyxTQUFSLEdBQW9CM0csT0FBTyxDQUFDNEcsTUFBUixDQUFlRCxTQUFuQztBQUNIOztBQXJLVDtBQUFBLG1CQXNLY1gsYUFBYSxNQUFiLFVBQWNqRyxHQUFkLDZDQUFzQm1HLFdBQXRCLEdBdEtkOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG4gKiB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbiAqIExpY2Vuc2UgYXQ6IGh0dHBzOi8vd3d3LnRvbi5kZXYvbGljZW5zZXNcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIFRPTiBERVYgc29mdHdhcmUgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG4vLyBAZmxvd1xuXG5pbXBvcnQgeyBUT05DbGllbnQgfSBmcm9tIFwidG9uLWNsaWVudC1ub2RlLWpzXCI7XG5pbXBvcnQgeyBDbGllbnRDb2RlLCBDbGllbnRDb2RlTGV2ZWwsIEpTTW9kdWxlIH0gZnJvbSBcIi4uL2NvbXBpbGVycy9jbGllbnQtY29kZVwiO1xuaW1wb3J0IHsgU29saWRpdHkgfSBmcm9tIFwiLi4vY29tcGlsZXJzL3NvbGlkaXR5XCI7XG5pbXBvcnQgeyBEZXYgfSBmcm9tIFwiLi4vZGV2XCI7XG5pbXBvcnQgeyBOZXR3b3JrIH0gZnJvbSBcIi4uL25ldHdvcmtzL25ldHdvcmtzXCI7XG5pbXBvcnQgdHlwZSB7IE5ldHdvcmtDb25maWcgfSBmcm9tIFwiLi4vbmV0d29ya3MvbmV0d29ya3NcIjtcbmltcG9ydCB7IHdlYiB9IGZyb20gXCIuLi9zZXJ2ZXIvc2VydmVyXCI7XG5pbXBvcnQgeyBDaGVja05ldHdvcmsgfSBmcm9tIFwiLi9jaGVja1wiO1xuaW1wb3J0IHsgY29tcGlsZXJzV2l0aE5ldHdvcmtzIH0gZnJvbSBcIi4vb3B0aW9uc1wiO1xuaW1wb3J0IHR5cGUge1xuICAgIENsZWFuT3B0aW9ucyxcbiAgICBSZWNyZWF0ZU9wdGlvbnMsXG4gICAgUmVzdGFydE9wdGlvbnMsIFNldE5ldHdvcmtPcHRpb25zLFxuICAgIFNldHVwT3B0aW9ucywgU29sT3B0aW9ucyxcbiAgICBTdGFydE9wdGlvbnMsXG4gICAgU3RvcE9wdGlvbnMsXG4gICAgVXNlT3B0aW9ucywgV2ViT3B0aW9ucyxcbn0gZnJvbSBcIi4vb3B0aW9uc1wiO1xuXG5pbXBvcnQgeyBpbmZvQ29tbWFuZCB9IGZyb20gXCIuL2luZm8uanNcIjtcbmltcG9ydCB7IHNweSB9IGZyb20gXCIuL3NweVwiO1xuXG5jb25zdCBVU0VfRVhQRVJJTUVOVEFMX0ZFQVRVUkVTID0gZmFsc2U7XG5cbmNvbnN0IHByb2dyYW0gPSByZXF1aXJlKCdjb21tYW5kZXInKTtcblxuXG5hc3luYyBmdW5jdGlvbiBzZXR1cENvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IFNldHVwT3B0aW9ucykge1xuICAgIGF3YWl0IGRldi5zdGFydChjb21waWxlcnNXaXRoTmV0d29ya3MoZGV2LCBvcHRpb25zKSk7XG59XG5cblxuYXN5bmMgZnVuY3Rpb24gc3RhcnRDb21tYW5kKGRldjogRGV2LCBvcHRpb25zOiBTdGFydE9wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYuc3RhcnQoY29tcGlsZXJzV2l0aE5ldHdvcmtzKGRldiwgb3B0aW9ucykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzdG9wQ29tbWFuZChkZXY6IERldiwgb3B0aW9uczogU3RvcE9wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYuc3RvcChjb21waWxlcnNXaXRoTmV0d29ya3MoZGV2LCBvcHRpb25zKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlc3RhcnRDb21tYW5kKGRldjogRGV2LCBvcHRpb25zOiBSZXN0YXJ0T3B0aW9ucykge1xuICAgIGF3YWl0IGRldi5yZXN0YXJ0KGNvbXBpbGVyc1dpdGhOZXR3b3JrcyhkZXYsIG9wdGlvbnMpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVjcmVhdGVDb21tYW5kKGRldjogRGV2LCBvcHRpb25zOiBSZWNyZWF0ZU9wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYucmVjcmVhdGUoY29tcGlsZXJzV2l0aE5ldHdvcmtzKGRldiwgb3B0aW9ucykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjbGVhbkNvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IENsZWFuT3B0aW9ucykge1xuICAgIGNvbnN0IGFsbCA9ICFvcHRpb25zLmNvbXBpbGVycyAmJiAhb3B0aW9ucy5uZXR3b3JrcztcbiAgICBhd2FpdCBkZXYuY2xlYW4ob3B0aW9ucy5jb21waWxlcnMgfHwgYWxsLCBvcHRpb25zLm5ldHdvcmtzIHx8IGFsbCwgb3B0aW9ucy5jb250YWluZXJzKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2V0Q29tbWFuZChkZXY6IERldiwgbmFtZXM6IHN0cmluZ1tdLCBvcHRpb25zOiBTZXROZXR3b3JrT3B0aW9ucykge1xuICAgIGF3YWl0IGRldi51cGRhdGVOZXR3b3JrQ29uZmlncyhkZXYubmV0d29ya3NPckFsbChuYW1lcyksIChjb25maWc6IE5ldHdvcmtDb25maWcpID0+IHtcbiAgICAgICAgaWYgKG9wdGlvbnMubmV3TmFtZSkge1xuICAgICAgICAgICAgY29uZmlnLm5hbWUgPSBvcHRpb25zLm5ld05hbWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMucG9ydCkge1xuICAgICAgICAgICAgY29uZmlnLmhvc3RQb3J0ID0gb3B0aW9ucy5wb3J0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmRiUG9ydCkge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZGJQb3J0ID09PSAnYmluZCcpIHtcbiAgICAgICAgICAgICAgICBjb25maWcuYXJhbmdvSG9zdFBvcnQgPSBOZXR3b3JrLmRlZmF1bHRBcmFuZ29Qb3J0O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmRiUG9ydCA9PT0gJ3VuYmluZCcpIHtcbiAgICAgICAgICAgICAgICBjb25maWcuYXJhbmdvSG9zdFBvcnQgPSAnJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLmFyYW5nb0hvc3RQb3J0ID0gb3B0aW9ucy5kYlBvcnQgfHwgJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gYWRkQ29tbWFuZChkZXY6IERldiwgbmFtZXM6IHN0cmluZ1tdKSB7XG4gICAgYXdhaXQgZGV2LmFkZE5ldHdvcmtzKG5hbWVzKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVtb3ZlQ29tbWFuZChkZXY6IERldiwgbmFtZXM6IHN0cmluZ1tdKSB7XG4gICAgYXdhaXQgZGV2LnJlbW92ZU5ldHdvcmtzKGRldi5uZXR3b3Jrc0Zyb21OYW1lcyhuYW1lcykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZW5lcmF0ZUtleXNDb21tYW5kKF9kZXY6IERldikge1xuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IFRPTkNsaWVudC5jcmVhdGUoe1xuICAgICAgICBzZXJ2ZXJzOiBbJ2h0dHA6Ly9sb2NhbGhvc3QnXSxcbiAgICB9KTtcbiAgICBjb25zdCBrZXlzID0gYXdhaXQgY2xpZW50LmNyeXB0by5lZDI1NTE5S2V5cGFpcigpO1xuICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGtleXMsIHVuZGVmaW5lZCwgNCkpO1xufVxuXG5hc3luYyBmdW5jdGlvbiB0ZXN0Q29tbWFuZChfZGV2OiBEZXYsIHNlcnZlcnM6IHN0cmluZ1tdLCBvcHRpb25zOiB7IHZlcmJvc2U6IGJvb2xlYW4gfSkge1xuICAgIGF3YWl0IENoZWNrTmV0d29yay5jaGVja05ldHdvcmtzKHNlcnZlcnMsIG9wdGlvbnMudmVyYm9zZSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNvbnZlcnRBZGRyZXNzKF9kZXY6IERldiwgYWRkcikge1xuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IFRPTkNsaWVudC5jcmVhdGUoe1xuICAgICAgICBzZXJ2ZXJzOiBbJ2h0dHA6Ly9sb2NhbGhvc3QnXSxcbiAgICB9KTtcbiAgICBjb25zdCBzaG93Q29udmVydGVkID0gKHRpdGxlLCBjb252ZXJ0ZWQpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coYCR7Y29udmVydGVkLmFkZHJlc3MgPT09IGFkZHIgPyAn4pyTJyA6ICcgJ30gJHt0aXRsZX0gPSAke2NvbnZlcnRlZC5hZGRyZXNzfWApO1xuICAgIH07XG4gICAgY29uc3Qgc2hvd0hleCA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgY29udmVydGVkID0gYXdhaXQgY2xpZW50LmNvbnRyYWN0cy5jb252ZXJ0QWRkcmVzcyh7XG4gICAgICAgICAgICBhZGRyZXNzOiBhZGRyLFxuICAgICAgICAgICAgY29udmVydFRvOiAnSGV4JyxcbiAgICAgICAgfSk7XG4gICAgICAgIHNob3dDb252ZXJ0ZWQoJ2hleCcsIGNvbnZlcnRlZCk7XG4gICAgfTtcbiAgICBjb25zdCBzaG93QmFzZTY0ID0gYXN5bmMgKHRlc3QsIGJvdW5jZSwgdXJsKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnZlcnRlZCA9IGF3YWl0IGNsaWVudC5jb250cmFjdHMuY29udmVydEFkZHJlc3Moe1xuICAgICAgICAgICAgYWRkcmVzczogYWRkcixcbiAgICAgICAgICAgIGNvbnZlcnRUbzogJ0Jhc2U2NCcsXG4gICAgICAgICAgICBiYXNlNjRQYXJhbXM6IHtcbiAgICAgICAgICAgICAgICBib3VuY2UsXG4gICAgICAgICAgICAgICAgdGVzdCxcbiAgICAgICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZmxhZ3MgPSBbXG4gICAgICAgICAgICB0ZXN0ID8gJ3Rlc3QnIDogJ21haW4nLFxuICAgICAgICAgICAgYm91bmNlID8gJ2JvdW5jZScgOiAnJyxcbiAgICAgICAgICAgIHVybCA/ICd1cmwnIDogJycsXG4gICAgICAgIF1cbiAgICAgICAgICAgIC5maWx0ZXIoeCA9PiB4ICE9PSAnJylcbiAgICAgICAgICAgIC5qb2luKCcgJyk7XG4gICAgICAgIHNob3dDb252ZXJ0ZWQoZmxhZ3MsIGNvbnZlcnRlZCk7XG4gICAgfTtcbiAgICBhd2FpdCBzaG93SGV4KCk7XG4gICAgYXdhaXQgc2hvd0Jhc2U2NChmYWxzZSwgZmFsc2UsIGZhbHNlKTtcbiAgICBhd2FpdCBzaG93QmFzZTY0KGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XG4gICAgYXdhaXQgc2hvd0Jhc2U2NChmYWxzZSwgdHJ1ZSwgZmFsc2UpO1xuICAgIGF3YWl0IHNob3dCYXNlNjQoZmFsc2UsIHRydWUsIHRydWUpO1xuICAgIGF3YWl0IHNob3dCYXNlNjQodHJ1ZSwgZmFsc2UsIGZhbHNlKTtcbiAgICBhd2FpdCBzaG93QmFzZTY0KHRydWUsIGZhbHNlLCB0cnVlKTtcbiAgICBhd2FpdCBzaG93QmFzZTY0KHRydWUsIHRydWUsIGZhbHNlKTtcbiAgICBhd2FpdCBzaG93QmFzZTY0KHRydWUsIHRydWUsIHRydWUpO1xufVxuXG5hc3luYyBmdW5jdGlvbiB1c2VDb21tYW5kKGRldjogRGV2LCB2ZXJzaW9uOiBzdHJpbmcsIG9wdGlvbnM6IFVzZU9wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYudXNlVmVyc2lvbih2ZXJzaW9uLCBjb21waWxlcnNXaXRoTmV0d29ya3MoZGV2LCBvcHRpb25zKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNvbENvbW1hbmQoZGV2OiBEZXYsIGZpbGVzOiBzdHJpbmdbXSwgb3B0aW9uczogU29sT3B0aW9ucykge1xuICAgIGlmIChmaWxlcy5sZW5ndGggPCAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG11c3Qgc3BlY2lmeSBhdCBsZWFzdCBvbmUgZmlsZSBuYW1lJyk7XG4gICAgfVxuICAgIGF3YWl0IFNvbGlkaXR5LmJ1aWxkKGRldiwgZmlsZXMsIHtcbiAgICAgICAgY2xpZW50TGFuZ3VhZ2VzOiAob3B0aW9ucy5jbGllbnRMYW5ndWFnZXMgfHwgJycpLnNwbGl0KCcsJyksXG4gICAgICAgIGNsaWVudExldmVsOiBvcHRpb25zLmNsaWVudExldmVsIHx8IENsaWVudENvZGVMZXZlbC5ydW4sXG4gICAgICAgIGpzTW9kdWxlOiBvcHRpb25zLmpzTW9kdWxlIHx8IEpTTW9kdWxlLm5vZGUsXG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdlbkNvbW1hbmQoZGV2OiBEZXYsIGZpbGVzOiBzdHJpbmdbXSwgb3B0aW9uczogU29sT3B0aW9ucykge1xuICAgIGlmIChmaWxlcy5sZW5ndGggPCAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG11c3Qgc3BlY2lmeSBhdCBsZWFzdCBvbmUgZmlsZSBuYW1lJyk7XG4gICAgfVxuICAgIGF3YWl0IENsaWVudENvZGUuZ2VuZXJhdGUoZmlsZXMsIHtcbiAgICAgICAgY2xpZW50TGFuZ3VhZ2VzOiAob3B0aW9ucy5jbGllbnRMYW5ndWFnZXMgfHwgJycpLnNwbGl0KCcsJyksXG4gICAgICAgIGNsaWVudExldmVsOiBvcHRpb25zLmNsaWVudExldmVsIHx8IENsaWVudENvZGVMZXZlbC5ydW4sXG4gICAgICAgIGpzTW9kdWxlOiBvcHRpb25zLmpzTW9kdWxlIHx8IEpTTW9kdWxlLm5vZGUsXG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNweUNvbW1hbmQoZGV2OiBEZXYsIG5ldHdvcmtzOiBzdHJpbmdbXSkge1xuICAgIGF3YWl0IHNweShkZXYsIG5ldHdvcmtzKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gd2ViQ29uc29sZUNvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IFdlYk9wdGlvbnMpIHtcbiAgICBhd2FpdCB3ZWIoZGV2LCBvcHRpb25zKTtcbn1cblxuY29uc3Qgc2hhcmVkT3B0aW9ucyA9IHtcbiAgICBuOiBbJy1uLCAtLW5ldHdvcmtzIFtuYW1lc10nLCAnYXBwbHkgY29tbWFuZCB0byBzcGVjaWZpZWQgbmV0d29ya1tzXSAobmFtZXMgbXVzdCBiZSBzZXBhcmF0ZWQgd2l0aCBjb21tYSknXSxcbiAgICBtOiBbJy1tLCAtLWNvbXBpbGVycycsICdhcHBseSBjb21tYW5kIHRvIHRoZSBjb21waWxlcnMgY29udGFpbmVyJ10sXG59O1xuXG5hc3luYyBmdW5jdGlvbiBoYW5kbGVDb21tYW5kTGluZShkZXY6IERldiwgYXJnczogc3RyaW5nW10pIHtcbiAgICBsZXQgY29tbWFuZEFjdGlvbiA9IGluZm9Db21tYW5kO1xuICAgIGxldCBjb21tYW5kQXJncyA9IFtdO1xuXG4gICAgY29uc3QgY29tbWFuZCA9IChhY3Rpb24pID0+IHtcbiAgICAgICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICBjb21tYW5kQWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgY29tbWFuZEFyZ3MgPSBhcmdzO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5uYW1lKGRldi5uYW1lKVxuICAgICAgICAudmVyc2lvbihkZXYudmVyc2lvbilcbiAgICAgICAgLm9wdGlvbignLWEsIC0tYXZhaWxhYmxlJywgJ3Nob3cgYXZhaWxhYmxlIHZlcnNpb25zJylcbiAgICAgICAgLmRlc2NyaXB0aW9uKCdUT04gTGFicyBkZXZlbG9wbWVudCB0b29scycpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnaW5mbycsIHsgaXNEZWZhdWx0OiB0cnVlIH0pLmRlc2NyaXB0aW9uKCdTaG93IHN1bW1hcnkgYWJvdXQgZGV2IGVudmlyb25tZW50JylcbiAgICAgICAgLm9wdGlvbignLWEsIC0tYXZhaWxhYmxlJywgJ3Nob3cgYXZhaWxhYmxlIHZlcnNpb25zJylcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKGluZm9Db21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdzb2wgW2ZpbGVzLi4uXScpLmRlc2NyaXB0aW9uKCdCdWlsZCBzb2xpZGl0eSBjb250cmFjdFtzXScpXG4gICAgICAgIC5vcHRpb24oXG4gICAgICAgICAgICAnLWwsIC0tY2xpZW50LWxhbmd1YWdlcyA8bGFuZ3VhZ2VzPicsXG4gICAgICAgICAgICAnZ2VuZXJhdGUgY2xpZW50IGNvZGUgZm9yIGxhbmd1YWdlczogXCJqc1wiLCBcInJzXCIgKG11bHRpcGxlIGxhbmd1YWdlcyBtdXN0IGJlIHNlcGFyYXRlZCB3aXRoIGNvbW1hKScsXG4gICAgICAgIClcbiAgICAgICAgLm9wdGlvbihcbiAgICAgICAgICAgICctTCwgLS1jbGllbnQtbGV2ZWwgPGNsaWVudC1sZXZlbD4nLFxuICAgICAgICAgICAgJ2NsaWVudCBjb2RlIGxldmVsOiBcInJ1blwiIHRvIHJ1biBvbmx5LCBcImRlcGxveVwiIHRvIHJ1biBhbmQgZGVwbG95IChpbmNsdWRlcyBhbiBpbWFnZUJhc2U2NCBvZiBiaW5hcnkgY29udHJhY3QpJyxcbiAgICAgICAgICAgICdkZXBsb3knLFxuICAgICAgICApXG4gICAgICAgIC5vcHRpb24oXG4gICAgICAgICAgICAnLS1qcy1tb2R1bGUgPG1vZHVsZS10eXBlPicsXG4gICAgICAgICAgICBcIkphdmEgU2NyaXB0IG1vZHVsZSB0eXBlOiBcIiArXG4gICAgICAgICAgICBcImBub2RlYCB0byB1c2Ugd2l0aCBgY29uc3QgRm9vQ29udHJhY3QgPSByZXF1aXJlKCdmb29gKWAsIFwiICtcbiAgICAgICAgICAgIFwiYG5vZGVOb0RlZmF1bHRgIHRvIHVzZSB3aXRoIGBjb25zdCB7Rm9vQ29udHJhY3R9ID0gcmVxdWlyZSgnZm9vYClgLCBcIiArXG4gICAgICAgICAgICBcImBlc2AgdG8gdXNlIHdpdGggYGltcG9ydCBGb29Db250cmFjdCBmcm9tICdmb28nYCwgXCIgK1xuICAgICAgICAgICAgXCJgZXNOb0RlZmF1bHRgIHRvIHVzZSB3aXRoIGBpbXBvcnQge0Zvb0NvbnRyYWN0fSBmcm9tICdmb28nYCAoYG5vZGVgIGlzIGEgZGVmYXVsdCBvcHRpb24pXCIsXG4gICAgICAgICAgICAnbm9kZScsXG4gICAgICAgIClcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHNvbENvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ2dlbiBbZmlsZXMuLi5dJykuZGVzY3JpcHRpb24oJ0dlbmVyYXRlIGNsaWVudCBjb2RlIGZvciBjb250cmFjdFtzXScpXG4gICAgICAgIC5vcHRpb24oXG4gICAgICAgICAgICAnLWwsIC0tY2xpZW50LWxhbmd1YWdlcyA8bGFuZ3VhZ2VzPicsXG4gICAgICAgICAgICAnZ2VuZXJhdGUgY2xpZW50IGNvZGUgZm9yIGxhbmd1YWdlczogXCJqc1wiLCBcInJzXCIgKG11bHRpcGxlIGxhbmd1YWdlcyBtdXN0IGJlIHNlcGFyYXRlZCB3aXRoIGNvbW1hKScsXG4gICAgICAgIClcbiAgICAgICAgLm9wdGlvbihcbiAgICAgICAgICAgICctTCwgLS1jbGllbnQtbGV2ZWwgPGNsaWVudC1sZXZlbD4nLFxuICAgICAgICAgICAgJ2NsaWVudCBjb2RlIGxldmVsOiBcInJ1blwiIHRvIHJ1biBvbmx5LCBcImRlcGxveVwiIHRvIHJ1biBhbmQgZGVwbG95IChpbmNsdWRlcyBhbiBpbWFnZUJhc2U2NCBvZiBiaW5hcnkgY29udHJhY3QpJyxcbiAgICAgICAgICAgICdkZXBsb3knLFxuICAgICAgICApXG4gICAgICAgIC5vcHRpb24oXG4gICAgICAgICAgICAnLS1qcy1tb2R1bGUgPG1vZHVsZS10eXBlPicsXG4gICAgICAgICAgICBcIkphdmEgU2NyaXB0IG1vZHVsZSB0eXBlOiBcIiArXG4gICAgICAgICAgICBcImBub2RlYCB0byB1c2Ugd2l0aCBgY29uc3QgRm9vQ29udHJhY3QgPSByZXF1aXJlKCdmb29gKWAsIFwiICtcbiAgICAgICAgICAgIFwiYG5vZGVOb0RlZmF1bHRgIHRvIHVzZSB3aXRoIGBjb25zdCB7Rm9vQ29udHJhY3R9ID0gcmVxdWlyZSgnZm9vYClgLCBcIiArXG4gICAgICAgICAgICBcImBlc2AgdG8gdXNlIHdpdGggYGltcG9ydCBGb29Db250cmFjdCBmcm9tICdmb28nYCwgXCIgK1xuICAgICAgICAgICAgXCJgZXNOb0RlZmF1bHRgIHRvIHVzZSB3aXRoIGBpbXBvcnQge0Zvb0NvbnRyYWN0fSBmcm9tICdmb28nYCAoYG5vZGVgIGlzIGEgZGVmYXVsdCBvcHRpb24pXCIsXG4gICAgICAgICAgICAnbm9kZScsXG4gICAgICAgIClcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKGdlbkNvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3N0YXJ0JykuZGVzY3JpcHRpb24oJ1N0YXJ0IGRldiBjb250YWluZXJzJylcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm4pXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5tKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoc3RhcnRDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdzdG9wJykuZGVzY3JpcHRpb24oJ1N0b3AgZGV2IGNvbnRhaW5lcnMnKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubilcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm0pXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChzdG9wQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgncmVzdGFydCcpLmRlc2NyaXB0aW9uKCdSZXN0YXJ0IGRldiBjb250YWluZXJzJylcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm4pXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5tKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQocmVzdGFydENvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3JlY3JlYXRlJykuZGVzY3JpcHRpb24oJ1JlY3JlYXRlIGRldiBjb250YWluZXJzJylcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm4pXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5tKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQocmVjcmVhdGVDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdzZXR1cCcpLmRlc2NyaXB0aW9uKCdTZXR1cCBkZXYgZW52aXJvbm1lbnQnKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubilcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm0pXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChzZXR1cENvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ2NsZWFuJykuZGVzY3JpcHRpb24oJ1JlbW92ZSBkb2NrZXIgY29udGFpbmVycyBhbmQgaW1hZ2VzIHJlbGF0ZWQgdG8gVE9OIERldicpXG4gICAgICAgIC5vcHRpb24oJy1uLCAtLW5ldHdvcmtzJywgJ2NsZWFuIGxvY2FsIG5vZGUgZG9ja2VyIGNvbnRhaW5lcnMgYW5kIGltYWdlcycpXG4gICAgICAgIC5vcHRpb24oJy1tLCAtLWNvbXBpbGVycycsICdjbGVhbiBjb21waWxlcnMgZG9ja2VyIGNvbnRhaW5lcnMgYW5kIGltYWdlcycpXG4gICAgICAgIC5vcHRpb24oJy1jLCAtLWNvbnRhaW5lcnMnLCAnY2xlYW4gY29udGFpbmVycyBvbmx5JywgZmFsc2UpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChjbGVhbkNvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3VzZSA8dmVyc2lvbj4nKS5kZXNjcmlwdGlvbignVXNlIHNwZWNpZmllZCB2ZXJzaW9uIGZvciBjb250YWluZXJzJylcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm4pXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5tKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQodXNlQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnc2V0IFtuZXR3b3JrLi4uXScpLmRlc2NyaXB0aW9uKCdTZXQgbmV0d29ya1tzXSBvcHRpb25zJylcbiAgICAgICAgLm9wdGlvbignLXAsIC0tcG9ydCA8cG9ydD4nLCAnaG9zdCBwb3J0IHRvIGJvdW5kIGxvY2FsIG5vZGUnKVxuICAgICAgICAub3B0aW9uKFxuICAgICAgICAgICAgJy1kLCAtLWRiLXBvcnQgPGJpbmRpbmc+JyxcbiAgICAgICAgICAgICdob3N0IHBvcnQgdG8gYm91bmQgbG9jYWwgbm9kZXMgQXJhbmdvIERCIChcImJpbmRcIiB0byB1c2UgZGVmYXVsdCBBcmFuZ28gREIgcG9ydCwgXCJ1bmJpbmRcIiB0byB1bmJpbmQgQXJhbmdvIERCIHBvcnQpJyxcbiAgICAgICAgKVxuICAgICAgICAub3B0aW9uKCctbiwgLS1uZXctbmFtZSA8bmFtZT4nLCAnc2V0IG5ldyBuYW1lIGZvciBuZXR3b3JrJylcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHNldENvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ2FkZCBbbmV0d29yay4uLl0nKS5kZXNjcmlwdGlvbignQWRkIG5ldHdvcmtbc10nKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoYWRkQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgncmVtb3ZlIFtuZXR3b3JrLi4uXScpLmFsaWFzKCdybScpLmRlc2NyaXB0aW9uKCdSZW1vdmUgbmV0d29ya1tzXScpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChyZW1vdmVDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCd0ZXN0IFtzZXJ2ZXJzLi4uXScpLmFsaWFzKCd0JykuZGVzY3JpcHRpb24oJ1Rlc3QgbmV0d29ya1tzXScpXG4gICAgICAgIC5vcHRpb24oJy12LCAtLXZlcmJvc2UnLCAnc2hvdyB2ZXJib3NlIHRlc3QgbG9nJywgZmFsc2UpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZCh0ZXN0Q29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgna2V5cycpLmFsaWFzKCdrJykuZGVzY3JpcHRpb24oJ0dlbmVyYXRlIHJhbmRvbSBLZXkgUGFpcicpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChnZW5lcmF0ZUtleXNDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdhZGRyIDxhZGRyPicpLmFsaWFzKCdhJykuZGVzY3JpcHRpb24oJ0NvbnZlcnQgYWRkcmVzcycpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChjb252ZXJ0QWRkcmVzcykpO1xuXG4gICAgaWYgKFVTRV9FWFBFUklNRU5UQUxfRkVBVFVSRVMpIHtcbiAgICAgICAgcHJvZ3JhbVxuICAgICAgICAgICAgLmNvbW1hbmQoJ3NweSBbbmV0d29ya3MuLi5dJykuZGVzY3JpcHRpb24oJ1J1biBuZXR3b3JrIHNjYW5uZXInKVxuICAgICAgICAgICAgLmFjdGlvbihjb21tYW5kKHNweUNvbW1hbmQpKTtcblxuICAgICAgICBwcm9ncmFtXG4gICAgICAgICAgICAuY29tbWFuZCgnd2ViJykuZGVzY3JpcHRpb24oJ1J1biB3ZWIgY29uc29sZScpXG4gICAgICAgICAgICAub3B0aW9uKCctcCwgLS1wb3J0IDxwb3J0PicsICdob3N0IHBvcnQgdG8gYm91bmQgd2ViIGNvbnNvbGUgKGRlZmF1bHQ6IDg4MDApJywgJzg4MDAnKVxuICAgICAgICAgICAgLmFjdGlvbihjb21tYW5kKHdlYkNvbnNvbGVDb21tYW5kKSk7XG4gICAgfVxuXG4gICAgLy8gLmNvbW1hbmQoJ3VwZGF0ZScsIGB1cGRhdGUgJHtkZXYubmFtZX0gZG9ja2VyIGltYWdlc2ApLmFjdGlvbihhY3Rpb24pXG5cbiAgICBwcm9ncmFtLnBhcnNlKGFyZ3MpO1xuXG4gICAgaWYgKGNvbW1hbmRBcmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBpZiAocHJvZ3JhbS5hcmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgYXdhaXQgaW5mb0NvbW1hbmQoZGV2LCBwcm9ncmFtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb2dyYW0ub3V0cHV0SGVscCgpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGNvbW1hbmRBY3Rpb24gPT09IGluZm9Db21tYW5kKSB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0gY29tbWFuZEFyZ3NbY29tbWFuZEFyZ3MubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBvcHRpb25zLmF2YWlsYWJsZSA9IG9wdGlvbnMucGFyZW50LmF2YWlsYWJsZTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBjb21tYW5kQWN0aW9uKGRldiwgLi4uY29tbWFuZEFyZ3MpO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgaGFuZGxlQ29tbWFuZExpbmUgfTtcbiJdfQ==