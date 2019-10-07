"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientCode = exports.ClientCodeLanguage = exports.ClientCodeLevel = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _utils = require("../utils/utils");

var _job = require("./job");

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

var ClientCodeLevel = {
  none: 'none',
  run: 'run',
  deploy: 'deploy'
};
exports.ClientCodeLevel = ClientCodeLevel;
var ClientCodeLanguage = {
  javaScript: 'js',
  rust: 'rs'
};
exports.ClientCodeLanguage = ClientCodeLanguage;

var ClientCode =
/*#__PURE__*/
function () {
  function ClientCode() {
    (0, _classCallCheck2["default"])(this, ClientCode);
  }

  (0, _createClass2["default"])(ClientCode, null, [{
    key: "generate",
    value: function () {
      var _generate = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2() {
        var job,
            files,
            options,
            generateLanguage,
            _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                job = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : _job.CompilersJob;
                files = _args2.length > 1 ? _args2[1] : undefined;
                options = _args2.length > 2 ? _args2[2] : undefined;

                generateLanguage =
                /*#__PURE__*/
                function () {
                  var _ref = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee(language, generator) {
                    return _regenerator["default"].wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (!options.clientLanguages.find(function (x) {
                              return x.toLowerCase() === language.toLowerCase();
                            })) {
                              _context.next = 3;
                              break;
                            }

                            _context.next = 3;
                            return generator.bind(ClientCode)(job, files, options);

                          case 3:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function generateLanguage(_x, _x2) {
                    return _ref.apply(this, arguments);
                  };
                }();

                _context2.next = 6;
                return generateLanguage(ClientCodeLanguage.javaScript, this.generateJavaScript);

              case 6:
                _context2.next = 8;
                return generateLanguage(ClientCodeLanguage.rust, this.generateRust);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function generate() {
        return _generate.apply(this, arguments);
      }

      return generate;
    }()
  }, {
    key: "generateJavaScript",
    value: function () {
      var _generateJavaScript = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(job, files, options) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                files.forEach(function (file) {
                  var _parseFileArg = (0, _utils.parseFileArg)(file, '.sol'),
                      dir = _parseFileArg.dir,
                      base = _parseFileArg.base;

                  var imageBase64 = options.clientLevel === ClientCodeLevel.deploy ? fs.readFileSync(dir("".concat(base, ".tvc"))).toString('base64') : '';
                  var abi = fs.readFileSync(dir("".concat(base, ".abi.json"))).toString().trimRight();
                  var className = "".concat(base[0].toUpperCase()).concat(base.substr(1), "Contract");
                  var isDeploy = (options.clientLevel || 'deploy') === 'deploy';
                  var deployMethod = isDeploy ? "\n    async deploy(constructorParams) {\n        if (!this.keys) {\n            this.keys = await this.client.crypto.ed25519Keypair();\n        }\n        this.address = (await this.client.contracts.deploy({\n            package: pkg,\n            constructorParams,\n            keyPair: this.keys,\n        })).address;\n    }\n" : '';
                  var js = "\n//\n// This file was generated using TON Labs developer tools.\n//\n \nconst abi = ".concat(abi, ";\n\nconst pkg = {\n    abi,\n    imageBase64: '").concat(imageBase64, "',\n};\n\nclass ").concat(className, " {\n    constructor(client, address, keys) {\n        this.client = client;\n        this.address = address;\n        this.keys = keys;\n        this.package = pkg;\n        this.abi = abi;\n    }\n").concat(deployMethod, "   \n    async run(functionName, input) {\n        const result = await this.client.contracts.run({\n            address: this.address,\n            functionName,\n            abi,\n            input,\n            keyPair: this.keys,\n        });\n        return result.output;\n    }    \n\n    async runLocal(functionName, input) {\n        const result = await this.client.contracts.runLocal({\n            address: this.address,\n            functionName,\n            abi,\n            input,\n            keyPair: this.keys,\n        });\n        return result.output;\n    }    \n}\n\n").concat(className, ".package = pkg;\n\nmodule.exports = ").concat(className, ";\n");
                  fs.writeFileSync(dir("".concat(base, "Contract.js")), js, {
                    encoding: 'utf8'
                  });
                });

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function generateJavaScript(_x3, _x4, _x5) {
        return _generateJavaScript.apply(this, arguments);
      }

      return generateJavaScript;
    }()
  }, {
    key: "generateRust",
    value: function () {
      var _generateRust = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(job, files, options) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function generateRust(_x6, _x7, _x8) {
        return _generateRust.apply(this, arguments);
      }

      return generateRust;
    }()
  }]);
  return ClientCode;
}();

exports.ClientCode = ClientCode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21waWxlcnMvY2xpZW50LWNvZGUuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwiQ2xpZW50Q29kZUxldmVsIiwibm9uZSIsInJ1biIsImRlcGxveSIsIkNsaWVudENvZGVMYW5ndWFnZSIsImphdmFTY3JpcHQiLCJydXN0IiwiQ2xpZW50Q29kZSIsImpvYiIsIkNvbXBpbGVyc0pvYiIsImZpbGVzIiwib3B0aW9ucyIsImdlbmVyYXRlTGFuZ3VhZ2UiLCJsYW5ndWFnZSIsImdlbmVyYXRvciIsImNsaWVudExhbmd1YWdlcyIsImZpbmQiLCJ4IiwidG9Mb3dlckNhc2UiLCJiaW5kIiwiZ2VuZXJhdGVKYXZhU2NyaXB0IiwiZ2VuZXJhdGVSdXN0IiwiZm9yRWFjaCIsImZpbGUiLCJkaXIiLCJiYXNlIiwiaW1hZ2VCYXNlNjQiLCJjbGllbnRMZXZlbCIsInJlYWRGaWxlU3luYyIsInRvU3RyaW5nIiwiYWJpIiwidHJpbVJpZ2h0IiwiY2xhc3NOYW1lIiwidG9VcHBlckNhc2UiLCJzdWJzdHIiLCJpc0RlcGxveSIsImRlcGxveU1ldGhvZCIsImpzIiwid3JpdGVGaWxlU3luYyIsImVuY29kaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQWVBOztBQUNBOztBQWhCQTs7Ozs7Ozs7Ozs7Ozs7QUFrQkEsSUFBTUEsRUFBRSxHQUFHQyxPQUFPLENBQUMsSUFBRCxDQUFsQjs7QUFFTyxJQUFNQyxlQUFlLEdBQUc7QUFDM0JDLEVBQUFBLElBQUksRUFBRSxNQURxQjtBQUUzQkMsRUFBQUEsR0FBRyxFQUFFLEtBRnNCO0FBRzNCQyxFQUFBQSxNQUFNLEVBQUU7QUFIbUIsQ0FBeEI7O0FBUUEsSUFBTUMsa0JBQWtCLEdBQUc7QUFDOUJDLEVBQUFBLFVBQVUsRUFBRSxJQURrQjtBQUU5QkMsRUFBQUEsSUFBSSxFQUFFO0FBRndCLENBQTNCOzs7SUFZTUMsVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNhQyxnQkFBQUEsRyw4REFBTUMsaUI7QUFBY0MsZ0JBQUFBLEs7QUFBaUJDLGdCQUFBQSxPOztBQUNqREMsZ0JBQUFBLGdCOzs7OzsrQ0FBbUIsaUJBQ3JCQyxRQURxQixFQUVyQkMsU0FGcUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlDQUlqQkgsT0FBTyxDQUFDSSxlQUFSLENBQXdCQyxJQUF4QixDQUE2QixVQUFBQyxDQUFDO0FBQUEscUNBQUlBLENBQUMsQ0FBQ0MsV0FBRixPQUFvQkwsUUFBUSxDQUFDSyxXQUFULEVBQXhCO0FBQUEsNkJBQTlCLENBSmlCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsbUNBS1hKLFNBQVMsQ0FBQ0ssSUFBVixDQUFlWixVQUFmLEVBQTJCQyxHQUEzQixFQUFnQ0UsS0FBaEMsRUFBdUNDLE9BQXZDLENBTFc7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUI7O2tDQUFuQkMsZ0I7Ozs7Ozt1QkFTQUEsZ0JBQWdCLENBQUNSLGtCQUFrQixDQUFDQyxVQUFwQixFQUFnQyxLQUFLZSxrQkFBckMsQzs7Ozt1QkFDaEJSLGdCQUFnQixDQUFDUixrQkFBa0IsQ0FBQ0UsSUFBcEIsRUFBMEIsS0FBS2UsWUFBL0IsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FEQUlNYixHLEVBQW1CRSxLLEVBQWlCQyxPOzs7OztBQUNoRUQsZ0JBQUFBLEtBQUssQ0FBQ1ksT0FBTixDQUFjLFVBQUNDLElBQUQsRUFBVTtBQUFBLHNDQUNFLHlCQUFhQSxJQUFiLEVBQW1CLE1BQW5CLENBREY7QUFBQSxzQkFDWkMsR0FEWSxpQkFDWkEsR0FEWTtBQUFBLHNCQUNQQyxJQURPLGlCQUNQQSxJQURPOztBQUVwQixzQkFBTUMsV0FBVyxHQUFHZixPQUFPLENBQUNnQixXQUFSLEtBQXdCM0IsZUFBZSxDQUFDRyxNQUF4QyxHQUNkTCxFQUFFLENBQUM4QixZQUFILENBQWdCSixHQUFHLFdBQUlDLElBQUosVUFBbkIsRUFBb0NJLFFBQXBDLENBQTZDLFFBQTdDLENBRGMsR0FFZCxFQUZOO0FBR0Esc0JBQU1DLEdBQUcsR0FBR2hDLEVBQUUsQ0FBQzhCLFlBQUgsQ0FBZ0JKLEdBQUcsV0FBSUMsSUFBSixlQUFuQixFQUF5Q0ksUUFBekMsR0FBb0RFLFNBQXBELEVBQVo7QUFDQSxzQkFBTUMsU0FBUyxhQUFNUCxJQUFJLENBQUMsQ0FBRCxDQUFKLENBQVFRLFdBQVIsRUFBTixTQUE4QlIsSUFBSSxDQUFDUyxNQUFMLENBQVksQ0FBWixDQUE5QixhQUFmO0FBQ0Esc0JBQU1DLFFBQVEsR0FBRyxDQUFDeEIsT0FBTyxDQUFDZ0IsV0FBUixJQUF1QixRQUF4QixNQUFzQyxRQUF2RDtBQUNBLHNCQUFNUyxZQUFZLEdBQUdELFFBQVEsa1ZBWXJDLEVBWlE7QUFjQSxzQkFBTUUsRUFBRSxrR0FNTlAsR0FOTSw2REFVQUosV0FWQSw2QkFhWk0sU0FiWSxtTkFxQmxCSSxZQXJCa0IsNmxCQTZDbEJKLFNBN0NrQixpREErQ0RBLFNBL0NDLFFBQVI7QUFpREFsQyxrQkFBQUEsRUFBRSxDQUFDd0MsYUFBSCxDQUFpQmQsR0FBRyxXQUFJQyxJQUFKLGlCQUFwQixFQUE0Q1ksRUFBNUMsRUFBZ0Q7QUFBRUUsb0JBQUFBLFFBQVEsRUFBRTtBQUFaLG1CQUFoRDtBQUNILGlCQXhFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FEQTRFc0IvQixHLEVBQW1CRSxLLEVBQWlCQyxPIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuXG5pbXBvcnQgeyBwYXJzZUZpbGVBcmcgfSBmcm9tIFwiLi4vdXRpbHMvdXRpbHNcIjtcbmltcG9ydCB7IENvbXBpbGVyc0pvYiB9IGZyb20gXCIuL2pvYlwiO1xuXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5cbmV4cG9ydCBjb25zdCBDbGllbnRDb2RlTGV2ZWwgPSB7XG4gICAgbm9uZTogJ25vbmUnLFxuICAgIHJ1bjogJ3J1bicsXG4gICAgZGVwbG95OiAnZGVwbG95J1xufTtcblxuZXhwb3J0IHR5cGUgQ2xpZW50Q29kZUxldmVsVHlwZSA9ICRLZXlzPHR5cGVvZiBDbGllbnRDb2RlTGV2ZWw+O1xuXG5leHBvcnQgY29uc3QgQ2xpZW50Q29kZUxhbmd1YWdlID0ge1xuICAgIGphdmFTY3JpcHQ6ICdqcycsXG4gICAgcnVzdDogJ3JzJyxcbn07XG5cbmV4cG9ydCB0eXBlIENsaWVudENvZGVPcHRpb25zID0ge1xuICAgIGNsaWVudExhbmd1YWdlczogQ2xpZW50Q29kZUxhbmd1YWdlVHlwZVtdLFxuICAgIGNsaWVudExldmVsOiBDbGllbnRDb2RlTGV2ZWxUeXBlLFxufTtcblxuZXhwb3J0IHR5cGUgQ2xpZW50Q29kZUxhbmd1YWdlVHlwZSA9ICRLZXlzPHR5cGVvZiBDbGllbnRDb2RlTGFuZ3VhZ2U+O1xuXG5leHBvcnQgY2xhc3MgQ2xpZW50Q29kZSB7XG4gICAgc3RhdGljIGFzeW5jIGdlbmVyYXRlKGpvYiA9IENvbXBpbGVyc0pvYiwgZmlsZXM6IHN0cmluZ1tdLCBvcHRpb25zOiBDbGllbnRDb2RlT3B0aW9ucykge1xuICAgICAgICBjb25zdCBnZW5lcmF0ZUxhbmd1YWdlID0gYXN5bmMgKFxuICAgICAgICAgICAgbGFuZ3VhZ2U6IENsaWVudENvZGVMYW5ndWFnZVR5cGUsXG4gICAgICAgICAgICBnZW5lcmF0b3I6IChqb2I6IENvbXBpbGVyc0pvYiwgb3B0aW9uczogQ2xpZW50Q29kZU9wdGlvbnMpID0+IFByb21pc2U8dm9pZD5cbiAgICAgICAgKSA9PiB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5jbGllbnRMYW5ndWFnZXMuZmluZCh4ID0+IHgudG9Mb3dlckNhc2UoKSA9PT0gbGFuZ3VhZ2UudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBnZW5lcmF0b3IuYmluZChDbGllbnRDb2RlKShqb2IsIGZpbGVzLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBhd2FpdCBnZW5lcmF0ZUxhbmd1YWdlKENsaWVudENvZGVMYW5ndWFnZS5qYXZhU2NyaXB0LCB0aGlzLmdlbmVyYXRlSmF2YVNjcmlwdCk7XG4gICAgICAgIGF3YWl0IGdlbmVyYXRlTGFuZ3VhZ2UoQ2xpZW50Q29kZUxhbmd1YWdlLnJ1c3QsIHRoaXMuZ2VuZXJhdGVSdXN0KTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBhc3luYyBnZW5lcmF0ZUphdmFTY3JpcHQoam9iOiBDb21waWxlcnNKb2IsIGZpbGVzOiBzdHJpbmdbXSwgb3B0aW9uczogQ2xpZW50Q29kZU9wdGlvbnMpIHtcbiAgICAgICAgZmlsZXMuZm9yRWFjaCgoZmlsZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBkaXIsIGJhc2UgfSA9IHBhcnNlRmlsZUFyZyhmaWxlLCAnLnNvbCcpO1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VCYXNlNjQgPSBvcHRpb25zLmNsaWVudExldmVsID09PSBDbGllbnRDb2RlTGV2ZWwuZGVwbG95XG4gICAgICAgICAgICAgICAgPyBmcy5yZWFkRmlsZVN5bmMoZGlyKGAke2Jhc2V9LnR2Y2ApKS50b1N0cmluZygnYmFzZTY0JylcbiAgICAgICAgICAgICAgICA6ICcnO1xuICAgICAgICAgICAgY29uc3QgYWJpID0gZnMucmVhZEZpbGVTeW5jKGRpcihgJHtiYXNlfS5hYmkuanNvbmApKS50b1N0cmluZygpLnRyaW1SaWdodCgpO1xuICAgICAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gYCR7YmFzZVswXS50b1VwcGVyQ2FzZSgpfSR7YmFzZS5zdWJzdHIoMSl9Q29udHJhY3RgO1xuICAgICAgICAgICAgY29uc3QgaXNEZXBsb3kgPSAob3B0aW9ucy5jbGllbnRMZXZlbCB8fCAnZGVwbG95JykgPT09ICdkZXBsb3knO1xuICAgICAgICAgICAgY29uc3QgZGVwbG95TWV0aG9kID0gaXNEZXBsb3kgP1xuYFxuICAgIGFzeW5jIGRlcGxveShjb25zdHJ1Y3RvclBhcmFtcykge1xuICAgICAgICBpZiAoIXRoaXMua2V5cykge1xuICAgICAgICAgICAgdGhpcy5rZXlzID0gYXdhaXQgdGhpcy5jbGllbnQuY3J5cHRvLmVkMjU1MTlLZXlwYWlyKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hZGRyZXNzID0gKGF3YWl0IHRoaXMuY2xpZW50LmNvbnRyYWN0cy5kZXBsb3koe1xuICAgICAgICAgICAgcGFja2FnZTogcGtnLFxuICAgICAgICAgICAgY29uc3RydWN0b3JQYXJhbXMsXG4gICAgICAgICAgICBrZXlQYWlyOiB0aGlzLmtleXMsXG4gICAgICAgIH0pKS5hZGRyZXNzO1xuICAgIH1cbmAgOiAnJztcblxuICAgICAgICAgICAgY29uc3QganMgPVxuICAgICAgICAgICAgICAgIGBcbi8vXG4vLyBUaGlzIGZpbGUgd2FzIGdlbmVyYXRlZCB1c2luZyBUT04gTGFicyBkZXZlbG9wZXIgdG9vbHMuXG4vL1xuIFxuY29uc3QgYWJpID0gJHthYml9O1xuXG5jb25zdCBwa2cgPSB7XG4gICAgYWJpLFxuICAgIGltYWdlQmFzZTY0OiAnJHtpbWFnZUJhc2U2NH0nLFxufTtcblxuY2xhc3MgJHtjbGFzc05hbWV9IHtcbiAgICBjb25zdHJ1Y3RvcihjbGllbnQsIGFkZHJlc3MsIGtleXMpIHtcbiAgICAgICAgdGhpcy5jbGllbnQgPSBjbGllbnQ7XG4gICAgICAgIHRoaXMuYWRkcmVzcyA9IGFkZHJlc3M7XG4gICAgICAgIHRoaXMua2V5cyA9IGtleXM7XG4gICAgICAgIHRoaXMucGFja2FnZSA9IHBrZztcbiAgICAgICAgdGhpcy5hYmkgPSBhYmk7XG4gICAgfVxuJHtkZXBsb3lNZXRob2R9ICAgXG4gICAgYXN5bmMgcnVuKGZ1bmN0aW9uTmFtZSwgaW5wdXQpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5jbGllbnQuY29udHJhY3RzLnJ1bih7XG4gICAgICAgICAgICBhZGRyZXNzOiB0aGlzLmFkZHJlc3MsXG4gICAgICAgICAgICBmdW5jdGlvbk5hbWUsXG4gICAgICAgICAgICBhYmksXG4gICAgICAgICAgICBpbnB1dCxcbiAgICAgICAgICAgIGtleVBhaXI6IHRoaXMua2V5cyxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQub3V0cHV0O1xuICAgIH0gICAgXG5cbiAgICBhc3luYyBydW5Mb2NhbChmdW5jdGlvbk5hbWUsIGlucHV0KSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuY2xpZW50LmNvbnRyYWN0cy5ydW5Mb2NhbCh7XG4gICAgICAgICAgICBhZGRyZXNzOiB0aGlzLmFkZHJlc3MsXG4gICAgICAgICAgICBmdW5jdGlvbk5hbWUsXG4gICAgICAgICAgICBhYmksXG4gICAgICAgICAgICBpbnB1dCxcbiAgICAgICAgICAgIGtleVBhaXI6IHRoaXMua2V5cyxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQub3V0cHV0O1xuICAgIH0gICAgXG59XG5cbiR7Y2xhc3NOYW1lfS5wYWNrYWdlID0gcGtnO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICR7Y2xhc3NOYW1lfTtcbmA7XG4gICAgICAgICAgICBmcy53cml0ZUZpbGVTeW5jKGRpcihgJHtiYXNlfUNvbnRyYWN0LmpzYCksIGpzLCB7IGVuY29kaW5nOiAndXRmOCcgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGFzeW5jIGdlbmVyYXRlUnVzdChqb2I6IENvbXBpbGVyc0pvYiwgZmlsZXM6IHN0cmluZ1tdLCBvcHRpb25zOiBDbGllbnRDb2RlT3B0aW9ucykge1xuXG4gICAgfVxufVxuIl19