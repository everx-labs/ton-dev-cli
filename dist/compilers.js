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
            project = process.cwd().replace(/[\\/:]/g, '_');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21waWxlcnMuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwib3MiLCJwYXRoIiwiY29uZmlnIiwicm9vdENvbmZpZyIsImNvbXBpbGVycyIsImNyZWF0ZSIsIm9wdGlvbnMiLCJob3N0UGF0aCIsImNvbnRhaW5lclJ1biIsImFyZ3MiLCJwbGF0Zm9ybSIsInJ1biIsImNvbnRhaW5lckluZm8iLCJJZCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiY29udGFpbmVyIiwiZXhlYyIsIkNtZCIsIlR0eSIsIkF0dGFjaFN0ZGluIiwiQXR0YWNoU3Rkb3V0IiwiQXR0YWNoU3RkZXJyIiwiZXJyIiwic3RhcnQiLCJzdHJlYW0iLCJtb2RlbSIsImRlbXV4U3RyZWFtIiwicHJvY2VzcyIsInN0ZG91dCIsInN0ZGVyciIsImNoZWNrRm9yUmVzdWx0IiwiaW5zcGVjdCIsImRhdGEiLCJSdW5uaW5nIiwic2V0VGltZW91dCIsIml0ZW1zIiwiam9pbiIsInByb2plY3RIb3N0UGF0aCIsImtlZXBDb250ZW50IiwicHJvamVjdCIsImN3ZCIsInJlcGxhY2UiLCJtb3VudFNvdXJjZSIsIm1rZGlyU3luYyIsImRvY2tlciIsImdldENvbnRhaW5lciIsIndvcmtpbmdEaXIiLCJtb3VudERlc3RpbmF0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBa0JBOztBQUNBOztBQUNBOztBQUNBOztBQXJCQTs7Ozs7Ozs7Ozs7Ozs7QUFlQSxJQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQUNBLElBQU1DLEVBQUUsR0FBR0QsT0FBTyxDQUFDLElBQUQsQ0FBbEI7O0FBQ0EsSUFBTUUsSUFBSSxHQUFHRixPQUFPLENBQUMsTUFBRCxDQUFwQjs7QUFNQSxJQUFNRyxNQUFNLEdBQUdDLG1CQUFXQyxTQUExQjs7U0FLZUMsTTs7Ozs7OzsrQkFBZixrQkFBc0JDLE9BQXRCO0FBQUEseUVBYWFDLFFBYmIsY0FtQm1CQyxZQW5CbkI7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TUFFTztBQUNILCtDQUFxQkEsZUFBckI7QUFDSDs7QUFFS3RCLFlBQUFBLFNBWlYsR0FZc0I2QixtQkFBT0MsWUFBUCxDQUFvQm5DLGFBQWEsQ0FBQ0MsRUFBbEMsQ0FadEI7QUFpQlVtQyxZQUFBQSxVQWpCVixhQWlCMEI5QyxNQUFNLENBQUMrQyxnQkFqQmpDLGNBaUJxRFIsT0FqQnJEO0FBQUEsOENBOERXO0FBQ0hPLGNBQUFBLFVBQVUsRUFBVkEsVUFERztBQUVIekMsY0FBQUEsUUFBUSxFQUFSQSxRQUZHO0FBR0hJLGNBQUFBLEdBQUcsRUFBRUg7QUFIRixhQTlEWDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O2VBb0VlO0FBQ1hILEVBQUFBLE1BQU0sRUFBTkE7QUFEVyxDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuLy8gQGZsb3dcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IG9zID0gcmVxdWlyZSgnb3MnKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5pbXBvcnQgZG9ja2VyIGZyb20gXCIuL2RvY2tlclwiO1xuaW1wb3J0IHJvb3RDb25maWcgZnJvbSBcIi4vY29uZmlnXCI7XG5pbXBvcnQgeyBlbnN1cmVTdGFydGVkQ29tcGlsZXJzIH0gZnJvbSBcIi4vc2V0dXBcIjtcbmltcG9ydCB7IGVuc3VyZUNsZWFuRGlyZWN0b3J5LCBydW4gfSBmcm9tIFwiLi91dGlsc1wiO1xuXG5jb25zdCBjb25maWcgPSByb290Q29uZmlnLmNvbXBpbGVycztcbmV4cG9ydCB0eXBlIENyZWF0ZUNvbXBpbGVyT3B0aW9ucyA9IHtcbiAgICBrZWVwQ29udGVudD86IGJvb2xlYW4sXG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZShvcHRpb25zPzogQ3JlYXRlQ29tcGlsZXJPcHRpb25zKSB7XG4gICAgY29uc3Qga2VlcENvbnRlbnQgPSBvcHRpb25zICYmIG9wdGlvbnMua2VlcENvbnRlbnQgfHwgZmFsc2U7XG4gICAgY29uc3QgY29udGFpbmVySW5mbyA9IGF3YWl0IGVuc3VyZVN0YXJ0ZWRDb21waWxlcnMoKTtcbiAgICBjb25zdCBwcm9qZWN0ID0gcHJvY2Vzcy5jd2QoKS5yZXBsYWNlKC9bXFxcXC86XS9nLCAnXycpO1xuICAgIGNvbnN0IHByb2plY3RIb3N0UGF0aCA9IGAke2NvbmZpZy5tb3VudFNvdXJjZX0vJHtwcm9qZWN0fWA7XG5cbiAgICBpZiAoa2VlcENvbnRlbnQpIHtcbiAgICAgICAgZnMubWtkaXJTeW5jKHByb2plY3RIb3N0UGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZW5zdXJlQ2xlYW5EaXJlY3RvcnkocHJvamVjdEhvc3RQYXRoKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb250YWluZXIgPSBkb2NrZXIuZ2V0Q29udGFpbmVyKGNvbnRhaW5lckluZm8uSWQpO1xuICAgIGZ1bmN0aW9uIGhvc3RQYXRoKC4uLml0ZW1zOiBzdHJpbmdbXSkge1xuICAgICAgICByZXR1cm4gcGF0aC5qb2luKHByb2plY3RIb3N0UGF0aCwgLi4uaXRlbXMpO1xuICAgIH1cblxuICAgIGNvbnN0IHdvcmtpbmdEaXIgPSBgJHtjb25maWcubW91bnREZXN0aW5hdGlvbn0vJHtwcm9qZWN0fWA7XG5cbiAgICBhc3luYyBmdW5jdGlvbiBjb250YWluZXJSdW4oLi4uYXJnczogc3RyaW5nW10pIHtcbiAgICAgICAgaWYgKG9zLnBsYXRmb3JtKCkgPT09ICd3aW4zMicpIHtcbiAgICAgICAgICAgIHJldHVybiBydW4oJ2RvY2tlcicsICdleGVjJywgY29udGFpbmVySW5mby5JZCwgLi4uYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5leGVjKHtcbiAgICAgICAgICAgICAgICBDbWQ6IGFyZ3MsXG4gICAgICAgICAgICAgICAgVHR5OiB0cnVlLFxuICAgICAgICAgICAgICAgIEF0dGFjaFN0ZGluOiB0cnVlLFxuICAgICAgICAgICAgICAgIEF0dGFjaFN0ZG91dDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBBdHRhY2hTdGRlcnI6IHRydWUsXG4gICAgICAgICAgICB9LCAoZXJyLCBleGVjKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBleGVjLnN0YXJ0KChlcnIsIHN0cmVhbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5tb2RlbS5kZW11eFN0cmVhbShzdHJlYW0sIHByb2Nlc3Muc3Rkb3V0LCBwcm9jZXNzLnN0ZGVycik7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hlY2tGb3JSZXN1bHQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBleGVjLmluc3BlY3QoKGVyciwgZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuUnVubmluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrRm9yUmVzdWx0LCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tGb3JSZXN1bHQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB3b3JraW5nRGlyLFxuICAgICAgICBob3N0UGF0aCxcbiAgICAgICAgcnVuOiBjb250YWluZXJSdW4sXG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGNyZWF0ZSxcbn1cbiJdfQ==