"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setup = setup;
exports.ensureStartedLocalNode = ensureStartedLocalNode;
exports.ensureStartedCompilers = ensureStartedCompilers;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXR1cC5qcyJdLCJuYW1lcyI6WyJmcyIsInJlcXVpcmUiLCJwYXRoIiwiY2hlY2tSZXF1aXJlZFNvZnR3YXJlIiwiZG9ja2VyIiwibnVtZXJpY1ZlcnNpb24iLCJ2ZXJzaW9uIiwidGV4dHMiLCJkb2NrZXJWZXJzaW9uUmVxdWlyZWQiLCJjaGVja0xpY2Vuc2VBZ3JlZW1lbnQiLCJsaXN0VG9uRGV2Q29udGFpbmVycyIsImxlbmd0aCIsImxpY2Vuc2UiLCJyZWFkRmlsZVN5bmMiLCJqb2luIiwiX19kaXJuYW1lIiwidG9TdHJpbmciLCJzcGxpdCIsIm1hcCIsImJyZWFrV29yZHMiLCJjb25zb2xlIiwibG9nIiwicHJvY2VzcyIsInN0ZG91dCIsIndyaXRlIiwiYWdyZWVtZW50Q29uZmlybWF0aW9uIiwiYW5zd2VyIiwidHJpbSIsInRvTG93ZXJDYXNlIiwiYWdyZWVtZW50UmVqZWN0ZWQiLCJleGl0IiwiYWdyZWVtZW50QWNjZXB0ZWQiLCJjcmVhdGUiLCJvcHRpb25zIiwiY29udGFpbmVyRG9lc05vdEV4aXN0cyIsIm5hbWUiLCJjcmVhdGVDb250YWluZXIiLCJkb25lIiwiY3JlYXRlQ29tcGlsZXJzQ29udGFpbmVyIiwiZXhpc3RzU3luYyIsImNvbmZpZyIsImNvbXBpbGVycyIsIm1vdW50U291cmNlIiwibWtkaXJTeW5jIiwicmVjdXJzaXZlIiwiY29udGFpbmVyIiwiaW50ZXJhY3RpdmUiLCJJbWFnZSIsImltYWdlIiwiVHR5IiwiRW52IiwiSG9zdENvbmZpZyIsIk1vdW50cyIsIlR5cGUiLCJTb3VyY2UiLCJUYXJnZXQiLCJtb3VudERlc3RpbmF0aW9uIiwiY3JlYXRlTG9jYWxOb2RlQ29udGFpbmVyIiwibG9jYWxOb2RlIiwiUG9ydEJpbmRpbmdzIiwiSG9zdElwIiwiSG9zdFBvcnQiLCJlbnN1cmVTdGFydGVkQ29udGFpbmVyIiwibGlzdEFsbENvbnRhaW5lcnMiLCJjb250YWluZXJJbmZvIiwiZmluZENvbnRhaW5lckluZm8iLCJsaXN0QWxsSW1hZ2VzIiwiZmluZEltYWdlSW5mbyIsImltYWdlRG9lc05vdEV4aXN0cyIsInB1bGxJbWFnZSIsImNvbnRhaW5lckNhbk5vdEJlQ3JlYXRlZCIsImlzUnVubmluZyIsImdldENvbnRhaW5lciIsIklkIiwic3RhcnQiLCJlbnN1cmVTdGFydGVkTG9jYWxOb2RlIiwiZW5zdXJlU3RhcnRlZENvbXBpbGVycyIsInNldHVwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBdkJBOzs7Ozs7Ozs7Ozs7OztBQXlCQSxJQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQUNBLElBQU1DLElBQUksR0FBR0QsT0FBTyxDQUFDLE1BQUQsQ0FBcEI7O1NBRWVFLHFCOzs7Ozs7OytCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQzBCQyxtQkFBT0MsY0FBUCxFQUQxQjs7QUFBQTtBQUNVQyxZQUFBQSxPQURWOztBQUFBLGtCQUVRQSxPQUFPLEdBQUcsUUFGbEI7QUFBQTtBQUFBO0FBQUE7O0FBQUEsa0JBR2NDLGFBQU1DLHFCQUhwQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O1NBT2VDLHFCOzs7Ozs7OytCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQ2VMLG1CQUFPTSxvQkFBUCxFQURmOztBQUFBO0FBQUEsMENBQzhDQyxNQUQ5Qzs7QUFBQSxpQ0FDdUQsQ0FEdkQ7QUFBQTtBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUFJVUMsWUFBQUEsT0FKVixHQUlvQlosRUFBRSxDQUNiYSxZQURXLENBQ0VYLElBQUksQ0FBQ1ksSUFBTCxDQUFVQyxTQUFWLEVBQXFCLElBQXJCLEVBQTJCLFNBQTNCLENBREYsRUFFWEMsUUFGVyxHQUdYQyxLQUhXLENBR0wsSUFISyxFQUlYQyxHQUpXLENBSVBDLGlCQUpPLEVBSUtMLElBSkwsQ0FJVSxJQUpWLENBSnBC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QSxVQXBCZCxHQW9CMEJ6QyxtQkFBT29FLFlBQVAsQ0FBb0JSLGFBQWEsQ0FBQ1MsRUFBbEMsQ0FwQjFCO0FBQUE7QUFBQSxtQkFxQmM1QixVQUFTLENBQUM2QixLQUFWLEVBckJkOztBQUFBO0FBQUEsOENBdUJXVixhQXZCWDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O1NBMEJlVyxzQjs7Ozs7OzsrQkFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsOENBQ1diLHNCQUFzQixDQUN6QnRCLG1CQUFPa0IsU0FBUCxDQUFpQmIsU0FEUSxFQUV6QkwsbUJBQU9rQixTQUFQLENBQWlCVixLQUZRLEVBR3pCUyx3QkFIeUIsQ0FEakM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztTQVFlbUIsc0I7Ozs7Ozs7K0JBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDhDQUNXZCxzQkFBc0IsQ0FDekJ0QixtQkFBT0MsU0FBUCxDQUFpQkksU0FEUSxFQUV6QkwsbUJBQU9DLFNBQVAsQ0FBaUJPLEtBRlEsRUFHekJWLHdCQUh5QixDQURqQzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O1NBUWV1QyxLOzs7Ozs7OytCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNVMUUscUJBQXFCLEVBRC9COztBQUFBO0FBQUE7QUFBQSxtQkFFVXdFLHNCQUFzQixFQUZoQzs7QUFBQTtBQUFBO0FBQUEsbUJBR1VDLHNCQUFzQixFQUhoQzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuLy8gQGZsb3dcbmltcG9ydCB0eXBlIHtcbiAgICBEQ3JlYXRlQ29udGFpbmVyT3B0aW9ucyxcbiAgICBEQ29udGFpbmVySW5mbyxcbn0gZnJvbSBcIi4vZG9ja2VyXCI7XG5cbmltcG9ydCBkb2NrZXIgZnJvbSBcIi4vZG9ja2VyXCI7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IHRleHRzIH0gZnJvbSBcIi4vdGV4dHNcIjtcbmltcG9ydCB7IGJyZWFrV29yZHMsIGlucHV0TGluZSB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5cbmFzeW5jIGZ1bmN0aW9uIGNoZWNrUmVxdWlyZWRTb2Z0d2FyZSgpIHtcbiAgICBjb25zdCB2ZXJzaW9uID0gYXdhaXQgZG9ja2VyLm51bWVyaWNWZXJzaW9uKCk7XG4gICAgaWYgKHZlcnNpb24gPCAxN18wMDBfMDAwKSB7XG4gICAgICAgIHRocm93IHRleHRzLmRvY2tlclZlcnNpb25SZXF1aXJlZDtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNoZWNrTGljZW5zZUFncmVlbWVudCgpIHtcbiAgICBpZiAoKGF3YWl0IGRvY2tlci5saXN0VG9uRGV2Q29udGFpbmVycygpKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbGljZW5zZSA9IGZzXG4gICAgICAgIC5yZWFkRmlsZVN5bmMocGF0aC5qb2luKF9fZGlybmFtZSwgJy4uJywgJ0xJQ0VOU0UnKSlcbiAgICAgICAgLnRvU3RyaW5nKClcbiAgICAgICAgLnNwbGl0KCdcXG4nKVxuICAgICAgICAubWFwKGJyZWFrV29yZHMpLmpvaW4oJ1xcbicpO1xuICAgIGNvbnNvbGUubG9nKGxpY2Vuc2UpO1xuICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKHRleHRzLmFncmVlbWVudENvbmZpcm1hdGlvbik7XG4gICAgY29uc3QgYW5zd2VyID0gKGF3YWl0IGlucHV0TGluZSgpKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoYW5zd2VyICE9PSAneWVzJykge1xuICAgICAgICBjb25zb2xlLmxvZyh0ZXh0cy5hZ3JlZW1lbnRSZWplY3RlZCk7XG4gICAgICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2codGV4dHMuYWdyZWVtZW50QWNjZXB0ZWQpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjcmVhdGUob3B0aW9uczogRENyZWF0ZUNvbnRhaW5lck9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBwcm9jZXNzLnN0ZG91dC53cml0ZSh0ZXh0cy5jb250YWluZXJEb2VzTm90RXhpc3RzKG9wdGlvbnMubmFtZSB8fCAnJykpO1xuICAgIGF3YWl0IGRvY2tlci5jcmVhdGVDb250YWluZXIob3B0aW9ucyk7XG4gICAgY29uc29sZS5sb2codGV4dHMuZG9uZSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUNvbXBpbGVyc0NvbnRhaW5lcigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMoY29uZmlnLmNvbXBpbGVycy5tb3VudFNvdXJjZSkpIHtcbiAgICAgICAgZnMubWtkaXJTeW5jKGNvbmZpZy5jb21waWxlcnMubW91bnRTb3VyY2UsICh7IHJlY3Vyc2l2ZTogdHJ1ZSB9OiBhbnkpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZSh7XG4gICAgICAgIG5hbWU6IGNvbmZpZy5jb21waWxlcnMuY29udGFpbmVyLFxuICAgICAgICBpbnRlcmFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgSW1hZ2U6IGNvbmZpZy5jb21waWxlcnMuaW1hZ2UsXG4gICAgICAgIFR0eTogdHJ1ZSxcbiAgICAgICAgRW52OiBbJ1VTRVJfQUdSRUVNRU5UPXllcyddLFxuICAgICAgICBIb3N0Q29uZmlnOiB7XG4gICAgICAgICAgICBNb3VudHM6IFt7XG4gICAgICAgICAgICAgICAgVHlwZTogJ2JpbmQnLFxuICAgICAgICAgICAgICAgIFNvdXJjZTogY29uZmlnLmNvbXBpbGVycy5tb3VudFNvdXJjZSxcbiAgICAgICAgICAgICAgICBUYXJnZXQ6IGNvbmZpZy5jb21waWxlcnMubW91bnREZXN0aW5hdGlvbixcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlTG9jYWxOb2RlQ29udGFpbmVyKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBjcmVhdGUoe1xuICAgICAgICBuYW1lOiBjb25maWcubG9jYWxOb2RlLmNvbnRhaW5lcixcbiAgICAgICAgaW50ZXJhY3RpdmU6IHRydWUsXG4gICAgICAgIEltYWdlOiBjb25maWcubG9jYWxOb2RlLmltYWdlLFxuICAgICAgICBFbnY6IFsnVVNFUl9BR1JFRU1FTlQ9eWVzJ10sXG4gICAgICAgIEhvc3RDb25maWc6IHtcbiAgICAgICAgICAgIFBvcnRCaW5kaW5nczoge1xuICAgICAgICAgICAgICAgICc4MC90Y3AnOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgSG9zdElwOiAnJywgSG9zdFBvcnQ6ICc4MCcgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBlbnN1cmVTdGFydGVkQ29udGFpbmVyKFxuICAgIGNvbnRhaW5lcjogc3RyaW5nLFxuICAgIGltYWdlOiBzdHJpbmcsXG4gICAgY3JlYXRlOiAoKSA9PiBQcm9taXNlPHZvaWQ+XG4pOiBQcm9taXNlPERDb250YWluZXJJbmZvPiB7XG4gICAgbGV0IGNvbnRhaW5lckluZm8gPSBkb2NrZXIuZmluZENvbnRhaW5lckluZm8oYXdhaXQgZG9ja2VyLmxpc3RBbGxDb250YWluZXJzKCksIGNvbnRhaW5lcik7XG4gICAgaWYgKCFjb250YWluZXJJbmZvKSB7XG4gICAgICAgIGF3YWl0IGNoZWNrTGljZW5zZUFncmVlbWVudCgpO1xuICAgICAgICBpZiAoIWRvY2tlci5maW5kSW1hZ2VJbmZvKGF3YWl0IGRvY2tlci5saXN0QWxsSW1hZ2VzKCksIGltYWdlKSkge1xuICAgICAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUodGV4dHMuaW1hZ2VEb2VzTm90RXhpc3RzKGltYWdlKSk7XG4gICAgICAgICAgICBhd2FpdCBkb2NrZXIucHVsbEltYWdlKGltYWdlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRleHRzLmRvbmUpO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IGNyZWF0ZSgpO1xuICAgICAgICBjb250YWluZXJJbmZvID0gZG9ja2VyLmZpbmRDb250YWluZXJJbmZvKGF3YWl0IGRvY2tlci5saXN0QWxsQ29udGFpbmVycygpLCBjb250YWluZXIpO1xuICAgICAgICBpZiAoIWNvbnRhaW5lckluZm8pIHtcbiAgICAgICAgICAgIHRocm93IHRleHRzLmNvbnRhaW5lckNhbk5vdEJlQ3JlYXRlZChjb250YWluZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICghZG9ja2VyLmlzUnVubmluZyhjb250YWluZXJJbmZvKSkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2NrZXIuZ2V0Q29udGFpbmVyKGNvbnRhaW5lckluZm8uSWQpO1xuICAgICAgICBhd2FpdCBjb250YWluZXIuc3RhcnQoKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRhaW5lckluZm87XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGVuc3VyZVN0YXJ0ZWRMb2NhbE5vZGUoKTogUHJvbWlzZTxEQ29udGFpbmVySW5mbz4ge1xuICAgIHJldHVybiBlbnN1cmVTdGFydGVkQ29udGFpbmVyKFxuICAgICAgICBjb25maWcubG9jYWxOb2RlLmNvbnRhaW5lcixcbiAgICAgICAgY29uZmlnLmxvY2FsTm9kZS5pbWFnZSxcbiAgICAgICAgY3JlYXRlTG9jYWxOb2RlQ29udGFpbmVyXG4gICAgKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZW5zdXJlU3RhcnRlZENvbXBpbGVycygpOiBQcm9taXNlPERDb250YWluZXJJbmZvPiB7XG4gICAgcmV0dXJuIGVuc3VyZVN0YXJ0ZWRDb250YWluZXIoXG4gICAgICAgIGNvbmZpZy5jb21waWxlcnMuY29udGFpbmVyLFxuICAgICAgICBjb25maWcuY29tcGlsZXJzLmltYWdlLFxuICAgICAgICBjcmVhdGVDb21waWxlcnNDb250YWluZXJcbiAgICApO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzZXR1cCgpIHtcbiAgICBhd2FpdCBjaGVja1JlcXVpcmVkU29mdHdhcmUoKTtcbiAgICBhd2FpdCBlbnN1cmVTdGFydGVkTG9jYWxOb2RlKCk7XG4gICAgYXdhaXQgZW5zdXJlU3RhcnRlZENvbXBpbGVycygpO1xufVxuXG5leHBvcnQgeyBzZXR1cCwgZW5zdXJlU3RhcnRlZExvY2FsTm9kZSwgZW5zdXJlU3RhcnRlZENvbXBpbGVycyB9O1xuIl19