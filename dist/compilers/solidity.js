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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21waWxlcnMvc29saWRpdHkuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwicGFyc2VTb2xpZGl0eUZpbGVBcmciLCJmaWxlQXJnIiwicGFyc2VkIiwiZGlyIiwibmFtZSIsImJhc2UiLCJzb2wiLCJ0dmMiLCJjb2RlIiwiYWJpIiwicmVzdWx0IiwiU29saWRpdHkiLCJkZXYiLCJmaWxlcyIsIm9wdGlvbnMiLCJDb21waWxlcnNKb2IiLCJjcmVhdGUiLCJrZWVwQ29udGVudCIsImpvYiIsImJ1aWxkIiwicHJlcGFyZUJ1aWxkQmF0Y2giLCJydW4iLCJndWVzdFBhdGgiLCJwaWNrVXBCdWlsZFJlc3VsdHMiLCJDbGllbnRDb2RlIiwiZ2VuZXJhdGUiLCJmaWxlIiwiYmF0Y2giLCJjb3B5RmlsZVN5bmMiLCJob3N0UGF0aCIsInB1c2giLCJmb3JFYWNoIiwicHJlcGFyZUJ1aWxkQmF0Y2hGb3JGaWUiLCJ3cml0ZUZpbGVTeW5jIiwiam9pbiIsImxpbmtlclJlc3VsdCIsInJlYWRGaWxlU3luYyIsImVuY29kaW5nIiwidHZjRmlsZSIsImV4ZWMiLCJjb25zb2xlIiwibG9nIiwicHJvY2VzcyIsImV4aXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkE7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBckJBOzs7Ozs7Ozs7Ozs7OztBQXNCQSxJQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQUlBLFNBQVNDLG9CQUFULENBQThCQyxPQUE5QixFQUF1QztBQUNuQyxNQUFNQyxNQUFNLEdBQUcseUJBQWFELE9BQWIsRUFBc0IsTUFBdEIsQ0FBZjtBQUNBLFNBQU87QUFDSEUsSUFBQUEsR0FBRyxFQUFFRCxNQUFNLENBQUNDLEdBRFQ7QUFFSEMsSUFBQUEsSUFBSSxFQUFFO0FBQ0ZDLE1BQUFBLElBQUksRUFBRUgsTUFBTSxDQUFDRyxJQURYO0FBRUZDLE1BQUFBLEdBQUcsRUFBRUosTUFBTSxDQUFDRSxJ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QUEscUNBQ05ELG9CQUFvQixDQUFDQyxPQUFELENBRGQ7QUFBQSxZQUNwQkUsR0FEb0IsMEJBQ3BCQSxHQURvQjtBQUFBLFlBQ2ZDLElBRGUsMEJBQ2ZBLElBRGU7O0FBRTVCLFlBQU0rQixZQUFZLEdBQUdyQyxFQUFFLENBQUNzQyxZQUFILENBQWdCLE1BQUksQ0FBQ2xCLEdBQUwsQ0FBU1csUUFBVCxDQUFrQnpCLElBQUksQ0FBQ00sTUFBdkIsQ0FBaEIsRUFBZ0Q7QUFBRTJCLFVBQUFBLFFBQVEsRUFBRTtBQUFaLFNBQWhELENBQXJCO0FBQ0EsWUFBTUMsT0FBTyxHQUFHLENBQUMsdUNBQXVDQyxJQUF2QyxDQUE0Q0osWUFBNUMsS0FBNkQsRUFBOUQsRUFBa0UsQ0FBbEUsQ0FBaEI7O0FBQ0EsWUFBSUcsT0FBSixFQUFhO0FBQ1R4QyxVQUFBQSxFQUFFLENBQUM4QixZQUFILENBQWdCLE1BQUksQ0FBQ1YsR0FBTCxDQUFTVyxRQUFULENBQWtCUyxPQUFsQixDQUFoQixFQUE0Q25DLEdBQUcsQ0FBQ0MsSUFBSSxDQUFDRyxHQUFOLENBQS9DO0FBQ0FULFVBQUFBLEVBQUUsQ0FBQzhCLFlBQUgsQ0FBZ0IsTUFBSSxDQUFDVixHQUFMLENBQVNXLFFBQVQsQ0FBa0J6QixJQUFJLENBQUNLLEdBQXZCLENBQWhCLEVBQTZDTixHQUFHLENBQUNDLElBQUksQ0FBQ0ssR0FBTixDQUFoRDtBQUNILFNBSEQsTUFHTztBQUNIK0IsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlOLFlBQVo7QUFDQU8sVUFBQUEsT0FBTyxDQUFDQyxJQUFSO0FBQ0g7QUFDUixPQVhHO0FBWUgiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG4gKiB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbiAqIExpY2Vuc2UgYXQ6IGh0dHBzOi8vd3d3LnRvbi5kZXYvbGljZW5zZXNcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIFRPTiBERVYgc29mdHdhcmUgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG4vLyBAZmxvd1xuXG5cbmltcG9ydCB7IERldiB9IGZyb20gXCIuLi9kZXZcIjtcbmltcG9ydCB7IHBhcnNlRmlsZUFyZyB9IGZyb20gXCIuLi91dGlscy91dGlsc1wiO1xuaW1wb3J0IHR5cGUgeyBDbGllbnRDb2RlT3B0aW9ucyB9IGZyb20gXCIuL2NsaWVudC1jb2RlXCI7XG5pbXBvcnQgeyBDbGllbnRDb2RlIH0gZnJvbSBcIi4vY2xpZW50LWNvZGVcIjtcbmltcG9ydCB7IENvbXBpbGVyc0pvYiB9IGZyb20gXCIuL2pvYlwiO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuXG5leHBvcnQgdHlwZSBTb2xpZGl0eUJ1aWxkT3B0aW9ucyA9IENsaWVudENvZGVPcHRpb25zO1xuXG5mdW5jdGlvbiBwYXJzZVNvbGlkaXR5RmlsZUFyZyhmaWxlQXJnKSB7XG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2VGaWxlQXJnKGZpbGVBcmcsICcuc29sJyk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGlyOiBwYXJzZWQuZGlyLFxuICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICBiYXNlOiBwYXJzZWQuYmFzZSxcbiAgICAgICAgICAgIHNvbDogcGFyc2VkLm5hbWUsXG4gICAgICAgICAgICB0dmM6IGAke3BhcnNlZC5iYXNlfS50dmNgLFxuICAgICAgICAgICAgY29kZTogYCR7cGFyc2VkLmJhc2V9LmNvZGVgLFxuICAgICAgICAgICAgYWJpOiBgJHtwYXJzZWQuYmFzZX0uYWJpLmpzb25gLFxuICAgICAgICAgICAgcGFja2FnZTogYCR7cGFyc2VkLmJhc2V9UGFja2FnZWAsXG4gICAgICAgICAgICByZXN1bHQ6IGAke3BhcnNlZC5iYXNlfS5yZXN1bHRgLFxuICAgICAgICB9LFxuICAgIH07XG59XG5cbmV4cG9ydCBjbGFzcyBTb2xpZGl0eSB7XG4gICAgc3RhdGljIGFzeW5jIGJ1aWxkKGRldjogRGV2LCBmaWxlczogc3RyaW5nW10sIG9wdGlvbnM6IFNvbGlkaXR5QnVpbGRPcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IGpvYiA9IGF3YWl0IENvbXBpbGVyc0pvYi5jcmVhdGUoZGV2LCB7XG4gICAgICAgICAgICBrZWVwQ29udGVudDogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBzb2wgPSBuZXcgU29saWRpdHkoZGV2LCBqb2IsIGZpbGVzLCBvcHRpb25zKTtcbiAgICAgICAgYXdhaXQgc29sLmJ1aWxkKCk7XG4gICAgfVxuXG4gICAgZGV2OiBEZXY7XG4gICAgam9iOiBDb21waWxlcnNKb2I7XG4gICAgZmlsZXM6IHN0cmluZ1tdO1xuICAgIG9wdGlvbnM6IFNvbGlkaXR5QnVpbGRPcHRpb25zO1xuXG4gICAgY29uc3RydWN0b3IoZGV2OiBEZXYsIGpvYjogQ29tcGlsZXJzSm9iLCBmaWxlczogc3RyaW5nW10sIG9wdGlvbnM6IFNvbGlkaXR5QnVpbGRPcHRpb25zKSB7XG4gICAgICAgIHRoaXMuZGV2ID0gZGV2O1xuICAgICAgICB0aGlzLmpvYiA9IGpvYjtcbiAgICAgICAgdGhpcy5maWxlcyA9IGZpbGVzO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIH1cblxuICAgIGFzeW5jIGJ1aWxkKCkge1xuICAgICAgICB0aGlzLnByZXBhcmVCdWlsZEJhdGNoKCk7XG4gICAgICAgIGF3YWl0IHRoaXMuam9iLnJ1bignc2gnLCB0aGlzLmpvYi5ndWVzdFBhdGgoJ2pvYi5zaCcpKTtcbiAgICAgICAgdGhpcy5waWNrVXBCdWlsZFJlc3VsdHMoKTtcbiAgICAgICAgYXdhaXQgQ2xpZW50Q29kZS5nZW5lcmF0ZSh0aGlzLmpvYiwgdGhpcy5maWxlcywgdGhpcy5vcHRpb25zKTtcbiAgICB9XG5cbiAgICBwcmVwYXJlQnVpbGRCYXRjaEZvckZpZShmaWxlLCBiYXRjaCkge1xuICAgICAgICBjb25zdCB7IGRpciwgbmFtZSB9ID0gcGFyc2VTb2xpZGl0eUZpbGVBcmcoZmlsZSk7XG4gICAgICAgIGZzLmNvcHlGaWxlU3luYyhkaXIobmFtZS5zb2wpLCB0aGlzLmpvYi5ob3N0UGF0aChuYW1lLnNvbCkpO1xuICAgICAgICBiYXRjaC5wdXNoKFxuICAgICAgICAgICAgYHNvbGMgJHtuYW1lLnNvbH0gLS10dm0gPiAke25hbWUuY29kZX1gLFxuICAgICAgICAgICAgYHNvbGMgJHtuYW1lLnNvbH0gLS10dm1fYWJpID4gJHtuYW1lLmFiaX1gLFxuICAgICAgICAgICAgYHR2bV9saW5rZXIgY29tcGlsZSAke25hbWUuY29kZX0gLS1saWIgL3Vzci9iaW4vc3RkbGliX3NvbC50dm0gLS1hYmktanNvbiAke25hbWUuYWJpfSA+ICR7bmFtZS5yZXN1bHR9YFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByZXBhcmVCdWlsZEJhdGNoKCkge1xuICAgICAgICBjb25zdCBiYXRjaCA9IFtdO1xuICAgICAgICBiYXRjaC5wdXNoKGBjZCAke3RoaXMuam9iLmd1ZXN0UGF0aCgpfWApO1xuICAgICAgICB0aGlzLmZpbGVzLmZvckVhY2goZmlsZSA9PiB0aGlzLnByZXBhcmVCdWlsZEJhdGNoRm9yRmllKGZpbGUsIGJhdGNoKSk7XG4gICAgICAgIGZzLndyaXRlRmlsZVN5bmModGhpcy5qb2IuaG9zdFBhdGgoJ2pvYi5zaCcpLCBiYXRjaC5qb2luKCdcXG4nKSk7XG4gICAgfVxuXG4gICAgcGlja1VwQnVpbGRSZXN1bHRzKCkge1xuICAgICAgICB0aGlzLmZpbGVzLmZvckVhY2goKGZpbGVBcmcpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgZGlyLCBuYW1lIH0gPSBwYXJzZVNvbGlkaXR5RmlsZUFyZyhmaWxlQXJnKTtcbiAgICAgICAgICAgIGNvbnN0IGxpbmtlclJlc3VsdCA9IGZzLnJlYWRGaWxlU3luYyh0aGlzLmpvYi5ob3N0UGF0aChuYW1lLnJlc3VsdCksIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KTtcbiAgICAgICAgICAgIGNvbnN0IHR2Y0ZpbGUgPSAoL1NhdmVkIGNvbnRyYWN0IHRvIGZpbGVcXHMqKC4qXFwudHZjKS9naS5leGVjKGxpbmtlclJlc3VsdCkgfHwgW10pWzFdO1xuICAgICAgICAgICAgaWYgKHR2Y0ZpbGUpIHtcbiAgICAgICAgICAgICAgICBmcy5jb3B5RmlsZVN5bmModGhpcy5qb2IuaG9zdFBhdGgodHZjRmlsZSksIGRpcihuYW1lLnR2YykpO1xuICAgICAgICAgICAgICAgIGZzLmNvcHlGaWxlU3luYyh0aGlzLmpvYi5ob3N0UGF0aChuYW1lLmFiaSksIGRpcihuYW1lLmFiaSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhsaW5rZXJSZXN1bHQpO1xuICAgICAgICAgICAgICAgIHByb2Nlc3MuZXhpdCgpXG4gICAgICAgICAgICB9XG4gICAgfSk7XG4gICAgfVxufVxuIl19