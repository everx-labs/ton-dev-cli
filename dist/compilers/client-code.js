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
  js: 'js',
  rs: 'rs'
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
      _regenerator["default"].mark(function _callee2(files, options) {
        var generateLanguage;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
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
                            return generator.bind(ClientCode)(files, options);

                          case 3:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function generateLanguage(_x3, _x4) {
                    return _ref.apply(this, arguments);
                  };
                }();

                _context2.next = 3;
                return generateLanguage(ClientCodeLanguage.js, this.generateJavaScript);

              case 3:
                _context2.next = 5;
                return generateLanguage(ClientCodeLanguage.rs, this.generateRust);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function generate(_x, _x2) {
        return _generate.apply(this, arguments);
      }

      return generate;
    }()
  }, {
    key: "generateJavascriptVarHelp",
    value: function generateJavascriptVarHelp(pragma, parent, v, desc, js) {
      var jsType = {
        uint256: 'string'
      }[v.type] || v.type;
      js.push("\n     * @".concat(pragma, " {").concat(jsType, "} ").concat(parent ? "".concat(parent, ".") : '').concat(v.name).concat(jsType !== v.type ? " (".concat(v.type, ")") : '').concat(desc ? " ".concat(desc) : ''));
    }
  }, {
    key: "generateJavaScriptFunctionHelp",
    value: function generateJavaScriptFunctionHelp(className, f, abi, js) {
      var isConstructor = f.name === 'constructor';
      js.push("\n\n    /**");

      if (isConstructor) {
        js.push("\n     * @constructor");
      }

      if (f.inputs.length > 0) {
        var paramsName = isConstructor ? 'constructorParams' : 'input';
        js.push("\n     * @param {Object} ".concat(paramsName));
        f.inputs.forEach(function (i) {
          ClientCode.generateJavascriptVarHelp('param', paramsName, i, '', js);
        });
      }

      if (isConstructor && abi.data.length > 0) {
        js.push("\n     * @param {Object} initParams");
        abi.data.forEach(function (i) {
          ClientCode.generateJavascriptVarHelp('param', 'initParams', i, '', js);
        });
      }

      if (f.outputs.length > 0) {
        js.push("\n     * @return {Promise.<".concat(className, "_").concat(f.name, ">}"));
      }

      js.push("\n     */");
    }
  }, {
    key: "generateJavaScriptFunctionResultType",
    value: function generateJavaScriptFunctionResultType(className, f, abi, js) {
      js.push("\n\n    /**\n     * @typedef ".concat(className, "_").concat(f.name, "\n     * @type {object}"));
      f.outputs.forEach(function (o) {
        ClientCode.generateJavascriptVarHelp('property', '', o, '', js);
      });
      js.push("\n     */");
    }
  }, {
    key: "generateJavaScript",
    value: function () {
      var _generateJavaScript = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(files, options) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                files.forEach(function (file) {
                  var _parseFileArg = (0, _utils.parseFileArg)(file, '.sol'),
                      dir = _parseFileArg.dir,
                      base = _parseFileArg.base;

                  var imageBase64 = options.clientLevel === ClientCodeLevel.deploy ? fs.readFileSync(dir("".concat(base, ".tvc"))).toString('base64') : '';
                  var abiJson = fs.readFileSync(dir("".concat(base, ".abi.json"))).toString().trimRight();
                  var abi = JSON.parse(abiJson);
                  var className = "".concat(base[0].toUpperCase()).concat(base.substr(1), "Contract");
                  var isDeploy = (options.clientLevel || 'deploy') === 'deploy';
                  var js = [];
                  js.push("\n//\n// This file was generated using TON Labs developer tools.\n//\n \nconst abi = ".concat(abiJson, ";\n\nconst pkg = {\n    abi,\n    imageBase64: '").concat(imageBase64, "',\n};\n\nclass ").concat(className, " {\n    constructor(client, address, keys) {\n        this.client = client;\n        this.address = address;\n        this.keys = keys;\n        this.package = pkg;\n        this.abi = abi;\n    }"));

                  if (isDeploy) {
                    var f = abi.functions.find(function (x) {
                      return x.name === 'constructor';
                    }) || {
                      name: 'constructor',
                      inputs: [],
                      outputs: []
                    };
                    ClientCode.generateJavaScriptFunctionHelp(className, f, abi, js);
                    var hasParams = f.inputs.length > 0;
                    var hasData = abi.data.length > 0;
                    js.push("\n    async deploy(".concat(hasParams ? 'constructorParams' : '').concat(hasParams && hasData ? ', ' : '').concat(hasData ? 'initParams' : '', ") {\n        if (!this.keys) {\n            this.keys = await this.client.crypto.ed25519Keypair();\n        }\n        this.address = (await this.client.contracts.deploy({\n            package: pkg,\n            constructorParams").concat(hasParams ? '' : ': {}', ",\n            initParams").concat(hasData ? '' : ': {}', ",\n            keyPair: this.keys,\n        })).address;\n    }"));
                  }

                  js.push("\n\n    async run(functionName, input) {\n        const result = await this.client.contracts.run({\n            address: this.address,\n            functionName,\n            abi,\n            input,\n            keyPair: this.keys,\n        });\n        return result.output;\n    }    \n\n    async runLocal(functionName, input) {\n        const result = await this.client.contracts.runLocal({\n            address: this.address,\n            functionName,\n            abi,\n            input,\n            keyPair: this.keys,\n        });\n        return result.output;\n    }");
                  abi.functions.forEach(function (f) {
                    if (f.name === 'constructor') {
                      return;
                    }

                    if (f.outputs.length > 0) {
                      ClientCode.generateJavaScriptFunctionResultType(className, f, abi, js);
                    }

                    ClientCode.generateJavaScriptFunctionHelp(className, f, abi, js);
                    js.push("\n    ".concat(f.name, "(").concat(f.inputs.length > 0 ? 'input' : '', ") {\n        return this.run('").concat(f.name, "', ").concat(f.inputs.length > 0 ? 'input' : '{}', ");\n    }"));
                    ClientCode.generateJavaScriptFunctionHelp(className, f, abi, js);
                    js.push("\n    ".concat(f.name, "Local(").concat(f.inputs.length > 0 ? 'input' : '', ") {\n        return this.runLocal('").concat(f.name, "', ").concat(f.inputs.length > 0 ? 'input' : '{}', ");\n    }"));
                  });
                  js.push("\n}\n\n".concat(className, ".package = pkg;\n\nmodule.exports = ").concat(className, ";\n"));
                  fs.writeFileSync(dir("".concat(base, "Contract.js")), js.join(''), {
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

      function generateJavaScript(_x5, _x6) {
        return _generateJavaScript.apply(this, arguments);
      }

      return generateJavaScript;
    }()
  }, {
    key: "generateRust",
    value: function () {
      var _generateRust = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(files, options) {
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

      function generateRust(_x7, _x8) {
        return _generateRust.apply(this, arguments);
      }

      return generateRust;
    }()
  }]);
  return ClientCode;
}();

exports.ClientCode = ClientCode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21waWxlcnMvY2xpZW50LWNvZGUuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwiQ2xpZW50Q29kZUxldmVsIiwibm9uZSIsInJ1biIsImRlcGxveSIsIkNsaWVudENvZGVMYW5ndWFnZSIsImpzIiwicnMiLCJDbGllbnRDb2RlIiwiZmlsZXMiLCJvcHRpb25zIiwiZ2VuZXJhdGVMYW5ndWFnZSIsImxhbmd1YWdlIiwiZ2VuZXJhdG9yIiwiY2xpZW50TGFuZ3VhZ2VzIiwiZmluZCIsIngiLCJ0b0xvd2VyQ2FzZSIsImJpbmQiLCJnZW5lcmF0ZUphdmFTY3JpcHQiLCJnZW5lcmF0ZVJ1c3QiLCJwcmFnbWEiLCJwYXJlbnQiLCJ2IiwiZGVzYyIsImpzVHlwZSIsInVpbnQyNTYiLCJ0eXBlIiwicHVzaCIsIm5hbWUiLCJjbGFzc05hbWUiLCJmIiwiYWJpIiwiaXNDb25zdHJ1Y3RvciIsImlucHV0cyIsImxlbmd0aCIsInBhcmFtc05hbWUiLCJmb3JFYWNoIiwiaSIsImdlbmVyYXRlSmF2YXNjcmlwdFZhckhlbHAiLCJkYXRhIiwib3V0cHV0cyIsIm8iLCJmaWxlIiwiZGlyIiwiYmFzZSIsImltYWdlQmFzZTY0IiwiY2xpZW50TGV2ZWwiLCJyZWFkRmlsZVN5bmMiLCJ0b1N0cmluZyIsImFiaUpzb24iLCJ0cmltUmlnaHQiLCJKU09OIiwicGFyc2UiLCJ0b1VwcGVyQ2FzZSIsInN1YnN0ciIsImlzRGVwbG95IiwiZnVuY3Rpb25zIiwiZ2VuZXJhdGVKYXZhU2NyaXB0RnVuY3Rpb25IZWxwIiwiaGFzUGFyYW1zIiwiaGFzRGF0YSIsImdlbmVyYXRlSmF2YVNjcmlwdEZ1bmN0aW9uUmVzdWx0VHlwZSIsIndyaXRlRmlsZVN5bmMiLCJqb2luIiwiZW5jb2RpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZUE7O0FBZkE7Ozs7Ozs7Ozs7Ozs7O0FBaUJBLElBQU1BLEVBQUUsR0FBR0MsT0FBTyxDQUFDLElBQUQsQ0FBbEI7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QUFBLEVBQUUsQ0FBQ3NCLElBQUgsaUJBQ1ZHLENBQUMsQ0FBQ0YsSUFEUSxtQkFDS0UsQ0FBQyxDQUFDRyxNQUFGLENBQVNDLE1BQVQsR0FBa0IsQ0FBbEIsR0FBc0IsT0FBdEIsR0FBZ0MsRUFEckMsZ0RBRWdCSixDQUFDLENBQUNGLElBRmxCLGdCQUU0QkUsQ0FBQyxDQUFDRyxNQUFGLENBQVNDLE1BQVQsR0FBa0IsQ0FBbEIsR0FBc0IsT0FBdEIsR0FBZ0MsSUFGNUQ7QUFJSCxtQkFqQkQ7QUFtQkE3QixrQkFBQUEsRUFBRSxDQUFDc0IsSUFBSCxrQkFHVkUsU0FIVSxpREFLT0EsU0FMUDtBQU9BL0Isa0JBQUFBLEVBQUUsQ0FBQytELGFBQUgsQ0FBaUJsQixHQUFHLFdBQUlDLElBQUosaUJBQXBCLEVBQTRDdkMsRUFBRSxDQUFDeUQsSUFBSCxDQUFRLEVBQVIsQ0FBNUMsRUFBeUQ7QUFBRUMsb0JBQUFBLFFBQVEsRUFBRTtBQUFaLG1CQUF6RDtBQUNILGlCQW5HRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FEQXVHc0J2RCxLLEVBQWlCQyxPIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuXG5pbXBvcnQgeyBwYXJzZUZpbGVBcmcgfSBmcm9tIFwiLi4vdXRpbHMvdXRpbHNcIjtcblxuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuXG5leHBvcnQgY29uc3QgQ2xpZW50Q29kZUxldmVsID0ge1xuICAgIG5vbmU6ICdub25lJyxcbiAgICBydW46ICdydW4nLFxuICAgIGRlcGxveTogJ2RlcGxveSdcbn07XG5cbmV4cG9ydCB0eXBlIENsaWVudENvZGVMZXZlbFR5cGUgPSAkS2V5czx0eXBlb2YgQ2xpZW50Q29kZUxldmVsPjtcblxuZXhwb3J0IGNvbnN0IENsaWVudENvZGVMYW5ndWFnZSA9IHtcbiAgICBqczogJ2pzJyxcbiAgICByczogJ3JzJyxcbn07XG5cbmV4cG9ydCB0eXBlIENsaWVudENvZGVMYW5ndWFnZVR5cGUgPSAkS2V5czx0eXBlb2YgQ2xpZW50Q29kZUxhbmd1YWdlPjtcblxuZXhwb3J0IHR5cGUgQ2xpZW50Q29kZU9wdGlvbnMgPSB7XG4gICAgY2xpZW50TGFuZ3VhZ2VzOiBDbGllbnRDb2RlTGFuZ3VhZ2VUeXBlW10sXG4gICAgY2xpZW50TGV2ZWw6IENsaWVudENvZGVMZXZlbFR5cGUsXG59O1xuXG5cbmV4cG9ydCBjbGFzcyBDbGllbnRDb2RlIHtcbiAgICBzdGF0aWMgYXN5bmMgZ2VuZXJhdGUoZmlsZXM6IHN0cmluZ1tdLCBvcHRpb25zOiBDbGllbnRDb2RlT3B0aW9ucykge1xuICAgICAgICBjb25zdCBnZW5lcmF0ZUxhbmd1YWdlID0gYXN5bmMgKFxuICAgICAgICAgICAgbGFuZ3VhZ2U6IENsaWVudENvZGVMYW5ndWFnZVR5cGUsXG4gICAgICAgICAgICBnZW5lcmF0b3I6IChvcHRpb25zOiBDbGllbnRDb2RlT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPlxuICAgICAgICApID0+IHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmNsaWVudExhbmd1YWdlcy5maW5kKHggPT4geC50b0xvd2VyQ2FzZSgpID09PSBsYW5ndWFnZS50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgICAgICAgICAgIGF3YWl0IGdlbmVyYXRvci5iaW5kKENsaWVudENvZGUpKGZpbGVzLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBhd2FpdCBnZW5lcmF0ZUxhbmd1YWdlKENsaWVudENvZGVMYW5ndWFnZS5qcywgdGhpcy5nZW5lcmF0ZUphdmFTY3JpcHQpO1xuICAgICAgICBhd2FpdCBnZW5lcmF0ZUxhbmd1YWdlKENsaWVudENvZGVMYW5ndWFnZS5ycywgdGhpcy5nZW5lcmF0ZVJ1c3QpO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZW5lcmF0ZUphdmFzY3JpcHRWYXJIZWxwKHByYWdtYSwgcGFyZW50LCB2LCBkZXNjLCBqcykge1xuICAgICAgICBjb25zdCBqc1R5cGUgPSB7XG4gICAgICAgICAgICB1aW50MjU2OiAnc3RyaW5nJyxcbiAgICAgICAgfVt2LnR5cGVdIHx8IHYudHlwZTtcblxuICAgICAgICBqcy5wdXNoKGBcbiAgICAgKiBAJHtwcmFnbWF9IHske2pzVHlwZX19ICR7cGFyZW50ID8gYCR7cGFyZW50fS5gIDogJyd9JHt2Lm5hbWV9JHtqc1R5cGUgIT09IHYudHlwZSA/IGAgKCR7di50eXBlfSlgIDogJyd9JHtkZXNjID8gYCAke2Rlc2N9YCA6ICcnfWApO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZW5lcmF0ZUphdmFTY3JpcHRGdW5jdGlvbkhlbHAoY2xhc3NOYW1lLCBmLCBhYmksIGpzKSB7XG4gICAgICAgIGNvbnN0IGlzQ29uc3RydWN0b3IgPSBmLm5hbWUgPT09ICdjb25zdHJ1Y3Rvcic7XG4gICAgICAgIGpzLnB1c2goYFxuXG4gICAgLyoqYCk7XG4gICAgICAgIGlmIChpc0NvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICBqcy5wdXNoKGBcbiAgICAgKiBAY29uc3RydWN0b3JgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZi5pbnB1dHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgcGFyYW1zTmFtZSA9IGlzQ29uc3RydWN0b3IgPyAnY29uc3RydWN0b3JQYXJhbXMnIDogJ2lucHV0JztcbiAgICAgICAgICAgIGpzLnB1c2goYFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAke3BhcmFtc05hbWV9YCk7XG4gICAgICAgICAgICBmLmlucHV0cy5mb3JFYWNoKChpKSA9PiB7XG4gICAgICAgICAgICAgICAgQ2xpZW50Q29kZS5nZW5lcmF0ZUphdmFzY3JpcHRWYXJIZWxwKCdwYXJhbScsIHBhcmFtc05hbWUsIGksICcnLCBqcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNDb25zdHJ1Y3RvciAmJiBhYmkuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBqcy5wdXNoKGBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5pdFBhcmFtc2ApO1xuICAgICAgICAgICAgYWJpLmRhdGEuZm9yRWFjaCgoaSkgPT4ge1xuICAgICAgICAgICAgICAgIENsaWVudENvZGUuZ2VuZXJhdGVKYXZhc2NyaXB0VmFySGVscCgncGFyYW0nLCAnaW5pdFBhcmFtcycsIGksICcnLCBqcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZi5vdXRwdXRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGpzLnB1c2goYFxuICAgICAqIEByZXR1cm4ge1Byb21pc2UuPCR7Y2xhc3NOYW1lfV8ke2YubmFtZX0+fWApO1xuICAgICAgICB9XG4gICAgICAgIGpzLnB1c2goYFxuICAgICAqL2ApO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZW5lcmF0ZUphdmFTY3JpcHRGdW5jdGlvblJlc3VsdFR5cGUoY2xhc3NOYW1lLCBmLCBhYmksIGpzKSB7XG4gICAgICAgIGpzLnB1c2goYFxuXG4gICAgLyoqXG4gICAgICogQHR5cGVkZWYgJHtjbGFzc05hbWV9XyR7Zi5uYW1lfVxuICAgICAqIEB0eXBlIHtvYmplY3R9YCk7XG4gICAgICAgIGYub3V0cHV0cy5mb3JFYWNoKChvKSA9PiB7XG4gICAgICAgICAgICBDbGllbnRDb2RlLmdlbmVyYXRlSmF2YXNjcmlwdFZhckhlbHAoJ3Byb3BlcnR5JywgJycsIG8sICcnLCBqcyk7XG4gICAgICAgIH0pO1xuICAgICAgICBqcy5wdXNoKGBcbiAgICAgKi9gKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYXN5bmMgZ2VuZXJhdGVKYXZhU2NyaXB0KGZpbGVzOiBzdHJpbmdbXSwgb3B0aW9uczogQ2xpZW50Q29kZU9wdGlvbnMpIHtcbiAgICAgICAgZmlsZXMuZm9yRWFjaCgoZmlsZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBkaXIsIGJhc2UgfSA9IHBhcnNlRmlsZUFyZyhmaWxlLCAnLnNvbCcpO1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VCYXNlNjQgPSBvcHRpb25zLmNsaWVudExldmVsID09PSBDbGllbnRDb2RlTGV2ZWwuZGVwbG95XG4gICAgICAgICAgICAgICAgPyBmcy5yZWFkRmlsZVN5bmMoZGlyKGAke2Jhc2V9LnR2Y2ApKS50b1N0cmluZygnYmFzZTY0JylcbiAgICAgICAgICAgICAgICA6ICcnO1xuICAgICAgICAgICAgY29uc3QgYWJpSnNvbiA9IGZzLnJlYWRGaWxlU3luYyhkaXIoYCR7YmFzZX0uYWJpLmpzb25gKSkudG9TdHJpbmcoKS50cmltUmlnaHQoKTtcbiAgICAgICAgICAgIGNvbnN0IGFiaSA9IEpTT04ucGFyc2UoYWJpSnNvbik7XG4gICAgICAgICAgICBjb25zdCBjbGFzc05hbWUgPSBgJHtiYXNlWzBdLnRvVXBwZXJDYXNlKCl9JHtiYXNlLnN1YnN0cigxKX1Db250cmFjdGA7XG4gICAgICAgICAgICBjb25zdCBpc0RlcGxveSA9IChvcHRpb25zLmNsaWVudExldmVsIHx8ICdkZXBsb3knKSA9PT0gJ2RlcGxveSc7XG4gICAgICAgICAgICBjb25zdCBqczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgICAgIGpzLnB1c2goYFxuLy9cbi8vIFRoaXMgZmlsZSB3YXMgZ2VuZXJhdGVkIHVzaW5nIFRPTiBMYWJzIGRldmVsb3BlciB0b29scy5cbi8vXG4gXG5jb25zdCBhYmkgPSAke2FiaUpzb259O1xuXG5jb25zdCBwa2cgPSB7XG4gICAgYWJpLFxuICAgIGltYWdlQmFzZTY0OiAnJHtpbWFnZUJhc2U2NH0nLFxufTtcblxuY2xhc3MgJHtjbGFzc05hbWV9IHtcbiAgICBjb25zdHJ1Y3RvcihjbGllbnQsIGFkZHJlc3MsIGtleXMpIHtcbiAgICAgICAgdGhpcy5jbGllbnQgPSBjbGllbnQ7XG4gICAgICAgIHRoaXMuYWRkcmVzcyA9IGFkZHJlc3M7XG4gICAgICAgIHRoaXMua2V5cyA9IGtleXM7XG4gICAgICAgIHRoaXMucGFja2FnZSA9IHBrZztcbiAgICAgICAgdGhpcy5hYmkgPSBhYmk7XG4gICAgfWApO1xuICAgICAgICAgICAgaWYgKGlzRGVwbG95KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZiA9IGFiaS5mdW5jdGlvbnMuZmluZCh4ID0+IHgubmFtZSA9PT0gJ2NvbnN0cnVjdG9yJylcbiAgICAgICAgICAgICAgICAgICAgfHwgeyBuYW1lOiAnY29uc3RydWN0b3InLCBpbnB1dHM6IFtdLCBvdXRwdXRzOiBbXSB9O1xuICAgICAgICAgICAgICAgIENsaWVudENvZGUuZ2VuZXJhdGVKYXZhU2NyaXB0RnVuY3Rpb25IZWxwKGNsYXNzTmFtZSwgZiwgYWJpLCBqcyk7XG4gICAgICAgICAgICAgICAgY29uc3QgaGFzUGFyYW1zID0gZi5pbnB1dHMubGVuZ3RoID4gMDtcbiAgICAgICAgICAgICAgICBjb25zdCBoYXNEYXRhID0gYWJpLmRhdGEubGVuZ3RoID4gMDtcbiAgICAgICAgICAgICAgICBqcy5wdXNoKGBcbiAgICBhc3luYyBkZXBsb3koJHtoYXNQYXJhbXMgPyAnY29uc3RydWN0b3JQYXJhbXMnIDogJyd9JHtoYXNQYXJhbXMgJiYgaGFzRGF0YSA/ICcsICcgOiAnJ30ke2hhc0RhdGEgPyAnaW5pdFBhcmFtcycgOiAnJ30pIHtcbiAgICAgICAgaWYgKCF0aGlzLmtleXMpIHtcbiAgICAgICAgICAgIHRoaXMua2V5cyA9IGF3YWl0IHRoaXMuY2xpZW50LmNyeXB0by5lZDI1NTE5S2V5cGFpcigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWRkcmVzcyA9IChhd2FpdCB0aGlzLmNsaWVudC5jb250cmFjdHMuZGVwbG95KHtcbiAgICAgICAgICAgIHBhY2thZ2U6IHBrZyxcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yUGFyYW1zJHtoYXNQYXJhbXMgPyAnJyA6ICc6IHt9J30sXG4gICAgICAgICAgICBpbml0UGFyYW1zJHtoYXNEYXRhID8gJycgOiAnOiB7fSd9LFxuICAgICAgICAgICAga2V5UGFpcjogdGhpcy5rZXlzLFxuICAgICAgICB9KSkuYWRkcmVzcztcbiAgICB9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBqcy5wdXNoKGBcblxuICAgIGFzeW5jIHJ1bihmdW5jdGlvbk5hbWUsIGlucHV0KSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuY2xpZW50LmNvbnRyYWN0cy5ydW4oe1xuICAgICAgICAgICAgYWRkcmVzczogdGhpcy5hZGRyZXNzLFxuICAgICAgICAgICAgZnVuY3Rpb25OYW1lLFxuICAgICAgICAgICAgYWJpLFxuICAgICAgICAgICAgaW5wdXQsXG4gICAgICAgICAgICBrZXlQYWlyOiB0aGlzLmtleXMsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0Lm91dHB1dDtcbiAgICB9ICAgIFxuXG4gICAgYXN5bmMgcnVuTG9jYWwoZnVuY3Rpb25OYW1lLCBpbnB1dCkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLmNsaWVudC5jb250cmFjdHMucnVuTG9jYWwoe1xuICAgICAgICAgICAgYWRkcmVzczogdGhpcy5hZGRyZXNzLFxuICAgICAgICAgICAgZnVuY3Rpb25OYW1lLFxuICAgICAgICAgICAgYWJpLFxuICAgICAgICAgICAgaW5wdXQsXG4gICAgICAgICAgICBrZXlQYWlyOiB0aGlzLmtleXMsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0Lm91dHB1dDtcbiAgICB9YCk7XG4gICAgICAgICAgICBhYmkuZnVuY3Rpb25zLmZvckVhY2goKGYpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZi5uYW1lID09PSAnY29uc3RydWN0b3InKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGYub3V0cHV0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIENsaWVudENvZGUuZ2VuZXJhdGVKYXZhU2NyaXB0RnVuY3Rpb25SZXN1bHRUeXBlKGNsYXNzTmFtZSwgZiwgYWJpLCBqcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIENsaWVudENvZGUuZ2VuZXJhdGVKYXZhU2NyaXB0RnVuY3Rpb25IZWxwKGNsYXNzTmFtZSwgZiwgYWJpLCBqcyk7XG4gICAgICAgICAgICAgICAganMucHVzaChgXG4gICAgJHtmLm5hbWV9KCR7Zi5pbnB1dHMubGVuZ3RoID4gMCA/ICdpbnB1dCcgOiAnJ30pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucnVuKCcke2YubmFtZX0nLCAke2YuaW5wdXRzLmxlbmd0aCA+IDAgPyAnaW5wdXQnIDogJ3t9J30pO1xuICAgIH1gKTtcbiAgICAgICAgICAgICAgICBDbGllbnRDb2RlLmdlbmVyYXRlSmF2YVNjcmlwdEZ1bmN0aW9uSGVscChjbGFzc05hbWUsIGYsIGFiaSwganMpO1xuICAgICAgICAgICAgICAgIGpzLnB1c2goYFxuICAgICR7Zi5uYW1lfUxvY2FsKCR7Zi5pbnB1dHMubGVuZ3RoID4gMCA/ICdpbnB1dCcgOiAnJ30pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucnVuTG9jYWwoJyR7Zi5uYW1lfScsICR7Zi5pbnB1dHMubGVuZ3RoID4gMCA/ICdpbnB1dCcgOiAne30nfSk7XG4gICAgfWApO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGpzLnB1c2goYFxufVxuXG4ke2NsYXNzTmFtZX0ucGFja2FnZSA9IHBrZztcblxubW9kdWxlLmV4cG9ydHMgPSAke2NsYXNzTmFtZX07XG5gKTtcbiAgICAgICAgICAgIGZzLndyaXRlRmlsZVN5bmMoZGlyKGAke2Jhc2V9Q29udHJhY3QuanNgKSwganMuam9pbignJyksIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgYXN5bmMgZ2VuZXJhdGVSdXN0KGZpbGVzOiBzdHJpbmdbXSwgb3B0aW9uczogQ2xpZW50Q29kZU9wdGlvbnMpIHtcblxuICAgIH1cbn1cbiJdfQ==