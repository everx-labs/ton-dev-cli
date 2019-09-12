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
    console.error("Source file [".concat(fileArg, "] not found."));
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
    fs.copyFileSync(srcJobPath(tvcFile), dir(name.tvc));
    fs.copyFileSync(srcJobPath(name.abi), dir(name.abi));

    if (options.javaScript) {
      genJavaScriptPackage(fileArg);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zb2wuanMiXSwibmFtZXMiOlsib3MiLCJyZXF1aXJlIiwiZnMiLCJwYXRoIiwic29sQXJncyIsImphdmFTY3JpcHQiLCJkZWYiLCJydXN0IiwicGFyc2VGaWxlQXJnIiwiZmlsZUFyZyIsInBsYXRmb3JtIiwic3RhcnRzV2l0aCIsImpvaW4iLCJob21lZGlyIiwic3Vic3RyIiwiZmlsZVBhdGgiLCJyZXNvbHZlIiwiZGlyIiwiZGlybmFtZSIsImJhc2UiLCJiYXNlbmFtZSIsInJlc3VsdCIsIm5hbWUiLCJzb2wiLCJ0dmMiLCJjb2RlIiwiYWJpIiwiZXhpc3RzU3luYyIsImNvbnNvbGUiLCJlcnJvciIsInByb2Nlc3MiLCJleGl0IiwiZ2VuSmF2YVNjcmlwdFBhY2thZ2UiLCJpbWFnZUJhc2U2NCIsInJlYWRGaWxlU3luYyIsInRvU3RyaW5nIiwidHJpbVJpZ2h0IiwianMiLCJ3cml0ZUZpbGVTeW5jIiwiZW5jb2RpbmciLCJwcmVwYXJlQnVpbGRKb2JGb3JGaWUiLCJmaWxlIiwiam9iIiwib3B0aW9ucyIsInNyY0pvYlBhdGgiLCJjb3B5RmlsZVN5bmMiLCJwdXNoIiwicHJlcGFyZUJ1aWxkSm9iIiwiZHN0Sm9iUGF0aCIsImZpbGVzIiwiZm9yRWFjaCIsImNvbXBsZXRlQnVpbGQiLCJsaW5rZXJSZXN1bHQiLCJ0dmNGaWxlIiwiZXhlYyIsImFyZ3MiLCJjb21waWxlcnMiLCJjcmVhdGUiLCJjb21waWxlciIsInJ1biJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQWVBOztBQUNBOztBQWhCQTs7Ozs7Ozs7Ozs7Ozs7QUFrQkEsSUFBTUEsRUFBRSxHQUFHQyxPQUFPLENBQUMsSUFBRCxDQUFsQjs7QUFDQSxJQUFNQyxFQUFFLEdBQUdELE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQUNBLElBQU1FLElBQUksR0FBR0YsT0FBTyxDQUFDLE1BQUQsQ0FBcEI7O0FBRUEsSUFBTUcsT0FBTyxHQUFHO0FBQ1pDLEVBQUFBLFVBQVUsRUFBRTtBQUFF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LFFBQVEsQ0FBQ2QsVUFBbkIsQ0FBYjs7QUFMSjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuLy8gQGZsb3dcbmltcG9ydCBjb21waWxlcnMgZnJvbSBcIi4vY29tcGlsZXJzXCI7XG5pbXBvcnQgeyBhcmdzVG9PcHRpb25zLCBiaW5kUGF0aEpvaW5UbyB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmNvbnN0IG9zID0gcmVxdWlyZSgnb3MnKTtcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5cbmNvbnN0IHNvbEFyZ3MgPSB7XG4gICAgamF2YVNjcmlwdDogeyBkZWY6IGZhbHNlLCBzaG9ydDogJ2pzJyB9LFxuICAgIHJ1c3Q6IHsgZGVmOiBmYWxzZSwgc2hvcnQ6ICdycycgfSxcbn07XG5cbmZ1bmN0aW9uIHBhcnNlRmlsZUFyZyhmaWxlQXJnKSB7XG4gICAgaWYgKG9zLnBsYXRmb3JtKCkgPT09ICdkYXJ3aW4nICYmIGZpbGVBcmcuc3RhcnRzV2l0aCgnfi8nKSkge1xuICAgICAgICBmaWxlQXJnID0gcGF0aC5qb2luKG9zLmhvbWVkaXIoKSwgZmlsZUFyZy5zdWJzdHIoMikpO1xuICAgIH1cbiAgICBjb25zdCBmaWxlUGF0aCA9IHBhdGgucmVzb2x2ZShmaWxlQXJnKTtcbiAgICBjb25zdCBkaXIgPSBiaW5kUGF0aEpvaW5UbyhwYXRoLmRpcm5hbWUoZmlsZVBhdGgpKTtcbiAgICBsZXQgYmFzZSA9IHBhdGguYmFzZW5hbWUoZmlsZVBhdGgsICcuc29sJyk7XG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgICBkaXIsXG4gICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgIGJhc2UsXG4gICAgICAgICAgICBzb2w6IGAke2Jhc2V9LnNvbGAsXG4gICAgICAgICAgICB0dmM6IGAke2Jhc2V9LnR2Y2AsXG4gICAgICAgICAgICBjb2RlOiBgJHtiYXNlfS5jb2RlYCxcbiAgICAgICAgICAgIGFiaTogYCR7YmFzZX0uYWJpLmpzb25gLFxuICAgICAgICAgICAgcGFja2FnZTogYCR7YmFzZX1QYWNrYWdlYCxcbiAgICAgICAgICAgIHJlc3VsdDogYCR7YmFzZX0ucmVzdWx0YCxcbiAgICAgICAgfSxcbiAgICB9O1xuICAgIGlmICghZnMuZXhpc3RzU3luYyhyZXN1bHQuZGlyKHJlc3VsdC5uYW1lLnNvbCkpKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYFNvdXJjZSBmaWxlIFske2ZpbGVBcmd9XSBub3QgZm91bmQuYCk7XG4gICAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gZ2VuSmF2YVNjcmlwdFBhY2thZ2UoZmlsZUFyZykge1xuICAgIGNvbnN0IHtkaXIsIG5hbWV9ID0gcGFyc2VGaWxlQXJnKGZpbGVBcmcpO1xuICAgIGNvbnN0IGltYWdlQmFzZTY0ID0gZnMucmVhZEZpbGVTeW5jKGRpcihuYW1lLnR2YykpLnRvU3RyaW5nKCdiYXNlNjQnKTtcbiAgICBjb25zdCBhYmkgPSBmcy5yZWFkRmlsZVN5bmMoZGlyKG5hbWUuYWJpKSkudG9TdHJpbmcoKS50cmltUmlnaHQoKTtcbiAgICBjb25zdCBqcyA9XG4gICAgICAgIGBjb25zdCAke25hbWUucGFja2FnZX0gPSB7XG4gICAgYWJpOiAke2FiaX0sXG4gICAgaW1hZ2VCYXNlNjQ6ICcke2ltYWdlQmFzZTY0fSdcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gJHtuYW1lLnBhY2thZ2V9O1xuYDtcbiAgICBmcy53cml0ZUZpbGVTeW5jKGRpcihgJHtuYW1lLnBhY2thZ2V9LmpzYCksIGpzLCB7IGVuY29kaW5nOiAndXRmOCcgfSk7XG59XG5cbmZ1bmN0aW9uIHByZXBhcmVCdWlsZEpvYkZvckZpZShmaWxlLCBqb2IsIG9wdGlvbnMsIHNyY0pvYlBhdGgpIHtcbiAgICBjb25zdCB7IGRpciwgbmFtZSB9ID0gcGFyc2VGaWxlQXJnKGZpbGUpO1xuICAgIGZzLmNvcHlGaWxlU3luYyhkaXIobmFtZS5zb2wpLCBzcmNKb2JQYXRoKG5hbWUuc29sKSk7XG4gICAgam9iLnB1c2goXG4gICAgICAgIGBzb2xjICR7bmFtZS5zb2x9IC0tdHZtID4gJHtuYW1lLmNvZGV9YCxcbiAgICAgICAgYHNvbGMgJHtuYW1lLnNvbH0gLS10dm1fYWJpID4gJHtuYW1lLmFiaX1gLFxuICAgICAgICBgdHZtX2xpbmtlciBjb21waWxlICR7bmFtZS5jb2RlfSAtLWxpYiAvdXNyL2Jpbi9zdGRsaWJfc29sLnR2bSAtLWFiaS1qc29uICR7bmFtZS5hYml9ID4gJHtuYW1lLnJlc3VsdH1gXG4gICAgKTtcbn1cblxuZnVuY3Rpb24gcHJlcGFyZUJ1aWxkSm9iKG9wdGlvbnMsIHNyY0pvYlBhdGgsIGRzdEpvYlBhdGgpIHtcbiAgICBjb25zdCBqb2IgPSBbXTtcbiAgICBqb2IucHVzaChgY2QgJHtkc3RKb2JQYXRoKCl9YCk7XG4gICAgb3B0aW9ucy5maWxlcy5mb3JFYWNoKGZpbGUgPT4gcHJlcGFyZUJ1aWxkSm9iRm9yRmllKGZpbGUsIGpvYiwgb3B0aW9ucywgc3JjSm9iUGF0aCkpO1xuICAgIGZzLndyaXRlRmlsZVN5bmMoc3JjSm9iUGF0aCgnam9iLnNoJyksIGpvYi5qb2luKCdcXG4nKSk7XG59XG5cbmZ1bmN0aW9uIGNvbXBsZXRlQnVpbGQob3B0aW9ucywgc3JjSm9iUGF0aCkge1xuICAgIG9wdGlvbnMuZmlsZXMuZm9yRWFjaCgoZmlsZUFyZykgPT4ge1xuICAgICAgICBjb25zdCB7ZGlyLCBuYW1lfSA9IHBhcnNlRmlsZUFyZyhmaWxlQXJnKTtcbiAgICAgICAgY29uc3QgbGlua2VyUmVzdWx0ID0gZnMucmVhZEZpbGVTeW5jKHNyY0pvYlBhdGgobmFtZS5yZXN1bHQpLCB7IGVuY29kaW5nOiAndXRmOCcgfSk7XG4gICAgICAgIGNvbnN0IHR2Y0ZpbGUgPSAoL1NhdmVkIGNvbnRyYWN0IHRvIGZpbGVcXHMqKC4qXFwudHZjKS9naS5leGVjKGxpbmtlclJlc3VsdCkgfHwgW10pWzFdO1xuICAgICAgICBmcy5jb3B5RmlsZVN5bmMoc3JjSm9iUGF0aCh0dmNGaWxlKSwgZGlyKG5hbWUudHZjKSk7XG4gICAgICAgIGZzLmNvcHlGaWxlU3luYyhzcmNKb2JQYXRoKG5hbWUuYWJpKSwgZGlyKG5hbWUuYWJpKSk7XG4gICAgICAgIGlmIChvcHRpb25zLmphdmFTY3JpcHQpIHtcbiAgICAgICAgICAgIGdlbkphdmFTY3JpcHRQYWNrYWdlKGZpbGVBcmcpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNvbChhcmdzOiBzdHJpbmdbXSkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSBhcmdzVG9PcHRpb25zKGFyZ3MsIHNvbEFyZ3MpO1xuICAgIGNvbnN0IGNvbXBpbGVyID0gYXdhaXQgY29tcGlsZXJzLmNyZWF0ZSgpO1xuICAgIHByZXBhcmVCdWlsZEpvYihvcHRpb25zLCBjb21waWxlci5zcmNKb2JQYXRoLCBjb21waWxlci5kc3RKb2JQYXRoKTtcbiAgICBhd2FpdCBjb21waWxlci5ydW4oJ3NoJywgYCR7Y29tcGlsZXIuZHN0Sm9iUGF0aCgpfS9qb2Iuc2hgKTtcbiAgICBjb21wbGV0ZUJ1aWxkKG9wdGlvbnMsIGNvbXBpbGVyLnNyY0pvYlBhdGgpO1xufVxuXG5leHBvcnQgeyBzb2wgfTtcbiJdfQ==