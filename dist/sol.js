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
              job.push("solc ".concat(file, ".sol --tvm > ").concat(file, ".code"), "solc ".concat(file, ".sol --tvm_abi > ").concat(file, ".abi.json"), "tvm_linker compile ".concat(file, ".code --lib /usr/bin/stdlib_sol.tvm --abi-json ").concat(file, ".abi.json"));
            });
            fs.writeFileSync(compiler.hostPath('job.sh'), job.join('\n'));
            _context.t0 = console;
            _context.next = 10;
            return compiler.run('sh', './job.sh');

          case 10:
            _context.t1 = _context.sent;

            _context.t0.log.call(_context.t0, _context.t1);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _sol.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zb2wuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwic29sQXJncyIsImphdmFTY3JpcHQiLCJkZWYiLCJydXN0Iiwic29sIiwiYXJncyIsIm9wdGlvbnMiLCJjb21waWxlcnMiLCJjcmVhdGUiLCJjb21waWxlciIsImpvYiIsImZpbGVzIiwiZm9yRWFjaCIsImZpbGUiLCJjb3B5RmlsZVN5bmMiLCJob3N0UGF0aCIsInB1c2giLCJ3cml0ZUZpbGVTeW5jIiwiam9pbiIsImNvbnNvbGUiLCJydW4iLCJsb2ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQSxJQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQUVBLElBQU1DLE9BQU8sR0FBRztBQUNaQyxFQUFBQSxVQUFVLEVBQUU7QUFBRUMsSUFBQUEsR0FBRyxFQUFFLEtBQVA7QUFBYyxhQUFPO0FBQXJCLEdBREE7QUFFWkMsRUFBQUEsSUFBSSxFQUFFO0FBQUVELElBQUFBLEdBQUcsRUFBRSxLQUFQO0FBQWMsYUFBTztBQUFyQjtBQUZNLENBQWhCOztTQUtlRSxHOzs7Ozs7OytCQUFmLGlCQUFtQkMsSUFBbkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1VDLFlBQUFBLE9BRFYsR0FDb0IsMEJBQWNELElBQWQsRUFBb0JMLE9BQXBCLENBRHBCO0FBQUE7QUFBQSxtQkFHMkJPLHNCQUFVQyxNQUFWLEVBSDNCOztBQUFBO0FBR1VDLFlBQUFBLFFBSFY7QUFJVUMsWUFBQUEsR0FKVixHQUlnQixFQUpoQjtBQUtJSixZQUFBQSxPQUFPLENBQUNLLEtBQVIsQ0FBY0MsT0FBZCxDQUFzQixVQUFDQyxJQUFELEVBQVU7QUFDNUJmLGNBQUFBLEVBQUUsQ0FBQ2dCLFlBQUgsQ0FBZ0IsK0JBQVlELElBQVosVUFBaEIsRUFBeUNKLFFBQVEsQ0FBQ00sUUFBVCxXQUFxQkYsSUFBckIsVUFBekM7QUFDQUgsY0FBQUEsR0FBRyxDQUFDTSxJQUFKLGdCQUNZSCxJQURaLDBCQUNnQ0EsSUFEaEMsMkJBRVlBLElBRlosOEJBRW9DQSxJQUZwQyw2Q0FHMEJBLElBSDFCLDREQUdnRkEsSUFIaEY7QUFLSCxhQVBEO0FBUUFmLFlBQUFBLEVBQUUsQ0FBQ21CLGFBQUgsQ0FBaUJSLFFBQVEsQ0FBQ00sUUFBVCxDQUFrQixRQUFsQixDQUFqQixFQUE4Q0wsR0FBRyxDQUFDUSxJQUFKLENBQVMsSUFBVCxDQUE5QztBQWJKLDBCQWNJQyxPQWRKO0FBQUE7QUFBQSxtQkFjc0JWLFFBQVEsQ0FBQ1csR0FBVCxDQUFhLElBQWIsRUFBbUIsVUFBbkIsQ0FkdEI7O0FBQUE7QUFBQTs7QUFBQSx3QkFjWUMsR0FkWjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvbXBpbGVycyBmcm9tIFwiLi9jb21waWxlcnNcIjtcbmltcG9ydCB7IGFyZ3NUb09wdGlvbnMsIHJvb3RQYXRoIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcblxuY29uc3Qgc29sQXJncyA9IHtcbiAgICBqYXZhU2NyaXB0OiB7IGRlZjogZmFsc2UsIHNob3J0OiAnanMnIH0sXG4gICAgcnVzdDogeyBkZWY6IGZhbHNlLCBzaG9ydDogJ3JzJyB9LFxufTtcblxuYXN5bmMgZnVuY3Rpb24gc29sKGFyZ3MpIHtcbiAgICBjb25zdCBvcHRpb25zID0gYXJnc1RvT3B0aW9ucyhhcmdzLCBzb2xBcmdzKTtcblxuICAgIGNvbnN0IGNvbXBpbGVyID0gYXdhaXQgY29tcGlsZXJzLmNyZWF0ZSgpO1xuICAgIGNvbnN0IGpvYiA9IFtdO1xuICAgIG9wdGlvbnMuZmlsZXMuZm9yRWFjaCgoZmlsZSkgPT4ge1xuICAgICAgICBmcy5jb3B5RmlsZVN5bmMocm9vdFBhdGgoYCR7ZmlsZX0uc29sYCksIGNvbXBpbGVyLmhvc3RQYXRoKGAke2ZpbGV9LnNvbGApKTtcbiAgICAgICAgam9iLnB1c2goXG4gICAgICAgICAgICBgc29sYyAke2ZpbGV9LnNvbCAtLXR2bSA+ICR7ZmlsZX0uY29kZWAsXG4gICAgICAgICAgICBgc29sYyAke2ZpbGV9LnNvbCAtLXR2bV9hYmkgPiAke2ZpbGV9LmFiaS5qc29uYCxcbiAgICAgICAgICAgIGB0dm1fbGlua2VyIGNvbXBpbGUgJHtmaWxlfS5jb2RlIC0tbGliIC91c3IvYmluL3N0ZGxpYl9zb2wudHZtIC0tYWJpLWpzb24gJHtmaWxlfS5hYmkuanNvbmBcbiAgICAgICAgKTtcbiAgICB9KTtcbiAgICBmcy53cml0ZUZpbGVTeW5jKGNvbXBpbGVyLmhvc3RQYXRoKCdqb2Iuc2gnKSwgam9iLmpvaW4oJ1xcbicpKTtcbiAgICBjb25zb2xlLmxvZyhhd2FpdCBjb21waWxlci5ydW4oJ3NoJywgJy4vam9iLnNoJykpO1xuICAgIC8vIGNvbnNvbGUubG9nKCdzb2wnLCBhcmdzKTtcbn1cblxuZXhwb3J0IHsgc29sIH07XG4iXX0=