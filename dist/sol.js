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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zb2wuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwic29sQXJncyIsImphdmFTY3JpcHQiLCJkZWYiLCJydXN0IiwiZ2VuSmF2YVNjcmlwdFBhY2thZ2UiLCJmaWxlIiwiaW1hZ2VCYXNlNjQiLCJyZWFkRmlsZVN5bmMiLCJ0b1N0cmluZyIsImFiaSIsInRyaW1SaWdodCIsImpzIiwid3JpdGVGaWxlU3luYyIsImVuY29kaW5nIiwic29sIiwiYXJncyIsIm9wdGlvbnMiLCJjb21waWxlcnMiLCJjcmVhdGUiLCJjb21waWxlciIsImpvYiIsImZpbGVzIiwiZm9yRWFjaCIsImNvcHlGaWxlU3luYyIsImhvc3RQYXRoIiwicHVzaCIsImpvaW4iLCJydW4iLCJsaW5rZXJSZXN1bHQiLCJ0dmNGaWxlIiwiZXhlYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQWVBOztBQUNBOztBQWhCQTs7Ozs7Ozs7Ozs7Ozs7QUFpQkEsSUFBTUEsRUFBRSxHQUFHQyxPQUFPLENBQUMsSUFBRCxDQUFsQjs7QUFFQSxJQUFNQyxPQUFPLEdBQUc7QUFDWkMsRUFBQUEsVUFBVSxFQUFFO0FBQUVDLElBQUFBLEdBQUcsRUFBRSxLQUFQO0FBQWMsYUFBTztBQUFyQixHQURBO0FBRVpDLEVBQUFBLElBQUksRUFBRTtBQUFFRCxJQUFBQSxHQUFHLEVBQUUsS0FBUDtBQUFjLGFBQU87QUFBckI7QUFGTSxDQUFoQjs7QUFLQSxTQUFTRSxvQkFBVCxDQUE4QkMsSUFBOUIsRUFBb0M7QUFDaEMsTUFBTUMsV0FBVyxHQUFHUixFQUFFLENBQUNTLFlBQUgsQ0FBZ0IsK0JBQVlGLElBQVosVUFBaEIsRUFBeUNHLFFBQXpDLENBQWtELFFBQWxELENBQXBCO0FBQ0EsTUFBTUMsR0FBRyxHQUFHWCxFQUFFLENBQUNTLFlBQUgsQ0FBZ0IsK0JBQVlGLElBQVosZUFBaEIsRUFBOENHLFFBQTlDLEdBQXlERSxTQUF6RCxFQUFaO0FBQ0EsTUFBTUMsRUFBRSxtQkFDSE4sSUFERyxtQ0FFREksR0FGQyxrQ0FHUUgsV0FIUix1Q0FNT0QsSUFOUCxlQUFSO0FBUUFQLEVBQUFBLEVBQUUsQ0FBQ2MsYUFBSCxDQUFpQiwrQkFBWVAsSUFBWixnQkFBakIsRUFBZ0RNLEVBQWhELEVBQW9EO0FBQUVFLElBQUFBLFFBQVEsRUFBRTtBQUFaLEdBQXBEO0FBQ0g7O1NBRWNDLEc7Ozs7Ozs7K0JBQWYsaUJBQW1CQyxJQUFuQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDVUMsWUFBQUEsT0FEVixHQUNvQiwwQkFBY0QsSUFBZCxFQUFvQmYsT0FBcEIsQ0FEcEI7QUFBQTtBQUFBLG1CQUcyQmlCLHNCQUFVQyxNQUFWLEVBSDNCOztBQUFBO0FBR1VDLFlBQUFBLFFBSFY7QUFJVUMsWUFBQUEsR0FKVixHQUlnQixFQUpoQjtBQUtJSixZQUFBQSxPQUFPLENBQUNLLEtBQVIsQ0FBY0MsT0FBZCxDQUFzQixVQUFDakIsSUFBRCxFQUFVO0FBQzVCUCxjQUFBQSxFQUFFLENBQUN5QixZQUFILENBQWdCLCtCQUFZbEIsSUFBWixVQUFoQixFQUF5Q2MsUUFBUSxDQUFDSyxRQUFULFdBQXFCbkIsSUFBckIsVUFBekM7QUFDQWUsY0FBQUEsR0FBRyxDQUFDSyxJQUFKLGdCQUNZcEIsSUFEWiwwQkFDZ0NBLElBRGhDLDJCQUVZQSxJQUZaLDhCQUVvQ0EsSUFGcEMsNkNBRzBCQSxJQUgxQiw0REFHZ0ZBLElBSGhGLHlCQUdtR0EsSUFIbkc7QUFLSCxhQVBEO0FBUUFQLFlBQUFBLEVBQUUsQ0FBQ2MsYUFBSCxDQUFpQk8sUUFBUSxDQUFDSyxRQUFULENBQWtCLFFBQWxCLENBQWpCLEVBQThDSixHQUFHLENBQUNNLElBQUosQ0FBUyxJQUFULENBQTlDO0FBYko7QUFBQSxtQkFjVVAsUUFBUSxDQUFDUSxHQUFULENBQWEsSUFBYixFQUFtQixVQUFuQixDQWRWOztBQUFBO0FBZUlYLFlBQUFBLE9BQU8sQ0FBQ0ssS0FBUixDQUFjQyxPQUFkLENBQXNCLFVBQUNqQixJQUFELEVBQVU7QUFDNUIsa0JBQU11QixZQUFZLEdBQUc5QixFQUFFLENBQUNTLFlBQUgsQ0FBZ0JZLFFBQVEsQ0FBQ0ssUUFBVCxXQUFxQm5CLElBQXJCLGFBQWhCLEVBQXFEO0FBQUVRLGdCQUFBQSxRQUFRLEVBQUU7QUFBWixlQUFyRCxDQUFyQjtBQUNBLGtCQUFNZ0IsT0FBTyxHQUFHLENBQUMsdUNBQXVDQyxJQUF2QyxDQUE0Q0YsWUFBNUMsS0FBNkQsRUFBOUQsRUFBa0UsQ0FBbEUsQ0FBaEI7QUFDQTlCLGNBQUFBLEVBQUUsQ0FBQ3lCLFlBQUgsQ0FBZ0JKLFFBQVEsQ0FBQ0ssUUFBVCxDQUFrQkssT0FBbEIsQ0FBaEIsRUFBNEMsK0JBQVl4QixJQUFaLFVBQTVDO0FBQ0FQLGNBQUFBLEVBQUUsQ0FBQ3lCLFlBQUgsQ0FBZ0JKLFFBQVEsQ0FBQ0ssUUFBVCxXQUFxQm5CLElBQXJCLGVBQWhCLEVBQXVELCtCQUFZQSxJQUFaLGVBQXZEOztBQUNBLGtCQUFJVyxPQUFPLENBQUNmLFVBQVosRUFBd0I7QUFDcEJHLGdCQUFBQSxvQkFBb0IsQ0FBQ0MsSUFBRCxDQUFwQjtBQUNIO0FBQ0osYUFSRDs7QUFmSjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuLy8gQGZsb3dcbmltcG9ydCBjb21waWxlcnMgZnJvbSBcIi4vY29tcGlsZXJzXCI7XG5pbXBvcnQgeyBhcmdzVG9PcHRpb25zLCByb290UGF0aCB9IGZyb20gXCIuL3V0aWxzXCI7XG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5cbmNvbnN0IHNvbEFyZ3MgPSB7XG4gICAgamF2YVNjcmlwdDogeyBkZWY6IGZhbHNlLCBzaG9ydDogJ2pzJyB9LFxuICAgIHJ1c3Q6IHsgZGVmOiBmYWxzZSwgc2hvcnQ6ICdycycgfSxcbn07XG5cbmZ1bmN0aW9uIGdlbkphdmFTY3JpcHRQYWNrYWdlKGZpbGUpIHtcbiAgICBjb25zdCBpbWFnZUJhc2U2NCA9IGZzLnJlYWRGaWxlU3luYyhyb290UGF0aChgJHtmaWxlfS50dmNgKSkudG9TdHJpbmcoJ2Jhc2U2NCcpO1xuICAgIGNvbnN0IGFiaSA9IGZzLnJlYWRGaWxlU3luYyhyb290UGF0aChgJHtmaWxlfS5hYmkuanNvbmApKS50b1N0cmluZygpLnRyaW1SaWdodCgpO1xuICAgIGNvbnN0IGpzID1cbmBjb25zdCAke2ZpbGV9UGFja2FnZSA9IHtcbiAgICBhYmk6ICR7YWJpfSxcbiAgICBpbWFnZUJhc2U2NDogJyR7aW1hZ2VCYXNlNjR9J1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSAke2ZpbGV9UGFja2FnZTtcbmA7XG4gICAgZnMud3JpdGVGaWxlU3luYyhyb290UGF0aChgJHtmaWxlfVBhY2thZ2UuanNgKSwganMsIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc29sKGFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IGFyZ3NUb09wdGlvbnMoYXJncywgc29sQXJncyk7XG5cbiAgICBjb25zdCBjb21waWxlciA9IGF3YWl0IGNvbXBpbGVycy5jcmVhdGUoKTtcbiAgICBjb25zdCBqb2IgPSBbXTtcbiAgICBvcHRpb25zLmZpbGVzLmZvckVhY2goKGZpbGUpID0+IHtcbiAgICAgICAgZnMuY29weUZpbGVTeW5jKHJvb3RQYXRoKGAke2ZpbGV9LnNvbGApLCBjb21waWxlci5ob3N0UGF0aChgJHtmaWxlfS5zb2xgKSk7XG4gICAgICAgIGpvYi5wdXNoKFxuICAgICAgICAgICAgYHNvbGMgJHtmaWxlfS5zb2wgLS10dm0gPiAke2ZpbGV9LmNvZGVgLFxuICAgICAgICAgICAgYHNvbGMgJHtmaWxlfS5zb2wgLS10dm1fYWJpID4gJHtmaWxlfS5hYmkuanNvbmAsXG4gICAgICAgICAgICBgdHZtX2xpbmtlciBjb21waWxlICR7ZmlsZX0uY29kZSAtLWxpYiAvdXNyL2Jpbi9zdGRsaWJfc29sLnR2bSAtLWFiaS1qc29uICR7ZmlsZX0uYWJpLmpzb24gPiAke2ZpbGV9LnJlc3VsdGBcbiAgICAgICAgKTtcbiAgICB9KTtcbiAgICBmcy53cml0ZUZpbGVTeW5jKGNvbXBpbGVyLmhvc3RQYXRoKCdqb2Iuc2gnKSwgam9iLmpvaW4oJ1xcbicpKTtcbiAgICBhd2FpdCBjb21waWxlci5ydW4oJ3NoJywgJy4vam9iLnNoJyk7XG4gICAgb3B0aW9ucy5maWxlcy5mb3JFYWNoKChmaWxlKSA9PiB7XG4gICAgICAgIGNvbnN0IGxpbmtlclJlc3VsdCA9IGZzLnJlYWRGaWxlU3luYyhjb21waWxlci5ob3N0UGF0aChgJHtmaWxlfS5yZXN1bHRgKSwgeyBlbmNvZGluZzogJ3V0ZjgnfSk7XG4gICAgICAgIGNvbnN0IHR2Y0ZpbGUgPSAoL1NhdmVkIGNvbnRyYWN0IHRvIGZpbGVcXHMqKC4qXFwudHZjKS9naS5leGVjKGxpbmtlclJlc3VsdCkgfHwgW10pWzFdO1xuICAgICAgICBmcy5jb3B5RmlsZVN5bmMoY29tcGlsZXIuaG9zdFBhdGgodHZjRmlsZSksIHJvb3RQYXRoKGAke2ZpbGV9LnR2Y2ApKTtcbiAgICAgICAgZnMuY29weUZpbGVTeW5jKGNvbXBpbGVyLmhvc3RQYXRoKGAke2ZpbGV9LmFiaS5qc29uYCksIHJvb3RQYXRoKGAke2ZpbGV9LmFiaS5qc29uYCkpO1xuICAgICAgICBpZiAob3B0aW9ucy5qYXZhU2NyaXB0KSB7XG4gICAgICAgICAgICBnZW5KYXZhU2NyaXB0UGFja2FnZShmaWxlKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5leHBvcnQgeyBzb2wgfTtcbiJdfQ==