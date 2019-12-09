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

var sharedOptions = {
  n: ['-n, --networks [names]', 'apply command to specified network[s] (names must be separated with comma)'],
  m: ['-m, --compilers', 'apply command to the compilers container']
};

function handleCommandLine(_x41, _x42) {
  return _handleCommandLine.apply(this, arguments);
}

function _handleCommandLine() {
  _handleCommandLine = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee21(dev, args) {
    var _program$command$desc, _program$command$desc2, _program$command$desc3, _program$command$desc4, _program$command$desc5, _program$command$desc6, _program$command$desc7, _program$command$desc8, _program$command$desc9, _program$command$desc10, _program$command$desc11, _program$command$desc12;

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

            program.name(dev.name).version(dev.version).option('-a, --available', 'show available versions').description('TON Labs development tools');
            program.command('info', {
              isDefault: true
            }).description('Show summary about dev environment').option('-a, --available', 'show available versions').action(command(_info.infoCommand));
            program.command('sol [files...]').description('Build solidity contract[s]').option('-l, --client-languages <languages>', 'generate client code for languages: "js", "rs" (multiple languages must be separated with comma)').option('-L, --client-level <client-level>', 'client code level: "run" to run only, "deploy" to run and deploy (includes an imageBase64 of binary contract)', 'deploy').option('--js-module <module-type>', "Java Script module type: " + "`node` to use with `const FooContract = require('foo`)`, " + "`nodeNoDefault` to use with `const {FooContract} = require('foo`)`, " + "`es` to use with `import FooContract from 'foo'`, " + "`esNoDefault` to use with `import {FooContract} from 'foo'` (`node` is a default option)", 'node').action(command(solCommand));
            program.command('gen [files...]').description('Generate client code for contract[s]').option('-l, --client-languages <languages>', 'generate client code for languages: "js", "rs" (multiple languages must be separated with comma)', 'js').option('-L, --client-level <client-level>', 'client code level: "run" to run only, "deploy" to run and deploy (includes an imageBase64 of binary contract)', 'deploy').option('--js-module <module-type>', "Java Script module type: " + "`node` to use with `const FooContract = require('foo`)`, " + "`nodeNoDefault` to use with `const {FooContract} = require('foo`)`, " + "`es` to use with `import FooContract from 'foo'`, " + "`esNoDefault` to use with `import {FooContract} from 'foo'` (`node` is a default option)", 'node').action(command(genCommand));

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
              program.command('trace <server>').description('Trace message').action(command(traceCommand));
            } // .command('update', `update ${dev.name} docker images`).action(action)


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvY2xpLmpzIl0sIm5hbWVzIjpbIlVTRV9FWFBFUklNRU5UQUxfRkVBVFVSRVMiLCJwcm9ncmFtIiwicmVxdWlyZSIsInNldHVwQ29tbWFuZCIsImRldiIsIm9wdGlvbnMiLCJzdGFydCIsInN0YXJ0Q29tbWFuZCIsInN0b3BDb21tYW5kIiwic3RvcCIsInJlc3RhcnRDb21tYW5kIiwicmVzdGFydCIsInJlY3JlYXRlQ29tbWFuZCIsInJlY3JlYXRlIiwiY2xlYW5Db21tYW5kIiwiYWxsIiwiY29tcGlsZXJzIiwibmV0d29ya3MiLCJjbGVhbiIsImNvbnRhaW5lcnMiLCJzZXRDb21tYW5kIiwibmFtZXMiLCJ1cGRhdGVOZXR3b3JrQ29uZmlncyIsIm5ldHdvcmtzT3JBbGwiLCJjb25maWciLCJuZXdOYW1lIiwibmFtZSIsInBvcnQiLCJob3N0UG9ydCIsImRiUG9ydCIsImFyYW5nb0hvc3RQb3J0IiwiTmV0d29yayIsImRlZmF1bHRBcmFuZ29Qb3J0IiwiYWRkQ29tbWFuZCIsImFkZE5ldHdvcmtzIiwicmVtb3ZlQ29tbWFuZCIsInJlbW92ZU5ldHdvcmtzIiwibmV0d29ya3NGcm9tTmFtZXMiLCJnZW5lcmF0ZUtleXNDb21tYW5kIiwiX2RldiIsIlRPTkNsaWVudCIsImNyZWF0ZSIsInNlcnZlcnMiLCJjbGllbnQiLCJjcnlwdG8iLCJlZDI1NTE5S2V5cGFpciIsImtleXMiLCJjb25zb2xlIiwibG9nIiwiSlNPTiIsInN0cmluZ2lmeSIsInVuZGVmaW5lZCIsInRlc3RDb21tYW5kIiwiQ2hlY2tOZXR3b3JrIiwiY2hlY2tOZXR3b3JrcyIsInZlcmJvc2UiLCJjb252ZXJ0QWRkcmVzcyIsImFkZHIiLCJzaG93Q29udmVydGVkIiwidGl0bGUiLCJjb252ZXJ0ZWQiLCJhZGRyZXNzIiwic2hvd0hleCIsImNvbnRyYWN0cyIsImNvbnZlcnRUbyIsInNob3dCYXNlNjQiLCJ0ZXN0IiwiYm91bmNlIiwidXJsIiwiYmFzZTY0UGFyYW1zIiwiZmxhZ3MiLCJmaWx0ZXIiLCJ4Iiwiam9pbiIsInRyYWNlQ29tbWFuZCIsInNlcnZlciIsIk5ldHdvcmtUcmFjZXIiLCJ0cmFjZU5ldHdvcmsiLCJ1c2VDb21tYW5kIiwidmVyc2lvbiIsInVzZVZlcnNpb24iLCJzb2xDb21tYW5kIiwiZmlsZXMiLCJsZW5ndGgiLCJFcnJvciIsIlNvbGlkaXR5IiwiYnVpbGQiLCJjbGllbnRMYW5ndWFnZXMiLCJzcGxpdCIsImNsaWVudExldmVsIiwiQ2xpZW50Q29kZUxldmVsIiwicnVuIiwianNNb2R1bGUiLCJKU01vZHVsZSIsIm5vZGUiLCJnZW5Db21tYW5kIiwiQ2xpZW50Q29kZSIsImdlbmVyYXRlIiwic3B5Q29tbWFuZCIsIndlYkNvbnNvbGVDb21tYW5kIiwic2hhcmVkT3B0aW9ucyIsIm4iLCJtIiwiaGFuZGxlQ29tbWFuZExpbmUiLCJhcmdzIiwiY29tbWFuZEFjdGlvbiIsImluZm9Db21tYW5kIiwiY29tbWFuZEFyZ3MiLCJjb21tYW5kIiwiYWN0aW9uIiwib3B0aW9uIiwiZGVzY3JpcHRpb24iLCJpc0RlZmF1bHQiLCJhbGlhcyIsInBhcnNlIiwib3V0cHV0SGVscCIsImF2YWlsYWJsZSIsInBhcmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQVdBOztBQUNBOztBQUNBOztBQXJDQTs7Ozs7Ozs7Ozs7Ozs7QUF1Q0EsSUFBTUEseUJBQXlCLEdBQUcsS0FBbEM7O0FBRUEsSUFBTUMsT0FBTyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUF2Qjs7U0FHZUMsWTs7Ozs7OzsrQkFBZixpQkFBNEJDLEdBQTVCLEVBQXNDQyxPQUF0QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFDVUQsR0FBRyxDQUFDRSxLQUFKLENBQVUsb0NBQXNCRixHQUF0QixFQUEyQkMsT0FBM0IsQ0FBVixDQURWOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtB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QUFDeEIsTUFBWixHQUFxQixDQUF0QixDQURJO0FBRS9COUUsY0FBQUEsT0FBTyxDQUFDK0csU0FBUixHQUFvQi9HLE9BQU8sQ0FBQ2dILE1BQVIsQ0FBZUQsU0FBbkM7QUFDSDs7QUEzS1Q7QUFBQSxtQkE0S2NYLGFBQWEsTUFBYixVQUFjckcsR0FBZCw2Q0FBc0J1RyxXQUF0QixHQTVLZDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuLy8gQGZsb3dcblxuaW1wb3J0IHsgVE9OQ2xpZW50IH0gZnJvbSBcInRvbi1jbGllbnQtbm9kZS1qc1wiO1xuaW1wb3J0IHsgQ2xpZW50Q29kZSwgQ2xpZW50Q29kZUxldmVsLCBKU01vZHVsZSB9IGZyb20gXCIuLi9jb21waWxlcnMvY2xpZW50LWNvZGVcIjtcbmltcG9ydCB7IFNvbGlkaXR5IH0gZnJvbSBcIi4uL2NvbXBpbGVycy9zb2xpZGl0eVwiO1xuaW1wb3J0IHsgRGV2IH0gZnJvbSBcIi4uL2RldlwiO1xuaW1wb3J0IHsgTmV0d29yayB9IGZyb20gXCIuLi9uZXR3b3Jrcy9uZXR3b3Jrc1wiO1xuaW1wb3J0IHR5cGUgeyBOZXR3b3JrQ29uZmlnIH0gZnJvbSBcIi4uL25ldHdvcmtzL25ldHdvcmtzXCI7XG5pbXBvcnQgeyB3ZWIgfSBmcm9tIFwiLi4vc2VydmVyL3NlcnZlclwiO1xuaW1wb3J0IHsgQ2hlY2tOZXR3b3JrIH0gZnJvbSBcIi4vY2hlY2tcIjtcbmltcG9ydCB7IGNvbXBpbGVyc1dpdGhOZXR3b3JrcyB9IGZyb20gXCIuL29wdGlvbnNcIjtcbmltcG9ydCB0eXBlIHtcbiAgICBDbGVhbk9wdGlvbnMsXG4gICAgUmVjcmVhdGVPcHRpb25zLFxuICAgIFJlc3RhcnRPcHRpb25zLCBTZXROZXR3b3JrT3B0aW9ucyxcbiAgICBTZXR1cE9wdGlvbnMsIFNvbE9wdGlvbnMsXG4gICAgU3RhcnRPcHRpb25zLFxuICAgIFN0b3BPcHRpb25zLFxuICAgIFVzZU9wdGlvbnMsIFdlYk9wdGlvbnMsXG59IGZyb20gXCIuL29wdGlvbnNcIjtcblxuaW1wb3J0IHsgaW5mb0NvbW1hbmQgfSBmcm9tIFwiLi9pbmZvLmpzXCI7XG5pbXBvcnQgeyBzcHkgfSBmcm9tIFwiLi9zcHlcIjtcbmltcG9ydCB7IE5ldHdvcmtUcmFjZXIgfSBmcm9tIFwiLi90cmFjZVwiO1xuXG5jb25zdCBVU0VfRVhQRVJJTUVOVEFMX0ZFQVRVUkVTID0gZmFsc2U7XG5cbmNvbnN0IHByb2dyYW0gPSByZXF1aXJlKCdjb21tYW5kZXInKTtcblxuXG5hc3luYyBmdW5jdGlvbiBzZXR1cENvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IFNldHVwT3B0aW9ucykge1xuICAgIGF3YWl0IGRldi5zdGFydChjb21waWxlcnNXaXRoTmV0d29ya3MoZGV2LCBvcHRpb25zKSk7XG59XG5cblxuYXN5bmMgZnVuY3Rpb24gc3RhcnRDb21tYW5kKGRldjogRGV2LCBvcHRpb25zOiBTdGFydE9wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYuc3RhcnQoY29tcGlsZXJzV2l0aE5ldHdvcmtzKGRldiwgb3B0aW9ucykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzdG9wQ29tbWFuZChkZXY6IERldiwgb3B0aW9uczogU3RvcE9wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYuc3RvcChjb21waWxlcnNXaXRoTmV0d29ya3MoZGV2LCBvcHRpb25zKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlc3RhcnRDb21tYW5kKGRldjogRGV2LCBvcHRpb25zOiBSZXN0YXJ0T3B0aW9ucykge1xuICAgIGF3YWl0IGRldi5yZXN0YXJ0KGNvbXBpbGVyc1dpdGhOZXR3b3JrcyhkZXYsIG9wdGlvbnMpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVjcmVhdGVDb21tYW5kKGRldjogRGV2LCBvcHRpb25zOiBSZWNyZWF0ZU9wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYucmVjcmVhdGUoY29tcGlsZXJzV2l0aE5ldHdvcmtzKGRldiwgb3B0aW9ucykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjbGVhbkNvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IENsZWFuT3B0aW9ucykge1xuICAgIGNvbnN0IGFsbCA9ICFvcHRpb25zLmNvbXBpbGVycyAmJiAhb3B0aW9ucy5uZXR3b3JrcztcbiAgICBhd2FpdCBkZXYuY2xlYW4ob3B0aW9ucy5jb21waWxlcnMgfHwgYWxsLCBvcHRpb25zLm5ldHdvcmtzIHx8IGFsbCwgb3B0aW9ucy5jb250YWluZXJzKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2V0Q29tbWFuZChkZXY6IERldiwgbmFtZXM6IHN0cmluZ1tdLCBvcHRpb25zOiBTZXROZXR3b3JrT3B0aW9ucykge1xuICAgIGF3YWl0IGRldi51cGRhdGVOZXR3b3JrQ29uZmlncyhkZXYubmV0d29ya3NPckFsbChuYW1lcyksIChjb25maWc6IE5ldHdvcmtDb25maWcpID0+IHtcbiAgICAgICAgaWYgKG9wdGlvbnMubmV3TmFtZSkge1xuICAgICAgICAgICAgY29uZmlnLm5hbWUgPSBvcHRpb25zLm5ld05hbWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMucG9ydCkge1xuICAgICAgICAgICAgY29uZmlnLmhvc3RQb3J0ID0gb3B0aW9ucy5wb3J0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmRiUG9ydCkge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZGJQb3J0ID09PSAnYmluZCcpIHtcbiAgICAgICAgICAgICAgICBjb25maWcuYXJhbmdvSG9zdFBvcnQgPSBOZXR3b3JrLmRlZmF1bHRBcmFuZ29Qb3J0O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmRiUG9ydCA9PT0gJ3VuYmluZCcpIHtcbiAgICAgICAgICAgICAgICBjb25maWcuYXJhbmdvSG9zdFBvcnQgPSAnJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLmFyYW5nb0hvc3RQb3J0ID0gb3B0aW9ucy5kYlBvcnQgfHwgJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gYWRkQ29tbWFuZChkZXY6IERldiwgbmFtZXM6IHN0cmluZ1tdKSB7XG4gICAgYXdhaXQgZGV2LmFkZE5ldHdvcmtzKG5hbWVzKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVtb3ZlQ29tbWFuZChkZXY6IERldiwgbmFtZXM6IHN0cmluZ1tdKSB7XG4gICAgYXdhaXQgZGV2LnJlbW92ZU5ldHdvcmtzKGRldi5uZXR3b3Jrc0Zyb21OYW1lcyhuYW1lcykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZW5lcmF0ZUtleXNDb21tYW5kKF9kZXY6IERldikge1xuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IFRPTkNsaWVudC5jcmVhdGUoe1xuICAgICAgICBzZXJ2ZXJzOiBbJ2h0dHA6Ly9sb2NhbGhvc3QnXSxcbiAgICB9KTtcbiAgICBjb25zdCBrZXlzID0gYXdhaXQgY2xpZW50LmNyeXB0by5lZDI1NTE5S2V5cGFpcigpO1xuICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGtleXMsIHVuZGVmaW5lZCwgNCkpO1xufVxuXG5hc3luYyBmdW5jdGlvbiB0ZXN0Q29tbWFuZChfZGV2OiBEZXYsIHNlcnZlcnM6IHN0cmluZ1tdLCBvcHRpb25zOiB7IHZlcmJvc2U6IGJvb2xlYW4gfSkge1xuICAgIGF3YWl0IENoZWNrTmV0d29yay5jaGVja05ldHdvcmtzKHNlcnZlcnMsIG9wdGlvbnMudmVyYm9zZSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNvbnZlcnRBZGRyZXNzKF9kZXY6IERldiwgYWRkcikge1xuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IFRPTkNsaWVudC5jcmVhdGUoe1xuICAgICAgICBzZXJ2ZXJzOiBbJ2h0dHA6Ly9sb2NhbGhvc3QnXSxcbiAgICB9KTtcbiAgICBjb25zdCBzaG93Q29udmVydGVkID0gKHRpdGxlLCBjb252ZXJ0ZWQpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coYCR7Y29udmVydGVkLmFkZHJlc3MgPT09IGFkZHIgPyAn4pyTJyA6ICcgJ30gJHt0aXRsZX0gPSAke2NvbnZlcnRlZC5hZGRyZXNzfWApO1xuICAgIH07XG4gICAgY29uc3Qgc2hvd0hleCA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgY29udmVydGVkID0gYXdhaXQgY2xpZW50LmNvbnRyYWN0cy5jb252ZXJ0QWRkcmVzcyh7XG4gICAgICAgICAgICBhZGRyZXNzOiBhZGRyLFxuICAgICAgICAgICAgY29udmVydFRvOiAnSGV4JyxcbiAgICAgICAgfSk7XG4gICAgICAgIHNob3dDb252ZXJ0ZWQoJ2hleCcsIGNvbnZlcnRlZCk7XG4gICAgfTtcbiAgICBjb25zdCBzaG93QmFzZTY0ID0gYXN5bmMgKHRlc3QsIGJvdW5jZSwgdXJsKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnZlcnRlZCA9IGF3YWl0IGNsaWVudC5jb250cmFjdHMuY29udmVydEFkZHJlc3Moe1xuICAgICAgICAgICAgYWRkcmVzczogYWRkcixcbiAgICAgICAgICAgIGNvbnZlcnRUbzogJ0Jhc2U2NCcsXG4gICAgICAgICAgICBiYXNlNjRQYXJhbXM6IHtcbiAgICAgICAgICAgICAgICBib3VuY2UsXG4gICAgICAgICAgICAgICAgdGVzdCxcbiAgICAgICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZmxhZ3MgPSBbXG4gICAgICAgICAgICB0ZXN0ID8gJ3Rlc3QnIDogJ21haW4nLFxuICAgICAgICAgICAgYm91bmNlID8gJ2JvdW5jZScgOiAnJyxcbiAgICAgICAgICAgIHVybCA/ICd1cmwnIDogJycsXG4gICAgICAgIF1cbiAgICAgICAgICAgIC5maWx0ZXIoeCA9PiB4ICE9PSAnJylcbiAgICAgICAgICAgIC5qb2luKCcgJyk7XG4gICAgICAgIHNob3dDb252ZXJ0ZWQoZmxhZ3MsIGNvbnZlcnRlZCk7XG4gICAgfTtcbiAgICBhd2FpdCBzaG93SGV4KCk7XG4gICAgYXdhaXQgc2hvd0Jhc2U2NChmYWxzZSwgZmFsc2UsIGZhbHNlKTtcbiAgICBhd2FpdCBzaG93QmFzZTY0KGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XG4gICAgYXdhaXQgc2hvd0Jhc2U2NChmYWxzZSwgdHJ1ZSwgZmFsc2UpO1xuICAgIGF3YWl0IHNob3dCYXNlNjQoZmFsc2UsIHRydWUsIHRydWUpO1xuICAgIGF3YWl0IHNob3dCYXNlNjQodHJ1ZSwgZmFsc2UsIGZhbHNlKTtcbiAgICBhd2FpdCBzaG93QmFzZTY0KHRydWUsIGZhbHNlLCB0cnVlKTtcbiAgICBhd2FpdCBzaG93QmFzZTY0KHRydWUsIHRydWUsIGZhbHNlKTtcbiAgICBhd2FpdCBzaG93QmFzZTY0KHRydWUsIHRydWUsIHRydWUpO1xufVxuXG5hc3luYyBmdW5jdGlvbiB0cmFjZUNvbW1hbmQoX2RldjogRGV2LCBzZXJ2ZXI6IHN0cmluZykge1xuICAgIGF3YWl0IE5ldHdvcmtUcmFjZXIudHJhY2VOZXR3b3JrKHNlcnZlcik7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHVzZUNvbW1hbmQoZGV2OiBEZXYsIHZlcnNpb246IHN0cmluZywgb3B0aW9uczogVXNlT3B0aW9ucykge1xuICAgIGF3YWl0IGRldi51c2VWZXJzaW9uKHZlcnNpb24sIGNvbXBpbGVyc1dpdGhOZXR3b3JrcyhkZXYsIG9wdGlvbnMpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc29sQ29tbWFuZChkZXY6IERldiwgZmlsZXM6IHN0cmluZ1tdLCBvcHRpb25zOiBTb2xPcHRpb25zKSB7XG4gICAgaWYgKGZpbGVzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbXVzdCBzcGVjaWZ5IGF0IGxlYXN0IG9uZSBmaWxlIG5hbWUnKTtcbiAgICB9XG4gICAgYXdhaXQgU29saWRpdHkuYnVpbGQoZGV2LCBmaWxlcywge1xuICAgICAgICBjbGllbnRMYW5ndWFnZXM6IChvcHRpb25zLmNsaWVudExhbmd1YWdlcyB8fCAnJykuc3BsaXQoJywnKSxcbiAgICAgICAgY2xpZW50TGV2ZWw6IG9wdGlvbnMuY2xpZW50TGV2ZWwgfHwgQ2xpZW50Q29kZUxldmVsLnJ1bixcbiAgICAgICAganNNb2R1bGU6IG9wdGlvbnMuanNNb2R1bGUgfHwgSlNNb2R1bGUubm9kZSxcbiAgICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2VuQ29tbWFuZChkZXY6IERldiwgZmlsZXM6IHN0cmluZ1tdLCBvcHRpb25zOiBTb2xPcHRpb25zKSB7XG4gICAgaWYgKGZpbGVzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbXVzdCBzcGVjaWZ5IGF0IGxlYXN0IG9uZSBmaWxlIG5hbWUnKTtcbiAgICB9XG4gICAgYXdhaXQgQ2xpZW50Q29kZS5nZW5lcmF0ZShmaWxlcywge1xuICAgICAgICBjbGllbnRMYW5ndWFnZXM6IChvcHRpb25zLmNsaWVudExhbmd1YWdlcyB8fCAnJykuc3BsaXQoJywnKSxcbiAgICAgICAgY2xpZW50TGV2ZWw6IG9wdGlvbnMuY2xpZW50TGV2ZWwgfHwgQ2xpZW50Q29kZUxldmVsLnJ1bixcbiAgICAgICAganNNb2R1bGU6IG9wdGlvbnMuanNNb2R1bGUgfHwgSlNNb2R1bGUubm9kZSxcbiAgICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc3B5Q29tbWFuZChkZXY6IERldiwgbmV0d29ya3M6IHN0cmluZ1tdKSB7XG4gICAgYXdhaXQgc3B5KGRldiwgbmV0d29ya3MpO1xufVxuXG5hc3luYyBmdW5jdGlvbiB3ZWJDb25zb2xlQ29tbWFuZChkZXY6IERldiwgb3B0aW9uczogV2ViT3B0aW9ucykge1xuICAgIGF3YWl0IHdlYihkZXYsIG9wdGlvbnMpO1xufVxuXG5jb25zdCBzaGFyZWRPcHRpb25zID0ge1xuICAgIG46IFsnLW4sIC0tbmV0d29ya3MgW25hbWVzXScsICdhcHBseSBjb21tYW5kIHRvIHNwZWNpZmllZCBuZXR3b3JrW3NdIChuYW1lcyBtdXN0IGJlIHNlcGFyYXRlZCB3aXRoIGNvbW1hKSddLFxuICAgIG06IFsnLW0sIC0tY29tcGlsZXJzJywgJ2FwcGx5IGNvbW1hbmQgdG8gdGhlIGNvbXBpbGVycyBjb250YWluZXInXSxcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZUNvbW1hbmRMaW5lKGRldjogRGV2LCBhcmdzOiBzdHJpbmdbXSkge1xuICAgIGxldCBjb21tYW5kQWN0aW9uID0gaW5mb0NvbW1hbmQ7XG4gICAgbGV0IGNvbW1hbmRBcmdzID0gW107XG5cbiAgICBjb25zdCBjb21tYW5kID0gKGFjdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgIGNvbW1hbmRBY3Rpb24gPSBhY3Rpb247XG4gICAgICAgICAgICBjb21tYW5kQXJncyA9IGFyZ3M7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLm5hbWUoZGV2Lm5hbWUpXG4gICAgICAgIC52ZXJzaW9uKGRldi52ZXJzaW9uKVxuICAgICAgICAub3B0aW9uKCctYSwgLS1hdmFpbGFibGUnLCAnc2hvdyBhdmFpbGFibGUgdmVyc2lvbnMnKVxuICAgICAgICAuZGVzY3JpcHRpb24oJ1RPTiBMYWJzIGRldmVsb3BtZW50IHRvb2xzJyk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdpbmZvJywgeyBpc0RlZmF1bHQ6IHRydWUgfSkuZGVzY3JpcHRpb24oJ1Nob3cgc3VtbWFyeSBhYm91dCBkZXYgZW52aXJvbm1lbnQnKVxuICAgICAgICAub3B0aW9uKCctYSwgLS1hdmFpbGFibGUnLCAnc2hvdyBhdmFpbGFibGUgdmVyc2lvbnMnKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoaW5mb0NvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3NvbCBbZmlsZXMuLi5dJykuZGVzY3JpcHRpb24oJ0J1aWxkIHNvbGlkaXR5IGNvbnRyYWN0W3NdJylcbiAgICAgICAgLm9wdGlvbihcbiAgICAgICAgICAgICctbCwgLS1jbGllbnQtbGFuZ3VhZ2VzIDxsYW5ndWFnZXM+JyxcbiAgICAgICAgICAgICdnZW5lcmF0ZSBjbGllbnQgY29kZSBmb3IgbGFuZ3VhZ2VzOiBcImpzXCIsIFwicnNcIiAobXVsdGlwbGUgbGFuZ3VhZ2VzIG11c3QgYmUgc2VwYXJhdGVkIHdpdGggY29tbWEpJyxcbiAgICAgICAgKVxuICAgICAgICAub3B0aW9uKFxuICAgICAgICAgICAgJy1MLCAtLWNsaWVudC1sZXZlbCA8Y2xpZW50LWxldmVsPicsXG4gICAgICAgICAgICAnY2xpZW50IGNvZGUgbGV2ZWw6IFwicnVuXCIgdG8gcnVuIG9ubHksIFwiZGVwbG95XCIgdG8gcnVuIGFuZCBkZXBsb3kgKGluY2x1ZGVzIGFuIGltYWdlQmFzZTY0IG9mIGJpbmFyeSBjb250cmFjdCknLFxuICAgICAgICAgICAgJ2RlcGxveScsXG4gICAgICAgIClcbiAgICAgICAgLm9wdGlvbihcbiAgICAgICAgICAgICctLWpzLW1vZHVsZSA8bW9kdWxlLXR5cGU+JyxcbiAgICAgICAgICAgIFwiSmF2YSBTY3JpcHQgbW9kdWxlIHR5cGU6IFwiICtcbiAgICAgICAgICAgIFwiYG5vZGVgIHRvIHVzZSB3aXRoIGBjb25zdCBGb29Db250cmFjdCA9IHJlcXVpcmUoJ2Zvb2ApYCwgXCIgK1xuICAgICAgICAgICAgXCJgbm9kZU5vRGVmYXVsdGAgdG8gdXNlIHdpdGggYGNvbnN0IHtGb29Db250cmFjdH0gPSByZXF1aXJlKCdmb29gKWAsIFwiICtcbiAgICAgICAgICAgIFwiYGVzYCB0byB1c2Ugd2l0aCBgaW1wb3J0IEZvb0NvbnRyYWN0IGZyb20gJ2ZvbydgLCBcIiArXG4gICAgICAgICAgICBcImBlc05vRGVmYXVsdGAgdG8gdXNlIHdpdGggYGltcG9ydCB7Rm9vQ29udHJhY3R9IGZyb20gJ2ZvbydgIChgbm9kZWAgaXMgYSBkZWZhdWx0IG9wdGlvbilcIixcbiAgICAgICAgICAgICdub2RlJyxcbiAgICAgICAgKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoc29sQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnZ2VuIFtmaWxlcy4uLl0nKS5kZXNjcmlwdGlvbignR2VuZXJhdGUgY2xpZW50IGNvZGUgZm9yIGNvbnRyYWN0W3NdJylcbiAgICAgICAgLm9wdGlvbihcbiAgICAgICAgICAgICctbCwgLS1jbGllbnQtbGFuZ3VhZ2VzIDxsYW5ndWFnZXM+JyxcbiAgICAgICAgICAgICdnZW5lcmF0ZSBjbGllbnQgY29kZSBmb3IgbGFuZ3VhZ2VzOiBcImpzXCIsIFwicnNcIiAobXVsdGlwbGUgbGFuZ3VhZ2VzIG11c3QgYmUgc2VwYXJhdGVkIHdpdGggY29tbWEpJyxcbiAgICAgICAgICAgICdqcydcbiAgICAgICAgKVxuICAgICAgICAub3B0aW9uKFxuICAgICAgICAgICAgJy1MLCAtLWNsaWVudC1sZXZlbCA8Y2xpZW50LWxldmVsPicsXG4gICAgICAgICAgICAnY2xpZW50IGNvZGUgbGV2ZWw6IFwicnVuXCIgdG8gcnVuIG9ubHksIFwiZGVwbG95XCIgdG8gcnVuIGFuZCBkZXBsb3kgKGluY2x1ZGVzIGFuIGltYWdlQmFzZTY0IG9mIGJpbmFyeSBjb250cmFjdCknLFxuICAgICAgICAgICAgJ2RlcGxveScsXG4gICAgICAgIClcbiAgICAgICAgLm9wdGlvbihcbiAgICAgICAgICAgICctLWpzLW1vZHVsZSA8bW9kdWxlLXR5cGU+JyxcbiAgICAgICAgICAgIFwiSmF2YSBTY3JpcHQgbW9kdWxlIHR5cGU6IFwiICtcbiAgICAgICAgICAgIFwiYG5vZGVgIHRvIHVzZSB3aXRoIGBjb25zdCBGb29Db250cmFjdCA9IHJlcXVpcmUoJ2Zvb2ApYCwgXCIgK1xuICAgICAgICAgICAgXCJgbm9kZU5vRGVmYXVsdGAgdG8gdXNlIHdpdGggYGNvbnN0IHtGb29Db250cmFjdH0gPSByZXF1aXJlKCdmb29gKWAsIFwiICtcbiAgICAgICAgICAgIFwiYGVzYCB0byB1c2Ugd2l0aCBgaW1wb3J0IEZvb0NvbnRyYWN0IGZyb20gJ2ZvbydgLCBcIiArXG4gICAgICAgICAgICBcImBlc05vRGVmYXVsdGAgdG8gdXNlIHdpdGggYGltcG9ydCB7Rm9vQ29udHJhY3R9IGZyb20gJ2ZvbydgIChgbm9kZWAgaXMgYSBkZWZhdWx0IG9wdGlvbilcIixcbiAgICAgICAgICAgICdub2RlJyxcbiAgICAgICAgKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoZ2VuQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnc3RhcnQnKS5kZXNjcmlwdGlvbignU3RhcnQgZGV2IGNvbnRhaW5lcnMnKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubilcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm0pXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChzdGFydENvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3N0b3AnKS5kZXNjcmlwdGlvbignU3RvcCBkZXYgY29udGFpbmVycycpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHN0b3BDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdyZXN0YXJ0JykuZGVzY3JpcHRpb24oJ1Jlc3RhcnQgZGV2IGNvbnRhaW5lcnMnKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubilcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm0pXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChyZXN0YXJ0Q29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgncmVjcmVhdGUnKS5kZXNjcmlwdGlvbignUmVjcmVhdGUgZGV2IGNvbnRhaW5lcnMnKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubilcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm0pXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChyZWNyZWF0ZUNvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3NldHVwJykuZGVzY3JpcHRpb24oJ1NldHVwIGRldiBlbnZpcm9ubWVudCcpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHNldHVwQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnY2xlYW4nKS5kZXNjcmlwdGlvbignUmVtb3ZlIGRvY2tlciBjb250YWluZXJzIGFuZCBpbWFnZXMgcmVsYXRlZCB0byBUT04gRGV2JylcbiAgICAgICAgLm9wdGlvbignLW4sIC0tbmV0d29ya3MnLCAnY2xlYW4gbG9jYWwgbm9kZSBkb2NrZXIgY29udGFpbmVycyBhbmQgaW1hZ2VzJylcbiAgICAgICAgLm9wdGlvbignLW0sIC0tY29tcGlsZXJzJywgJ2NsZWFuIGNvbXBpbGVycyBkb2NrZXIgY29udGFpbmVycyBhbmQgaW1hZ2VzJylcbiAgICAgICAgLm9wdGlvbignLWMsIC0tY29udGFpbmVycycsICdjbGVhbiBjb250YWluZXJzIG9ubHknLCBmYWxzZSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKGNsZWFuQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgndXNlIDx2ZXJzaW9uPicpLmRlc2NyaXB0aW9uKCdVc2Ugc3BlY2lmaWVkIHZlcnNpb24gZm9yIGNvbnRhaW5lcnMnKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubilcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm0pXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZCh1c2VDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdzZXQgW25ldHdvcmsuLi5dJykuZGVzY3JpcHRpb24oJ1NldCBuZXR3b3JrW3NdIG9wdGlvbnMnKVxuICAgICAgICAub3B0aW9uKCctcCwgLS1wb3J0IDxwb3J0PicsICdob3N0IHBvcnQgdG8gYm91bmQgbG9jYWwgbm9kZScpXG4gICAgICAgIC5vcHRpb24oXG4gICAgICAgICAgICAnLWQsIC0tZGItcG9ydCA8YmluZGluZz4nLFxuICAgICAgICAgICAgJ2hvc3QgcG9ydCB0byBib3VuZCBsb2NhbCBub2RlcyBBcmFuZ28gREIgKFwiYmluZFwiIHRvIHVzZSBkZWZhdWx0IEFyYW5nbyBEQiBwb3J0LCBcInVuYmluZFwiIHRvIHVuYmluZCBBcmFuZ28gREIgcG9ydCknLFxuICAgICAgICApXG4gICAgICAgIC5vcHRpb24oJy1uLCAtLW5ldy1uYW1lIDxuYW1lPicsICdzZXQgbmV3IG5hbWUgZm9yIG5ldHdvcmsnKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoc2V0Q29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnYWRkIFtuZXR3b3JrLi4uXScpLmRlc2NyaXB0aW9uKCdBZGQgbmV0d29ya1tzXScpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChhZGRDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdyZW1vdmUgW25ldHdvcmsuLi5dJykuYWxpYXMoJ3JtJykuZGVzY3JpcHRpb24oJ1JlbW92ZSBuZXR3b3JrW3NdJylcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHJlbW92ZUNvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3Rlc3QgW3NlcnZlcnMuLi5dJykuYWxpYXMoJ3QnKS5kZXNjcmlwdGlvbignVGVzdCBuZXR3b3JrW3NdJylcbiAgICAgICAgLm9wdGlvbignLXYsIC0tdmVyYm9zZScsICdzaG93IHZlcmJvc2UgdGVzdCBsb2cnLCBmYWxzZSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHRlc3RDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdrZXlzJykuYWxpYXMoJ2snKS5kZXNjcmlwdGlvbignR2VuZXJhdGUgcmFuZG9tIEtleSBQYWlyJylcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKGdlbmVyYXRlS2V5c0NvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ2FkZHIgPGFkZHI+JykuYWxpYXMoJ2EnKS5kZXNjcmlwdGlvbignQ29udmVydCBhZGRyZXNzJylcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKGNvbnZlcnRBZGRyZXNzKSk7XG5cbiAgICBpZiAoVVNFX0VYUEVSSU1FTlRBTF9GRUFUVVJFUykge1xuICAgICAgICBwcm9ncmFtXG4gICAgICAgICAgICAuY29tbWFuZCgnc3B5IFtuZXR3b3Jrcy4uLl0nKS5kZXNjcmlwdGlvbignUnVuIG5ldHdvcmsgc2Nhbm5lcicpXG4gICAgICAgICAgICAuYWN0aW9uKGNvbW1hbmQoc3B5Q29tbWFuZCkpO1xuXG4gICAgICAgIHByb2dyYW1cbiAgICAgICAgICAgIC5jb21tYW5kKCd3ZWInKS5kZXNjcmlwdGlvbignUnVuIHdlYiBjb25zb2xlJylcbiAgICAgICAgICAgIC5vcHRpb24oJy1wLCAtLXBvcnQgPHBvcnQ+JywgJ2hvc3QgcG9ydCB0byBib3VuZCB3ZWIgY29uc29sZSAoZGVmYXVsdDogODgwMCknLCAnODgwMCcpXG4gICAgICAgICAgICAuYWN0aW9uKGNvbW1hbmQod2ViQ29uc29sZUNvbW1hbmQpKTtcbiAgICAgICAgXG4gICAgICAgIHByb2dyYW1cbiAgICAgICAgICAgIC5jb21tYW5kKCd0cmFjZSA8c2VydmVyPicpLmRlc2NyaXB0aW9uKCdUcmFjZSBtZXNzYWdlJylcbiAgICAgICAgICAgIC5hY3Rpb24oY29tbWFuZCh0cmFjZUNvbW1hbmQpKTtcblxuICAgIH1cblxuICAgIC8vIC5jb21tYW5kKCd1cGRhdGUnLCBgdXBkYXRlICR7ZGV2Lm5hbWV9IGRvY2tlciBpbWFnZXNgKS5hY3Rpb24oYWN0aW9uKVxuXG4gICAgcHJvZ3JhbS5wYXJzZShhcmdzKTtcblxuICAgIGlmIChjb21tYW5kQXJncy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgaWYgKHByb2dyYW0uYXJncy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGF3YWl0IGluZm9Db21tYW5kKGRldiwgcHJvZ3JhbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9ncmFtLm91dHB1dEhlbHAoKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChjb21tYW5kQWN0aW9uID09PSBpbmZvQ29tbWFuZCkge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGNvbW1hbmRBcmdzW2NvbW1hbmRBcmdzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgb3B0aW9ucy5hdmFpbGFibGUgPSBvcHRpb25zLnBhcmVudC5hdmFpbGFibGU7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgY29tbWFuZEFjdGlvbihkZXYsIC4uLmNvbW1hbmRBcmdzKTtcbiAgICB9XG59XG5cbmV4cG9ydCB7IGhhbmRsZUNvbW1hbmRMaW5lIH07XG4iXX0=