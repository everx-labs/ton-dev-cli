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
                console.log("  ".concat(image.RepoTags));
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

function mapContainerName(name) {
  return name.startsWith('/') ? name.substr(1) : name;
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
                console.log("  ".concat(container.Names.map(mapContainerName), " (").concat(container.Image, ") ").concat(container.State));
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

function showAvailableVersions(_x2) {
  return _showAvailableVersions.apply(this, arguments);
}

function _showAvailableVersions() {
  _showAvailableVersions = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(imageFamily) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.t0 = console;
            _context4.t1 = "  ".concat(imageFamily, ": ");
            _context4.next = 4;
            return listTags(imageFamily);

          case 4:
            _context4.t2 = _context4.sent.join(', ');
            _context4.t3 = _context4.t1.concat.call(_context4.t1, _context4.t2);

            _context4.t0.log.call(_context4.t0, _context4.t3);

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _showAvailableVersions.apply(this, arguments);
}

function showContainerInfo(containers, name) {
  var container = _docker["default"].findContainerInfo(containers, name);

  if (container) {
    console.log("  Docker image: ".concat(container.Image));
    console.log("  Docker container: ".concat(container.Names.map(mapContainerName), " ").concat(container.State));
  } else {
    console.log("  Docker container: missing");
  }
}

function info() {
  return _info.apply(this, arguments);
}

function _info() {
  _info = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5() {
    var containers;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            console.log(_texts.texts.usageHeader(_utils.version));
            _context5.next = 3;
            return _docker["default"].listTonDevContainers();

          case 3:
            containers = _context5.sent;

            _config.config.net.all.forEach(function (net) {
              console.log();
              console.log(_texts.texts.netHeader(net.preferences.name));
              console.log();
              console.log(_texts.texts.usedVersion(net.preferences.version));
              console.log(_texts.texts.netHostPort(net.preferences.hostPort));

              if (net.preferences.arangoHostPort !== '') {
                console.log(_texts.texts.netArangoHostPort(net.preferences.arangoHostPort));
              }

              showContainerInfo(containers, net.container);
            });

            console.log();
            console.log(_texts.texts.compilerHeader);
            console.log();
            console.log(_texts.texts.usedVersion(_config.config.compilers.preferences.version));
            showContainerInfo(containers, _config.config.compilers.container);
            console.log();
            console.log(_texts.texts.availableVersions);
            console.log();
            _context5.next = 15;
            return showAvailableVersions(_config.defaultValues.compilers.image);

          case 15:
            _context5.next = 17;
            return showAvailableVersions(_config.defaultValues.net.image);

          case 17:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _info.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmZvLmpzIl0sIm5hbWVzIjpbImxpc3RUYWdzIiwiaW1hZ2UiLCJ1cmwiLCJ0YWdzIiwicmVzdWx0cyIsIm1hcCIsIngiLCJuYW1lIiwic29ydCIsInNob3dUb25EZXZJbWFnZXMiLCJkb2NrZXIiLCJsaXN0VG9uRGV2SW1hZ2VzIiwiaW1hZ2VzIiwibGVuZ3RoIiwiY29uc29sZSIsImxvZyIsInRleHRzIiwidG9uRGV2SW1hZ2VzIiwiZm9yRWFjaCIsIlJlcG9UYWdzIiwibm9Ub25EZXZJbWFnZXMiLCJtYXBDb250YWluZXJOYW1lIiwic3RhcnRzV2l0aCIsInN1YnN0ciIsInNob3dUb25EZXZDb250YWluZXJzIiwibGlzdFRvbkRldkNvbnRhaW5lcnMiLCJjb250YWluZXJzIiwidG9uRGV2Q29udGFpbmVycyIsImNvbnRhaW5lciIsIk5hbWVzIiwiSW1hZ2UiLCJTdGF0ZSIsIm5vVG9uRGV2Q29udGFpbmVycyIsInNob3dBdmFpbGFibGVWZXJzaW9ucyIsImltYWdlRmFtaWx5Iiwiam9pbiIsInNob3dDb250YWluZXJJbmZvIiwiZmluZENvbnRhaW5lckluZm8iLCJpbmZvIiwidXNhZ2VIZWFkZXIiLCJ2ZXJzaW9uIiwiY29uZmlnIiwibmV0IiwiYWxsIiwibmV0SGVhZGVyIiwicHJlZmVyZW5jZXMiLCJ1c2VkVmVyc2lvbiIsIm5ldEhvc3RQb3J0IiwiaG9zdFBvcnQiLCJhcmFuZ29Ib3N0UG9ydCIsIm5ldEFyYW5nb0hvc3RQb3J0IiwiY29tcGlsZXJIZWFkZXIiLCJjb21waWxlcnMiLCJhdmFpbGFibGVWZXJzaW9ucyIsImRlZmF1bHRWYWx1ZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFnQkE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBcEJBOzs7Ozs7Ozs7Ozs7OztTQXNCZUEsUTs7Ozs7OzsrQkFBZixpQkFBd0JDLEtBQXhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNVQyxZQUFBQSxHQURWLDZEQUNtRUQsS0FEbkU7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QVlDLGFBQU1rQyxpQkFBTixDQUF3QlIsR0FBRyxDQUFDRyxXQUFKLENBQWdCSSxjQUF4QyxDQUFaO0FBQ0g7O0FBQ0RiLGNBQUFBLGlCQUFpQixDQUFDVixVQUFELEVBQWFnQixHQUFHLENBQUNkLFNBQWpCLENBQWpCO0FBQ0gsYUFWRDs7QUFXQWQsWUFBQUEsT0FBTyxDQUFDQyxHQUFSO0FBQ0FELFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxhQUFNbUMsY0FBbEI7QUFDQXJDLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUjtBQUNBRCxZQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsYUFBTThCLFdBQU4sQ0FBa0JMLGVBQU9XLFNBQVAsQ0FBaUJQLFdBQWpCLENBQTZCTCxPQUEvQyxDQUFaO0FBQ0FKLFlBQUFBLGlCQUFpQixDQUFDVixVQUFELEVBQWFlLGVBQU9XLFNBQVAsQ0FBaUJ4QixTQUE5QixDQUFqQjtBQUVBZCxZQUFBQSxPQUFPLENBQUNDLEdBQVI7QUFDQUQsWUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlDLGFBQU1xQyxpQkFBbEI7QUFDQXZDLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUjtBQXZCSjtBQUFBLG1CQXdCVWtCLHFCQUFxQixDQUFDcUIsc0JBQWNGLFNBQWQsQ0FBd0JuRCxLQUF6QixDQXhCL0I7O0FBQUE7QUFBQTtBQUFBLG1CQXlCVWdDLHFCQUFxQixDQUFDcUIsc0JBQWNaLEdBQWQsQ0FBa0J6QyxLQUFuQixDQXpCL0I7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOC0yMDE5IFRPTiBERVYgU09MVVRJT05TIExURC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgU09GVFdBUkUgRVZBTFVBVElPTiBMaWNlbnNlICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbiAqIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxuICogTGljZW5zZSBhdDogaHR0cHM6Ly93d3cudG9uLmRldi9saWNlbnNlc1xuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgVE9OIERFViBzb2Z0d2FyZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbi8vIEBmbG93XG5cbmltcG9ydCB7IGNvbmZpZywgZGVmYXVsdFZhbHVlcyB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0IHR5cGUgeyBEQ29udGFpbmVySW5mbyB9IGZyb20gXCIuL2RvY2tlclwiO1xuaW1wb3J0IGRvY2tlciBmcm9tIFwiLi9kb2NrZXJcIjtcbmltcG9ydCB7IHRleHRzIH0gZnJvbSBcIi4vdGV4dHNcIjtcbmltcG9ydCB7IHZlcnNpb24sIGh0dHBzR2V0SnNvbiB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIGxpc3RUYWdzKGltYWdlOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgdXJsID0gYGh0dHBzOi8vcmVnaXN0cnkuaHViLmRvY2tlci5jb20vdjIvcmVwb3NpdG9yaWVzLyR7aW1hZ2V9L3RhZ3MvYDtcbiAgICBjb25zdCB0YWdzID0gYXdhaXQgaHR0cHNHZXRKc29uKHVybCk7XG4gICAgcmV0dXJuIHRhZ3MucmVzdWx0cy5tYXAoeCA9PiB4Lm5hbWUpLnNvcnQoKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2hvd1RvbkRldkltYWdlcygpIHtcbiAgICBjb25zdCBpbWFnZXMgPSBhd2FpdCBkb2NrZXIubGlzdFRvbkRldkltYWdlcygpO1xuICAgIGlmIChpbWFnZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zb2xlLmxvZygpO1xuICAgICAgICBjb25zb2xlLmxvZyh0ZXh0cy50b25EZXZJbWFnZXMoaW1hZ2VzLmxlbmd0aCkpO1xuICAgICAgICBjb25zb2xlLmxvZygpO1xuICAgICAgICBpbWFnZXMuZm9yRWFjaCgoaW1hZ2UpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAgICR7aW1hZ2UuUmVwb1RhZ3N9YCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRleHRzLm5vVG9uRGV2SW1hZ2VzKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG1hcENvbnRhaW5lck5hbWUobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbmFtZS5zdGFydHNXaXRoKCcvJykgPyBuYW1lLnN1YnN0cigxKSA6IG5hbWU7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNob3dUb25EZXZDb250YWluZXJzKCkge1xuICAgIGNvbnN0IGNvbnRhaW5lcnMgPSBhd2FpdCBkb2NrZXIubGlzdFRvbkRldkNvbnRhaW5lcnMoKTtcbiAgICBpZiAoY29udGFpbmVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRleHRzLnRvbkRldkNvbnRhaW5lcnMoY29udGFpbmVycy5sZW5ndGgpKTtcbiAgICAgICAgY29uc29sZS5sb2coKTtcbiAgICAgICAgY29udGFpbmVycy5mb3JFYWNoKChjb250YWluZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAgICR7Y29udGFpbmVyLk5hbWVzLm1hcChtYXBDb250YWluZXJOYW1lKX0gKCR7Y29udGFpbmVyLkltYWdlfSkgJHtjb250YWluZXIuU3RhdGV9YCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRleHRzLm5vVG9uRGV2Q29udGFpbmVycyk7XG4gICAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBzaG93QXZhaWxhYmxlVmVyc2lvbnMoaW1hZ2VGYW1pbHkpIHtcbiAgICBjb25zb2xlLmxvZyhgICAke2ltYWdlRmFtaWx5fTogJHsoYXdhaXQgbGlzdFRhZ3MoaW1hZ2VGYW1pbHkpKS5qb2luKCcsICcpfWApO1xufVxuXG5mdW5jdGlvbiBzaG93Q29udGFpbmVySW5mbyhjb250YWluZXJzOiBEQ29udGFpbmVySW5mb1tdLCBuYW1lOiBzdHJpbmcpIHtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2NrZXIuZmluZENvbnRhaW5lckluZm8oY29udGFpbmVycywgbmFtZSk7XG4gICAgaWYgKGNvbnRhaW5lcikge1xuICAgICAgICBjb25zb2xlLmxvZyhgICBEb2NrZXIgaW1hZ2U6ICR7Y29udGFpbmVyLkltYWdlfWApO1xuICAgICAgICBjb25zb2xlLmxvZyhgICBEb2NrZXIgY29udGFpbmVyOiAke2NvbnRhaW5lci5OYW1lcy5tYXAobWFwQ29udGFpbmVyTmFtZSl9ICR7Y29udGFpbmVyLlN0YXRlfWApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGAgIERvY2tlciBjb250YWluZXI6IG1pc3NpbmdgKTtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGluZm8oKSB7XG4gICAgY29uc29sZS5sb2codGV4dHMudXNhZ2VIZWFkZXIodmVyc2lvbikpO1xuICAgIGNvbnN0IGNvbnRhaW5lcnMgPSBhd2FpdCBkb2NrZXIubGlzdFRvbkRldkNvbnRhaW5lcnMoKTtcblxuICAgIGNvbmZpZy5uZXQuYWxsLmZvckVhY2goKG5ldCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygpO1xuICAgICAgICBjb25zb2xlLmxvZyh0ZXh0cy5uZXRIZWFkZXIobmV0LnByZWZlcmVuY2VzLm5hbWUpKTtcbiAgICAgICAgY29uc29sZS5sb2coKTtcbiAgICAgICAgY29uc29sZS5sb2codGV4dHMudXNlZFZlcnNpb24obmV0LnByZWZlcmVuY2VzLnZlcnNpb24pKTtcbiAgICAgICAgY29uc29sZS5sb2codGV4dHMubmV0SG9zdFBvcnQobmV0LnByZWZlcmVuY2VzLmhvc3RQb3J0KSk7XG4gICAgICAgIGlmIChuZXQucHJlZmVyZW5jZXMuYXJhbmdvSG9zdFBvcnQgIT09ICcnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0ZXh0cy5uZXRBcmFuZ29Ib3N0UG9ydChuZXQucHJlZmVyZW5jZXMuYXJhbmdvSG9zdFBvcnQpKTtcbiAgICAgICAgfVxuICAgICAgICBzaG93Q29udGFpbmVySW5mbyhjb250YWluZXJzLCBuZXQuY29udGFpbmVyKTtcbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZygpO1xuICAgIGNvbnNvbGUubG9nKHRleHRzLmNvbXBpbGVySGVhZGVyKTtcbiAgICBjb25zb2xlLmxvZygpO1xuICAgIGNvbnNvbGUubG9nKHRleHRzLnVzZWRWZXJzaW9uKGNvbmZpZy5jb21waWxlcnMucHJlZmVyZW5jZXMudmVyc2lvbikpO1xuICAgIHNob3dDb250YWluZXJJbmZvKGNvbnRhaW5lcnMsIGNvbmZpZy5jb21waWxlcnMuY29udGFpbmVyKTtcblxuICAgIGNvbnNvbGUubG9nKCk7XG4gICAgY29uc29sZS5sb2codGV4dHMuYXZhaWxhYmxlVmVyc2lvbnMpO1xuICAgIGNvbnNvbGUubG9nKCk7XG4gICAgYXdhaXQgc2hvd0F2YWlsYWJsZVZlcnNpb25zKGRlZmF1bHRWYWx1ZXMuY29tcGlsZXJzLmltYWdlKTtcbiAgICBhd2FpdCBzaG93QXZhaWxhYmxlVmVyc2lvbnMoZGVmYXVsdFZhbHVlcy5uZXQuaW1hZ2UpO1xufVxuXG5cbmV4cG9ydCB7IGluZm8gfTtcbiJdfQ==