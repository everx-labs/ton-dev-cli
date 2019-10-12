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
    value: function generateJavaScriptFunctionHelp(f, js) {
      js.push("\n\n    /*");

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
        js.push("\n     * @returns {Object}");
        f.outputs.forEach(function (o) {
          js.push("\n     * @returns {".concat(o.type, "} ").concat(o.name));
        });
      }

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
                    ClientCode.generateJavaScriptFunctionHelp(f, js);
                    js.push("\n    async deploy(".concat(f.inputs.length > 0 ? 'constructorParams' : '', ") {\n        if (!this.keys) {\n            this.keys = await this.client.crypto.ed25519Keypair();\n        }\n        this.address = (await this.client.contracts.deploy({\n            package: pkg,\n            constructorParams").concat(f.inputs.length > 0 ? '' : ': {}', ",\n            keyPair: this.keys,\n        })).address;\n    }"));
                  }

                  js.push("\n\n    async run(functionName, input) {\n        const result = await this.client.contracts.run({\n            address: this.address,\n            functionName,\n            abi,\n            input,\n            keyPair: this.keys,\n        });\n        return result.output;\n    }    \n\n    async runLocal(functionName, input) {\n        const result = await this.client.contracts.runLocal({\n            address: this.address,\n            functionName,\n            abi,\n            input,\n            keyPair: this.keys,\n        });\n        return result.output;\n    }");
                  abi.functions.forEach(function (f) {
                    if (f.name === 'constructor') {
                      return;
                    }

                    ClientCode.generateJavaScriptFunctionHelp(f, js);
                    js.push("\n    ".concat(f.name, "(").concat(f.inputs.length > 0 ? 'input' : '', ") {\n        return this.run('").concat(f.name, "', ").concat(f.inputs.length > 0 ? 'input' : '{}', ");\n    }"));
                    ClientCode.generateJavaScriptFunctionHelp(f, js);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21waWxlcnMvY2xpZW50LWNvZGUuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwiQ2xpZW50Q29kZUxldmVsIiwibm9uZSIsInJ1biIsImRlcGxveSIsIkNsaWVudENvZGVMYW5ndWFnZSIsImpzIiwicnMiLCJDbGllbnRDb2RlIiwiam9iIiwiQ29tcGlsZXJzSm9iIiwiZmlsZXMiLCJvcHRpb25zIiwiZ2VuZXJhdGVMYW5ndWFnZSIsImxhbmd1YWdlIiwiZ2VuZXJhdG9yIiwiY2xpZW50TGFuZ3VhZ2VzIiwiZmluZCIsIngiLCJ0b0xvd2VyQ2FzZSIsImJpbmQiLCJnZW5lcmF0ZUphdmFTY3JpcHQiLCJnZW5lcmF0ZVJ1c3QiLCJmIiwicHVzaCIsIm5hbWUiLCJpbnB1dHMiLCJsZW5ndGgiLCJmb3JFYWNoIiwiaSIsInR5cGUiLCJvdXRwdXRzIiwibyIsImZpbGUiLCJkaXIiLCJiYXNlIiwiaW1hZ2VCYXNlNjQiLCJjbGllbnRMZXZlbCIsInJlYWRGaWxlU3luYyIsInRvU3RyaW5nIiwiYWJpSnNvbiIsInRyaW1SaWdodCIsImFiaSIsIkpTT04iLCJwYXJzZSIsImNsYXNzTmFtZSIsInRvVXBwZXJDYXNlIiwic3Vic3RyIiwiaXNEZXBsb3kiLCJmdW5jdGlvbnMiLCJnZW5lcmF0ZUphdmFTY3JpcHRGdW5jdGlvbkhlbHAiLCJ3cml0ZUZpbGVTeW5jIiwiam9pbiIsImVuY29kaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQWVBOztBQUNBOztBQWhCQTs7Ozs7Ozs7Ozs7Ozs7QUFrQkEsSUFBTUEsRUFBRSxHQUFHQyxPQUFPLENBQUMsSUFBRCxDQUFsQjs7QUFFTyxJQUFNQyxlQUFlLEdBQUc7QUFDM0JDLEVBQUFBLElBQUksRUFBRSxNQURxQjtBQUUzQkMsRUFBQUEsR0FBRyxFQUFFLEtBRnNCO0FBRzNCQyxFQUFBQSxNQUFNLEVBQUU7QUFIbUIsQ0FBeEI7O0FBUUEsSUFBTUMsa0JBQWtCLEdBQUc7QUFDOUJDLEVBQUFBLEVBQUUsRUFBRSxJQUQwQjtBQUU5QkMsRUFBQUEsRUFBRSxFQUFFO0FBRjBCLENBQTNCOzs7SUFhTUMsVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNhQyxnQkFBQUEsRyw4REFBTUMsaUI7QUFBY0MsZ0JBQUFBLEs7QUFBaUJDLGdCQUFBQSxPOztBQUNqREMsZ0JBQUFBLGdCOzs7OzsrQ0FBbUIsaUJBQ3JCQyxRQURxQixFQUVyQkMsU0FGcUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlDQUlqQkgsT0FBTyxDQUFDSSxlQUFSLENBQXdCQyxJQUF4QixDQUE2QixVQUFBQyxDQUFDO0FBQUEscUNBQUlBLENBQUMsQ0FBQ0MsV0FBRixPQUFvQkwsUUFBUSxDQUFDSyxXQUFULEVBQXhCO0FBQUEsNkJBQTlCLENBSmlCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsbUNBS1hKLFNBQVMsQ0FBQ0ssSUFBVixDQUFlWixVQUFmLEVBQTJCQyxHQUEzQixFQUFnQ0UsS0FBaEMsRUFBdUNDLE9BQXZDLENBTFc7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUI7O2tDQUFuQkMsZ0I7Ozs7Ozt1QkFTQUEsZ0JBQWdCLENBQUNSLGtCQUFrQixDQUFDQyxFQUFwQixFQUF3QixLQUFLZSxrQkFBN0IsQzs7Ozt1QkFDaEJSLGdCQUFnQixDQUFDUixrQkFBa0IsQ0FBQ0UsRUFBcEIsRUFBd0IsS0FBS2UsWUFBN0IsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O21EQUlZQyxDLEVBQUdqQixFLEVBQUk7QUFDekNBLE1BQUFBLEVBQUUsQ0FBQ2tCLElBQUg7O0FBR0EsVUFBSUQsQ0FBQyxDQUFDRSxJQUFGLEtBQVcsYUFBZixFQUE4QjtBQUMxQm5CLFFBQUFBLEVBQUUsQ0FBQ2tCLElBQUg7QUFFSDs7QUFDRCxVQUFJRCxDQUFDLENBQUNHLE1BQUYsQ0FBU0MsTUFBVCxHQUFrQixDQUF0QixFQUF5QjtBQUNyQnJCLFFBQUFBLEVBQUUsQ0FBQ2tCLElBQUg7QUFFQUQsUUFBQUEsQ0FBQyxDQUFDRyxNQUFGLENBQVNFLE9BQVQsQ0FBaUIsVUFBQ0MsQ0FBRCxFQUFPO0FBQ3BCdkIsVUFBQUEsRUFBRSxDQUFDa0IsSUFBSCw0QkFDQ0ssQ0FBQyxDQUFDQyxJQURILHFCQUNrQkQsQ0FBQyxDQUFDSixJQURwQjtBQUVILFNBSEQ7QUFJSDs7QUFDRCxVQUFJRixDQUFDLENBQUNRLE9BQUYsQ0FBVUosTUFBVixHQUFtQixDQUF2QixFQUEwQjtBQUN0QnJCLFFBQUFBLEVBQUUsQ0FBQ2tCLElBQUg7QUFFQUQsUUFBQUEsQ0FBQyxDQUFDUSxPQUFGLENBQVVILE9BQVYsQ0FBa0IsVUFBQ0ksQ0FBRCxFQUFPO0FBQ3JCMUIsVUFBQUEsRUFBRSxDQUFDa0IsSUFBSCw4QkFDR1EsQ0FBQyxDQUFDRixJQURMLGVBQ2NFLENBQUMsQ0FBQ1AsSUFEaEI7QUFFSCxTQUhEO0FBSUg7O0FBQ0RuQixNQUFBQSxFQUFFLENBQUNrQixJQUFIO0FBRUg7Ozs7OztxREFFK0JmLEcsRUFBbUJFLEssRUFBaUJDLE87Ozs7O0FBQ2hFRCxnQkFBQUEsS0FBSyxDQUFDaUIsT0FBTixDQUFjLFVBQUNLLElBQUQsRUFBVTtBQUFBLHNDQUNFLHlCQUFhQSxJQUFiLEVBQW1CLE1BQW5CLENBREY7QUFBQSxzQkFDWkMsR0FEWSxpQkFDWkEsR0FEWTtBQUFBLHNCQUNQQyxJQURPLGlCQUNQQSxJQURPOztBQUVwQixzQkFBTUMsV0FBVyxHQUFHeEIsT0FBTyxDQUFDeUIsV0FBUixLQUF3QnBDLGVBQWUsQ0FBQ0csTUFBeEMsR0FDZEwsRUFBRSxDQUFDdUMsWUFBSCxDQUFnQkosR0FBRyxXQUFJQyxJQUFKLFVBQW5CLEVBQW9DSSxRQUFwQyxDQUE2QyxRQUE3QyxDQURjLEdBRWQsRUFGTjtBQUdBLHNCQUFNQyxPQUFPLEdBQUd6QyxFQUFFLENBQUN1QyxZQUFILENBQWdCSixHQUFHLFdBQUlDLElBQUosZUFBbkIsRUFBeUNJLFFBQXpDLEdBQW9ERSxTQUFwRCxFQUFoQjtBQUNBLHNCQUFNQyxHQUFHLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXSixPQUFYLENBQVo7QUFDQSxzQkFBTUssU0FBUyxhQUFNVixJQUFJLENBQUMsQ0FBRCxDQUFKLENBQVFXLFdBQVIsRUFBTixTQUE4QlgsSUFBSSxDQUFDWSxNQUFMLENBQVksQ0FBWixDQUE5QixhQUFmO0FBQ0Esc0JBQU1DLFFBQVEsR0FBRyxDQUFDcEMsT0FBTyxDQUFDeUIsV0FBUixJQUF1QixRQUF4QixNQUFzQyxRQUF2RDtBQUNBLHNCQUFNL0IsRUFBWSxHQUFHLEVBQXJCO0FBQ0FBLGtCQUFBQSxFQUFFLENBQUNrQixJQUFILGdHQUtFZ0IsT0FMRiw2REFTUUosV0FUUiw2QkFZSlMsU0FaSTs7QUFvQkEsc0JBQUlHLFFBQUosRUFBYztBQUNWLHdCQUFNekIsQ0FBQyxHQUFHbUIsR0FBRyxDQUFDTyxTQUFKLENBQWNoQyxJQUFkLENBQW1CLFVBQUFDLENBQUM7QUFBQSw2QkFBSUEsQ0FBQyxDQUFDTyxJQUFGLEtBQVcsYUFBZjtBQUFBLHFCQUFwQixLQUNIO0FBQUVBLHNCQUFBQSxJQUFJLEVBQUUsYUFBUjtBQUF1QkMsc0JBQUFBLE1BQU0sRUFBRSxFQUEvQjtBQUFtQ0ssc0JBQUFBLE9BQU8sRUFBRTtBQUE1QyxxQkFEUDtBQUVBdkIsb0JBQUFBLFVBQVUsQ0FBQzBDLDhCQUFYLENBQTBDM0IsQ0FBMUMsRUFBNkNqQixFQUE3QztBQUNBQSxvQkFBQUEsRUFBRSxDQUFDa0IsSUFBSCw4QkFDR0QsQ0FBQyxDQUFDRyxNQUFGLENBQVNDLE1BQVQsR0FBa0IsQ0FBbEIsR0FBc0IsbUJBQXRCLEdBQTRDLEVBRC9DLGtQQU9lSixDQUFDLENBQUNHLE1BQUYsQ0FBU0MsTUFBVCxHQUFrQixDQUFsQixHQUFzQixFQUF0QixHQUEyQixNQVAxQztBQVdIOztBQUNEckIsa0JBQUFBLEVBQUUsQ0FBQ2tCLElBQUg7QUF1QkFrQixrQkFBQUEsR0FBRyxDQUFDTyxTQUFKLENBQWNyQixPQUFkLENBQXNCLFVBQUNMLENBQUQsRUFBTztBQUN6Qix3QkFBSUEsQ0FBQyxDQUFDRSxJQUFGLEtBQVcsYUFBZixFQUE4QjtBQUMxQjtBQUNIOztBQUNEakIsb0JBQUFBLFVBQVUsQ0FBQzBDLDhCQUFYLENBQTBDM0IsQ0FBMUMsRUFBNkNqQixFQUE3QztBQUNBQSxvQkFBQUEsRUFBRSxDQUFDa0IsSUFBSCxpQkFDVkQsQ0FBQyxDQUFDRSxJQURRLGNBQ0FGLENBQUMsQ0FBQ0csTUFBRixDQUFTQyxNQUFULEdBQWtCLENBQWxCLEdBQXNCLE9BQXRCLEdBQWdDLEVBRGhDLDJDQUVXSixDQUFDLENBQUNFLElBRmIsZ0JBRXVCRixDQUFDLENBQUNHLE1BQUYsQ0FBU0MsTUFBVCxHQUFrQixDQUFsQixHQUFzQixPQUF0QixHQUFnQyxJQUZ2RDtBQUlBbkIsb0JBQUFBLFVBQVUsQ0FBQzBDLDhCQUFYLENBQTBDM0IsQ0FBMUMsRUFBNkNqQixFQUE3QztBQUNBQSxvQkFBQUEsRUFBRSxDQUFDa0IsSUFBSCxpQkFDVkQsQ0FBQyxDQUFDRSxJQURRLG1CQUNLRixDQUFDLENBQUNHLE1BQUYsQ0FBU0MsTUFBVCxHQUFrQixDQUFsQixHQUFzQixPQUF0QixHQUFnQyxFQURyQyxnREFFZ0JKLENBQUMsQ0FBQ0UsSUFGbEIsZ0JBRTRCRixDQUFDLENBQUNHLE1BQUYsQ0FBU0MsTUFBVCxHQUFrQixDQUFsQixHQUFzQixPQUF0QixHQUFnQyxJQUY1RDtBQUlILG1CQWREO0FBZ0JBckIsa0JBQUFBLEVBQUUsQ0FBQ2tCLElBQUgsa0JBR1ZxQixTQUhVLGlEQUtPQSxTQUxQO0FBT0E5QyxrQkFBQUEsRUFBRSxDQUFDb0QsYUFBSCxDQUFpQmpCLEdBQUcsV0FBSUMsSUFBSixpQkFBcEIsRUFBNEM3QixFQUFFLENBQUM4QyxJQUFILENBQVEsRUFBUixDQUE1QyxFQUF5RDtBQUFFQyxvQkFBQUEsUUFBUSxFQUFFO0FBQVosbUJBQXpEO0FBQ0gsaUJBN0ZEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cURBaUdzQjVDLEcsRUFBbUJFLEssRUFBaUJDLE8iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG4gKiB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbiAqIExpY2Vuc2UgYXQ6IGh0dHBzOi8vd3d3LnRvbi5kZXYvbGljZW5zZXNcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIFRPTiBERVYgc29mdHdhcmUgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG5cbmltcG9ydCB7IHBhcnNlRmlsZUFyZyB9IGZyb20gXCIuLi91dGlscy91dGlsc1wiO1xuaW1wb3J0IHsgQ29tcGlsZXJzSm9iIH0gZnJvbSBcIi4vam9iXCI7XG5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcblxuZXhwb3J0IGNvbnN0IENsaWVudENvZGVMZXZlbCA9IHtcbiAgICBub25lOiAnbm9uZScsXG4gICAgcnVuOiAncnVuJyxcbiAgICBkZXBsb3k6ICdkZXBsb3knXG59O1xuXG5leHBvcnQgdHlwZSBDbGllbnRDb2RlTGV2ZWxUeXBlID0gJEtleXM8dHlwZW9mIENsaWVudENvZGVMZXZlbD47XG5cbmV4cG9ydCBjb25zdCBDbGllbnRDb2RlTGFuZ3VhZ2UgPSB7XG4gICAganM6ICdqcycsXG4gICAgcnM6ICdycycsXG59O1xuXG5leHBvcnQgdHlwZSBDbGllbnRDb2RlTGFuZ3VhZ2VUeXBlID0gJEtleXM8dHlwZW9mIENsaWVudENvZGVMYW5ndWFnZT47XG5cbmV4cG9ydCB0eXBlIENsaWVudENvZGVPcHRpb25zID0ge1xuICAgIGNsaWVudExhbmd1YWdlczogQ2xpZW50Q29kZUxhbmd1YWdlVHlwZVtdLFxuICAgIGNsaWVudExldmVsOiBDbGllbnRDb2RlTGV2ZWxUeXBlLFxufTtcblxuXG5leHBvcnQgY2xhc3MgQ2xpZW50Q29kZSB7XG4gICAgc3RhdGljIGFzeW5jIGdlbmVyYXRlKGpvYiA9IENvbXBpbGVyc0pvYiwgZmlsZXM6IHN0cmluZ1tdLCBvcHRpb25zOiBDbGllbnRDb2RlT3B0aW9ucykge1xuICAgICAgICBjb25zdCBnZW5lcmF0ZUxhbmd1YWdlID0gYXN5bmMgKFxuICAgICAgICAgICAgbGFuZ3VhZ2U6IENsaWVudENvZGVMYW5ndWFnZVR5cGUsXG4gICAgICAgICAgICBnZW5lcmF0b3I6IChqb2I6IENvbXBpbGVyc0pvYiwgb3B0aW9uczogQ2xpZW50Q29kZU9wdGlvbnMpID0+IFByb21pc2U8dm9pZD5cbiAgICAgICAgKSA9PiB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5jbGllbnRMYW5ndWFnZXMuZmluZCh4ID0+IHgudG9Mb3dlckNhc2UoKSA9PT0gbGFuZ3VhZ2UudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBnZW5lcmF0b3IuYmluZChDbGllbnRDb2RlKShqb2IsIGZpbGVzLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBhd2FpdCBnZW5lcmF0ZUxhbmd1YWdlKENsaWVudENvZGVMYW5ndWFnZS5qcywgdGhpcy5nZW5lcmF0ZUphdmFTY3JpcHQpO1xuICAgICAgICBhd2FpdCBnZW5lcmF0ZUxhbmd1YWdlKENsaWVudENvZGVMYW5ndWFnZS5ycywgdGhpcy5nZW5lcmF0ZVJ1c3QpO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGdlbmVyYXRlSmF2YVNjcmlwdEZ1bmN0aW9uSGVscChmLCBqcykge1xuICAgICAgICBqcy5wdXNoKGBcblxuICAgIC8qYCk7XG4gICAgICAgIGlmIChmLm5hbWUgPT09ICdjb25zdHJ1Y3RvcicpIHtcbiAgICAgICAgICAgIGpzLnB1c2goYFxuICAgICAqIEBjb25zdHJ1Y3RvcmApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmLmlucHV0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBqcy5wdXNoKGBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaW5wdXRgKTtcbiAgICAgICAgICAgIGYuaW5wdXRzLmZvckVhY2goKGkpID0+IHtcbiAgICAgICAgICAgICAgICBqcy5wdXNoKGBcbiAgICAgKiBAcGFyYW0geyR7aS50eXBlfX0gaW5wdXQuJHtpLm5hbWV9YClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmLm91dHB1dHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAganMucHVzaChgXG4gICAgICogQHJldHVybnMge09iamVjdH1gKTtcbiAgICAgICAgICAgIGYub3V0cHV0cy5mb3JFYWNoKChvKSA9PiB7XG4gICAgICAgICAgICAgICAganMucHVzaChgXG4gICAgICogQHJldHVybnMgeyR7by50eXBlfX0gJHtvLm5hbWV9YClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGpzLnB1c2goYFxuICAgICAqL2ApO1xuICAgIH1cblxuICAgIHN0YXRpYyBhc3luYyBnZW5lcmF0ZUphdmFTY3JpcHQoam9iOiBDb21waWxlcnNKb2IsIGZpbGVzOiBzdHJpbmdbXSwgb3B0aW9uczogQ2xpZW50Q29kZU9wdGlvbnMpIHtcbiAgICAgICAgZmlsZXMuZm9yRWFjaCgoZmlsZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBkaXIsIGJhc2UgfSA9IHBhcnNlRmlsZUFyZyhmaWxlLCAnLnNvbCcpO1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VCYXNlNjQgPSBvcHRpb25zLmNsaWVudExldmVsID09PSBDbGllbnRDb2RlTGV2ZWwuZGVwbG95XG4gICAgICAgICAgICAgICAgPyBmcy5yZWFkRmlsZVN5bmMoZGlyKGAke2Jhc2V9LnR2Y2ApKS50b1N0cmluZygnYmFzZTY0JylcbiAgICAgICAgICAgICAgICA6ICcnO1xuICAgICAgICAgICAgY29uc3QgYWJpSnNvbiA9IGZzLnJlYWRGaWxlU3luYyhkaXIoYCR7YmFzZX0uYWJpLmpzb25gKSkudG9TdHJpbmcoKS50cmltUmlnaHQoKTtcbiAgICAgICAgICAgIGNvbnN0IGFiaSA9IEpTT04ucGFyc2UoYWJpSnNvbik7XG4gICAgICAgICAgICBjb25zdCBjbGFzc05hbWUgPSBgJHtiYXNlWzBdLnRvVXBwZXJDYXNlKCl9JHtiYXNlLnN1YnN0cigxKX1Db250cmFjdGA7XG4gICAgICAgICAgICBjb25zdCBpc0RlcGxveSA9IChvcHRpb25zLmNsaWVudExldmVsIHx8ICdkZXBsb3knKSA9PT0gJ2RlcGxveSc7XG4gICAgICAgICAgICBjb25zdCBqczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgICAgIGpzLnB1c2goYFxuLy9cbi8vIFRoaXMgZmlsZSB3YXMgZ2VuZXJhdGVkIHVzaW5nIFRPTiBMYWJzIGRldmVsb3BlciB0b29scy5cbi8vXG4gXG5jb25zdCBhYmkgPSAke2FiaUpzb259O1xuXG5jb25zdCBwa2cgPSB7XG4gICAgYWJpLFxuICAgIGltYWdlQmFzZTY0OiAnJHtpbWFnZUJhc2U2NH0nLFxufTtcblxuY2xhc3MgJHtjbGFzc05hbWV9IHtcbiAgICBjb25zdHJ1Y3RvcihjbGllbnQsIGFkZHJlc3MsIGtleXMpIHtcbiAgICAgICAgdGhpcy5jbGllbnQgPSBjbGllbnQ7XG4gICAgICAgIHRoaXMuYWRkcmVzcyA9IGFkZHJlc3M7XG4gICAgICAgIHRoaXMua2V5cyA9IGtleXM7XG4gICAgICAgIHRoaXMucGFja2FnZSA9IHBrZztcbiAgICAgICAgdGhpcy5hYmkgPSBhYmk7XG4gICAgfWApO1xuICAgICAgICAgICAgaWYgKGlzRGVwbG95KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZiA9IGFiaS5mdW5jdGlvbnMuZmluZCh4ID0+IHgubmFtZSA9PT0gJ2NvbnN0cnVjdG9yJylcbiAgICAgICAgICAgICAgICAgICAgfHwgeyBuYW1lOiAnY29uc3RydWN0b3InLCBpbnB1dHM6IFtdLCBvdXRwdXRzOiBbXSB9O1xuICAgICAgICAgICAgICAgIENsaWVudENvZGUuZ2VuZXJhdGVKYXZhU2NyaXB0RnVuY3Rpb25IZWxwKGYsIGpzKTtcbiAgICAgICAgICAgICAgICBqcy5wdXNoKGBcbiAgICBhc3luYyBkZXBsb3koJHtmLmlucHV0cy5sZW5ndGggPiAwID8gJ2NvbnN0cnVjdG9yUGFyYW1zJyA6ICcnfSkge1xuICAgICAgICBpZiAoIXRoaXMua2V5cykge1xuICAgICAgICAgICAgdGhpcy5rZXlzID0gYXdhaXQgdGhpcy5jbGllbnQuY3J5cHRvLmVkMjU1MTlLZXlwYWlyKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hZGRyZXNzID0gKGF3YWl0IHRoaXMuY2xpZW50LmNvbnRyYWN0cy5kZXBsb3koe1xuICAgICAgICAgICAgcGFja2FnZTogcGtnLFxuICAgICAgICAgICAgY29uc3RydWN0b3JQYXJhbXMke2YuaW5wdXRzLmxlbmd0aCA+IDAgPyAnJyA6ICc6IHt9J30sXG4gICAgICAgICAgICBrZXlQYWlyOiB0aGlzLmtleXMsXG4gICAgICAgIH0pKS5hZGRyZXNzO1xuICAgIH1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGpzLnB1c2goYFxuXG4gICAgYXN5bmMgcnVuKGZ1bmN0aW9uTmFtZSwgaW5wdXQpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5jbGllbnQuY29udHJhY3RzLnJ1bih7XG4gICAgICAgICAgICBhZGRyZXNzOiB0aGlzLmFkZHJlc3MsXG4gICAgICAgICAgICBmdW5jdGlvbk5hbWUsXG4gICAgICAgICAgICBhYmksXG4gICAgICAgICAgICBpbnB1dCxcbiAgICAgICAgICAgIGtleVBhaXI6IHRoaXMua2V5cyxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQub3V0cHV0O1xuICAgIH0gICAgXG5cbiAgICBhc3luYyBydW5Mb2NhbChmdW5jdGlvbk5hbWUsIGlucHV0KSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuY2xpZW50LmNvbnRyYWN0cy5ydW5Mb2NhbCh7XG4gICAgICAgICAgICBhZGRyZXNzOiB0aGlzLmFkZHJlc3MsXG4gICAgICAgICAgICBmdW5jdGlvbk5hbWUsXG4gICAgICAgICAgICBhYmksXG4gICAgICAgICAgICBpbnB1dCxcbiAgICAgICAgICAgIGtleVBhaXI6IHRoaXMua2V5cyxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQub3V0cHV0O1xuICAgIH1gKTtcbiAgICAgICAgICAgIGFiaS5mdW5jdGlvbnMuZm9yRWFjaCgoZikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmLm5hbWUgPT09ICdjb25zdHJ1Y3RvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBDbGllbnRDb2RlLmdlbmVyYXRlSmF2YVNjcmlwdEZ1bmN0aW9uSGVscChmLCBqcyk7XG4gICAgICAgICAgICAgICAganMucHVzaChgXG4gICAgJHtmLm5hbWV9KCR7Zi5pbnB1dHMubGVuZ3RoID4gMCA/ICdpbnB1dCcgOiAnJ30pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucnVuKCcke2YubmFtZX0nLCAke2YuaW5wdXRzLmxlbmd0aCA+IDAgPyAnaW5wdXQnIDogJ3t9J30pO1xuICAgIH1gKTtcbiAgICAgICAgICAgICAgICBDbGllbnRDb2RlLmdlbmVyYXRlSmF2YVNjcmlwdEZ1bmN0aW9uSGVscChmLCBqcyk7XG4gICAgICAgICAgICAgICAganMucHVzaChgXG4gICAgJHtmLm5hbWV9TG9jYWwoJHtmLmlucHV0cy5sZW5ndGggPiAwID8gJ2lucHV0JyA6ICcnfSkge1xuICAgICAgICByZXR1cm4gdGhpcy5ydW5Mb2NhbCgnJHtmLm5hbWV9JywgJHtmLmlucHV0cy5sZW5ndGggPiAwID8gJ2lucHV0JyA6ICd7fSd9KTtcbiAgICB9YCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAganMucHVzaChgXG59XG5cbiR7Y2xhc3NOYW1lfS5wYWNrYWdlID0gcGtnO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICR7Y2xhc3NOYW1lfTtcbmApO1xuICAgICAgICAgICAgZnMud3JpdGVGaWxlU3luYyhkaXIoYCR7YmFzZX1Db250cmFjdC5qc2ApLCBqcy5qb2luKCcnKSwgeyBlbmNvZGluZzogJ3V0ZjgnIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBhc3luYyBnZW5lcmF0ZVJ1c3Qoam9iOiBDb21waWxlcnNKb2IsIGZpbGVzOiBzdHJpbmdbXSwgb3B0aW9uczogQ2xpZW50Q29kZU9wdGlvbnMpIHtcblxuICAgIH1cbn1cbiJdfQ==