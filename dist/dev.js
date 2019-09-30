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
      fs.mkdirSync((0, _utils.tonlabsHomePath)(''), {
        recursive: true
      });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZXYuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwicGF0aCIsIkRldiIsImltYWdlcyIsImFncmVlbWVudFJlcXVpcmVkIiwiZmluZCIsImlzRGV2SW1hZ2UiLCJfcmVwb1RhZyIsImxpY2Vuc2UiLCJyZWFkRmlsZVN5bmMiLCJqb2luIiwiX19kaXJuYW1lIiwidG9TdHJpbmciLCJzcGxpdCIsIm1hcCIsImJyZWFrV29yZHMiLCJjb25zb2xlIiwibG9nIiwicHJvY2VzcyIsInN0ZG91dCIsIndyaXRlIiwidGV4dHMiLCJhZ3JlZW1lbnRDb25maXJtYXRpb24iLCJhbnN3ZXIiLCJ0cmltIiwidG9Mb3dlckNhc2UiLCJhZ3JlZW1lbnRSZWplY3RlZCIsImV4aXQiLCJhZ3JlZW1lbnRBY2NlcHRlZCIsIm5hbWUiLCJ2ZXJzaW9uIiwiZG9ja2VyIiwiRGV2RG9ja2VyIiwib25TdGFydHVwSW1hZ2VzIiwib25CZWZvcmVQdWxsIiwiY29tcGlsZXJzIiwiQ29tcGlsZXJzIiwiZGVmYXVsdENvbmZpZyIsIm5ldHdvcmtzIiwiTmV0d29yayIsImNvbmZpZ0ZpbGVQYXRoIiwibWtkaXJTeW5jIiwicmVjdXJzaXZlIiwibG9hZENvbmZpZyIsImNvbmZpZyIsIkpTT04iLCJwYXJzZSIsImVuY29kaW5nIiwic2V0Q29uZmlnIiwieCIsImdldENvbmZpZyIsIndyaXRlRmlsZVN5bmMiLCJzdHJpbmdpZnkiLCJzb3VyY2UiLCJjb25jYXQiLCJzdGFydHVwQ29udGFpbmVycyIsImdldERlZnMiLCJDb250YWluZXJTdGF0dXMiLCJydW5uaW5nIiwic2h1dGRvd25Db250YWluZXJzIiwiY3JlYXRlZCIsImRlZnMiLCJtaXNzaW5nIiwiZm9yRWFjaCIsIm5ldHdvcmsiLCJzYXZlQ29uZmlnIiwiZXhpc3RpbmciLCJwdXNoIiwibmFtZXMiLCJvcHRpb25zIiwibGVuZ3RoIiwiZW5zdXJlTmV0d29yayIsInNldE9wdGlvbnMiLCJpbmZvIiwiY29udGFpbmVyQmVsb25nc1RvSW1hZ2UiLCJpbWFnZVByZWZpeCIsImltYWdlSGFzUmVwb1RhZyIsIk9iamVjdCIsImZyZWV6ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBOztBQUdBOztBQUVBOztBQUNBOztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQUNBLElBQU1DLElBQUksR0FBR0QsT0FBTyxDQUFDLE1BQUQsQ0FBcEI7O0lBWU1FLEc7OztBQWFGLGlCQUFjO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDhEQWlDSSxVQUFDQyxNQUFELEVBQTBCO0FBQ3hDLE1BQUEsS0FBSSxDQUFDQyxpQkFBTCxHQUF5QixDQUFDRCxNQUFNLENBQUNFLElBQVAsQ0FBWUgsR0FBRyxDQUFDSSxVQUFoQixDQUExQjtBQUNILEtBbkNhO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1DQXFDQyxpQkFBT0MsUUFBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxvQkFDTixLQUFJLENBQUNILGlCQURDO0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBSUxJLGdCQUFBQSxPQUpLLEdBSUtULEVBQUUsQ0FDYlUsWUFEVyxDQUNFUixJQUFJLENBQUNTLElBQUwsQ0FBVUMsU0FBVixFQUFxQixJQUFyQixFQUEyQixTQUEzQixDQURGLEVBRVhDLFFBRlcsR0FHWEMsS0FIVyxDQUdMLElBSEssRUFJWEMsR0FKVyxDQUlQQyxpQkFKTyxFQUlLTCxJQUpMLENBSVUsSUFKVixDQUpMO0FBU1hNLGdCQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWVQsT0FBWjtBQUNBVSxnQkFBQUEsT0FBTyxDQUFDQyxNQUFSLENBQWVDLEtBQWYsQ0FBcUJDLGFBQU1DLHFCQUEzQjtBQVZXO0FBQUEsdUJBV1csdUJBWFg7O0FBQUE7QUFXTEMsZ0JBQUFBLE1BWEssaUJBV3dCQyxJQVh4QixHQVcrQkMsV0FYL0I7O0FB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LElBQUk7QUFBQSx5QkFBSSxNQUFJLENBQUMwQyxhQUFMLENBQW1CMUMsSUFBbkIsQ0FBSjtBQUFBLGlCQUFkLEM7QUFDQWdDLGdCQUFBQSxJLHVDQUFXdkIsUTs7dUJBQ1gsS0FBS1AsTUFBTCxDQUFZNEIsa0JBQVosQ0FBK0JFLElBQS9CLEVBQXFDSix3QkFBZ0JLLE9BQXJELEM7OztBQUNOeEIsZ0JBQUFBLFFBQVEsQ0FBQ3lCLE9BQVQsQ0FBaUIsVUFBQUMsT0FBTztBQUFBLHlCQUFJQSxPQUFPLENBQUNRLFVBQVIsQ0FBbUJILE9BQW5CLENBQUo7QUFBQSxpQkFBeEI7QUFDQSxxQkFBS0osVUFBTDs7dUJBQ00sS0FBS2xDLE1BQUwsQ0FBWXdCLGlCQUFaLENBQThCTSxJQUE5QixFQUFvQ0osd0JBQWdCQyxPQUFwRCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7bUNBR1llLEksRUFBK0I7QUFDakQsYUFBT3pDLGtCQUFVMEMsdUJBQVYsQ0FBa0NELElBQWxDLEVBQXdDckMscUJBQVV1QyxXQUFsRCxLQUNBM0Msa0JBQVUwQyx1QkFBVixDQUFrQ0QsSUFBbEMsRUFBd0NsQyxrQkFBUW9DLFdBQWhELENBRFA7QUFFSDs7OytCQUVpQkYsSSxFQUEyQjtBQUN6QyxhQUFPekMsa0JBQVU0QyxlQUFWLENBQTBCSCxJQUExQixFQUFnQ3JDLHFCQUFVdUMsV0FBMUMsS0FDQTNDLGtCQUFVNEMsZUFBVixDQUEwQkgsSUFBMUIsRUFBZ0NsQyxrQkFBUW9DLFdBQXhDLENBRFA7QUFFSDs7Ozs7O2lDQXRKQ3pFLEcsbUJBQ2dDMkUsTUFBTSxDQUFDQyxNQUFQLENBQWM7QUFDNUMzQyxFQUFBQSxTQUFTLEVBQUVDLHFCQUFVQyxhQUR1QjtBQUU1Q0MsRUFBQUEsUUFBUSxFQUFFLENBQUNDLGtCQUFRRixhQUFUO0FBRmtDLENBQWQsQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOC0yMDE5IFRPTiBERVYgU09MVVRJT05TIExURC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgU09GVFdBUkUgRVZBTFVBVElPTiBMaWNlbnNlICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbiAqIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxuICogTGljZW5zZSBhdDogaHR0cHM6Ly93d3cudG9uLmRldi9saWNlbnNlc1xuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgVE9OIERFViBzb2Z0d2FyZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbi8vIEBmbG93XG5cbmltcG9ydCB7IENvbXBpbGVycyB9IGZyb20gXCIuL2NvbXBpbGVycy9jb21waWxlcnNcIjtcbmltcG9ydCB0eXBlIHsgQ29tcGlsZXJzQ29uZmlnIH0gZnJvbSBcIi4vY29tcGlsZXJzL2NvbXBpbGVyc1wiO1xuaW1wb3J0IHR5cGUgeyBOZXR3b3JrQ29uZmlnLCBTZXROZXR3b3JrT3B0aW9ucyB9IGZyb20gXCIuL25ldHdvcmtzL25ldHdvcmtzXCI7XG5pbXBvcnQgeyBOZXR3b3JrIH0gZnJvbSBcIi4vbmV0d29ya3MvbmV0d29ya3NcIjtcbmltcG9ydCB0eXBlIHsgQ29udGFpbmVyRGVmLCBEQ29udGFpbmVySW5mbywgREltYWdlSW5mbyB9IGZyb20gXCIuL3V0aWxzL2RvY2tlclwiO1xuaW1wb3J0IHsgQ29udGFpbmVyU3RhdHVzLCBEZXZEb2NrZXIgfSBmcm9tIFwiLi91dGlscy9kb2NrZXJcIjtcbmltcG9ydCB7IHRleHRzIH0gZnJvbSBcIi4vdXRpbHMvdGV4dHNcIjtcbmltcG9ydCB7IGJyZWFrV29yZHMsIGlucHV0TGluZSwgdG9ubGFic0hvbWVQYXRoLCB2ZXJzaW9uIH0gZnJvbSBcIi4vdXRpbHMvdXRpbHNcIjtcblxuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcblxudHlwZSBEZXZDb25maWcgPSB7XG4gICAgY29tcGlsZXJzOiBDb21waWxlcnNDb25maWcsXG4gICAgbmV0d29ya3M6IE5ldHdvcmtDb25maWdbXSxcbn07XG5cbmV4cG9ydCB0eXBlIENvbXBpbGVyc1dpdGhOZXR3b3JrcyA9IHtcbiAgICBjb21waWxlcnM6IGJvb2xlYW4sXG4gICAgbmV0d29ya3M6IE5ldHdvcmtbXSxcbn1cblxuY2xhc3MgRGV2IHtcbiAgICBzdGF0aWMgZGVmYXVsdENvbmZpZzogRGV2Q29uZmlnID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgICAgIGNvbXBpbGVyczogQ29tcGlsZXJzLmRlZmF1bHRDb25maWcsXG4gICAgICAgIG5ldHdvcmtzOiBbTmV0d29yay5kZWZhdWx0Q29uZmlnXSxcbiAgICB9KTtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgdmVyc2lvbjogc3RyaW5nO1xuICAgIGRvY2tlcjogRGV2RG9ja2VyO1xuICAgIG5ldHdvcmtzOiBOZXR3b3JrW107XG4gICAgY29tcGlsZXJzOiBDb21waWxlcnM7XG4gICAgYWdyZWVtZW50UmVxdWlyZWQ6IGJvb2xlYW47XG4gICAgY29uZmlnRmlsZVBhdGg6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm5hbWUgPSAndG9uZGV2JztcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICAgICAgdGhpcy5hZ3JlZW1lbnRSZXF1aXJlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuZG9ja2VyID0gbmV3IERldkRvY2tlcigpO1xuICAgICAgICB0aGlzLmRvY2tlci5vblN0YXJ0dXBJbWFnZXMgPSB0aGlzLm9uU3RhcnR1cEltYWdlcztcbiAgICAgICAgdGhpcy5kb2NrZXIub25CZWZvcmVQdWxsID0gdGhpcy5vbkJlZm9yZVB1bGw7XG4gICAgICAgIHRoaXMuY29tcGlsZXJzID0gbmV3IENvbXBpbGVycyhDb21waWxlcnMuZGVmYXVsdENvbmZpZyk7XG4gICAgICAgIHRoaXMubmV0d29ya3MgPSBbbmV3IE5ldHdvcmsoTmV0d29yay5kZWZhdWx0Q29uZmlnKV07XG4gICAgICAgIHRoaXMuY29uZmlnRmlsZVBhdGggPSB0b25sYWJzSG9tZVBhdGgoJ2NvbmZpZy5qc29uJyk7XG4gICAgICAgIGZzLm1rZGlyU3luYyh0b25sYWJzSG9tZVBhdGgoKSwgKHsgcmVjdXJzaXZlOiB0cnVlIH06IGFueSkpO1xuICAgICAgICB0aGlzLmxvYWRDb25maWcoKTtcbiAgICB9XG5cbiAgICBsb2FkQ29uZmlnKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgY29uZmlnOiBEZXZDb25maWcgPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyh0aGlzLmNvbmZpZ0ZpbGVQYXRoLCB7IGVuY29kaW5nOiAndXRmOCcgfSkpO1xuICAgICAgICAgICAgdGhpcy5jb21waWxlcnMuc2V0Q29uZmlnKGNvbmZpZy5jb21waWxlcnMpO1xuICAgICAgICAgICAgdGhpcy5uZXR3b3JrcyA9IGNvbmZpZy5uZXR3b3Jrcy5tYXAoeCA9PiBuZXcgTmV0d29yayh4KSk7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBzYXZlQ29uZmlnKCkge1xuICAgICAgICBjb25zdCBjb25maWc6IERldkNvbmZpZyA9IHtcbiAgICAgICAgICAgIGNvbXBpbGVyczogdGhpcy5jb21waWxlcnMuZ2V0Q29uZmlnKCksXG4gICAgICAgICAgICBuZXR3b3JrczogdGhpcy5uZXR3b3Jrcy5tYXAoeCA9PiB4LmdldENvbmZpZygpKSxcbiAgICAgICAgfTtcbiAgICAgICAgZnMubWtkaXJTeW5jKHRvbmxhYnNIb21lUGF0aCgnJyksICh7IHJlY3Vyc2l2ZTogdHJ1ZSB9OiBhbnkpKTtcbiAgICAgICAgZnMud3JpdGVGaWxlU3luYyh0aGlzLmNvbmZpZ0ZpbGVQYXRoLCBKU09OLnN0cmluZ2lmeShjb25maWcpLCB7IGVuY29kaW5nOiAndXRmOCcgfSk7XG4gICAgfVxuXG4gICAgb25TdGFydHVwSW1hZ2VzID0gKGltYWdlczogREltYWdlSW5mb1tdKSA9PiB7XG4gICAgICAgIHRoaXMuYWdyZWVtZW50UmVxdWlyZWQgPSAhaW1hZ2VzLmZpbmQoRGV2LmlzRGV2SW1hZ2UpO1xuICAgIH07XG5cbiAgICBvbkJlZm9yZVB1bGwgPSBhc3luYyAoX3JlcG9UYWc6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICBpZiAoIXRoaXMuYWdyZWVtZW50UmVxdWlyZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsaWNlbnNlID0gZnNcbiAgICAgICAgICAgIC5yZWFkRmlsZVN5bmMocGF0aC5qb2luKF9fZGlybmFtZSwgJy4uJywgJ0xJQ0VOU0UnKSlcbiAgICAgICAgICAgIC50b1N0cmluZygpXG4gICAgICAgICAgICAuc3BsaXQoJ1xcbicpXG4gICAgICAgICAgICAubWFwKGJyZWFrV29yZHMpLmpvaW4oJ1xcbicpO1xuICAgICAgICBjb25zb2xlLmxvZyhsaWNlbnNlKTtcbiAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUodGV4dHMuYWdyZWVtZW50Q29uZmlybWF0aW9uKTtcbiAgICAgICAgY29uc3QgYW5zd2VyID0gKGF3YWl0IGlucHV0TGluZSgpKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKGFuc3dlciAhPT0gJ3llcycpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRleHRzLmFncmVlbWVudFJlamVjdGVkKTtcbiAgICAgICAgICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyh0ZXh0cy5hZ3JlZW1lbnRBY2NlcHRlZCk7XG4gICAgICAgIHRoaXMuYWdyZWVtZW50UmVxdWlyZWQgPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgZ2V0RGVmcyhzb3VyY2U6IENvbXBpbGVyc1dpdGhOZXR3b3Jrcyk6IENvbnRhaW5lckRlZltdIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZS5jb21waWxlcnMgPyBzb3VyY2UubmV0d29ya3MuY29uY2F0KHRoaXMuY29tcGlsZXJzKSA6IFsuLi5zb3VyY2UubmV0d29ya3NdO1xuICAgIH1cblxuICAgIGFzeW5jIHN0YXJ0KHNvdXJjZTogQ29tcGlsZXJzV2l0aE5ldHdvcmtzKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuZG9ja2VyLnN0YXJ0dXBDb250YWluZXJzKHRoaXMuZ2V0RGVmcyhzb3VyY2UpLCBDb250YWluZXJTdGF0dXMucnVubmluZyk7XG4gICAgfVxuXG4gICAgYXN5bmMgc3RvcChzb3VyY2U6IENvbXBpbGVyc1dpdGhOZXR3b3Jrcykge1xuICAgICAgICBhd2FpdCB0aGlzLmRvY2tlci5zaHV0ZG93bkNvbnRhaW5lcnModGhpcy5nZXREZWZzKHNvdXJjZSksIENvbnRhaW5lclN0YXR1cy5jcmVhdGVkKTtcbiAgICB9XG5cbiAgICBhc3luYyByZXN0YXJ0KHNvdXJjZTogQ29tcGlsZXJzV2l0aE5ldHdvcmtzKSB7XG4gICAgICAgIGNvbnN0IGRlZnMgPSB0aGlzLmdldERlZnMoc291cmNlKTtcbiAgICAgICAgYXdhaXQgdGhpcy5kb2NrZXIuc2h1dGRvd25Db250YWluZXJzKGRlZnMsIENvbnRhaW5lclN0YXR1cy5jcmVhdGVkKTtcbiAgICAgICAgYXdhaXQgdGhpcy5kb2NrZXIuc3RhcnR1cENvbnRhaW5lcnMoZGVmcywgQ29udGFpbmVyU3RhdHVzLnJ1bm5pbmcpO1xuICAgIH1cblxuICAgIGFzeW5jIHJlY3JlYXRlKHNvdXJjZTogQ29tcGlsZXJzV2l0aE5ldHdvcmtzKSB7XG4gICAgICAgIGNvbnN0IGRlZnMgPSB0aGlzLmdldERlZnMoc291cmNlKTtcbiAgICAgICAgYXdhaXQgdGhpcy5kb2NrZXIuc2h1dGRvd25Db250YWluZXJzKGRlZnMsIENvbnRhaW5lclN0YXR1cy5taXNzaW5nKTtcbiAgICAgICAgYXdhaXQgdGhpcy5kb2NrZXIuc3RhcnR1cENvbnRhaW5lcnMoZGVmcywgQ29udGFpbmVyU3RhdHVzLmNyZWF0ZWQpO1xuICAgIH1cblxuXG4gICAgYXN5bmMgY2xlYW4oc291cmNlOiBDb21waWxlcnNXaXRoTmV0d29ya3MpIHtcbiAgICAgICAgY29uc3QgZGVmcyA9IHRoaXMuZ2V0RGVmcyhzb3VyY2UpO1xuICAgICAgICBhd2FpdCB0aGlzLmRvY2tlci5zaHV0ZG93bkNvbnRhaW5lcnMoZGVmcywgQ29udGFpbmVyU3RhdHVzLm1pc3NpbmcpO1xuICAgIH1cblxuICAgIGFzeW5jIHVzZVZlcnNpb24odmVyc2lvbjogc3RyaW5nLCBzb3VyY2U6IENvbXBpbGVyc1dpdGhOZXR3b3Jrcykge1xuICAgICAgICBjb25zdCBkZWZzID0gdGhpcy5nZXREZWZzKHNvdXJjZSk7XG4gICAgICAgIGF3YWl0IHRoaXMuZG9ja2VyLnNodXRkb3duQ29udGFpbmVycyhkZWZzLCBDb250YWluZXJTdGF0dXMubWlzc2luZyk7XG4gICAgICAgIGlmIChzb3VyY2UuY29tcGlsZXJzKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBpbGVycy5zZXRDb25maWcoe1xuICAgICAgICAgICAgICAgIC4uLnRoaXMuY29tcGlsZXJzLmdldENvbmZpZygpLFxuICAgICAgICAgICAgICAgIHZlcnNpb25cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHNvdXJjZS5uZXR3b3Jrcy5mb3JFYWNoKChuZXR3b3JrKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb25maWcgPSBuZXR3b3JrLmdldENvbmZpZygpO1xuICAgICAgICAgICAgY29uZmlnLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgICAgICAgICAgbmV0d29yay5zZXRDb25maWcoY29uZmlnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2F2ZUNvbmZpZygpO1xuICAgICAgICBhd2FpdCB0aGlzLmRvY2tlci5zdGFydHVwQ29udGFpbmVycyhkZWZzLCBDb250YWluZXJTdGF0dXMucnVubmluZyk7XG4gICAgfVxuXG4gICAgZW5zdXJlTmV0d29yayhuYW1lOiBzdHJpbmcpOiBOZXR3b3JrIHtcbiAgICAgICAgY29uc3QgZXhpc3RpbmcgPSB0aGlzLm5ldHdvcmtzLmZpbmQoeCA9PiB4Lm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgaWYgKGV4aXN0aW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZXhpc3Rpbmc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmV0d29yayA9IG5ldyBOZXR3b3JrKHtcbiAgICAgICAgICAgIC4uLk5ldHdvcmsuZGVmYXVsdENvbmZpZyxcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubmV0d29ya3MucHVzaChuZXR3b3JrKTtcbiAgICAgICAgcmV0dXJuIG5ldHdvcms7XG4gICAgfVxuXG4gICAgYXN5bmMgc2V0TmV0d29ya3NPcHRpb25zKG5hbWVzOiBzdHJpbmdbXSwgb3B0aW9uczogU2V0TmV0d29ya09wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgbmV0d29ya3M6IE5ldHdvcmtbXSA9IG5hbWVzLmxlbmd0aCA9PT0gMFxuICAgICAgICAgICAgPyB0aGlzLm5ldHdvcmtzXG4gICAgICAgICAgICA6IG5hbWVzLm1hcChuYW1lID0+IHRoaXMuZW5zdXJlTmV0d29yayhuYW1lKSk7XG4gICAgICAgIGNvbnN0IGRlZnMgPSBbLi4ubmV0d29ya3NdO1xuICAgICAgICBhd2FpdCB0aGlzLmRvY2tlci5zaHV0ZG93bkNvbnRhaW5lcnMoZGVmcywgQ29udGFpbmVyU3RhdHVzLm1pc3NpbmcpO1xuICAgICAgICBuZXR3b3Jrcy5mb3JFYWNoKG5ldHdvcmsgPT4gbmV0d29yay5zZXRPcHRpb25zKG9wdGlvbnMpKTtcbiAgICAgICAgdGhpcy5zYXZlQ29uZmlnKCk7XG4gICAgICAgIGF3YWl0IHRoaXMuZG9ja2VyLnN0YXJ0dXBDb250YWluZXJzKGRlZnMsIENvbnRhaW5lclN0YXR1cy5ydW5uaW5nKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNEZXZDb250YWluZXIoaW5mbzogRENvbnRhaW5lckluZm8pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIERldkRvY2tlci5jb250YWluZXJCZWxvbmdzVG9JbWFnZShpbmZvLCBDb21waWxlcnMuaW1hZ2VQcmVmaXgpXG4gICAgICAgICAgICB8fCBEZXZEb2NrZXIuY29udGFpbmVyQmVsb25nc1RvSW1hZ2UoaW5mbywgTmV0d29yay5pbWFnZVByZWZpeCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzRGV2SW1hZ2UoaW5mbzogREltYWdlSW5mbyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gRGV2RG9ja2VyLmltYWdlSGFzUmVwb1RhZyhpbmZvLCBDb21waWxlcnMuaW1hZ2VQcmVmaXgpXG4gICAgICAgICAgICB8fCBEZXZEb2NrZXIuaW1hZ2VIYXNSZXBvVGFnKGluZm8sIE5ldHdvcmsuaW1hZ2VQcmVmaXgpO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgRGV2IH07XG4iXX0=