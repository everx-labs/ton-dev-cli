"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sol = sol;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _compilers = _interopRequireDefault(require("./compilers"));

var _texts = require("./texts");

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
var os = require('os');

var fs = require('fs');

var path = require('path');

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

function parseFileArg(fileArg) {
  if (os.platform() === 'darwin' && fileArg.startsWith('~/')) {
    fileArg = path.join(os.homedir(), fileArg.substr(2));
  }

  var filePath = path.resolve(fileArg);
  var dir = (0, _utils.bindPathJoinTo)(path.dirname(filePath));
  var base = path.basename(filePath, '.sol');
  var result = {
    dir: dir,
    name: {
      base: base,
      sol: "".concat(base, ".sol"),
      tvc: "".concat(base, ".tvc"),
      code: "".concat(base, ".code"),
      abi: "".concat(base, ".abi.json"),
      "package": "".concat(base, "Package"),
      result: "".concat(base, ".result")
    }
  };

  if (!fs.existsSync(result.dir(result.name.sol))) {
    console.error(_texts.texts.sourceFileNotFound(result.name.sol));
    process.exit(1);
  }

  return result;
}

function genJavaScriptPackage(fileArg) {
  var _parseFileArg = parseFileArg(fileArg),
      dir = _parseFileArg.dir,
      name = _parseFileArg.name;

  var imageBase64 = fs.readFileSync(dir(name.tvc)).toString('base64');
  var abi = fs.readFileSync(dir(name.abi)).toString().trimRight();
  var js = "const ".concat(name["package"], " = {\n    abi: ").concat(abi, ",\n    imageBase64: '").concat(imageBase64, "'\n};\n\nmodule.exports = ").concat(name["package"], ";\n");
  fs.writeFileSync(dir("".concat(name["package"], ".js")), js, {
    encoding: 'utf8'
  });
}

function prepareBuildJobForFie(file, job, options, srcJobPath) {
  var _parseFileArg2 = parseFileArg(file),
      dir = _parseFileArg2.dir,
      name = _parseFileArg2.name;

  fs.copyFileSync(dir(name.sol), srcJobPath(name.sol));
  job.push("solc ".concat(name.sol, " --tvm > ").concat(name.code), "solc ".concat(name.sol, " --tvm_abi > ").concat(name.abi), "tvm_linker compile ".concat(name.code, " --lib /usr/bin/stdlib_sol.tvm --abi-json ").concat(name.abi, " > ").concat(name.result));
}

function prepareBuildJob(options, srcJobPath, dstJobPath) {
  var job = [];
  job.push("cd ".concat(dstJobPath()));
  options.files.forEach(function (file) {
    return prepareBuildJobForFie(file, job, options, srcJobPath);
  });
  fs.writeFileSync(srcJobPath('job.sh'), job.join('\n'));
}

function completeBuild(options, srcJobPath) {
  options.files.forEach(function (fileArg) {
    var _parseFileArg3 = parseFileArg(fileArg),
        dir = _parseFileArg3.dir,
        name = _parseFileArg3.name;

    var linkerResult = fs.readFileSync(srcJobPath(name.result), {
      encoding: 'utf8'
    });
    var tvcFile = (/Saved contract to file\s*(.*\.tvc)/gi.exec(linkerResult) || [])[1];

    if (tvcFile) {
      fs.copyFileSync(srcJobPath(tvcFile), dir(name.tvc));
      fs.copyFileSync(srcJobPath(name.abi), dir(name.abi));

      if (options.javaScript) {
        genJavaScriptPackage(fileArg);
      }
    } else {
      console.log(linkerResult);
      process.exit();
    }
  });
}

function sol(_x) {
  return _sol.apply(this, arguments);
}

function _sol() {
  _sol = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(args) {
    var options, compiler;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = (0, _utils.argsToOptions)(args, solArgs);
            _context.next = 3;
            return _compilers["default"].create();

          case 3:
            compiler = _context.sent;
            prepareBuildJob(options, compiler.srcJobPath, compiler.dstJobPath);
            _context.next = 7;
            return compiler.run('sh', "".concat(compiler.dstJobPath(), "/job.sh"));

          case 7:
            completeBuild(options, compiler.srcJobPath);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _sol.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zb2wuanMiXSwibmFtZXMiOlsib3MiLCJyZXF1aXJlIiwiZnMiLCJwYXRoIiwic29sQXJncyIsImphdmFTY3JpcHQiLCJkZWYiLCJydXN0IiwicGFyc2VGaWxlQXJnIiwiZmlsZUFyZyIsInBsYXRmb3JtIiwic3RhcnRzV2l0aCIsImpvaW4iLCJob21lZGlyIiwic3Vic3RyIiwiZmlsZVBhdGgiLCJyZXNvbHZlIiwiZGlyIiwiZGlybmFtZSIsImJhc2UiLCJiYXNlbmFtZSIsInJlc3VsdCIsIm5hbWUiLCJzb2wiLCJ0dmMiLCJjb2RlIiwiYWJpIiwiZXhpc3RzU3luYyIsImNvbnNvbGUiLCJlcnJvciIsInRleHRzIiwic291cmNlRmlsZU5vdEZvdW5kIiwicHJvY2VzcyIsImV4aXQiLCJnZW5KYXZhU2NyaXB0UGFja2FnZSIsImltYWdlQmFzZTY0IiwicmVhZEZpbGVTeW5jIiwidG9TdHJpbmciLCJ0cmltUmlnaHQiLCJqcyIsIndyaXRlRmlsZVN5bmMiLCJlbmNvZGluZyIsInByZXBhcmVCdWlsZEpvYkZvckZpZSIsImZpbGUiLCJqb2IiLCJvcHRpb25zIiwic3JjSm9iUGF0aCIsImNvcHlGaWxlU3luYyIsInB1c2giLCJwcmVwYXJlQnVpbGRKb2IiLCJkc3RKb2JQYXRoIiwiZmlsZXMiLCJmb3JFYWNoIiwiY29tcGxldGVCdWlsZCIsImxpbmtlclJlc3VsdCIsInR2Y0ZpbGUiLCJleGVjIiwibG9nIiwiYXJncyIsImNvbXBpbGVycyIsImNyZWF0ZSIsImNvbXBpbGVyIiwicnVuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBZUE7O0FBQ0E7O0FBQ0E7O0FBakJBOzs7Ozs7Ozs7Ozs7OztBQW1CQSxJQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQUNBLElBQU1DLEVBQUUsR0FBR0QsT0FBTyxDQUFDLElBQUQsQ0FBbEI7O0FBQ0EsSUFBTUUsSUFBSSxHQUFHRixPQUFPLENBQUMsTUFBRCxDQUFwQjs7QUFFQSxJ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O0FBR0laLFlBQUFBLGVBQWUsQ0FBQ0osT0FBRCxFQUFVZ0IsUUFBUSxDQUFDZixVQUFuQixFQUErQmUsUUFBUSxDQUFDWCxVQUF4QyxDQUFmO0FBSEo7QUFBQSxtQkFJVVcsUUFBUSxDQUFDQyxHQUFULENBQWEsSUFBYixZQUFzQkQsUUFBUSxDQUFDWCxVQUFULEVBQXRCLGFBSlY7O0FBQUE7QUFLSUcsWUFBQUEsYUFBYSxDQUFDUixPQUFELEVBQVVnQixRQUFRLENBQUNmLFVBQW5CLENBQWI7O0FBTEo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOC0yMDE5IFRPTiBERVYgU09MVVRJT05TIExURC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgU09GVFdBUkUgRVZBTFVBVElPTiBMaWNlbnNlICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbiAqIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxuICogTGljZW5zZSBhdDogaHR0cHM6Ly93d3cudG9uLmRldi9saWNlbnNlc1xuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgVE9OIERFViBzb2Z0d2FyZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbi8vIEBmbG93XG5pbXBvcnQgY29tcGlsZXJzIGZyb20gXCIuL2NvbXBpbGVyc1wiO1xuaW1wb3J0IHt0ZXh0c30gZnJvbSAnLi90ZXh0cyc7XG5pbXBvcnQgeyBhcmdzVG9PcHRpb25zLCBiaW5kUGF0aEpvaW5UbyB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmNvbnN0IG9zID0gcmVxdWlyZSgnb3MnKTtcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5cbmNvbnN0IHNvbEFyZ3MgPSB7XG4gICAgamF2YVNjcmlwdDogeyBkZWY6IGZhbHNlLCBzaG9ydDogJ2pzJyB9LFxuICAgIHJ1c3Q6IHsgZGVmOiBmYWxzZSwgc2hvcnQ6ICdycycgfSxcbn07XG5cbmZ1bmN0aW9uIHBhcnNlRmlsZUFyZyhmaWxlQXJnKSB7XG4gICAgaWYgKG9zLnBsYXRmb3JtKCkgPT09ICdkYXJ3aW4nICYmIGZpbGVBcmcuc3RhcnRzV2l0aCgnfi8nKSkge1xuICAgICAgICBmaWxlQXJnID0gcGF0aC5qb2luKG9zLmhvbWVkaXIoKSwgZmlsZUFyZy5zdWJzdHIoMikpO1xuICAgIH1cbiAgICBjb25zdCBmaWxlUGF0aCA9IHBhdGgucmVzb2x2ZShmaWxlQXJnKTtcbiAgICBjb25zdCBkaXIgPSBiaW5kUGF0aEpvaW5UbyhwYXRoLmRpcm5hbWUoZmlsZVBhdGgpKTtcbiAgICBsZXQgYmFzZSA9IHBhdGguYmFzZW5hbWUoZmlsZVBhdGgsICcuc29sJyk7XG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgICBkaXIsXG4gICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgIGJhc2UsXG4gICAgICAgICAgICBzb2w6IGAke2Jhc2V9LnNvbGAsXG4gICAgICAgICAgICB0dmM6IGAke2Jhc2V9LnR2Y2AsXG4gICAgICAgICAgICBjb2RlOiBgJHtiYXNlfS5jb2RlYCxcbiAgICAgICAgICAgIGFiaTogYCR7YmFzZX0uYWJpLmpzb25gLFxuICAgICAgICAgICAgcGFja2FnZTogYCR7YmFzZX1QYWNrYWdlYCxcbiAgICAgICAgICAgIHJlc3VsdDogYCR7YmFzZX0ucmVzdWx0YCxcbiAgICAgICAgfSxcbiAgICB9O1xuICAgIGlmICghZnMuZXhpc3RzU3luYyhyZXN1bHQuZGlyKHJlc3VsdC5uYW1lLnNvbCkpKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IodGV4dHMuc291cmNlRmlsZU5vdEZvdW5kKHJlc3VsdC5uYW1lLnNvbCkpO1xuICAgICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGdlbkphdmFTY3JpcHRQYWNrYWdlKGZpbGVBcmcpIHtcbiAgICBjb25zdCB7ZGlyLCBuYW1lfSA9IHBhcnNlRmlsZUFyZyhmaWxlQXJnKTtcbiAgICBjb25zdCBpbWFnZUJhc2U2NCA9IGZzLnJlYWRGaWxlU3luYyhkaXIobmFtZS50dmMpKS50b1N0cmluZygnYmFzZTY0Jyk7XG4gICAgY29uc3QgYWJpID0gZnMucmVhZEZpbGVTeW5jKGRpcihuYW1lLmFiaSkpLnRvU3RyaW5nKCkudHJpbVJpZ2h0KCk7XG4gICAgY29uc3QganMgPVxuICAgICAgICBgY29uc3QgJHtuYW1lLnBhY2thZ2V9ID0ge1xuICAgIGFiaTogJHthYml9LFxuICAgIGltYWdlQmFzZTY0OiAnJHtpbWFnZUJhc2U2NH0nXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9ICR7bmFtZS5wYWNrYWdlfTtcbmA7XG4gICAgZnMud3JpdGVGaWxlU3luYyhkaXIoYCR7bmFtZS5wYWNrYWdlfS5qc2ApLCBqcywgeyBlbmNvZGluZzogJ3V0ZjgnIH0pO1xufVxuXG5mdW5jdGlvbiBwcmVwYXJlQnVpbGRKb2JGb3JGaWUoZmlsZSwgam9iLCBvcHRpb25zLCBzcmNKb2JQYXRoKSB7XG4gICAgY29uc3QgeyBkaXIsIG5hbWUgfSA9IHBhcnNlRmlsZUFyZyhmaWxlKTtcbiAgICBmcy5jb3B5RmlsZVN5bmMoZGlyKG5hbWUuc29sKSwgc3JjSm9iUGF0aChuYW1lLnNvbCkpO1xuICAgIGpvYi5wdXNoKFxuICAgICAgICBgc29sYyAke25hbWUuc29sfSAtLXR2bSA+ICR7bmFtZS5jb2RlfWAsXG4gICAgICAgIGBzb2xjICR7bmFtZS5zb2x9IC0tdHZtX2FiaSA+ICR7bmFtZS5hYml9YCxcbiAgICAgICAgYHR2bV9saW5rZXIgY29tcGlsZSAke25hbWUuY29kZX0gLS1saWIgL3Vzci9iaW4vc3RkbGliX3NvbC50dm0gLS1hYmktanNvbiAke25hbWUuYWJpfSA+ICR7bmFtZS5yZXN1bHR9YFxuICAgICk7XG59XG5cbmZ1bmN0aW9uIHByZXBhcmVCdWlsZEpvYihvcHRpb25zLCBzcmNKb2JQYXRoLCBkc3RKb2JQYXRoKSB7XG4gICAgY29uc3Qgam9iID0gW107XG4gICAgam9iLnB1c2goYGNkICR7ZHN0Sm9iUGF0aCgpfWApO1xuICAgIG9wdGlvbnMuZmlsZXMuZm9yRWFjaChmaWxlID0+IHByZXBhcmVCdWlsZEpvYkZvckZpZShmaWxlLCBqb2IsIG9wdGlvbnMsIHNyY0pvYlBhdGgpKTtcbiAgICBmcy53cml0ZUZpbGVTeW5jKHNyY0pvYlBhdGgoJ2pvYi5zaCcpLCBqb2Iuam9pbignXFxuJykpO1xufVxuXG5mdW5jdGlvbiBjb21wbGV0ZUJ1aWxkKG9wdGlvbnMsIHNyY0pvYlBhdGgpIHtcbiAgICBvcHRpb25zLmZpbGVzLmZvckVhY2goKGZpbGVBcmcpID0+IHtcbiAgICAgICAgY29uc3Qge2RpciwgbmFtZX0gPSBwYXJzZUZpbGVBcmcoZmlsZUFyZyk7XG4gICAgICAgIGNvbnN0IGxpbmtlclJlc3VsdCA9IGZzLnJlYWRGaWxlU3luYyhzcmNKb2JQYXRoKG5hbWUucmVzdWx0KSwgeyBlbmNvZGluZzogJ3V0ZjgnIH0pO1xuICAgICAgICBjb25zdCB0dmNGaWxlID0gKC9TYXZlZCBjb250cmFjdCB0byBmaWxlXFxzKiguKlxcLnR2YykvZ2kuZXhlYyhsaW5rZXJSZXN1bHQpIHx8IFtdKVsxXTtcbiAgICAgICAgaWYgKHR2Y0ZpbGUpIHtcbiAgICAgICAgICAgIGZzLmNvcHlGaWxlU3luYyhzcmNKb2JQYXRoKHR2Y0ZpbGUpLCBkaXIobmFtZS50dmMpKTtcbiAgICAgICAgICAgIGZzLmNvcHlGaWxlU3luYyhzcmNKb2JQYXRoKG5hbWUuYWJpKSwgZGlyKG5hbWUuYWJpKSk7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5qYXZhU2NyaXB0KSB7XG4gICAgICAgICAgICAgICAgZ2VuSmF2YVNjcmlwdFBhY2thZ2UoZmlsZUFyZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhsaW5rZXJSZXN1bHQpO1xuICAgICAgICAgICAgcHJvY2Vzcy5leGl0KClcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzb2woYXJnczogc3RyaW5nW10pIHtcbiAgICBjb25zdCBvcHRpb25zID0gYXJnc1RvT3B0aW9ucyhhcmdzLCBzb2xBcmdzKTtcbiAgICBjb25zdCBjb21waWxlciA9IGF3YWl0IGNvbXBpbGVycy5jcmVhdGUoKTtcbiAgICBwcmVwYXJlQnVpbGRKb2Iob3B0aW9ucywgY29tcGlsZXIuc3JjSm9iUGF0aCwgY29tcGlsZXIuZHN0Sm9iUGF0aCk7XG4gICAgYXdhaXQgY29tcGlsZXIucnVuKCdzaCcsIGAke2NvbXBpbGVyLmRzdEpvYlBhdGgoKX0vam9iLnNoYCk7XG4gICAgY29tcGxldGVCdWlsZChvcHRpb25zLCBjb21waWxlci5zcmNKb2JQYXRoKTtcbn1cblxuZXhwb3J0IHsgc29sIH07XG4iXX0=