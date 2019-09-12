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
            srcJobPath = (0, _utils.bindPathJoinTo)(path.join(config.mountSource, jobName));
            dstJobPath = (0, _utils.bindPathJoinTo)("".concat(config.mountDestination, "/").concat(jobName), '/');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21waWxlcnMuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwib3MiLCJwYXRoIiwiY29uZmlnIiwicm9vdENvbmZpZyIsImNvbXBpbGVycyIsImNyZWF0ZSIsIm9wdGlvbnMiLCJjb250YWluZXJSdW4iLCJhcmdzIiwicGxhdGZvcm0iLCJydW4iLCJjb250YWluZXJJbmZvIiwiSWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImNvbnRhaW5lciIsImV4ZWMiLCJDbWQiLCJUdHkiLCJBdHRhY2hTdGRpbiIsIkF0dGFjaFN0ZG91dCIsIkF0dGFjaFN0ZGVyciIsImVyciIsInN0YXJ0Iiwic3RyZWFtIiwibW9kZW0iLCJkZW11eFN0cmVhbSIsInByb2Nlc3MiLCJzdGRvdXQiLCJzdGRlcnIiLCJjaGVja0ZvclJlc3VsdCIsImluc3BlY3QiLCJkYXRhIiwiUnVubmluZyIsInNldFRpbWVvdXQiLCJrZWVwQ29udGVudCIsImpvYk5hbWUiLCJjd2QiLCJyZXBsYWNlIiwic3JjSm9iUGF0aCIsImpvaW4iLCJtb3VudFNvdXJjZSIsImRzdEpvYlBhdGgiLCJtb3VudERlc3RpbmF0aW9uIiwibWtkaXJTeW5jIiwiZG9ja2VyIiwiZ2V0Q29udGFpbmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBa0JBOztBQUNBOztBQUNBOztBQUNBOztBQXJCQTs7Ozs7Ozs7Ozs7Ozs7QUFlQSxJQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQUNBLElBQU1DLEVBQUUsR0FBR0QsT0FBTyxDQUFDLElBQUQsQ0FBbEI7O0FBQ0EsSUFBTUUsSUFBSSxHQUFHRixPQUFPLENBQUMsTUFBRCxDQUFwQjs7QUFNQSxJQUFNRyxNQUFNLEdBQUdDLG1CQUFXQyxTQUExQjs7U0FLZUMsTTs7Ozs7OzsrQkFBZixrQkFBc0JDLE9BQXRCO0FBQUEsZ0ZBZW1CQyxZQWZuQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtB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T0MsWUFBUCxDQUFvQnBDLGFBQWEsQ0FBQ0MsRUFBbEMsQ0FidEI7QUFBQSw4Q0EwRFc7QUFDSDRCLGNBQUFBLFVBQVUsRUFBVkEsVUFERztBQUVIRyxjQUFBQSxVQUFVLEVBQVZBLFVBRkc7QUFHSGpDLGNBQUFBLEdBQUcsRUFBRUg7QUFIRixhQTFEWDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O2VBZ0VlO0FBQ1hGLEVBQUFBLE1BQU0sRUFBTkE7QUFEVyxDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuLy8gQGZsb3dcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IG9zID0gcmVxdWlyZSgnb3MnKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5pbXBvcnQgZG9ja2VyIGZyb20gXCIuL2RvY2tlclwiO1xuaW1wb3J0IHJvb3RDb25maWcgZnJvbSBcIi4vY29uZmlnXCI7XG5pbXBvcnQgeyBlbnN1cmVTdGFydGVkQ29tcGlsZXJzIH0gZnJvbSBcIi4vc2V0dXBcIjtcbmltcG9ydCB7IGJpbmRQYXRoSm9pblRvLCBlbnN1cmVDbGVhbkRpcmVjdG9yeSwgcnVuIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuY29uc3QgY29uZmlnID0gcm9vdENvbmZpZy5jb21waWxlcnM7XG5leHBvcnQgdHlwZSBDcmVhdGVDb21waWxlck9wdGlvbnMgPSB7XG4gICAga2VlcENvbnRlbnQ/OiBib29sZWFuLFxufVxuXG5hc3luYyBmdW5jdGlvbiBjcmVhdGUob3B0aW9ucz86IENyZWF0ZUNvbXBpbGVyT3B0aW9ucykge1xuICAgIGNvbnN0IGtlZXBDb250ZW50ID0gb3B0aW9ucyAmJiBvcHRpb25zLmtlZXBDb250ZW50IHx8IGZhbHNlO1xuICAgIGNvbnN0IGNvbnRhaW5lckluZm8gPSBhd2FpdCBlbnN1cmVTdGFydGVkQ29tcGlsZXJzKCk7XG4gICAgY29uc3Qgam9iTmFtZSA9IHByb2Nlc3MuY3dkKCkucmVwbGFjZSgvW1xcXFwvOl0vZywgJ18nKTtcbiAgICBjb25zdCBzcmNKb2JQYXRoID0gYmluZFBhdGhKb2luVG8ocGF0aC5qb2luKGNvbmZpZy5tb3VudFNvdXJjZSwgam9iTmFtZSkpO1xuICAgIGNvbnN0IGRzdEpvYlBhdGggPSBiaW5kUGF0aEpvaW5UbyhgJHtjb25maWcubW91bnREZXN0aW5hdGlvbn0vJHtqb2JOYW1lfWAsICcvJyk7XG5cbiAgICBpZiAoa2VlcENvbnRlbnQpIHtcbiAgICAgICAgZnMubWtkaXJTeW5jKHNyY0pvYlBhdGgoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZW5zdXJlQ2xlYW5EaXJlY3Rvcnkoc3JjSm9iUGF0aCgpKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb250YWluZXIgPSBkb2NrZXIuZ2V0Q29udGFpbmVyKGNvbnRhaW5lckluZm8uSWQpO1xuXG4gICAgYXN5bmMgZnVuY3Rpb24gY29udGFpbmVyUnVuKC4uLmFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgICAgIGlmIChvcy5wbGF0Zm9ybSgpID09PSAnd2luMzInKSB7XG4gICAgICAgICAgICByZXR1cm4gcnVuKCdkb2NrZXInLCAnZXhlYycsIGNvbnRhaW5lckluZm8uSWQsIC4uLmFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb250YWluZXIuZXhlYyh7XG4gICAgICAgICAgICAgICAgQ21kOiBhcmdzLFxuICAgICAgICAgICAgICAgIFR0eTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBBdHRhY2hTdGRpbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBBdHRhY2hTdGRvdXQ6IHRydWUsXG4gICAgICAgICAgICAgICAgQXR0YWNoU3RkZXJyOiB0cnVlLFxuICAgICAgICAgICAgfSwgKGVyciwgZXhlYykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZXhlYy5zdGFydCgoZXJyLCBzdHJlYW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIubW9kZW0uZGVtdXhTdHJlYW0oc3RyZWFtLCBwcm9jZXNzLnN0ZG91dCwgcHJvY2Vzcy5zdGRlcnIpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrRm9yUmVzdWx0ID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhlYy5pbnNwZWN0KChlcnIsIGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlJ1bm5pbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChjaGVja0ZvclJlc3VsdCwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrRm9yUmVzdWx0KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3JjSm9iUGF0aCxcbiAgICAgICAgZHN0Sm9iUGF0aCxcbiAgICAgICAgcnVuOiBjb250YWluZXJSdW4sXG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGNyZWF0ZSxcbn1cbiJdfQ==