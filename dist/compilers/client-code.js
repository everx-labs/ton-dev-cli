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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21waWxlcnMvY2xpZW50LWNvZGUuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwiQ2xpZW50Q29kZUxldmVsIiwibm9uZSIsInJ1biIsImRlcGxveSIsIkNsaWVudENvZGVMYW5ndWFnZSIsImpzIiwicnMiLCJDbGllbnRDb2RlIiwiZmlsZXMiLCJvcHRpb25zIiwiZ2VuZXJhdGVMYW5ndWFnZSIsImxhbmd1YWdlIiwiZ2VuZXJhdG9yIiwiY2xpZW50TGFuZ3VhZ2VzIiwiZmluZCIsIngiLCJ0b0xvd2VyQ2FzZSIsImJpbmQiLCJnZW5lcmF0ZUphdmFTY3JpcHQiLCJnZW5lcmF0ZVJ1c3QiLCJjbGFzc05hbWUiLCJmIiwicHVzaCIsIm5hbWUiLCJpbnB1dHMiLCJsZW5ndGgiLCJmb3JFYWNoIiwiaSIsInR5cGUiLCJvdXRwdXRzIiwibyIsImZpbGUiLCJkaXIiLCJiYXNlIiwiaW1hZ2VCYXNlNjQiLCJjbGllbnRMZXZlbCIsInJlYWRGaWxlU3luYyIsInRvU3RyaW5nIiwiYWJpSnNvbiIsInRyaW1SaWdodCIsImFiaSIsIkpTT04iLCJwYXJzZSIsInRvVXBwZXJDYXNlIiwic3Vic3RyIiwiaXNEZXBsb3kiLCJmdW5jdGlvbnMiLCJnZW5lcmF0ZUphdmFTY3JpcHRGdW5jdGlvbkhlbHAiLCJnZW5lcmF0ZUphdmFTY3JpcHRGdW5jdGlvblJlc3VsdFR5cGUiLCJ3cml0ZUZpbGVTeW5jIiwiam9pbiIsImVuY29kaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQWVBOztBQWZBOzs7Ozs7Ozs7Ozs7OztBQWlCQSxJQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQUVPLElBQU1DLGVBQWUsR0FBRztBQUMzQkMsRUFBQUEsSUFBSSxFQUFFLE1BRHFCO0FBRTNCQyxFQUFBQSxHQUFHLEVBQUUsS0FGc0I7QUFHM0JDLEVBQUFBLE1BQU0sRUFBRTtBQUhtQixDQUF4Qjs7QUFRQSxJQUFNQyxrQkFBa0Is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QUUsQ0FBQ2lCLElBQUgsa0JBR1ZGLFNBSFUsaURBS09BLFNBTFA7QUFPQXRCLGtCQUFBQSxFQUFFLENBQUNtRCxhQUFILENBQWlCakIsR0FBRyxXQUFJQyxJQUFKLGlCQUFwQixFQUE0QzVCLEVBQUUsQ0FBQzZDLElBQUgsQ0FBUSxFQUFSLENBQTVDLEVBQXlEO0FBQUVDLG9CQUFBQSxRQUFRLEVBQUU7QUFBWixtQkFBekQ7QUFDSCxpQkFoR0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxREFvR3NCM0MsSyxFQUFpQkMsTyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOC0yMDE5IFRPTiBERVYgU09MVVRJT05TIExURC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgU09GVFdBUkUgRVZBTFVBVElPTiBMaWNlbnNlICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbiAqIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxuICogTGljZW5zZSBhdDogaHR0cHM6Ly93d3cudG9uLmRldi9saWNlbnNlc1xuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgVE9OIERFViBzb2Z0d2FyZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cblxuaW1wb3J0IHsgcGFyc2VGaWxlQXJnIH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxzXCI7XG5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcblxuZXhwb3J0IGNvbnN0IENsaWVudENvZGVMZXZlbCA9IHtcbiAgICBub25lOiAnbm9uZScsXG4gICAgcnVuOiAncnVuJyxcbiAgICBkZXBsb3k6ICdkZXBsb3knXG59O1xuXG5leHBvcnQgdHlwZSBDbGllbnRDb2RlTGV2ZWxUeXBlID0gJEtleXM8dHlwZW9mIENsaWVudENvZGVMZXZlbD47XG5cbmV4cG9ydCBjb25zdCBDbGllbnRDb2RlTGFuZ3VhZ2UgPSB7XG4gICAganM6ICdqcycsXG4gICAgcnM6ICdycycsXG59O1xuXG5leHBvcnQgdHlwZSBDbGllbnRDb2RlTGFuZ3VhZ2VUeXBlID0gJEtleXM8dHlwZW9mIENsaWVudENvZGVMYW5ndWFnZT47XG5cbmV4cG9ydCB0eXBlIENsaWVudENvZGVPcHRpb25zID0ge1xuICAgIGNsaWVudExhbmd1YWdlczogQ2xpZW50Q29kZUxhbmd1YWdlVHlwZVtdLFxuICAgIGNsaWVudExldmVsOiBDbGllbnRDb2RlTGV2ZWxUeXBlLFxufTtcblxuXG5leHBvcnQgY2xhc3MgQ2xpZW50Q29kZSB7XG4gICAgc3RhdGljIGFzeW5jIGdlbmVyYXRlKGZpbGVzOiBzdHJpbmdbXSwgb3B0aW9uczogQ2xpZW50Q29kZU9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgZ2VuZXJhdGVMYW5ndWFnZSA9IGFzeW5jIChcbiAgICAgICAgICAgIGxhbmd1YWdlOiBDbGllbnRDb2RlTGFuZ3VhZ2VUeXBlLFxuICAgICAgICAgICAgZ2VuZXJhdG9yOiAob3B0aW9uczogQ2xpZW50Q29kZU9wdGlvbnMpID0+IFByb21pc2U8dm9pZD5cbiAgICAgICAgKSA9PiB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5jbGllbnRMYW5ndWFnZXMuZmluZCh4ID0+IHgudG9Mb3dlckNhc2UoKSA9PT0gbGFuZ3VhZ2UudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBnZW5lcmF0b3IuYmluZChDbGllbnRDb2RlKShmaWxlcywgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgYXdhaXQgZ2VuZXJhdGVMYW5ndWFnZShDbGllbnRDb2RlTGFuZ3VhZ2UuanMsIHRoaXMuZ2VuZXJhdGVKYXZhU2NyaXB0KTtcbiAgICAgICAgYXdhaXQgZ2VuZXJhdGVMYW5ndWFnZShDbGllbnRDb2RlTGFuZ3VhZ2UucnMsIHRoaXMuZ2VuZXJhdGVSdXN0KTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBnZW5lcmF0ZUphdmFTY3JpcHRGdW5jdGlvbkhlbHAoY2xhc3NOYW1lLCBmLCBqcykge1xuICAgICAgICBqcy5wdXNoKGBcblxuICAgIC8qKmApO1xuICAgICAgICBpZiAoZi5uYW1lID09PSAnY29uc3RydWN0b3InKSB7XG4gICAgICAgICAgICBqcy5wdXNoKGBcbiAgICAgKiBAY29uc3RydWN0b3JgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZi5pbnB1dHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAganMucHVzaChgXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlucHV0YCk7XG4gICAgICAgICAgICBmLmlucHV0cy5mb3JFYWNoKChpKSA9PiB7XG4gICAgICAgICAgICAgICAganMucHVzaChgXG4gICAgICogQHBhcmFtIHske2kudHlwZX19IGlucHV0LiR7aS5uYW1lfWApXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZi5vdXRwdXRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGpzLnB1c2goYFxuICAgICAqIEByZXR1cm4ge1Byb21pc2UuPCR7Y2xhc3NOYW1lfV8ke2YubmFtZX0+fWApO1xuICAgICAgICB9XG4gICAgICAgIGpzLnB1c2goYFxuICAgICAqL2ApO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZW5lcmF0ZUphdmFTY3JpcHRGdW5jdGlvblJlc3VsdFR5cGUoY2xhc3NOYW1lLCBmLCBqcykge1xuICAgICAgICBqcy5wdXNoKGBcblxuICAgIC8qKlxuICAgICAqIEB0eXBlZGVmICR7Y2xhc3NOYW1lfV8ke2YubmFtZX1cbiAgICAgKiBAdHlwZSB7b2JqZWN0fWApO1xuICAgICAgICBmLm91dHB1dHMuZm9yRWFjaCgobykgPT4ge1xuICAgICAgICAgICAganMucHVzaChgXG4gICAgICogQHByb3BlcnR5IHske28udHlwZX19ICR7by5uYW1lfWApXG4gICAgICAgIH0pO1xuICAgICAgICBqcy5wdXNoKGBcbiAgICAgKi9gKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYXN5bmMgZ2VuZXJhdGVKYXZhU2NyaXB0KGZpbGVzOiBzdHJpbmdbXSwgb3B0aW9uczogQ2xpZW50Q29kZU9wdGlvbnMpIHtcbiAgICAgICAgZmlsZXMuZm9yRWFjaCgoZmlsZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBkaXIsIGJhc2UgfSA9IHBhcnNlRmlsZUFyZyhmaWxlLCAnLnNvbCcpO1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VCYXNlNjQgPSBvcHRpb25zLmNsaWVudExldmVsID09PSBDbGllbnRDb2RlTGV2ZWwuZGVwbG95XG4gICAgICAgICAgICAgICAgPyBmcy5yZWFkRmlsZVN5bmMoZGlyKGAke2Jhc2V9LnR2Y2ApKS50b1N0cmluZygnYmFzZTY0JylcbiAgICAgICAgICAgICAgICA6ICcnO1xuICAgICAgICAgICAgY29uc3QgYWJpSnNvbiA9IGZzLnJlYWRGaWxlU3luYyhkaXIoYCR7YmFzZX0uYWJpLmpzb25gKSkudG9TdHJpbmcoKS50cmltUmlnaHQoKTtcbiAgICAgICAgICAgIGNvbnN0IGFiaSA9IEpTT04ucGFyc2UoYWJpSnNvbik7XG4gICAgICAgICAgICBjb25zdCBjbGFzc05hbWUgPSBgJHtiYXNlWzBdLnRvVXBwZXJDYXNlKCl9JHtiYXNlLnN1YnN0cigxKX1Db250cmFjdGA7XG4gICAgICAgICAgICBjb25zdCBpc0RlcGxveSA9IChvcHRpb25zLmNsaWVudExldmVsIHx8ICdkZXBsb3knKSA9PT0gJ2RlcGxveSc7XG4gICAgICAgICAgICBjb25zdCBqczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgICAgIGpzLnB1c2goYFxuLy9cbi8vIFRoaXMgZmlsZSB3YXMgZ2VuZXJhdGVkIHVzaW5nIFRPTiBMYWJzIGRldmVsb3BlciB0b29scy5cbi8vXG4gXG5jb25zdCBhYmkgPSAke2FiaUpzb259O1xuXG5jb25zdCBwa2cgPSB7XG4gICAgYWJpLFxuICAgIGltYWdlQmFzZTY0OiAnJHtpbWFnZUJhc2U2NH0nLFxufTtcblxuY2xhc3MgJHtjbGFzc05hbWV9IHtcbiAgICBjb25zdHJ1Y3RvcihjbGllbnQsIGFkZHJlc3MsIGtleXMpIHtcbiAgICAgICAgdGhpcy5jbGllbnQgPSBjbGllbnQ7XG4gICAgICAgIHRoaXMuYWRkcmVzcyA9IGFkZHJlc3M7XG4gICAgICAgIHRoaXMua2V5cyA9IGtleXM7XG4gICAgICAgIHRoaXMucGFja2FnZSA9IHBrZztcbiAgICAgICAgdGhpcy5hYmkgPSBhYmk7XG4gICAgfWApO1xuICAgICAgICAgICAgaWYgKGlzRGVwbG95KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZiA9IGFiaS5mdW5jdGlvbnMuZmluZCh4ID0+IHgubmFtZSA9PT0gJ2NvbnN0cnVjdG9yJylcbiAgICAgICAgICAgICAgICAgICAgfHwgeyBuYW1lOiAnY29uc3RydWN0b3InLCBpbnB1dHM6IFtdLCBvdXRwdXRzOiBbXSB9O1xuICAgICAgICAgICAgICAgIENsaWVudENvZGUuZ2VuZXJhdGVKYXZhU2NyaXB0RnVuY3Rpb25IZWxwKGNsYXNzTmFtZSwgZiwganMpO1xuICAgICAgICAgICAgICAgIGpzLnB1c2goYFxuICAgIGFzeW5jIGRlcGxveSgke2YuaW5wdXRzLmxlbmd0aCA+IDAgPyAnY29uc3RydWN0b3JQYXJhbXMnIDogJyd9KSB7XG4gICAgICAgIGlmICghdGhpcy5rZXlzKSB7XG4gICAgICAgICAgICB0aGlzLmtleXMgPSBhd2FpdCB0aGlzLmNsaWVudC5jcnlwdG8uZWQyNTUxOUtleXBhaXIoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFkZHJlc3MgPSAoYXdhaXQgdGhpcy5jbGllbnQuY29udHJhY3RzLmRlcGxveSh7XG4gICAgICAgICAgICBwYWNrYWdlOiBwa2csXG4gICAgICAgICAgICBjb25zdHJ1Y3RvclBhcmFtcyR7Zi5pbnB1dHMubGVuZ3RoID4gMCA/ICcnIDogJzoge30nfSxcbiAgICAgICAgICAgIGtleVBhaXI6IHRoaXMua2V5cyxcbiAgICAgICAgfSkpLmFkZHJlc3M7XG4gICAgfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAganMucHVzaChgXG5cbiAgICBhc3luYyBydW4oZnVuY3Rpb25OYW1lLCBpbnB1dCkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLmNsaWVudC5jb250cmFjdHMucnVuKHtcbiAgICAgICAgICAgIGFkZHJlc3M6IHRoaXMuYWRkcmVzcyxcbiAgICAgICAgICAgIGZ1bmN0aW9uTmFtZSxcbiAgICAgICAgICAgIGFiaSxcbiAgICAgICAgICAgIGlucHV0LFxuICAgICAgICAgICAga2V5UGFpcjogdGhpcy5rZXlzLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5vdXRwdXQ7XG4gICAgfSAgICBcblxuICAgIGFzeW5jIHJ1bkxvY2FsKGZ1bmN0aW9uTmFtZSwgaW5wdXQpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5jbGllbnQuY29udHJhY3RzLnJ1bkxvY2FsKHtcbiAgICAgICAgICAgIGFkZHJlc3M6IHRoaXMuYWRkcmVzcyxcbiAgICAgICAgICAgIGZ1bmN0aW9uTmFtZSxcbiAgICAgICAgICAgIGFiaSxcbiAgICAgICAgICAgIGlucHV0LFxuICAgICAgICAgICAga2V5UGFpcjogdGhpcy5rZXlzLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5vdXRwdXQ7XG4gICAgfWApO1xuICAgICAgICAgICAgYWJpLmZ1bmN0aW9ucy5mb3JFYWNoKChmKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGYubmFtZSA9PT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChmLm91dHB1dHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBDbGllbnRDb2RlLmdlbmVyYXRlSmF2YVNjcmlwdEZ1bmN0aW9uUmVzdWx0VHlwZShjbGFzc05hbWUsIGYsIGpzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgQ2xpZW50Q29kZS5nZW5lcmF0ZUphdmFTY3JpcHRGdW5jdGlvbkhlbHAoY2xhc3NOYW1lLCBmLCBqcyk7XG4gICAgICAgICAgICAgICAganMucHVzaChgXG4gICAgJHtmLm5hbWV9KCR7Zi5pbnB1dHMubGVuZ3RoID4gMCA/ICdpbnB1dCcgOiAnJ30pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucnVuKCcke2YubmFtZX0nLCAke2YuaW5wdXRzLmxlbmd0aCA+IDAgPyAnaW5wdXQnIDogJ3t9J30pO1xuICAgIH1gKTtcbiAgICAgICAgICAgICAgICBDbGllbnRDb2RlLmdlbmVyYXRlSmF2YVNjcmlwdEZ1bmN0aW9uSGVscChjbGFzc05hbWUsIGYsIGpzKTtcbiAgICAgICAgICAgICAgICBqcy5wdXNoKGBcbiAgICAke2YubmFtZX1Mb2NhbCgke2YuaW5wdXRzLmxlbmd0aCA+IDAgPyAnaW5wdXQnIDogJyd9KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJ1bkxvY2FsKCcke2YubmFtZX0nLCAke2YuaW5wdXRzLmxlbmd0aCA+IDAgPyAnaW5wdXQnIDogJ3t9J30pO1xuICAgIH1gKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBqcy5wdXNoKGBcbn1cblxuJHtjbGFzc05hbWV9LnBhY2thZ2UgPSBwa2c7XG5cbm1vZHVsZS5leHBvcnRzID0gJHtjbGFzc05hbWV9O1xuYCk7XG4gICAgICAgICAgICBmcy53cml0ZUZpbGVTeW5jKGRpcihgJHtiYXNlfUNvbnRyYWN0LmpzYCksIGpzLmpvaW4oJycpLCB7IGVuY29kaW5nOiAndXRmOCcgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGFzeW5jIGdlbmVyYXRlUnVzdChmaWxlczogc3RyaW5nW10sIG9wdGlvbnM6IENsaWVudENvZGVPcHRpb25zKSB7XG5cbiAgICB9XG59XG4iXX0=