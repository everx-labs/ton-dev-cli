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
            return (0, _check.checkNetworks)(servers, options.verbose);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvY2xpLmpzIl0sIm5hbWVzIjpbIlVTRV9FWFBFUklNRU5UQUxfRkVBVFVSRVMiLCJwcm9ncmFtIiwicmVxdWlyZSIsInNldHVwQ29tbWFuZCIsImRldiIsIm9wdGlvbnMiLCJzdGFydCIsInN0YXJ0Q29tbWFuZCIsInN0b3BDb21tYW5kIiwic3RvcCIsInJlc3RhcnRDb21tYW5kIiwicmVzdGFydCIsInJlY3JlYXRlQ29tbWFuZCIsInJlY3JlYXRlIiwiY2xlYW5Db21tYW5kIiwiYWxsIiwiY29tcGlsZXJzIiwibmV0d29ya3MiLCJjbGVhbiIsImNvbnRhaW5lcnMiLCJzZXRDb21tYW5kIiwibmFtZXMiLCJ1cGRhdGVOZXR3b3JrQ29uZmlncyIsIm5ldHdvcmtzT3JBbGwiLCJjb25maWciLCJuZXdOYW1lIiwibmFtZSIsInBvcnQiLCJob3N0UG9ydCIsImRiUG9ydCIsImFyYW5nb0hvc3RQb3J0IiwiTmV0d29yayIsImRlZmF1bHRBcmFuZ29Qb3J0IiwiYWRkQ29tbWFuZCIsImFkZE5ldHdvcmtzIiwicmVtb3ZlQ29tbWFuZCIsInJlbW92ZU5ldHdvcmtzIiwibmV0d29ya3NGcm9tTmFtZXMiLCJnZW5lcmF0ZUtleXNDb21tYW5kIiwiX2RldiIsIlRPTkNsaWVudCIsImNyZWF0ZSIsInNlcnZlcnMiLCJjbGllbnQiLCJjcnlwdG8iLCJlZDI1NTE5S2V5cGFpciIsImtleXMiLCJjb25zb2xlIiwibG9nIiwidGVzdENvbW1hbmQiLCJ2ZXJib3NlIiwiY29udmVydEFkZHJlc3MiLCJhZGRyIiwic2hvd0NvbnZlcnRlZCIsInRpdGxlIiwiY29udmVydGVkIiwiYWRkcmVzcyIsInNob3dIZXgiLCJjb250cmFjdHMiLCJjb252ZXJ0VG8iLCJzaG93QmFzZTY0IiwidGVzdCIsImJvdW5jZSIsInVybCIsImJhc2U2NFBhcmFtcyIsImZsYWdzIiwiZmlsdGVyIiwieCIsImpvaW4iLCJ1c2VDb21tYW5kIiwidmVyc2lvbiIsInVzZVZlcnNpb24iLCJzb2xDb21tYW5kIiwiZmlsZXMiLCJTb2xpZGl0eSIsImJ1aWxkIiwiY2xpZW50TGFuZ3VhZ2VzIiwic3BsaXQiLCJjbGllbnRMZXZlbCIsIkNsaWVudENvZGVMZXZlbCIsInJ1biIsImpzTW9kdWxlIiwiSlNNb2R1bGUiLCJub2RlIiwiZ2VuQ29tbWFuZCIsIkNsaWVudENvZGUiLCJnZW5lcmF0ZSIsInNweUNvbW1hbmQiLCJ3ZWJDb25zb2xlQ29tbWFuZCIsInNoYXJlZE9wdGlvbnMiLCJuIiwibSIsImhhbmRsZUNvbW1hbmRMaW5lIiwiYXJncyIsImNvbW1hbmRBY3Rpb24iLCJpbmZvQ29tbWFuZCIsImNvbW1hbmRBcmdzIiwiY29tbWFuZCIsImFjdGlvbiIsIm9wdGlvbiIsImRlc2NyaXB0aW9uIiwiaXNEZWZhdWx0IiwiYWxpYXMiLCJwYXJzZSIsImxlbmd0aCIsIm91dHB1dEhlbHAiLCJhdmFpbGFibGUiLCJwYXJlbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQWdCQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFXQTs7QUFDQTs7QUFwQ0E7Ozs7Ozs7Ozs7Ozs7O0FBc0NBLElBQU1BLHlCQUF5QixHQUFHLEtBQWxDOztBQUVBLElBQU1DLE9BQU8sR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O1NBR2VDLFk7Ozs7Ozs7K0JBQWYsaUJBQTRCQyxHQUE1QixFQUFzQ0MsT0FBdEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQ1VELEdBQUcsQ0FBQ0UsS0FBSixDQUFVLG9DQUFzQkYsR0FBdEIsRUFBMkJDLE9BQTNCLENBQVYsQ0FEVjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O1NBS2VFLFk7Ozs7Ozs7K0JBQWYsa0JBQTRCSCxHQUE1QixFQUFzQ0MsT0FBdEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQ1VELEdBQUcsQ0FBQ0UsS0FBSixDQUFVLG9DQUFzQkYsR0FBdEIsRUFB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O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsbUJBNkprQix1QkFBWXBHLEdBQVosRUFBaUJILE9BQWpCLENBN0psQjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUErSllBLFlBQUFBLE9BQU8sQ0FBQ3dHLFVBQVI7O0FBL0paO0FBQUE7QUFBQTs7QUFBQTtBQWtLUSxnQkFBSVgsYUFBYSxLQUFLQyxpQkFBdEIsRUFBbUM7QUFDekIxRixjQUFBQSxPQUR5QixHQUNmMkYsV0FBVyxDQUFDQSxXQUFXLENBQUNRLE1BQVosR0FBcUIsQ0FBdEIsQ0FESTtBQUUvQm5HLGNBQUFBLE9BQU8sQ0FBQ3FHLFNBQVIsR0FBb0JyRyxPQUFPLENBQUNzRyxNQUFSLENBQWVELFNBQW5DO0FBQ0g7O0FBcktUO0FBQUEsbUJBc0tjWixhQUFhLE1BQWIsVUFBYzFGLEdBQWQsNkNBQXNCNEYsV0FBdEIsR0F0S2Q7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOC0yMDE5IFRPTiBERVYgU09MVVRJT05TIExURC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgU09GVFdBUkUgRVZBTFVBVElPTiBMaWNlbnNlICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbiAqIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxuICogTGljZW5zZSBhdDogaHR0cHM6Ly93d3cudG9uLmRldi9saWNlbnNlc1xuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgVE9OIERFViBzb2Z0d2FyZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbi8vIEBmbG93XG5cbmltcG9ydCB7VE9OQ2xpZW50fSBmcm9tIFwidG9uLWNsaWVudC1ub2RlLWpzXCI7XG5pbXBvcnQge0NsaWVudENvZGUsIENsaWVudENvZGVMZXZlbCwgSlNNb2R1bGV9IGZyb20gXCIuLi9jb21waWxlcnMvY2xpZW50LWNvZGVcIjtcbmltcG9ydCB7U29saWRpdHl9IGZyb20gXCIuLi9jb21waWxlcnMvc29saWRpdHlcIjtcbmltcG9ydCB7RGV2fSBmcm9tIFwiLi4vZGV2XCI7XG5pbXBvcnQge05ldHdvcmt9IGZyb20gXCIuLi9uZXR3b3Jrcy9uZXR3b3Jrc1wiO1xuaW1wb3J0IHR5cGUge05ldHdvcmtDb25maWd9IGZyb20gXCIuLi9uZXR3b3Jrcy9uZXR3b3Jrc1wiO1xuaW1wb3J0IHt3ZWJ9IGZyb20gXCIuLi9zZXJ2ZXIvc2VydmVyXCI7XG5pbXBvcnQgeyBjaGVja05ldHdvcmtzIH0gZnJvbSBcIi4vY2hlY2tcIjtcbmltcG9ydCB7Y29tcGlsZXJzV2l0aE5ldHdvcmtzfSBmcm9tIFwiLi9vcHRpb25zXCI7XG5pbXBvcnQgdHlwZSB7XG4gICAgQ2xlYW5PcHRpb25zLFxuICAgIFJlY3JlYXRlT3B0aW9ucyxcbiAgICBSZXN0YXJ0T3B0aW9ucywgU2V0TmV0d29ya09wdGlvbnMsXG4gICAgU2V0dXBPcHRpb25zLCBTb2xPcHRpb25zLFxuICAgIFN0YXJ0T3B0aW9ucyxcbiAgICBTdG9wT3B0aW9ucyxcbiAgICBVc2VPcHRpb25zLCBXZWJPcHRpb25zLFxufSBmcm9tIFwiLi9vcHRpb25zXCI7XG5cbmltcG9ydCB7aW5mb0NvbW1hbmR9IGZyb20gXCIuL2luZm8uanNcIjtcbmltcG9ydCB7c3B5fSBmcm9tIFwiLi9zcHlcIjtcblxuY29uc3QgVVNFX0VYUEVSSU1FTlRBTF9GRUFUVVJFUyA9IGZhbHNlO1xuXG5jb25zdCBwcm9ncmFtID0gcmVxdWlyZSgnY29tbWFuZGVyJyk7XG5cblxuYXN5bmMgZnVuY3Rpb24gc2V0dXBDb21tYW5kKGRldjogRGV2LCBvcHRpb25zOiBTZXR1cE9wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYuc3RhcnQoY29tcGlsZXJzV2l0aE5ldHdvcmtzKGRldiwgb3B0aW9ucykpO1xufVxuXG5cbmFzeW5jIGZ1bmN0aW9uIHN0YXJ0Q29tbWFuZChkZXY6IERldiwgb3B0aW9uczogU3RhcnRPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnN0YXJ0KGNvbXBpbGVyc1dpdGhOZXR3b3JrcyhkZXYsIG9wdGlvbnMpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc3RvcENvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IFN0b3BPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnN0b3AoY29tcGlsZXJzV2l0aE5ldHdvcmtzKGRldiwgb3B0aW9ucykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZXN0YXJ0Q29tbWFuZChkZXY6IERldiwgb3B0aW9uczogUmVzdGFydE9wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYucmVzdGFydChjb21waWxlcnNXaXRoTmV0d29ya3MoZGV2LCBvcHRpb25zKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlY3JlYXRlQ29tbWFuZChkZXY6IERldiwgb3B0aW9uczogUmVjcmVhdGVPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnJlY3JlYXRlKGNvbXBpbGVyc1dpdGhOZXR3b3JrcyhkZXYsIG9wdGlvbnMpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY2xlYW5Db21tYW5kKGRldjogRGV2LCBvcHRpb25zOiBDbGVhbk9wdGlvbnMpIHtcbiAgICBjb25zdCBhbGwgPSAhb3B0aW9ucy5jb21waWxlcnMgJiYgIW9wdGlvbnMubmV0d29ya3M7XG4gICAgYXdhaXQgZGV2LmNsZWFuKG9wdGlvbnMuY29tcGlsZXJzIHx8IGFsbCwgb3B0aW9ucy5uZXR3b3JrcyB8fCBhbGwsIG9wdGlvbnMuY29udGFpbmVycyk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNldENvbW1hbmQoZGV2OiBEZXYsIG5hbWVzOiBzdHJpbmdbXSwgb3B0aW9uczogU2V0TmV0d29ya09wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYudXBkYXRlTmV0d29ya0NvbmZpZ3MoZGV2Lm5ldHdvcmtzT3JBbGwobmFtZXMpLCAoY29uZmlnOiBOZXR3b3JrQ29uZmlnKSA9PiB7XG4gICAgICAgIGlmIChvcHRpb25zLm5ld05hbWUpIHtcbiAgICAgICAgICAgIGNvbmZpZy5uYW1lID0gb3B0aW9ucy5uZXdOYW1lO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLnBvcnQpIHtcbiAgICAgICAgICAgIGNvbmZpZy5ob3N0UG9ydCA9IG9wdGlvbnMucG9ydDtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5kYlBvcnQpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmRiUG9ydCA9PT0gJ2JpbmQnKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLmFyYW5nb0hvc3RQb3J0ID0gTmV0d29yay5kZWZhdWx0QXJhbmdvUG9ydDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5kYlBvcnQgPT09ICd1bmJpbmQnKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLmFyYW5nb0hvc3RQb3J0ID0gJyc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbmZpZy5hcmFuZ29Ib3N0UG9ydCA9IG9wdGlvbnMuZGJQb3J0IHx8ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGFkZENvbW1hbmQoZGV2OiBEZXYsIG5hbWVzOiBzdHJpbmdbXSkge1xuICAgIGF3YWl0IGRldi5hZGROZXR3b3JrcyhuYW1lcyk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlbW92ZUNvbW1hbmQoZGV2OiBEZXYsIG5hbWVzOiBzdHJpbmdbXSkge1xuICAgIGF3YWl0IGRldi5yZW1vdmVOZXR3b3JrcyhkZXYubmV0d29ya3NGcm9tTmFtZXMobmFtZXMpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGVLZXlzQ29tbWFuZChfZGV2OiBEZXYpIHtcbiAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBUT05DbGllbnQuY3JlYXRlKHtcbiAgICAgICAgc2VydmVyczogWydodHRwOi8vbG9jYWxob3N0J10sXG4gICAgfSk7XG4gICAgY29uc3Qga2V5cyA9IGF3YWl0IGNsaWVudC5jcnlwdG8uZWQyNTUxOUtleXBhaXIoKTtcbiAgICBjb25zb2xlLmxvZyhrZXlzKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gdGVzdENvbW1hbmQoX2RldjogRGV2LCBzZXJ2ZXJzOiBzdHJpbmdbXSwgb3B0aW9uczogeyB2ZXJib3NlOiBib29sZWFuIH0pIHtcbiAgICBhd2FpdCBjaGVja05ldHdvcmtzKHNlcnZlcnMsIG9wdGlvbnMudmVyYm9zZSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNvbnZlcnRBZGRyZXNzKF9kZXY6IERldiwgYWRkcikge1xuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IFRPTkNsaWVudC5jcmVhdGUoe1xuICAgICAgICBzZXJ2ZXJzOiBbJ2h0dHA6Ly9sb2NhbGhvc3QnXSxcbiAgICB9KTtcbiAgICBjb25zdCBzaG93Q29udmVydGVkID0gKHRpdGxlLCBjb252ZXJ0ZWQpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coYCR7Y29udmVydGVkLmFkZHJlc3MgPT09IGFkZHIgPyAn4pyTJyA6ICcgJ30gJHt0aXRsZX0gPSAke2NvbnZlcnRlZC5hZGRyZXNzfWApO1xuICAgIH07XG4gICAgY29uc3Qgc2hvd0hleCA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgY29udmVydGVkID0gYXdhaXQgY2xpZW50LmNvbnRyYWN0cy5jb252ZXJ0QWRkcmVzcyh7XG4gICAgICAgICAgICBhZGRyZXNzOiBhZGRyLFxuICAgICAgICAgICAgY29udmVydFRvOiAnSGV4JyxcbiAgICAgICAgfSk7XG4gICAgICAgIHNob3dDb252ZXJ0ZWQoJ2hleCcsIGNvbnZlcnRlZCk7XG4gICAgfTtcbiAgICBjb25zdCBzaG93QmFzZTY0ID0gYXN5bmMgKHRlc3QsIGJvdW5jZSwgdXJsKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnZlcnRlZCA9IGF3YWl0IGNsaWVudC5jb250cmFjdHMuY29udmVydEFkZHJlc3Moe1xuICAgICAgICAgICAgYWRkcmVzczogYWRkcixcbiAgICAgICAgICAgIGNvbnZlcnRUbzogJ0Jhc2U2NCcsXG4gICAgICAgICAgICBiYXNlNjRQYXJhbXM6IHtcbiAgICAgICAgICAgICAgICBib3VuY2UsXG4gICAgICAgICAgICAgICAgdGVzdCxcbiAgICAgICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZmxhZ3MgPSBbXG4gICAgICAgICAgICB0ZXN0ID8gJ3Rlc3QnIDogJ21haW4nLFxuICAgICAgICAgICAgYm91bmNlID8gJ2JvdW5jZScgOiAnJyxcbiAgICAgICAgICAgIHVybCA/ICd1cmwnIDogJycsXG4gICAgICAgIF1cbiAgICAgICAgICAgIC5maWx0ZXIoeCA9PiB4ICE9PSAnJylcbiAgICAgICAgICAgIC5qb2luKCcgJyk7XG4gICAgICAgIHNob3dDb252ZXJ0ZWQoZmxhZ3MsIGNvbnZlcnRlZCk7XG4gICAgfTtcbiAgICBhd2FpdCBzaG93SGV4KCk7XG4gICAgYXdhaXQgc2hvd0Jhc2U2NChmYWxzZSwgZmFsc2UsIGZhbHNlKTtcbiAgICBhd2FpdCBzaG93QmFzZTY0KGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XG4gICAgYXdhaXQgc2hvd0Jhc2U2NChmYWxzZSwgdHJ1ZSwgZmFsc2UpO1xuICAgIGF3YWl0IHNob3dCYXNlNjQoZmFsc2UsIHRydWUsIHRydWUpO1xuICAgIGF3YWl0IHNob3dCYXNlNjQodHJ1ZSwgZmFsc2UsIGZhbHNlKTtcbiAgICBhd2FpdCBzaG93QmFzZTY0KHRydWUsIGZhbHNlLCB0cnVlKTtcbiAgICBhd2FpdCBzaG93QmFzZTY0KHRydWUsIHRydWUsIGZhbHNlKTtcbiAgICBhd2FpdCBzaG93QmFzZTY0KHRydWUsIHRydWUsIHRydWUpO1xufVxuXG5hc3luYyBmdW5jdGlvbiB1c2VDb21tYW5kKGRldjogRGV2LCB2ZXJzaW9uOiBzdHJpbmcsIG9wdGlvbnM6IFVzZU9wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYudXNlVmVyc2lvbih2ZXJzaW9uLCBjb21waWxlcnNXaXRoTmV0d29ya3MoZGV2LCBvcHRpb25zKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNvbENvbW1hbmQoZGV2OiBEZXYsIGZpbGVzOiBzdHJpbmdbXSwgb3B0aW9uczogU29sT3B0aW9ucykge1xuICAgIGF3YWl0IFNvbGlkaXR5LmJ1aWxkKGRldiwgZmlsZXMsIHtcbiAgICAgICAgY2xpZW50TGFuZ3VhZ2VzOiAob3B0aW9ucy5jbGllbnRMYW5ndWFnZXMgfHwgJycpLnNwbGl0KCcsJyksXG4gICAgICAgIGNsaWVudExldmVsOiBvcHRpb25zLmNsaWVudExldmVsIHx8IENsaWVudENvZGVMZXZlbC5ydW4sXG4gICAgICAgIGpzTW9kdWxlOiBvcHRpb25zLmpzTW9kdWxlIHx8IEpTTW9kdWxlLm5vZGUsXG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdlbkNvbW1hbmQoZGV2OiBEZXYsIGZpbGVzOiBzdHJpbmdbXSwgb3B0aW9uczogU29sT3B0aW9ucykge1xuICAgIGF3YWl0IENsaWVudENvZGUuZ2VuZXJhdGUoZmlsZXMsIHtcbiAgICAgICAgY2xpZW50TGFuZ3VhZ2VzOiAob3B0aW9ucy5jbGllbnRMYW5ndWFnZXMgfHwgJycpLnNwbGl0KCcsJyksXG4gICAgICAgIGNsaWVudExldmVsOiBvcHRpb25zLmNsaWVudExldmVsIHx8IENsaWVudENvZGVMZXZlbC5ydW4sXG4gICAgICAgIGpzTW9kdWxlOiBvcHRpb25zLmpzTW9kdWxlIHx8IEpTTW9kdWxlLm5vZGUsXG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNweUNvbW1hbmQoZGV2OiBEZXYsIG5ldHdvcmtzOiBzdHJpbmdbXSkge1xuICAgIGF3YWl0IHNweShkZXYsIG5ldHdvcmtzKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gd2ViQ29uc29sZUNvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IFdlYk9wdGlvbnMpIHtcbiAgICBhd2FpdCB3ZWIoZGV2LCBvcHRpb25zKTtcbn1cblxuY29uc3Qgc2hhcmVkT3B0aW9ucyA9IHtcbiAgICBuOiBbJy1uLCAtLW5ldHdvcmtzIFtuYW1lc10nLCAnYXBwbHkgY29tbWFuZCB0byBzcGVjaWZpZWQgbmV0d29ya1tzXSAobmFtZXMgbXVzdCBiZSBzZXBhcmF0ZWQgd2l0aCBjb21tYSknXSxcbiAgICBtOiBbJy1tLCAtLWNvbXBpbGVycycsICdhcHBseSBjb21tYW5kIHRvIHRoZSBjb21waWxlcnMgY29udGFpbmVyJ10sXG59O1xuXG5hc3luYyBmdW5jdGlvbiBoYW5kbGVDb21tYW5kTGluZShkZXY6IERldiwgYXJnczogc3RyaW5nW10pIHtcbiAgICBsZXQgY29tbWFuZEFjdGlvbiA9IGluZm9Db21tYW5kO1xuICAgIGxldCBjb21tYW5kQXJncyA9IFtdO1xuXG4gICAgY29uc3QgY29tbWFuZCA9IChhY3Rpb24pID0+IHtcbiAgICAgICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICBjb21tYW5kQWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgY29tbWFuZEFyZ3MgPSBhcmdzO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5uYW1lKGRldi5uYW1lKVxuICAgICAgICAudmVyc2lvbihkZXYudmVyc2lvbilcbiAgICAgICAgLm9wdGlvbignLWEsIC0tYXZhaWxhYmxlJywgJ3Nob3cgYXZhaWxhYmxlIHZlcnNpb25zJylcbiAgICAgICAgLmRlc2NyaXB0aW9uKCdUT04gTGFicyBkZXZlbG9wbWVudCB0b29scycpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnaW5mbycsIHtpc0RlZmF1bHQ6IHRydWV9KS5kZXNjcmlwdGlvbignU2hvdyBzdW1tYXJ5IGFib3V0IGRldiBlbnZpcm9ubWVudCcpXG4gICAgICAgIC5vcHRpb24oJy1hLCAtLWF2YWlsYWJsZScsICdzaG93IGF2YWlsYWJsZSB2ZXJzaW9ucycpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChpbmZvQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnc29sIFtmaWxlcy4uLl0nKS5kZXNjcmlwdGlvbignQnVpbGQgc29saWRpdHkgY29udHJhY3Rbc10nKVxuICAgICAgICAub3B0aW9uKFxuICAgICAgICAgICAgJy1sLCAtLWNsaWVudC1sYW5ndWFnZXMgPGxhbmd1YWdlcz4nLFxuICAgICAgICAgICAgJ2dlbmVyYXRlIGNsaWVudCBjb2RlIGZvciBsYW5ndWFnZXM6IFwianNcIiwgXCJyc1wiIChtdWx0aXBsZSBsYW5ndWFnZXMgbXVzdCBiZSBzZXBhcmF0ZWQgd2l0aCBjb21tYSknLFxuICAgICAgICApXG4gICAgICAgIC5vcHRpb24oXG4gICAgICAgICAgICAnLUwsIC0tY2xpZW50LWxldmVsIDxjbGllbnQtbGV2ZWw+JyxcbiAgICAgICAgICAgICdjbGllbnQgY29kZSBsZXZlbDogXCJydW5cIiB0byBydW4gb25seSwgXCJkZXBsb3lcIiB0byBydW4gYW5kIGRlcGxveSAoaW5jbHVkZXMgYW4gaW1hZ2VCYXNlNjQgb2YgYmluYXJ5IGNvbnRyYWN0KScsXG4gICAgICAgICAgICAnZGVwbG95JyxcbiAgICAgICAgKVxuICAgICAgICAub3B0aW9uKFxuICAgICAgICAgICAgJy0tanMtbW9kdWxlIDxtb2R1bGUtdHlwZT4nLFxuICAgICAgICAgICAgXCJKYXZhIFNjcmlwdCBtb2R1bGUgdHlwZTogXCIgK1xuICAgICAgICAgICAgXCJgbm9kZWAgdG8gdXNlIHdpdGggYGNvbnN0IEZvb0NvbnRyYWN0ID0gcmVxdWlyZSgnZm9vYClgLCBcIiArXG4gICAgICAgICAgICBcImBub2RlTm9EZWZhdWx0YCB0byB1c2Ugd2l0aCBgY29uc3Qge0Zvb0NvbnRyYWN0fSA9IHJlcXVpcmUoJ2Zvb2ApYCwgXCIgK1xuICAgICAgICAgICAgXCJgZXNgIHRvIHVzZSB3aXRoIGBpbXBvcnQgRm9vQ29udHJhY3QgZnJvbSAnZm9vJ2AsIFwiICtcbiAgICAgICAgICAgIFwiYGVzTm9EZWZhdWx0YCB0byB1c2Ugd2l0aCBgaW1wb3J0IHtGb29Db250cmFjdH0gZnJvbSAnZm9vJ2AgKGBub2RlYCBpcyBhIGRlZmF1bHQgb3B0aW9uKVwiLFxuICAgICAgICAgICAgJ25vZGUnLFxuICAgICAgICApXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChzb2xDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdnZW4gW2ZpbGVzLi4uXScpLmRlc2NyaXB0aW9uKCdHZW5lcmF0ZSBjbGllbnQgY29kZSBmb3IgY29udHJhY3Rbc10nKVxuICAgICAgICAub3B0aW9uKFxuICAgICAgICAgICAgJy1sLCAtLWNsaWVudC1sYW5ndWFnZXMgPGxhbmd1YWdlcz4nLFxuICAgICAgICAgICAgJ2dlbmVyYXRlIGNsaWVudCBjb2RlIGZvciBsYW5ndWFnZXM6IFwianNcIiwgXCJyc1wiIChtdWx0aXBsZSBsYW5ndWFnZXMgbXVzdCBiZSBzZXBhcmF0ZWQgd2l0aCBjb21tYSknLFxuICAgICAgICApXG4gICAgICAgIC5vcHRpb24oXG4gICAgICAgICAgICAnLUwsIC0tY2xpZW50LWxldmVsIDxjbGllbnQtbGV2ZWw+JyxcbiAgICAgICAgICAgICdjbGllbnQgY29kZSBsZXZlbDogXCJydW5cIiB0byBydW4gb25seSwgXCJkZXBsb3lcIiB0byBydW4gYW5kIGRlcGxveSAoaW5jbHVkZXMgYW4gaW1hZ2VCYXNlNjQgb2YgYmluYXJ5IGNvbnRyYWN0KScsXG4gICAgICAgICAgICAnZGVwbG95JyxcbiAgICAgICAgKVxuICAgICAgICAub3B0aW9uKFxuICAgICAgICAgICAgJy0tanMtbW9kdWxlIDxtb2R1bGUtdHlwZT4nLFxuICAgICAgICAgICAgXCJKYXZhIFNjcmlwdCBtb2R1bGUgdHlwZTogXCIgK1xuICAgICAgICAgICAgXCJgbm9kZWAgdG8gdXNlIHdpdGggYGNvbnN0IEZvb0NvbnRyYWN0ID0gcmVxdWlyZSgnZm9vYClgLCBcIiArXG4gICAgICAgICAgICBcImBub2RlTm9EZWZhdWx0YCB0byB1c2Ugd2l0aCBgY29uc3Qge0Zvb0NvbnRyYWN0fSA9IHJlcXVpcmUoJ2Zvb2ApYCwgXCIgK1xuICAgICAgICAgICAgXCJgZXNgIHRvIHVzZSB3aXRoIGBpbXBvcnQgRm9vQ29udHJhY3QgZnJvbSAnZm9vJ2AsIFwiICtcbiAgICAgICAgICAgIFwiYGVzTm9EZWZhdWx0YCB0byB1c2Ugd2l0aCBgaW1wb3J0IHtGb29Db250cmFjdH0gZnJvbSAnZm9vJ2AgKGBub2RlYCBpcyBhIGRlZmF1bHQgb3B0aW9uKVwiLFxuICAgICAgICAgICAgJ25vZGUnLFxuICAgICAgICApXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChnZW5Db21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdzdGFydCcpLmRlc2NyaXB0aW9uKCdTdGFydCBkZXYgY29udGFpbmVycycpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHN0YXJ0Q29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnc3RvcCcpLmRlc2NyaXB0aW9uKCdTdG9wIGRldiBjb250YWluZXJzJylcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm4pXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5tKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoc3RvcENvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3Jlc3RhcnQnKS5kZXNjcmlwdGlvbignUmVzdGFydCBkZXYgY29udGFpbmVycycpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHJlc3RhcnRDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdyZWNyZWF0ZScpLmRlc2NyaXB0aW9uKCdSZWNyZWF0ZSBkZXYgY29udGFpbmVycycpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHJlY3JlYXRlQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnc2V0dXAnKS5kZXNjcmlwdGlvbignU2V0dXAgZGV2IGVudmlyb25tZW50JylcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm4pXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5tKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoc2V0dXBDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdjbGVhbicpLmRlc2NyaXB0aW9uKCdSZW1vdmUgZG9ja2VyIGNvbnRhaW5lcnMgYW5kIGltYWdlcyByZWxhdGVkIHRvIFRPTiBEZXYnKVxuICAgICAgICAub3B0aW9uKCctbiwgLS1uZXR3b3JrcycsICdjbGVhbiBsb2NhbCBub2RlIGRvY2tlciBjb250YWluZXJzIGFuZCBpbWFnZXMnKVxuICAgICAgICAub3B0aW9uKCctbSwgLS1jb21waWxlcnMnLCAnY2xlYW4gY29tcGlsZXJzIGRvY2tlciBjb250YWluZXJzIGFuZCBpbWFnZXMnKVxuICAgICAgICAub3B0aW9uKCctYywgLS1jb250YWluZXJzJywgJ2NsZWFuIGNvbnRhaW5lcnMgb25seScsIGZhbHNlKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoY2xlYW5Db21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCd1c2UgPHZlcnNpb24+JykuZGVzY3JpcHRpb24oJ1VzZSBzcGVjaWZpZWQgdmVyc2lvbiBmb3IgY29udGFpbmVycycpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHVzZUNvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3NldCBbbmV0d29yay4uLl0nKS5kZXNjcmlwdGlvbignU2V0IG5ldHdvcmtbc10gb3B0aW9ucycpXG4gICAgICAgIC5vcHRpb24oJy1wLCAtLXBvcnQgPHBvcnQ+JywgJ2hvc3QgcG9ydCB0byBib3VuZCBsb2NhbCBub2RlJylcbiAgICAgICAgLm9wdGlvbihcbiAgICAgICAgICAgICctZCwgLS1kYi1wb3J0IDxiaW5kaW5nPicsXG4gICAgICAgICAgICAnaG9zdCBwb3J0IHRvIGJvdW5kIGxvY2FsIG5vZGVzIEFyYW5nbyBEQiAoXCJiaW5kXCIgdG8gdXNlIGRlZmF1bHQgQXJhbmdvIERCIHBvcnQsIFwidW5iaW5kXCIgdG8gdW5iaW5kIEFyYW5nbyBEQiBwb3J0KScsXG4gICAgICAgIClcbiAgICAgICAgLm9wdGlvbignLW4sIC0tbmV3LW5hbWUgPG5hbWU+JywgJ3NldCBuZXcgbmFtZSBmb3IgbmV0d29yaycpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChzZXRDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdhZGQgW25ldHdvcmsuLi5dJykuZGVzY3JpcHRpb24oJ0FkZCBuZXR3b3JrW3NdJylcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKGFkZENvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3JlbW92ZSBbbmV0d29yay4uLl0nKS5hbGlhcygncm0nKS5kZXNjcmlwdGlvbignUmVtb3ZlIG5ldHdvcmtbc10nKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQocmVtb3ZlQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgndGVzdCBbc2VydmVycy4uLl0nKS5hbGlhcygndCcpLmRlc2NyaXB0aW9uKCdUZXN0IG5ldHdvcmtbc10nKVxuICAgICAgICAub3B0aW9uKCctdiwgLS12ZXJib3NlJywgJ3Nob3cgdmVyYm9zZSB0ZXN0IGxvZycsIGZhbHNlKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQodGVzdENvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ2tleXMnKS5hbGlhcygnaycpLmRlc2NyaXB0aW9uKCdHZW5lcmF0ZSByYW5kb20gS2V5IFBhaXInKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoZ2VuZXJhdGVLZXlzQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnYWRkciA8YWRkcj4nKS5hbGlhcygnYScpLmRlc2NyaXB0aW9uKCdDb252ZXJ0IGFkZHJlc3MnKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoY29udmVydEFkZHJlc3MpKTtcblxuICAgIGlmIChVU0VfRVhQRVJJTUVOVEFMX0ZFQVRVUkVTKSB7XG4gICAgICAgIHByb2dyYW1cbiAgICAgICAgICAgIC5jb21tYW5kKCdzcHkgW25ldHdvcmtzLi4uXScpLmRlc2NyaXB0aW9uKCdSdW4gbmV0d29yayBzY2FubmVyJylcbiAgICAgICAgICAgIC5hY3Rpb24oY29tbWFuZChzcHlDb21tYW5kKSk7XG5cbiAgICAgICAgcHJvZ3JhbVxuICAgICAgICAgICAgLmNvbW1hbmQoJ3dlYicpLmRlc2NyaXB0aW9uKCdSdW4gd2ViIGNvbnNvbGUnKVxuICAgICAgICAgICAgLm9wdGlvbignLXAsIC0tcG9ydCA8cG9ydD4nLCAnaG9zdCBwb3J0IHRvIGJvdW5kIHdlYiBjb25zb2xlIChkZWZhdWx0OiA4ODAwKScsICc4ODAwJylcbiAgICAgICAgICAgIC5hY3Rpb24oY29tbWFuZCh3ZWJDb25zb2xlQ29tbWFuZCkpO1xuICAgIH1cblxuICAgIC8vIC5jb21tYW5kKCd1cGRhdGUnLCBgdXBkYXRlICR7ZGV2Lm5hbWV9IGRvY2tlciBpbWFnZXNgKS5hY3Rpb24oYWN0aW9uKVxuXG4gICAgcHJvZ3JhbS5wYXJzZShhcmdzKTtcblxuICAgIGlmIChjb21tYW5kQXJncy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgaWYgKHByb2dyYW0uYXJncy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGF3YWl0IGluZm9Db21tYW5kKGRldiwgcHJvZ3JhbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9ncmFtLm91dHB1dEhlbHAoKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChjb21tYW5kQWN0aW9uID09PSBpbmZvQ29tbWFuZCkge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGNvbW1hbmRBcmdzW2NvbW1hbmRBcmdzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgb3B0aW9ucy5hdmFpbGFibGUgPSBvcHRpb25zLnBhcmVudC5hdmFpbGFibGU7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgY29tbWFuZEFjdGlvbihkZXYsIC4uLmNvbW1hbmRBcmdzKTtcbiAgICB9XG59XG5cbmV4cG9ydCB7aGFuZGxlQ29tbWFuZExpbmV9O1xuIl19