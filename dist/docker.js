"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _config = require("./config");

var _dockerode = _interopRequireDefault(require("dockerode"));

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
var docker = new _dockerode["default"]();

function numericVersion() {
  return _numericVersion.apply(this, arguments);
}

function _numericVersion() {
  _numericVersion = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var version;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return docker.version();

          case 2:
            version = _context.sent;
            return _context.abrupt("return", (0, _utils.versionToNumber)(version.Version));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _numericVersion.apply(this, arguments);
}

function listAllContainers() {
  return _listAllContainers.apply(this, arguments);
}

function _listAllContainers() {
  _listAllContainers = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", docker.listContainers({
              all: true
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _listAllContainers.apply(this, arguments);
}

function listAllImages() {
  return _listAllImages.apply(this, arguments);
}

function _listAllImages() {
  _listAllImages = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3() {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", docker.listImages({
              all: true
            }));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _listAllImages.apply(this, arguments);
}

function getContainer(id) {
  return docker.getContainer(id);
}

function getImage(name) {
  return docker.getImage(name);
}

function createContainer(_x) {
  return _createContainer.apply(this, arguments);
}

function _createContainer() {
  _createContainer = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(options) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", docker.createContainer(options));

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _createContainer.apply(this, arguments);
}

function pullImage(_x2) {
  return _pullImage.apply(this, arguments);
}

function _pullImage() {
  _pullImage = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(repoTag) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", new Promise(function (resolve, reject) {
              docker.pull(repoTag, _config.config.auth, function (err, stream) {
                if (!stream) {
                  reject(err);
                  return;
                }

                var lastReportTime = Date.now();
                docker.modem.followProgress(stream, onFinished, onProgress);

                function onFinished(err, output) {
                  resolve(output);
                }

                function onProgress(event) {
                  var isTimeToReport = Date.now() > lastReportTime + 1000;

                  if (isTimeToReport) {
                    lastReportTime = Date.now();
                    process.stdout.write('.');
                  }
                }
              });
            }));

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _pullImage.apply(this, arguments);
}

function hasName(container, name) {
  var nameToFind = "/".concat(name).toLowerCase();
  return !!(container.Names || []).find(function (n) {
    return n.toLowerCase() === nameToFind;
  });
}

function imageMatched(image, tag) {
  image = image.toLowerCase();
  tag = tag.toLowerCase();
  var tagParts = tag.split(':');

  if (tagParts.length > 1) {
    return image === tag;
  }

  var imageParts = image.split(':');
  return imageParts[0] === tagParts[0];
}

function imageHasRepoTag(info, tag) {
  return !!(info.RepoTags || []).find(function (n) {
    return imageMatched(n, tag);
  });
}

function findContainerInfo(containers, name) {
  return containers.find(function (x) {
    return hasName(x, name);
  });
}

function findImageInfo(images, name) {
  return images.find(function (x) {
    return imageHasRepoTag(x, name);
  });
}

function isRunning(info) {
  return !!info && info.State.toLowerCase() === 'running';
}

function containerBelongsToImage(info, image) {
  return imageMatched(info.Image, image);
}

function isTonDevContainer(info) {
  return containerBelongsToImage(info, _config.defaults.localNodeImageFamily) || containerBelongsToImage(info, _config.defaults.compilersImageFamily);
}

function isTonDevImage(info) {
  return imageHasRepoTag(info, _config.defaults.localNodeImageFamily) || imageHasRepoTag(info, _config.defaults.compilersImageFamily);
}

function listTonDevContainers() {
  return _listTonDevContainers.apply(this, arguments);
}

function _listTonDevContainers() {
  _listTonDevContainers = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6() {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return listAllContainers();

          case 2:
            _context6.t0 = isTonDevContainer;
            return _context6.abrupt("return", _context6.sent.filter(_context6.t0));

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _listTonDevContainers.apply(this, arguments);
}

function listTonDevImages() {
  return _listTonDevImages.apply(this, arguments);
}

function _listTonDevImages() {
  _listTonDevImages = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7() {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return listAllImages();

          case 2:
            _context7.t0 = isTonDevImage;
            return _context7.abrupt("return", _context7.sent.filter(_context7.t0));

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _listTonDevImages.apply(this, arguments);
}

var _default = {
  numericVersion: numericVersion,
  createContainer: createContainer,
  getContainer: getContainer,
  isRunning: isRunning,
  listAllContainers: listAllContainers,
  listAllImages: listAllImages,
  getImage: getImage,
  pullImage: pullImage,
  findContainerInfo: findContainerInfo,
  findImageInfo: findImageInfo,
  listTonDevImages: listTonDevImages,
  listTonDevContainers: listTonDevContainers
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb2NrZXIuanMiXSwibmFtZXMiOlsiZG9ja2VyIiwiRG9ja2VyIiwibnVtZXJpY1ZlcnNpb24iLCJ2ZXJzaW9uIiwiVmVyc2lvbiIsImxpc3RBbGxDb250YWluZXJzIiwibGlzdENvbnRhaW5lcnMiLCJhbGwiLCJsaXN0QWxsSW1hZ2VzIiwibGlzdEltYWdlcyIsImdldENvbnRhaW5lciIsImlkIiwiZ2V0SW1hZ2UiLCJuYW1lIiwiY3JlYXRlQ29udGFpbmVyIiwib3B0aW9ucyIsInB1bGxJbWFnZSIsInJlcG9UYWciLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInB1bGwiLCJjb25maWciLCJhdXRoIiwiZXJyIiwic3RyZWFtIiwibGFzdFJlcG9ydFRpbWUiLCJEYXRlIiwibm93IiwibW9kZW0iLCJmb2xsb3dQcm9ncmVzcyIsIm9uRmluaXNoZWQiLCJvblByb2dyZXNzIiwib3V0cHV0IiwiZXZlbnQiLCJpc1RpbWVUb1JlcG9ydCIsInByb2Nlc3MiLCJzdGRvdXQiLCJ3cml0ZSIsImhhc05hbWUiLCJjb250YWluZXIiLCJuYW1lVG9GaW5kIiwidG9Mb3dlckNhc2UiLCJOYW1lcyIsImZpbmQiLCJuIiwiaW1hZ2VNYXRjaGVkIiwiaW1hZ2UiLCJ0YWciLCJ0YWdQYXJ0cyIsInNwbGl0IiwibGVuZ3RoIiwiaW1hZ2VQYXJ0cyIsImltYWdlSGFzUmVwb1RhZyIsImluZm8iLCJSZXBvVGFncyIsImZpbmRDb250YWluZXJJbmZvIiwiY29udGFpbmVycyIsIngiLCJmaW5kSW1hZ2VJbmZvIiwiaW1hZ2VzIiwiaXNSdW5uaW5nIiwiU3RhdGUiLCJjb250YWluZXJCZWxvbmdzVG9JbWFnZSIsIkltYWdlIiwiaXNUb25EZXZDb250YWluZXIiLCJkZWZhdWx0cyIsImxvY2FsTm9kZUltYWdlRmFtaWx5IiwiY29tcGlsZXJzSW1hZ2VGYW1pbHkiLCJpc1RvbkRldkltYWdlIiwibGlzdFRvbkRldkNvbnRhaW5lcnMiLCJmaWx0ZXIiLCJsaXN0VG9u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O0FBQUE7QUFBQTtBQUFBLG1CQUNrQmhFLGFBQWEsRUFEL0I7O0FBQUE7QUFBQSwyQkFDMEM2RCxhQUQxQztBQUFBLDZEQUNtQ0UsTUFEbkM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztlQUllO0FBQ1hyRSxFQUFBQSxjQUFjLEVBQWRBLGNBRFc7QUFFWFksRUFBQUEsZUFBZSxFQUFmQSxlQUZXO0FBR1hKLEVBQUFBLFlBQVksRUFBWkEsWUFIVztBQUlYbUQsRUFBQUEsU0FBUyxFQUFUQSxTQUpXO0FBS1h4RCxFQUFBQSxpQkFBaUIsRUFBakJBLGlCQUxXO0FBTVhHLEVBQUFBLGFBQWEsRUFBYkEsYUFOVztBQU9YSSxFQUFBQSxRQUFRLEVBQVJBLFFBUFc7QUFRWEksRUFBQUEsU0FBUyxFQUFUQSxTQVJXO0FBU1h3QyxFQUFBQSxpQkFBaUIsRUFBakJBLGlCQVRXO0FBVVhHLEVBQUFBLGFBQWEsRUFBYkEsYUFWVztBQVdYYSxFQUFBQSxnQkFBZ0IsRUFBaEJBLGdCQVhXO0FBWVhGLEVBQUFBLG9CQUFvQixFQUFwQkE7QUFaVyxDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuLy8gQGZsb3dcbmltcG9ydCB7IGNvbmZpZywgZGVmYXVsdHMgfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCBEb2NrZXIgZnJvbSAnZG9ja2Vyb2RlJztcblxuaW1wb3J0IHsgdmVyc2lvblRvTnVtYmVyIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuY29uc3QgZG9ja2VyID0gbmV3IERvY2tlcigpO1xuXG5leHBvcnQgdHlwZSBESW1hZ2VJbmZvID0ge1xuICAgIElkOiBzdHJpbmcsXG4gICAgUmVwb1RhZ3M6IHN0cmluZ1tdLFxufVxuXG5leHBvcnQgdHlwZSBEQ29udGFpbmVySW5mbyA9IHtcbiAgICBJZDogc3RyaW5nLFxuICAgIE5hbWVzOiBzdHJpbmdbXSxcbiAgICBJbWFnZTogc3RyaW5nLFxuICAgIEltYWdlSUQ6IHN0cmluZyxcbiAgICBTdGF0ZTogc3RyaW5nLFxufVxuXG5leHBvcnQgdHlwZSBEQ29udGFpbmVyRXhlY09wdGlvbnMgPSB7XG4gICAgQXR0YWNoU3RkaW4/OiBib29sZWFuLFxuICAgIEF0dGFjaFN0ZG91dD86IGJvb2xlYW4sXG4gICAgQXR0YWNoU3RkZXJyPzogYm9vbGVhbixcbiAgICBEZXRhY2hLZXlzPzogc3RyaW5nLFxuICAgIFR0eT86IGJvb2xlYW4sXG4gICAgRW52Pzogc3RyaW5nLFxuICAgIENtZD86IHN0cmluZ1tdLFxuICAgIFByaXZpbGVnZWQ/OiBib29sZWFuLFxuICAgIFVzZXI/OiBzdHJpbmcsXG4gICAgV29ya2luZ0Rpcj86IHN0cmluZyxcbn1cblxuZXhwb3J0IHR5cGUgRENvbnRhaW5lciA9IHtcbiAgICBtb2RlbTogYW55LFxuICAgIHN0YXJ0KCk6IFByb21pc2U8dm9pZD4sXG4gICAgZXhlYyhvcHRpb25zOiBEQ29udGFpbmVyRXhlY09wdGlvbnMsIGNhbGxiYWNrOiBhbnkpOiB2b2lkLFxuICAgIHN0b3AoKTogUHJvbWlzZTx2b2lkPixcbiAgICByZW1vdmUoKTogUHJvbWlzZTx2b2lkPixcbn1cblxuZXhwb3J0IHR5cGUgREltYWdlID0ge1xuICAgIHJlbW92ZSgpOiBQcm9taXNlPHZvaWQ+LFxufVxuXG5leHBvcnQgdHlwZSBETW91bnQgPSB7XG4gICAgVGFyZ2V0OiBzdHJpbmcsXG4gICAgU291cmNlOiBzdHJpbmcsXG4gICAgVHlwZTogJ2JpbmQnIHwgJ3ZvbHVtZScgfCAndG1wZnMnLFxufVxuXG5leHBvcnQgdHlwZSBEQ3JlYXRlQ29udGFpbmVyT3B0aW9ucyA9IHtcbiAgICBuYW1lPzogc3RyaW5nLFxuICAgIEltYWdlOiBzdHJpbmcsXG4gICAgSW50ZXJhY3RpdmU/OiBib29sZWFuLFxuICAgIFR0eT86IGJvb2xlYW4sXG4gICAgVXNlcj86IHN0cmluZyxcbiAgICBFbnRyeXBvaW50Pzogc3RyaW5nW10sXG4gICAgRW52OiBzdHJpbmdbXSxcbiAgICBIb3N0Q29uZmlnPzoge1xuICAgICAgICBNb3VudHM/OiBETW91bnRbXSxcbiAgICB9LFxuICAgIEV4cG9zZWRQb3J0cz86IHtcbiAgICAgICAgW3N0cmluZ106IHt9XG4gICAgfSxcbiAgICBIb3N0Q29uZmlnPzoge1xuICAgICAgICBQb3J0QmluZGluZ3M/OiB7XG4gICAgICAgICAgICBbc3RyaW5nXTogeyBIb3N0SXA6IHN0cmluZywgSG9zdFBvcnQ6IHN0cmluZyB9W11cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgRFZlcnNpb24gPSB7XG4gICAgVmVyc2lvbjogc3RyaW5nLFxufVxuXG5hc3luYyBmdW5jdGlvbiBudW1lcmljVmVyc2lvbigpIHtcbiAgICBjb25zdCB2ZXJzaW9uOiBEVmVyc2lvbiA9IGF3YWl0IGRvY2tlci52ZXJzaW9uKCk7XG4gICAgcmV0dXJuIHZlcnNpb25Ub051bWJlcih2ZXJzaW9uLlZlcnNpb24pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBsaXN0QWxsQ29udGFpbmVycygpOiBQcm9taXNlPERDb250YWluZXJJbmZvW10+IHtcbiAgICByZXR1cm4gZG9ja2VyLmxpc3RDb250YWluZXJzKHsgYWxsOiB0cnVlIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBsaXN0QWxsSW1hZ2VzKCk6IFByb21pc2U8REltYWdlSW5mb1tdPiB7XG4gICAgcmV0dXJuIGRvY2tlci5saXN0SW1hZ2VzKHsgYWxsOiB0cnVlIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRDb250YWluZXIoaWQ6IHN0cmluZyk6IERDb250YWluZXIge1xuICAgIHJldHVybiBkb2NrZXIuZ2V0Q29udGFpbmVyKGlkKTtcbn1cblxuZnVuY3Rpb24gZ2V0SW1hZ2UobmFtZTogc3RyaW5nKTogREltYWdlIHtcbiAgICByZXR1cm4gZG9ja2VyLmdldEltYWdlKG5hbWUpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVDb250YWluZXIob3B0aW9uczogRENyZWF0ZUNvbnRhaW5lck9wdGlvbnMpOiBQcm9taXNlPERDb250YWluZXI+IHtcbiAgICByZXR1cm4gZG9ja2VyLmNyZWF0ZUNvbnRhaW5lcihvcHRpb25zKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcHVsbEltYWdlKHJlcG9UYWc6IHN0cmluZyk6IFByb21pc2U8REltYWdlPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgZG9ja2VyLnB1bGwocmVwb1RhZywgY29uZmlnLmF1dGgsIGZ1bmN0aW9uIChlcnIsIHN0cmVhbSkge1xuICAgICAgICAgICAgaWYgKCFzdHJlYW0pIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgbGFzdFJlcG9ydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgZG9ja2VyLm1vZGVtLmZvbGxvd1Byb2dyZXNzKHN0cmVhbSwgb25GaW5pc2hlZCwgb25Qcm9ncmVzcyk7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uRmluaXNoZWQoZXJyLCBvdXRwdXQpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKG91dHB1dCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uUHJvZ3Jlc3MoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpc1RpbWVUb1JlcG9ydCA9IERhdGUubm93KCkgPiBsYXN0UmVwb3J0VGltZSArIDEwMDA7XG4gICAgICAgICAgICAgICAgaWYgKGlzVGltZVRvUmVwb3J0KSB7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RSZXBvcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoJy4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gaGFzTmFtZShjb250YWluZXI6IERDb250YWluZXJJbmZvLCBuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBuYW1lVG9GaW5kID0gYC8ke25hbWV9YC50b0xvd2VyQ2FzZSgpO1xuICAgIHJldHVybiAhIShjb250YWluZXIuTmFtZXMgfHwgW10pLmZpbmQobiA9PiBuLnRvTG93ZXJDYXNlKCkgPT09IG5hbWVUb0ZpbmQpO1xufVxuXG5mdW5jdGlvbiBpbWFnZU1hdGNoZWQoaW1hZ2U6IHN0cmluZywgdGFnOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBpbWFnZSA9IGltYWdlLnRvTG93ZXJDYXNlKCk7XG4gICAgdGFnID0gdGFnLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgdGFnUGFydHMgPSB0YWcuc3BsaXQoJzonKTtcbiAgICBpZiAodGFnUGFydHMubGVuZ3RoID4gMSkge1xuICAgICAgICByZXR1cm4gaW1hZ2UgPT09IHRhZztcbiAgICB9XG4gICAgY29uc3QgaW1hZ2VQYXJ0cyA9IGltYWdlLnNwbGl0KCc6Jyk7XG4gICAgcmV0dXJuIGltYWdlUGFydHNbMF0gPT09IHRhZ1BhcnRzWzBdO1xufVxuXG5mdW5jdGlvbiBpbWFnZUhhc1JlcG9UYWcoaW5mbzogREltYWdlSW5mbywgdGFnOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISEoaW5mby5SZXBvVGFncyB8fCBbXSkuZmluZChuID0+IGltYWdlTWF0Y2hlZChuLCB0YWcpKTtcbn1cblxuZnVuY3Rpb24gZmluZENvbnRhaW5lckluZm8oY29udGFpbmVyczogRENvbnRhaW5lckluZm9bXSwgbmFtZTogc3RyaW5nKTogP0RDb250YWluZXJJbmZvIHtcbiAgICByZXR1cm4gY29udGFpbmVycy5maW5kKHggPT4gaGFzTmFtZSh4LCBuYW1lKSk7XG59XG5cbmZ1bmN0aW9uIGZpbmRJbWFnZUluZm8oaW1hZ2VzOiBESW1hZ2VJbmZvW10sIG5hbWU6IHN0cmluZyk6ID9ESW1hZ2VJbmZvIHtcbiAgICByZXR1cm4gaW1hZ2VzLmZpbmQoeCA9PiBpbWFnZUhhc1JlcG9UYWcoeCwgbmFtZSkpO1xufVxuXG5mdW5jdGlvbiBpc1J1bm5pbmcoaW5mbzogP0RDb250YWluZXJJbmZvKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhaW5mbyAmJiBpbmZvLlN0YXRlLnRvTG93ZXJDYXNlKCkgPT09ICdydW5uaW5nJztcbn1cblxuZnVuY3Rpb24gY29udGFpbmVyQmVsb25nc1RvSW1hZ2UoaW5mbzogRENvbnRhaW5lckluZm8sIGltYWdlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaW1hZ2VNYXRjaGVkKGluZm8uSW1hZ2UsIGltYWdlKTtcbn1cblxuZnVuY3Rpb24gaXNUb25EZXZDb250YWluZXIoaW5mbzogRENvbnRhaW5lckluZm8pOiBib29sZWFuIHtcbiAgICByZXR1cm4gY29udGFpbmVyQmVsb25nc1RvSW1hZ2UoaW5mbywgZGVmYXVsdHMubG9jYWxOb2RlSW1hZ2VGYW1pbHkpXG4gICAgICAgIHx8IGNvbnRhaW5lckJlbG9uZ3NUb0ltYWdlKGluZm8sIGRlZmF1bHRzLmNvbXBpbGVyc0ltYWdlRmFtaWx5KTtcbn1cblxuZnVuY3Rpb24gaXNUb25EZXZJbWFnZShpbmZvOiBESW1hZ2VJbmZvKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGltYWdlSGFzUmVwb1RhZyhpbmZvLCBkZWZhdWx0cy5sb2NhbE5vZGVJbWFnZUZhbWlseSlcbiAgICAgICAgfHwgaW1hZ2VIYXNSZXBvVGFnKGluZm8sIGRlZmF1bHRzLmNvbXBpbGVyc0ltYWdlRmFtaWx5KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gbGlzdFRvbkRldkNvbnRhaW5lcnMoKTogUHJvbWlzZTxEQ29udGFpbmVySW5mb1tdPiB7XG4gICAgcmV0dXJuIChhd2FpdCBsaXN0QWxsQ29udGFpbmVycygpKS5maWx0ZXIoaXNUb25EZXZDb250YWluZXIpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBsaXN0VG9uRGV2SW1hZ2VzKCk6IFByb21pc2U8REltYWdlSW5mb1tdPiB7XG4gICAgcmV0dXJuIChhd2FpdCBsaXN0QWxsSW1hZ2VzKCkpLmZpbHRlcihpc1RvbkRldkltYWdlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIG51bWVyaWNWZXJzaW9uLFxuICAgIGNyZWF0ZUNvbnRhaW5lcixcbiAgICBnZXRDb250YWluZXIsXG4gICAgaXNSdW5uaW5nLFxuICAgIGxpc3RBbGxDb250YWluZXJzLFxuICAgIGxpc3RBbGxJbWFnZXMsXG4gICAgZ2V0SW1hZ2UsXG4gICAgcHVsbEltYWdlLFxuICAgIGZpbmRDb250YWluZXJJbmZvLFxuICAgIGZpbmRJbWFnZUluZm8sXG4gICAgbGlzdFRvbkRldkltYWdlcyxcbiAgICBsaXN0VG9uRGV2Q29udGFpbmVycyxcbn1cbiJdfQ==