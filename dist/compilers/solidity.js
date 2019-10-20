"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21waWxlcnMvc29saWRpdHkuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwicGFyc2VTb2xpZGl0eUZpbGVBcmciLCJmaWxlQXJnIiwicGFyc2VkIiwiZGlyIiwibmFtZSIsImJhc2UiLCJzb2wiLCJ0dmMiLCJjb2RlIiwiYWJpIiwicmVzdWx0IiwiU29saWRpdHkiLCJkZXYiLCJmaWxlcyIsIm9wdGlvbnMiLCJidWlsZCIsImkiLCJsZW5ndGgiLCJmaWxlIiwiQ29tcGlsZXJzSm9iIiwiY3JlYXRlIiwiam9iIiwicHJlcGFyZUJ1aWxkQmF0Y2giLCJydW4iLCJndWVzdFBhdGgiLCJjbGVhbkJ1aWxkUmVzdWx0cyIsIkNsaWVudENvZGUiLCJnZW5lcmF0ZSIsImJhdGNoIiwicHVzaCIsInByZXBhcmVCdWlsZEJhdGNoRm9yRmllIiwid3JpdGVGaWxlU3luYyIsImhvc3RQYXRoIiwiam9pbiIsImxpbmtlclJlc3VsdCIsInJlYWRGaWxlU3luYyIsImVuY29kaW5nIiwidHZjRmlsZSIsImV4ZWMiLCJjb25zb2xlIiwibG9nIiwicHJvY2VzcyIsImV4aXQiLCJyZW5hbWVTeW5jIiwidW5saW5rU3luYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQTs7QUFFQTs7QUFFQTs7QUFDQTs7QUF0QkE7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLElBQU1BLEVBQUUsR0FBR0MsT0FBTyxDQUFDLElBQUQsQ0FBbEI7O0FBaUJBLFNBQVNDLG9CQUFULENBQThCQyxPQUE5QixFQUFnRTtBQUM1RCxNQUFNQyxNQUFNLEdBQUcseUJBQWFELE9BQWIsRUFBc0IsTUFBdEIsQ0FBZjtBQUNBLFNBQU87QUFDSEUsSUFBQUEsR0FBRyxFQUFFRCxNQUFNLENBQUNDLEdBRFQ7QUFFSEMsSUFBQUEsSUFBSSxFQUFFO0FBQ0ZDLE1BQUFBLElBQUksRUFBRUgsTUFBTSxDQUFDRyxJQURYO0FBRUZDLE1BQUFBLEdBQUcsRUFBRUosTUFBTSxDQUFDRSxJ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QUFRLEVBQUU7QUFBWixPQUEzQyxDQUFyQjtBQUNBLFVBQU1DLE9BQU8sR0FBRyxDQUFDLHVDQUF1Q0MsSUFBdkMsQ0FBNENKLFlBQTVDLEtBQTZELEVBQTlELEVBQWtFLENBQWxFLENBQWhCOztBQUNBLFVBQUksQ0FBQ0csT0FBTCxFQUFjO0FBQ1ZFLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZTixZQUFaO0FBQ0FPLFFBQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUFhLENBQWI7QUFDSDs7QUFDRDVDLE1BQUFBLEVBQUUsQ0FBQzZDLFVBQUgsQ0FBY3RCLEdBQUcsQ0FBQ1csUUFBSixDQUFhSyxPQUFiLENBQWQsRUFBcUNoQixHQUFHLENBQUNXLFFBQUosQ0FBYTVCLElBQUksQ0FBQ0csR0FBbEIsQ0FBckM7QUFDQVQsTUFBQUEsRUFBRSxDQUFDOEMsVUFBSCxDQUFjdkIsR0FBRyxDQUFDVyxRQUFKLENBQWEsUUFBYixDQUFkO0FBQ0FsQyxNQUFBQSxFQUFFLENBQUM4QyxVQUFILENBQWN2QixHQUFHLENBQUNXLFFBQUosQ0FBYTVCLElBQUksQ0FBQ00sTUFBbEIsQ0FBZDtBQUNBWixNQUFBQSxFQUFFLENBQUM4QyxVQUFILENBQWN2QixHQUFHLENBQUNXLFFBQUosQ0FBYTVCLElBQUksQ0FBQ0ksSUFBbEIsQ0FBZDtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuLy8gQGZsb3dcblxuXG5pbXBvcnQgeyBEZXYgfSBmcm9tIFwiLi4vZGV2XCI7XG5pbXBvcnQgdHlwZSB7IFBhdGhKb2luIH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxzXCI7XG5pbXBvcnQgeyBwYXJzZUZpbGVBcmcgfSBmcm9tIFwiLi4vdXRpbHMvdXRpbHNcIjtcbmltcG9ydCB0eXBlIHsgQ2xpZW50Q29kZU9wdGlvbnMgfSBmcm9tIFwiLi9jbGllbnQtY29kZVwiO1xuaW1wb3J0IHsgQ2xpZW50Q29kZSB9IGZyb20gXCIuL2NsaWVudC1jb2RlXCI7XG5pbXBvcnQgeyBDb21waWxlcnNKb2IgfSBmcm9tIFwiLi9qb2JcIjtcblxuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuXG5leHBvcnQgdHlwZSBTb2xpZGl0eUJ1aWxkT3B0aW9ucyA9IENsaWVudENvZGVPcHRpb25zO1xuXG50eXBlIFNvbGlkaXR5RmlsZUFyZyA9IHtcbiAgICBkaXI6IFBhdGhKb2luLFxuICAgIG5hbWU6IHtcbiAgICAgICAgYmFzZTogc3RyaW5nLFxuICAgICAgICBzb2w6IHN0cmluZyxcbiAgICAgICAgdHZjOiBzdHJpbmcsXG4gICAgICAgIGNvZGU6IHN0cmluZyxcbiAgICAgICAgYWJpOiBzdHJpbmcsXG4gICAgICAgIHBhY2thZ2U6IHN0cmluZyxcbiAgICAgICAgcmVzdWx0OiBzdHJpbmcsXG4gICAgfSxcbn1cblxuZnVuY3Rpb24gcGFyc2VTb2xpZGl0eUZpbGVBcmcoZmlsZUFyZzogc3RyaW5nKTogU29saWRpdHlGaWxlQXJnIHtcbiAgICBjb25zdCBwYXJzZWQgPSBwYXJzZUZpbGVBcmcoZmlsZUFyZywgJy5zb2wnKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBkaXI6IHBhcnNlZC5kaXIsXG4gICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgIGJhc2U6IHBhcnNlZC5iYXNlLFxuICAgICAgICAgICAgc29sOiBwYXJzZWQubmFtZSxcbiAgICAgICAgICAgIHR2YzogYCR7cGFyc2VkLmJhc2V9LnR2Y2AsXG4gICAgICAgICAgICBjb2RlOiBgJHtwYXJzZWQuYmFzZX0uY29kZWAsXG4gICAgICAgICAgICBhYmk6IGAke3BhcnNlZC5iYXNlfS5hYmkuanNvbmAsXG4gICAgICAgICAgICBwYWNrYWdlOiBgJHtwYXJzZWQuYmFzZX1QYWNrYWdlYCxcbiAgICAgICAgICAgIHJlc3VsdDogYCR7cGFyc2VkLmJhc2V9LnJlc3VsdGAsXG4gICAgICAgIH0sXG4gICAgfTtcbn1cblxuZXhwb3J0IGNsYXNzIFNvbGlkaXR5IHtcbiAgICBzdGF0aWMgYXN5bmMgYnVpbGQoZGV2OiBEZXYsIGZpbGVzOiBzdHJpbmdbXSwgb3B0aW9uczogU29saWRpdHlCdWlsZE9wdGlvbnMpIHtcbiAgICAgICAgY29uc3Qgc29sID0gbmV3IFNvbGlkaXR5KGRldiwgZmlsZXMsIG9wdGlvbnMpO1xuICAgICAgICBhd2FpdCBzb2wuYnVpbGQoKTtcbiAgICB9XG5cbiAgICBkZXY6IERldjtcbiAgICBmaWxlczogc3RyaW5nW107XG4gICAgb3B0aW9uczogU29saWRpdHlCdWlsZE9wdGlvbnM7XG5cbiAgICBjb25zdHJ1Y3RvcihkZXY6IERldiwgZmlsZXM6IHN0cmluZ1tdLCBvcHRpb25zOiBTb2xpZGl0eUJ1aWxkT3B0aW9ucykge1xuICAgICAgICB0aGlzLmRldiA9IGRldjtcbiAgICAgICAgdGhpcy5maWxlcyA9IGZpbGVzO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIH1cblxuICAgIGFzeW5jIGJ1aWxkKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZmlsZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBwYXJzZVNvbGlkaXR5RmlsZUFyZyh0aGlzLmZpbGVzW2ldKTtcbiAgICAgICAgICAgIGNvbnN0IGpvYiA9IGF3YWl0IENvbXBpbGVyc0pvYi5jcmVhdGUodGhpcy5kZXYsIGZpbGUuZGlyKCkpO1xuICAgICAgICAgICAgdGhpcy5wcmVwYXJlQnVpbGRCYXRjaChmaWxlLCBqb2IpO1xuICAgICAgICAgICAgYXdhaXQgam9iLnJ1bignc2gnLCBqb2IuZ3Vlc3RQYXRoKCdqb2Iuc2gnKSk7XG4gICAgICAgICAgICB0aGlzLmNsZWFuQnVpbGRSZXN1bHRzKGZpbGUsIGpvYik7XG4gICAgICAgICAgICBhd2FpdCBDbGllbnRDb2RlLmdlbmVyYXRlKFt0aGlzLmZpbGVzW2ldXSwgdGhpcy5vcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByZXBhcmVCdWlsZEJhdGNoRm9yRmllKGZpbGU6IFNvbGlkaXR5RmlsZUFyZywgYmF0Y2g6IHN0cmluZ1tdKSB7XG4gICAgICAgIGNvbnN0IHsgbmFtZSB9ID0gZmlsZTtcbiAgICAgICAgYmF0Y2gucHVzaChcbiAgICAgICAgICAgIGBzb2xjICR7bmFtZS5zb2x9IC0tdHZtID4gJHtuYW1lLmNvZGV9YCxcbiAgICAgICAgICAgIGBzb2xjICR7bmFtZS5zb2x9IC0tdHZtX2FiaSA+ICR7bmFtZS5hYml9YCxcbiAgICAgICAgICAgIGB0dm1fbGlua2VyIGNvbXBpbGUgJHtuYW1lLmNvZGV9IC0tbGliIC91c3IvYmluL3N0ZGxpYl9zb2wudHZtIC0tYWJpLWpzb24gJHtuYW1lLmFiaX0gPiAke25hbWUucmVzdWx0fWBcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcmVwYXJlQnVpbGRCYXRjaChmaWxlOiBTb2xpZGl0eUZpbGVBcmcsIGpvYjogQ29tcGlsZXJzSm9iKSB7XG4gICAgICAgIGNvbnN0IGJhdGNoID0gW107XG4gICAgICAgIGJhdGNoLnB1c2goYGNkICR7am9iLmd1ZXN0UGF0aCgpfWApO1xuICAgICAgICB0aGlzLnByZXBhcmVCdWlsZEJhdGNoRm9yRmllKGZpbGUsIGJhdGNoKTtcbiAgICAgICAgZnMud3JpdGVGaWxlU3luYyhqb2IuaG9zdFBhdGgoJ2pvYi5zaCcpLCBiYXRjaC5qb2luKCdcXG4nKSk7XG4gICAgfVxuXG4gICAgY2xlYW5CdWlsZFJlc3VsdHMoZmlsZTogU29saWRpdHlGaWxlQXJnLCBqb2I6IENvbXBpbGVyc0pvYikge1xuICAgICAgICBjb25zdCB7IG5hbWUgfSA9IGZpbGU7XG4gICAgICAgIGNvbnN0IGxpbmtlclJlc3VsdCA9IGZzLnJlYWRGaWxlU3luYyhqb2IuaG9zdFBhdGgobmFtZS5yZXN1bHQpLCB7IGVuY29kaW5nOiAndXRmOCcgfSk7XG4gICAgICAgIGNvbnN0IHR2Y0ZpbGUgPSAoL1NhdmVkIGNvbnRyYWN0IHRvIGZpbGVcXHMqKC4qXFwudHZjKS9naS5leGVjKGxpbmtlclJlc3VsdCkgfHwgW10pWzFdO1xuICAgICAgICBpZiAoIXR2Y0ZpbGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxpbmtlclJlc3VsdCk7XG4gICAgICAgICAgICBwcm9jZXNzLmV4aXQoMSlcbiAgICAgICAgfVxuICAgICAgICBmcy5yZW5hbWVTeW5jKGpvYi5ob3N0UGF0aCh0dmNGaWxlKSwgam9iLmhvc3RQYXRoKG5hbWUudHZjKSk7XG4gICAgICAgIGZzLnVubGlua1N5bmMoam9iLmhvc3RQYXRoKCdqb2Iuc2gnKSk7XG4gICAgICAgIGZzLnVubGlua1N5bmMoam9iLmhvc3RQYXRoKG5hbWUucmVzdWx0KSk7XG4gICAgICAgIGZzLnVubGlua1N5bmMoam9iLmhvc3RQYXRoKG5hbWUuY29kZSkpO1xuICAgIH1cbn1cbiJdfQ==