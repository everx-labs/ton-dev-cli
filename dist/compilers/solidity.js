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

function parseSolidityFileArg(fileArg, fileMustExists) {
  var parsed = (0, _utils.parseFileArg)(fileArg, '.sol', fileMustExists);
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

                file = parseSolidityFileArg(this.files[i], true);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21waWxlcnMvc29saWRpdHkuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwicGFyc2VTb2xpZGl0eUZpbGVBcmciLCJmaWxlQXJnIiwiZmlsZU11c3RFeGlzdHMiLCJwYXJzZWQiLCJkaXIiLCJuYW1lIiwiYmFzZSIsInNvbCIsInR2YyIsImNvZGUiLCJhYmkiLCJyZXN1bHQiLCJTb2xpZGl0eSIsImRldiIsImZpbGVzIiwib3B0aW9ucyIsImJ1aWxkIiwiaSIsImxlbmd0aCIsImZpbGUiLCJDb21waWxlcnNKb2IiLCJjcmVhdGUiLCJqb2IiLCJwcmVwYXJlQnVpbGRCYXRjaCIsInJ1biIsImd1ZXN0UGF0aCIsImNsZWFuQnVpbGRSZXN1bHRzIiwiQ2xpZW50Q29kZSIsImdlbmVyYXRlIiwiYmF0Y2giLCJwdXNoIiwicHJlcGFyZUJ1aWxkQmF0Y2hGb3JGaWUiLCJ3cml0ZUZpbGVTeW5jIiwiaG9zdFBhdGgiLCJqb2luIiwibGlua2VyUmVzdWx0IiwicmVhZEZpbGVTeW5jIiwiZW5jb2RpbmciLCJ0dmNGaWxlIiwiZXhlYyIsImNvbnNvbGUiLCJsb2ciLCJwcm9jZXNzIiwiZXhpdCIsInJlbmFtZVN5bmMiLCJ1bmxpbmtTeW5jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQTs7QUFFQTs7QUFFQTs7QUFDQTs7QUF0QkE7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLElBQU1BLEVBQUUsR0FBR0MsT0FBTyxDQUFDLElBQUQsQ0FBbEI7O0FBaUJPLFNBQVNDLG9CQUFULENBQThCQyxPQUE5QixFQUErQ0MsY0FBL0MsRUFBeUY7QUFDNUYsTUFBTUMsTUFBTSxHQUFHLHlCQUFhRixPQUFiLEVBQXNCLE1BQXRCLEVBQThCQyxjQUE5QixDQUFmO0FBQ0EsU0FBTztBQUNIRSxJQUFBQSxHQUFHLEVBQUVELE1BQU0sQ0FBQ0MsR0FEVDtBQUVIQyxJQUFBQSxJQUFJLEVBQUU7QUFDRkMsTUFBQUEsSUFBSSxFQUFFSCxNQUFNLENB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LFFBQUosQ0FBYTVCLElBQUksQ0FBQ00sTUFBbEIsQ0FBaEIsRUFBMkM7QUFBRTBCLFFBQUFBLFFBQVEsRUFBRTtBQUFaLE9BQTNDLENBQXJCO0FBQ0EsVUFBTUMsT0FBTyxHQUFHLENBQUMsdUNBQXVDQyxJQUF2QyxDQUE0Q0osWUFBNUMsS0FBNkQsRUFBOUQsRUFBa0UsQ0FBbEUsQ0FBaEI7O0FBQ0EsVUFBSSxDQUFDRyxPQUFMLEVBQWM7QUFDVkUsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlOLFlBQVo7QUFDQU8sUUFBQUEsT0FBTyxDQUFDQyxJQUFSLENBQWEsQ0FBYjtBQUNIOztBQUNEN0MsTUFBQUEsRUFBRSxDQUFDOEMsVUFBSCxDQUFjdEIsR0FBRyxDQUFDVyxRQUFKLENBQWFLLE9BQWIsQ0FBZCxFQUFxQ2hCLEdBQUcsQ0FBQ1csUUFBSixDQUFhNUIsSUFBSSxDQUFDRyxHQUFsQixDQUFyQztBQUNBVixNQUFBQSxFQUFFLENBQUMrQyxVQUFILENBQWN2QixHQUFHLENBQUNXLFFBQUosQ0FBYSxRQUFiLENBQWQ7QUFDQW5DLE1BQUFBLEVBQUUsQ0FBQytDLFVBQUgsQ0FBY3ZCLEdBQUcsQ0FBQ1csUUFBSixDQUFhNUIsSUFBSSxDQUFDTSxNQUFsQixDQUFkO0FBQ0FiLE1BQUFBLEVBQUUsQ0FBQytDLFVBQUgsQ0FBY3ZCLEdBQUcsQ0FBQ1csUUFBSixDQUFhNUIsSUFBSSxDQUFDSSxJQUFsQixDQUFkO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG4gKiB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbiAqIExpY2Vuc2UgYXQ6IGh0dHBzOi8vd3d3LnRvbi5kZXYvbGljZW5zZXNcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIFRPTiBERVYgc29mdHdhcmUgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG4vLyBAZmxvd1xuXG5cbmltcG9ydCB7IERldiB9IGZyb20gXCIuLi9kZXZcIjtcbmltcG9ydCB0eXBlIHsgUGF0aEpvaW4gfSBmcm9tIFwiLi4vdXRpbHMvdXRpbHNcIjtcbmltcG9ydCB7IHBhcnNlRmlsZUFyZyB9IGZyb20gXCIuLi91dGlscy91dGlsc1wiO1xuaW1wb3J0IHR5cGUgeyBDbGllbnRDb2RlT3B0aW9ucyB9IGZyb20gXCIuL2NsaWVudC1jb2RlXCI7XG5pbXBvcnQgeyBDbGllbnRDb2RlIH0gZnJvbSBcIi4vY2xpZW50LWNvZGVcIjtcbmltcG9ydCB7IENvbXBpbGVyc0pvYiB9IGZyb20gXCIuL2pvYlwiO1xuXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5cbmV4cG9ydCB0eXBlIFNvbGlkaXR5QnVpbGRPcHRpb25zID0gQ2xpZW50Q29kZU9wdGlvbnM7XG5cbnR5cGUgU29saWRpdHlGaWxlQXJnID0ge1xuICAgIGRpcjogUGF0aEpvaW4sXG4gICAgbmFtZToge1xuICAgICAgICBiYXNlOiBzdHJpbmcsXG4gICAgICAgIHNvbDogc3RyaW5nLFxuICAgICAgICB0dmM6IHN0cmluZyxcbiAgICAgICAgY29kZTogc3RyaW5nLFxuICAgICAgICBhYmk6IHN0cmluZyxcbiAgICAgICAgcGFja2FnZTogc3RyaW5nLFxuICAgICAgICByZXN1bHQ6IHN0cmluZyxcbiAgICB9LFxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VTb2xpZGl0eUZpbGVBcmcoZmlsZUFyZzogc3RyaW5nLCBmaWxlTXVzdEV4aXN0czogYm9vbGVhbik6IFNvbGlkaXR5RmlsZUFyZyB7XG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2VGaWxlQXJnKGZpbGVBcmcsICcuc29sJywgZmlsZU11c3RFeGlzdHMpO1xuICAgIHJldHVybiB7XG4gICAgICAgIGRpcjogcGFyc2VkLmRpcixcbiAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgYmFzZTogcGFyc2VkLmJhc2UsXG4gICAgICAgICAgICBzb2w6IHBhcnNlZC5uYW1lLFxuICAgICAgICAgICAgdHZjOiBgJHtwYXJzZWQuYmFzZX0udHZjYCxcbiAgICAgICAgICAgIGNvZGU6IGAke3BhcnNlZC5iYXNlfS5jb2RlYCxcbiAgICAgICAgICAgIGFiaTogYCR7cGFyc2VkLmJhc2V9LmFiaS5qc29uYCxcbiAgICAgICAgICAgIHBhY2thZ2U6IGAke3BhcnNlZC5iYXNlfVBhY2thZ2VgLFxuICAgICAgICAgICAgcmVzdWx0OiBgJHtwYXJzZWQuYmFzZX0ucmVzdWx0YCxcbiAgICAgICAgfSxcbiAgICB9O1xufVxuXG5leHBvcnQgY2xhc3MgU29saWRpdHkge1xuICAgIHN0YXRpYyBhc3luYyBidWlsZChkZXY6IERldiwgZmlsZXM6IHN0cmluZ1tdLCBvcHRpb25zOiBTb2xpZGl0eUJ1aWxkT3B0aW9ucykge1xuICAgICAgICBjb25zdCBzb2wgPSBuZXcgU29saWRpdHkoZGV2LCBmaWxlcywgb3B0aW9ucyk7XG4gICAgICAgIGF3YWl0IHNvbC5idWlsZCgpO1xuICAgIH1cblxuICAgIGRldjogRGV2O1xuICAgIGZpbGVzOiBzdHJpbmdbXTtcbiAgICBvcHRpb25zOiBTb2xpZGl0eUJ1aWxkT3B0aW9ucztcblxuICAgIGNvbnN0cnVjdG9yKGRldjogRGV2LCBmaWxlczogc3RyaW5nW10sIG9wdGlvbnM6IFNvbGlkaXR5QnVpbGRPcHRpb25zKSB7XG4gICAgICAgIHRoaXMuZGV2ID0gZGV2O1xuICAgICAgICB0aGlzLmZpbGVzID0gZmlsZXM7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgfVxuXG4gICAgYXN5bmMgYnVpbGQoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5maWxlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgY29uc3QgZmlsZSA9IHBhcnNlU29saWRpdHlGaWxlQXJnKHRoaXMuZmlsZXNbaV0sIHRydWUpO1xuICAgICAgICAgICAgY29uc3Qgam9iID0gYXdhaXQgQ29tcGlsZXJzSm9iLmNyZWF0ZSh0aGlzLmRldiwgZmlsZS5kaXIoKSk7XG4gICAgICAgICAgICB0aGlzLnByZXBhcmVCdWlsZEJhdGNoKGZpbGUsIGpvYik7XG4gICAgICAgICAgICBhd2FpdCBqb2IucnVuKCdzaCcsIGpvYi5ndWVzdFBhdGgoJ2pvYi5zaCcpKTtcbiAgICAgICAgICAgIHRoaXMuY2xlYW5CdWlsZFJlc3VsdHMoZmlsZSwgam9iKTtcbiAgICAgICAgICAgIGF3YWl0IENsaWVudENvZGUuZ2VuZXJhdGUoW3RoaXMuZmlsZXNbaV1dLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJlcGFyZUJ1aWxkQmF0Y2hGb3JGaWUoZmlsZTogU29saWRpdHlGaWxlQXJnLCBiYXRjaDogc3RyaW5nW10pIHtcbiAgICAgICAgY29uc3QgeyBuYW1lIH0gPSBmaWxlO1xuICAgICAgICBiYXRjaC5wdXNoKFxuICAgICAgICAgICAgYHNvbGMgJHtuYW1lLnNvbH0gLS10dm0gPiAke25hbWUuY29kZX1gLFxuICAgICAgICAgICAgYHNvbGMgJHtuYW1lLnNvbH0gLS10dm1fYWJpID4gJHtuYW1lLmFiaX1gLFxuICAgICAgICAgICAgYHR2bV9saW5rZXIgY29tcGlsZSAke25hbWUuY29kZX0gLS1saWIgL3Vzci9iaW4vc3RkbGliX3NvbC50dm0gLS1hYmktanNvbiAke25hbWUuYWJpfSA+ICR7bmFtZS5yZXN1bHR9YFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByZXBhcmVCdWlsZEJhdGNoKGZpbGU6IFNvbGlkaXR5RmlsZUFyZywgam9iOiBDb21waWxlcnNKb2IpIHtcbiAgICAgICAgY29uc3QgYmF0Y2ggPSBbXTtcbiAgICAgICAgYmF0Y2gucHVzaChgY2QgJHtqb2IuZ3Vlc3RQYXRoKCl9YCk7XG4gICAgICAgIHRoaXMucHJlcGFyZUJ1aWxkQmF0Y2hGb3JGaWUoZmlsZSwgYmF0Y2gpO1xuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKGpvYi5ob3N0UGF0aCgnam9iLnNoJyksIGJhdGNoLmpvaW4oJ1xcbicpKTtcbiAgICB9XG5cbiAgICBjbGVhbkJ1aWxkUmVzdWx0cyhmaWxlOiBTb2xpZGl0eUZpbGVBcmcsIGpvYjogQ29tcGlsZXJzSm9iKSB7XG4gICAgICAgIGNvbnN0IHsgbmFtZSB9ID0gZmlsZTtcbiAgICAgICAgY29uc3QgbGlua2VyUmVzdWx0ID0gZnMucmVhZEZpbGVTeW5jKGpvYi5ob3N0UGF0aChuYW1lLnJlc3VsdCksIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KTtcbiAgICAgICAgY29uc3QgdHZjRmlsZSA9ICgvU2F2ZWQgY29udHJhY3QgdG8gZmlsZVxccyooLipcXC50dmMpL2dpLmV4ZWMobGlua2VyUmVzdWx0KSB8fCBbXSlbMV07XG4gICAgICAgIGlmICghdHZjRmlsZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2cobGlua2VyUmVzdWx0KTtcbiAgICAgICAgICAgIHByb2Nlc3MuZXhpdCgxKVxuICAgICAgICB9XG4gICAgICAgIGZzLnJlbmFtZVN5bmMoam9iLmhvc3RQYXRoKHR2Y0ZpbGUpLCBqb2IuaG9zdFBhdGgobmFtZS50dmMpKTtcbiAgICAgICAgZnMudW5saW5rU3luYyhqb2IuaG9zdFBhdGgoJ2pvYi5zaCcpKTtcbiAgICAgICAgZnMudW5saW5rU3luYyhqb2IuaG9zdFBhdGgobmFtZS5yZXN1bHQpKTtcbiAgICAgICAgZnMudW5saW5rU3luYyhqb2IuaG9zdFBhdGgobmFtZS5jb2RlKSk7XG4gICAgfVxufVxuIl19