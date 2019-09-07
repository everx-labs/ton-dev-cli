"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setup = setup;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _docker = _interopRequireDefault(require("./docker"));

var _config = _interopRequireDefault(require("./config"));

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
            return _docker["default"].version();

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

function createMissingContainers() {
  return _createMissingContainers.apply(this, arguments);
}

function _createMissingContainers() {
  _createMissingContainers = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    var containers;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _docker["default"].findContainers();

          case 2:
            containers = _context2.sent;

            if (containers.compilerKit) {
              _context2.next = 9;
              break;
            }

            if (!fs.existsSync(_config["default"].compilerKit.mountSource)) {
              fs.mkdirSync(_config["default"].compilerKit.mountSource, {
                recursive: true
              });
            }

            process.stdout.write("Container [".concat(_config["default"].compilerKit.container, "] does not exists..."));
            _context2.next = 8;
            return _docker["default"].run('create', '-it', '--name', _config["default"].compilerKit.container, '-u', 'root', '--entrypoint', '/bin/bash', '--mount', "type=bind,src=".concat(_config["default"].compilerKit.mountSource, ",dst=").concat(_config["default"].compilerKit.mountDestination), _config["default"].compilerKit.image);

          case 8:
            console.log('created.');

          case 9:
            if (containers.localNode) {
              _context2.next = 14;
              break;
            }

            process.stdout.write("Container [".concat(_config["default"].localNode.container, "] does not exists..."));
            _context2.next = 13;
            return _docker["default"].run('create', '-i', '--name', _config["default"].localNode.container, '-p80:80', _config["default"].localNode.image);

          case 13:
            console.log('created.');

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _createMissingContainers.apply(this, arguments);
}

function startStoppedContainers() {
  return _startStoppedContainers.apply(this, arguments);
}

function _startStoppedContainers() {
  _startStoppedContainers = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3() {
    var containers;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _docker["default"].findContainers();

          case 2:
            containers = _context3.sent;

            if (containers.compilerKit.State.Running) {
              _context3.next = 7;
              break;
            }

            _context3.next = 6;
            return _docker["default"].start(containers.compilerKit.Id);

          case 6:
            console.log("Container [".concat(_config["default"].compilerKit.container, "] have been started."));

          case 7:
            if (containers.localNode.State.Running) {
              _context3.next = 11;
              break;
            }

            _context3.next = 10;
            return _docker["default"].start(containers.compilerKit.Id);

          case 10:
            console.log("Container [".concat(_config["default"].localNode.container, "] have been started."));

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _startStoppedContainers.apply(this, arguments);
}

function setup() {
  return _setup.apply(this, arguments);
}

function _setup() {
  _setup = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4() {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return checkRequiredSoftware();

          case 2:
            _context4.next = 4;
            return createMissingContainers();

          case 4:
            _context4.next = 6;
            return startStoppedContainers();

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _setup.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXR1cC5qcyJdLCJuYW1lcyI6WyJmcyIsInJlcXVpcmUiLCJjaGVja1JlcXVpcmVkU29mdHdhcmUiLCJkb2NrZXIiLCJ2ZXJzaW9uIiwiY3JlYXRlTWlzc2luZ0NvbnRhaW5lcnMiLCJmaW5kQ29udGFpbmVycyIsImNvbnRhaW5lcnMiLCJjb21waWxlcktpdCIsImV4aXN0c1N5bmMiLCJjb25maWciLCJtb3VudFNvdXJjZSIsIm1rZGlyU3luYyIsInJlY3Vyc2l2ZSIsInByb2Nlc3MiLCJzdGRvdXQiLCJ3cml0ZSIsImNvbnRhaW5lciIsInJ1biIsIm1vdW50RGVzdGluYXRpb24iLCJpbWFnZSIsImNvbnNvbGUiLCJsb2ciLCJsb2NhbE5vZGUiLCJzdGFydFN0b3BwZWRDb250YWluZXJzIiwiU3RhdGUiLCJSdW5uaW5nIiwic3RhcnQiLCJJZCIsInNldHVwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0EsSUFBTUEsRUFBRSxHQUFHQyxPQUFPLENBQUMsSUFBRCxDQUFsQjs7U0FFZUMscUI7Ozs7Ozs7K0JBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFDMEJDLG1CQUFPQyxPQUFQLEVBRDFCOztBQUFBO0FBQ1VBLFlBQUFBLE9BRFY7O0FBQUEsa0JBRVFBLE9BQU8sR0FBRyxRQUZsQjtBQUFBO0FBQUE7QUFBQTs7QUFBQSxrQkFHYyw2QkFIZDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O1NBT2VDLHVCOzs7Ozs7OytCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQzZCRixtQkFBT0csY0FBUCxFQUQ3Qjs7QUFBQTtBQUNVQyxZQUFBQSxVQURWOztBQUFBLGdCQUVTQSxVQUFVLENBQUNDLFdBRnBCO0FBQUE7QUFBQTtBQUFBOztBQUdRLGdCQUFJLENBQUNSLEVBQUUsQ0FBQ1MsVUFBSCxDQUFjQyxtQkFBT0YsV0FBUCxDQUFtQkcsV0FBakMsQ0FBTCxFQUFvRDtBQUNoRFgsY0FBQUEsRUFBRSxDQUFDWSxTQUFILENBQWFGLG1CQUFPRixXQUFQLENBQW1CRyxXQUFoQyxFQUE2QztBQUFFRSxnQkFBQUEsU0FBUyxFQUFFO0FBQWIsZUFBN0M7QUFDSDs7QUFDREMsWUFBQUEsT0FBTyxDQUFDQyxNQUFSLENBQWVDLEtBQWYsc0JBQW1DTixtQkFBT0YsV0FBUCxDQUFtQlMsU0FBdEQ7QUFOUjtBQUFBLG1CQU9jZCxtQkFBT2UsR0FBUCxDQUFXLFFBQVgsRUFDRixLQURFLEVBRUYsUUFGRSxFQUVRUixtQkFBT0YsV0FBUCxDQUFtQlMsU0FGM0IsRUFHRixJQUhFLEVBR0ksTUFISixFQUlGLGNBSkUsRUFJYyxXQUpkLEVBS0YsU0FMRSwwQkFLMEJQLG1CQUFPRixXQUFQLENBQW1CRyxXQUw3QyxrQkFLZ0VELG1CQUFPRixXQUFQLENBQW1CVyxnQkFMbkYsR0FNRlQsbUJBQU9GLFdBQVAsQ0FBbUJZLEtBTmpCLENBUGQ7O0FBQUE7QUFjUUMsWUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksVUFBWjs7QUFkUjtBQUFBLGdCQWdCU2YsVUFBVSxDQUFDZ0IsU0FoQnBCO0FBQUE7QUFBQTtBQUFBOztBQWlCUVQsWUFBQUEsT0FBTyxDQUFDQyxNQUFSLENBQWVDLEtBQWYsc0JBQW1DTixtQkFBT2EsU0FBUCxDQUFpQk4sU0FBcEQ7QUFqQlI7QUFBQSxtQkFrQmNkLG1CQUFPZSxHQUFQLENBQVcsUUFBWCxFQUNGLElBREUsRUFFRixRQUZFLEVBRVFSLG1CQUFPYSxTQUFQLENBQWlCTixTQUZ6QixFQUdGLFNBSEUsRUFJRlAsbUJBQU9hLFNBQVAsQ0FBaUJILEtBSmYsQ0FsQmQ7O0FBQUE7QUF1QlFDLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFVBQVo7O0FBdkJSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7U0EyQmVFLHNCOzs7Ozs7OytCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQzZCckIsbUJBQU9HLGNBQVAsRUFEN0I7O0FBQUE7QUFDVUMsWUFBQUEsVUFEVjs7QUFBQSxnQkFFU0EsVUFBVSxDQUFDQyxXQUFYLENBQXVCaUIsS0FBdkIsQ0FBNkJDLE9BRnRDO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsbUJBR2N2QixtQkFBT3dCLEtBQVAsQ0FBYXBCLFVBQVUsQ0FBQ0MsV0FBWCxDQUF1Qm9CLEVBQXBDLENBSGQ7O0FBQUE7QUFJUVAsWUFBQUEsT0FBTyxDQUFDQyxHQUFSLHNCQUEwQlosbUJBQU9GLFdBQVAsQ0FBbUJTLFNBQTdDOztBQUpSO0FBQUEsZ0JBTVNWLFVBQVUsQ0FBQ2dCLFNBQVgsQ0FBcUJFLEtBQXJCLENBQTJCQyxPQU5wQztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLG1CQU9jdkIsbUJBQU93QixLQUFQLENBQWFwQixVQUFVLENBQUNDLFdBQVgsQ0FBdUJvQixFQUFwQyxDQVBkOztBQUFBO0FBUVFQLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUixzQkFBMEJaLG1CQUFPYSxTQUFQLENBQWlCTixTQUEzQzs7QUFSUjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O1NBWWVZLEs7Ozs7Ozs7K0JBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQ1UzQixxQkFBcUIsRUFEL0I7O0FBQUE7QUFBQTtBQUFBLG1CQUVVRyx1QkFBdUIsRUFGakM7O0FBQUE7QUFBQTtBQUFBLG1CQUdVbUIsc0JBQXNCLEVBSGhDOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZG9ja2VyIGZyb20gXCIuL2RvY2tlclwiO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5cbmFzeW5jIGZ1bmN0aW9uIGNoZWNrUmVxdWlyZWRTb2Z0d2FyZSgpIHtcbiAgICBjb25zdCB2ZXJzaW9uID0gYXdhaXQgZG9ja2VyLnZlcnNpb24oKTtcbiAgICBpZiAodmVyc2lvbiA8IDE3XzAwMF8wMDApIHtcbiAgICAgICAgdGhyb3cgXCJEb2NrZXIgdmVyc2lvbiByZXF1aXJlZCBeMTdcIjtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZU1pc3NpbmdDb250YWluZXJzKCkge1xuICAgIGNvbnN0IGNvbnRhaW5lcnMgPSBhd2FpdCBkb2NrZXIuZmluZENvbnRhaW5lcnMoKTtcbiAgICBpZiAoIWNvbnRhaW5lcnMuY29tcGlsZXJLaXQpIHtcbiAgICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKGNvbmZpZy5jb21waWxlcktpdC5tb3VudFNvdXJjZSkpIHtcbiAgICAgICAgICAgIGZzLm1rZGlyU3luYyhjb25maWcuY29tcGlsZXJLaXQubW91bnRTb3VyY2UsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGBDb250YWluZXIgWyR7Y29uZmlnLmNvbXBpbGVyS2l0LmNvbnRhaW5lcn1dIGRvZXMgbm90IGV4aXN0cy4uLmApO1xuICAgICAgICBhd2FpdCBkb2NrZXIucnVuKCdjcmVhdGUnLFxuICAgICAgICAgICAgJy1pdCcsXG4gICAgICAgICAgICAnLS1uYW1lJywgY29uZmlnLmNvbXBpbGVyS2l0LmNvbnRhaW5lcixcbiAgICAgICAgICAgICctdScsICdyb290JyxcbiAgICAgICAgICAgICctLWVudHJ5cG9pbnQnLCAnL2Jpbi9iYXNoJyxcbiAgICAgICAgICAgICctLW1vdW50JywgYHR5cGU9YmluZCxzcmM9JHtjb25maWcuY29tcGlsZXJLaXQubW91bnRTb3VyY2V9LGRzdD0ke2NvbmZpZy5jb21waWxlcktpdC5tb3VudERlc3RpbmF0aW9ufWAsXG4gICAgICAgICAgICBjb25maWcuY29tcGlsZXJLaXQuaW1hZ2UpO1xuICAgICAgICBjb25zb2xlLmxvZygnY3JlYXRlZC4nKTtcbiAgICB9XG4gICAgaWYgKCFjb250YWluZXJzLmxvY2FsTm9kZSkge1xuICAgICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShgQ29udGFpbmVyIFske2NvbmZpZy5sb2NhbE5vZGUuY29udGFpbmVyfV0gZG9lcyBub3QgZXhpc3RzLi4uYCk7XG4gICAgICAgIGF3YWl0IGRvY2tlci5ydW4oJ2NyZWF0ZScsXG4gICAgICAgICAgICAnLWknLFxuICAgICAgICAgICAgJy0tbmFtZScsIGNvbmZpZy5sb2NhbE5vZGUuY29udGFpbmVyLFxuICAgICAgICAgICAgJy1wODA6ODAnLFxuICAgICAgICAgICAgY29uZmlnLmxvY2FsTm9kZS5pbWFnZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjcmVhdGVkLicpO1xuICAgIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gc3RhcnRTdG9wcGVkQ29udGFpbmVycygpIHtcbiAgICBjb25zdCBjb250YWluZXJzID0gYXdhaXQgZG9ja2VyLmZpbmRDb250YWluZXJzKCk7XG4gICAgaWYgKCFjb250YWluZXJzLmNvbXBpbGVyS2l0LlN0YXRlLlJ1bm5pbmcpIHtcbiAgICAgICAgYXdhaXQgZG9ja2VyLnN0YXJ0KGNvbnRhaW5lcnMuY29tcGlsZXJLaXQuSWQpO1xuICAgICAgICBjb25zb2xlLmxvZyhgQ29udGFpbmVyIFske2NvbmZpZy5jb21waWxlcktpdC5jb250YWluZXJ9XSBoYXZlIGJlZW4gc3RhcnRlZC5gKTtcbiAgICB9XG4gICAgaWYgKCFjb250YWluZXJzLmxvY2FsTm9kZS5TdGF0ZS5SdW5uaW5nKSB7XG4gICAgICAgIGF3YWl0IGRvY2tlci5zdGFydChjb250YWluZXJzLmNvbXBpbGVyS2l0LklkKTtcbiAgICAgICAgY29uc29sZS5sb2coYENvbnRhaW5lciBbJHtjb25maWcubG9jYWxOb2RlLmNvbnRhaW5lcn1dIGhhdmUgYmVlbiBzdGFydGVkLmApO1xuICAgIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gc2V0dXAoKSB7XG4gICAgYXdhaXQgY2hlY2tSZXF1aXJlZFNvZnR3YXJlKCk7XG4gICAgYXdhaXQgY3JlYXRlTWlzc2luZ0NvbnRhaW5lcnMoKTtcbiAgICBhd2FpdCBzdGFydFN0b3BwZWRDb250YWluZXJzKCk7XG59XG5cbmV4cG9ydCB7c2V0dXB9O1xuIl19