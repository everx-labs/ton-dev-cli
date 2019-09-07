"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _config = _interopRequireDefault(require("./config"));

var _utils = require("./utils");

function docker() {
  return _docker.apply(this, arguments);
}

function _docker() {
  _docker = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var _len,
        args,
        _key,
        _args = arguments;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            for (_len = _args.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = _args[_key];
            }

            return _context.abrupt("return", _utils.run.apply(void 0, ['docker'].concat(args)));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _docker.apply(this, arguments);
}

function version() {
  return _version.apply(this, arguments);
}

function _version() {
  _version = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = _utils.versionToNumber;
            _context2.t1 = /version\s+([0-9.]+)/gi;
            _context2.next = 4;
            return docker('-v');

          case 4:
            _context2.t2 = _context2.sent;
            _context2.t3 = _context2.t1.exec.call(_context2.t1, _context2.t2)[1];
            return _context2.abrupt("return", (0, _context2.t0)(_context2.t3));

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _version.apply(this, arguments);
}

function getContainers() {
  return _getContainers.apply(this, arguments);
}

function _getContainers() {
  _getContainers = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3() {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return docker('ps', '-a', '--format', '{{.ID}}\t{{.Image}}\t{{.Status}}\t{{.Names}}');

          case 2:
            _context3.t0 = function (x) {
              return "".concat(x).trim().split('\t');
            };

            _context3.t1 = function (x) {
              return x.length === 4;
            };

            _context3.t2 = function (x) {
              return {
                id: x[0],
                image: x[1],
                status: x[2],
                stopped: x[2].toLowerCase().startsWith('exited'),
                names: x[3]
              };
            };

            return _context3.abrupt("return", _context3.sent.split('\n').map(_context3.t0).filter(_context3.t1).map(_context3.t2));

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getContainers.apply(this, arguments);
}

function start(_x) {
  return _start.apply(this, arguments);
}

function _start() {
  _start = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(id) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", docker('start', id));

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _start.apply(this, arguments);
}

function exec(_x2, _x3) {
  return _exec.apply(this, arguments);
}

function _exec() {
  _exec = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(id, workingDirectory) {
    var _len2,
        args,
        _key2,
        _args5 = arguments;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            for (_len2 = _args5.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
              args[_key2 - 2] = _args5[_key2];
            }

            return _context5.abrupt("return", docker.apply(void 0, ['exec', '-u', 'root', '-w', workingDirectory, id].concat(args)));

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _exec.apply(this, arguments);
}

function inspectVolume(_x4) {
  return _inspectVolume.apply(this, arguments);
}

function _inspectVolume() {
  _inspectVolume = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6(id) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.t0 = JSON;
            _context6.next = 3;
            return docker('volume', 'inspect', id);

          case 3:
            _context6.t1 = _context6.sent;
            return _context6.abrupt("return", _context6.t0.parse.call(_context6.t0, _context6.t1));

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _inspectVolume.apply(this, arguments);
}

function createVolume(_x5) {
  return _createVolume.apply(this, arguments);
}

function _createVolume() {
  _createVolume = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7(id) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt("return", docker('volume', 'create', id));

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _createVolume.apply(this, arguments);
}

function inspectedOrNull(_x6, _x7) {
  return _inspectedOrNull.apply(this, arguments);
}

function _inspectedOrNull() {
  _inspectedOrNull = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee8(containers, name) {
    var existing;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            existing = containers.find(function (x) {
              return x.names === name;
            });

            if (existing) {
              _context8.next = 3;
              break;
            }

            return _context8.abrupt("return", null);

          case 3:
            _context8.t1 = JSON;
            _context8.next = 6;
            return docker('container', 'inspect', existing.id);

          case 6:
            _context8.t2 = _context8.sent;
            _context8.t0 = _context8.t1.parse.call(_context8.t1, _context8.t2)[0];

            if (_context8.t0) {
              _context8.next = 10;
              break;
            }

            _context8.t0 = null;

          case 10:
            return _context8.abrupt("return", _context8.t0);

          case 11:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _inspectedOrNull.apply(this, arguments);
}

function findContainers() {
  return _findContainers.apply(this, arguments);
}

function _findContainers() {
  _findContainers = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee9() {
    var containers;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return getContainers();

          case 2:
            containers = _context9.sent;
            _context9.next = 5;
            return inspectedOrNull(containers, _config["default"].compilerKit.container);

          case 5:
            _context9.t0 = _context9.sent;
            _context9.next = 8;
            return inspectedOrNull(containers, _config["default"].localNode.container);

          case 8:
            _context9.t1 = _context9.sent;
            return _context9.abrupt("return", {
              compilerKit: _context9.t0,
              localNode: _context9.t1
            });

          case 10:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return _findContainers.apply(this, arguments);
}

var _default = {
  version: version,
  containers: getContainers,
  start: start,
  exec: exec,
  inspectVolume: inspectVolume,
  createVolume: createVolume,
  run: docker,
  findContainers: findContainers
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb2NrZXIuanMiXSwibmFtZXMiOlsiZG9ja2VyIiwiYXJncyIsInJ1biIsInZlcnNpb24iLCJ2ZXJzaW9uVG9OdW1iZXIiLCJleGVjIiwiZ2V0Q29udGFpbmVycyIsIngiLCJ0cmltIiwic3BsaXQiLCJsZW5ndGgiLCJpZCIsImltYWdlIiwic3RhdHVzIiwic3RvcHBlZCIsInRvTG93ZXJDYXNlIiwic3RhcnRzV2l0aCIsIm5hbWVzIiwibWFwIiwiZmlsdGVyIiwic3RhcnQiLCJ3b3JraW5nRGlyZWN0b3J5IiwiaW5zcGVjdFZvbHVtZSIsIkpTT04iLCJwYXJzZSIsImNyZWF0ZVZvbHVtZSIsImluc3BlY3RlZE9yTnVsbCIsImNvbnRhaW5lcnMiLCJuYW1lIiwiZXhpc3RpbmciLCJmaW5kIiwiZmluZENvbnRhaW5lcnMiLCJjb25maWciLCJjb21waWxlcktpdCIsImNvbnRhaW5lciIsImxvY2FsTm9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztTQUVlQSxNOzs7Ozs7OytCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxzQ0FBeUJDLElBQXpCO0FBQXlCQSxjQUFBQSxJQUF6QjtBQUFBOztBQUFBLDZDQUNXQywwQkFBSSxRQUFKLFNBQWlCRCxJQUFqQixFQURYOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7U0FJZUUsTzs7Ozs7OzsrQkFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkJBQ1dDLHNCQURYO0FBQUEsMkJBQzJCLHVCQUQzQjtBQUFBO0FBQUEsbUJBQzhESixNQUFNLENBQUMsSUFBRCxDQURwRTs7QUFBQTtBQUFBO0FBQUEsd0NBQ21ESyxJQURuRCxrQ0FDNEUsQ0FENUU7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O1NBSWVDLGE7Ozs7Ozs7K0JBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtB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QUxoQixrQ0FLeUUsQ0FMekU7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUEsMkJBSytFLElBTC9FOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztTQVFlTyxjOzs7Ozs7OytCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQzZCekIsYUFBYSxFQUQxQzs7QUFBQTtBQUNVcUIsWUFBQUEsVUFEVjtBQUFBO0FBQUEsbUJBRzJCRCxlQUFlLENBQUNDLFVBQUQsRUFBYUssbUJBQU9DLFdBQVAsQ0FBbUJDLFNBQWhDLENBSDFDOztBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUl5QlIsZUFBZSxDQUFDQyxVQUFELEVBQWFLLG1CQUFPRyxTQUFQLENBQWlCRCxTQUE5QixDQUp4Qzs7QUFBQTtBQUFBO0FBQUE7QUFHUUQsY0FBQUEsV0FIUjtBQUlRRSxjQUFBQSxTQUpSO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztlQVFlO0FBQ1hoQyxFQUFBQSxPQUFPLEVBQVBBLE9BRFc7QUFFWHdCLEVBQUFBLFVBQVUsRUFBRXJCLGFBRkQ7QUFHWGMsRUFBQUEsS0FBSyxFQUFMQSxLQUhXO0FBSVhmLEVBQUFBLElBQUksRUFBSkEsSUFKVztBQUtYaUIsRUFBQUEsYUFBYSxFQUFiQSxhQUxXO0FBTVhHLEVBQUFBLFlBQVksRUFBWkEsWUFOVztBQU9YdkIsRUFBQUEsR0FBRyxFQUFFRixNQVBNO0FBUVgrQixFQUFBQSxjQUFjLEVBQWRBO0FBUlcsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb25maWcgZnJvbSBcIi4vY29uZmlnXCI7XG5pbXBvcnQgeyBydW4sIHZlcnNpb25Ub051bWJlciB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIGRvY2tlciguLi5hcmdzKSB7XG4gICAgcmV0dXJuIHJ1bignZG9ja2VyJywgLi4uYXJncyk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHZlcnNpb24oKSB7XG4gICAgcmV0dXJuIHZlcnNpb25Ub051bWJlcigvdmVyc2lvblxccysoWzAtOS5dKykvZ2kuZXhlYyhhd2FpdCBkb2NrZXIoJy12JykpWzFdKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0Q29udGFpbmVycygpIHtcbiAgICByZXR1cm4gKGF3YWl0IGRvY2tlcigncHMnLCAnLWEnLCAnLS1mb3JtYXQnLCAne3suSUR9fVxcdHt7LkltYWdlfX1cXHR7ey5TdGF0dXN9fVxcdHt7Lk5hbWVzfX0nKSlcbiAgICAgICAgLnNwbGl0KCdcXG4nKVxuICAgICAgICAubWFwKHggPT4gYCR7eH1gLnRyaW0oKS5zcGxpdCgnXFx0JykpXG4gICAgICAgIC5maWx0ZXIoeCA9PiB4Lmxlbmd0aCA9PT0gNClcbiAgICAgICAgLm1hcCh4ID0+ICh7XG4gICAgICAgICAgICBpZDogeFswXSxcbiAgICAgICAgICAgIGltYWdlOiB4WzFdLFxuICAgICAgICAgICAgc3RhdHVzOiB4WzJdLFxuICAgICAgICAgICAgc3RvcHBlZDogeFsyXS50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoJ2V4aXRlZCcpLFxuICAgICAgICAgICAgbmFtZXM6IHhbM10sXG4gICAgICAgIH0pKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc3RhcnQoaWQpIHtcbiAgICByZXR1cm4gZG9ja2VyKCdzdGFydCcsIGlkKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZXhlYyhpZCwgd29ya2luZ0RpcmVjdG9yeSwgLi4uYXJncykge1xuICAgIHJldHVybiBkb2NrZXIoJ2V4ZWMnLCAnLXUnLCAncm9vdCcsICctdycsIHdvcmtpbmdEaXJlY3RvcnksIGlkLCAuLi5hcmdzKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gaW5zcGVjdFZvbHVtZShpZCkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKGF3YWl0IGRvY2tlcigndm9sdW1lJywgJ2luc3BlY3QnLCBpZCkpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVWb2x1bWUoaWQpIHtcbiAgICByZXR1cm4gZG9ja2VyKCd2b2x1bWUnLCAnY3JlYXRlJywgaWQpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBpbnNwZWN0ZWRPck51bGwoY29udGFpbmVycywgbmFtZSkge1xuICAgIGNvbnN0IGV4aXN0aW5nID0gY29udGFpbmVycy5maW5kKHggPT4geC5uYW1lcyA9PT0gbmFtZSk7XG4gICAgaWYgKCFleGlzdGluZykge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoYXdhaXQgZG9ja2VyKCdjb250YWluZXInLCAnaW5zcGVjdCcsIGV4aXN0aW5nLmlkKSlbMF0gfHwgbnVsbDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZmluZENvbnRhaW5lcnMoKSB7XG4gICAgY29uc3QgY29udGFpbmVycyA9IGF3YWl0IGdldENvbnRhaW5lcnMoKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBjb21waWxlcktpdDogYXdhaXQgaW5zcGVjdGVkT3JOdWxsKGNvbnRhaW5lcnMsIGNvbmZpZy5jb21waWxlcktpdC5jb250YWluZXIpLFxuICAgICAgICBsb2NhbE5vZGU6IGF3YWl0IGluc3BlY3RlZE9yTnVsbChjb250YWluZXJzLCBjb25maWcubG9jYWxOb2RlLmNvbnRhaW5lcilcbiAgICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgdmVyc2lvbixcbiAgICBjb250YWluZXJzOiBnZXRDb250YWluZXJzLFxuICAgIHN0YXJ0LFxuICAgIGV4ZWMsXG4gICAgaW5zcGVjdFZvbHVtZSxcbiAgICBjcmVhdGVWb2x1bWUsXG4gICAgcnVuOiBkb2NrZXIsXG4gICAgZmluZENvbnRhaW5lcnMsXG59XG4iXX0=