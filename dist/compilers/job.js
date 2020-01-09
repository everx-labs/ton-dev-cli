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
 * Copyright 2018-2020 TON DEV SOLUTIONS LTD.
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
      _regenerator["default"].mark(function _callee2(dev, path) {
        var hostPath, _ref, container, guestPath;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                hostPath = (0, _utils.bindPathJoinTo)(path);
                _context2.next = 3;
                return dev.getCompilersMountedTo(hostPath());

              case 3:
                _ref = _context2.sent;
                container = _ref.container;
                guestPath = _ref.guestPath;
                return _context2.abrupt("return", new CompilersJob(dev, container, hostPath, guestPath));

              case 7:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21waWxlcnMvam9iLmpzIl0sIm5hbWVzIjpbIm9zIiwicmVxdWlyZSIsIkNvbXBpbGVyc0pvYiIsImRldiIsImNvbnRhaW5lciIsInNyY1BhdGgiLCJkc3RQYXRoIiwiaG9zdFBhdGgiLCJndWVzdFBhdGgiLCJhcmdzIiwicGxhdGZvcm0iLCJydW4iLCJpZCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZXhlYyIsIkNtZCIsIlR0eSIsIkF0dGFjaFN0ZGluIiwiQXR0YWNoU3Rkb3V0IiwiQXR0YWNoU3RkZXJyIiwiZXJyIiwic3RhcnQiLCJzdHJlYW0iLCJtb2RlbSIsImRlbXV4U3RyZWFtIiwicHJvY2VzcyIsInN0ZG91dCIsInN0ZGVyciIsImNoZWNrRm9yUmVzdWx0IiwiaW5zcGVjdCIsImRhdGEiLCJSdW5uaW5nIiwic2V0VGltZW91dCIsInBhdGgiLCJnZXRDb21waWxlcnNNb3VudGVkVG8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkE7O0FBR0E7O0FBcEJBOzs7Ozs7Ozs7Ozs7OztBQXFCQSxJQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxJQUFELENBQWxCOztJQUVNQyxZOzs7QUFNRix3QkFDSUMsR0FESixFQUVJQyxTQUZKLEVBR0lDLE9BSEosRUFJSUMsT0FKSixFQUtFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNFLFNBQUtILEdBQUwsR0FBV0EsR0FBWDtBQUNBLFNBQUtDLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0EsU0FBS0csUUFBTCxHQUFnQkYsT0FBaEI7QUFDQSxTQUFLRyxTQUFMLEdBQWlCRixPQUFqQjtBQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7MENBUVlHLEk7QUFBQUEsa0JBQUFBLEk7OztBQUNITCxnQkFBQUEsUyxHQUFZLEtBQUtBLFM7O3NCQUNuQkosRUFBRSxDQUFDVSxRQUFILE9BQWtCLE87Ozs7O2lEQUNYQywwQkFBSSxRQUFKLEVBQWMsTUFBZCxFQUFzQlAsU0FBUyxDQUFDUSxFQUFoQyxTQUF1Q0gsSUFBdkMsRTs7O2lEQUVKLElBQUlJLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDcENYLGtCQUFBQSxTQUFTLENBQUNZLElBQVYsQ0FBZTtBQUNYQyxvQkFBQUEsR0FBRyxFQUFFUixJQURNO0FBRVhTLG9CQUFBQSxHQUFHLEVBQUUsSUFGTTtBQUdYQyxvQkFBQUEsV0FBVyxFQUFFLElBSEY7QUFJWEMsb0JBQUFBLFlBQVksRUFBRSxJQUpIO0FBS1hDLG9CQUFBQSxZQUFZLEVBQUU7QUFMSCxtQkFBZixFQU1HLFVBQUNDLEdBQUQsRUFBTU4sSUFBTixFQUFlO0FBQ2Qsd0JBQUlNLEdBQUosRUFBUztBQUNMUCxzQkFBQUEsTUFBTSxDQUFDTyxHQUFELENBQU47QUFDQTtBQUNIOztBQUNETixvQkFBQUEsSUFBSSxDQUFDTyxLQUFMLENBQVcsVUFBQ0QsR0FBRCxFQUFNRSxNQUFOLEVBQWlCO0FBQ3hCLDBCQUFJRixHQUFKLEVBQVM7QUFDTFAsd0JBQUFBLE1BQU0sQ0FBQ08sR0FBRCxDQUFOO0FBQ0E7QUFDSDs7QUFFRGxCLHNCQUFBQSxTQUFTLENBQUNxQixLQUFWLENBQWdCQyxXQUFoQixDQUE0QkYsTUFBNUIsRUFBb0NHLE9BQU8sQ0FBQ0MsTUFBNUMsRUFBb0RELE9BQU8sQ0FBQ0UsTUFBNUQ7O0FBRUEsMEJBQU1DLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsR0FBTTtBQUN6QmQsd0JBQUFBLElBQUksQ0FBQ2UsT0FBTCxDQUFhLFVBQUNULEdBQUQsRUFBTVUsSUFBTixFQUFlO0FBQ3hCLDhCQUFJVixHQUFKLEVBQVM7QUFDTFAsNEJBQUFBLE1BQU0sQ0FBQ08sR0FBRCxDQUFOO0FBQ0E7QUFDSDs7QUFDRCw4QkFBSVUsSUFBSSxDQUFDQyxPQUFULEVBQWtCO0FBQ2RDLDRCQUFBQSxVQUFVLENBQUNKLGNBQUQsRUFBaUIsRUFBakIsQ0FBVjtBQUNILDJCQUZELE1BRU87QUFDSGhCLDRCQUFBQSxPQUFPLENBQUNrQixJQUFELENBQVA7QUFDSDtBQUNKLHlCQVZEO0FBV0gsdUJBWkQ7O0FBYUFGLHNCQUFBQSxjQUFjO0FBQ2pCLHFCQXRCRDtBQXVCSCxtQkFsQ0Q7QUFtQ0gsaUJBcENNLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxREFYUzNCLEcsRUFBVWdDLEk7Ozs7Ozs7QUFDcEI1QixnQkFBQUEsUSxHQUFXLDJCQUFlNEIsSUFBZixDOzt1QkFDb0JoQyxHQUFHLENBQUNpQyxxQkFBSixDQUEwQjdCLFFBQVEsRUFBbEMsQzs7OztBQUE5QkgsZ0JBQUFBLFMsUUFBQUEsUztBQUFXSSxnQkFBQUEsUyxRQUFBQSxTO2tEQUNYLElBQUlOLFlBQUosQ0FBaUJDLEdBQWpCLEVBQXNCQyxTQUF0QixFQUFpQ0csUUFBakMsRUFBMkNDLFNBQTNDLEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG4gKiB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbiAqIExpY2Vuc2UgYXQ6IGh0dHBzOi8vd3d3LnRvbi5kZXYvbGljZW5zZXNcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIFRPTiBERVYgc29mdHdhcmUgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG5cbi8vIEBmbG93XG5cbmltcG9ydCB7IERldiB9IGZyb20gXCIuLi9kZXZcIjtcbmltcG9ydCB0eXBlIHsgRG9ja2VyQ29udGFpbmVyIH0gZnJvbSBcIi4uL3V0aWxzL2RvY2tlclwiO1xuaW1wb3J0IHR5cGUgeyBQYXRoSm9pbiB9IGZyb20gXCIuLi91dGlscy91dGlsc1wiO1xuaW1wb3J0IHsgYmluZFBhdGhKb2luVG8sIHJ1biB9IGZyb20gXCIuLi91dGlscy91dGlsc1wiO1xuY29uc3Qgb3MgPSByZXF1aXJlKCdvcycpO1xuXG5jbGFzcyBDb21waWxlcnNKb2Ige1xuICAgIGRldjogRGV2O1xuICAgIGNvbnRhaW5lcjogRG9ja2VyQ29udGFpbmVyO1xuICAgIGhvc3RQYXRoOiBQYXRoSm9pbjtcbiAgICBndWVzdFBhdGg6IFBhdGhKb2luO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGRldjogRGV2LFxuICAgICAgICBjb250YWluZXI6IERvY2tlckNvbnRhaW5lcixcbiAgICAgICAgc3JjUGF0aDogUGF0aEpvaW4sXG4gICAgICAgIGRzdFBhdGg6IFBhdGhKb2luLFxuICAgICkge1xuICAgICAgICB0aGlzLmRldiA9IGRldjtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICAgIHRoaXMuaG9zdFBhdGggPSBzcmNQYXRoO1xuICAgICAgICB0aGlzLmd1ZXN0UGF0aCA9IGRzdFBhdGg7XG4gICAgfVxuXG4gICAgc3RhdGljIGFzeW5jIGNyZWF0ZShkZXY6IERldiwgcGF0aDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGhvc3RQYXRoID0gYmluZFBhdGhKb2luVG8ocGF0aCk7XG4gICAgICAgIGNvbnN0IHtjb250YWluZXIsIGd1ZXN0UGF0aH0gPSBhd2FpdCBkZXYuZ2V0Q29tcGlsZXJzTW91bnRlZFRvKGhvc3RQYXRoKCkpO1xuICAgICAgICByZXR1cm4gbmV3IENvbXBpbGVyc0pvYihkZXYsIGNvbnRhaW5lciwgaG9zdFBhdGgsIGd1ZXN0UGF0aCk7XG4gICAgfVxuXG4gICAgYXN5bmMgcnVuKC4uLmFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgICBpZiAob3MucGxhdGZvcm0oKSA9PT0gJ3dpbjMyJykge1xuICAgICAgICAgICAgcmV0dXJuIHJ1bignZG9ja2VyJywgJ2V4ZWMnLCBjb250YWluZXIuaWQsIC4uLmFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb250YWluZXIuZXhlYyh7XG4gICAgICAgICAgICAgICAgQ21kOiBhcmdzLFxuICAgICAgICAgICAgICAgIFR0eTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBBdHRhY2hTdGRpbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBBdHRhY2hTdGRvdXQ6IHRydWUsXG4gICAgICAgICAgICAgICAgQXR0YWNoU3RkZXJyOiB0cnVlLFxuICAgICAgICAgICAgfSwgKGVyciwgZXhlYykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZXhlYy5zdGFydCgoZXJyLCBzdHJlYW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIubW9kZW0uZGVtdXhTdHJlYW0oc3RyZWFtLCBwcm9jZXNzLnN0ZG91dCwgcHJvY2Vzcy5zdGRlcnIpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrRm9yUmVzdWx0ID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhlYy5pbnNwZWN0KChlcnIsIGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLlJ1bm5pbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChjaGVja0ZvclJlc3VsdCwgMTApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrRm9yUmVzdWx0KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCB7XG4gICAgQ29tcGlsZXJzSm9iXG59XG4iXX0=