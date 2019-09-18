"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.info = info;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _config = require("./config");

var _docker = _interopRequireDefault(require("./docker"));

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
function listTags(_x) {
  return _listTags.apply(this, arguments);
}

function _listTags() {
  _listTags = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(image) {
    var url, tags;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = "https://registry.hub.docker.com/v2/repositories/".concat(image, "/tags/");
            _context.next = 3;
            return (0, _utils.httpsGetJson)(url);

          case 3:
            tags = _context.sent;
            return _context.abrupt("return", tags.results.map(function (x) {
              return x.name;
            }).sort());

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _listTags.apply(this, arguments);
}

function showTonDevImages() {
  return _showTonDevImages.apply(this, arguments);
}

function _showTonDevImages() {
  _showTonDevImages = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    var images;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _docker["default"].listTonDevImages();

          case 2:
            images = _context2.sent;

            if (images.length > 0) {
              console.log();
              console.log(_texts.texts.tonDevImages(images.length));
              console.log();
              images.forEach(function (image) {
                console.log("".concat(image.RepoTags));
              });
            } else {
              console.log(_texts.texts.noTonDevImages);
            }

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _showTonDevImages.apply(this, arguments);
}

function showTonDevContainers() {
  return _showTonDevContainers.apply(this, arguments);
}

function _showTonDevContainers() {
  _showTonDevContainers = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3() {
    var containers;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _docker["default"].listTonDevContainers();

          case 2:
            containers = _context3.sent;

            if (containers.length > 0) {
              console.log();
              console.log(_texts.texts.tonDevContainers(containers.length));
              console.log();
              containers.forEach(function (container) {
                console.log("".concat(container.Names, " (").concat(container.Image, ") ").concat(container.State));
              });
            } else {
              console.log(_texts.texts.noTonDevContainers);
            }

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _showTonDevContainers.apply(this, arguments);
}

function info() {
  return _info.apply(this, arguments);
}

function _info() {
  _info = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4() {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log(_texts.texts.usageHeader(_utils.version));
            _context4.next = 3;
            return showTonDevImages();

          case 3:
            _context4.next = 5;
            return showTonDevContainers();

          case 5:
            console.log();
            console.log(_texts.texts.usedVersion(_config.preferences.version));
            _context4.t0 = console;
            _context4.t1 = _texts.texts;
            _context4.next = 11;
            return listTags(_config.defaults.compilersImageFamily);

          case 11:
            _context4.t2 = _context4.sent.join(', ');
            _context4.t3 = _context4.t1.availableVersions.call(_context4.t1, _context4.t2);

            _context4.t0.log.call(_context4.t0, _context4.t3);

            console.log();
            console.log(_texts.texts.localNodeBoundToPort(_config.preferences.localNodeHostPort));

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _info.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmZvLmpzIl0sIm5hbWVzIjpbImxpc3RUYWdzIiwiaW1hZ2UiLCJ1cmwiLCJ0YWdzIiwicmVzdWx0cyIsIm1hcCIsIngiLCJuYW1lIiwic29ydCIsInNob3dUb25EZXZJbWFnZXMiLCJkb2NrZXIiLCJsaXN0VG9uRGV2SW1hZ2VzIiwiaW1hZ2VzIiwibGVuZ3RoIiwiY29uc29sZSIsImxvZyIsInRleHRzIiwidG9uRGV2SW1hZ2VzIiwiZm9yRWFjaCIsIlJlcG9UYWdzIiwibm9Ub25EZXZJbWFnZXMiLCJzaG93VG9uRGV2Q29udGFpbmVycyIsImxpc3RUb25EZXZDb250YWluZXJzIiwiY29udGFpbmVycyIsInRvbkRldkNvbnRhaW5lcnMiLCJjb250YWluZXIiLCJOYW1lcyIsIkltYWdlIiwiU3RhdGUiLCJub1RvbkRldkNvbnRhaW5lcnMiLCJpbmZvIiwidXNhZ2VIZWFkZXIiLCJ2ZXJzaW9uIiwidXNlZFZlcnNpb24iLCJwcmVmZXJlbmNlcyIsImRlZmF1bHRzIiwiY29tcGlsZXJzSW1hZ2VGYW1pbHkiLCJqb2luIiwiYXZhaWxhYmxlVmVyc2lvbnMiLCJsb2NhbE5vZGVCb3VuZFRvUG9ydCIsImxvY2FsTm9kZUhvc3RQb3J0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBZUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBbEJBOzs7Ozs7Ozs7Ozs7OztTQW9CZUEsUTs7Ozs7OzsrQkFBZixpQkFBd0JDLEtBQXhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNVQyxZQUFBQSxHQURWLDZEQUNtRUQsS0FEbkU7QUFBQTtBQUFBLG1CQUV1Qix5QkFBYUMsR0FBYixDQUZ2Qjs7QUFBQTtBQUVVQyxZQUFBQSxJQUZWO0FBQUEsNkNBR1dBLElBQUksQ0FBQ0MsT0FBTCxDQUFhQyxHQUFiLENBQWlCLFVBQUFDLENBQUM7QUFBQSxxQkFBSUEsQ0FBQyxDQUFDQyxJQUFOO0FBQUEsYUFBbEIsRUFBOEJDLElBQTlCLEVBSFg7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztTQU1lQyxnQjs7Ozs7OzsrQkFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUN5QkMsbUJBQU9DLGdCQUFQLEVBRHpCOztBQUFBO0FBQ1VDLFlBQUFBLE1BRFY7O0FBRUksZ0JBQUlBLE1BQU0sQ0FBQ0MsTUFBUCxHQUFnQixDQUFwQixFQUF1QjtBQUNuQkMsY0FBQUEsT0FBTyxDQUFDQyxHQUFSO0FBQ0FELGNBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxhQUFNQyxZQUFOLENBQW1CTCxNQUFNLENBQUNDLE1BQTFCLENBQVo7QUFDQUMsY0FBQUEsT0FBTyxDQUFDQyxHQUFSO0FBQ0FILGNBQUFBLE1BQU0sQ0FBQ00sT0FBUCxDQUFlLFVBQUNqQixLQUFELEVBQVc7QUFDdEJhLGdCQUFBQSxPQUFPLENBQUNDLEdBQVIsV0FBZWQsS0FBSyxDQUFDa0IsUUFBckI7QUFDSCxlQUZEO0FBR0gsYUFQRCxNQU9PO0FBQ0hMLGNBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxhQUFNSSxjQUFsQjtBQUNIOztBQVhMO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7U0FjZUMsb0I7Ozs7Ozs7K0JBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFDNkJYLG1CQUFPWSxvQkFBUCxFQUQ3Qjs7QUFBQTtBQUNVQyxZQUFBQSxVQURWOztBQUVJLGdCQUFJQSxVQUFVLENBQUNWLE1BQVgsR0FBb0IsQ0FBeEIsRUFBMkI7QUFDdkJDLGNBQUFBLE9BQU8sQ0FBQ0MsR0FBUjtBQUNBRCxjQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsYUFBTVEsZ0JBQU4sQ0FBdUJELFVBQVUsQ0FBQ1YsTUFBbEMsQ0FBWjtBQUNBQyxjQUFBQSxPQUFPLENBQUNDLEdBQVI7QUFDQVEsY0FBQUEsVUFBVSxDQUFDTCxPQUFYLENBQW1CLFVBQUNPLFNBQUQsRUFBZTtBQUM5QlgsZ0JBQUFBLE9BQU8sQ0FBQ0MsR0FBUixXQUFlVSxTQUFTLENBQUNDLEtBQXpCLGVBQW1DRCxTQUFTLENBQUNFLEtBQTdDLGVBQXVERixTQUFTLENBQUNHLEtBQWpFO0FBQ0gsZUFGRDtBQUdILGFBUEQsTUFPTztBQUNIZCxjQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsYUFBTWEsa0JBQWxCO0FBQ0g7O0FBWEw7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztTQWFlQyxJOzs7Ozs7OytCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDSWhCLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxhQUFNZSxXQUFOLENBQWtCQyxjQUFsQixDQUFaO0FBREo7QUFBQSxtQkFFVXZCLGdCQUFnQixFQUYxQjs7QUFBQTtBQUFBO0FBQUEsbUJBR1VZLG9CQUFvQixFQUg5Qjs7QUFBQTtBQUtJUCxZQUFBQSxPQUFPLENBQUNDLEdBQVI7QUFDQUQsWUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlDLGFBQU1pQixXQUFOLENBQWtCQyxvQkFBWUYsT0FBOUIsQ0FBWjtBQU5KLDJCQU9JbEIsT0FQSjtBQUFBLDJCQU9nQkUsWUFQaEI7QUFBQTtBQUFBLG1CQU8rQ2hCLFFBQVEsQ0FBQ21DLGlCQUFTQyxvQkFBVixDQVB2RDs7QUFBQTtBQUFBLDBDQU93RkMsSUFQeEYsQ0FPNkYsSUFQN0Y7QUFBQSx3Q0FPc0JDLGlCQVB0Qjs7QUFBQSx5QkFPWXZCLEdBUFo7O0FBUUlELFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUjtBQUNBRCxZQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsYUFBTXVCLG9CQUFOLENBQTJCTCxvQkFBWU0saUJBQXZDLENBQVo7O0FBVEo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOC0yMDE5IFRPTiBERVYgU09MVVRJT05TIExURC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgU09GVFdBUkUgRVZBTFVBVElPTiBMaWNlbnNlICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbiAqIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxuICogTGljZW5zZSBhdDogaHR0cHM6Ly93d3cudG9uLmRldi9saWNlbnNlc1xuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgVE9OIERFViBzb2Z0d2FyZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cblxuaW1wb3J0IHsgZGVmYXVsdHMsIHByZWZlcmVuY2VzIH0gZnJvbSBcIi4vY29uZmlnXCI7XG5pbXBvcnQgZG9ja2VyIGZyb20gXCIuL2RvY2tlclwiO1xuaW1wb3J0IHsgdGV4dHMgfSBmcm9tIFwiLi90ZXh0c1wiO1xuaW1wb3J0IHsgdmVyc2lvbiwgaHR0cHNHZXRKc29uIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuYXN5bmMgZnVuY3Rpb24gbGlzdFRhZ3MoaW1hZ2U6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCB1cmwgPSBgaHR0cHM6Ly9yZWdpc3RyeS5odWIuZG9ja2VyLmNvbS92Mi9yZXBvc2l0b3JpZXMvJHtpbWFnZX0vdGFncy9gO1xuICAgIGNvbnN0IHRhZ3MgPSBhd2FpdCBodHRwc0dldEpzb24odXJsKTtcbiAgICByZXR1cm4gdGFncy5yZXN1bHRzLm1hcCh4ID0+IHgubmFtZSkuc29ydCgpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzaG93VG9uRGV2SW1hZ2VzKCkge1xuICAgIGNvbnN0IGltYWdlcyA9IGF3YWl0IGRvY2tlci5saXN0VG9uRGV2SW1hZ2VzKCk7XG4gICAgaWYgKGltYWdlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRleHRzLnRvbkRldkltYWdlcyhpbWFnZXMubGVuZ3RoKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCk7XG4gICAgICAgIGltYWdlcy5mb3JFYWNoKChpbWFnZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCR7aW1hZ2UuUmVwb1RhZ3N9YCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRleHRzLm5vVG9uRGV2SW1hZ2VzKTtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNob3dUb25EZXZDb250YWluZXJzKCkge1xuICAgIGNvbnN0IGNvbnRhaW5lcnMgPSBhd2FpdCBkb2NrZXIubGlzdFRvbkRldkNvbnRhaW5lcnMoKTtcbiAgICBpZiAoY29udGFpbmVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRleHRzLnRvbkRldkNvbnRhaW5lcnMoY29udGFpbmVycy5sZW5ndGgpKTtcbiAgICAgICAgY29uc29sZS5sb2coKTtcbiAgICAgICAgY29udGFpbmVycy5mb3JFYWNoKChjb250YWluZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke2NvbnRhaW5lci5OYW1lc30gKCR7Y29udGFpbmVyLkltYWdlfSkgJHtjb250YWluZXIuU3RhdGV9YCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRleHRzLm5vVG9uRGV2Q29udGFpbmVycyk7XG4gICAgfVxufVxuYXN5bmMgZnVuY3Rpb24gaW5mbygpIHtcbiAgICBjb25zb2xlLmxvZyh0ZXh0cy51c2FnZUhlYWRlcih2ZXJzaW9uKSk7XG4gICAgYXdhaXQgc2hvd1RvbkRldkltYWdlcygpO1xuICAgIGF3YWl0IHNob3dUb25EZXZDb250YWluZXJzKCk7XG5cbiAgICBjb25zb2xlLmxvZygpO1xuICAgIGNvbnNvbGUubG9nKHRleHRzLnVzZWRWZXJzaW9uKHByZWZlcmVuY2VzLnZlcnNpb24pKTtcbiAgICBjb25zb2xlLmxvZyh0ZXh0cy5hdmFpbGFibGVWZXJzaW9ucygoYXdhaXQgbGlzdFRhZ3MoZGVmYXVsdHMuY29tcGlsZXJzSW1hZ2VGYW1pbHkpKS5qb2luKCcsICcpKSk7XG4gICAgY29uc29sZS5sb2coKTtcbiAgICBjb25zb2xlLmxvZyh0ZXh0cy5sb2NhbE5vZGVCb3VuZFRvUG9ydChwcmVmZXJlbmNlcy5sb2NhbE5vZGVIb3N0UG9ydCkpO1xufVxuXG5cbmV4cG9ydCB7aW5mb307XG4iXX0=