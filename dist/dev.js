"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dev = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _compilers = require("./compilers/compilers");

var _networks = require("./networks/networks");

var _docker = require("./utils/docker");

var _texts = require("./utils/texts");

var _utils = require("./utils/utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var fs = require('fs');

var path = require('path');

var Dev =
/*#__PURE__*/
function () {
  function Dev() {
    var _this = this;

    (0, _classCallCheck2["default"])(this, Dev);
    (0, _defineProperty2["default"])(this, "name", void 0);
    (0, _defineProperty2["default"])(this, "version", void 0);
    (0, _defineProperty2["default"])(this, "docker", void 0);
    (0, _defineProperty2["default"])(this, "networks", void 0);
    (0, _defineProperty2["default"])(this, "compilers", void 0);
    (0, _defineProperty2["default"])(this, "agreementRequired", void 0);
    (0, _defineProperty2["default"])(this, "configFilePath", void 0);
    (0, _defineProperty2["default"])(this, "onStartupImages", function (images) {
      _this.agreementRequired = !images.find(Dev.isDevImage);
    });
    (0, _defineProperty2["default"])(this, "onBeforePull",
    /*#__PURE__*/
    function () {
      var _ref = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(_repoTag) {
        var license, answer;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (_this.agreementRequired) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                license = fs.readFileSync(path.join(__dirname, '..', 'LICENSE')).toString().split('\n').map(_utils.breakWords).join('\n');
                console.log(license);
                process.stdout.write(_texts.texts.agreementConfirmation);
                _context.next = 7;
                return (0, _utils.inputLine)();

              case 7:
                answer = _context.sent.trim().toLowerCase();

                if (answer !== 'yes') {
                  console.log(_texts.texts.agreementRejected);
                  process.exit(0);
                }

                console.log(_texts.texts.agreementAccepted);
                _this.agreementRequired = false;

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    this.name = 'tondev';
    this.version = _utils.version;
    this.agreementRequired = true;
    this.docker = new _docker.DevDocker();
    this.docker.onStartupImages = this.onStartupImages;
    this.docker.onBeforePull = this.onBeforePull;
    this.compilers = new _compilers.Compilers(_compilers.Compilers.defaultConfig);
    this.networks = [new _networks.Network(_networks.Network.defaultConfig)];
    this.configFilePath = (0, _utils.tonlabsHomePath)('config.json');
    fs.mkdirSync((0, _utils.tonlabsHomePath)(), {
      recursive: true
    });
    this.loadConfig();
  }

  (0, _createClass2["default"])(Dev, [{
    key: "loadConfig",
    value: function loadConfig() {
      try {
        var config = JSON.parse(fs.readFileSync(this.configFilePath, {
          encoding: 'utf8'
        }));
        this.compilers.setConfig(config.compilers);
        this.networks = config.networks.map(function (x) {
          return new _networks.Network(x);
        });
      } catch (_unused) {}
    }
  }, {
    key: "saveConfig",
    value: function saveConfig() {
      var config = {
        compilers: this.compilers.getConfig(),
        networks: this.networks.map(function (x) {
          return x.getConfig();
        })
      };
      fs.writeFileSync(this.configFilePath, JSON.stringify(config), {
        encoding: 'utf8'
      });
    }
  }, {
    key: "getDefs",
    value: function getDefs(source) {
      return source.compilers ? source.networks.concat(this.compilers) : (0, _toConsumableArray2["default"])(source.networks);
    }
  }, {
    key: "start",
    value: function () {
      var _start = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(source) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.docker.startupContainers(this.getDefs(source), _docker.ContainerStatus.running);

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function start(_x2) {
        return _start.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: "stop",
    value: function () {
      var _stop = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(source) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.docker.shutdownContainers(this.getDefs(source), _docker.ContainerStatus.created);

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function stop(_x3) {
        return _stop.apply(this, arguments);
      }

      return stop;
    }()
  }, {
    key: "restart",
    value: function () {
      var _restart = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(source) {
        var defs;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                defs = this.getDefs(source);
                _context4.next = 3;
                return this.docker.shutdownContainers(defs, _docker.ContainerStatus.created);

              case 3:
                _context4.next = 5;
                return this.docker.startupContainers(defs, _docker.ContainerStatus.running);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function restart(_x4) {
        return _restart.apply(this, arguments);
      }

      return restart;
    }()
  }, {
    key: "recreate",
    value: function () {
      var _recreate = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(source) {
        var defs;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                defs = this.getDefs(source);
                _context5.next = 3;
                return this.docker.shutdownContainers(defs, _docker.ContainerStatus.missing);

              case 3:
                _context5.next = 5;
                return this.docker.startupContainers(defs, _docker.ContainerStatus.created);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function recreate(_x5) {
        return _recreate.apply(this, arguments);
      }

      return recreate;
    }()
  }, {
    key: "clean",
    value: function () {
      var _clean = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6(source) {
        var defs;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                defs = this.getDefs(source);
                _context6.next = 3;
                return this.docker.shutdownContainers(defs, _docker.ContainerStatus.missing);

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function clean(_x6) {
        return _clean.apply(this, arguments);
      }

      return clean;
    }()
  }, {
    key: "useVersion",
    value: function () {
      var _useVersion = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee7(version, source) {
        var defs;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                defs = this.getDefs(source);
                _context7.next = 3;
                return this.docker.shutdownContainers(defs, _docker.ContainerStatus.missing);

              case 3:
                if (source.compilers) {
                  this.compilers.setConfig(_objectSpread({}, this.compilers.getConfig(), {
                    version: version
                  }));
                }

                source.networks.forEach(function (network) {
                  var config = network.getConfig();
                  config.version = version;
                  network.setConfig(config);
                });
                this.saveConfig();
                _context7.next = 8;
                return this.docker.startupContainers(defs, _docker.ContainerStatus.running);

              case 8:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function useVersion(_x7, _x8) {
        return _useVersion.apply(this, arguments);
      }

      return useVersion;
    }()
  }, {
    key: "ensureNetwork",
    value: function ensureNetwork(name) {
      var existing = this.networks.find(function (x) {
        return x.name.toLowerCase() === name.toLowerCase();
      });

      if (existing) {
        return existing;
      }

      var network = new _networks.Network(_objectSpread({}, _networks.Network.defaultConfig, {
        name: name
      }));
      this.networks.push(network);
      return network;
    }
  }, {
    key: "setNetworksOptions",
    value: function () {
      var _setNetworksOptions = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee8(names, options) {
        var _this2 = this;

        var networks, defs;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                networks = names.length === 0 ? this.networks : names.map(function (name) {
                  return _this2.ensureNetwork(name);
                });
                defs = (0, _toConsumableArray2["default"])(networks);
                _context8.next = 4;
                return this.docker.shutdownContainers(defs, _docker.ContainerStatus.missing);

              case 4:
                networks.forEach(function (network) {
                  return network.setOptions(options);
                });
                this.saveConfig();
                _context8.next = 8;
                return this.docker.startupContainers(defs, _docker.ContainerStatus.running);

              case 8:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function setNetworksOptions(_x9, _x10) {
        return _setNetworksOptions.apply(this, arguments);
      }

      return setNetworksOptions;
    }()
  }], [{
    key: "isDevContainer",
    value: function isDevContainer(info) {
      return _docker.DevDocker.containerBelongsToImage(info, _compilers.Compilers.imagePrefix) || _docker.DevDocker.containerBelongsToImage(info, _networks.Network.imagePrefix);
    }
  }, {
    key: "isDevImage",
    value: function isDevImage(info) {
      return _docker.DevDocker.imageHasRepoTag(info, _compilers.Compilers.imagePrefix) || _docker.DevDocker.imageHasRepoTag(info, _networks.Network.imagePrefix);
    }
  }]);
  return Dev;
}();

exports.Dev = Dev;
(0, _defineProperty2["default"])(Dev, "defaultConfig", Object.freeze({
  compilers: _compilers.Compilers.defaultConfig,
  networks: [_networks.Network.defaultConfig]
}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZXYuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwicGF0aCIsIkRldiIsImltYWdlcyIsImFncmVlbWVudFJlcXVpcmVkIiwiZmluZCIsImlzRGV2SW1hZ2UiLCJfcmVwb1RhZyIsImxpY2Vuc2UiLCJyZWFkRmlsZVN5bmMiLCJqb2luIiwiX19kaXJuYW1lIiwidG9TdHJpbmciLCJzcGxpdCIsIm1hcCIsImJyZWFrV29yZHMiLCJjb25zb2xlIiwibG9nIiwicHJvY2VzcyIsInN0ZG91dCIsIndyaXRlIiwidGV4dHMiLCJhZ3JlZW1lbnRDb25maXJtYXRpb24iLCJhbnN3ZXIiLCJ0cmltIiwidG9Mb3dlckNhc2UiLCJhZ3JlZW1lbnRSZWplY3RlZCIsImV4aXQiLCJhZ3JlZW1lbnRBY2NlcHRlZCIsIm5hbWUiLCJ2ZXJzaW9uIiwiZG9ja2VyIiwiRGV2RG9ja2VyIiwib25TdGFydHVwSW1hZ2VzIiwib25CZWZvcmVQdWxsIiwiY29tcGlsZXJzIiwiQ29tcGlsZXJzIiwiZGVmYXVsdENvbmZpZyIsIm5ldHdvcmtzIiwiTmV0d29yayIsImNvbmZpZ0ZpbGVQYXRoIiwibWtkaXJTeW5jIiwicmVjdXJzaXZlIiwibG9hZENvbmZpZyIsImNvbmZpZyIsIkpTT04iLCJwYXJzZSIsImVuY29kaW5nIiwic2V0Q29uZmlnIiwieCIsImdldENvbmZpZyIsIndyaXRlRmlsZVN5bmMiLCJzdHJpbmdpZnkiLCJzb3VyY2UiLCJjb25jYXQiLCJzdGFydHVwQ29udGFpbmVycyIsImdldERlZnMiLCJDb250YWluZXJTdGF0dXMiLCJydW5uaW5nIiwic2h1dGRvd25Db250YWluZXJzIiwiY3JlYXRlZCIsImRlZnMiLCJtaXNzaW5nIiwiZm9yRWFjaCIsIm5ldHdvcmsiLCJzYXZlQ29uZmlnIiwiZXhpc3RpbmciLCJwdXNoIiwibmFtZXMiLCJvcHRpb25zIiwibGVuZ3RoIiwiZW5zdXJlTmV0d29yayIsInNldE9wdGlvbnMiLCJpbmZvIiwiY29udGFpbmVyQmVsb25nc1RvSW1hZ2UiLCJpbWFnZVByZWZpeCIsImltYWdlSGFzUmVwb1RhZyIsIk9iamVjdCIsImZyZWV6ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBOztBQUdBOztBQUVBOztBQUNBOztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQUNBLElBQU1DLElBQUksR0FBR0QsT0FBTyxDQUFDLE1BQUQsQ0FBcEI7O0lBWU1FLEc7OztBQWFGLGlCQUFjO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDhEQWdDSSxVQUFDQyxNQUFELEVBQTBCO0FBQ3hDLE1BQUEsS0FBSSxDQUFDQyxpQkFBTCxHQUF5QixDQUFDRCxNQUFNLENBQUNFLElBQVAsQ0FBWUgsR0FBRyxDQUFDSSxVQUFoQixDQUExQjtBQUNILEtBbENhO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1DQW9DQyxpQkFBT0MsUUFBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxvQkFDTixLQUFJLENBQUNILGlCQURDO0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBSUxJLGdCQUFBQSxPQUpLLEdBSUtULEVBQUUsQ0FDYlUsWUFEVyxDQUNFUixJQUFJLENBQUNTLElBQUwsQ0FBVUMsU0FBVixFQUFxQixJQUFyQixFQUEyQixTQUEzQixDQURGLEVBRVhDLFFBRlcsR0FHWEMsS0FIVyxDQUdMLElBSEssRUFJWEMsR0FKVyxDQUlQQyxpQkFKTyxFQUlLTCxJQUpMLENBSVUsSUFKVixDQUpMO0FBU1hNLGdCQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWVQsT0FBWjtBQUNBVSxnQkFBQUEsT0FBTyxDQUFDQyxNQUFSLENBQWVDLEtBQWYsQ0FBcUJDLGFBQU1DLHFCQUEzQjtBQVZXO0FBQUEsdUJBV1csdUJBWFg7O0FBQUE7QUFXTEMsZ0JBQUFBLE1BWEssaUJBV3dCQyxJQVh4QixHQVcrQkMsV0FYL0I7O0FB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O3VCQUNYLEtBQUtQLE1BQUwsQ0FBWTRCLGtCQUFaLENBQStCRSxJQUEvQixFQUFxQ0osd0JBQWdCSyxPQUFyRCxDOzs7QUFDTnhCLGdCQUFBQSxRQUFRLENBQUN5QixPQUFULENBQWlCLFVBQUFDLE9BQU87QUFBQSx5QkFBSUEsT0FBTyxDQUFDUSxVQUFSLENBQW1CSCxPQUFuQixDQUFKO0FBQUEsaUJBQXhCO0FBQ0EscUJBQUtKLFVBQUw7O3VCQUNNLEtBQUtsQyxNQUFMLENBQVl3QixpQkFBWixDQUE4Qk0sSUFBOUIsRUFBb0NKLHdCQUFnQkMsT0FBcEQsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O21DQUdZZSxJLEVBQStCO0FBQ2pELGFBQU96QyxrQkFBVTBDLHVCQUFWLENBQWtDRCxJQUFsQyxFQUF3Q3JDLHFCQUFVdUMsV0FBbEQsS0FDQTNDLGtCQUFVMEMsdUJBQVYsQ0FBa0NELElBQWxDLEVBQXdDbEMsa0JBQVFvQyxXQUFoRCxDQURQO0FBRUg7OzsrQkFFaUJGLEksRUFBMkI7QUFDekMsYUFBT3pDLGtCQUFVNEMsZUFBVixDQUEwQkgsSUFBMUIsRUFBZ0NyQyxxQkFBVXVDLFdBQTFDLEtBQ0EzQyxrQkFBVTRDLGVBQVYsQ0FBMEJILElBQTFCLEVBQWdDbEMsa0JBQVFvQyxXQUF4QyxDQURQO0FBRUg7Ozs7OztpQ0FySkN6RSxHLG1CQUNnQzJFLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjO0FBQzVDM0MsRUFBQUEsU0FBUyxFQUFFQyxxQkFBVUMsYUFEdUI7QUFFNUNDLEVBQUFBLFFBQVEsRUFBRSxDQUFDQyxrQkFBUUYsYUFBVDtBQUZrQyxDQUFkLEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG4gKiB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbiAqIExpY2Vuc2UgYXQ6IGh0dHBzOi8vd3d3LnRvbi5kZXYvbGljZW5zZXNcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIFRPTiBERVYgc29mdHdhcmUgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG4vLyBAZmxvd1xuXG5pbXBvcnQgeyBDb21waWxlcnMgfSBmcm9tIFwiLi9jb21waWxlcnMvY29tcGlsZXJzXCI7XG5pbXBvcnQgdHlwZSB7IENvbXBpbGVyc0NvbmZpZyB9IGZyb20gXCIuL2NvbXBpbGVycy9jb21waWxlcnNcIjtcbmltcG9ydCB0eXBlIHsgTmV0d29ya0NvbmZpZywgU2V0TmV0d29ya09wdGlvbnMgfSBmcm9tIFwiLi9uZXR3b3Jrcy9uZXR3b3Jrc1wiO1xuaW1wb3J0IHsgTmV0d29yayB9IGZyb20gXCIuL25ldHdvcmtzL25ldHdvcmtzXCI7XG5pbXBvcnQgdHlwZSB7IENvbnRhaW5lckRlZiwgRENvbnRhaW5lckluZm8sIERJbWFnZUluZm8gfSBmcm9tIFwiLi91dGlscy9kb2NrZXJcIjtcbmltcG9ydCB7IENvbnRhaW5lclN0YXR1cywgRGV2RG9ja2VyIH0gZnJvbSBcIi4vdXRpbHMvZG9ja2VyXCI7XG5pbXBvcnQgeyB0ZXh0cyB9IGZyb20gXCIuL3V0aWxzL3RleHRzXCI7XG5pbXBvcnQgeyBicmVha1dvcmRzLCBpbnB1dExpbmUsIHRvbmxhYnNIb21lUGF0aCwgdmVyc2lvbiB9IGZyb20gXCIuL3V0aWxzL3V0aWxzXCI7XG5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5cbnR5cGUgRGV2Q29uZmlnID0ge1xuICAgIGNvbXBpbGVyczogQ29tcGlsZXJzQ29uZmlnLFxuICAgIG5ldHdvcmtzOiBOZXR3b3JrQ29uZmlnW10sXG59O1xuXG5leHBvcnQgdHlwZSBDb21waWxlcnNXaXRoTmV0d29ya3MgPSB7XG4gICAgY29tcGlsZXJzOiBib29sZWFuLFxuICAgIG5ldHdvcmtzOiBOZXR3b3JrW10sXG59XG5cbmNsYXNzIERldiB7XG4gICAgc3RhdGljIGRlZmF1bHRDb25maWc6IERldkNvbmZpZyA9IE9iamVjdC5mcmVlemUoe1xuICAgICAgICBjb21waWxlcnM6IENvbXBpbGVycy5kZWZhdWx0Q29uZmlnLFxuICAgICAgICBuZXR3b3JrczogW05ldHdvcmsuZGVmYXVsdENvbmZpZ10sXG4gICAgfSk7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHZlcnNpb246IHN0cmluZztcbiAgICBkb2NrZXI6IERldkRvY2tlcjtcbiAgICBuZXR3b3JrczogTmV0d29ya1tdO1xuICAgIGNvbXBpbGVyczogQ29tcGlsZXJzO1xuICAgIGFncmVlbWVudFJlcXVpcmVkOiBib29sZWFuO1xuICAgIGNvbmZpZ0ZpbGVQYXRoOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gJ3RvbmRldic7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHZlcnNpb247XG4gICAgICAgIHRoaXMuYWdyZWVtZW50UmVxdWlyZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmRvY2tlciA9IG5ldyBEZXZEb2NrZXIoKTtcbiAgICAgICAgdGhpcy5kb2NrZXIub25TdGFydHVwSW1hZ2VzID0gdGhpcy5vblN0YXJ0dXBJbWFnZXM7XG4gICAgICAgIHRoaXMuZG9ja2VyLm9uQmVmb3JlUHVsbCA9IHRoaXMub25CZWZvcmVQdWxsO1xuICAgICAgICB0aGlzLmNvbXBpbGVycyA9IG5ldyBDb21waWxlcnMoQ29tcGlsZXJzLmRlZmF1bHRDb25maWcpO1xuICAgICAgICB0aGlzLm5ldHdvcmtzID0gW25ldyBOZXR3b3JrKE5ldHdvcmsuZGVmYXVsdENvbmZpZyldO1xuICAgICAgICB0aGlzLmNvbmZpZ0ZpbGVQYXRoID0gdG9ubGFic0hvbWVQYXRoKCdjb25maWcuanNvbicpO1xuICAgICAgICBmcy5ta2RpclN5bmModG9ubGFic0hvbWVQYXRoKCksICh7IHJlY3Vyc2l2ZTogdHJ1ZSB9OiBhbnkpKTtcbiAgICAgICAgdGhpcy5sb2FkQ29uZmlnKCk7XG4gICAgfVxuXG4gICAgbG9hZENvbmZpZygpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZzogRGV2Q29uZmlnID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmModGhpcy5jb25maWdGaWxlUGF0aCwgeyBlbmNvZGluZzogJ3V0ZjgnIH0pKTtcbiAgICAgICAgICAgIHRoaXMuY29tcGlsZXJzLnNldENvbmZpZyhjb25maWcuY29tcGlsZXJzKTtcbiAgICAgICAgICAgIHRoaXMubmV0d29ya3MgPSBjb25maWcubmV0d29ya3MubWFwKHggPT4gbmV3IE5ldHdvcmsoeCkpO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgc2F2ZUNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgY29uZmlnOiBEZXZDb25maWcgPSB7XG4gICAgICAgICAgICBjb21waWxlcnM6IHRoaXMuY29tcGlsZXJzLmdldENvbmZpZygpLFxuICAgICAgICAgICAgbmV0d29ya3M6IHRoaXMubmV0d29ya3MubWFwKHggPT4geC5nZXRDb25maWcoKSksXG4gICAgICAgIH07XG4gICAgICAgIGZzLndyaXRlRmlsZVN5bmModGhpcy5jb25maWdGaWxlUGF0aCwgSlNPTi5zdHJpbmdpZnkoY29uZmlnKSwgeyBlbmNvZGluZzogJ3V0ZjgnIH0pO1xuICAgIH1cblxuICAgIG9uU3RhcnR1cEltYWdlcyA9IChpbWFnZXM6IERJbWFnZUluZm9bXSkgPT4ge1xuICAgICAgICB0aGlzLmFncmVlbWVudFJlcXVpcmVkID0gIWltYWdlcy5maW5kKERldi5pc0RldkltYWdlKTtcbiAgICB9O1xuXG4gICAgb25CZWZvcmVQdWxsID0gYXN5bmMgKF9yZXBvVGFnOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmFncmVlbWVudFJlcXVpcmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbGljZW5zZSA9IGZzXG4gICAgICAgICAgICAucmVhZEZpbGVTeW5jKHBhdGguam9pbihfX2Rpcm5hbWUsICcuLicsICdMSUNFTlNFJykpXG4gICAgICAgICAgICAudG9TdHJpbmcoKVxuICAgICAgICAgICAgLnNwbGl0KCdcXG4nKVxuICAgICAgICAgICAgLm1hcChicmVha1dvcmRzKS5qb2luKCdcXG4nKTtcbiAgICAgICAgY29uc29sZS5sb2cobGljZW5zZSk7XG4gICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKHRleHRzLmFncmVlbWVudENvbmZpcm1hdGlvbik7XG4gICAgICAgIGNvbnN0IGFuc3dlciA9IChhd2FpdCBpbnB1dExpbmUoKSkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmIChhbnN3ZXIgIT09ICd5ZXMnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0ZXh0cy5hZ3JlZW1lbnRSZWplY3RlZCk7XG4gICAgICAgICAgICBwcm9jZXNzLmV4aXQoMCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2codGV4dHMuYWdyZWVtZW50QWNjZXB0ZWQpO1xuICAgICAgICB0aGlzLmFncmVlbWVudFJlcXVpcmVkID0gZmFsc2U7XG4gICAgfTtcblxuICAgIGdldERlZnMoc291cmNlOiBDb21waWxlcnNXaXRoTmV0d29ya3MpOiBDb250YWluZXJEZWZbXSB7XG4gICAgICAgIHJldHVybiBzb3VyY2UuY29tcGlsZXJzID8gc291cmNlLm5ldHdvcmtzLmNvbmNhdCh0aGlzLmNvbXBpbGVycykgOiBbLi4uc291cmNlLm5ldHdvcmtzXTtcbiAgICB9XG5cbiAgICBhc3luYyBzdGFydChzb3VyY2U6IENvbXBpbGVyc1dpdGhOZXR3b3Jrcykge1xuICAgICAgICBhd2FpdCB0aGlzLmRvY2tlci5zdGFydHVwQ29udGFpbmVycyh0aGlzLmdldERlZnMoc291cmNlKSwgQ29udGFpbmVyU3RhdHVzLnJ1bm5pbmcpO1xuICAgIH1cblxuICAgIGFzeW5jIHN0b3Aoc291cmNlOiBDb21waWxlcnNXaXRoTmV0d29ya3MpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5kb2NrZXIuc2h1dGRvd25Db250YWluZXJzKHRoaXMuZ2V0RGVmcyhzb3VyY2UpLCBDb250YWluZXJTdGF0dXMuY3JlYXRlZCk7XG4gICAgfVxuXG4gICAgYXN5bmMgcmVzdGFydChzb3VyY2U6IENvbXBpbGVyc1dpdGhOZXR3b3Jrcykge1xuICAgICAgICBjb25zdCBkZWZzID0gdGhpcy5nZXREZWZzKHNvdXJjZSk7XG4gICAgICAgIGF3YWl0IHRoaXMuZG9ja2VyLnNodXRkb3duQ29udGFpbmVycyhkZWZzLCBDb250YWluZXJTdGF0dXMuY3JlYXRlZCk7XG4gICAgICAgIGF3YWl0IHRoaXMuZG9ja2VyLnN0YXJ0dXBDb250YWluZXJzKGRlZnMsIENvbnRhaW5lclN0YXR1cy5ydW5uaW5nKTtcbiAgICB9XG5cbiAgICBhc3luYyByZWNyZWF0ZShzb3VyY2U6IENvbXBpbGVyc1dpdGhOZXR3b3Jrcykge1xuICAgICAgICBjb25zdCBkZWZzID0gdGhpcy5nZXREZWZzKHNvdXJjZSk7XG4gICAgICAgIGF3YWl0IHRoaXMuZG9ja2VyLnNodXRkb3duQ29udGFpbmVycyhkZWZzLCBDb250YWluZXJTdGF0dXMubWlzc2luZyk7XG4gICAgICAgIGF3YWl0IHRoaXMuZG9ja2VyLnN0YXJ0dXBDb250YWluZXJzKGRlZnMsIENvbnRhaW5lclN0YXR1cy5jcmVhdGVkKTtcbiAgICB9XG5cblxuICAgIGFzeW5jIGNsZWFuKHNvdXJjZTogQ29tcGlsZXJzV2l0aE5ldHdvcmtzKSB7XG4gICAgICAgIGNvbnN0IGRlZnMgPSB0aGlzLmdldERlZnMoc291cmNlKTtcbiAgICAgICAgYXdhaXQgdGhpcy5kb2NrZXIuc2h1dGRvd25Db250YWluZXJzKGRlZnMsIENvbnRhaW5lclN0YXR1cy5taXNzaW5nKTtcbiAgICB9XG5cbiAgICBhc3luYyB1c2VWZXJzaW9uKHZlcnNpb246IHN0cmluZywgc291cmNlOiBDb21waWxlcnNXaXRoTmV0d29ya3MpIHtcbiAgICAgICAgY29uc3QgZGVmcyA9IHRoaXMuZ2V0RGVmcyhzb3VyY2UpO1xuICAgICAgICBhd2FpdCB0aGlzLmRvY2tlci5zaHV0ZG93bkNvbnRhaW5lcnMoZGVmcywgQ29udGFpbmVyU3RhdHVzLm1pc3NpbmcpO1xuICAgICAgICBpZiAoc291cmNlLmNvbXBpbGVycykge1xuICAgICAgICAgICAgdGhpcy5jb21waWxlcnMuc2V0Q29uZmlnKHtcbiAgICAgICAgICAgICAgICAuLi50aGlzLmNvbXBpbGVycy5nZXRDb25maWcoKSxcbiAgICAgICAgICAgICAgICB2ZXJzaW9uXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBzb3VyY2UubmV0d29ya3MuZm9yRWFjaCgobmV0d29yaykgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29uZmlnID0gbmV0d29yay5nZXRDb25maWcoKTtcbiAgICAgICAgICAgIGNvbmZpZy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICAgICAgICAgIG5ldHdvcmsuc2V0Q29uZmlnKGNvbmZpZyk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNhdmVDb25maWcoKTtcbiAgICAgICAgYXdhaXQgdGhpcy5kb2NrZXIuc3RhcnR1cENvbnRhaW5lcnMoZGVmcywgQ29udGFpbmVyU3RhdHVzLnJ1bm5pbmcpO1xuICAgIH1cblxuICAgIGVuc3VyZU5ldHdvcmsobmFtZTogc3RyaW5nKTogTmV0d29yayB7XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nID0gdGhpcy5uZXR3b3Jrcy5maW5kKHggPT4geC5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgIGlmIChleGlzdGluZykge1xuICAgICAgICAgICAgcmV0dXJuIGV4aXN0aW5nO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5ldHdvcmsgPSBuZXcgTmV0d29yayh7XG4gICAgICAgICAgICAuLi5OZXR3b3JrLmRlZmF1bHRDb25maWcsXG4gICAgICAgICAgICBuYW1lXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm5ldHdvcmtzLnB1c2gobmV0d29yayk7XG4gICAgICAgIHJldHVybiBuZXR3b3JrO1xuICAgIH1cblxuICAgIGFzeW5jIHNldE5ldHdvcmtzT3B0aW9ucyhuYW1lczogc3RyaW5nW10sIG9wdGlvbnM6IFNldE5ldHdvcmtPcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IG5ldHdvcmtzOiBOZXR3b3JrW10gPSBuYW1lcy5sZW5ndGggPT09IDBcbiAgICAgICAgICAgID8gdGhpcy5uZXR3b3Jrc1xuICAgICAgICAgICAgOiBuYW1lcy5tYXAobmFtZSA9PiB0aGlzLmVuc3VyZU5ldHdvcmsobmFtZSkpO1xuICAgICAgICBjb25zdCBkZWZzID0gWy4uLm5ldHdvcmtzXTtcbiAgICAgICAgYXdhaXQgdGhpcy5kb2NrZXIuc2h1dGRvd25Db250YWluZXJzKGRlZnMsIENvbnRhaW5lclN0YXR1cy5taXNzaW5nKTtcbiAgICAgICAgbmV0d29ya3MuZm9yRWFjaChuZXR3b3JrID0+IG5ldHdvcmsuc2V0T3B0aW9ucyhvcHRpb25zKSk7XG4gICAgICAgIHRoaXMuc2F2ZUNvbmZpZygpO1xuICAgICAgICBhd2FpdCB0aGlzLmRvY2tlci5zdGFydHVwQ29udGFpbmVycyhkZWZzLCBDb250YWluZXJTdGF0dXMucnVubmluZyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzRGV2Q29udGFpbmVyKGluZm86IERDb250YWluZXJJbmZvKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBEZXZEb2NrZXIuY29udGFpbmVyQmVsb25nc1RvSW1hZ2UoaW5mbywgQ29tcGlsZXJzLmltYWdlUHJlZml4KVxuICAgICAgICAgICAgfHwgRGV2RG9ja2VyLmNvbnRhaW5lckJlbG9uZ3NUb0ltYWdlKGluZm8sIE5ldHdvcmsuaW1hZ2VQcmVmaXgpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc0RldkltYWdlKGluZm86IERJbWFnZUluZm8pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIERldkRvY2tlci5pbWFnZUhhc1JlcG9UYWcoaW5mbywgQ29tcGlsZXJzLmltYWdlUHJlZml4KVxuICAgICAgICAgICAgfHwgRGV2RG9ja2VyLmltYWdlSGFzUmVwb1RhZyhpbmZvLCBOZXR3b3JrLmltYWdlUHJlZml4KTtcbiAgICB9XG59XG5cbmV4cG9ydCB7IERldiB9O1xuIl19