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
                return _clientCode.ClientCode.generate(this.job, this.files, this.options);

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
          process.exit();
        }
      });
    }
  }]);
  return Solidity;
}();

exports.Solidity = Solidity;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21waWxlcnMvc29saWRpdHkuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwicGFyc2VTb2xpZGl0eUZpbGVBcmciLCJmaWxlQXJnIiwicGFyc2VkIiwiZGlyIiwibmFtZSIsImJhc2UiLCJzb2wiLCJ0dmMiLCJjb2RlIiwiYWJpIiwicmVzdWx0IiwiU29saWRpdHkiLCJkZXYiLCJmaWxlcyIsIm9wdGlvbnMiLCJDb21waWxlcnNKb2IiLCJjcmVhdGUiLCJrZWVwQ29udGVudCIsImpvYiIsImJ1aWxkIiwicHJlcGFyZUJ1aWxkQmF0Y2giLCJydW4iLCJndWVzdFBhdGgiLCJwaWNrVXBCdWlsZFJlc3VsdHMiLCJDbGllbnRDb2RlIiwiZ2VuZXJhdGUiLCJmaWxlIiwiYmF0Y2giLCJjb3B5RmlsZVN5bmMiLCJob3N0UGF0aCIsInB1c2giLCJmb3JFYWNoIiwicHJlcGFyZUJ1aWxkQmF0Y2hGb3JGaWUiLCJ3cml0ZUZpbGVTeW5jIiwiam9pbiIsImxpbmtlclJlc3VsdCIsInJlYWRGaWxlU3luYyIsImVuY29kaW5nIiwidHZjRmlsZSIsImV4ZWMiLCJjb25zb2xlIiwibG9nIiwicHJvY2VzcyIsImV4aXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkE7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBdEJBOzs7Ozs7Ozs7Ozs7OztBQXdCQSxJQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQWlCQSxTQUFTQyxvQkFBVCxDQUE4QkMsT0FBOUIsRUFBZ0U7QUFDNUQsTUFBTUMsTUFBTSxHQUFHLHlCQUFhRCxPQUFiLEVBQXNCLE1BQXRCLENBQWY7QUFDQSxTQUFPO0FBQ0hFLElBQUFBLEdBQUcsRUFBRUQsTUFBTSxDQUFDQyxHQURUO0FBRUhDLElBQUFBLElBQUksRUFBRTtBQUNGQyxNQUFBQSxJQUFJLEVBQUVILE1BQU0sQ0FBQ0csSUFEWDtBQUVGQyxNQUFBQSxHQUFHLEVBQUVKLE1BQU0sQ0FBQ0Us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O0FBQUEscUNBQ05ELG9CQUFvQixDQUFDQyxPQUFELENBRGQ7QUFBQSxZQUNwQkUsR0FEb0IsMEJBQ3BCQSxHQURvQjtBQUFBLFlBQ2ZDLElBRGUsMEJBQ2ZBLElBRGU7O0FBRTVCLFlBQU0rQixZQUFZLEdBQUdyQyxFQUFFLENBQUNzQyxZQUFILENBQWdCLE1BQUksQ0FBQ2xCLEdBQUwsQ0FBU1csUUFBVCxDQUFrQnpCLElBQUksQ0FBQ00sTUFBdkIsQ0FBaEIsRUFBZ0Q7QUFBRTJCLFVBQUFBLFFBQVEsRUFBRTtBQUFaLFNBQWhELENBQXJCO0FBQ0EsWUFBTUMsT0FBTyxHQUFHLENBQUMsdUNBQXVDQyxJQUF2QyxDQUE0Q0osWUFBNUMsS0FBNkQsRUFBOUQsRUFBa0UsQ0FBbEUsQ0FBaEI7O0FBQ0EsWUFBSUcsT0FBSixFQUFhO0FBQ1R4QyxVQUFBQSxFQUFFLENBQUM4QixZQUFILENBQWdCLE1BQUksQ0FBQ1YsR0FBTCxDQUFTVyxRQUFULENBQWtCUyxPQUFsQixDQUFoQixFQUE0Q25DLEdBQUcsQ0FBQ0MsSUFBSSxDQUFDRyxHQUFOLENBQS9DO0FBQ0FULFVBQUFBLEVBQUUsQ0FBQzhCLFlBQUgsQ0FBZ0IsTUFBSSxDQUFDVixHQUFMLENBQVNXLFFBQVQsQ0FBa0J6QixJQUFJLENBQUNLLEdBQXZCLENBQWhCLEVBQTZDTixHQUFHLENBQUNDLElBQUksQ0FBQ0ssR0FBTixDQUFoRDtBQUNILFNBSEQsTUFHTztBQUNIK0IsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlOLFlBQVo7QUFDQU8sVUFBQUEsT0FBTyxDQUFDQyxJQUFSO0FBQ0g7QUFDSixPQVhEO0FBWUgiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG4gKiB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbiAqIExpY2Vuc2UgYXQ6IGh0dHBzOi8vd3d3LnRvbi5kZXYvbGljZW5zZXNcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIFRPTiBERVYgc29mdHdhcmUgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG4vLyBAZmxvd1xuXG5cbmltcG9ydCB7IERldiB9IGZyb20gXCIuLi9kZXZcIjtcbmltcG9ydCB0eXBlIHsgUGF0aEpvaW4gfSBmcm9tIFwiLi4vdXRpbHMvdXRpbHNcIjtcbmltcG9ydCB7IHBhcnNlRmlsZUFyZyB9IGZyb20gXCIuLi91dGlscy91dGlsc1wiO1xuaW1wb3J0IHR5cGUgeyBDbGllbnRDb2RlT3B0aW9ucyB9IGZyb20gXCIuL2NsaWVudC1jb2RlXCI7XG5pbXBvcnQgeyBDbGllbnRDb2RlIH0gZnJvbSBcIi4vY2xpZW50LWNvZGVcIjtcbmltcG9ydCB7IENvbXBpbGVyc0pvYiB9IGZyb20gXCIuL2pvYlwiO1xuXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5cbmV4cG9ydCB0eXBlIFNvbGlkaXR5QnVpbGRPcHRpb25zID0gQ2xpZW50Q29kZU9wdGlvbnM7XG5cbnR5cGUgU29saWRpdHlGaWxlQXJnID0ge1xuICAgIGRpcjogUGF0aEpvaW4sXG4gICAgbmFtZToge1xuICAgICAgICBiYXNlOiBzdHJpbmcsXG4gICAgICAgIHNvbDogc3RyaW5nLFxuICAgICAgICB0dmM6IHN0cmluZyxcbiAgICAgICAgY29kZTogc3RyaW5nLFxuICAgICAgICBhYmk6IHN0cmluZyxcbiAgICAgICAgcGFja2FnZTogc3RyaW5nLFxuICAgICAgICByZXN1bHQ6IHN0cmluZyxcbiAgICB9LFxufVxuXG5mdW5jdGlvbiBwYXJzZVNvbGlkaXR5RmlsZUFyZyhmaWxlQXJnOiBzdHJpbmcpOiBTb2xpZGl0eUZpbGVBcmcge1xuICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlRmlsZUFyZyhmaWxlQXJnLCAnLnNvbCcpO1xuICAgIHJldHVybiB7XG4gICAgICAgIGRpcjogcGFyc2VkLmRpcixcbiAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgYmFzZTogcGFyc2VkLmJhc2UsXG4gICAgICAgICAgICBzb2w6IHBhcnNlZC5uYW1lLFxuICAgICAgICAgICAgdHZjOiBgJHtwYXJzZWQuYmFzZX0udHZjYCxcbiAgICAgICAgICAgIGNvZGU6IGAke3BhcnNlZC5iYXNlfS5jb2RlYCxcbiAgICAgICAgICAgIGFiaTogYCR7cGFyc2VkLmJhc2V9LmFiaS5qc29uYCxcbiAgICAgICAgICAgIHBhY2thZ2U6IGAke3BhcnNlZC5iYXNlfVBhY2thZ2VgLFxuICAgICAgICAgICAgcmVzdWx0OiBgJHtwYXJzZWQuYmFzZX0ucmVzdWx0YCxcbiAgICAgICAgfSxcbiAgICB9O1xufVxuXG5leHBvcnQgY2xhc3MgU29saWRpdHkge1xuICAgIHN0YXRpYyBhc3luYyBidWlsZChkZXY6IERldiwgZmlsZXM6IHN0cmluZ1tdLCBvcHRpb25zOiBTb2xpZGl0eUJ1aWxkT3B0aW9ucykge1xuICAgICAgICBjb25zdCBqb2IgPSBhd2FpdCBDb21waWxlcnNKb2IuY3JlYXRlKGRldiwge1xuICAgICAgICAgICAga2VlcENvbnRlbnQ6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3Qgc29sID0gbmV3IFNvbGlkaXR5KGRldiwgam9iLCBmaWxlcywgb3B0aW9ucyk7XG4gICAgICAgIGF3YWl0IHNvbC5idWlsZCgpO1xuICAgIH1cblxuICAgIGRldjogRGV2O1xuICAgIGpvYjogQ29tcGlsZXJzSm9iO1xuICAgIGZpbGVzOiBzdHJpbmdbXTtcbiAgICBvcHRpb25zOiBTb2xpZGl0eUJ1aWxkT3B0aW9ucztcblxuICAgIGNvbnN0cnVjdG9yKGRldjogRGV2LCBqb2I6IENvbXBpbGVyc0pvYiwgZmlsZXM6IHN0cmluZ1tdLCBvcHRpb25zOiBTb2xpZGl0eUJ1aWxkT3B0aW9ucykge1xuICAgICAgICB0aGlzLmRldiA9IGRldjtcbiAgICAgICAgdGhpcy5qb2IgPSBqb2I7XG4gICAgICAgIHRoaXMuZmlsZXMgPSBmaWxlcztcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB9XG5cbiAgICBhc3luYyBidWlsZCgpIHtcbiAgICAgICAgdGhpcy5wcmVwYXJlQnVpbGRCYXRjaCgpO1xuICAgICAgICBhd2FpdCB0aGlzLmpvYi5ydW4oJ3NoJywgdGhpcy5qb2IuZ3Vlc3RQYXRoKCdqb2Iuc2gnKSk7XG4gICAgICAgIHRoaXMucGlja1VwQnVpbGRSZXN1bHRzKCk7XG4gICAgICAgIGF3YWl0IENsaWVudENvZGUuZ2VuZXJhdGUodGhpcy5qb2IsIHRoaXMuZmlsZXMsIHRoaXMub3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcHJlcGFyZUJ1aWxkQmF0Y2hGb3JGaWUoZmlsZTogc3RyaW5nLCBiYXRjaDogc3RyaW5nW10pIHtcbiAgICAgICAgY29uc3QgeyBkaXIsIG5hbWUgfSA9IHBhcnNlU29saWRpdHlGaWxlQXJnKGZpbGUpO1xuICAgICAgICBmcy5jb3B5RmlsZVN5bmMoZGlyKG5hbWUuc29sKSwgdGhpcy5qb2IuaG9zdFBhdGgobmFtZS5zb2wpKTtcbiAgICAgICAgYmF0Y2gucHVzaChcbiAgICAgICAgICAgIGBzb2xjICR7bmFtZS5zb2x9IC0tdHZtID4gJHtuYW1lLmNvZGV9YCxcbiAgICAgICAgICAgIGBzb2xjICR7bmFtZS5zb2x9IC0tdHZtX2FiaSA+ICR7bmFtZS5hYml9YCxcbiAgICAgICAgICAgIGB0dm1fbGlua2VyIGNvbXBpbGUgJHtuYW1lLmNvZGV9IC0tbGliIC91c3IvYmluL3N0ZGxpYl9zb2wudHZtIC0tYWJpLWpzb24gJHtuYW1lLmFiaX0gPiAke25hbWUucmVzdWx0fWBcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcmVwYXJlQnVpbGRCYXRjaCgpIHtcbiAgICAgICAgY29uc3QgYmF0Y2ggPSBbXTtcbiAgICAgICAgYmF0Y2gucHVzaChgY2QgJHt0aGlzLmpvYi5ndWVzdFBhdGgoKX1gKTtcbiAgICAgICAgdGhpcy5maWxlcy5mb3JFYWNoKGZpbGUgPT4gdGhpcy5wcmVwYXJlQnVpbGRCYXRjaEZvckZpZShmaWxlLCBiYXRjaCkpO1xuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKHRoaXMuam9iLmhvc3RQYXRoKCdqb2Iuc2gnKSwgYmF0Y2guam9pbignXFxuJykpO1xuICAgIH1cblxuICAgIHBpY2tVcEJ1aWxkUmVzdWx0cygpIHtcbiAgICAgICAgdGhpcy5maWxlcy5mb3JFYWNoKChmaWxlQXJnKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGRpciwgbmFtZSB9ID0gcGFyc2VTb2xpZGl0eUZpbGVBcmcoZmlsZUFyZyk7XG4gICAgICAgICAgICBjb25zdCBsaW5rZXJSZXN1bHQgPSBmcy5yZWFkRmlsZVN5bmModGhpcy5qb2IuaG9zdFBhdGgobmFtZS5yZXN1bHQpLCB7IGVuY29kaW5nOiAndXRmOCcgfSk7XG4gICAgICAgICAgICBjb25zdCB0dmNGaWxlID0gKC9TYXZlZCBjb250cmFjdCB0byBmaWxlXFxzKiguKlxcLnR2YykvZ2kuZXhlYyhsaW5rZXJSZXN1bHQpIHx8IFtdKVsxXTtcbiAgICAgICAgICAgIGlmICh0dmNGaWxlKSB7XG4gICAgICAgICAgICAgICAgZnMuY29weUZpbGVTeW5jKHRoaXMuam9iLmhvc3RQYXRoKHR2Y0ZpbGUpLCBkaXIobmFtZS50dmMpKTtcbiAgICAgICAgICAgICAgICBmcy5jb3B5RmlsZVN5bmModGhpcy5qb2IuaG9zdFBhdGgobmFtZS5hYmkpLCBkaXIobmFtZS5hYmkpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobGlua2VyUmVzdWx0KTtcbiAgICAgICAgICAgICAgICBwcm9jZXNzLmV4aXQoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=