"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientCode = exports.ClientCodeLanguage = exports.ClientCodeLevel = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _utils = require("../utils/utils");

var _handlebars = _interopRequireDefault(require("handlebars"));

var _solidity = require("./solidity");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var path = require('path');

var fs = require('fs');

_handlebars["default"].registerHelper('LB', function () {
  return '{';
});

_handlebars["default"].registerHelper('RB', function () {
  return '}';
});

function compileTemplate() {
  for (var _len = arguments.length, pathItems = new Array(_len), _key = 0; _key < _len; _key++) {
    pathItems[_key] = arguments[_key];
  }

  var templatePath = path.resolve.apply(path, [__dirname, '..', '..'].concat(pathItems));
  var templateText = fs.readFileSync(templatePath, {
    encoding: 'utf8'
  });
  return {
    build: _handlebars["default"].compile(templateText, {
      noEscape: true
    })
  };
}

function applyTemplate(_x, _x2) {
  return _applyTemplate.apply(this, arguments);
}

function _applyTemplate() {
  _applyTemplate = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6(template, context) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", template.build(context));

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _applyTemplate.apply(this, arguments);
}

var jsContractTemplate = compileTemplate('js-templates', 'contract.js.hbs');
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

                  return function generateLanguage(_x5, _x6) {
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

      function generate(_x3, _x4) {
        return _generate.apply(this, arguments);
      }

      return generate;
    }()
  }, {
    key: "getTemplateContext",
    value: function getTemplateContext(fileArg, options) {
      var file = (0, _solidity.parseSolidityFileArg)(fileArg);
      var dir = file.dir,
          name = file.name;
      var imageBase64 = options.clientLevel === ClientCodeLevel.deploy ? fs.readFileSync(dir(name.tvc)).toString('base64') : '';
      var abiJson = fs.readFileSync(dir(name.abi)).toString().trimRight();
      var abi = JSON.parse(abiJson);
      var className = "".concat(name.base[0].toUpperCase()).concat(name.base.substr(1), "Contract");
      var isDeploy = (options.clientLevel || 'deploy') === 'deploy';

      var varContext = function varContext(v) {
        var jsType = {
          address: 'string',
          'address[]': 'string[]',
          uint256: 'string',
          uint32: 'number',
          uint16: 'number',
          uint8: 'number',
          'uint256[]': 'string[]',
          'uint32[]': 'number[]',
          'uint16[]': 'number[]',
          'uint8[]': 'number[]'
        }[v.type] || v.type;
        return _objectSpread({}, v, {
          jsType: jsType,
          isSameJsType: jsType === v.type
        });
      };

      var funContext = function funContext(f) {
        return _objectSpread({}, f, {
          hasInputs: f.inputs.length > 0,
          hasOutputs: f.outputs.length > 0,
          inputs: f.inputs.map(varContext),
          outputs: f.outputs.map(varContext)
        });
      };

      var constructor = funContext(abi.functions.find(function (x) {
        return x.name === 'constructor';
      }));
      constructor.hasData = abi.data.length > 0;
      constructor.hasInputsAndData = constructor.hasInputs && constructor.hasData;
      constructor.data = abi.data.map(varContext);
      var functions = abi.functions.filter(function (x) {
        return x.name !== 'constructor';
      }).map(funContext);
      return {
        imageBase64: imageBase64,
        abiJson: abiJson,
        abi: abi,
        className: className,
        isDeploy: isDeploy,
        constructor: constructor,
        functions: functions
      };
    }
  }, {
    key: "generateJavaScript",
    value: function () {
      var _generateJavaScript = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(files, options) {
        var i;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                i = 0;

              case 1:
                if (!(i < files.length)) {
                  _context3.next = 7;
                  break;
                }

                _context3.next = 4;
                return ClientCode.generateJavaScriptFile(files[i], options);

              case 4:
                i += 1;
                _context3.next = 1;
                break;

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function generateJavaScript(_x7, _x8) {
        return _generateJavaScript.apply(this, arguments);
      }

      return generateJavaScript;
    }()
  }, {
    key: "generateJavaScriptFile",
    value: function () {
      var _generateJavaScriptFile = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(file, options) {
        var _parseFileArg, dir, base, js;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _parseFileArg = (0, _utils.parseFileArg)(file, '.sol'), dir = _parseFileArg.dir, base = _parseFileArg.base;
                _context4.next = 3;
                return applyTemplate(jsContractTemplate, ClientCode.getTemplateContext(file, options));

              case 3:
                js = _context4.sent;
                fs.writeFileSync(dir("".concat(base, "Contract.js")), js, {
                  encoding: 'utf8'
                });

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function generateJavaScriptFile(_x9, _x10) {
        return _generateJavaScriptFile.apply(this, arguments);
      }

      return generateJavaScriptFile;
    }()
  }, {
    key: "generateRust",
    value: function () {
      var _generateRust = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(files, options) {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function generateRust(_x11, _x12) {
        return _generateRust.apply(this, arguments);
      }

      return generateRust;
    }()
  }]);
  return ClientCode;
}();

exports.ClientCode = ClientCode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21waWxlcnMvY2xpZW50LWNvZGUuanMiXSwibmFtZXMiOlsicGF0aCIsInJlcXVpcmUiLCJmcyIsIkhhbmRsZWJhcnMiLCJyZWdpc3RlckhlbHBlciIsImNvbXBpbGVUZW1wbGF0ZSIsInBhdGhJdGVtcyIsInRlbXBsYXRlUGF0aCIsInJlc29sdmUiLCJfX2Rpcm5hbWUiLCJ0ZW1wbGF0ZVRleHQiLCJyZWFkRmlsZVN5bmMiLCJlbmNvZGluZyIsImJ1aWxkIiwiY29tcGlsZSIsIm5vRXNjYXBlIiwiYXBwbHlUZW1wbGF0ZSIsInRlbXBsYXRlIiwiY29udGV4dCIsImpzQ29udHJhY3RUZW1wbGF0ZSIsIkNsaWVudENvZGVMZXZlbCIsIm5vbmUiLCJydW4iLCJkZXBsb3kiLCJDbGllbnRDb2RlTGFuZ3VhZ2UiLCJqcyIsInJzIiwiQ2xpZW50Q29kZSIsImZpbGVzIiwib3B0aW9ucyIsImdlbmVyYXRlTGFuZ3VhZ2UiLCJsYW5ndWFnZSIsImdlbmVyYXRvciIsImNsaWVudExhbmd1YWdlcyIsImZpbmQiLCJ4IiwidG9Mb3dlckNhc2UiLCJiaW5kIiwiZ2VuZXJhdGVKYXZhU2NyaXB0IiwiZ2VuZXJhdGVSdXN0IiwiZmlsZUFyZyIsImZpbGUiLCJkaXIiLCJuYW1lIiwiaW1hZ2VCYXNlNjQiLCJjbGllbnRMZXZlbCIsInR2YyIsInRvU3RyaW5nIiwiYWJpSnNvbiIsImFiaSIsInRyaW1SaWdodCIsIkpTT04iLCJwYXJzZSIsImNsYXNzTmFtZSIsImJhc2UiLCJ0b1VwcGVyQ2FzZSIsInN1YnN0ciIsImlzRGVwbG95IiwidmFyQ29udGV4dCIsInYiLCJqc1R5cGUiLCJhZGRyZXNzIiwidWludDI1NiIsInVpbnQzMiIsInVpbnQxNiIsInVpbnQ4IiwidHlwZSIsImlzU2FtZUpzVHlwZSIsImZ1bkNvbnRleHQiLCJmIiwiaGFzSW5wdXRzIiwiaW5wdXRzIiwibGVuZ3RoIiwiaGFzT3V0cHV0cyIsIm91dHB1dHMiLCJtYXAiLCJjb25zdHJ1Y3RvciIsImZ1bmN0aW9ucyIsImhhc0RhdGEiLCJkYXRhIiwiaGFzSW5wdXRzQW5kRGF0YSIsImZpbHRlciIsImkiLCJnZW5lcmF0ZUphdmFTY3JpcHRGaWxlIiwiZ2V0VGVtcGxhdGVDb250ZXh0Iiwid3JpdGVGaWxlU3luYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWVBOztBQUNBOztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxJQUFJLEdBQUdDLE9BQU8sQ0FBQyxNQUFELENBQXBCOztBQUNBLElBQU1DLEVBQUUsR0FBR0QsT0FBTyxDQUFDLElBQUQsQ0FBbEI7O0FBTUFFLHVCQUFXQyxjQUFYLENBQTBCLElBQTFCLEVBQWdDO0FBQUEsU0FBTSxHQUFOO0FBQUEsQ0FBaEM7O0FBQ0FELHVCQUFXQyxjQUFYLENBQTBCLElBQTFCLEVBQWdDO0FBQUEsU0FBTSxHQUFOO0FBQUEsQ0FBaEM7O0FBRUEsU0FBU0MsZUFBVCxHQUEyRDtBQUFBLG9DQUEvQkMsU0FBK0I7QUFBL0JBLElBQUFBLFNBQStCO0FBQUE7O0FBQ3ZELE1BQU1DLFlBQVksR0FBR1AsSUFBSSxDQUFDUSxPQUFMLE9BQUFSLElBQUksR0FBU1MsU0FBVCxFQUFvQixJQUFwQixFQUEwQixJQUExQixTQUFtQ0gsU0FBbkMsRUFBekI7QUFDQSxNQUFNSSxZQUFZLEdBQUdSLEVBQUUsQ0FBQ1MsWUFBSCxDQUFnQkosWUFBaEIsRUFBOEI7QUFBRUssSUFBQUEsUUFBUSxFQUFFO0FBQVosR0FBOUIsQ0FBckI7QUFDQSxTQUFPO0FBQ0hDLElBQUFBLEtBQUssRUFBRVYsdUJBQVdXLE9BQVgsQ0FBbUJKLFlBQW5CLEVBQWlDO0FBQ3BDSyxNQUFBQSxRQUFRLEVBQUU7QUFEMEIsS0FBakM7QUFESixHQUFQO0FBS0g7O1NBRWNDLGE7Ozs7Ozs7K0JBQWYsa0JBQTZCQyxRQUE3QixFQUFpREMsT0FBakQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDhDQUNXRCxRQUFRLENBQUNKLEtBQVQsQ0FBZUssT0FBZixDQURYOztBQUFBO0FBQUE7QUFB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dXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOC0yMDE5IFRPTiBERVYgU09MVVRJT05TIExURC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgU09GVFdBUkUgRVZBTFVBVElPTiBMaWNlbnNlICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbiAqIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxuICogTGljZW5zZSBhdDogaHR0cHM6Ly93d3cudG9uLmRldi9saWNlbnNlc1xuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgVE9OIERFViBzb2Z0d2FyZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cblxuaW1wb3J0IHsgcGFyc2VGaWxlQXJnIH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxzXCI7XG5pbXBvcnQgSGFuZGxlYmFycyBmcm9tICdoYW5kbGViYXJzJztcbmltcG9ydCB7IHBhcnNlU29saWRpdHlGaWxlQXJnIH0gZnJvbSBcIi4vc29saWRpdHlcIjtcblxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcblxudHlwZSBUZW1wbGF0ZSA9IHtcbiAgICBidWlsZDogYW55XG59XG5cbkhhbmRsZWJhcnMucmVnaXN0ZXJIZWxwZXIoJ0xCJywgKCkgPT4gJ3snKTtcbkhhbmRsZWJhcnMucmVnaXN0ZXJIZWxwZXIoJ1JCJywgKCkgPT4gJ30nKTtcblxuZnVuY3Rpb24gY29tcGlsZVRlbXBsYXRlKC4uLnBhdGhJdGVtczogc3RyaW5nW10pOiBUZW1wbGF0ZSB7XG4gICAgY29uc3QgdGVtcGxhdGVQYXRoID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uJywgJy4uJywgLi4ucGF0aEl0ZW1zKTtcbiAgICBjb25zdCB0ZW1wbGF0ZVRleHQgPSBmcy5yZWFkRmlsZVN5bmModGVtcGxhdGVQYXRoLCB7IGVuY29kaW5nOiAndXRmOCcgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYnVpbGQ6IEhhbmRsZWJhcnMuY29tcGlsZSh0ZW1wbGF0ZVRleHQsIHtcbiAgICAgICAgICAgIG5vRXNjYXBlOiB0cnVlLFxuICAgICAgICB9KVxuICAgIH07XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGFwcGx5VGVtcGxhdGUodGVtcGxhdGU6IFRlbXBsYXRlLCBjb250ZXh0OiBhbnkpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiB0ZW1wbGF0ZS5idWlsZChjb250ZXh0KTtcbn1cblxuY29uc3QganNDb250cmFjdFRlbXBsYXRlID0gY29tcGlsZVRlbXBsYXRlKCdqcy10ZW1wbGF0ZXMnLCAnY29udHJhY3QuanMuaGJzJyk7XG5cbmV4cG9ydCBjb25zdCBDbGllbnRDb2RlTGV2ZWwgPSB7XG4gICAgbm9uZTogJ25vbmUnLFxuICAgIHJ1bjogJ3J1bicsXG4gICAgZGVwbG95OiAnZGVwbG95J1xufTtcblxuZXhwb3J0IHR5cGUgQ2xpZW50Q29kZUxldmVsVHlwZSA9ICRLZXlzPHR5cGVvZiBDbGllbnRDb2RlTGV2ZWw+O1xuXG5leHBvcnQgY29uc3QgQ2xpZW50Q29kZUxhbmd1YWdlID0ge1xuICAgIGpzOiAnanMnLFxuICAgIHJzOiAncnMnLFxufTtcblxuZXhwb3J0IHR5cGUgQ2xpZW50Q29kZUxhbmd1YWdlVHlwZSA9ICRLZXlzPHR5cGVvZiBDbGllbnRDb2RlTGFuZ3VhZ2U+O1xuXG5leHBvcnQgdHlwZSBDbGllbnRDb2RlT3B0aW9ucyA9IHtcbiAgICBjbGllbnRMYW5ndWFnZXM6IENsaWVudENvZGVMYW5ndWFnZVR5cGVbXSxcbiAgICBjbGllbnRMZXZlbDogQ2xpZW50Q29kZUxldmVsVHlwZSxcbn07XG5cblxuZXhwb3J0IGNsYXNzIENsaWVudENvZGUge1xuICAgIHN0YXRpYyBhc3luYyBnZW5lcmF0ZShmaWxlczogc3RyaW5nW10sIG9wdGlvbnM6IENsaWVudENvZGVPcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IGdlbmVyYXRlTGFuZ3VhZ2UgPSBhc3luYyAoXG4gICAgICAgICAgICBsYW5ndWFnZTogQ2xpZW50Q29kZUxhbmd1YWdlVHlwZSxcbiAgICAgICAgICAgIGdlbmVyYXRvcjogKG9wdGlvbnM6IENsaWVudENvZGVPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+XG4gICAgICAgICkgPT4ge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuY2xpZW50TGFuZ3VhZ2VzLmZpbmQoeCA9PiB4LnRvTG93ZXJDYXNlKCkgPT09IGxhbmd1YWdlLnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgZ2VuZXJhdG9yLmJpbmQoQ2xpZW50Q29kZSkoZmlsZXMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGF3YWl0IGdlbmVyYXRlTGFuZ3VhZ2UoQ2xpZW50Q29kZUxhbmd1YWdlLmpzLCB0aGlzLmdlbmVyYXRlSmF2YVNjcmlwdCk7XG4gICAgICAgIGF3YWl0IGdlbmVyYXRlTGFuZ3VhZ2UoQ2xpZW50Q29kZUxhbmd1YWdlLnJzLCB0aGlzLmdlbmVyYXRlUnVzdCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldFRlbXBsYXRlQ29udGV4dChmaWxlQXJnOiBzdHJpbmcsIG9wdGlvbnM6IENsaWVudENvZGVPcHRpb25zKTogYW55IHtcbiAgICAgICAgY29uc3QgZmlsZSA9IHBhcnNlU29saWRpdHlGaWxlQXJnKGZpbGVBcmcpO1xuICAgICAgICBjb25zdCB7IGRpciwgbmFtZSB9ID0gZmlsZTtcbiAgICAgICAgY29uc3QgaW1hZ2VCYXNlNjQgPSBvcHRpb25zLmNsaWVudExldmVsID09PSBDbGllbnRDb2RlTGV2ZWwuZGVwbG95XG4gICAgICAgICAgICA/IGZzLnJlYWRGaWxlU3luYyhkaXIobmFtZS50dmMpKS50b1N0cmluZygnYmFzZTY0JylcbiAgICAgICAgICAgIDogJyc7XG4gICAgICAgIGNvbnN0IGFiaUpzb24gPSBmcy5yZWFkRmlsZVN5bmMoZGlyKG5hbWUuYWJpKSkudG9TdHJpbmcoKS50cmltUmlnaHQoKTtcbiAgICAgICAgY29uc3QgYWJpID0gSlNPTi5wYXJzZShhYmlKc29uKTtcbiAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gYCR7bmFtZS5iYXNlWzBdLnRvVXBwZXJDYXNlKCl9JHtuYW1lLmJhc2Uuc3Vic3RyKDEpfUNvbnRyYWN0YDtcbiAgICAgICAgY29uc3QgaXNEZXBsb3kgPSAob3B0aW9ucy5jbGllbnRMZXZlbCB8fCAnZGVwbG95JykgPT09ICdkZXBsb3knO1xuXG4gICAgICAgIGNvbnN0IHZhckNvbnRleHQgPSAodikgPT4ge1xuICAgICAgICAgICAgY29uc3QganNUeXBlID0ge1xuICAgICAgICAgICAgICAgIGFkZHJlc3M6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgICdhZGRyZXNzW10nOiAnc3RyaW5nW10nLFxuICAgICAgICAgICAgICAgIHVpbnQyNTY6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgIHVpbnQzMjogJ251bWJlcicsXG4gICAgICAgICAgICAgICAgdWludDE2OiAnbnVtYmVyJyxcbiAgICAgICAgICAgICAgICB1aW50ODogJ251bWJlcicsXG4gICAgICAgICAgICAgICAgJ3VpbnQyNTZbXSc6ICdzdHJpbmdbXScsXG4gICAgICAgICAgICAgICAgJ3VpbnQzMltdJzogJ251bWJlcltdJyxcbiAgICAgICAgICAgICAgICAndWludDE2W10nOiAnbnVtYmVyW10nLFxuICAgICAgICAgICAgICAgICd1aW50OFtdJzogJ251bWJlcltdJyxcbiAgICAgICAgICAgIH1bdi50eXBlXSB8fCB2LnR5cGU7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnYsXG4gICAgICAgICAgICAgICAganNUeXBlLFxuICAgICAgICAgICAgICAgIGlzU2FtZUpzVHlwZToganNUeXBlID09PSB2LnR5cGUsXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgZnVuQ29udGV4dCA9IChmKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLmYsXG4gICAgICAgICAgICAgICAgaGFzSW5wdXRzOiBmLmlucHV0cy5sZW5ndGggPiAwLFxuICAgICAgICAgICAgICAgIGhhc091dHB1dHM6IGYub3V0cHV0cy5sZW5ndGggPiAwLFxuICAgICAgICAgICAgICAgIGlucHV0czogZi5pbnB1dHMubWFwKHZhckNvbnRleHQpLFxuICAgICAgICAgICAgICAgIG91dHB1dHM6IGYub3V0cHV0cy5tYXAodmFyQ29udGV4dCksXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgY29uc3RydWN0b3IgPSBmdW5Db250ZXh0KGFiaS5mdW5jdGlvbnMuZmluZCh4ID0+IHgubmFtZSA9PT0gJ2NvbnN0cnVjdG9yJykpO1xuICAgICAgICBjb25zdHJ1Y3Rvci5oYXNEYXRhID0gYWJpLmRhdGEubGVuZ3RoID4gMDtcbiAgICAgICAgY29uc3RydWN0b3IuaGFzSW5wdXRzQW5kRGF0YSA9IGNvbnN0cnVjdG9yLmhhc0lucHV0cyAmJiBjb25zdHJ1Y3Rvci5oYXNEYXRhO1xuICAgICAgICBjb25zdHJ1Y3Rvci5kYXRhID0gYWJpLmRhdGEubWFwKHZhckNvbnRleHQpO1xuXG4gICAgICAgIGNvbnN0IGZ1bmN0aW9ucyA9IGFiaS5mdW5jdGlvbnMuZmlsdGVyKHggPT4geC5uYW1lICE9PSAnY29uc3RydWN0b3InKS5tYXAoZnVuQ29udGV4dCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGltYWdlQmFzZTY0LFxuICAgICAgICAgICAgYWJpSnNvbixcbiAgICAgICAgICAgIGFiaSxcbiAgICAgICAgICAgIGNsYXNzTmFtZSxcbiAgICAgICAgICAgIGlzRGVwbG95LFxuICAgICAgICAgICAgY29uc3RydWN0b3IsXG4gICAgICAgICAgICBmdW5jdGlvbnMsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc3RhdGljIGFzeW5jIGdlbmVyYXRlSmF2YVNjcmlwdChmaWxlczogc3RyaW5nW10sIG9wdGlvbnM6IENsaWVudENvZGVPcHRpb25zKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGF3YWl0IENsaWVudENvZGUuZ2VuZXJhdGVKYXZhU2NyaXB0RmlsZShmaWxlc1tpXSwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgYXN5bmMgZ2VuZXJhdGVKYXZhU2NyaXB0RmlsZShmaWxlOiBzdHJpbmcsIG9wdGlvbnM6IENsaWVudENvZGVPcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IHsgZGlyLCBiYXNlIH0gPSBwYXJzZUZpbGVBcmcoZmlsZSwgJy5zb2wnKTtcbiAgICAgICAgY29uc3QganMgPSBhd2FpdCBhcHBseVRlbXBsYXRlKGpzQ29udHJhY3RUZW1wbGF0ZSwgQ2xpZW50Q29kZS5nZXRUZW1wbGF0ZUNvbnRleHQoZmlsZSwgb3B0aW9ucykpO1xuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKGRpcihgJHtiYXNlfUNvbnRyYWN0LmpzYCksIGpzLCB7IGVuY29kaW5nOiAndXRmOCcgfSk7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgYXN5bmMgZ2VuZXJhdGVSdXN0KGZpbGVzOiBzdHJpbmdbXSwgb3B0aW9uczogQ2xpZW50Q29kZU9wdGlvbnMpIHtcblxuICAgIH1cbn1cbiJdfQ==