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
              console.log('>>>', linkerResult);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zb2wuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwic29sQXJncyIsImphdmFTY3JpcHQiLCJkZWYiLCJydXN0Iiwic29sIiwiYXJncyIsIm9wdGlvbnMiLCJjb21waWxlcnMiLCJjcmVhdGUiLCJjb21waWxlciIsImpvYiIsImZpbGVzIiwiZm9yRWFjaCIsImZpbGUiLCJjb3B5RmlsZVN5bmMiLCJob3N0UGF0aCIsInB1c2giLCJ3cml0ZUZpbGVTeW5jIiwiam9pbiIsInJ1biIsImxpbmtlclJlc3VsdCIsInJlYWRGaWxlU3luYyIsImVuY29kaW5nIiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBLElBQU1BLEVBQUUsR0FBR0MsT0FBTyxDQUFDLElBQUQsQ0FBbEI7O0FBRUEsSUFBTUMsT0FBTyxHQUFHO0FBQ1pDLEVBQUFBLFVBQVUsRUFBRTtBQUFFQyxJQUFBQSxHQUFHLEVBQUUsS0FBUDtBQUFjLGFBQU87QUFBckIsR0FEQTtBQUVaQyxFQUFBQSxJQUFJLEVBQUU7QUFBRUQsSUFBQUEsR0FBRyxFQUFFLEtBQVA7QUFBYyxhQUFPO0FBQXJCO0FBRk0sQ0FBaEI7O1NBS2VFLEc7Ozs7Ozs7K0JBQWYsaUJBQW1CQyxJQUFuQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDVUMsWUFBQUEsT0FEVixHQUNvQiwwQkFBY0QsSUFBZCxFQUFvQkwsT0FBcEIsQ0FEcEI7QUFBQTtBQUFBLG1CQUcyQk8sc0JBQVVDLE1BQVYsRUFIM0I7O0FBQUE7QUFHVUMsWUFBQUEsUUFIVjtBQUlVQyxZQUFBQSxHQUpWLEdBSWdCLEVBSmhCO0FBS0lKLFlBQUFBLE9BQU8sQ0FBQ0ssS0FBUixDQUFjQyxPQUFkLENBQXNCLFVBQUNDLElBQUQsRUFBVTtBQUM1QmYsY0FBQUEsRUFBRSxDQUFDZ0IsWUFBSCxDQUFnQiwrQkFBWUQsSUFBWixVQUFoQixFQUF5Q0osUUFBUSxDQUFDTSxRQUFULFdBQXFCRixJQUFyQixVQUF6QztBQUNBSCxjQUFBQSxHQUFHLENBQUNNLElBQUosZ0JBQ1lILElBRFosMEJBQ2dDQSxJQURoQywyQkFFWUEsSUFGWiw4QkFFb0NBLElBRnBDLDZDQUcwQkEsSUFIMUIsNERBR2dGQSxJQUhoRix5QkFHbUdBLElBSG5HO0FBS0gsYUFQRDtBQVFBZixZQUFBQSxFQUFFLENBQUNtQixhQUFILENBQWlCUixRQUFRLENBQUNNLFFBQVQsQ0FBa0IsUUFBbEIsQ0FBakIsRUFBOENMLEdBQUcsQ0FBQ1EsSUFBSixDQUFTLElBQVQsQ0FBOUM7QUFiSjtBQUFBLG1CQWNVVCxRQUFRLENBQUNVLEdBQVQsQ0FBYSxJQUFiLEVBQW1CLFVBQW5CLENBZFY7O0FBQUE7QUFlSWIsWUFBQUEsT0FBTyxDQUFDSyxLQUFSLENBQWNDLE9BQWQsQ0FBc0IsVUFBQ0MsSUFBRCxFQUFVO0FBQzVCLGtCQUFNTyxZQUFZLEdBQUd0QixFQUFFLENBQUN1QixZQUFILENBQWdCWixRQUFRLENBQUNNLFFBQVQsV0FBcUJGLElBQXJCLGFBQWhCLEVBQXFEO0FBQUVTLGdCQUFBQSxRQUFRLEVBQUU7QUFBWixlQUFyRCxDQUFyQjtBQUNBQyxjQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFaLEVBQW1CSixZQUFuQjtBQUNILGFBSEQ7O0FBZko7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb21waWxlcnMgZnJvbSBcIi4vY29tcGlsZXJzXCI7XG5pbXBvcnQgeyBhcmdzVG9PcHRpb25zLCByb290UGF0aCB9IGZyb20gXCIuL3V0aWxzXCI7XG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5cbmNvbnN0IHNvbEFyZ3MgPSB7XG4gICAgamF2YVNjcmlwdDogeyBkZWY6IGZhbHNlLCBzaG9ydDogJ2pzJyB9LFxuICAgIHJ1c3Q6IHsgZGVmOiBmYWxzZSwgc2hvcnQ6ICdycycgfSxcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIHNvbChhcmdzKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IGFyZ3NUb09wdGlvbnMoYXJncywgc29sQXJncyk7XG5cbiAgICBjb25zdCBjb21waWxlciA9IGF3YWl0IGNvbXBpbGVycy5jcmVhdGUoKTtcbiAgICBjb25zdCBqb2IgPSBbXTtcbiAgICBvcHRpb25zLmZpbGVzLmZvckVhY2goKGZpbGUpID0+IHtcbiAgICAgICAgZnMuY29weUZpbGVTeW5jKHJvb3RQYXRoKGAke2ZpbGV9LnNvbGApLCBjb21waWxlci5ob3N0UGF0aChgJHtmaWxlfS5zb2xgKSk7XG4gICAgICAgIGpvYi5wdXNoKFxuICAgICAgICAgICAgYHNvbGMgJHtmaWxlfS5zb2wgLS10dm0gPiAke2ZpbGV9LmNvZGVgLFxuICAgICAgICAgICAgYHNvbGMgJHtmaWxlfS5zb2wgLS10dm1fYWJpID4gJHtmaWxlfS5hYmkuanNvbmAsXG4gICAgICAgICAgICBgdHZtX2xpbmtlciBjb21waWxlICR7ZmlsZX0uY29kZSAtLWxpYiAvdXNyL2Jpbi9zdGRsaWJfc29sLnR2bSAtLWFiaS1qc29uICR7ZmlsZX0uYWJpLmpzb24gPiAke2ZpbGV9LnJlc3VsdGBcbiAgICAgICAgKTtcbiAgICB9KTtcbiAgICBmcy53cml0ZUZpbGVTeW5jKGNvbXBpbGVyLmhvc3RQYXRoKCdqb2Iuc2gnKSwgam9iLmpvaW4oJ1xcbicpKTtcbiAgICBhd2FpdCBjb21waWxlci5ydW4oJ3NoJywgJy4vam9iLnNoJyk7XG4gICAgb3B0aW9ucy5maWxlcy5mb3JFYWNoKChmaWxlKSA9PiB7XG4gICAgICAgIGNvbnN0IGxpbmtlclJlc3VsdCA9IGZzLnJlYWRGaWxlU3luYyhjb21waWxlci5ob3N0UGF0aChgJHtmaWxlfS5yZXN1bHRgKSwgeyBlbmNvZGluZzogJ3V0ZjgnfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCc+Pj4nLCBsaW5rZXJSZXN1bHQpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgeyBzb2wgfTtcbiJdfQ==