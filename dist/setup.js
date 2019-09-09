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

function ensureStartedContainer(_x2, _x3, _x4) {
  return _ensureStartedContainer.apply(this, arguments);
}

function _ensureStartedContainer() {
  _ensureStartedContainer = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(container, image, create) {
    var containerInfo, _container;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.t0 = _docker["default"];
            _context5.next = 3;
            return _docker["default"].listAllContainers();

          case 3:
            _context5.t1 = _context5.sent;
            _context5.t2 = container;
            containerInfo = _context5.t0.findContainerInfo.call(_context5.t0, _context5.t1, _context5.t2);

            if (containerInfo) {
              _context5.next = 27;
              break;
            }

            _context5.t3 = _docker["default"];
            _context5.next = 10;
            return _docker["default"].listAllImages();

          case 10:
            _context5.t4 = _context5.sent;
            _context5.t5 = image;

            if (_context5.t3.findImageInfo.call(_context5.t3, _context5.t4, _context5.t5)) {
              _context5.next = 17;
              break;
            }

            process.stdout.write("Image [".concat(image, "] is missing. Pulling (please wait)..."));
            _context5.next = 16;
            return _docker["default"].pullImage(image);

          case 16:
            console.log(' Done.');

          case 17:
            _context5.next = 19;
            return create();

          case 19:
            _context5.t6 = _docker["default"];
            _context5.next = 22;
            return _docker["default"].listAllContainers();

          case 22:
            _context5.t7 = _context5.sent;
            _context5.t8 = container;
            containerInfo = _context5.t6.findContainerInfo.call(_context5.t6, _context5.t7, _context5.t8);

            if (containerInfo) {
              _context5.next = 27;
              break;
            }

            throw "Container [".concat(container, "] can not be created");

          case 27:
            if (_docker["default"].isRunning(containerInfo)) {
              _context5.next = 31;
              break;
            }

            _container = _docker["default"].getContainer(containerInfo.Id);
            _context5.next = 31;
            return _container.start();

          case 31:
            return _context5.abrupt("return", containerInfo);

          case 32:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _ensureStartedContainer.apply(this, arguments);
}

function ensureStartedLocalNode() {
  return _ensureStartedLocalNode.apply(this, arguments);
}

function _ensureStartedLocalNode() {
  _ensureStartedLocalNode = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6() {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", ensureStartedContainer(_config["default"].localNode.container, _config["default"].localNode.image, createLocalNodeContainer));

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _ensureStartedLocalNode.apply(this, arguments);
}

function ensureStartedCompilers() {
  return _ensureStartedCompilers.apply(this, arguments);
}

function _ensureStartedCompilers() {
  _ensureStartedCompilers = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7() {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt("return", ensureStartedContainer(_config["default"].compilers.container, _config["default"].compilers.image, createCompilersContainer));

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _ensureStartedCompilers.apply(this, arguments);
}

function setup() {
  return _setup.apply(this, arguments);
}

function _setup() {
  _setup = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee8() {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return checkRequiredSoftware();

          case 2:
            _context8.next = 4;
            return ensureStartedLocalNode();

          case 4:
            _context8.next = 6;
            return ensureStartedCompilers();

          case 6:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _setup.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXR1cC5qcyJdLCJuYW1lcyI6WyJmcyIsInJlcXVpcmUiLCJjaGVja1JlcXVpcmVkU29mdHdhcmUiLCJkb2NrZXIiLCJudW1lcmljVmVyc2lvbiIsInZlcnNpb24iLCJjcmVhdGUiLCJvcHRpb25zIiwicHJvY2VzcyIsInN0ZG91dCIsIndyaXRlIiwibmFtZSIsImNyZWF0ZUNvbnRhaW5lciIsImNvbnNvbGUiLCJsb2ciLCJjcmVhdGVDb21waWxlcnNDb250YWluZXIiLCJleGlzdHNTeW5jIiwiY29uZmlnIiwiY29tcGlsZXJzIiwibW91bnRTb3VyY2UiLCJta2RpclN5bmMiLCJyZWN1cnNpdmUiLCJjb250YWluZXIiLCJpbnRlcmFjdGl2ZSIsIkltYWdlIiwiaW1hZ2UiLCJUdHkiLCJVc2VyIiwiRW50cnlwb2ludCIsIkhvc3RDb25maWciLCJNb3VudHMiLCJUeXBlIiwiU291cmNlIiwiVGFyZ2V0IiwibW91bnREZXN0aW5hdGlvbiIsImNyZWF0ZUxvY2FsTm9kZUNvbnRhaW5lciIsImxvY2FsTm9kZSIsIlBvcnRCaW5kaW5ncyIsIkhvc3RJcCIsIkhvc3RQb3J0IiwiZW5zdXJlU3RhcnRlZENvbnRhaW5lciIsImxpc3RBbGxDb250YWluZXJzIiwiY29udGFpbmVySW5mbyIsImZpbmRDb250YWluZXJJbmZvIiwibGlzdEFsbEltYWdlcyIsImZpbmRJbWFnZUluZm8iLCJwdWxsSW1hZ2UiLCJpc1J1bm5pbmciLCJnZXRDb250YWluZXIiLCJJZCIsInN0YXJ0IiwiZW5zdXJlU3RhcnRlZExvY2FsTm9kZSIsImVuc3VyZVN0YXJ0ZWRDb21waWxlcnMiLCJzZXR1cCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBOztBQUNBOztBQXZCQTs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLElBQU1BLEVBQUUsR0FBR0MsT0FBTyxDQUFDLElBQUQsQ0FBbEI7O1NBRWVDLHFCOzs7Ozs7OytCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFB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QUFBQTtBQUFBO0FBQUEsOENBQ1daLHNCQUFzQixDQUN6QnZCLG1CQUFPQyxTQUFQLENBQWlCSSxTQURRLEVBRXpCTCxtQkFBT0MsU0FBUCxDQUFpQk8sS0FGUSxFQUd6QlYsd0JBSHlCLENBRGpDOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7U0FRZXNDLEs7Ozs7Ozs7K0JBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQ1VuRCxxQkFBcUIsRUFEL0I7O0FBQUE7QUFBQTtBQUFBLG1CQUVVaUQsc0JBQXNCLEVBRmhDOztBQUFBO0FBQUE7QUFBQSxtQkFHVUMsc0JBQXNCLEVBSGhDOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG4gKiB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbiAqIExpY2Vuc2UgYXQ6XG4gKlxuICogaHR0cDovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vLyBAZmxvd1xuaW1wb3J0IHR5cGUge1xuICAgIERDb250YWluZXIsXG4gICAgRENyZWF0ZUNvbnRhaW5lck9wdGlvbnMsXG4gICAgRENvbnRhaW5lckluZm8sXG59IGZyb20gXCIuL2RvY2tlclwiO1xuXG5pbXBvcnQgZG9ja2VyIGZyb20gXCIuL2RvY2tlclwiO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcblxuYXN5bmMgZnVuY3Rpb24gY2hlY2tSZXF1aXJlZFNvZnR3YXJlKCkge1xuICAgIGNvbnN0IHZlcnNpb24gPSBhd2FpdCBkb2NrZXIubnVtZXJpY1ZlcnNpb24oKTtcbiAgICBpZiAodmVyc2lvbiA8IDE3XzAwMF8wMDApIHtcbiAgICAgICAgdGhyb3cgXCJEb2NrZXIgdmVyc2lvbiByZXF1aXJlZCBeMTdcIjtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZShvcHRpb25zOiBEQ3JlYXRlQ29udGFpbmVyT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGBDb250YWluZXIgWyR7b3B0aW9ucy5uYW1lIHx8ICcnfV0gZG9lcyBub3QgZXhpc3RzLiBDcmVhdGluZy4uLmApO1xuICAgIGF3YWl0IGRvY2tlci5jcmVhdGVDb250YWluZXIob3B0aW9ucyk7XG4gICAgY29uc29sZS5sb2coJyBEb25lLicpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVDb21waWxlcnNDb250YWluZXIoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKGNvbmZpZy5jb21waWxlcnMubW91bnRTb3VyY2UpKSB7XG4gICAgICAgIGZzLm1rZGlyU3luYyhjb25maWcuY29tcGlsZXJzLm1vdW50U291cmNlLCAoeyByZWN1cnNpdmU6IHRydWUgfTogYW55KSk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGUoe1xuICAgICAgICBuYW1lOiBjb25maWcuY29tcGlsZXJzLmNvbnRhaW5lcixcbiAgICAgICAgaW50ZXJhY3RpdmU6IHRydWUsXG4gICAgICAgIEltYWdlOiBjb25maWcuY29tcGlsZXJzLmltYWdlLFxuICAgICAgICBUdHk6IHRydWUsXG4gICAgICAgIFVzZXI6ICdyb290JyxcbiAgICAgICAgRW50cnlwb2ludDogWycvYmluL2Jhc2gnXSxcbiAgICAgICAgSG9zdENvbmZpZzoge1xuICAgICAgICAgICAgTW91bnRzOiBbe1xuICAgICAgICAgICAgICAgIFR5cGU6ICdiaW5kJyxcbiAgICAgICAgICAgICAgICBTb3VyY2U6IGNvbmZpZy5jb21waWxlcnMubW91bnRTb3VyY2UsXG4gICAgICAgICAgICAgICAgVGFyZ2V0OiBjb25maWcuY29tcGlsZXJzLm1vdW50RGVzdGluYXRpb24sXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUxvY2FsTm9kZUNvbnRhaW5lcigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gY3JlYXRlKHtcbiAgICAgICAgbmFtZTogY29uZmlnLmxvY2FsTm9kZS5jb250YWluZXIsXG4gICAgICAgIGludGVyYWN0aXZlOiB0cnVlLFxuICAgICAgICBJbWFnZTogY29uZmlnLmxvY2FsTm9kZS5pbWFnZSxcbiAgICAgICAgSG9zdENvbmZpZzoge1xuICAgICAgICAgICAgUG9ydEJpbmRpbmdzOiB7XG4gICAgICAgICAgICAgICAgJzgwL3RjcCc6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBIb3N0SXA6ICcnLCBIb3N0UG9ydDogJzgwJyB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGVuc3VyZVN0YXJ0ZWRDb250YWluZXIoXG4gICAgY29udGFpbmVyOiBzdHJpbmcsXG4gICAgaW1hZ2U6IHN0cmluZyxcbiAgICBjcmVhdGU6ICgpID0+IFByb21pc2U8dm9pZD5cbik6IFByb21pc2U8RENvbnRhaW5lckluZm8+IHtcbiAgICBsZXQgY29udGFpbmVySW5mbyA9IGRvY2tlci5maW5kQ29udGFpbmVySW5mbyhhd2FpdCBkb2NrZXIubGlzdEFsbENvbnRhaW5lcnMoKSwgY29udGFpbmVyKTtcbiAgICBpZiAoIWNvbnRhaW5lckluZm8pIHtcbiAgICAgICAgaWYgKCFkb2NrZXIuZmluZEltYWdlSW5mbyhhd2FpdCBkb2NrZXIubGlzdEFsbEltYWdlcygpLCBpbWFnZSkpIHtcbiAgICAgICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGBJbWFnZSBbJHtpbWFnZX1dIGlzIG1pc3NpbmcuIFB1bGxpbmcgKHBsZWFzZSB3YWl0KS4uLmApO1xuICAgICAgICAgICAgYXdhaXQgZG9ja2VyLnB1bGxJbWFnZShpbWFnZSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnIERvbmUuJyk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgY3JlYXRlKCk7XG4gICAgICAgIGNvbnRhaW5lckluZm8gPSBkb2NrZXIuZmluZENvbnRhaW5lckluZm8oYXdhaXQgZG9ja2VyLmxpc3RBbGxDb250YWluZXJzKCksIGNvbnRhaW5lcik7XG4gICAgICAgIGlmICghY29udGFpbmVySW5mbykge1xuICAgICAgICAgICAgdGhyb3cgYENvbnRhaW5lciBbJHtjb250YWluZXJ9XSBjYW4gbm90IGJlIGNyZWF0ZWRgO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICghZG9ja2VyLmlzUnVubmluZyhjb250YWluZXJJbmZvKSkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2NrZXIuZ2V0Q29udGFpbmVyKGNvbnRhaW5lckluZm8uSWQpO1xuICAgICAgICBhd2FpdCBjb250YWluZXIuc3RhcnQoKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRhaW5lckluZm87XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGVuc3VyZVN0YXJ0ZWRMb2NhbE5vZGUoKTogUHJvbWlzZTxEQ29udGFpbmVySW5mbz4ge1xuICAgIHJldHVybiBlbnN1cmVTdGFydGVkQ29udGFpbmVyKFxuICAgICAgICBjb25maWcubG9jYWxOb2RlLmNvbnRhaW5lcixcbiAgICAgICAgY29uZmlnLmxvY2FsTm9kZS5pbWFnZSxcbiAgICAgICAgY3JlYXRlTG9jYWxOb2RlQ29udGFpbmVyXG4gICAgKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZW5zdXJlU3RhcnRlZENvbXBpbGVycygpOiBQcm9taXNlPERDb250YWluZXJJbmZvPiB7XG4gICAgcmV0dXJuIGVuc3VyZVN0YXJ0ZWRDb250YWluZXIoXG4gICAgICAgIGNvbmZpZy5jb21waWxlcnMuY29udGFpbmVyLFxuICAgICAgICBjb25maWcuY29tcGlsZXJzLmltYWdlLFxuICAgICAgICBjcmVhdGVDb21waWxlcnNDb250YWluZXJcbiAgICApO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzZXR1cCgpIHtcbiAgICBhd2FpdCBjaGVja1JlcXVpcmVkU29mdHdhcmUoKTtcbiAgICBhd2FpdCBlbnN1cmVTdGFydGVkTG9jYWxOb2RlKCk7XG4gICAgYXdhaXQgZW5zdXJlU3RhcnRlZENvbXBpbGVycygpO1xufVxuXG5leHBvcnQgeyBzZXR1cCwgZW5zdXJlU3RhcnRlZExvY2FsTm9kZSwgZW5zdXJlU3RhcnRlZENvbXBpbGVycyB9O1xuIl19