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

function createLocalNodeContainer() {
  return _createLocalNodeContainer.apply(this, arguments);
}

function _createLocalNodeContainer() {
  _createLocalNodeContainer = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5() {
    var ports;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            ports = {
              '80/tcp': [{
                HostIp: '',
                HostPort: "".concat(_config.config.localNode.hostPort)
              }]
            };

            if (_config.preferences.localNodeArangoHostPort !== '') {
              ports['8529/tcp'] = [{
                HostIp: '',
                HostPort: _config.preferences.localNodeArangoHostPort
              }];
            }

            return _context5.abrupt("return", create({
              name: _config.config.localNode.container,
              interactive: true,
              Image: _config.config.localNode.image,
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

function ensureStartedContainer(_x2, _x3, _x4) {
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

function ensureStartedLocalNode() {
  return _ensureStartedLocalNode.apply(this, arguments);
}

function _ensureStartedLocalNode() {
  _ensureStartedLocalNode = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7() {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt("return", ensureStartedContainer(_config.config.localNode.container, _config.config.localNode.image, createLocalNodeContainer));

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

function setup(_x5) {
  return _setup.apply(this, arguments);
}

function _setup() {
  _setup = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee9(args) {
    var options;
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
              _context9.next = 22;
              break;
            }

            _context9.next = 6;
            return _docker["default"].listTonDevContainers();

          case 6:
            _context9.t0 = _context9.sent.length;
            skipLicenseAgreement = _context9.t0 > 0;

            if (options.port !== '') {
              _config.preferences.localNodeHostPort = options.port;
            }

            if (!(options.arango !== '')) {
              _context9.next = 19;
              break;
            }

            _context9.t1 = options.arango.toLowerCase();
            _context9.next = _context9.t1 === 'bind' ? 13 : _context9.t1 === 'unbind' ? 15 : 17;
            break;

          case 13:
            _config.preferences.localNodeArangoHostPort = _config.defaults.localNodeArangoHostPort;
            return _context9.abrupt("break", 19);

          case 15:
            _config.preferences.localNodeArangoHostPort = '';
            return _context9.abrupt("break", 19);

          case 17:
            _config.preferences.localNodeArangoHostPort = options.arango;
            return _context9.abrupt("break", 19);

          case 19:
            (0, _config.updatePreferences)();
            _context9.next = 22;
            return clean(['-c']);

          case 22:
            _context9.next = 24;
            return ensureStartedLocalNode();

          case 24:
            _context9.next = 26;
            return ensureStartedCompilers();

          case 26:
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
            return _context10.abrupt("return", ensureStartedLocalNode());

          case 1:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return _start.apply(this, arguments);
}

function stopContainer(_x6) {
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

function cleanContainer(_x7) {
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

function cleanImage(_x8) {
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

function clean(_x9) {
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

function useVersion(_x10) {
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

            _config.preferences.version = args[0];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXR1cC5qcyJdLCJuYW1lcyI6WyJmcyIsInJlcXVpcmUiLCJwYXRoIiwiY2hlY2tSZXF1aXJlZFNvZnR3YXJlIiwiZG9ja2VyIiwibnVtZXJpY1ZlcnNpb24iLCJ2ZXJzaW9uIiwidGV4dHMiLCJkb2NrZXJWZXJzaW9uUmVxdWlyZWQiLCJza2lwTGljZW5zZUFncmVlbWVudCIsImNoZWNrTGljZW5zZUFncmVlbWVudCIsImxpc3RUb25EZXZDb250YWluZXJzIiwibGVuZ3RoIiwibGljZW5zZSIsInJlYWRGaWxlU3luYyIsImpvaW4iLCJfX2Rpcm5hbWUiLCJ0b1N0cmluZyIsInNwbGl0IiwibWFwIiwiYnJlYWtXb3JkcyIsImNvbnNvbGUiLCJsb2ciLCJwcm9jZXNzIiwic3Rkb3V0Iiwid3JpdGUiLCJhZ3JlZW1lbnRDb25maXJtYXRpb24iLCJhbnN3ZXIiLCJ0cmltIiwidG9Mb3dlckNhc2UiLCJhZ3JlZW1lbnRSZWplY3RlZCIsImV4aXQiLCJhZ3JlZW1lbnRBY2NlcHRlZCIsImNyZWF0ZSIsIm9wdGlvbnMiLCJjb250YWluZXJEb2VzTm90RXhpc3RzIiwibmFtZSIsImNyZWF0ZUNvbnRhaW5lciIsImRvbmUiLCJjcmVhdGVDb21waWxlcnNDb250YWluZXIiLCJleGlzdHNTeW5jIiwiY29uZmlnIiwiY29tcGlsZXJzIiwibW91bnRTb3VyY2UiLCJta2RpclN5bmMiLCJyZWN1cnNpdmUiLCJjb250YWluZXIiLCJpbnRlcmFjdGl2ZSIsIkltYWdlIiwiaW1hZ2UiLCJUdHkiLCJFbnYiLCJIb3N0Q29uZmlnIiwiTW91bnRzIiwiVHlwZSIsIlNvdXJjZSIsIlRhcmdldCIsIm1vdW50RGVzdGluYXRpb24iLCJjcmVhdGVMb2NhbE5vZGVDb250YWluZXIiLCJwb3J0cyIsIkhvc3RJcCIsIkhvc3RQb3J0IiwibG9jYWxOb2RlIiwiaG9zdFBvcnQiLCJwcmVmZXJlbmNlcyIsImxvY2FsTm9kZUFyYW5nb0hvc3RQb3J0IiwiUG9ydEJpbmRpbmdzIiwiZW5zdXJlU3RhcnRlZENvbnRhaW5lciIsImxpc3RBbGxDb250YWluZXJzIiwiY29udGFpbmVySW5mbyIsImZpbmRDb250YWluZXJJbmZvIiwibGlzdEFsbEltYWdlcyIsImZpbmRJbWFnZUluZm8iLCJpbWFnZURvZXNOb3RFeGlzdHMiLCJwdWxsSW1hZ2UiLCJjb250YWluZXJDYW5Ob3RCZUNyZWF0ZWQiLCJpc1J1bm5pbmciLCJnZXRDb250YWluZXIiLCJJZCIsInN0YXJ0IiwiZW5zdXJlU3RhcnRlZExvY2FsTm9kZSIsImVuc3VyZVN0YXJ0ZWRDb21waWxlcnMiLCJzZXR1cCIsImFyZ3MiLCJwb3J0IiwiZGVmIiwidmFsdWVDb3VudCIsImFyYW5nbyIsImxvY2FsTm9kZUhvc3RQb3J0IiwiZGVmYXVsdHMiLCJjbGVhbiIsInN0b3BDb250YWluZXIiLCJpbmZvIiwic3RvcCIsIlByb21pc2UiLCJhbGwiLCJjbGVhbkNvbnRhaW5lciIsInJlbW92ZSIsImNvbnRhaW5lckhhdmVCZWVuUmVtb3ZlZCIsImNsZWFuSW1hZ2UiLCJnZXRJbWFnZSIsImltYWdlSGF2ZUJlZW5SZW1vdmVkIiwiaW1hZ2VzIiwiY29udGFpbmVycyIsImxpc3RUb25EZXZJbWFnZXMiLCJ1c2VWZXJzaW9uIiwidXNhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBdkJBOzs7Ozs7Ozs7Ozs7OztBQXlCQSxJQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQUNBLElBQU1DLElBQUksR0FBR0QsT0FBTyxDQUFDLE1BQUQsQ0FBcEI7O1NBRWVFLHFCOzs7Ozs7OytCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQzBCQyxtQkFBT0MsY0FBUCxFQUQxQjs7QUFBQTtBQUNVQyxZQUFBQSxPQURWOztBQUFBLGtCQUVRQSxPQUFPLEdBQUcsUUFGbEI7QUFBQTtBQUFBO0FBQUE7O0FBQUEsa0JBR2NDLGFBQU1DLHFCQUhwQjs7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Z0IsQ0FBcEIsRUFBdUI7QUFDbkIsb0NBQVVMLGFBQU1tRyxLQUFoQjtBQUNBbkYsY0FBQUEsT0FBTyxDQUFDUSxJQUFSLENBQWEsQ0FBYjtBQUNIOztBQUNEaUMsZ0NBQVkxRCxPQUFaLEdBQXNCNkUsSUFBSSxDQUFDLENBQUQsQ0FBMUI7QUFDQTtBQU5KO0FBQUEsbUJBT1VELEtBQUssQ0FBQyxFQUFELENBUGY7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOC0yMDE5IFRPTiBERVYgU09MVVRJT05TIExURC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgU09GVFdBUkUgRVZBTFVBVElPTiBMaWNlbnNlICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbiAqIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxuICogTGljZW5zZSBhdDogaHR0cHM6Ly93d3cudG9uLmRldi9saWNlbnNlc1xuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgVE9OIERFViBzb2Z0d2FyZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbi8vIEBmbG93XG5pbXBvcnQgdHlwZSB7XG4gICAgRENyZWF0ZUNvbnRhaW5lck9wdGlvbnMsXG4gICAgRENvbnRhaW5lckluZm8sIERJbWFnZUluZm8sIERQb3J0QmluZGluZ3MsXG59IGZyb20gXCIuL2RvY2tlclwiO1xuXG5pbXBvcnQgZG9ja2VyIGZyb20gXCIuL2RvY2tlclwiO1xuaW1wb3J0IHsgY29uZmlnLCBkZWZhdWx0cywgcHJlZmVyZW5jZXMsIHVwZGF0ZVByZWZlcmVuY2VzIH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHsgdGV4dHMgfSBmcm9tIFwiLi90ZXh0c1wiO1xuaW1wb3J0IHsgYXJnc1RvT3B0aW9ucywgYnJlYWtXb3JkcywgaW5wdXRMaW5lLCBzaG93VXNhZ2UgfSBmcm9tIFwiLi91dGlsc1wiO1xuXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuXG5hc3luYyBmdW5jdGlvbiBjaGVja1JlcXVpcmVkU29mdHdhcmUoKSB7XG4gICAgY29uc3QgdmVyc2lvbiA9IGF3YWl0IGRvY2tlci5udW1lcmljVmVyc2lvbigpO1xuICAgIGlmICh2ZXJzaW9uIDwgMTdfMDAwXzAwMCkge1xuICAgICAgICB0aHJvdyB0ZXh0cy5kb2NrZXJWZXJzaW9uUmVxdWlyZWQ7XG4gICAgfVxufVxuXG5sZXQgc2tpcExpY2Vuc2VBZ3JlZW1lbnQgPSBmYWxzZTtcblxuYXN5bmMgZnVuY3Rpb24gY2hlY2tMaWNlbnNlQWdyZWVtZW50KCkge1xuICAgIGlmIChza2lwTGljZW5zZUFncmVlbWVudCB8fCAoYXdhaXQgZG9ja2VyLmxpc3RUb25EZXZDb250YWluZXJzKCkpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBsaWNlbnNlID0gZnNcbiAgICAgICAgLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4nLCAnTElDRU5TRScpKVxuICAgICAgICAudG9TdHJpbmcoKVxuICAgICAgICAuc3BsaXQoJ1xcbicpXG4gICAgICAgIC5tYXAoYnJlYWtXb3Jkcykuam9pbignXFxuJyk7XG4gICAgY29uc29sZS5sb2cobGljZW5zZSk7XG4gICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUodGV4dHMuYWdyZWVtZW50Q29uZmlybWF0aW9uKTtcbiAgICBjb25zdCBhbnN3ZXIgPSAoYXdhaXQgaW5wdXRMaW5lKCkpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChhbnN3ZXIgIT09ICd5ZXMnKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRleHRzLmFncmVlbWVudFJlamVjdGVkKTtcbiAgICAgICAgcHJvY2Vzcy5leGl0KDApO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyh0ZXh0cy5hZ3JlZW1lbnRBY2NlcHRlZCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZShvcHRpb25zOiBEQ3JlYXRlQ29udGFpbmVyT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKHRleHRzLmNvbnRhaW5lckRvZXNOb3RFeGlzdHMob3B0aW9ucy5uYW1lIHx8ICcnKSk7XG4gICAgYXdhaXQgZG9ja2VyLmNyZWF0ZUNvbnRhaW5lcihvcHRpb25zKTtcbiAgICBjb25zb2xlLmxvZyh0ZXh0cy5kb25lKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlQ29tcGlsZXJzQ29udGFpbmVyKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghZnMuZXhpc3RzU3luYyhjb25maWcuY29tcGlsZXJzLm1vdW50U291cmNlKSkge1xuICAgICAgICBmcy5ta2RpclN5bmMoY29uZmlnLmNvbXBpbGVycy5tb3VudFNvdXJjZSwgKHsgcmVjdXJzaXZlOiB0cnVlIH06IGFueSkpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlKHtcbiAgICAgICAgbmFtZTogY29uZmlnLmNvbXBpbGVycy5jb250YWluZXIsXG4gICAgICAgIGludGVyYWN0aXZlOiB0cnVlLFxuICAgICAgICBJbWFnZTogY29uZmlnLmNvbXBpbGVycy5pbWFnZSxcbiAgICAgICAgVHR5OiB0cnVlLFxuICAgICAgICBFbnY6IFsnVVNFUl9BR1JFRU1FTlQ9eWVzJ10sXG4gICAgICAgIEhvc3RDb25maWc6IHtcbiAgICAgICAgICAgIE1vdW50czogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgVHlwZTogJ2JpbmQnLFxuICAgICAgICAgICAgICAgICAgICBTb3VyY2U6IGNvbmZpZy5jb21waWxlcnMubW91bnRTb3VyY2UsXG4gICAgICAgICAgICAgICAgICAgIFRhcmdldDogY29uZmlnLmNvbXBpbGVycy5tb3VudERlc3RpbmF0aW9uLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVMb2NhbE5vZGVDb250YWluZXIoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcG9ydHM6IERQb3J0QmluZGluZ3MgPSB7XG4gICAgICAgICc4MC90Y3AnOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgSG9zdElwOiAnJyxcbiAgICAgICAgICAgICAgICBIb3N0UG9ydDogYCR7Y29uZmlnLmxvY2FsTm9kZS5ob3N0UG9ydH1gLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICB9O1xuICAgIGlmIChwcmVmZXJlbmNlcy5sb2NhbE5vZGVBcmFuZ29Ib3N0UG9ydCAhPT0gJycpIHtcbiAgICAgICAgcG9ydHNbJzg1MjkvdGNwJ10gPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgSG9zdElwOiAnJyxcbiAgICAgICAgICAgICAgICBIb3N0UG9ydDogcHJlZmVyZW5jZXMubG9jYWxOb2RlQXJhbmdvSG9zdFBvcnQsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdXG4gICAgfVxuICAgIHJldHVybiBjcmVhdGUoe1xuICAgICAgICBuYW1lOiBjb25maWcubG9jYWxOb2RlLmNvbnRhaW5lcixcbiAgICAgICAgaW50ZXJhY3RpdmU6IHRydWUsXG4gICAgICAgIEltYWdlOiBjb25maWcubG9jYWxOb2RlLmltYWdlLFxuICAgICAgICBFbnY6IFsnVVNFUl9BR1JFRU1FTlQ9eWVzJ10sXG4gICAgICAgIEhvc3RDb25maWc6IHtcbiAgICAgICAgICAgIFBvcnRCaW5kaW5nczogcG9ydHMsXG4gICAgICAgIH0sXG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGVuc3VyZVN0YXJ0ZWRDb250YWluZXIoXG4gICAgY29udGFpbmVyOiBzdHJpbmcsXG4gICAgaW1hZ2U6IHN0cmluZyxcbiAgICBjcmVhdGU6ICgpID0+IFByb21pc2U8dm9pZD4sXG4pOiBQcm9taXNlPERDb250YWluZXJJbmZvPiB7XG4gICAgbGV0IGNvbnRhaW5lckluZm8gPSBkb2NrZXIuZmluZENvbnRhaW5lckluZm8oYXdhaXQgZG9ja2VyLmxpc3RBbGxDb250YWluZXJzKCksIGNvbnRhaW5lcik7XG4gICAgaWYgKCFjb250YWluZXJJbmZvKSB7XG4gICAgICAgIGF3YWl0IGNoZWNrTGljZW5zZUFncmVlbWVudCgpO1xuICAgICAgICBpZiAoIWRvY2tlci5maW5kSW1hZ2VJbmZvKGF3YWl0IGRvY2tlci5saXN0QWxsSW1hZ2VzKCksIGltYWdlKSkge1xuICAgICAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUodGV4dHMuaW1hZ2VEb2VzTm90RXhpc3RzKGltYWdlKSk7XG4gICAgICAgICAgICBhd2FpdCBkb2NrZXIucHVsbEltYWdlKGltYWdlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRleHRzLmRvbmUpO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IGNyZWF0ZSgpO1xuICAgICAgICBjb250YWluZXJJbmZvID0gZG9ja2VyLmZpbmRDb250YWluZXJJbmZvKGF3YWl0IGRvY2tlci5saXN0QWxsQ29udGFpbmVycygpLCBjb250YWluZXIpO1xuICAgICAgICBpZiAoIWNvbnRhaW5lckluZm8pIHtcbiAgICAgICAgICAgIHRocm93IHRleHRzLmNvbnRhaW5lckNhbk5vdEJlQ3JlYXRlZChjb250YWluZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICghZG9ja2VyLmlzUnVubmluZyhjb250YWluZXJJbmZvKSkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2NrZXIuZ2V0Q29udGFpbmVyKGNvbnRhaW5lckluZm8uSWQpO1xuICAgICAgICBhd2FpdCBjb250YWluZXIuc3RhcnQoKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRhaW5lckluZm87XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGVuc3VyZVN0YXJ0ZWRMb2NhbE5vZGUoKTogUHJvbWlzZTxEQ29udGFpbmVySW5mbz4ge1xuICAgIHJldHVybiBlbnN1cmVTdGFydGVkQ29udGFpbmVyKFxuICAgICAgICBjb25maWcubG9jYWxOb2RlLmNvbnRhaW5lcixcbiAgICAgICAgY29uZmlnLmxvY2FsTm9kZS5pbWFnZSxcbiAgICAgICAgY3JlYXRlTG9jYWxOb2RlQ29udGFpbmVyLFxuICAgICk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGVuc3VyZVN0YXJ0ZWRDb21waWxlcnMoKTogUHJvbWlzZTxEQ29udGFpbmVySW5mbz4ge1xuICAgIHJldHVybiBlbnN1cmVTdGFydGVkQ29udGFpbmVyKFxuICAgICAgICBjb25maWcuY29tcGlsZXJzLmNvbnRhaW5lcixcbiAgICAgICAgY29uZmlnLmNvbXBpbGVycy5pbWFnZSxcbiAgICAgICAgY3JlYXRlQ29tcGlsZXJzQ29udGFpbmVyLFxuICAgICk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNldHVwKGFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IGFyZ3NUb09wdGlvbnMoYXJncywge1xuICAgICAgICBwb3J0OiB7IGRlZjogJycsIHZhbHVlQ291bnQ6IDEsIHNob3J0OiAncCcgfSxcbiAgICAgICAgYXJhbmdvOiB7IGRlZjogJycsIHZhbHVlQ291bnQ6IDEsIHNob3J0OiAnYScgfSxcbiAgICB9KTtcbiAgICBhd2FpdCBjaGVja1JlcXVpcmVkU29mdHdhcmUoKTtcbiAgICBpZiAob3B0aW9ucy5wb3J0ICE9PSAnJyB8fCBvcHRpb25zLmFyYW5nbyAhPT0gJycpIHtcbiAgICAgICAgc2tpcExpY2Vuc2VBZ3JlZW1lbnQgPSAoYXdhaXQgZG9ja2VyLmxpc3RUb25EZXZDb250YWluZXJzKCkpLmxlbmd0aCA+IDA7XG4gICAgICAgIGlmIChvcHRpb25zLnBvcnQgIT09ICcnKSB7XG4gICAgICAgICAgICBwcmVmZXJlbmNlcy5sb2NhbE5vZGVIb3N0UG9ydCA9IG9wdGlvbnMucG9ydDtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5hcmFuZ28gIT09ICcnKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKG9wdGlvbnMuYXJhbmdvLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgIGNhc2UgJ2JpbmQnOlxuICAgICAgICAgICAgICAgIHByZWZlcmVuY2VzLmxvY2FsTm9kZUFyYW5nb0hvc3RQb3J0ID0gZGVmYXVsdHMubG9jYWxOb2RlQXJhbmdvSG9zdFBvcnQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd1bmJpbmQnOlxuICAgICAgICAgICAgICAgIHByZWZlcmVuY2VzLmxvY2FsTm9kZUFyYW5nb0hvc3RQb3J0ID0gJyc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHByZWZlcmVuY2VzLmxvY2FsTm9kZUFyYW5nb0hvc3RQb3J0ID0gb3B0aW9ucy5hcmFuZ287XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlUHJlZmVyZW5jZXMoKTtcbiAgICAgICAgYXdhaXQgY2xlYW4oWyctYyddKTtcbiAgICB9XG4gICAgYXdhaXQgZW5zdXJlU3RhcnRlZExvY2FsTm9kZSgpO1xuICAgIGF3YWl0IGVuc3VyZVN0YXJ0ZWRDb21waWxlcnMoKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgcmV0dXJuIGVuc3VyZVN0YXJ0ZWRMb2NhbE5vZGUoKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc3RvcENvbnRhaW5lcihpbmZvOiBEQ29udGFpbmVySW5mbykge1xuICAgIGlmIChkb2NrZXIuaXNSdW5uaW5nKGluZm8pKSB7XG4gICAgICAgIHJldHVybiBkb2NrZXIuZ2V0Q29udGFpbmVyKGluZm8uSWQpLnN0b3AoKTtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKChhd2FpdCBkb2NrZXIubGlzdFRvbkRldkNvbnRhaW5lcnMoKSkubWFwKHN0b3BDb250YWluZXIpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY2xlYW5Db250YWluZXIoaW5mbzogRENvbnRhaW5lckluZm8pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2NrZXIuZ2V0Q29udGFpbmVyKGluZm8uSWQpO1xuICAgIGlmIChkb2NrZXIuaXNSdW5uaW5nKGluZm8pKSB7XG4gICAgICAgIGF3YWl0IGNvbnRhaW5lci5zdG9wKCk7XG4gICAgfVxuICAgIGF3YWl0IGNvbnRhaW5lci5yZW1vdmUoKTtcbiAgICBjb25zb2xlLmxvZyh0ZXh0cy5jb250YWluZXJIYXZlQmVlblJlbW92ZWQoaW5mby5JZCkpXG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNsZWFuSW1hZ2UoaW5mbzogREltYWdlSW5mbyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGltYWdlID0gZG9ja2VyLmdldEltYWdlKGluZm8uSWQpO1xuICAgIGF3YWl0IGltYWdlLnJlbW92ZSgpO1xuICAgIGNvbnNvbGUubG9nKHRleHRzLmltYWdlSGF2ZUJlZW5SZW1vdmVkKGluZm8uSWQpKVxufVxuXG5hc3luYyBmdW5jdGlvbiBjbGVhbihhcmdzOiBzdHJpbmdbXSkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSBhcmdzVG9PcHRpb25zKGFyZ3MsIHtcbiAgICAgICAgaW1hZ2VzOiB7IGRlZjogZmFsc2UsIHNob3J0OiAnaScgfSxcbiAgICAgICAgY29udGFpbmVyczogeyBkZWY6IGZhbHNlLCBzaG9ydDogJ2MnIH0sXG4gICAgfSk7XG4gICAgaWYgKCFvcHRpb25zLmltYWdlcyAmJiAhb3B0aW9ucy5jb250YWluZXJzKSB7XG4gICAgICAgIG9wdGlvbnMuaW1hZ2VzID0gdHJ1ZTtcbiAgICAgICAgb3B0aW9ucy5jb250YWluZXJzID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuY29udGFpbmVycykge1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbCgoYXdhaXQgZG9ja2VyLmxpc3RUb25EZXZDb250YWluZXJzKCkpLm1hcChjbGVhbkNvbnRhaW5lcikpO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5pbWFnZXMpIHtcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoKGF3YWl0IGRvY2tlci5saXN0VG9uRGV2SW1hZ2VzKCkpLm1hcChjbGVhbkltYWdlKSk7XG4gICAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiB1c2VWZXJzaW9uKGFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgaWYgKGFyZ3MubGVuZ3RoICE9PSAxKSB7XG4gICAgICAgIHNob3dVc2FnZSh0ZXh0cy51c2FnZSk7XG4gICAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICB9XG4gICAgcHJlZmVyZW5jZXMudmVyc2lvbiA9IGFyZ3NbMF07XG4gICAgdXBkYXRlUHJlZmVyZW5jZXMoKTtcbiAgICBhd2FpdCBzZXR1cChbXSk7XG59XG5cbmV4cG9ydCB7IHNldHVwLCBlbnN1cmVTdGFydGVkTG9jYWxOb2RlLCBlbnN1cmVTdGFydGVkQ29tcGlsZXJzLCBzdGFydCwgc3RvcCwgY2xlYW4sIHVzZVZlcnNpb24gfTtcbiJdfQ==