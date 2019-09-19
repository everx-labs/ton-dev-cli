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
                console.log("".concat(container.Names.map(mapContainerName), " (").concat(container.Image, ") ").concat(container.State));
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
            _context4.t1 = _texts.texts;
            _context4.t2 = imageFamily;
            _context4.next = 5;
            return listTags(imageFamily);

          case 5:
            _context4.t3 = _context4.sent.join(', ');
            _context4.t4 = _context4.t1.availableVersions.call(_context4.t1, _context4.t2, _context4.t3);

            _context4.t0.log.call(_context4.t0, _context4.t4);

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _showAvailableVersions.apply(this, arguments);
}

function info() {
  return _info.apply(this, arguments);
}

function _info() {
  _info = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5() {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            console.log(_texts.texts.usageHeader(_utils.version));
            _context5.next = 3;
            return showTonDevImages();

          case 3:
            _context5.next = 5;
            return showTonDevContainers();

          case 5:
            console.log();
            console.log(_texts.texts.localNodeBoundToPort(_config.preferences.localNodeHostPort));

            if (_config.preferences.localNodeArangoHostPort !== '') {
              console.log(_texts.texts.localNodeArangoBoundToPort(_config.preferences.localNodeArangoHostPort));
            }

            console.log();
            console.log(_texts.texts.usedVersion(_config.preferences.version));
            _context5.next = 12;
            return showAvailableVersions(_config.defaults.compilersImageFamily);

          case 12:
            _context5.next = 14;
            return showAvailableVersions(_config.defaults.localNodeImageFamily);

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _info.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmZvLmpzIl0sIm5hbWVzIjpbImxpc3RUYWdzIiwiaW1hZ2UiLCJ1cmwiLCJ0YWdzIiwicmVzdWx0cyIsIm1hcCIsIngiLCJuYW1lIiwic29ydCIsInNob3dUb25EZXZJbWFnZXMiLCJkb2NrZXIiLCJsaXN0VG9uRGV2SW1hZ2VzIiwiaW1hZ2VzIiwibGVuZ3RoIiwiY29uc29sZSIsImxvZyIsInRleHRzIiwidG9uRGV2SW1hZ2VzIiwiZm9yRWFjaCIsIlJlcG9UYWdzIiwibm9Ub25EZXZJbWFnZXMiLCJtYXBDb250YWluZXJOYW1lIiwic3RhcnRzV2l0aCIsInN1YnN0ciIsInNob3dUb25EZXZDb250YWluZXJzIiwibGlzdFRvbkRldkNvbnRhaW5lcnMiLCJjb250YWluZXJzIiwidG9uRGV2Q29udGFpbmVycyIsImNvbnRhaW5lciIsIk5hbWVzIiwiSW1hZ2UiLCJTdGF0ZSIsIm5vVG9uRGV2Q29udGFpbmVycyIsInNob3dBdmFpbGFibGVWZXJzaW9ucyIsImltYWdlRmFtaWx5Iiwiam9pbiIsImF2YWlsYWJsZVZlcnNpb25zIiwiaW5mbyIsInVzYWdlSGVhZGVyIiwidmVyc2lvbiIsImxvY2FsTm9kZUJvdW5kVG9Qb3J0IiwicHJlZmVyZW5jZXMiLCJsb2NhbE5vZGVIb3N0UG9ydCIsImxvY2FsTm9kZUFyYW5nb0hvc3RQb3J0IiwibG9jYWxOb2RlQXJhbmdvQm91bmRUb1BvcnQiLCJ1c2VkVmVyc2lvbiIsImRlZmF1bHRzIiwiY29tcGlsZXJzSW1hZ2VGYW1pbHkiLCJsb2NhbE5vZGVJbWFnZUZhbWlseSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQWVBOztBQUNBOztBQUNBOztBQUNBOztBQWxCQTs7Ozs7Ozs7Ozs7Ozs7U0FvQmVBLFE7Ozs7Ozs7K0JBQWYsaUJBQXdCQyxLQUF4QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDVUMsWUFBQUEsR0FEViw2REFDbUVELEtBRG5FO0FBQUE7QUFBQSxtQkFFdUIseUJBQWFDLEdB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QUFBLG1CQUVVOUIsZ0JBQWdCLEVBRjFCOztBQUFBO0FBQUE7QUFBQSxtQkFHVWUsb0JBQW9CLEVBSDlCOztBQUFBO0FBS0lWLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUjtBQUNBRCxZQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsYUFBTXdCLG9CQUFOLENBQTJCQyxvQkFBWUMsaUJBQXZDLENBQVo7O0FBQ0EsZ0JBQUlELG9CQUFZRSx1QkFBWixLQUF3QyxFQUE1QyxFQUFnRDtBQUM1QzdCLGNBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxhQUFNNEIsMEJBQU4sQ0FBaUNILG9CQUFZRSx1QkFBN0MsQ0FBWjtBQUNIOztBQUNEN0IsWUFBQUEsT0FBTyxDQUFDQyxHQUFSO0FBQ0FELFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxhQUFNNkIsV0FBTixDQUFrQkosb0JBQVlGLE9BQTlCLENBQVo7QUFYSjtBQUFBLG1CQVlVTixxQkFBcUIsQ0FBQ2EsaUJBQVNDLG9CQUFWLENBWi9COztBQUFBO0FBQUE7QUFBQSxtQkFhVWQscUJBQXFCLENBQUNhLGlCQUFTRSxvQkFBVixDQWIvQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuXG5pbXBvcnQgeyBkZWZhdWx0cywgcHJlZmVyZW5jZXMgfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCBkb2NrZXIgZnJvbSBcIi4vZG9ja2VyXCI7XG5pbXBvcnQgeyB0ZXh0cyB9IGZyb20gXCIuL3RleHRzXCI7XG5pbXBvcnQgeyB2ZXJzaW9uLCBodHRwc0dldEpzb24gfSBmcm9tIFwiLi91dGlsc1wiO1xuXG5hc3luYyBmdW5jdGlvbiBsaXN0VGFncyhpbWFnZTogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgIGNvbnN0IHVybCA9IGBodHRwczovL3JlZ2lzdHJ5Lmh1Yi5kb2NrZXIuY29tL3YyL3JlcG9zaXRvcmllcy8ke2ltYWdlfS90YWdzL2A7XG4gICAgY29uc3QgdGFncyA9IGF3YWl0IGh0dHBzR2V0SnNvbih1cmwpO1xuICAgIHJldHVybiB0YWdzLnJlc3VsdHMubWFwKHggPT4geC5uYW1lKS5zb3J0KCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNob3dUb25EZXZJbWFnZXMoKSB7XG4gICAgY29uc3QgaW1hZ2VzID0gYXdhaXQgZG9ja2VyLmxpc3RUb25EZXZJbWFnZXMoKTtcbiAgICBpZiAoaW1hZ2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc29sZS5sb2coKTtcbiAgICAgICAgY29uc29sZS5sb2codGV4dHMudG9uRGV2SW1hZ2VzKGltYWdlcy5sZW5ndGgpKTtcbiAgICAgICAgY29uc29sZS5sb2coKTtcbiAgICAgICAgaW1hZ2VzLmZvckVhY2goKGltYWdlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJHtpbWFnZS5SZXBvVGFnc31gKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2codGV4dHMubm9Ub25EZXZJbWFnZXMpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gbWFwQ29udGFpbmVyTmFtZShuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBuYW1lLnN0YXJ0c1dpdGgoJy8nKSA/IG5hbWUuc3Vic3RyKDEpIDogbmFtZTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2hvd1RvbkRldkNvbnRhaW5lcnMoKSB7XG4gICAgY29uc3QgY29udGFpbmVycyA9IGF3YWl0IGRvY2tlci5saXN0VG9uRGV2Q29udGFpbmVycygpO1xuICAgIGlmIChjb250YWluZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc29sZS5sb2coKTtcbiAgICAgICAgY29uc29sZS5sb2codGV4dHMudG9uRGV2Q29udGFpbmVycyhjb250YWluZXJzLmxlbmd0aCkpO1xuICAgICAgICBjb25zb2xlLmxvZygpO1xuICAgICAgICBjb250YWluZXJzLmZvckVhY2goKGNvbnRhaW5lcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCR7Y29udGFpbmVyLk5hbWVzLm1hcChtYXBDb250YWluZXJOYW1lKX0gKCR7Y29udGFpbmVyLkltYWdlfSkgJHtjb250YWluZXIuU3RhdGV9YCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRleHRzLm5vVG9uRGV2Q29udGFpbmVycyk7XG4gICAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBzaG93QXZhaWxhYmxlVmVyc2lvbnMoaW1hZ2VGYW1pbHkpIHtcbiAgICBjb25zb2xlLmxvZyh0ZXh0cy5hdmFpbGFibGVWZXJzaW9ucyhpbWFnZUZhbWlseSwgKGF3YWl0IGxpc3RUYWdzKGltYWdlRmFtaWx5KSkuam9pbignLCAnKSkpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBpbmZvKCkge1xuICAgIGNvbnNvbGUubG9nKHRleHRzLnVzYWdlSGVhZGVyKHZlcnNpb24pKTtcbiAgICBhd2FpdCBzaG93VG9uRGV2SW1hZ2VzKCk7XG4gICAgYXdhaXQgc2hvd1RvbkRldkNvbnRhaW5lcnMoKTtcblxuICAgIGNvbnNvbGUubG9nKCk7XG4gICAgY29uc29sZS5sb2codGV4dHMubG9jYWxOb2RlQm91bmRUb1BvcnQocHJlZmVyZW5jZXMubG9jYWxOb2RlSG9zdFBvcnQpKTtcbiAgICBpZiAocHJlZmVyZW5jZXMubG9jYWxOb2RlQXJhbmdvSG9zdFBvcnQgIT09ICcnKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRleHRzLmxvY2FsTm9kZUFyYW5nb0JvdW5kVG9Qb3J0KHByZWZlcmVuY2VzLmxvY2FsTm9kZUFyYW5nb0hvc3RQb3J0KSk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKCk7XG4gICAgY29uc29sZS5sb2codGV4dHMudXNlZFZlcnNpb24ocHJlZmVyZW5jZXMudmVyc2lvbikpO1xuICAgIGF3YWl0IHNob3dBdmFpbGFibGVWZXJzaW9ucyhkZWZhdWx0cy5jb21waWxlcnNJbWFnZUZhbWlseSk7XG4gICAgYXdhaXQgc2hvd0F2YWlsYWJsZVZlcnNpb25zKGRlZmF1bHRzLmxvY2FsTm9kZUltYWdlRmFtaWx5KTtcbn1cblxuXG5leHBvcnQgeyBpbmZvIH07XG4iXX0=