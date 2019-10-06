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
                  var js = "\n//\n// This file was generated using TON Labs developer tools.\n//\n \nconst abi = ".concat(abi, ";\n\nconst pkg = {\n    abi,\n    imageBase64: '").concat(imageBase64, "'\n};\n\nclass ").concat(className, " {\n    constructor(client, address, keys) {\n        this.client = client;\n        this.address = address;\n        this.keys = keys;\n        this.package = pkg;\n        this.abi = abi;\n    }\n\n    async deploy(constructorParams) {\n        if (!this.keys) {\n            this.keys = await this.client.crypto.ed25519Keypair();\n        }\n        this.address = (await this.client.contracts.deploy({\n            package: pkg,\n            constructorParams,\n            keyPair: this.keys,\n        })).address;\n    }\n        \n    async run(functionName, input) {\n        const result = await this.client.contracts.run({\n            address: this.address,\n            functionName,\n            abi,\n            input,\n            keyPair: this.keys,\n        });\n        return result.output;\n    }    \n\n    async runLocal(functionName, input) {\n        const result = await this.client.contracts.runLocal({\n            address: this.address,\n            functionName,\n            abi,\n            input,\n            keyPair: this.keys,\n        });\n        return result.output;\n    }    \n}\n\n").concat(className, ".package = pkg;\n\nmodule.exports = ").concat(className, ";\n");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21waWxlcnMvY2xpZW50LWNvZGUuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwiQ2xpZW50Q29kZUxldmVsIiwibm9uZSIsInJ1biIsImRlcGxveSIsIkNsaWVudENvZGVMYW5ndWFnZSIsImphdmFTY3JpcHQiLCJydXN0IiwiQ2xpZW50Q29kZSIsImpvYiIsIkNvbXBpbGVyc0pvYiIsImZpbGVzIiwib3B0aW9ucyIsImdlbmVyYXRlTGFuZ3VhZ2UiLCJsYW5ndWFnZSIsImdlbmVyYXRvciIsImNsaWVudExhbmd1YWdlcyIsImZpbmQiLCJ4IiwidG9Mb3dlckNhc2UiLCJiaW5kIiwiZ2VuZXJhdGVKYXZhU2NyaXB0IiwiZ2VuZXJhdGVSdXN0IiwiZm9yRWFjaCIsImZpbGUiLCJkaXIiLCJiYXNlIiwiaW1hZ2VCYXNlNjQiLCJjbGllbnRMZXZlbCIsInJlYWRGaWxlU3luYyIsInRvU3RyaW5nIiwiYWJpIiwidHJpbVJpZ2h0IiwiY2xhc3NOYW1lIiwidG9VcHBlckNhc2UiLCJzdWJzdHIiLCJqcyIsIndyaXRlRmlsZVN5bmMiLCJlbmNvZGluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlQTs7QUFDQTs7QUFoQkE7Ozs7Ozs7Ozs7Ozs7O0FBaUJBLElBQU1BLEVBQUUsR0FBR0MsT0FBTyxDQUFDLElBQUQsQ0FBbEI7O0FBRU8sSUFBTUMsZUFBZSxHQUFHO0FBQzNCQyxFQUFBQSxJQUFJLEVBQUUsTUFEcUI7QUFFM0JDLEVBQUFBLEdBQUcsRUFBRSxLQUZzQjtBQUczQkMsRUFBQUEsTUFBTSxFQUFFO0FBSG1CLENBQXhCOztBQVFBLElBQU1DLGtCQUFrQixHQUFHO0FBQzlCQyxFQUFBQSxVQUFVLEVBQUUsSUFEa0I7QUFFOUJDLEVBQUFBLElBQUksRUFBRTtBQUZ3QixDQUEzQjs7O0lBWU1DLFU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDYUMsZ0JBQUFBLEcsOERBQU1DLGlCO0FBQWNDLGdCQUFBQSxLO0FBQWlCQyxnQkFBQUEsTzs7QUFDakRDLGdCQUFBQSxnQjs7Ozs7K0NBQW1CLGlCQUNyQkMsUUFEcUIsRUFFckJDLFNBRnFCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQ0FJakJILE9BQU8sQ0FBQ0ksZUFBUixDQUF3QkMsSUFBeEIsQ0FBNkIsVUFBQUMsQ0FBQztBQUFBLHFDQUFJQSxDQUFDLENBQUNDLFdBQUYsT0FBb0JMLFFBQVEsQ0FBQ0ssV0FBVCxFQUF4QjtBQUFBLDZCQUE5QixDQUppQjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLG1DQUtYSixTQUFTLENBQUNLLElBQVYsQ0FBZVosVUFBZixFQUEyQkMsR0FBM0IsRUFBZ0NFLEtBQWhDLEVBQXVDQyxPQUF2QyxDQUxXOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1COztrQ0FBbkJDLGdCOzs7Ozs7dUJBU0FBLGdCQUFnQixDQUFDUixrQkFBa0IsQ0FBQ0MsVUFBcEIsRUFBZ0MsS0FBS2Usa0JBQXJDLEM7Ozs7dUJBQ2hCUixnQkFBZ0IsQ0FBQ1Isa0JBQWtCLENBQUNFLElBQXBCLEVBQTBCLEtBQUtlLFlBQS9CLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxREFJTWIsRyxFQUFtQkUsSyxFQUFpQkMsTzs7Ozs7QUFDaEVELGdCQUFBQSxLQUFLLENBQUNZLE9BQU4sQ0FBYyxVQUFDQyxJQUFELEVBQVU7QUFBQSxzQ0FDQSx5QkFBYUEsSUFBYixFQUFtQixNQUFuQixDQURBO0FBQUEsc0JBQ2JDLEdBRGEsaUJBQ2JBLEdBRGE7QUFBQSxzQkFDUkMsSUFEUSxpQkFDUkEsSUFEUTs7QUFFcEIsc0JBQU1DLFdBQVcsR0FBR2YsT0FBTyxDQUFDZ0IsV0FBUixLQUF3QjNCLGVBQWUsQ0FBQ0csTUFBeEMsR0FDZEwsRUFBRSxDQUFDOEIsWUFBSCxDQUFnQkosR0FBRyxXQUFJQyxJQUFKLFVBQW5CLEVBQW9DSSxRQUFwQyxDQUE2QyxRQUE3QyxDQURjLEdBRWQsRUFGTjtBQUdBLHNCQUFNQyxHQUFHLEdBQUdoQyxFQUFFLENBQUM4QixZQUFILENBQWdCSixHQUFHLFdBQUlDLElBQUosZUFBbkIsRUFBeUNJLFFBQXpDLEdBQW9ERSxTQUFwRCxFQUFaO0FBQ0Esc0JBQU1DLFNBQVMsYUFBTVAsSUFBSSxDQUFDLENBQUQsQ0FBSixDQUFRUSxXQUFSLEVBQU4sU0FBOEJSLElBQUksQ0FBQ1MsTUFBTCxDQUFZLENBQVosQ0FBOUIsYUFBZjtBQUNBLHNCQUFNQyxFQUFFLGtHQU1OTCxHQU5NLDZEQVVBSixXQVZBLDRCQWFaTSxTQWJZLGtuQ0F3RGxCQSxTQXhEa0IsaURBMEREQSxTQTFEQyxRQUFSO0FBNERBbEMsa0JBQUFBLEVBQUUsQ0FBQ3NDLGFBQUgsQ0FBaUJaLEdBQUcsV0FBSUMsSUFBSixpQkFBcEIsRUFBNENVLEVBQTVDLEVBQWdEO0FBQUVFLG9CQUFBQSxRQUFRLEVBQUU7QUFBWixtQkFBaEQ7QUFDSCxpQkFwRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxREF3RXNCN0IsRyxFQUFtQkUsSyxFQUFpQkMsTyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOC0yMDE5IFRPTiBERVYgU09MVVRJT05TIExURC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgU09GVFdBUkUgRVZBTFVBVElPTiBMaWNlbnNlICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbiAqIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxuICogTGljZW5zZSBhdDogaHR0cHM6Ly93d3cudG9uLmRldi9saWNlbnNlc1xuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgVE9OIERFViBzb2Z0d2FyZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cblxuaW1wb3J0IHsgcGFyc2VGaWxlQXJnIH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxzXCI7XG5pbXBvcnQgeyBDb21waWxlcnNKb2IgfSBmcm9tIFwiLi9qb2JcIjtcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcblxuZXhwb3J0IGNvbnN0IENsaWVudENvZGVMZXZlbCA9IHtcbiAgICBub25lOiAnbm9uZScsXG4gICAgcnVuOiAncnVuJyxcbiAgICBkZXBsb3k6ICdkZXBsb3knXG59O1xuXG5leHBvcnQgdHlwZSBDbGllbnRDb2RlTGV2ZWxUeXBlID0gJEtleXM8dHlwZW9mIENsaWVudENvZGVMZXZlbD47XG5cbmV4cG9ydCBjb25zdCBDbGllbnRDb2RlTGFuZ3VhZ2UgPSB7XG4gICAgamF2YVNjcmlwdDogJ2pzJyxcbiAgICBydXN0OiAncnMnLFxufTtcblxuZXhwb3J0IHR5cGUgQ2xpZW50Q29kZU9wdGlvbnMgPSB7XG4gICAgY2xpZW50TGFuZ3VhZ2VzOiBDbGllbnRDb2RlTGFuZ3VhZ2VUeXBlW10sXG4gICAgY2xpZW50TGV2ZWw6IENsaWVudENvZGVMZXZlbFR5cGUsXG59O1xuXG5leHBvcnQgdHlwZSBDbGllbnRDb2RlTGFuZ3VhZ2VUeXBlID0gJEtleXM8dHlwZW9mIENsaWVudENvZGVMYW5ndWFnZT47XG5cbmV4cG9ydCBjbGFzcyBDbGllbnRDb2RlIHtcbiAgICBzdGF0aWMgYXN5bmMgZ2VuZXJhdGUoam9iID0gQ29tcGlsZXJzSm9iLCBmaWxlczogc3RyaW5nW10sIG9wdGlvbnM6IENsaWVudENvZGVPcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IGdlbmVyYXRlTGFuZ3VhZ2UgPSBhc3luYyAoXG4gICAgICAgICAgICBsYW5ndWFnZTogQ2xpZW50Q29kZUxhbmd1YWdlVHlwZSxcbiAgICAgICAgICAgIGdlbmVyYXRvcjogKGpvYjogQ29tcGlsZXJzSm9iLCBvcHRpb25zOiBDbGllbnRDb2RlT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPlxuICAgICAgICApID0+IHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmNsaWVudExhbmd1YWdlcy5maW5kKHggPT4geC50b0xvd2VyQ2FzZSgpID09PSBsYW5ndWFnZS50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgICAgICAgICAgIGF3YWl0IGdlbmVyYXRvci5iaW5kKENsaWVudENvZGUpKGpvYiwgZmlsZXMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGF3YWl0IGdlbmVyYXRlTGFuZ3VhZ2UoQ2xpZW50Q29kZUxhbmd1YWdlLmphdmFTY3JpcHQsIHRoaXMuZ2VuZXJhdGVKYXZhU2NyaXB0KTtcbiAgICAgICAgYXdhaXQgZ2VuZXJhdGVMYW5ndWFnZShDbGllbnRDb2RlTGFuZ3VhZ2UucnVzdCwgdGhpcy5nZW5lcmF0ZVJ1c3QpO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGFzeW5jIGdlbmVyYXRlSmF2YVNjcmlwdChqb2I6IENvbXBpbGVyc0pvYiwgZmlsZXM6IHN0cmluZ1tdLCBvcHRpb25zOiBDbGllbnRDb2RlT3B0aW9ucykge1xuICAgICAgICBmaWxlcy5mb3JFYWNoKChmaWxlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7ZGlyLCBiYXNlfSA9IHBhcnNlRmlsZUFyZyhmaWxlLCAnLnNvbCcpO1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VCYXNlNjQgPSBvcHRpb25zLmNsaWVudExldmVsID09PSBDbGllbnRDb2RlTGV2ZWwuZGVwbG95XG4gICAgICAgICAgICAgICAgPyBmcy5yZWFkRmlsZVN5bmMoZGlyKGAke2Jhc2V9LnR2Y2ApKS50b1N0cmluZygnYmFzZTY0JylcbiAgICAgICAgICAgICAgICA6ICcnO1xuICAgICAgICAgICAgY29uc3QgYWJpID0gZnMucmVhZEZpbGVTeW5jKGRpcihgJHtiYXNlfS5hYmkuanNvbmApKS50b1N0cmluZygpLnRyaW1SaWdodCgpO1xuICAgICAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gYCR7YmFzZVswXS50b1VwcGVyQ2FzZSgpfSR7YmFzZS5zdWJzdHIoMSl9Q29udHJhY3RgO1xuICAgICAgICAgICAgY29uc3QganMgPVxuYFxuLy9cbi8vIFRoaXMgZmlsZSB3YXMgZ2VuZXJhdGVkIHVzaW5nIFRPTiBMYWJzIGRldmVsb3BlciB0b29scy5cbi8vXG4gXG5jb25zdCBhYmkgPSAke2FiaX07XG5cbmNvbnN0IHBrZyA9IHtcbiAgICBhYmksXG4gICAgaW1hZ2VCYXNlNjQ6ICcke2ltYWdlQmFzZTY0fSdcbn07XG5cbmNsYXNzICR7Y2xhc3NOYW1lfSB7XG4gICAgY29uc3RydWN0b3IoY2xpZW50LCBhZGRyZXNzLCBrZXlzKSB7XG4gICAgICAgIHRoaXMuY2xpZW50ID0gY2xpZW50O1xuICAgICAgICB0aGlzLmFkZHJlc3MgPSBhZGRyZXNzO1xuICAgICAgICB0aGlzLmtleXMgPSBrZXlzO1xuICAgICAgICB0aGlzLnBhY2thZ2UgPSBwa2c7XG4gICAgICAgIHRoaXMuYWJpID0gYWJpO1xuICAgIH1cblxuICAgIGFzeW5jIGRlcGxveShjb25zdHJ1Y3RvclBhcmFtcykge1xuICAgICAgICBpZiAoIXRoaXMua2V5cykge1xuICAgICAgICAgICAgdGhpcy5rZXlzID0gYXdhaXQgdGhpcy5jbGllbnQuY3J5cHRvLmVkMjU1MTlLZXlwYWlyKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hZGRyZXNzID0gKGF3YWl0IHRoaXMuY2xpZW50LmNvbnRyYWN0cy5kZXBsb3koe1xuICAgICAgICAgICAgcGFja2FnZTogcGtnLFxuICAgICAgICAgICAgY29uc3RydWN0b3JQYXJhbXMsXG4gICAgICAgICAgICBrZXlQYWlyOiB0aGlzLmtleXMsXG4gICAgICAgIH0pKS5hZGRyZXNzO1xuICAgIH1cbiAgICAgICAgXG4gICAgYXN5bmMgcnVuKGZ1bmN0aW9uTmFtZSwgaW5wdXQpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5jbGllbnQuY29udHJhY3RzLnJ1bih7XG4gICAgICAgICAgICBhZGRyZXNzOiB0aGlzLmFkZHJlc3MsXG4gICAgICAgICAgICBmdW5jdGlvbk5hbWUsXG4gICAgICAgICAgICBhYmksXG4gICAgICAgICAgICBpbnB1dCxcbiAgICAgICAgICAgIGtleVBhaXI6IHRoaXMua2V5cyxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQub3V0cHV0O1xuICAgIH0gICAgXG5cbiAgICBhc3luYyBydW5Mb2NhbChmdW5jdGlvbk5hbWUsIGlucHV0KSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuY2xpZW50LmNvbnRyYWN0cy5ydW5Mb2NhbCh7XG4gICAgICAgICAgICBhZGRyZXNzOiB0aGlzLmFkZHJlc3MsXG4gICAgICAgICAgICBmdW5jdGlvbk5hbWUsXG4gICAgICAgICAgICBhYmksXG4gICAgICAgICAgICBpbnB1dCxcbiAgICAgICAgICAgIGtleVBhaXI6IHRoaXMua2V5cyxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQub3V0cHV0O1xuICAgIH0gICAgXG59XG5cbiR7Y2xhc3NOYW1lfS5wYWNrYWdlID0gcGtnO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICR7Y2xhc3NOYW1lfTtcbmA7XG4gICAgICAgICAgICBmcy53cml0ZUZpbGVTeW5jKGRpcihgJHtiYXNlfUNvbnRyYWN0LmpzYCksIGpzLCB7IGVuY29kaW5nOiAndXRmOCcgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGFzeW5jIGdlbmVyYXRlUnVzdChqb2I6IENvbXBpbGVyc0pvYiwgZmlsZXM6IHN0cmluZ1tdLCBvcHRpb25zOiBDbGllbnRDb2RlT3B0aW9ucykge1xuXG4gICAgfVxufVxuIl19