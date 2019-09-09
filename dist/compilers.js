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

var path = require('path');

var config = _config["default"].compilers;

function create(_x) {
  return _create.apply(this, arguments);
}

function _create() {
  _create = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(options) {
    var keepContent, containerInfo, project, projectHostPath, container, hostPath, run, _run;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _run = function _ref3() {
              _run = (0, _asyncToGenerator2["default"])(
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

                        return _context.abrupt("return", new Promise(function (resolve, reject) {
                          container.exec({
                            WorkingDir: "".concat(config.mountDestination, "/").concat(project),
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

                      case 2:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));
              return _run.apply(this, arguments);
            };

            run = function _ref2() {
              return _run.apply(this, arguments);
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
            return _context2.abrupt("return", {
              hostPath: hostPath,
              run: run
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21waWxlcnMuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwicGF0aCIsImNvbmZpZyIsInJvb3RDb25maWciLCJjb21waWxlcnMiLCJjcmVhdGUiLCJvcHRpb25zIiwiaG9zdFBhdGgiLCJydW4iLCJhcmdzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJjb250YWluZXIiLCJleGVjIiwiV29ya2luZ0RpciIsIm1vdW50RGVzdGluYXRpb24iLCJwcm9qZWN0IiwiQ21kIiwiVHR5IiwiQXR0YWNoU3RkaW4iLCJBdHRhY2hTdGRvdXQiLCJBdHRhY2hTdGRlcnIiLCJlcnIiLCJzdGFydCIsInN0cmVhbSIsIm1vZGVtIiwiZGVtdXhTdHJlYW0iLCJwcm9jZXNzIiwic3Rkb3V0Iiwic3RkZXJyIiwiY2hlY2tGb3JSZXN1bHQiLCJpbnNwZWN0IiwiZGF0YSIsIlJ1bm5pbmciLCJzZXRUaW1lb3V0IiwiaXRlbXMiLCJqb2luIiwicHJvamVjdEhvc3RQYXRoIiwia2VlcENvbnRlbnQiLCJjb250YWluZXJJbmZvIiwiY3dkIiwic3BsaXQiLCJkZWxpbWl0ZXIiLCJtYXAiLCJ4Iiwic2VwIiwibW91bnRTb3VyY2UiLCJta2RpclN5bmMiLCJkb2NrZXIiLCJnZXRDb250YWluZXIiLCJJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQWlCQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFwQkE7Ozs7Ozs7Ozs7Ozs7O0FBZUEsSUFBTUEsRUFBRSxHQUFHQyxPQUFPLENBQUMsSUFBRCxDQUFsQjs7QUFDQSxJQUFNQyxJQUFJLEdBQUdELE9BQU8sQ0FBQyxNQUFELENBQXBCOztBQU1BLElBQU1FLE1BQU0sR0FBR0MsbUJBQVdDLFNBQTFCOztTQUtlQyxNOzs7Ozs7OytCQUFmLGtCQUFzQkMsT0FBdEI7QUFBQSx5RUFhYUMsUUFiYixFQWlCbUJDLEdBakJuQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDJDQWlCSTtB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U0FBSCxDQUFhVixlQUFiO0FBQ0gsYUFGRCxNQUVPO0FBQ0gsK0NBQXFCQSxlQUFyQjtBQUNIOztBQUVLekIsWUFBQUEsU0FaVixHQVlzQm9DLG1CQUFPQyxZQUFQLENBQW9CVixhQUFhLENBQUNXLEVBQWxDLENBWnRCO0FBQUEsOENBMERXO0FBQ0g1QyxjQUFBQSxRQUFRLEVBQVJBLFFBREc7QUFFSEMsY0FBQUEsR0FBRyxFQUFIQTtBQUZHLGFBMURYOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7ZUErRGU7QUFDWEgsRUFBQUEsTUFBTSxFQUFOQTtBQURXLEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG4gKiB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbiAqIExpY2Vuc2UgYXQ6IGh0dHBzOi8vd3d3LnRvbi5kZXYvbGljZW5zZXNcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIFRPTiBERVYgc29mdHdhcmUgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG4vLyBAZmxvd1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmltcG9ydCBkb2NrZXIgZnJvbSBcIi4vZG9ja2VyXCI7XG5pbXBvcnQgcm9vdENvbmZpZyBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCB7IGVuc3VyZVN0YXJ0ZWRDb21waWxlcnMgfSBmcm9tIFwiLi9zZXR1cFwiO1xuaW1wb3J0IHsgZW5zdXJlQ2xlYW5EaXJlY3RvcnkgfSBmcm9tIFwiLi91dGlsc1wiO1xuXG5jb25zdCBjb25maWcgPSByb290Q29uZmlnLmNvbXBpbGVycztcbmV4cG9ydCB0eXBlIENyZWF0ZUNvbXBpbGVyT3B0aW9ucyA9IHtcbiAgICBrZWVwQ29udGVudD86IGJvb2xlYW4sXG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZShvcHRpb25zPzogQ3JlYXRlQ29tcGlsZXJPcHRpb25zKSB7XG4gICAgY29uc3Qga2VlcENvbnRlbnQgPSBvcHRpb25zICYmIG9wdGlvbnMua2VlcENvbnRlbnQgfHwgZmFsc2U7XG4gICAgY29uc3QgY29udGFpbmVySW5mbyA9IGF3YWl0IGVuc3VyZVN0YXJ0ZWRDb21waWxlcnMoKTtcbiAgICBjb25zdCBwcm9qZWN0ID0gcHJvY2Vzcy5jd2QoKS5zcGxpdChwYXRoLmRlbGltaXRlcikubWFwKHggPT4geC5zcGxpdChwYXRoLnNlcCkuam9pbignXycpKS5qb2luKCdfJyk7XG4gICAgY29uc3QgcHJvamVjdEhvc3RQYXRoID0gYCR7Y29uZmlnLm1vdW50U291cmNlfS8ke3Byb2plY3R9YDtcblxuICAgIGlmIChrZWVwQ29udGVudCkge1xuICAgICAgICBmcy5ta2RpclN5bmMocHJvamVjdEhvc3RQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBlbnN1cmVDbGVhbkRpcmVjdG9yeShwcm9qZWN0SG9zdFBhdGgpO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY2tlci5nZXRDb250YWluZXIoY29udGFpbmVySW5mby5JZCk7XG4gICAgZnVuY3Rpb24gaG9zdFBhdGgoLi4uaXRlbXM6IHN0cmluZ1tdKSB7XG4gICAgICAgIHJldHVybiBwYXRoLmpvaW4ocHJvamVjdEhvc3RQYXRoLCAuLi5pdGVtcyk7XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gcnVuKC4uLmFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb250YWluZXIuZXhlYyh7XG4gICAgICAgICAgICAgICAgV29ya2luZ0RpcjogYCR7Y29uZmlnLm1vdW50RGVzdGluYXRpb259LyR7cHJvamVjdH1gLFxuICAgICAgICAgICAgICAgIENtZDogYXJncyxcbiAgICAgICAgICAgICAgICBUdHk6IHRydWUsXG4gICAgICAgICAgICAgICAgQXR0YWNoU3RkaW46IHRydWUsXG4gICAgICAgICAgICAgICAgQXR0YWNoU3Rkb3V0OiB0cnVlLFxuICAgICAgICAgICAgICAgIEF0dGFjaFN0ZGVycjogdHJ1ZSxcbiAgICAgICAgICAgIH0sIChlcnIsIGV4ZWMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGV4ZWMuc3RhcnQoKGVyciwgc3RyZWFtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLm1vZGVtLmRlbXV4U3RyZWFtKHN0cmVhbSwgcHJvY2Vzcy5zdGRvdXQsIHByb2Nlc3Muc3RkZXJyKTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGVja0ZvclJlc3VsdCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4ZWMuaW5zcGVjdCgoZXJyLCBkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5SdW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoY2hlY2tGb3JSZXN1bHQsIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBjaGVja0ZvclJlc3VsdCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGhvc3RQYXRoLFxuICAgICAgICBydW5cbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCB7XG4gICAgY3JlYXRlLFxufVxuIl19