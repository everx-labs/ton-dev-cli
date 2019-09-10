"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _docker = _interopRequireDefault(require("./docker"));

var _config = _interopRequireDefault(require("./config"));

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

var config = _config["default"].compilers;

function create(_x) {
  return _create.apply(this, arguments);
}

function _create() {
  _create = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(options) {
    var keepContent, containerInfo, project, projectHostPath, container, hostPath, workingDir, containerRun, _containerRun;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _containerRun = function _ref3() {
              _containerRun = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee() {
                var _len2,
                    args,
                    _key2,
                    _args = arguments;

                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        for (_len2 = _args.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                          args[_key2] = _args[_key2];
                        }

                        if (!(os.platform() === 'win32')) {
                          _context.next = 3;
                          break;
                        }

                        return _context.abrupt("return", _utils.run.apply(void 0, ['docker', 'exec', containerInfo.Id, 'sh'].concat(args)));

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

            containerRun = function _ref2() {
              return _containerRun.apply(this, arguments);
            };

            hostPath = function _ref() {
              for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++) {
                items[_key] = arguments[_key];
              }

              return path.join.apply(path, [projectHostPath].concat(items));
            };

            keepContent = options && options.keepContent || false;
            _context2.next = 6;
            return (0, _setup.ensureStartedCompilers)();

          case 6:
            containerInfo = _context2.sent;
            project = process.cwd().split(path.delimiter).map(function (x) {
              return x.split(path.sep).join('_');
            }).join('_');
            projectHostPath = "".concat(config.mountSource, "/").concat(project);

            if (keepContent) {
              fs.mkdirSync(projectHostPath);
            } else {
              (0, _utils.ensureCleanDirectory)(projectHostPath);
            }

            container = _docker["default"].getContainer(containerInfo.Id);
            workingDir = "".concat(config.mountDestination, "/").concat(project);
            return _context2.abrupt("return", {
              workingDir: workingDir,
              hostPath: hostPath,
              run: containerRun
            });

          case 13:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21waWxlcnMuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwib3MiLCJwYXRoIiwiY29uZmlnIiwicm9vdENvbmZpZyIsImNvbXBpbGVycyIsImNyZWF0ZSIsIm9wdGlvbnMiLCJob3N0UGF0aCIsImNvbnRhaW5lclJ1biIsImFyZ3MiLCJwbGF0Zm9ybSIsInJ1biIsImNvbnRhaW5lckluZm8iLCJJZCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiY29udGFpbmVyIiwiZXhlYyIsIkNtZCIsIlR0eSIsIkF0dGFjaFN0ZGluIiwiQXR0YWNoU3Rkb3V0IiwiQXR0YWNoU3RkZXJyIiwiZXJyIiwic3RhcnQiLCJzdHJlYW0iLCJtb2RlbSIsImRlbXV4U3RyZWFtIiwicHJvY2VzcyIsInN0ZG91dCIsInN0ZGVyciIsImNoZWNrRm9yUmVzdWx0IiwiaW5zcGVjdCIsImRhdGEiLCJSdW5uaW5nIiwic2V0VGltZW91dCIsIml0ZW1zIiwiam9pbiIsInByb2plY3RIb3N0UGF0aCIsImtlZXBDb250ZW50IiwicHJvamVjdCIsImN3ZCIsInNwbGl0IiwiZGVsaW1pdGVyIiwibWFwIiwieCIsInNlcCIsIm1vdW50U291cmNlIiwibWtkaXJTeW5jIiwiZG9ja2VyIiwiZ2V0Q29udGFpbmVyIiwid29ya2luZ0RpciIsIm1vdW50RGVzdGluYXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFrQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBckJBOzs7Ozs7Ozs7Ozs7OztBQWVBLElBQU1BLEVBQUUsR0FBR0MsT0FBTyxDQUFDLElBQUQsQ0FBbEI7O0FBQ0EsSUFBTUMsRUFBRSxHQUFHRCxPQUFPLENBQUMsSUFBRCxDQUFsQjs7QUFDQSxJQUFNRSxJQUFJLEdBQUdGLE9BQU8sQ0FBQyxNQUFELENBQXBCOztBQU1BLElBQU1HLE1BQU0sR0FBR0MsbUJBQVdDLFNBQTFCOztTQUtlQyxNOzs7Ozs7OytCQUFmLGtCQUFzQkMsT0FBdEI7QUFBQSx5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QXVCLEdBQXZCLENBQUo7QUFBQSxhQUF6QyxFQUEwRUEsSUFBMUUsQ0FBK0UsR0FBL0UsQ0FIcEI7QUFJVUMsWUFBQUEsZUFKVixhQUkrQnJDLE1BQU0sQ0FBQzhDLFdBSnRDLGNBSXFEUCxPQUpyRDs7QUFNSSxnQkFBSUQsV0FBSixFQUFpQjtBQUNiMUMsY0FBQUEsRUFBRSxDQUFDbUQsU0FBSCxDQUFhVixlQUFiO0FBQ0gsYUFGRCxNQUVPO0FBQ0gsK0NBQXFCQSxlQUFyQjtBQUNIOztBQUVLdEIsWUFBQUEsU0FaVixHQVlzQmlDLG1CQUFPQyxZQUFQLENBQW9CdkMsYUFBYSxDQUFDQyxFQUFsQyxDQVp0QjtBQWlCVXVDLFlBQUFBLFVBakJWLGFBaUIwQmxELE1BQU0sQ0FBQ21ELGdCQWpCakMsY0FpQnFEWixPQWpCckQ7QUFBQSw4Q0E4RFc7QUFDSFcsY0FBQUEsVUFBVSxFQUFWQSxVQURHO0FBRUg3QyxjQUFBQSxRQUFRLEVBQVJBLFFBRkc7QUFHSEksY0FBQUEsR0FBRyxFQUFFSDtBQUhGLGFBOURYOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7ZUFvRWU7QUFDWEgsRUFBQUEsTUFBTSxFQUFOQTtBQURXLEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG4gKiB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbiAqIExpY2Vuc2UgYXQ6IGh0dHBzOi8vd3d3LnRvbi5kZXYvbGljZW5zZXNcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIFRPTiBERVYgc29mdHdhcmUgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG4vLyBAZmxvd1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuY29uc3Qgb3MgPSByZXF1aXJlKCdvcycpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmltcG9ydCBkb2NrZXIgZnJvbSBcIi4vZG9ja2VyXCI7XG5pbXBvcnQgcm9vdENvbmZpZyBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCB7IGVuc3VyZVN0YXJ0ZWRDb21waWxlcnMgfSBmcm9tIFwiLi9zZXR1cFwiO1xuaW1wb3J0IHsgZW5zdXJlQ2xlYW5EaXJlY3RvcnksIHJ1biB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmNvbnN0IGNvbmZpZyA9IHJvb3RDb25maWcuY29tcGlsZXJzO1xuZXhwb3J0IHR5cGUgQ3JlYXRlQ29tcGlsZXJPcHRpb25zID0ge1xuICAgIGtlZXBDb250ZW50PzogYm9vbGVhbixcbn1cblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlKG9wdGlvbnM/OiBDcmVhdGVDb21waWxlck9wdGlvbnMpIHtcbiAgICBjb25zdCBrZWVwQ29udGVudCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5rZWVwQ29udGVudCB8fCBmYWxzZTtcbiAgICBjb25zdCBjb250YWluZXJJbmZvID0gYXdhaXQgZW5zdXJlU3RhcnRlZENvbXBpbGVycygpO1xuICAgIGNvbnN0IHByb2plY3QgPSBwcm9jZXNzLmN3ZCgpLnNwbGl0KHBhdGguZGVsaW1pdGVyKS5tYXAoeCA9PiB4LnNwbGl0KHBhdGguc2VwKS5qb2luKCdfJykpLmpvaW4oJ18nKTtcbiAgICBjb25zdCBwcm9qZWN0SG9zdFBhdGggPSBgJHtjb25maWcubW91bnRTb3VyY2V9LyR7cHJvamVjdH1gO1xuXG4gICAgaWYgKGtlZXBDb250ZW50KSB7XG4gICAgICAgIGZzLm1rZGlyU3luYyhwcm9qZWN0SG9zdFBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGVuc3VyZUNsZWFuRGlyZWN0b3J5KHByb2plY3RIb3N0UGF0aCk7XG4gICAgfVxuXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9ja2VyLmdldENvbnRhaW5lcihjb250YWluZXJJbmZvLklkKTtcbiAgICBmdW5jdGlvbiBob3N0UGF0aCguLi5pdGVtczogc3RyaW5nW10pIHtcbiAgICAgICAgcmV0dXJuIHBhdGguam9pbihwcm9qZWN0SG9zdFBhdGgsIC4uLml0ZW1zKTtcbiAgICB9XG5cbiAgICBjb25zdCB3b3JraW5nRGlyID0gYCR7Y29uZmlnLm1vdW50RGVzdGluYXRpb259LyR7cHJvamVjdH1gO1xuXG4gICAgYXN5bmMgZnVuY3Rpb24gY29udGFpbmVyUnVuKC4uLmFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgICAgIGlmIChvcy5wbGF0Zm9ybSgpID09PSAnd2luMzInKSB7XG4gICAgICAgICAgICByZXR1cm4gcnVuKCdkb2NrZXInLCAnZXhlYycsIGNvbnRhaW5lckluZm8uSWQsICdzaCcsIC4uLmFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb250YWluZXIuZXhlYyh7XG4gICAgICAgICAgICAgICAgQ21kOiBhcmdzLFxuICAgICAgICAgICAgICAgIFR0eTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBBdHRhY2hTdGRpbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBBdHRhY2hTdGRvdXQ6IHRydWUsXG4gICAgICAgICAgICAgICAgQXR0YWNoU3RkZXJyOiB0cnVlLFxuICAgICAgICAgICAgfSwgKGVyciwgZXhlYykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZXhlYy5zdGFydCgoZXJyLCBzdHJlYW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIubW9kZW0uZGVtdXhTdHJlYW0oc3RyZWFtLCBwcm9jZXNzLnN0ZG91dCwgcHJvY2Vzcy5zdGRlcnIpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrRm9yUmVzdWx0ID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhlYy5pbnNwZWN0KChlcnIsIGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlJ1bm5pbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChjaGVja0ZvclJlc3VsdCwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrRm9yUmVzdWx0KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgd29ya2luZ0RpcixcbiAgICAgICAgaG9zdFBhdGgsXG4gICAgICAgIHJ1bjogY29udGFpbmVyUnVuLFxuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBjcmVhdGUsXG59XG4iXX0=