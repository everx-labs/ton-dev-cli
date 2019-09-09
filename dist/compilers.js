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
    var keepContent, containerInfo, project, projectHostPath, container, hostPath, workingDir, run, _run;

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
                            WorkingDir: workingDir,
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
            workingDir = "".concat(config.mountDestination, "/").concat(project);
            return _context2.abrupt("return", {
              workingDir: workingDir,
              hostPath: hostPath,
              run: run
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21waWxlcnMuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwicGF0aCIsImNvbmZpZyIsInJvb3RDb25maWciLCJjb21waWxlcnMiLCJjcmVhdGUiLCJvcHRpb25zIiwiaG9zdFBhdGgiLCJydW4iLCJhcmdzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJjb250YWluZXIiLCJleGVjIiwiV29ya2luZ0RpciIsIndvcmtpbmdEaXIiLCJDbWQiLCJUdHkiLCJBdHRhY2hTdGRpbiIsIkF0dGFjaFN0ZG91dCIsIkF0dGFjaFN0ZGVyciIsImVyciIsInN0YXJ0Iiwic3RyZWFtIiwibW9kZW0iLCJkZW11eFN0cmVhbSIsInByb2Nlc3MiLCJzdGRvdXQiLCJzdGRlcnIiLCJjaGVja0ZvclJlc3VsdCIsImluc3BlY3QiLCJkYXRhIiwiUnVubmluZyIsInNldFRpbWVvdXQiLCJpdGVtcyIsImpvaW4iLCJwcm9qZWN0SG9zdFBhdGgiLCJrZWVwQ29udGVudCIsImNvbnRhaW5lckluZm8iLCJwcm9qZWN0IiwiY3dkIiwic3BsaXQiLCJkZWxpbWl0ZXIiLCJtYXAiLCJ4Iiwic2VwIiwibW91bnRTb3VyY2UiLCJta2RpclN5bmMiLCJkb2NrZXIiLCJnZXRDb250YWluZXIiLCJJZCIsIm1vdW50RGVzdGluYXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFpQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBcEJBOzs7Ozs7Ozs7Ozs7OztBQWVBLElBQU1BLEVBQUUsR0FBR0MsT0FBTyxDQUFDLElBQUQsQ0FBbEI7O0FBQ0EsSUFBTUMsSUFBSSxHQUFHRCxPQUFPLENBQUMsTUFBRCxDQUFwQjs7QUFNQSxJQUFNRSxNQUFNLEdBQUdDLG1CQUFXQyxTQUExQjs7U0FLZUMsTTs7Ozs7OzsrQkFBZixrQkFBc0JDLE9BQXRCO0FBQUEseUVBYWFDLFFBYmIsY0FtQm1CQyxHQW5CbkI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7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LGFBRkQsTUFFTztBQUNILCtDQUFxQkEsZUFBckI7QUFDSDs7QUFFS3hCLFlBQUFBLFNBWlYsR0FZc0JvQyxtQkFBT0MsWUFBUCxDQUFvQlgsYUFBYSxDQUFDWSxFQUFsQyxDQVp0QjtBQWlCVW5DLFlBQUFBLFVBakJWLGFBaUIwQmQsTUFBTSxDQUFDa0QsZ0JBakJqQyxjQWlCcURaLE9BakJyRDtBQUFBLDhDQTREVztBQUNIeEIsY0FBQUEsVUFBVSxFQUFWQSxVQURHO0FBRUhULGNBQUFBLFFBQVEsRUFBUkEsUUFGRztBQUdIQyxjQUFBQSxHQUFHLEVBQUhBO0FBSEcsYUE1RFg7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztlQWtFZTtBQUNYSCxFQUFBQSxNQUFNLEVBQU5BO0FBRFcsQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOC0yMDE5IFRPTiBERVYgU09MVVRJT05TIExURC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgU09GVFdBUkUgRVZBTFVBVElPTiBMaWNlbnNlICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbiAqIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxuICogTGljZW5zZSBhdDogaHR0cHM6Ly93d3cudG9uLmRldi9saWNlbnNlc1xuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgVE9OIERFViBzb2Z0d2FyZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbi8vIEBmbG93XG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuaW1wb3J0IGRvY2tlciBmcm9tIFwiLi9kb2NrZXJcIjtcbmltcG9ydCByb290Q29uZmlnIGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0IHsgZW5zdXJlU3RhcnRlZENvbXBpbGVycyB9IGZyb20gXCIuL3NldHVwXCI7XG5pbXBvcnQgeyBlbnN1cmVDbGVhbkRpcmVjdG9yeSB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmNvbnN0IGNvbmZpZyA9IHJvb3RDb25maWcuY29tcGlsZXJzO1xuZXhwb3J0IHR5cGUgQ3JlYXRlQ29tcGlsZXJPcHRpb25zID0ge1xuICAgIGtlZXBDb250ZW50PzogYm9vbGVhbixcbn1cblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlKG9wdGlvbnM/OiBDcmVhdGVDb21waWxlck9wdGlvbnMpIHtcbiAgICBjb25zdCBrZWVwQ29udGVudCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5rZWVwQ29udGVudCB8fCBmYWxzZTtcbiAgICBjb25zdCBjb250YWluZXJJbmZvID0gYXdhaXQgZW5zdXJlU3RhcnRlZENvbXBpbGVycygpO1xuICAgIGNvbnN0IHByb2plY3QgPSBwcm9jZXNzLmN3ZCgpLnNwbGl0KHBhdGguZGVsaW1pdGVyKS5tYXAoeCA9PiB4LnNwbGl0KHBhdGguc2VwKS5qb2luKCdfJykpLmpvaW4oJ18nKTtcbiAgICBjb25zdCBwcm9qZWN0SG9zdFBhdGggPSBgJHtjb25maWcubW91bnRTb3VyY2V9LyR7cHJvamVjdH1gO1xuXG4gICAgaWYgKGtlZXBDb250ZW50KSB7XG4gICAgICAgIGZzLm1rZGlyU3luYyhwcm9qZWN0SG9zdFBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGVuc3VyZUNsZWFuRGlyZWN0b3J5KHByb2plY3RIb3N0UGF0aCk7XG4gICAgfVxuXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9ja2VyLmdldENvbnRhaW5lcihjb250YWluZXJJbmZvLklkKTtcbiAgICBmdW5jdGlvbiBob3N0UGF0aCguLi5pdGVtczogc3RyaW5nW10pIHtcbiAgICAgICAgcmV0dXJuIHBhdGguam9pbihwcm9qZWN0SG9zdFBhdGgsIC4uLml0ZW1zKTtcbiAgICB9XG5cbiAgICBjb25zdCB3b3JraW5nRGlyID0gYCR7Y29uZmlnLm1vdW50RGVzdGluYXRpb259LyR7cHJvamVjdH1gO1xuXG4gICAgYXN5bmMgZnVuY3Rpb24gcnVuKC4uLmFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb250YWluZXIuZXhlYyh7XG4gICAgICAgICAgICAgICAgV29ya2luZ0Rpcjogd29ya2luZ0RpcixcbiAgICAgICAgICAgICAgICBDbWQ6IGFyZ3MsXG4gICAgICAgICAgICAgICAgVHR5OiB0cnVlLFxuICAgICAgICAgICAgICAgIEF0dGFjaFN0ZGluOiB0cnVlLFxuICAgICAgICAgICAgICAgIEF0dGFjaFN0ZG91dDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBBdHRhY2hTdGRlcnI6IHRydWUsXG4gICAgICAgICAgICB9LCAoZXJyLCBleGVjKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBleGVjLnN0YXJ0KChlcnIsIHN0cmVhbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5tb2RlbS5kZW11eFN0cmVhbShzdHJlYW0sIHByb2Nlc3Muc3Rkb3V0LCBwcm9jZXNzLnN0ZGVycik7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hlY2tGb3JSZXN1bHQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBleGVjLmluc3BlY3QoKGVyciwgZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuUnVubmluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrRm9yUmVzdWx0LCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tGb3JSZXN1bHQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB3b3JraW5nRGlyLFxuICAgICAgICBob3N0UGF0aCxcbiAgICAgICAgcnVuXG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGNyZWF0ZSxcbn1cbiJdfQ==