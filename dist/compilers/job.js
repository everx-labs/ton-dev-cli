"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompilersJob = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _dev = require("../dev");

var _utils = require("../utils/utils");

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
var os = require('os');

var fs = require('fs');

var path = require('path');

var CompilersJob =
/*#__PURE__*/
function () {
  function CompilersJob(dev, container, srcPath, dstPath) {
    (0, _classCallCheck2["default"])(this, CompilersJob);
    (0, _defineProperty2["default"])(this, "dev", void 0);
    (0, _defineProperty2["default"])(this, "container", void 0);
    (0, _defineProperty2["default"])(this, "hostPath", void 0);
    (0, _defineProperty2["default"])(this, "guestPath", void 0);
    this.dev = dev;
    this.container = container;
    this.hostPath = srcPath;
    this.guestPath = dstPath;
  }

  (0, _createClass2["default"])(CompilersJob, [{
    key: "run",
    value: function () {
      var _run2 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        var _len,
            args,
            _key,
            container,
            _args = arguments;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                for (_len = _args.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = _args[_key];
                }

                container = this.container;

                if (!(os.platform() === 'win32')) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", _utils.run.apply(void 0, ['docker', 'exec', container.id].concat(args)));

              case 4:
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

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function run() {
        return _run2.apply(this, arguments);
      }

      return run;
    }()
  }], [{
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(dev, options) {
        var keepContent, container, name, hostPath, guestPath;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                keepContent = !!(options && options.keepContent);
                _context2.next = 3;
                return dev.docker.ensureRunning(dev.compilers);

              case 3:
                container = _context2.sent;
                name = process.cwd().replace(/[\\/:]/g, '_');
                hostPath = (0, _utils.bindPathJoinTo)(path.join(dev.compilers.mountSource, name));
                guestPath = (0, _utils.bindPathJoinTo)("".concat(dev.compilers.mountDestination, "/").concat(name), '/');

                if (keepContent) {
                  fs.mkdirSync(hostPath());
                } else {
                  (0, _utils.ensureCleanDirectory)(hostPath());
                }

                return _context2.abrupt("return", new CompilersJob(dev, container, hostPath, guestPath));

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function create(_x, _x2) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }]);
  return CompilersJob;
}();

exports.CompilersJob = CompilersJob;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21waWxlcnMvam9iLmpzIl0sIm5hbWVzIjpbIm9zIiwicmVxdWlyZSIsImZzIiwicGF0aCIsIkNvbXBpbGVyc0pvYiIsImRldiIsImNvbnRhaW5lciIsInNyY1BhdGgiLCJkc3RQYXRoIiwiaG9zdFBhdGgiLCJndWVzdFBhdGgiLCJhcmdzIiwicGxhdGZvcm0iLCJydW4iLCJpZCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZXhlYyIsIkNtZCIsIlR0eSIsIkF0dGFjaFN0ZGluIiwiQXR0YWNoU3Rkb3V0IiwiQXR0YWNoU3RkZXJyIiwiZXJyIiwic3RhcnQiLCJzdHJlYW0iLCJtb2RlbSIsImRlbXV4U3RyZWFtIiwicHJvY2VzcyIsInN0ZG91dCIsInN0ZGVyciIsImNoZWNrRm9yUmVzdWx0IiwiaW5zcGVjdCIsImRhdGEiLCJSdW5uaW5nIiwic2V0VGltZW91dCIsIm9wdGlvbnMiLCJrZWVwQ29udGVudCIsImRvY2tlciIsImVuc3VyZVJ1bm5pbmciLCJjb21waWxlcnMiLCJuYW1lIiwiY3dkIiwicmVwbGFjZSIsImpvaW4iLCJtb3VudFNvdXJjZSIsIm1vdW50RGVzdGluYXRpb24iLCJta2RpclN5bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkE7O0FBR0E7O0FBcEJBOzs7Ozs7Ozs7Ozs7OztBQXFCQSxJQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQUNBLElBQU1DLEVBQUUsR0FBR0QsT0FBTyxDQUFDLElBQUQsQ0FBbEI7O0FBQ0EsSUFBTUUsSUFBSSxHQUFHRixPQUFPLENBQUMsTUFBRCxDQUFwQjs7SUFNTUcsWTs7O0FBTUYsd0JBQ0lDLEdBREosRUFFSUMsU0FGSixFQUdJQyxPQUhKLEVBSUlDLE9BSkosRUFLRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDRSxTQUFLSCxHQUFMLEdBQVdBLEdBQVg7QUFDQSxTQUFLQyxTQUFMLEdBQWlCQSxTQUFqQjtBQUNB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QyxTQUF0QixFQUFpQ0csUUFBakMsRUFBMkNDLFNBQTNDLEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG4gKiB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbiAqIExpY2Vuc2UgYXQ6IGh0dHBzOi8vd3d3LnRvbi5kZXYvbGljZW5zZXNcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIFRPTiBERVYgc29mdHdhcmUgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG5cbi8vIEBmbG93XG5cbmltcG9ydCB7IERldiB9IGZyb20gXCIuLi9kZXZcIjtcbmltcG9ydCB0eXBlIHsgRG9ja2VyQ29udGFpbmVyIH0gZnJvbSBcIi4uL3V0aWxzL2RvY2tlclwiO1xuaW1wb3J0IHR5cGUgeyBQYXRoSm9pbiB9IGZyb20gXCIuLi91dGlscy91dGlsc1wiO1xuaW1wb3J0IHsgYmluZFBhdGhKb2luVG8sIGVuc3VyZUNsZWFuRGlyZWN0b3J5LCBydW4gfSBmcm9tIFwiLi4vdXRpbHMvdXRpbHNcIjtcbmNvbnN0IG9zID0gcmVxdWlyZSgnb3MnKTtcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5cbmV4cG9ydCB0eXBlIENvbXBpbGVyc0pvYk9wdGlvbnMgPSB7XG4gICAga2VlcENvbnRlbnQ/OiBib29sZWFuLFxufVxuXG5jbGFzcyBDb21waWxlcnNKb2Ige1xuICAgIGRldjogRGV2O1xuICAgIGNvbnRhaW5lcjogRG9ja2VyQ29udGFpbmVyO1xuICAgIGhvc3RQYXRoOiBQYXRoSm9pbjtcbiAgICBndWVzdFBhdGg6IFBhdGhKb2luO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGRldjogRGV2LFxuICAgICAgICBjb250YWluZXI6IERvY2tlckNvbnRhaW5lcixcbiAgICAgICAgc3JjUGF0aDogUGF0aEpvaW4sXG4gICAgICAgIGRzdFBhdGg6IFBhdGhKb2luLFxuICAgICkge1xuICAgICAgICB0aGlzLmRldiA9IGRldjtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICAgIHRoaXMuaG9zdFBhdGggPSBzcmNQYXRoO1xuICAgICAgICB0aGlzLmd1ZXN0UGF0aCA9IGRzdFBhdGg7XG4gICAgfVxuXG4gICAgc3RhdGljIGFzeW5jIGNyZWF0ZShcbiAgICAgICAgZGV2OiBEZXYsXG4gICAgICAgIG9wdGlvbnM/OiBDb21waWxlcnNKb2JPcHRpb25zXG4gICAgKSB7XG4gICAgICAgIGNvbnN0IGtlZXBDb250ZW50ID0gISEob3B0aW9ucyAmJiBvcHRpb25zLmtlZXBDb250ZW50KTtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gYXdhaXQgZGV2LmRvY2tlci5lbnN1cmVSdW5uaW5nKGRldi5jb21waWxlcnMpO1xuICAgICAgICBjb25zdCBuYW1lID0gcHJvY2Vzcy5jd2QoKS5yZXBsYWNlKC9bXFxcXC86XS9nLCAnXycpO1xuICAgICAgICBjb25zdCBob3N0UGF0aCA9IGJpbmRQYXRoSm9pblRvKHBhdGguam9pbihkZXYuY29tcGlsZXJzLm1vdW50U291cmNlLCBuYW1lKSk7XG4gICAgICAgIGNvbnN0IGd1ZXN0UGF0aCA9IGJpbmRQYXRoSm9pblRvKGAke2Rldi5jb21waWxlcnMubW91bnREZXN0aW5hdGlvbn0vJHtuYW1lfWAsICcvJyk7XG4gICAgICAgIGlmIChrZWVwQ29udGVudCkge1xuICAgICAgICAgICAgZnMubWtkaXJTeW5jKGhvc3RQYXRoKCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZW5zdXJlQ2xlYW5EaXJlY3RvcnkoaG9zdFBhdGgoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBDb21waWxlcnNKb2IoZGV2LCBjb250YWluZXIsIGhvc3RQYXRoLCBndWVzdFBhdGgpO1xuICAgIH1cblxuICAgIGFzeW5jIHJ1biguLi5hcmdzOiBzdHJpbmdbXSkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgaWYgKG9zLnBsYXRmb3JtKCkgPT09ICd3aW4zMicpIHtcbiAgICAgICAgICAgIHJldHVybiBydW4oJ2RvY2tlcicsICdleGVjJywgY29udGFpbmVyLmlkLCAuLi5hcmdzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29udGFpbmVyLmV4ZWMoe1xuICAgICAgICAgICAgICAgIENtZDogYXJncyxcbiAgICAgICAgICAgICAgICBUdHk6IHRydWUsXG4gICAgICAgICAgICAgICAgQXR0YWNoU3RkaW46IHRydWUsXG4gICAgICAgICAgICAgICAgQXR0YWNoU3Rkb3V0OiB0cnVlLFxuICAgICAgICAgICAgICAgIEF0dGFjaFN0ZGVycjogdHJ1ZSxcbiAgICAgICAgICAgIH0sIChlcnIsIGV4ZWMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGV4ZWMuc3RhcnQoKGVyciwgc3RyZWFtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLm1vZGVtLmRlbXV4U3RyZWFtKHN0cmVhbSwgcHJvY2Vzcy5zdGRvdXQsIHByb2Nlc3Muc3RkZXJyKTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGVja0ZvclJlc3VsdCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4ZWMuaW5zcGVjdCgoZXJyLCBkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5SdW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoY2hlY2tGb3JSZXN1bHQsIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBjaGVja0ZvclJlc3VsdCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5leHBvcnQge1xuICAgIENvbXBpbGVyc0pvYlxufVxuIl19