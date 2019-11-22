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
      var file = (0, _solidity.parseSolidityFileArg)(fileArg, false);
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
                _parseFileArg = (0, _utils.parseFileArg)(file, '.sol', false), dir = _parseFileArg.dir, base = _parseFileArg.base;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21waWxlcnMvY2xpZW50LWNvZGUuanMiXSwibmFtZXMiOlsicGF0aCIsInJlcXVpcmUiLCJmcyIsIkhhbmRsZWJhcnMiLCJyZWdpc3RlckhlbHBlciIsImNvbXBpbGVUZW1wbGF0ZSIsInBhdGhJdGVtcyIsInRlbXBsYXRlUGF0aCIsInJlc29sdmUiLCJfX2Rpcm5hbWUiLCJ0ZW1wbGF0ZVRleHQiLCJyZWFkRmlsZVN5bmMiLCJlbmNvZGluZyIsImJ1aWxkIiwiY29tcGlsZSIsIm5vRXNjYXBlIiwiYXBwbHlUZW1wbGF0ZSIsInRlbXBsYXRlIiwiY29udGV4dCIsImpzQ29udHJhY3RUZW1wbGF0ZSIsIkNsaWVudENvZGVMZXZlbCIsIm5vbmUiLCJydW4iLCJkZXBsb3kiLCJDbGllbnRDb2RlTGFuZ3VhZ2UiLCJqcyIsInJzIiwiSlNNb2R1bGUiLCJub2RlIiwibm9kZU5vRGVmYXVsdCIsImVzIiwiZXNOb0RlZmF1bHQiLCJDbGllbnRDb2RlIiwiZmlsZXMiLCJvcHRpb25zIiwiZ2VuZXJhdGVMYW5ndWFnZSIsImxhbmd1YWdlIiwiZ2VuZXJhdG9yIiwiY2xpZW50TGFuZ3VhZ2VzIiwiZmluZCIsIngiLCJ0b0xvd2VyQ2FzZSIsImJpbmQiLCJnZW5lcmF0ZUphdmFTY3JpcHQiLCJnZW5lcmF0ZVJ1c3QiLCJmaWxlQXJnIiwiZmlsZSIsImRpciIsIm5hbWUiLCJpbWFnZUJhc2U2NCIsImNsaWVudExldmVsIiwidHZjIiwidG9TdHJpbmciLCJhYmlKc29uIiwiYWJpIiwidHJpbVJpZ2h0IiwiSlNPTiIsInBhcnNlIiwiY2xhc3NOYW1lIiwiYmFzZSIsInRvVXBwZXJDYXNlIiwic3Vic3RyIiwiaXNEZXBsb3kiLCJ2YXJDb250ZXh0IiwidiIsImpzVHlwZSIsImFkZHJlc3MiLCJ1aW50MjU2IiwidWludDMyIiwidWludDE2IiwidWludDgiLCJ0eXBlIiwiaXNTYW1lSnNUeXBlIiwiZnVuQ29udGV4dCIsImYiLCJoYXNJbnB1dHMiLCJpbnB1dHMiLCJsZW5ndGgiLCJoYXNPdXRwdXRzIiwib3V0cHV0cyIsIm1hcCIsImNvbnN0cnVjdG9yIiwiZnVuY3Rpb25zIiwiaGFzRGF0YSIsImRhdGEiLCJoYXNJbnB1dHNBbmREYXRhIiwiZmlsdGVyIiwianNNb2R1bGVOb2RlIiwianNNb2R1bGUiLCJqc01vZHVsZU5vZGVEZWZhdWx0IiwianNNb2R1bGVFcyIsImpzTW9kdWxlRXNEZWZhdWx0IiwiaSIsImdlbmVyYXRlSmF2YVNjcmlwdEZpbGUiLCJnZXRUZW1wbGF0ZUNvbnRleHQiLCJ3cml0ZUZpbGVTeW5jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBOztBQUNBOztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxJQUFJLEdBQUdDLE9BQU8sQ0FBQyxNQUFELENBQXBCOztBQUNBLElBQU1DLEVBQUUsR0FBR0QsT0FBTyxDQUFDLElBQUQsQ0FBbEI7O0FBTUFFLHVCQUFXQyxjQUFYLENBQTBCLElBQTFCLEVBQWdDO0FBQUEsU0FBTSxHQUFOO0FBQUEsQ0FBaEM7O0FBQ0FELHVCQUFXQyxjQUFYLENBQTBCLElBQTFCLEVBQWdDO0FBQUEsU0FBTSxHQUFOO0FBQUEsQ0FBaEM7O0FBRUEsU0FBU0MsZUFBVCxHQUEyRDtBQUFBLG9DQUEvQkMsU0FBK0I7QUFBL0JBLElBQUFBLFNBQStCO0FBQUE7O0FBQ3ZELE1BQU1DLFlBQVksR0FBR1AsSUFBSSxDQUFDUSxPQUFMLE9BQUFSLElBQUksR0FBU1MsU0FBVCxFQUFvQixJQUFwQixFQUEwQixJQUExQixTQUFtQ0gsU0FBbkMsRUFBekI7QUFDQSxNQUFNSSxZQUFZLEdBQUdSLEVBQUUsQ0FBQ1MsWUFBSCxDQUFnQkosWUFBaEIsRUFBOEI7QUFBRUssSUFBQUEsUUFBUSxFQUFFO0FBQVosR0FBOUIsQ0FBckI7QUFDQSxTQUFPO0FBQ0hDLElBQUFBLEtBQUssRUFBRVYsdUJBQVdXLE9BQVgsQ0FBbUJKLFlBQW5CLEVBQWlDO0FBQ3BDSyxNQUFBQSxRQUFRLEVBQUU7QUFEMEIsS0FBakM7QUFESixH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V0FWM0U7QUFXSDRELFFBQUFBLGlCQUFpQixFQUFFekQsT0FBTyxDQUFDc0QsUUFBUixLQUFxQjdELFFBQVEsQ0FBQ0c7QUFYOUMsT0FBUDtBQWFIOzs7Ozs7cURBRStCRyxLLEVBQWlCQyxPOzs7Ozs7QUFDcEMwRCxnQkFBQUEsQyxHQUFJLEM7OztzQkFBR0EsQ0FBQyxHQUFHM0QsS0FBSyxDQUFDNEMsTTs7Ozs7O3VCQUNoQjdDLFVBQVUsQ0FBQzZELHNCQUFYLENBQWtDNUQsS0FBSyxDQUFDMkQsQ0FBRCxDQUF2QyxFQUE0QzFELE9BQTVDLEM7OztBQUR3QjBELGdCQUFBQSxDQUFDLElBQUksQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cURBS1A5QyxJLEVBQWNaLE87Ozs7Ozs7Z0NBQ3hCLHlCQUFhWSxJQUFiLEVBQW1CLE1BQW5CLEVBQTJCLEtBQTNCLEMsRUFBZEMsRyxpQkFBQUEsRyxFQUFLWSxJLGlCQUFBQSxJOzt1QkFDSTNDLGFBQWEsQ0FBQ0csa0JBQUQsRUFBcUJhLFVBQVUsQ0FBQzhELGtCQUFYLENBQThCaEQsSUFBOUIsRUFBb0NaLE9BQXBDLENBQXJCLEM7OztBQUF4QlQsZ0JBQUFBLEU7QUFDTnZCLGdCQUFBQSxFQUFFLENBQUM2RixhQUFILENBQWlCaEQsR0FBRyxXQUFJWSxJQUFKLGlCQUFwQixFQUE0Q2xDLEVBQTVDLEVBQWdEO0FBQUViLGtCQUFBQSxRQUFRLEVBQUU7QUFBWixpQkFBaEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxREFJc0JxQixLLEVBQWlCQyxPIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuXG4vLyBAZmxvd1xuXG5pbXBvcnQgeyBwYXJzZUZpbGVBcmcgfSBmcm9tIFwiLi4vdXRpbHMvdXRpbHNcIjtcbmltcG9ydCBIYW5kbGViYXJzIGZyb20gJ2hhbmRsZWJhcnMnO1xuaW1wb3J0IHsgcGFyc2VTb2xpZGl0eUZpbGVBcmcgfSBmcm9tIFwiLi9zb2xpZGl0eVwiO1xuXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuXG50eXBlIFRlbXBsYXRlID0ge1xuICAgIGJ1aWxkOiBhbnlcbn1cblxuSGFuZGxlYmFycy5yZWdpc3RlckhlbHBlcignTEInLCAoKSA9PiAneycpO1xuSGFuZGxlYmFycy5yZWdpc3RlckhlbHBlcignUkInLCAoKSA9PiAnfScpO1xuXG5mdW5jdGlvbiBjb21waWxlVGVtcGxhdGUoLi4ucGF0aEl0ZW1zOiBzdHJpbmdbXSk6IFRlbXBsYXRlIHtcbiAgICBjb25zdCB0ZW1wbGF0ZVBhdGggPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4nLCAnLi4nLCAuLi5wYXRoSXRlbXMpO1xuICAgIGNvbnN0IHRlbXBsYXRlVGV4dCA9IGZzLnJlYWRGaWxlU3luYyh0ZW1wbGF0ZVBhdGgsIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgICBidWlsZDogSGFuZGxlYmFycy5jb21waWxlKHRlbXBsYXRlVGV4dCwge1xuICAgICAgICAgICAgbm9Fc2NhcGU6IHRydWUsXG4gICAgICAgIH0pXG4gICAgfTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gYXBwbHlUZW1wbGF0ZSh0ZW1wbGF0ZTogVGVtcGxhdGUsIGNvbnRleHQ6IGFueSk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRlbXBsYXRlLmJ1aWxkKGNvbnRleHQpO1xufVxuXG5jb25zdCBqc0NvbnRyYWN0VGVtcGxhdGUgPSBjb21waWxlVGVtcGxhdGUoJ2pzLXRlbXBsYXRlcycsICdjb250cmFjdC5qcy5oYnMnKTtcblxuZXhwb3J0IGNvbnN0IENsaWVudENvZGVMZXZlbCA9IHtcbiAgICBub25lOiAnbm9uZScsXG4gICAgcnVuOiAncnVuJyxcbiAgICBkZXBsb3k6ICdkZXBsb3knXG59O1xuXG5leHBvcnQgdHlwZSBDbGllbnRDb2RlTGV2ZWxUeXBlID0gJEtleXM8dHlwZW9mIENsaWVudENvZGVMZXZlbD47XG5cbmV4cG9ydCBjb25zdCBDbGllbnRDb2RlTGFuZ3VhZ2UgPSB7XG4gICAganM6ICdqcycsXG4gICAgcnM6ICdycycsXG59O1xuXG5leHBvcnQgdHlwZSBDbGllbnRDb2RlTGFuZ3VhZ2VUeXBlID0gc3RyaW5nO1xuXG5leHBvcnQgY29uc3QgSlNNb2R1bGUgPSB7XG4gICAgbm9kZTogJ25vZGUnLFxuICAgIG5vZGVOb0RlZmF1bHQ6ICdub2RlTm9EZWZhdWx0JyxcbiAgICBlczogJ2VzJyxcbiAgICBlc05vRGVmYXVsdDogJ2VzTm9EZWZhdWx0Jyxcbn07XG5cbmV4cG9ydCB0eXBlIEpTTW9kdWxlVHlwZSA9ICRLZXlzPHR5cGVvZiBKU01vZHVsZT47XG5cbmV4cG9ydCB0eXBlIENsaWVudENvZGVPcHRpb25zID0ge1xuICAgIGNsaWVudExhbmd1YWdlczogQ2xpZW50Q29kZUxhbmd1YWdlVHlwZVtdLFxuICAgIGNsaWVudExldmVsOiBDbGllbnRDb2RlTGV2ZWxUeXBlLFxuICAgIGpzTW9kdWxlOiBKU01vZHVsZVR5cGUsXG59O1xuXG5cbmV4cG9ydCBjbGFzcyBDbGllbnRDb2RlIHtcbiAgICBzdGF0aWMgYXN5bmMgZ2VuZXJhdGUoZmlsZXM6IHN0cmluZ1tdLCBvcHRpb25zOiBDbGllbnRDb2RlT3B0aW9ucykge1xuICAgICAgICBjb25zdCBnZW5lcmF0ZUxhbmd1YWdlID0gYXN5bmMgKFxuICAgICAgICAgICAgbGFuZ3VhZ2U6IENsaWVudENvZGVMYW5ndWFnZVR5cGUsXG4gICAgICAgICAgICBnZW5lcmF0b3I6IChmaWxlczogc3RyaW5nW10sIG9wdGlvbnM6IENsaWVudENvZGVPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+XG4gICAgICAgICkgPT4ge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuY2xpZW50TGFuZ3VhZ2VzLmZpbmQoeCA9PiB4LnRvTG93ZXJDYXNlKCkgPT09IGxhbmd1YWdlLnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgZ2VuZXJhdG9yLmJpbmQoQ2xpZW50Q29kZSkoZmlsZXMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGF3YWl0IGdlbmVyYXRlTGFuZ3VhZ2UoQ2xpZW50Q29kZUxhbmd1YWdlLmpzLCB0aGlzLmdlbmVyYXRlSmF2YVNjcmlwdCk7XG4gICAgICAgIGF3YWl0IGdlbmVyYXRlTGFuZ3VhZ2UoQ2xpZW50Q29kZUxhbmd1YWdlLnJzLCB0aGlzLmdlbmVyYXRlUnVzdCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldFRlbXBsYXRlQ29udGV4dChmaWxlQXJnOiBzdHJpbmcsIG9wdGlvbnM6IENsaWVudENvZGVPcHRpb25zKTogYW55IHtcbiAgICAgICAgY29uc3QgZmlsZSA9IHBhcnNlU29saWRpdHlGaWxlQXJnKGZpbGVBcmcsIGZhbHNlKTtcbiAgICAgICAgY29uc3QgeyBkaXIsIG5hbWUgfSA9IGZpbGU7XG4gICAgICAgIGNvbnN0IGltYWdlQmFzZTY0ID0gb3B0aW9ucy5jbGllbnRMZXZlbCA9PT0gQ2xpZW50Q29kZUxldmVsLmRlcGxveVxuICAgICAgICAgICAgPyBmcy5yZWFkRmlsZVN5bmMoZGlyKG5hbWUudHZjKSkudG9TdHJpbmcoJ2Jhc2U2NCcpXG4gICAgICAgICAgICA6ICcnO1xuICAgICAgICBjb25zdCBhYmlKc29uID0gZnMucmVhZEZpbGVTeW5jKGRpcihuYW1lLmFiaSkpLnRvU3RyaW5nKCkudHJpbVJpZ2h0KCk7XG4gICAgICAgIGNvbnN0IGFiaSA9IEpTT04ucGFyc2UoYWJpSnNvbik7XG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IGAke25hbWUuYmFzZVswXS50b1VwcGVyQ2FzZSgpfSR7bmFtZS5iYXNlLnN1YnN0cigxKX1Db250cmFjdGA7XG4gICAgICAgIGNvbnN0IGlzRGVwbG95ID0gKG9wdGlvbnMuY2xpZW50TGV2ZWwgfHwgJ2RlcGxveScpID09PSAnZGVwbG95JztcblxuICAgICAgICBjb25zdCB2YXJDb250ZXh0ID0gKHYpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGpzVHlwZSA9IHtcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICAnYWRkcmVzc1tdJzogJ3N0cmluZ1tdJyxcbiAgICAgICAgICAgICAgICB1aW50MjU2OiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICB1aW50MzI6ICdudW1iZXInLFxuICAgICAgICAgICAgICAgIHVpbnQxNjogJ251bWJlcicsXG4gICAgICAgICAgICAgICAgdWludDg6ICdudW1iZXInLFxuICAgICAgICAgICAgICAgICd1aW50MjU2W10nOiAnc3RyaW5nW10nLFxuICAgICAgICAgICAgICAgICd1aW50MzJbXSc6ICdudW1iZXJbXScsXG4gICAgICAgICAgICAgICAgJ3VpbnQxNltdJzogJ251bWJlcltdJyxcbiAgICAgICAgICAgICAgICAndWludDhbXSc6ICdudW1iZXJbXScsXG4gICAgICAgICAgICB9W3YudHlwZV0gfHwgdi50eXBlO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi52LFxuICAgICAgICAgICAgICAgIGpzVHlwZSxcbiAgICAgICAgICAgICAgICBpc1NhbWVKc1R5cGU6IGpzVHlwZSA9PT0gdi50eXBlLFxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGZ1bkNvbnRleHQgPSAoZikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5mLFxuICAgICAgICAgICAgICAgIGhhc0lucHV0czogZi5pbnB1dHMubGVuZ3RoID4gMCxcbiAgICAgICAgICAgICAgICBoYXNPdXRwdXRzOiBmLm91dHB1dHMubGVuZ3RoID4gMCxcbiAgICAgICAgICAgICAgICBpbnB1dHM6IGYuaW5wdXRzLm1hcCh2YXJDb250ZXh0KSxcbiAgICAgICAgICAgICAgICBvdXRwdXRzOiBmLm91dHB1dHMubWFwKHZhckNvbnRleHQpLFxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGNvbnN0cnVjdG9yID0gZnVuQ29udGV4dChhYmkuZnVuY3Rpb25zLmZpbmQoeCA9PiB4Lm5hbWUgPT09ICdjb25zdHJ1Y3RvcicpKTtcbiAgICAgICAgY29uc3RydWN0b3IuaGFzRGF0YSA9IGFiaS5kYXRhLmxlbmd0aCA+IDA7XG4gICAgICAgIGNvbnN0cnVjdG9yLmhhc0lucHV0c0FuZERhdGEgPSBjb25zdHJ1Y3Rvci5oYXNJbnB1dHMgJiYgY29uc3RydWN0b3IuaGFzRGF0YTtcbiAgICAgICAgY29uc3RydWN0b3IuZGF0YSA9IGFiaS5kYXRhLm1hcCh2YXJDb250ZXh0KTtcblxuICAgICAgICBjb25zdCBmdW5jdGlvbnMgPSBhYmkuZnVuY3Rpb25zLmZpbHRlcih4ID0+IHgubmFtZSAhPT0gJ2NvbnN0cnVjdG9yJykubWFwKGZ1bkNvbnRleHQpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbWFnZUJhc2U2NCxcbiAgICAgICAgICAgIGFiaUpzb24sXG4gICAgICAgICAgICBhYmksXG4gICAgICAgICAgICBjbGFzc05hbWUsXG4gICAgICAgICAgICBpc0RlcGxveSxcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yLFxuICAgICAgICAgICAgZnVuY3Rpb25zLFxuICAgICAgICAgICAganNNb2R1bGVOb2RlOiBvcHRpb25zLmpzTW9kdWxlID09PSBKU01vZHVsZS5ub2RlIHx8IG9wdGlvbnMuanNNb2R1bGUgPT09IEpTTW9kdWxlLm5vZGVOb0RlZmF1bHQsXG4gICAgICAgICAgICBqc01vZHVsZU5vZGVEZWZhdWx0OiBvcHRpb25zLmpzTW9kdWxlID09PSBKU01vZHVsZS5ub2RlLFxuICAgICAgICAgICAganNNb2R1bGVFczogb3B0aW9ucy5qc01vZHVsZSA9PT0gSlNNb2R1bGUuZXMgfHwgb3B0aW9ucy5qc01vZHVsZSA9PT0gSlNNb2R1bGUuZXNOb0RlZmF1bHQsXG4gICAgICAgICAgICBqc01vZHVsZUVzRGVmYXVsdDogb3B0aW9ucy5qc01vZHVsZSA9PT0gSlNNb2R1bGUuZXMsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc3RhdGljIGFzeW5jIGdlbmVyYXRlSmF2YVNjcmlwdChmaWxlczogc3RyaW5nW10sIG9wdGlvbnM6IENsaWVudENvZGVPcHRpb25zKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGF3YWl0IENsaWVudENvZGUuZ2VuZXJhdGVKYXZhU2NyaXB0RmlsZShmaWxlc1tpXSwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgYXN5bmMgZ2VuZXJhdGVKYXZhU2NyaXB0RmlsZShmaWxlOiBzdHJpbmcsIG9wdGlvbnM6IENsaWVudENvZGVPcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IHsgZGlyLCBiYXNlIH0gPSBwYXJzZUZpbGVBcmcoZmlsZSwgJy5zb2wnLCBmYWxzZSk7XG4gICAgICAgIGNvbnN0IGpzID0gYXdhaXQgYXBwbHlUZW1wbGF0ZShqc0NvbnRyYWN0VGVtcGxhdGUsIENsaWVudENvZGUuZ2V0VGVtcGxhdGVDb250ZXh0KGZpbGUsIG9wdGlvbnMpKTtcbiAgICAgICAgZnMud3JpdGVGaWxlU3luYyhkaXIoYCR7YmFzZX1Db250cmFjdC5qc2ApLCBqcywgeyBlbmNvZGluZzogJ3V0ZjgnIH0pO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGFzeW5jIGdlbmVyYXRlUnVzdChmaWxlczogc3RyaW5nW10sIG9wdGlvbnM6IENsaWVudENvZGVPcHRpb25zKSB7XG5cbiAgICB9XG59XG4iXX0=