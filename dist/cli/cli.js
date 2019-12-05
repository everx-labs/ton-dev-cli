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
            _context16.next = 2;
            return _solidity.Solidity.build(dev, files, {
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
            _context17.next = 2;
            return _clientCode.ClientCode.generate(files, {
              clientLanguages: (options.clientLanguages || '').split(','),
              clientLevel: options.clientLevel || _clientCode.ClientCodeLevel.run,
              jsModule: options.jsModule || _clientCode.JSModule.node
            });

          case 2:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvY2xpLmpzIl0sIm5hbWVzIjpbIlVTRV9FWFBFUklNRU5UQUxfRkVBVFVSRVMiLCJwcm9ncmFtIiwicmVxdWlyZSIsInNldHVwQ29tbWFuZCIsImRldiIsIm9wdGlvbnMiLCJzdGFydCIsInN0YXJ0Q29tbWFuZCIsInN0b3BDb21tYW5kIiwic3RvcCIsInJlc3RhcnRDb21tYW5kIiwicmVzdGFydCIsInJlY3JlYXRlQ29tbWFuZCIsInJlY3JlYXRlIiwiY2xlYW5Db21tYW5kIiwiYWxsIiwiY29tcGlsZXJzIiwibmV0d29ya3MiLCJjbGVhbiIsImNvbnRhaW5lcnMiLCJzZXRDb21tYW5kIiwibmFtZXMiLCJ1cGRhdGVOZXR3b3JrQ29uZmlncyIsIm5ldHdvcmtzT3JBbGwiLCJjb25maWciLCJuZXdOYW1lIiwibmFtZSIsInBvcnQiLCJob3N0UG9ydCIsImRiUG9ydCIsImFyYW5nb0hvc3RQb3J0IiwiTmV0d29yayIsImRlZmF1bHRBcmFuZ29Qb3J0IiwiYWRkQ29tbWFuZCIsImFkZE5ldHdvcmtzIiwicmVtb3ZlQ29tbWFuZCIsInJlbW92ZU5ldHdvcmtzIiwibmV0d29ya3NGcm9tTmFtZXMiLCJnZW5lcmF0ZUtleXNDb21tYW5kIiwiX2RldiIsIlRPTkNsaWVudCIsImNyZWF0ZSIsInNlcnZlcnMiLCJjbGllbnQiLCJjcnlwdG8iLCJlZDI1NTE5S2V5cGFpciIsImtleXMiLCJjb25zb2xlIiwibG9nIiwidGVzdENvbW1hbmQiLCJDaGVja05ldHdvcmsiLCJjaGVja05ldHdvcmtzIiwidmVyYm9zZSIsImNvbnZlcnRBZGRyZXNzIiwiYWRkciIsInNob3dDb252ZXJ0ZWQiLCJ0aXRsZSIsImNvbnZlcnRlZCIsImFkZHJlc3MiLCJzaG93SGV4IiwiY29udHJhY3RzIiwiY29udmVydFRvIiwic2hvd0Jhc2U2NCIsInRlc3QiLCJib3VuY2UiLCJ1cmwiLCJiYXNlNjRQYXJhbXMiLCJmbGFncyIsImZpbHRlciIsIngiLCJqb2luIiwidXNlQ29tbWFuZCIsInZlcnNpb24iLCJ1c2VWZXJzaW9uIiwic29sQ29tbWFuZCIsImZpbGVzIiwiU29saWRpdHkiLCJidWlsZCIsImNsaWVudExhbmd1YWdlcyIsInNwbGl0IiwiY2xpZW50TGV2ZWwiLCJDbGllbnRDb2RlTGV2ZWwiLCJydW4iLCJqc01vZHVsZSIsIkpTTW9kdWxlIiwibm9kZSIsImdlbkNvbW1hbmQiLCJDbGllbnRDb2RlIiwiZ2VuZXJhdGUiLCJzcHlDb21tYW5kIiwid2ViQ29uc29sZUNvbW1hbmQiLCJzaGFyZWRPcHRpb25zIiwibiIsIm0iLCJoYW5kbGVDb21tYW5kTGluZSIsImFyZ3MiLCJjb21tYW5kQWN0aW9uIiwiaW5mb0NvbW1hbmQiLCJjb21tYW5kQXJncyIsImNvbW1hbmQiLCJhY3Rpb24iLCJvcHRpb24iLCJkZXNjcmlwdGlvbiIsImlzRGVmYXVsdCIsImFsaWFzIiwicGFyc2UiLCJsZW5ndGgiLCJvdXRwdXRIZWxwIiwiYXZhaWxhYmxlIiwicGFyZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFnQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBV0E7O0FBQ0E7O0FBcENBOzs7Ozs7Ozs7Ozs7OztBQXNDQSxJQUFNQSx5QkFBeUIsR0FBRyxLQUFsQzs7QUFFQSxJQUFNQyxPQUFPLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXZCOztTQUdlQyxZOzs7Ozs7OytCQUFmLGlCQUE0QkMsR0FBNUIsRUFBc0NDLE9BQXRDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNVRCxHQUFHLENBQUNFLEtBQUosQ0FBVSxvQ0FBc0JGLEdBQXRCLEVBQTJCQyxPQUEzQixDQUFWLENBRFY7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztTQUtlRSxZOzs7Ozs7OytCQUFmLGtCQUE0QkgsR0FBNUIsRUFBc0NDLE9BQXRDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNVRCxHQUFHLENB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QkE0Sll6RyxPQUFPLENBQUM4RixJQUFSLENBQWFXLE1BQWIsS0FBd0IsQ0E1SnBDO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsbUJBNkprQix1QkFBWXRHLEdBQVosRUFBaUJILE9BQWpCLENBN0psQjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUErSllBLFlBQUFBLE9BQU8sQ0FBQzBHLFVBQVI7O0FBL0paO0FBQUE7QUFBQTs7QUFBQTtBQWtLUSxnQkFBSVgsYUFBYSxLQUFLQyxpQkFBdEIsRUFBbUM7QUFDekI1RixjQUFBQSxPQUR5QixHQUNmNkYsV0FBVyxDQUFDQSxXQUFXLENBQUNRLE1BQVosR0FBcUIsQ0FBdEIsQ0FESTtBQUUvQnJHLGNBQUFBLE9BQU8sQ0FBQ3VHLFNBQVIsR0FBb0J2RyxPQUFPLENBQUN3RyxNQUFSLENBQWVELFNBQW5DO0FBQ0g7O0FBcktUO0FBQUEsbUJBc0tjWixhQUFhLE1BQWIsVUFBYzVGLEdBQWQsNkNBQXNCOEYsV0FBdEIsR0F0S2Q7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOC0yMDE5IFRPTiBERVYgU09MVVRJT05TIExURC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgU09GVFdBUkUgRVZBTFVBVElPTiBMaWNlbnNlICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbiAqIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxuICogTGljZW5zZSBhdDogaHR0cHM6Ly93d3cudG9uLmRldi9saWNlbnNlc1xuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgVE9OIERFViBzb2Z0d2FyZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbi8vIEBmbG93XG5cbmltcG9ydCB7IFRPTkNsaWVudCB9IGZyb20gXCJ0b24tY2xpZW50LW5vZGUtanNcIjtcbmltcG9ydCB7IENsaWVudENvZGUsIENsaWVudENvZGVMZXZlbCwgSlNNb2R1bGUgfSBmcm9tIFwiLi4vY29tcGlsZXJzL2NsaWVudC1jb2RlXCI7XG5pbXBvcnQgeyBTb2xpZGl0eSB9IGZyb20gXCIuLi9jb21waWxlcnMvc29saWRpdHlcIjtcbmltcG9ydCB7IERldiB9IGZyb20gXCIuLi9kZXZcIjtcbmltcG9ydCB7IE5ldHdvcmsgfSBmcm9tIFwiLi4vbmV0d29ya3MvbmV0d29ya3NcIjtcbmltcG9ydCB0eXBlIHsgTmV0d29ya0NvbmZpZyB9IGZyb20gXCIuLi9uZXR3b3Jrcy9uZXR3b3Jrc1wiO1xuaW1wb3J0IHsgd2ViIH0gZnJvbSBcIi4uL3NlcnZlci9zZXJ2ZXJcIjtcbmltcG9ydCB7IENoZWNrTmV0d29yayB9IGZyb20gXCIuL2NoZWNrXCI7XG5pbXBvcnQgeyBjb21waWxlcnNXaXRoTmV0d29ya3MgfSBmcm9tIFwiLi9vcHRpb25zXCI7XG5pbXBvcnQgdHlwZSB7XG4gICAgQ2xlYW5PcHRpb25zLFxuICAgIFJlY3JlYXRlT3B0aW9ucyxcbiAgICBSZXN0YXJ0T3B0aW9ucywgU2V0TmV0d29ya09wdGlvbnMsXG4gICAgU2V0dXBPcHRpb25zLCBTb2xPcHRpb25zLFxuICAgIFN0YXJ0T3B0aW9ucyxcbiAgICBTdG9wT3B0aW9ucyxcbiAgICBVc2VPcHRpb25zLCBXZWJPcHRpb25zLFxufSBmcm9tIFwiLi9vcHRpb25zXCI7XG5cbmltcG9ydCB7IGluZm9Db21tYW5kIH0gZnJvbSBcIi4vaW5mby5qc1wiO1xuaW1wb3J0IHsgc3B5IH0gZnJvbSBcIi4vc3B5XCI7XG5cbmNvbnN0IFVTRV9FWFBFUklNRU5UQUxfRkVBVFVSRVMgPSBmYWxzZTtcblxuY29uc3QgcHJvZ3JhbSA9IHJlcXVpcmUoJ2NvbW1hbmRlcicpO1xuXG5cbmFzeW5jIGZ1bmN0aW9uIHNldHVwQ29tbWFuZChkZXY6IERldiwgb3B0aW9uczogU2V0dXBPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnN0YXJ0KGNvbXBpbGVyc1dpdGhOZXR3b3JrcyhkZXYsIG9wdGlvbnMpKTtcbn1cblxuXG5hc3luYyBmdW5jdGlvbiBzdGFydENvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IFN0YXJ0T3B0aW9ucykge1xuICAgIGF3YWl0IGRldi5zdGFydChjb21waWxlcnNXaXRoTmV0d29ya3MoZGV2LCBvcHRpb25zKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHN0b3BDb21tYW5kKGRldjogRGV2LCBvcHRpb25zOiBTdG9wT3B0aW9ucykge1xuICAgIGF3YWl0IGRldi5zdG9wKGNvbXBpbGVyc1dpdGhOZXR3b3JrcyhkZXYsIG9wdGlvbnMpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVzdGFydENvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IFJlc3RhcnRPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnJlc3RhcnQoY29tcGlsZXJzV2l0aE5ldHdvcmtzKGRldiwgb3B0aW9ucykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZWNyZWF0ZUNvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IFJlY3JlYXRlT3B0aW9ucykge1xuICAgIGF3YWl0IGRldi5yZWNyZWF0ZShjb21waWxlcnNXaXRoTmV0d29ya3MoZGV2LCBvcHRpb25zKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNsZWFuQ29tbWFuZChkZXY6IERldiwgb3B0aW9uczogQ2xlYW5PcHRpb25zKSB7XG4gICAgY29uc3QgYWxsID0gIW9wdGlvbnMuY29tcGlsZXJzICYmICFvcHRpb25zLm5ldHdvcmtzO1xuICAgIGF3YWl0IGRldi5jbGVhbihvcHRpb25zLmNvbXBpbGVycyB8fCBhbGwsIG9wdGlvbnMubmV0d29ya3MgfHwgYWxsLCBvcHRpb25zLmNvbnRhaW5lcnMpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzZXRDb21tYW5kKGRldjogRGV2LCBuYW1lczogc3RyaW5nW10sIG9wdGlvbnM6IFNldE5ldHdvcmtPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnVwZGF0ZU5ldHdvcmtDb25maWdzKGRldi5uZXR3b3Jrc09yQWxsKG5hbWVzKSwgKGNvbmZpZzogTmV0d29ya0NvbmZpZykgPT4ge1xuICAgICAgICBpZiAob3B0aW9ucy5uZXdOYW1lKSB7XG4gICAgICAgICAgICBjb25maWcubmFtZSA9IG9wdGlvbnMubmV3TmFtZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5wb3J0KSB7XG4gICAgICAgICAgICBjb25maWcuaG9zdFBvcnQgPSBvcHRpb25zLnBvcnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuZGJQb3J0KSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5kYlBvcnQgPT09ICdiaW5kJykge1xuICAgICAgICAgICAgICAgIGNvbmZpZy5hcmFuZ29Ib3N0UG9ydCA9IE5ldHdvcmsuZGVmYXVsdEFyYW5nb1BvcnQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZGJQb3J0ID09PSAndW5iaW5kJykge1xuICAgICAgICAgICAgICAgIGNvbmZpZy5hcmFuZ29Ib3N0UG9ydCA9ICcnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25maWcuYXJhbmdvSG9zdFBvcnQgPSBvcHRpb25zLmRiUG9ydCB8fCAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBhZGRDb21tYW5kKGRldjogRGV2LCBuYW1lczogc3RyaW5nW10pIHtcbiAgICBhd2FpdCBkZXYuYWRkTmV0d29ya3MobmFtZXMpO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZW1vdmVDb21tYW5kKGRldjogRGV2LCBuYW1lczogc3RyaW5nW10pIHtcbiAgICBhd2FpdCBkZXYucmVtb3ZlTmV0d29ya3MoZGV2Lm5ldHdvcmtzRnJvbU5hbWVzKG5hbWVzKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdlbmVyYXRlS2V5c0NvbW1hbmQoX2RldjogRGV2KSB7XG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgVE9OQ2xpZW50LmNyZWF0ZSh7XG4gICAgICAgIHNlcnZlcnM6IFsnaHR0cDovL2xvY2FsaG9zdCddLFxuICAgIH0pO1xuICAgIGNvbnN0IGtleXMgPSBhd2FpdCBjbGllbnQuY3J5cHRvLmVkMjU1MTlLZXlwYWlyKCk7XG4gICAgY29uc29sZS5sb2coa2V5cyk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHRlc3RDb21tYW5kKF9kZXY6IERldiwgc2VydmVyczogc3RyaW5nW10sIG9wdGlvbnM6IHsgdmVyYm9zZTogYm9vbGVhbiB9KSB7XG4gICAgYXdhaXQgQ2hlY2tOZXR3b3JrLmNoZWNrTmV0d29ya3Moc2VydmVycywgb3B0aW9ucy52ZXJib3NlKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY29udmVydEFkZHJlc3MoX2RldjogRGV2LCBhZGRyKSB7XG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgVE9OQ2xpZW50LmNyZWF0ZSh7XG4gICAgICAgIHNlcnZlcnM6IFsnaHR0cDovL2xvY2FsaG9zdCddLFxuICAgIH0pO1xuICAgIGNvbnN0IHNob3dDb252ZXJ0ZWQgPSAodGl0bGUsIGNvbnZlcnRlZCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhgJHtjb252ZXJ0ZWQuYWRkcmVzcyA9PT0gYWRkciA/ICfinJMnIDogJyAnfSAke3RpdGxlfSA9ICR7Y29udmVydGVkLmFkZHJlc3N9YCk7XG4gICAgfTtcbiAgICBjb25zdCBzaG93SGV4ID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBjb252ZXJ0ZWQgPSBhd2FpdCBjbGllbnQuY29udHJhY3RzLmNvbnZlcnRBZGRyZXNzKHtcbiAgICAgICAgICAgIGFkZHJlc3M6IGFkZHIsXG4gICAgICAgICAgICBjb252ZXJ0VG86ICdIZXgnLFxuICAgICAgICB9KTtcbiAgICAgICAgc2hvd0NvbnZlcnRlZCgnaGV4JywgY29udmVydGVkKTtcbiAgICB9O1xuICAgIGNvbnN0IHNob3dCYXNlNjQgPSBhc3luYyAodGVzdCwgYm91bmNlLCB1cmwpID0+IHtcbiAgICAgICAgY29uc3QgY29udmVydGVkID0gYXdhaXQgY2xpZW50LmNvbnRyYWN0cy5jb252ZXJ0QWRkcmVzcyh7XG4gICAgICAgICAgICBhZGRyZXNzOiBhZGRyLFxuICAgICAgICAgICAgY29udmVydFRvOiAnQmFzZTY0JyxcbiAgICAgICAgICAgIGJhc2U2NFBhcmFtczoge1xuICAgICAgICAgICAgICAgIGJvdW5jZSxcbiAgICAgICAgICAgICAgICB0ZXN0LFxuICAgICAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBmbGFncyA9IFtcbiAgICAgICAgICAgIHRlc3QgPyAndGVzdCcgOiAnbWFpbicsXG4gICAgICAgICAgICBib3VuY2UgPyAnYm91bmNlJyA6ICcnLFxuICAgICAgICAgICAgdXJsID8gJ3VybCcgOiAnJyxcbiAgICAgICAgXVxuICAgICAgICAgICAgLmZpbHRlcih4ID0+IHggIT09ICcnKVxuICAgICAgICAgICAgLmpvaW4oJyAnKTtcbiAgICAgICAgc2hvd0NvbnZlcnRlZChmbGFncywgY29udmVydGVkKTtcbiAgICB9O1xuICAgIGF3YWl0IHNob3dIZXgoKTtcbiAgICBhd2FpdCBzaG93QmFzZTY0KGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xuICAgIGF3YWl0IHNob3dCYXNlNjQoZmFsc2UsIGZhbHNlLCB0cnVlKTtcbiAgICBhd2FpdCBzaG93QmFzZTY0KGZhbHNlLCB0cnVlLCBmYWxzZSk7XG4gICAgYXdhaXQgc2hvd0Jhc2U2NChmYWxzZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgYXdhaXQgc2hvd0Jhc2U2NCh0cnVlLCBmYWxzZSwgZmFsc2UpO1xuICAgIGF3YWl0IHNob3dCYXNlNjQodHJ1ZSwgZmFsc2UsIHRydWUpO1xuICAgIGF3YWl0IHNob3dCYXNlNjQodHJ1ZSwgdHJ1ZSwgZmFsc2UpO1xuICAgIGF3YWl0IHNob3dCYXNlNjQodHJ1ZSwgdHJ1ZSwgdHJ1ZSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHVzZUNvbW1hbmQoZGV2OiBEZXYsIHZlcnNpb246IHN0cmluZywgb3B0aW9uczogVXNlT3B0aW9ucykge1xuICAgIGF3YWl0IGRldi51c2VWZXJzaW9uKHZlcnNpb24sIGNvbXBpbGVyc1dpdGhOZXR3b3JrcyhkZXYsIG9wdGlvbnMpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc29sQ29tbWFuZChkZXY6IERldiwgZmlsZXM6IHN0cmluZ1tdLCBvcHRpb25zOiBTb2xPcHRpb25zKSB7XG4gICAgYXdhaXQgU29saWRpdHkuYnVpbGQoZGV2LCBmaWxlcywge1xuICAgICAgICBjbGllbnRMYW5ndWFnZXM6IChvcHRpb25zLmNsaWVudExhbmd1YWdlcyB8fCAnJykuc3BsaXQoJywnKSxcbiAgICAgICAgY2xpZW50TGV2ZWw6IG9wdGlvbnMuY2xpZW50TGV2ZWwgfHwgQ2xpZW50Q29kZUxldmVsLnJ1bixcbiAgICAgICAganNNb2R1bGU6IG9wdGlvbnMuanNNb2R1bGUgfHwgSlNNb2R1bGUubm9kZSxcbiAgICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2VuQ29tbWFuZChkZXY6IERldiwgZmlsZXM6IHN0cmluZ1tdLCBvcHRpb25zOiBTb2xPcHRpb25zKSB7XG4gICAgYXdhaXQgQ2xpZW50Q29kZS5nZW5lcmF0ZShmaWxlcywge1xuICAgICAgICBjbGllbnRMYW5ndWFnZXM6IChvcHRpb25zLmNsaWVudExhbmd1YWdlcyB8fCAnJykuc3BsaXQoJywnKSxcbiAgICAgICAgY2xpZW50TGV2ZWw6IG9wdGlvbnMuY2xpZW50TGV2ZWwgfHwgQ2xpZW50Q29kZUxldmVsLnJ1bixcbiAgICAgICAganNNb2R1bGU6IG9wdGlvbnMuanNNb2R1bGUgfHwgSlNNb2R1bGUubm9kZSxcbiAgICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc3B5Q29tbWFuZChkZXY6IERldiwgbmV0d29ya3M6IHN0cmluZ1tdKSB7XG4gICAgYXdhaXQgc3B5KGRldiwgbmV0d29ya3MpO1xufVxuXG5hc3luYyBmdW5jdGlvbiB3ZWJDb25zb2xlQ29tbWFuZChkZXY6IERldiwgb3B0aW9uczogV2ViT3B0aW9ucykge1xuICAgIGF3YWl0IHdlYihkZXYsIG9wdGlvbnMpO1xufVxuXG5jb25zdCBzaGFyZWRPcHRpb25zID0ge1xuICAgIG46IFsnLW4sIC0tbmV0d29ya3MgW25hbWVzXScsICdhcHBseSBjb21tYW5kIHRvIHNwZWNpZmllZCBuZXR3b3JrW3NdIChuYW1lcyBtdXN0IGJlIHNlcGFyYXRlZCB3aXRoIGNvbW1hKSddLFxuICAgIG06IFsnLW0sIC0tY29tcGlsZXJzJywgJ2FwcGx5IGNvbW1hbmQgdG8gdGhlIGNvbXBpbGVycyBjb250YWluZXInXSxcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZUNvbW1hbmRMaW5lKGRldjogRGV2LCBhcmdzOiBzdHJpbmdbXSkge1xuICAgIGxldCBjb21tYW5kQWN0aW9uID0gaW5mb0NvbW1hbmQ7XG4gICAgbGV0IGNvbW1hbmRBcmdzID0gW107XG5cbiAgICBjb25zdCBjb21tYW5kID0gKGFjdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgIGNvbW1hbmRBY3Rpb24gPSBhY3Rpb247XG4gICAgICAgICAgICBjb21tYW5kQXJncyA9IGFyZ3M7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLm5hbWUoZGV2Lm5hbWUpXG4gICAgICAgIC52ZXJzaW9uKGRldi52ZXJzaW9uKVxuICAgICAgICAub3B0aW9uKCctYSwgLS1hdmFpbGFibGUnLCAnc2hvdyBhdmFpbGFibGUgdmVyc2lvbnMnKVxuICAgICAgICAuZGVzY3JpcHRpb24oJ1RPTiBMYWJzIGRldmVsb3BtZW50IHRvb2xzJyk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdpbmZvJywgeyBpc0RlZmF1bHQ6IHRydWUgfSkuZGVzY3JpcHRpb24oJ1Nob3cgc3VtbWFyeSBhYm91dCBkZXYgZW52aXJvbm1lbnQnKVxuICAgICAgICAub3B0aW9uKCctYSwgLS1hdmFpbGFibGUnLCAnc2hvdyBhdmFpbGFibGUgdmVyc2lvbnMnKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoaW5mb0NvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3NvbCBbZmlsZXMuLi5dJykuZGVzY3JpcHRpb24oJ0J1aWxkIHNvbGlkaXR5IGNvbnRyYWN0W3NdJylcbiAgICAgICAgLm9wdGlvbihcbiAgICAgICAgICAgICctbCwgLS1jbGllbnQtbGFuZ3VhZ2VzIDxsYW5ndWFnZXM+JyxcbiAgICAgICAgICAgICdnZW5lcmF0ZSBjbGllbnQgY29kZSBmb3IgbGFuZ3VhZ2VzOiBcImpzXCIsIFwicnNcIiAobXVsdGlwbGUgbGFuZ3VhZ2VzIG11c3QgYmUgc2VwYXJhdGVkIHdpdGggY29tbWEpJyxcbiAgICAgICAgKVxuICAgICAgICAub3B0aW9uKFxuICAgICAgICAgICAgJy1MLCAtLWNsaWVudC1sZXZlbCA8Y2xpZW50LWxldmVsPicsXG4gICAgICAgICAgICAnY2xpZW50IGNvZGUgbGV2ZWw6IFwicnVuXCIgdG8gcnVuIG9ubHksIFwiZGVwbG95XCIgdG8gcnVuIGFuZCBkZXBsb3kgKGluY2x1ZGVzIGFuIGltYWdlQmFzZTY0IG9mIGJpbmFyeSBjb250cmFjdCknLFxuICAgICAgICAgICAgJ2RlcGxveScsXG4gICAgICAgIClcbiAgICAgICAgLm9wdGlvbihcbiAgICAgICAgICAgICctLWpzLW1vZHVsZSA8bW9kdWxlLXR5cGU+JyxcbiAgICAgICAgICAgIFwiSmF2YSBTY3JpcHQgbW9kdWxlIHR5cGU6IFwiICtcbiAgICAgICAgICAgIFwiYG5vZGVgIHRvIHVzZSB3aXRoIGBjb25zdCBGb29Db250cmFjdCA9IHJlcXVpcmUoJ2Zvb2ApYCwgXCIgK1xuICAgICAgICAgICAgXCJgbm9kZU5vRGVmYXVsdGAgdG8gdXNlIHdpdGggYGNvbnN0IHtGb29Db250cmFjdH0gPSByZXF1aXJlKCdmb29gKWAsIFwiICtcbiAgICAgICAgICAgIFwiYGVzYCB0byB1c2Ugd2l0aCBgaW1wb3J0IEZvb0NvbnRyYWN0IGZyb20gJ2ZvbydgLCBcIiArXG4gICAgICAgICAgICBcImBlc05vRGVmYXVsdGAgdG8gdXNlIHdpdGggYGltcG9ydCB7Rm9vQ29udHJhY3R9IGZyb20gJ2ZvbydgIChgbm9kZWAgaXMgYSBkZWZhdWx0IG9wdGlvbilcIixcbiAgICAgICAgICAgICdub2RlJyxcbiAgICAgICAgKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoc29sQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnZ2VuIFtmaWxlcy4uLl0nKS5kZXNjcmlwdGlvbignR2VuZXJhdGUgY2xpZW50IGNvZGUgZm9yIGNvbnRyYWN0W3NdJylcbiAgICAgICAgLm9wdGlvbihcbiAgICAgICAgICAgICctbCwgLS1jbGllbnQtbGFuZ3VhZ2VzIDxsYW5ndWFnZXM+JyxcbiAgICAgICAgICAgICdnZW5lcmF0ZSBjbGllbnQgY29kZSBmb3IgbGFuZ3VhZ2VzOiBcImpzXCIsIFwicnNcIiAobXVsdGlwbGUgbGFuZ3VhZ2VzIG11c3QgYmUgc2VwYXJhdGVkIHdpdGggY29tbWEpJyxcbiAgICAgICAgKVxuICAgICAgICAub3B0aW9uKFxuICAgICAgICAgICAgJy1MLCAtLWNsaWVudC1sZXZlbCA8Y2xpZW50LWxldmVsPicsXG4gICAgICAgICAgICAnY2xpZW50IGNvZGUgbGV2ZWw6IFwicnVuXCIgdG8gcnVuIG9ubHksIFwiZGVwbG95XCIgdG8gcnVuIGFuZCBkZXBsb3kgKGluY2x1ZGVzIGFuIGltYWdlQmFzZTY0IG9mIGJpbmFyeSBjb250cmFjdCknLFxuICAgICAgICAgICAgJ2RlcGxveScsXG4gICAgICAgIClcbiAgICAgICAgLm9wdGlvbihcbiAgICAgICAgICAgICctLWpzLW1vZHVsZSA8bW9kdWxlLXR5cGU+JyxcbiAgICAgICAgICAgIFwiSmF2YSBTY3JpcHQgbW9kdWxlIHR5cGU6IFwiICtcbiAgICAgICAgICAgIFwiYG5vZGVgIHRvIHVzZSB3aXRoIGBjb25zdCBGb29Db250cmFjdCA9IHJlcXVpcmUoJ2Zvb2ApYCwgXCIgK1xuICAgICAgICAgICAgXCJgbm9kZU5vRGVmYXVsdGAgdG8gdXNlIHdpdGggYGNvbnN0IHtGb29Db250cmFjdH0gPSByZXF1aXJlKCdmb29gKWAsIFwiICtcbiAgICAgICAgICAgIFwiYGVzYCB0byB1c2Ugd2l0aCBgaW1wb3J0IEZvb0NvbnRyYWN0IGZyb20gJ2ZvbydgLCBcIiArXG4gICAgICAgICAgICBcImBlc05vRGVmYXVsdGAgdG8gdXNlIHdpdGggYGltcG9ydCB7Rm9vQ29udHJhY3R9IGZyb20gJ2ZvbydgIChgbm9kZWAgaXMgYSBkZWZhdWx0IG9wdGlvbilcIixcbiAgICAgICAgICAgICdub2RlJyxcbiAgICAgICAgKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoZ2VuQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnc3RhcnQnKS5kZXNjcmlwdGlvbignU3RhcnQgZGV2IGNvbnRhaW5lcnMnKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubilcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm0pXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChzdGFydENvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3N0b3AnKS5kZXNjcmlwdGlvbignU3RvcCBkZXYgY29udGFpbmVycycpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHN0b3BDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdyZXN0YXJ0JykuZGVzY3JpcHRpb24oJ1Jlc3RhcnQgZGV2IGNvbnRhaW5lcnMnKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubilcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm0pXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChyZXN0YXJ0Q29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgncmVjcmVhdGUnKS5kZXNjcmlwdGlvbignUmVjcmVhdGUgZGV2IGNvbnRhaW5lcnMnKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubilcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm0pXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChyZWNyZWF0ZUNvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3NldHVwJykuZGVzY3JpcHRpb24oJ1NldHVwIGRldiBlbnZpcm9ubWVudCcpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHNldHVwQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnY2xlYW4nKS5kZXNjcmlwdGlvbignUmVtb3ZlIGRvY2tlciBjb250YWluZXJzIGFuZCBpbWFnZXMgcmVsYXRlZCB0byBUT04gRGV2JylcbiAgICAgICAgLm9wdGlvbignLW4sIC0tbmV0d29ya3MnLCAnY2xlYW4gbG9jYWwgbm9kZSBkb2NrZXIgY29udGFpbmVycyBhbmQgaW1hZ2VzJylcbiAgICAgICAgLm9wdGlvbignLW0sIC0tY29tcGlsZXJzJywgJ2NsZWFuIGNvbXBpbGVycyBkb2NrZXIgY29udGFpbmVycyBhbmQgaW1hZ2VzJylcbiAgICAgICAgLm9wdGlvbignLWMsIC0tY29udGFpbmVycycsICdjbGVhbiBjb250YWluZXJzIG9ubHknLCBmYWxzZSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKGNsZWFuQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgndXNlIDx2ZXJzaW9uPicpLmRlc2NyaXB0aW9uKCdVc2Ugc3BlY2lmaWVkIHZlcnNpb24gZm9yIGNvbnRhaW5lcnMnKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubilcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm0pXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZCh1c2VDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdzZXQgW25ldHdvcmsuLi5dJykuZGVzY3JpcHRpb24oJ1NldCBuZXR3b3JrW3NdIG9wdGlvbnMnKVxuICAgICAgICAub3B0aW9uKCctcCwgLS1wb3J0IDxwb3J0PicsICdob3N0IHBvcnQgdG8gYm91bmQgbG9jYWwgbm9kZScpXG4gICAgICAgIC5vcHRpb24oXG4gICAgICAgICAgICAnLWQsIC0tZGItcG9ydCA8YmluZGluZz4nLFxuICAgICAgICAgICAgJ2hvc3QgcG9ydCB0byBib3VuZCBsb2NhbCBub2RlcyBBcmFuZ28gREIgKFwiYmluZFwiIHRvIHVzZSBkZWZhdWx0IEFyYW5nbyBEQiBwb3J0LCBcInVuYmluZFwiIHRvIHVuYmluZCBBcmFuZ28gREIgcG9ydCknLFxuICAgICAgICApXG4gICAgICAgIC5vcHRpb24oJy1uLCAtLW5ldy1uYW1lIDxuYW1lPicsICdzZXQgbmV3IG5hbWUgZm9yIG5ldHdvcmsnKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoc2V0Q29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnYWRkIFtuZXR3b3JrLi4uXScpLmRlc2NyaXB0aW9uKCdBZGQgbmV0d29ya1tzXScpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChhZGRDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdyZW1vdmUgW25ldHdvcmsuLi5dJykuYWxpYXMoJ3JtJykuZGVzY3JpcHRpb24oJ1JlbW92ZSBuZXR3b3JrW3NdJylcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHJlbW92ZUNvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3Rlc3QgW3NlcnZlcnMuLi5dJykuYWxpYXMoJ3QnKS5kZXNjcmlwdGlvbignVGVzdCBuZXR3b3JrW3NdJylcbiAgICAgICAgLm9wdGlvbignLXYsIC0tdmVyYm9zZScsICdzaG93IHZlcmJvc2UgdGVzdCBsb2cnLCBmYWxzZSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHRlc3RDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdrZXlzJykuYWxpYXMoJ2snKS5kZXNjcmlwdGlvbignR2VuZXJhdGUgcmFuZG9tIEtleSBQYWlyJylcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKGdlbmVyYXRlS2V5c0NvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ2FkZHIgPGFkZHI+JykuYWxpYXMoJ2EnKS5kZXNjcmlwdGlvbignQ29udmVydCBhZGRyZXNzJylcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKGNvbnZlcnRBZGRyZXNzKSk7XG5cbiAgICBpZiAoVVNFX0VYUEVSSU1FTlRBTF9GRUFUVVJFUykge1xuICAgICAgICBwcm9ncmFtXG4gICAgICAgICAgICAuY29tbWFuZCgnc3B5IFtuZXR3b3Jrcy4uLl0nKS5kZXNjcmlwdGlvbignUnVuIG5ldHdvcmsgc2Nhbm5lcicpXG4gICAgICAgICAgICAuYWN0aW9uKGNvbW1hbmQoc3B5Q29tbWFuZCkpO1xuXG4gICAgICAgIHByb2dyYW1cbiAgICAgICAgICAgIC5jb21tYW5kKCd3ZWInKS5kZXNjcmlwdGlvbignUnVuIHdlYiBjb25zb2xlJylcbiAgICAgICAgICAgIC5vcHRpb24oJy1wLCAtLXBvcnQgPHBvcnQ+JywgJ2hvc3QgcG9ydCB0byBib3VuZCB3ZWIgY29uc29sZSAoZGVmYXVsdDogODgwMCknLCAnODgwMCcpXG4gICAgICAgICAgICAuYWN0aW9uKGNvbW1hbmQod2ViQ29uc29sZUNvbW1hbmQpKTtcbiAgICB9XG5cbiAgICAvLyAuY29tbWFuZCgndXBkYXRlJywgYHVwZGF0ZSAke2Rldi5uYW1lfSBkb2NrZXIgaW1hZ2VzYCkuYWN0aW9uKGFjdGlvbilcblxuICAgIHByb2dyYW0ucGFyc2UoYXJncyk7XG5cbiAgICBpZiAoY29tbWFuZEFyZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGlmIChwcm9ncmFtLmFyZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBhd2FpdCBpbmZvQ29tbWFuZChkZXYsIHByb2dyYW0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvZ3JhbS5vdXRwdXRIZWxwKCk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoY29tbWFuZEFjdGlvbiA9PT0gaW5mb0NvbW1hbmQpIHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBjb21tYW5kQXJnc1tjb21tYW5kQXJncy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIG9wdGlvbnMuYXZhaWxhYmxlID0gb3B0aW9ucy5wYXJlbnQuYXZhaWxhYmxlO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IGNvbW1hbmRBY3Rpb24oZGV2LCAuLi5jb21tYW5kQXJncyk7XG4gICAgfVxufVxuXG5leHBvcnQgeyBoYW5kbGVDb21tYW5kTGluZSB9O1xuIl19