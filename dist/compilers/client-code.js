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
                return generateLanguage(ClientCodeLanguage.js, this.generateJavaScript);

              case 6:
                _context2.next = 8;
                return generateLanguage(ClientCodeLanguage.rs, this.generateRust);

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
    key: "generateJavaScriptFunctionHelp",
    value: function generateJavaScriptFunctionHelp(className, f, js) {
      js.push("\n\n    /**");

      if (f.name === 'constructor') {
        js.push("\n     * @constructor");
      }

      if (f.inputs.length > 0) {
        js.push("\n     * @param {Object} input");
        f.inputs.forEach(function (i) {
          js.push("\n     * @param {".concat(i.type, "} input.").concat(i.name));
        });
      }

      if (f.outputs.length > 0) {
        js.push("\n     * @return {Promise.<".concat(className, "_").concat(f.name, ">}"));
      }

      js.push("\n     */");
    }
  }, {
    key: "generateJavaScriptFunctionResultType",
    value: function generateJavaScriptFunctionResultType(className, f, js) {
      js.push("\n\n    /**\n     * @typedef ".concat(className, "_").concat(f.name, "\n     * @type {object}"));
      f.outputs.forEach(function (o) {
        js.push("\n     * @property {".concat(o.type, "} ").concat(o.name));
      });
      js.push("\n     */");
    }
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
                    ClientCode.generateJavaScriptFunctionHelp(className, f, js);
                    js.push("\n    async deploy(".concat(f.inputs.length > 0 ? 'constructorParams' : '', ") {\n        if (!this.keys) {\n            this.keys = await this.client.crypto.ed25519Keypair();\n        }\n        this.address = (await this.client.contracts.deploy({\n            package: pkg,\n            constructorParams").concat(f.inputs.length > 0 ? '' : ': {}', ",\n            keyPair: this.keys,\n        })).address;\n    }"));
                  }

                  js.push("\n\n    async run(functionName, input) {\n        const result = await this.client.contracts.run({\n            address: this.address,\n            functionName,\n            abi,\n            input,\n            keyPair: this.keys,\n        });\n        return result.output;\n    }    \n\n    async runLocal(functionName, input) {\n        const result = await this.client.contracts.runLocal({\n            address: this.address,\n            functionName,\n            abi,\n            input,\n            keyPair: this.keys,\n        });\n        return result.output;\n    }");
                  abi.functions.forEach(function (f) {
                    if (f.name === 'constructor') {
                      return;
                    }

                    if (f.outputs.length > 0) {
                      ClientCode.generateJavaScriptFunctionResultType(className, f, js);
                    }

                    ClientCode.generateJavaScriptFunctionHelp(className, f, js);
                    js.push("\n    ".concat(f.name, "(").concat(f.inputs.length > 0 ? 'input' : '', ") {\n        return this.run('").concat(f.name, "', ").concat(f.inputs.length > 0 ? 'input' : '{}', ");\n    }"));
                    ClientCode.generateJavaScriptFunctionHelp(className, f, js);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21waWxlcnMvY2xpZW50LWNvZGUuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwiQ2xpZW50Q29kZUxldmVsIiwibm9uZSIsInJ1biIsImRlcGxveSIsIkNsaWVudENvZGVMYW5ndWFnZSIsImpzIiwicnMiLCJDbGllbnRDb2RlIiwiam9iIiwiQ29tcGlsZXJzSm9iIiwiZmlsZXMiLCJvcHRpb25zIiwiZ2VuZXJhdGVMYW5ndWFnZSIsImxhbmd1YWdlIiwiZ2VuZXJhdG9yIiwiY2xpZW50TGFuZ3VhZ2VzIiwiZmluZCIsIngiLCJ0b0xvd2VyQ2FzZSIsImJpbmQiLCJnZW5lcmF0ZUphdmFTY3JpcHQiLCJnZW5lcmF0ZVJ1c3QiLCJjbGFzc05hbWUiLCJmIiwicHVzaCIsIm5hbWUiLCJpbnB1dHMiLCJsZW5ndGgiLCJmb3JFYWNoIiwiaSIsInR5cGUiLCJvdXRwdXRzIiwibyIsImZpbGUiLCJkaXIiLCJiYXNlIiwiaW1hZ2VCYXNlNjQiLCJjbGllbnRMZXZlbCIsInJlYWRGaWxlU3luYyIsInRvU3RyaW5nIiwiYWJpSnNvbiIsInRyaW1SaWdodCIsImFiaSIsIkpTT04iLCJwYXJzZSIsInRvVXBwZXJDYXNlIiwic3Vic3RyIiwiaXNEZXBsb3kiLCJmdW5jdGlvbnMiLCJnZW5lcmF0ZUphdmFTY3JpcHRGdW5jdGlvbkhlbHAiLCJnZW5lcmF0ZUphdmFTY3JpcHRGdW5jdGlvblJlc3VsdFR5cGUiLCJ3cml0ZUZpbGVTeW5jIiwiam9pbiIsImVuY29kaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQWVBOztBQUNBOztBQWhCQTs7Ozs7Ozs7Ozs7Ozs7QUFrQkEsSUFBTUEsRUFBRSxHQUFHQyxPQUFPLENBQUMsSUFBRCxDQUFsQjs7QUFFTyxJQUFNQyxlQUFlLEdBQUc7QUFDM0JDLEVBQUFBLElBQUksRUFBRSxNQURxQjtBQUUzQkMsRUFBQUEsR0FBRyxFQUFFLEtBRnNCO0FBRzNCQyxFQUFBQSxNQUFNLEVBQUU7QUFI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QkYsQ0FBQyxDQUFDRyxNQUFGLENBQVNDLE1BQVQsR0FBa0IsQ0FBbEIsR0FBc0IsT0FBdEIsR0FBZ0MsSUFGNUQ7QUFJSCxtQkFqQkQ7QUFtQkF0QixrQkFBQUEsRUFBRSxDQUFDbUIsSUFBSCxrQkFHVkYsU0FIVSxpREFLT0EsU0FMUDtBQU9BeEIsa0JBQUFBLEVBQUUsQ0FBQ3FELGFBQUgsQ0FBaUJqQixHQUFHLFdBQUlDLElBQUosaUJBQXBCLEVBQTRDOUIsRUFBRSxDQUFDK0MsSUFBSCxDQUFRLEVBQVIsQ0FBNUMsRUFBeUQ7QUFBRUMsb0JBQUFBLFFBQVEsRUFBRTtBQUFaLG1CQUF6RDtBQUNILGlCQWhHRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FEQW9Hc0I3QyxHLEVBQW1CRSxLLEVBQWlCQyxPIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuXG5pbXBvcnQgeyBwYXJzZUZpbGVBcmcgfSBmcm9tIFwiLi4vdXRpbHMvdXRpbHNcIjtcbmltcG9ydCB7IENvbXBpbGVyc0pvYiB9IGZyb20gXCIuL2pvYlwiO1xuXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5cbmV4cG9ydCBjb25zdCBDbGllbnRDb2RlTGV2ZWwgPSB7XG4gICAgbm9uZTogJ25vbmUnLFxuICAgIHJ1bjogJ3J1bicsXG4gICAgZGVwbG95OiAnZGVwbG95J1xufTtcblxuZXhwb3J0IHR5cGUgQ2xpZW50Q29kZUxldmVsVHlwZSA9ICRLZXlzPHR5cGVvZiBDbGllbnRDb2RlTGV2ZWw+O1xuXG5leHBvcnQgY29uc3QgQ2xpZW50Q29kZUxhbmd1YWdlID0ge1xuICAgIGpzOiAnanMnLFxuICAgIHJzOiAncnMnLFxufTtcblxuZXhwb3J0IHR5cGUgQ2xpZW50Q29kZUxhbmd1YWdlVHlwZSA9ICRLZXlzPHR5cGVvZiBDbGllbnRDb2RlTGFuZ3VhZ2U+O1xuXG5leHBvcnQgdHlwZSBDbGllbnRDb2RlT3B0aW9ucyA9IHtcbiAgICBjbGllbnRMYW5ndWFnZXM6IENsaWVudENvZGVMYW5ndWFnZVR5cGVbXSxcbiAgICBjbGllbnRMZXZlbDogQ2xpZW50Q29kZUxldmVsVHlwZSxcbn07XG5cblxuZXhwb3J0IGNsYXNzIENsaWVudENvZGUge1xuICAgIHN0YXRpYyBhc3luYyBnZW5lcmF0ZShqb2IgPSBDb21waWxlcnNKb2IsIGZpbGVzOiBzdHJpbmdbXSwgb3B0aW9uczogQ2xpZW50Q29kZU9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgZ2VuZXJhdGVMYW5ndWFnZSA9IGFzeW5jIChcbiAgICAgICAgICAgIGxhbmd1YWdlOiBDbGllbnRDb2RlTGFuZ3VhZ2VUeXBlLFxuICAgICAgICAgICAgZ2VuZXJhdG9yOiAoam9iOiBDb21waWxlcnNKb2IsIG9wdGlvbnM6IENsaWVudENvZGVPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+XG4gICAgICAgICkgPT4ge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuY2xpZW50TGFuZ3VhZ2VzLmZpbmQoeCA9PiB4LnRvTG93ZXJDYXNlKCkgPT09IGxhbmd1YWdlLnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgZ2VuZXJhdG9yLmJpbmQoQ2xpZW50Q29kZSkoam9iLCBmaWxlcywgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgYXdhaXQgZ2VuZXJhdGVMYW5ndWFnZShDbGllbnRDb2RlTGFuZ3VhZ2UuanMsIHRoaXMuZ2VuZXJhdGVKYXZhU2NyaXB0KTtcbiAgICAgICAgYXdhaXQgZ2VuZXJhdGVMYW5ndWFnZShDbGllbnRDb2RlTGFuZ3VhZ2UucnMsIHRoaXMuZ2VuZXJhdGVSdXN0KTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBnZW5lcmF0ZUphdmFTY3JpcHRGdW5jdGlvbkhlbHAoY2xhc3NOYW1lLCBmLCBqcykge1xuICAgICAgICBqcy5wdXNoKGBcblxuICAgIC8qKmApO1xuICAgICAgICBpZiAoZi5uYW1lID09PSAnY29uc3RydWN0b3InKSB7XG4gICAgICAgICAgICBqcy5wdXNoKGBcbiAgICAgKiBAY29uc3RydWN0b3JgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZi5pbnB1dHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAganMucHVzaChgXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0YCk7XG4gICAgICAgICAgICBmLmlucHV0cy5mb3JFYWNoKChpKSA9PiB7XG4gICAgICAgICAgICAgICAganMucHVzaChgXG4gICAgICogQHBhcmFtIHske2kudHlwZX19IGlucHV0LiR7aS5uYW1lfWApXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZi5vdXRwdXRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGpzLnB1c2goYFxuICAgICAqIEByZXR1cm4ge1Byb21pc2UuPCR7Y2xhc3NOYW1lfV8ke2YubmFtZX0+fWApO1xuICAgICAgICB9XG4gICAgICAgIGpzLnB1c2goYFxuICAgICAqL2ApO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZW5lcmF0ZUphdmFTY3JpcHRGdW5jdGlvblJlc3VsdFR5cGUoY2xhc3NOYW1lLCBmLCBqcykge1xuICAgICAgICBqcy5wdXNoKGBcblxuICAgIC8qKlxuICAgICAqIEB0eXBlZGVmICR7Y2xhc3NOYW1lfV8ke2YubmFtZX1cbiAgICAgKiBAdHlwZSB7b2JqZWN0fWApO1xuICAgICAgICBmLm91dHB1dHMuZm9yRWFjaCgobykgPT4ge1xuICAgICAgICAgICAganMucHVzaChgXG4gICAgICogQHByb3BlcnR5IHske28udHlwZX19ICR7by5uYW1lfWApXG4gICAgICAgIH0pO1xuICAgICAgICBqcy5wdXNoKGBcbiAgICAgKi9gKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYXN5bmMgZ2VuZXJhdGVKYXZhU2NyaXB0KGpvYjogQ29tcGlsZXJzSm9iLCBmaWxlczogc3RyaW5nW10sIG9wdGlvbnM6IENsaWVudENvZGVPcHRpb25zKSB7XG4gICAgICAgIGZpbGVzLmZvckVhY2goKGZpbGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgZGlyLCBiYXNlIH0gPSBwYXJzZUZpbGVBcmcoZmlsZSwgJy5zb2wnKTtcbiAgICAgICAgICAgIGNvbnN0IGltYWdlQmFzZTY0ID0gb3B0aW9ucy5jbGllbnRMZXZlbCA9PT0gQ2xpZW50Q29kZUxldmVsLmRlcGxveVxuICAgICAgICAgICAgICAgID8gZnMucmVhZEZpbGVTeW5jKGRpcihgJHtiYXNlfS50dmNgKSkudG9TdHJpbmcoJ2Jhc2U2NCcpXG4gICAgICAgICAgICAgICAgOiAnJztcbiAgICAgICAgICAgIGNvbnN0IGFiaUpzb24gPSBmcy5yZWFkRmlsZVN5bmMoZGlyKGAke2Jhc2V9LmFiaS5qc29uYCkpLnRvU3RyaW5nKCkudHJpbVJpZ2h0KCk7XG4gICAgICAgICAgICBjb25zdCBhYmkgPSBKU09OLnBhcnNlKGFiaUpzb24pO1xuICAgICAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gYCR7YmFzZVswXS50b1VwcGVyQ2FzZSgpfSR7YmFzZS5zdWJzdHIoMSl9Q29udHJhY3RgO1xuICAgICAgICAgICAgY29uc3QgaXNEZXBsb3kgPSAob3B0aW9ucy5jbGllbnRMZXZlbCB8fCAnZGVwbG95JykgPT09ICdkZXBsb3knO1xuICAgICAgICAgICAgY29uc3QganM6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgICBqcy5wdXNoKGBcbi8vXG4vLyBUaGlzIGZpbGUgd2FzIGdlbmVyYXRlZCB1c2luZyBUT04gTGFicyBkZXZlbG9wZXIgdG9vbHMuXG4vL1xuIFxuY29uc3QgYWJpID0gJHthYmlKc29ufTtcblxuY29uc3QgcGtnID0ge1xuICAgIGFiaSxcbiAgICBpbWFnZUJhc2U2NDogJyR7aW1hZ2VCYXNlNjR9Jyxcbn07XG5cbmNsYXNzICR7Y2xhc3NOYW1lfSB7XG4gICAgY29uc3RydWN0b3IoY2xpZW50LCBhZGRyZXNzLCBrZXlzKSB7XG4gICAgICAgIHRoaXMuY2xpZW50ID0gY2xpZW50O1xuICAgICAgICB0aGlzLmFkZHJlc3MgPSBhZGRyZXNzO1xuICAgICAgICB0aGlzLmtleXMgPSBrZXlzO1xuICAgICAgICB0aGlzLnBhY2thZ2UgPSBwa2c7XG4gICAgICAgIHRoaXMuYWJpID0gYWJpO1xuICAgIH1gKTtcbiAgICAgICAgICAgIGlmIChpc0RlcGxveSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGYgPSBhYmkuZnVuY3Rpb25zLmZpbmQoeCA9PiB4Lm5hbWUgPT09ICdjb25zdHJ1Y3RvcicpXG4gICAgICAgICAgICAgICAgICAgIHx8IHsgbmFtZTogJ2NvbnN0cnVjdG9yJywgaW5wdXRzOiBbXSwgb3V0cHV0czogW10gfTtcbiAgICAgICAgICAgICAgICBDbGllbnRDb2RlLmdlbmVyYXRlSmF2YVNjcmlwdEZ1bmN0aW9uSGVscChjbGFzc05hbWUsIGYsIGpzKTtcbiAgICAgICAgICAgICAgICBqcy5wdXNoKGBcbiAgICBhc3luYyBkZXBsb3koJHtmLmlucHV0cy5sZW5ndGggPiAwID8gJ2NvbnN0cnVjdG9yUGFyYW1zJyA6ICcnfSkge1xuICAgICAgICBpZiAoIXRoaXMua2V5cykge1xuICAgICAgICAgICAgdGhpcy5rZXlzID0gYXdhaXQgdGhpcy5jbGllbnQuY3J5cHRvLmVkMjU1MTlLZXlwYWlyKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hZGRyZXNzID0gKGF3YWl0IHRoaXMuY2xpZW50LmNvbnRyYWN0cy5kZXBsb3koe1xuICAgICAgICAgICAgcGFja2FnZTogcGtnLFxuICAgICAgICAgICAgY29uc3RydWN0b3JQYXJhbXMke2YuaW5wdXRzLmxlbmd0aCA+IDAgPyAnJyA6ICc6IHt9J30sXG4gICAgICAgICAgICBrZXlQYWlyOiB0aGlzLmtleXMsXG4gICAgICAgIH0pKS5hZGRyZXNzO1xuICAgIH1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGpzLnB1c2goYFxuXG4gICAgYXN5bmMgcnVuKGZ1bmN0aW9uTmFtZSwgaW5wdXQpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5jbGllbnQuY29udHJhY3RzLnJ1bih7XG4gICAgICAgICAgICBhZGRyZXNzOiB0aGlzLmFkZHJlc3MsXG4gICAgICAgICAgICBmdW5jdGlvbk5hbWUsXG4gICAgICAgICAgICBhYmksXG4gICAgICAgICAgICBpbnB1dCxcbiAgICAgICAgICAgIGtleVBhaXI6IHRoaXMua2V5cyxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQub3V0cHV0O1xuICAgIH0gICAgXG5cbiAgICBhc3luYyBydW5Mb2NhbChmdW5jdGlvbk5hbWUsIGlucHV0KSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuY2xpZW50LmNvbnRyYWN0cy5ydW5Mb2NhbCh7XG4gICAgICAgICAgICBhZGRyZXNzOiB0aGlzLmFkZHJlc3MsXG4gICAgICAgICAgICBmdW5jdGlvbk5hbWUsXG4gICAgICAgICAgICBhYmksXG4gICAgICAgICAgICBpbnB1dCxcbiAgICAgICAgICAgIGtleVBhaXI6IHRoaXMua2V5cyxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQub3V0cHV0O1xuICAgIH1gKTtcbiAgICAgICAgICAgIGFiaS5mdW5jdGlvbnMuZm9yRWFjaCgoZikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmLm5hbWUgPT09ICdjb25zdHJ1Y3RvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZi5vdXRwdXRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgQ2xpZW50Q29kZS5nZW5lcmF0ZUphdmFTY3JpcHRGdW5jdGlvblJlc3VsdFR5cGUoY2xhc3NOYW1lLCBmLCBqcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIENsaWVudENvZGUuZ2VuZXJhdGVKYXZhU2NyaXB0RnVuY3Rpb25IZWxwKGNsYXNzTmFtZSwgZiwganMpO1xuICAgICAgICAgICAgICAgIGpzLnB1c2goYFxuICAgICR7Zi5uYW1lfSgke2YuaW5wdXRzLmxlbmd0aCA+IDAgPyAnaW5wdXQnIDogJyd9KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJ1bignJHtmLm5hbWV9JywgJHtmLmlucHV0cy5sZW5ndGggPiAwID8gJ2lucHV0JyA6ICd7fSd9KTtcbiAgICB9YCk7XG4gICAgICAgICAgICAgICAgQ2xpZW50Q29kZS5nZW5lcmF0ZUphdmFTY3JpcHRGdW5jdGlvbkhlbHAoY2xhc3NOYW1lLCBmLCBqcyk7XG4gICAgICAgICAgICAgICAganMucHVzaChgXG4gICAgJHtmLm5hbWV9TG9jYWwoJHtmLmlucHV0cy5sZW5ndGggPiAwID8gJ2lucHV0JyA6ICcnfSkge1xuICAgICAgICByZXR1cm4gdGhpcy5ydW5Mb2NhbCgnJHtmLm5hbWV9JywgJHtmLmlucHV0cy5sZW5ndGggPiAwID8gJ2lucHV0JyA6ICd7fSd9KTtcbiAgICB9YCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAganMucHVzaChgXG59XG5cbiR7Y2xhc3NOYW1lfS5wYWNrYWdlID0gcGtnO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICR7Y2xhc3NOYW1lfTtcbmApO1xuICAgICAgICAgICAgZnMud3JpdGVGaWxlU3luYyhkaXIoYCR7YmFzZX1Db250cmFjdC5qc2ApLCBqcy5qb2luKCcnKSwgeyBlbmNvZGluZzogJ3V0ZjgnIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBhc3luYyBnZW5lcmF0ZVJ1c3Qoam9iOiBDb21waWxlcnNKb2IsIGZpbGVzOiBzdHJpbmdbXSwgb3B0aW9uczogQ2xpZW50Q29kZU9wdGlvbnMpIHtcblxuICAgIH1cbn1cbiJdfQ==