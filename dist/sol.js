"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sol = sol;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _compilers = _interopRequireDefault(require("./compilers"));

var _utils = require("./utils");

/*
 * Copyright 2018-2019 TON DEV SOLUTIONS LTD.
 *
 * Licensed under the SOFTWARE EVALUATION License (the "License"); you may not use
 * this file except in compliance with the License.  You may obtain a copy of the
 * License at:
 *
 * http://www.ton.dev/licenses
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific TON DEV software governing permissions and
 * limitations under the License.
 */
var fs = require('fs');

var solArgs = {
  javaScript: {
    def: false,
    "short": 'js'
  },
  rust: {
    def: false,
    "short": 'rs'
  }
};

function genJavaScriptPackage(file) {
  var imageBase64 = fs.readFileSync((0, _utils.rootPath)("".concat(file, ".tvc"))).toString('base64');
  var abi = fs.readFileSync((0, _utils.rootPath)("".concat(file, ".abi.json"))).toString().trimRight();
  var js = "const ".concat(file, "Package = {\n    abi: ").concat(abi, ",\n    imageBase64: '").concat(imageBase64, "'\n};\n\nmodule.exports = ").concat(file, "Package;\n");
  fs.writeFileSync((0, _utils.rootPath)("".concat(file, "Package.js")), js, {
    encoding: 'utf8'
  });
}

function sol(_x) {
  return _sol.apply(this, arguments);
}

function _sol() {
  _sol = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(args) {
    var options, compiler, job;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = (0, _utils.argsToOptions)(args, solArgs);
            _context.next = 3;
            return _compilers["default"].create();

          case 3:
            compiler = _context.sent;
            job = [];
            options.files.forEach(function (file) {
              fs.copyFileSync((0, _utils.rootPath)("".concat(file, ".sol")), compiler.hostPath("".concat(file, ".sol")));
              job.push("solc ".concat(file, ".sol --tvm > ").concat(file, ".code"), "solc ".concat(file, ".sol --tvm_abi > ").concat(file, ".abi.json"), "tvm_linker compile ".concat(file, ".code --lib /usr/bin/stdlib_sol.tvm --abi-json ").concat(file, ".abi.json > ").concat(file, ".result"));
            });
            fs.writeFileSync(compiler.hostPath('job.sh'), job.join('\n'));
            _context.next = 9;
            return compiler.run('sh', './job.sh');

          case 9:
            options.files.forEach(function (file) {
              var linkerResult = fs.readFileSync(compiler.hostPath("".concat(file, ".result")), {
                encoding: 'utf8'
              });
              var tvcFile = (/Saved contract to file\s*(.*\.tvc)/gi.exec(linkerResult) || [])[1];
              fs.copyFileSync(compiler.hostPath(tvcFile), (0, _utils.rootPath)("".concat(file, ".tvc")));
              fs.copyFileSync(compiler.hostPath("".concat(file, ".abi.json")), (0, _utils.rootPath)("".concat(file, ".abi.json")));

              if (options.javaScript) {
                genJavaScriptPackage(file);
              }
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _sol.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zb2wuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwic29sQXJncyIsImphdmFTY3JpcHQiLCJkZWYiLCJydXN0IiwiZ2VuSmF2YVNjcmlwdFBhY2thZ2UiLCJmaWxlIiwiaW1hZ2VCYXNlNjQiLCJyZWFkRmlsZVN5bmMiLCJ0b1N0cmluZyIsImFiaSIsInRyaW1SaWdodCIsImpzIiwid3JpdGVGaWxlU3luYyIsImVuY29kaW5nIiwic29sIiwiYXJncyIsIm9wdGlvbnMiLCJjb21waWxlcnMiLCJjcmVhdGUiLCJjb21waWxlciIsImpvYiIsImZpbGVzIiwiZm9yRWFjaCIsImNvcHlGaWxlU3luYyIsImhvc3RQYXRoIiwicHVzaCIsImpvaW4iLCJydW4iLCJsaW5rZXJSZXN1bHQiLCJ0dmNGaWxlIiwiZXhlYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQWdCQTs7QUFDQTs7QUFqQkE7Ozs7Ozs7Ozs7Ozs7OztBQWtCQSxJQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQUVBLElBQU1DLE9BQU8sR0FBRztBQUNaQyxFQUFBQSxVQUFVLEVBQUU7QUFBRUMsSUFBQUEsR0FBRyxFQUFFLEtBQVA7QUFBYyxhQUFPO0FBQXJCLEdBREE7QUFFWkMsRUFBQUEsSUFBSSxFQUFFO0FBQUVELElBQUFBLEdBQUcsRUFBRSxLQUFQO0FBQWMsYUFBTztBQUFyQjtBQUZNLENBQWhCOztBQUtBLFNBQVNFLG9CQUFULENBQThCQyxJQUE5QixFQUFvQztBQUNoQyxNQUFNQyxXQUFXLEdBQUdSLEVBQUUsQ0FBQ1MsWUFBSCxDQUFnQiwrQkFBWUYsSUFBWixVQUFoQixFQUF5Q0csUUFBekMsQ0FBa0QsUUFBbEQsQ0FBcEI7QUFDQSxNQUFNQyxHQUFHLEdBQUdYLEVBQUUsQ0FBQ1MsWUFBSCxDQUFnQiwrQkFBWUYsSUFBWixlQUFoQixFQUE4Q0csUUFBOUMsR0FBeURFLFNBQXpELEVBQVo7QUFDQSxNQUFNQyxFQUFFLG1CQUNITixJQURHLG1DQUVESSxHQUZDLGtDQUdRSCxXQUhSLHVDQU1PRCxJQU5QLGVBQVI7QUFRQVAsRUFBQUEsRUFBRSxDQUFDYyxhQUFILENBQWlCLCtCQUFZUCxJQUFaLGdCQUFqQixFQUFnRE0sRUFBaEQsRUFBb0Q7QUFBRUUsSUFBQUEsUUFBUSxFQUFFO0FBQVosR0FBcEQ7QUFDSDs7U0FFY0MsRzs7Ozs7OzsrQkFBZixpQkFBbUJDLElBQW5CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNVQyxZQUFBQSxPQURWLEdBQ29CLDBCQUFjRCxJQUFkLEVBQW9CZixPQUFwQixDQURwQjtBQUFBO0FBQUEsbUJBRzJCaUIsc0JBQVVDLE1BQVYsRUFIM0I7O0FBQUE7QUFHVUMsWUFBQUEsUUFIVjtBQUlVQyxZQUFBQSxHQUpWLEdBSWdCLEVBSmhCO0FBS0lKLFlBQUFBLE9BQU8sQ0FBQ0ssS0FBUixDQUFjQyxPQUFkLENBQXNCLFVBQUNqQixJQUFELEVBQVU7QUFDNUJQLGNBQUFBLEVBQUUsQ0FBQ3lCLFlBQUgsQ0FBZ0IsK0JBQVlsQixJQUFaLFVBQWhCLEVBQXlDYyxRQUFRLENBQUNLLFFBQVQsV0FBcUJuQixJQUFyQixVQUF6QztBQUNBZSxjQUFBQSxHQUFHLENBQUNLLElBQUosZ0JBQ1lwQixJQURaLDBCQUNnQ0EsSUFEaEMsMkJBRVlBLElBRlosOEJBRW9DQSxJQUZwQyw2Q0FHMEJBLElBSDFCLDREQUdnRkEsSUFIaEYseUJBR21HQSxJQUhuRztBQUtILGFBUEQ7QUFRQVAsWUFBQUEsRUFBRSxDQUFDYyxhQUFILENBQWlCTyxRQUFRLENBQUNLLFFBQVQsQ0FBa0IsUUFBbEIsQ0FBakIsRUFBOENKLEdBQUcsQ0FBQ00sSUFBSixDQUFTLElBQVQsQ0FBOUM7QUFiSjtBQUFBLG1CQWNVUCxRQUFRLENBQUNRLEdBQVQsQ0FBYSxJQUFiLEVBQW1CLFVBQW5CLENBZFY7O0FBQUE7QUFlSVgsWUFBQUEsT0FBTyxDQUFDSyxLQUFSLENBQWNDLE9BQWQsQ0FBc0IsVUFBQ2pCLElBQUQsRUFBVTtBQUM1QixrQkFBTXVCLFlBQVksR0FBRzlCLEVBQUUsQ0FBQ1MsWUFBSCxDQUFnQlksUUFBUSxDQUFDSyxRQUFULFdBQXFCbkIsSUFBckIsYUFBaEIsRUFBcUQ7QUFBRVEsZ0JBQUFBLFFBQVEsRUFBRTtBQUFaLGVBQXJELENBQXJCO0FBQ0Esa0JBQU1nQixPQUFPLEdBQUcsQ0FBQyx1Q0FBdUNDLElBQXZDLENBQTRDRixZQUE1QyxLQUE2RCxFQUE5RCxFQUFrRSxDQUFsRSxDQUFoQjtBQUNBOUIsY0FBQUEsRUFBRSxDQUFDeUIsWUFBSCxDQUFnQkosUUFBUSxDQUFDSyxRQUFULENBQWtCSyxPQUFsQixDQUFoQixFQUE0QywrQkFBWXhCLElBQVosVUFBNUM7QUFDQVAsY0FBQUEsRUFBRSxDQUFDeUIsWUFBSCxDQUFnQkosUUFBUSxDQUFDSyxRQUFULFdBQXFCbkIsSUFBckIsZUFBaEIsRUFBdUQsK0JBQVlBLElBQVosZUFBdkQ7O0FBQ0Esa0JBQUlXLE9BQU8sQ0FBQ2YsVUFBWixFQUF3QjtBQUNwQkcsZ0JBQUFBLG9CQUFvQixDQUFDQyxJQUFELENBQXBCO0FBQ0g7QUFDSixhQVJEOztBQWZKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG4gKiB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbiAqIExpY2Vuc2UgYXQ6XG4gKlxuICogaHR0cDovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG4vLyBAZmxvd1xuaW1wb3J0IGNvbXBpbGVycyBmcm9tIFwiLi9jb21waWxlcnNcIjtcbmltcG9ydCB7IGFyZ3NUb09wdGlvbnMsIHJvb3RQYXRoIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcblxuY29uc3Qgc29sQXJncyA9IHtcbiAgICBqYXZhU2NyaXB0OiB7IGRlZjogZmFsc2UsIHNob3J0OiAnanMnIH0sXG4gICAgcnVzdDogeyBkZWY6IGZhbHNlLCBzaG9ydDogJ3JzJyB9LFxufTtcblxuZnVuY3Rpb24gZ2VuSmF2YVNjcmlwdFBhY2thZ2UoZmlsZSkge1xuICAgIGNvbnN0IGltYWdlQmFzZTY0ID0gZnMucmVhZEZpbGVTeW5jKHJvb3RQYXRoKGAke2ZpbGV9LnR2Y2ApKS50b1N0cmluZygnYmFzZTY0Jyk7XG4gICAgY29uc3QgYWJpID0gZnMucmVhZEZpbGVTeW5jKHJvb3RQYXRoKGAke2ZpbGV9LmFiaS5qc29uYCkpLnRvU3RyaW5nKCkudHJpbVJpZ2h0KCk7XG4gICAgY29uc3QganMgPVxuYGNvbnN0ICR7ZmlsZX1QYWNrYWdlID0ge1xuICAgIGFiaTogJHthYml9LFxuICAgIGltYWdlQmFzZTY0OiAnJHtpbWFnZUJhc2U2NH0nXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9ICR7ZmlsZX1QYWNrYWdlO1xuYDtcbiAgICBmcy53cml0ZUZpbGVTeW5jKHJvb3RQYXRoKGAke2ZpbGV9UGFja2FnZS5qc2ApLCBqcywgeyBlbmNvZGluZzogJ3V0ZjgnIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzb2woYXJnczogc3RyaW5nW10pIHtcbiAgICBjb25zdCBvcHRpb25zID0gYXJnc1RvT3B0aW9ucyhhcmdzLCBzb2xBcmdzKTtcblxuICAgIGNvbnN0IGNvbXBpbGVyID0gYXdhaXQgY29tcGlsZXJzLmNyZWF0ZSgpO1xuICAgIGNvbnN0IGpvYiA9IFtdO1xuICAgIG9wdGlvbnMuZmlsZXMuZm9yRWFjaCgoZmlsZSkgPT4ge1xuICAgICAgICBmcy5jb3B5RmlsZVN5bmMocm9vdFBhdGgoYCR7ZmlsZX0uc29sYCksIGNvbXBpbGVyLmhvc3RQYXRoKGAke2ZpbGV9LnNvbGApKTtcbiAgICAgICAgam9iLnB1c2goXG4gICAgICAgICAgICBgc29sYyAke2ZpbGV9LnNvbCAtLXR2bSA+ICR7ZmlsZX0uY29kZWAsXG4gICAgICAgICAgICBgc29sYyAke2ZpbGV9LnNvbCAtLXR2bV9hYmkgPiAke2ZpbGV9LmFiaS5qc29uYCxcbiAgICAgICAgICAgIGB0dm1fbGlua2VyIGNvbXBpbGUgJHtmaWxlfS5jb2RlIC0tbGliIC91c3IvYmluL3N0ZGxpYl9zb2wudHZtIC0tYWJpLWpzb24gJHtmaWxlfS5hYmkuanNvbiA+ICR7ZmlsZX0ucmVzdWx0YFxuICAgICAgICApO1xuICAgIH0pO1xuICAgIGZzLndyaXRlRmlsZVN5bmMoY29tcGlsZXIuaG9zdFBhdGgoJ2pvYi5zaCcpLCBqb2Iuam9pbignXFxuJykpO1xuICAgIGF3YWl0IGNvbXBpbGVyLnJ1bignc2gnLCAnLi9qb2Iuc2gnKTtcbiAgICBvcHRpb25zLmZpbGVzLmZvckVhY2goKGZpbGUpID0+IHtcbiAgICAgICAgY29uc3QgbGlua2VyUmVzdWx0ID0gZnMucmVhZEZpbGVTeW5jKGNvbXBpbGVyLmhvc3RQYXRoKGAke2ZpbGV9LnJlc3VsdGApLCB7IGVuY29kaW5nOiAndXRmOCd9KTtcbiAgICAgICAgY29uc3QgdHZjRmlsZSA9ICgvU2F2ZWQgY29udHJhY3QgdG8gZmlsZVxccyooLipcXC50dmMpL2dpLmV4ZWMobGlua2VyUmVzdWx0KSB8fCBbXSlbMV07XG4gICAgICAgIGZzLmNvcHlGaWxlU3luYyhjb21waWxlci5ob3N0UGF0aCh0dmNGaWxlKSwgcm9vdFBhdGgoYCR7ZmlsZX0udHZjYCkpO1xuICAgICAgICBmcy5jb3B5RmlsZVN5bmMoY29tcGlsZXIuaG9zdFBhdGgoYCR7ZmlsZX0uYWJpLmpzb25gKSwgcm9vdFBhdGgoYCR7ZmlsZX0uYWJpLmpzb25gKSk7XG4gICAgICAgIGlmIChvcHRpb25zLmphdmFTY3JpcHQpIHtcbiAgICAgICAgICAgIGdlbkphdmFTY3JpcHRQYWNrYWdlKGZpbGUpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmV4cG9ydCB7IHNvbCB9O1xuIl19