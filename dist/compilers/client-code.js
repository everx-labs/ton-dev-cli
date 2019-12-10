"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientCode = exports.JSModule = exports.ClientCodeLevel = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _utils = require("../utils/utils");

var _handlebars = _interopRequireDefault(require("handlebars"));

var _solidity = require("./solidity");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
  _regenerator["default"].mark(function _callee3(template, context) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", template.build(context));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
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
    key: "register",
    value: function register(language) {
      ClientCode.languages[language.shortName.toLowerCase()] = language;
    }
  }, {
    key: "generate",
    value: function () {
      var _generate = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(files, options) {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _name, _language;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 3;
                _iterator = options.clientLanguages[Symbol.iterator]();

              case 5:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 15;
                  break;
                }

                _name = _step.value;
                _language = ClientCode.languages[_name.toLocaleLowerCase()];

                if (_language) {
                  _context.next = 10;
                  break;
                }

                throw Error("Unknown client code language: ".concat(_name));

              case 10:
                _context.next = 12;
                return _language.generate(files, options);

              case 12:
                _iteratorNormalCompletion = true;
                _context.next = 5;
                break;

              case 15:
                _context.next = 21;
                break;

              case 17:
                _context.prev = 17;
                _context.t0 = _context["catch"](3);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 21:
                _context.prev = 21;
                _context.prev = 22;

                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }

              case 24:
                _context.prev = 24;

                if (!_didIteratorError) {
                  _context.next = 27;
                  break;
                }

                throw _iteratorError;

              case 27:
                return _context.finish(24);

              case 28:
                return _context.finish(21);

              case 29:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 17, 21, 29], [22,, 24, 28]]);
      }));

      function generate(_x3, _x4) {
        return _generate.apply(this, arguments);
      }

      return generate;
    }()
  }]);
  return ClientCode;
}();

exports.ClientCode = ClientCode;
(0, _defineProperty2["default"])(ClientCode, "languages", {});
var JsClientCode = {
  name: 'JavaScript',
  shortName: 'js',
  getTemplateContext: function getTemplateContext(fileArg, options) {
    var file = (0, _solidity.parseSolidityFileArg)(fileArg, false);
    var dir = file.dir,
        name = file.name;

    var readText = function readText(name, encoding) {
      if (!fs.existsSync(dir(name))) {
        throw new Error("File not exists: ".concat(name));
      }

      return fs.readFileSync(dir(name)).toString(encoding);
    };

    var imageBase64 = options.clientLevel === ClientCodeLevel.deploy ? readText(name.tvc, 'base64') : '';
    var abiJson = readText(name.abi, 'utf8').trimRight();

    var abi = _objectSpread({
      functions: [],
      data: []
    }, JSON.parse(abiJson));

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
        hasData: false,
        hasInputsAndData: false,
        hasInputs: f.inputs.length > 0,
        hasOutputs: f.outputs.length > 0,
        inputs: f.inputs.map(varContext),
        outputs: f.outputs.map(varContext)
      });
    };

    var constructor = funContext(abi.functions.find(function (x) {
      return x.name === 'constructor';
    }) || {
      name: 'constructor',
      inputs: [],
      outputs: [],
      data: []
    });
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
  },
  generate: function generate(files, options) {
    return (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2() {
      var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _file, _parseFileArg, _dir, _base, _js;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context2.prev = 3;
              _iterator2 = files[Symbol.iterator]();

            case 5:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context2.next = 15;
                break;
              }

              _file = _step2.value;
              _parseFileArg = (0, _utils.parseFileArg)(_file, '.sol', false), _dir = _parseFileArg.dir, _base = _parseFileArg.base;
              _context2.next = 10;
              return applyTemplate(jsContractTemplate, JsClientCode.getTemplateContext(_file, options));

            case 10:
              _js = _context2.sent;
              fs.writeFileSync(_dir("".concat(_base, "Contract.js")), _js, {
                encoding: 'utf8'
              });

            case 12:
              _iteratorNormalCompletion2 = true;
              _context2.next = 5;
              break;

            case 15:
              _context2.next = 21;
              break;

            case 17:
              _context2.prev = 17;
              _context2.t0 = _context2["catch"](3);
              _didIteratorError2 = true;
              _iteratorError2 = _context2.t0;

            case 21:
              _context2.prev = 21;
              _context2.prev = 22;

              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }

            case 24:
              _context2.prev = 24;

              if (!_didIteratorError2) {
                _context2.next = 27;
                break;
              }

              throw _iteratorError2;

            case 27:
              return _context2.finish(24);

            case 28:
              return _context2.finish(21);

            case 29:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[3, 17, 21, 29], [22,, 24, 28]]);
    }))();
  }
};
ClientCode.register(JsClientCode);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21waWxlcnMvY2xpZW50LWNvZGUuanMiXSwibmFtZXMiOlsicGF0aCIsInJlcXVpcmUiLCJmcyIsIkhhbmRsZWJhcnMiLCJyZWdpc3RlckhlbHBlciIsImNvbXBpbGVUZW1wbGF0ZSIsInBhdGhJdGVtcyIsInRlbXBsYXRlUGF0aCIsInJlc29sdmUiLCJfX2Rpcm5hbWUiLCJ0ZW1wbGF0ZVRleHQiLCJyZWFkRmlsZVN5bmMiLCJlbmNvZGluZyIsImJ1aWxkIiwiY29tcGlsZSIsIm5vRXNjYXBlIiwiYXBwbHlUZW1wbGF0ZSIsInRlbXBsYXRlIiwiY29udGV4dCIsImpzQ29udHJhY3RUZW1wbGF0ZSIsIkNsaWVudENvZGVMZXZlbCIsIm5vbmUiLCJydW4iLCJkZXBsb3kiLCJKU01vZHVsZSIsIm5vZGUiLCJub2RlTm9EZWZhdWx0IiwiZXMiLCJlc05vRGVmYXVsdCIsIkNsaWVudENvZGUiLCJsYW5ndWFnZSIsImxhbmd1YWdlcyIsInNob3J0TmFtZSIsInRvTG93ZXJDYXNlIiwiZmlsZXMiLCJvcHRpb25zIiwiY2xpZW50TGFuZ3VhZ2VzIiwibmFtZSIsInRvTG9jYWxlTG93ZXJDYXNlIiwiRXJyb3IiLCJnZW5lcmF0ZSIsIkpzQ2xpZW50Q29kZSIsImdldFRlbXBsYXRlQ29udGV4dCIsImZpbGVBcmciLCJmaWxlIiwiZGlyIiwicmVhZFRleHQiLCJleGlzdHNTeW5jIiwidG9TdHJpbmciLCJpbWFnZUJhc2U2NCIsImNsaWVudExldmVsIiwidHZjIiwiYWJpSnNvbiIsImFiaSIsInRyaW1SaWdodCIsImZ1bmN0aW9ucyIsImRhdGEiLCJKU09OIiwicGFyc2UiLCJjbGFzc05hbWUiLCJiYXNlIiwidG9VcHBlckNhc2UiLCJzdWJzdHIiLCJpc0RlcGxveSIsInZhckNvbnRleHQiLCJ2IiwianNUeXBlIiwiYWRkcmVzcyIsInVpbnQyNTYiLCJ1aW50MzIiLCJ1aW50MTYiLCJ1aW50OCIsInR5cGUiLCJpc1NhbWVKc1R5cGUiLCJmdW5Db250ZXh0IiwiZiIsImhhc0RhdGEiLCJoYXNJbnB1dHNBbmREYXRhIiwiaGFzSW5wdXRzIiwiaW5wdXRzIiwibGVuZ3RoIiwiaGFzT3V0cHV0cyIsIm91dHB1dHMiLCJtYXAiLCJjb25zdHJ1Y3RvciIsImZpbmQiLCJ4IiwiZmlsdGVyIiwianNNb2R1bGVOb2RlIiwianNNb2R1bGUiLCJqc01vZHVsZU5vZGVEZWZhdWx0IiwianNNb2R1bGVFcyIsImpzTW9kdWxlRXNEZWZhdWx0IiwianMiLCJ3cml0ZUZpbGVTeW5jIiwicmVnaXN0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkE7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLElBQUksR0FBR0MsT0FBTyxDQUFDLE1BQUQsQ0FBcEI7O0FBQ0EsSUFBTUMsRUFBRSxHQUFHRCxPQUFPLENBQUMsSUFBRCxDQUFsQjs7QUFNQUUsdUJBQVdDLGNBQVgsQ0FBMEIsSUFBMUIsRUFBZ0M7QUFBQSxTQUFNLEdBQU47QUFBQSxDQUFoQzs7QUFDQUQsdUJBQVdDLGNBQVgsQ0FBMEIsSUFBMUIsRUFBZ0M7QUFBQSxTQUFNLEdBQU47QUFBQSxDQUFoQzs7QUFFQSxTQUFTQyxlQUFULEdBQTJEO0FBQUEsb0NBQS9CQyxTQUErQjtBQUEvQkEsSUFBQUEsU0FBK0I7QUFBQTs7QUFDdkQsTUFBTUMsWUFBWSxHQUFHUCxJQUFJLENBQUNRLE9BQUwsT0FBQVIsSUFBSSxHQUFTUyxTQUFULEVBQW9CLElBQXBCLEVBQTBCLElBQTFCLFNBQW1DSCxTQUFuQyxFQUF6QjtBQUNBLE1BQU1JLFlBQVksR0FBR1IsRUFBRSxDQUFDUyxZQUFILENBQWdCSixZQUFoQixFQUE4QjtBQUFFSyxJQUFBQSxRQUFRLEVBQUU7QUFBWixHQUE5QixDQUFyQjtBQUNBLFNBQU87QUFDSEMsSUFBQUEsS0FBSyxFQUFFVix1QkFBV1csT0FBWCxDQUFtQkosWUFBbkIsRUFBaUM7QUFDcENLLE1BQUFBLFFBQVEsRUFBRTtBQUQwQixLQUFqQztBQURKLEdBQVA7QUFLSDs7U0FFY0Ms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SUFBRyxXQUFJZSxLQUFKLGlCQUFwQixFQUE0Q2lDLEdBQTVDLEVBQWdEO0FBQUVqRixnQkFBQUEsUUFBUSxFQUFFO0FBQVosZUFBaEQ7O0FBSm9EO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNM0Q7QUF6RmdCLENBQXJCO0FBNEZBaUIsVUFBVSxDQUFDa0UsUUFBWCxDQUFvQnRELFlBQXBCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuXG4vLyBAZmxvd1xuXG5pbXBvcnQgeyBwYXJzZUZpbGVBcmcgfSBmcm9tIFwiLi4vdXRpbHMvdXRpbHNcIjtcbmltcG9ydCBIYW5kbGViYXJzIGZyb20gJ2hhbmRsZWJhcnMnO1xuaW1wb3J0IHsgcGFyc2VTb2xpZGl0eUZpbGVBcmcgfSBmcm9tIFwiLi9zb2xpZGl0eVwiO1xuXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuXG50eXBlIFRlbXBsYXRlID0ge1xuICAgIGJ1aWxkOiBhbnlcbn1cblxuSGFuZGxlYmFycy5yZWdpc3RlckhlbHBlcignTEInLCAoKSA9PiAneycpO1xuSGFuZGxlYmFycy5yZWdpc3RlckhlbHBlcignUkInLCAoKSA9PiAnfScpO1xuXG5mdW5jdGlvbiBjb21waWxlVGVtcGxhdGUoLi4ucGF0aEl0ZW1zOiBzdHJpbmdbXSk6IFRlbXBsYXRlIHtcbiAgICBjb25zdCB0ZW1wbGF0ZVBhdGggPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4nLCAnLi4nLCAuLi5wYXRoSXRlbXMpO1xuICAgIGNvbnN0IHRlbXBsYXRlVGV4dCA9IGZzLnJlYWRGaWxlU3luYyh0ZW1wbGF0ZVBhdGgsIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgICBidWlsZDogSGFuZGxlYmFycy5jb21waWxlKHRlbXBsYXRlVGV4dCwge1xuICAgICAgICAgICAgbm9Fc2NhcGU6IHRydWUsXG4gICAgICAgIH0pXG4gICAgfTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gYXBwbHlUZW1wbGF0ZSh0ZW1wbGF0ZTogVGVtcGxhdGUsIGNvbnRleHQ6IGFueSk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRlbXBsYXRlLmJ1aWxkKGNvbnRleHQpO1xufVxuXG5jb25zdCBqc0NvbnRyYWN0VGVtcGxhdGUgPSBjb21waWxlVGVtcGxhdGUoJ2pzLXRlbXBsYXRlcycsICdjb250cmFjdC5qcy5oYnMnKTtcblxuZXhwb3J0IGNvbnN0IENsaWVudENvZGVMZXZlbCA9IHtcbiAgICBub25lOiAnbm9uZScsXG4gICAgcnVuOiAncnVuJyxcbiAgICBkZXBsb3k6ICdkZXBsb3knXG59O1xuXG5leHBvcnQgdHlwZSBDbGllbnRDb2RlTGV2ZWxUeXBlID0gJEtleXM8dHlwZW9mIENsaWVudENvZGVMZXZlbD47XG5cbmV4cG9ydCB0eXBlIENsaWVudENvZGVMYW5ndWFnZVR5cGUgPSBzdHJpbmc7XG5cbmV4cG9ydCBjb25zdCBKU01vZHVsZSA9IHtcbiAgICBub2RlOiAnbm9kZScsXG4gICAgbm9kZU5vRGVmYXVsdDogJ25vZGVOb0RlZmF1bHQnLFxuICAgIGVzOiAnZXMnLFxuICAgIGVzTm9EZWZhdWx0OiAnZXNOb0RlZmF1bHQnLFxufTtcblxuZXhwb3J0IHR5cGUgSlNNb2R1bGVUeXBlID0gJEtleXM8dHlwZW9mIEpTTW9kdWxlPjtcblxuZXhwb3J0IHR5cGUgQ2xpZW50Q29kZU9wdGlvbnMgPSB7XG4gICAgY2xpZW50TGFuZ3VhZ2VzOiBDbGllbnRDb2RlTGFuZ3VhZ2VUeXBlW10sXG4gICAgY2xpZW50TGV2ZWw6IENsaWVudENvZGVMZXZlbFR5cGUsXG4gICAganNNb2R1bGU6IEpTTW9kdWxlVHlwZSxcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2xpZW50Q29kZUxhbmd1YWdlIHtcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgc2hvcnROYW1lOiBzdHJpbmcsXG4gICAgZ2VuZXJhdGU6IChmaWxlczogc3RyaW5nW10sIG9wdGlvbnM6IENsaWVudENvZGVPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+XG59XG5cbmV4cG9ydCBjbGFzcyBDbGllbnRDb2RlIHtcbiAgICBzdGF0aWMgbGFuZ3VhZ2VzOiB7IFtzdHJpbmddOiBDbGllbnRDb2RlTGFuZ3VhZ2UgfSA9IHt9O1xuXG4gICAgc3RhdGljIHJlZ2lzdGVyKGxhbmd1YWdlOiBDbGllbnRDb2RlTGFuZ3VhZ2UpIHtcbiAgICAgICAgQ2xpZW50Q29kZS5sYW5ndWFnZXNbbGFuZ3VhZ2Uuc2hvcnROYW1lLnRvTG93ZXJDYXNlKCldID0gbGFuZ3VhZ2U7XG4gICAgfVxuXG4gICAgc3RhdGljIGFzeW5jIGdlbmVyYXRlKGZpbGVzOiBzdHJpbmdbXSwgb3B0aW9uczogQ2xpZW50Q29kZU9wdGlvbnMpIHtcbiAgICAgICAgZm9yIChjb25zdCBuYW1lIG9mIG9wdGlvbnMuY2xpZW50TGFuZ3VhZ2VzKSB7XG4gICAgICAgICAgICBjb25zdCBsYW5ndWFnZSA9IENsaWVudENvZGUubGFuZ3VhZ2VzW25hbWUudG9Mb2NhbGVMb3dlckNhc2UoKV07XG4gICAgICAgICAgICBpZiAoIWxhbmd1YWdlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoYFVua25vd24gY2xpZW50IGNvZGUgbGFuZ3VhZ2U6ICR7bmFtZX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF3YWl0IGxhbmd1YWdlLmdlbmVyYXRlKGZpbGVzLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY29uc3QgSnNDbGllbnRDb2RlID0ge1xuICAgIG5hbWU6ICdKYXZhU2NyaXB0JyxcbiAgICBzaG9ydE5hbWU6ICdqcycsXG4gICAgZ2V0VGVtcGxhdGVDb250ZXh0KGZpbGVBcmc6IHN0cmluZywgb3B0aW9uczogQ2xpZW50Q29kZU9wdGlvbnMpOiBhbnkge1xuICAgICAgICBjb25zdCBmaWxlID0gcGFyc2VTb2xpZGl0eUZpbGVBcmcoZmlsZUFyZywgZmFsc2UpO1xuICAgICAgICBjb25zdCB7IGRpciwgbmFtZSB9ID0gZmlsZTtcbiAgICAgICAgY29uc3QgcmVhZFRleHQgPSAobmFtZTogc3RyaW5nLCBlbmNvZGluZzogJ3V0ZjgnIHwgJ2Jhc2U2NCcpOiBzdHJpbmcgPT4ge1xuICAgICAgICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKGRpcihuYW1lKSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZpbGUgbm90IGV4aXN0czogJHtuYW1lfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZzLnJlYWRGaWxlU3luYyhkaXIobmFtZSkpLnRvU3RyaW5nKGVuY29kaW5nKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBpbWFnZUJhc2U2NCA9IG9wdGlvbnMuY2xpZW50TGV2ZWwgPT09IENsaWVudENvZGVMZXZlbC5kZXBsb3lcbiAgICAgICAgICAgID8gcmVhZFRleHQobmFtZS50dmMsICdiYXNlNjQnKVxuICAgICAgICAgICAgOiAnJztcbiAgICAgICAgY29uc3QgYWJpSnNvbiA9IHJlYWRUZXh0KG5hbWUuYWJpLCAndXRmOCcpLnRyaW1SaWdodCgpO1xuICAgICAgICBjb25zdCBhYmkgPSB7XG4gICAgICAgICAgICBmdW5jdGlvbnM6IFtdLFxuICAgICAgICAgICAgZGF0YTogW10sXG4gICAgICAgICAgICAuLi5KU09OLnBhcnNlKGFiaUpzb24pXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gYCR7bmFtZS5iYXNlWzBdLnRvVXBwZXJDYXNlKCl9JHtuYW1lLmJhc2Uuc3Vic3RyKDEpfUNvbnRyYWN0YDtcbiAgICAgICAgY29uc3QgaXNEZXBsb3kgPSAob3B0aW9ucy5jbGllbnRMZXZlbCB8fCAnZGVwbG95JykgPT09ICdkZXBsb3knO1xuXG4gICAgICAgIGNvbnN0IHZhckNvbnRleHQgPSAodikgPT4ge1xuICAgICAgICAgICAgY29uc3QganNUeXBlID0ge1xuICAgICAgICAgICAgICAgIGFkZHJlc3M6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgICdhZGRyZXNzW10nOiAnc3RyaW5nW10nLFxuICAgICAgICAgICAgICAgIHVpbnQyNTY6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICAgIHVpbnQzMjogJ251bWJlcicsXG4gICAgICAgICAgICAgICAgdWludDE2OiAnbnVtYmVyJyxcbiAgICAgICAgICAgICAgICB1aW50ODogJ251bWJlcicsXG4gICAgICAgICAgICAgICAgJ3VpbnQyNTZbXSc6ICdzdHJpbmdbXScsXG4gICAgICAgICAgICAgICAgJ3VpbnQzMltdJzogJ251bWJlcltdJyxcbiAgICAgICAgICAgICAgICAndWludDE2W10nOiAnbnVtYmVyW10nLFxuICAgICAgICAgICAgICAgICd1aW50OFtdJzogJ251bWJlcltdJyxcbiAgICAgICAgICAgIH1bdi50eXBlXSB8fCB2LnR5cGU7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnYsXG4gICAgICAgICAgICAgICAganNUeXBlLFxuICAgICAgICAgICAgICAgIGlzU2FtZUpzVHlwZToganNUeXBlID09PSB2LnR5cGUsXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgZnVuQ29udGV4dCA9IChmKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLmYsXG4gICAgICAgICAgICAgICAgaGFzRGF0YTogZmFsc2UsXG4gICAgICAgICAgICAgICAgaGFzSW5wdXRzQW5kRGF0YTogZmFsc2UsXG4gICAgICAgICAgICAgICAgaGFzSW5wdXRzOiBmLmlucHV0cy5sZW5ndGggPiAwLFxuICAgICAgICAgICAgICAgIGhhc091dHB1dHM6IGYub3V0cHV0cy5sZW5ndGggPiAwLFxuICAgICAgICAgICAgICAgIGlucHV0czogZi5pbnB1dHMubWFwKHZhckNvbnRleHQpLFxuICAgICAgICAgICAgICAgIG91dHB1dHM6IGYub3V0cHV0cy5tYXAodmFyQ29udGV4dCksXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgY29uc3RydWN0b3IgPSBmdW5Db250ZXh0KGFiaS5mdW5jdGlvbnMuZmluZCh4ID0+IHgubmFtZSA9PT0gJ2NvbnN0cnVjdG9yJykgfHwge1xuICAgICAgICAgICAgbmFtZTogJ2NvbnN0cnVjdG9yJyxcbiAgICAgICAgICAgIGlucHV0czogW10sXG4gICAgICAgICAgICBvdXRwdXRzOiBbXSxcbiAgICAgICAgICAgIGRhdGE6IFtdLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3RydWN0b3IuaGFzRGF0YSA9IGFiaS5kYXRhLmxlbmd0aCA+IDA7XG4gICAgICAgIGNvbnN0cnVjdG9yLmhhc0lucHV0c0FuZERhdGEgPSBjb25zdHJ1Y3Rvci5oYXNJbnB1dHMgJiYgY29uc3RydWN0b3IuaGFzRGF0YTtcbiAgICAgICAgY29uc3RydWN0b3IuZGF0YSA9IGFiaS5kYXRhLm1hcCh2YXJDb250ZXh0KTtcblxuICAgICAgICBjb25zdCBmdW5jdGlvbnMgPSBhYmkuZnVuY3Rpb25zLmZpbHRlcih4ID0+IHgubmFtZSAhPT0gJ2NvbnN0cnVjdG9yJykubWFwKGZ1bkNvbnRleHQpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW1hZ2VCYXNlNjQsXG4gICAgICAgICAgICBhYmlKc29uLFxuICAgICAgICAgICAgYWJpLFxuICAgICAgICAgICAgY2xhc3NOYW1lLFxuICAgICAgICAgICAgaXNEZXBsb3ksXG4gICAgICAgICAgICBjb25zdHJ1Y3RvcixcbiAgICAgICAgICAgIGZ1bmN0aW9ucyxcbiAgICAgICAgICAgIGpzTW9kdWxlTm9kZTogb3B0aW9ucy5qc01vZHVsZSA9PT0gSlNNb2R1bGUubm9kZSB8fCBvcHRpb25zLmpzTW9kdWxlID09PSBKU01vZHVsZS5ub2RlTm9EZWZhdWx0LFxuICAgICAgICAgICAganNNb2R1bGVOb2RlRGVmYXVsdDogb3B0aW9ucy5qc01vZHVsZSA9PT0gSlNNb2R1bGUubm9kZSxcbiAgICAgICAgICAgIGpzTW9kdWxlRXM6IG9wdGlvbnMuanNNb2R1bGUgPT09IEpTTW9kdWxlLmVzIHx8IG9wdGlvbnMuanNNb2R1bGUgPT09IEpTTW9kdWxlLmVzTm9EZWZhdWx0LFxuICAgICAgICAgICAganNNb2R1bGVFc0RlZmF1bHQ6IG9wdGlvbnMuanNNb2R1bGUgPT09IEpTTW9kdWxlLmVzLFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgYXN5bmMgZ2VuZXJhdGUoZmlsZXM6IHN0cmluZ1tdLCBvcHRpb25zOiBDbGllbnRDb2RlT3B0aW9ucykge1xuICAgICAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgZGlyLCBiYXNlIH0gPSBwYXJzZUZpbGVBcmcoZmlsZSwgJy5zb2wnLCBmYWxzZSk7XG4gICAgICAgICAgICBjb25zdCBqcyA9IGF3YWl0IGFwcGx5VGVtcGxhdGUoanNDb250cmFjdFRlbXBsYXRlLCBKc0NsaWVudENvZGUuZ2V0VGVtcGxhdGVDb250ZXh0KGZpbGUsIG9wdGlvbnMpKTtcbiAgICAgICAgICAgIGZzLndyaXRlRmlsZVN5bmMoZGlyKGAke2Jhc2V9Q29udHJhY3QuanNgKSwganMsIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbkNsaWVudENvZGUucmVnaXN0ZXIoSnNDbGllbnRDb2RlKTtcbiJdfQ==