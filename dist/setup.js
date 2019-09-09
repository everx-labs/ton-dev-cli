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

/*
 * Copyright 2018-2019 TON DEV SOLUTIONS LTD.
 *
 * Licensed under the SOFTWARE EVALUATION License (the "License"); you may not use
 * this file except in compliance with the License.  You may obtain a copy of the
 * License at:
 *
 * http://www.ton.dev/licenses
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific TON DEV software governing permissions and
 * limitations under the License.
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

function create(_x) {
  return _create.apply(this, arguments);
}

function _create() {
  _create = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(options) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            process.stdout.write("Container [".concat(options.name || '', "] does not exists. Creating..."));
            _context2.next = 3;
            return _docker["default"].createContainer(options);

          case 3:
            console.log(' Done.');

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _create.apply(this, arguments);
}

function createCompilersContainer() {
  return _createCompilersContainer.apply(this, arguments);
}

function _createCompilersContainer() {
  _createCompilersContainer = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3() {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!fs.existsSync(_config["default"].compilers.mountSource)) {
              fs.mkdirSync(_config["default"].compilers.mountSource, {
                recursive: true
              });
            }

            return _context3.abrupt("return", create({
              name: _config["default"].compilers.container,
              interactive: true,
              Image: _config["default"].compilers.image,
              Tty: true,
              User: 'root',
              Entrypoint: ['/bin/bash'],
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
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _createCompilersContainer.apply(this, arguments);
}

function createLocalNodeContainer() {
  return _createLocalNodeContainer.apply(this, arguments);
}

function _createLocalNodeContainer() {
  _createLocalNodeContainer = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4() {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", create({
              name: _config["default"].localNode.container,
              interactive: true,
              Image: _config["default"].localNode.image,
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
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _createLocalNodeContainer.apply(this, arguments);
}

function breakWords(s) {
  var words = s.split(' ');
  var result = '';
  var line = '';
  words.forEach(function (w) {
    if (line.length + w.length > 80) {
      if (result !== '') {
        result += '\n';
      }

      result += line;
      line = '';
    }

    if (line !== '') {
      line += ' ';
    }

    line += w;
  });

  if (line !== '') {
    if (result !== '') {
      result += '\n';
    }

    result += line;
  }

  return result;
}

function showLicense() {
  return _showLicense.apply(this, arguments);
}

function _showLicense() {
  _showLicense = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5() {
    var license;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            license = fs.readFileSync(path.join(__dirname, '..', 'LICENSE')).toString().split('\n').map(breakWords).join('\n');
            console.log(license); //     console.log(
            // `
            //
            // Please read the license agreement above.
            // If you are agreed with conditions input YES and press Enter.
            // `);
            // const answer = process.stdin.read();
            // if (answer !== 'YES') {
            //     process.exit(0);
            // }

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _showLicense.apply(this, arguments);
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
              _context6.next = 27;
              break;
            }

            _context6.t3 = _docker["default"];
            _context6.next = 10;
            return _docker["default"].listAllImages();

          case 10:
            _context6.t4 = _context6.sent;
            _context6.t5 = image;

            if (_context6.t3.findImageInfo.call(_context6.t3, _context6.t4, _context6.t5)) {
              _context6.next = 17;
              break;
            }

            process.stdout.write("Image [".concat(image, "] is missing. Pulling (please wait)..."));
            _context6.next = 16;
            return _docker["default"].pullImage(image);

          case 16:
            console.log(' Done.');

          case 17:
            _context6.next = 19;
            return create();

          case 19:
            _context6.t6 = _docker["default"];
            _context6.next = 22;
            return _docker["default"].listAllContainers();

          case 22:
            _context6.t7 = _context6.sent;
            _context6.t8 = container;
            containerInfo = _context6.t6.findContainerInfo.call(_context6.t6, _context6.t7, _context6.t8);

            if (containerInfo) {
              _context6.next = 27;
              break;
            }

            throw "Container [".concat(container, "] can not be created");

          case 27:
            if (_docker["default"].isRunning(containerInfo)) {
              _context6.next = 31;
              break;
            }

            _container = _docker["default"].getContainer(containerInfo.Id);
            _context6.next = 31;
            return _container.start();

          case 31:
            return _context6.abrupt("return", containerInfo);

          case 32:
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
            return showLicense();

          case 2:
            _context9.next = 4;
            return checkRequiredSoftware();

          case 4:
            _context9.next = 6;
            return ensureStartedLocalNode();

          case 6:
            _context9.next = 8;
            return ensureStartedCompilers();

          case 8:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return _setup.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXR1cC5qcyJdLCJuYW1lcyI6WyJmcyIsInJlcXVpcmUiLCJwYXRoIiwiY2hlY2tSZXF1aXJlZFNvZnR3YXJlIiwiZG9ja2VyIiwibnVtZXJpY1ZlcnNpb24iLCJ2ZXJzaW9uIiwiY3JlYXRlIiwib3B0aW9ucyIsInByb2Nlc3MiLCJzdGRvdXQiLCJ3cml0ZSIsIm5hbWUiLCJjcmVhdGVDb250YWluZXIiLCJjb25zb2xlIiwibG9nIiwiY3JlYXRlQ29tcGlsZXJzQ29udGFpbmVyIiwiZXhpc3RzU3luYyIsImNvbmZpZyIsImNvbXBpbGVycyIsIm1vdW50U291cmNlIiwibWtkaXJTeW5jIiwicmVjdXJzaXZlIiwiY29udGFpbmVyIiwiaW50ZXJhY3RpdmUiLCJJbWFnZSIsImltYWdlIiwiVHR5IiwiVXNlciIsIkVudHJ5cG9pbnQiLCJIb3N0Q29uZmlnIiwiTW91bnRzIiwiVHlwZSIsIlNvdXJjZSIsIlRhcmdldCIsIm1vdW50RGVzdGluYXRpb24iLCJjcmVhdGVMb2NhbE5vZGVDb250YWluZXIiLCJsb2NhbE5vZGUiLCJQb3J0QmluZGluZ3MiLCJIb3N0SXAiLCJIb3N0UG9ydCIsImJyZWFrV29yZHMiLCJzIiwid29yZHMiLCJzcGxpdCIsInJlc3VsdCIsImxpbmUiLCJmb3JFYWNoIiwidyIsImxlbmd0aCIsInNob3dMaWNlbnNlIiwibGljZW5zZSIsInJlYWRGaWxlU3luYyIsImpvaW4iLCJfX2Rpcm5hbWUiLCJ0b1N0cmluZyIsIm1hcCIsImVuc3VyZVN0YXJ0ZWRDb250YWluZXIiLCJsaXN0QWxsQ29udGFpbmVycyIsImNvbnRhaW5lckluZm8iLCJmaW5kQ29udGFpbmVySW5mbyIsImxpc3RBbGxJbWFnZXMiLCJmaW5kSW1hZ2VJbmZvIiwicHVsbEltYWdlIiwiaXNSdW5uaW5nIiwiZ2V0Q29udGFpbmVyIiwiSWQiLCJzdGFydCIsImVuc3VyZVN0YXJ0ZWRMb2NhbE5vZGUiLCJlbnN1cmVTdGFydGVkQ29tcGlsZXJzIiwic2V0dXAiXSwi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QmMzQyxVQUFTLENBQUM0QyxLQUFWLEVBcEJkOztBQUFBO0FBQUEsOENBc0JXUixhQXRCWDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O1NBeUJlUyxzQjs7Ozs7OzsrQkFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsOENBQ1dYLHNCQUFzQixDQUN6QnZDLG1CQUFPbUIsU0FBUCxDQUFpQmQsU0FEUSxFQUV6QkwsbUJBQU9tQixTQUFQLENBQWlCWCxLQUZRLEVBR3pCVSx3QkFIeUIsQ0FEakM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztTQVFlaUMsc0I7Ozs7Ozs7K0JBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDhDQUNXWixzQkFBc0IsQ0FDekJ2QyxtQkFBT0MsU0FBUCxDQUFpQkksU0FEUSxFQUV6QkwsbUJBQU9DLFNBQVAsQ0FBaUJPLEtBRlEsRUFHekJWLHdCQUh5QixDQURqQzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O1NBUWVzRCxLOzs7Ozs7OytCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNVcEIsV0FBVyxFQURyQjs7QUFBQTtBQUFBO0FBQUEsbUJBRVUvQyxxQkFBcUIsRUFGL0I7O0FBQUE7QUFBQTtBQUFBLG1CQUdVaUUsc0JBQXNCLEVBSGhDOztBQUFBO0FBQUE7QUFBQSxtQkFJVUMsc0JBQXNCLEVBSmhDOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG4gKiB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbiAqIExpY2Vuc2UgYXQ6XG4gKlxuICogaHR0cDovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vLyBAZmxvd1xuaW1wb3J0IHR5cGUge1xuICAgIERDcmVhdGVDb250YWluZXJPcHRpb25zLFxuICAgIERDb250YWluZXJJbmZvLFxufSBmcm9tIFwiLi9kb2NrZXJcIjtcblxuaW1wb3J0IGRvY2tlciBmcm9tIFwiLi9kb2NrZXJcIjtcbmltcG9ydCBjb25maWcgZnJvbSAnLi9jb25maWcnO1xuXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuXG5hc3luYyBmdW5jdGlvbiBjaGVja1JlcXVpcmVkU29mdHdhcmUoKSB7XG4gICAgY29uc3QgdmVyc2lvbiA9IGF3YWl0IGRvY2tlci5udW1lcmljVmVyc2lvbigpO1xuICAgIGlmICh2ZXJzaW9uIDwgMTdfMDAwXzAwMCkge1xuICAgICAgICB0aHJvdyBcIkRvY2tlciB2ZXJzaW9uIHJlcXVpcmVkIF4xN1wiO1xuICAgIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlKG9wdGlvbnM6IERDcmVhdGVDb250YWluZXJPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoYENvbnRhaW5lciBbJHtvcHRpb25zLm5hbWUgfHwgJyd9XSBkb2VzIG5vdCBleGlzdHMuIENyZWF0aW5nLi4uYCk7XG4gICAgYXdhaXQgZG9ja2VyLmNyZWF0ZUNvbnRhaW5lcihvcHRpb25zKTtcbiAgICBjb25zb2xlLmxvZygnIERvbmUuJyk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUNvbXBpbGVyc0NvbnRhaW5lcigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMoY29uZmlnLmNvbXBpbGVycy5tb3VudFNvdXJjZSkpIHtcbiAgICAgICAgZnMubWtkaXJTeW5jKGNvbmZpZy5jb21waWxlcnMubW91bnRTb3VyY2UsICh7IHJlY3Vyc2l2ZTogdHJ1ZSB9OiBhbnkpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZSh7XG4gICAgICAgIG5hbWU6IGNvbmZpZy5jb21waWxlcnMuY29udGFpbmVyLFxuICAgICAgICBpbnRlcmFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgSW1hZ2U6IGNvbmZpZy5jb21waWxlcnMuaW1hZ2UsXG4gICAgICAgIFR0eTogdHJ1ZSxcbiAgICAgICAgVXNlcjogJ3Jvb3QnLFxuICAgICAgICBFbnRyeXBvaW50OiBbJy9iaW4vYmFzaCddLFxuICAgICAgICBIb3N0Q29uZmlnOiB7XG4gICAgICAgICAgICBNb3VudHM6IFt7XG4gICAgICAgICAgICAgICAgVHlwZTogJ2JpbmQnLFxuICAgICAgICAgICAgICAgIFNvdXJjZTogY29uZmlnLmNvbXBpbGVycy5tb3VudFNvdXJjZSxcbiAgICAgICAgICAgICAgICBUYXJnZXQ6IGNvbmZpZy5jb21waWxlcnMubW91bnREZXN0aW5hdGlvbixcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlTG9jYWxOb2RlQ29udGFpbmVyKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBjcmVhdGUoe1xuICAgICAgICBuYW1lOiBjb25maWcubG9jYWxOb2RlLmNvbnRhaW5lcixcbiAgICAgICAgaW50ZXJhY3RpdmU6IHRydWUsXG4gICAgICAgIEltYWdlOiBjb25maWcubG9jYWxOb2RlLmltYWdlLFxuICAgICAgICBIb3N0Q29uZmlnOiB7XG4gICAgICAgICAgICBQb3J0QmluZGluZ3M6IHtcbiAgICAgICAgICAgICAgICAnODAvdGNwJzogW1xuICAgICAgICAgICAgICAgICAgICB7IEhvc3RJcDogJycsIEhvc3RQb3J0OiAnODAnIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gYnJlYWtXb3JkcyhzOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHdvcmRzID0gcy5zcGxpdCgnICcpO1xuICAgIGxldCByZXN1bHQgPSAnJztcbiAgICBsZXQgbGluZSA9ICcnO1xuICAgIHdvcmRzLmZvckVhY2goKHcpID0+IHtcbiAgICAgICAgaWYgKGxpbmUubGVuZ3RoICsgdy5sZW5ndGggPiA4MCkge1xuICAgICAgICAgICAgaWYgKHJlc3VsdCAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gJ1xcbic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQgKz0gbGluZTtcbiAgICAgICAgICAgIGxpbmUgPSAnJztcbiAgICAgICAgfVxuICAgICAgICBpZiAobGluZSAhPT0gJycpIHtcbiAgICAgICAgICAgIGxpbmUgKz0gJyAnO1xuICAgICAgICB9XG4gICAgICAgIGxpbmUgKz0gdztcbiAgICB9KTtcbiAgICBpZiAobGluZSAhPT0gJycpIHtcbiAgICAgICAgaWYgKHJlc3VsdCAhPT0gJycpIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSAnXFxuJztcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQgKz0gbGluZTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2hvd0xpY2Vuc2UoKSB7XG4gICAgY29uc3QgbGljZW5zZSA9IGZzXG4gICAgICAgIC5yZWFkRmlsZVN5bmMocGF0aC5qb2luKF9fZGlybmFtZSwgJy4uJywgJ0xJQ0VOU0UnKSlcbiAgICAgICAgLnRvU3RyaW5nKClcbiAgICAgICAgLnNwbGl0KCdcXG4nKVxuICAgICAgICAubWFwKGJyZWFrV29yZHMpLmpvaW4oJ1xcbicpO1xuICAgIGNvbnNvbGUubG9nKGxpY2Vuc2UpO1xuLy8gICAgIGNvbnNvbGUubG9nKFxuLy8gYFxuLy9cbi8vIFBsZWFzZSByZWFkIHRoZSBsaWNlbnNlIGFncmVlbWVudCBhYm92ZS5cbi8vIElmIHlvdSBhcmUgYWdyZWVkIHdpdGggY29uZGl0aW9ucyBpbnB1dCBZRVMgYW5kIHByZXNzIEVudGVyLlxuLy8gYCk7XG4gICAgLy8gY29uc3QgYW5zd2VyID0gcHJvY2Vzcy5zdGRpbi5yZWFkKCk7XG4gICAgLy8gaWYgKGFuc3dlciAhPT0gJ1lFUycpIHtcbiAgICAvLyAgICAgcHJvY2Vzcy5leGl0KDApO1xuICAgIC8vIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZW5zdXJlU3RhcnRlZENvbnRhaW5lcihcbiAgICBjb250YWluZXI6IHN0cmluZyxcbiAgICBpbWFnZTogc3RyaW5nLFxuICAgIGNyZWF0ZTogKCkgPT4gUHJvbWlzZTx2b2lkPlxuKTogUHJvbWlzZTxEQ29udGFpbmVySW5mbz4ge1xuICAgIGxldCBjb250YWluZXJJbmZvID0gZG9ja2VyLmZpbmRDb250YWluZXJJbmZvKGF3YWl0IGRvY2tlci5saXN0QWxsQ29udGFpbmVycygpLCBjb250YWluZXIpO1xuICAgIGlmICghY29udGFpbmVySW5mbykge1xuICAgICAgICBpZiAoIWRvY2tlci5maW5kSW1hZ2VJbmZvKGF3YWl0IGRvY2tlci5saXN0QWxsSW1hZ2VzKCksIGltYWdlKSkge1xuICAgICAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoYEltYWdlIFske2ltYWdlfV0gaXMgbWlzc2luZy4gUHVsbGluZyAocGxlYXNlIHdhaXQpLi4uYCk7XG4gICAgICAgICAgICBhd2FpdCBkb2NrZXIucHVsbEltYWdlKGltYWdlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcgRG9uZS4nKTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBjcmVhdGUoKTtcbiAgICAgICAgY29udGFpbmVySW5mbyA9IGRvY2tlci5maW5kQ29udGFpbmVySW5mbyhhd2FpdCBkb2NrZXIubGlzdEFsbENvbnRhaW5lcnMoKSwgY29udGFpbmVyKTtcbiAgICAgICAgaWYgKCFjb250YWluZXJJbmZvKSB7XG4gICAgICAgICAgICB0aHJvdyBgQ29udGFpbmVyIFske2NvbnRhaW5lcn1dIGNhbiBub3QgYmUgY3JlYXRlZGA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFkb2NrZXIuaXNSdW5uaW5nKGNvbnRhaW5lckluZm8pKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY2tlci5nZXRDb250YWluZXIoY29udGFpbmVySW5mby5JZCk7XG4gICAgICAgIGF3YWl0IGNvbnRhaW5lci5zdGFydCgpO1xuICAgIH1cbiAgICByZXR1cm4gY29udGFpbmVySW5mbztcbn1cblxuYXN5bmMgZnVuY3Rpb24gZW5zdXJlU3RhcnRlZExvY2FsTm9kZSgpOiBQcm9taXNlPERDb250YWluZXJJbmZvPiB7XG4gICAgcmV0dXJuIGVuc3VyZVN0YXJ0ZWRDb250YWluZXIoXG4gICAgICAgIGNvbmZpZy5sb2NhbE5vZGUuY29udGFpbmVyLFxuICAgICAgICBjb25maWcubG9jYWxOb2RlLmltYWdlLFxuICAgICAgICBjcmVhdGVMb2NhbE5vZGVDb250YWluZXJcbiAgICApO1xufVxuXG5hc3luYyBmdW5jdGlvbiBlbnN1cmVTdGFydGVkQ29tcGlsZXJzKCk6IFByb21pc2U8RENvbnRhaW5lckluZm8+IHtcbiAgICByZXR1cm4gZW5zdXJlU3RhcnRlZENvbnRhaW5lcihcbiAgICAgICAgY29uZmlnLmNvbXBpbGVycy5jb250YWluZXIsXG4gICAgICAgIGNvbmZpZy5jb21waWxlcnMuaW1hZ2UsXG4gICAgICAgIGNyZWF0ZUNvbXBpbGVyc0NvbnRhaW5lclxuICAgICk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNldHVwKCkge1xuICAgIGF3YWl0IHNob3dMaWNlbnNlKCk7XG4gICAgYXdhaXQgY2hlY2tSZXF1aXJlZFNvZnR3YXJlKCk7XG4gICAgYXdhaXQgZW5zdXJlU3RhcnRlZExvY2FsTm9kZSgpO1xuICAgIGF3YWl0IGVuc3VyZVN0YXJ0ZWRDb21waWxlcnMoKTtcbn1cblxuZXhwb3J0IHsgc2V0dXAsIGVuc3VyZVN0YXJ0ZWRMb2NhbE5vZGUsIGVuc3VyZVN0YXJ0ZWRDb21waWxlcnMgfTtcbiJdfQ==