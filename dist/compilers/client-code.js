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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21waWxlcnMvY2xpZW50LWNvZGUuanMiXSwibmFtZXMiOlsicGF0aCIsInJlcXVpcmUiLCJmcyIsIkhhbmRsZWJhcnMiLCJyZWdpc3RlckhlbHBlciIsImNvbXBpbGVUZW1wbGF0ZSIsInBhdGhJdGVtcyIsInRlbXBsYXRlUGF0aCIsInJlc29sdmUiLCJfX2Rpcm5hbWUiLCJ0ZW1wbGF0ZVRleHQiLCJyZWFkRmlsZVN5bmMiLCJlbmNvZGluZyIsImJ1aWxkIiwiY29tcGlsZSIsIm5vRXNjYXBlIiwiYXBwbHlUZW1wbGF0ZSIsInRlbXBsYXRlIiwiY29udGV4dCIsImpzQ29udHJhY3RUZW1wbGF0ZSIsIkNsaWVudENvZGVMZXZlbCIsIm5vbmUiLCJydW4iLCJkZXBsb3kiLCJDbGllbnRDb2RlTGFuZ3VhZ2UiLCJqcyIsInJzIiwiSlNNb2R1bGUiLCJub2RlIiwibm9kZU5vRGVmYXVsdCIsImVzIiwiZXNOb0RlZmF1bHQiLCJDbGllbnRDb2RlIiwiZmlsZXMiLCJvcHRpb25zIiwiZ2VuZXJhdGVMYW5ndWFnZSIsImxhbmd1YWdlIiwiZ2VuZXJhdG9yIiwiY2xpZW50TGFuZ3VhZ2VzIiwiZmluZCIsIngiLCJ0b0xvd2VyQ2FzZSIsImJpbmQiLCJnZW5lcmF0ZUphdmFTY3JpcHQiLCJnZW5lcmF0ZVJ1c3QiLCJmaWxlQXJnIiwiZmlsZSIsImRpciIsIm5hbWUiLCJpbWFnZUJhc2U2NCIsImNsaWVudExldmVsIiwidHZjIiwidG9TdHJpbmciLCJhYmlKc29uIiwiYWJpIiwidHJpbVJpZ2h0IiwiZnVuY3Rpb25zIiwiZGF0YSIsIkpTT04iLCJwYXJzZSIsImNsYXNzTmFtZSIsImJhc2UiLCJ0b1VwcGVyQ2FzZSIsInN1YnN0ciIsImlzRGVwbG95IiwidmFyQ29udGV4dCIsInYiLCJqc1R5cGUiLCJhZGRyZXNzIiwidWludDI1NiIsInVpbnQzMiIsInVpbnQxNiIsInVpbnQ4IiwidHlwZSIsImlzU2FtZUpzVHlwZSIsImZ1bkNvbnRleHQiLCJmIiwiaGFzRGF0YSIsImhhc0lucHV0c0FuZERhdGEiLCJoYXNJbnB1dHMiLCJpbnB1dHMiLCJsZW5ndGgiLCJoYXNPdXRwdXRzIiwib3V0cHV0cyIsIm1hcCIsImNvbnN0cnVjdG9yIiwiZmlsdGVyIiwianNNb2R1bGVOb2RlIiwianNNb2R1bGUiLCJqc01vZHVsZU5vZGVEZWZhdWx0IiwianNNb2R1bGVFcyIsImpzTW9kdWxlRXNEZWZhdWx0IiwiaSIsImdlbmVyYXRlSmF2YVNjcmlwdEZpbGUiLCJnZXRUZW1wbGF0ZUNvbnRleHQiLCJ3cml0ZUZpbGVTeW5jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBOztBQUNBOztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxJQUFJLEdBQUdDLE9BQU8sQ0FBQyxNQUFELENBQXBCOztBQUNBLElBQU1DLEVBQUUsR0FBR0QsT0FBTyxDQUFDLElBQUQsQ0FBbEI7O0FBTUFFLHVCQUFXQyxjQUFYLENBQTBCLElBQTFCLEVBQWdDO0FBQUEsU0FBTSxHQUFOO0FBQUEsQ0FBaEM7O0FBQ0FELHVCQUFXQyxjQUFYLENBQTBCLElBQTFCLEVBQWdDO0FBQUEsU0FBTSxHQUFOO0FBQUEsQ0FBaEM7O0FBRUEsU0FBU0MsZUFBVCxHQUEyRDtBQUFBLG9DQUEvQkMsU0FBK0I7QUFBL0JBLElBQUFBLFNBQStCO0FBQUE7O0FBQ3ZELE1BQU1DLFlBQVksR0FBR1AsSUFBSSxDQUFDUSxPQUFMLE9BQUFSLElBQUksR0FBU1MsU0FBVCxFQUFvQixJQUFwQixFQUEwQixJQUExQixTQUFtQ0gsU0FBbkMsRUFBekI7QUFDQSxNQUFNSSxZQUFZLEdBQUdSLEVBQUUsQ0FBQ1MsWUFBSCxDQUFnQkosWUFBaEIsRUFBOEI7QUFBRUssSUFBQUEsUUFBUSxFQUFFO0FBQVosR0FBOUIsQ0FBckI7QUFDQSxTQUFPO0FBQ0hDLElBQUFBLEtBQUssRUFBRVYsdUJBQVdXLE9BQVgsQ0FBbUJKLFlBQW5CLEVBQWlDO0FBQ3BDSyxNQUFBQSxRQUFRLEVBQUU7QUFEMEIsS0FBakM7QUFESixHQUFQO0FBS0g7O1NBRWNDLGE7Ozs7Ozs7K0JBQWYsa0JBQTZCQyxRQUE3QixFQUFpREMsT0FBakQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDhDQUNXRCxRQUFRLENBQUNKLEtBQVQsQ0FBZUssT0FBZixDQURYOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7QUFJQSxJQUFNQyxrQkFBa0IsR0FBR2QsZUFBZSxDQUFDLGNBQUQsRUFBaUIsaUJBQWpCLENBQTFDO0FBRU8sSUFBTWUsZUFBZSxHQUFHO0FBQzNCQyxFQUFBQSxJQUFJLEVBQUUsTUFEcUI7QUFFM0JDLEVBQUFBLEdBQUcsRUFBRSxLQUZzQjtBQUczQkMsRUFBQUEsTUFBTSxFQUFFO0FBSG1CLENBQXhCOztBQVFBLElBQU1DLGtCQUFrQixHQUFHO0FBQzlCQyxFQUFBQSxFQUFFLEVBQUUsSUFEMEI7QUFFOUJDLEVBQUFBLEVBQUUsRUFBRTtBQUYwQixDQUEzQjs7QUFPQSxJQUFNQyxRQUFRLEdBQUc7QUFDcEJDLEVBQUFBLElBQUksRUFBRSxNQURjO0FBRXBCQyxFQUFBQSxhQUFhLEVBQUUsZUFGSztBQUdwQkMsRUFBQUEsRUFBRSxFQUFFLElBSGdCO0FBSXBCQyxFQUFBQSxXQUFXLEVBQUU7QUFKTyxDQUFqQjs7O0lBZ0JNQyxVOzs7Ozs7Ozs7Ozs7cURBQ2FDLEssRUFBaUJDLE87Ozs7OztBQUM3QkMsZ0JBQUFBLGdCOzs7OzsrQ0FBbUIsaUJBQ3JCQyxRQURxQixFQUVyQkMsU0FGcUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlDQUlqQkgsT0FBTyxDQUFDSSxlQUFSLENBQXdCQyxJQUF4QixDQUE2QixVQUFBQyxDQUFDO0FBQUEscUNBQUlBLENBQUMsQ0FBQ0MsV0FBRixPQUFvQkwsUUFBUSxDQUFDSyxXQUFULEVBQXhCO0FBQUEsNkJBQTlCLENBSmlCO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsbUNBS1hKLFNBQVMsQ0FBQ0ssSUFBVixDQUFlVixVQUFmLEVBQTJCQyxLQUEzQixFQUFrQ0MsT0FBbEMsQ0FMVzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQjs7a0NBQW5CQyxnQjs7Ozs7O3VCQVNBQSxnQkFBZ0IsQ0FBQ1gsa0JBQWtCLENBQUNDLEVBQXBCLEVBQXdCLEtBQUtrQixrQkFBN0IsQzs7Ozt1QkFDaEJSLGdCQUFnQixDQUFDWCxrQkFBa0IsQ0FBQ0UsRUFBcEIsRUFBd0IsS0FBS2tCLFlBQTdCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1Q0FHQUMsTyxFQUFpQlgsTyxFQUFpQztBQUN4RSxVQUFNWSxJQUFJLEdBQUcsb0NBQXFCRCxPQUFyQixFQUE4QixLQUE5QixDQUFiO0FBRHdFLFVBRWhFRSxHQUZnRSxHQUVsREQsSUFGa0QsQ0FFaEVDLEdBRmdFO0FBQUEsVUFFM0RDLElBRjJELEdBRWxERixJQUZrRCxDQUUzREUsSUFGMkQ7QUFHeEUsVUFBTUMsV0FBVyxHQUFHZixPQUFPLENBQUNnQixXQUFSLEtBQXdCOUIsZUFBZSxDQUFDRyxNQUF4QyxHQUNkckIsRUFBRSxDQUFDUyxZQUFILENBQWdCb0MsR0FBRyxDQUFDQyxJQUFJLENBQUNHLEdBQU4sQ0FBbkIsRUFBK0JDLFFBQS9CLENBQXdDLFFBQXhDLENBRGMsR0FFZCxFQUZOO0FBR0EsVUFBTUMsT0FBTyxHQUFHbkQsRUFBRSxDQUFDUyxZQUFILENBQWdCb0MsR0FBRyxDQUFDQyxJQUFJLENBQUNNLEdBQU4sQ0FBbkIsRUFBK0JGLFFBQS9CLEdBQTBDRyxTQUExQyxFQUFoQjs7QUFDQSxVQUFNRCxHQUFHO0FBQ0xFLFFBQUFBLFNBQVMsRUFBRSxFQUROO0FBRUxDLFFBQUFBLElBQUksRUFBRTtBQUZELFNBR0ZDLElBQUksQ0FBQ0MsS0FBTCxDQUFXTixPQUFYLENBSEUsQ0FBVDs7QUFNQSxVQUFNTyxTQUFTLGFBQU1aLElBQUksQ0FBQ2EsSUFBTCxDQUFVLENBQVYsRUFBYUMsV0FBYixFQUFOLFNBQW1DZCxJQUFJLENBQUNhLElBQUwsQ0FBVUUsTUFBVixDQUFpQixDQUFqQixDQUFuQyxhQUFmO0FBQ0EsVUFBTUMsUUFBUSxHQUFHLENBQUM5QixPQUFPLENBQUNnQixXQUFSLElBQXVCLFFBQXhCLE1BQXNDLFFBQXZEOztBQUVBLFVBQU1lLFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQUNDLENBQUQsRUFBTztBQUN0QixZQUFNQyxNQUFNLEdBQUc7QUFDWEMsVUFBQUEsT0FBTyxFQUFFLFFBREU7QUFFWCx1QkFBYSxVQUZGO0FBR1hDLFVBQUFBLE9BQU8sRUFBRSxRQUhFO0FBSVhDLFVBQUFBLE1BQU0sRUFBRSxRQUpHO0FBS1hDLFVBQUFBLE1BQU0sRUFBRSxRQUxHO0FBTVhDLFVBQUFBLEtBQUssRUFBRSxRQU5JO0FBT1gsdUJBQWEsVUFQRjtBQVFYLHNCQUFZLFVBUkQ7QUFTWCxzQkFBWSxVQVREO0FBVVgscUJBQVc7QUFWQSxVQVdiTixDQUFDLENBQUNPLElBWFcsS0FXRlAsQ0FBQyxDQUFDTyxJQVhmO0FBWUEsaUNBQ09QLENBRFA7QUFFSUMsVUFBQUEsTUFBTSxFQUFOQSxNQUZKO0FBR0lPLFVBQUFBLFlBQVksRUFBRVAsTUFBTSxLQUFLRCxDQUFDLENBQUNPO0FBSC9CO0FBS0gsT0FsQkQ7O0FBb0JBLFVBQU1FLFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQUNDLENBQUQsRUFBTztBQUN0QixpQ0FDT0EsQ0FEUDtBQUVJQyxVQUFBQSxPQUFPLEVBQUUsS0FGYjtBQUdJQyxVQUFBQSxnQkFBZ0IsRUFBRSxLQUh0QjtBQUlJQyxVQUFBQSxTQUFTLEVBQUVILENBQUMsQ0FBQ0ksTUFBRixDQUFTQyxNQUFULEdBQWtCLENBSmpDO0FBS0lDLFVBQUFBLFVBQVUsRUFBRU4sQ0FBQyxDQUFDTyxPQUFGLENBQVVGLE1BQVYsR0FBbUIsQ0FMbkM7QUFNSUQsVUFBQUEsTUFBTSxFQUFFSixDQUFDLENBQUNJLE1BQUYsQ0FBU0ksR0FBVCxDQUFhbkIsVUFBYixDQU5aO0FBT0lrQixVQUFBQSxPQUFPLEVBQUVQLENBQUMsQ0FBQ08sT0FBRixDQUFVQyxHQUFWLENBQWNuQixVQUFkO0FBUGI7QUFTSCxPQVZEOztBQVlBLFVBQU1vQixXQUFXLEdBQUdWLFVBQVUsQ0FBQ3JCLEdBQUcsQ0FBQ0UsU0FBSixDQUFjakIsSUFBZCxDQUFtQixVQUFBQyxDQUFDO0FBQUEsZUFBSUEsQ0FBQyxDQUFDUSxJQUFGLEtBQVcsYUFBZjtBQUFBLE9BQXBCLEtBQXFEO0FBQ2hGQSxRQUFBQSxJQUFJLEVBQUUsYUFEMEU7QUFFaEZnQyxRQUFBQSxNQUFNLEVBQUUsRUFGd0U7QUFHaEZHLFFBQUFBLE9BQU8sRUFBRSxFQUh1RTtBQUloRjFCLFFBQUFBLElBQUksRUFBRTtBQUowRSxPQUF0RCxDQUE5QjtBQU1BNEIsTUFBQUEsV0FBVyxDQUFDUixPQUFaLEdBQXNCdkIsR0FBRyxDQUFDRyxJQUFKLENBQVN3QixNQUFULEdBQWtCLENBQXhDO0FBQ0FJLE1BQUFBLFdBQVcsQ0FBQ1AsZ0JBQVosR0FBK0JPLFdBQVcsQ0FBQ04sU0FBWixJQUF5Qk0sV0FBVyxDQUFDUixPQUFwRTtBQUNBUSxNQUFBQSxXQUFXLENBQUM1QixJQUFaLEdBQW1CSCxHQUFHLENBQUNHLElBQUosQ0FBUzJCLEdBQVQsQ0FBYW5CLFVBQWIsQ0FBbkI7QUFFQSxVQUFNVCxTQUFTLEdBQUdGLEdBQUcsQ0FBQ0UsU0FBSixDQUFjOEIsTUFBZCxDQUFxQixVQUFBOUMsQ0FBQztBQUFBLGVBQUlBLENBQUMsQ0FBQ1EsSUFBRixLQUFXLGFBQWY7QUFBQSxPQUF0QixFQUFvRG9DLEdBQXBELENBQXdEVCxVQUF4RCxDQUFsQjtBQUNBLGFBQU87QUFDSDFCLFFBQUFBLFdBQVcsRUFBWEEsV0FERztBQUVISSxRQUFBQSxPQUFPLEVBQVBBLE9BRkc7QUFHSEMsUUFBQUEsR0FBRyxFQUFIQSxHQUhHO0FBSUhNLFFBQUFBLFNBQVMsRUFBVEEsU0FKRztBQUtISSxRQUFBQSxRQUFRLEVBQVJBLFFBTEc7QUFNSHFCLFFBQUFBLFdBQVcsRUFBWEEsV0FORztBQU9IN0IsUUFBQUEsU0FBUyxFQUFUQSxTQVBHO0FBUUgrQixRQUFBQSxZQUFZLEVBQUVyRCxPQUFPLENBQUNzRCxRQUFSLEtBQXFCN0QsUUFBUSxDQUFDQyxJQUE5QixJQUFzQ00sT0FBTyxDQUFDc0QsUUFBUixLQUFxQjdELFFBQVEsQ0FBQ0UsYUFSL0U7QUFTSDRELFFBQUFBLG1CQUFtQixFQUFFdkQsT0FBTyxDQUFDc0QsUUFBUixLQUFxQjdELFFBQVEsQ0FBQ0MsSUFUaEQ7QUFVSDhELFFBQUFBLFVBQVUsRUFBRXhELE9BQU8sQ0FBQ3NELFFBQVIsS0FBcUI3RCxRQUFRLENBQUNHLEVBQTlCLElBQW9DSSxPQUFPLENBQUNzRCxRQUFSLEtBQXFCN0QsUUFBUSxDQUFDSSxXQVYzRTtBQVdINEQsUUFBQUEsaUJBQWlCLEVBQUV6RCxPQUFPLENBQUNzRCxRQUFSLEtBQXFCN0QsUUFBUSxDQUFDRztBQVg5QyxPQUFQO0FBYUg7Ozs7OztxREFFK0JHLEssRUFBaUJDLE87Ozs7OztBQUNwQzBELGdCQUFBQSxDLEdBQUksQzs7O3NCQUFHQSxDQUFDLEdBQUczRCxLQUFLLENBQUNnRCxNOzs7Ozs7dUJBQ2hCakQsVUFBVSxDQUFDNkQsc0JBQVgsQ0FBa0M1RCxLQUFLLENBQUMyRCxDQUFELENBQXZDLEVBQTRDMUQsT0FBNUMsQzs7O0FBRHdCMEQsZ0JBQUFBLENBQUMsSUFBSSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxREFLUDlDLEksRUFBY1osTzs7Ozs7OztnQ0FDeEIseUJBQWFZLElBQWIsRUFBbUIsTUFBbkIsRUFBMkIsS0FBM0IsQyxFQUFkQyxHLGlCQUFBQSxHLEVBQUtjLEksaUJBQUFBLEk7O3VCQUNJN0MsYUFBYSxDQUFDRyxrQkFBRCxFQUFxQmEsVUFBVSxDQUFDOEQsa0JBQVgsQ0FBOEJoRCxJQUE5QixFQUFvQ1osT0FBcEMsQ0FBckIsQzs7O0FBQXhCVCxnQkFBQUEsRTtBQUNOdkIsZ0JBQUFBLEVBQUUsQ0FBQzZGLGFBQUgsQ0FBaUJoRCxHQUFHLFdBQUljLElBQUosaUJBQXBCLEVBQTRDcEMsRUFBNUMsRUFBZ0Q7QUFBRWIsa0JBQUFBLFFBQVEsRUFBRTtBQUFaLGlCQUFoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FEQUlzQnFCLEssRUFBaUJDLE8iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG4gKiB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbiAqIExpY2Vuc2UgYXQ6IGh0dHBzOi8vd3d3LnRvbi5kZXYvbGljZW5zZXNcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIFRPTiBERVYgc29mdHdhcmUgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG5cbi8vIEBmbG93XG5cbmltcG9ydCB7IHBhcnNlRmlsZUFyZyB9IGZyb20gXCIuLi91dGlscy91dGlsc1wiO1xuaW1wb3J0IEhhbmRsZWJhcnMgZnJvbSAnaGFuZGxlYmFycyc7XG5pbXBvcnQgeyBwYXJzZVNvbGlkaXR5RmlsZUFyZyB9IGZyb20gXCIuL3NvbGlkaXR5XCI7XG5cbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5cbnR5cGUgVGVtcGxhdGUgPSB7XG4gICAgYnVpbGQ6IGFueVxufVxuXG5IYW5kbGViYXJzLnJlZ2lzdGVySGVscGVyKCdMQicsICgpID0+ICd7Jyk7XG5IYW5kbGViYXJzLnJlZ2lzdGVySGVscGVyKCdSQicsICgpID0+ICd9Jyk7XG5cbmZ1bmN0aW9uIGNvbXBpbGVUZW1wbGF0ZSguLi5wYXRoSXRlbXM6IHN0cmluZ1tdKTogVGVtcGxhdGUge1xuICAgIGNvbnN0IHRlbXBsYXRlUGF0aCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLicsICcuLicsIC4uLnBhdGhJdGVtcyk7XG4gICAgY29uc3QgdGVtcGxhdGVUZXh0ID0gZnMucmVhZEZpbGVTeW5jKHRlbXBsYXRlUGF0aCwgeyBlbmNvZGluZzogJ3V0ZjgnIH0pO1xuICAgIHJldHVybiB7XG4gICAgICAgIGJ1aWxkOiBIYW5kbGViYXJzLmNvbXBpbGUodGVtcGxhdGVUZXh0LCB7XG4gICAgICAgICAgICBub0VzY2FwZTogdHJ1ZSxcbiAgICAgICAgfSlcbiAgICB9O1xufVxuXG5hc3luYyBmdW5jdGlvbiBhcHBseVRlbXBsYXRlKHRlbXBsYXRlOiBUZW1wbGF0ZSwgY29udGV4dDogYW55KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGVtcGxhdGUuYnVpbGQoY29udGV4dCk7XG59XG5cbmNvbnN0IGpzQ29udHJhY3RUZW1wbGF0ZSA9IGNvbXBpbGVUZW1wbGF0ZSgnanMtdGVtcGxhdGVzJywgJ2NvbnRyYWN0LmpzLmhicycpO1xuXG5leHBvcnQgY29uc3QgQ2xpZW50Q29kZUxldmVsID0ge1xuICAgIG5vbmU6ICdub25lJyxcbiAgICBydW46ICdydW4nLFxuICAgIGRlcGxveTogJ2RlcGxveSdcbn07XG5cbmV4cG9ydCB0eXBlIENsaWVudENvZGVMZXZlbFR5cGUgPSAkS2V5czx0eXBlb2YgQ2xpZW50Q29kZUxldmVsPjtcblxuZXhwb3J0IGNvbnN0IENsaWVudENvZGVMYW5ndWFnZSA9IHtcbiAgICBqczogJ2pzJyxcbiAgICByczogJ3JzJyxcbn07XG5cbmV4cG9ydCB0eXBlIENsaWVudENvZGVMYW5ndWFnZVR5cGUgPSBzdHJpbmc7XG5cbmV4cG9ydCBjb25zdCBKU01vZHVsZSA9IHtcbiAgICBub2RlOiAnbm9kZScsXG4gICAgbm9kZU5vRGVmYXVsdDogJ25vZGVOb0RlZmF1bHQnLFxuICAgIGVzOiAnZXMnLFxuICAgIGVzTm9EZWZhdWx0OiAnZXNOb0RlZmF1bHQnLFxufTtcblxuZXhwb3J0IHR5cGUgSlNNb2R1bGVUeXBlID0gJEtleXM8dHlwZW9mIEpTTW9kdWxlPjtcblxuZXhwb3J0IHR5cGUgQ2xpZW50Q29kZU9wdGlvbnMgPSB7XG4gICAgY2xpZW50TGFuZ3VhZ2VzOiBDbGllbnRDb2RlTGFuZ3VhZ2VUeXBlW10sXG4gICAgY2xpZW50TGV2ZWw6IENsaWVudENvZGVMZXZlbFR5cGUsXG4gICAganNNb2R1bGU6IEpTTW9kdWxlVHlwZSxcbn07XG5cblxuZXhwb3J0IGNsYXNzIENsaWVudENvZGUge1xuICAgIHN0YXRpYyBhc3luYyBnZW5lcmF0ZShmaWxlczogc3RyaW5nW10sIG9wdGlvbnM6IENsaWVudENvZGVPcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IGdlbmVyYXRlTGFuZ3VhZ2UgPSBhc3luYyAoXG4gICAgICAgICAgICBsYW5ndWFnZTogQ2xpZW50Q29kZUxhbmd1YWdlVHlwZSxcbiAgICAgICAgICAgIGdlbmVyYXRvcjogKGZpbGVzOiBzdHJpbmdbXSwgb3B0aW9uczogQ2xpZW50Q29kZU9wdGlvbnMpID0+IFByb21pc2U8dm9pZD5cbiAgICAgICAgKSA9PiB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5jbGllbnRMYW5ndWFnZXMuZmluZCh4ID0+IHgudG9Mb3dlckNhc2UoKSA9PT0gbGFuZ3VhZ2UudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBnZW5lcmF0b3IuYmluZChDbGllbnRDb2RlKShmaWxlcywgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgYXdhaXQgZ2VuZXJhdGVMYW5ndWFnZShDbGllbnRDb2RlTGFuZ3VhZ2UuanMsIHRoaXMuZ2VuZXJhdGVKYXZhU2NyaXB0KTtcbiAgICAgICAgYXdhaXQgZ2VuZXJhdGVMYW5ndWFnZShDbGllbnRDb2RlTGFuZ3VhZ2UucnMsIHRoaXMuZ2VuZXJhdGVSdXN0KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0VGVtcGxhdGVDb250ZXh0KGZpbGVBcmc6IHN0cmluZywgb3B0aW9uczogQ2xpZW50Q29kZU9wdGlvbnMpOiBhbnkge1xuICAgICAgICBjb25zdCBmaWxlID0gcGFyc2VTb2xpZGl0eUZpbGVBcmcoZmlsZUFyZywgZmFsc2UpO1xuICAgICAgICBjb25zdCB7IGRpciwgbmFtZSB9ID0gZmlsZTtcbiAgICAgICAgY29uc3QgaW1hZ2VCYXNlNjQgPSBvcHRpb25zLmNsaWVudExldmVsID09PSBDbGllbnRDb2RlTGV2ZWwuZGVwbG95XG4gICAgICAgICAgICA/IGZzLnJlYWRGaWxlU3luYyhkaXIobmFtZS50dmMpKS50b1N0cmluZygnYmFzZTY0JylcbiAgICAgICAgICAgIDogJyc7XG4gICAgICAgIGNvbnN0IGFiaUpzb24gPSBmcy5yZWFkRmlsZVN5bmMoZGlyKG5hbWUuYWJpKSkudG9TdHJpbmcoKS50cmltUmlnaHQoKTtcbiAgICAgICAgY29uc3QgYWJpID0ge1xuICAgICAgICAgICAgZnVuY3Rpb25zOiBbXSxcbiAgICAgICAgICAgIGRhdGE6IFtdLFxuICAgICAgICAgICAgLi4uSlNPTi5wYXJzZShhYmlKc29uKVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IGAke25hbWUuYmFzZVswXS50b1VwcGVyQ2FzZSgpfSR7bmFtZS5iYXNlLnN1YnN0cigxKX1Db250cmFjdGA7XG4gICAgICAgIGNvbnN0IGlzRGVwbG95ID0gKG9wdGlvbnMuY2xpZW50TGV2ZWwgfHwgJ2RlcGxveScpID09PSAnZGVwbG95JztcblxuICAgICAgICBjb25zdCB2YXJDb250ZXh0ID0gKHYpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGpzVHlwZSA9IHtcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICAnYWRkcmVzc1tdJzogJ3N0cmluZ1tdJyxcbiAgICAgICAgICAgICAgICB1aW50MjU2OiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICB1aW50MzI6ICdudW1iZXInLFxuICAgICAgICAgICAgICAgIHVpbnQxNjogJ251bWJlcicsXG4gICAgICAgICAgICAgICAgdWludDg6ICdudW1iZXInLFxuICAgICAgICAgICAgICAgICd1aW50MjU2W10nOiAnc3RyaW5nW10nLFxuICAgICAgICAgICAgICAgICd1aW50MzJbXSc6ICdudW1iZXJbXScsXG4gICAgICAgICAgICAgICAgJ3VpbnQxNltdJzogJ251bWJlcltdJyxcbiAgICAgICAgICAgICAgICAndWludDhbXSc6ICdudW1iZXJbXScsXG4gICAgICAgICAgICB9W3YudHlwZV0gfHwgdi50eXBlO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi52LFxuICAgICAgICAgICAgICAgIGpzVHlwZSxcbiAgICAgICAgICAgICAgICBpc1NhbWVKc1R5cGU6IGpzVHlwZSA9PT0gdi50eXBlLFxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGZ1bkNvbnRleHQgPSAoZikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5mLFxuICAgICAgICAgICAgICAgIGhhc0RhdGE6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGhhc0lucHV0c0FuZERhdGE6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGhhc0lucHV0czogZi5pbnB1dHMubGVuZ3RoID4gMCxcbiAgICAgICAgICAgICAgICBoYXNPdXRwdXRzOiBmLm91dHB1dHMubGVuZ3RoID4gMCxcbiAgICAgICAgICAgICAgICBpbnB1dHM6IGYuaW5wdXRzLm1hcCh2YXJDb250ZXh0KSxcbiAgICAgICAgICAgICAgICBvdXRwdXRzOiBmLm91dHB1dHMubWFwKHZhckNvbnRleHQpLFxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGNvbnN0cnVjdG9yID0gZnVuQ29udGV4dChhYmkuZnVuY3Rpb25zLmZpbmQoeCA9PiB4Lm5hbWUgPT09ICdjb25zdHJ1Y3RvcicpIHx8IHtcbiAgICAgICAgICAgIG5hbWU6ICdjb25zdHJ1Y3RvcicsXG4gICAgICAgICAgICBpbnB1dHM6IFtdLFxuICAgICAgICAgICAgb3V0cHV0czogW10sXG4gICAgICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0cnVjdG9yLmhhc0RhdGEgPSBhYmkuZGF0YS5sZW5ndGggPiAwO1xuICAgICAgICBjb25zdHJ1Y3Rvci5oYXNJbnB1dHNBbmREYXRhID0gY29uc3RydWN0b3IuaGFzSW5wdXRzICYmIGNvbnN0cnVjdG9yLmhhc0RhdGE7XG4gICAgICAgIGNvbnN0cnVjdG9yLmRhdGEgPSBhYmkuZGF0YS5tYXAodmFyQ29udGV4dCk7XG5cbiAgICAgICAgY29uc3QgZnVuY3Rpb25zID0gYWJpLmZ1bmN0aW9ucy5maWx0ZXIoeCA9PiB4Lm5hbWUgIT09ICdjb25zdHJ1Y3RvcicpLm1hcChmdW5Db250ZXh0KTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGltYWdlQmFzZTY0LFxuICAgICAgICAgICAgYWJpSnNvbixcbiAgICAgICAgICAgIGFiaSxcbiAgICAgICAgICAgIGNsYXNzTmFtZSxcbiAgICAgICAgICAgIGlzRGVwbG95LFxuICAgICAgICAgICAgY29uc3RydWN0b3IsXG4gICAgICAgICAgICBmdW5jdGlvbnMsXG4gICAgICAgICAgICBqc01vZHVsZU5vZGU6IG9wdGlvbnMuanNNb2R1bGUgPT09IEpTTW9kdWxlLm5vZGUgfHwgb3B0aW9ucy5qc01vZHVsZSA9PT0gSlNNb2R1bGUubm9kZU5vRGVmYXVsdCxcbiAgICAgICAgICAgIGpzTW9kdWxlTm9kZURlZmF1bHQ6IG9wdGlvbnMuanNNb2R1bGUgPT09IEpTTW9kdWxlLm5vZGUsXG4gICAgICAgICAgICBqc01vZHVsZUVzOiBvcHRpb25zLmpzTW9kdWxlID09PSBKU01vZHVsZS5lcyB8fCBvcHRpb25zLmpzTW9kdWxlID09PSBKU01vZHVsZS5lc05vRGVmYXVsdCxcbiAgICAgICAgICAgIGpzTW9kdWxlRXNEZWZhdWx0OiBvcHRpb25zLmpzTW9kdWxlID09PSBKU01vZHVsZS5lcyxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYXN5bmMgZ2VuZXJhdGVKYXZhU2NyaXB0KGZpbGVzOiBzdHJpbmdbXSwgb3B0aW9uczogQ2xpZW50Q29kZU9wdGlvbnMpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgYXdhaXQgQ2xpZW50Q29kZS5nZW5lcmF0ZUphdmFTY3JpcHRGaWxlKGZpbGVzW2ldLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBhc3luYyBnZW5lcmF0ZUphdmFTY3JpcHRGaWxlKGZpbGU6IHN0cmluZywgb3B0aW9uczogQ2xpZW50Q29kZU9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgeyBkaXIsIGJhc2UgfSA9IHBhcnNlRmlsZUFyZyhmaWxlLCAnLnNvbCcsIGZhbHNlKTtcbiAgICAgICAgY29uc3QganMgPSBhd2FpdCBhcHBseVRlbXBsYXRlKGpzQ29udHJhY3RUZW1wbGF0ZSwgQ2xpZW50Q29kZS5nZXRUZW1wbGF0ZUNvbnRleHQoZmlsZSwgb3B0aW9ucykpO1xuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKGRpcihgJHtiYXNlfUNvbnRyYWN0LmpzYCksIGpzLCB7IGVuY29kaW5nOiAndXRmOCcgfSk7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgYXN5bmMgZ2VuZXJhdGVSdXN0KGZpbGVzOiBzdHJpbmdbXSwgb3B0aW9uczogQ2xpZW50Q29kZU9wdGlvbnMpIHtcblxuICAgIH1cbn1cbiJdfQ==