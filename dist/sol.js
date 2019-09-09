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
            job = ["cd ".concat(compiler.workingDir)];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zb2wuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwic29sQXJncyIsImphdmFTY3JpcHQiLCJkZWYiLCJydXN0IiwiZ2VuSmF2YVNjcmlwdFBhY2thZ2UiLCJmaWxlIiwiaW1hZ2VCYXNlNjQiLCJyZWFkRmlsZVN5bmMiLCJ0b1N0cmluZyIsImFiaSIsInRyaW1SaWdodCIsImpzIiwid3JpdGVGaWxlU3luYyIsImVuY29kaW5nIiwic29sIiwiYXJncyIsIm9wdGlvbnMiLCJjb21waWxlcnMiLCJjcmVhdGUiLCJjb21waWxlciIsImpvYiIsIndvcmtpbmdEaXIiLCJmaWxlcyIsImZvckVhY2giLCJjb3B5RmlsZVN5bmMiLCJob3N0UGF0aCIsInB1c2giLCJqb2luIiwicnVuIiwibGlua2VyUmVzdWx0IiwidHZjRmlsZSIsImV4ZWMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFlQTs7QUFDQTs7QUFoQkE7Ozs7Ozs7Ozs7Ozs7O0FBaUJBLElBQU1BLEVBQUUsR0FBR0MsT0FBTyxDQUFDLElBQUQsQ0FBbEI7O0FBRUEsSUFBTUMsT0FBTyxHQUFHO0FBQ1pDLEVBQUFBLFVBQVUsRUFBRTtBQUFFQyxJQUFBQSxHQUFHLEVBQUUsS0FBUDtBQUFjLGFBQU87QUFBckIsR0FEQTtBQUVaQyxFQUFBQSxJQUFJLEVBQUU7QUFBRUQsSUFBQUEsR0FBRyxFQUFFLEtBQVA7QUFBYyxhQUFPO0FBQXJCO0FBRk0sQ0FBaEI7O0FBS0EsU0FBU0Usb0JBQVQsQ0FBOEJDLElBQTlCLEVBQW9DO0FBQ2hDLE1BQU1DLFdBQVcsR0FBR1IsRUFBRSxDQUFDUyxZQUFILENBQWdCLCtCQUFZRixJQUFaLFVBQWhCLEVBQXlDRyxRQUF6QyxDQUFrRCxRQUFsRCxDQUFwQjtBQUNBLE1BQU1DLEdBQUcsR0FBR1gsRUFBRSxDQUFDUyxZQUFILENBQWdCLCtCQUFZRixJQUFaLGVBQWhCLEVBQThDRyxRQUE5QyxHQUF5REUsU0FBekQsRUFBWjtBQUNBLE1BQU1DLEVBQUUsbUJBQ0hOLElBREcsbUNBRURJLEdBRkMsa0NBR1FILFdBSFIsdUNBTU9ELElBTlAsZUFBUjtBQVFBUCxFQUFBQSxFQUFFLENBQUNjLGFBQUgsQ0FBaUIsK0JBQVlQLElBQVosZ0JBQWpCLEVBQWdETSxFQUFoRCxFQUFvRDtBQUFFRSxJQUFBQSxRQUFRLEVBQUU7QUFBWixHQUFwRDtBQUNIOztTQUVjQyxHOzs7Ozs7OytCQUFmLGlCQUFtQkMsSUFBbkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1VDLFlBQUFBLE9BRFYsR0FDb0IsMEJBQWNELElBQWQsRUFBb0JmLE9BQXBCLENBRHBCO0FBQUE7QUFBQSxtQkFHMkJpQixzQkFBVUMsTUFBVixFQUgzQjs7QUFBQTtBQUdVQyxZQUFBQSxRQUhWO0FBSVVDLFlBQUFBLEdBSlYsR0FJZ0IsY0FDRkQsUUFBUSxDQUFDRSxVQURQLEVBSmhCO0FBT0lMLFlBQUFBLE9BQU8sQ0FBQ00sS0FBUixDQUFjQyxPQUFkLENBQXNCLFVBQUNsQixJQUFELEVBQVU7QUFDNUJQLGNBQUFBLEVBQUUsQ0FBQzBCLFlBQUgsQ0FBZ0IsK0JBQVluQixJQUFaLFVBQWhCLEVBQXlDYyxRQUFRLENBQUNNLFFBQVQsV0FBcUJwQixJQUFyQixVQUF6QztBQUNBZSxjQUFBQSxHQUFHLENBQUNNLElBQUosZ0JBQ1lyQixJQURaLDBCQUNnQ0EsSUFEaEMsMkJBRVlBLElBRlosOEJBRW9DQSxJQUZwQyw2Q0FHMEJBLElBSDFCLDREQUdnRkEsSUFIaEYseUJBR21HQSxJQUhuRztBQUtILGFBUEQ7QUFRQVAsWUFBQUEsRUFBRSxDQUFDYyxhQUFILENBQWlCTyxRQUFRLENBQUNNLFFBQVQsQ0FBa0IsUUFBbEIsQ0FBakIsRUFBOENMLEdBQUcsQ0FBQ08sSUFBSixDQUFTLElBQVQsQ0FBOUM7QUFmSjtBQUFBLG1CQWdCVVIsUUFBUSxDQUFDUyxHQUFULENBQWEsSUFBYixFQUFtQixVQUFuQixDQWhCVjs7QUFBQTtBQWlCSVosWUFBQUEsT0FBTyxDQUFDTSxLQUFSLENBQWNDLE9BQWQsQ0FBc0IsVUFBQ2xCLElBQUQsRUFBVTtBQUM1QixrQkFBTXdCLFlBQVksR0FBRy9CLEVBQUUsQ0FBQ1MsWUFBSCxDQUFnQlksUUFBUSxDQUFDTSxRQUFULFdBQXFCcEIsSUFBckIsYUFBaEIsRUFBcUQ7QUFBRVEsZ0JBQUFBLFFBQVEsRUFBRTtBQUFaLGVBQXJELENBQXJCO0FBQ0Esa0JBQU1pQixPQUFPLEdBQUcsQ0FBQyx1Q0FBdUNDLElBQXZDLENBQTRDRixZQUE1QyxLQUE2RCxFQUE5RCxFQUFrRSxDQUFsRSxDQUFoQjtBQUNBL0IsY0FBQUEsRUFBRSxDQUFDMEIsWUFBSCxDQUFnQkwsUUFBUSxDQUFDTSxRQUFULENBQWtCSyxPQUFsQixDQUFoQixFQUE0QywrQkFBWXpCLElBQVosVUFBNUM7QUFDQVAsY0FBQUEsRUFBRSxDQUFDMEIsWUFBSCxDQUFnQkwsUUFBUSxDQUFDTSxRQUFULFdBQXFCcEIsSUFBckIsZUFBaEIsRUFBdUQsK0JBQVlBLElBQVosZUFBdkQ7O0FBQ0Esa0JBQUlXLE9BQU8sQ0FBQ2YsVUFBWixFQUF3QjtBQUNwQkcsZ0JBQUFBLG9CQUFvQixDQUFDQyxJQUFELENBQXBCO0FBQ0g7QUFDSixhQVJEOztBQWpCSjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuLy8gQGZsb3dcbmltcG9ydCBjb21waWxlcnMgZnJvbSBcIi4vY29tcGlsZXJzXCI7XG5pbXBvcnQgeyBhcmdzVG9PcHRpb25zLCByb290UGF0aCB9IGZyb20gXCIuL3V0aWxzXCI7XG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5cbmNvbnN0IHNvbEFyZ3MgPSB7XG4gICAgamF2YVNjcmlwdDogeyBkZWY6IGZhbHNlLCBzaG9ydDogJ2pzJyB9LFxuICAgIHJ1c3Q6IHsgZGVmOiBmYWxzZSwgc2hvcnQ6ICdycycgfSxcbn07XG5cbmZ1bmN0aW9uIGdlbkphdmFTY3JpcHRQYWNrYWdlKGZpbGUpIHtcbiAgICBjb25zdCBpbWFnZUJhc2U2NCA9IGZzLnJlYWRGaWxlU3luYyhyb290UGF0aChgJHtmaWxlfS50dmNgKSkudG9TdHJpbmcoJ2Jhc2U2NCcpO1xuICAgIGNvbnN0IGFiaSA9IGZzLnJlYWRGaWxlU3luYyhyb290UGF0aChgJHtmaWxlfS5hYmkuanNvbmApKS50b1N0cmluZygpLnRyaW1SaWdodCgpO1xuICAgIGNvbnN0IGpzID1cbmBjb25zdCAke2ZpbGV9UGFja2FnZSA9IHtcbiAgICBhYmk6ICR7YWJpfSxcbiAgICBpbWFnZUJhc2U2NDogJyR7aW1hZ2VCYXNlNjR9J1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSAke2ZpbGV9UGFja2FnZTtcbmA7XG4gICAgZnMud3JpdGVGaWxlU3luYyhyb290UGF0aChgJHtmaWxlfVBhY2thZ2UuanNgKSwganMsIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc29sKGFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IGFyZ3NUb09wdGlvbnMoYXJncywgc29sQXJncyk7XG5cbiAgICBjb25zdCBjb21waWxlciA9IGF3YWl0IGNvbXBpbGVycy5jcmVhdGUoKTtcbiAgICBjb25zdCBqb2IgPSBbXG4gICAgICAgIGBjZCAke2NvbXBpbGVyLndvcmtpbmdEaXJ9YFxuICAgIF07XG4gICAgb3B0aW9ucy5maWxlcy5mb3JFYWNoKChmaWxlKSA9PiB7XG4gICAgICAgIGZzLmNvcHlGaWxlU3luYyhyb290UGF0aChgJHtmaWxlfS5zb2xgKSwgY29tcGlsZXIuaG9zdFBhdGgoYCR7ZmlsZX0uc29sYCkpO1xuICAgICAgICBqb2IucHVzaChcbiAgICAgICAgICAgIGBzb2xjICR7ZmlsZX0uc29sIC0tdHZtID4gJHtmaWxlfS5jb2RlYCxcbiAgICAgICAgICAgIGBzb2xjICR7ZmlsZX0uc29sIC0tdHZtX2FiaSA+ICR7ZmlsZX0uYWJpLmpzb25gLFxuICAgICAgICAgICAgYHR2bV9saW5rZXIgY29tcGlsZSAke2ZpbGV9LmNvZGUgLS1saWIgL3Vzci9iaW4vc3RkbGliX3NvbC50dm0gLS1hYmktanNvbiAke2ZpbGV9LmFiaS5qc29uID4gJHtmaWxlfS5yZXN1bHRgXG4gICAgICAgICk7XG4gICAgfSk7XG4gICAgZnMud3JpdGVGaWxlU3luYyhjb21waWxlci5ob3N0UGF0aCgnam9iLnNoJyksIGpvYi5qb2luKCdcXG4nKSk7XG4gICAgYXdhaXQgY29tcGlsZXIucnVuKCdzaCcsICcuL2pvYi5zaCcpO1xuICAgIG9wdGlvbnMuZmlsZXMuZm9yRWFjaCgoZmlsZSkgPT4ge1xuICAgICAgICBjb25zdCBsaW5rZXJSZXN1bHQgPSBmcy5yZWFkRmlsZVN5bmMoY29tcGlsZXIuaG9zdFBhdGgoYCR7ZmlsZX0ucmVzdWx0YCksIHsgZW5jb2Rpbmc6ICd1dGY4J30pO1xuICAgICAgICBjb25zdCB0dmNGaWxlID0gKC9TYXZlZCBjb250cmFjdCB0byBmaWxlXFxzKiguKlxcLnR2YykvZ2kuZXhlYyhsaW5rZXJSZXN1bHQpIHx8IFtdKVsxXTtcbiAgICAgICAgZnMuY29weUZpbGVTeW5jKGNvbXBpbGVyLmhvc3RQYXRoKHR2Y0ZpbGUpLCByb290UGF0aChgJHtmaWxlfS50dmNgKSk7XG4gICAgICAgIGZzLmNvcHlGaWxlU3luYyhjb21waWxlci5ob3N0UGF0aChgJHtmaWxlfS5hYmkuanNvbmApLCByb290UGF0aChgJHtmaWxlfS5hYmkuanNvbmApKTtcbiAgICAgICAgaWYgKG9wdGlvbnMuamF2YVNjcmlwdCkge1xuICAgICAgICAgICAgZ2VuSmF2YVNjcmlwdFBhY2thZ2UoZmlsZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZXhwb3J0IHsgc29sIH07XG4iXX0=