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
    var client, showConverted, showHex, showBase64;
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

            showConverted = function showConverted(title, converted) {
              console.log("".concat(converted.address === addr ? '✓' : ' ', " ").concat(title, " = ").concat(converted.address));
            };

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
                        showConverted('hex', converted);

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
              _regenerator["default"].mark(function _callee12(test, bounce, url) {
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
                        flags = [test ? 'test' : 'main', bounce ? 'bounce' : '', url ? 'url' : ''].filter(function (x) {
                          return x !== '';
                        }).join(' ');
                        showConverted(flags, converted);

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

            _context13.next = 8;
            return showHex();

          case 8:
            _context13.next = 10;
            return showBase64(false, false, false);

          case 10:
            _context13.next = 12;
            return showBase64(false, false, true);

          case 12:
            _context13.next = 14;
            return showBase64(false, true, false);

          case 14:
            _context13.next = 16;
            return showBase64(false, true, true);

          case 16:
            _context13.next = 18;
            return showBase64(true, false, false);

          case 18:
            _context13.next = 20;
            return showBase64(true, false, true);

          case 20:
            _context13.next = 22;
            return showBase64(true, true, false);

          case 22:
            _context13.next = 24;
            return showBase64(true, true, true);

          case 24:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvY2xpLmpzIl0sIm5hbWVzIjpbIlVTRV9FWFBFUklNRU5UQUxfRkVBVFVSRVMiLCJwcm9ncmFtIiwicmVxdWlyZSIsInNldHVwQ29tbWFuZCIsImRldiIsIm9wdGlvbnMiLCJzdGFydCIsInN0YXJ0Q29tbWFuZCIsInN0b3BDb21tYW5kIiwic3RvcCIsInJlc3RhcnRDb21tYW5kIiwicmVzdGFydCIsInJlY3JlYXRlQ29tbWFuZCIsInJlY3JlYXRlIiwiY2xlYW5Db21tYW5kIiwiYWxsIiwiY29tcGlsZXJzIiwibmV0d29ya3MiLCJjbGVhbiIsImNvbnRhaW5lcnMiLCJzZXRDb21tYW5kIiwibmFtZXMiLCJ1cGRhdGVOZXR3b3JrQ29uZmlncyIsIm5ldHdvcmtzT3JBbGwiLCJjb25maWciLCJuZXdOYW1lIiwibmFtZSIsInBvcnQiLCJob3N0UG9ydCIsImRiUG9ydCIsImFyYW5nb0hvc3RQb3J0IiwiTmV0d29yayIsImRlZmF1bHRBcmFuZ29Qb3J0IiwiYWRkQ29tbWFuZCIsImFkZE5ldHdvcmtzIiwicmVtb3ZlQ29tbWFuZCIsInJlbW92ZU5ldHdvcmtzIiwibmV0d29ya3NGcm9tTmFtZXMiLCJnZW5lcmF0ZUtleXNDb21tYW5kIiwiX2RldiIsIlRPTkNsaWVudCIsImNyZWF0ZSIsInNlcnZlcnMiLCJjbGllbnQiLCJjcnlwdG8iLCJlZDI1NTE5S2V5cGFpciIsImtleXMiLCJjb25zb2xlIiwibG9nIiwiY29udmVydEFkZHJlc3MiLCJhZGRyIiwic2hvd0NvbnZlcnRlZCIsInRpdGxlIiwiY29udmVydGVkIiwiYWRkcmVzcyIsInNob3dIZXgiLCJjb250cmFjdHMiLCJjb252ZXJ0VG8iLCJzaG93QmFzZTY0IiwidGVzdCIsImJvdW5jZSIsInVybCIsImJhc2U2NFBhcmFtcyIsImZsYWdzIiwiZmlsdGVyIiwieCIsImpvaW4iLCJ1c2VDb21tYW5kIiwidmVyc2lvbiIsInVzZVZlcnNpb24iLCJzb2xDb21tYW5kIiwiZmlsZXMiLCJTb2xpZGl0eSIsImJ1aWxkIiwiY2xpZW50TGFuZ3VhZ2VzIiwic3BsaXQiLCJjbGllbnRMZXZlbCIsIkNsaWVudENvZGVMZXZlbCIsInJ1biIsImpzTW9kdWxlIiwiSlNNb2R1bGUiLCJub2RlIiwiZ2VuQ29tbWFuZCIsIkNsaWVudENvZGUiLCJnZW5lcmF0ZSIsInNweUNvbW1hbmQiLCJ3ZWJDb25zb2xlQ29tbWFuZCIsInNoYXJlZE9wdGlvbnMiLCJuIiwibSIsImhhbmRsZUNvbW1hbmRMaW5lIiwiYXJncyIsImNvbW1hbmRBY3Rpb24iLCJpbmZvQ29tbWFuZCIsImNvbW1hbmRBcmdzIiwiY29tbWFuZCIsImFjdGlvbiIsIm9wdGlvbiIsImRlc2NyaXB0aW9uIiwiaXNEZWZhdWx0IiwiYWxpYXMiLCJwYXJzZSIsImxlbmd0aCIsIm91dHB1dEhlbHAiLCJhdmFpbGFibGUiLCJwYXJlbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQWdCQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFXQTs7QUFDQTs7QUFuQ0E7Ozs7Ozs7Ozs7Ozs7O0FBcUNBLElBQU1BLHlCQUF5QixHQUFHLEtBQWxDOztBQUVBLElBQU1DLE9BQU8sR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBdkI7O1NBR2VDLFk7Ozs7Ozs7K0JBQWYsaUJBQTRCQyxHQUE1QixFQUFzQ0MsT0FBdEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQ1VELEdBQUcsQ0FBQ0UsS0FBSixDQUFVLG9DQUFzQkYsR0FBdEIsRUFBMkJDLE9BQTNCLENBQVYsQ0FEVjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O1NBS2VFLFk7Ozs7Ozs7K0JBQWYsa0JBQTRCSCxHQUE1QixFQUFzQ0MsT0FBdEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQ1VELEdBQUcsQ0FBQ0UsS0FBSixDQUFVLG9DQUFzQkYsR0FBdEIsRUFBMkJDLE9BQTNCLENBQVYsQ0FEVjs7QUFBQTtBQUFB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QUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOC0yMDE5IFRPTiBERVYgU09MVVRJT05TIExURC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgU09GVFdBUkUgRVZBTFVBVElPTiBMaWNlbnNlICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbiAqIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxuICogTGljZW5zZSBhdDogaHR0cHM6Ly93d3cudG9uLmRldi9saWNlbnNlc1xuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgVE9OIERFViBzb2Z0d2FyZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbi8vIEBmbG93XG5cbmltcG9ydCB7VE9OQ2xpZW50fSBmcm9tIFwidG9uLWNsaWVudC1ub2RlLWpzXCI7XG5pbXBvcnQge0NsaWVudENvZGUsIENsaWVudENvZGVMZXZlbCwgSlNNb2R1bGV9IGZyb20gXCIuLi9jb21waWxlcnMvY2xpZW50LWNvZGVcIjtcbmltcG9ydCB7U29saWRpdHl9IGZyb20gXCIuLi9jb21waWxlcnMvc29saWRpdHlcIjtcbmltcG9ydCB7RGV2fSBmcm9tIFwiLi4vZGV2XCI7XG5pbXBvcnQge05ldHdvcmt9IGZyb20gXCIuLi9uZXR3b3Jrcy9uZXR3b3Jrc1wiO1xuaW1wb3J0IHR5cGUge05ldHdvcmtDb25maWd9IGZyb20gXCIuLi9uZXR3b3Jrcy9uZXR3b3Jrc1wiO1xuaW1wb3J0IHt3ZWJ9IGZyb20gXCIuLi9zZXJ2ZXIvc2VydmVyXCI7XG5pbXBvcnQge2NvbXBpbGVyc1dpdGhOZXR3b3Jrc30gZnJvbSBcIi4vb3B0aW9uc1wiO1xuaW1wb3J0IHR5cGUge1xuICAgIENsZWFuT3B0aW9ucyxcbiAgICBSZWNyZWF0ZU9wdGlvbnMsXG4gICAgUmVzdGFydE9wdGlvbnMsIFNldE5ldHdvcmtPcHRpb25zLFxuICAgIFNldHVwT3B0aW9ucywgU29sT3B0aW9ucyxcbiAgICBTdGFydE9wdGlvbnMsXG4gICAgU3RvcE9wdGlvbnMsXG4gICAgVXNlT3B0aW9ucywgV2ViT3B0aW9ucyxcbn0gZnJvbSBcIi4vb3B0aW9uc1wiO1xuXG5pbXBvcnQge2luZm9Db21tYW5kfSBmcm9tIFwiLi9pbmZvLmpzXCI7XG5pbXBvcnQge3NweX0gZnJvbSBcIi4vc3B5XCI7XG5cbmNvbnN0IFVTRV9FWFBFUklNRU5UQUxfRkVBVFVSRVMgPSBmYWxzZTtcblxuY29uc3QgcHJvZ3JhbSA9IHJlcXVpcmUoJ2NvbW1hbmRlcicpO1xuXG5cbmFzeW5jIGZ1bmN0aW9uIHNldHVwQ29tbWFuZChkZXY6IERldiwgb3B0aW9uczogU2V0dXBPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnN0YXJ0KGNvbXBpbGVyc1dpdGhOZXR3b3JrcyhkZXYsIG9wdGlvbnMpKTtcbn1cblxuXG5hc3luYyBmdW5jdGlvbiBzdGFydENvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IFN0YXJ0T3B0aW9ucykge1xuICAgIGF3YWl0IGRldi5zdGFydChjb21waWxlcnNXaXRoTmV0d29ya3MoZGV2LCBvcHRpb25zKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHN0b3BDb21tYW5kKGRldjogRGV2LCBvcHRpb25zOiBTdG9wT3B0aW9ucykge1xuICAgIGF3YWl0IGRldi5zdG9wKGNvbXBpbGVyc1dpdGhOZXR3b3JrcyhkZXYsIG9wdGlvbnMpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVzdGFydENvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IFJlc3RhcnRPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnJlc3RhcnQoY29tcGlsZXJzV2l0aE5ldHdvcmtzKGRldiwgb3B0aW9ucykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZWNyZWF0ZUNvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IFJlY3JlYXRlT3B0aW9ucykge1xuICAgIGF3YWl0IGRldi5yZWNyZWF0ZShjb21waWxlcnNXaXRoTmV0d29ya3MoZGV2LCBvcHRpb25zKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNsZWFuQ29tbWFuZChkZXY6IERldiwgb3B0aW9uczogQ2xlYW5PcHRpb25zKSB7XG4gICAgY29uc3QgYWxsID0gIW9wdGlvbnMuY29tcGlsZXJzICYmICFvcHRpb25zLm5ldHdvcmtzO1xuICAgIGF3YWl0IGRldi5jbGVhbihvcHRpb25zLmNvbXBpbGVycyB8fCBhbGwsIG9wdGlvbnMubmV0d29ya3MgfHwgYWxsLCBvcHRpb25zLmNvbnRhaW5lcnMpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzZXRDb21tYW5kKGRldjogRGV2LCBuYW1lczogc3RyaW5nW10sIG9wdGlvbnM6IFNldE5ldHdvcmtPcHRpb25zKSB7XG4gICAgYXdhaXQgZGV2LnVwZGF0ZU5ldHdvcmtDb25maWdzKGRldi5uZXR3b3Jrc09yQWxsKG5hbWVzKSwgKGNvbmZpZzogTmV0d29ya0NvbmZpZykgPT4ge1xuICAgICAgICBpZiAob3B0aW9ucy5uZXdOYW1lKSB7XG4gICAgICAgICAgICBjb25maWcubmFtZSA9IG9wdGlvbnMubmV3TmFtZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5wb3J0KSB7XG4gICAgICAgICAgICBjb25maWcuaG9zdFBvcnQgPSBvcHRpb25zLnBvcnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuZGJQb3J0KSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5kYlBvcnQgPT09ICdiaW5kJykge1xuICAgICAgICAgICAgICAgIGNvbmZpZy5hcmFuZ29Ib3N0UG9ydCA9IE5ldHdvcmsuZGVmYXVsdEFyYW5nb1BvcnQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZGJQb3J0ID09PSAndW5iaW5kJykge1xuICAgICAgICAgICAgICAgIGNvbmZpZy5hcmFuZ29Ib3N0UG9ydCA9ICcnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25maWcuYXJhbmdvSG9zdFBvcnQgPSBvcHRpb25zLmRiUG9ydCB8fCAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBhZGRDb21tYW5kKGRldjogRGV2LCBuYW1lczogc3RyaW5nW10pIHtcbiAgICBhd2FpdCBkZXYuYWRkTmV0d29ya3MobmFtZXMpO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZW1vdmVDb21tYW5kKGRldjogRGV2LCBuYW1lczogc3RyaW5nW10pIHtcbiAgICBhd2FpdCBkZXYucmVtb3ZlTmV0d29ya3MoZGV2Lm5ldHdvcmtzRnJvbU5hbWVzKG5hbWVzKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdlbmVyYXRlS2V5c0NvbW1hbmQoX2RldjogRGV2KSB7XG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgVE9OQ2xpZW50LmNyZWF0ZSh7XG4gICAgICAgIHNlcnZlcnM6IFsnaHR0cDovL2xvY2FsaG9zdCddLFxuICAgIH0pO1xuICAgIGNvbnN0IGtleXMgPSBhd2FpdCBjbGllbnQuY3J5cHRvLmVkMjU1MTlLZXlwYWlyKCk7XG4gICAgY29uc29sZS5sb2coa2V5cyk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNvbnZlcnRBZGRyZXNzKF9kZXY6IERldiwgYWRkcikge1xuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IFRPTkNsaWVudC5jcmVhdGUoe1xuICAgICAgICBzZXJ2ZXJzOiBbJ2h0dHA6Ly9sb2NhbGhvc3QnXSxcbiAgICB9KTtcbiAgICBjb25zdCBzaG93Q29udmVydGVkID0gKHRpdGxlLCBjb252ZXJ0ZWQpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coYCR7Y29udmVydGVkLmFkZHJlc3MgPT09IGFkZHIgPyAn4pyTJyA6ICcgJ30gJHt0aXRsZX0gPSAke2NvbnZlcnRlZC5hZGRyZXNzfWApO1xuICAgIH07XG4gICAgY29uc3Qgc2hvd0hleCA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgY29udmVydGVkID0gYXdhaXQgY2xpZW50LmNvbnRyYWN0cy5jb252ZXJ0QWRkcmVzcyh7XG4gICAgICAgICAgICBhZGRyZXNzOiBhZGRyLFxuICAgICAgICAgICAgY29udmVydFRvOiAnSGV4JyxcbiAgICAgICAgfSk7XG4gICAgICAgIHNob3dDb252ZXJ0ZWQoJ2hleCcsIGNvbnZlcnRlZCk7XG4gICAgfTtcbiAgICBjb25zdCBzaG93QmFzZTY0ID0gYXN5bmMgKHRlc3QsIGJvdW5jZSwgdXJsKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnZlcnRlZCA9IGF3YWl0IGNsaWVudC5jb250cmFjdHMuY29udmVydEFkZHJlc3Moe1xuICAgICAgICAgICAgYWRkcmVzczogYWRkcixcbiAgICAgICAgICAgIGNvbnZlcnRUbzogJ0Jhc2U2NCcsXG4gICAgICAgICAgICBiYXNlNjRQYXJhbXM6IHtcbiAgICAgICAgICAgICAgICBib3VuY2UsXG4gICAgICAgICAgICAgICAgdGVzdCxcbiAgICAgICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZmxhZ3MgPSBbXG4gICAgICAgICAgICB0ZXN0ID8gJ3Rlc3QnIDogJ21haW4nLFxuICAgICAgICAgICAgYm91bmNlID8gJ2JvdW5jZScgOiAnJyxcbiAgICAgICAgICAgIHVybCA/ICd1cmwnIDogJycsXG4gICAgICAgIF1cbiAgICAgICAgICAgIC5maWx0ZXIoeCA9PiB4ICE9PSAnJylcbiAgICAgICAgICAgIC5qb2luKCcgJyk7XG4gICAgICAgIHNob3dDb252ZXJ0ZWQoZmxhZ3MsIGNvbnZlcnRlZCk7XG4gICAgfTtcbiAgICBhd2FpdCBzaG93SGV4KCk7XG4gICAgYXdhaXQgc2hvd0Jhc2U2NChmYWxzZSwgZmFsc2UsIGZhbHNlKTtcbiAgICBhd2FpdCBzaG93QmFzZTY0KGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XG4gICAgYXdhaXQgc2hvd0Jhc2U2NChmYWxzZSwgdHJ1ZSwgZmFsc2UpO1xuICAgIGF3YWl0IHNob3dCYXNlNjQoZmFsc2UsIHRydWUsIHRydWUpO1xuICAgIGF3YWl0IHNob3dCYXNlNjQodHJ1ZSwgZmFsc2UsIGZhbHNlKTtcbiAgICBhd2FpdCBzaG93QmFzZTY0KHRydWUsIGZhbHNlLCB0cnVlKTtcbiAgICBhd2FpdCBzaG93QmFzZTY0KHRydWUsIHRydWUsIGZhbHNlKTtcbiAgICBhd2FpdCBzaG93QmFzZTY0KHRydWUsIHRydWUsIHRydWUpO1xufVxuXG5hc3luYyBmdW5jdGlvbiB1c2VDb21tYW5kKGRldjogRGV2LCB2ZXJzaW9uOiBzdHJpbmcsIG9wdGlvbnM6IFVzZU9wdGlvbnMpIHtcbiAgICBhd2FpdCBkZXYudXNlVmVyc2lvbih2ZXJzaW9uLCBjb21waWxlcnNXaXRoTmV0d29ya3MoZGV2LCBvcHRpb25zKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNvbENvbW1hbmQoZGV2OiBEZXYsIGZpbGVzOiBzdHJpbmdbXSwgb3B0aW9uczogU29sT3B0aW9ucykge1xuICAgIGF3YWl0IFNvbGlkaXR5LmJ1aWxkKGRldiwgZmlsZXMsIHtcbiAgICAgICAgY2xpZW50TGFuZ3VhZ2VzOiAob3B0aW9ucy5jbGllbnRMYW5ndWFnZXMgfHwgJycpLnNwbGl0KCcsJyksXG4gICAgICAgIGNsaWVudExldmVsOiBvcHRpb25zLmNsaWVudExldmVsIHx8IENsaWVudENvZGVMZXZlbC5ydW4sXG4gICAgICAgIGpzTW9kdWxlOiBvcHRpb25zLmpzTW9kdWxlIHx8IEpTTW9kdWxlLm5vZGUsXG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdlbkNvbW1hbmQoZGV2OiBEZXYsIGZpbGVzOiBzdHJpbmdbXSwgb3B0aW9uczogU29sT3B0aW9ucykge1xuICAgIGF3YWl0IENsaWVudENvZGUuZ2VuZXJhdGUoZmlsZXMsIHtcbiAgICAgICAgY2xpZW50TGFuZ3VhZ2VzOiAob3B0aW9ucy5jbGllbnRMYW5ndWFnZXMgfHwgJycpLnNwbGl0KCcsJyksXG4gICAgICAgIGNsaWVudExldmVsOiBvcHRpb25zLmNsaWVudExldmVsIHx8IENsaWVudENvZGVMZXZlbC5ydW4sXG4gICAgICAgIGpzTW9kdWxlOiBvcHRpb25zLmpzTW9kdWxlIHx8IEpTTW9kdWxlLm5vZGUsXG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNweUNvbW1hbmQoZGV2OiBEZXYsIG5ldHdvcmtzOiBzdHJpbmdbXSkge1xuICAgIGF3YWl0IHNweShkZXYsIG5ldHdvcmtzKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gd2ViQ29uc29sZUNvbW1hbmQoZGV2OiBEZXYsIG9wdGlvbnM6IFdlYk9wdGlvbnMpIHtcbiAgICBhd2FpdCB3ZWIoZGV2LCBvcHRpb25zKTtcbn1cblxuY29uc3Qgc2hhcmVkT3B0aW9ucyA9IHtcbiAgICBuOiBbJy1uLCAtLW5ldHdvcmtzIFtuYW1lc10nLCAnYXBwbHkgY29tbWFuZCB0byBzcGVjaWZpZWQgbmV0d29ya1tzXSAobmFtZXMgbXVzdCBiZSBzZXBhcmF0ZWQgd2l0aCBjb21tYSknXSxcbiAgICBtOiBbJy1tLCAtLWNvbXBpbGVycycsICdhcHBseSBjb21tYW5kIHRvIHRoZSBjb21waWxlcnMgY29udGFpbmVyJ10sXG59O1xuXG5hc3luYyBmdW5jdGlvbiBoYW5kbGVDb21tYW5kTGluZShkZXY6IERldiwgYXJnczogc3RyaW5nW10pIHtcbiAgICBsZXQgY29tbWFuZEFjdGlvbiA9IGluZm9Db21tYW5kO1xuICAgIGxldCBjb21tYW5kQXJncyA9IFtdO1xuXG4gICAgY29uc3QgY29tbWFuZCA9IChhY3Rpb24pID0+IHtcbiAgICAgICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICBjb21tYW5kQWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgY29tbWFuZEFyZ3MgPSBhcmdzO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5uYW1lKGRldi5uYW1lKVxuICAgICAgICAudmVyc2lvbihkZXYudmVyc2lvbilcbiAgICAgICAgLm9wdGlvbignLWEsIC0tYXZhaWxhYmxlJywgJ3Nob3cgYXZhaWxhYmxlIHZlcnNpb25zJylcbiAgICAgICAgLmRlc2NyaXB0aW9uKCdUT04gTGFicyBkZXZlbG9wbWVudCB0b29scycpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnaW5mbycsIHtpc0RlZmF1bHQ6IHRydWV9KS5kZXNjcmlwdGlvbignU2hvdyBzdW1tYXJ5IGFib3V0IGRldiBlbnZpcm9ubWVudCcpXG4gICAgICAgIC5vcHRpb24oJy1hLCAtLWF2YWlsYWJsZScsICdzaG93IGF2YWlsYWJsZSB2ZXJzaW9ucycpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChpbmZvQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnc29sIFtmaWxlcy4uLl0nKS5kZXNjcmlwdGlvbignQnVpbGQgc29saWRpdHkgY29udHJhY3Rbc10nKVxuICAgICAgICAub3B0aW9uKFxuICAgICAgICAgICAgJy1sLCAtLWNsaWVudC1sYW5ndWFnZXMgPGxhbmd1YWdlcz4nLFxuICAgICAgICAgICAgJ2dlbmVyYXRlIGNsaWVudCBjb2RlIGZvciBsYW5ndWFnZXM6IFwianNcIiwgXCJyc1wiIChtdWx0aXBsZSBsYW5ndWFnZXMgbXVzdCBiZSBzZXBhcmF0ZWQgd2l0aCBjb21tYSknLFxuICAgICAgICApXG4gICAgICAgIC5vcHRpb24oXG4gICAgICAgICAgICAnLUwsIC0tY2xpZW50LWxldmVsIDxjbGllbnQtbGV2ZWw+JyxcbiAgICAgICAgICAgICdjbGllbnQgY29kZSBsZXZlbDogXCJydW5cIiB0byBydW4gb25seSwgXCJkZXBsb3lcIiB0byBydW4gYW5kIGRlcGxveSAoaW5jbHVkZXMgYW4gaW1hZ2VCYXNlNjQgb2YgYmluYXJ5IGNvbnRyYWN0KScsXG4gICAgICAgICAgICAnZGVwbG95JyxcbiAgICAgICAgKVxuICAgICAgICAub3B0aW9uKFxuICAgICAgICAgICAgJy0tanMtbW9kdWxlIDxtb2R1bGUtdHlwZT4nLFxuICAgICAgICAgICAgXCJKYXZhIFNjcmlwdCBtb2R1bGUgdHlwZTogXCIgK1xuICAgICAgICAgICAgXCJgbm9kZWAgdG8gdXNlIHdpdGggYGNvbnN0IEZvb0NvbnRyYWN0ID0gcmVxdWlyZSgnZm9vYClgLCBcIiArXG4gICAgICAgICAgICBcImBub2RlTm9EZWZhdWx0YCB0byB1c2Ugd2l0aCBgY29uc3Qge0Zvb0NvbnRyYWN0fSA9IHJlcXVpcmUoJ2Zvb2ApYCwgXCIgK1xuICAgICAgICAgICAgXCJgZXNgIHRvIHVzZSB3aXRoIGBpbXBvcnQgRm9vQ29udHJhY3QgZnJvbSAnZm9vJ2AsIFwiICtcbiAgICAgICAgICAgIFwiYGVzTm9EZWZhdWx0YCB0byB1c2Ugd2l0aCBgaW1wb3J0IHtGb29Db250cmFjdH0gZnJvbSAnZm9vJ2AgKGBub2RlYCBpcyBhIGRlZmF1bHQgb3B0aW9uKVwiLFxuICAgICAgICAgICAgJ25vZGUnLFxuICAgICAgICApXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChzb2xDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdnZW4gW2ZpbGVzLi4uXScpLmRlc2NyaXB0aW9uKCdHZW5lcmF0ZSBjbGllbnQgY29kZSBmb3IgY29udHJhY3Rbc10nKVxuICAgICAgICAub3B0aW9uKFxuICAgICAgICAgICAgJy1sLCAtLWNsaWVudC1sYW5ndWFnZXMgPGxhbmd1YWdlcz4nLFxuICAgICAgICAgICAgJ2dlbmVyYXRlIGNsaWVudCBjb2RlIGZvciBsYW5ndWFnZXM6IFwianNcIiwgXCJyc1wiIChtdWx0aXBsZSBsYW5ndWFnZXMgbXVzdCBiZSBzZXBhcmF0ZWQgd2l0aCBjb21tYSknLFxuICAgICAgICApXG4gICAgICAgIC5vcHRpb24oXG4gICAgICAgICAgICAnLUwsIC0tY2xpZW50LWxldmVsIDxjbGllbnQtbGV2ZWw+JyxcbiAgICAgICAgICAgICdjbGllbnQgY29kZSBsZXZlbDogXCJydW5cIiB0byBydW4gb25seSwgXCJkZXBsb3lcIiB0byBydW4gYW5kIGRlcGxveSAoaW5jbHVkZXMgYW4gaW1hZ2VCYXNlNjQgb2YgYmluYXJ5IGNvbnRyYWN0KScsXG4gICAgICAgICAgICAnZGVwbG95JyxcbiAgICAgICAgKVxuICAgICAgICAub3B0aW9uKFxuICAgICAgICAgICAgJy0tanMtbW9kdWxlIDxtb2R1bGUtdHlwZT4nLFxuICAgICAgICAgICAgXCJKYXZhIFNjcmlwdCBtb2R1bGUgdHlwZTogXCIgK1xuICAgICAgICAgICAgXCJgbm9kZWAgdG8gdXNlIHdpdGggYGNvbnN0IEZvb0NvbnRyYWN0ID0gcmVxdWlyZSgnZm9vYClgLCBcIiArXG4gICAgICAgICAgICBcImBub2RlTm9EZWZhdWx0YCB0byB1c2Ugd2l0aCBgY29uc3Qge0Zvb0NvbnRyYWN0fSA9IHJlcXVpcmUoJ2Zvb2ApYCwgXCIgK1xuICAgICAgICAgICAgXCJgZXNgIHRvIHVzZSB3aXRoIGBpbXBvcnQgRm9vQ29udHJhY3QgZnJvbSAnZm9vJ2AsIFwiICtcbiAgICAgICAgICAgIFwiYGVzTm9EZWZhdWx0YCB0byB1c2Ugd2l0aCBgaW1wb3J0IHtGb29Db250cmFjdH0gZnJvbSAnZm9vJ2AgKGBub2RlYCBpcyBhIGRlZmF1bHQgb3B0aW9uKVwiLFxuICAgICAgICAgICAgJ25vZGUnLFxuICAgICAgICApXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChnZW5Db21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdzdGFydCcpLmRlc2NyaXB0aW9uKCdTdGFydCBkZXYgY29udGFpbmVycycpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHN0YXJ0Q29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnc3RvcCcpLmRlc2NyaXB0aW9uKCdTdG9wIGRldiBjb250YWluZXJzJylcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm4pXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5tKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoc3RvcENvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3Jlc3RhcnQnKS5kZXNjcmlwdGlvbignUmVzdGFydCBkZXYgY29udGFpbmVycycpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHJlc3RhcnRDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdyZWNyZWF0ZScpLmRlc2NyaXB0aW9uKCdSZWNyZWF0ZSBkZXYgY29udGFpbmVycycpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHJlY3JlYXRlQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgnc2V0dXAnKS5kZXNjcmlwdGlvbignU2V0dXAgZGV2IGVudmlyb25tZW50JylcbiAgICAgICAgLm9wdGlvbiguLi5zaGFyZWRPcHRpb25zLm4pXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5tKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoc2V0dXBDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdjbGVhbicpLmRlc2NyaXB0aW9uKCdSZW1vdmUgZG9ja2VyIGNvbnRhaW5lcnMgYW5kIGltYWdlcyByZWxhdGVkIHRvIFRPTiBEZXYnKVxuICAgICAgICAub3B0aW9uKCctbiwgLS1uZXR3b3JrcycsICdjbGVhbiBsb2NhbCBub2RlIGRvY2tlciBjb250YWluZXJzIGFuZCBpbWFnZXMnKVxuICAgICAgICAub3B0aW9uKCctbSwgLS1jb21waWxlcnMnLCAnY2xlYW4gY29tcGlsZXJzIGRvY2tlciBjb250YWluZXJzIGFuZCBpbWFnZXMnKVxuICAgICAgICAub3B0aW9uKCctYywgLS1jb250YWluZXJzJywgJ2NsZWFuIGNvbnRhaW5lcnMgb25seScsIGZhbHNlKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQoY2xlYW5Db21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCd1c2UgPHZlcnNpb24+JykuZGVzY3JpcHRpb24oJ1VzZSBzcGVjaWZpZWQgdmVyc2lvbiBmb3IgY29udGFpbmVycycpXG4gICAgICAgIC5vcHRpb24oLi4uc2hhcmVkT3B0aW9ucy5uKVxuICAgICAgICAub3B0aW9uKC4uLnNoYXJlZE9wdGlvbnMubSlcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKHVzZUNvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3NldCBbbmV0d29yay4uLl0nKS5kZXNjcmlwdGlvbignU2V0IG5ldHdvcmtbc10gb3B0aW9ucycpXG4gICAgICAgIC5vcHRpb24oJy1wLCAtLXBvcnQgPHBvcnQ+JywgJ2hvc3QgcG9ydCB0byBib3VuZCBsb2NhbCBub2RlJylcbiAgICAgICAgLm9wdGlvbihcbiAgICAgICAgICAgICctZCwgLS1kYi1wb3J0IDxiaW5kaW5nPicsXG4gICAgICAgICAgICAnaG9zdCBwb3J0IHRvIGJvdW5kIGxvY2FsIG5vZGVzIEFyYW5nbyBEQiAoXCJiaW5kXCIgdG8gdXNlIGRlZmF1bHQgQXJhbmdvIERCIHBvcnQsIFwidW5iaW5kXCIgdG8gdW5iaW5kIEFyYW5nbyBEQiBwb3J0KScsXG4gICAgICAgIClcbiAgICAgICAgLm9wdGlvbignLW4sIC0tbmV3LW5hbWUgPG5hbWU+JywgJ3NldCBuZXcgbmFtZSBmb3IgbmV0d29yaycpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChzZXRDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdhZGQgW25ldHdvcmsuLi5dJykuZGVzY3JpcHRpb24oJ0FkZCBuZXR3b3JrW3NdJylcbiAgICAgICAgLmFjdGlvbihjb21tYW5kKGFkZENvbW1hbmQpKTtcblxuICAgIHByb2dyYW1cbiAgICAgICAgLmNvbW1hbmQoJ3JlbW92ZSBbbmV0d29yay4uLl0nKS5hbGlhcygncm0nKS5kZXNjcmlwdGlvbignUmVtb3ZlIG5ldHdvcmtbc10nKVxuICAgICAgICAuYWN0aW9uKGNvbW1hbmQocmVtb3ZlQ29tbWFuZCkpO1xuXG4gICAgcHJvZ3JhbVxuICAgICAgICAuY29tbWFuZCgna2V5cycpLmFsaWFzKCdrJykuZGVzY3JpcHRpb24oJ0dlbmVyYXRlIHJhbmRvbSBLZXkgUGFpcicpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChnZW5lcmF0ZUtleXNDb21tYW5kKSk7XG5cbiAgICBwcm9ncmFtXG4gICAgICAgIC5jb21tYW5kKCdhZGRyIDxhZGRyPicpLmFsaWFzKCdhJykuZGVzY3JpcHRpb24oJ0NvbnZlcnQgYWRkcmVzcycpXG4gICAgICAgIC5hY3Rpb24oY29tbWFuZChjb252ZXJ0QWRkcmVzcykpO1xuXG4gICAgaWYgKFVTRV9FWFBFUklNRU5UQUxfRkVBVFVSRVMpIHtcbiAgICAgICAgcHJvZ3JhbVxuICAgICAgICAgICAgLmNvbW1hbmQoJ3NweSBbbmV0d29ya3MuLi5dJykuZGVzY3JpcHRpb24oJ1J1biBuZXR3b3JrIHNjYW5uZXInKVxuICAgICAgICAgICAgLmFjdGlvbihjb21tYW5kKHNweUNvbW1hbmQpKTtcblxuICAgICAgICBwcm9ncmFtXG4gICAgICAgICAgICAuY29tbWFuZCgnd2ViJykuZGVzY3JpcHRpb24oJ1J1biB3ZWIgY29uc29sZScpXG4gICAgICAgICAgICAub3B0aW9uKCctcCwgLS1wb3J0IDxwb3J0PicsICdob3N0IHBvcnQgdG8gYm91bmQgd2ViIGNvbnNvbGUgKGRlZmF1bHQ6IDg4MDApJywgJzg4MDAnKVxuICAgICAgICAgICAgLmFjdGlvbihjb21tYW5kKHdlYkNvbnNvbGVDb21tYW5kKSk7XG4gICAgfVxuXG4gICAgLy8gLmNvbW1hbmQoJ3VwZGF0ZScsIGB1cGRhdGUgJHtkZXYubmFtZX0gZG9ja2VyIGltYWdlc2ApLmFjdGlvbihhY3Rpb24pXG5cbiAgICBwcm9ncmFtLnBhcnNlKGFyZ3MpO1xuXG4gICAgaWYgKGNvbW1hbmRBcmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBpZiAocHJvZ3JhbS5hcmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgYXdhaXQgaW5mb0NvbW1hbmQoZGV2LCBwcm9ncmFtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb2dyYW0ub3V0cHV0SGVscCgpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGNvbW1hbmRBY3Rpb24gPT09IGluZm9Db21tYW5kKSB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0gY29tbWFuZEFyZ3NbY29tbWFuZEFyZ3MubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBvcHRpb25zLmF2YWlsYWJsZSA9IG9wdGlvbnMucGFyZW50LmF2YWlsYWJsZTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBjb21tYW5kQWN0aW9uKGRldiwgLi4uY29tbWFuZEFyZ3MpO1xuICAgIH1cbn1cblxuZXhwb3J0IHtoYW5kbGVDb21tYW5kTGluZX07XG4iXX0=