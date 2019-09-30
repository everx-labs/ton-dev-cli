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
            resolved,
            generateLanguage,
            _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                job = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : _job.CompilersJob;
                files = _args2.length > 1 ? _args2[1] : undefined;
                options = _args2.length > 2 ? _args2[2] : undefined;
                resolved = {
                  clientLanguages: (options.clientLanguages || '').split(','),
                  clientLevel: options.clientLevel || ClientCodeLevel.run
                };

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
                            if (!resolved.clientLanguages.find(function (x) {
                              return x.toLowerCase() === language.toLowerCase();
                            })) {
                              _context.next = 3;
                              break;
                            }

                            _context.next = 3;
                            return generator.bind(ClientCode)(job, files, resolved);

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

                _context2.next = 7;
                return generateLanguage(ClientCodeLanguage.javaScript, this.generateJavaScript);

              case 7:
                _context2.next = 9;
                return generateLanguage(ClientCodeLanguage.rust, this.generateRust);

              case 9:
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
                  var js = "\n//\n// This file was generated using TON Labs developer tools.\n//\n \nconst abi = ".concat(abi, ";\n\nconst pkg = {\n    abi,\n    imageBase64: '").concat(imageBase64, "'\n};\n\nclass ").concat(className, " {\n    constructor(client, address, keys) {\n        this.client = client;\n        this.address = address;\n        this.keys = keys;\n    }\n\n    async deploy(constructorParams) {\n        if (!this.keys) {\n            this.keys = await this.client.crypto.ed25519Keypair();\n        }\n        this.address = (await this.client.contracts.deploy({\n            package: pkg,\n            constructorParams,\n            keyPair: this.keys,\n        })).address;\n    }\n        \n    async run(functionName, input) {\n        const result = await this.client.contracts.run({\n            address: this.address,\n            functionName,\n            abi,\n            input,\n            keyPair: this.keys,\n        });\n        return result.output;\n    }    \n}\n\n").concat(className, ".package = pkg;\n\nmodule.exports = ").concat(className, ";\n");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21waWxlcnMvY2xpZW50LWNvZGUuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwiQ2xpZW50Q29kZUxldmVsIiwibm9uZSIsInJ1biIsImRlcGxveSIsIkNsaWVudENvZGVMYW5ndWFnZSIsImphdmFTY3JpcHQiLCJydXN0IiwiQ2xpZW50Q29kZSIsImpvYiIsIkNvbXBpbGVyc0pvYiIsImZpbGVzIiwib3B0aW9ucyIsInJlc29sdmVkIiwiY2xpZW50TGFuZ3VhZ2VzIiwic3BsaXQiLCJjbGllbnRMZXZlbCIsImdlbmVyYXRlTGFuZ3VhZ2UiLCJsYW5ndWFnZSIsImdlbmVyYXRvciIsImZpbmQiLCJ4IiwidG9Mb3dlckNhc2UiLCJiaW5kIiwiZ2VuZXJhdGVKYXZhU2NyaXB0IiwiZ2VuZXJhdGVSdXN0IiwiZm9yRWFjaCIsImZpbGUiLCJkaXIiLCJiYXNlIiwiaW1hZ2VCYXNlNjQiLCJyZWFkRmlsZVN5bmMiLCJ0b1N0cmluZyIsImFiaSIsInRyaW1SaWdodCIsImNsYXNzTmFtZSIsInRvVXBwZXJDYXNlIiwic3Vic3RyIiwianMiLCJ3cml0ZUZpbGVTeW5jIiwiZW5jb2RpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZUE7O0FBQ0E7O0FBaEJBOzs7Ozs7Ozs7Ozs7OztBQWlCQSxJQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQUVPLElBQU1DLGVBQWUsR0FBRztBQUMzQkMsRUFBQUEsSUFBSSxFQUFFLE1BRHFCO0FBRTNCQyxFQUFBQSxHQUFHLEVBQUUsS0FGc0I7QUFHM0JDLEVBQUFBLE1BQU0sRUFBRTtBQUhtQixDQUF4Qjs7QUFRQSxJQUFNQyxrQkFBa0IsR0FBRztBQUM5QkMsRUFBQUEsVUFBVSxFQUFFLElBRGtCO0FBRTlCQyxFQUFBQSxJQUFJLEVBQUU7QUFGd0IsQ0FBM0I7OztJQVlNQyxVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNhQyxnQkFBQUEsRyw4REFBTUMsaUI7QUFBY0MsZ0JBQUFBLEs7QUFBaUJDLGdCQUFBQSxPO0FBQ2pEQyxnQkFBQUEsUSxHQUFXO0FBQ2JDLGtCQUFBQSxlQUFlLEVBQUUsQ0FBQ0YsT0FBTyxDQUFDRSxlQUFSLElBQTJCLEVBQTVCLEVBQWdDQyxLQUFoQyxDQUFzQyxHQUF0QyxDQURKO0FBRWJDLGtCQUFBQSxXQUFXLEVBQUVKLE9BQU8sQ0FBQ0ksV0FBUixJQUF1QmYsZUFBZSxDQUFDRTtBQUZ2QyxpQjs7QUFJWGMsZ0JBQUFBLGdCOzs7OzsrQ0FBbUIsaUJBQ3JCQyxRQURxQixFQUVyQkMsU0FGcUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlDQUlqQk4sUUFBUSxDQUFDQyxlQUFULENBQXlCTSxJQUF6QixDQUE4QixVQUFBQyxDQUFDO0FBQUEscUNBQUlBLENBQUMsQ0FBQ0MsV0FBRixPQUFvQkosUUFBUSxDQUFDSSxXQUFULEVBQXhCO0FBQUEsNkJBQS9CLENBSmlCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsbUNBS1hILFNBQVMsQ0FBQ0ksSUFBVixDQUFlZixVQUFmLEVBQTJCQyxHQUEzQixFQUFnQ0UsS0FBaEMsRUFBdUNFLFFBQXZDLENBTFc7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUI7O2tDQUFuQkksZ0I7Ozs7Ozt1QkFTQUEsZ0JBQWdCLENBQUNaLGtCQUFrQixDQUFDQyxVQUFwQixFQUFnQyxLQUFLa0Isa0JBQXJDLEM7Ozs7dUJBQ2hCUCxnQkFBZ0IsQ0FBQ1osa0JBQWtCLENBQUNFLElBQXBCLEVBQTBCLEtBQUtrQixZQUEvQixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cURBSU1oQixHLEVBQW1CRSxLLEVBQWlCQyxPOzs7OztBQUNoRUQsZ0JBQUFBLEtBQUssQ0FBQ2UsT0FBTixDQUFjLFVBQUNDLElBQUQsRUFBVTtBQUFBLHNDQUNBLHlCQUFhQSxJQUFiLEVBQW1CLE1BQW5CLENBREE7QUFBQSxzQkFDYkMsR0FEYSxpQkFDYkEsR0FEYTtBQUFBLHNCQUNSQyxJQURRLGlCQUNSQSxJQURROztBQUVwQixzQkFBTUMsV0FBVyxHQUFHbEIsT0FBTyxDQUFDSSxXQUFSLEtBQXdCZixlQUFlLENBQUNHLE1BQXhDLEdBQ2RMLEVBQUUsQ0FBQ2dDLFlBQUgsQ0FBZ0JILEdBQUcsV0FBSUMsSUFBSixVQUFuQixFQUFvQ0csUUFBcEMsQ0FBNkMsUUFBN0MsQ0FEYyxHQUVkLEVBRk47QUFHQSxzQkFBTUMsR0FBRyxHQUFHbEMsRUFBRSxDQUFDZ0MsWUFBSCxDQUFnQkgsR0FBRyxXQUFJQyxJQUFKLGVBQW5CLEVBQXlDRyxRQUF6QyxHQUFvREUsU0FBcEQsRUFBWjtBQUNBLHNCQUFNQyxTQUFTLGFBQU1OLElBQUksQ0FBQyxDQUFELENBQUosQ0FBUU8sV0FBUixFQUFOLFNBQThCUCxJQUFJLENBQUNRLE1BQUwsQ0FBWSxDQUFaLENBQTlCLGFBQWY7QUFDQSxzQkFBTUMsRUFBRSxrR0FNTkwsR0FOTSw2REFVQUgsV0FWQSw0QkFhWkssU0FiWSxteEJBMkNsQkEsU0EzQ2tCLGlEQTZDREEsU0E3Q0MsUUFBUjtBQStDQXBDLGtCQUFBQSxFQUFFLENBQUN3QyxhQUFILENBQWlCWCxHQUFHLFdBQUlDLElBQUosaUJBQXBCLEVBQTRDUyxFQUE1QyxFQUFnRDtBQUFFRSxvQkFBQUEsUUFBUSxFQUFFO0FBQVosbUJBQWhEO0FBQ0gsaUJBdkREOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cURBMkRzQi9CLEcsRUFBbUJFLEssRUFBaUJDLE8iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG4gKiB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbiAqIExpY2Vuc2UgYXQ6IGh0dHBzOi8vd3d3LnRvbi5kZXYvbGljZW5zZXNcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIFRPTiBERVYgc29mdHdhcmUgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG5cbmltcG9ydCB7IHBhcnNlRmlsZUFyZyB9IGZyb20gXCIuLi91dGlscy91dGlsc1wiO1xuaW1wb3J0IHsgQ29tcGlsZXJzSm9iIH0gZnJvbSBcIi4vam9iXCI7XG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5cbmV4cG9ydCBjb25zdCBDbGllbnRDb2RlTGV2ZWwgPSB7XG4gICAgbm9uZTogJ25vbmUnLFxuICAgIHJ1bjogJ3J1bicsXG4gICAgZGVwbG95OiAnZGVwbG95J1xufTtcblxuZXhwb3J0IHR5cGUgQ2xpZW50Q29kZUxldmVsVHlwZSA9ICRLZXlzPHR5cGVvZiBDbGllbnRDb2RlTGV2ZWw+O1xuXG5leHBvcnQgY29uc3QgQ2xpZW50Q29kZUxhbmd1YWdlID0ge1xuICAgIGphdmFTY3JpcHQ6ICdqcycsXG4gICAgcnVzdDogJ3JzJyxcbn07XG5cbmV4cG9ydCB0eXBlIENsaWVudENvZGVPcHRpb25zID0ge1xuICAgIGNsaWVudExhbmd1YWdlcz86IENsaWVudENvZGVMYW5ndWFnZVR5cGVbXSxcbiAgICBjbGllbnRMZXZlbD86IENsaWVudENvZGVMZXZlbFR5cGUsXG59O1xuXG5leHBvcnQgdHlwZSBDbGllbnRDb2RlTGFuZ3VhZ2VUeXBlID0gJEtleXM8dHlwZW9mIENsaWVudENvZGVMYW5ndWFnZT47XG5cbmV4cG9ydCBjbGFzcyBDbGllbnRDb2RlIHtcbiAgICBzdGF0aWMgYXN5bmMgZ2VuZXJhdGUoam9iID0gQ29tcGlsZXJzSm9iLCBmaWxlczogc3RyaW5nW10sIG9wdGlvbnM6IENsaWVudENvZGVPcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IHJlc29sdmVkID0ge1xuICAgICAgICAgICAgY2xpZW50TGFuZ3VhZ2VzOiAob3B0aW9ucy5jbGllbnRMYW5ndWFnZXMgfHwgJycpLnNwbGl0KCcsJyksXG4gICAgICAgICAgICBjbGllbnRMZXZlbDogb3B0aW9ucy5jbGllbnRMZXZlbCB8fCBDbGllbnRDb2RlTGV2ZWwucnVuLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBnZW5lcmF0ZUxhbmd1YWdlID0gYXN5bmMgKFxuICAgICAgICAgICAgbGFuZ3VhZ2U6IENsaWVudENvZGVMYW5ndWFnZVR5cGUsXG4gICAgICAgICAgICBnZW5lcmF0b3I6IChqb2I6IENvbXBpbGVyc0pvYiwgb3B0aW9uczogQ2xpZW50Q29kZU9wdGlvbnMpID0+IFByb21pc2U8dm9pZD5cbiAgICAgICAgKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzb2x2ZWQuY2xpZW50TGFuZ3VhZ2VzLmZpbmQoeCA9PiB4LnRvTG93ZXJDYXNlKCkgPT09IGxhbmd1YWdlLnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgZ2VuZXJhdG9yLmJpbmQoQ2xpZW50Q29kZSkoam9iLCBmaWxlcywgcmVzb2x2ZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGF3YWl0IGdlbmVyYXRlTGFuZ3VhZ2UoQ2xpZW50Q29kZUxhbmd1YWdlLmphdmFTY3JpcHQsIHRoaXMuZ2VuZXJhdGVKYXZhU2NyaXB0KTtcbiAgICAgICAgYXdhaXQgZ2VuZXJhdGVMYW5ndWFnZShDbGllbnRDb2RlTGFuZ3VhZ2UucnVzdCwgdGhpcy5nZW5lcmF0ZVJ1c3QpO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGFzeW5jIGdlbmVyYXRlSmF2YVNjcmlwdChqb2I6IENvbXBpbGVyc0pvYiwgZmlsZXM6IHN0cmluZ1tdLCBvcHRpb25zOiBDbGllbnRDb2RlT3B0aW9ucykge1xuICAgICAgICBmaWxlcy5mb3JFYWNoKChmaWxlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7ZGlyLCBiYXNlfSA9IHBhcnNlRmlsZUFyZyhmaWxlLCAnLnNvbCcpO1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VCYXNlNjQgPSBvcHRpb25zLmNsaWVudExldmVsID09PSBDbGllbnRDb2RlTGV2ZWwuZGVwbG95XG4gICAgICAgICAgICAgICAgPyBmcy5yZWFkRmlsZVN5bmMoZGlyKGAke2Jhc2V9LnR2Y2ApKS50b1N0cmluZygnYmFzZTY0JylcbiAgICAgICAgICAgICAgICA6ICcnO1xuICAgICAgICAgICAgY29uc3QgYWJpID0gZnMucmVhZEZpbGVTeW5jKGRpcihgJHtiYXNlfS5hYmkuanNvbmApKS50b1N0cmluZygpLnRyaW1SaWdodCgpO1xuICAgICAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gYCR7YmFzZVswXS50b1VwcGVyQ2FzZSgpfSR7YmFzZS5zdWJzdHIoMSl9Q29udHJhY3RgO1xuICAgICAgICAgICAgY29uc3QganMgPVxuYFxuLy9cbi8vIFRoaXMgZmlsZSB3YXMgZ2VuZXJhdGVkIHVzaW5nIFRPTiBMYWJzIGRldmVsb3BlciB0b29scy5cbi8vXG4gXG5jb25zdCBhYmkgPSAke2FiaX07XG5cbmNvbnN0IHBrZyA9IHtcbiAgICBhYmksXG4gICAgaW1hZ2VCYXNlNjQ6ICcke2ltYWdlQmFzZTY0fSdcbn07XG5cbmNsYXNzICR7Y2xhc3NOYW1lfSB7XG4gICAgY29uc3RydWN0b3IoY2xpZW50LCBhZGRyZXNzLCBrZXlzKSB7XG4gICAgICAgIHRoaXMuY2xpZW50ID0gY2xpZW50O1xuICAgICAgICB0aGlzLmFkZHJlc3MgPSBhZGRyZXNzO1xuICAgICAgICB0aGlzLmtleXMgPSBrZXlzO1xuICAgIH1cblxuICAgIGFzeW5jIGRlcGxveShjb25zdHJ1Y3RvclBhcmFtcykge1xuICAgICAgICBpZiAoIXRoaXMua2V5cykge1xuICAgICAgICAgICAgdGhpcy5rZXlzID0gYXdhaXQgdGhpcy5jbGllbnQuY3J5cHRvLmVkMjU1MTlLZXlwYWlyKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hZGRyZXNzID0gKGF3YWl0IHRoaXMuY2xpZW50LmNvbnRyYWN0cy5kZXBsb3koe1xuICAgICAgICAgICAgcGFja2FnZTogcGtnLFxuICAgICAgICAgICAgY29uc3RydWN0b3JQYXJhbXMsXG4gICAgICAgICAgICBrZXlQYWlyOiB0aGlzLmtleXMsXG4gICAgICAgIH0pKS5hZGRyZXNzO1xuICAgIH1cbiAgICAgICAgXG4gICAgYXN5bmMgcnVuKGZ1bmN0aW9uTmFtZSwgaW5wdXQpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5jbGllbnQuY29udHJhY3RzLnJ1bih7XG4gICAgICAgICAgICBhZGRyZXNzOiB0aGlzLmFkZHJlc3MsXG4gICAgICAgICAgICBmdW5jdGlvbk5hbWUsXG4gICAgICAgICAgICBhYmksXG4gICAgICAgICAgICBpbnB1dCxcbiAgICAgICAgICAgIGtleVBhaXI6IHRoaXMua2V5cyxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQub3V0cHV0O1xuICAgIH0gICAgXG59XG5cbiR7Y2xhc3NOYW1lfS5wYWNrYWdlID0gcGtnO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICR7Y2xhc3NOYW1lfTtcbmA7XG4gICAgICAgICAgICBmcy53cml0ZUZpbGVTeW5jKGRpcihgJHtiYXNlfUNvbnRyYWN0LmpzYCksIGpzLCB7IGVuY29kaW5nOiAndXRmOCcgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGFzeW5jIGdlbmVyYXRlUnVzdChqb2I6IENvbXBpbGVyc0pvYiwgZmlsZXM6IHN0cmluZ1tdLCBvcHRpb25zOiBDbGllbnRDb2RlT3B0aW9ucykge1xuXG4gICAgfVxufVxuIl19