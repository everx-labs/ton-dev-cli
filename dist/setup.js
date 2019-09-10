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

            throw "Docker version required ^17";

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
            return _docker["default"].listTonDevImages();

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
            console.log("\n\nIf you agree input YES and press Enter.\n");
            _context2.next = 10;
            return (0, _utils.inputLine)();

          case 10:
            answer = _context2.sent;

            if (answer !== 'YES') {
              process.exit(0);
            }

          case 12:
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
            process.stdout.write("Container [".concat(options.name || '', "] does not exists. Creating..."));
            _context3.next = 3;
            return _docker["default"].createContainer(options);

          case 3:
            console.log(' Done.');

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
              User: 'root',
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

            _context6.t3 = _docker["default"];
            _context6.next = 10;
            return _docker["default"].listAllImages();

          case 10:
            _context6.t4 = _context6.sent;
            _context6.t5 = image;

            if (_context6.t3.findImageInfo.call(_context6.t3, _context6.t4, _context6.t5)) {
              _context6.next = 19;
              break;
            }

            _context6.next = 15;
            return checkLicenseAgreement();

          case 15:
            process.stdout.write("Image [".concat(image, "] is missing. Pulling (please wait)..."));
            _context6.next = 18;
            return _docker["default"].pullImage(image);

          case 18:
            console.log(' Done.');

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

            throw "Container [".concat(container, "] can not be created");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXR1cC5qcyJdLCJuYW1lcyI6WyJmcyIsInJlcXVpcmUiLCJwYXRoIiwiY2hlY2tSZXF1aXJlZFNvZnR3YXJlIiwiZG9ja2VyIiwibnVtZXJpY1ZlcnNpb24iLCJ2ZXJzaW9uIiwiY2hlY2tMaWNlbnNlQWdyZWVtZW50IiwibGlzdFRvbkRldkltYWdlcyIsImxlbmd0aCIsImxpY2Vuc2UiLCJyZWFkRmlsZVN5bmMiLCJqb2luIiwiX19kaXJuYW1lIiwidG9TdHJpbmciLCJzcGxpdCIsIm1hcCIsImJyZWFrV29yZHMiLCJjb25zb2xlIiwibG9nIiwiYW5zd2VyIiwicHJvY2VzcyIsImV4aXQiLCJjcmVhdGUiLCJvcHRpb25zIiwic3Rkb3V0Iiwid3JpdGUiLCJuYW1lIiwiY3JlYXRlQ29udGFpbmVyIiwiY3JlYXRlQ29tcGlsZXJzQ29udGFpbmVyIiwiZXhpc3RzU3luYyIsImNvbmZpZyIsImNvbXBpbGVycyIsIm1vdW50U291cmNlIiwibWtkaXJTeW5jIiwicmVjdXJzaXZlIiwiY29udGFpbmVyIiwiaW50ZXJhY3RpdmUiLCJJbWFnZSIsImltYWdlIiwiVHR5IiwiVXNlciIsIkVudiIsIkhvc3RDb25maWciLCJNb3VudHMiLCJUeXBlIiwiU291cmNlIiwiVGFyZ2V0IiwibW91bnREZXN0aW5hdGlvbiIsImNyZWF0ZUxvY2FsTm9kZUNvbnRhaW5lciIsImxvY2FsTm9kZSIsIlBvcnRCaW5kaW5ncyIsIkhvc3RJcCIsIkhvc3RQb3J0IiwiZW5zdXJlU3RhcnRlZENvbnRhaW5lciIsImxpc3RBbGxDb250YWluZXJzIiwiY29udGFpbmVySW5mbyIsImZpbmRDb250YWluZXJJbmZvIiwibGlzdEFsbEltYWdlcyIsImZpbmRJbWFnZUluZm8iLCJwdWxsSW1hZ2UiLCJpc1J1bm5pbmciLCJnZXRDb250YWluZXIiLCJJZCIsInN0YXJ0IiwiZW5zdXJlU3RhcnRlZExvY2FsTm9kZSIsImVuc3VyZVN0YXJ0ZWRDb21waWxlcnMiLCJzZXR1cCJdLCJtYXBw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U0FBUCxDQUFpQkksU0FEUSxFQUV6QkwsbUJBQU9DLFNBQVAsQ0FBaUJPLEtBRlEsRUFHekJWLHdCQUh5QixDQURqQzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O1NBUWVzQyxLOzs7Ozs7OytCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNVaEUscUJBQXFCLEVBRC9COztBQUFBO0FBQUE7QUFBQSxtQkFFVThELHNCQUFzQixFQUZoQzs7QUFBQTtBQUFBO0FBQUEsbUJBR1VDLHNCQUFzQixFQUhoQzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuLy8gQGZsb3dcbmltcG9ydCB0eXBlIHtcbiAgICBEQ3JlYXRlQ29udGFpbmVyT3B0aW9ucyxcbiAgICBEQ29udGFpbmVySW5mbyxcbn0gZnJvbSBcIi4vZG9ja2VyXCI7XG5cbmltcG9ydCBkb2NrZXIgZnJvbSBcIi4vZG9ja2VyXCI7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IGJyZWFrV29yZHMsIGlucHV0TGluZSB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5cbmFzeW5jIGZ1bmN0aW9uIGNoZWNrUmVxdWlyZWRTb2Z0d2FyZSgpIHtcbiAgICBjb25zdCB2ZXJzaW9uID0gYXdhaXQgZG9ja2VyLm51bWVyaWNWZXJzaW9uKCk7XG4gICAgaWYgKHZlcnNpb24gPCAxN18wMDBfMDAwKSB7XG4gICAgICAgIHRocm93IFwiRG9ja2VyIHZlcnNpb24gcmVxdWlyZWQgXjE3XCI7XG4gICAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBjaGVja0xpY2Vuc2VBZ3JlZW1lbnQoKSB7XG4gICAgaWYgKChhd2FpdCBkb2NrZXIubGlzdFRvbkRldkltYWdlcygpKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbGljZW5zZSA9IGZzXG4gICAgICAgIC5yZWFkRmlsZVN5bmMocGF0aC5qb2luKF9fZGlybmFtZSwgJy4uJywgJ0xJQ0VOU0UnKSlcbiAgICAgICAgLnRvU3RyaW5nKClcbiAgICAgICAgLnNwbGl0KCdcXG4nKVxuICAgICAgICAubWFwKGJyZWFrV29yZHMpLmpvaW4oJ1xcbicpO1xuICAgIGNvbnNvbGUubG9nKGxpY2Vuc2UpO1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBgXG5cbklmIHlvdSBhZ3JlZSBpbnB1dCBZRVMgYW5kIHByZXNzIEVudGVyLlxuYCk7XG4gICAgY29uc3QgYW5zd2VyID0gYXdhaXQgaW5wdXRMaW5lKCk7XG4gICAgaWYgKGFuc3dlciAhPT0gJ1lFUycpIHtcbiAgICAgICAgcHJvY2Vzcy5leGl0KDApO1xuICAgIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlKG9wdGlvbnM6IERDcmVhdGVDb250YWluZXJPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoYENvbnRhaW5lciBbJHtvcHRpb25zLm5hbWUgfHwgJyd9XSBkb2VzIG5vdCBleGlzdHMuIENyZWF0aW5nLi4uYCk7XG4gICAgYXdhaXQgZG9ja2VyLmNyZWF0ZUNvbnRhaW5lcihvcHRpb25zKTtcbiAgICBjb25zb2xlLmxvZygnIERvbmUuJyk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUNvbXBpbGVyc0NvbnRhaW5lcigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMoY29uZmlnLmNvbXBpbGVycy5tb3VudFNvdXJjZSkpIHtcbiAgICAgICAgZnMubWtkaXJTeW5jKGNvbmZpZy5jb21waWxlcnMubW91bnRTb3VyY2UsICh7IHJlY3Vyc2l2ZTogdHJ1ZSB9OiBhbnkpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZSh7XG4gICAgICAgIG5hbWU6IGNvbmZpZy5jb21waWxlcnMuY29udGFpbmVyLFxuICAgICAgICBpbnRlcmFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgSW1hZ2U6IGNvbmZpZy5jb21waWxlcnMuaW1hZ2UsXG4gICAgICAgIFR0eTogdHJ1ZSxcbiAgICAgICAgVXNlcjogJ3Jvb3QnLFxuICAgICAgICBFbnY6IFsnVVNFUl9BR1JFRU1FTlQ9eWVzJ10sXG4gICAgICAgIEhvc3RDb25maWc6IHtcbiAgICAgICAgICAgIE1vdW50czogW3tcbiAgICAgICAgICAgICAgICBUeXBlOiAnYmluZCcsXG4gICAgICAgICAgICAgICAgU291cmNlOiBjb25maWcuY29tcGlsZXJzLm1vdW50U291cmNlLFxuICAgICAgICAgICAgICAgIFRhcmdldDogY29uZmlnLmNvbXBpbGVycy5tb3VudERlc3RpbmF0aW9uLFxuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVMb2NhbE5vZGVDb250YWluZXIoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIGNyZWF0ZSh7XG4gICAgICAgIG5hbWU6IGNvbmZpZy5sb2NhbE5vZGUuY29udGFpbmVyLFxuICAgICAgICBpbnRlcmFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgSW1hZ2U6IGNvbmZpZy5sb2NhbE5vZGUuaW1hZ2UsXG4gICAgICAgIEVudjogWydVU0VSX0FHUkVFTUVOVD15ZXMnXSxcbiAgICAgICAgSG9zdENvbmZpZzoge1xuICAgICAgICAgICAgUG9ydEJpbmRpbmdzOiB7XG4gICAgICAgICAgICAgICAgJzgwL3RjcCc6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBIb3N0SXA6ICcnLCBIb3N0UG9ydDogJzgwJyB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGVuc3VyZVN0YXJ0ZWRDb250YWluZXIoXG4gICAgY29udGFpbmVyOiBzdHJpbmcsXG4gICAgaW1hZ2U6IHN0cmluZyxcbiAgICBjcmVhdGU6ICgpID0+IFByb21pc2U8dm9pZD5cbik6IFByb21pc2U8RENvbnRhaW5lckluZm8+IHtcbiAgICBsZXQgY29udGFpbmVySW5mbyA9IGRvY2tlci5maW5kQ29udGFpbmVySW5mbyhhd2FpdCBkb2NrZXIubGlzdEFsbENvbnRhaW5lcnMoKSwgY29udGFpbmVyKTtcbiAgICBpZiAoIWNvbnRhaW5lckluZm8pIHtcbiAgICAgICAgaWYgKCFkb2NrZXIuZmluZEltYWdlSW5mbyhhd2FpdCBkb2NrZXIubGlzdEFsbEltYWdlcygpLCBpbWFnZSkpIHtcbiAgICAgICAgICAgIGF3YWl0IGNoZWNrTGljZW5zZUFncmVlbWVudCgpO1xuICAgICAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoYEltYWdlIFske2ltYWdlfV0gaXMgbWlzc2luZy4gUHVsbGluZyAocGxlYXNlIHdhaXQpLi4uYCk7XG4gICAgICAgICAgICBhd2FpdCBkb2NrZXIucHVsbEltYWdlKGltYWdlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcgRG9uZS4nKTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBjcmVhdGUoKTtcbiAgICAgICAgY29udGFpbmVySW5mbyA9IGRvY2tlci5maW5kQ29udGFpbmVySW5mbyhhd2FpdCBkb2NrZXIubGlzdEFsbENvbnRhaW5lcnMoKSwgY29udGFpbmVyKTtcbiAgICAgICAgaWYgKCFjb250YWluZXJJbmZvKSB7XG4gICAgICAgICAgICB0aHJvdyBgQ29udGFpbmVyIFske2NvbnRhaW5lcn1dIGNhbiBub3QgYmUgY3JlYXRlZGA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFkb2NrZXIuaXNSdW5uaW5nKGNvbnRhaW5lckluZm8pKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY2tlci5nZXRDb250YWluZXIoY29udGFpbmVySW5mby5JZCk7XG4gICAgICAgIGF3YWl0IGNvbnRhaW5lci5zdGFydCgpO1xuICAgIH1cbiAgICByZXR1cm4gY29udGFpbmVySW5mbztcbn1cblxuYXN5bmMgZnVuY3Rpb24gZW5zdXJlU3RhcnRlZExvY2FsTm9kZSgpOiBQcm9taXNlPERDb250YWluZXJJbmZvPiB7XG4gICAgcmV0dXJuIGVuc3VyZVN0YXJ0ZWRDb250YWluZXIoXG4gICAgICAgIGNvbmZpZy5sb2NhbE5vZGUuY29udGFpbmVyLFxuICAgICAgICBjb25maWcubG9jYWxOb2RlLmltYWdlLFxuICAgICAgICBjcmVhdGVMb2NhbE5vZGVDb250YWluZXJcbiAgICApO1xufVxuXG5hc3luYyBmdW5jdGlvbiBlbnN1cmVTdGFydGVkQ29tcGlsZXJzKCk6IFByb21pc2U8RENvbnRhaW5lckluZm8+IHtcbiAgICByZXR1cm4gZW5zdXJlU3RhcnRlZENvbnRhaW5lcihcbiAgICAgICAgY29uZmlnLmNvbXBpbGVycy5jb250YWluZXIsXG4gICAgICAgIGNvbmZpZy5jb21waWxlcnMuaW1hZ2UsXG4gICAgICAgIGNyZWF0ZUNvbXBpbGVyc0NvbnRhaW5lclxuICAgICk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNldHVwKCkge1xuICAgIGF3YWl0IGNoZWNrUmVxdWlyZWRTb2Z0d2FyZSgpO1xuICAgIGF3YWl0IGVuc3VyZVN0YXJ0ZWRMb2NhbE5vZGUoKTtcbiAgICBhd2FpdCBlbnN1cmVTdGFydGVkQ29tcGlsZXJzKCk7XG59XG5cbmV4cG9ydCB7IHNldHVwLCBlbnN1cmVTdGFydGVkTG9jYWxOb2RlLCBlbnN1cmVTdGFydGVkQ29tcGlsZXJzIH07XG4iXX0=