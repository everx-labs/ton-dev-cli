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

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _docker = _interopRequireDefault(require("./docker"));

var _config = _interopRequireDefault(require("./config"));

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
            _context2.next = 2;
            return _docker["default"].listTonDevContainers();

          case 2:
            _context2.t0 = _context2.sent.length;

            if (!(_context2.t0 > 0)) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return");

          case 5:
            license = fs.readFileSync(path.join(__dirname, '..', 'LICENSE')).toString().split('\n').map(_utils.breakWords).join('\n');
            console.log(license);
            process.stdout.write(_texts.texts.agreementConfirmation);
            _context2.next = 10;
            return (0, _utils.inputLine)();

          case 10:
            answer = _context2.sent.trim().toLowerCase();

            if (answer !== 'yes') {
              console.log(_texts.texts.agreementRejected);
              process.exit(0);
            }

            console.log(_texts.texts.agreementAccepted);

          case 13:
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
            if (!fs.existsSync(_config["default"].compilers.mountSource)) {
              fs.mkdirSync(_config["default"].compilers.mountSource, {
                recursive: true
              });
            }

            return _context4.abrupt("return", create({
              name: _config["default"].compilers.container,
              interactive: true,
              Image: _config["default"].compilers.image,
              Tty: true,
              Env: ['USER_AGREEMENT=yes'],
              HostConfig: {
                Mounts: [{
                  Type: 'bind',
                  Source: _config["default"].compilers.mountSource,
                  Target: _config["default"].compilers.mountDestination
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
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", create({
              name: _config["default"].localNode.container,
              interactive: true,
              Image: _config["default"].localNode.image,
              Env: ['USER_AGREEMENT=yes'],
              HostConfig: {
                PortBindings: {
                  '80/tcp': [{
                    HostIp: '',
                    HostPort: '80'
                  }]
                }
              }
            }));

          case 1:
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
            return _context7.abrupt("return", ensureStartedContainer(_config["default"].localNode.container, _config["default"].localNode.image, createLocalNodeContainer));

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
            return _context8.abrupt("return", ensureStartedContainer(_config["default"].compilers.container, _config["default"].compilers.image, createCompilersContainer));

          case 1:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _ensureStartedCompilers.apply(this, arguments);
}

function setup() {
  return _setup.apply(this, arguments);
}

function _setup() {
  _setup = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee9() {
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return checkRequiredSoftware();

          case 2:
            _context9.next = 4;
            return ensureStartedLocalNode();

          case 4:
            _context9.next = 6;
            return ensureStartedCompilers();

          case 6:
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

function stopContainer(_x5) {
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

function cleanContainer(_x6) {
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
            console.log("Container [".concat(info.Id, " have been removed."));

          case 7:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));
  return _cleanContainer.apply(this, arguments);
}

function cleanImage(_x7) {
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
            console.log("Image [".concat(info.Id, " have been removed."));

          case 4:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));
  return _cleanImage.apply(this, arguments);
}

function clean() {
  return _clean.apply(this, arguments);
}

function _clean() {
  _clean = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee15() {
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.t0 = Promise;
            _context15.next = 3;
            return _docker["default"].listTonDevContainers();

          case 3:
            _context15.t1 = cleanContainer;
            _context15.t2 = _context15.sent.map(_context15.t1);
            _context15.next = 7;
            return _context15.t0.all.call(_context15.t0, _context15.t2);

          case 7:
            _context15.t3 = Promise;
            _context15.next = 10;
            return _docker["default"].listTonDevImages();

          case 10:
            _context15.t4 = cleanImage;
            _context15.t5 = _context15.sent.map(_context15.t4);
            _context15.next = 14;
            return _context15.t3.all.call(_context15.t3, _context15.t5);

          case 14:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }));
  return _clean.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXR1cC5qcyJdLCJuYW1lcyI6WyJmcyIsInJlcXVpcmUiLCJwYXRoIiwiY2hlY2tSZXF1aXJlZFNvZnR3YXJlIiwiZG9ja2VyIiwibnVtZXJpY1ZlcnNpb24iLCJ2ZXJzaW9uIiwidGV4dHMiLCJkb2NrZXJWZXJzaW9uUmVxdWlyZWQiLCJjaGVja0xpY2Vuc2VBZ3JlZW1lbnQiLCJsaXN0VG9uRGV2Q29udGFpbmVycyIsImxlbmd0aCIsImxpY2Vuc2UiLCJyZWFkRmlsZVN5bmMiLCJqb2luIiwiX19kaXJuYW1lIiwidG9TdHJpbmciLCJzcGxpdCIsIm1hcCIsImJyZWFrV29yZHMiLCJjb25zb2xlIiwibG9nIiwicHJvY2VzcyIsInN0ZG91dCIsIndyaXRlIiwiYWdyZWVtZW50Q29uZmlybWF0aW9uIiwiYW5zd2VyIiwidHJpbSIsInRvTG93ZXJDYXNlIiwiYWdyZWVtZW50UmVqZWN0ZWQiLCJleGl0IiwiYWdyZWVtZW50QWNjZXB0ZWQiLCJjcmVhdGUiLCJvcHRpb25zIiwiY29udGFpbmVyRG9lc05vdEV4aXN0cyIsIm5hbWUiLCJjcmVhdGVDb250YWluZXIiLCJkb25lIiwiY3JlYXRlQ29tcGlsZXJzQ29udGFpbmVyIiwiZXhpc3RzU3luYyIsImNvbmZpZyIsImNvbXBpbGVycyIsIm1vdW50U291cmNlIiwibWtkaXJTeW5jIiwicmVjdXJzaXZlIiwiY29udGFpbmVyIiwiaW50ZXJhY3RpdmUiLCJJbWFnZSIsImltYWdlIiwiVHR5IiwiRW52IiwiSG9zdENvbmZpZyIsIk1vdW50cyIsIlR5cGUiLCJTb3VyY2UiLCJUYXJnZXQiLCJtb3VudERlc3RpbmF0aW9uIiwiY3JlYXRlTG9jYWxOb2RlQ29udGFpbmVyIiwibG9jYWxOb2RlIiwiUG9ydEJpbmRpbmdzIiwiSG9zdElwIiwiSG9zdFBvcnQiLCJlbnN1cmVTdGFydGVkQ29udGFpbmVyIiwibGlzdEFsbENvbnRhaW5lcnMiLCJjb250YWluZXJJbmZvIiwiZmluZENvbnRhaW5lckluZm8iLCJsaXN0QWxsSW1hZ2VzIiwiZmluZEltYWdlSW5mbyIsImltYWdlRG9lc05vdEV4aXN0cyIsInB1bGxJbWFnZSIsImNvbnRhaW5lckNhbk5vdEJlQ3JlYXRlZCIsImlzUnVubmluZyIsImdldENvbnRhaW5lciIsIklkIiwic3RhcnQiLCJlbnN1cmVTdGFydGVkTG9jYWxOb2RlIiwiZW5zdXJlU3RhcnRlZENvbXBpbGVycyIsInNldHVwIiwic3RvcENvbnRhaW5lciIsImluZm8iLCJzdG9wIiwiUHJvbWlzZSIsImFsbCIsImNsZWFuQ29udGFpbmVyIiwicmVtb3ZlIiwiY2xlYW5JbWFnZSIsImdldEltYWdlIiwiY2xlYW4iLCJsaXN0VG9uRGV2SW1hZ2VzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBdkJBOzs7Ozs7Ozs7Ozs7OztBQXlCQSxJQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQUNBLElBQU1DLElBQUksR0FBR0QsT0FBTyxDQUFDLE1BQUQsQ0FBcEI7O1NBRWVFLHFCOzs7Ozs7OytCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQzBCQyxtQkFBT0MsY0FBUCxFQUQxQjs7QUFBQTtBQUNVQyxZQUFBQSxPQURWOztBQUFBLGtCQUVRQSxPQUFPLEdBQUcsUUFGbEI7QUFBQTtBQUFBO0FBQUE7O0FBQUEsa0JBR2NDLGFBQU1DLHFCQUhwQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O1NBT2VDLHFCOzs7Ozs7OytCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQ2VMLG1CQUFPTSxvQkFBUCxFQURmOztBQUFBO0FBQUEsMENBQzhDQyxNQUQ5Qzs7QUFBQSxpQ0FDdUQsQ0FEdkQ7QUFBQTtBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUFJVUMsWUFBQUEsT0FKVixHQUlvQlosRUFBRSxDQUNiYSxZQURXLENBQ0VYLElBQUksQ0FBQ1ks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QUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1UvQixZQUFBQSxLQURWLEdBQ2tCNUMsbUJBQU9rRixRQUFQLENBQWdCUCxJQUFJLENBQUNOLEVBQXJCLENBRGxCO0FBQUE7QUFBQSxtQkFFVXpCLEtBQUssQ0FBQ29DLE1BQU4sRUFGVjs7QUFBQTtBQUdJaEUsWUFBQUEsT0FBTyxDQUFDQyxHQUFSLGtCQUFzQjBELElBQUksQ0FBQ04sRUFBM0I7O0FBSEo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztTQU1lYyxLOzs7Ozs7OytCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw0QkFDVU4sT0FEVjtBQUFBO0FBQUEsbUJBQzZCN0UsbUJBQU9NLG9CQUFQLEVBRDdCOztBQUFBO0FBQUEsNEJBQ2dFeUUsY0FEaEU7QUFBQSw0Q0FDNERqRSxHQUQ1RDtBQUFBO0FBQUEsaUNBQ2tCZ0UsR0FEbEI7O0FBQUE7QUFBQSw0QkFFVUQsT0FGVjtBQUFBO0FBQUEsbUJBRTZCN0UsbUJBQU9vRixnQkFBUCxFQUY3Qjs7QUFBQTtBQUFBLDRCQUU0REgsVUFGNUQ7QUFBQSw0Q0FFd0RuRSxHQUZ4RDtBQUFBO0FBQUEsaUNBRWtCZ0UsR0FGbEI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOC0yMDE5IFRPTiBERVYgU09MVVRJT05TIExURC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgU09GVFdBUkUgRVZBTFVBVElPTiBMaWNlbnNlICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbiAqIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxuICogTGljZW5zZSBhdDogaHR0cHM6Ly93d3cudG9uLmRldi9saWNlbnNlc1xuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgVE9OIERFViBzb2Z0d2FyZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbi8vIEBmbG93XG5pbXBvcnQgdHlwZSB7XG4gICAgRENyZWF0ZUNvbnRhaW5lck9wdGlvbnMsXG4gICAgRENvbnRhaW5lckluZm8sIERJbWFnZUluZm8sXG59IGZyb20gXCIuL2RvY2tlclwiO1xuXG5pbXBvcnQgZG9ja2VyIGZyb20gXCIuL2RvY2tlclwiO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQge3RleHRzfSBmcm9tIFwiLi90ZXh0c1wiO1xuaW1wb3J0IHticmVha1dvcmRzLCBpbnB1dExpbmV9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5cbmFzeW5jIGZ1bmN0aW9uIGNoZWNrUmVxdWlyZWRTb2Z0d2FyZSgpIHtcbiAgICBjb25zdCB2ZXJzaW9uID0gYXdhaXQgZG9ja2VyLm51bWVyaWNWZXJzaW9uKCk7XG4gICAgaWYgKHZlcnNpb24gPCAxN18wMDBfMDAwKSB7XG4gICAgICAgIHRocm93IHRleHRzLmRvY2tlclZlcnNpb25SZXF1aXJlZDtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNoZWNrTGljZW5zZUFncmVlbWVudCgpIHtcbiAgICBpZiAoKGF3YWl0IGRvY2tlci5saXN0VG9uRGV2Q29udGFpbmVycygpKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbGljZW5zZSA9IGZzXG4gICAgICAgIC5yZWFkRmlsZVN5bmMocGF0aC5qb2luKF9fZGlybmFtZSwgJy4uJywgJ0xJQ0VOU0UnKSlcbiAgICAgICAgLnRvU3RyaW5nKClcbiAgICAgICAgLnNwbGl0KCdcXG4nKVxuICAgICAgICAubWFwKGJyZWFrV29yZHMpLmpvaW4oJ1xcbicpO1xuICAgIGNvbnNvbGUubG9nKGxpY2Vuc2UpO1xuICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKHRleHRzLmFncmVlbWVudENvbmZpcm1hdGlvbik7XG4gICAgY29uc3QgYW5zd2VyID0gKGF3YWl0IGlucHV0TGluZSgpKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoYW5zd2VyICE9PSAneWVzJykge1xuICAgICAgICBjb25zb2xlLmxvZyh0ZXh0cy5hZ3JlZW1lbnRSZWplY3RlZCk7XG4gICAgICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2codGV4dHMuYWdyZWVtZW50QWNjZXB0ZWQpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjcmVhdGUob3B0aW9uczogRENyZWF0ZUNvbnRhaW5lck9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBwcm9jZXNzLnN0ZG91dC53cml0ZSh0ZXh0cy5jb250YWluZXJEb2VzTm90RXhpc3RzKG9wdGlvbnMubmFtZSB8fCAnJykpO1xuICAgIGF3YWl0IGRvY2tlci5jcmVhdGVDb250YWluZXIob3B0aW9ucyk7XG4gICAgY29uc29sZS5sb2codGV4dHMuZG9uZSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUNvbXBpbGVyc0NvbnRhaW5lcigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMoY29uZmlnLmNvbXBpbGVycy5tb3VudFNvdXJjZSkpIHtcbiAgICAgICAgZnMubWtkaXJTeW5jKGNvbmZpZy5jb21waWxlcnMubW91bnRTb3VyY2UsICh7cmVjdXJzaXZlOiB0cnVlfTogYW55KSk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGUoe1xuICAgICAgICBuYW1lOiBjb25maWcuY29tcGlsZXJzLmNvbnRhaW5lcixcbiAgICAgICAgaW50ZXJhY3RpdmU6IHRydWUsXG4gICAgICAgIEltYWdlOiBjb25maWcuY29tcGlsZXJzLmltYWdlLFxuICAgICAgICBUdHk6IHRydWUsXG4gICAgICAgIEVudjogWydVU0VSX0FHUkVFTUVOVD15ZXMnXSxcbiAgICAgICAgSG9zdENvbmZpZzoge1xuICAgICAgICAgICAgTW91bnRzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBUeXBlOiAnYmluZCcsXG4gICAgICAgICAgICAgICAgICAgIFNvdXJjZTogY29uZmlnLmNvbXBpbGVycy5tb3VudFNvdXJjZSxcbiAgICAgICAgICAgICAgICAgICAgVGFyZ2V0OiBjb25maWcuY29tcGlsZXJzLm1vdW50RGVzdGluYXRpb24sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUxvY2FsTm9kZUNvbnRhaW5lcigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gY3JlYXRlKHtcbiAgICAgICAgbmFtZTogY29uZmlnLmxvY2FsTm9kZS5jb250YWluZXIsXG4gICAgICAgIGludGVyYWN0aXZlOiB0cnVlLFxuICAgICAgICBJbWFnZTogY29uZmlnLmxvY2FsTm9kZS5pbWFnZSxcbiAgICAgICAgRW52OiBbJ1VTRVJfQUdSRUVNRU5UPXllcyddLFxuICAgICAgICBIb3N0Q29uZmlnOiB7XG4gICAgICAgICAgICBQb3J0QmluZGluZ3M6IHtcbiAgICAgICAgICAgICAgICAnODAvdGNwJzogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBIb3N0SXA6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgSG9zdFBvcnQ6ICc4MCcsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGVuc3VyZVN0YXJ0ZWRDb250YWluZXIoXG4gICAgY29udGFpbmVyOiBzdHJpbmcsXG4gICAgaW1hZ2U6IHN0cmluZyxcbiAgICBjcmVhdGU6ICgpID0+IFByb21pc2U8dm9pZD4sXG4pOiBQcm9taXNlPERDb250YWluZXJJbmZvPiB7XG4gICAgbGV0IGNvbnRhaW5lckluZm8gPSBkb2NrZXIuZmluZENvbnRhaW5lckluZm8oYXdhaXQgZG9ja2VyLmxpc3RBbGxDb250YWluZXJzKCksIGNvbnRhaW5lcik7XG4gICAgaWYgKCFjb250YWluZXJJbmZvKSB7XG4gICAgICAgIGF3YWl0IGNoZWNrTGljZW5zZUFncmVlbWVudCgpO1xuICAgICAgICBpZiAoIWRvY2tlci5maW5kSW1hZ2VJbmZvKGF3YWl0IGRvY2tlci5saXN0QWxsSW1hZ2VzKCksIGltYWdlKSkge1xuICAgICAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUodGV4dHMuaW1hZ2VEb2VzTm90RXhpc3RzKGltYWdlKSk7XG4gICAgICAgICAgICBhd2FpdCBkb2NrZXIucHVsbEltYWdlKGltYWdlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRleHRzLmRvbmUpO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IGNyZWF0ZSgpO1xuICAgICAgICBjb250YWluZXJJbmZvID0gZG9ja2VyLmZpbmRDb250YWluZXJJbmZvKGF3YWl0IGRvY2tlci5saXN0QWxsQ29udGFpbmVycygpLCBjb250YWluZXIpO1xuICAgICAgICBpZiAoIWNvbnRhaW5lckluZm8pIHtcbiAgICAgICAgICAgIHRocm93IHRleHRzLmNvbnRhaW5lckNhbk5vdEJlQ3JlYXRlZChjb250YWluZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICghZG9ja2VyLmlzUnVubmluZyhjb250YWluZXJJbmZvKSkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2NrZXIuZ2V0Q29udGFpbmVyKGNvbnRhaW5lckluZm8uSWQpO1xuICAgICAgICBhd2FpdCBjb250YWluZXIuc3RhcnQoKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRhaW5lckluZm87XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGVuc3VyZVN0YXJ0ZWRMb2NhbE5vZGUoKTogUHJvbWlzZTxEQ29udGFpbmVySW5mbz4ge1xuICAgIHJldHVybiBlbnN1cmVTdGFydGVkQ29udGFpbmVyKFxuICAgICAgICBjb25maWcubG9jYWxOb2RlLmNvbnRhaW5lcixcbiAgICAgICAgY29uZmlnLmxvY2FsTm9kZS5pbWFnZSxcbiAgICAgICAgY3JlYXRlTG9jYWxOb2RlQ29udGFpbmVyLFxuICAgICk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGVuc3VyZVN0YXJ0ZWRDb21waWxlcnMoKTogUHJvbWlzZTxEQ29udGFpbmVySW5mbz4ge1xuICAgIHJldHVybiBlbnN1cmVTdGFydGVkQ29udGFpbmVyKFxuICAgICAgICBjb25maWcuY29tcGlsZXJzLmNvbnRhaW5lcixcbiAgICAgICAgY29uZmlnLmNvbXBpbGVycy5pbWFnZSxcbiAgICAgICAgY3JlYXRlQ29tcGlsZXJzQ29udGFpbmVyLFxuICAgICk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNldHVwKCkge1xuICAgIGF3YWl0IGNoZWNrUmVxdWlyZWRTb2Z0d2FyZSgpO1xuICAgIGF3YWl0IGVuc3VyZVN0YXJ0ZWRMb2NhbE5vZGUoKTtcbiAgICBhd2FpdCBlbnN1cmVTdGFydGVkQ29tcGlsZXJzKCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgIHJldHVybiBlbnN1cmVTdGFydGVkTG9jYWxOb2RlKCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHN0b3BDb250YWluZXIoaW5mbzogRENvbnRhaW5lckluZm8pIHtcbiAgICBpZiAoZG9ja2VyLmlzUnVubmluZyhpbmZvKSkge1xuICAgICAgICByZXR1cm4gZG9ja2VyLmdldENvbnRhaW5lcihpbmZvLklkKS5zdG9wKCk7XG4gICAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBzdG9wKCkge1xuICAgIHJldHVybiBQcm9taXNlLmFsbCgoYXdhaXQgZG9ja2VyLmxpc3RUb25EZXZDb250YWluZXJzKCkpLm1hcChzdG9wQ29udGFpbmVyKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNsZWFuQ29udGFpbmVyKGluZm86IERDb250YWluZXJJbmZvKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9ja2VyLmdldENvbnRhaW5lcihpbmZvLklkKTtcbiAgICBpZiAoZG9ja2VyLmlzUnVubmluZyhpbmZvKSkge1xuICAgICAgICBhd2FpdCBjb250YWluZXIuc3RvcCgpO1xuICAgIH1cbiAgICBhd2FpdCBjb250YWluZXIucmVtb3ZlKCk7XG4gICAgY29uc29sZS5sb2coYENvbnRhaW5lciBbJHtpbmZvLklkfSBoYXZlIGJlZW4gcmVtb3ZlZC5gKVxufVxuXG5hc3luYyBmdW5jdGlvbiBjbGVhbkltYWdlKGluZm86IERJbWFnZUluZm8pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBpbWFnZSA9IGRvY2tlci5nZXRJbWFnZShpbmZvLklkKTtcbiAgICBhd2FpdCBpbWFnZS5yZW1vdmUoKTtcbiAgICBjb25zb2xlLmxvZyhgSW1hZ2UgWyR7aW5mby5JZH0gaGF2ZSBiZWVuIHJlbW92ZWQuYClcbn1cblxuYXN5bmMgZnVuY3Rpb24gY2xlYW4oKSB7XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoKGF3YWl0IGRvY2tlci5saXN0VG9uRGV2Q29udGFpbmVycygpKS5tYXAoY2xlYW5Db250YWluZXIpKTtcbiAgICBhd2FpdCBQcm9taXNlLmFsbCgoYXdhaXQgZG9ja2VyLmxpc3RUb25EZXZJbWFnZXMoKSkubWFwKGNsZWFuSW1hZ2UpKTtcbn1cblxuZXhwb3J0IHtzZXR1cCwgZW5zdXJlU3RhcnRlZExvY2FsTm9kZSwgZW5zdXJlU3RhcnRlZENvbXBpbGVycywgc3RhcnQsIHN0b3AsIGNsZWFufTtcbiJdfQ==