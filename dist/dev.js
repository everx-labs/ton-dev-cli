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
        var _config = JSON.parse(fs.readFileSync(this.configFilePath, {
          encoding: 'utf8'
        }));

        this.compilers.setConfig(_config.compilers);
        this.networks = _config.networks.map(function (x) {
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
      fs.mkdirSync((0, _utils.tonlabsHomePath)(''), {
        recursive: true
      });
      fs.writeFileSync(this.configFilePath, JSON.stringify(config), {
        encoding: 'utf8'
      });
    }
  }, {
    key: "networksFromNames",
    value: function networksFromNames(names) {
      var _this2 = this;

      return names.map(function (name) {
        var network = _this2.networks.find(function (x) {
          return x.name.toLowerCase() === name.toLowerCase();
        });

        if (!network) {
          throw new Error("Network not found: ".concat(name));
        }

        return network;
      });
    }
  }, {
    key: "networksOrAll",
    value: function networksOrAll(names) {
      return names.length > 0 ? this.networksFromNames(names) : this.networks;
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
    key: "checkUniqueName",
    value: function checkUniqueName(name) {
      if (this.networks.find(function (x) {
        return x.name.toLowerCase() === name.toLowerCase();
      })) {
        throw new Error("Network with name [".concat(name, "] already exists"));
      }
    }
  }, {
    key: "addNetworks",
    value: function addNetworks(names) {
      var _this3 = this;

      names.forEach(function (name) {
        _this3.checkUniqueName(name);

        var network = new _networks.Network(_objectSpread({}, _networks.Network.defaultConfig, {
          name: name
        }));

        _this3.networks.push(network);
      });
      this.saveConfig();
    }
  }, {
    key: "removeNetworks",
    value: function () {
      var _removeNetworks = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee8(networks) {
        var _this4 = this;

        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.docker.shutdownContainers(networks, _docker.ContainerStatus.missing);

              case 2:
                networks.forEach(function (network) {
                  var index = _this4.networks.findIndex(function (x) {
                    return x === network;
                  });

                  if (index >= 0) {
                    _this4.networks.splice(index, 1);
                  }
                });
                this.saveConfig();

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function removeNetworks(_x9) {
        return _removeNetworks.apply(this, arguments);
      }

      return removeNetworks;
    }()
  }, {
    key: "updateNetworkConfigs",
    value: function () {
      var _updateNetworkConfigs = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee9(networks, update) {
        var _this5 = this;

        var defs;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                defs = (0, _toConsumableArray2["default"])(networks);
                _context9.next = 3;
                return this.docker.shutdownContainers(defs, _docker.ContainerStatus.missing);

              case 3:
                networks.forEach(function (network) {
                  var config = network.getConfig();
                  var saveName = config.name;
                  update(config);

                  if (config.name.toLowerCase() !== saveName.toLowerCase()) {
                    _this5.checkUniqueName(config.name);
                  }

                  network.setConfig(config);
                });
                this.saveConfig();
                _context9.next = 7;
                return this.docker.startupContainers(defs, _docker.ContainerStatus.running);

              case 7:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function updateNetworkConfigs(_x10, _x11) {
        return _updateNetworkConfigs.apply(this, arguments);
      }

      return updateNetworkConfigs;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZXYuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwicGF0aCIsIkRldiIsImltYWdlcyIsImFncmVlbWVudFJlcXVpcmVkIiwiZmluZCIsImlzRGV2SW1hZ2UiLCJfcmVwb1RhZyIsImxpY2Vuc2UiLCJyZWFkRmlsZVN5bmMiLCJqb2luIiwiX19kaXJuYW1lIiwidG9TdHJpbmciLCJzcGxpdCIsIm1hcCIsImJyZWFrV29yZHMiLCJjb25zb2xlIiwibG9nIiwicHJvY2VzcyIsInN0ZG91dCIsIndyaXRlIiwidGV4dHMiLCJhZ3JlZW1lbnRDb25maXJtYXRpb24iLCJhbnN3ZXIiLCJ0cmltIiwidG9Mb3dlckNhc2UiLCJhZ3JlZW1lbnRSZWplY3RlZCIsImV4aXQiLCJhZ3JlZW1lbnRBY2NlcHRlZCIsIm5hbWUiLCJ2ZXJzaW9uIiwiZG9ja2VyIiwiRGV2RG9ja2VyIiwib25TdGFydHVwSW1hZ2VzIiwib25CZWZvcmVQdWxsIiwiY29tcGlsZXJzIiwiQ29tcGlsZXJzIiwiZGVmYXVsdENvbmZpZyIsIm5ldHdvcmtzIiwiTmV0d29yayIsImNvbmZpZ0ZpbGVQYXRoIiwibWtkaXJTeW5jIiwicmVjdXJzaXZlIiwibG9hZENvbmZpZyIsImNvbmZpZyIsIkpTT04iLCJwYXJzZSIsImVuY29kaW5nIiwic2V0Q29uZmlnIiwieCIsImdldENvbmZpZyIsIndyaXRlRmlsZVN5bmMiLCJzdHJpbmdpZnkiLCJuYW1lcyIsIm5ldHdvcmsiLCJFcnJvciIsImxlbmd0aCIsIm5ldHdvcmtzRnJvbU5hbWVzIiwic291cmNlIiwiY29uY2F0Iiwic3RhcnR1cENvbnRhaW5lcnMiLCJnZXREZWZzIiwiQ29udGFpbmVyU3RhdHVzIiwicnVubmluZyIsInNodXRkb3duQ29udGFpbmVycyIsImNyZWF0ZWQiLCJkZWZzIiwibWlzc2luZyIsImZvckVhY2giLCJzYXZlQ29uZmlnIiwiZXhpc3RpbmciLCJwdXNoIiwiY2hlY2tVbmlxdWVOYW1lIiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJzcGxpY2UiLCJ1cGRhdGUiLCJzYXZlTmFtZSIsImluZm8iLCJjb250YWluZXJCZWxvbmdzVG9JbWFnZSIsImltYWdlUHJlZml4IiwiaW1hZ2VIYXNSZXBvVGFnIiwiT2JqZWN0IiwiZnJlZXplIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkE7O0FBR0E7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLEVBQUUsR0FBR0MsT0FBTyxDQUFDLElBQUQsQ0FBbEI7O0FBQ0EsSUFBTUMsSUFBSSxHQUFHRCxPQUFPLENBQUMsTUFBRCxDQUFwQjs7SUFZTUUsRzs7O0FBYUYsaUJBQWM7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsOERBaUNJLFVBQUNDLE1BQUQsRUFBMEI7QUFDeEMsTUFBQSxLQUFJLENBQUNDLGlCQUFMLEdBQXlCLENBQUNELE1BQU0sQ0FBQ0UsSUFBUCxDQUFZSCxHQUFHLENBQUNJLFVBQWhCLENBQTFCO0FBQ0gsS0FuQ2E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUNBcUNDLGlCQUFPQyxRQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG9CQUNOLEtBQUksQ0FBQ0gsaUJBREM7QUFBQTtBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUFJTEksZ0JBQUFBLE9BSkssR0FJS1QsRUFBRSxDQUNiVSxZQURXLENBQ0VSLElBQUksQ0FBQ1MsSUFBTCxDQUFVQyxTQUFWLEVBQXFCLElBQXJCLEVBQTJCLFNBQTNCLENBREYsRUFFWEMsUUFGVyxHQUdYQyxLQUhXLENBR0wsSUFISyxFQUlYQyxHQUpXLENBSVBDLGlCQUpPLEVBSUtMLElBSkwsQ0FJVSxJQUpWLENBSkw7QUFTWE0sZ0JBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZVCxPQUFaO0FBQ0FVLGdCQUFBQSxPQUFPLENBQUNDLE1BQVIsQ0FBZUMsS0FBZixDQUFxQkMsYUFBTUMscUJBQTNCO0FBVlc7QUFBQSx1QkFXVyx1QkFY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VUFBTDs7dUJBQ00sS0FBS3RDLE1BQUwsQ0FBWTZCLGlCQUFaLENBQThCTSxJQUE5QixFQUFvQ0osd0JBQWdCQyxPQUFwRCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7bUNBR1llLEksRUFBK0I7QUFDakQsYUFBTzlDLGtCQUFVK0MsdUJBQVYsQ0FBa0NELElBQWxDLEVBQXdDMUMscUJBQVU0QyxXQUFsRCxLQUNBaEQsa0JBQVUrQyx1QkFBVixDQUFrQ0QsSUFBbEMsRUFBd0N2QyxrQkFBUXlDLFdBQWhELENBRFA7QUFFSDs7OytCQUVpQkYsSSxFQUEyQjtBQUN6QyxhQUFPOUMsa0JBQVVpRCxlQUFWLENBQTBCSCxJQUExQixFQUFnQzFDLHFCQUFVNEMsV0FBMUMsS0FDQWhELGtCQUFVaUQsZUFBVixDQUEwQkgsSUFBMUIsRUFBZ0N2QyxrQkFBUXlDLFdBQXhDLENBRFA7QUFFSDs7Ozs7O2lDQXhNQzlFLEcsbUJBQ2dDZ0YsTUFBTSxDQUFDQyxNQUFQLENBQWM7QUFDNUNoRCxFQUFBQSxTQUFTLEVBQUVDLHFCQUFVQyxhQUR1QjtBQUU1Q0MsRUFBQUEsUUFBUSxFQUFFLENBQUNDLGtCQUFRRixhQUFUO0FBRmtDLENBQWQsQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOC0yMDE5IFRPTiBERVYgU09MVVRJT05TIExURC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgU09GVFdBUkUgRVZBTFVBVElPTiBMaWNlbnNlICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbiAqIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxuICogTGljZW5zZSBhdDogaHR0cHM6Ly93d3cudG9uLmRldi9saWNlbnNlc1xuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgVE9OIERFViBzb2Z0d2FyZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbi8vIEBmbG93XG5cbmltcG9ydCB7IENvbXBpbGVycyB9IGZyb20gXCIuL2NvbXBpbGVycy9jb21waWxlcnNcIjtcbmltcG9ydCB0eXBlIHsgQ29tcGlsZXJzQ29uZmlnIH0gZnJvbSBcIi4vY29tcGlsZXJzL2NvbXBpbGVyc1wiO1xuaW1wb3J0IHR5cGUgeyBOZXR3b3JrQ29uZmlnIH0gZnJvbSBcIi4vbmV0d29ya3MvbmV0d29ya3NcIjtcbmltcG9ydCB7IE5ldHdvcmsgfSBmcm9tIFwiLi9uZXR3b3Jrcy9uZXR3b3Jrc1wiO1xuaW1wb3J0IHR5cGUgeyBDb250YWluZXJEZWYsIERDb250YWluZXJJbmZvLCBESW1hZ2VJbmZvIH0gZnJvbSBcIi4vdXRpbHMvZG9ja2VyXCI7XG5pbXBvcnQgeyBDb250YWluZXJTdGF0dXMsIERldkRvY2tlciB9IGZyb20gXCIuL3V0aWxzL2RvY2tlclwiO1xuaW1wb3J0IHsgdGV4dHMgfSBmcm9tIFwiLi91dGlscy90ZXh0c1wiO1xuaW1wb3J0IHsgYnJlYWtXb3JkcywgaW5wdXRMaW5lLCB0b25sYWJzSG9tZVBhdGgsIHZlcnNpb24gfSBmcm9tIFwiLi91dGlscy91dGlsc1wiO1xuXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuXG50eXBlIERldkNvbmZpZyA9IHtcbiAgICBjb21waWxlcnM6IENvbXBpbGVyc0NvbmZpZyxcbiAgICBuZXR3b3JrczogTmV0d29ya0NvbmZpZ1tdLFxufTtcblxuZXhwb3J0IHR5cGUgQ29tcGlsZXJzV2l0aE5ldHdvcmtzID0ge1xuICAgIGNvbXBpbGVyczogYm9vbGVhbixcbiAgICBuZXR3b3JrczogTmV0d29ya1tdLFxufVxuXG5jbGFzcyBEZXYge1xuICAgIHN0YXRpYyBkZWZhdWx0Q29uZmlnOiBEZXZDb25maWcgPSBPYmplY3QuZnJlZXplKHtcbiAgICAgICAgY29tcGlsZXJzOiBDb21waWxlcnMuZGVmYXVsdENvbmZpZyxcbiAgICAgICAgbmV0d29ya3M6IFtOZXR3b3JrLmRlZmF1bHRDb25maWddLFxuICAgIH0pO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICB2ZXJzaW9uOiBzdHJpbmc7XG4gICAgZG9ja2VyOiBEZXZEb2NrZXI7XG4gICAgbmV0d29ya3M6IE5ldHdvcmtbXTtcbiAgICBjb21waWxlcnM6IENvbXBpbGVycztcbiAgICBhZ3JlZW1lbnRSZXF1aXJlZDogYm9vbGVhbjtcbiAgICBjb25maWdGaWxlUGF0aDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubmFtZSA9ICd0b25kZXYnO1xuICAgICAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgICAgICB0aGlzLmFncmVlbWVudFJlcXVpcmVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5kb2NrZXIgPSBuZXcgRGV2RG9ja2VyKCk7XG4gICAgICAgIHRoaXMuZG9ja2VyLm9uU3RhcnR1cEltYWdlcyA9IHRoaXMub25TdGFydHVwSW1hZ2VzO1xuICAgICAgICB0aGlzLmRvY2tlci5vbkJlZm9yZVB1bGwgPSB0aGlzLm9uQmVmb3JlUHVsbDtcbiAgICAgICAgdGhpcy5jb21waWxlcnMgPSBuZXcgQ29tcGlsZXJzKENvbXBpbGVycy5kZWZhdWx0Q29uZmlnKTtcbiAgICAgICAgdGhpcy5uZXR3b3JrcyA9IFtuZXcgTmV0d29yayhOZXR3b3JrLmRlZmF1bHRDb25maWcpXTtcbiAgICAgICAgdGhpcy5jb25maWdGaWxlUGF0aCA9IHRvbmxhYnNIb21lUGF0aCgnY29uZmlnLmpzb24nKTtcbiAgICAgICAgZnMubWtkaXJTeW5jKHRvbmxhYnNIb21lUGF0aCgpLCAoeyByZWN1cnNpdmU6IHRydWUgfTogYW55KSk7XG4gICAgICAgIHRoaXMubG9hZENvbmZpZygpO1xuICAgIH1cblxuICAgIGxvYWRDb25maWcoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBjb25maWc6IERldkNvbmZpZyA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHRoaXMuY29uZmlnRmlsZVBhdGgsIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KSk7XG4gICAgICAgICAgICB0aGlzLmNvbXBpbGVycy5zZXRDb25maWcoY29uZmlnLmNvbXBpbGVycyk7XG4gICAgICAgICAgICB0aGlzLm5ldHdvcmtzID0gY29uZmlnLm5ldHdvcmtzLm1hcCh4ID0+IG5ldyBOZXR3b3JrKHgpKTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHNhdmVDb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGNvbmZpZzogRGV2Q29uZmlnID0ge1xuICAgICAgICAgICAgY29tcGlsZXJzOiB0aGlzLmNvbXBpbGVycy5nZXRDb25maWcoKSxcbiAgICAgICAgICAgIG5ldHdvcmtzOiB0aGlzLm5ldHdvcmtzLm1hcCh4ID0+IHguZ2V0Q29uZmlnKCkpLFxuICAgICAgICB9O1xuICAgICAgICBmcy5ta2RpclN5bmModG9ubGFic0hvbWVQYXRoKCcnKSwgKHsgcmVjdXJzaXZlOiB0cnVlIH06IGFueSkpO1xuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKHRoaXMuY29uZmlnRmlsZVBhdGgsIEpTT04uc3RyaW5naWZ5KGNvbmZpZyksIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KTtcbiAgICB9XG5cbiAgICBvblN0YXJ0dXBJbWFnZXMgPSAoaW1hZ2VzOiBESW1hZ2VJbmZvW10pID0+IHtcbiAgICAgICAgdGhpcy5hZ3JlZW1lbnRSZXF1aXJlZCA9ICFpbWFnZXMuZmluZChEZXYuaXNEZXZJbWFnZSk7XG4gICAgfTtcblxuICAgIG9uQmVmb3JlUHVsbCA9IGFzeW5jIChfcmVwb1RhZzogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICAgIGlmICghdGhpcy5hZ3JlZW1lbnRSZXF1aXJlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxpY2Vuc2UgPSBmc1xuICAgICAgICAgICAgLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4nLCAnTElDRU5TRScpKVxuICAgICAgICAgICAgLnRvU3RyaW5nKClcbiAgICAgICAgICAgIC5zcGxpdCgnXFxuJylcbiAgICAgICAgICAgIC5tYXAoYnJlYWtXb3Jkcykuam9pbignXFxuJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGxpY2Vuc2UpO1xuICAgICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZSh0ZXh0cy5hZ3JlZW1lbnRDb25maXJtYXRpb24pO1xuICAgICAgICBjb25zdCBhbnN3ZXIgPSAoYXdhaXQgaW5wdXRMaW5lKCkpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAoYW5zd2VyICE9PSAneWVzJykge1xuICAgICAgICAgICAgY29uc29sZS5sb2codGV4dHMuYWdyZWVtZW50UmVqZWN0ZWQpO1xuICAgICAgICAgICAgcHJvY2Vzcy5leGl0KDApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHRleHRzLmFncmVlbWVudEFjY2VwdGVkKTtcbiAgICAgICAgdGhpcy5hZ3JlZW1lbnRSZXF1aXJlZCA9IGZhbHNlO1xuICAgIH07XG5cbiAgICBuZXR3b3Jrc0Zyb21OYW1lcyhuYW1lczogc3RyaW5nW10pOiBOZXR3b3JrW10ge1xuICAgICAgICByZXR1cm4gbmFtZXMubWFwKChuYW1lKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXR3b3JrID0gdGhpcy5uZXR3b3Jrcy5maW5kKHggPT4geC5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgICAgICBpZiAoIW5ldHdvcmspIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5ldHdvcmsgbm90IGZvdW5kOiAke25hbWV9YClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXR3b3JrO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZXR3b3Jrc09yQWxsKG5hbWVzOiBzdHJpbmdbXSk6IE5ldHdvcmtbXSB7XG4gICAgICAgIHJldHVybiBuYW1lcy5sZW5ndGggPiAwID8gdGhpcy5uZXR3b3Jrc0Zyb21OYW1lcyhuYW1lcykgOiB0aGlzLm5ldHdvcmtzO1xuICAgIH1cblxuICAgIGdldERlZnMoc291cmNlOiBDb21waWxlcnNXaXRoTmV0d29ya3MpOiBDb250YWluZXJEZWZbXSB7XG4gICAgICAgIHJldHVybiBzb3VyY2UuY29tcGlsZXJzID8gc291cmNlLm5ldHdvcmtzLmNvbmNhdCh0aGlzLmNvbXBpbGVycykgOiBbLi4uc291cmNlLm5ldHdvcmtzXTtcbiAgICB9XG5cbiAgICBhc3luYyBzdGFydChzb3VyY2U6IENvbXBpbGVyc1dpdGhOZXR3b3Jrcykge1xuICAgICAgICBhd2FpdCB0aGlzLmRvY2tlci5zdGFydHVwQ29udGFpbmVycyh0aGlzLmdldERlZnMoc291cmNlKSwgQ29udGFpbmVyU3RhdHVzLnJ1bm5pbmcpO1xuICAgIH1cblxuICAgIGFzeW5jIHN0b3Aoc291cmNlOiBDb21waWxlcnNXaXRoTmV0d29ya3MpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5kb2NrZXIuc2h1dGRvd25Db250YWluZXJzKHRoaXMuZ2V0RGVmcyhzb3VyY2UpLCBDb250YWluZXJTdGF0dXMuY3JlYXRlZCk7XG4gICAgfVxuXG4gICAgYXN5bmMgcmVzdGFydChzb3VyY2U6IENvbXBpbGVyc1dpdGhOZXR3b3Jrcykge1xuICAgICAgICBjb25zdCBkZWZzID0gdGhpcy5nZXREZWZzKHNvdXJjZSk7XG4gICAgICAgIGF3YWl0IHRoaXMuZG9ja2VyLnNodXRkb3duQ29udGFpbmVycyhkZWZzLCBDb250YWluZXJTdGF0dXMuY3JlYXRlZCk7XG4gICAgICAgIGF3YWl0IHRoaXMuZG9ja2VyLnN0YXJ0dXBDb250YWluZXJzKGRlZnMsIENvbnRhaW5lclN0YXR1cy5ydW5uaW5nKTtcbiAgICB9XG5cbiAgICBhc3luYyByZWNyZWF0ZShzb3VyY2U6IENvbXBpbGVyc1dpdGhOZXR3b3Jrcykge1xuICAgICAgICBjb25zdCBkZWZzID0gdGhpcy5nZXREZWZzKHNvdXJjZSk7XG4gICAgICAgIGF3YWl0IHRoaXMuZG9ja2VyLnNodXRkb3duQ29udGFpbmVycyhkZWZzLCBDb250YWluZXJTdGF0dXMubWlzc2luZyk7XG4gICAgICAgIGF3YWl0IHRoaXMuZG9ja2VyLnN0YXJ0dXBDb250YWluZXJzKGRlZnMsIENvbnRhaW5lclN0YXR1cy5jcmVhdGVkKTtcbiAgICB9XG5cblxuICAgIGFzeW5jIGNsZWFuKHNvdXJjZTogQ29tcGlsZXJzV2l0aE5ldHdvcmtzKSB7XG4gICAgICAgIGNvbnN0IGRlZnMgPSB0aGlzLmdldERlZnMoc291cmNlKTtcbiAgICAgICAgYXdhaXQgdGhpcy5kb2NrZXIuc2h1dGRvd25Db250YWluZXJzKGRlZnMsIENvbnRhaW5lclN0YXR1cy5taXNzaW5nKTtcbiAgICB9XG5cbiAgICBhc3luYyB1c2VWZXJzaW9uKHZlcnNpb246IHN0cmluZywgc291cmNlOiBDb21waWxlcnNXaXRoTmV0d29ya3MpIHtcbiAgICAgICAgY29uc3QgZGVmcyA9IHRoaXMuZ2V0RGVmcyhzb3VyY2UpO1xuICAgICAgICBhd2FpdCB0aGlzLmRvY2tlci5zaHV0ZG93bkNvbnRhaW5lcnMoZGVmcywgQ29udGFpbmVyU3RhdHVzLm1pc3NpbmcpO1xuICAgICAgICBpZiAoc291cmNlLmNvbXBpbGVycykge1xuICAgICAgICAgICAgdGhpcy5jb21waWxlcnMuc2V0Q29uZmlnKHtcbiAgICAgICAgICAgICAgICAuLi50aGlzLmNvbXBpbGVycy5nZXRDb25maWcoKSxcbiAgICAgICAgICAgICAgICB2ZXJzaW9uXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBzb3VyY2UubmV0d29ya3MuZm9yRWFjaCgobmV0d29yaykgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29uZmlnID0gbmV0d29yay5nZXRDb25maWcoKTtcbiAgICAgICAgICAgIGNvbmZpZy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICAgICAgICAgIG5ldHdvcmsuc2V0Q29uZmlnKGNvbmZpZyk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNhdmVDb25maWcoKTtcbiAgICAgICAgYXdhaXQgdGhpcy5kb2NrZXIuc3RhcnR1cENvbnRhaW5lcnMoZGVmcywgQ29udGFpbmVyU3RhdHVzLnJ1bm5pbmcpO1xuICAgIH1cblxuICAgIGVuc3VyZU5ldHdvcmsobmFtZTogc3RyaW5nKTogTmV0d29yayB7XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nID0gdGhpcy5uZXR3b3Jrcy5maW5kKHggPT4geC5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgIGlmIChleGlzdGluZykge1xuICAgICAgICAgICAgcmV0dXJuIGV4aXN0aW5nO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5ldHdvcmsgPSBuZXcgTmV0d29yayh7XG4gICAgICAgICAgICAuLi5OZXR3b3JrLmRlZmF1bHRDb25maWcsXG4gICAgICAgICAgICBuYW1lXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm5ldHdvcmtzLnB1c2gobmV0d29yayk7XG4gICAgICAgIHJldHVybiBuZXR3b3JrO1xuICAgIH1cblxuICAgIGNoZWNrVW5pcXVlTmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMubmV0d29ya3MuZmluZCh4ID0+IHgubmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5ldHdvcmsgd2l0aCBuYW1lIFske25hbWV9XSBhbHJlYWR5IGV4aXN0c2ApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkTmV0d29ya3MobmFtZXM6IHN0cmluZ1tdKSB7XG4gICAgICAgIG5hbWVzLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tVbmlxdWVOYW1lKG5hbWUpO1xuICAgICAgICAgICAgY29uc3QgbmV0d29yayA9IG5ldyBOZXR3b3JrKHtcbiAgICAgICAgICAgICAgICAuLi5OZXR3b3JrLmRlZmF1bHRDb25maWcsXG4gICAgICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLm5ldHdvcmtzLnB1c2gobmV0d29yayk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNhdmVDb25maWcoKTtcbiAgICB9XG5cblxuICAgIGFzeW5jIHJlbW92ZU5ldHdvcmtzKG5ldHdvcmtzOiBOZXR3b3JrW10pIHtcbiAgICAgICAgYXdhaXQgdGhpcy5kb2NrZXIuc2h1dGRvd25Db250YWluZXJzKG5ldHdvcmtzLCBDb250YWluZXJTdGF0dXMubWlzc2luZyk7XG4gICAgICAgIG5ldHdvcmtzLmZvckVhY2goKG5ldHdvcmspID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5uZXR3b3Jrcy5maW5kSW5kZXgoeCA9PiB4ID09PSBuZXR3b3JrKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXR3b3Jrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zYXZlQ29uZmlnKCk7XG4gICAgfVxuXG5cbiAgICBhc3luYyB1cGRhdGVOZXR3b3JrQ29uZmlncyhuZXR3b3JrczogTmV0d29ya1tdLCB1cGRhdGU6IChjb25maWc6IE5ldHdvcmtDb25maWcpID0+IHZvaWQpIHtcbiAgICAgICAgY29uc3QgZGVmcyA9IFsuLi5uZXR3b3Jrc107XG4gICAgICAgIGF3YWl0IHRoaXMuZG9ja2VyLnNodXRkb3duQ29udGFpbmVycyhkZWZzLCBDb250YWluZXJTdGF0dXMubWlzc2luZyk7XG4gICAgICAgIG5ldHdvcmtzLmZvckVhY2goKG5ldHdvcmspID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IG5ldHdvcmsuZ2V0Q29uZmlnKCk7XG4gICAgICAgICAgICBjb25zdCBzYXZlTmFtZSA9IGNvbmZpZy5uYW1lO1xuICAgICAgICAgICAgdXBkYXRlKGNvbmZpZyk7XG4gICAgICAgICAgICBpZiAoY29uZmlnLm5hbWUudG9Mb3dlckNhc2UoKSAhPT0gc2F2ZU5hbWUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tVbmlxdWVOYW1lKGNvbmZpZy5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ldHdvcmsuc2V0Q29uZmlnKGNvbmZpZylcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2F2ZUNvbmZpZygpO1xuICAgICAgICBhd2FpdCB0aGlzLmRvY2tlci5zdGFydHVwQ29udGFpbmVycyhkZWZzLCBDb250YWluZXJTdGF0dXMucnVubmluZyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzRGV2Q29udGFpbmVyKGluZm86IERDb250YWluZXJJbmZvKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBEZXZEb2NrZXIuY29udGFpbmVyQmVsb25nc1RvSW1hZ2UoaW5mbywgQ29tcGlsZXJzLmltYWdlUHJlZml4KVxuICAgICAgICAgICAgfHwgRGV2RG9ja2VyLmNvbnRhaW5lckJlbG9uZ3NUb0ltYWdlKGluZm8sIE5ldHdvcmsuaW1hZ2VQcmVmaXgpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc0RldkltYWdlKGluZm86IERJbWFnZUluZm8pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIERldkRvY2tlci5pbWFnZUhhc1JlcG9UYWcoaW5mbywgQ29tcGlsZXJzLmltYWdlUHJlZml4KVxuICAgICAgICAgICAgfHwgRGV2RG9ja2VyLmltYWdlSGFzUmVwb1RhZyhpbmZvLCBOZXR3b3JrLmltYWdlUHJlZml4KTtcbiAgICB9XG59XG5cbmV4cG9ydCB7IERldiB9O1xuIl19