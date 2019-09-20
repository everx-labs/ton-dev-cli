"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setup = setup;
exports.ensureStartedLocalNode = ensureStartedLocalNode;
exports.ensureStartedCompilers = ensureStartedCompilers;
exports.start = start;
exports.stop = stop;
exports.clean = clean;
exports.useVersion = useVersion;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _docker = _interopRequireDefault(require("./docker"));

var _config = require("./config");

var _texts = require("./texts");

var _utils = require("./utils");

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
var fs = require('fs');

var path = require('path');

function checkRequiredSoftware() {
  return _checkRequiredSoftware.apply(this, arguments);
}

function _checkRequiredSoftware() {
  _checkRequiredSoftware = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var version;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _docker["default"].numericVersion();

          case 2:
            version = _context.sent;

            if (!(version < 17000000)) {
              _context.next = 5;
              break;
            }

            throw _texts.texts.dockerVersionRequired;

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _checkRequiredSoftware.apply(this, arguments);
}

var skipLicenseAgreement = false;

function checkLicenseAgreement() {
  return _checkLicenseAgreement.apply(this, arguments);
}

function _checkLicenseAgreement() {
  _checkLicenseAgreement = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    var license, answer;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = skipLicenseAgreement;

            if (_context2.t0) {
              _context2.next = 6;
              break;
            }

            _context2.next = 4;
            return _docker["default"].listTonDevContainers();

          case 4:
            _context2.t1 = _context2.sent.length;
            _context2.t0 = _context2.t1 > 0;

          case 6:
            if (!_context2.t0) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return");

          case 8:
            license = fs.readFileSync(path.join(__dirname, '..', 'LICENSE')).toString().split('\n').map(_utils.breakWords).join('\n');
            console.log(license);
            process.stdout.write(_texts.texts.agreementConfirmation);
            _context2.next = 13;
            return (0, _utils.inputLine)();

          case 13:
            answer = _context2.sent.trim().toLowerCase();

            if (answer !== 'yes') {
              console.log(_texts.texts.agreementRejected);
              process.exit(0);
            }

            console.log(_texts.texts.agreementAccepted);

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _checkLicenseAgreement.apply(this, arguments);
}

function create(_x) {
  return _create.apply(this, arguments);
}

function _create() {
  _create = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(options) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            process.stdout.write(_texts.texts.containerDoesNotExists(options.name || ''));
            _context3.next = 3;
            return _docker["default"].createContainer(options);

          case 3:
            console.log(_texts.texts.done);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _create.apply(this, arguments);
}

function createCompilersContainer() {
  return _createCompilersContainer.apply(this, arguments);
}

function _createCompilersContainer() {
  _createCompilersContainer = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4() {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!fs.existsSync(_config.config.compilers.mountSource)) {
              fs.mkdirSync(_config.config.compilers.mountSource, {
                recursive: true
              });
            }

            return _context4.abrupt("return", create({
              name: _config.config.compilers.container,
              interactive: true,
              Image: _config.config.compilers.image,
              Tty: true,
              Env: ['USER_AGREEMENT=yes'],
              HostConfig: {
                Mounts: [{
                  Type: 'bind',
                  Source: _config.config.compilers.mountSource,
                  Target: _config.config.compilers.mountDestination
                }]
              }
            }));

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _createCompilersContainer.apply(this, arguments);
}

function createLocalNodeContainer(_x2) {
  return _createLocalNodeContainer.apply(this, arguments);
}

function _createLocalNodeContainer() {
  _createLocalNodeContainer = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(net) {
    var ports;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            ports = {
              '80/tcp': [{
                HostIp: '',
                HostPort: "".concat(net.preferences.hostPort)
              }]
            };

            if (net.preferences.arangoHostPort !== '') {
              ports['8529/tcp'] = [{
                HostIp: '',
                HostPort: net.preferences.arangoHostPort
              }];
            }

            return _context5.abrupt("return", create({
              name: net.container,
              interactive: true,
              Image: net.image,
              Env: ['USER_AGREEMENT=yes'],
              HostConfig: {
                PortBindings: ports
              }
            }));

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _createLocalNodeContainer.apply(this, arguments);
}

function ensureStartedContainer(_x3, _x4, _x5) {
  return _ensureStartedContainer.apply(this, arguments);
}

function _ensureStartedContainer() {
  _ensureStartedContainer = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6(container, image, create) {
    var containerInfo, _container;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.t0 = _docker["default"];
            _context6.next = 3;
            return _docker["default"].listAllContainers();

          case 3:
            _context6.t1 = _context6.sent;
            _context6.t2 = container;
            containerInfo = _context6.t0.findContainerInfo.call(_context6.t0, _context6.t1, _context6.t2);

            if (containerInfo) {
              _context6.next = 29;
              break;
            }

            _context6.next = 9;
            return checkLicenseAgreement();

          case 9:
            _context6.t3 = _docker["default"];
            _context6.next = 12;
            return _docker["default"].listAllImages();

          case 12:
            _context6.t4 = _context6.sent;
            _context6.t5 = image;

            if (_context6.t3.findImageInfo.call(_context6.t3, _context6.t4, _context6.t5)) {
              _context6.next = 19;
              break;
            }

            process.stdout.write(_texts.texts.imageDoesNotExists(image));
            _context6.next = 18;
            return _docker["default"].pullImage(image);

          case 18:
            console.log(_texts.texts.done);

          case 19:
            _context6.next = 21;
            return create();

          case 21:
            _context6.t6 = _docker["default"];
            _context6.next = 24;
            return _docker["default"].listAllContainers();

          case 24:
            _context6.t7 = _context6.sent;
            _context6.t8 = container;
            containerInfo = _context6.t6.findContainerInfo.call(_context6.t6, _context6.t7, _context6.t8);

            if (containerInfo) {
              _context6.next = 29;
              break;
            }

            throw _texts.texts.containerCanNotBeCreated(container);

          case 29:
            if (_docker["default"].isRunning(containerInfo)) {
              _context6.next = 33;
              break;
            }

            _container = _docker["default"].getContainer(containerInfo.Id);
            _context6.next = 33;
            return _container.start();

          case 33:
            return _context6.abrupt("return", containerInfo);

          case 34:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _ensureStartedContainer.apply(this, arguments);
}

function ensureStartedLocalNode(_x6) {
  return _ensureStartedLocalNode.apply(this, arguments);
}

function _ensureStartedLocalNode() {
  _ensureStartedLocalNode = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7(net) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt("return", ensureStartedContainer(net.container, net.image, function () {
              return createLocalNodeContainer(net);
            }));

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _ensureStartedLocalNode.apply(this, arguments);
}

function ensureStartedCompilers() {
  return _ensureStartedCompilers.apply(this, arguments);
}

function _ensureStartedCompilers() {
  _ensureStartedCompilers = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee8() {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            return _context8.abrupt("return", ensureStartedContainer(_config.config.compilers.container, _config.config.compilers.image, createCompilersContainer));

          case 1:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _ensureStartedCompilers.apply(this, arguments);
}

function setup(_x7) {
  return _setup.apply(this, arguments);
}

function _setup() {
  _setup = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee9(args) {
    var options, arangoHostPort;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            options = (0, _utils.argsToOptions)(args, {
              port: {
                def: '',
                valueCount: 1,
                "short": 'p'
              },
              arango: {
                def: '',
                valueCount: 1,
                "short": 'a'
              }
            });
            _context9.next = 3;
            return checkRequiredSoftware();

          case 3:
            if (!(options.port !== '' || options.arango !== '')) {
              _context9.next = 24;
              break;
            }

            _context9.next = 6;
            return _docker["default"].listTonDevContainers();

          case 6:
            _context9.t0 = _context9.sent.length;
            skipLicenseAgreement = _context9.t0 > 0;

            if (options.port !== '') {
              (0, _config.netsFromArgsOrDefault)().forEach(function (net) {
                net.preferences.hostPort = options.port;
              });
            }

            if (!(options.arango !== '')) {
              _context9.next = 21;
              break;
            }

            arangoHostPort = '';
            _context9.t1 = options.arango.toLowerCase();
            _context9.next = _context9.t1 === 'bind' ? 14 : _context9.t1 === 'unbind' ? 16 : 18;
            break;

          case 14:
            arangoHostPort = _config.defaultValues.net.arangoPort;
            return _context9.abrupt("break", 20);

          case 16:
            arangoHostPort = '';
            return _context9.abrupt("break", 20);

          case 18:
            arangoHostPort = options.arango;
            return _context9.abrupt("break", 20);

          case 20:
            (0, _config.netsFromArgsOrDefault)().forEach(function (net) {
              net.preferences.arangoHostPort = arangoHostPort;
            });

          case 21:
            (0, _config.updatePreferences)();
            _context9.next = 24;
            return clean(['-c']);

          case 24:
            _context9.next = 26;
            return Promise.all((0, _config.netsFromArgsOrAll)().map(ensureStartedLocalNode));

          case 26:
            _context9.next = 28;
            return ensureStartedCompilers();

          case 28:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return _setup.apply(this, arguments);
}

function start() {
  return _start.apply(this, arguments);
}

function _start() {
  _start = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee10() {
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            return _context10.abrupt("return", Promise.all((0, _config.netsFromArgsOrAll)().map(ensureStartedLocalNode)));

          case 1:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return _start.apply(this, arguments);
}

function stopContainer(_x8) {
  return _stopContainer.apply(this, arguments);
}

function _stopContainer() {
  _stopContainer = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee11(info) {
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            if (!_docker["default"].isRunning(info)) {
              _context11.next = 2;
              break;
            }

            return _context11.abrupt("return", _docker["default"].getContainer(info.Id).stop());

          case 2:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));
  return _stopContainer.apply(this, arguments);
}

function stop() {
  return _stop.apply(this, arguments);
}

function _stop() {
  _stop = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee12() {
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.t0 = Promise;
            _context12.next = 3;
            return _docker["default"].listTonDevContainers();

          case 3:
            _context12.t1 = stopContainer;
            _context12.t2 = _context12.sent.map(_context12.t1);
            return _context12.abrupt("return", _context12.t0.all.call(_context12.t0, _context12.t2));

          case 6:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));
  return _stop.apply(this, arguments);
}

function cleanContainer(_x9) {
  return _cleanContainer.apply(this, arguments);
}

function _cleanContainer() {
  _cleanContainer = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee13(info) {
    var container;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            container = _docker["default"].getContainer(info.Id);

            if (!_docker["default"].isRunning(info)) {
              _context13.next = 4;
              break;
            }

            _context13.next = 4;
            return container.stop();

          case 4:
            _context13.next = 6;
            return container.remove();

          case 6:
            console.log(_texts.texts.containerHaveBeenRemoved(info.Id));

          case 7:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));
  return _cleanContainer.apply(this, arguments);
}

function cleanImage(_x10) {
  return _cleanImage.apply(this, arguments);
}

function _cleanImage() {
  _cleanImage = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee14(info) {
    var image;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            image = _docker["default"].getImage(info.Id);
            _context14.next = 3;
            return image.remove();

          case 3:
            console.log(_texts.texts.imageHaveBeenRemoved(info.Id));

          case 4:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));
  return _cleanImage.apply(this, arguments);
}

function clean(_x11) {
  return _clean.apply(this, arguments);
}

function _clean() {
  _clean = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee15(args) {
    var options;
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            options = (0, _utils.argsToOptions)(args, {
              images: {
                def: false,
                "short": 'i'
              },
              containers: {
                def: false,
                "short": 'c'
              }
            });

            if (!options.images && !options.containers) {
              options.images = true;
              options.containers = true;
            }

            if (!options.containers) {
              _context15.next = 10;
              break;
            }

            _context15.t0 = Promise;
            _context15.next = 6;
            return _docker["default"].listTonDevContainers();

          case 6:
            _context15.t1 = cleanContainer;
            _context15.t2 = _context15.sent.map(_context15.t1);
            _context15.next = 10;
            return _context15.t0.all.call(_context15.t0, _context15.t2);

          case 10:
            if (!options.images) {
              _context15.next = 18;
              break;
            }

            _context15.t3 = Promise;
            _context15.next = 14;
            return _docker["default"].listTonDevImages();

          case 14:
            _context15.t4 = cleanImage;
            _context15.t5 = _context15.sent.map(_context15.t4);
            _context15.next = 18;
            return _context15.t3.all.call(_context15.t3, _context15.t5);

          case 18:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }));
  return _clean.apply(this, arguments);
}

function useVersion(_x12) {
  return _useVersion.apply(this, arguments);
}

function _useVersion() {
  _useVersion = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee16(args) {
    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            if (args.length !== 1) {
              (0, _utils.showUsage)(_texts.texts.usage);
              process.exit(1);
            }

            (0, _config.netsFromArgsOrAll)().forEach(function (net) {
              net.preferences.version = args[0];
            });
            (0, _config.updatePreferences)();
            _context16.next = 5;
            return setup([]);

          case 5:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16);
  }));
  return _useVersion.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXR1cC5qcyJdLCJuYW1lcyI6WyJmcyIsInJlcXVpcmUiLCJwYXRoIiwiY2hlY2tSZXF1aXJlZFNvZnR3YXJlIiwiZG9ja2VyIiwibnVtZXJpY1ZlcnNpb24iLCJ2ZXJzaW9uIiwidGV4dHMiLCJkb2NrZXJWZXJzaW9uUmVxdWlyZWQiLCJza2lwTGljZW5zZUFncmVlbWVudCIsImNoZWNrTGljZW5zZUFncmVlbWVudCIsImxpc3RUb25EZXZDb250YWluZXJzIiwibGVuZ3RoIiwibGljZW5zZSIsInJlYWRGaWxlU3luYyIsImpvaW4iLCJfX2Rpcm5hbWUiLCJ0b1N0cmluZyIsInNwbGl0IiwibWFwIiwiYnJlYWtXb3JkcyIsImNvbnNvbGUiLCJsb2ciLCJwcm9jZXNzIiwic3Rkb3V0Iiwid3JpdGUiLCJhZ3JlZW1lbnRDb25maXJtYXRpb24iLCJhbnN3ZXIiLCJ0cmltIiwidG9Mb3dlckNhc2UiLCJhZ3JlZW1lbnRSZWplY3RlZCIsImV4aXQiLCJhZ3JlZW1lbnRBY2NlcHRlZCIsImNyZWF0ZSIsIm9wdGlvbnMiLCJjb250YWluZXJEb2VzTm90RXhpc3RzIiwibmFtZSIsImNyZWF0ZUNvbnRhaW5lciIsImRvbmUiLCJjcmVhdGVDb21waWxlcnNDb250YWluZXIiLCJleGlzdHNTeW5jIiwiY29uZmlnIiwiY29tcGlsZXJzIiwibW91bnRTb3VyY2UiLCJta2RpclN5bmMiLCJyZWN1cnNpdmUiLCJjb250YWluZXIiLCJpbnRlcmFjdGl2ZSIsIkltYWdlIiwiaW1hZ2UiLCJUdHkiLCJFbnYiLCJIb3N0Q29uZmlnIiwiTW91bnRzIiwiVHlwZSIsIlNvdXJjZSIsIlRhcmdldCIsIm1vdW50RGVzdGluYXRpb24iLCJjcmVhdGVMb2NhbE5vZGVDb250YWluZXIiLCJuZXQiLCJwb3J0cyIsIkhvc3RJcCIsIkhvc3RQb3J0IiwicHJlZmVyZW5jZXMiLCJob3N0UG9ydCIsImFyYW5nb0hvc3RQb3J0IiwiUG9ydEJpbmRpbmdzIiwiZW5zdXJlU3RhcnRlZENvbnRhaW5lciIsImxpc3RBbGxDb250YWluZXJzIiwiY29udGFpbmVySW5mbyIsImZpbmRDb250YWluZXJJbmZvIiwibGlzdEFsbEltYWdlcyIsImZpbmRJbWFnZUluZm8iLCJpbWFnZURvZXNOb3RFeGlzdHMiLCJwdWxsSW1hZ2UiLCJjb250YWluZXJDYW5Ob3RCZUNyZWF0ZWQiLCJpc1J1bm5pbmciLCJnZXRDb250YWluZXIiLCJJZCIsInN0YXJ0IiwiZW5zdXJlU3RhcnRlZExvY2FsTm9kZSIsImVuc3VyZVN0YXJ0ZWRDb21waWxlcnMiLCJzZXR1cCIsImFyZ3MiLCJwb3J0IiwiZGVmIiwidmFsdWVDb3VudCIsImFyYW5nbyIsImZvckVhY2giLCJkZWZhdWx0VmFsdWVzIiwiYXJhbmdvUG9ydCIsImNsZWFuIiwiUHJvbWlzZSIsImFsbCIsInN0b3BDb250YWluZXIiLCJpbmZvIiwic3RvcCIsImNsZWFuQ29udGFpbmVyIiwicmVtb3ZlIiwiY29udGFpbmVySGF2ZUJlZW5SZW1vdmVkIiwiY2xlYW5JbWFnZSIsImdldEltYWdlIiwiaW1hZ2VIYXZlQmVlblJlbW92ZWQiLCJpbWFnZXMiLCJjb250YWluZXJzIiwibGlzdFRvbkRldkltYWdlcyIsInVzZVZlcnNpb24iLCJ1c2FnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQTs7QUFDQTs7QUFPQTs7QUFDQTs7QUEvQkE7Ozs7Ozs7Ozs7Ozs7O0FBaUNBLElBQU1BLEVBQUUsR0FBR0MsT0FBTyxDQUFDLElBQUQsQ0FBbEI7O0FBQ0EsSUFBTUMsSUFBSSxHQUFHRCxPQUFPLENBQUMsTUFBRCxDQUFwQjs7U0FFZUUscUI7Ozs7Ozs7K0JBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFDMEJDLG1CQUFPQyxjQUFQLEVBRDFCOztBQUFBO0FBQ1VDLFlBQUFBLE9BRFY7O0FBQUEsa0JBRVFBLE9BQU8sR0FBRyxRQUZsQjtBQUFBO0FBQUE7QUFBQTs7QUFBQSxrQkFHY0MsYUFBTUMscUJBSHBCOztBQUFBO0FB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QkFBT08sb0JBQVAsRUFWakM7O0FBQUE7QUFBQSw0QkFVb0VzRixjQVZwRTtBQUFBLDRDQVVnRTlFLEdBVmhFO0FBQUE7QUFBQSxpQ0FVc0IwRSxHQVZ0Qjs7QUFBQTtBQUFBLGlCQVlRM0QsT0FBTyxDQUFDcUUsTUFaaEI7QUFBQTtBQUFBO0FBQUE7O0FBQUEsNEJBYWNYLE9BYmQ7QUFBQTtBQUFBLG1CQWFpQ3hGLG1CQUFPcUcsZ0JBQVAsRUFiakM7O0FBQUE7QUFBQSw0QkFhZ0VMLFVBYmhFO0FBQUEsNENBYTREakYsR0FiNUQ7QUFBQTtBQUFBLGlDQWFzQjBFLEdBYnRCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7U0FpQmVhLFU7Ozs7Ozs7K0JBQWYsbUJBQTBCdkIsSUFBMUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNJLGdCQUFJQSxJQUFJLENBQUN2RSxNQUFMLEtBQWdCLENBQXBCLEVBQXVCO0FBQ25CLG9DQUFVTCxhQUFNb0csS0FBaEI7QUFDQXBGLGNBQUFBLE9BQU8sQ0FBQ1EsSUFBUixDQUFhLENBQWI7QUFDSDs7QUFDRCw2Q0FBb0J5RCxPQUFwQixDQUE0QixVQUFDN0IsR0FBRCxFQUFTO0FBQ2pDQSxjQUFBQSxHQUFHLENBQUNJLFdBQUosQ0FBZ0J6RCxPQUFoQixHQUEwQjZFLElBQUksQ0FBQyxDQUFELENBQTlCO0FBQ0gsYUFGRDtBQUdBO0FBUko7QUFBQSxtQkFTVUQsS0FBSyxDQUFDLEVBQUQsQ0FUZjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuLy8gQGZsb3dcblxuaW1wb3J0IHR5cGUgeyBDb21waWxlcnNDb25maWcsIE5ldENvbmZpZyB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0IHR5cGUge1xuICAgIERDcmVhdGVDb250YWluZXJPcHRpb25zLFxuICAgIERDb250YWluZXJJbmZvLCBESW1hZ2VJbmZvLCBEUG9ydEJpbmRpbmdzLFxufSBmcm9tIFwiLi9kb2NrZXJcIjtcblxuaW1wb3J0IGRvY2tlciBmcm9tIFwiLi9kb2NrZXJcIjtcbmltcG9ydCB7XG4gICAgY29uZmlnLFxuICAgIGRlZmF1bHRWYWx1ZXMsXG4gICAgbmV0c0Zyb21BcmdzT3JBbGwsXG4gICAgbmV0c0Zyb21BcmdzT3JEZWZhdWx0LFxuICAgIHVwZGF0ZVByZWZlcmVuY2VzXG59IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IHRleHRzIH0gZnJvbSBcIi4vdGV4dHNcIjtcbmltcG9ydCB7IGFyZ3NUb09wdGlvbnMsIGJyZWFrV29yZHMsIGlucHV0TGluZSwgc2hvd1VzYWdlIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcblxuYXN5bmMgZnVuY3Rpb24gY2hlY2tSZXF1aXJlZFNvZnR3YXJlKCkge1xuICAgIGNvbnN0IHZlcnNpb24gPSBhd2FpdCBkb2NrZXIubnVtZXJpY1ZlcnNpb24oKTtcbiAgICBpZiAodmVyc2lvbiA8IDE3XzAwMF8wMDApIHtcbiAgICAgICAgdGhyb3cgdGV4dHMuZG9ja2VyVmVyc2lvblJlcXVpcmVkO1xuICAgIH1cbn1cblxubGV0IHNraXBMaWNlbnNlQWdyZWVtZW50ID0gZmFsc2U7XG5cbmFzeW5jIGZ1bmN0aW9uIGNoZWNrTGljZW5zZUFncmVlbWVudCgpIHtcbiAgICBpZiAoc2tpcExpY2Vuc2VBZ3JlZW1lbnQgfHwgKGF3YWl0IGRvY2tlci5saXN0VG9uRGV2Q29udGFpbmVycygpKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbGljZW5zZSA9IGZzXG4gICAgICAgIC5yZWFkRmlsZVN5bmMocGF0aC5qb2luKF9fZGlybmFtZSwgJy4uJywgJ0xJQ0VOU0UnKSlcbiAgICAgICAgLnRvU3RyaW5nKClcbiAgICAgICAgLnNwbGl0KCdcXG4nKVxuICAgICAgICAubWFwKGJyZWFrV29yZHMpLmpvaW4oJ1xcbicpO1xuICAgIGNvbnNvbGUubG9nKGxpY2Vuc2UpO1xuICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKHRleHRzLmFncmVlbWVudENvbmZpcm1hdGlvbik7XG4gICAgY29uc3QgYW5zd2VyID0gKGF3YWl0IGlucHV0TGluZSgpKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoYW5zd2VyICE9PSAneWVzJykge1xuICAgICAgICBjb25zb2xlLmxvZyh0ZXh0cy5hZ3JlZW1lbnRSZWplY3RlZCk7XG4gICAgICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2codGV4dHMuYWdyZWVtZW50QWNjZXB0ZWQpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjcmVhdGUob3B0aW9uczogRENyZWF0ZUNvbnRhaW5lck9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBwcm9jZXNzLnN0ZG91dC53cml0ZSh0ZXh0cy5jb250YWluZXJEb2VzTm90RXhpc3RzKG9wdGlvbnMubmFtZSB8fCAnJykpO1xuICAgIGF3YWl0IGRvY2tlci5jcmVhdGVDb250YWluZXIob3B0aW9ucyk7XG4gICAgY29uc29sZS5sb2codGV4dHMuZG9uZSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUNvbXBpbGVyc0NvbnRhaW5lcigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMoY29uZmlnLmNvbXBpbGVycy5tb3VudFNvdXJjZSkpIHtcbiAgICAgICAgZnMubWtkaXJTeW5jKGNvbmZpZy5jb21waWxlcnMubW91bnRTb3VyY2UsICh7IHJlY3Vyc2l2ZTogdHJ1ZSB9OiBhbnkpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZSh7XG4gICAgICAgIG5hbWU6IGNvbmZpZy5jb21waWxlcnMuY29udGFpbmVyLFxuICAgICAgICBpbnRlcmFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgSW1hZ2U6IGNvbmZpZy5jb21waWxlcnMuaW1hZ2UsXG4gICAgICAgIFR0eTogdHJ1ZSxcbiAgICAgICAgRW52OiBbJ1VTRVJfQUdSRUVNRU5UPXllcyddLFxuICAgICAgICBIb3N0Q29uZmlnOiB7XG4gICAgICAgICAgICBNb3VudHM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFR5cGU6ICdiaW5kJyxcbiAgICAgICAgICAgICAgICAgICAgU291cmNlOiBjb25maWcuY29tcGlsZXJzLm1vdW50U291cmNlLFxuICAgICAgICAgICAgICAgICAgICBUYXJnZXQ6IGNvbmZpZy5jb21waWxlcnMubW91bnREZXN0aW5hdGlvbixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlTG9jYWxOb2RlQ29udGFpbmVyKG5ldDogTmV0Q29uZmlnKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcG9ydHM6IERQb3J0QmluZGluZ3MgPSB7XG4gICAgICAgICc4MC90Y3AnOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgSG9zdElwOiAnJyxcbiAgICAgICAgICAgICAgICBIb3N0UG9ydDogYCR7bmV0LnByZWZlcmVuY2VzLmhvc3RQb3J0fWAsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgIH07XG4gICAgaWYgKG5ldC5wcmVmZXJlbmNlcy5hcmFuZ29Ib3N0UG9ydCAhPT0gJycpIHtcbiAgICAgICAgcG9ydHNbJzg1MjkvdGNwJ10gPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgSG9zdElwOiAnJyxcbiAgICAgICAgICAgICAgICBIb3N0UG9ydDogbmV0LnByZWZlcmVuY2VzLmFyYW5nb0hvc3RQb3J0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXVxuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlKHtcbiAgICAgICAgbmFtZTogbmV0LmNvbnRhaW5lcixcbiAgICAgICAgaW50ZXJhY3RpdmU6IHRydWUsXG4gICAgICAgIEltYWdlOiBuZXQuaW1hZ2UsXG4gICAgICAgIEVudjogWydVU0VSX0FHUkVFTUVOVD15ZXMnXSxcbiAgICAgICAgSG9zdENvbmZpZzoge1xuICAgICAgICAgICAgUG9ydEJpbmRpbmdzOiBwb3J0cyxcbiAgICAgICAgfSxcbiAgICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZW5zdXJlU3RhcnRlZENvbnRhaW5lcihcbiAgICBjb250YWluZXI6IHN0cmluZyxcbiAgICBpbWFnZTogc3RyaW5nLFxuICAgIGNyZWF0ZTogKCkgPT4gUHJvbWlzZTx2b2lkPixcbik6IFByb21pc2U8RENvbnRhaW5lckluZm8+IHtcbiAgICBsZXQgY29udGFpbmVySW5mbyA9IGRvY2tlci5maW5kQ29udGFpbmVySW5mbyhhd2FpdCBkb2NrZXIubGlzdEFsbENvbnRhaW5lcnMoKSwgY29udGFpbmVyKTtcbiAgICBpZiAoIWNvbnRhaW5lckluZm8pIHtcbiAgICAgICAgYXdhaXQgY2hlY2tMaWNlbnNlQWdyZWVtZW50KCk7XG4gICAgICAgIGlmICghZG9ja2VyLmZpbmRJbWFnZUluZm8oYXdhaXQgZG9ja2VyLmxpc3RBbGxJbWFnZXMoKSwgaW1hZ2UpKSB7XG4gICAgICAgICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZSh0ZXh0cy5pbWFnZURvZXNOb3RFeGlzdHMoaW1hZ2UpKTtcbiAgICAgICAgICAgIGF3YWl0IGRvY2tlci5wdWxsSW1hZ2UoaW1hZ2UpO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGV4dHMuZG9uZSk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgY3JlYXRlKCk7XG4gICAgICAgIGNvbnRhaW5lckluZm8gPSBkb2NrZXIuZmluZENvbnRhaW5lckluZm8oYXdhaXQgZG9ja2VyLmxpc3RBbGxDb250YWluZXJzKCksIGNvbnRhaW5lcik7XG4gICAgICAgIGlmICghY29udGFpbmVySW5mbykge1xuICAgICAgICAgICAgdGhyb3cgdGV4dHMuY29udGFpbmVyQ2FuTm90QmVDcmVhdGVkKGNvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFkb2NrZXIuaXNSdW5uaW5nKGNvbnRhaW5lckluZm8pKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY2tlci5nZXRDb250YWluZXIoY29udGFpbmVySW5mby5JZCk7XG4gICAgICAgIGF3YWl0IGNvbnRhaW5lci5zdGFydCgpO1xuICAgIH1cbiAgICByZXR1cm4gY29udGFpbmVySW5mbztcbn1cblxuYXN5bmMgZnVuY3Rpb24gZW5zdXJlU3RhcnRlZExvY2FsTm9kZShuZXQ6IE5ldENvbmZpZyk6IFByb21pc2U8RENvbnRhaW5lckluZm8+IHtcbiAgICByZXR1cm4gZW5zdXJlU3RhcnRlZENvbnRhaW5lcihuZXQuY29udGFpbmVyLCBuZXQuaW1hZ2UsICgpID0+IGNyZWF0ZUxvY2FsTm9kZUNvbnRhaW5lcihuZXQpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZW5zdXJlU3RhcnRlZENvbXBpbGVycygpOiBQcm9taXNlPERDb250YWluZXJJbmZvPiB7XG4gICAgcmV0dXJuIGVuc3VyZVN0YXJ0ZWRDb250YWluZXIoY29uZmlnLmNvbXBpbGVycy5jb250YWluZXIsIGNvbmZpZy5jb21waWxlcnMuaW1hZ2UsIGNyZWF0ZUNvbXBpbGVyc0NvbnRhaW5lcik7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNldHVwKGFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IGFyZ3NUb09wdGlvbnMoYXJncywge1xuICAgICAgICBwb3J0OiB7IGRlZjogJycsIHZhbHVlQ291bnQ6IDEsIHNob3J0OiAncCcgfSxcbiAgICAgICAgYXJhbmdvOiB7IGRlZjogJycsIHZhbHVlQ291bnQ6IDEsIHNob3J0OiAnYScgfSxcbiAgICB9KTtcbiAgICBhd2FpdCBjaGVja1JlcXVpcmVkU29mdHdhcmUoKTtcbiAgICBpZiAob3B0aW9ucy5wb3J0ICE9PSAnJyB8fCBvcHRpb25zLmFyYW5nbyAhPT0gJycpIHtcbiAgICAgICAgc2tpcExpY2Vuc2VBZ3JlZW1lbnQgPSAoYXdhaXQgZG9ja2VyLmxpc3RUb25EZXZDb250YWluZXJzKCkpLmxlbmd0aCA+IDA7XG4gICAgICAgIGlmIChvcHRpb25zLnBvcnQgIT09ICcnKSB7XG4gICAgICAgICAgICBuZXRzRnJvbUFyZ3NPckRlZmF1bHQoKS5mb3JFYWNoKChuZXQpID0+IHtcbiAgICAgICAgICAgICAgICBuZXQucHJlZmVyZW5jZXMuaG9zdFBvcnQgPSBvcHRpb25zLnBvcnQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5hcmFuZ28gIT09ICcnKSB7XG4gICAgICAgICAgICBsZXQgYXJhbmdvSG9zdFBvcnQgPSAnJztcbiAgICAgICAgICAgIHN3aXRjaCAob3B0aW9ucy5hcmFuZ28udG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgY2FzZSAnYmluZCc6XG4gICAgICAgICAgICAgICAgYXJhbmdvSG9zdFBvcnQgPSBkZWZhdWx0VmFsdWVzLm5ldC5hcmFuZ29Qb3J0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndW5iaW5kJzpcbiAgICAgICAgICAgICAgICBhcmFuZ29Ib3N0UG9ydCA9ICcnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBhcmFuZ29Ib3N0UG9ydCA9IG9wdGlvbnMuYXJhbmdvO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV0c0Zyb21BcmdzT3JEZWZhdWx0KCkuZm9yRWFjaCgobmV0KSA9PiB7XG4gICAgICAgICAgICAgICAgbmV0LnByZWZlcmVuY2VzLmFyYW5nb0hvc3RQb3J0ID0gYXJhbmdvSG9zdFBvcnQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB1cGRhdGVQcmVmZXJlbmNlcygpO1xuICAgICAgICBhd2FpdCBjbGVhbihbJy1jJ10pO1xuICAgIH1cbiAgICBhd2FpdCBQcm9taXNlLmFsbChuZXRzRnJvbUFyZ3NPckFsbCgpLm1hcChlbnN1cmVTdGFydGVkTG9jYWxOb2RlKSk7XG4gICAgYXdhaXQgZW5zdXJlU3RhcnRlZENvbXBpbGVycygpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwobmV0c0Zyb21BcmdzT3JBbGwoKS5tYXAoZW5zdXJlU3RhcnRlZExvY2FsTm9kZSkpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzdG9wQ29udGFpbmVyKGluZm86IERDb250YWluZXJJbmZvKSB7XG4gICAgaWYgKGRvY2tlci5pc1J1bm5pbmcoaW5mbykpIHtcbiAgICAgICAgcmV0dXJuIGRvY2tlci5nZXRDb250YWluZXIoaW5mby5JZCkuc3RvcCgpO1xuICAgIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gc3RvcCgpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoKGF3YWl0IGRvY2tlci5saXN0VG9uRGV2Q29udGFpbmVycygpKS5tYXAoc3RvcENvbnRhaW5lcikpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjbGVhbkNvbnRhaW5lcihpbmZvOiBEQ29udGFpbmVySW5mbyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY2tlci5nZXRDb250YWluZXIoaW5mby5JZCk7XG4gICAgaWYgKGRvY2tlci5pc1J1bm5pbmcoaW5mbykpIHtcbiAgICAgICAgYXdhaXQgY29udGFpbmVyLnN0b3AoKTtcbiAgICB9XG4gICAgYXdhaXQgY29udGFpbmVyLnJlbW92ZSgpO1xuICAgIGNvbnNvbGUubG9nKHRleHRzLmNvbnRhaW5lckhhdmVCZWVuUmVtb3ZlZChpbmZvLklkKSlcbn1cblxuYXN5bmMgZnVuY3Rpb24gY2xlYW5JbWFnZShpbmZvOiBESW1hZ2VJbmZvKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgaW1hZ2UgPSBkb2NrZXIuZ2V0SW1hZ2UoaW5mby5JZCk7XG4gICAgYXdhaXQgaW1hZ2UucmVtb3ZlKCk7XG4gICAgY29uc29sZS5sb2codGV4dHMuaW1hZ2VIYXZlQmVlblJlbW92ZWQoaW5mby5JZCkpXG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNsZWFuKGFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IGFyZ3NUb09wdGlvbnMoYXJncywge1xuICAgICAgICBpbWFnZXM6IHsgZGVmOiBmYWxzZSwgc2hvcnQ6ICdpJyB9LFxuICAgICAgICBjb250YWluZXJzOiB7IGRlZjogZmFsc2UsIHNob3J0OiAnYycgfSxcbiAgICB9KTtcbiAgICBpZiAoIW9wdGlvbnMuaW1hZ2VzICYmICFvcHRpb25zLmNvbnRhaW5lcnMpIHtcbiAgICAgICAgb3B0aW9ucy5pbWFnZXMgPSB0cnVlO1xuICAgICAgICBvcHRpb25zLmNvbnRhaW5lcnMgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5jb250YWluZXJzKSB7XG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKChhd2FpdCBkb2NrZXIubGlzdFRvbkRldkNvbnRhaW5lcnMoKSkubWFwKGNsZWFuQ29udGFpbmVyKSk7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmltYWdlcykge1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbCgoYXdhaXQgZG9ja2VyLmxpc3RUb25EZXZJbWFnZXMoKSkubWFwKGNsZWFuSW1hZ2UpKTtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHVzZVZlcnNpb24oYXJnczogc3RyaW5nW10pIHtcbiAgICBpZiAoYXJncy5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgc2hvd1VzYWdlKHRleHRzLnVzYWdlKTtcbiAgICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgIH1cbiAgICBuZXRzRnJvbUFyZ3NPckFsbCgpLmZvckVhY2goKG5ldCkgPT4ge1xuICAgICAgICBuZXQucHJlZmVyZW5jZXMudmVyc2lvbiA9IGFyZ3NbMF07XG4gICAgfSk7XG4gICAgdXBkYXRlUHJlZmVyZW5jZXMoKTtcbiAgICBhd2FpdCBzZXR1cChbXSk7XG59XG5cbmV4cG9ydCB7IHNldHVwLCBlbnN1cmVTdGFydGVkTG9jYWxOb2RlLCBlbnN1cmVTdGFydGVkQ29tcGlsZXJzLCBzdGFydCwgc3RvcCwgY2xlYW4sIHVzZVZlcnNpb24gfTtcbiJdfQ==