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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21waWxlcnMuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwicGF0aCIsImNvbmZpZyIsInJvb3RDb25maWciLCJjb21waWxlcnMiLCJjcmVhdGUiLCJvcHRpb25zIiwiaG9zdFBhdGgiLCJydW4iLCJhcmdzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJjb250YWluZXIiLCJleGVjIiwiV29ya2luZ0RpciIsIm1vdW50RGVzdGluYXRpb24iLCJwcm9qZWN0IiwiQ21kIiwiVHR5IiwiQXR0YWNoU3RkaW4iLCJBdHRhY2hTdGRvdXQiLCJBdHRhY2hTdGRlcnIiLCJlcnIiLCJzdGFydCIsInN0cmVhbSIsIm1vZGVtIiwiZGVtdXhTdHJlYW0iLCJwcm9jZXNzIiwic3Rkb3V0Iiwic3RkZXJyIiwiY2hlY2tGb3JSZXN1bHQiLCJpbnNwZWN0IiwiZGF0YSIsIlJ1bm5pbmciLCJzZXRUaW1lb3V0IiwiaXRlbXMiLCJqb2luIiwicHJvamVjdEhvc3RQYXRoIiwia2VlcENvbnRlbnQiLCJjb250YWluZXJJbmZvIiwiY3dkIiwic3BsaXQiLCJkZWxpbWl0ZXIiLCJtYXAiLCJ4Iiwic2VwIiwibW91bnRTb3VyY2UiLCJta2RpclN5bmMiLCJkb2NrZXIiLCJnZXRDb250YWluZXIiLCJJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQWtCQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFyQkE7Ozs7Ozs7Ozs7Ozs7OztBQWdCQSxJQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQUNBLElBQU1DLElBQUksR0FBR0QsT0FBTyxDQUFDLE1BQUQsQ0FBcEI7O0FBTUEsSUFBTUUsTUFBTSxHQUFHQyxtQkFBV0MsU0FBMUI7O1NBS2VDLE07Ozs7Ozs7K0JBQWYsa0JBQXNCQyxPQUF0QjtBQUFBLHlFQWFhQyxRQWJiLEVBaUJtQkMsR0FqQm5COztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkNBaUJJ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RCxTQUFILENBQWFWLGVBQWI7QUFDSCxhQUZELE1BRU87QUFDSCwrQ0FBcUJBLGVBQXJCO0FBQ0g7O0FBRUt6QixZQUFBQSxTQVpWLEdBWXNCb0MsbUJBQU9DLFlBQVAsQ0FBb0JWLGFBQWEsQ0FBQ1csRUFBbEMsQ0FadEI7QUFBQSw4Q0EwRFc7QUFDSDVDLGNBQUFBLFFBQVEsRUFBUkEsUUFERztBQUVIQyxjQUFBQSxHQUFHLEVBQUhBO0FBRkcsYUExRFg7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztlQStEZTtBQUNYSCxFQUFBQSxNQUFNLEVBQU5BO0FBRFcsQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOC0yMDE5IFRPTiBERVYgU09MVVRJT05TIExURC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgU09GVFdBUkUgRVZBTFVBVElPTiBMaWNlbnNlICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbiAqIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxuICogTGljZW5zZSBhdDpcbiAqXG4gKiBodHRwOi8vd3d3LnRvbi5kZXYvbGljZW5zZXNcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIFRPTiBERVYgc29mdHdhcmUgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbi8vIEBmbG93XG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuaW1wb3J0IGRvY2tlciBmcm9tIFwiLi9kb2NrZXJcIjtcbmltcG9ydCByb290Q29uZmlnIGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0IHsgZW5zdXJlU3RhcnRlZENvbXBpbGVycyB9IGZyb20gXCIuL3NldHVwXCI7XG5pbXBvcnQgeyBlbnN1cmVDbGVhbkRpcmVjdG9yeSB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmNvbnN0IGNvbmZpZyA9IHJvb3RDb25maWcuY29tcGlsZXJzO1xuZXhwb3J0IHR5cGUgQ3JlYXRlQ29tcGlsZXJPcHRpb25zID0ge1xuICAgIGtlZXBDb250ZW50PzogYm9vbGVhbixcbn1cblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlKG9wdGlvbnM/OiBDcmVhdGVDb21waWxlck9wdGlvbnMpIHtcbiAgICBjb25zdCBrZWVwQ29udGVudCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5rZWVwQ29udGVudCB8fCBmYWxzZTtcbiAgICBjb25zdCBjb250YWluZXJJbmZvID0gYXdhaXQgZW5zdXJlU3RhcnRlZENvbXBpbGVycygpO1xuICAgIGNvbnN0IHByb2plY3QgPSBwcm9jZXNzLmN3ZCgpLnNwbGl0KHBhdGguZGVsaW1pdGVyKS5tYXAoeCA9PiB4LnNwbGl0KHBhdGguc2VwKS5qb2luKCdfJykpLmpvaW4oJ18nKTtcbiAgICBjb25zdCBwcm9qZWN0SG9zdFBhdGggPSBgJHtjb25maWcubW91bnRTb3VyY2V9LyR7cHJvamVjdH1gO1xuXG4gICAgaWYgKGtlZXBDb250ZW50KSB7XG4gICAgICAgIGZzLm1rZGlyU3luYyhwcm9qZWN0SG9zdFBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGVuc3VyZUNsZWFuRGlyZWN0b3J5KHByb2plY3RIb3N0UGF0aCk7XG4gICAgfVxuXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9ja2VyLmdldENvbnRhaW5lcihjb250YWluZXJJbmZvLklkKTtcbiAgICBmdW5jdGlvbiBob3N0UGF0aCguLi5pdGVtczogc3RyaW5nW10pIHtcbiAgICAgICAgcmV0dXJuIHBhdGguam9pbihwcm9qZWN0SG9zdFBhdGgsIC4uLml0ZW1zKTtcbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBydW4oLi4uYXJnczogc3RyaW5nW10pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5leGVjKHtcbiAgICAgICAgICAgICAgICBXb3JraW5nRGlyOiBgJHtjb25maWcubW91bnREZXN0aW5hdGlvbn0vJHtwcm9qZWN0fWAsXG4gICAgICAgICAgICAgICAgQ21kOiBhcmdzLFxuICAgICAgICAgICAgICAgIFR0eTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBBdHRhY2hTdGRpbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBBdHRhY2hTdGRvdXQ6IHRydWUsXG4gICAgICAgICAgICAgICAgQXR0YWNoU3RkZXJyOiB0cnVlLFxuICAgICAgICAgICAgfSwgKGVyciwgZXhlYykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZXhlYy5zdGFydCgoZXJyLCBzdHJlYW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIubW9kZW0uZGVtdXhTdHJlYW0oc3RyZWFtLCBwcm9jZXNzLnN0ZG91dCwgcHJvY2Vzcy5zdGRlcnIpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrRm9yUmVzdWx0ID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhlYy5pbnNwZWN0KChlcnIsIGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlJ1bm5pbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChjaGVja0ZvclJlc3VsdCwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrRm9yUmVzdWx0KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaG9zdFBhdGgsXG4gICAgICAgIHJ1blxuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBjcmVhdGUsXG59XG4iXX0=