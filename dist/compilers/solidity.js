"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseSolidityFileArg = parseSolidityFileArg;
exports.Solidity = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _dev = require("../dev");

var _utils = require("../utils/utils");

var _clientCode = require("./client-code");

var _job = require("./job");

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

function parseSolidityFileArg(fileArg) {
  var parsed = (0, _utils.parseFileArg)(fileArg, '.sol');
  return {
    dir: parsed.dir,
    name: {
      base: parsed.base,
      sol: parsed.name,
      tvc: "".concat(parsed.base, ".tvc"),
      code: "".concat(parsed.base, ".code"),
      abi: "".concat(parsed.base, ".abi.json"),
      "package": "".concat(parsed.base, "Package"),
      result: "".concat(parsed.base, ".result")
    }
  };
}

var Solidity =
/*#__PURE__*/
function () {
  (0, _createClass2["default"])(Solidity, null, [{
    key: "build",
    value: function () {
      var _build = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(dev, files, options) {
        var sol;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                sol = new Solidity(dev, files, options);
                _context.next = 3;
                return sol.build();

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function build(_x, _x2, _x3) {
        return _build.apply(this, arguments);
      }

      return build;
    }()
  }]);

  function Solidity(dev, files, options) {
    (0, _classCallCheck2["default"])(this, Solidity);
    (0, _defineProperty2["default"])(this, "dev", void 0);
    (0, _defineProperty2["default"])(this, "files", void 0);
    (0, _defineProperty2["default"])(this, "options", void 0);
    this.dev = dev;
    this.files = files;
    this.options = options;
  }

  (0, _createClass2["default"])(Solidity, [{
    key: "build",
    value: function () {
      var _build2 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2() {
        var i, file, job;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                i = 0;

              case 1:
                if (!(i < this.files.length)) {
                  _context2.next = 15;
                  break;
                }

                file = parseSolidityFileArg(this.files[i]);
                _context2.next = 5;
                return _job.CompilersJob.create(this.dev, file.dir());

              case 5:
                job = _context2.sent;
                this.prepareBuildBatch(file, job);
                _context2.next = 9;
                return job.run('sh', job.guestPath('job.sh'));

              case 9:
                this.cleanBuildResults(file, job);
                _context2.next = 12;
                return _clientCode.ClientCode.generate([this.files[i]], this.options);

              case 12:
                i += 1;
                _context2.next = 1;
                break;

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function build() {
        return _build2.apply(this, arguments);
      }

      return build;
    }()
  }, {
    key: "prepareBuildBatchForFie",
    value: function prepareBuildBatchForFie(file, batch) {
      var name = file.name;
      batch.push("solc ".concat(name.sol, " --tvm > ").concat(name.code), "solc ".concat(name.sol, " --tvm_abi > ").concat(name.abi), "tvm_linker compile ".concat(name.code, " --lib /usr/bin/stdlib_sol.tvm --abi-json ").concat(name.abi, " > ").concat(name.result));
    }
  }, {
    key: "prepareBuildBatch",
    value: function prepareBuildBatch(file, job) {
      var batch = [];
      batch.push("cd ".concat(job.guestPath()));
      this.prepareBuildBatchForFie(file, batch);
      fs.writeFileSync(job.hostPath('job.sh'), batch.join('\n'));
    }
  }, {
    key: "cleanBuildResults",
    value: function cleanBuildResults(file, job) {
      var name = file.name;
      var linkerResult = fs.readFileSync(job.hostPath(name.result), {
        encoding: 'utf8'
      });
      var tvcFile = (/Saved contract to file\s*(.*\.tvc)/gi.exec(linkerResult) || [])[1];

      if (!tvcFile) {
        console.log(linkerResult);
        process.exit(1);
      }

      fs.renameSync(job.hostPath(tvcFile), job.hostPath(name.tvc));
      fs.unlinkSync(job.hostPath('job.sh'));
      fs.unlinkSync(job.hostPath(name.result));
      fs.unlinkSync(job.hostPath(name.code));
    }
  }]);
  return Solidity;
}();

exports.Solidity = Solidity;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21waWxlcnMvc29saWRpdHkuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwicGFyc2VTb2xpZGl0eUZpbGVBcmciLCJmaWxlQXJnIiwicGFyc2VkIiwiZGlyIiwibmFtZSIsImJhc2UiLCJzb2wiLCJ0dmMiLCJjb2RlIiwiYWJpIiwicmVzdWx0IiwiU29saWRpdHkiLCJkZXYiLCJmaWxlcyIsIm9wdGlvbnMiLCJidWlsZCIsImkiLCJsZW5ndGgiLCJmaWxlIiwiQ29tcGlsZXJzSm9iIiwiY3JlYXRlIiwiam9iIiwicHJlcGFyZUJ1aWxkQmF0Y2giLCJydW4iLCJndWVzdFBhdGgiLCJjbGVhbkJ1aWxkUmVzdWx0cyIsIkNsaWVudENvZGUiLCJnZW5lcmF0ZSIsImJhdGNoIiwicHVzaCIsInByZXBhcmVCdWlsZEJhdGNoRm9yRmllIiwid3JpdGVGaWxlU3luYyIsImhvc3RQYXRoIiwiam9pbiIsImxpbmtlclJlc3VsdCIsInJlYWRGaWxlU3luYyIsImVuY29kaW5nIiwidHZjRmlsZSIsImV4ZWMiLCJjb25zb2xlIiwibG9nIiwicHJvY2VzcyIsImV4aXQiLCJyZW5hbWVTeW5jIiwidW5saW5rU3luYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkE7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBdEJBOzs7Ozs7Ozs7Ozs7OztBQXdCQSxJQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQWlCTyxTQUFTQyxvQkFBVCxDQUE4QkMsT0FBOUIsRUFBZ0U7QUFDbkUsTUFBTUMsTUFBTSxHQUFHLHlCQUFhRCxPQUFiLEVBQXNCLE1BQXRCLENBQWY7QUFDQSxTQUFPO0FBQ0hFLElBQUFBLEdBQUcsRUFBRUQsTUFBTSxDQUFDQyxHQURUO0FBRUhDLElBQUFBLElBQUksRUFBRTtBQUNGQyxNQUFBQSxJQUFJLEVBQUVILE1BQU0sQ0FBQ0csSUFEWDtBQUVGQyxNQUFBQSxHQUFHLEVBQUVKLE1BQU0sQ0FBQ0Us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UUFBUSxFQUFFO0FBQVosT0FBM0MsQ0FBckI7QUFDQSxVQUFNQyxPQUFPLEdBQUcsQ0FBQyx1Q0FBdUNDLElBQXZDLENBQTRDSixZQUE1QyxLQUE2RCxFQUE5RCxFQUFrRSxDQUFsRSxDQUFoQjs7QUFDQSxVQUFJLENBQUNHLE9BQUwsRUFBYztBQUNWRSxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWU4sWUFBWjtBQUNBTyxRQUFBQSxPQUFPLENBQUNDLElBQVIsQ0FBYSxDQUFiO0FBQ0g7O0FBQ0Q1QyxNQUFBQSxFQUFFLENBQUM2QyxVQUFILENBQWN0QixHQUFHLENBQUNXLFFBQUosQ0FBYUssT0FBYixDQUFkLEVBQXFDaEIsR0FBRyxDQUFDVyxRQUFKLENBQWE1QixJQUFJLENBQUNHLEdBQWxCLENBQXJDO0FBQ0FULE1BQUFBLEVBQUUsQ0FBQzhDLFVBQUgsQ0FBY3ZCLEdBQUcsQ0FBQ1csUUFBSixDQUFhLFFBQWIsQ0FBZDtBQUNBbEMsTUFBQUEsRUFBRSxDQUFDOEMsVUFBSCxDQUFjdkIsR0FBRyxDQUFDVyxRQUFKLENBQWE1QixJQUFJLENBQUNNLE1BQWxCLENBQWQ7QUFDQVosTUFBQUEsRUFBRSxDQUFDOEMsVUFBSCxDQUFjdkIsR0FBRyxDQUFDVyxRQUFKLENBQWE1QixJQUFJLENBQUNJLElBQWxCLENBQWQ7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOC0yMDE5IFRPTiBERVYgU09MVVRJT05TIExURC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgU09GVFdBUkUgRVZBTFVBVElPTiBMaWNlbnNlICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbiAqIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxuICogTGljZW5zZSBhdDogaHR0cHM6Ly93d3cudG9uLmRldi9saWNlbnNlc1xuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgVE9OIERFViBzb2Z0d2FyZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbi8vIEBmbG93XG5cblxuaW1wb3J0IHsgRGV2IH0gZnJvbSBcIi4uL2RldlwiO1xuaW1wb3J0IHR5cGUgeyBQYXRoSm9pbiB9IGZyb20gXCIuLi91dGlscy91dGlsc1wiO1xuaW1wb3J0IHsgcGFyc2VGaWxlQXJnIH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxzXCI7XG5pbXBvcnQgdHlwZSB7IENsaWVudENvZGVPcHRpb25zIH0gZnJvbSBcIi4vY2xpZW50LWNvZGVcIjtcbmltcG9ydCB7IENsaWVudENvZGUgfSBmcm9tIFwiLi9jbGllbnQtY29kZVwiO1xuaW1wb3J0IHsgQ29tcGlsZXJzSm9iIH0gZnJvbSBcIi4vam9iXCI7XG5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcblxuZXhwb3J0IHR5cGUgU29saWRpdHlCdWlsZE9wdGlvbnMgPSBDbGllbnRDb2RlT3B0aW9ucztcblxudHlwZSBTb2xpZGl0eUZpbGVBcmcgPSB7XG4gICAgZGlyOiBQYXRoSm9pbixcbiAgICBuYW1lOiB7XG4gICAgICAgIGJhc2U6IHN0cmluZyxcbiAgICAgICAgc29sOiBzdHJpbmcsXG4gICAgICAgIHR2Yzogc3RyaW5nLFxuICAgICAgICBjb2RlOiBzdHJpbmcsXG4gICAgICAgIGFiaTogc3RyaW5nLFxuICAgICAgICBwYWNrYWdlOiBzdHJpbmcsXG4gICAgICAgIHJlc3VsdDogc3RyaW5nLFxuICAgIH0sXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVNvbGlkaXR5RmlsZUFyZyhmaWxlQXJnOiBzdHJpbmcpOiBTb2xpZGl0eUZpbGVBcmcge1xuICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlRmlsZUFyZyhmaWxlQXJnLCAnLnNvbCcpO1xuICAgIHJldHVybiB7XG4gICAgICAgIGRpcjogcGFyc2VkLmRpcixcbiAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgYmFzZTogcGFyc2VkLmJhc2UsXG4gICAgICAgICAgICBzb2w6IHBhcnNlZC5uYW1lLFxuICAgICAgICAgICAgdHZjOiBgJHtwYXJzZWQuYmFzZX0udHZjYCxcbiAgICAgICAgICAgIGNvZGU6IGAke3BhcnNlZC5iYXNlfS5jb2RlYCxcbiAgICAgICAgICAgIGFiaTogYCR7cGFyc2VkLmJhc2V9LmFiaS5qc29uYCxcbiAgICAgICAgICAgIHBhY2thZ2U6IGAke3BhcnNlZC5iYXNlfVBhY2thZ2VgLFxuICAgICAgICAgICAgcmVzdWx0OiBgJHtwYXJzZWQuYmFzZX0ucmVzdWx0YCxcbiAgICAgICAgfSxcbiAgICB9O1xufVxuXG5leHBvcnQgY2xhc3MgU29saWRpdHkge1xuICAgIHN0YXRpYyBhc3luYyBidWlsZChkZXY6IERldiwgZmlsZXM6IHN0cmluZ1tdLCBvcHRpb25zOiBTb2xpZGl0eUJ1aWxkT3B0aW9ucykge1xuICAgICAgICBjb25zdCBzb2wgPSBuZXcgU29saWRpdHkoZGV2LCBmaWxlcywgb3B0aW9ucyk7XG4gICAgICAgIGF3YWl0IHNvbC5idWlsZCgpO1xuICAgIH1cblxuICAgIGRldjogRGV2O1xuICAgIGZpbGVzOiBzdHJpbmdbXTtcbiAgICBvcHRpb25zOiBTb2xpZGl0eUJ1aWxkT3B0aW9ucztcblxuICAgIGNvbnN0cnVjdG9yKGRldjogRGV2LCBmaWxlczogc3RyaW5nW10sIG9wdGlvbnM6IFNvbGlkaXR5QnVpbGRPcHRpb25zKSB7XG4gICAgICAgIHRoaXMuZGV2ID0gZGV2O1xuICAgICAgICB0aGlzLmZpbGVzID0gZmlsZXM7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgfVxuXG4gICAgYXN5bmMgYnVpbGQoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5maWxlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgY29uc3QgZmlsZSA9IHBhcnNlU29saWRpdHlGaWxlQXJnKHRoaXMuZmlsZXNbaV0pO1xuICAgICAgICAgICAgY29uc3Qgam9iID0gYXdhaXQgQ29tcGlsZXJzSm9iLmNyZWF0ZSh0aGlzLmRldiwgZmlsZS5kaXIoKSk7XG4gICAgICAgICAgICB0aGlzLnByZXBhcmVCdWlsZEJhdGNoKGZpbGUsIGpvYik7XG4gICAgICAgICAgICBhd2FpdCBqb2IucnVuKCdzaCcsIGpvYi5ndWVzdFBhdGgoJ2pvYi5zaCcpKTtcbiAgICAgICAgICAgIHRoaXMuY2xlYW5CdWlsZFJlc3VsdHMoZmlsZSwgam9iKTtcbiAgICAgICAgICAgIGF3YWl0IENsaWVudENvZGUuZ2VuZXJhdGUoW3RoaXMuZmlsZXNbaV1dLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJlcGFyZUJ1aWxkQmF0Y2hGb3JGaWUoZmlsZTogU29saWRpdHlGaWxlQXJnLCBiYXRjaDogc3RyaW5nW10pIHtcbiAgICAgICAgY29uc3QgeyBuYW1lIH0gPSBmaWxlO1xuICAgICAgICBiYXRjaC5wdXNoKFxuICAgICAgICAgICAgYHNvbGMgJHtuYW1lLnNvbH0gLS10dm0gPiAke25hbWUuY29kZX1gLFxuICAgICAgICAgICAgYHNvbGMgJHtuYW1lLnNvbH0gLS10dm1fYWJpID4gJHtuYW1lLmFiaX1gLFxuICAgICAgICAgICAgYHR2bV9saW5rZXIgY29tcGlsZSAke25hbWUuY29kZX0gLS1saWIgL3Vzci9iaW4vc3RkbGliX3NvbC50dm0gLS1hYmktanNvbiAke25hbWUuYWJpfSA+ICR7bmFtZS5yZXN1bHR9YFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByZXBhcmVCdWlsZEJhdGNoKGZpbGU6IFNvbGlkaXR5RmlsZUFyZywgam9iOiBDb21waWxlcnNKb2IpIHtcbiAgICAgICAgY29uc3QgYmF0Y2ggPSBbXTtcbiAgICAgICAgYmF0Y2gucHVzaChgY2QgJHtqb2IuZ3Vlc3RQYXRoKCl9YCk7XG4gICAgICAgIHRoaXMucHJlcGFyZUJ1aWxkQmF0Y2hGb3JGaWUoZmlsZSwgYmF0Y2gpO1xuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKGpvYi5ob3N0UGF0aCgnam9iLnNoJyksIGJhdGNoLmpvaW4oJ1xcbicpKTtcbiAgICB9XG5cbiAgICBjbGVhbkJ1aWxkUmVzdWx0cyhmaWxlOiBTb2xpZGl0eUZpbGVBcmcsIGpvYjogQ29tcGlsZXJzSm9iKSB7XG4gICAgICAgIGNvbnN0IHsgbmFtZSB9ID0gZmlsZTtcbiAgICAgICAgY29uc3QgbGlua2VyUmVzdWx0ID0gZnMucmVhZEZpbGVTeW5jKGpvYi5ob3N0UGF0aChuYW1lLnJlc3VsdCksIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KTtcbiAgICAgICAgY29uc3QgdHZjRmlsZSA9ICgvU2F2ZWQgY29udHJhY3QgdG8gZmlsZVxccyooLipcXC50dmMpL2dpLmV4ZWMobGlua2VyUmVzdWx0KSB8fCBbXSlbMV07XG4gICAgICAgIGlmICghdHZjRmlsZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2cobGlua2VyUmVzdWx0KTtcbiAgICAgICAgICAgIHByb2Nlc3MuZXhpdCgxKVxuICAgICAgICB9XG4gICAgICAgIGZzLnJlbmFtZVN5bmMoam9iLmhvc3RQYXRoKHR2Y0ZpbGUpLCBqb2IuaG9zdFBhdGgobmFtZS50dmMpKTtcbiAgICAgICAgZnMudW5saW5rU3luYyhqb2IuaG9zdFBhdGgoJ2pvYi5zaCcpKTtcbiAgICAgICAgZnMudW5saW5rU3luYyhqb2IuaG9zdFBhdGgobmFtZS5yZXN1bHQpKTtcbiAgICAgICAgZnMudW5saW5rU3luYyhqb2IuaG9zdFBhdGgobmFtZS5jb2RlKSk7XG4gICAgfVxufVxuIl19