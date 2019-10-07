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
      _regenerator["default"].mark(function _callee6(compilers, networks, containersOnly) {
        var imageMatches;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                imageMatches = [];

                if (compilers) {
                  imageMatches.push(_compilers.Compilers.imagePrefix);
                }

                if (networks) {
                  imageMatches.push(_networks.Network.imagePrefix);
                }

                _context6.next = 5;
                return this.docker.removeImages(imageMatches, containersOnly);

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function clean(_x6, _x7, _x8) {
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

      function useVersion(_x9, _x10) {
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

      function removeNetworks(_x11) {
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

      function updateNetworkConfigs(_x12, _x13) {
        return _updateNetworkConfigs.apply(this, arguments);
      }

      return updateNetworkConfigs;
    }()
  }], [{
    key: "isDevContainer",
    value: function isDevContainer(info) {
      return _docker.DevDocker.containersImageMatched(info, _compilers.Compilers.imagePrefix) || _docker.DevDocker.containersImageMatched(info, _networks.Network.imagePrefix);
    }
  }, {
    key: "isDevImage",
    value: function isDevImage(info) {
      return _docker.DevDocker.imageHasMatchedName(info, _compilers.Compilers.imagePrefix) || _docker.DevDocker.imageHasMatchedName(info, _networks.Network.imagePrefix);
    }
  }]);
  return Dev;
}();

exports.Dev = Dev;
(0, _defineProperty2["default"])(Dev, "defaultConfig", Object.freeze({
  compilers: _compilers.Compilers.defaultConfig,
  networks: [_networks.Network.defaultConfig]
}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZXYuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwicGF0aCIsIkRldiIsImltYWdlcyIsImFncmVlbWVudFJlcXVpcmVkIiwiZmluZCIsImlzRGV2SW1hZ2UiLCJfcmVwb1RhZyIsImxpY2Vuc2UiLCJyZWFkRmlsZVN5bmMiLCJqb2luIiwiX19kaXJuYW1lIiwidG9TdHJpbmciLCJzcGxpdCIsIm1hcCIsImJyZWFrV29yZHMiLCJjb25zb2xlIiwibG9nIiwicHJvY2VzcyIsInN0ZG91dCIsIndyaXRlIiwidGV4dHMiLCJhZ3JlZW1lbnRDb25maXJtYXRpb24iLCJhbnN3ZXIiLCJ0cmltIiwidG9Mb3dlckNhc2UiLCJhZ3JlZW1lbnRSZWplY3RlZCIsImV4aXQiLCJhZ3JlZW1lbnRBY2NlcHRlZCIsIm5hbWUiLCJ2ZXJzaW9uIiwiZG9ja2VyIiwiRGV2RG9ja2VyIiwib25TdGFydHVwSW1hZ2VzIiwib25CZWZvcmVQdWxsIiwiY29tcGlsZXJzIiwiQ29tcGlsZXJzIiwiZGVmYXVsdENvbmZpZyIsIm5ldHdvcmtzIiwiTmV0d29yayIsImNvbmZpZ0ZpbGVQYXRoIiwibWtkaXJTeW5jIiwicmVjdXJzaXZlIiwibG9hZENvbmZpZyIsImNvbmZpZyIsIkpTT04iLCJwYXJzZSIsImVuY29kaW5nIiwic2V0Q29uZmlnIiwieCIsImdldENvbmZpZyIsIndyaXRlRmlsZVN5bmMiLCJzdHJpbmdpZnkiLCJuYW1lcyIsIm5ldHdvcmsiLCJFcnJvciIsImxlbmd0aCIsIm5ldHdvcmtzRnJvbU5hbWVzIiwic291cmNlIiwiY29uY2F0Iiwic3RhcnR1cENvbnRhaW5lcnMiLCJnZXREZWZzIiwiQ29udGFpbmVyU3RhdHVzIiwicnVubmluZyIsInNodXRkb3duQ29udGFpbmVycyIsImNyZWF0ZWQiLCJkZWZzIiwibWlzc2luZyIsImNvbnRhaW5lcnNPbmx5IiwiaW1hZ2VNYXRjaGVzIiwicHVzaCIsImltYWdlUHJlZml4IiwicmVtb3ZlSW1hZ2VzIiwiZm9yRWFjaCIsInNhdmVDb25maWciLCJleGlzdGluZyIsImNoZWNrVW5pcXVlTmFtZSIsImluZGV4IiwiZmluZEluZGV4Iiwic3BsaWNlIiwidXBkYXRlIiwic2F2ZU5hbWUiLCJpbmZvIiwiY29udGFpbmVyc0ltYWdlTWF0Y2hlZCIsImltYWdlSGFzTWF0Y2hlZE5hbWUiLCJPYmplY3QiLCJmcmVlemUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQTs7QUFHQTs7QUFFQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsRUFBRSxHQUFHQyxPQUFPLENBQUMsSUFBRCxDQUFsQjs7QUFDQSxJQUFNQyxJQUFJLEdBQUdELE9BQU8sQ0FBQyxNQUFELENBQXBCOztJQVlNRSxHOzs7QUFhRixpQkFBYztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw4REFpQ0ksVUFBQ0MsTUFBRCxFQUEwQjtBQUN4QyxNQUFBLEtBQUksQ0FBQ0MsaUJBQUwsR0FBeUIsQ0FBQ0QsTUFBTSxDQUFDRSxJQUFQLENBQVlILEdBQUcsQ0FBQ0ksVUFBaEIsQ0FBMUI7QUFDSCxLQW5DYTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQ0FxQ0MsaUJBQU9DLFFBQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsb0JBQ04sS0FBSSxDQUFDSCxpQkFEQztBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQUlMSSxnQkFBQUEsT0FKSyxHQUlLVCxFQUFFLENBQ2JVLFlBRFcsQ0FDRVIsSUFBSSxDQUFDUyxJQUFMLENBQVVDLFNBQVYsRUFBcUIsSUFBckIsRUFBMkIsU0FBM0IsQ0FERixFQUVYQyxRQUZXLEdBR1hDLEtBSFcsQ0FHTCxJQUhLLEVBSVhDLEdBSlcsQ0FJUEMsaUJBSk8sRUFJS0wsSUFKTCxDQUlVLElBSlYsQ0FKTDtBQVNYTSxnQkFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlULE9BQVo7QUFDQVUsZ0JBQUFBLE9BQU8sQ0FBQ0MsTUFBUixD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Q0FBTjs7QUFDQSxzQkFBSUEsTUFBTSxDQUFDZixJQUFQLENBQVlKLFdBQVosT0FBOEJ3RCxRQUFRLENBQUN4RCxXQUFULEVBQWxDLEVBQTBEO0FBQ3RELG9CQUFBLE1BQUksQ0FBQ21ELGVBQUwsQ0FBcUJoQyxNQUFNLENBQUNmLElBQTVCO0FBQ0g7O0FBQ0R5QixrQkFBQUEsT0FBTyxDQUFDTixTQUFSLENBQWtCSixNQUFsQjtBQUNILGlCQVJEO0FBU0EscUJBQUs4QixVQUFMOzt1QkFDTSxLQUFLM0MsTUFBTCxDQUFZNkIsaUJBQVosQ0FBOEJNLElBQTlCLEVBQW9DSix3QkFBZ0JDLE9BQXBELEM7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQ0FHWW1CLEksRUFBK0I7QUFDakQsYUFBT2xELGtCQUFVbUQsc0JBQVYsQ0FBaUNELElBQWpDLEVBQXVDOUMscUJBQVVtQyxXQUFqRCxLQUNBdkMsa0JBQVVtRCxzQkFBVixDQUFpQ0QsSUFBakMsRUFBdUMzQyxrQkFBUWdDLFdBQS9DLENBRFA7QUFFSDs7OytCQUVpQlcsSSxFQUEyQjtBQUN6QyxhQUFPbEQsa0JBQVVvRCxtQkFBVixDQUE4QkYsSUFBOUIsRUFBb0M5QyxxQkFBVW1DLFdBQTlDLEtBQ0F2QyxrQkFBVW9ELG1CQUFWLENBQThCRixJQUE5QixFQUFvQzNDLGtCQUFRZ0MsV0FBNUMsQ0FEUDtBQUVIOzs7Ozs7aUNBOU1DckUsRyxtQkFDZ0NtRixNQUFNLENBQUNDLE1BQVAsQ0FBYztBQUM1Q25ELEVBQUFBLFNBQVMsRUFBRUMscUJBQVVDLGFBRHVCO0FBRTVDQyxFQUFBQSxRQUFRLEVBQUUsQ0FBQ0Msa0JBQVFGLGFBQVQ7QUFGa0MsQ0FBZCxDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuLy8gQGZsb3dcblxuaW1wb3J0IHsgQ29tcGlsZXJzIH0gZnJvbSBcIi4vY29tcGlsZXJzL2NvbXBpbGVyc1wiO1xuaW1wb3J0IHR5cGUgeyBDb21waWxlcnNDb25maWcgfSBmcm9tIFwiLi9jb21waWxlcnMvY29tcGlsZXJzXCI7XG5pbXBvcnQgdHlwZSB7IE5ldHdvcmtDb25maWcgfSBmcm9tIFwiLi9uZXR3b3Jrcy9uZXR3b3Jrc1wiO1xuaW1wb3J0IHsgTmV0d29yayB9IGZyb20gXCIuL25ldHdvcmtzL25ldHdvcmtzXCI7XG5pbXBvcnQgdHlwZSB7IENvbnRhaW5lckRlZiwgRENvbnRhaW5lckluZm8sIERJbWFnZUluZm8gfSBmcm9tIFwiLi91dGlscy9kb2NrZXJcIjtcbmltcG9ydCB7IENvbnRhaW5lclN0YXR1cywgRGV2RG9ja2VyIH0gZnJvbSBcIi4vdXRpbHMvZG9ja2VyXCI7XG5pbXBvcnQgeyB0ZXh0cyB9IGZyb20gXCIuL3V0aWxzL3RleHRzXCI7XG5pbXBvcnQgeyBicmVha1dvcmRzLCBpbnB1dExpbmUsIHRvbmxhYnNIb21lUGF0aCwgdmVyc2lvbiB9IGZyb20gXCIuL3V0aWxzL3V0aWxzXCI7XG5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5cbnR5cGUgRGV2Q29uZmlnID0ge1xuICAgIGNvbXBpbGVyczogQ29tcGlsZXJzQ29uZmlnLFxuICAgIG5ldHdvcmtzOiBOZXR3b3JrQ29uZmlnW10sXG59O1xuXG5leHBvcnQgdHlwZSBDb21waWxlcnNXaXRoTmV0d29ya3MgPSB7XG4gICAgY29tcGlsZXJzOiBib29sZWFuLFxuICAgIG5ldHdvcmtzOiBOZXR3b3JrW10sXG59XG5cbmNsYXNzIERldiB7XG4gICAgc3RhdGljIGRlZmF1bHRDb25maWc6IERldkNvbmZpZyA9IE9iamVjdC5mcmVlemUoe1xuICAgICAgICBjb21waWxlcnM6IENvbXBpbGVycy5kZWZhdWx0Q29uZmlnLFxuICAgICAgICBuZXR3b3JrczogW05ldHdvcmsuZGVmYXVsdENvbmZpZ10sXG4gICAgfSk7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHZlcnNpb246IHN0cmluZztcbiAgICBkb2NrZXI6IERldkRvY2tlcjtcbiAgICBuZXR3b3JrczogTmV0d29ya1tdO1xuICAgIGNvbXBpbGVyczogQ29tcGlsZXJzO1xuICAgIGFncmVlbWVudFJlcXVpcmVkOiBib29sZWFuO1xuICAgIGNvbmZpZ0ZpbGVQYXRoOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gJ3RvbmRldic7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHZlcnNpb247XG4gICAgICAgIHRoaXMuYWdyZWVtZW50UmVxdWlyZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmRvY2tlciA9IG5ldyBEZXZEb2NrZXIoKTtcbiAgICAgICAgdGhpcy5kb2NrZXIub25TdGFydHVwSW1hZ2VzID0gdGhpcy5vblN0YXJ0dXBJbWFnZXM7XG4gICAgICAgIHRoaXMuZG9ja2VyLm9uQmVmb3JlUHVsbCA9IHRoaXMub25CZWZvcmVQdWxsO1xuICAgICAgICB0aGlzLmNvbXBpbGVycyA9IG5ldyBDb21waWxlcnMoQ29tcGlsZXJzLmRlZmF1bHRDb25maWcpO1xuICAgICAgICB0aGlzLm5ldHdvcmtzID0gW25ldyBOZXR3b3JrKE5ldHdvcmsuZGVmYXVsdENvbmZpZyldO1xuICAgICAgICB0aGlzLmNvbmZpZ0ZpbGVQYXRoID0gdG9ubGFic0hvbWVQYXRoKCdjb25maWcuanNvbicpO1xuICAgICAgICBmcy5ta2RpclN5bmModG9ubGFic0hvbWVQYXRoKCksICh7IHJlY3Vyc2l2ZTogdHJ1ZSB9OiBhbnkpKTtcbiAgICAgICAgdGhpcy5sb2FkQ29uZmlnKCk7XG4gICAgfVxuXG4gICAgbG9hZENvbmZpZygpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZzogRGV2Q29uZmlnID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmModGhpcy5jb25maWdGaWxlUGF0aCwgeyBlbmNvZGluZzogJ3V0ZjgnIH0pKTtcbiAgICAgICAgICAgIHRoaXMuY29tcGlsZXJzLnNldENvbmZpZyhjb25maWcuY29tcGlsZXJzKTtcbiAgICAgICAgICAgIHRoaXMubmV0d29ya3MgPSBjb25maWcubmV0d29ya3MubWFwKHggPT4gbmV3IE5ldHdvcmsoeCkpO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgc2F2ZUNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgY29uZmlnOiBEZXZDb25maWcgPSB7XG4gICAgICAgICAgICBjb21waWxlcnM6IHRoaXMuY29tcGlsZXJzLmdldENvbmZpZygpLFxuICAgICAgICAgICAgbmV0d29ya3M6IHRoaXMubmV0d29ya3MubWFwKHggPT4geC5nZXRDb25maWcoKSksXG4gICAgICAgIH07XG4gICAgICAgIGZzLm1rZGlyU3luYyh0b25sYWJzSG9tZVBhdGgoJycpLCAoeyByZWN1cnNpdmU6IHRydWUgfTogYW55KSk7XG4gICAgICAgIGZzLndyaXRlRmlsZVN5bmModGhpcy5jb25maWdGaWxlUGF0aCwgSlNPTi5zdHJpbmdpZnkoY29uZmlnKSwgeyBlbmNvZGluZzogJ3V0ZjgnIH0pO1xuICAgIH1cblxuICAgIG9uU3RhcnR1cEltYWdlcyA9IChpbWFnZXM6IERJbWFnZUluZm9bXSkgPT4ge1xuICAgICAgICB0aGlzLmFncmVlbWVudFJlcXVpcmVkID0gIWltYWdlcy5maW5kKERldi5pc0RldkltYWdlKTtcbiAgICB9O1xuXG4gICAgb25CZWZvcmVQdWxsID0gYXN5bmMgKF9yZXBvVGFnOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmFncmVlbWVudFJlcXVpcmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbGljZW5zZSA9IGZzXG4gICAgICAgICAgICAucmVhZEZpbGVTeW5jKHBhdGguam9pbihfX2Rpcm5hbWUsICcuLicsICdMSUNFTlNFJykpXG4gICAgICAgICAgICAudG9TdHJpbmcoKVxuICAgICAgICAgICAgLnNwbGl0KCdcXG4nKVxuICAgICAgICAgICAgLm1hcChicmVha1dvcmRzKS5qb2luKCdcXG4nKTtcbiAgICAgICAgY29uc29sZS5sb2cobGljZW5zZSk7XG4gICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKHRleHRzLmFncmVlbWVudENvbmZpcm1hdGlvbik7XG4gICAgICAgIGNvbnN0IGFuc3dlciA9IChhd2FpdCBpbnB1dExpbmUoKSkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmIChhbnN3ZXIgIT09ICd5ZXMnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0ZXh0cy5hZ3JlZW1lbnRSZWplY3RlZCk7XG4gICAgICAgICAgICBwcm9jZXNzLmV4aXQoMCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2codGV4dHMuYWdyZWVtZW50QWNjZXB0ZWQpO1xuICAgICAgICB0aGlzLmFncmVlbWVudFJlcXVpcmVkID0gZmFsc2U7XG4gICAgfTtcblxuICAgIG5ldHdvcmtzRnJvbU5hbWVzKG5hbWVzOiBzdHJpbmdbXSk6IE5ldHdvcmtbXSB7XG4gICAgICAgIHJldHVybiBuYW1lcy5tYXAoKG5hbWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5ldHdvcmsgPSB0aGlzLm5ldHdvcmtzLmZpbmQoeCA9PiB4Lm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgICAgIGlmICghbmV0d29yaykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTmV0d29yayBub3QgZm91bmQ6ICR7bmFtZX1gKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldHdvcms7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5ldHdvcmtzT3JBbGwobmFtZXM6IHN0cmluZ1tdKTogTmV0d29ya1tdIHtcbiAgICAgICAgcmV0dXJuIG5hbWVzLmxlbmd0aCA+IDAgPyB0aGlzLm5ldHdvcmtzRnJvbU5hbWVzKG5hbWVzKSA6IHRoaXMubmV0d29ya3M7XG4gICAgfVxuXG4gICAgZ2V0RGVmcyhzb3VyY2U6IENvbXBpbGVyc1dpdGhOZXR3b3Jrcyk6IENvbnRhaW5lckRlZltdIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZS5jb21waWxlcnMgPyBzb3VyY2UubmV0d29ya3MuY29uY2F0KHRoaXMuY29tcGlsZXJzKSA6IFsuLi5zb3VyY2UubmV0d29ya3NdO1xuICAgIH1cblxuICAgIGFzeW5jIHN0YXJ0KHNvdXJjZTogQ29tcGlsZXJzV2l0aE5ldHdvcmtzKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuZG9ja2VyLnN0YXJ0dXBDb250YWluZXJzKHRoaXMuZ2V0RGVmcyhzb3VyY2UpLCBDb250YWluZXJTdGF0dXMucnVubmluZyk7XG4gICAgfVxuXG4gICAgYXN5bmMgc3RvcChzb3VyY2U6IENvbXBpbGVyc1dpdGhOZXR3b3Jrcykge1xuICAgICAgICBhd2FpdCB0aGlzLmRvY2tlci5zaHV0ZG93bkNvbnRhaW5lcnModGhpcy5nZXREZWZzKHNvdXJjZSksIENvbnRhaW5lclN0YXR1cy5jcmVhdGVkKTtcbiAgICB9XG5cbiAgICBhc3luYyByZXN0YXJ0KHNvdXJjZTogQ29tcGlsZXJzV2l0aE5ldHdvcmtzKSB7XG4gICAgICAgIGNvbnN0IGRlZnMgPSB0aGlzLmdldERlZnMoc291cmNlKTtcbiAgICAgICAgYXdhaXQgdGhpcy5kb2NrZXIuc2h1dGRvd25Db250YWluZXJzKGRlZnMsIENvbnRhaW5lclN0YXR1cy5jcmVhdGVkKTtcbiAgICAgICAgYXdhaXQgdGhpcy5kb2NrZXIuc3RhcnR1cENvbnRhaW5lcnMoZGVmcywgQ29udGFpbmVyU3RhdHVzLnJ1bm5pbmcpO1xuICAgIH1cblxuICAgIGFzeW5jIHJlY3JlYXRlKHNvdXJjZTogQ29tcGlsZXJzV2l0aE5ldHdvcmtzKSB7XG4gICAgICAgIGNvbnN0IGRlZnMgPSB0aGlzLmdldERlZnMoc291cmNlKTtcbiAgICAgICAgYXdhaXQgdGhpcy5kb2NrZXIuc2h1dGRvd25Db250YWluZXJzKGRlZnMsIENvbnRhaW5lclN0YXR1cy5taXNzaW5nKTtcbiAgICAgICAgYXdhaXQgdGhpcy5kb2NrZXIuc3RhcnR1cENvbnRhaW5lcnMoZGVmcywgQ29udGFpbmVyU3RhdHVzLmNyZWF0ZWQpO1xuICAgIH1cblxuXG4gICAgYXN5bmMgY2xlYW4oY29tcGlsZXJzOiBib29sZWFuLCBuZXR3b3JrczogYm9vbGVhbiwgY29udGFpbmVyc09ubHk6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgaW1hZ2VNYXRjaGVzID0gW107XG4gICAgICAgIGlmIChjb21waWxlcnMpIHtcbiAgICAgICAgICAgIGltYWdlTWF0Y2hlcy5wdXNoKENvbXBpbGVycy5pbWFnZVByZWZpeCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5ldHdvcmtzKSB7XG4gICAgICAgICAgICBpbWFnZU1hdGNoZXMucHVzaChOZXR3b3JrLmltYWdlUHJlZml4KTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLmRvY2tlci5yZW1vdmVJbWFnZXMoaW1hZ2VNYXRjaGVzLCBjb250YWluZXJzT25seSk7XG4gICAgfVxuXG4gICAgYXN5bmMgdXNlVmVyc2lvbih2ZXJzaW9uOiBzdHJpbmcsIHNvdXJjZTogQ29tcGlsZXJzV2l0aE5ldHdvcmtzKSB7XG4gICAgICAgIGNvbnN0IGRlZnMgPSB0aGlzLmdldERlZnMoc291cmNlKTtcbiAgICAgICAgYXdhaXQgdGhpcy5kb2NrZXIuc2h1dGRvd25Db250YWluZXJzKGRlZnMsIENvbnRhaW5lclN0YXR1cy5taXNzaW5nKTtcbiAgICAgICAgaWYgKHNvdXJjZS5jb21waWxlcnMpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcGlsZXJzLnNldENvbmZpZyh7XG4gICAgICAgICAgICAgICAgLi4udGhpcy5jb21waWxlcnMuZ2V0Q29uZmlnKCksXG4gICAgICAgICAgICAgICAgdmVyc2lvblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgc291cmNlLm5ldHdvcmtzLmZvckVhY2goKG5ldHdvcmspID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IG5ldHdvcmsuZ2V0Q29uZmlnKCk7XG4gICAgICAgICAgICBjb25maWcudmVyc2lvbiA9IHZlcnNpb247XG4gICAgICAgICAgICBuZXR3b3JrLnNldENvbmZpZyhjb25maWcpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zYXZlQ29uZmlnKCk7XG4gICAgICAgIGF3YWl0IHRoaXMuZG9ja2VyLnN0YXJ0dXBDb250YWluZXJzKGRlZnMsIENvbnRhaW5lclN0YXR1cy5ydW5uaW5nKTtcbiAgICB9XG5cbiAgICBlbnN1cmVOZXR3b3JrKG5hbWU6IHN0cmluZyk6IE5ldHdvcmsge1xuICAgICAgICBjb25zdCBleGlzdGluZyA9IHRoaXMubmV0d29ya3MuZmluZCh4ID0+IHgubmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBleGlzdGluZztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuZXR3b3JrID0gbmV3IE5ldHdvcmsoe1xuICAgICAgICAgICAgLi4uTmV0d29yay5kZWZhdWx0Q29uZmlnLFxuICAgICAgICAgICAgbmFtZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5uZXR3b3Jrcy5wdXNoKG5ldHdvcmspO1xuICAgICAgICByZXR1cm4gbmV0d29yaztcbiAgICB9XG5cbiAgICBjaGVja1VuaXF1ZU5hbWUobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLm5ldHdvcmtzLmZpbmQoeCA9PiB4Lm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOZXR3b3JrIHdpdGggbmFtZSBbJHtuYW1lfV0gYWxyZWFkeSBleGlzdHNgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZE5ldHdvcmtzKG5hbWVzOiBzdHJpbmdbXSkge1xuICAgICAgICBuYW1lcy5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrVW5pcXVlTmFtZShuYW1lKTtcbiAgICAgICAgICAgIGNvbnN0IG5ldHdvcmsgPSBuZXcgTmV0d29yayh7XG4gICAgICAgICAgICAgICAgLi4uTmV0d29yay5kZWZhdWx0Q29uZmlnLFxuICAgICAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5uZXR3b3Jrcy5wdXNoKG5ldHdvcmspO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zYXZlQ29uZmlnKCk7XG4gICAgfVxuXG5cbiAgICBhc3luYyByZW1vdmVOZXR3b3JrcyhuZXR3b3JrczogTmV0d29ya1tdKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuZG9ja2VyLnNodXRkb3duQ29udGFpbmVycyhuZXR3b3JrcywgQ29udGFpbmVyU3RhdHVzLm1pc3NpbmcpO1xuICAgICAgICBuZXR3b3Jrcy5mb3JFYWNoKChuZXR3b3JrKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMubmV0d29ya3MuZmluZEluZGV4KHggPT4geCA9PT0gbmV0d29yayk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMubmV0d29ya3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2F2ZUNvbmZpZygpO1xuICAgIH1cblxuXG4gICAgYXN5bmMgdXBkYXRlTmV0d29ya0NvbmZpZ3MobmV0d29ya3M6IE5ldHdvcmtbXSwgdXBkYXRlOiAoY29uZmlnOiBOZXR3b3JrQ29uZmlnKSA9PiB2b2lkKSB7XG4gICAgICAgIGNvbnN0IGRlZnMgPSBbLi4ubmV0d29ya3NdO1xuICAgICAgICBhd2FpdCB0aGlzLmRvY2tlci5zaHV0ZG93bkNvbnRhaW5lcnMoZGVmcywgQ29udGFpbmVyU3RhdHVzLm1pc3NpbmcpO1xuICAgICAgICBuZXR3b3Jrcy5mb3JFYWNoKChuZXR3b3JrKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb25maWcgPSBuZXR3b3JrLmdldENvbmZpZygpO1xuICAgICAgICAgICAgY29uc3Qgc2F2ZU5hbWUgPSBjb25maWcubmFtZTtcbiAgICAgICAgICAgIHVwZGF0ZShjb25maWcpO1xuICAgICAgICAgICAgaWYgKGNvbmZpZy5uYW1lLnRvTG93ZXJDYXNlKCkgIT09IHNhdmVOYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrVW5pcXVlTmFtZShjb25maWcubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXR3b3JrLnNldENvbmZpZyhjb25maWcpXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNhdmVDb25maWcoKTtcbiAgICAgICAgYXdhaXQgdGhpcy5kb2NrZXIuc3RhcnR1cENvbnRhaW5lcnMoZGVmcywgQ29udGFpbmVyU3RhdHVzLnJ1bm5pbmcpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc0RldkNvbnRhaW5lcihpbmZvOiBEQ29udGFpbmVySW5mbyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gRGV2RG9ja2VyLmNvbnRhaW5lcnNJbWFnZU1hdGNoZWQoaW5mbywgQ29tcGlsZXJzLmltYWdlUHJlZml4KVxuICAgICAgICAgICAgfHwgRGV2RG9ja2VyLmNvbnRhaW5lcnNJbWFnZU1hdGNoZWQoaW5mbywgTmV0d29yay5pbWFnZVByZWZpeCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzRGV2SW1hZ2UoaW5mbzogREltYWdlSW5mbyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gRGV2RG9ja2VyLmltYWdlSGFzTWF0Y2hlZE5hbWUoaW5mbywgQ29tcGlsZXJzLmltYWdlUHJlZml4KVxuICAgICAgICAgICAgfHwgRGV2RG9ja2VyLmltYWdlSGFzTWF0Y2hlZE5hbWUoaW5mbywgTmV0d29yay5pbWFnZVByZWZpeCk7XG4gICAgfVxufVxuXG5leHBvcnQgeyBEZXYgfTtcbiJdfQ==