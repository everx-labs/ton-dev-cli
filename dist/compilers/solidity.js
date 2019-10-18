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
        var job, sol;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _job.CompilersJob.create(dev, {
                  keepContent: false
                });

              case 2:
                job = _context.sent;
                sol = new Solidity(dev, job, files, options);
                _context.next = 6;
                return sol.build();

              case 6:
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

  function Solidity(dev, job, files, options) {
    (0, _classCallCheck2["default"])(this, Solidity);
    (0, _defineProperty2["default"])(this, "dev", void 0);
    (0, _defineProperty2["default"])(this, "job", void 0);
    (0, _defineProperty2["default"])(this, "files", void 0);
    (0, _defineProperty2["default"])(this, "options", void 0);
    this.dev = dev;
    this.job = job;
    this.files = files;
    this.options = options;
  }

  (0, _createClass2["default"])(Solidity, [{
    key: "build",
    value: function () {
      var _build2 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.prepareBuildBatch();
                _context2.next = 3;
                return this.job.run('sh', this.job.guestPath('job.sh'));

              case 3:
                this.pickUpBuildResults();
                _context2.next = 6;
                return _clientCode.ClientCode.generate(this.files, this.options);

              case 6:
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
      var _parseSolidityFileArg = parseSolidityFileArg(file),
          dir = _parseSolidityFileArg.dir,
          name = _parseSolidityFileArg.name;

      fs.copyFileSync(dir(name.sol), this.job.hostPath(name.sol));
      batch.push("solc ".concat(name.sol, " --tvm > ").concat(name.code), "solc ".concat(name.sol, " --tvm_abi > ").concat(name.abi), "tvm_linker compile ".concat(name.code, " --lib /usr/bin/stdlib_sol.tvm --abi-json ").concat(name.abi, " > ").concat(name.result));
    }
  }, {
    key: "prepareBuildBatch",
    value: function prepareBuildBatch() {
      var _this = this;

      var batch = [];
      batch.push("cd ".concat(this.job.guestPath()));
      this.files.forEach(function (file) {
        return _this.prepareBuildBatchForFie(file, batch);
      });
      fs.writeFileSync(this.job.hostPath('job.sh'), batch.join('\n'));
    }
  }, {
    key: "pickUpBuildResults",
    value: function pickUpBuildResults() {
      var _this2 = this;

      this.files.forEach(function (fileArg) {
        var _parseSolidityFileArg2 = parseSolidityFileArg(fileArg),
            dir = _parseSolidityFileArg2.dir,
            name = _parseSolidityFileArg2.name;

        var linkerResult = fs.readFileSync(_this2.job.hostPath(name.result), {
          encoding: 'utf8'
        });
        var tvcFile = (/Saved contract to file\s*(.*\.tvc)/gi.exec(linkerResult) || [])[1];

        if (tvcFile) {
          fs.copyFileSync(_this2.job.hostPath(tvcFile), dir(name.tvc));
          fs.copyFileSync(_this2.job.hostPath(name.abi), dir(name.abi));
        } else {
          console.log(linkerResult);
          process.exit(1);
        }
      });
    }
  }]);
  return Solidity;
}();

exports.Solidity = Solidity;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21waWxlcnMvc29saWRpdHkuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwicGFyc2VTb2xpZGl0eUZpbGVBcmciLCJmaWxlQXJnIiwicGFyc2VkIiwiZGlyIiwibmFtZSIsImJhc2UiLCJzb2wiLCJ0dmMiLCJjb2RlIiwiYWJpIiwicmVzdWx0IiwiU29saWRpdHkiLCJkZXYiLCJmaWxlcyIsIm9wdGlvbnMiLCJDb21waWxlcnNKb2IiLCJjcmVhdGUiLCJrZWVwQ29udGVudCIsImpvYiIsImJ1aWxkIiwicHJlcGFyZUJ1aWxkQmF0Y2giLCJydW4iLCJndWVzdFBhdGgiLCJwaWNrVXBCdWlsZFJlc3VsdHMiLCJDbGllbnRDb2RlIiwiZ2VuZXJhdGUiLCJmaWxlIiwiYmF0Y2giLCJjb3B5RmlsZVN5bmMiLCJob3N0UGF0aCIsInB1c2giLCJmb3JFYWNoIiwicHJlcGFyZUJ1aWxkQmF0Y2hGb3JGaWUiLCJ3cml0ZUZpbGVTeW5jIiwiam9pbiIsImxpbmtlclJlc3VsdCIsInJlYWRGaWxlU3luYyIsImVuY29kaW5nIiwidHZjRmlsZSIsImV4ZWMiLCJjb25zb2xlIiwibG9nIiwicHJvY2VzcyIsImV4aXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkE7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBdEJBOzs7Ozs7Ozs7Ozs7OztBQXdCQSxJQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQWlCQSxTQUFTQyxvQkFBVCxDQUE4QkMsT0FBOUIsRUFBZ0U7QUFDNUQsTUFBTUMsTUFBTSxHQUFHLHlCQUFhRCxPQUFiLEVBQXNCLE1BQXRCLENBQWY7QUFDQSxTQUFPO0FBQ0hFLElBQUFBLEdBQUcsRUFBRUQsTUFBTSxDQUFDQyxHQURUO0FBRUhDLElBQUFBLElBQUksRUFBRTtBQUNGQyxNQUFBQSxJQUFJLEVBQUVILE1BQU0sQ0FBQ0csSUFEWDtBQUVGQyxNQUFBQSxHQUFHLEVBQUVKLE1BQU0sQ0FBQ0Us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QixDQUFDQyxPQUFELENBRGQ7QUFBQSxZQUNwQkUsR0FEb0IsMEJBQ3BCQSxHQURvQjtBQUFBLFlBQ2ZDLElBRGUsMEJBQ2ZBLElBRGU7O0FBRTVCLFlBQU0rQixZQUFZLEdBQUdyQyxFQUFFLENBQUNzQyxZQUFILENBQWdCLE1BQUksQ0FBQ2xCLEdBQUwsQ0FBU1csUUFBVCxDQUFrQnpCLElBQUksQ0FBQ00sTUFBdkIsQ0FBaEIsRUFBZ0Q7QUFBRTJCLFVBQUFBLFFBQVEsRUFBRTtBQUFaLFNBQWhELENBQXJCO0FBQ0EsWUFBTUMsT0FBTyxHQUFHLENBQUMsdUNBQXVDQyxJQUF2QyxDQUE0Q0osWUFBNUMsS0FBNkQsRUFBOUQsRUFBa0UsQ0FBbEUsQ0FBaEI7O0FBQ0EsWUFBSUcsT0FBSixFQUFhO0FBQ1R4QyxVQUFBQSxFQUFFLENBQUM4QixZQUFILENBQWdCLE1BQUksQ0FBQ1YsR0FBTCxDQUFTVyxRQUFULENBQWtCUyxPQUFsQixDQUFoQixFQUE0Q25DLEdBQUcsQ0FBQ0MsSUFBSSxDQUFDRyxHQUFOLENBQS9DO0FBQ0FULFVBQUFBLEVBQUUsQ0FBQzhCLFlBQUgsQ0FBZ0IsTUFBSSxDQUFDVixHQUFMLENBQVNXLFFBQVQsQ0FBa0J6QixJQUFJLENBQUNLLEdBQXZCLENBQWhCLEVBQTZDTixHQUFHLENBQUNDLElBQUksQ0FBQ0ssR0FBTixDQUFoRDtBQUNILFNBSEQsTUFHTztBQUNIK0IsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlOLFlBQVo7QUFDQU8sVUFBQUEsT0FBTyxDQUFDQyxJQUFSLENBQWEsQ0FBYjtBQUNIO0FBQ0osT0FYRDtBQVlIIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuLy8gQGZsb3dcblxuXG5pbXBvcnQgeyBEZXYgfSBmcm9tIFwiLi4vZGV2XCI7XG5pbXBvcnQgdHlwZSB7IFBhdGhKb2luIH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxzXCI7XG5pbXBvcnQgeyBwYXJzZUZpbGVBcmcgfSBmcm9tIFwiLi4vdXRpbHMvdXRpbHNcIjtcbmltcG9ydCB0eXBlIHsgQ2xpZW50Q29kZU9wdGlvbnMgfSBmcm9tIFwiLi9jbGllbnQtY29kZVwiO1xuaW1wb3J0IHsgQ2xpZW50Q29kZSB9IGZyb20gXCIuL2NsaWVudC1jb2RlXCI7XG5pbXBvcnQgeyBDb21waWxlcnNKb2IgfSBmcm9tIFwiLi9qb2JcIjtcblxuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuXG5leHBvcnQgdHlwZSBTb2xpZGl0eUJ1aWxkT3B0aW9ucyA9IENsaWVudENvZGVPcHRpb25zO1xuXG50eXBlIFNvbGlkaXR5RmlsZUFyZyA9IHtcbiAgICBkaXI6IFBhdGhKb2luLFxuICAgIG5hbWU6IHtcbiAgICAgICAgYmFzZTogc3RyaW5nLFxuICAgICAgICBzb2w6IHN0cmluZyxcbiAgICAgICAgdHZjOiBzdHJpbmcsXG4gICAgICAgIGNvZGU6IHN0cmluZyxcbiAgICAgICAgYWJpOiBzdHJpbmcsXG4gICAgICAgIHBhY2thZ2U6IHN0cmluZyxcbiAgICAgICAgcmVzdWx0OiBzdHJpbmcsXG4gICAgfSxcbn1cblxuZnVuY3Rpb24gcGFyc2VTb2xpZGl0eUZpbGVBcmcoZmlsZUFyZzogc3RyaW5nKTogU29saWRpdHlGaWxlQXJnIHtcbiAgICBjb25zdCBwYXJzZWQgPSBwYXJzZUZpbGVBcmcoZmlsZUFyZywgJy5zb2wnKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBkaXI6IHBhcnNlZC5kaXIsXG4gICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgIGJhc2U6IHBhcnNlZC5iYXNlLFxuICAgICAgICAgICAgc29sOiBwYXJzZWQubmFtZSxcbiAgICAgICAgICAgIHR2YzogYCR7cGFyc2VkLmJhc2V9LnR2Y2AsXG4gICAgICAgICAgICBjb2RlOiBgJHtwYXJzZWQuYmFzZX0uY29kZWAsXG4gICAgICAgICAgICBhYmk6IGAke3BhcnNlZC5iYXNlfS5hYmkuanNvbmAsXG4gICAgICAgICAgICBwYWNrYWdlOiBgJHtwYXJzZWQuYmFzZX1QYWNrYWdlYCxcbiAgICAgICAgICAgIHJlc3VsdDogYCR7cGFyc2VkLmJhc2V9LnJlc3VsdGAsXG4gICAgICAgIH0sXG4gICAgfTtcbn1cblxuZXhwb3J0IGNsYXNzIFNvbGlkaXR5IHtcbiAgICBzdGF0aWMgYXN5bmMgYnVpbGQoZGV2OiBEZXYsIGZpbGVzOiBzdHJpbmdbXSwgb3B0aW9uczogU29saWRpdHlCdWlsZE9wdGlvbnMpIHtcbiAgICAgICAgY29uc3Qgam9iID0gYXdhaXQgQ29tcGlsZXJzSm9iLmNyZWF0ZShkZXYsIHtcbiAgICAgICAgICAgIGtlZXBDb250ZW50OiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHNvbCA9IG5ldyBTb2xpZGl0eShkZXYsIGpvYiwgZmlsZXMsIG9wdGlvbnMpO1xuICAgICAgICBhd2FpdCBzb2wuYnVpbGQoKTtcbiAgICB9XG5cbiAgICBkZXY6IERldjtcbiAgICBqb2I6IENvbXBpbGVyc0pvYjtcbiAgICBmaWxlczogc3RyaW5nW107XG4gICAgb3B0aW9uczogU29saWRpdHlCdWlsZE9wdGlvbnM7XG5cbiAgICBjb25zdHJ1Y3RvcihkZXY6IERldiwgam9iOiBDb21waWxlcnNKb2IsIGZpbGVzOiBzdHJpbmdbXSwgb3B0aW9uczogU29saWRpdHlCdWlsZE9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5kZXYgPSBkZXY7XG4gICAgICAgIHRoaXMuam9iID0gam9iO1xuICAgICAgICB0aGlzLmZpbGVzID0gZmlsZXM7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgfVxuXG4gICAgYXN5bmMgYnVpbGQoKSB7XG4gICAgICAgIHRoaXMucHJlcGFyZUJ1aWxkQmF0Y2goKTtcbiAgICAgICAgYXdhaXQgdGhpcy5qb2IucnVuKCdzaCcsIHRoaXMuam9iLmd1ZXN0UGF0aCgnam9iLnNoJykpO1xuICAgICAgICB0aGlzLnBpY2tVcEJ1aWxkUmVzdWx0cygpO1xuICAgICAgICBhd2FpdCBDbGllbnRDb2RlLmdlbmVyYXRlKHRoaXMuZmlsZXMsIHRoaXMub3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHJlcGFyZUJ1aWxkQmF0Y2hGb3JGaWUoZmlsZTogc3RyaW5nLCBiYXRjaDogc3RyaW5nW10pIHtcbiAgICAgICAgY29uc3QgeyBkaXIsIG5hbWUgfSA9IHBhcnNlU29saWRpdHlGaWxlQXJnKGZpbGUpO1xuICAgICAgICBmcy5jb3B5RmlsZVN5bmMoZGlyKG5hbWUuc29sKSwgdGhpcy5qb2IuaG9zdFBhdGgobmFtZS5zb2wpKTtcbiAgICAgICAgYmF0Y2gucHVzaChcbiAgICAgICAgICAgIGBzb2xjICR7bmFtZS5zb2x9IC0tdHZtID4gJHtuYW1lLmNvZGV9YCxcbiAgICAgICAgICAgIGBzb2xjICR7bmFtZS5zb2x9IC0tdHZtX2FiaSA+ICR7bmFtZS5hYml9YCxcbiAgICAgICAgICAgIGB0dm1fbGlua2VyIGNvbXBpbGUgJHtuYW1lLmNvZGV9IC0tbGliIC91c3IvYmluL3N0ZGxpYl9zb2wudHZtIC0tYWJpLWpzb24gJHtuYW1lLmFiaX0gPiAke25hbWUucmVzdWx0fWBcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcmVwYXJlQnVpbGRCYXRjaCgpIHtcbiAgICAgICAgY29uc3QgYmF0Y2ggPSBbXTtcbiAgICAgICAgYmF0Y2gucHVzaChgY2QgJHt0aGlzLmpvYi5ndWVzdFBhdGgoKX1gKTtcbiAgICAgICAgdGhpcy5maWxlcy5mb3JFYWNoKGZpbGUgPT4gdGhpcy5wcmVwYXJlQnVpbGRCYXRjaEZvckZpZShmaWxlLCBiYXRjaCkpO1xuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKHRoaXMuam9iLmhvc3RQYXRoKCdqb2Iuc2gnKSwgYmF0Y2guam9pbignXFxuJykpO1xuICAgIH1cblxuICAgIHBpY2tVcEJ1aWxkUmVzdWx0cygpIHtcbiAgICAgICAgdGhpcy5maWxlcy5mb3JFYWNoKChmaWxlQXJnKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGRpciwgbmFtZSB9ID0gcGFyc2VTb2xpZGl0eUZpbGVBcmcoZmlsZUFyZyk7XG4gICAgICAgICAgICBjb25zdCBsaW5rZXJSZXN1bHQgPSBmcy5yZWFkRmlsZVN5bmModGhpcy5qb2IuaG9zdFBhdGgobmFtZS5yZXN1bHQpLCB7IGVuY29kaW5nOiAndXRmOCcgfSk7XG4gICAgICAgICAgICBjb25zdCB0dmNGaWxlID0gKC9TYXZlZCBjb250cmFjdCB0byBmaWxlXFxzKiguKlxcLnR2YykvZ2kuZXhlYyhsaW5rZXJSZXN1bHQpIHx8IFtdKVsxXTtcbiAgICAgICAgICAgIGlmICh0dmNGaWxlKSB7XG4gICAgICAgICAgICAgICAgZnMuY29weUZpbGVTeW5jKHRoaXMuam9iLmhvc3RQYXRoKHR2Y0ZpbGUpLCBkaXIobmFtZS50dmMpKTtcbiAgICAgICAgICAgICAgICBmcy5jb3B5RmlsZVN5bmModGhpcy5qb2IuaG9zdFBhdGgobmFtZS5hYmkpLCBkaXIobmFtZS5hYmkpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobGlua2VyUmVzdWx0KTtcbiAgICAgICAgICAgICAgICBwcm9jZXNzLmV4aXQoMSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19