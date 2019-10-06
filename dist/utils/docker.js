"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DevDocker = exports.ContainerStatus = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _dockerode = _interopRequireDefault(require("dockerode"));

var _utils = require("./utils");

/*
 * Copyright 2018-2019 TON DEV SOLUTIONS LTD.
 *
 * Licensed under the SOFTWARE EVALUATION License (the "License"); you may not use
 * this file except in compliance with the License.  You may obtain a copy of the
 * License at: https://www.ton.dev/licenses
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific TON DEV software governing permissions and
 * limitations under the License.
 *
 */
var ContainerStatus = {
  missing: 0,
  created: 1,
  running: 2
};
exports.ContainerStatus = ContainerStatus;

var DevDocker =
/*#__PURE__*/
function () {
  function DevDocker() {
    (0, _classCallCheck2["default"])(this, DevDocker);
    (0, _defineProperty2["default"])(this, "client", void 0);
    (0, _defineProperty2["default"])(this, "_images", void 0);
    (0, _defineProperty2["default"])(this, "_containers", void 0);
    (0, _defineProperty2["default"])(this, "_onStartupImagesPassed", void 0);
    (0, _defineProperty2["default"])(this, "onStartupImages", void 0);
    (0, _defineProperty2["default"])(this, "onBeforePull", void 0);
    this.client = new _dockerode["default"]();
    this.onStartupImages = null;
    this.onBeforePull = null;
    this._onStartupImagesPassed = false;
    this._images = null;
    this._containers = null;
  }

  (0, _createClass2["default"])(DevDocker, [{
    key: "dropCache",
    value: function dropCache() {
      this._images = null;
      this._containers = null;
    }
  }, {
    key: "getImageInfos",
    value: function () {
      var _getImageInfos = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        var _images;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this._images) {
                  _context.next = 7;
                  break;
                }

                _context.next = 3;
                return this.client.listImages({
                  all: true
                });

              case 3:
                _images = _context.sent;
                this._images = _images;

                if (!this._onStartupImagesPassed) {
                  this._onStartupImagesPassed = true;

                  if (this.onStartupImages) {
                    this.onStartupImages(_images);
                  }
                }

                this._images = _images;

              case 7:
                return _context.abrupt("return", this._images || []);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getImageInfos() {
        return _getImageInfos.apply(this, arguments);
      }

      return getImageInfos;
    }()
  }, {
    key: "getContainerInfos",
    value: function () {
      var _getContainerInfos = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this._containers) {
                  _context2.next = 4;
                  break;
                }

                _context2.next = 3;
                return this.client.listContainers({
                  all: true
                });

              case 3:
                this._containers = _context2.sent;

              case 4:
                return _context2.abrupt("return", this._containers || []);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getContainerInfos() {
        return _getContainerInfos.apply(this, arguments);
      }

      return getContainerInfos;
    }()
  }, {
    key: "numericVersion",
    value: function () {
      var _numericVersion = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3() {
        var version;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.client.version();

              case 2:
                version = _context3.sent;
                return _context3.abrupt("return", (0, _utils.versionToNumber)(version.Version));

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function numericVersion() {
        return _numericVersion.apply(this, arguments);
      }

      return numericVersion;
    }()
  }, {
    key: "removeImages",
    value: function () {
      var _removeImages = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(nameMatches) {
        var containerInfos, i, info, container, imageInfos, _i, _info, image;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.getContainerInfos();

              case 2:
                _context4.t0 = function (info) {
                  return nameMatches.find(function (match) {
                    return DevDocker.containersImageMatched(info, match);
                  });
                };

                containerInfos = _context4.sent.filter(_context4.t0);
                i = 0;

              case 5:
                if (!(i < containerInfos.length)) {
                  _context4.next = 17;
                  break;
                }

                info = containerInfos[i];
                (0, _utils.progress)("Removing container [".concat(DevDocker.containerTitle(info), "]"));
                container = this.client.getContainer(info.Id);
                _context4.next = 11;
                return container.stop();

              case 11:
                _context4.next = 13;
                return container.remove();

              case 13:
                (0, _utils.progressDone)();

              case 14:
                i += 1;
                _context4.next = 5;
                break;

              case 17:
                _context4.next = 19;
                return this.getImageInfos();

              case 19:
                _context4.t1 = function (info) {
                  return nameMatches.find(function (match) {
                    return DevDocker.imageHasMatchedName(info, match);
                  });
                };

                imageInfos = _context4.sent.filter(_context4.t1);
                _i = 0;

              case 22:
                if (!(_i < imageInfos.length)) {
                  _context4.next = 32;
                  break;
                }

                _info = imageInfos[_i];
                (0, _utils.progress)("Removing image [".concat(DevDocker.imageTitle(_info), "]"));
                image = this.client.getImage(_info.Id);
                _context4.next = 28;
                return image.remove();

              case 28:
                (0, _utils.progressDone)();

              case 29:
                _i += 1;
                _context4.next = 22;
                break;

              case 32:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function removeImages(_x) {
        return _removeImages.apply(this, arguments);
      }

      return removeImages;
    }()
  }, {
    key: "pull",
    value: function () {
      var _pull = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(repoTag) {
        var client, title, image;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!this.onBeforePull) {
                  _context5.next = 3;
                  break;
                }

                _context5.next = 3;
                return this.onBeforePull(repoTag);

              case 3:
                client = this.client;
                title = "Pulling [".concat(repoTag, "]");
                (0, _utils.progress)(title);
                _context5.next = 8;
                return new Promise(function (resolve, reject) {
                  client.pull(repoTag, {}, function (err, stream) {
                    if (!stream) {
                      reject(err);
                      return;
                    }

                    var lastReportTime = Date.now();
                    client.modem.followProgress(stream, onFinished, onProgress);

                    function onFinished(err, output) {
                      resolve(output);
                    }

                    function onProgress(event) {
                      (0, _utils.progressLine)("".concat(title, "... ").concat(event.progress || ''));
                    }
                  });
                });

              case 8:
                image = _context5.sent;
                (0, _utils.progress)(title);
                (0, _utils.progressDone)();
                return _context5.abrupt("return", image);

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function pull(_x2) {
        return _pull.apply(this, arguments);
      }

      return pull;
    }()
  }, {
    key: "findImageInfo",
    value: function () {
      var _findImageInfo = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6(name) {
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.getImageInfos();

              case 2:
                _context6.t1 = function (x) {
                  return DevDocker.imageHasMatchedName(x, name);
                };

                _context6.t0 = _context6.sent.find(_context6.t1);

                if (_context6.t0) {
                  _context6.next = 6;
                  break;
                }

                _context6.t0 = null;

              case 6:
                return _context6.abrupt("return", _context6.t0);

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function findImageInfo(_x3) {
        return _findImageInfo.apply(this, arguments);
      }

      return findImageInfo;
    }()
  }, {
    key: "findContainerInfo",
    value: function () {
      var _findContainerInfo = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee7(name) {
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.getContainerInfos();

              case 2:
                _context7.t1 = function (x) {
                  return DevDocker.hasName(x, name);
                };

                _context7.t0 = _context7.sent.find(_context7.t1);

                if (_context7.t0) {
                  _context7.next = 6;
                  break;
                }

                _context7.t0 = null;

              case 6:
                return _context7.abrupt("return", _context7.t0);

              case 7:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function findContainerInfo(_x4) {
        return _findContainerInfo.apply(this, arguments);
      }

      return findContainerInfo;
    }()
  }, {
    key: "shutdownContainer",
    value: function () {
      var _shutdownContainer = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee8(def, downTo) {
        var info;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.findContainerInfo(def.containerName);

              case 2:
                info = _context8.sent;

                if (info) {
                  _context8.next = 5;
                  break;
                }

                return _context8.abrupt("return");

              case 5:
                if (!(DevDocker.isRunning(info) && downTo < ContainerStatus.running)) {
                  _context8.next = 11;
                  break;
                }

                (0, _utils.progress)("Stopping [".concat(def.containerName, "]"));
                _context8.next = 9;
                return this.client.getContainer(info.Id).stop();

              case 9:
                (0, _utils.progressDone)();
                this.dropCache();

              case 11:
                if (!(downTo < ContainerStatus.created)) {
                  _context8.next = 17;
                  break;
                }

                (0, _utils.progress)("Removing [".concat(def.containerName, "]"));
                _context8.next = 15;
                return this.client.getContainer(info.Id).remove();

              case 15:
                (0, _utils.progressDone)();
                this.dropCache();

              case 17:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function shutdownContainer(_x5, _x6) {
        return _shutdownContainer.apply(this, arguments);
      }

      return shutdownContainer;
    }()
  }, {
    key: "ensureImage",
    value: function () {
      var _ensureImage = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee9(def) {
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this.findImageInfo(def.requiredImage);

              case 2:
                if (_context9.sent) {
                  _context9.next = 6;
                  break;
                }

                _context9.next = 5;
                return this.pull(def.requiredImage);

              case 5:
                this.dropCache();

              case 6:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function ensureImage(_x7) {
        return _ensureImage.apply(this, arguments);
      }

      return ensureImage;
    }()
  }, {
    key: "startupContainer",
    value: function () {
      var _startupContainer = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee10(def, upTo) {
        var info;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this.ensureImage(def);

              case 2:
                _context10.next = 4;
                return this.findContainerInfo(def.containerName);

              case 4:
                info = _context10.sent;

                if (!(!info && upTo >= ContainerStatus.created)) {
                  _context10.next = 14;
                  break;
                }

                (0, _utils.progress)("Creating ".concat(def.containerName));
                _context10.next = 9;
                return def.createContainer(this);

              case 9:
                (0, _utils.progressDone)();
                this.dropCache();
                _context10.next = 13;
                return this.findContainerInfo(def.containerName);

              case 13:
                info = _context10.sent;

              case 14:
                if (!(info && !DevDocker.isRunning(info) && upTo >= ContainerStatus.running)) {
                  _context10.next = 20;
                  break;
                }

                (0, _utils.progress)("Starting ".concat(def.containerName));
                _context10.next = 18;
                return this.client.getContainer(info.Id).start();

              case 18:
                (0, _utils.progressDone)();
                this.dropCache();

              case 20:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function startupContainer(_x8, _x9) {
        return _startupContainer.apply(this, arguments);
      }

      return startupContainer;
    }()
  }, {
    key: "shutdownContainers",
    value: function () {
      var _shutdownContainers = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee11(defs, downTo) {
        var i;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                i = 0;

              case 1:
                if (!(i < defs.length)) {
                  _context11.next = 7;
                  break;
                }

                _context11.next = 4;
                return this.shutdownContainer(defs[i], downTo);

              case 4:
                i += 1;
                _context11.next = 1;
                break;

              case 7:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function shutdownContainers(_x10, _x11) {
        return _shutdownContainers.apply(this, arguments);
      }

      return shutdownContainers;
    }()
  }, {
    key: "startupContainers",
    value: function () {
      var _startupContainers = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee12(defs, upTo) {
        var i;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                i = 0;

              case 1:
                if (!(i < defs.length)) {
                  _context12.next = 7;
                  break;
                }

                _context12.next = 4;
                return this.startupContainer(defs[i], upTo);

              case 4:
                i += 1;
                _context12.next = 1;
                break;

              case 7:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function startupContainers(_x12, _x13) {
        return _startupContainers.apply(this, arguments);
      }

      return startupContainers;
    }()
  }, {
    key: "ensureRunning",
    value: function () {
      var _ensureRunning = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee13(def) {
        var info;
        return _regenerator["default"].wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return this.startupContainer(def, ContainerStatus.running);

              case 2:
                _context13.next = 4;
                return this.findContainerInfo(def.containerName);

              case 4:
                info = _context13.sent;
                return _context13.abrupt("return", this.client.getContainer(info && info.Id || def.containerName));

              case 6:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function ensureRunning(_x14) {
        return _ensureRunning.apply(this, arguments);
      }

      return ensureRunning;
    }()
  }], [{
    key: "hasName",
    value: function hasName(container, name) {
      var nameToFind = "/".concat(name).toLowerCase();
      return !!(container.Names || []).find(function (n) {
        return n.toLowerCase() === nameToFind;
      });
    }
  }, {
    key: "imageTitle",
    value: function imageTitle(info) {
      return DevDocker.imageNames(info)[0] || info.Id;
    }
  }, {
    key: "containerTitle",
    value: function containerTitle(info) {
      return info.Names.map(function (name) {
        return name.startsWith('/') ? name.substr(1) : name;
      }).join(';');
    } // if match specified with tag compare exactly
    // if match specified without tag compare untagged names

  }, {
    key: "imageNameMatched",
    value: function imageNameMatched(imageName, match) {
      imageName = imageName.toLowerCase();
      match = match.toLowerCase();
      var matchParts = match.split(':');

      if (matchParts.length > 1) {
        return imageName === match;
      }

      var imageParts = imageName.split(':');
      return imageParts[0] === matchParts[0];
    }
  }, {
    key: "imageNames",
    value: function imageNames(info) {
      return [].concat((0, _toConsumableArray2["default"])(info.RepoTags || []), (0, _toConsumableArray2["default"])((info.RepoDigests || []).map(function (digest) {
        return digest.split('@').join(':');
      })));
    }
  }, {
    key: "imageHasMatchedName",
    value: function imageHasMatchedName(info, match) {
      var _this = this;

      return !!DevDocker.imageNames(info).find(function (name) {
        return _this.imageNameMatched(name, match);
      });
    }
  }, {
    key: "isRunning",
    value: function isRunning(info) {
      return !!info && info.State.toLowerCase() === 'running';
    }
  }, {
    key: "containersImageMatched",
    value: function containersImageMatched(info, match) {
      return this.imageNameMatched(info.Image, match);
    }
  }]);
  return DevDocker;
}();

exports.DevDocker = DevDocker;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9kb2NrZXIuanMiXSwibmFtZXMiOlsiQ29udGFpbmVyU3RhdHVzIiwibWlzc2luZyIsImNyZWF0ZWQiLCJydW5uaW5nIiwiRGV2RG9ja2VyIiwiY2xpZW50IiwiRG9ja2VyIiwib25TdGFydHVwSW1hZ2VzIiwib25CZWZvcmVQdWxsIiwiX29uU3RhcnR1cEltYWdlc1Bhc3NlZCIsIl9pbWFnZXMiLCJfY29udGFpbmVycyIsImxpc3RJbWFnZXMiLCJhbGwiLCJpbWFnZXMiLCJsaXN0Q29udGFpbmVycyIsInZlcnNpb24iLCJWZXJzaW9uIiwibmFtZU1hdGNoZXMiLCJnZXRDb250YWluZXJJbmZvcyIsImluZm8iLCJmaW5kIiwibWF0Y2giLCJjb250YWluZXJzSW1hZ2VNYXRjaGVkIiwiY29udGFpbmVySW5mb3MiLCJmaWx0ZXIiLCJpIiwibGVuZ3RoIiwiY29udGFpbmVyVGl0bGUiLCJjb250YWluZXIiLCJnZXRDb250YWluZXIiLCJJZCIsInN0b3AiLCJyZW1vdmUiLCJnZXRJbWFnZUluZm9zIiwiaW1hZ2VIYXNNYXRjaGVkTmFtZSIsImltYWdlSW5mb3MiLCJpbWFnZVRpdGxlIiwiaW1hZ2UiLCJnZXRJbWFnZSIsInJlcG9UYWciLCJ0aXRsZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicHVsbCIsImVyciIsInN0cmVhbSIsImxhc3RSZXBvcnRUaW1lIiwiRGF0ZSIsIm5vdyIsIm1vZGVtIiwiZm9sbG93UHJvZ3Jlc3MiLCJvbkZpbmlzaGVkIiwib25Qcm9ncmVzcyIsIm91dHB1dCIsImV2ZW50IiwicHJvZ3Jlc3MiLCJuYW1lIiwieCIsImhhc05hbWUiLCJkZWYiLCJkb3duVG8iLCJmaW5kQ29udGFpbmVySW5mbyIsImNvbnRhaW5lck5hbWUiLCJpc1J1bm5pbmciLCJkcm9wQ2FjaGUiLCJmaW5kSW1hZ2VJbmZvIiwicmVxdWlyZWRJbWFnZSIsInVwVG8iLCJlbnN1cmVJbWFnZSIsImNyZWF0ZUNvbnRhaW5lciIsInN0YXJ0IiwiZGVmcyIsInNodXRkb3duQ29udGFpbmVyIiwic3RhcnR1cENvbnRhaW5lciIsIm5hbWVUb0ZpbmQiLCJ0b0xvd2VyQ2FzZSIsIk5hbWVzIiwibiIsImltYWdlTmFtZXMiLCJtYXAiLCJzdGFydHNXaXRoIiwic3Vic3RyIiwiam9pbiIsImltYWdlTmFtZSIsIm1hdGNoUGFydHMiLCJzcGxpdCIsImltYWdlUGFydHMiLCJSZXBvVGFncyIsIlJlcG9EaWdlc3RzIiwiZGlnZXN0IiwiaW1hZ2VOYW1lTWF0Y2hlZCIsIlN0YXRlIiwiSW1hZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWVBOztBQUVBOztBQWpCQTs7Ozs7Ozs7Ozs7Ozs7QUE0SE8sSUFBTUEsZUFBZSxHQUFHO0FBQzNCQyxFQUFBQSxPQUFPLEVBQUUsQ0FEa0I7QUFFM0JDLEVBQUFBLE9BQU8sRUFBRSxDQUZrQjtBQUczQkMsRUFBQUEsT0FBTyxFQUFFO0FBSGtCLENBQXhCOzs7SUFnQkRDLFM7OztBQVFGLHVCQUFjO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDVixTQUFLQyxNQUFMLEdBQWMsSUFBSUMscUJBQUosRUFBZDtBQUNBLFNBQUtDLGVBQUwsR0FBdUIsSUFBdkI7QUFDQSxTQUFLQyxZQUFMLEdBQW9CLElBQXBCO0FBQ0EsU0FBS0Msc0JBQUwsR0FBOEIsS0FBOUI7QUFDQSxTQUFLQyxPQUFMLEdBQWUsSUFBZjtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsSUFBbkI7QUFDSDs7OztnQ0FFVztBQUNSLFdBQUtELE9BQUwsR0FBZSxJQUFmO0FBQ0EsV0FBS0MsV0FBTCxHQUFtQixJQUFuQjtBQUNIOzs7Ozs7Ozs7Ozs7O29CQUdRLEtBQUtELE87Ozs7Ozt1QkFDZSxLQUFLTCxNQUFMLENBQVlPLFVBQVosQ0FBdUI7QUFBQ0Msa0JBQUFBLEdBQUcsRUFBRTtBQUFOLGlCQUF2QixDOzs7QUFBZkMsZ0JBQUFBLE87QUFDTixxQkFBS0osT0FBTCxHQUFlSSxPQUFmOztBQUNBLG9C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Q0EsYUFBT0MsVUFBVSxDQUFDLENBQUQsQ0FBVixLQUFrQkYsVUFBVSxDQUFDLENBQUQsQ0FBbkM7QUFDSDs7OytCQUVpQmxFLEksRUFBNEI7QUFDMUMsMkRBQ1FBLElBQUksQ0FBQ3FFLFFBQUwsSUFBaUIsRUFEekIsdUNBRU8sQ0FBQ3JFLElBQUksQ0FBQ3NFLFdBQUwsSUFBb0IsRUFBckIsRUFBeUJULEdBQXpCLENBQTZCLFVBQUNVLE1BQUQsRUFBWTtBQUN4QyxlQUFPQSxNQUFNLENBQUNKLEtBQVAsQ0FBYSxHQUFiLEVBQWtCSCxJQUFsQixDQUF1QixHQUF2QixDQUFQO0FBQ0gsT0FGRSxDQUZQO0FBTUg7Ozt3Q0FFMEJoRSxJLEVBQWtCRSxLLEVBQXdCO0FBQUE7O0FBQ2pFLGFBQU8sQ0FBQyxDQUFDbEIsU0FBUyxDQUFDNEUsVUFBVixDQUFxQjVELElBQXJCLEVBQTJCQyxJQUEzQixDQUFnQyxVQUFBcUMsSUFBSTtBQUFBLGVBQUksS0FBSSxDQUFDa0MsZ0JBQUwsQ0FBc0JsQyxJQUF0QixFQUE0QnBDLEtBQTVCLENBQUo7QUFBQSxPQUFwQyxDQUFUO0FBQ0g7Ozs4QkFFZ0JGLEksRUFBZ0M7QUFDN0MsYUFBTyxDQUFDLENBQUNBLElBQUYsSUFBVUEsSUFBSSxDQUFDeUUsS0FBTCxDQUFXaEIsV0FBWCxPQUE2QixTQUE5QztBQUNIOzs7MkNBRTZCekQsSSxFQUFzQkUsSyxFQUF3QjtBQUN4RSxhQUFPLEtBQUtzRSxnQkFBTCxDQUFzQnhFLElBQUksQ0FBQzBFLEtBQTNCLEVBQWtDeEUsS0FBbEMsQ0FBUDtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuLy8gQGZsb3dcbmltcG9ydCBEb2NrZXIgZnJvbSAnZG9ja2Vyb2RlJztcblxuaW1wb3J0IHtwcm9ncmVzcywgcHJvZ3Jlc3NEb25lLCBwcm9ncmVzc0xpbmUsIHZlcnNpb25Ub051bWJlcn0gZnJvbSBcIi4vdXRpbHNcIjtcblxuZXhwb3J0IHR5cGUgREltYWdlSW5mbyA9IHtcbiAgICBJZDogc3RyaW5nLFxuICAgIFJlcG9UYWdzOiBzdHJpbmdbXSxcbiAgICBSZXBvRGlnZXN0czogc3RyaW5nW10sXG59XG5cbmV4cG9ydCB0eXBlIERDb250YWluZXJJbmZvID0ge1xuICAgIElkOiBzdHJpbmcsXG4gICAgTmFtZXM6IHN0cmluZ1tdLFxuICAgIEltYWdlOiBzdHJpbmcsXG4gICAgSW1hZ2VJRDogc3RyaW5nLFxuICAgIFN0YXRlOiBzdHJpbmcsXG59XG5cbmV4cG9ydCB0eXBlIERDb250YWluZXJFeGVjT3B0aW9ucyA9IHtcbiAgICBBdHRhY2hTdGRpbj86IGJvb2xlYW4sXG4gICAgQXR0YWNoU3Rkb3V0PzogYm9vbGVhbixcbiAgICBBdHRhY2hTdGRlcnI/OiBib29sZWFuLFxuICAgIERldGFjaEtleXM/OiBzdHJpbmcsXG4gICAgVHR5PzogYm9vbGVhbixcbiAgICBFbnY/OiBzdHJpbmcsXG4gICAgQ21kPzogc3RyaW5nW10sXG4gICAgUHJpdmlsZWdlZD86IGJvb2xlYW4sXG4gICAgVXNlcj86IHN0cmluZyxcbiAgICBXb3JraW5nRGlyPzogc3RyaW5nLFxufVxuXG5leHBvcnQgdHlwZSBEb2NrZXJNb2RlbSA9IHtcbiAgICBmb2xsb3dQcm9ncmVzcyhcbiAgICAgICAgc3RyZWFtOiBhbnksXG4gICAgICAgIG9uRmluaXNoZWQ6IChlcnI6IGFueSwgb3V0cHV0OiBhbnkpID0+IHZvaWQsXG4gICAgICAgIG9uUHJvZ3Jlc3M6IChldmVudDogYW55KSA9PiB2b2lkLFxuICAgICk6IHZvaWQsXG5cbiAgICBkZW11eFN0cmVhbShcbiAgICAgICAgc3RyZWFtOiBhbnksXG4gICAgICAgIHN0ZG91dDogYW55LFxuICAgICAgICBzdGRlcnI6IGFueSxcbiAgICApOiB2b2lkLFxufVxuXG5leHBvcnQgdHlwZSBEb2NrZXJDb250YWluZXIgPSB7XG4gICAgaWQ6IHN0cmluZyxcbiAgICBtb2RlbTogRG9ja2VyTW9kZW0sXG4gICAgc3RhcnQoKTogUHJvbWlzZTx2b2lkPixcbiAgICBleGVjKG9wdGlvbnM6IERDb250YWluZXJFeGVjT3B0aW9ucywgY2FsbGJhY2s6IGFueSk6IHZvaWQsXG4gICAgc3RvcCgpOiBQcm9taXNlPHZvaWQ+LFxuICAgIHJlbW92ZSgpOiBQcm9taXNlPHZvaWQ+LFxufVxuXG5leHBvcnQgdHlwZSBEb2NrZXJJbWFnZSA9IHtcbiAgICByZW1vdmUoKTogUHJvbWlzZTx2b2lkPixcbn1cblxuZXhwb3J0IHR5cGUgRE1vdW50ID0ge1xuICAgIFRhcmdldDogc3RyaW5nLFxuICAgIFNvdXJjZTogc3RyaW5nLFxuICAgIFR5cGU6ICdiaW5kJyB8ICd2b2x1bWUnIHwgJ3RtcGZzJyxcbn1cblxuZXhwb3J0IHR5cGUgRFBvcnRCaW5kaW5ncyA9IHtcbiAgICBbc3RyaW5nXTogeyBIb3N0SXA6IHN0cmluZywgSG9zdFBvcnQ6IHN0cmluZyB9W11cbn07XG5cbmV4cG9ydCB0eXBlIERDcmVhdGVDb250YWluZXJPcHRpb25zID0ge1xuICAgIG5hbWU/OiBzdHJpbmcsXG4gICAgSW1hZ2U6IHN0cmluZyxcbiAgICBJbnRlcmFjdGl2ZT86IGJvb2xlYW4sXG4gICAgVHR5PzogYm9vbGVhbixcbiAgICBVc2VyPzogc3RyaW5nLFxuICAgIEVudHJ5cG9pbnQ/OiBzdHJpbmdbXSxcbiAgICBFbnY6IHN0cmluZ1tdLFxuICAgIEhvc3RDb25maWc/OiB7XG4gICAgICAgIE1vdW50cz86IERNb3VudFtdLFxuICAgIH0sXG4gICAgRXhwb3NlZFBvcnRzPzoge1xuICAgICAgICBbc3RyaW5nXToge30sXG4gICAgfSxcbiAgICBIb3N0Q29uZmlnPzoge1xuICAgICAgICBQb3J0QmluZGluZ3M/OiBEUG9ydEJpbmRpbmdzLFxuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgRFZlcnNpb24gPSB7XG4gICAgVmVyc2lvbjogc3RyaW5nLFxufVxuXG5leHBvcnQgdHlwZSBEb2NrZXJDbGllbnQgPSB7XG4gICAgdmVyc2lvbigpOiBQcm9taXNlPERWZXJzaW9uPixcblxuICAgIGxpc3RDb250YWluZXJzKG9wdGlvbnM/OiB7IGFsbD86IHRydWUgfSk6IFByb21pc2U8RENvbnRhaW5lckluZm9bXT4sXG5cbiAgICBsaXN0SW1hZ2VzKG9wdGlvbnM/OiB7IGFsbD86IHRydWUgfSk6IFByb21pc2U8REltYWdlSW5mb1tdPixcblxuICAgIGdldENvbnRhaW5lcihpZDogc3RyaW5nKTogRG9ja2VyQ29udGFpbmVyLFxuXG4gICAgZ2V0SW1hZ2UobmFtZTogc3RyaW5nKTogRG9ja2VySW1hZ2UsXG5cbiAgICBjcmVhdGVDb250YWluZXIob3B0aW9uczogRENyZWF0ZUNvbnRhaW5lck9wdGlvbnMpOiBQcm9taXNlPERvY2tlckNvbnRhaW5lcj4sXG5cbiAgICBwdWxsKHJlcG9UYWc6IHN0cmluZywgYXV0aDogYW55LCAoZXJyOiBhbnksIHN0cmVhbTogYW55KSA9PiB2b2lkKTogdm9pZCxcblxuICAgIG1vZGVtOiBEb2NrZXJNb2RlbSxcbn1cblxuZXhwb3J0IGNvbnN0IENvbnRhaW5lclN0YXR1cyA9IHtcbiAgICBtaXNzaW5nOiAwLFxuICAgIGNyZWF0ZWQ6IDEsXG4gICAgcnVubmluZzogMixcbn07XG5cbmV4cG9ydCB0eXBlIENvbnRhaW5lclN0YXR1c1R5cGUgPSAwIHwgMSB8IDI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29udGFpbmVyRGVmIHtcbiAgICByZXF1aXJlZEltYWdlOiBzdHJpbmcsXG4gICAgY29udGFpbmVyTmFtZTogc3RyaW5nLFxuXG4gICAgY3JlYXRlQ29udGFpbmVyKGRvY2tlcjogRGV2RG9ja2VyKTogUHJvbWlzZTxEb2NrZXJDb250YWluZXI+XG59XG5cblxuY2xhc3MgRGV2RG9ja2VyIHtcbiAgICBjbGllbnQ6IERvY2tlckNsaWVudDtcbiAgICBfaW1hZ2VzOiA/KERJbWFnZUluZm9bXSk7XG4gICAgX2NvbnRhaW5lcnM6ID8oRENvbnRhaW5lckluZm9bXSk7XG4gICAgX29uU3RhcnR1cEltYWdlc1Bhc3NlZDogYm9vbGVhbjtcbiAgICBvblN0YXJ0dXBJbWFnZXM6ID8oKGltYWdlczogREltYWdlSW5mb1tdKSA9PiB2b2lkKTtcbiAgICBvbkJlZm9yZVB1bGw6ID8oKHJlcG9UYWc6IHN0cmluZykgPT4gUHJvbWlzZTx2b2lkPik7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jbGllbnQgPSBuZXcgRG9ja2VyKCk7XG4gICAgICAgIHRoaXMub25TdGFydHVwSW1hZ2VzID0gbnVsbDtcbiAgICAgICAgdGhpcy5vbkJlZm9yZVB1bGwgPSBudWxsO1xuICAgICAgICB0aGlzLl9vblN0YXJ0dXBJbWFnZXNQYXNzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faW1hZ2VzID0gbnVsbDtcbiAgICAgICAgdGhpcy5fY29udGFpbmVycyA9IG51bGw7XG4gICAgfVxuXG4gICAgZHJvcENhY2hlKCkge1xuICAgICAgICB0aGlzLl9pbWFnZXMgPSBudWxsO1xuICAgICAgICB0aGlzLl9jb250YWluZXJzID0gbnVsbDtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRJbWFnZUluZm9zKCk6IFByb21pc2U8REltYWdlSW5mb1tdPiB7XG4gICAgICAgIGlmICghdGhpcy5faW1hZ2VzKSB7XG4gICAgICAgICAgICBjb25zdCBpbWFnZXMgPSBhd2FpdCB0aGlzLmNsaWVudC5saXN0SW1hZ2VzKHthbGw6IHRydWV9KTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlcyA9IGltYWdlcztcbiAgICAgICAgICAgIGlmICghdGhpcy5fb25TdGFydHVwSW1hZ2VzUGFzc2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb25TdGFydHVwSW1hZ2VzUGFzc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vblN0YXJ0dXBJbWFnZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblN0YXJ0dXBJbWFnZXMoaW1hZ2VzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9pbWFnZXMgPSBpbWFnZXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2ltYWdlcyB8fCBbXTtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRDb250YWluZXJJbmZvcygpOiBQcm9taXNlPERDb250YWluZXJJbmZvW10+IHtcbiAgICAgICAgaWYgKCF0aGlzLl9jb250YWluZXJzKSB7XG4gICAgICAgICAgICB0aGlzLl9jb250YWluZXJzID0gYXdhaXQgdGhpcy5jbGllbnQubGlzdENvbnRhaW5lcnMoe2FsbDogdHJ1ZX0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250YWluZXJzIHx8IFtdO1xuICAgIH1cblxuICAgIGFzeW5jIG51bWVyaWNWZXJzaW9uKCk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgICAgIGNvbnN0IHZlcnNpb246IERWZXJzaW9uID0gYXdhaXQgdGhpcy5jbGllbnQudmVyc2lvbigpO1xuICAgICAgICByZXR1cm4gdmVyc2lvblRvTnVtYmVyKHZlcnNpb24uVmVyc2lvbik7XG4gICAgfVxuXG4gICAgYXN5bmMgcmVtb3ZlSW1hZ2VzKG5hbWVNYXRjaGVzOiBzdHJpbmdbXSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICAvLyBTdG9wIGFuZCByZW1vdmUgY29udGFpbmVycyB0aGF0IGJlbG9uZ3MgdG8gaW1hZ2VzXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckluZm9zID0gKGF3YWl0IHRoaXMuZ2V0Q29udGFpbmVySW5mb3MoKSkuZmlsdGVyKChpbmZvKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbmFtZU1hdGNoZXMuZmluZChtYXRjaCA9PiBEZXZEb2NrZXIuY29udGFpbmVyc0ltYWdlTWF0Y2hlZChpbmZvLCBtYXRjaCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb250YWluZXJJbmZvcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgY29uc3QgaW5mbyA9IGNvbnRhaW5lckluZm9zW2ldO1xuICAgICAgICAgICAgcHJvZ3Jlc3MoYFJlbW92aW5nIGNvbnRhaW5lciBbJHtEZXZEb2NrZXIuY29udGFpbmVyVGl0bGUoaW5mbyl9XWApO1xuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jbGllbnQuZ2V0Q29udGFpbmVyKGluZm8uSWQpO1xuICAgICAgICAgICAgYXdhaXQgY29udGFpbmVyLnN0b3AoKTtcbiAgICAgICAgICAgIGF3YWl0IGNvbnRhaW5lci5yZW1vdmUoKTtcbiAgICAgICAgICAgIHByb2dyZXNzRG9uZSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJlbW92ZSBpbWFnZXNcbiAgICAgICAgY29uc3QgaW1hZ2VJbmZvcyA9IChhd2FpdCB0aGlzLmdldEltYWdlSW5mb3MoKSkuZmlsdGVyKChpbmZvKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbmFtZU1hdGNoZXMuZmluZChtYXRjaCA9PiBEZXZEb2NrZXIuaW1hZ2VIYXNNYXRjaGVkTmFtZShpbmZvLCBtYXRjaCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWFnZUluZm9zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCBpbmZvID0gaW1hZ2VJbmZvc1tpXTtcbiAgICAgICAgICAgIHByb2dyZXNzKGBSZW1vdmluZyBpbWFnZSBbJHtEZXZEb2NrZXIuaW1hZ2VUaXRsZShpbmZvKX1dYCk7XG4gICAgICAgICAgICBjb25zdCBpbWFnZSA9IHRoaXMuY2xpZW50LmdldEltYWdlKGluZm8uSWQpO1xuICAgICAgICAgICAgYXdhaXQgaW1hZ2UucmVtb3ZlKCk7XG4gICAgICAgICAgICBwcm9ncmVzc0RvbmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIHB1bGwocmVwb1RhZzogc3RyaW5nKTogUHJvbWlzZTxEb2NrZXJJbWFnZT4ge1xuICAgICAgICBpZiAodGhpcy5vbkJlZm9yZVB1bGwpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMub25CZWZvcmVQdWxsKHJlcG9UYWcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNsaWVudCA9IHRoaXMuY2xpZW50O1xuICAgICAgICBjb25zdCB0aXRsZSA9IGBQdWxsaW5nIFske3JlcG9UYWd9XWA7XG4gICAgICAgIHByb2dyZXNzKHRpdGxlKTtcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjbGllbnQucHVsbChyZXBvVGFnLCB7fSwgZnVuY3Rpb24gKGVyciwgc3RyZWFtKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzdHJlYW0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGxhc3RSZXBvcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICBjbGllbnQubW9kZW0uZm9sbG93UHJvZ3Jlc3Moc3RyZWFtLCBvbkZpbmlzaGVkLCBvblByb2dyZXNzKTtcblxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIG9uRmluaXNoZWQoZXJyLCBvdXRwdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShvdXRwdXQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIG9uUHJvZ3Jlc3MoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NMaW5lKGAke3RpdGxlfS4uLiAke2V2ZW50LnByb2dyZXNzIHx8ICcnfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcHJvZ3Jlc3ModGl0bGUpO1xuICAgICAgICBwcm9ncmVzc0RvbmUoKTtcbiAgICAgICAgcmV0dXJuIGltYWdlO1xuICAgIH1cblxuICAgIGFzeW5jIGZpbmRJbWFnZUluZm8obmFtZTogc3RyaW5nKTogUHJvbWlzZTw/REltYWdlSW5mbz4ge1xuICAgICAgICByZXR1cm4gKGF3YWl0IHRoaXMuZ2V0SW1hZ2VJbmZvcygpKS5maW5kKHggPT4gRGV2RG9ja2VyLmltYWdlSGFzTWF0Y2hlZE5hbWUoeCwgbmFtZSkpIHx8IG51bGw7XG4gICAgfVxuXG4gICAgYXN5bmMgZmluZENvbnRhaW5lckluZm8obmFtZTogc3RyaW5nKTogUHJvbWlzZTw/RENvbnRhaW5lckluZm8+IHtcbiAgICAgICAgcmV0dXJuIChhd2FpdCB0aGlzLmdldENvbnRhaW5lckluZm9zKCkpLmZpbmQoeCA9PiBEZXZEb2NrZXIuaGFzTmFtZSh4LCBuYW1lKSkgfHwgbnVsbDtcbiAgICB9XG5cbiAgICBhc3luYyBzaHV0ZG93bkNvbnRhaW5lcihkZWY6IENvbnRhaW5lckRlZiwgZG93blRvOiBDb250YWluZXJTdGF0dXNUeXBlKSB7XG4gICAgICAgIGNvbnN0IGluZm8gPSBhd2FpdCB0aGlzLmZpbmRDb250YWluZXJJbmZvKGRlZi5jb250YWluZXJOYW1lKTtcbiAgICAgICAgaWYgKCFpbmZvKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKERldkRvY2tlci5pc1J1bm5pbmcoaW5mbykgJiYgZG93blRvIDwgQ29udGFpbmVyU3RhdHVzLnJ1bm5pbmcpIHtcbiAgICAgICAgICAgIHByb2dyZXNzKGBTdG9wcGluZyBbJHtkZWYuY29udGFpbmVyTmFtZX1dYCk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmNsaWVudC5nZXRDb250YWluZXIoaW5mby5JZCkuc3RvcCgpO1xuICAgICAgICAgICAgcHJvZ3Jlc3NEb25lKCk7XG4gICAgICAgICAgICB0aGlzLmRyb3BDYWNoZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkb3duVG8gPCBDb250YWluZXJTdGF0dXMuY3JlYXRlZCkge1xuICAgICAgICAgICAgcHJvZ3Jlc3MoYFJlbW92aW5nIFske2RlZi5jb250YWluZXJOYW1lfV1gKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY2xpZW50LmdldENvbnRhaW5lcihpbmZvLklkKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIHByb2dyZXNzRG9uZSgpO1xuICAgICAgICAgICAgdGhpcy5kcm9wQ2FjaGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGVuc3VyZUltYWdlKGRlZjogQ29udGFpbmVyRGVmKSB7XG4gICAgICAgIGlmICghKGF3YWl0IHRoaXMuZmluZEltYWdlSW5mbyhkZWYucmVxdWlyZWRJbWFnZSkpKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnB1bGwoZGVmLnJlcXVpcmVkSW1hZ2UpO1xuICAgICAgICAgICAgdGhpcy5kcm9wQ2FjaGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIHN0YXJ0dXBDb250YWluZXIoZGVmOiBDb250YWluZXJEZWYsIHVwVG86IENvbnRhaW5lclN0YXR1c1R5cGUpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5lbnN1cmVJbWFnZShkZWYpO1xuICAgICAgICBsZXQgaW5mbzogP0RDb250YWluZXJJbmZvID0gYXdhaXQgdGhpcy5maW5kQ29udGFpbmVySW5mbyhkZWYuY29udGFpbmVyTmFtZSk7XG4gICAgICAgIGlmICghaW5mbyAmJiB1cFRvID49IENvbnRhaW5lclN0YXR1cy5jcmVhdGVkKSB7XG4gICAgICAgICAgICBwcm9ncmVzcyhgQ3JlYXRpbmcgJHtkZWYuY29udGFpbmVyTmFtZX1gKTtcbiAgICAgICAgICAgIGF3YWl0IGRlZi5jcmVhdGVDb250YWluZXIodGhpcyk7XG4gICAgICAgICAgICBwcm9ncmVzc0RvbmUoKTtcbiAgICAgICAgICAgIHRoaXMuZHJvcENhY2hlKCk7XG4gICAgICAgICAgICBpbmZvID0gYXdhaXQgdGhpcy5maW5kQ29udGFpbmVySW5mbyhkZWYuY29udGFpbmVyTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZm8gJiYgIURldkRvY2tlci5pc1J1bm5pbmcoaW5mbykgJiYgdXBUbyA+PSBDb250YWluZXJTdGF0dXMucnVubmluZykge1xuICAgICAgICAgICAgcHJvZ3Jlc3MoYFN0YXJ0aW5nICR7ZGVmLmNvbnRhaW5lck5hbWV9YCk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmNsaWVudC5nZXRDb250YWluZXIoaW5mby5JZCkuc3RhcnQoKTtcbiAgICAgICAgICAgIHByb2dyZXNzRG9uZSgpO1xuICAgICAgICAgICAgdGhpcy5kcm9wQ2FjaGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIHNodXRkb3duQ29udGFpbmVycyhkZWZzOiAkUmVhZE9ubHlBcnJheTxDb250YWluZXJEZWY+LCBkb3duVG86IENvbnRhaW5lclN0YXR1c1R5cGUpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZWZzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnNodXRkb3duQ29udGFpbmVyKGRlZnNbaV0sIGRvd25Ubyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBzdGFydHVwQ29udGFpbmVycyhkZWZzOiAkUmVhZE9ubHlBcnJheTxDb250YWluZXJEZWY+LCB1cFRvOiBDb250YWluZXJTdGF0dXNUeXBlKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVmcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5zdGFydHVwQ29udGFpbmVyKGRlZnNbaV0sIHVwVG8pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgZW5zdXJlUnVubmluZyhkZWY6IENvbnRhaW5lckRlZik6IFByb21pc2U8RG9ja2VyQ29udGFpbmVyPiB7XG4gICAgICAgIGF3YWl0IHRoaXMuc3RhcnR1cENvbnRhaW5lcihkZWYsIENvbnRhaW5lclN0YXR1cy5ydW5uaW5nKTtcbiAgICAgICAgY29uc3QgaW5mbyA9IGF3YWl0IHRoaXMuZmluZENvbnRhaW5lckluZm8oZGVmLmNvbnRhaW5lck5hbWUpO1xuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnQuZ2V0Q29udGFpbmVyKChpbmZvICYmIGluZm8uSWQpIHx8IGRlZi5jb250YWluZXJOYW1lKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaGFzTmFtZShjb250YWluZXI6IERDb250YWluZXJJbmZvLCBuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgbmFtZVRvRmluZCA9IGAvJHtuYW1lfWAudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgcmV0dXJuICEhKGNvbnRhaW5lci5OYW1lcyB8fCBbXSkuZmluZChuID0+IG4udG9Mb3dlckNhc2UoKSA9PT0gbmFtZVRvRmluZCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGltYWdlVGl0bGUoaW5mbzogREltYWdlSW5mbyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBEZXZEb2NrZXIuaW1hZ2VOYW1lcyhpbmZvKVswXSB8fCBpbmZvLklkO1xuICAgIH1cblxuICAgIHN0YXRpYyBjb250YWluZXJUaXRsZShpbmZvOiBEQ29udGFpbmVySW5mbyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBpbmZvLk5hbWVzLm1hcChuYW1lID0+IG5hbWUuc3RhcnRzV2l0aCgnLycpID8gbmFtZS5zdWJzdHIoMSkgOiBuYW1lKS5qb2luKCc7Jyk7XG4gICAgfVxuXG4gICAgLy8gaWYgbWF0Y2ggc3BlY2lmaWVkIHdpdGggdGFnIGNvbXBhcmUgZXhhY3RseVxuICAgIC8vIGlmIG1hdGNoIHNwZWNpZmllZCB3aXRob3V0IHRhZyBjb21wYXJlIHVudGFnZ2VkIG5hbWVzXG4gICAgc3RhdGljIGltYWdlTmFtZU1hdGNoZWQoaW1hZ2VOYW1lOiBzdHJpbmcsIG1hdGNoOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgaW1hZ2VOYW1lID0gaW1hZ2VOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIG1hdGNoID0gbWF0Y2gudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgbWF0Y2hQYXJ0cyA9IG1hdGNoLnNwbGl0KCc6Jyk7XG4gICAgICAgIGlmIChtYXRjaFBhcnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBpbWFnZU5hbWUgPT09IG1hdGNoO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGltYWdlUGFydHMgPSBpbWFnZU5hbWUuc3BsaXQoJzonKTtcbiAgICAgICAgcmV0dXJuIGltYWdlUGFydHNbMF0gPT09IG1hdGNoUGFydHNbMF07XG4gICAgfVxuXG4gICAgc3RhdGljIGltYWdlTmFtZXMoaW5mbzogREltYWdlSW5mbyk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIC4uLihpbmZvLlJlcG9UYWdzIHx8IFtdKSxcbiAgICAgICAgICAgIC4uLihpbmZvLlJlcG9EaWdlc3RzIHx8IFtdKS5tYXAoKGRpZ2VzdCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkaWdlc3Quc3BsaXQoJ0AnKS5qb2luKCc6Jyk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaW1hZ2VIYXNNYXRjaGVkTmFtZShpbmZvOiBESW1hZ2VJbmZvLCBtYXRjaDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIURldkRvY2tlci5pbWFnZU5hbWVzKGluZm8pLmZpbmQobmFtZSA9PiB0aGlzLmltYWdlTmFtZU1hdGNoZWQobmFtZSwgbWF0Y2gpKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNSdW5uaW5nKGluZm86ID9EQ29udGFpbmVySW5mbyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISFpbmZvICYmIGluZm8uU3RhdGUudG9Mb3dlckNhc2UoKSA9PT0gJ3J1bm5pbmcnO1xuICAgIH1cblxuICAgIHN0YXRpYyBjb250YWluZXJzSW1hZ2VNYXRjaGVkKGluZm86IERDb250YWluZXJJbmZvLCBtYXRjaDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlTmFtZU1hdGNoZWQoaW5mby5JbWFnZSwgbWF0Y2gpO1xuICAgIH1cbn1cblxuXG5leHBvcnQge1xuICAgIERldkRvY2tlcixcbn1cbiJdfQ==