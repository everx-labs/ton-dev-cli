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
    }() // Compilers

  }, {
    key: "getCompilersMountedTo",
    value: function () {
      var _getCompilersMountedTo = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee8(hostPath) {
        var _this3 = this;

        var info, container;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.docker.getContainerInfos();

              case 2:
                _context8.t0 = function (info) {
                  return _docker.DevDocker.containersImageMatched(info, _this3.compilers.requiredImage) && info.Mounts.find(function (mount) {
                    return mount.Source.toLowerCase() === hostPath.toLowerCase();
                  });
                };

                info = _context8.sent.find(_context8.t0);

                if (!info) {
                  _context8.next = 11;
                  break;
                }

                container = this.docker.client.getContainer(info.Id);

                if (_docker.DevDocker.isRunning(info)) {
                  _context8.next = 9;
                  break;
                }

                _context8.next = 9;
                return container.start();

              case 9:
                _context8.next = 16;
                break;

              case 11:
                _context8.next = 13;
                return this.compilers.createContainerMountedTo(hostPath, this.docker);

              case 13:
                container = _context8.sent;
                _context8.next = 16;
                return container.start();

              case 16:
                return _context8.abrupt("return", {
                  container: container,
                  guestPath: (0, _utils.bindPathJoinTo)(this.compilers.mountDestination, '/')
                });

              case 17:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function getCompilersMountedTo(_x11) {
        return _getCompilersMountedTo.apply(this, arguments);
      }

      return getCompilersMountedTo;
    }() // Networks

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
      var _this4 = this;

      names.forEach(function (name) {
        _this4.checkUniqueName(name);

        var network = new _networks.Network(_objectSpread({}, _networks.Network.defaultConfig, {
          name: name
        }));

        _this4.networks.push(network);
      });
      this.saveConfig();
    }
  }, {
    key: "removeNetworks",
    value: function () {
      var _removeNetworks = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee9(networks) {
        var _this5 = this;

        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this.docker.shutdownContainers(networks, _docker.ContainerStatus.missing);

              case 2:
                networks.forEach(function (network) {
                  var index = _this5.networks.findIndex(function (x) {
                    return x === network;
                  });

                  if (index >= 0) {
                    _this5.networks.splice(index, 1);
                  }
                });
                this.saveConfig();

              case 4:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function removeNetworks(_x12) {
        return _removeNetworks.apply(this, arguments);
      }

      return removeNetworks;
    }()
  }, {
    key: "updateNetworkConfigs",
    value: function () {
      var _updateNetworkConfigs = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee10(networks, update) {
        var _this6 = this;

        var defs;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                defs = (0, _toConsumableArray2["default"])(networks);
                _context10.next = 3;
                return this.docker.shutdownContainers(defs, _docker.ContainerStatus.missing);

              case 3:
                networks.forEach(function (network) {
                  var config = network.getConfig();
                  var saveName = config.name;
                  update(config);

                  if (config.name.toLowerCase() !== saveName.toLowerCase()) {
                    _this6.checkUniqueName(config.name);
                  }

                  network.setConfig(config);
                });
                this.saveConfig();
                _context10.next = 7;
                return this.docker.startupContainers(defs, _docker.ContainerStatus.running);

              case 7:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function updateNetworkConfigs(_x13, _x14) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZXYuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwicGF0aCIsIkRldiIsImltYWdlcyIsImFncmVlbWVudFJlcXVpcmVkIiwiZmluZCIsImlzRGV2SW1hZ2UiLCJfcmVwb1RhZyIsImxpY2Vuc2UiLCJyZWFkRmlsZVN5bmMiLCJqb2luIiwiX19kaXJuYW1lIiwidG9TdHJpbmciLCJzcGxpdCIsIm1hcCIsImJyZWFrV29yZHMiLCJjb25zb2xlIiwibG9nIiwicHJvY2VzcyIsInN0ZG91dCIsIndyaXRlIiwidGV4dHMiLCJhZ3JlZW1lbnRDb25maXJtYXRpb24iLCJhbnN3ZXIiLCJ0cmltIiwidG9Mb3dlckNhc2UiLCJhZ3JlZW1lbnRSZWplY3RlZCIsImV4aXQiLCJhZ3JlZW1lbnRBY2NlcHRlZCIsIm5hbWUiLCJ2ZXJzaW9uIiwiZG9ja2VyIiwiRGV2RG9ja2VyIiwib25TdGFydHVwSW1hZ2VzIiwib25CZWZvcmVQdWxsIiwiY29tcGlsZXJzIiwiQ29tcGlsZXJzIiwiZGVmYXVsdENvbmZpZyIsIm5ldHdvcmtzIiwiTmV0d29yayIsImNvbmZpZ0ZpbGVQYXRoIiwibWtkaXJTeW5jIiwicmVjdXJzaXZlIiwibG9hZENvbmZpZyIsImNvbmZpZyIsIkpTT04iLCJwYXJzZSIsImVuY29kaW5nIiwic2V0Q29uZmlnIiwieCIsImdldENvbmZpZyIsIndyaXRlRmlsZVN5bmMiLCJzdHJpbmdpZnkiLCJuYW1lcyIsIm5ldHdvcmsiLCJFcnJvciIsImxlbmd0aCIsIm5ldHdvcmtzRnJvbU5hbWVzIiwic291cmNlIiwiY29uY2F0Iiwic3RhcnR1cENvbnRhaW5lcnMiLCJnZXREZWZzIiwiQ29udGFpbmVyU3RhdHVzIiwicnVubmluZyIsInNodXRkb3duQ29udGFpbmVycyIsImNyZWF0ZWQiLCJkZWZzIiwibWlzc2luZyIsImNvbnRhaW5lcnNPbmx5IiwiaW1hZ2VNYXRjaGVzIiwicHVzaCIsImltYWdlUHJlZml4IiwicmVtb3ZlSW1hZ2VzIiwiZm9yRWFjaCIsInNhdmVDb25maWciLCJob3N0UGF0aCIsImdldENvbnRhaW5lckluZm9zIiwiaW5mbyIsImNvbnRhaW5lcnNJbWFnZU1hdGNoZWQiLCJyZXF1aXJlZEltYWdlIiwiTW91bnRzIiwibW91bnQiLCJTb3VyY2UiLCJjb250YWluZXIiLCJjbGllbnQiLCJnZXRDb250YWluZXIiLCJJZCIsImlzUnVubmluZyIsInN0YXJ0IiwiY3JlYXRlQ29udGFpbmVyTW91bnRlZFRvIiwiZ3Vlc3RQYXRoIiwibW91bnREZXN0aW5hdGlvbiIsImV4aXN0aW5nIiwiY2hlY2tVbmlxdWVOYW1lIiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJzcGxpY2UiLCJ1cGRhdGUiLCJzYXZlTmFtZSIsImltYWdlSGFzTWF0Y2hlZE5hbWUiLCJPYmplY3QiLCJmcmVlemUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQTs7QUFHQTs7QUFFQTs7QUFDQTs7QUFFQTs7Ozs7O0FBRUEsSUFBTUEsRUFBRSxHQUFHQyxPQUFPLENBQUMsSUFBRCxDQUFsQjs7QUFDQSxJQUFNQyxJQUFJLEdBQUdELE9BQU8sQ0FBQyxNQUFELENBQXBCOztJQVlNRSxHOzs7QUFhRixpQkFBYztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw4REFpQ0ksVUFBQ0MsTUFBRCxFQUEwQjtBQUN4QyxNQUFBLEtBQUksQ0FBQ0MsaUJBQUwsR0FBeUIsQ0FBQ0QsTUFBTSxDQUFDRSxJQUFQLENBQVlILEdBQUcsQ0FBQ0ksVUFBaEIsQ0FBMUI7QUFDSCxLQW5DYTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQ0FxQ0MsaUJBQU9DLFFBQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsb0JBQ04sS0FBSSxDQUFDSCxpQkFEQztBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQUlMSSxnQkFBQUEsT0FKSyxHQUlLVCxFQUFFLENBQ2JVLFlBRFcsQ0FDRVIsSUFBSSxDQUFDUyxJQUFM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LEdBQUd0RCxNQUFNLENBQUNmLElBQXhCO0FBQ0FvRSxrQkFBQUEsTUFBTSxDQUFDckQsTUFBRCxDQUFOOztBQUNBLHNCQUFJQSxNQUFNLENBQUNmLElBQVAsQ0FBWUosV0FBWixPQUE4QnlFLFFBQVEsQ0FBQ3pFLFdBQVQsRUFBbEMsRUFBMEQ7QUFDdEQsb0JBQUEsTUFBSSxDQUFDb0UsZUFBTCxDQUFxQmpELE1BQU0sQ0FBQ2YsSUFBNUI7QUFDSDs7QUFDRHlCLGtCQUFBQSxPQUFPLENBQUNOLFNBQVIsQ0FBa0JKLE1BQWxCO0FBQ0gsaUJBUkQ7QUFTQSxxQkFBSzhCLFVBQUw7O3VCQUNNLEtBQUszQyxNQUFMLENBQVk2QixpQkFBWixDQUE4Qk0sSUFBOUIsRUFBb0NKLHdCQUFnQkMsT0FBcEQsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O21DQUdZYyxJLEVBQStCO0FBQ2pELGFBQU83QyxrQkFBVThDLHNCQUFWLENBQWlDRCxJQUFqQyxFQUF1Q3pDLHFCQUFVbUMsV0FBakQsS0FDQXZDLGtCQUFVOEMsc0JBQVYsQ0FBaUNELElBQWpDLEVBQXVDdEMsa0JBQVFnQyxXQUEvQyxDQURQO0FBRUg7OzsrQkFFaUJNLEksRUFBMkI7QUFDekMsYUFBTzdDLGtCQUFVbUUsbUJBQVYsQ0FBOEJ0QixJQUE5QixFQUFvQ3pDLHFCQUFVbUMsV0FBOUMsS0FDQXZDLGtCQUFVbUUsbUJBQVYsQ0FBOEJ0QixJQUE5QixFQUFvQ3RDLGtCQUFRZ0MsV0FBNUMsQ0FEUDtBQUVIOzs7Ozs7aUNBdk9DckUsRyxtQkFDZ0NrRyxNQUFNLENBQUNDLE1BQVAsQ0FBYztBQUM1Q2xFLEVBQUFBLFNBQVMsRUFBRUMscUJBQVVDLGFBRHVCO0FBRTVDQyxFQUFBQSxRQUFRLEVBQUUsQ0FBQ0Msa0JBQVFGLGFBQVQ7QUFGa0MsQ0FBZCxDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuLy8gQGZsb3dcblxuaW1wb3J0IHsgQ29tcGlsZXJzIH0gZnJvbSBcIi4vY29tcGlsZXJzL2NvbXBpbGVyc1wiO1xuaW1wb3J0IHR5cGUgeyBDb21waWxlcnNDb25maWcgfSBmcm9tIFwiLi9jb21waWxlcnMvY29tcGlsZXJzXCI7XG5pbXBvcnQgdHlwZSB7IE5ldHdvcmtDb25maWcgfSBmcm9tIFwiLi9uZXR3b3Jrcy9uZXR3b3Jrc1wiO1xuaW1wb3J0IHsgTmV0d29yayB9IGZyb20gXCIuL25ldHdvcmtzL25ldHdvcmtzXCI7XG5pbXBvcnQgdHlwZSB7IENvbnRhaW5lckRlZiwgRENvbnRhaW5lckluZm8sIERJbWFnZUluZm8sIERNb3VudCwgRG9ja2VyQ29udGFpbmVyIH0gZnJvbSBcIi4vdXRpbHMvZG9ja2VyXCI7XG5pbXBvcnQgeyBDb250YWluZXJTdGF0dXMsIERldkRvY2tlciB9IGZyb20gXCIuL3V0aWxzL2RvY2tlclwiO1xuaW1wb3J0IHsgdGV4dHMgfSBmcm9tIFwiLi91dGlscy90ZXh0c1wiO1xuaW1wb3J0IHR5cGUgeyBQYXRoSm9pbiB9IGZyb20gXCIuL3V0aWxzL3V0aWxzXCI7XG5pbXBvcnQgeyBiaW5kUGF0aEpvaW5UbywgYnJlYWtXb3JkcywgaW5wdXRMaW5lLCB0b25sYWJzSG9tZVBhdGgsIHZlcnNpb24gfSBmcm9tIFwiLi91dGlscy91dGlsc1wiO1xuXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuXG50eXBlIERldkNvbmZpZyA9IHtcbiAgICBjb21waWxlcnM6IENvbXBpbGVyc0NvbmZpZyxcbiAgICBuZXR3b3JrczogTmV0d29ya0NvbmZpZ1tdLFxufTtcblxuZXhwb3J0IHR5cGUgQ29tcGlsZXJzV2l0aE5ldHdvcmtzID0ge1xuICAgIGNvbXBpbGVyczogYm9vbGVhbixcbiAgICBuZXR3b3JrczogTmV0d29ya1tdLFxufVxuXG5jbGFzcyBEZXYge1xuICAgIHN0YXRpYyBkZWZhdWx0Q29uZmlnOiBEZXZDb25maWcgPSBPYmplY3QuZnJlZXplKHtcbiAgICAgICAgY29tcGlsZXJzOiBDb21waWxlcnMuZGVmYXVsdENvbmZpZyxcbiAgICAgICAgbmV0d29ya3M6IFtOZXR3b3JrLmRlZmF1bHRDb25maWddLFxuICAgIH0pO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICB2ZXJzaW9uOiBzdHJpbmc7XG4gICAgZG9ja2VyOiBEZXZEb2NrZXI7XG4gICAgbmV0d29ya3M6IE5ldHdvcmtbXTtcbiAgICBjb21waWxlcnM6IENvbXBpbGVycztcbiAgICBhZ3JlZW1lbnRSZXF1aXJlZDogYm9vbGVhbjtcbiAgICBjb25maWdGaWxlUGF0aDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubmFtZSA9ICd0b25kZXYnO1xuICAgICAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgICAgICB0aGlzLmFncmVlbWVudFJlcXVpcmVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5kb2NrZXIgPSBuZXcgRGV2RG9ja2VyKCk7XG4gICAgICAgIHRoaXMuZG9ja2VyLm9uU3RhcnR1cEltYWdlcyA9IHRoaXMub25TdGFydHVwSW1hZ2VzO1xuICAgICAgICB0aGlzLmRvY2tlci5vbkJlZm9yZVB1bGwgPSB0aGlzLm9uQmVmb3JlUHVsbDtcbiAgICAgICAgdGhpcy5jb21waWxlcnMgPSBuZXcgQ29tcGlsZXJzKENvbXBpbGVycy5kZWZhdWx0Q29uZmlnKTtcbiAgICAgICAgdGhpcy5uZXR3b3JrcyA9IFtuZXcgTmV0d29yayhOZXR3b3JrLmRlZmF1bHRDb25maWcpXTtcbiAgICAgICAgdGhpcy5jb25maWdGaWxlUGF0aCA9IHRvbmxhYnNIb21lUGF0aCgnY29uZmlnLmpzb24nKTtcbiAgICAgICAgZnMubWtkaXJTeW5jKHRvbmxhYnNIb21lUGF0aCgpLCAoeyByZWN1cnNpdmU6IHRydWUgfTogYW55KSk7XG4gICAgICAgIHRoaXMubG9hZENvbmZpZygpO1xuICAgIH1cblxuICAgIGxvYWRDb25maWcoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBjb25maWc6IERldkNvbmZpZyA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHRoaXMuY29uZmlnRmlsZVBhdGgsIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KSk7XG4gICAgICAgICAgICB0aGlzLmNvbXBpbGVycy5zZXRDb25maWcoY29uZmlnLmNvbXBpbGVycyk7XG4gICAgICAgICAgICB0aGlzLm5ldHdvcmtzID0gY29uZmlnLm5ldHdvcmtzLm1hcCh4ID0+IG5ldyBOZXR3b3JrKHgpKTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHNhdmVDb25maWcoKSB7XG4gICAgICAgIGNvbnN0IGNvbmZpZzogRGV2Q29uZmlnID0ge1xuICAgICAgICAgICAgY29tcGlsZXJzOiB0aGlzLmNvbXBpbGVycy5nZXRDb25maWcoKSxcbiAgICAgICAgICAgIG5ldHdvcmtzOiB0aGlzLm5ldHdvcmtzLm1hcCh4ID0+IHguZ2V0Q29uZmlnKCkpLFxuICAgICAgICB9O1xuICAgICAgICBmcy5ta2RpclN5bmModG9ubGFic0hvbWVQYXRoKCcnKSwgKHsgcmVjdXJzaXZlOiB0cnVlIH06IGFueSkpO1xuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKHRoaXMuY29uZmlnRmlsZVBhdGgsIEpTT04uc3RyaW5naWZ5KGNvbmZpZyksIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KTtcbiAgICB9XG5cbiAgICBvblN0YXJ0dXBJbWFnZXMgPSAoaW1hZ2VzOiBESW1hZ2VJbmZvW10pID0+IHtcbiAgICAgICAgdGhpcy5hZ3JlZW1lbnRSZXF1aXJlZCA9ICFpbWFnZXMuZmluZChEZXYuaXNEZXZJbWFnZSk7XG4gICAgfTtcblxuICAgIG9uQmVmb3JlUHVsbCA9IGFzeW5jIChfcmVwb1RhZzogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICAgIGlmICghdGhpcy5hZ3JlZW1lbnRSZXF1aXJlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxpY2Vuc2UgPSBmc1xuICAgICAgICAgICAgLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4nLCAnTElDRU5TRScpKVxuICAgICAgICAgICAgLnRvU3RyaW5nKClcbiAgICAgICAgICAgIC5zcGxpdCgnXFxuJylcbiAgICAgICAgICAgIC5tYXAoYnJlYWtXb3Jkcykuam9pbignXFxuJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGxpY2Vuc2UpO1xuICAgICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZSh0ZXh0cy5hZ3JlZW1lbnRDb25maXJtYXRpb24pO1xuICAgICAgICBjb25zdCBhbnN3ZXIgPSAoYXdhaXQgaW5wdXRMaW5lKCkpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAoYW5zd2VyICE9PSAneWVzJykge1xuICAgICAgICAgICAgY29uc29sZS5sb2codGV4dHMuYWdyZWVtZW50UmVqZWN0ZWQpO1xuICAgICAgICAgICAgcHJvY2Vzcy5leGl0KDApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHRleHRzLmFncmVlbWVudEFjY2VwdGVkKTtcbiAgICAgICAgdGhpcy5hZ3JlZW1lbnRSZXF1aXJlZCA9IGZhbHNlO1xuICAgIH07XG5cbiAgICBuZXR3b3Jrc0Zyb21OYW1lcyhuYW1lczogc3RyaW5nW10pOiBOZXR3b3JrW10ge1xuICAgICAgICByZXR1cm4gbmFtZXMubWFwKChuYW1lKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXR3b3JrID0gdGhpcy5uZXR3b3Jrcy5maW5kKHggPT4geC5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgICAgICBpZiAoIW5ldHdvcmspIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5ldHdvcmsgbm90IGZvdW5kOiAke25hbWV9YClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXR3b3JrO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZXR3b3Jrc09yQWxsKG5hbWVzOiBzdHJpbmdbXSk6IE5ldHdvcmtbXSB7XG4gICAgICAgIHJldHVybiBuYW1lcy5sZW5ndGggPiAwID8gdGhpcy5uZXR3b3Jrc0Zyb21OYW1lcyhuYW1lcykgOiB0aGlzLm5ldHdvcmtzO1xuICAgIH1cblxuICAgIGdldERlZnMoc291cmNlOiBDb21waWxlcnNXaXRoTmV0d29ya3MpOiBDb250YWluZXJEZWZbXSB7XG4gICAgICAgIHJldHVybiBzb3VyY2UuY29tcGlsZXJzID8gc291cmNlLm5ldHdvcmtzLmNvbmNhdCh0aGlzLmNvbXBpbGVycykgOiBbLi4uc291cmNlLm5ldHdvcmtzXTtcbiAgICB9XG5cbiAgICBhc3luYyBzdGFydChzb3VyY2U6IENvbXBpbGVyc1dpdGhOZXR3b3Jrcykge1xuICAgICAgICBhd2FpdCB0aGlzLmRvY2tlci5zdGFydHVwQ29udGFpbmVycyh0aGlzLmdldERlZnMoc291cmNlKSwgQ29udGFpbmVyU3RhdHVzLnJ1bm5pbmcpO1xuICAgIH1cblxuICAgIGFzeW5jIHN0b3Aoc291cmNlOiBDb21waWxlcnNXaXRoTmV0d29ya3MpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5kb2NrZXIuc2h1dGRvd25Db250YWluZXJzKHRoaXMuZ2V0RGVmcyhzb3VyY2UpLCBDb250YWluZXJTdGF0dXMuY3JlYXRlZCk7XG4gICAgfVxuXG4gICAgYXN5bmMgcmVzdGFydChzb3VyY2U6IENvbXBpbGVyc1dpdGhOZXR3b3Jrcykge1xuICAgICAgICBjb25zdCBkZWZzID0gdGhpcy5nZXREZWZzKHNvdXJjZSk7XG4gICAgICAgIGF3YWl0IHRoaXMuZG9ja2VyLnNodXRkb3duQ29udGFpbmVycyhkZWZzLCBDb250YWluZXJTdGF0dXMuY3JlYXRlZCk7XG4gICAgICAgIGF3YWl0IHRoaXMuZG9ja2VyLnN0YXJ0dXBDb250YWluZXJzKGRlZnMsIENvbnRhaW5lclN0YXR1cy5ydW5uaW5nKTtcbiAgICB9XG5cbiAgICBhc3luYyByZWNyZWF0ZShzb3VyY2U6IENvbXBpbGVyc1dpdGhOZXR3b3Jrcykge1xuICAgICAgICBjb25zdCBkZWZzID0gdGhpcy5nZXREZWZzKHNvdXJjZSk7XG4gICAgICAgIGF3YWl0IHRoaXMuZG9ja2VyLnNodXRkb3duQ29udGFpbmVycyhkZWZzLCBDb250YWluZXJTdGF0dXMubWlzc2luZyk7XG4gICAgICAgIGF3YWl0IHRoaXMuZG9ja2VyLnN0YXJ0dXBDb250YWluZXJzKGRlZnMsIENvbnRhaW5lclN0YXR1cy5jcmVhdGVkKTtcbiAgICB9XG5cblxuICAgIGFzeW5jIGNsZWFuKGNvbXBpbGVyczogYm9vbGVhbiwgbmV0d29ya3M6IGJvb2xlYW4sIGNvbnRhaW5lcnNPbmx5OiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IGltYWdlTWF0Y2hlcyA9IFtdO1xuICAgICAgICBpZiAoY29tcGlsZXJzKSB7XG4gICAgICAgICAgICBpbWFnZU1hdGNoZXMucHVzaChDb21waWxlcnMuaW1hZ2VQcmVmaXgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXR3b3Jrcykge1xuICAgICAgICAgICAgaW1hZ2VNYXRjaGVzLnB1c2goTmV0d29yay5pbWFnZVByZWZpeCk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGhpcy5kb2NrZXIucmVtb3ZlSW1hZ2VzKGltYWdlTWF0Y2hlcywgY29udGFpbmVyc09ubHkpO1xuICAgIH1cblxuICAgIGFzeW5jIHVzZVZlcnNpb24odmVyc2lvbjogc3RyaW5nLCBzb3VyY2U6IENvbXBpbGVyc1dpdGhOZXR3b3Jrcykge1xuICAgICAgICBjb25zdCBkZWZzID0gdGhpcy5nZXREZWZzKHNvdXJjZSk7XG4gICAgICAgIGF3YWl0IHRoaXMuZG9ja2VyLnNodXRkb3duQ29udGFpbmVycyhkZWZzLCBDb250YWluZXJTdGF0dXMubWlzc2luZyk7XG4gICAgICAgIGlmIChzb3VyY2UuY29tcGlsZXJzKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBpbGVycy5zZXRDb25maWcoe1xuICAgICAgICAgICAgICAgIC4uLnRoaXMuY29tcGlsZXJzLmdldENvbmZpZygpLFxuICAgICAgICAgICAgICAgIHZlcnNpb25cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHNvdXJjZS5uZXR3b3Jrcy5mb3JFYWNoKChuZXR3b3JrKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb25maWcgPSBuZXR3b3JrLmdldENvbmZpZygpO1xuICAgICAgICAgICAgY29uZmlnLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgICAgICAgICAgbmV0d29yay5zZXRDb25maWcoY29uZmlnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2F2ZUNvbmZpZygpO1xuICAgICAgICBhd2FpdCB0aGlzLmRvY2tlci5zdGFydHVwQ29udGFpbmVycyhkZWZzLCBDb250YWluZXJTdGF0dXMucnVubmluZyk7XG4gICAgfVxuXG4gICAgLy8gQ29tcGlsZXJzXG5cbiAgICBhc3luYyBnZXRDb21waWxlcnNNb3VudGVkVG8oaG9zdFBhdGg6IHN0cmluZyk6IFByb21pc2U8e2NvbnRhaW5lcjogRG9ja2VyQ29udGFpbmVyLCBndWVzdFBhdGg6IFBhdGhKb2lufT4ge1xuICAgICAgICBsZXQgaW5mbyA9IChhd2FpdCB0aGlzLmRvY2tlci5nZXRDb250YWluZXJJbmZvcygpKS5maW5kKChpbmZvOiBEQ29udGFpbmVySW5mbykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIERldkRvY2tlci5jb250YWluZXJzSW1hZ2VNYXRjaGVkKGluZm8sIHRoaXMuY29tcGlsZXJzLnJlcXVpcmVkSW1hZ2UpXG4gICAgICAgICAgICAgICAgJiYgaW5mby5Nb3VudHMuZmluZCgobW91bnQ6IERNb3VudCkgPT4gbW91bnQuU291cmNlLnRvTG93ZXJDYXNlKCkgPT09IGhvc3RQYXRoLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGNvbnRhaW5lcjogRG9ja2VyQ29udGFpbmVyO1xuICAgICAgICBpZiAoaW5mbykge1xuICAgICAgICAgICAgY29udGFpbmVyID0gdGhpcy5kb2NrZXIuY2xpZW50LmdldENvbnRhaW5lcihpbmZvLklkKTtcbiAgICAgICAgICAgIGlmICghRGV2RG9ja2VyLmlzUnVubmluZyhpbmZvKSkge1xuICAgICAgICAgICAgICAgIGF3YWl0IGNvbnRhaW5lci5zdGFydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udGFpbmVyID0gYXdhaXQgdGhpcy5jb21waWxlcnMuY3JlYXRlQ29udGFpbmVyTW91bnRlZFRvKGhvc3RQYXRoLCB0aGlzLmRvY2tlcik7XG4gICAgICAgICAgICBhd2FpdCBjb250YWluZXIuc3RhcnQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29udGFpbmVyLFxuICAgICAgICAgICAgZ3Vlc3RQYXRoOiBiaW5kUGF0aEpvaW5Ubyh0aGlzLmNvbXBpbGVycy5tb3VudERlc3RpbmF0aW9uLCAnLycpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gTmV0d29ya3NcblxuICAgIGVuc3VyZU5ldHdvcmsobmFtZTogc3RyaW5nKTogTmV0d29yayB7XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nID0gdGhpcy5uZXR3b3Jrcy5maW5kKHggPT4geC5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgIGlmIChleGlzdGluZykge1xuICAgICAgICAgICAgcmV0dXJuIGV4aXN0aW5nO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5ldHdvcmsgPSBuZXcgTmV0d29yayh7XG4gICAgICAgICAgICAuLi5OZXR3b3JrLmRlZmF1bHRDb25maWcsXG4gICAgICAgICAgICBuYW1lXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm5ldHdvcmtzLnB1c2gobmV0d29yayk7XG4gICAgICAgIHJldHVybiBuZXR3b3JrO1xuICAgIH1cblxuICAgIGNoZWNrVW5pcXVlTmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMubmV0d29ya3MuZmluZCh4ID0+IHgubmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5ldHdvcmsgd2l0aCBuYW1lIFske25hbWV9XSBhbHJlYWR5IGV4aXN0c2ApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkTmV0d29ya3MobmFtZXM6IHN0cmluZ1tdKSB7XG4gICAgICAgIG5hbWVzLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tVbmlxdWVOYW1lKG5hbWUpO1xuICAgICAgICAgICAgY29uc3QgbmV0d29yayA9IG5ldyBOZXR3b3JrKHtcbiAgICAgICAgICAgICAgICAuLi5OZXR3b3JrLmRlZmF1bHRDb25maWcsXG4gICAgICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLm5ldHdvcmtzLnB1c2gobmV0d29yayk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNhdmVDb25maWcoKTtcbiAgICB9XG5cblxuICAgIGFzeW5jIHJlbW92ZU5ldHdvcmtzKG5ldHdvcmtzOiBOZXR3b3JrW10pIHtcbiAgICAgICAgYXdhaXQgdGhpcy5kb2NrZXIuc2h1dGRvd25Db250YWluZXJzKG5ldHdvcmtzLCBDb250YWluZXJTdGF0dXMubWlzc2luZyk7XG4gICAgICAgIG5ldHdvcmtzLmZvckVhY2goKG5ldHdvcmspID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5uZXR3b3Jrcy5maW5kSW5kZXgoeCA9PiB4ID09PSBuZXR3b3JrKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXR3b3Jrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zYXZlQ29uZmlnKCk7XG4gICAgfVxuXG5cbiAgICBhc3luYyB1cGRhdGVOZXR3b3JrQ29uZmlncyhuZXR3b3JrczogTmV0d29ya1tdLCB1cGRhdGU6IChjb25maWc6IE5ldHdvcmtDb25maWcpID0+IHZvaWQpIHtcbiAgICAgICAgY29uc3QgZGVmcyA9IFsuLi5uZXR3b3Jrc107XG4gICAgICAgIGF3YWl0IHRoaXMuZG9ja2VyLnNodXRkb3duQ29udGFpbmVycyhkZWZzLCBDb250YWluZXJTdGF0dXMubWlzc2luZyk7XG4gICAgICAgIG5ldHdvcmtzLmZvckVhY2goKG5ldHdvcmspID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IG5ldHdvcmsuZ2V0Q29uZmlnKCk7XG4gICAgICAgICAgICBjb25zdCBzYXZlTmFtZSA9IGNvbmZpZy5uYW1lO1xuICAgICAgICAgICAgdXBkYXRlKGNvbmZpZyk7XG4gICAgICAgICAgICBpZiAoY29uZmlnLm5hbWUudG9Mb3dlckNhc2UoKSAhPT0gc2F2ZU5hbWUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tVbmlxdWVOYW1lKGNvbmZpZy5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ldHdvcmsuc2V0Q29uZmlnKGNvbmZpZylcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2F2ZUNvbmZpZygpO1xuICAgICAgICBhd2FpdCB0aGlzLmRvY2tlci5zdGFydHVwQ29udGFpbmVycyhkZWZzLCBDb250YWluZXJTdGF0dXMucnVubmluZyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzRGV2Q29udGFpbmVyKGluZm86IERDb250YWluZXJJbmZvKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBEZXZEb2NrZXIuY29udGFpbmVyc0ltYWdlTWF0Y2hlZChpbmZvLCBDb21waWxlcnMuaW1hZ2VQcmVmaXgpXG4gICAgICAgICAgICB8fCBEZXZEb2NrZXIuY29udGFpbmVyc0ltYWdlTWF0Y2hlZChpbmZvLCBOZXR3b3JrLmltYWdlUHJlZml4KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNEZXZJbWFnZShpbmZvOiBESW1hZ2VJbmZvKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBEZXZEb2NrZXIuaW1hZ2VIYXNNYXRjaGVkTmFtZShpbmZvLCBDb21waWxlcnMuaW1hZ2VQcmVmaXgpXG4gICAgICAgICAgICB8fCBEZXZEb2NrZXIuaW1hZ2VIYXNNYXRjaGVkTmFtZShpbmZvLCBOZXR3b3JrLmltYWdlUHJlZml4KTtcbiAgICB9XG59XG5cbmV4cG9ydCB7IERldiB9O1xuIl19