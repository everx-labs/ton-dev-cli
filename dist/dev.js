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

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var fs = require('fs');

var os = require('os');

var path = require('path');

function excludeCompilers(dev, defs) {
  return defs.filter(function (x) {
    return x !== dev.compilers;
  });
}

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
                return this.docker.startupContainers(excludeCompilers(this, this.getDefs(source)), _docker.ContainerStatus.running);

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
                return this.docker.startupContainers(excludeCompilers(this, defs), _docker.ContainerStatus.running);

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
                return this.docker.startupContainers(excludeCompilers(this, defs), _docker.ContainerStatus.created);

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
                return this.docker.startupContainers(excludeCompilers(this, defs), _docker.ContainerStatus.running);

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
    key: "hostPathToMountSource",
    value: function hostPathToMountSource(hostPath) {
      if (os.platform() !== 'win32') {
        return hostPath.toLowerCase();
      }

      return "/host_mnt/".concat(hostPath.replace(/:\\|\\/g, '/').toLowerCase());
    }
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
                    return mount.Source.toLowerCase() === _this3.hostPathToMountSource(hostPath);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZXYuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwib3MiLCJwYXRoIiwiZXhjbHVkZUNvbXBpbGVycyIsImRldiIsImRlZnMiLCJmaWx0ZXIiLCJ4IiwiY29tcGlsZXJzIiwiRGV2IiwiaW1hZ2VzIiwiYWdyZWVtZW50UmVxdWlyZWQiLCJmaW5kIiwiaXNEZXZJbWFnZSIsIl9yZXBvVGFnIiwibGljZW5zZSIsInJlYWRGaWxlU3luYyIsImpvaW4iLCJfX2Rpcm5hbWUiLCJ0b1N0cmluZyIsInNwbGl0IiwibWFwIiwiYnJlYWtXb3JkcyIsImNvbnNvbGUiLCJsb2ciLCJwcm9jZXNzIiwic3Rkb3V0Iiwid3JpdGUiLCJ0ZXh0cyIsImFncmVlbWVudENvbmZpcm1hdGlvbiIsImFuc3dlciIsInRyaW0iLCJ0b0xvd2VyQ2FzZSIsImFncmVlbWVudFJlamVjdGVkIiwiZXhpdCIsImFncmVlbWVudEFjY2VwdGVkIiwibmFtZSIsInZlcnNpb24iLCJkb2NrZXIiLCJEZXZEb2NrZXIiLCJvblN0YXJ0dXBJbWFnZXMiLCJvbkJlZm9yZVB1bGwiLCJDb21waWxlcnMiLCJkZWZhdWx0Q29uZmlnIiwibmV0d29ya3MiLCJOZXR3b3JrIiwiY29uZmlnRmlsZVBhdGgiLCJta2RpclN5bmMiLCJyZWN1cnNpdmUiLCJsb2FkQ29uZmlnIiwiY29uZmlnIiwiSlNPTiIsInBhcnNlIiwiZW5jb2RpbmciLCJzZXRDb25maWciLCJnZXRDb25maWciLCJ3cml0ZUZpbGVTeW5jIiwic3RyaW5naWZ5IiwibmFtZXMiLCJuZXR3b3JrIiwiRXJyb3IiLCJsZW5ndGgiLCJuZXR3b3Jrc0Zyb21OYW1lcyIsInNvdXJjZSIsImNvbmNhdCIsInN0YXJ0dXBDb250YWluZXJzIiwiZ2V0RGVmcyIsIkNvbnRhaW5lclN0YXR1cyIsInJ1bm5pbmciLCJzaHV0ZG93bkNvbnRhaW5lcnMiLCJjcmVhdGVkIiwibWlzc2luZyIsImNvbnRhaW5lcnNPbmx5IiwiaW1hZ2VNYXRjaGVzIiwicHVzaCIsImltYWdlUHJlZml4IiwicmVtb3ZlSW1hZ2VzIiwiZm9yRWFjaCIsInNhdmVDb25maWciLCJob3N0UGF0aCIsInBsYXRmb3JtIiwicmVwbGFjZSIsImdldENvbnRhaW5lckluZm9zIiwiaW5mbyIsImNvbnRhaW5lcnNJbWFnZU1hdGNoZWQiLCJyZXF1aXJlZEltYWdlIiwiTW91bnRzIiwibW91bnQiLCJTb3VyY2UiLCJob3N0UGF0aFRvTW91bnRTb3VyY2UiLCJjb250YWluZXIiLCJjbGllbnQiLCJnZXRDb250YWluZXIiLCJJZCIsImlzUnVubmluZyIsInN0YXJ0IiwiY3JlYXRlQ29udGFpbmVyTW91bnRlZFRvIiwiZ3Vlc3RQYXRoIiwibW91bnREZXN0aW5hdGlvbiIsImV4aXN0aW5nIiwiY2hlY2tVbmlxdWVOYW1lIiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJzcGxpY2UiLCJ1cGRhdGUiLCJzYXZlTmFtZSIsImltYWdlSGFzTWF0Y2hlZE5hbWUiLCJPYmplY3QiLCJmcmVlemUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQTs7QUFHQTs7QUFFQTs7QUFDQTs7QUFFQTs7Ozs7O0FBRUEsSUFBTUEsRUFBRSxHQUFHQyxPQUFPLENBQUMsSUFBRCxDQUFsQjs7QUFDQSxJQUFNQyxFQUFFLEdBQUdELE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQUNBLElBQU1FLElBQUksR0FBR0YsT0FBTyxDQUFDLE1BQUQsQ0FBcEI7O0FBWUEsU0FBU0csZ0JBQVQsQ0FBMEJDLEdBQTFCLEVBQW9DQyxJQUFwQyxFQUEwRTtBQUN0RSxTQUFPQSxJQUFJLENBQUNDLE1BQUwsQ0FBWSxVQUFBQyxDQUFDO0FBQUEsV0FBSUEsQ0FBQyxLQUFLSCxHQUFHLENBQUNJLFNBQWQ7QUFBQSxHQUFiLENBQVA7QUFDSDs7SUFFS0MsRzs7O0FBYUYsaUJBQWM7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsOERBaUNJLFVBQUNDLE1BQUQsRUFBMEI7QUFDeEMsTUFBQSxLQUFJLENBQUNDLGlCQUFMLEdBQXlCLENBQUNELE1BQU0sQ0FBQ0UsSUFBUCxDQUFZSCxHQUFHLENBQUNJLFVBQWhCLENBQTFCO0FBQ0gsS0FuQ2E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUNBcUNDLGlCQUFPQyxRQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG9CQUNOLEtBQUksQ0FBQ0gsaUJBREM7QUFBQTtBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUFJTEksZ0JBQUFBLE9BSkssR0FJS2hCLEVBQUUsQ0FDYmlCLFlBRFcsQ0FDRWQsSUFBSSxDQUFDZSxJQUFMLENBQVVDLFNBQVYsRUFBcUIsSUFBckIsRUFBMkIsU0FBM0IsQ0FERixFQUVYQyxRQUZXLEdBR1hDLEtBSFcsQ0FHTCxJQUhLLEVBSVhDLEdBSlcsQ0FJUEMsaUJBSk8sRUFJS0wsSUFKTCxDQUlVLElBSlYsQ0FKTDtBQVNYTSxnQkFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlULE9BQVo7QUFDQVUsZ0JBQUFBLE9BQU8sQ0FBQ0MsTUFBUixDQUFlQyxLQUFmLENBQXFCQyxhQUFNQyxxQkFBM0I7QUFWVztBQUFBLHVCQVdXLHVCQVhYOztBQUFBO0FBV0xDLGdCQUFBQSxNQVhLLGlCQVd3QkMsSUFYeEIsR0FXK0JDLFdBWC9COztBQVlYLG9CQUFJRixNQUFNLEtBQUssS0FBZixFQUFzQjtBQUNsQlAsa0JBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZSSxhQUFNSyxpQkFBbEI7QUFDQVIsa0JBQUFBLE9BQU8sQ0FBQ1MsSUFBUixDQUFhLENBQWI7QUFDSDs7QUFDRFgsZ0JBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZSSxhQUFNTyxpQkFBbEI7QUFDQSxnQkFBQSxLQUFJLENBQUN4QixpQkFBTCxHQUF5QixLQUF6Qjs7QUFqQlc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FyQ0Q7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDVixTQUFLeUIsSUFBTCxHQUFZLFFBQVo7QUFDQSxTQUFLQyxPQUFMLEdBQWVBLGNBQWY7QUFDQSxTQUFLMUIsaUJBQUwsR0FBeUIsSUFBekI7QUFDQSxTQUFLMkIsTUFBTCxHQUFjLElBQUlDLGlCQUFKLEVBQWQ7QUFDQSxTQUFLRCxNQUFMLENBQVlFLGVBQVosR0FBOEIsS0FBS0EsZUFBbkM7QUFDQSxTQUFLRixNQUFMLENBQVlHLFlBQVosR0FBMkIsS0FBS0EsWUFBaEM7QUFDQSxTQUFLakMsU0FBTCxHQUFpQixJQUFJa0Msb0JBQUosQ0FBY0EscUJBQVVDLGFBQXhCLENBQWpCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixDQUFDLElBQUlDLGlCQUFKLENBQVlBLGtCQUFRRixhQUFwQixDQUFELENBQWhCO0FBQ0EsU0FBS0csY0FBTCxHQUFzQiw0QkFBZ0IsYUFBaEIsQ0FBdEI7QUFDQS9DLElBQUFBLEVBQUUsQ0FBQ2dELFNBQUgsQ0FBYSw2QkFBYixFQUFpQztBQUFFQyxNQUFBQSxTQUFTLEVBQUU7QUFBYixLQUFqQztBQUNBLFNBQUtDLFVBQUw7QUFDSDs7OztpQ0FFWTtBQUNULFVBQUk7QUFDQSxZQUFNQyxPQUFpQixHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBV3JELEVBQUUsQ0FBQ2lCLFlBQUgsQ0FBZ0IsS0FBSzhCLGNBQXJCLEVBQXFDO0FBQUVPLFVBQUFBLFFBQVEsRUFBRTtBQUFaLFNBQXJDLENBQVgsQ0FBMUI7O0FBQ0EsYUFBSzdDLFNBQUwsQ0FBZThDLFNBQWYsQ0FBeUJKLE9BQU0sQ0FBQzFDLFNBQWhDO0FBQ0EsYUFBS29DLFFBQUwsR0FBZ0JNLE9BQU0sQ0FBQ04sUUFBUCxDQUFnQnZCLEdBQWhCLENBQW9CLFVBQUFkLENBQUM7QUFBQSxpQkFBSSxJQUFJc0MsaUJBQUosQ0FBWXRDLENBQVosQ0FBSjtBQUFBLFNBQXJCLENBQWhCO0FBQ0gsT0FKRCxDQUlFLGdCQUFNLENBQ1A7QUFFSjs7O2lDQUVZO0FBQ1QsVUFBTTJDLE1BQWlCLEdBQUc7QUFDdEIxQyxRQUFBQSxTQUFTLEVBQUUsS0FBS0EsU0FBTCxDQUFlK0MsU0FBZixFQURXO0FBRXRCWCxRQUFBQSxRQUFRLEVBQUUsS0FBS0EsUUFBTCxDQUFjdkIsR0FBZCxDQUFrQixVQUFBZCxDQUFDO0FBQUEsaUJBQUlBLENBQUMsQ0FBQ2dELFNBQUYsRUFBSjtBQUFBLFNBQW5CO0FBRlksT0FBMUI7QUFJQXhELE1BQUFBLEVBQUUsQ0FBQ2dELFNBQUgsQ0FBYSw0QkFBZ0IsRUFBaEIsQ0FBYixFQUFtQztBQUFFQyxRQUFBQSxTQUFTLEVBQUU7QUFBYixPQUFuQztBQUNBakQsTUFBQUEsRUFBRSxDQUFDeUQsYUFBSCxDQUFpQixLQUFLVixjQUF0QixFQUFzQ0ssSUFBSSxDQUFDTSxTQUFMLENBQWVQLE1BQWYsQ0FBdEMsRUFBOEQ7QUFBRUcsUUFBQUEsUUFBUSxFQUFFO0FBQVosT0FBOUQ7QUFDSDs7O3NDQTBCaUJLLEssRUFBNEI7QUFBQTs7QUFDMUMsYUFBT0EsS0FBSyxDQUFDckMsR0FBTixDQUFVLFVBQUNlLElBQUQsRUFBVTtBQUN2QixZQUFNdUIsT0FBTyxHQUFHLE1BQUksQ0FBQ2YsUUFBTCxDQUFjaEMsSUFBZCxDQUFtQixVQUFBTCxDQUFDO0FBQUEsaUJBQUlBLENBQUMsQ0FBQzZCLElBQUYsQ0FBT0osV0FBUCxPQUF5QkksSUFBSSxDQUFDSixXQUFMLEVBQTdCO0FBQUEsU0FBcEIsQ0FBaEI7O0FBQ0EsWUFBSSxDQUFDMkIsT0FBTCxFQUFjO0FBQ1YsZ0JBQU0sSUFBSUMsS0FBSiw4QkFBZ0N4QixJQUFoQyxFQUFOO0FBQ0g7O0FBQ0QsZUFBT3VCLE9BQVA7QUFDSCxPQU5NLENBQVA7QUFPSDs7O2tDQUVhRCxLLEVBQTRCO0FBQ3RDLGFBQU9BLEtBQUssQ0FBQ0csTUFBTixHQUFlLENBQWYsR0FBbUIsS0FBS0MsaUJBQUwsQ0FBdUJKLEtBQXZCLENBQW5CLEdBQW1ELEtBQUtkLFFBQS9EO0FBQ0g7Ozs0QkFFT21CLE0sRUFBK0M7QUFDbkQsYUFBT0EsTUFBTSxDQUFDdkQsU0FBUCxHQUFtQnVELE1BQU0sQ0FBQ25CLFFBQVAsQ0FBZ0JvQixNQUFoQixDQUF1QixLQUFLeEQsU0FBNUIsQ0FBbkIsdUNBQWdFdUQsTUFBTSxDQUFDbkIsUUFBdkUsQ0FBUDtBQUNIOzs7Ozs7cURBRVdtQixNOzs7Ozs7dUJBQ0YsS0FBS3pCLE1BQUwsQ0FBWTJCLGlCQUFaLENBQThCOUQsZ0JBQWdCLENBQUMsSUFBRCxFQUFPLEtBQUsrRCxPQUFMLENBQWFILE1BQWIsQ0FBUCxDQUE5QyxFQUE0RUksd0JBQWdCQyxPQUE1RixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cURBR0NMLE07Ozs7Ozt1QkFDRCxLQUFLekIsTUFBTCxDQUFZK0Isa0JBQVosQ0FBK0IsS0FBS0gsT0FBTCxDQUFhSCxNQUFiLENBQS9CLEVBQXFESSx3QkFBZ0JHLE9BQXJFLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxREFHSVAsTTs7Ozs7O0FBQ0oxRCxnQkFBQUEsSSxHQUFPLEtBQUs2RCxPQUFMLENBQWFILE1BQWIsQzs7dUJBQ1AsS0FBS3pCLE1BQUwsQ0FBWStCLGtCQUFaLENBQStCaEUsSUFBL0IsRUFBcUM4RCx3QkFBZ0JHLE9BQXJELEM7Ozs7dUJBQ0EsS0FBS2hDLE1BQUwsQ0FBWTJCLGlCQUFaLENBQThCOUQsZ0JBQWdCLENBQUMsSUFBRCxFQUFPRSxJQUFQLENBQTlDLEVBQTREOEQsd0JBQWdCQyxPQUE1RSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cURBR0tMLE07Ozs7OztBQUNMMUQsZ0JBQUFBLEksR0FBTyxLQUFLNkQsT0FBTCxDQUFhSCxNQUFiLEM7O3VCQUNQLEtBQUt6QixNQUFMLENBQVkrQixrQkFBWixDQUErQmhFLElBQS9CLEVBQXFDOEQsd0JBQWdCSSxPQUFyRCxDOzs7O3VCQUNBLEtBQUtqQyxNQUFMLENBQVkyQixpQkFBWixDQUE4QjlELGdCQUFnQixDQUFDLElBQUQsRUFBT0UsSUFBUCxDQUE5QyxFQUE0RDhELHdCQUFnQkcsT0FBNUUsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FEQUlFOUQsUyxFQUFvQm9DLFEsRUFBbUI0QixjOzs7Ozs7QUFDekNDLGdCQUFBQSxZLEdBQWUsRTs7QUFDckIsb0JBQUlqRSxTQUFKLEVBQWU7QUFDWGlFLGtCQUFBQSxZQUFZLENBQUNDLElBQWIsQ0FBa0JoQyxxQkFBVWlDLFdBQTVCO0FBQ0g7O0FBQ0Qsb0JBQUkvQixRQUFKLEVBQWM7QUFDVjZCLGtCQUFBQSxZQUFZLENBQUNDLElBQWIsQ0FBa0I3QixrQkFBUThCLFdBQTFCO0FBQ0g7Ozt1QkFDSyxLQUFLckMsTUFBTCxDQUFZc0MsWUFBWixDQUF5QkgsWUFBekIsRUFBdUNELGNBQXZDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxREFHT25DLE8sRUFBaUIwQixNOzs7Ozs7QUFDeEIxRCxnQkFBQUEsSSxHQUFPLEtBQUs2RCxPQUFMLENBQWFILE1BQWIsQzs7dUJBQ1AsS0FBS3pCLE1BQUwsQ0FBWStCLGtCQUFaLENBQStCaEUsSUFBL0IsRUFBcUM4RCx3QkFBZ0JJLE9BQXJELEM7OztBQUNOLG9CQUFJUixNQUFNLENBQUN2RCxTQUFYLEVBQXNCO0FBQ2xCLHVCQUFLQSxTQUFMLENBQWU4QyxTQUFmLG1CQUNPLEtBQUs5QyxTQUFMLENBQWUrQyxTQUFmLEVBRFA7QUFFSWxCLG9CQUFBQSxPQUFPLEVBQVBBO0FBRko7QUFJSDs7QUFDRDBCLGdCQUFBQSxNQUFNLENBQUNuQixRQUFQLENBQWdCaUMsT0FBaEIsQ0FBd0IsVUFBQ2xCLE9BQUQsRUFBYTtBQUNqQyxzQkFBTVQsTUFBTSxHQUFHUyxPQUFPLENBQUNKLFNBQVIsRUFBZjtBQUNBTCxrQkFBQUEsTUFBTSxDQUFDYixPQUFQLEdBQWlCQSxPQUFqQjtBQUNBc0Isa0JBQUFBLE9BQU8sQ0FBQ0wsU0FBUixDQUFrQkosTUFBbEI7QUFDSCxpQkFKRDtBQUtBLHFCQUFLNEIsVUFBTDs7dUJBQ00sS0FBS3hDLE1BQUwsQ0FBWTJCLGlCQUFaLENBQThCOUQsZ0JBQWdCLENBQUMsSUFBRCxFQUFPRSxJQUFQLENBQTlDLEVBQTREOEQsd0JBQWdCQyxPQUE1RSxDOzs7Ozs7Ozs7Ozs7Ozs7UUFHVjs7OzswQ0FFc0JXLFEsRUFBMEI7QUFDNUMsVUFBSTlFLEVBQUUsQ0FBQytFLFFBQUgsT0FBa0IsT0FBdEIsRUFBK0I7QUFDM0IsZUFBT0QsUUFBUSxDQUFDL0MsV0FBVCxFQUFQO0FBQ0g7O0FBQ0QsaUNBQW9CK0MsUUFBUSxDQUFDRSxPQUFULENBQWlCLFNBQWpCLEVBQTRCLEdBQTVCLEVBQWlDakQsV0FBakMsRUFBcEI7QUFDSDs7Ozs7O3FEQUUyQitDLFE7Ozs7Ozs7Ozt1QkFDTixLQUFLekMsTUFBTCxDQUFZNEMsaUJBQVosRTs7OytCQUFzQyxVQUFDQyxJQUFELEVBQTBCO0FBQzlFLHlCQUFPNUMsa0JBQVU2QyxzQkFBVixDQUFpQ0QsSUFBakMsRUFBdUMsTUFBSSxDQUFDM0UsU0FBTCxDQUFlNkUsYUFBdEQsS0FDQUYsSUFBSSxDQUFDRyxNQUFMLENBQVkxRSxJQUFaLENBQWlCLFVBQUMyRSxLQUFEO0FBQUEsMkJBQW1CQSxLQUFLLENBQUNDLE1BQU4sQ0FBYXhELFdBQWIsT0FBK0IsTUFBSSxDQUFDeUQscUJBQUwsQ0FBMkJWLFFBQTNCLENBQWxEO0FBQUEsbUJBQWpCLENBRFA7QUFFSCxpQjs7QUFIR0ksZ0JBQUFBLEksa0JBQStDdkUsSTs7cUJBSy9DdUUsSTs7Ozs7QUFDQU8sZ0JBQUFBLFNBQVMsR0FBRyxLQUFLcEQsTUFBTCxDQUFZcUQsTUFBWixDQUFtQkMsWUFBbkIsQ0FBZ0NULElBQUksQ0FBQ1UsRUFBckMsQ0FBWjs7b0JBQ0t0RCxrQkFBVXVELFNBQVYsQ0FBb0JYLElBQXBCLEM7Ozs7Ozt1QkFDS08sU0FBUyxDQUFDSyxLQUFWLEU7Ozs7Ozs7O3VCQUdRLEtBQUt2RixTQUFMLENBQWV3Rix3QkFBZixDQUF3Q2pCLFFBQXhDLEVBQWtELEtBQUt6QyxNQUF2RCxDOzs7QUFBbEJvRCxnQkFBQUEsUzs7dUJBQ01BLFNBQVMsQ0FBQ0ssS0FBVixFOzs7a0RBRUg7QUFDSEwsa0JBQUFBLFNBQVMsRUFBVEEsU0FERztBQUVITyxrQkFBQUEsU0FBUyxFQUFFLDJCQUFlLEtBQUt6RixTQUFMLENBQWUwRixnQkFBOUIsRUFBZ0QsR0FBaEQ7QUFGUixpQjs7Ozs7Ozs7Ozs7Ozs7O1FBTVg7Ozs7a0NBRWM5RCxJLEVBQXVCO0FBQ2pDLFVBQU0rRCxRQUFRLEdBQUcsS0FBS3ZELFFBQUwsQ0FBY2hDLElBQWQsQ0FBbUIsVUFBQUwsQ0FBQztBQUFBLGVBQUlBLENBQUMsQ0FBQzZCLElBQUYsQ0FBT0osV0FBUCxPQUF5QkksSUFBSSxDQUFDSixXQUFMLEVBQTdCO0FBQUEsT0FBcEIsQ0FBakI7O0FBQ0EsVUFBSW1FLFFBQUosRUFBYztBQUNWLGVBQU9BLFFBQVA7QUFDSDs7QUFDRCxVQUFNeEMsT0FBTyxHQUFHLElBQUlkLGlCQUFKLG1CQUNUQSxrQkFBUUYsYUFEQztBQUVaUCxRQUFBQSxJQUFJLEVBQUpBO0FBRlksU0FBaEI7QUFJQSxXQUFLUSxRQUFMLENBQWM4QixJQUFkLENBQW1CZixPQUFuQjtBQUNBLGFBQU9BLE9BQVA7QUFDSDs7O29DQUVldkIsSSxFQUFjO0FBQzFCLFVBQUksS0FBS1EsUUFBTCxDQUFjaEMsSUFBZCxDQUFtQixVQUFBTCxDQUFDO0FBQUEsZUFBSUEsQ0FBQyxDQUFDNkIsSUFBRixDQUFPSixXQUFQLE9BQXlCSSxJQUFJLENBQUNKLFdBQUwsRUFBN0I7QUFBQSxPQUFwQixDQUFKLEVBQTBFO0FBQ3RFLGNBQU0sSUFBSTRCLEtBQUosOEJBQWdDeEIsSUFBaEMsc0JBQU47QUFDSDtBQUNKOzs7Z0NBRVdzQixLLEVBQWlCO0FBQUE7O0FBQ3pCQSxNQUFBQSxLQUFLLENBQUNtQixPQUFOLENBQWMsVUFBQ3pDLElBQUQsRUFBVTtBQUNwQixRQUFBLE1BQUksQ0FBQ2dFLGVBQUwsQ0FBcUJoRSxJQUFyQjs7QUFDQSxZQUFNdUIsT0FBTyxHQUFHLElBQUlkLGlCQUFKLG1CQUNUQSxrQkFBUUYsYUFEQztBQUVaUCxVQUFBQSxJQUFJLEVBQUpBO0FBRlksV0FBaEI7O0FBSUEsUUFBQSxNQUFJLENBQUNRLFFBQUwsQ0FBYzhCLElBQWQsQ0FBbUJmLE9BQW5CO0FBQ0gsT0FQRDtBQVFBLFdBQUttQixVQUFMO0FBQ0g7Ozs7OztxREFHb0JsQyxROzs7Ozs7Ozt1QkFDWCxLQUFLTixNQUFMLENBQVkrQixrQkFBWixDQUErQnpCLFFBQS9CLEVBQXlDdUIsd0JBQWdCSSxPQUF6RCxDOzs7QUFDTjNCLGdCQUFBQSxRQUFRLENBQUNpQyxPQUFULENBQWlCLFVBQUNsQixPQUFELEVBQWE7QUFDMUIsc0JBQU0wQyxLQUFLLEdBQUcsTUFBSSxDQUFDekQsUUFBTCxDQUFjMEQsU0FBZCxDQUF3QixVQUFBL0YsQ0FBQztBQUFBLDJCQUFJQSxDQUFDLEtBQUtvRCxPQUFWO0FBQUEsbUJBQXpCLENBQWQ7O0FBQ0Esc0JBQUkwQyxLQUFLLElBQUksQ0FBYixFQUFnQjtBQUNaLG9CQUFBLE1BQUksQ0FBQ3pELFFBQUwsQ0FBYzJELE1BQWQsQ0FBcUJGLEtBQXJCLEVBQTRCLENBQTVCO0FBQ0g7QUFDSixpQkFMRDtBQU1BLHFCQUFLdkIsVUFBTDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3NEQUl1QmxDLFEsRUFBcUI0RCxNOzs7Ozs7OztBQUN0Q25HLGdCQUFBQSxJLHVDQUFXdUMsUTs7dUJBQ1gsS0FBS04sTUFBTCxDQUFZK0Isa0JBQVosQ0FBK0JoRSxJQUEvQixFQUFxQzhELHdCQUFnQkksT0FBckQsQzs7O0FBQ04zQixnQkFBQUEsUUFBUSxDQUFDaUMsT0FBVCxDQUFpQixVQUFDbEIsT0FBRCxFQUFhO0FBQzFCLHNCQUFNVCxNQUFNLEdBQUdTLE9BQU8sQ0FBQ0osU0FBUixFQUFmO0FBQ0Esc0JBQU1rRCxRQUFRLEdBQUd2RCxNQUFNLENBQUNkLElBQXhCO0FBQ0FvRSxrQkFBQUEsTUFBTSxDQUFDdEQsTUFBRCxDQUFOOztBQUNBLHNCQUFJQSxNQUFNLENBQUNkLElBQVAsQ0FBWUosV0FBWixPQUE4QnlFLFFBQVEsQ0FBQ3pFLFdBQVQsRUFBbEMsRUFBMEQ7QUFDdEQsb0JBQUEsTUFBSSxDQUFDb0UsZUFBTCxDQUFxQmxELE1BQU0sQ0FBQ2QsSUFBNUI7QUFDSDs7QUFDRHVCLGtCQUFBQSxPQUFPLENBQUNMLFNBQVIsQ0FBa0JKLE1BQWxCO0FBQ0gsaUJBUkQ7QUFTQSxxQkFBSzRCLFVBQUw7O3VCQUNNLEtBQUt4QyxNQUFMLENBQVkyQixpQkFBWixDQUE4QjVELElBQTlCLEVBQW9DOEQsd0JBQWdCQyxPQUFwRCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7bUNBR1llLEksRUFBK0I7QUFDakQsYUFBTzVDLGtCQUFVNkMsc0JBQVYsQ0FBaUNELElBQWpDLEVBQXVDekMscUJBQVVpQyxXQUFqRCxLQUNBcEMsa0JBQVU2QyxzQkFBVixDQUFpQ0QsSUFBakMsRUFBdUN0QyxrQkFBUThCLFdBQS9DLENBRFA7QUFFSDs7OytCQUVpQlEsSSxFQUEyQjtBQUN6QyxhQUFPNUMsa0JBQVVtRSxtQkFBVixDQUE4QnZCLElBQTlCLEVBQW9DekMscUJBQVVpQyxXQUE5QyxLQUNBcEMsa0JBQVVtRSxtQkFBVixDQUE4QnZCLElBQTlCLEVBQW9DdEMsa0JBQVE4QixXQUE1QyxDQURQO0FBRUg7Ozs7OztpQ0E5T0NsRSxHLG1CQUNnQ2tHLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjO0FBQzVDcEcsRUFBQUEsU0FBUyxFQUFFa0MscUJBQVVDLGFBRHVCO0FBRTVDQyxFQUFBQSxRQUFRLEVBQUUsQ0FBQ0Msa0JBQVFGLGFBQVQ7QUFGa0MsQ0FBZCxDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMjAgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuLy8gQGZsb3dcblxuaW1wb3J0IHsgQ29tcGlsZXJzIH0gZnJvbSBcIi4vY29tcGlsZXJzL2NvbXBpbGVyc1wiO1xuaW1wb3J0IHR5cGUgeyBDb21waWxlcnNDb25maWcgfSBmcm9tIFwiLi9jb21waWxlcnMvY29tcGlsZXJzXCI7XG5pbXBvcnQgdHlwZSB7IE5ldHdvcmtDb25maWcgfSBmcm9tIFwiLi9uZXR3b3Jrcy9uZXR3b3Jrc1wiO1xuaW1wb3J0IHsgTmV0d29yayB9IGZyb20gXCIuL25ldHdvcmtzL25ldHdvcmtzXCI7XG5pbXBvcnQgdHlwZSB7IENvbnRhaW5lckRlZiwgRENvbnRhaW5lckluZm8sIERJbWFnZUluZm8sIERNb3VudCwgRG9ja2VyQ29udGFpbmVyIH0gZnJvbSBcIi4vdXRpbHMvZG9ja2VyXCI7XG5pbXBvcnQgeyBDb250YWluZXJTdGF0dXMsIERldkRvY2tlciB9IGZyb20gXCIuL3V0aWxzL2RvY2tlclwiO1xuaW1wb3J0IHsgdGV4dHMgfSBmcm9tIFwiLi91dGlscy90ZXh0c1wiO1xuaW1wb3J0IHR5cGUgeyBQYXRoSm9pbiB9IGZyb20gXCIuL3V0aWxzL3V0aWxzXCI7XG5pbXBvcnQgeyBiaW5kUGF0aEpvaW5UbywgYnJlYWtXb3JkcywgaW5wdXRMaW5lLCB0b25sYWJzSG9tZVBhdGgsIHZlcnNpb24gfSBmcm9tIFwiLi91dGlscy91dGlsc1wiO1xuXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5jb25zdCBvcyA9IHJlcXVpcmUoJ29zJyk7XG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuXG50eXBlIERldkNvbmZpZyA9IHtcbiAgICBjb21waWxlcnM6IENvbXBpbGVyc0NvbmZpZyxcbiAgICBuZXR3b3JrczogTmV0d29ya0NvbmZpZ1tdLFxufTtcblxuZXhwb3J0IHR5cGUgQ29tcGlsZXJzV2l0aE5ldHdvcmtzID0ge1xuICAgIGNvbXBpbGVyczogYm9vbGVhbixcbiAgICBuZXR3b3JrczogTmV0d29ya1tdLFxufVxuXG5mdW5jdGlvbiBleGNsdWRlQ29tcGlsZXJzKGRldjogRGV2LCBkZWZzOiBDb250YWluZXJEZWZbXSk6IENvbnRhaW5lckRlZltdIHtcbiAgICByZXR1cm4gZGVmcy5maWx0ZXIoeCA9PiB4ICE9PSBkZXYuY29tcGlsZXJzKTtcbn1cblxuY2xhc3MgRGV2IHtcbiAgICBzdGF0aWMgZGVmYXVsdENvbmZpZzogRGV2Q29uZmlnID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgICAgIGNvbXBpbGVyczogQ29tcGlsZXJzLmRlZmF1bHRDb25maWcsXG4gICAgICAgIG5ldHdvcmtzOiBbTmV0d29yay5kZWZhdWx0Q29uZmlnXSxcbiAgICB9KTtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgdmVyc2lvbjogc3RyaW5nO1xuICAgIGRvY2tlcjogRGV2RG9ja2VyO1xuICAgIG5ldHdvcmtzOiBOZXR3b3JrW107XG4gICAgY29tcGlsZXJzOiBDb21waWxlcnM7XG4gICAgYWdyZWVtZW50UmVxdWlyZWQ6IGJvb2xlYW47XG4gICAgY29uZmlnRmlsZVBhdGg6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm5hbWUgPSAndG9uZGV2JztcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICAgICAgdGhpcy5hZ3JlZW1lbnRSZXF1aXJlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuZG9ja2VyID0gbmV3IERldkRvY2tlcigpO1xuICAgICAgICB0aGlzLmRvY2tlci5vblN0YXJ0dXBJbWFnZXMgPSB0aGlzLm9uU3RhcnR1cEltYWdlcztcbiAgICAgICAgdGhpcy5kb2NrZXIub25CZWZvcmVQdWxsID0gdGhpcy5vbkJlZm9yZVB1bGw7XG4gICAgICAgIHRoaXMuY29tcGlsZXJzID0gbmV3IENvbXBpbGVycyhDb21waWxlcnMuZGVmYXVsdENvbmZpZyk7XG4gICAgICAgIHRoaXMubmV0d29ya3MgPSBbbmV3IE5ldHdvcmsoTmV0d29yay5kZWZhdWx0Q29uZmlnKV07XG4gICAgICAgIHRoaXMuY29uZmlnRmlsZVBhdGggPSB0b25sYWJzSG9tZVBhdGgoJ2NvbmZpZy5qc29uJyk7XG4gICAgICAgIGZzLm1rZGlyU3luYyh0b25sYWJzSG9tZVBhdGgoKSwgKHsgcmVjdXJzaXZlOiB0cnVlIH06IGFueSkpO1xuICAgICAgICB0aGlzLmxvYWRDb25maWcoKTtcbiAgICB9XG5cbiAgICBsb2FkQ29uZmlnKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgY29uZmlnOiBEZXZDb25maWcgPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyh0aGlzLmNvbmZpZ0ZpbGVQYXRoLCB7IGVuY29kaW5nOiAndXRmOCcgfSkpO1xuICAgICAgICAgICAgdGhpcy5jb21waWxlcnMuc2V0Q29uZmlnKGNvbmZpZy5jb21waWxlcnMpO1xuICAgICAgICAgICAgdGhpcy5uZXR3b3JrcyA9IGNvbmZpZy5uZXR3b3Jrcy5tYXAoeCA9PiBuZXcgTmV0d29yayh4KSk7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBzYXZlQ29uZmlnKCkge1xuICAgICAgICBjb25zdCBjb25maWc6IERldkNvbmZpZyA9IHtcbiAgICAgICAgICAgIGNvbXBpbGVyczogdGhpcy5jb21waWxlcnMuZ2V0Q29uZmlnKCksXG4gICAgICAgICAgICBuZXR3b3JrczogdGhpcy5uZXR3b3Jrcy5tYXAoeCA9PiB4LmdldENvbmZpZygpKSxcbiAgICAgICAgfTtcbiAgICAgICAgZnMubWtkaXJTeW5jKHRvbmxhYnNIb21lUGF0aCgnJyksICh7IHJlY3Vyc2l2ZTogdHJ1ZSB9OiBhbnkpKTtcbiAgICAgICAgZnMud3JpdGVGaWxlU3luYyh0aGlzLmNvbmZpZ0ZpbGVQYXRoLCBKU09OLnN0cmluZ2lmeShjb25maWcpLCB7IGVuY29kaW5nOiAndXRmOCcgfSk7XG4gICAgfVxuXG4gICAgb25TdGFydHVwSW1hZ2VzID0gKGltYWdlczogREltYWdlSW5mb1tdKSA9PiB7XG4gICAgICAgIHRoaXMuYWdyZWVtZW50UmVxdWlyZWQgPSAhaW1hZ2VzLmZpbmQoRGV2LmlzRGV2SW1hZ2UpO1xuICAgIH07XG5cbiAgICBvbkJlZm9yZVB1bGwgPSBhc3luYyAoX3JlcG9UYWc6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICBpZiAoIXRoaXMuYWdyZWVtZW50UmVxdWlyZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsaWNlbnNlID0gZnNcbiAgICAgICAgICAgIC5yZWFkRmlsZVN5bmMocGF0aC5qb2luKF9fZGlybmFtZSwgJy4uJywgJ0xJQ0VOU0UnKSlcbiAgICAgICAgICAgIC50b1N0cmluZygpXG4gICAgICAgICAgICAuc3BsaXQoJ1xcbicpXG4gICAgICAgICAgICAubWFwKGJyZWFrV29yZHMpLmpvaW4oJ1xcbicpO1xuICAgICAgICBjb25zb2xlLmxvZyhsaWNlbnNlKTtcbiAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUodGV4dHMuYWdyZWVtZW50Q29uZmlybWF0aW9uKTtcbiAgICAgICAgY29uc3QgYW5zd2VyID0gKGF3YWl0IGlucHV0TGluZSgpKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKGFuc3dlciAhPT0gJ3llcycpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRleHRzLmFncmVlbWVudFJlamVjdGVkKTtcbiAgICAgICAgICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyh0ZXh0cy5hZ3JlZW1lbnRBY2NlcHRlZCk7XG4gICAgICAgIHRoaXMuYWdyZWVtZW50UmVxdWlyZWQgPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgbmV0d29ya3NGcm9tTmFtZXMobmFtZXM6IHN0cmluZ1tdKTogTmV0d29ya1tdIHtcbiAgICAgICAgcmV0dXJuIG5hbWVzLm1hcCgobmFtZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmV0d29yayA9IHRoaXMubmV0d29ya3MuZmluZCh4ID0+IHgubmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICAgICAgaWYgKCFuZXR3b3JrKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOZXR3b3JrIG5vdCBmb3VuZDogJHtuYW1lfWApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV0d29yaztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmV0d29ya3NPckFsbChuYW1lczogc3RyaW5nW10pOiBOZXR3b3JrW10ge1xuICAgICAgICByZXR1cm4gbmFtZXMubGVuZ3RoID4gMCA/IHRoaXMubmV0d29ya3NGcm9tTmFtZXMobmFtZXMpIDogdGhpcy5uZXR3b3JrcztcbiAgICB9XG5cbiAgICBnZXREZWZzKHNvdXJjZTogQ29tcGlsZXJzV2l0aE5ldHdvcmtzKTogQ29udGFpbmVyRGVmW10ge1xuICAgICAgICByZXR1cm4gc291cmNlLmNvbXBpbGVycyA/IHNvdXJjZS5uZXR3b3Jrcy5jb25jYXQodGhpcy5jb21waWxlcnMpIDogWy4uLnNvdXJjZS5uZXR3b3Jrc107XG4gICAgfVxuXG4gICAgYXN5bmMgc3RhcnQoc291cmNlOiBDb21waWxlcnNXaXRoTmV0d29ya3MpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5kb2NrZXIuc3RhcnR1cENvbnRhaW5lcnMoZXhjbHVkZUNvbXBpbGVycyh0aGlzLCB0aGlzLmdldERlZnMoc291cmNlKSksIENvbnRhaW5lclN0YXR1cy5ydW5uaW5nKTtcbiAgICB9XG5cbiAgICBhc3luYyBzdG9wKHNvdXJjZTogQ29tcGlsZXJzV2l0aE5ldHdvcmtzKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuZG9ja2VyLnNodXRkb3duQ29udGFpbmVycyh0aGlzLmdldERlZnMoc291cmNlKSwgQ29udGFpbmVyU3RhdHVzLmNyZWF0ZWQpO1xuICAgIH1cblxuICAgIGFzeW5jIHJlc3RhcnQoc291cmNlOiBDb21waWxlcnNXaXRoTmV0d29ya3MpIHtcbiAgICAgICAgY29uc3QgZGVmcyA9IHRoaXMuZ2V0RGVmcyhzb3VyY2UpO1xuICAgICAgICBhd2FpdCB0aGlzLmRvY2tlci5zaHV0ZG93bkNvbnRhaW5lcnMoZGVmcywgQ29udGFpbmVyU3RhdHVzLmNyZWF0ZWQpO1xuICAgICAgICBhd2FpdCB0aGlzLmRvY2tlci5zdGFydHVwQ29udGFpbmVycyhleGNsdWRlQ29tcGlsZXJzKHRoaXMsIGRlZnMpLCBDb250YWluZXJTdGF0dXMucnVubmluZyk7XG4gICAgfVxuXG4gICAgYXN5bmMgcmVjcmVhdGUoc291cmNlOiBDb21waWxlcnNXaXRoTmV0d29ya3MpIHtcbiAgICAgICAgY29uc3QgZGVmcyA9IHRoaXMuZ2V0RGVmcyhzb3VyY2UpO1xuICAgICAgICBhd2FpdCB0aGlzLmRvY2tlci5zaHV0ZG93bkNvbnRhaW5lcnMoZGVmcywgQ29udGFpbmVyU3RhdHVzLm1pc3NpbmcpO1xuICAgICAgICBhd2FpdCB0aGlzLmRvY2tlci5zdGFydHVwQ29udGFpbmVycyhleGNsdWRlQ29tcGlsZXJzKHRoaXMsIGRlZnMpLCBDb250YWluZXJTdGF0dXMuY3JlYXRlZCk7XG4gICAgfVxuXG5cbiAgICBhc3luYyBjbGVhbihjb21waWxlcnM6IGJvb2xlYW4sIG5ldHdvcmtzOiBib29sZWFuLCBjb250YWluZXJzT25seTogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBpbWFnZU1hdGNoZXMgPSBbXTtcbiAgICAgICAgaWYgKGNvbXBpbGVycykge1xuICAgICAgICAgICAgaW1hZ2VNYXRjaGVzLnB1c2goQ29tcGlsZXJzLmltYWdlUHJlZml4KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV0d29ya3MpIHtcbiAgICAgICAgICAgIGltYWdlTWF0Y2hlcy5wdXNoKE5ldHdvcmsuaW1hZ2VQcmVmaXgpO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHRoaXMuZG9ja2VyLnJlbW92ZUltYWdlcyhpbWFnZU1hdGNoZXMsIGNvbnRhaW5lcnNPbmx5KTtcbiAgICB9XG5cbiAgICBhc3luYyB1c2VWZXJzaW9uKHZlcnNpb246IHN0cmluZywgc291cmNlOiBDb21waWxlcnNXaXRoTmV0d29ya3MpIHtcbiAgICAgICAgY29uc3QgZGVmcyA9IHRoaXMuZ2V0RGVmcyhzb3VyY2UpO1xuICAgICAgICBhd2FpdCB0aGlzLmRvY2tlci5zaHV0ZG93bkNvbnRhaW5lcnMoZGVmcywgQ29udGFpbmVyU3RhdHVzLm1pc3NpbmcpO1xuICAgICAgICBpZiAoc291cmNlLmNvbXBpbGVycykge1xuICAgICAgICAgICAgdGhpcy5jb21waWxlcnMuc2V0Q29uZmlnKHtcbiAgICAgICAgICAgICAgICAuLi50aGlzLmNvbXBpbGVycy5nZXRDb25maWcoKSxcbiAgICAgICAgICAgICAgICB2ZXJzaW9uXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBzb3VyY2UubmV0d29ya3MuZm9yRWFjaCgobmV0d29yaykgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29uZmlnID0gbmV0d29yay5nZXRDb25maWcoKTtcbiAgICAgICAgICAgIGNvbmZpZy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICAgICAgICAgIG5ldHdvcmsuc2V0Q29uZmlnKGNvbmZpZyk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNhdmVDb25maWcoKTtcbiAgICAgICAgYXdhaXQgdGhpcy5kb2NrZXIuc3RhcnR1cENvbnRhaW5lcnMoZXhjbHVkZUNvbXBpbGVycyh0aGlzLCBkZWZzKSwgQ29udGFpbmVyU3RhdHVzLnJ1bm5pbmcpO1xuICAgIH1cblxuICAgIC8vIENvbXBpbGVyc1xuXG4gICAgaG9zdFBhdGhUb01vdW50U291cmNlKGhvc3RQYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAob3MucGxhdGZvcm0oKSAhPT0gJ3dpbjMyJykge1xuICAgICAgICAgICAgcmV0dXJuIGhvc3RQYXRoLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGAvaG9zdF9tbnQvJHtob3N0UGF0aC5yZXBsYWNlKC86XFxcXHxcXFxcL2csICcvJykudG9Mb3dlckNhc2UoKX1gO1xuICAgIH1cblxuICAgIGFzeW5jIGdldENvbXBpbGVyc01vdW50ZWRUbyhob3N0UGF0aDogc3RyaW5nKTogUHJvbWlzZTx7Y29udGFpbmVyOiBEb2NrZXJDb250YWluZXIsIGd1ZXN0UGF0aDogUGF0aEpvaW59PiB7XG4gICAgICAgIGxldCBpbmZvID0gKGF3YWl0IHRoaXMuZG9ja2VyLmdldENvbnRhaW5lckluZm9zKCkpLmZpbmQoKGluZm86IERDb250YWluZXJJbmZvKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gRGV2RG9ja2VyLmNvbnRhaW5lcnNJbWFnZU1hdGNoZWQoaW5mbywgdGhpcy5jb21waWxlcnMucmVxdWlyZWRJbWFnZSlcbiAgICAgICAgICAgICAgICAmJiBpbmZvLk1vdW50cy5maW5kKChtb3VudDogRE1vdW50KSA9PiBtb3VudC5Tb3VyY2UudG9Mb3dlckNhc2UoKSA9PT0gdGhpcy5ob3N0UGF0aFRvTW91bnRTb3VyY2UoaG9zdFBhdGgpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBjb250YWluZXI6IERvY2tlckNvbnRhaW5lcjtcbiAgICAgICAgaWYgKGluZm8pIHtcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IHRoaXMuZG9ja2VyLmNsaWVudC5nZXRDb250YWluZXIoaW5mby5JZCk7XG4gICAgICAgICAgICBpZiAoIURldkRvY2tlci5pc1J1bm5pbmcoaW5mbykpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBjb250YWluZXIuc3RhcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IGF3YWl0IHRoaXMuY29tcGlsZXJzLmNyZWF0ZUNvbnRhaW5lck1vdW50ZWRUbyhob3N0UGF0aCwgdGhpcy5kb2NrZXIpO1xuICAgICAgICAgICAgYXdhaXQgY29udGFpbmVyLnN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICAgIGd1ZXN0UGF0aDogYmluZFBhdGhKb2luVG8odGhpcy5jb21waWxlcnMubW91bnREZXN0aW5hdGlvbiwgJy8nKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIE5ldHdvcmtzXG5cbiAgICBlbnN1cmVOZXR3b3JrKG5hbWU6IHN0cmluZyk6IE5ldHdvcmsge1xuICAgICAgICBjb25zdCBleGlzdGluZyA9IHRoaXMubmV0d29ya3MuZmluZCh4ID0+IHgubmFtZS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBleGlzdGluZztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuZXR3b3JrID0gbmV3IE5ldHdvcmsoe1xuICAgICAgICAgICAgLi4uTmV0d29yay5kZWZhdWx0Q29uZmlnLFxuICAgICAgICAgICAgbmFtZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5uZXR3b3Jrcy5wdXNoKG5ldHdvcmspO1xuICAgICAgICByZXR1cm4gbmV0d29yaztcbiAgICB9XG5cbiAgICBjaGVja1VuaXF1ZU5hbWUobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLm5ldHdvcmtzLmZpbmQoeCA9PiB4Lm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOZXR3b3JrIHdpdGggbmFtZSBbJHtuYW1lfV0gYWxyZWFkeSBleGlzdHNgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZE5ldHdvcmtzKG5hbWVzOiBzdHJpbmdbXSkge1xuICAgICAgICBuYW1lcy5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrVW5pcXVlTmFtZShuYW1lKTtcbiAgICAgICAgICAgIGNvbnN0IG5ldHdvcmsgPSBuZXcgTmV0d29yayh7XG4gICAgICAgICAgICAgICAgLi4uTmV0d29yay5kZWZhdWx0Q29uZmlnLFxuICAgICAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5uZXR3b3Jrcy5wdXNoKG5ldHdvcmspO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zYXZlQ29uZmlnKCk7XG4gICAgfVxuXG5cbiAgICBhc3luYyByZW1vdmVOZXR3b3JrcyhuZXR3b3JrczogTmV0d29ya1tdKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuZG9ja2VyLnNodXRkb3duQ29udGFpbmVycyhuZXR3b3JrcywgQ29udGFpbmVyU3RhdHVzLm1pc3NpbmcpO1xuICAgICAgICBuZXR3b3Jrcy5mb3JFYWNoKChuZXR3b3JrKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMubmV0d29ya3MuZmluZEluZGV4KHggPT4geCA9PT0gbmV0d29yayk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMubmV0d29ya3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2F2ZUNvbmZpZygpO1xuICAgIH1cblxuXG4gICAgYXN5bmMgdXBkYXRlTmV0d29ya0NvbmZpZ3MobmV0d29ya3M6IE5ldHdvcmtbXSwgdXBkYXRlOiAoY29uZmlnOiBOZXR3b3JrQ29uZmlnKSA9PiB2b2lkKSB7XG4gICAgICAgIGNvbnN0IGRlZnMgPSBbLi4ubmV0d29ya3NdO1xuICAgICAgICBhd2FpdCB0aGlzLmRvY2tlci5zaHV0ZG93bkNvbnRhaW5lcnMoZGVmcywgQ29udGFpbmVyU3RhdHVzLm1pc3NpbmcpO1xuICAgICAgICBuZXR3b3Jrcy5mb3JFYWNoKChuZXR3b3JrKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb25maWcgPSBuZXR3b3JrLmdldENvbmZpZygpO1xuICAgICAgICAgICAgY29uc3Qgc2F2ZU5hbWUgPSBjb25maWcubmFtZTtcbiAgICAgICAgICAgIHVwZGF0ZShjb25maWcpO1xuICAgICAgICAgICAgaWYgKGNvbmZpZy5uYW1lLnRvTG93ZXJDYXNlKCkgIT09IHNhdmVOYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrVW5pcXVlTmFtZShjb25maWcubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXR3b3JrLnNldENvbmZpZyhjb25maWcpXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNhdmVDb25maWcoKTtcbiAgICAgICAgYXdhaXQgdGhpcy5kb2NrZXIuc3RhcnR1cENvbnRhaW5lcnMoZGVmcywgQ29udGFpbmVyU3RhdHVzLnJ1bm5pbmcpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc0RldkNvbnRhaW5lcihpbmZvOiBEQ29udGFpbmVySW5mbyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gRGV2RG9ja2VyLmNvbnRhaW5lcnNJbWFnZU1hdGNoZWQoaW5mbywgQ29tcGlsZXJzLmltYWdlUHJlZml4KVxuICAgICAgICAgICAgfHwgRGV2RG9ja2VyLmNvbnRhaW5lcnNJbWFnZU1hdGNoZWQoaW5mbywgTmV0d29yay5pbWFnZVByZWZpeCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzRGV2SW1hZ2UoaW5mbzogREltYWdlSW5mbyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gRGV2RG9ja2VyLmltYWdlSGFzTWF0Y2hlZE5hbWUoaW5mbywgQ29tcGlsZXJzLmltYWdlUHJlZml4KVxuICAgICAgICAgICAgfHwgRGV2RG9ja2VyLmltYWdlSGFzTWF0Y2hlZE5hbWUoaW5mbywgTmV0d29yay5pbWFnZVByZWZpeCk7XG4gICAgfVxufVxuXG5leHBvcnQgeyBEZXYgfTtcbiJdfQ==