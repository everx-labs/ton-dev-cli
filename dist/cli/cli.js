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

var _server2 = require("../server/server");

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
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _server, client;

    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context11.prev = 3;
            _iterator = servers[Symbol.iterator]();

          case 5:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context11.next = 19;
              break;
            }

            _server = _step.value;
            _context11.next = 9;
            return _tonClientNodeJs.TONClient.create({
              servers: [_server],
              log_verbose: options.verbose
            });

          case 9:
            client = _context11.sent;
            process.stdout.write("".concat(_server, " \u2026 "));
            _context11.t0 = console;
            _context11.next = 14;
            return (0, _check.checkNetwork)(client);

          case 14:
            _context11.t1 = _context11.sent;

            _context11.t0.log.call(_context11.t0, _context11.t1);

          case 16:
            _iteratorNormalCompletion = true;
            _context11.next = 5;
            break;

          case 19:
            _context11.next = 25;
            break;

          case 21:
            _context11.prev = 21;
            _context11.t2 = _context11["catch"](3);
            _didIteratorError = true;
            _iteratorError = _context11.t2;

          case 25:
            _context11.prev = 25;
            _context11.prev = 26;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 28:
            _context11.prev = 28;

            if (!_didIteratorError) {
              _context11.next = 31;
              break;
            }

            throw _iteratorError;

          case 31:
            return _context11.finish(28);

          case 32:
            return _context11.finish(25);

          case 33:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[3, 21, 25, 33], [26,, 28, 32]]);
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
            return (0, _server2.web)(dev, options);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvY2xpLmpzIl0sIm5hbWVzIjpbIlVTRV9FWFBFUklNRU5UQUxfRkVBVFVSRVMiLCJwcm9ncmFtIiwicmVxdWlyZSIsInNldHVwQ29tbWFuZCIsImRldiIsIm9wdGlvbnMiLCJzdGFydCIsInN0YXJ0Q29tbWFuZCIsInN0b3BDb21tYW5kIiwic3RvcCIsInJlc3RhcnRDb21tYW5kIiwicmVzdGFydCIsInJlY3JlYXRlQ29tbWFuZCIsInJlY3JlYXRlIiwiY2xlYW5Db21tYW5kIiwiYWxsIiwiY29tcGlsZXJzIiwibmV0d29ya3MiLCJjbGVhbiIsImNvbnRhaW5lcnMiLCJzZXRDb21tYW5kIiwibmFtZXMiLCJ1cGRhdGVOZXR3b3JrQ29uZmlncyIsIm5ldHdvcmtzT3JBbGwiLCJjb25maWciLCJuZXdOYW1lIiwibmFtZSIsInBvcnQiLCJob3N0UG9ydCIsImRiUG9ydCIsImFyYW5nb0hvc3RQb3J0IiwiTmV0d29yayIsImRlZmF1bHRBcmFuZ29Qb3J0IiwiYWRkQ29tbWFuZCIsImFkZE5ldHdvcmtzIiwicmVtb3ZlQ29tbWFuZCIsInJlbW92ZU5ldHdvcmtzIiwibmV0d29ya3NGcm9tTmFtZXMiLCJnZW5lcmF0ZUtleXNDb21tYW5kIiwiX2RldiIsIlRPTkNsaWVudCIsImNyZWF0ZSIsInNlcnZlcnMiLCJjbGllbnQiLCJjcnlwdG8iLCJlZDI1NTE5S2V5cGFpciIsImtleXMiLCJjb25zb2xlIiwibG9nIiwidGVzdENvbW1hbmQiLCJzZXJ2ZXIiLCJsb2dfdmVyYm9zZSIsInZlcmJvc2UiLCJwcm9jZXNzIiwic3Rkb3V0Iiwid3JpdGUiLCJjb252ZXJ0QWRkcmVzcyIsImFkZHIiLCJzaG93Q29udmVydGVkIiwidGl0bGUiLCJjb252ZXJ0ZWQiLCJhZGRyZXNzIiwic2hvd0hleCIsImNvbnRyYWN0cyIsImNvbnZlcnRUbyIsInNob3dCYXNlNjQiLCJ0ZXN0IiwiYm91bmNlIiwidXJsIiwiYmFzZTY0UGFyYW1zIiwiZmxhZ3MiLCJmaWx0ZXIiLCJ4Iiwiam9pbiIsInVzZUNvbW1hbmQiLCJ2ZXJzaW9uIiwidXNlVmVyc2lvbiIsInNvbENvbW1hbmQiLCJmaWxlcyIsIlNvbGlkaXR5IiwiYnVpbGQiLCJjbGllbnRMYW5ndWFnZXMiLCJzcGxpdCIsImNsaWVudExldmVsIiwiQ2xpZW50Q29kZUxldmVsIiwicnVuIiwianNNb2R1bGUiLCJKU01vZHVsZSIsIm5vZGUiLCJnZW5Db21tYW5kIiwiQ2xpZW50Q29kZSIsImdlbmVyYXRlIiwic3B5Q29tbWFuZCIsIndlYkNvbnNvbGVDb21tYW5kIiwic2hhcmVkT3B0aW9ucyIsIm4iLCJtIiwiaGFuZGxlQ29tbWFuZExpbmUiLCJhcmdzIiwiY29tbWFuZEFjdGlvbiIsImluZm9Db21tYW5kIiwiY29tbWFuZEFyZ3MiLCJjb21tYW5kIiwiYWN0aW9uIiwib3B0aW9uIiwiZGVzY3JpcHRpb24iLCJpc0RlZmF1bHQiLCJhbGlhcyIsInBhcnNlIiwibGVuZ3RoIiwib3V0cHV0SGVscCIsImF2YWlsYWJsZSIsInBhcmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQVdBOztBQUNBOztBQXBDQTs7Ozs7Ozs7Ozs7Ozs7QUFzQ0EsSUFBTUEseUJBQXlCLEdBQUcsS0FBbEM7O0FBRUEsSUFBTUMsT0FBTyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUF2Qjs7U0FHZUMsWTs7Ozs7OzsrQkFBZixpQkFBNEJDLEdBQTVCLEVBQXNDQyxPQUF0QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFDVUQsR0FBRyxDQUFDRSxLQUFKLENBQVUsb0NBQXNCRixHQUF0QixFQUEyQkMsT0FBM0IsQ0FBVixDQURWOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7U0FLZUUsWTs7Ozs7OzsrQkFBZixrQkFBNEJILEdBQTVCLEVBQXNDQyxPQUF0QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7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QmlHLFdBQXRCLEdBdEtkOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG4gKiB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbiAqIExpY2Vuc2UgYXQ6IGh0dHBzOi8vd3d3LnRvbi5kZXYvbGljZW5zZXNcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIFRPTiBERVYgc29mdHdhcmUgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG4vLyBAZmxvd1xuXG5pbXBvcnQge1RPTkNsaWVudH0gZnJvbSBcInRvbi1jbGllbnQtbm9kZS1qc1wiO1xuaW1wb3J0IHtDbGllbnRDb2RlLCBDbGllbnRDb2RlTGV2ZWwsIEpTTW9kdWxlfSBmcm9tIFwiLi4vY29tcGlsZXJzL2NsaWVudC1jb2RlXCI7XG5pbXBvcnQge1NvbGlkaXR5fSBmcm9tIFwiLi4vY29tcGlsZXJzL3NvbGlkaXR5XCI7XG5pbXBvcnQge0Rldn0gZnJvbSBcIi4uL2RldlwiO1xuaW1wb3J0IHtOZXR3b3JrfSBmcm9tIFwiLi4vbmV0d29ya3MvbmV0d29ya3NcIjtcbmltcG9ydCB0eXBlIHtOZXR3b3JrQ29uZmlnfSBmcm9tIFwiLi4vbmV0d29ya3MvbmV0d29ya3NcIjtcbmltcG9ydCB7d2VifSBmcm9tIFwiLi4vc2VydmVyL3NlcnZlclwiO1xuaW1wb3J0IHsgY2hlY2tOZXR3b3JrIH0gZnJvbSBcIi4vY2hlY2tcIjtcbmltcG9ydCB7Y29tcGlsZXJzV2l0aE5ldHdvcmtzfSBmcm9tIFwiLi9vcHRpb25zXCI7XG5pbXBvcnQgdHlwZSB7XG4gICAgQ2xlYW5PcHRpb25zLFxuICAgIFJlY3JlYXRlT3B0aW9ucyxcbiAgICBSZXN0YXJ0T3B0aW9ucywgU2V0TmV0d29ya09wdGlvbnMsXG4gICAgU2V0dXBPcHRpb25zLCBTb2xPcHRpb25zLFxuICAgIFN0YXJ0T3B0aW9ucyxcbiAgICBTdG9wT3B0aW9ucyxcbiAgICBVc2VPcHRpb25zLCBXZWJPcHRpb25zLFxufSBmcm9tIFwiLi9vcHRpb25zXCI7XG5cbmltcG9ydCB7aW5mb0NvbW1hbmR9IGZyb20gXCIuL2luZm8uanNcIjtcbmltcG9ydCB7c3B5fSBmcm9tIFwiLi9zcHlcIjtcblxuY29uc3QgVVNFX0VYUEVSSU1FTlRBTF9GRUFUVVJFUyA9IGZhbHNlO1xuXG5jb25zdCBwcm9ncmFtID0gcmVxdWlyZSgnY29tbWFuZGVyJyk7XG5cblxuYXN5bmMgZnVuY3Rpb24gc2V0dXBDb21tYW5kKGRldjogRGV2LCBvcHRpb25zOiBTZXR1cE9wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYuc3RhcnQoY29tcGlsZXJzV2l0aE5ldHdvcmtzKGRldiwgb3B0aW9ucykpO1xufVxuXG5cbmFzeW5jIGZ1bmN0aW9uIHN0YXJ0Q29tbWFuZChkZXY6IERldiwgb3B0aW9uczogU3RhcnRPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnN0YXJ0KGNvbXBpbGVyc1dpdGhOZXR3b3JrcyhkZXYsIG9wdGlvbnMpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc3RvcENvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IFN0b3BPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnN0b3AoY29tcGlsZXJzV2l0aE5ldHdvcmtzKGRldiwgb3B0aW9ucykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZXN0YXJ0Q29tbWFuZChkZXY6IERldiwgb3B0aW9uczogUmVzdGFydE9wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYucmVzdGFydChjb21waWxlcnNXaXRoTmV0d29ya3MoZGV2LCBvcHRpb25zKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlY3JlYXRlQ29tbWFuZChkZXY6IERldiwgb3B0aW9uczogUmVjcmVhdGVPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnJlY3JlYXRlKGNvbXBpbGVyc1dpdGhOZXR3b3JrcyhkZXYsIG9wdGlvbnMpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY2xlYW5Db21tYW5kKGRldjogRGV2LCBvcHRpb25zOiBDbGVhbk9wdGlvbnMpIHtcbiAgICBjb25zdCBhbGwgPSAhb3B0aW9ucy5jb21waWxlcnMgJiYgIW9wdGlvbnMubmV0d29ya3M7XG4gICAgYXdhaXQgZGV2LmNsZWFuKG9wdGlvbnMuY29tcGlsZXJzIHx8IGFsbCwgb3B0aW9ucy5uZXR3b3JrcyB8fCBhbGwsIG9wdGlvbnMuY29udGFpbmVycyk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNldENvbW1hbmQoZGV2OiBEZXYsIG5hbWVzOiBzdHJpbmdbXSwgb3B0aW9uczogU2V0TmV0d29ya09wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYudXBkYXRlTmV0d29ya0NvbmZpZ3MoZGV2Lm5ldHdvcmtzT3JBbGwobmFtZXMpLCAoY29uZmlnOiBOZXR3b3JrQ29uZmlnKSA9PiB7XG4gICAgICAgIGlmIChvcHRpb25zLm5ld05hbWUpIHtcbiAgICAgICAgICAgIGNvbmZpZy5uYW1lID0gb3B0aW9ucy5uZXdOYW1lO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLnBvcnQpIHtcbiAgICAgICAgICAgIGNvbmZpZy5ob3N0UG9ydCA9IG9wdGlvbnMucG9ydDtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5kYlBvcnQpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmRiUG9ydCA9PT0gJ2JpbmQnKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLmFyYW5nb0hvc3RQb3J0ID0gTmV0d29yay5kZWZhdWx0QXJhbmdvUG9ydDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5kYlBvcnQgPT09ICd1bmJpbmQnKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLmFyYW5nb0hvc3RQb3J0ID0gJyc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbmZpZy5hcmFuZ29Ib3N0UG9ydCA9IG9wdGlvbnMuZGJQb3J0IHx8ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGFkZENvbW1hbmQoZGV2OiBEZXYsIG5hbWVzOiBzdHJpbmdbXSkge1xuICAgIGF3YWl0IGRldi5hZGROZXR3b3JrcyhuYW1lcyk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlbW92ZUNvbW1hbmQoZGV2OiBEZXYsIG5hbWVzOiBzdHJpbmdbXSkge1xuICAgIGF3YWl0IGRldi5yZW1vdmVOZXR3b3JrcyhkZXYubmV0d29ya3NGcm9tTmFtZXMobmFtZXMpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGVLZXlzQ29tbWFuZChfZGV2OiBEZXYpIHtcbiAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBUT05DbGllbnQuY3JlYXRlKHtcbiAgICAgICAgc2VydmVyczogWydodHRwOi8vbG9jYWxob3N0J10sXG4gICAgfSk7XG4gICAgY29uc3Qga2V5cyA9IGF3YWl0IGNsaWVudC5jcnlwdG8uZWQyNTUxOUtleXBhaXIoKTtcbiAgICBjb25zb2xlLmxvZyhrZXlzKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gdGVzdENvbW1hbmQoX2RldjogRGV2LCBzZXJ2ZXJzOiBzdHJpbmdbXSwgb3B0aW9uczogeyB2ZXJib3NlOiBib29sZWFuIH0pIHtcbiAgICBmb3IgKGNvbnN0IHNlcnZlciBvZiBzZXJ2ZXJzKSB7XG4gICAgICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IFRPTkNsaWVudC5jcmVhdGUoe1xuICAgICAgICAgICAgc2VydmVyczogW3NlcnZlcl0sXG4gICAgICAgICAgICBsb2dfdmVyYm9zZTogb3B0aW9ucy52ZXJib3NlLFxuICAgICAgICB9KTtcbiAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoYCR7c2VydmVyfSDigKYgYCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGF3YWl0IGNoZWNrTmV0d29yayhjbGllbnQpKTtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNvbnZlcnRBZGRyZXNzKF9kZXY6IERldiwgYWRkcikge1xuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IFRPTkNsaWVudC5jcmVhdGUoe1xuICAgICAgICBzZXJ2ZXJzOiBbJ2h0dHA6Ly9sb2NhbGhvc3QnXSxcbiAgICB9KTtcbiAgICBjb25zdCBzaG93Q29udmVydGVkID0gKHRpdGxlLCBjb252ZXJ0ZWQpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coYCR7Y29udmVydGVkLmFkZHJlc3MgPT09IGFkZHIgPyAn4pyTJyA6ICcgJ30gJHt0aXRsZX0gPSAke2NvbnZlcnRlZC5hZGRyZXNzfWApO1xuICAgIH07XG4gICAgY29uc3Qgc2hvd0hleCA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgY29udmVydGVkID0gYXdhaXQgY2xpZW50LmNvbnRyYWN0cy5jb252ZXJ0QWRkcmVzcyh7XG4gICAgICAgICAgICBhZGRyZXNzOiBhZGRyLFxuICAgICAgICAgICAgY29udmVydFRvOiAnSGV4JyxcbiAgICAgICAgfSk7XG4gICAgICAgIHNob3dDb252ZXJ0ZWQoJ2hleCcsIGNvbnZlcnRlZCk7XG4gICAgfTtcbiAgICBjb25zdCBzaG93QmFzZTY0ID0gYXN5bmMgKHRlc3QsIGJvdW5jZSwgdXJsKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnZlcnRlZCA9IGF3YWl0IGNsaWVudC5jb250cmFjdHMuY29udmVydEFkZHJlc3Moe1xuICAgICAgICAgICAgYWRkcmVzczogYWRkcixcbiAgICAgICAgICAgIGNvbnZlcnRUbzogJ0Jhc2U2NCcsXG4gICAgICAgICAgICBiYXNlNjRQYXJhbXM6IHtcbiAgICAgICAgICAgICAgICBib3VuY2UsXG4gICAgICAgICAgICAgICAgdGVzdCxcbiAgICAgICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZmxhZ3MgPSBbXG4gICAgICAgICAgICB0ZXN0ID8gJ3Rlc3QnIDogJ21haW4nLFxuICAgICAgICAgICAgYm91bmNlID8gJ2JvdW5jZScgOiAnJyxcbiAgICAgICAgICAgIHVybCA/ICd1cmwnIDogJycsXG4gICAgICAgIF1cbiAgICAgICAgICAgIC5maWx0ZXIoeCA9PiB4ICE9PSAnJylcbiAgICAgICAgICAgIC5qb2luKCcgJyk7XG4gICAgICAgIHNob3dDb252ZXJ0ZWQoZmxhZ3MsIGNvbnZlcnRlZCk7XG4gICAgfTtcbiAgICBhd2FpdCBzaG93SGV4KCk7XG4gICAgYXdhaXQgc2hvd0Jhc2U2NChmYWxzZSwgZmFsc2UsIGZhbHNlKTtcbiAgICBhd2FpdCBzaG93QmFzZTY0KGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XG4gICAgYXdhaXQgc2hvd0Jhc2U2NChmYWxzZSwgdHJ1ZSwgZmFsc2UpO1xuICAgIGF3YWl0IHNob3dCYXNlNjQoZmFsc2UsIHRydWUsIHRydWUpO1xuICAgIGF3YWl0IHNob3dCYXNlNjQodHJ1ZSwgZmFsc2UsIGZhbHNlKTtcbiAgICBhd2FpdCBzaG93QmFzZTY0KHRydWUsIGZhbHNlLCB0cnVlKTtcbiAgICBhd2FpdCBzaG93QmFzZTY0KHRydWUsIHRydWUsIGZhbHNlKTtcbiAgICBhd2FpdCBzaG93QmFzZTY0KHRydWUsIHRydWUsIHRydWUpO1xufVxuXG5hc3luYyBmdW5jdGlvbiB1c2VDb21tYW5kKGRldjogRGV2LCB2ZXJzaW9uOiBzdHJpbmcsIG9wdGlvbnM6IFVzZU9wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYudXNlVmVyc2lvbih2ZXJzaW9uLCBjb21waWxlcnNXaXRoTmV0d29ya3MoZGV2LCBvcHRpb25zKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNvbENvbW1hbmQoZGV2OiBEZXYsIGZpbGVzOiBzdHJpbmdbXSwgb3B0aW9uczogU29sT3B0aW9ucykge1xuICAgIGF3YWl0IFNvbGlkaXR5LmJ1aWxkKGRldiwgZmlsZXMsIHtcbiAgICAgICAgY2xpZW50TGFuZ3VhZ2VzOiAob3B0aW9ucy5jbGllbnRMYW5ndWFnZXMgfHwgJycpLnNwbGl0KCcsJyksXG4gICAgICAgIGNsaWVudExldmVsOiBvcHRpb25zLmNsaWVudExldmVsIHx8IENsaWVudENvZGVMZXZlbC5ydW4sXG4gICAgICAgIGpzTW9kdWxlOiBvcHRpb25zLmpzTW9kdWxlIHx8IEpTTW9kdWxlLm5vZGUsXG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdlbkNvbW1hbmQoZGV2OiBEZXYsIGZpbGVzOiBzdHJpbmdbXSwgb3B0aW9uczogU29sT3B0aW9ucykge1xuICAgIGF3YWl0IENsaWVudENvZGUuZ2VuZXJhdGUoZmlsZXMsIHtcbiAgICAgICAgY2xpZW50TGFuZ3VhZ2VzOiAob3B0aW9ucy5jbGllbnRMYW5ndWFnZXMgfHwgJycpLnNwbGl0KCcsJyksXG4gICAgICAgIGNsaWVudExldmVsOiBvcHRpb25zLmNsaWVudExldmVsIHx8IENsaWVudENvZGVMZXZlbC5ydW4sXG4gICAgICAgIGpzTW9kdWxlOiBvcHRpb25zLmpzTW9kdWxlIHx8IEpTTW9kdWxlLm5vZGUsXG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNweUNvbW1hbmQoZGV2OiBEZXYsIG5ldHdvcmtzOiBzdHJpbmdbXSkge1xuICAgIGF3YWl0IHNweShkZXYsIG5ldHdvcmtzKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gd2ViQ29uc29sZUNvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IFdlYk9wdGlvbnMpIHtcbiAgICBhd2FpdCB3ZWIoZGV2LCBvcHRpb25zKTtcbn1cblxuY29uc3Qgc2hhcmVkT3B0aW9ucyA9IHtcbiAgICBuOiBbJy1uLCAtLW5ldHdvcmtzIFtuYW1lc10nLCAnYXBwbHkgY29tbWFuZCB0byBzcGVjaWZpZWQgbmV0d29ya1tzXSAobmFtZXMgbXVzdCBiZSBzZXBhcmF0ZWQgd2l0aCBjb21tYSknXSxcbiAgICBtOiBbJy1tLCAtLWNvbXBpbGVycycsICdhcHBseSBjb21tYW5kIHRvIHRoZSBjb21waWxlcnMgY29udGFpbmVyJ10sXG59O1xuXG5hc3luYyBmdW5jdGlvbiBoYW5kbGVDb21tYW5kTGluZShkZXY6IERldiwgYXJnczogc3RyaW5nW10pIHtcbiAgICBsZXQgY29tbWFuZEFjdGlvbiA9IGluZm9Db21tYW5kO1xuICAgIGxldCBjb21tYW5kQXJncyA9IFtdO1xuXG4gICAgY29uc3QgY29tbWFuZCA9IChhY3Rpb24pID0+IHtcbiAgICAgICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICBjb21tYW5kQWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgY29tbWFuZEFyZ3MgPSBhcmdzO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5uYW1lKGRldi5uYW1lKVxuICAgICAgICAudmVyc2lvbihkZXYudmVyc2lvbilcbiAgICAgICAgLm9wdGlvbignLWEsIC0tYXZhaWxhYmxlJywgJ3Nob3cgYXZhaWxhYmxlIHZlcnNpb25zJylcbiAgICAgICAgLmRlc2NyaXB0aW9uKCdUT04gTGFicyBkZXZlbG9wbWVudCB0b29scycpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnaW5mbycsIHtpc0RlZmF1bHQ6IHRydWV9KS5kZXNjcmlwdGlvbignU2hvdyBzdW1tYXJ5IGFib3V0IGRldiBlbnZpcm9ubWVudCcpXG4gICAgICAgIC5vcHRpb24oJy1hLCAtLWF2YWlsYWJsZScsICdzaG93IGF2YWlsYWJsZSB2ZXJzaW9ucycpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChpbmZvQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnc29sIFtmaWxlcy4uLl0nKS5kZXNjcmlwdGlvbignQnVpbGQgc29saWRpdHkgY29udHJhY3Rbc10nKVxuICAgICAgICAub3B0aW9uKFxuICAgICAgICAgICAgJy1sLCAtLWNsaWVudC1sYW5ndWFnZXMgPGxhbmd1YWdlcz4nLFxuICAgICAgICAgICAgJ2dlbmVyYXRlIGNsaWVudCBjb2RlIGZvciBsYW5ndWFnZXM6IFwianNcIiwgXCJyc1wiIChtdWx0aXBsZSBsYW5ndWFnZXMgbXVzdCBiZSBzZXBhcmF0ZWQgd2l0aCBjb21tYSknLFxuICAgICAgICApXG4gICAgICAgIC5vcHRpb24oXG4gICAgICAgICAgICAnLUwsIC0tY2xpZW50LWxldmVsIDxjbGllbnQtbGV2ZWw+JyxcbiAgICAgICAgICAgICdjbGllbnQgY29kZSBsZXZlbDogXCJydW5cIiB0byBydW4gb25seSwgXCJkZXBsb3lcIiB0byBydW4gYW5kIGRlcGxveSAoaW5jbHVkZXMgYW4gaW1hZ2VCYXNlNjQgb2YgYmluYXJ5IGNvbnRyYWN0KScsXG4gICAgICAgICAgICAnZGVwbG95JyxcbiAgICAgICAgKVxuICAgICAgICAub3B0aW9uKFxuICAgICAgICAgICAgJy0tanMtbW9kdWxlIDxtb2R1bGUtdHlwZT4nLFxuICAgICAgICAgICAgXCJKYXZhIFNjcmlwdCBtb2R1bGUgdHlwZTogXCIgK1xuICAgICAgICAgICAgXCJgbm9kZWAgdG8gdXNlIHdpdGggYGNvbnN0IEZvb0NvbnRyYWN0ID0gcmVxdWlyZSgnZm9vYClgLCBcIiArXG4gICAgICAgICAgICBcImBub2RlTm9EZWZhdWx0YCB0byB1c2Ugd2l0aCBgY29uc3Qge0Zvb0NvbnRyYWN0fSA9IHJlcXVpcmUoJ2Zvb2ApYCwgXCIgK1xuICAgICAgICAgICAgXCJgZXNgIHRvIHVzZSB3aXRoIGBpbXBvcnQgRm9vQ29udHJhY3QgZnJvbSAnZm9vJ2AsIFwiICtcbiAgICAgICAgICAgIFwiYGVzTm9EZWZhdWx0YCB0byB1c2Ugd2l0aCBgaW1wb3J0IHtGb29Db250cmFjdH0gZnJvbSAnZm9vJ2AgKGBub2RlYCBpcyBhIGRlZmF1bHQgb3B0aW9uKVwiLFxuICAgICAgICAgICAgJ25vZGUnLFxuICAgICAgICApXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChzb2xDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdnZW4gW2ZpbGVzLi4uXScpLmRlc2NyaXB0aW9uKCdHZW5lcmF0ZSBjbGllbnQgY29kZSBmb3IgY29udHJhY3Rbc10nKVxuICAgICAgICAub3B0aW9uKFxuICAgICAgICAgICAgJy1sLCAtLWNsaWVudC1sYW5ndWFnZXMgPGxhbmd1YWdlcz4nLFxuICAgICAgICAgICAgJ2dlbmVyYXRlIGNsaWVudCBjb2RlIGZvciBsYW5ndWFnZXM6IFwianNcIiwgXCJyc1wiIChtdWx0aXBsZSBsYW5ndWFnZXMgbXVzdCBiZSBzZXBhcmF0ZWQgd2l0aCBjb21tYSknLFxuICAgICAgICApXG4gICAgICAgIC5vcHRpb24oXG4gICAgICAgICAgICAnLUwsIC0tY2xpZW50LWxldmVsIDxjbGllbnQtbGV2ZWw+JyxcbiAgICAgICAgICAgICdjbGllbnQgY29kZSBsZXZlbDogXCJydW5cIiB0byBydW4gb25seSwgXCJkZXBsb3lcIiB0byBydW4gYW5kIGRlcGxveSAoaW5jbHVkZXMgYW4gaW1hZ2VCYXNlNjQgb2YgYmluYXJ5IGNvbnRyYWN0KScsXG4gICAgICAgICAgICAnZGVwbG95JyxcbiAgICAgICAgKVxuICAgICAgICAub3B0aW9uKFxuICAgICAgICAgICAgJy0tanMtbW9kdWxlIDxtb2R1bGUtdHlwZT4nLFxuICAgICAgICAgICAgXCJKYXZhIFNjcmlwdCBtb2R1bGUgdHlwZTogXCIgK1xuICAgICAgICAgICAgXCJgbm9kZWAgdG8gdXNlIHdpdGggYGNvbnN0IEZvb0NvbnRyYWN0ID0gcmVxdWlyZSgnZm9vYClgLCBcIiArXG4gICAgICAgICAgICBcImBub2RlTm9EZWZhdWx0YCB0byB1c2Ugd2l0aCBgY29uc3Qge0Zvb0NvbnRyYWN0fSA9IHJlcXVpcmUoJ2Zvb2ApYCwgXCIgK1xuICAgICAgICAgICAgXCJgZXNgIHRvIHVzZSB3aXRoIGBpbXBvcnQgRm9vQ29udHJhY3QgZnJvbSAnZm9vJ2AsIFwiICtcbiAgICAgICAgICAgIFwiYGVzTm9EZWZhdWx0YCB0byB1c2Ugd2l0aCBgaW1wb3J0IHtGb29Db250cmFjdH0gZnJvbSAnZm9vJ2AgKGBub2RlYCBpcyBhIGRlZmF1bHQgb3B0aW9uKVwiLFxuICAgICAgICAgICAgJ25vZGUnLFxuICAgICAgICApXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChnZW5Db21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdzdGFydCcpLmRlc2NyaXB0aW9uKCdTdGFydCBkZXYgY29udGFpbmVycycpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHN0YXJ0Q29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnc3RvcCcpLmRlc2NyaXB0aW9uKCdTdG9wIGRldiBjb250YWluZXJzJylcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm4pXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5tKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoc3RvcENvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3Jlc3RhcnQnKS5kZXNjcmlwdGlvbignUmVzdGFydCBkZXYgY29udGFpbmVycycpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHJlc3RhcnRDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdyZWNyZWF0ZScpLmRlc2NyaXB0aW9uKCdSZWNyZWF0ZSBkZXYgY29udGFpbmVycycpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHJlY3JlYXRlQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnc2V0dXAnKS5kZXNjcmlwdGlvbignU2V0dXAgZGV2IGVudmlyb25tZW50JylcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm4pXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5tKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoc2V0dXBDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdjbGVhbicpLmRlc2NyaXB0aW9uKCdSZW1vdmUgZG9ja2VyIGNvbnRhaW5lcnMgYW5kIGltYWdlcyByZWxhdGVkIHRvIFRPTiBEZXYnKVxuICAgICAgICAub3B0aW9uKCctbiwgLS1uZXR3b3JrcycsICdjbGVhbiBsb2NhbCBub2RlIGRvY2tlciBjb250YWluZXJzIGFuZCBpbWFnZXMnKVxuICAgICAgICAub3B0aW9uKCctbSwgLS1jb21waWxlcnMnLCAnY2xlYW4gY29tcGlsZXJzIGRvY2tlciBjb250YWluZXJzIGFuZCBpbWFnZXMnKVxuICAgICAgICAub3B0aW9uKCctYywgLS1jb250YWluZXJzJywgJ2NsZWFuIGNvbnRhaW5lcnMgb25seScsIGZhbHNlKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoY2xlYW5Db21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCd1c2UgPHZlcnNpb24+JykuZGVzY3JpcHRpb24oJ1VzZSBzcGVjaWZpZWQgdmVyc2lvbiBmb3IgY29udGFpbmVycycpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHVzZUNvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3NldCBbbmV0d29yay4uLl0nKS5kZXNjcmlwdGlvbignU2V0IG5ldHdvcmtbc10gb3B0aW9ucycpXG4gICAgICAgIC5vcHRpb24oJy1wLCAtLXBvcnQgPHBvcnQ+JywgJ2hvc3QgcG9ydCB0byBib3VuZCBsb2NhbCBub2RlJylcbiAgICAgICAgLm9wdGlvbihcbiAgICAgICAgICAgICctZCwgLS1kYi1wb3J0IDxiaW5kaW5nPicsXG4gICAgICAgICAgICAnaG9zdCBwb3J0IHRvIGJvdW5kIGxvY2FsIG5vZGVzIEFyYW5nbyBEQiAoXCJiaW5kXCIgdG8gdXNlIGRlZmF1bHQgQXJhbmdvIERCIHBvcnQsIFwidW5iaW5kXCIgdG8gdW5iaW5kIEFyYW5nbyBEQiBwb3J0KScsXG4gICAgICAgIClcbiAgICAgICAgLm9wdGlvbignLW4sIC0tbmV3LW5hbWUgPG5hbWU+JywgJ3NldCBuZXcgbmFtZSBmb3IgbmV0d29yaycpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChzZXRDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdhZGQgW25ldHdvcmsuLi5dJykuZGVzY3JpcHRpb24oJ0FkZCBuZXR3b3JrW3NdJylcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKGFkZENvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3JlbW92ZSBbbmV0d29yay4uLl0nKS5hbGlhcygncm0nKS5kZXNjcmlwdGlvbignUmVtb3ZlIG5ldHdvcmtbc10nKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQocmVtb3ZlQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgndGVzdCBbc2VydmVycy4uLl0nKS5hbGlhcygndCcpLmRlc2NyaXB0aW9uKCdUZXN0IG5ldHdvcmtbc10nKVxuICAgICAgICAub3B0aW9uKCctdiwgLS12ZXJib3NlJywgJ3Nob3cgdmVyYm9zZSB0ZXN0IGxvZycsIGZhbHNlKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQodGVzdENvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ2tleXMnKS5hbGlhcygnaycpLmRlc2NyaXB0aW9uKCdHZW5lcmF0ZSByYW5kb20gS2V5IFBhaXInKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoZ2VuZXJhdGVLZXlzQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnYWRkciA8YWRkcj4nKS5hbGlhcygnYScpLmRlc2NyaXB0aW9uKCdDb252ZXJ0IGFkZHJlc3MnKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoY29udmVydEFkZHJlc3MpKTtcblxuICAgIGlmIChVU0VfRVhQRVJJTUVOVEFMX0ZFQVRVUkVTKSB7XG4gICAgICAgIHByb2dyYW1cbiAgICAgICAgICAgIC5jb21tYW5kKCdzcHkgW25ldHdvcmtzLi4uXScpLmRlc2NyaXB0aW9uKCdSdW4gbmV0d29yayBzY2FubmVyJylcbiAgICAgICAgICAgIC5hY3Rpb24oY29tbWFuZChzcHlDb21tYW5kKSk7XG5cbiAgICAgICAgcHJvZ3JhbVxuICAgICAgICAgICAgLmNvbW1hbmQoJ3dlYicpLmRlc2NyaXB0aW9uKCdSdW4gd2ViIGNvbnNvbGUnKVxuICAgICAgICAgICAgLm9wdGlvbignLXAsIC0tcG9ydCA8cG9ydD4nLCAnaG9zdCBwb3J0IHRvIGJvdW5kIHdlYiBjb25zb2xlIChkZWZhdWx0OiA4ODAwKScsICc4ODAwJylcbiAgICAgICAgICAgIC5hY3Rpb24oY29tbWFuZCh3ZWJDb25zb2xlQ29tbWFuZCkpO1xuICAgIH1cblxuICAgIC8vIC5jb21tYW5kKCd1cGRhdGUnLCBgdXBkYXRlICR7ZGV2Lm5hbWV9IGRvY2tlciBpbWFnZXNgKS5hY3Rpb24oYWN0aW9uKVxuXG4gICAgcHJvZ3JhbS5wYXJzZShhcmdzKTtcblxuICAgIGlmIChjb21tYW5kQXJncy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgaWYgKHByb2dyYW0uYXJncy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGF3YWl0IGluZm9Db21tYW5kKGRldiwgcHJvZ3JhbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9ncmFtLm91dHB1dEhlbHAoKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChjb21tYW5kQWN0aW9uID09PSBpbmZvQ29tbWFuZCkge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGNvbW1hbmRBcmdzW2NvbW1hbmRBcmdzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgb3B0aW9ucy5hdmFpbGFibGUgPSBvcHRpb25zLnBhcmVudC5hdmFpbGFibGU7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgY29tbWFuZEFjdGlvbihkZXYsIC4uLmNvbW1hbmRBcmdzKTtcbiAgICB9XG59XG5cbmV4cG9ydCB7aGFuZGxlQ29tbWFuZExpbmV9O1xuIl19