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
              fs.copyFileSync((0, _utils.rootPath)("".concat(file, ".sol")), compiler.hostPath("".concat(file, ".sol")));
              job.push("solc ".concat(file, ".sol --tvm > ").concat(file, ".code"), "solc ".concat(file, ".sol --tvm_abi > ").concat(file, ".abi.json"), "tvm_linker compile ".concat(file, ".code --lib /usr/bin/stdlib_sol.tvm --abi-json ").concat(file, ".abi.json > ").concat(file, ".result"));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zb2wuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwic29sQXJncyIsImphdmFTY3JpcHQiLCJkZWYiLCJydXN0Iiwic29sIiwiYXJncyIsIm9wdGlvbnMiLCJjb21waWxlcnMiLCJjcmVhdGUiLCJjb21waWxlciIsImpvYiIsImZpbGVzIiwiZm9yRWFjaCIsImZpbGUiLCJjb3B5RmlsZVN5bmMiLCJob3N0UGF0aCIsInB1c2giLCJ3cml0ZUZpbGVTeW5jIiwiam9pbiIsInJ1biJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBLElBQU1BLEVBQUUsR0FBR0MsT0FBTyxDQUFDLElBQUQsQ0FBbEI7O0FBRUEsSUFBTUMsT0FBTyxHQUFHO0FBQ1pDLEVBQUFBLFVBQVUsRUFBRTtBQUFFQyxJQUFBQSxHQUFHLEVBQUUsS0FBUDtBQUFjLGFBQU87QUFBckIsR0FEQTtBQUVaQyxFQUFBQSxJQUFJLEVBQUU7QUFBRUQsSUFBQUEsR0FBRyxFQUFFLEtBQVA7QUFBYyxhQUFPO0FBQXJCO0FBRk0sQ0FBaEI7O1NBS2VFLEc7Ozs7Ozs7K0JBQWYsaUJBQW1CQyxJQUFuQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDVUMsWUFBQUEsT0FEVixHQUNvQiwwQkFBY0QsSUFBZCxFQUFvQkwsT0FBcEIsQ0FEcEI7QUFBQTtBQUFBLG1CQUcyQk8sc0JBQVVDLE1BQVYsRUFIM0I7O0FBQUE7QUFHVUMsWUFBQUEsUUFIVjtBQUlVQyxZQUFBQSxHQUpWLEdBSWdCLEVBSmhCO0FBS0lKLFlBQUFBLE9BQU8sQ0FBQ0ssS0FBUixDQUFjQyxPQUFkLENBQXNCLFVBQUNDLElBQUQsRUFBVTtBQUM1QmYsY0FBQUEsRUFBRSxDQUFDZ0IsWUFBSCxDQUFnQiwrQkFBWUQsSUFBWixVQUFoQixFQUF5Q0osUUFBUSxDQUFDTSxRQUFULFdBQXFCRixJQUFyQixVQUF6QztBQUNBSCxjQUFBQSxHQUFHLENBQUNNLElBQUosZ0JBQ1lILElBRFosMEJBQ2dDQSxJQURoQywyQkFFWUEsSUFGWiw4QkFFb0NBLElBRnBDLDZDQUcwQkEsSUFIMUIsNERBR2dGQSxJQUhoRix5QkFHbUdBLElBSG5HO0FBS0gsYUFQRDtBQVFBZixZQUFBQSxFQUFFLENBQUNtQixhQUFILENBQWlCUixRQUFRLENBQUNNLFFBQVQsQ0FBa0IsUUFBbEIsQ0FBakIsRUFBOENMLEdBQUcsQ0FBQ1EsSUFBSixDQUFTLElBQVQsQ0FBOUM7QUFiSjtBQUFBLG1CQWNVVCxRQUFRLENBQUNVLEdBQVQsQ0FBYSxJQUFiLEVBQW1CLFVBQW5CLENBZFY7O0FBQUE7QUFlSWIsWUFBQUEsT0FBTyxDQUFDSyxLQUFSLENBQWNDLE9BQWQsQ0FBc0IsVUFBQ0MsSUFBRCxFQUFVO0FBQzVCZixjQUFBQSxFQUFFLENBQUNnQixZQUFILENBQWdCLCtCQUFZRCxJQUFaLFVBQWhCLEVBQXlDSixRQUFRLENBQUNNLFFBQVQsV0FBcUJGLElBQXJCLFVBQXpDO0FBQ0FILGNBQUFBLEdBQUcsQ0FBQ00sSUFBSixnQkFDWUgsSUFEWiwwQkFDZ0NBLElBRGhDLDJCQUVZQSxJQUZaLDhCQUVvQ0EsSUFGcEMsNkNBRzBCQSxJQUgxQiw0REFHZ0ZBLElBSGhGLHlCQUdtR0EsSUFIbkc7QUFLSCxhQVBEOztBQWZKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY29tcGlsZXJzIGZyb20gXCIuL2NvbXBpbGVyc1wiO1xuaW1wb3J0IHsgYXJnc1RvT3B0aW9ucywgcm9vdFBhdGggfSBmcm9tIFwiLi91dGlsc1wiO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuXG5jb25zdCBzb2xBcmdzID0ge1xuICAgIGphdmFTY3JpcHQ6IHsgZGVmOiBmYWxzZSwgc2hvcnQ6ICdqcycgfSxcbiAgICBydXN0OiB7IGRlZjogZmFsc2UsIHNob3J0OiAncnMnIH0sXG59O1xuXG5hc3luYyBmdW5jdGlvbiBzb2woYXJncykge1xuICAgIGNvbnN0IG9wdGlvbnMgPSBhcmdzVG9PcHRpb25zKGFyZ3MsIHNvbEFyZ3MpO1xuXG4gICAgY29uc3QgY29tcGlsZXIgPSBhd2FpdCBjb21waWxlcnMuY3JlYXRlKCk7XG4gICAgY29uc3Qgam9iID0gW107XG4gICAgb3B0aW9ucy5maWxlcy5mb3JFYWNoKChmaWxlKSA9PiB7XG4gICAgICAgIGZzLmNvcHlGaWxlU3luYyhyb290UGF0aChgJHtmaWxlfS5zb2xgKSwgY29tcGlsZXIuaG9zdFBhdGgoYCR7ZmlsZX0uc29sYCkpO1xuICAgICAgICBqb2IucHVzaChcbiAgICAgICAgICAgIGBzb2xjICR7ZmlsZX0uc29sIC0tdHZtID4gJHtmaWxlfS5jb2RlYCxcbiAgICAgICAgICAgIGBzb2xjICR7ZmlsZX0uc29sIC0tdHZtX2FiaSA+ICR7ZmlsZX0uYWJpLmpzb25gLFxuICAgICAgICAgICAgYHR2bV9saW5rZXIgY29tcGlsZSAke2ZpbGV9LmNvZGUgLS1saWIgL3Vzci9iaW4vc3RkbGliX3NvbC50dm0gLS1hYmktanNvbiAke2ZpbGV9LmFiaS5qc29uID4gJHtmaWxlfS5yZXN1bHRgXG4gICAgICAgICk7XG4gICAgfSk7XG4gICAgZnMud3JpdGVGaWxlU3luYyhjb21waWxlci5ob3N0UGF0aCgnam9iLnNoJyksIGpvYi5qb2luKCdcXG4nKSk7XG4gICAgYXdhaXQgY29tcGlsZXIucnVuKCdzaCcsICcuL2pvYi5zaCcpO1xuICAgIG9wdGlvbnMuZmlsZXMuZm9yRWFjaCgoZmlsZSkgPT4ge1xuICAgICAgICBmcy5jb3B5RmlsZVN5bmMocm9vdFBhdGgoYCR7ZmlsZX0uc29sYCksIGNvbXBpbGVyLmhvc3RQYXRoKGAke2ZpbGV9LnNvbGApKTtcbiAgICAgICAgam9iLnB1c2goXG4gICAgICAgICAgICBgc29sYyAke2ZpbGV9LnNvbCAtLXR2bSA+ICR7ZmlsZX0uY29kZWAsXG4gICAgICAgICAgICBgc29sYyAke2ZpbGV9LnNvbCAtLXR2bV9hYmkgPiAke2ZpbGV9LmFiaS5qc29uYCxcbiAgICAgICAgICAgIGB0dm1fbGlua2VyIGNvbXBpbGUgJHtmaWxlfS5jb2RlIC0tbGliIC91c3IvYmluL3N0ZGxpYl9zb2wudHZtIC0tYWJpLWpzb24gJHtmaWxlfS5hYmkuanNvbiA+ICR7ZmlsZX0ucmVzdWx0YFxuICAgICAgICApO1xuICAgIH0pO1xufVxuXG5leHBvcnQgeyBzb2wgfTtcbiJdfQ==