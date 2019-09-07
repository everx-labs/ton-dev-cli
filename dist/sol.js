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
  var abi = fs.readFileSync((0, _utils.rootPath)("".concat(file, ".abi.json"))).toString().trimEnd();
  var js = "const ".concat(file, "Package = {\n    abi: ").concat(abi, ",\n    imageBase64: '").concat(imageBase64, "'\n};\n\nexport default ").concat(file, "Package;\n");
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
              var tvcFile = /Saved contract to file\s*(.*\.tvc)/gi.exec(linkerResult)[1];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zb2wuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwic29sQXJncyIsImphdmFTY3JpcHQiLCJkZWYiLCJydXN0IiwiZ2VuSmF2YVNjcmlwdFBhY2thZ2UiLCJmaWxlIiwiaW1hZ2VCYXNlNjQiLCJyZWFkRmlsZVN5bmMiLCJ0b1N0cmluZyIsImFiaSIsInRyaW1FbmQiLCJqcyIsIndyaXRlRmlsZVN5bmMiLCJlbmNvZGluZyIsInNvbCIsImFyZ3MiLCJvcHRpb25zIiwiY29tcGlsZXJzIiwiY3JlYXRlIiwiY29tcGlsZXIiLCJqb2IiLCJmaWxlcyIsImZvckVhY2giLCJjb3B5RmlsZVN5bmMiLCJob3N0UGF0aCIsInB1c2giLCJqb2luIiwicnVuIiwibGlua2VyUmVzdWx0IiwidHZjRmlsZSIsImV4ZWMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQSxJQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQUVBLElBQU1DLE9BQU8sR0FBRztBQUNaQyxFQUFBQSxVQUFVLEVBQUU7QUFBRUMsSUFBQUEsR0FBRyxFQUFFLEtBQVA7QUFBYyxhQUFPO0FBQXJCLEdBREE7QUFFWkMsRUFBQUEsSUFBSSxFQUFFO0FBQUVELElBQUFBLEdBQUcsRUFBRSxLQUFQO0FBQWMsYUFBTztBQUFyQjtBQUZNLENBQWhCOztBQUtBLFNBQVNFLG9CQUFULENBQThCQyxJQUE5QixFQUFvQztBQUNoQyxNQUFNQyxXQUFXLEdBQUdSLEVBQUUsQ0FBQ1MsWUFBSCxDQUFnQiwrQkFBWUYsSUFBWixVQUFoQixFQUF5Q0csUUFBekMsQ0FBa0QsUUFBbEQsQ0FBcEI7QUFDQSxNQUFNQyxHQUFHLEdBQUdYLEVBQUUsQ0FBQ1MsWUFBSCxDQUFnQiwrQkFBWUYsSUFBWixlQUFoQixFQUE4Q0csUUFBOUMsR0FBeURFLE9BQXpELEVBQVo7QUFDQSxNQUFNQyxFQUFFLG1CQUNITixJQURHLG1DQUVESSxHQUZDLGtDQUdRSCxXQUhSLHFDQU1LRCxJQU5MLGVBQVI7QUFRQVAsRUFBQUEsRUFBRSxDQUFDYyxhQUFILENBQWlCLCtCQUFZUCxJQUFaLGdCQUFqQixFQUFnRE0sRUFBaEQsRUFBb0Q7QUFBRUUsSUFBQUEsUUFBUSxFQUFFO0FBQVosR0FBcEQ7QUFDSDs7U0FFY0MsRzs7Ozs7OzsrQkFBZixpQkFBbUJDLElBQW5CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNVQyxZQUFBQSxPQURWLEdBQ29CLDBCQUFjRCxJQUFkLEVBQW9CZixPQUFwQixDQURwQjtBQUFBO0FBQUEsbUJBRzJCaUIsc0JBQVVDLE1BQVYsRUFIM0I7O0FBQUE7QUFHVUMsWUFBQUEsUUFIVjtBQUlVQyxZQUFBQSxHQUpWLEdBSWdCLEVBSmhCO0FBS0lKLFlBQUFBLE9BQU8sQ0FBQ0ssS0FBUixDQUFjQyxPQUFkLENBQXNCLFVBQUNqQixJQUFELEVBQVU7QUFDNUJQLGNBQUFBLEVBQUUsQ0FBQ3lCLFlBQUgsQ0FBZ0IsK0JBQVlsQixJQUFaLFVBQWhCLEVBQXlDYyxRQUFRLENBQUNLLFFBQVQsV0FBcUJuQixJQUFyQixVQUF6QztBQUNBZSxjQUFBQSxHQUFHLENBQUNLLElBQUosZ0JBQ1lwQixJQURaLDBCQUNnQ0EsSUFEaEMsMkJBRVlBLElBRlosOEJBRW9DQSxJQUZwQyw2Q0FHMEJBLElBSDFCLDREQUdnRkEsSUFIaEYseUJBR21HQSxJQUhuRztBQUtILGFBUEQ7QUFRQVAsWUFBQUEsRUFBRSxDQUFDYyxhQUFILENBQWlCTyxRQUFRLENBQUNLLFFBQVQsQ0FBa0IsUUFBbEIsQ0FBakIsRUFBOENKLEdBQUcsQ0FBQ00sSUFBSixDQUFTLElBQVQsQ0FBOUM7QUFiSjtBQUFBLG1CQWNVUCxRQUFRLENBQUNRLEdBQVQsQ0FBYSxJQUFiLEVBQW1CLFVBQW5CLENBZFY7O0FBQUE7QUFlSVgsWUFBQUEsT0FBTyxDQUFDSyxLQUFSLENBQWNDLE9BQWQsQ0FBc0IsVUFBQ2pCLElBQUQsRUFBVTtBQUM1QixrQkFBTXVCLFlBQVksR0FBRzlCLEVBQUUsQ0FBQ1MsWUFBSCxDQUFnQlksUUFBUSxDQUFDSyxRQUFULFdBQXFCbkIsSUFBckIsYUFBaEIsRUFBcUQ7QUFBRVEsZ0JBQUFBLFFBQVEsRUFBRTtBQUFaLGVBQXJELENBQXJCO0FBQ0Esa0JBQU1nQixPQUFPLEdBQUcsdUNBQXVDQyxJQUF2QyxDQUE0Q0YsWUFBNUMsRUFBMEQsQ0FBMUQsQ0FBaEI7QUFDQTlCLGNBQUFBLEVBQUUsQ0FBQ3lCLFlBQUgsQ0FBZ0JKLFFBQVEsQ0FBQ0ssUUFBVCxDQUFrQkssT0FBbEIsQ0FBaEIsRUFBNEMsK0JBQVl4QixJQUFaLFVBQTVDO0FBQ0FQLGNBQUFBLEVBQUUsQ0FBQ3lCLFlBQUgsQ0FBZ0JKLFFBQVEsQ0FBQ0ssUUFBVCxXQUFxQm5CLElBQXJCLGVBQWhCLEVBQXVELCtCQUFZQSxJQUFaLGVBQXZEOztBQUNBLGtCQUFJVyxPQUFPLENBQUNmLFVBQVosRUFBd0I7QUFDcEJHLGdCQUFBQSxvQkFBb0IsQ0FBQ0MsSUFBRCxDQUFwQjtBQUNIO0FBQ0osYUFSRDs7QUFmSjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvbXBpbGVycyBmcm9tIFwiLi9jb21waWxlcnNcIjtcbmltcG9ydCB7IGFyZ3NUb09wdGlvbnMsIHJvb3RQYXRoIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcblxuY29uc3Qgc29sQXJncyA9IHtcbiAgICBqYXZhU2NyaXB0OiB7IGRlZjogZmFsc2UsIHNob3J0OiAnanMnIH0sXG4gICAgcnVzdDogeyBkZWY6IGZhbHNlLCBzaG9ydDogJ3JzJyB9LFxufTtcblxuZnVuY3Rpb24gZ2VuSmF2YVNjcmlwdFBhY2thZ2UoZmlsZSkge1xuICAgIGNvbnN0IGltYWdlQmFzZTY0ID0gZnMucmVhZEZpbGVTeW5jKHJvb3RQYXRoKGAke2ZpbGV9LnR2Y2ApKS50b1N0cmluZygnYmFzZTY0Jyk7XG4gICAgY29uc3QgYWJpID0gZnMucmVhZEZpbGVTeW5jKHJvb3RQYXRoKGAke2ZpbGV9LmFiaS5qc29uYCkpLnRvU3RyaW5nKCkudHJpbUVuZCgpO1xuICAgIGNvbnN0IGpzID1cbmBjb25zdCAke2ZpbGV9UGFja2FnZSA9IHtcbiAgICBhYmk6ICR7YWJpfSxcbiAgICBpbWFnZUJhc2U2NDogJyR7aW1hZ2VCYXNlNjR9J1xufTtcblxuZXhwb3J0IGRlZmF1bHQgJHtmaWxlfVBhY2thZ2U7XG5gO1xuICAgIGZzLndyaXRlRmlsZVN5bmMocm9vdFBhdGgoYCR7ZmlsZX1QYWNrYWdlLmpzYCksIGpzLCB7IGVuY29kaW5nOiAndXRmOCcgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNvbChhcmdzKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IGFyZ3NUb09wdGlvbnMoYXJncywgc29sQXJncyk7XG5cbiAgICBjb25zdCBjb21waWxlciA9IGF3YWl0IGNvbXBpbGVycy5jcmVhdGUoKTtcbiAgICBjb25zdCBqb2IgPSBbXTtcbiAgICBvcHRpb25zLmZpbGVzLmZvckVhY2goKGZpbGUpID0+IHtcbiAgICAgICAgZnMuY29weUZpbGVTeW5jKHJvb3RQYXRoKGAke2ZpbGV9LnNvbGApLCBjb21waWxlci5ob3N0UGF0aChgJHtmaWxlfS5zb2xgKSk7XG4gICAgICAgIGpvYi5wdXNoKFxuICAgICAgICAgICAgYHNvbGMgJHtmaWxlfS5zb2wgLS10dm0gPiAke2ZpbGV9LmNvZGVgLFxuICAgICAgICAgICAgYHNvbGMgJHtmaWxlfS5zb2wgLS10dm1fYWJpID4gJHtmaWxlfS5hYmkuanNvbmAsXG4gICAgICAgICAgICBgdHZtX2xpbmtlciBjb21waWxlICR7ZmlsZX0uY29kZSAtLWxpYiAvdXNyL2Jpbi9zdGRsaWJfc29sLnR2bSAtLWFiaS1qc29uICR7ZmlsZX0uYWJpLmpzb24gPiAke2ZpbGV9LnJlc3VsdGBcbiAgICAgICAgKTtcbiAgICB9KTtcbiAgICBmcy53cml0ZUZpbGVTeW5jKGNvbXBpbGVyLmhvc3RQYXRoKCdqb2Iuc2gnKSwgam9iLmpvaW4oJ1xcbicpKTtcbiAgICBhd2FpdCBjb21waWxlci5ydW4oJ3NoJywgJy4vam9iLnNoJyk7XG4gICAgb3B0aW9ucy5maWxlcy5mb3JFYWNoKChmaWxlKSA9PiB7XG4gICAgICAgIGNvbnN0IGxpbmtlclJlc3VsdCA9IGZzLnJlYWRGaWxlU3luYyhjb21waWxlci5ob3N0UGF0aChgJHtmaWxlfS5yZXN1bHRgKSwgeyBlbmNvZGluZzogJ3V0ZjgnfSk7XG4gICAgICAgIGNvbnN0IHR2Y0ZpbGUgPSAvU2F2ZWQgY29udHJhY3QgdG8gZmlsZVxccyooLipcXC50dmMpL2dpLmV4ZWMobGlua2VyUmVzdWx0KVsxXTtcbiAgICAgICAgZnMuY29weUZpbGVTeW5jKGNvbXBpbGVyLmhvc3RQYXRoKHR2Y0ZpbGUpLCByb290UGF0aChgJHtmaWxlfS50dmNgKSk7XG4gICAgICAgIGZzLmNvcHlGaWxlU3luYyhjb21waWxlci5ob3N0UGF0aChgJHtmaWxlfS5hYmkuanNvbmApLCByb290UGF0aChgJHtmaWxlfS5hYmkuanNvbmApKTtcbiAgICAgICAgaWYgKG9wdGlvbnMuamF2YVNjcmlwdCkge1xuICAgICAgICAgICAgZ2VuSmF2YVNjcmlwdFBhY2thZ2UoZmlsZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZXhwb3J0IHsgc29sIH07XG4iXX0=