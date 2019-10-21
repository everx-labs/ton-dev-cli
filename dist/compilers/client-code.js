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
          uint256: 'string',
          address: 'string',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21waWxlcnMvY2xpZW50LWNvZGUuanMiXSwibmFtZXMiOlsicGF0aCIsInJlcXVpcmUiLCJmcyIsIkhhbmRsZWJhcnMiLCJyZWdpc3RlckhlbHBlciIsImNvbXBpbGVUZW1wbGF0ZSIsInBhdGhJdGVtcyIsInRlbXBsYXRlUGF0aCIsInJlc29sdmUiLCJfX2Rpcm5hbWUiLCJ0ZW1wbGF0ZVRleHQiLCJyZWFkRmlsZVN5bmMiLCJlbmNvZGluZyIsImJ1aWxkIiwiY29tcGlsZSIsIm5vRXNjYXBlIiwiYXBwbHlUZW1wbGF0ZSIsInRlbXBsYXRlIiwiY29udGV4dCIsImpzQ29udHJhY3RUZW1wbGF0ZSIsIkNsaWVudENvZGVMZXZlbCIsIm5vbmUiLCJydW4iLCJkZXBsb3kiLCJDbGllbnRDb2RlTGFuZ3VhZ2UiLCJqcyIsInJzIiwiQ2xpZW50Q29kZSIsImZpbGVzIiwib3B0aW9ucyIsImdlbmVyYXRlTGFuZ3VhZ2UiLCJsYW5ndWFnZSIsImdlbmVyYXRvciIsImNsaWVudExhbmd1YWdlcyIsImZpbmQiLCJ4IiwidG9Mb3dlckNhc2UiLCJiaW5kIiwiZ2VuZXJhdGVKYXZhU2NyaXB0IiwiZ2VuZXJhdGVSdXN0IiwiZmlsZUFyZyIsImZpbGUiLCJkaXIiLCJuYW1lIiwiaW1hZ2VCYXNlNjQiLCJjbGllbnRMZXZlbCIsInR2YyIsInRvU3RyaW5nIiwiYWJpSnNvbiIsImFiaSIsInRyaW1SaWdodCIsIkpTT04iLCJwYXJzZSIsImNsYXNzTmFtZSIsImJhc2UiLCJ0b1VwcGVyQ2FzZSIsInN1YnN0ciIsImlzRGVwbG95IiwidmFyQ29udGV4dCIsInYiLCJqc1R5cGUiLCJ1aW50MjU2IiwiYWRkcmVzcyIsInR5cGUiLCJpc1NhbWVKc1R5cGUiLCJmdW5Db250ZXh0IiwiZiIsImhhc0lucHV0cyIsImlucHV0cyIsImxlbmd0aCIsImhhc091dHB1dHMiLCJvdXRwdXRzIiwibWFwIiwiY29uc3RydWN0b3IiLCJmdW5jdGlvbnMiLCJoYXNEYXRhIiwiZGF0YSIsImhhc0lucHV0c0FuZERhdGEiLCJmaWx0ZXIiLCJpIiwiZ2VuZXJhdGVKYXZhU2NyaXB0RmlsZSIsImdldFRlbXBsYXRlQ29udGV4dCIsIndyaXRlRmlsZVN5bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsSUFBSSxHQUFHQyxPQUFPLENBQUMsTUFBRCxDQUFwQjs7QUFDQSxJQUFNQyxFQUFFLEdBQUdELE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQU1BRSx1QkFBV0MsY0FBWCxDQUEwQixJQUExQixFQUFnQztBQUFBLFNBQU0sR0FBTjtBQUFBLENBQWhDOztBQUNBRCx1QkFBV0MsY0FBWCxDQUEwQixJQUExQixFQUFnQztBQUFBLFNBQU0sR0FBTjtBQUFBLENBQWhDOztBQUVBLFNBQVNDLGVBQVQsR0FBMkQ7QUFBQSxvQ0FBL0JDLFNBQStCO0FBQS9CQSxJQUFBQSxTQUErQjtBQUFBOztBQUN2RCxNQUFNQyxZQUFZLEdBQUdQLElBQUksQ0FBQ1EsT0FBTCxPQUFBUixJQUFJLEdBQVNTLFNBQVQsRUFBb0IsSUFBcEIsRUFBMEIsSUFBMUIsU0FBbUNILFNBQW5DLEVBQXpCO0FBQ0EsTUFBTUksWUFBWSxHQUFHUixFQUFFLENBQUNTLFlBQUgsQ0FBZ0JKLFlBQWhCLEVBQThCO0FBQUVLLElBQUFBLFFBQVEsRUFBRTtBQUFaLEdBQTlCLENBQXJCO0FBQ0EsU0FBTztBQUNIQyxJQUFBQSxLQUFLLEVBQUVWLHVCQUFXVyxPQUFYLENBQW1CSixZQUFuQixFQUFpQztBQUNwQ0ssTUFBQUEsUUFBUSxFQUFFO0FBRDBCLEtBQWpDO0FBREosR0FBUDtBQUtIOztTQUVjQyxhOzs7Ozs7OytCQUFmLGtCQUE2QkMsUUFBN0IsRUFBaURDLE9BQWpEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw4Q0FDV0QsUUFBUSxDQUFDSixLQUFULENBQWVLLE9BQWYsQ0FEWDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7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QyxRQUFBQSxHQUFHLEVBQUhBLEdBSEc7QUFJSEksUUFBQUEsU0FBUyxFQUFUQSxTQUpHO0FBS0hJLFFBQUFBLFFBQVEsRUFBUkEsUUFMRztBQU1IZ0IsUUFBQUEsV0FBVyxFQUFYQSxXQU5HO0FBT0hDLFFBQUFBLFNBQVMsRUFBVEE7QUFQRyxPQUFQO0FBU0g7Ozs7OztxREFFK0I5QyxLLEVBQWlCQyxPOzs7Ozs7QUFDcENrRCxnQkFBQUEsQyxHQUFJLEM7OztzQkFBR0EsQ0FBQyxHQUFHbkQsS0FBSyxDQUFDeUMsTTs7Ozs7O3VCQUNoQjFDLFVBQVUsQ0FBQ3FELHNCQUFYLENBQWtDcEQsS0FBSyxDQUFDbUQsQ0FBRCxDQUF2QyxFQUE0Q2xELE9BQTVDLEM7OztBQUR3QmtELGdCQUFBQSxDQUFDLElBQUksQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cURBS1B0QyxJLEVBQWNaLE87Ozs7Ozs7Z0NBQ3hCLHlCQUFhWSxJQUFiLEVBQW1CLE1BQW5CLEMsRUFBZEMsRyxpQkFBQUEsRyxFQUFLWSxJLGlCQUFBQSxJOzt1QkFDSXRDLGFBQWEsQ0FBQ0csa0JBQUQsRUFBcUJRLFVBQVUsQ0FBQ3NELGtCQUFYLENBQThCeEMsSUFBOUIsRUFBb0NaLE9BQXBDLENBQXJCLEM7OztBQUF4QkosZ0JBQUFBLEU7QUFDTnZCLGdCQUFBQSxFQUFFLENBQUNnRixhQUFILENBQWlCeEMsR0FBRyxXQUFJWSxJQUFKLGlCQUFwQixFQUE0QzdCLEVBQTVDLEVBQWdEO0FBQUViLGtCQUFBQSxRQUFRLEVBQUU7QUFBWixpQkFBaEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxREFJc0JnQixLLEVBQWlCQyxPIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuXG5pbXBvcnQgeyBwYXJzZUZpbGVBcmcgfSBmcm9tIFwiLi4vdXRpbHMvdXRpbHNcIjtcbmltcG9ydCBIYW5kbGViYXJzIGZyb20gJ2hhbmRsZWJhcnMnO1xuaW1wb3J0IHsgcGFyc2VTb2xpZGl0eUZpbGVBcmcgfSBmcm9tIFwiLi9zb2xpZGl0eVwiO1xuXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuXG50eXBlIFRlbXBsYXRlID0ge1xuICAgIGJ1aWxkOiBhbnlcbn1cblxuSGFuZGxlYmFycy5yZWdpc3RlckhlbHBlcignTEInLCAoKSA9PiAneycpO1xuSGFuZGxlYmFycy5yZWdpc3RlckhlbHBlcignUkInLCAoKSA9PiAnfScpO1xuXG5mdW5jdGlvbiBjb21waWxlVGVtcGxhdGUoLi4ucGF0aEl0ZW1zOiBzdHJpbmdbXSk6IFRlbXBsYXRlIHtcbiAgICBjb25zdCB0ZW1wbGF0ZVBhdGggPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4nLCAnLi4nLCAuLi5wYXRoSXRlbXMpO1xuICAgIGNvbnN0IHRlbXBsYXRlVGV4dCA9IGZzLnJlYWRGaWxlU3luYyh0ZW1wbGF0ZVBhdGgsIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgICBidWlsZDogSGFuZGxlYmFycy5jb21waWxlKHRlbXBsYXRlVGV4dCwge1xuICAgICAgICAgICAgbm9Fc2NhcGU6IHRydWUsXG4gICAgICAgIH0pXG4gICAgfTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gYXBwbHlUZW1wbGF0ZSh0ZW1wbGF0ZTogVGVtcGxhdGUsIGNvbnRleHQ6IGFueSk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRlbXBsYXRlLmJ1aWxkKGNvbnRleHQpO1xufVxuXG5jb25zdCBqc0NvbnRyYWN0VGVtcGxhdGUgPSBjb21waWxlVGVtcGxhdGUoJ2pzLXRlbXBsYXRlcycsICdjb250cmFjdC5qcy5oYnMnKTtcblxuZXhwb3J0IGNvbnN0IENsaWVudENvZGVMZXZlbCA9IHtcbiAgICBub25lOiAnbm9uZScsXG4gICAgcnVuOiAncnVuJyxcbiAgICBkZXBsb3k6ICdkZXBsb3knXG59O1xuXG5leHBvcnQgdHlwZSBDbGllbnRDb2RlTGV2ZWxUeXBlID0gJEtleXM8dHlwZW9mIENsaWVudENvZGVMZXZlbD47XG5cbmV4cG9ydCBjb25zdCBDbGllbnRDb2RlTGFuZ3VhZ2UgPSB7XG4gICAganM6ICdqcycsXG4gICAgcnM6ICdycycsXG59O1xuXG5leHBvcnQgdHlwZSBDbGllbnRDb2RlTGFuZ3VhZ2VUeXBlID0gJEtleXM8dHlwZW9mIENsaWVudENvZGVMYW5ndWFnZT47XG5cbmV4cG9ydCB0eXBlIENsaWVudENvZGVPcHRpb25zID0ge1xuICAgIGNsaWVudExhbmd1YWdlczogQ2xpZW50Q29kZUxhbmd1YWdlVHlwZVtdLFxuICAgIGNsaWVudExldmVsOiBDbGllbnRDb2RlTGV2ZWxUeXBlLFxufTtcblxuXG5leHBvcnQgY2xhc3MgQ2xpZW50Q29kZSB7XG4gICAgc3RhdGljIGFzeW5jIGdlbmVyYXRlKGZpbGVzOiBzdHJpbmdbXSwgb3B0aW9uczogQ2xpZW50Q29kZU9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgZ2VuZXJhdGVMYW5ndWFnZSA9IGFzeW5jIChcbiAgICAgICAgICAgIGxhbmd1YWdlOiBDbGllbnRDb2RlTGFuZ3VhZ2VUeXBlLFxuICAgICAgICAgICAgZ2VuZXJhdG9yOiAob3B0aW9uczogQ2xpZW50Q29kZU9wdGlvbnMpID0+IFByb21pc2U8dm9pZD5cbiAgICAgICAgKSA9PiB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5jbGllbnRMYW5ndWFnZXMuZmluZCh4ID0+IHgudG9Mb3dlckNhc2UoKSA9PT0gbGFuZ3VhZ2UudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBnZW5lcmF0b3IuYmluZChDbGllbnRDb2RlKShmaWxlcywgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgYXdhaXQgZ2VuZXJhdGVMYW5ndWFnZShDbGllbnRDb2RlTGFuZ3VhZ2UuanMsIHRoaXMuZ2VuZXJhdGVKYXZhU2NyaXB0KTtcbiAgICAgICAgYXdhaXQgZ2VuZXJhdGVMYW5ndWFnZShDbGllbnRDb2RlTGFuZ3VhZ2UucnMsIHRoaXMuZ2VuZXJhdGVSdXN0KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0VGVtcGxhdGVDb250ZXh0KGZpbGVBcmc6IHN0cmluZywgb3B0aW9uczogQ2xpZW50Q29kZU9wdGlvbnMpOiBhbnkge1xuICAgICAgICBjb25zdCBmaWxlID0gcGFyc2VTb2xpZGl0eUZpbGVBcmcoZmlsZUFyZyk7XG4gICAgICAgIGNvbnN0IHsgZGlyLCBuYW1lIH0gPSBmaWxlO1xuICAgICAgICBjb25zdCBpbWFnZUJhc2U2NCA9IG9wdGlvbnMuY2xpZW50TGV2ZWwgPT09IENsaWVudENvZGVMZXZlbC5kZXBsb3lcbiAgICAgICAgICAgID8gZnMucmVhZEZpbGVTeW5jKGRpcihuYW1lLnR2YykpLnRvU3RyaW5nKCdiYXNlNjQnKVxuICAgICAgICAgICAgOiAnJztcbiAgICAgICAgY29uc3QgYWJpSnNvbiA9IGZzLnJlYWRGaWxlU3luYyhkaXIobmFtZS5hYmkpKS50b1N0cmluZygpLnRyaW1SaWdodCgpO1xuICAgICAgICBjb25zdCBhYmkgPSBKU09OLnBhcnNlKGFiaUpzb24pO1xuICAgICAgICBjb25zdCBjbGFzc05hbWUgPSBgJHtuYW1lLmJhc2VbMF0udG9VcHBlckNhc2UoKX0ke25hbWUuYmFzZS5zdWJzdHIoMSl9Q29udHJhY3RgO1xuICAgICAgICBjb25zdCBpc0RlcGxveSA9IChvcHRpb25zLmNsaWVudExldmVsIHx8ICdkZXBsb3knKSA9PT0gJ2RlcGxveSc7XG5cbiAgICAgICAgY29uc3QgdmFyQ29udGV4dCA9ICh2KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBqc1R5cGUgPSB7XG4gICAgICAgICAgICAgICAgdWludDI1NjogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgYWRkcmVzczogJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgJ3VpbnQ4W10nOiAnbnVtYmVyW10nLFxuICAgICAgICAgICAgfVt2LnR5cGVdIHx8IHYudHlwZTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4udixcbiAgICAgICAgICAgICAgICBqc1R5cGUsXG4gICAgICAgICAgICAgICAgaXNTYW1lSnNUeXBlOiBqc1R5cGUgPT09IHYudHlwZSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBmdW5Db250ZXh0ID0gKGYpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uZixcbiAgICAgICAgICAgICAgICBoYXNJbnB1dHM6IGYuaW5wdXRzLmxlbmd0aCA+IDAsXG4gICAgICAgICAgICAgICAgaGFzT3V0cHV0czogZi5vdXRwdXRzLmxlbmd0aCA+IDAsXG4gICAgICAgICAgICAgICAgaW5wdXRzOiBmLmlucHV0cy5tYXAodmFyQ29udGV4dCksXG4gICAgICAgICAgICAgICAgb3V0cHV0czogZi5vdXRwdXRzLm1hcCh2YXJDb250ZXh0KSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBjb25zdHJ1Y3RvciA9IGZ1bkNvbnRleHQoYWJpLmZ1bmN0aW9ucy5maW5kKHggPT4geC5uYW1lID09PSAnY29uc3RydWN0b3InKSk7XG4gICAgICAgIGNvbnN0cnVjdG9yLmhhc0RhdGEgPSBhYmkuZGF0YS5sZW5ndGggPiAwO1xuICAgICAgICBjb25zdHJ1Y3Rvci5oYXNJbnB1dHNBbmREYXRhID0gY29uc3RydWN0b3IuaGFzSW5wdXRzICYmIGNvbnN0cnVjdG9yLmhhc0RhdGE7XG4gICAgICAgIGNvbnN0cnVjdG9yLmRhdGEgPSBhYmkuZGF0YS5tYXAodmFyQ29udGV4dCk7XG5cbiAgICAgICAgY29uc3QgZnVuY3Rpb25zID0gYWJpLmZ1bmN0aW9ucy5maWx0ZXIoeCA9PiB4Lm5hbWUgIT09ICdjb25zdHJ1Y3RvcicpLm1hcChmdW5Db250ZXh0KTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW1hZ2VCYXNlNjQsXG4gICAgICAgICAgICBhYmlKc29uLFxuICAgICAgICAgICAgYWJpLFxuICAgICAgICAgICAgY2xhc3NOYW1lLFxuICAgICAgICAgICAgaXNEZXBsb3ksXG4gICAgICAgICAgICBjb25zdHJ1Y3RvcixcbiAgICAgICAgICAgIGZ1bmN0aW9ucyxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYXN5bmMgZ2VuZXJhdGVKYXZhU2NyaXB0KGZpbGVzOiBzdHJpbmdbXSwgb3B0aW9uczogQ2xpZW50Q29kZU9wdGlvbnMpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgYXdhaXQgQ2xpZW50Q29kZS5nZW5lcmF0ZUphdmFTY3JpcHRGaWxlKGZpbGVzW2ldLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBhc3luYyBnZW5lcmF0ZUphdmFTY3JpcHRGaWxlKGZpbGU6IHN0cmluZywgb3B0aW9uczogQ2xpZW50Q29kZU9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgeyBkaXIsIGJhc2UgfSA9IHBhcnNlRmlsZUFyZyhmaWxlLCAnLnNvbCcpO1xuICAgICAgICBjb25zdCBqcyA9IGF3YWl0IGFwcGx5VGVtcGxhdGUoanNDb250cmFjdFRlbXBsYXRlLCBDbGllbnRDb2RlLmdldFRlbXBsYXRlQ29udGV4dChmaWxlLCBvcHRpb25zKSk7XG4gICAgICAgIGZzLndyaXRlRmlsZVN5bmMoZGlyKGAke2Jhc2V9Q29udHJhY3QuanNgKSwganMsIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBhc3luYyBnZW5lcmF0ZVJ1c3QoZmlsZXM6IHN0cmluZ1tdLCBvcHRpb25zOiBDbGllbnRDb2RlT3B0aW9ucykge1xuXG4gICAgfVxufVxuIl19