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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZXYuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwicGF0aCIsImV4Y2x1ZGVDb21waWxlcnMiLCJkZXYiLCJkZWZzIiwiZmlsdGVyIiwieCIsImNvbXBpbGVycyIsIkRldiIsImltYWdlcyIsImFncmVlbWVudFJlcXVpcmVkIiwiZmluZCIsImlzRGV2SW1hZ2UiLCJfcmVwb1RhZyIsImxpY2Vuc2UiLCJyZWFkRmlsZVN5bmMiLCJqb2luIiwiX19kaXJuYW1lIiwidG9TdHJpbmciLCJzcGxpdCIsIm1hcCIsImJyZWFrV29yZHMiLCJjb25zb2xlIiwibG9nIiwicHJvY2VzcyIsInN0ZG91dCIsIndyaXRlIiwidGV4dHMiLCJhZ3JlZW1lbnRDb25maXJtYXRpb24iLCJhbnN3ZXIiLCJ0cmltIiwidG9Mb3dlckNhc2UiLCJhZ3JlZW1lbnRSZWplY3RlZCIsImV4aXQiLCJhZ3JlZW1lbnRBY2NlcHRlZCIsIm5hbWUiLCJ2ZXJzaW9uIiwiZG9ja2VyIiwiRGV2RG9ja2VyIiwib25TdGFydHVwSW1hZ2VzIiwib25CZWZvcmVQdWxsIiwiQ29tcGlsZXJzIiwiZGVmYXVsdENvbmZpZyIsIm5ldHdvcmtzIiwiTmV0d29yayIsImNvbmZpZ0ZpbGVQYXRoIiwibWtkaXJTeW5jIiwicmVjdXJzaXZlIiwibG9hZENvbmZpZyIsImNvbmZpZyIsIkpTT04iLCJwYXJzZSIsImVuY29kaW5nIiwic2V0Q29uZmlnIiwiZ2V0Q29uZmlnIiwid3JpdGVGaWxlU3luYyIsInN0cmluZ2lmeSIsIm5hbWVzIiwibmV0d29yayIsIkVycm9yIiwibGVuZ3RoIiwibmV0d29ya3NGcm9tTmFtZXMiLCJzb3VyY2UiLCJjb25jYXQiLCJzdGFydHVwQ29udGFpbmVycyIsImdldERlZnMiLCJDb250YWluZXJTdGF0dXMiLCJydW5uaW5nIiwic2h1dGRvd25Db250YWluZXJzIiwiY3JlYXRlZCIsIm1pc3NpbmciLCJjb250YWluZXJzT25seSIsImltYWdlTWF0Y2hlcyIsInB1c2giLCJpbWFnZVByZWZpeCIsInJlbW92ZUltYWdlcyIsImZvckVhY2giLCJzYXZlQ29uZmlnIiwiaG9zdFBhdGgiLCJnZXRDb250YWluZXJJbmZvcyIsImluZm8iLCJjb250YWluZXJzSW1hZ2VNYXRjaGVkIiwicmVxdWlyZWRJbWFnZSIsIk1vdW50cyIsIm1vdW50IiwiU291cmNlIiwiY29udGFpbmVyIiwiY2xpZW50IiwiZ2V0Q29udGFpbmVyIiwiSWQiLCJpc1J1bm5pbmciLCJzdGFydCIsImNyZWF0ZUNvbnRhaW5lck1vdW50ZWRUbyIsImd1ZXN0UGF0aCIsIm1vdW50RGVzdGluYXRpb24iLCJleGlzdGluZyIsImNoZWNrVW5pcXVlTmFtZSIsImluZGV4IiwiZmluZEluZGV4Iiwic3BsaWNlIiwidXBkYXRlIiwic2F2ZU5hbWUiLCJpbWFnZUhhc01hdGNoZWROYW1lIiwiT2JqZWN0IiwiZnJlZXplIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkE7O0FBR0E7O0FBRUE7O0FBQ0E7O0FBRUE7Ozs7OztBQUVBLElBQU1BLEVBQUUsR0FBR0MsT0FBTyxDQUFDLElBQUQsQ0FBbEI7O0FBQ0EsSUFBTUMsSUFBSSxHQUFHRCxPQUFPLENBQUMsTUFBRCxDQUFwQjs7QUFZQSxTQUFTRSxnQkFBVCxDQUEwQkMsR0FBMUIsRUFBb0NDLElBQXBDLEVBQTBFO0FBQ3RFLFNBQU9BLElBQUksQ0FBQ0MsTUFBTCxDQUFZLFVBQUFDLENBQUM7QUFBQSxXQUFJQSxDQUFDLEtBQUtILEdBQUcsQ0FBQ0ksU0FBZDtBQUFBLEdBQWIsQ0FBUDtBQUNIOztJQUVLQyxHOzs7QUFhRixpQkFBYztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw4REFpQ0ksVUFBQ0MsTUFBRCxFQUEwQjtBQUN4QyxNQUFBLEtBQUksQ0FBQ0MsaUJBQUwsR0FBeUIsQ0FBQ0QsTUFBTSxDQUFDRSxJQUFQLENBQVlILEdBQUcsQ0FBQ0ksVUFBaEIsQ0FBMUI7QUFDSCxLQW5DYTtBQUFB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QUFVaUMsV0FBOUMsS0FDQXBDLGtCQUFVZ0UsbUJBQVYsQ0FBOEJ0QixJQUE5QixFQUFvQ3BDLGtCQUFROEIsV0FBNUMsQ0FEUDtBQUVIOzs7Ozs7aUNBdk9DbEUsRyxtQkFDZ0MrRixNQUFNLENBQUNDLE1BQVAsQ0FBYztBQUM1Q2pHLEVBQUFBLFNBQVMsRUFBRWtDLHFCQUFVQyxhQUR1QjtBQUU1Q0MsRUFBQUEsUUFBUSxFQUFFLENBQUNDLGtCQUFRRixhQUFUO0FBRmtDLENBQWQsQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOC0yMDE5IFRPTiBERVYgU09MVVRJT05TIExURC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgU09GVFdBUkUgRVZBTFVBVElPTiBMaWNlbnNlICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbiAqIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxuICogTGljZW5zZSBhdDogaHR0cHM6Ly93d3cudG9uLmRldi9saWNlbnNlc1xuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgVE9OIERFViBzb2Z0d2FyZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbi8vIEBmbG93XG5cbmltcG9ydCB7IENvbXBpbGVycyB9IGZyb20gXCIuL2NvbXBpbGVycy9jb21waWxlcnNcIjtcbmltcG9ydCB0eXBlIHsgQ29tcGlsZXJzQ29uZmlnIH0gZnJvbSBcIi4vY29tcGlsZXJzL2NvbXBpbGVyc1wiO1xuaW1wb3J0IHR5cGUgeyBOZXR3b3JrQ29uZmlnIH0gZnJvbSBcIi4vbmV0d29ya3MvbmV0d29ya3NcIjtcbmltcG9ydCB7IE5ldHdvcmsgfSBmcm9tIFwiLi9uZXR3b3Jrcy9uZXR3b3Jrc1wiO1xuaW1wb3J0IHR5cGUgeyBDb250YWluZXJEZWYsIERDb250YWluZXJJbmZvLCBESW1hZ2VJbmZvLCBETW91bnQsIERvY2tlckNvbnRhaW5lciB9IGZyb20gXCIuL3V0aWxzL2RvY2tlclwiO1xuaW1wb3J0IHsgQ29udGFpbmVyU3RhdHVzLCBEZXZEb2NrZXIgfSBmcm9tIFwiLi91dGlscy9kb2NrZXJcIjtcbmltcG9ydCB7IHRleHRzIH0gZnJvbSBcIi4vdXRpbHMvdGV4dHNcIjtcbmltcG9ydCB0eXBlIHsgUGF0aEpvaW4gfSBmcm9tIFwiLi91dGlscy91dGlsc1wiO1xuaW1wb3J0IHsgYmluZFBhdGhKb2luVG8sIGJyZWFrV29yZHMsIGlucHV0TGluZSwgdG9ubGFic0hvbWVQYXRoLCB2ZXJzaW9uIH0gZnJvbSBcIi4vdXRpbHMvdXRpbHNcIjtcblxuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcblxudHlwZSBEZXZDb25maWcgPSB7XG4gICAgY29tcGlsZXJzOiBDb21waWxlcnNDb25maWcsXG4gICAgbmV0d29ya3M6IE5ldHdvcmtDb25maWdbXSxcbn07XG5cbmV4cG9ydCB0eXBlIENvbXBpbGVyc1dpdGhOZXR3b3JrcyA9IHtcbiAgICBjb21waWxlcnM6IGJvb2xlYW4sXG4gICAgbmV0d29ya3M6IE5ldHdvcmtbXSxcbn1cblxuZnVuY3Rpb24gZXhjbHVkZUNvbXBpbGVycyhkZXY6IERldiwgZGVmczogQ29udGFpbmVyRGVmW10pOiBDb250YWluZXJEZWZbXSB7XG4gICAgcmV0dXJuIGRlZnMuZmlsdGVyKHggPT4geCAhPT0gZGV2LmNvbXBpbGVycyk7XG59XG5cbmNsYXNzIERldiB7XG4gICAgc3RhdGljIGRlZmF1bHRDb25maWc6IERldkNvbmZpZyA9IE9iamVjdC5mcmVlemUoe1xuICAgICAgICBjb21waWxlcnM6IENvbXBpbGVycy5kZWZhdWx0Q29uZmlnLFxuICAgICAgICBuZXR3b3JrczogW05ldHdvcmsuZGVmYXVsdENvbmZpZ10sXG4gICAgfSk7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHZlcnNpb246IHN0cmluZztcbiAgICBkb2NrZXI6IERldkRvY2tlcjtcbiAgICBuZXR3b3JrczogTmV0d29ya1tdO1xuICAgIGNvbXBpbGVyczogQ29tcGlsZXJzO1xuICAgIGFncmVlbWVudFJlcXVpcmVkOiBib29sZWFuO1xuICAgIGNvbmZpZ0ZpbGVQYXRoOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gJ3RvbmRldic7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHZlcnNpb247XG4gICAgICAgIHRoaXMuYWdyZWVtZW50UmVxdWlyZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmRvY2tlciA9IG5ldyBEZXZEb2NrZXIoKTtcbiAgICAgICAgdGhpcy5kb2NrZXIub25TdGFydHVwSW1hZ2VzID0gdGhpcy5vblN0YXJ0dXBJbWFnZXM7XG4gICAgICAgIHRoaXMuZG9ja2VyLm9uQmVmb3JlUHVsbCA9IHRoaXMub25CZWZvcmVQdWxsO1xuICAgICAgICB0aGlzLmNvbXBpbGVycyA9IG5ldyBDb21waWxlcnMoQ29tcGlsZXJzLmRlZmF1bHRDb25maWcpO1xuICAgICAgICB0aGlzLm5ldHdvcmtzID0gW25ldyBOZXR3b3JrKE5ldHdvcmsuZGVmYXVsdENvbmZpZyldO1xuICAgICAgICB0aGlzLmNvbmZpZ0ZpbGVQYXRoID0gdG9ubGFic0hvbWVQYXRoKCdjb25maWcuanNvbicpO1xuICAgICAgICBmcy5ta2RpclN5bmModG9ubGFic0hvbWVQYXRoKCksICh7IHJlY3Vyc2l2ZTogdHJ1ZSB9OiBhbnkpKTtcbiAgICAgICAgdGhpcy5sb2FkQ29uZmlnKCk7XG4gICAgfVxuXG4gICAgbG9hZENvbmZpZygpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZzogRGV2Q29uZmlnID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmModGhpcy5jb25maWdGaWxlUGF0aCwgeyBlbmNvZGluZzogJ3V0ZjgnIH0pKTtcbiAgICAgICAgICAgIHRoaXMuY29tcGlsZXJzLnNldENvbmZpZyhjb25maWcuY29tcGlsZXJzKTtcbiAgICAgICAgICAgIHRoaXMubmV0d29ya3MgPSBjb25maWcubmV0d29ya3MubWFwKHggPT4gbmV3IE5ldHdvcmsoeCkpO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgc2F2ZUNvbmZpZygpIHtcbiAgICAgICAgY29uc3QgY29uZmlnOiBEZXZDb25maWcgPSB7XG4gICAgICAgICAgICBjb21waWxlcnM6IHRoaXMuY29tcGlsZXJzLmdldENvbmZpZygpLFxuICAgICAgICAgICAgbmV0d29ya3M6IHRoaXMubmV0d29ya3MubWFwKHggPT4geC5nZXRDb25maWcoKSksXG4gICAgICAgIH07XG4gICAgICAgIGZzLm1rZGlyU3luYyh0b25sYWJzSG9tZVBhdGgoJycpLCAoeyByZWN1cnNpdmU6IHRydWUgfTogYW55KSk7XG4gICAgICAgIGZzLndyaXRlRmlsZVN5bmModGhpcy5jb25maWdGaWxlUGF0aCwgSlNPTi5zdHJpbmdpZnkoY29uZmlnKSwgeyBlbmNvZGluZzogJ3V0ZjgnIH0pO1xuICAgIH1cblxuICAgIG9uU3RhcnR1cEltYWdlcyA9IChpbWFnZXM6IERJbWFnZUluZm9bXSkgPT4ge1xuICAgICAgICB0aGlzLmFncmVlbWVudFJlcXVpcmVkID0gIWltYWdlcy5maW5kKERldi5pc0RldkltYWdlKTtcbiAgICB9O1xuXG4gICAgb25CZWZvcmVQdWxsID0gYXN5bmMgKF9yZXBvVGFnOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmFncmVlbWVudFJlcXVpcmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbGljZW5zZSA9IGZzXG4gICAgICAgICAgICAucmVhZEZpbGVTeW5jKHBhdGguam9pbihfX2Rpcm5hbWUsICcuLicsICdMSUNFTlNFJykpXG4gICAgICAgICAgICAudG9TdHJpbmcoKVxuICAgICAgICAgICAgLnNwbGl0KCdcXG4nKVxuICAgICAgICAgICAgLm1hcChicmVha1dvcmRzKS5qb2luKCdcXG4nKTtcbiAgICAgICAgY29uc29sZS5sb2cobGljZW5zZSk7XG4gICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKHRleHRzLmFncmVlbWVudENvbmZpcm1hdGlvbik7XG4gICAgICAgIGNvbnN0IGFuc3dlciA9IChhd2FpdCBpbnB1dExpbmUoKSkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmIChhbnN3ZXIgIT09ICd5ZXMnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0ZXh0cy5hZ3JlZW1lbnRSZWplY3RlZCk7XG4gICAgICAgICAgICBwcm9jZXNzLmV4aXQoMCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2codGV4dHMuYWdyZWVtZW50QWNjZXB0ZWQpO1xuICAgICAgICB0aGlzLmFncmVlbWVudFJlcXVpcmVkID0gZmFsc2U7XG4gICAgfTtcblxuICAgIG5ldHdvcmtzRnJvbU5hbWVzKG5hbWVzOiBzdHJpbmdbXSk6IE5ldHdvcmtbXSB7XG4gICAgICAgIHJldHVybiBuYW1lcy5tYXAoKG5hbWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5ldHdvcmsgPSB0aGlzLm5ldHdvcmtzLmZpbmQoeCA9PiB4Lm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgICAgIGlmICghbmV0d29yaykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTmV0d29yayBub3QgZm91bmQ6ICR7bmFtZX1gKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldHdvcms7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5ldHdvcmtzT3JBbGwobmFtZXM6IHN0cmluZ1tdKTogTmV0d29ya1tdIHtcbiAgICAgICAgcmV0dXJuIG5hbWVzLmxlbmd0aCA+IDAgPyB0aGlzLm5ldHdvcmtzRnJvbU5hbWVzKG5hbWVzKSA6IHRoaXMubmV0d29ya3M7XG4gICAgfVxuXG4gICAgZ2V0RGVmcyhzb3VyY2U6IENvbXBpbGVyc1dpdGhOZXR3b3Jrcyk6IENvbnRhaW5lckRlZltdIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZS5jb21waWxlcnMgPyBzb3VyY2UubmV0d29ya3MuY29uY2F0KHRoaXMuY29tcGlsZXJzKSA6IFsuLi5zb3VyY2UubmV0d29ya3NdO1xuICAgIH1cblxuICAgIGFzeW5jIHN0YXJ0KHNvdXJjZTogQ29tcGlsZXJzV2l0aE5ldHdvcmtzKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuZG9ja2VyLnN0YXJ0dXBDb250YWluZXJzKGV4Y2x1ZGVDb21waWxlcnModGhpcywgdGhpcy5nZXREZWZzKHNvdXJjZSkpLCBDb250YWluZXJTdGF0dXMucnVubmluZyk7XG4gICAgfVxuXG4gICAgYXN5bmMgc3RvcChzb3VyY2U6IENvbXBpbGVyc1dpdGhOZXR3b3Jrcykge1xuICAgICAgICBhd2FpdCB0aGlzLmRvY2tlci5zaHV0ZG93bkNvbnRhaW5lcnModGhpcy5nZXREZWZzKHNvdXJjZSksIENvbnRhaW5lclN0YXR1cy5jcmVhdGVkKTtcbiAgICB9XG5cbiAgICBhc3luYyByZXN0YXJ0KHNvdXJjZTogQ29tcGlsZXJzV2l0aE5ldHdvcmtzKSB7XG4gICAgICAgIGNvbnN0IGRlZnMgPSB0aGlzLmdldERlZnMoc291cmNlKTtcbiAgICAgICAgYXdhaXQgdGhpcy5kb2NrZXIuc2h1dGRvd25Db250YWluZXJzKGRlZnMsIENvbnRhaW5lclN0YXR1cy5jcmVhdGVkKTtcbiAgICAgICAgYXdhaXQgdGhpcy5kb2NrZXIuc3RhcnR1cENvbnRhaW5lcnMoZXhjbHVkZUNvbXBpbGVycyh0aGlzLCBkZWZzKSwgQ29udGFpbmVyU3RhdHVzLnJ1bm5pbmcpO1xuICAgIH1cblxuICAgIGFzeW5jIHJlY3JlYXRlKHNvdXJjZTogQ29tcGlsZXJzV2l0aE5ldHdvcmtzKSB7XG4gICAgICAgIGNvbnN0IGRlZnMgPSB0aGlzLmdldERlZnMoc291cmNlKTtcbiAgICAgICAgYXdhaXQgdGhpcy5kb2NrZXIuc2h1dGRvd25Db250YWluZXJzKGRlZnMsIENvbnRhaW5lclN0YXR1cy5taXNzaW5nKTtcbiAgICAgICAgYXdhaXQgdGhpcy5kb2NrZXIuc3RhcnR1cENvbnRhaW5lcnMoZXhjbHVkZUNvbXBpbGVycyh0aGlzLCBkZWZzKSwgQ29udGFpbmVyU3RhdHVzLmNyZWF0ZWQpO1xuICAgIH1cblxuXG4gICAgYXN5bmMgY2xlYW4oY29tcGlsZXJzOiBib29sZWFuLCBuZXR3b3JrczogYm9vbGVhbiwgY29udGFpbmVyc09ubHk6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgaW1hZ2VNYXRjaGVzID0gW107XG4gICAgICAgIGlmIChjb21waWxlcnMpIHtcbiAgICAgICAgICAgIGltYWdlTWF0Y2hlcy5wdXNoKENvbXBpbGVycy5pbWFnZVByZWZpeCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5ldHdvcmtzKSB7XG4gICAgICAgICAgICBpbWFnZU1hdGNoZXMucHVzaChOZXR3b3JrLmltYWdlUHJlZml4KTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLmRvY2tlci5yZW1vdmVJbWFnZXMoaW1hZ2VNYXRjaGVzLCBjb250YWluZXJzT25seSk7XG4gICAgfVxuXG4gICAgYXN5bmMgdXNlVmVyc2lvbih2ZXJzaW9uOiBzdHJpbmcsIHNvdXJjZTogQ29tcGlsZXJzV2l0aE5ldHdvcmtzKSB7XG4gICAgICAgIGNvbnN0IGRlZnMgPSB0aGlzLmdldERlZnMoc291cmNlKTtcbiAgICAgICAgYXdhaXQgdGhpcy5kb2NrZXIuc2h1dGRvd25Db250YWluZXJzKGRlZnMsIENvbnRhaW5lclN0YXR1cy5taXNzaW5nKTtcbiAgICAgICAgaWYgKHNvdXJjZS5jb21waWxlcnMpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcGlsZXJzLnNldENvbmZpZyh7XG4gICAgICAgICAgICAgICAgLi4udGhpcy5jb21waWxlcnMuZ2V0Q29uZmlnKCksXG4gICAgICAgICAgICAgICAgdmVyc2lvblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgc291cmNlLm5ldHdvcmtzLmZvckVhY2goKG5ldHdvcmspID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IG5ldHdvcmsuZ2V0Q29uZmlnKCk7XG4gICAgICAgICAgICBjb25maWcudmVyc2lvbiA9IHZlcnNpb247XG4gICAgICAgICAgICBuZXR3b3JrLnNldENvbmZpZyhjb25maWcpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zYXZlQ29uZmlnKCk7XG4gICAgICAgIGF3YWl0IHRoaXMuZG9ja2VyLnN0YXJ0dXBDb250YWluZXJzKGV4Y2x1ZGVDb21waWxlcnModGhpcywgZGVmcyksIENvbnRhaW5lclN0YXR1cy5ydW5uaW5nKTtcbiAgICB9XG5cbiAgICAvLyBDb21waWxlcnNcblxuICAgIGFzeW5jIGdldENvbXBpbGVyc01vdW50ZWRUbyhob3N0UGF0aDogc3RyaW5nKTogUHJvbWlzZTx7Y29udGFpbmVyOiBEb2NrZXJDb250YWluZXIsIGd1ZXN0UGF0aDogUGF0aEpvaW59PiB7XG4gICAgICAgIGxldCBpbmZvID0gKGF3YWl0IHRoaXMuZG9ja2VyLmdldENvbnRhaW5lckluZm9zKCkpLmZpbmQoKGluZm86IERDb250YWluZXJJbmZvKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gRGV2RG9ja2VyLmNvbnRhaW5lcnNJbWFnZU1hdGNoZWQoaW5mbywgdGhpcy5jb21waWxlcnMucmVxdWlyZWRJbWFnZSlcbiAgICAgICAgICAgICAgICAmJiBpbmZvLk1vdW50cy5maW5kKChtb3VudDogRE1vdW50KSA9PiBtb3VudC5Tb3VyY2UudG9Mb3dlckNhc2UoKSA9PT0gaG9zdFBhdGgudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgY29udGFpbmVyOiBEb2NrZXJDb250YWluZXI7XG4gICAgICAgIGlmIChpbmZvKSB7XG4gICAgICAgICAgICBjb250YWluZXIgPSB0aGlzLmRvY2tlci5jbGllbnQuZ2V0Q29udGFpbmVyKGluZm8uSWQpO1xuICAgICAgICAgICAgaWYgKCFEZXZEb2NrZXIuaXNSdW5uaW5nKGluZm8pKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgY29udGFpbmVyLnN0YXJ0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb250YWluZXIgPSBhd2FpdCB0aGlzLmNvbXBpbGVycy5jcmVhdGVDb250YWluZXJNb3VudGVkVG8oaG9zdFBhdGgsIHRoaXMuZG9ja2VyKTtcbiAgICAgICAgICAgIGF3YWl0IGNvbnRhaW5lci5zdGFydCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb250YWluZXIsXG4gICAgICAgICAgICBndWVzdFBhdGg6IGJpbmRQYXRoSm9pblRvKHRoaXMuY29tcGlsZXJzLm1vdW50RGVzdGluYXRpb24sICcvJylcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBOZXR3b3Jrc1xuXG4gICAgZW5zdXJlTmV0d29yayhuYW1lOiBzdHJpbmcpOiBOZXR3b3JrIHtcbiAgICAgICAgY29uc3QgZXhpc3RpbmcgPSB0aGlzLm5ldHdvcmtzLmZpbmQoeCA9PiB4Lm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgaWYgKGV4aXN0aW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZXhpc3Rpbmc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmV0d29yayA9IG5ldyBOZXR3b3JrKHtcbiAgICAgICAgICAgIC4uLk5ldHdvcmsuZGVmYXVsdENvbmZpZyxcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubmV0d29ya3MucHVzaChuZXR3b3JrKTtcbiAgICAgICAgcmV0dXJuIG5ldHdvcms7XG4gICAgfVxuXG4gICAgY2hlY2tVbmlxdWVOYW1lKG5hbWU6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5uZXR3b3Jrcy5maW5kKHggPT4geC5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTmV0d29yayB3aXRoIG5hbWUgWyR7bmFtZX1dIGFscmVhZHkgZXhpc3RzYCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGROZXR3b3JrcyhuYW1lczogc3RyaW5nW10pIHtcbiAgICAgICAgbmFtZXMuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jaGVja1VuaXF1ZU5hbWUobmFtZSk7XG4gICAgICAgICAgICBjb25zdCBuZXR3b3JrID0gbmV3IE5ldHdvcmsoe1xuICAgICAgICAgICAgICAgIC4uLk5ldHdvcmsuZGVmYXVsdENvbmZpZyxcbiAgICAgICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMubmV0d29ya3MucHVzaChuZXR3b3JrKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2F2ZUNvbmZpZygpO1xuICAgIH1cblxuXG4gICAgYXN5bmMgcmVtb3ZlTmV0d29ya3MobmV0d29ya3M6IE5ldHdvcmtbXSkge1xuICAgICAgICBhd2FpdCB0aGlzLmRvY2tlci5zaHV0ZG93bkNvbnRhaW5lcnMobmV0d29ya3MsIENvbnRhaW5lclN0YXR1cy5taXNzaW5nKTtcbiAgICAgICAgbmV0d29ya3MuZm9yRWFjaCgobmV0d29yaykgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLm5ldHdvcmtzLmZpbmRJbmRleCh4ID0+IHggPT09IG5ldHdvcmspO1xuICAgICAgICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5ldHdvcmtzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNhdmVDb25maWcoKTtcbiAgICB9XG5cblxuICAgIGFzeW5jIHVwZGF0ZU5ldHdvcmtDb25maWdzKG5ldHdvcmtzOiBOZXR3b3JrW10sIHVwZGF0ZTogKGNvbmZpZzogTmV0d29ya0NvbmZpZykgPT4gdm9pZCkge1xuICAgICAgICBjb25zdCBkZWZzID0gWy4uLm5ldHdvcmtzXTtcbiAgICAgICAgYXdhaXQgdGhpcy5kb2NrZXIuc2h1dGRvd25Db250YWluZXJzKGRlZnMsIENvbnRhaW5lclN0YXR1cy5taXNzaW5nKTtcbiAgICAgICAgbmV0d29ya3MuZm9yRWFjaCgobmV0d29yaykgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29uZmlnID0gbmV0d29yay5nZXRDb25maWcoKTtcbiAgICAgICAgICAgIGNvbnN0IHNhdmVOYW1lID0gY29uZmlnLm5hbWU7XG4gICAgICAgICAgICB1cGRhdGUoY29uZmlnKTtcbiAgICAgICAgICAgIGlmIChjb25maWcubmFtZS50b0xvd2VyQ2FzZSgpICE9PSBzYXZlTmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja1VuaXF1ZU5hbWUoY29uZmlnLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV0d29yay5zZXRDb25maWcoY29uZmlnKVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zYXZlQ29uZmlnKCk7XG4gICAgICAgIGF3YWl0IHRoaXMuZG9ja2VyLnN0YXJ0dXBDb250YWluZXJzKGRlZnMsIENvbnRhaW5lclN0YXR1cy5ydW5uaW5nKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNEZXZDb250YWluZXIoaW5mbzogRENvbnRhaW5lckluZm8pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIERldkRvY2tlci5jb250YWluZXJzSW1hZ2VNYXRjaGVkKGluZm8sIENvbXBpbGVycy5pbWFnZVByZWZpeClcbiAgICAgICAgICAgIHx8IERldkRvY2tlci5jb250YWluZXJzSW1hZ2VNYXRjaGVkKGluZm8sIE5ldHdvcmsuaW1hZ2VQcmVmaXgpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc0RldkltYWdlKGluZm86IERJbWFnZUluZm8pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIERldkRvY2tlci5pbWFnZUhhc01hdGNoZWROYW1lKGluZm8sIENvbXBpbGVycy5pbWFnZVByZWZpeClcbiAgICAgICAgICAgIHx8IERldkRvY2tlci5pbWFnZUhhc01hdGNoZWROYW1lKGluZm8sIE5ldHdvcmsuaW1hZ2VQcmVmaXgpO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgRGV2IH07XG4iXX0=