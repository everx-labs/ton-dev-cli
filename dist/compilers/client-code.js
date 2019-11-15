"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientCode = exports.JSModule = exports.ClientCodeLanguage = exports.ClientCodeLevel = void 0;

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
var JSModule = {
  node: 'node',
  nodeNoDefault: 'nodeNoDefault',
  es: 'es',
  esNoDefault: 'esNoDefault'
};
exports.JSModule = JSModule;

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
        functions: functions,
        jsModuleNode: options.jsModule === JSModule.node || options.jsModule === JSModule.nodeNoDefault,
        jsModuleNodeDefault: options.jsModule === JSModule.node,
        jsModuleEs: options.jsModule === JSModule.es || options.jsModule === JSModule.esNoDefault,
        jsModuleEsDefault: options.jsModule === JSModule.es
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21waWxlcnMvY2xpZW50LWNvZGUuanMiXSwibmFtZXMiOlsicGF0aCIsInJlcXVpcmUiLCJmcyIsIkhhbmRsZWJhcnMiLCJyZWdpc3RlckhlbHBlciIsImNvbXBpbGVUZW1wbGF0ZSIsInBhdGhJdGVtcyIsInRlbXBsYXRlUGF0aCIsInJlc29sdmUiLCJfX2Rpcm5hbWUiLCJ0ZW1wbGF0ZVRleHQiLCJyZWFkRmlsZVN5bmMiLCJlbmNvZGluZyIsImJ1aWxkIiwiY29tcGlsZSIsIm5vRXNjYXBlIiwiYXBwbHlUZW1wbGF0ZSIsInRlbXBsYXRlIiwiY29udGV4dCIsImpzQ29udHJhY3RUZW1wbGF0ZSIsIkNsaWVudENvZGVMZXZlbCIsIm5vbmUiLCJydW4iLCJkZXBsb3kiLCJDbGllbnRDb2RlTGFuZ3VhZ2UiLCJqcyIsInJzIiwiSlNNb2R1bGUiLCJub2RlIiwibm9kZU5vRGVmYXVsdCIsImVzIiwiZXNOb0RlZmF1bHQiLCJDbGllbnRDb2RlIiwiZmlsZXMiLCJvcHRpb25zIiwiZ2VuZXJhdGVMYW5ndWFnZSIsImxhbmd1YWdlIiwiZ2VuZXJhdG9yIiwiY2xpZW50TGFuZ3VhZ2VzIiwiZmluZCIsIngiLCJ0b0xvd2VyQ2FzZSIsImJpbmQiLCJnZW5lcmF0ZUphdmFTY3JpcHQiLCJnZW5lcmF0ZVJ1c3QiLCJmaWxlQXJnIiwiZmlsZSIsImRpciIsIm5hbWUiLCJpbWFnZUJhc2U2NCIsImNsaWVudExldmVsIiwidHZjIiwidG9TdHJpbmciLCJhYmlKc29uIiwiYWJpIiwidHJpbVJpZ2h0IiwiSlNPTiIsInBhcnNlIiwiY2xhc3NOYW1lIiwiYmFzZSIsInRvVXBwZXJDYXNlIiwic3Vic3RyIiwiaXNEZXBsb3kiLCJ2YXJDb250ZXh0IiwidiIsImpzVHlwZSIsImFkZHJlc3MiLCJ1aW50MjU2IiwidWludDMyIiwidWludDE2IiwidWludDgiLCJ0eXBlIiwiaXNTYW1lSnNUeXBlIiwiZnVuQ29udGV4dCIsImYiLCJoYXNJbnB1dHMiLCJpbnB1dHMiLCJsZW5ndGgiLCJoYXNPdXRwdXRzIiwib3V0cHV0cyIsIm1hcCIsImNvbnN0cnVjdG9yIiwiZnVuY3Rpb25zIiwiaGFzRGF0YSIsImRhdGEiLCJoYXNJbnB1dHNBbmREYXRhIiwiZmlsdGVyIiwianNNb2R1bGVOb2RlIiwianNNb2R1bGUiLCJqc01vZHVsZU5vZGVEZWZhdWx0IiwianNNb2R1bGVFcyIsImpzTW9kdWxlRXNEZWZhdWx0IiwiaSIsImdlbmVyYXRlSmF2YVNjcmlwdEZpbGUiLCJnZXRUZW1wbGF0ZUNvbnRleHQiLCJ3cml0ZUZpbGVTeW5jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZUE7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLElBQUksR0FBR0MsT0FBTyxDQUFDLE1BQUQsQ0FBcEI7O0FBQ0EsSUFBTUMsRUFBRSxHQUFHRCxPQUFPLENBQUMsSUFBRCxDQUFsQjs7QUFNQUUsdUJBQVdDLGNBQVgsQ0FBMEIsSUFBMUIsRUFBZ0M7QUFBQSxTQUFNLEdBQU47QUFBQSxDQUFoQzs7QUFDQUQsdUJBQVdDLGNBQVgsQ0FBMEIsSUFBMUIsRUFBZ0M7QUFBQSxTQUFNLEdBQU47QUFBQSxDQUFoQzs7QUFFQSxTQUFTQyxlQUFULEdBQTJEO0FBQUEsb0NBQS9CQyxTQUErQjtBQUEvQkEsSUFBQUEsU0FBK0I7QUFBQTs7QUFDdkQsTUFBTUMsWUFBWSxHQUFHUCxJQUFJLENBQUNRLE9BQUwsT0FBQVIsSUFBSSxHQUFTUyxTQUFULEVBQW9CLElBQXBCLEVBQTBCLElBQTFCLFNBQW1DSCxTQUFuQyxFQUF6QjtBQUNBLE1BQU1JLFlBQVksR0FBR1IsRUFBRSxDQUFDUyxZQUFILENBQWdCSixZQUFoQixFQUE4QjtBQUFFSyxJQUFBQSxRQUFRLEVBQUU7QUFBWixHQUE5QixDQUFyQjtBQUNBLFNBQU87QUFDSEMsSUFBQUEsS0FBSyxFQUFFVix1QkFBV1csT0FBWCxDQUFtQkosWUFBbkIsRUFBaUM7QUFDcENLLE1BQUFBLFFBQVEsRUFBRTtBQUQwQixLQUFqQztBQURKLEdB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UUFBQUEsaUJBQWlCLEVBQUV6RCxPQUFPLENBQUNzRCxRQUFSLEtBQXFCN0QsUUFBUSxDQUFDRztBQVg5QyxPQUFQO0FBYUg7Ozs7OztxREFFK0JHLEssRUFBaUJDLE87Ozs7OztBQUNwQzBELGdCQUFBQSxDLEdBQUksQzs7O3NCQUFHQSxDQUFDLEdBQUczRCxLQUFLLENBQUM0QyxNOzs7Ozs7dUJBQ2hCN0MsVUFBVSxDQUFDNkQsc0JBQVgsQ0FBa0M1RCxLQUFLLENBQUMyRCxDQUFELENBQXZDLEVBQTRDMUQsT0FBNUMsQzs7O0FBRHdCMEQsZ0JBQUFBLENBQUMsSUFBSSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxREFLUDlDLEksRUFBY1osTzs7Ozs7OztnQ0FDeEIseUJBQWFZLElBQWIsRUFBbUIsTUFBbkIsQyxFQUFkQyxHLGlCQUFBQSxHLEVBQUtZLEksaUJBQUFBLEk7O3VCQUNJM0MsYUFBYSxDQUFDRyxrQkFBRCxFQUFxQmEsVUFBVSxDQUFDOEQsa0JBQVgsQ0FBOEJoRCxJQUE5QixFQUFvQ1osT0FBcEMsQ0FBckIsQzs7O0FBQXhCVCxnQkFBQUEsRTtBQUNOdkIsZ0JBQUFBLEVBQUUsQ0FBQzZGLGFBQUgsQ0FBaUJoRCxHQUFHLFdBQUlZLElBQUosaUJBQXBCLEVBQTRDbEMsRUFBNUMsRUFBZ0Q7QUFBRWIsa0JBQUFBLFFBQVEsRUFBRTtBQUFaLGlCQUFoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FEQUlzQnFCLEssRUFBaUJDLE8iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG4gKiB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbiAqIExpY2Vuc2UgYXQ6IGh0dHBzOi8vd3d3LnRvbi5kZXYvbGljZW5zZXNcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIFRPTiBERVYgc29mdHdhcmUgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG5cbmltcG9ydCB7IHBhcnNlRmlsZUFyZyB9IGZyb20gXCIuLi91dGlscy91dGlsc1wiO1xuaW1wb3J0IEhhbmRsZWJhcnMgZnJvbSAnaGFuZGxlYmFycyc7XG5pbXBvcnQgeyBwYXJzZVNvbGlkaXR5RmlsZUFyZyB9IGZyb20gXCIuL3NvbGlkaXR5XCI7XG5cbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5cbnR5cGUgVGVtcGxhdGUgPSB7XG4gICAgYnVpbGQ6IGFueVxufVxuXG5IYW5kbGViYXJzLnJlZ2lzdGVySGVscGVyKCdMQicsICgpID0+ICd7Jyk7XG5IYW5kbGViYXJzLnJlZ2lzdGVySGVscGVyKCdSQicsICgpID0+ICd9Jyk7XG5cbmZ1bmN0aW9uIGNvbXBpbGVUZW1wbGF0ZSguLi5wYXRoSXRlbXM6IHN0cmluZ1tdKTogVGVtcGxhdGUge1xuICAgIGNvbnN0IHRlbXBsYXRlUGF0aCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLicsICcuLicsIC4uLnBhdGhJdGVtcyk7XG4gICAgY29uc3QgdGVtcGxhdGVUZXh0ID0gZnMucmVhZEZpbGVTeW5jKHRlbXBsYXRlUGF0aCwgeyBlbmNvZGluZzogJ3V0ZjgnIH0pO1xuICAgIHJldHVybiB7XG4gICAgICAgIGJ1aWxkOiBIYW5kbGViYXJzLmNvbXBpbGUodGVtcGxhdGVUZXh0LCB7XG4gICAgICAgICAgICBub0VzY2FwZTogdHJ1ZSxcbiAgICAgICAgfSlcbiAgICB9O1xufVxuXG5hc3luYyBmdW5jdGlvbiBhcHBseVRlbXBsYXRlKHRlbXBsYXRlOiBUZW1wbGF0ZSwgY29udGV4dDogYW55KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGVtcGxhdGUuYnVpbGQoY29udGV4dCk7XG59XG5cbmNvbnN0IGpzQ29udHJhY3RUZW1wbGF0ZSA9IGNvbXBpbGVUZW1wbGF0ZSgnanMtdGVtcGxhdGVzJywgJ2NvbnRyYWN0LmpzLmhicycpO1xuXG5leHBvcnQgY29uc3QgQ2xpZW50Q29kZUxldmVsID0ge1xuICAgIG5vbmU6ICdub25lJyxcbiAgICBydW46ICdydW4nLFxuICAgIGRlcGxveTogJ2RlcGxveSdcbn07XG5cbmV4cG9ydCB0eXBlIENsaWVudENvZGVMZXZlbFR5cGUgPSAkS2V5czx0eXBlb2YgQ2xpZW50Q29kZUxldmVsPjtcblxuZXhwb3J0IGNvbnN0IENsaWVudENvZGVMYW5ndWFnZSA9IHtcbiAgICBqczogJ2pzJyxcbiAgICByczogJ3JzJyxcbn07XG5cbmV4cG9ydCB0eXBlIENsaWVudENvZGVMYW5ndWFnZVR5cGUgPSAkS2V5czx0eXBlb2YgQ2xpZW50Q29kZUxhbmd1YWdlPjtcblxuZXhwb3J0IGNvbnN0IEpTTW9kdWxlID0ge1xuICAgIG5vZGU6ICdub2RlJyxcbiAgICBub2RlTm9EZWZhdWx0OiAnbm9kZU5vRGVmYXVsdCcsXG4gICAgZXM6ICdlcycsXG4gICAgZXNOb0RlZmF1bHQ6ICdlc05vRGVmYXVsdCcsXG59O1xuXG5leHBvcnQgdHlwZSBKU01vZHVsZVR5cGUgPSAkS2V5czx0eXBlb2YgSlNNb2R1bGU+O1xuXG5leHBvcnQgdHlwZSBDbGllbnRDb2RlT3B0aW9ucyA9IHtcbiAgICBjbGllbnRMYW5ndWFnZXM6IENsaWVudENvZGVMYW5ndWFnZVR5cGVbXSxcbiAgICBjbGllbnRMZXZlbDogQ2xpZW50Q29kZUxldmVsVHlwZSxcbiAgICBqc01vZHVsZTogSlNNb2R1bGVUeXBlLFxufTtcblxuXG5leHBvcnQgY2xhc3MgQ2xpZW50Q29kZSB7XG4gICAgc3RhdGljIGFzeW5jIGdlbmVyYXRlKGZpbGVzOiBzdHJpbmdbXSwgb3B0aW9uczogQ2xpZW50Q29kZU9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgZ2VuZXJhdGVMYW5ndWFnZSA9IGFzeW5jIChcbiAgICAgICAgICAgIGxhbmd1YWdlOiBDbGllbnRDb2RlTGFuZ3VhZ2VUeXBlLFxuICAgICAgICAgICAgZ2VuZXJhdG9yOiAob3B0aW9uczogQ2xpZW50Q29kZU9wdGlvbnMpID0+IFByb21pc2U8dm9pZD5cbiAgICAgICAgKSA9PiB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5jbGllbnRMYW5ndWFnZXMuZmluZCh4ID0+IHgudG9Mb3dlckNhc2UoKSA9PT0gbGFuZ3VhZ2UudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBnZW5lcmF0b3IuYmluZChDbGllbnRDb2RlKShmaWxlcywgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgYXdhaXQgZ2VuZXJhdGVMYW5ndWFnZShDbGllbnRDb2RlTGFuZ3VhZ2UuanMsIHRoaXMuZ2VuZXJhdGVKYXZhU2NyaXB0KTtcbiAgICAgICAgYXdhaXQgZ2VuZXJhdGVMYW5ndWFnZShDbGllbnRDb2RlTGFuZ3VhZ2UucnMsIHRoaXMuZ2VuZXJhdGVSdXN0KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0VGVtcGxhdGVDb250ZXh0KGZpbGVBcmc6IHN0cmluZywgb3B0aW9uczogQ2xpZW50Q29kZU9wdGlvbnMpOiBhbnkge1xuICAgICAgICBjb25zdCBmaWxlID0gcGFyc2VTb2xpZGl0eUZpbGVBcmcoZmlsZUFyZyk7XG4gICAgICAgIGNvbnN0IHsgZGlyLCBuYW1lIH0gPSBmaWxlO1xuICAgICAgICBjb25zdCBpbWFnZUJhc2U2NCA9IG9wdGlvbnMuY2xpZW50TGV2ZWwgPT09IENsaWVudENvZGVMZXZlbC5kZXBsb3lcbiAgICAgICAgICAgID8gZnMucmVhZEZpbGVTeW5jKGRpcihuYW1lLnR2YykpLnRvU3RyaW5nKCdiYXNlNjQnKVxuICAgICAgICAgICAgOiAnJztcbiAgICAgICAgY29uc3QgYWJpSnNvbiA9IGZzLnJlYWRGaWxlU3luYyhkaXIobmFtZS5hYmkpKS50b1N0cmluZygpLnRyaW1SaWdodCgpO1xuICAgICAgICBjb25zdCBhYmkgPSBKU09OLnBhcnNlKGFiaUpzb24pO1xuICAgICAgICBjb25zdCBjbGFzc05hbWUgPSBgJHtuYW1lLmJhc2VbMF0udG9VcHBlckNhc2UoKX0ke25hbWUuYmFzZS5zdWJzdHIoMSl9Q29udHJhY3RgO1xuICAgICAgICBjb25zdCBpc0RlcGxveSA9IChvcHRpb25zLmNsaWVudExldmVsIHx8ICdkZXBsb3knKSA9PT0gJ2RlcGxveSc7XG5cbiAgICAgICAgY29uc3QgdmFyQ29udGV4dCA9ICh2KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBqc1R5cGUgPSB7XG4gICAgICAgICAgICAgICAgYWRkcmVzczogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgJ2FkZHJlc3NbXSc6ICdzdHJpbmdbXScsXG4gICAgICAgICAgICAgICAgdWludDI1NjogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgdWludDMyOiAnbnVtYmVyJyxcbiAgICAgICAgICAgICAgICB1aW50MTY6ICdudW1iZXInLFxuICAgICAgICAgICAgICAgIHVpbnQ4OiAnbnVtYmVyJyxcbiAgICAgICAgICAgICAgICAndWludDI1NltdJzogJ3N0cmluZ1tdJyxcbiAgICAgICAgICAgICAgICAndWludDMyW10nOiAnbnVtYmVyW10nLFxuICAgICAgICAgICAgICAgICd1aW50MTZbXSc6ICdudW1iZXJbXScsXG4gICAgICAgICAgICAgICAgJ3VpbnQ4W10nOiAnbnVtYmVyW10nLFxuICAgICAgICAgICAgfVt2LnR5cGVdIHx8IHYudHlwZTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4udixcbiAgICAgICAgICAgICAgICBqc1R5cGUsXG4gICAgICAgICAgICAgICAgaXNTYW1lSnNUeXBlOiBqc1R5cGUgPT09IHYudHlwZSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBmdW5Db250ZXh0ID0gKGYpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uZixcbiAgICAgICAgICAgICAgICBoYXNJbnB1dHM6IGYuaW5wdXRzLmxlbmd0aCA+IDAsXG4gICAgICAgICAgICAgICAgaGFzT3V0cHV0czogZi5vdXRwdXRzLmxlbmd0aCA+IDAsXG4gICAgICAgICAgICAgICAgaW5wdXRzOiBmLmlucHV0cy5tYXAodmFyQ29udGV4dCksXG4gICAgICAgICAgICAgICAgb3V0cHV0czogZi5vdXRwdXRzLm1hcCh2YXJDb250ZXh0KSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBjb25zdHJ1Y3RvciA9IGZ1bkNvbnRleHQoYWJpLmZ1bmN0aW9ucy5maW5kKHggPT4geC5uYW1lID09PSAnY29uc3RydWN0b3InKSk7XG4gICAgICAgIGNvbnN0cnVjdG9yLmhhc0RhdGEgPSBhYmkuZGF0YS5sZW5ndGggPiAwO1xuICAgICAgICBjb25zdHJ1Y3Rvci5oYXNJbnB1dHNBbmREYXRhID0gY29uc3RydWN0b3IuaGFzSW5wdXRzICYmIGNvbnN0cnVjdG9yLmhhc0RhdGE7XG4gICAgICAgIGNvbnN0cnVjdG9yLmRhdGEgPSBhYmkuZGF0YS5tYXAodmFyQ29udGV4dCk7XG5cbiAgICAgICAgY29uc3QgZnVuY3Rpb25zID0gYWJpLmZ1bmN0aW9ucy5maWx0ZXIoeCA9PiB4Lm5hbWUgIT09ICdjb25zdHJ1Y3RvcicpLm1hcChmdW5Db250ZXh0KTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW1hZ2VCYXNlNjQsXG4gICAgICAgICAgICBhYmlKc29uLFxuICAgICAgICAgICAgYWJpLFxuICAgICAgICAgICAgY2xhc3NOYW1lLFxuICAgICAgICAgICAgaXNEZXBsb3ksXG4gICAgICAgICAgICBjb25zdHJ1Y3RvcixcbiAgICAgICAgICAgIGZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGpzTW9kdWxlTm9kZTogb3B0aW9ucy5qc01vZHVsZSA9PT0gSlNNb2R1bGUubm9kZSB8fCBvcHRpb25zLmpzTW9kdWxlID09PSBKU01vZHVsZS5ub2RlTm9EZWZhdWx0LFxuICAgICAgICAgICAganNNb2R1bGVOb2RlRGVmYXVsdDogb3B0aW9ucy5qc01vZHVsZSA9PT0gSlNNb2R1bGUubm9kZSxcbiAgICAgICAgICAgIGpzTW9kdWxlRXM6IG9wdGlvbnMuanNNb2R1bGUgPT09IEpTTW9kdWxlLmVzIHx8IG9wdGlvbnMuanNNb2R1bGUgPT09IEpTTW9kdWxlLmVzTm9EZWZhdWx0LFxuICAgICAgICAgICAganNNb2R1bGVFc0RlZmF1bHQ6IG9wdGlvbnMuanNNb2R1bGUgPT09IEpTTW9kdWxlLmVzLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHN0YXRpYyBhc3luYyBnZW5lcmF0ZUphdmFTY3JpcHQoZmlsZXM6IHN0cmluZ1tdLCBvcHRpb25zOiBDbGllbnRDb2RlT3B0aW9ucykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBhd2FpdCBDbGllbnRDb2RlLmdlbmVyYXRlSmF2YVNjcmlwdEZpbGUoZmlsZXNbaV0sIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGFzeW5jIGdlbmVyYXRlSmF2YVNjcmlwdEZpbGUoZmlsZTogc3RyaW5nLCBvcHRpb25zOiBDbGllbnRDb2RlT3B0aW9ucykge1xuICAgICAgICBjb25zdCB7IGRpciwgYmFzZSB9ID0gcGFyc2VGaWxlQXJnKGZpbGUsICcuc29sJyk7XG4gICAgICAgIGNvbnN0IGpzID0gYXdhaXQgYXBwbHlUZW1wbGF0ZShqc0NvbnRyYWN0VGVtcGxhdGUsIENsaWVudENvZGUuZ2V0VGVtcGxhdGVDb250ZXh0KGZpbGUsIG9wdGlvbnMpKTtcbiAgICAgICAgZnMud3JpdGVGaWxlU3luYyhkaXIoYCR7YmFzZX1Db250cmFjdC5qc2ApLCBqcywgeyBlbmNvZGluZzogJ3V0ZjgnIH0pO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGFzeW5jIGdlbmVyYXRlUnVzdChmaWxlczogc3RyaW5nW10sIG9wdGlvbnM6IENsaWVudENvZGVPcHRpb25zKSB7XG5cbiAgICB9XG59XG4iXX0=