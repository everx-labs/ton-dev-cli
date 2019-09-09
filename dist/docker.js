"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _config = _interopRequireDefault(require("./config"));

var _dockerode = _interopRequireDefault(require("dockerode"));

var _utils = require("./utils");

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
              docker.pull(repoTag, _config["default"].auth, function (err, stream) {
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

function imageHasRepoTag(info, tag) {
  return !!(info.RepoTags || []).find(function (n) {
    return n.toLowerCase() === tag.toLowerCase();
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
  findImageInfo: findImageInfo
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb2NrZXIuanMiXSwibmFtZXMiOlsiZG9ja2VyIiwiRG9ja2VyIiwibnVtZXJpY1ZlcnNpb24iLCJ2ZXJzaW9uIiwiVmVyc2lvbiIsImxpc3RBbGxDb250YWluZXJzIiwibGlzdENvbnRhaW5lcnMiLCJhbGwiLCJsaXN0QWxsSW1hZ2VzIiwibGlzdEltYWdlcyIsImdldENvbnRhaW5lciIsImlkIiwiZ2V0SW1hZ2UiLCJuYW1lIiwiY3JlYXRlQ29udGFpbmVyIiwib3B0aW9ucyIsInB1bGxJbWFnZSIsInJlcG9UYWciLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInB1bGwiLCJjb25maWciLCJhdXRoIiwiZXJyIiwic3RyZWFtIiwibGFzdFJlcG9ydFRpbWUiLCJEYXRlIiwibm93IiwibW9kZW0iLCJmb2xsb3dQcm9ncmVzcyIsIm9uRmluaXNoZWQiLCJvblByb2dyZXNzIiwib3V0cHV0IiwiZXZlbnQiLCJpc1RpbWVUb1JlcG9ydCIsInByb2Nlc3MiLCJzdGRvdXQiLCJ3cml0ZSIsImhhc05hbWUiLCJjb250YWluZXIiLCJuYW1lVG9GaW5kIiwidG9Mb3dlckNhc2UiLCJOYW1lcyIsImZpbmQiLCJuIiwiaW1hZ2VIYXNSZXBvVGFnIiwiaW5mbyIsInRhZyIsIlJlcG9UYWdzIiwiZmluZENvbnRhaW5lckluZm8iLCJjb250YWluZXJzIiwieCIsImZpbmRJbWFnZUluZm8iLCJpbWFnZXMiLCJpc1J1bm5pbmciLCJTdGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQWdCQTs7QUFDQTs7QUFFQTs7QUFuQkE7Ozs7Ozs7Ozs7Ozs7OztBQXFCQSxJQUFNQSxNQUFNLEdBQUcsSUFBSUMscUJBQUosRUFBZjs7U0FzRWVDLGM7Ozs7Ozs7K0JBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFDb0NGLE1BQU0sQ0FBQ0csT0FBUCxFQURwQzs7QUFBQTtBQUNVQSxZQUFBQSxPQURWO0FBQUEsNkNBRVcsNEJBQWdC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XG4gKiBDb3B5cmlnaHQgMjAxOC0yMDE5IFRPTiBERVYgU09MVVRJT05TIExURC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgU09GVFdBUkUgRVZBTFVBVElPTiBMaWNlbnNlICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbiAqIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxuICogTGljZW5zZSBhdDpcbiAqXG4gKiBodHRwOi8vd3d3LnRvbi5kZXYvbGljZW5zZXNcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIFRPTiBERVYgc29mdHdhcmUgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8vIEBmbG93XG5pbXBvcnQgY29uZmlnIGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0IERvY2tlciBmcm9tICdkb2NrZXJvZGUnO1xuXG5pbXBvcnQgeyB2ZXJzaW9uVG9OdW1iZXIgfSBmcm9tIFwiLi91dGlsc1wiO1xuXG5jb25zdCBkb2NrZXIgPSBuZXcgRG9ja2VyKCk7XG5cbmV4cG9ydCB0eXBlIERJbWFnZUluZm8gPSB7XG4gICAgSWQ6IHN0cmluZyxcbiAgICBSZXBvVGFnczogc3RyaW5nW10sXG59XG5cbmV4cG9ydCB0eXBlIERDb250YWluZXJJbmZvID0ge1xuICAgIElkOiBzdHJpbmcsXG4gICAgTmFtZXM6IHN0cmluZ1tdLFxuICAgIEltYWdlOiBzdHJpbmcsXG4gICAgSW1hZ2VJRDogc3RyaW5nLFxuICAgIFN0YXRlOiBzdHJpbmcsXG59XG5cbmV4cG9ydCB0eXBlIERDb250YWluZXJFeGVjT3B0aW9ucyA9IHtcbiAgICBBdHRhY2hTdGRpbj86IGJvb2xlYW4sXG4gICAgQXR0YWNoU3Rkb3V0PzogYm9vbGVhbixcbiAgICBBdHRhY2hTdGRlcnI/OiBib29sZWFuLFxuICAgIERldGFjaEtleXM/OiBzdHJpbmcsXG4gICAgVHR5PzogYm9vbGVhbixcbiAgICBFbnY/OiBzdHJpbmcsXG4gICAgQ21kPzogc3RyaW5nW10sXG4gICAgUHJpdmlsZWdlZD86IGJvb2xlYW4sXG4gICAgVXNlcj86IHN0cmluZyxcbiAgICBXb3JraW5nRGlyPzogc3RyaW5nLFxufVxuXG5leHBvcnQgdHlwZSBEQ29udGFpbmVyID0ge1xuICAgIG1vZGVtOiBhbnksXG4gICAgc3RhcnQoKTogUHJvbWlzZTx2b2lkPixcbiAgICBleGVjKG9wdGlvbnM6IERDb250YWluZXJFeGVjT3B0aW9ucywgY2FsbGJhY2s6IGFueSk6IHZvaWQsXG4gICAgc3RvcCgpOiBQcm9taXNlPHZvaWQ+LFxuICAgIHJlbW92ZSgpOiBQcm9taXNlPHZvaWQ+LFxufVxuXG5leHBvcnQgdHlwZSBESW1hZ2UgPSB7XG4gICAgcmVtb3ZlKCk6IFByb21pc2U8dm9pZD4sXG59XG5cbmV4cG9ydCB0eXBlIERNb3VudCA9IHtcbiAgICBUYXJnZXQ6IHN0cmluZyxcbiAgICBTb3VyY2U6IHN0cmluZyxcbiAgICBUeXBlOiAnYmluZCcgfCAndm9sdW1lJyB8ICd0bXBmcycsXG59XG5cbmV4cG9ydCB0eXBlIERDcmVhdGVDb250YWluZXJPcHRpb25zID0ge1xuICAgIG5hbWU/OiBzdHJpbmcsXG4gICAgSW1hZ2U6IHN0cmluZyxcbiAgICBJbnRlcmFjdGl2ZT86IGJvb2xlYW4sXG4gICAgVHR5PzogYm9vbGVhbixcbiAgICBVc2VyPzogc3RyaW5nLFxuICAgIEVudHJ5cG9pbnQ/OiBzdHJpbmdbXSxcbiAgICBIb3N0Q29uZmlnPzoge1xuICAgICAgICBNb3VudHM/OiBETW91bnRbXSxcbiAgICB9LFxuICAgIEV4cG9zZWRQb3J0cz86IHtcbiAgICAgICAgW3N0cmluZ106IHt9XG4gICAgfSxcbiAgICBIb3N0Q29uZmlnPzoge1xuICAgICAgICBQb3J0QmluZGluZ3M/OiB7XG4gICAgICAgICAgICBbc3RyaW5nXTogeyBIb3N0SXA6IHN0cmluZywgSG9zdFBvcnQ6IHN0cmluZyB9W11cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgRFZlcnNpb24gPSB7XG4gICAgVmVyc2lvbjogc3RyaW5nLFxufVxuXG5hc3luYyBmdW5jdGlvbiBudW1lcmljVmVyc2lvbigpIHtcbiAgICBjb25zdCB2ZXJzaW9uOiBEVmVyc2lvbiA9IGF3YWl0IGRvY2tlci52ZXJzaW9uKCk7XG4gICAgcmV0dXJuIHZlcnNpb25Ub051bWJlcih2ZXJzaW9uLlZlcnNpb24pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBsaXN0QWxsQ29udGFpbmVycygpOiBQcm9taXNlPERDb250YWluZXJJbmZvW10+IHtcbiAgICByZXR1cm4gZG9ja2VyLmxpc3RDb250YWluZXJzKHsgYWxsOiB0cnVlIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBsaXN0QWxsSW1hZ2VzKCk6IFByb21pc2U8REltYWdlSW5mb1tdPiB7XG4gICAgcmV0dXJuIGRvY2tlci5saXN0SW1hZ2VzKHsgYWxsOiB0cnVlIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRDb250YWluZXIoaWQ6IHN0cmluZyk6IERDb250YWluZXIge1xuICAgIHJldHVybiBkb2NrZXIuZ2V0Q29udGFpbmVyKGlkKTtcbn1cblxuZnVuY3Rpb24gZ2V0SW1hZ2UobmFtZTogc3RyaW5nKTogREltYWdlIHtcbiAgICByZXR1cm4gZG9ja2VyLmdldEltYWdlKG5hbWUpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVDb250YWluZXIob3B0aW9uczogRENyZWF0ZUNvbnRhaW5lck9wdGlvbnMpOiBQcm9taXNlPERDb250YWluZXI+IHtcbiAgICByZXR1cm4gZG9ja2VyLmNyZWF0ZUNvbnRhaW5lcihvcHRpb25zKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcHVsbEltYWdlKHJlcG9UYWc6IHN0cmluZyk6IFByb21pc2U8REltYWdlPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgZG9ja2VyLnB1bGwocmVwb1RhZywgY29uZmlnLmF1dGgsIGZ1bmN0aW9uIChlcnIsIHN0cmVhbSkge1xuICAgICAgICAgICAgaWYgKCFzdHJlYW0pIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgbGFzdFJlcG9ydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgZG9ja2VyLm1vZGVtLmZvbGxvd1Byb2dyZXNzKHN0cmVhbSwgb25GaW5pc2hlZCwgb25Qcm9ncmVzcyk7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uRmluaXNoZWQoZXJyLCBvdXRwdXQpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKG91dHB1dCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uUHJvZ3Jlc3MoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpc1RpbWVUb1JlcG9ydCA9IERhdGUubm93KCkgPiBsYXN0UmVwb3J0VGltZSArIDEwMDA7XG4gICAgICAgICAgICAgICAgaWYgKGlzVGltZVRvUmVwb3J0KSB7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RSZXBvcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoJy4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gaGFzTmFtZShjb250YWluZXI6IERDb250YWluZXJJbmZvLCBuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBuYW1lVG9GaW5kID0gYC8ke25hbWV9YC50b0xvd2VyQ2FzZSgpO1xuICAgIHJldHVybiAhIShjb250YWluZXIuTmFtZXMgfHwgW10pLmZpbmQobiA9PiBuLnRvTG93ZXJDYXNlKCkgPT09IG5hbWVUb0ZpbmQpO1xufVxuXG5mdW5jdGlvbiBpbWFnZUhhc1JlcG9UYWcoaW5mbzogREltYWdlSW5mbywgdGFnOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISEoaW5mby5SZXBvVGFncyB8fCBbXSkuZmluZChuID0+IG4udG9Mb3dlckNhc2UoKSA9PT0gdGFnLnRvTG93ZXJDYXNlKCkpO1xufVxuXG5mdW5jdGlvbiBmaW5kQ29udGFpbmVySW5mbyhjb250YWluZXJzOiBEQ29udGFpbmVySW5mb1tdLCBuYW1lOiBzdHJpbmcpOiA/RENvbnRhaW5lckluZm8ge1xuICAgIHJldHVybiBjb250YWluZXJzLmZpbmQoeCA9PiBoYXNOYW1lKHgsIG5hbWUpKTtcbn1cblxuZnVuY3Rpb24gZmluZEltYWdlSW5mbyhpbWFnZXM6IERJbWFnZUluZm9bXSwgbmFtZTogc3RyaW5nKTogP0RJbWFnZUluZm8ge1xuICAgIHJldHVybiBpbWFnZXMuZmluZCh4ID0+IGltYWdlSGFzUmVwb1RhZyh4LCBuYW1lKSk7XG59XG5cbmZ1bmN0aW9uIGlzUnVubmluZyhpbmZvOiA/RENvbnRhaW5lckluZm8pOiBib29sZWFuIHtcbiAgICByZXR1cm4gISFpbmZvICYmIGluZm8uU3RhdGUudG9Mb3dlckNhc2UoKSA9PT0gJ3J1bm5pbmcnO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgbnVtZXJpY1ZlcnNpb24sXG4gICAgY3JlYXRlQ29udGFpbmVyLFxuICAgIGdldENvbnRhaW5lcixcbiAgICBpc1J1bm5pbmcsXG4gICAgbGlzdEFsbENvbnRhaW5lcnMsXG4gICAgbGlzdEFsbEltYWdlcyxcbiAgICBnZXRJbWFnZSxcbiAgICBwdWxsSW1hZ2UsXG4gICAgZmluZENvbnRhaW5lckluZm8sXG4gICAgZmluZEltYWdlSW5mbyxcbn1cbiJdfQ==