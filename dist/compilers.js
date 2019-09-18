"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _docker = _interopRequireDefault(require("./docker"));

var _config = require("./config");

var _setup = require("./setup");

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

var os = require('os');

var path = require('path');

var compilersConfig = _config.config.compilers;

function create(_x) {
  return _create.apply(this, arguments);
}

function _create() {
  _create = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(options) {
    var keepContent, containerInfo, jobName, srcJobPath, dstJobPath, container, containerRun, _containerRun;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _containerRun = function _ref2() {
              _containerRun = (0, _asyncToGenerator2["default"])(
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

                        if (!(os.platform() === 'win32')) {
                          _context.next = 3;
                          break;
                        }

                        return _context.abrupt("return", _utils.run.apply(void 0, ['docker', 'exec', containerInfo.Id].concat(args)));

                      case 3:
                        return _context.abrupt("return", new Promise(function (resolve, reject) {
                          container.exec({
                            Cmd: args,
                            Tty: true,
                            AttachStdin: true,
                            AttachStdout: true,
                            AttachStderr: true
                          }, function (err, exec) {
                            if (err) {
                              reject(err);
                              return;
                            }

                            exec.start(function (err, stream) {
                              if (err) {
                                reject(err);
                                return;
                              }

                              container.modem.demuxStream(stream, process.stdout, process.stderr);

                              var checkForResult = function checkForResult() {
                                exec.inspect(function (err, data) {
                                  if (err) {
                                    reject(err);
                                    return;
                                  }

                                  if (data.Running) {
                                    setTimeout(checkForResult, 10);
                                  } else {
                                    resolve(data);
                                  }
                                });
                              };

                              checkForResult();
                            });
                          });
                        }));

                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));
              return _containerRun.apply(this, arguments);
            };

            containerRun = function _ref() {
              return _containerRun.apply(this, arguments);
            };

            keepContent = options && options.keepContent || false;
            _context2.next = 5;
            return (0, _setup.ensureStartedCompilers)();

          case 5:
            containerInfo = _context2.sent;
            jobName = process.cwd().replace(/[\\/:]/g, '_');
            srcJobPath = (0, _utils.bindPathJoinTo)(path.join(compilersConfig.mountSource, jobName));
            dstJobPath = (0, _utils.bindPathJoinTo)("".concat(compilersConfig.mountDestination, "/").concat(jobName), '/');

            if (keepContent) {
              fs.mkdirSync(srcJobPath());
            } else {
              (0, _utils.ensureCleanDirectory)(srcJobPath());
            }

            container = _docker["default"].getContainer(containerInfo.Id);
            return _context2.abrupt("return", {
              srcJobPath: srcJobPath,
              dstJobPath: dstJobPath,
              run: containerRun
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _create.apply(this, arguments);
}

var _default = {
  create: create
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21waWxlcnMuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwib3MiLCJwYXRoIiwiY29tcGlsZXJzQ29uZmlnIiwiY29uZmlnIiwiY29tcGlsZXJzIiwiY3JlYXRlIiwib3B0aW9ucyIsImNvbnRhaW5lclJ1biIsImFyZ3MiLCJwbGF0Zm9ybSIsInJ1biIsImNvbnRhaW5lckluZm8iLCJJZCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiY29udGFpbmVyIiwiZXhlYyIsIkNtZCIsIlR0eSIsIkF0dGFjaFN0ZGluIiwiQXR0YWNoU3Rkb3V0IiwiQXR0YWNoU3RkZXJyIiwiZXJyIiwic3RhcnQiLCJzdHJlYW0iLCJtb2RlbSIsImRlbXV4U3RyZWFtIiwicHJvY2VzcyIsInN0ZG91dCIsInN0ZGVyciIsImNoZWNrRm9yUmVzdWx0IiwiaW5zcGVjdCIsImRhdGEiLCJSdW5uaW5nIiwic2V0VGltZW91dCIsImtlZXBDb250ZW50Iiwiam9iTmFtZSIsImN3ZCIsInJlcGxhY2UiLCJzcmNKb2JQYXRoIiwiam9pbiIsIm1vdW50U291cmNlIiwiZHN0Sm9iUGF0aCIsIm1vdW50RGVzdGluYXRpb24iLCJta2RpclN5bmMiLCJkb2NrZXIiLCJnZXRDb250YWluZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFrQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBckJBOzs7Ozs7Ozs7Ozs7OztBQWVBLElBQU1BLEVBQUUsR0FBR0MsT0FBTyxDQUFDLElBQUQsQ0FBbEI7O0FBQ0EsSUFBTUMsRUFBRSxHQUFHRCxPQUFPLENBQUMsSUFBRCxDQUFsQjs7QUFDQSxJQUFNRSxJQUFJLEdBQUdGLE9BQU8sQ0FBQyxNQUFELENBQXBCOztBQU1BLElBQU1HLGVBQWUsR0FBR0MsZUFBT0MsU0FBL0I7O1NBS2VDLE07Ozs7Ozs7K0JBQWYsa0JBQXNCQyxPQUF0QjtBQUFBLGdGQWVtQkMsWUFmbkI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FB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bUJBQU9DLFlBQVAsQ0FBb0JwQyxhQUFhLENBQUNDLEVBQWxDLENBYnRCO0FBQUEsOENBMERXO0FBQ0g0QixjQUFBQSxVQUFVLEVBQVZBLFVBREc7QUFFSEcsY0FBQUEsVUFBVSxFQUFWQSxVQUZHO0FBR0hqQyxjQUFBQSxHQUFHLEVBQUVIO0FBSEYsYUExRFg7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztlQWdFZTtBQUNYRixFQUFBQSxNQUFNLEVBQU5BO0FBRFcsQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOC0yMDE5IFRPTiBERVYgU09MVVRJT05TIExURC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgU09GVFdBUkUgRVZBTFVBVElPTiBMaWNlbnNlICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbiAqIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxuICogTGljZW5zZSBhdDogaHR0cHM6Ly93d3cudG9uLmRldi9saWNlbnNlc1xuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgVE9OIERFViBzb2Z0d2FyZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbi8vIEBmbG93XG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5jb25zdCBvcyA9IHJlcXVpcmUoJ29zJyk7XG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuaW1wb3J0IGRvY2tlciBmcm9tIFwiLi9kb2NrZXJcIjtcbmltcG9ydCB7Y29uZmlnfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCB7IGVuc3VyZVN0YXJ0ZWRDb21waWxlcnMgfSBmcm9tIFwiLi9zZXR1cFwiO1xuaW1wb3J0IHsgYmluZFBhdGhKb2luVG8sIGVuc3VyZUNsZWFuRGlyZWN0b3J5LCBydW4gfSBmcm9tIFwiLi91dGlsc1wiO1xuXG5jb25zdCBjb21waWxlcnNDb25maWcgPSBjb25maWcuY29tcGlsZXJzO1xuZXhwb3J0IHR5cGUgQ3JlYXRlQ29tcGlsZXJPcHRpb25zID0ge1xuICAgIGtlZXBDb250ZW50PzogYm9vbGVhbixcbn1cblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlKG9wdGlvbnM/OiBDcmVhdGVDb21waWxlck9wdGlvbnMpIHtcbiAgICBjb25zdCBrZWVwQ29udGVudCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5rZWVwQ29udGVudCB8fCBmYWxzZTtcbiAgICBjb25zdCBjb250YWluZXJJbmZvID0gYXdhaXQgZW5zdXJlU3RhcnRlZENvbXBpbGVycygpO1xuICAgIGNvbnN0IGpvYk5hbWUgPSBwcm9jZXNzLmN3ZCgpLnJlcGxhY2UoL1tcXFxcLzpdL2csICdfJyk7XG4gICAgY29uc3Qgc3JjSm9iUGF0aCA9IGJpbmRQYXRoSm9pblRvKHBhdGguam9pbihjb21waWxlcnNDb25maWcubW91bnRTb3VyY2UsIGpvYk5hbWUpKTtcbiAgICBjb25zdCBkc3RKb2JQYXRoID0gYmluZFBhdGhKb2luVG8oYCR7Y29tcGlsZXJzQ29uZmlnLm1vdW50RGVzdGluYXRpb259LyR7am9iTmFtZX1gLCAnLycpO1xuXG4gICAgaWYgKGtlZXBDb250ZW50KSB7XG4gICAgICAgIGZzLm1rZGlyU3luYyhzcmNKb2JQYXRoKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGVuc3VyZUNsZWFuRGlyZWN0b3J5KHNyY0pvYlBhdGgoKSk7XG4gICAgfVxuXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9ja2VyLmdldENvbnRhaW5lcihjb250YWluZXJJbmZvLklkKTtcblxuICAgIGFzeW5jIGZ1bmN0aW9uIGNvbnRhaW5lclJ1biguLi5hcmdzOiBzdHJpbmdbXSkge1xuICAgICAgICBpZiAob3MucGxhdGZvcm0oKSA9PT0gJ3dpbjMyJykge1xuICAgICAgICAgICAgcmV0dXJuIHJ1bignZG9ja2VyJywgJ2V4ZWMnLCBjb250YWluZXJJbmZvLklkLCAuLi5hcmdzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29udGFpbmVyLmV4ZWMoe1xuICAgICAgICAgICAgICAgIENtZDogYXJncyxcbiAgICAgICAgICAgICAgICBUdHk6IHRydWUsXG4gICAgICAgICAgICAgICAgQXR0YWNoU3RkaW46IHRydWUsXG4gICAgICAgICAgICAgICAgQXR0YWNoU3Rkb3V0OiB0cnVlLFxuICAgICAgICAgICAgICAgIEF0dGFjaFN0ZGVycjogdHJ1ZSxcbiAgICAgICAgICAgIH0sIChlcnIsIGV4ZWMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGV4ZWMuc3RhcnQoKGVyciwgc3RyZWFtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLm1vZGVtLmRlbXV4U3RyZWFtKHN0cmVhbSwgcHJvY2Vzcy5zdGRvdXQsIHByb2Nlc3Muc3RkZXJyKTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGVja0ZvclJlc3VsdCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4ZWMuaW5zcGVjdCgoZXJyLCBkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5SdW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoY2hlY2tGb3JSZXN1bHQsIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBjaGVja0ZvclJlc3VsdCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHNyY0pvYlBhdGgsXG4gICAgICAgIGRzdEpvYlBhdGgsXG4gICAgICAgIHJ1bjogY29udGFpbmVyUnVuLFxuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBjcmVhdGUsXG59XG4iXX0=