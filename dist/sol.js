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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zb2wuanMiXSwibmFtZXMiOlsib3MiLCJyZXF1aXJlIiwiZnMiLCJwYXRoIiwic29sQXJncyIsImphdmFTY3JpcHQiLCJkZWYiLCJydXN0IiwicGFyc2VGaWxlQXJnIiwiZmlsZUFyZyIsInBsYXRmb3JtIiwic3RhcnRzV2l0aCIsImpvaW4iLCJob21lZGlyIiwic3Vic3RyIiwiZmlsZVBhdGgiLCJyZXNvbHZlIiwiZGlyIiwiZGlybmFtZSIsImJhc2UiLCJiYXNlbmFtZSIsInJlc3VsdCIsIm5hbWUiLCJzb2wiLCJ0dmMiLCJjb2RlIiwiYWJpIiwiZXhpc3RzU3luYyIsImNvbnNvbGUiLCJlcnJvciIsInRleHRzIiwic291cmNlRmlsZU5vdEZvdW5kIiwicHJvY2VzcyIsImV4aXQiLCJnZW5KYXZhU2NyaXB0UGFja2FnZSIsImltYWdlQmFzZTY0IiwicmVhZEZpbGVTeW5jIiwidG9TdHJpbmciLCJ0cmltUmlnaHQiLCJqcyIsIndyaXRlRmlsZVN5bmMiLCJlbmNvZGluZyIsInByZXBhcmVCdWlsZEpvYkZvckZpZSIsImZpbGUiLCJqb2IiLCJvcHRpb25zIiwic3JjSm9iUGF0aCIsImNvcHlGaWxlU3luYyIsInB1c2giLCJwcmVwYXJlQnVpbGRKb2IiLCJkc3RKb2JQYXRoIiwiZmlsZXMiLCJmb3JFYWNoIiwiY29tcGxldGVCdWlsZCIsImxpbmtlclJlc3VsdCIsInR2Y0ZpbGUiLCJleGVjIiwibG9nIiwiYXJncyIsImNvbXBpbGVycyIsImNyZWF0ZSIsImNvbXBpbGVyIiwicnVuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBZUE7O0FBQ0E7O0FBQ0E7O0FBakJBOzs7Ozs7Ozs7Ozs7OztBQW1CQSxJQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQUNBLElBQU1DLEVBQUUsR0FBR0QsT0FBTyxDQUFDLElBQUQsQ0FBbEI7O0FBQ0EsSUFBTUUsSUFBSSxHQUFHRixPQUFPLENBQUMsTUFBRCxDQUFwQjs7QUFFQSxJ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LEVBQVVnQixRQUFRLENBQUNmLFVBQW5CLEVBQStCZSxRQUFRLENBQUNYLFVBQXhDLENBQWY7QUFISjtBQUFBLG1CQUlVVyxRQUFRLENBQUNDLEdBQVQsQ0FBYSxJQUFiLFlBQXNCRCxRQUFRLENBQUNYLFVBQVQsRUFBdEIsYUFKVjs7QUFBQTtBQUtJRyxZQUFBQSxhQUFhLENBQUNSLE9BQUQsRUFBVWdCLFFBQVEsQ0FBQ2YsVUFBbkIsQ0FBYjs7QUFMSjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuLy8gQGZsb3dcbmltcG9ydCBjb21waWxlcnMgZnJvbSBcIi4vY29tcGlsZXJzXCI7XG5pbXBvcnQge3RleHRzfSBmcm9tICcuL3RleHRzJztcbmltcG9ydCB7IGFyZ3NUb09wdGlvbnMsIGJpbmRQYXRoSm9pblRvIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuY29uc3Qgb3MgPSByZXF1aXJlKCdvcycpO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcblxuY29uc3Qgc29sQXJncyA9IHtcbiAgICBqYXZhU2NyaXB0OiB7IGRlZjogZmFsc2UsIHNob3J0OiAnanMnIH0sXG4gICAgcnVzdDogeyBkZWY6IGZhbHNlLCBzaG9ydDogJ3JzJyB9LFxufTtcblxuZnVuY3Rpb24gcGFyc2VGaWxlQXJnKGZpbGVBcmcpIHtcbiAgICBpZiAob3MucGxhdGZvcm0oKSA9PT0gJ2RhcndpbicgJiYgZmlsZUFyZy5zdGFydHNXaXRoKCd+LycpKSB7XG4gICAgICAgIGZpbGVBcmcgPSBwYXRoLmpvaW4ob3MuaG9tZWRpcigpLCBmaWxlQXJnLnN1YnN0cigyKSk7XG4gICAgfVxuICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5yZXNvbHZlKGZpbGVBcmcpO1xuICAgIGNvbnN0IGRpciA9IGJpbmRQYXRoSm9pblRvKHBhdGguZGlybmFtZShmaWxlUGF0aCkpO1xuICAgIGxldCBiYXNlID0gcGF0aC5iYXNlbmFtZShmaWxlUGF0aCwgJy5zb2wnKTtcbiAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICAgIGRpcixcbiAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgYmFzZSxcbiAgICAgICAgICAgIHNvbDogYCR7YmFzZX0uc29sYCxcbiAgICAgICAgICAgIHR2YzogYCR7YmFzZX0udHZjYCxcbiAgICAgICAgICAgIGNvZGU6IGAke2Jhc2V9LmNvZGVgLFxuICAgICAgICAgICAgYWJpOiBgJHtiYXNlfS5hYmkuanNvbmAsXG4gICAgICAgICAgICBwYWNrYWdlOiBgJHtiYXNlfVBhY2thZ2VgLFxuICAgICAgICAgICAgcmVzdWx0OiBgJHtiYXNlfS5yZXN1bHRgLFxuICAgICAgICB9LFxuICAgIH07XG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKHJlc3VsdC5kaXIocmVzdWx0Lm5hbWUuc29sKSkpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcih0ZXh0cy5zb3VyY2VGaWxlTm90Rm91bmQocmVzdWx0Lm5hbWUuc29sKSk7XG4gICAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gZ2VuSmF2YVNjcmlwdFBhY2thZ2UoZmlsZUFyZykge1xuICAgIGNvbnN0IHtkaXIsIG5hbWV9ID0gcGFyc2VGaWxlQXJnKGZpbGVBcmcpO1xuICAgIGNvbnN0IGltYWdlQmFzZTY0ID0gZnMucmVhZEZpbGVTeW5jKGRpcihuYW1lLnR2YykpLnRvU3RyaW5nKCdiYXNlNjQnKTtcbiAgICBjb25zdCBhYmkgPSBmcy5yZWFkRmlsZVN5bmMoZGlyKG5hbWUuYWJpKSkudG9TdHJpbmcoKS50cmltUmlnaHQoKTtcbiAgICBjb25zdCBqcyA9XG4gICAgICAgIGBjb25zdCAke25hbWUucGFja2FnZX0gPSB7XG4gICAgYWJpOiAke2FiaX0sXG4gICAgaW1hZ2VCYXNlNjQ6ICcke2ltYWdlQmFzZTY0fSdcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gJHtuYW1lLnBhY2thZ2V9O1xuYDtcbiAgICBmcy53cml0ZUZpbGVTeW5jKGRpcihgJHtuYW1lLnBhY2thZ2V9LmpzYCksIGpzLCB7IGVuY29kaW5nOiAndXRmOCcgfSk7XG59XG5cbmZ1bmN0aW9uIHByZXBhcmVCdWlsZEpvYkZvckZpZShmaWxlLCBqb2IsIG9wdGlvbnMsIHNyY0pvYlBhdGgpIHtcbiAgICBjb25zdCB7IGRpciwgbmFtZSB9ID0gcGFyc2VGaWxlQXJnKGZpbGUpO1xuICAgIGZzLmNvcHlGaWxlU3luYyhkaXIobmFtZS5zb2wpLCBzcmNKb2JQYXRoKG5hbWUuc29sKSk7XG4gICAgam9iLnB1c2goXG4gICAgICAgIGBzb2xjICR7bmFtZS5zb2x9IC0tdHZtID4gJHtuYW1lLmNvZGV9YCxcbiAgICAgICAgYHNvbGMgJHtuYW1lLnNvbH0gLS10dm1fYWJpID4gJHtuYW1lLmFiaX1gLFxuICAgICAgICBgdHZtX2xpbmtlciBjb21waWxlICR7bmFtZS5jb2RlfSAtLWxpYiAvdXNyL2Jpbi9zdGRsaWJfc29sLnR2bSAtLWFiaS1qc29uICR7bmFtZS5hYml9ID4gJHtuYW1lLnJlc3VsdH1gXG4gICAgKTtcbn1cblxuZnVuY3Rpb24gcHJlcGFyZUJ1aWxkSm9iKG9wdGlvbnMsIHNyY0pvYlBhdGgsIGRzdEpvYlBhdGgpIHtcbiAgICBjb25zdCBqb2IgPSBbXTtcbiAgICBqb2IucHVzaChgY2QgJHtkc3RKb2JQYXRoKCl9YCk7XG4gICAgb3B0aW9ucy5maWxlcy5mb3JFYWNoKGZpbGUgPT4gcHJlcGFyZUJ1aWxkSm9iRm9yRmllKGZpbGUsIGpvYiwgb3B0aW9ucywgc3JjSm9iUGF0aCkpO1xuICAgIGZzLndyaXRlRmlsZVN5bmMoc3JjSm9iUGF0aCgnam9iLnNoJyksIGpvYi5qb2luKCdcXG4nKSk7XG59XG5cbmZ1bmN0aW9uIGNvbXBsZXRlQnVpbGQob3B0aW9ucywgc3JjSm9iUGF0aCkge1xuICAgIG9wdGlvbnMuZmlsZXMuZm9yRWFjaCgoZmlsZUFyZykgPT4ge1xuICAgICAgICBjb25zdCB7ZGlyLCBuYW1lfSA9IHBhcnNlRmlsZUFyZyhmaWxlQXJnKTtcbiAgICAgICAgY29uc3QgbGlua2VyUmVzdWx0ID0gZnMucmVhZEZpbGVTeW5jKHNyY0pvYlBhdGgobmFtZS5yZXN1bHQpLCB7IGVuY29kaW5nOiAndXRmOCcgfSk7XG4gICAgICAgIGNvbnN0IHR2Y0ZpbGUgPSAoL1NhdmVkIGNvbnRyYWN0IHRvIGZpbGVcXHMqKC4qXFwudHZjKS9naS5leGVjKGxpbmtlclJlc3VsdCkgfHwgW10pWzFdO1xuICAgICAgICBpZiAodHZjRmlsZSkge1xuICAgICAgICAgICAgZnMuY29weUZpbGVTeW5jKHNyY0pvYlBhdGgodHZjRmlsZSksIGRpcihuYW1lLnR2YykpO1xuICAgICAgICAgICAgZnMuY29weUZpbGVTeW5jKHNyY0pvYlBhdGgobmFtZS5hYmkpLCBkaXIobmFtZS5hYmkpKTtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmphdmFTY3JpcHQpIHtcbiAgICAgICAgICAgICAgICBnZW5KYXZhU2NyaXB0UGFja2FnZShmaWxlQXJnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxpbmtlclJlc3VsdCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc29sKGFyZ3M6IHN0cmluZ1tdKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IGFyZ3NUb09wdGlvbnMoYXJncywgc29sQXJncyk7XG4gICAgY29uc3QgY29tcGlsZXIgPSBhd2FpdCBjb21waWxlcnMuY3JlYXRlKCk7XG4gICAgcHJlcGFyZUJ1aWxkSm9iKG9wdGlvbnMsIGNvbXBpbGVyLnNyY0pvYlBhdGgsIGNvbXBpbGVyLmRzdEpvYlBhdGgpO1xuICAgIGF3YWl0IGNvbXBpbGVyLnJ1bignc2gnLCBgJHtjb21waWxlci5kc3RKb2JQYXRoKCl9L2pvYi5zaGApO1xuICAgIGNvbXBsZXRlQnVpbGQob3B0aW9ucywgY29tcGlsZXIuc3JjSm9iUGF0aCk7XG59XG5cbmV4cG9ydCB7IHNvbCB9O1xuIl19