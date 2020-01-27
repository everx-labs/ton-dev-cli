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

var _trace = require("./trace");

/*
 * Copyright 2018-2020 TON DEV SOLUTIONS LTD.
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

              return function showBase64(_x43, _x44, _x45) {
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

function traceCommand(_x26, _x27) {
  return _traceCommand.apply(this, arguments);
}

function _traceCommand() {
  _traceCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee15(_dev, server) {
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return _trace.NetworkTracer.traceNetwork(server);

          case 2:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }));
  return _traceCommand.apply(this, arguments);
}

function useCommand(_x28, _x29, _x30) {
  return _useCommand.apply(this, arguments);
}

function _useCommand() {
  _useCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee16(dev, version, options) {
    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return dev.useVersion(version, (0, _options.compilersWithNetworks)(dev, options));

          case 2:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16);
  }));
  return _useCommand.apply(this, arguments);
}

function solCommand(_x31, _x32, _x33) {
  return _solCommand.apply(this, arguments);
}

function _solCommand() {
  _solCommand = (0, _asyncToGenerator2["default"])(
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
            return _solidity.Solidity.build(dev, files, {
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
  return _solCommand.apply(this, arguments);
}

function genCommand(_x34, _x35, _x36) {
  return _genCommand.apply(this, arguments);
}

function _genCommand() {
  _genCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee18(dev, files, options) {
    return _regenerator["default"].wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            if (!(files.length < 1)) {
              _context18.next = 2;
              break;
            }

            throw new Error('You must specify at least one file name');

          case 2:
            _context18.next = 4;
            return _clientCode.ClientCode.generate(files, {
              clientLanguages: (options.clientLanguages || '').split(','),
              clientLevel: options.clientLevel || _clientCode.ClientCodeLevel.run,
              jsModule: options.jsModule || _clientCode.JSModule.node
            });

          case 4:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18);
  }));
  return _genCommand.apply(this, arguments);
}

function spyCommand(_x37, _x38) {
  return _spyCommand.apply(this, arguments);
}

function _spyCommand() {
  _spyCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee19(dev, networks) {
    return _regenerator["default"].wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _context19.next = 2;
            return (0, _spy.spy)(dev, networks);

          case 2:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19);
  }));
  return _spyCommand.apply(this, arguments);
}

function webConsoleCommand(_x39, _x40) {
  return _webConsoleCommand.apply(this, arguments);
}

function _webConsoleCommand() {
  _webConsoleCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee20(dev, options) {
    return _regenerator["default"].wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _context20.next = 2;
            return (0, _server.web)(dev, options);

          case 2:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20);
  }));
  return _webConsoleCommand.apply(this, arguments);
}

var networksOption = ['-n, --networks [names]', 'Apply command to specified network[s] (names must be separated with comma).'];
var compilersOption = ['-m, --compilers', 'Apply command to the compilers container.'];

function getSupportedLanguages() {
  return Object.values(_clientCode.ClientCode.languages).map(function (x) {
    return x.shortName;
  });
}

var clientLanguagesOption = ['-l, --client-languages <languages>', "Generate client code for specified languages separated by comma, " + "supported languages: \"".concat(getSupportedLanguages().join('", "'), "\".")];
var clientLevelOption = ['-L, --client-level <client-level>', 'Client code level: ' + '"run" to run only, ' + '"deploy" to run and deploy (includes an imageBase64 of binary contract)', 'deploy'];
var jsModuleTypeOption = ['--js-module <module-type>', "Java Script module type: " + "`node` to use with `const FooContract = require('foo')`, " + "`nodeNoDefault` to use with `const {FooContract} = require('foo')`, " + "`es` to use with `import FooContract from 'foo'`, " + "`esNoDefault` to use with `import {FooContract} from 'foo'`.", 'node'];

function handleCommandLine(_x41, _x42) {
  return _handleCommandLine.apply(this, arguments);
}

function _handleCommandLine() {
  _handleCommandLine = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee21(dev, args) {
    var _program$command$desc, _program$command$desc2, _program$command$desc3, _program$command$desc4, _program$command$desc5, _program$command$desc6, _program$command$desc7, _program$command$desc8, _program$command$desc9, _program$command$desc10, _program$command$desc11, _program$command$desc12, _program$command$desc13, _program$command$desc14, _program$command$desc15, _program$command$desc16, _program$command$desc17;

    var commandAction, commandArgs, command, options;
    return _regenerator["default"].wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
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

            program.name(dev.name).version(dev.version).option('-a, --available', 'Show available versions.').description('TON Labs development tools');
            program.command('info', {
              isDefault: true
            }).description('Show summary about dev environment.').option('-a, --available', 'Show available versions.').action(command(_info.infoCommand));

            (_program$command$desc = (_program$command$desc2 = (_program$command$desc3 = program.command('sol [files...]').description('Build solidity contract[s].')).option.apply(_program$command$desc3, clientLanguagesOption)).option.apply(_program$command$desc2, clientLevelOption)).option.apply(_program$command$desc, jsModuleTypeOption).action(command(solCommand));

            (_program$command$desc4 = (_program$command$desc5 = program.command('gen [files...]').description('Generate client code for contract[s].').option(clientLanguagesOption[0], clientLanguagesOption[1], 'js')).option.apply(_program$command$desc5, clientLevelOption)).option.apply(_program$command$desc4, jsModuleTypeOption).action(command(genCommand));

            (_program$command$desc6 = (_program$command$desc7 = program.command('start').description('Start dev containers.')).option.apply(_program$command$desc7, networksOption)).option.apply(_program$command$desc6, compilersOption).action(command(startCommand));

            (_program$command$desc8 = (_program$command$desc9 = program.command('stop').description('Stop dev containers.')).option.apply(_program$command$desc9, networksOption)).option.apply(_program$command$desc8, compilersOption).action(command(stopCommand));

            (_program$command$desc10 = (_program$command$desc11 = program.command('restart').description('Restart dev containers.')).option.apply(_program$command$desc11, networksOption)).option.apply(_program$command$desc10, compilersOption).action(command(restartCommand));

            (_program$command$desc12 = (_program$command$desc13 = program.command('recreate').description('Recreate dev containers.')).option.apply(_program$command$desc13, networksOption)).option.apply(_program$command$desc12, compilersOption).action(command(recreateCommand));

            (_program$command$desc14 = (_program$command$desc15 = program.command('setup').description('Setup dev environment.')).option.apply(_program$command$desc15, networksOption)).option.apply(_program$command$desc14, compilersOption).action(command(setupCommand));

            program.command('clean').description('Remove docker containers and images related to TON Dev.').option('-n, --networks', 'Clean local node docker containers and images.').option('-m, --compilers', 'Clean compilers docker containers and images.').option('-c, --containers', 'Clean containers only.', false).action(command(cleanCommand));

            (_program$command$desc16 = (_program$command$desc17 = program.command('use <version>').description('Use specified version for containers.')).option.apply(_program$command$desc17, networksOption)).option.apply(_program$command$desc16, compilersOption).action(command(useCommand));

            program.command('set [network...]').description('Set network[s] options.').option('-p, --port <port>', 'Host port to bound local node.').option('-d, --db-port <binding>', 'Host port to bound local nodes Arango DB ("bind" to use default Arango DB port, "unbind" to unbind Arango DB port).').option('-n, --new-name <name>', 'Set new name for network.').action(command(setCommand));
            program.command('add [network...]').description('Add network[s].').action(command(addCommand));
            program.command('remove [network...]').alias('rm').description('Remove network[s].').action(command(removeCommand));
            program.command('test [servers...]').alias('t').description('Test network[s].').option('-v, --verbose', 'Show verbose test log.', false).action(command(testCommand));
            program.command('keys').alias('k').description('Generate random Key Pair.').action(command(generateKeysCommand));
            program.command('addr <addr>').alias('a').description('Convert address.').action(command(convertAddress));

            if (USE_EXPERIMENTAL_FEATURES) {
              program.command('spy [networks...]').description('Run network scanner.').action(command(spyCommand));
              program.command('web').description('Run web console.').option('-p, --port <port>', 'Host port to bound web console.', '8800').action(command(webConsoleCommand));
              program.command('trace <server>').description('Trace message.').action(command(traceCommand));
            }

            program.parse(args);

            if (!(commandArgs.length === 0)) {
              _context21.next = 31;
              break;
            }

            if (!(program.args.length === 0)) {
              _context21.next = 28;
              break;
            }

            _context21.next = 26;
            return (0, _info.infoCommand)(dev, program);

          case 26:
            _context21.next = 29;
            break;

          case 28:
            program.outputHelp();

          case 29:
            _context21.next = 34;
            break;

          case 31:
            if (commandAction === _info.infoCommand) {
              options = commandArgs[commandArgs.length - 1];
              options.available = options.parent.available;
            }

            _context21.next = 34;
            return commandAction.apply(void 0, [dev].concat((0, _toConsumableArray2["default"])(commandArgs)));

          case 34:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee21);
  }));
  return _handleCommandLine.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvY2xpLmpzIl0sIm5hbWVzIjpbIlVTRV9FWFBFUklNRU5UQUxfRkVBVFVSRVMiLCJwcm9ncmFtIiwicmVxdWlyZSIsInNldHVwQ29tbWFuZCIsImRldiIsIm9wdGlvbnMiLCJzdGFydCIsInN0YXJ0Q29tbWFuZCIsInN0b3BDb21tYW5kIiwic3RvcCIsInJlc3RhcnRDb21tYW5kIiwicmVzdGFydCIsInJlY3JlYXRlQ29tbWFuZCIsInJlY3JlYXRlIiwiY2xlYW5Db21tYW5kIiwiYWxsIiwiY29tcGlsZXJzIiwibmV0d29ya3MiLCJjbGVhbiIsImNvbnRhaW5lcnMiLCJzZXRDb21tYW5kIiwibmFtZXMiLCJ1cGRhdGVOZXR3b3JrQ29uZmlncyIsIm5ldHdvcmtzT3JBbGwiLCJjb25maWciLCJuZXdOYW1lIiwibmFtZSIsInBvcnQiLCJob3N0UG9ydCIsImRiUG9ydCIsImFyYW5nb0hvc3RQb3J0IiwiTmV0d29yayIsImRlZmF1bHRBcmFuZ29Qb3J0IiwiYWRkQ29tbWFuZCIsImFkZE5ldHdvcmtzIiwicmVtb3ZlQ29tbWFuZCIsInJlbW92ZU5ldHdvcmtzIiwibmV0d29ya3NGcm9tTmFtZXMiLCJnZW5lcmF0ZUtleXNDb21tYW5kIiwiX2RldiIsIlRPTkNsaWVudCIsImNyZWF0ZSIsInNlcnZlcnMiLCJjbGllbnQiLCJjcnlwdG8iLCJlZDI1NTE5S2V5cGFpciIsImtleXMiLCJjb25zb2xlIiwibG9nIiwiSlNPTiIsInN0cmluZ2lmeSIsInVuZGVmaW5lZCIsInRlc3RDb21tYW5kIiwiQ2hlY2tOZXR3b3JrIiwiY2hlY2tOZXR3b3JrcyIsInZlcmJvc2UiLCJjb252ZXJ0QWRkcmVzcyIsImFkZHIiLCJzaG93Q29udmVydGVkIiwidGl0bGUiLCJjb252ZXJ0ZWQiLCJhZGRyZXNzIiwic2hvd0hleCIsImNvbnRyYWN0cyIsImNvbnZlcnRUbyIsInNob3dCYXNlNjQiLCJ0ZXN0IiwiYm91bmNlIiwidXJsIiwiYmFzZTY0UGFyYW1zIiwiZmxhZ3MiLCJmaWx0ZXIiLCJ4Iiwiam9pbiIsInRyYWNlQ29tbWFuZCIsInNlcnZlciIsIk5ldHdvcmtUcmFjZXIiLCJ0cmFjZU5ldHdvcmsiLCJ1c2VDb21tYW5kIiwidmVyc2lvbiIsInVzZVZlcnNpb24iLCJzb2xDb21tYW5kIiwiZmlsZXMiLCJsZW5ndGgiLCJFcnJvciIsIlNvbGlkaXR5IiwiYnVpbGQiLCJjbGllbnRMYW5ndWFnZXMiLCJzcGxpdCIsImNsaWVudExldmVsIiwiQ2xpZW50Q29kZUxldmVsIiwicnVuIiwianNNb2R1bGUiLCJKU01vZHVsZSIsIm5vZGUiLCJnZW5Db21tYW5kIiwiQ2xpZW50Q29kZSIsImdlbmVyYXRlIiwic3B5Q29tbWFuZCIsIndlYkNvbnNvbGVDb21tYW5kIiwibmV0d29ya3NPcHRpb24iLCJjb21waWxlcnNPcHRpb24iLCJnZXRTdXBwb3J0ZWRMYW5ndWFnZXMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJsYW5ndWFnZXMiLCJtYXAiLCJzaG9ydE5hbWUiLCJjbGllbnRMYW5ndWFnZXNPcHRpb24iLCJjbGllbnRMZXZlbE9wdGlvbiIsImpzTW9kdWxlVHlwZU9wdGlvbiIsImhhbmRsZUNvbW1hbmRMaW5lIiwiYXJncyIsImNvbW1hbmRBY3Rpb24iLCJpbmZvQ29tbWFuZCIsImNvbW1hbmRBcmdzIiwiY29tbWFuZCIsImFjdGlvbiIsIm9wdGlvbiIsImRlc2NyaXB0aW9uIiwiaXNEZWZhdWx0IiwiYWxpYXMiLCJwYXJzZSIsIm91dHB1dEhlbHAiLCJhdmFpbGFibGUiLCJwYXJlbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQWdCQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFXQTs7QUFDQTs7QUFDQTs7QUFyQ0E7Ozs7Ozs7Ozs7Ozs7O0FBdUNBLElBQU1BLHlCQUF5QixHQUFHLEtBQWxDOztBQUVBLElBQU1DLE9BQU8sR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O1NBR2VDLFk7Ozs7Ozs7K0JBQWYsaUJBQTRC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SS9CO0FBQUE7QUFBQTtBQUFBOztBQUFBLGtCQWlJWWxGLE9BQU8sQ0FBQytHLElBQVIsQ0FBYTdCLE1BQWIsS0FBd0IsQ0FqSXBDO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsbUJBa0lrQix1QkFBWS9FLEdBQVosRUFBaUJILE9BQWpCLENBbElsQjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFvSVlBLFlBQUFBLE9BQU8sQ0FBQzBILFVBQVI7O0FBcElaO0FBQUE7QUFBQTs7QUFBQTtBQXVJUSxnQkFBSVYsYUFBYSxLQUFLQyxpQkFBdEIsRUFBbUM7QUFDekI3RyxjQUFBQSxPQUR5QixHQUNmOEcsV0FBVyxDQUFDQSxXQUFXLENBQUNoQyxNQUFaLEdBQXFCLENBQXRCLENBREk7QUFFL0I5RSxjQUFBQSxPQUFPLENBQUN1SCxTQUFSLEdBQW9CdkgsT0FBTyxDQUFDd0gsTUFBUixDQUFlRCxTQUFuQztBQUNIOztBQTFJVDtBQUFBLG1CQTJJY1gsYUFBYSxNQUFiLFVBQWM3RyxHQUFkLDZDQUFzQitHLFdBQXRCLEdBM0lkOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTgtMjAyMCBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG4gKiB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbiAqIExpY2Vuc2UgYXQ6IGh0dHBzOi8vd3d3LnRvbi5kZXYvbGljZW5zZXNcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIFRPTiBERVYgc29mdHdhcmUgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG4vLyBAZmxvd1xuXG5pbXBvcnQgeyBUT05DbGllbnQgfSBmcm9tIFwidG9uLWNsaWVudC1ub2RlLWpzXCI7XG5pbXBvcnQgeyBDbGllbnRDb2RlLCBDbGllbnRDb2RlTGV2ZWwsIEpTTW9kdWxlIH0gZnJvbSBcIi4uL2NvbXBpbGVycy9jbGllbnQtY29kZVwiO1xuaW1wb3J0IHsgU29saWRpdHkgfSBmcm9tIFwiLi4vY29tcGlsZXJzL3NvbGlkaXR5XCI7XG5pbXBvcnQgeyBEZXYgfSBmcm9tIFwiLi4vZGV2XCI7XG5pbXBvcnQgeyBOZXR3b3JrIH0gZnJvbSBcIi4uL25ldHdvcmtzL25ldHdvcmtzXCI7XG5pbXBvcnQgdHlwZSB7IE5ldHdvcmtDb25maWcgfSBmcm9tIFwiLi4vbmV0d29ya3MvbmV0d29ya3NcIjtcbmltcG9ydCB7IHdlYiB9IGZyb20gXCIuLi9zZXJ2ZXIvc2VydmVyXCI7XG5pbXBvcnQgeyBDaGVja05ldHdvcmsgfSBmcm9tIFwiLi9jaGVja1wiO1xuaW1wb3J0IHsgY29tcGlsZXJzV2l0aE5ldHdvcmtzIH0gZnJvbSBcIi4vb3B0aW9uc1wiO1xuaW1wb3J0IHR5cGUge1xuICAgIENsZWFuT3B0aW9ucyxcbiAgICBSZWNyZWF0ZU9wdGlvbnMsXG4gICAgUmVzdGFydE9wdGlvbnMsIFNldE5ldHdvcmtPcHRpb25zLFxuICAgIFNldHVwT3B0aW9ucywgU29sT3B0aW9ucyxcbiAgICBTdGFydE9wdGlvbnMsXG4gICAgU3RvcE9wdGlvbnMsXG4gICAgVXNlT3B0aW9ucywgV2ViT3B0aW9ucyxcbn0gZnJvbSBcIi4vb3B0aW9uc1wiO1xuXG5pbXBvcnQgeyBpbmZvQ29tbWFuZCB9IGZyb20gXCIuL2luZm8uanNcIjtcbmltcG9ydCB7IHNweSB9IGZyb20gXCIuL3NweVwiO1xuaW1wb3J0IHsgTmV0d29ya1RyYWNlciB9IGZyb20gXCIuL3RyYWNlXCI7XG5cbmNvbnN0IFVTRV9FWFBFUklNRU5UQUxfRkVBVFVSRVMgPSBmYWxzZTtcblxuY29uc3QgcHJvZ3JhbSA9IHJlcXVpcmUoJ2NvbW1hbmRlcicpO1xuXG5cbmFzeW5jIGZ1bmN0aW9uIHNldHVwQ29tbWFuZChkZXY6IERldiwgb3B0aW9uczogU2V0dXBPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnN0YXJ0KGNvbXBpbGVyc1dpdGhOZXR3b3JrcyhkZXYsIG9wdGlvbnMpKTtcbn1cblxuXG5hc3luYyBmdW5jdGlvbiBzdGFydENvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IFN0YXJ0T3B0aW9ucykge1xuICAgIGF3YWl0IGRldi5zdGFydChjb21waWxlcnNXaXRoTmV0d29ya3MoZGV2LCBvcHRpb25zKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHN0b3BDb21tYW5kKGRldjogRGV2LCBvcHRpb25zOiBTdG9wT3B0aW9ucykge1xuICAgIGF3YWl0IGRldi5zdG9wKGNvbXBpbGVyc1dpdGhOZXR3b3JrcyhkZXYsIG9wdGlvbnMpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVzdGFydENvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IFJlc3RhcnRPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnJlc3RhcnQoY29tcGlsZXJzV2l0aE5ldHdvcmtzKGRldiwgb3B0aW9ucykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZWNyZWF0ZUNvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IFJlY3JlYXRlT3B0aW9ucykge1xuICAgIGF3YWl0IGRldi5yZWNyZWF0ZShjb21waWxlcnNXaXRoTmV0d29ya3MoZGV2LCBvcHRpb25zKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNsZWFuQ29tbWFuZChkZXY6IERldiwgb3B0aW9uczogQ2xlYW5PcHRpb25zKSB7XG4gICAgY29uc3QgYWxsID0gIW9wdGlvbnMuY29tcGlsZXJzICYmICFvcHRpb25zLm5ldHdvcmtzO1xuICAgIGF3YWl0IGRldi5jbGVhbihvcHRpb25zLmNvbXBpbGVycyB8fCBhbGwsIG9wdGlvbnMubmV0d29ya3MgfHwgYWxsLCBvcHRpb25zLmNvbnRhaW5lcnMpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzZXRDb21tYW5kKGRldjogRGV2LCBuYW1lczogc3RyaW5nW10sIG9wdGlvbnM6IFNldE5ldHdvcmtPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnVwZGF0ZU5ldHdvcmtDb25maWdzKGRldi5uZXR3b3Jrc09yQWxsKG5hbWVzKSwgKGNvbmZpZzogTmV0d29ya0NvbmZpZykgPT4ge1xuICAgICAgICBpZiAob3B0aW9ucy5uZXdOYW1lKSB7XG4gICAgICAgICAgICBjb25maWcubmFtZSA9IG9wdGlvbnMubmV3TmFtZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5wb3J0KSB7XG4gICAgICAgICAgICBjb25maWcuaG9zdFBvcnQgPSBvcHRpb25zLnBvcnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuZGJQb3J0KSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5kYlBvcnQgPT09ICdiaW5kJykge1xuICAgICAgICAgICAgICAgIGNvbmZpZy5hcmFuZ29Ib3N0UG9ydCA9IE5ldHdvcmsuZGVmYXVsdEFyYW5nb1BvcnQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZGJQb3J0ID09PSAndW5iaW5kJykge1xuICAgICAgICAgICAgICAgIGNvbmZpZy5hcmFuZ29Ib3N0UG9ydCA9ICcnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25maWcuYXJhbmdvSG9zdFBvcnQgPSBvcHRpb25zLmRiUG9ydCB8fCAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBhZGRDb21tYW5kKGRldjogRGV2LCBuYW1lczogc3RyaW5nW10pIHtcbiAgICBhd2FpdCBkZXYuYWRkTmV0d29ya3MobmFtZXMpO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZW1vdmVDb21tYW5kKGRldjogRGV2LCBuYW1lczogc3RyaW5nW10pIHtcbiAgICBhd2FpdCBkZXYucmVtb3ZlTmV0d29ya3MoZGV2Lm5ldHdvcmtzRnJvbU5hbWVzKG5hbWVzKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdlbmVyYXRlS2V5c0NvbW1hbmQoX2RldjogRGV2KSB7XG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgVE9OQ2xpZW50LmNyZWF0ZSh7XG4gICAgICAgIHNlcnZlcnM6IFsnaHR0cDovL2xvY2FsaG9zdCddLFxuICAgIH0pO1xuICAgIGNvbnN0IGtleXMgPSBhd2FpdCBjbGllbnQuY3J5cHRvLmVkMjU1MTlLZXlwYWlyKCk7XG4gICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoa2V5cywgdW5kZWZpbmVkLCA0KSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHRlc3RDb21tYW5kKF9kZXY6IERldiwgc2VydmVyczogc3RyaW5nW10sIG9wdGlvbnM6IHsgdmVyYm9zZTogYm9vbGVhbiB9KSB7XG4gICAgYXdhaXQgQ2hlY2tOZXR3b3JrLmNoZWNrTmV0d29ya3Moc2VydmVycywgb3B0aW9ucy52ZXJib3NlKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY29udmVydEFkZHJlc3MoX2RldjogRGV2LCBhZGRyKSB7XG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgVE9OQ2xpZW50LmNyZWF0ZSh7XG4gICAgICAgIHNlcnZlcnM6IFsnaHR0cDovL2xvY2FsaG9zdCddLFxuICAgIH0pO1xuICAgIGNvbnN0IHNob3dDb252ZXJ0ZWQgPSAodGl0bGUsIGNvbnZlcnRlZCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhgJHtjb252ZXJ0ZWQuYWRkcmVzcyA9PT0gYWRkciA/ICfinJMnIDogJyAnfSAke3RpdGxlfSA9ICR7Y29udmVydGVkLmFkZHJlc3N9YCk7XG4gICAgfTtcbiAgICBjb25zdCBzaG93SGV4ID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBjb252ZXJ0ZWQgPSBhd2FpdCBjbGllbnQuY29udHJhY3RzLmNvbnZlcnRBZGRyZXNzKHtcbiAgICAgICAgICAgIGFkZHJlc3M6IGFkZHIsXG4gICAgICAgICAgICBjb252ZXJ0VG86ICdIZXgnLFxuICAgICAgICB9KTtcbiAgICAgICAgc2hvd0NvbnZlcnRlZCgnaGV4JywgY29udmVydGVkKTtcbiAgICB9O1xuICAgIGNvbnN0IHNob3dCYXNlNjQgPSBhc3luYyAodGVzdCwgYm91bmNlLCB1cmwpID0+IHtcbiAgICAgICAgY29uc3QgY29udmVydGVkID0gYXdhaXQgY2xpZW50LmNvbnRyYWN0cy5jb252ZXJ0QWRkcmVzcyh7XG4gICAgICAgICAgICBhZGRyZXNzOiBhZGRyLFxuICAgICAgICAgICAgY29udmVydFRvOiAnQmFzZTY0JyxcbiAgICAgICAgICAgIGJhc2U2NFBhcmFtczoge1xuICAgICAgICAgICAgICAgIGJvdW5jZSxcbiAgICAgICAgICAgICAgICB0ZXN0LFxuICAgICAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBmbGFncyA9IFtcbiAgICAgICAgICAgIHRlc3QgPyAndGVzdCcgOiAnbWFpbicsXG4gICAgICAgICAgICBib3VuY2UgPyAnYm91bmNlJyA6ICcnLFxuICAgICAgICAgICAgdXJsID8gJ3VybCcgOiAnJyxcbiAgICAgICAgXVxuICAgICAgICAgICAgLmZpbHRlcih4ID0+IHggIT09ICcnKVxuICAgICAgICAgICAgLmpvaW4oJyAnKTtcbiAgICAgICAgc2hvd0NvbnZlcnRlZChmbGFncywgY29udmVydGVkKTtcbiAgICB9O1xuICAgIGF3YWl0IHNob3dIZXgoKTtcbiAgICBhd2FpdCBzaG93QmFzZTY0KGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xuICAgIGF3YWl0IHNob3dCYXNlNjQoZmFsc2UsIGZhbHNlLCB0cnVlKTtcbiAgICBhd2FpdCBzaG93QmFzZTY0KGZhbHNlLCB0cnVlLCBmYWxzZSk7XG4gICAgYXdhaXQgc2hvd0Jhc2U2NChmYWxzZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgYXdhaXQgc2hvd0Jhc2U2NCh0cnVlLCBmYWxzZSwgZmFsc2UpO1xuICAgIGF3YWl0IHNob3dCYXNlNjQodHJ1ZSwgZmFsc2UsIHRydWUpO1xuICAgIGF3YWl0IHNob3dCYXNlNjQodHJ1ZSwgdHJ1ZSwgZmFsc2UpO1xuICAgIGF3YWl0IHNob3dCYXNlNjQodHJ1ZSwgdHJ1ZSwgdHJ1ZSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHRyYWNlQ29tbWFuZChfZGV2OiBEZXYsIHNlcnZlcjogc3RyaW5nKSB7XG4gICAgYXdhaXQgTmV0d29ya1RyYWNlci50cmFjZU5ldHdvcmsoc2VydmVyKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gdXNlQ29tbWFuZChkZXY6IERldiwgdmVyc2lvbjogc3RyaW5nLCBvcHRpb25zOiBVc2VPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnVzZVZlcnNpb24odmVyc2lvbiwgY29tcGlsZXJzV2l0aE5ldHdvcmtzKGRldiwgb3B0aW9ucykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzb2xDb21tYW5kKGRldjogRGV2LCBmaWxlczogc3RyaW5nW10sIG9wdGlvbnM6IFNvbE9wdGlvbnMpIHtcbiAgICBpZiAoZmlsZXMubGVuZ3RoIDwgMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtdXN0IHNwZWNpZnkgYXQgbGVhc3Qgb25lIGZpbGUgbmFtZScpO1xuICAgIH1cbiAgICBhd2FpdCBTb2xpZGl0eS5idWlsZChkZXYsIGZpbGVzLCB7XG4gICAgICAgIGNsaWVudExhbmd1YWdlczogKG9wdGlvbnMuY2xpZW50TGFuZ3VhZ2VzIHx8ICcnKS5zcGxpdCgnLCcpLFxuICAgICAgICBjbGllbnRMZXZlbDogb3B0aW9ucy5jbGllbnRMZXZlbCB8fCBDbGllbnRDb2RlTGV2ZWwucnVuLFxuICAgICAgICBqc01vZHVsZTogb3B0aW9ucy5qc01vZHVsZSB8fCBKU01vZHVsZS5ub2RlLFxuICAgIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZW5Db21tYW5kKGRldjogRGV2LCBmaWxlczogc3RyaW5nW10sIG9wdGlvbnM6IFNvbE9wdGlvbnMpIHtcbiAgICBpZiAoZmlsZXMubGVuZ3RoIDwgMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtdXN0IHNwZWNpZnkgYXQgbGVhc3Qgb25lIGZpbGUgbmFtZScpO1xuICAgIH1cbiAgICBhd2FpdCBDbGllbnRDb2RlLmdlbmVyYXRlKGZpbGVzLCB7XG4gICAgICAgIGNsaWVudExhbmd1YWdlczogKG9wdGlvbnMuY2xpZW50TGFuZ3VhZ2VzIHx8ICcnKS5zcGxpdCgnLCcpLFxuICAgICAgICBjbGllbnRMZXZlbDogb3B0aW9ucy5jbGllbnRMZXZlbCB8fCBDbGllbnRDb2RlTGV2ZWwucnVuLFxuICAgICAgICBqc01vZHVsZTogb3B0aW9ucy5qc01vZHVsZSB8fCBKU01vZHVsZS5ub2RlLFxuICAgIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzcHlDb21tYW5kKGRldjogRGV2LCBuZXR3b3Jrczogc3RyaW5nW10pIHtcbiAgICBhd2FpdCBzcHkoZGV2LCBuZXR3b3Jrcyk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHdlYkNvbnNvbGVDb21tYW5kKGRldjogRGV2LCBvcHRpb25zOiBXZWJPcHRpb25zKSB7XG4gICAgYXdhaXQgd2ViKGRldiwgb3B0aW9ucyk7XG59XG5cbmNvbnN0IG5ldHdvcmtzT3B0aW9uID0gW1xuICAgICctbiwgLS1uZXR3b3JrcyBbbmFtZXNdJyxcbiAgICAnQXBwbHkgY29tbWFuZCB0byBzcGVjaWZpZWQgbmV0d29ya1tzXSAobmFtZXMgbXVzdCBiZSBzZXBhcmF0ZWQgd2l0aCBjb21tYSkuJ1xuXTtcblxuY29uc3QgY29tcGlsZXJzT3B0aW9uID0gW1xuICAgICctbSwgLS1jb21waWxlcnMnLFxuICAgICdBcHBseSBjb21tYW5kIHRvIHRoZSBjb21waWxlcnMgY29udGFpbmVyLidcbl07XG5cbmZ1bmN0aW9uIGdldFN1cHBvcnRlZExhbmd1YWdlcygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIE9iamVjdC52YWx1ZXMoQ2xpZW50Q29kZS5sYW5ndWFnZXMpLm1hcCgoeDogYW55KSA9PiB4LnNob3J0TmFtZSk7XG59XG5cbmNvbnN0IGNsaWVudExhbmd1YWdlc09wdGlvbiA9IFtcbiAgICAnLWwsIC0tY2xpZW50LWxhbmd1YWdlcyA8bGFuZ3VhZ2VzPicsXG4gICAgYEdlbmVyYXRlIGNsaWVudCBjb2RlIGZvciBzcGVjaWZpZWQgbGFuZ3VhZ2VzIHNlcGFyYXRlZCBieSBjb21tYSwgYCArXG4gICAgYHN1cHBvcnRlZCBsYW5ndWFnZXM6IFwiJHtnZXRTdXBwb3J0ZWRMYW5ndWFnZXMoKS5qb2luKCdcIiwgXCInKX1cIi5gLFxuXTtcblxuY29uc3QgY2xpZW50TGV2ZWxPcHRpb24gPSBbXG4gICAgJy1MLCAtLWNsaWVudC1sZXZlbCA8Y2xpZW50LWxldmVsPicsXG4gICAgJ0NsaWVudCBjb2RlIGxldmVsOiAnICtcbiAgICAnXCJydW5cIiB0byBydW4gb25seSwgJyArXG4gICAgJ1wiZGVwbG95XCIgdG8gcnVuIGFuZCBkZXBsb3kgKGluY2x1ZGVzIGFuIGltYWdlQmFzZTY0IG9mIGJpbmFyeSBjb250cmFjdCknLFxuICAgICdkZXBsb3knXG5dO1xuXG5jb25zdCBqc01vZHVsZVR5cGVPcHRpb24gPSBbXG4gICAgJy0tanMtbW9kdWxlIDxtb2R1bGUtdHlwZT4nLFxuICAgIFwiSmF2YSBTY3JpcHQgbW9kdWxlIHR5cGU6IFwiICtcbiAgICBcImBub2RlYCB0byB1c2Ugd2l0aCBgY29uc3QgRm9vQ29udHJhY3QgPSByZXF1aXJlKCdmb28nKWAsIFwiICtcbiAgICBcImBub2RlTm9EZWZhdWx0YCB0byB1c2Ugd2l0aCBgY29uc3Qge0Zvb0NvbnRyYWN0fSA9IHJlcXVpcmUoJ2ZvbycpYCwgXCIgK1xuICAgIFwiYGVzYCB0byB1c2Ugd2l0aCBgaW1wb3J0IEZvb0NvbnRyYWN0IGZyb20gJ2ZvbydgLCBcIiArXG4gICAgXCJgZXNOb0RlZmF1bHRgIHRvIHVzZSB3aXRoIGBpbXBvcnQge0Zvb0NvbnRyYWN0fSBmcm9tICdmb28nYC5cIixcbiAgICAnbm9kZSdcbl07XG5cblxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlQ29tbWFuZExpbmUoZGV2OiBEZXYsIGFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgbGV0IGNvbW1hbmRBY3Rpb24gPSBpbmZvQ29tbWFuZDtcbiAgICBsZXQgY29tbWFuZEFyZ3MgPSBbXTtcblxuICAgIGNvbnN0IGNvbW1hbmQgPSAoYWN0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgY29tbWFuZEFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgIGNvbW1hbmRBcmdzID0gYXJncztcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAubmFtZShkZXYubmFtZSlcbiAgICAgICAgLnZlcnNpb24oZGV2LnZlcnNpb24pXG4gICAgICAgIC5vcHRpb24oJy1hLCAtLWF2YWlsYWJsZScsICdTaG93IGF2YWlsYWJsZSB2ZXJzaW9ucy4nKVxuICAgICAgICAuZGVzY3JpcHRpb24oJ1RPTiBMYWJzIGRldmVsb3BtZW50IHRvb2xzJyk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdpbmZvJywgeyBpc0RlZmF1bHQ6IHRydWUgfSkuZGVzY3JpcHRpb24oJ1Nob3cgc3VtbWFyeSBhYm91dCBkZXYgZW52aXJvbm1lbnQuJylcbiAgICAgICAgLm9wdGlvbignLWEsIC0tYXZhaWxhYmxlJywgJ1Nob3cgYXZhaWxhYmxlIHZlcnNpb25zLicpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChpbmZvQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnc29sIFtmaWxlcy4uLl0nKS5kZXNjcmlwdGlvbignQnVpbGQgc29saWRpdHkgY29udHJhY3Rbc10uJylcbiAgICAgICAgLm9wdGlvbiguLi5jbGllbnRMYW5ndWFnZXNPcHRpb24pXG4gICAgICAgIC5vcHRpb24oLi4uY2xpZW50TGV2ZWxPcHRpb24pXG4gICAgICAgIC5vcHRpb24oLi4uanNNb2R1bGVUeXBlT3B0aW9uKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoc29sQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnZ2VuIFtmaWxlcy4uLl0nKS5kZXNjcmlwdGlvbignR2VuZXJhdGUgY2xpZW50IGNvZGUgZm9yIGNvbnRyYWN0W3NdLicpXG4gICAgICAgIC5vcHRpb24oY2xpZW50TGFuZ3VhZ2VzT3B0aW9uWzBdLCBjbGllbnRMYW5ndWFnZXNPcHRpb25bMV0sICdqcycpXG4gICAgICAgIC5vcHRpb24oLi4uY2xpZW50TGV2ZWxPcHRpb24pXG4gICAgICAgIC5vcHRpb24oLi4uanNNb2R1bGVUeXBlT3B0aW9uKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoZ2VuQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnc3RhcnQnKS5kZXNjcmlwdGlvbignU3RhcnQgZGV2IGNvbnRhaW5lcnMuJylcbiAgICAgICAgLm9wdGlvbiguLi5uZXR3b3Jrc09wdGlvbilcbiAgICAgICAgLm9wdGlvbiguLi5jb21waWxlcnNPcHRpb24pXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChzdGFydENvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3N0b3AnKS5kZXNjcmlwdGlvbignU3RvcCBkZXYgY29udGFpbmVycy4nKVxuICAgICAgICAub3B0aW9uKC4uLm5ldHdvcmtzT3B0aW9uKVxuICAgICAgICAub3B0aW9uKC4uLmNvbXBpbGVyc09wdGlvbilcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHN0b3BDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdyZXN0YXJ0JykuZGVzY3JpcHRpb24oJ1Jlc3RhcnQgZGV2IGNvbnRhaW5lcnMuJylcbiAgICAgICAgLm9wdGlvbiguLi5uZXR3b3Jrc09wdGlvbilcbiAgICAgICAgLm9wdGlvbiguLi5jb21waWxlcnNPcHRpb24pXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChyZXN0YXJ0Q29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgncmVjcmVhdGUnKS5kZXNjcmlwdGlvbignUmVjcmVhdGUgZGV2IGNvbnRhaW5lcnMuJylcbiAgICAgICAgLm9wdGlvbiguLi5uZXR3b3Jrc09wdGlvbilcbiAgICAgICAgLm9wdGlvbiguLi5jb21waWxlcnNPcHRpb24pXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChyZWNyZWF0ZUNvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3NldHVwJykuZGVzY3JpcHRpb24oJ1NldHVwIGRldiBlbnZpcm9ubWVudC4nKVxuICAgICAgICAub3B0aW9uKC4uLm5ldHdvcmtzT3B0aW9uKVxuICAgICAgICAub3B0aW9uKC4uLmNvbXBpbGVyc09wdGlvbilcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHNldHVwQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnY2xlYW4nKS5kZXNjcmlwdGlvbignUmVtb3ZlIGRvY2tlciBjb250YWluZXJzIGFuZCBpbWFnZXMgcmVsYXRlZCB0byBUT04gRGV2LicpXG4gICAgICAgIC5vcHRpb24oJy1uLCAtLW5ldHdvcmtzJywgJ0NsZWFuIGxvY2FsIG5vZGUgZG9ja2VyIGNvbnRhaW5lcnMgYW5kIGltYWdlcy4nKVxuICAgICAgICAub3B0aW9uKCctbSwgLS1jb21waWxlcnMnLCAnQ2xlYW4gY29tcGlsZXJzIGRvY2tlciBjb250YWluZXJzIGFuZCBpbWFnZXMuJylcbiAgICAgICAgLm9wdGlvbignLWMsIC0tY29udGFpbmVycycsICdDbGVhbiBjb250YWluZXJzIG9ubHkuJywgZmFsc2UpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChjbGVhbkNvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3VzZSA8dmVyc2lvbj4nKS5kZXNjcmlwdGlvbignVXNlIHNwZWNpZmllZCB2ZXJzaW9uIGZvciBjb250YWluZXJzLicpXG4gICAgICAgIC5vcHRpb24oLi4ubmV0d29ya3NPcHRpb24pXG4gICAgICAgIC5vcHRpb24oLi4uY29tcGlsZXJzT3B0aW9uKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQodXNlQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnc2V0IFtuZXR3b3JrLi4uXScpLmRlc2NyaXB0aW9uKCdTZXQgbmV0d29ya1tzXSBvcHRpb25zLicpXG4gICAgICAgIC5vcHRpb24oJy1wLCAtLXBvcnQgPHBvcnQ+JywgJ0hvc3QgcG9ydCB0byBib3VuZCBsb2NhbCBub2RlLicpXG4gICAgICAgIC5vcHRpb24oXG4gICAgICAgICAgICAnLWQsIC0tZGItcG9ydCA8YmluZGluZz4nLFxuICAgICAgICAgICAgJ0hvc3QgcG9ydCB0byBib3VuZCBsb2NhbCBub2RlcyBBcmFuZ28gREIgKFwiYmluZFwiIHRvIHVzZSBkZWZhdWx0IEFyYW5nbyBEQiBwb3J0LCBcInVuYmluZFwiIHRvIHVuYmluZCBBcmFuZ28gREIgcG9ydCkuJyxcbiAgICAgICAgKVxuICAgICAgICAub3B0aW9uKCctbiwgLS1uZXctbmFtZSA8bmFtZT4nLCAnU2V0IG5ldyBuYW1lIGZvciBuZXR3b3JrLicpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChzZXRDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdhZGQgW25ldHdvcmsuLi5dJykuZGVzY3JpcHRpb24oJ0FkZCBuZXR3b3JrW3NdLicpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChhZGRDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdyZW1vdmUgW25ldHdvcmsuLi5dJykuYWxpYXMoJ3JtJykuZGVzY3JpcHRpb24oJ1JlbW92ZSBuZXR3b3JrW3NdLicpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChyZW1vdmVDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCd0ZXN0IFtzZXJ2ZXJzLi4uXScpLmFsaWFzKCd0JykuZGVzY3JpcHRpb24oJ1Rlc3QgbmV0d29ya1tzXS4nKVxuICAgICAgICAub3B0aW9uKCctdiwgLS12ZXJib3NlJywgJ1Nob3cgdmVyYm9zZSB0ZXN0IGxvZy4nLCBmYWxzZSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHRlc3RDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdrZXlzJykuYWxpYXMoJ2snKS5kZXNjcmlwdGlvbignR2VuZXJhdGUgcmFuZG9tIEtleSBQYWlyLicpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChnZW5lcmF0ZUtleXNDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdhZGRyIDxhZGRyPicpLmFsaWFzKCdhJykuZGVzY3JpcHRpb24oJ0NvbnZlcnQgYWRkcmVzcy4nKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoY29udmVydEFkZHJlc3MpKTtcblxuICAgIGlmIChVU0VfRVhQRVJJTUVOVEFMX0ZFQVRVUkVTKSB7XG4gICAgICAgIHByb2dyYW1cbiAgICAgICAgICAgIC5jb21tYW5kKCdzcHkgW25ldHdvcmtzLi4uXScpLmRlc2NyaXB0aW9uKCdSdW4gbmV0d29yayBzY2FubmVyLicpXG4gICAgICAgICAgICAuYWN0aW9uKGNvbW1hbmQoc3B5Q29tbWFuZCkpO1xuXG4gICAgICAgIHByb2dyYW1cbiAgICAgICAgICAgIC5jb21tYW5kKCd3ZWInKS5kZXNjcmlwdGlvbignUnVuIHdlYiBjb25zb2xlLicpXG4gICAgICAgICAgICAub3B0aW9uKCctcCwgLS1wb3J0IDxwb3J0PicsICdIb3N0IHBvcnQgdG8gYm91bmQgd2ViIGNvbnNvbGUuJywgJzg4MDAnKVxuICAgICAgICAgICAgLmFjdGlvbihjb21tYW5kKHdlYkNvbnNvbGVDb21tYW5kKSk7XG5cbiAgICAgICAgcHJvZ3JhbVxuICAgICAgICAgICAgLmNvbW1hbmQoJ3RyYWNlIDxzZXJ2ZXI+JykuZGVzY3JpcHRpb24oJ1RyYWNlIG1lc3NhZ2UuJylcbiAgICAgICAgICAgIC5hY3Rpb24oY29tbWFuZCh0cmFjZUNvbW1hbmQpKTtcblxuICAgIH1cblxuICAgIHByb2dyYW0ucGFyc2UoYXJncyk7XG5cbiAgICBpZiAoY29tbWFuZEFyZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGlmIChwcm9ncmFtLmFyZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBhd2FpdCBpbmZvQ29tbWFuZChkZXYsIHByb2dyYW0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvZ3JhbS5vdXRwdXRIZWxwKCk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoY29tbWFuZEFjdGlvbiA9PT0gaW5mb0NvbW1hbmQpIHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBjb21tYW5kQXJnc1tjb21tYW5kQXJncy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIG9wdGlvbnMuYXZhaWxhYmxlID0gb3B0aW9ucy5wYXJlbnQuYXZhaWxhYmxlO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IGNvbW1hbmRBY3Rpb24oZGV2LCAuLi5jb21tYW5kQXJncyk7XG4gICAgfVxufVxuXG5leHBvcnQgeyBoYW5kbGVDb21tYW5kTGluZSB9O1xuIl19