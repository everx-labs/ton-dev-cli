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
            process.stdout.write("\nThis Agreement takes effect when you input a \u201CYES\u201D and press Enter \nor, if earlier, when you use any of the TON DEV Software: ");
            _context2.next = 10;
            return (0, _utils.inputLine)();

          case 10:
            answer = _context2.sent.trim().toLowerCase();

            if (answer !== 'yes') {
              console.log('\n\nLicense terms were not accepted.\n');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXR1cC5qcyJdLCJuYW1lcyI6WyJmcyIsInJlcXVpcmUiLCJwYXRoIiwiY2hlY2tSZXF1aXJlZFNvZnR3YXJlIiwiZG9ja2VyIiwibnVtZXJpY1ZlcnNpb24iLCJ2ZXJzaW9uIiwiY2hlY2tMaWNlbnNlQWdyZWVtZW50IiwibGlzdFRvbkRldkNvbnRhaW5lcnMiLCJsZW5ndGgiLCJsaWNlbnNlIiwicmVhZEZpbGVTeW5jIiwiam9pbiIsIl9fZGlybmFtZSIsInRvU3RyaW5nIiwic3BsaXQiLCJtYXAiLCJicmVha1dvcmRzIiwiY29uc29sZSIsImxvZyIsInByb2Nlc3MiLCJzdGRvdXQiLCJ3cml0ZSIsImFuc3dlciIsInRyaW0iLCJ0b0xvd2VyQ2FzZSIsImV4aXQiLCJjcmVhdGUiLCJvcHRpb25zIiwibmFtZSIsImNyZWF0ZUNvbnRhaW5lciIsImNyZWF0ZUNvbXBpbGVyc0NvbnRhaW5lciIsImV4aXN0c1N5bmMiLCJjb25maWciLCJjb21waWxlcnMiLCJtb3VudFNvdXJjZSIsIm1rZGlyU3luYyIsInJlY3Vyc2l2ZSIsImNvbnRhaW5lciIsImludGVyYWN0aXZlIiwiSW1hZ2UiLCJpbWFnZSIsIlR0eSIsIkVudiIsIkhvc3RDb25maWciLCJNb3VudHMiLCJUeXBlIiwiU291cmNlIiwiVGFyZ2V0IiwibW91bnREZXN0aW5hdGlvbiIsImNyZWF0ZUxvY2FsTm9kZUNvbnRhaW5lciIsImxvY2FsTm9kZSIsIlBvcnRCaW5kaW5ncyIsIkhvc3RJcCIsIkhvc3RQb3J0IiwiZW5zdXJlU3RhcnRlZENvbnRhaW5lciIsImxpc3RBbGxDb250YWluZXJzIiwiY29udGFpbmVySW5mbyIsImZpbmRDb250YWluZXJJbmZvIiwibGlzdEFsbEltYWdlcyIsImZpbmRJbWFnZUluZm8iLCJwdWxsSW1hZ2UiLCJpc1J1bm5pbmciLCJnZXRDb250YWluZXIiLCJJZCIsInN0YXJ0IiwiZW5zdXJlU3RhcnRlZExvY2FsTm9kZSIsImVuc3VyZVN0YXJ0ZWRDb21waWxl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Ozs7OytCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw4Q0FDV1osc0JBQXNCLENBQ3pCdEIsbUJBQU9DLFNBQVAsQ0FBaUJJLFNBRFEsRUFFekJMLG1CQUFPQyxTQUFQLENBQWlCTyxLQUZRLEVBR3pCVix3QkFIeUIsQ0FEakM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztTQVFlcUMsSzs7Ozs7OzsrQkFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFDVWpFLHFCQUFxQixFQUQvQjs7QUFBQTtBQUFBO0FBQUEsbUJBRVUrRCxzQkFBc0IsRUFGaEM7O0FBQUE7QUFBQTtBQUFBLG1CQUdVQyxzQkFBc0IsRUFIaEM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOC0yMDE5IFRPTiBERVYgU09MVVRJT05TIExURC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgU09GVFdBUkUgRVZBTFVBVElPTiBMaWNlbnNlICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbiAqIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxuICogTGljZW5zZSBhdDogaHR0cHM6Ly93d3cudG9uLmRldi9saWNlbnNlc1xuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgVE9OIERFViBzb2Z0d2FyZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbi8vIEBmbG93XG5pbXBvcnQgdHlwZSB7XG4gICAgRENyZWF0ZUNvbnRhaW5lck9wdGlvbnMsXG4gICAgRENvbnRhaW5lckluZm8sXG59IGZyb20gXCIuL2RvY2tlclwiO1xuXG5pbXBvcnQgZG9ja2VyIGZyb20gXCIuL2RvY2tlclwiO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBicmVha1dvcmRzLCBpbnB1dExpbmUgfSBmcm9tIFwiLi91dGlsc1wiO1xuXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuXG5hc3luYyBmdW5jdGlvbiBjaGVja1JlcXVpcmVkU29mdHdhcmUoKSB7XG4gICAgY29uc3QgdmVyc2lvbiA9IGF3YWl0IGRvY2tlci5udW1lcmljVmVyc2lvbigpO1xuICAgIGlmICh2ZXJzaW9uIDwgMTdfMDAwXzAwMCkge1xuICAgICAgICB0aHJvdyBcIkRvY2tlciB2ZXJzaW9uIHJlcXVpcmVkIF4xN1wiO1xuICAgIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gY2hlY2tMaWNlbnNlQWdyZWVtZW50KCkge1xuICAgIGlmICgoYXdhaXQgZG9ja2VyLmxpc3RUb25EZXZDb250YWluZXJzKCkpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBsaWNlbnNlID0gZnNcbiAgICAgICAgLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4nLCAnTElDRU5TRScpKVxuICAgICAgICAudG9TdHJpbmcoKVxuICAgICAgICAuc3BsaXQoJ1xcbicpXG4gICAgICAgIC5tYXAoYnJlYWtXb3Jkcykuam9pbignXFxuJyk7XG4gICAgY29uc29sZS5sb2cobGljZW5zZSk7XG4gICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoXG4gICAgICAgIGBcblRoaXMgQWdyZWVtZW50IHRha2VzIGVmZmVjdCB3aGVuIHlvdSBpbnB1dCBhIOKAnFlFU+KAnSBhbmQgcHJlc3MgRW50ZXIgXG5vciwgaWYgZWFybGllciwgd2hlbiB5b3UgdXNlIGFueSBvZiB0aGUgVE9OIERFViBTb2Z0d2FyZTogYCk7XG4gICAgY29uc3QgYW5zd2VyID0gKGF3YWl0IGlucHV0TGluZSgpKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoYW5zd2VyICE9PSAneWVzJykge1xuICAgICAgICBjb25zb2xlLmxvZygnXFxuXFxuTGljZW5zZSB0ZXJtcyB3ZXJlIG5vdCBhY2NlcHRlZC5cXG4nLCApO1xuICAgICAgICBwcm9jZXNzLmV4aXQoMCk7XG4gICAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBjcmVhdGUob3B0aW9uczogRENyZWF0ZUNvbnRhaW5lck9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShgQ29udGFpbmVyIFske29wdGlvbnMubmFtZSB8fCAnJ31dIGRvZXMgbm90IGV4aXN0cy4gQ3JlYXRpbmcuLi5gKTtcbiAgICBhd2FpdCBkb2NrZXIuY3JlYXRlQ29udGFpbmVyKG9wdGlvbnMpO1xuICAgIGNvbnNvbGUubG9nKCcgRG9uZS4nKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlQ29tcGlsZXJzQ29udGFpbmVyKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghZnMuZXhpc3RzU3luYyhjb25maWcuY29tcGlsZXJzLm1vdW50U291cmNlKSkge1xuICAgICAgICBmcy5ta2RpclN5bmMoY29uZmlnLmNvbXBpbGVycy5tb3VudFNvdXJjZSwgKHsgcmVjdXJzaXZlOiB0cnVlIH06IGFueSkpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlKHtcbiAgICAgICAgbmFtZTogY29uZmlnLmNvbXBpbGVycy5jb250YWluZXIsXG4gICAgICAgIGludGVyYWN0aXZlOiB0cnVlLFxuICAgICAgICBJbWFnZTogY29uZmlnLmNvbXBpbGVycy5pbWFnZSxcbiAgICAgICAgVHR5OiB0cnVlLFxuICAgICAgICBFbnY6IFsnVVNFUl9BR1JFRU1FTlQ9eWVzJ10sXG4gICAgICAgIEhvc3RDb25maWc6IHtcbiAgICAgICAgICAgIE1vdW50czogW3tcbiAgICAgICAgICAgICAgICBUeXBlOiAnYmluZCcsXG4gICAgICAgICAgICAgICAgU291cmNlOiBjb25maWcuY29tcGlsZXJzLm1vdW50U291cmNlLFxuICAgICAgICAgICAgICAgIFRhcmdldDogY29uZmlnLmNvbXBpbGVycy5tb3VudERlc3RpbmF0aW9uLFxuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVMb2NhbE5vZGVDb250YWluZXIoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIGNyZWF0ZSh7XG4gICAgICAgIG5hbWU6IGNvbmZpZy5sb2NhbE5vZGUuY29udGFpbmVyLFxuICAgICAgICBpbnRlcmFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgSW1hZ2U6IGNvbmZpZy5sb2NhbE5vZGUuaW1hZ2UsXG4gICAgICAgIEVudjogWydVU0VSX0FHUkVFTUVOVD15ZXMnXSxcbiAgICAgICAgSG9zdENvbmZpZzoge1xuICAgICAgICAgICAgUG9ydEJpbmRpbmdzOiB7XG4gICAgICAgICAgICAgICAgJzgwL3RjcCc6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBIb3N0SXA6ICcnLCBIb3N0UG9ydDogJzgwJyB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGVuc3VyZVN0YXJ0ZWRDb250YWluZXIoXG4gICAgY29udGFpbmVyOiBzdHJpbmcsXG4gICAgaW1hZ2U6IHN0cmluZyxcbiAgICBjcmVhdGU6ICgpID0+IFByb21pc2U8dm9pZD5cbik6IFByb21pc2U8RENvbnRhaW5lckluZm8+IHtcbiAgICBsZXQgY29udGFpbmVySW5mbyA9IGRvY2tlci5maW5kQ29udGFpbmVySW5mbyhhd2FpdCBkb2NrZXIubGlzdEFsbENvbnRhaW5lcnMoKSwgY29udGFpbmVyKTtcbiAgICBpZiAoIWNvbnRhaW5lckluZm8pIHtcbiAgICAgICAgYXdhaXQgY2hlY2tMaWNlbnNlQWdyZWVtZW50KCk7XG4gICAgICAgIGlmICghZG9ja2VyLmZpbmRJbWFnZUluZm8oYXdhaXQgZG9ja2VyLmxpc3RBbGxJbWFnZXMoKSwgaW1hZ2UpKSB7XG4gICAgICAgICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShgSW1hZ2UgWyR7aW1hZ2V9XSBpcyBtaXNzaW5nLiBQdWxsaW5nIChwbGVhc2Ugd2FpdCkuLi5gKTtcbiAgICAgICAgICAgIGF3YWl0IGRvY2tlci5wdWxsSW1hZ2UoaW1hZ2UpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJyBEb25lLicpO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IGNyZWF0ZSgpO1xuICAgICAgICBjb250YWluZXJJbmZvID0gZG9ja2VyLmZpbmRDb250YWluZXJJbmZvKGF3YWl0IGRvY2tlci5saXN0QWxsQ29udGFpbmVycygpLCBjb250YWluZXIpO1xuICAgICAgICBpZiAoIWNvbnRhaW5lckluZm8pIHtcbiAgICAgICAgICAgIHRocm93IGBDb250YWluZXIgWyR7Y29udGFpbmVyfV0gY2FuIG5vdCBiZSBjcmVhdGVkYDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWRvY2tlci5pc1J1bm5pbmcoY29udGFpbmVySW5mbykpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9ja2VyLmdldENvbnRhaW5lcihjb250YWluZXJJbmZvLklkKTtcbiAgICAgICAgYXdhaXQgY29udGFpbmVyLnN0YXJ0KCk7XG4gICAgfVxuICAgIHJldHVybiBjb250YWluZXJJbmZvO1xufVxuXG5hc3luYyBmdW5jdGlvbiBlbnN1cmVTdGFydGVkTG9jYWxOb2RlKCk6IFByb21pc2U8RENvbnRhaW5lckluZm8+IHtcbiAgICByZXR1cm4gZW5zdXJlU3RhcnRlZENvbnRhaW5lcihcbiAgICAgICAgY29uZmlnLmxvY2FsTm9kZS5jb250YWluZXIsXG4gICAgICAgIGNvbmZpZy5sb2NhbE5vZGUuaW1hZ2UsXG4gICAgICAgIGNyZWF0ZUxvY2FsTm9kZUNvbnRhaW5lclxuICAgICk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGVuc3VyZVN0YXJ0ZWRDb21waWxlcnMoKTogUHJvbWlzZTxEQ29udGFpbmVySW5mbz4ge1xuICAgIHJldHVybiBlbnN1cmVTdGFydGVkQ29udGFpbmVyKFxuICAgICAgICBjb25maWcuY29tcGlsZXJzLmNvbnRhaW5lcixcbiAgICAgICAgY29uZmlnLmNvbXBpbGVycy5pbWFnZSxcbiAgICAgICAgY3JlYXRlQ29tcGlsZXJzQ29udGFpbmVyXG4gICAgKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2V0dXAoKSB7XG4gICAgYXdhaXQgY2hlY2tSZXF1aXJlZFNvZnR3YXJlKCk7XG4gICAgYXdhaXQgZW5zdXJlU3RhcnRlZExvY2FsTm9kZSgpO1xuICAgIGF3YWl0IGVuc3VyZVN0YXJ0ZWRDb21waWxlcnMoKTtcbn1cblxuZXhwb3J0IHsgc2V0dXAsIGVuc3VyZVN0YXJ0ZWRMb2NhbE5vZGUsIGVuc3VyZVN0YXJ0ZWRDb21waWxlcnMgfTtcbiJdfQ==