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
 * Copyright 2018-2020 TON DEV SOLUTIONS LTD.
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
      _regenerator["default"].mark(function _callee4(nameMatches, containersOnly) {
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
                  _context4.next = 18;
                  break;
                }

                info = containerInfos[i];
                (0, _utils.progress)("Removing container [".concat(DevDocker.containerTitle(info), "]"));
                container = this.client.getContainer(info.Id);

                if (!DevDocker.isRunning(info)) {
                  _context4.next = 12;
                  break;
                }

                _context4.next = 12;
                return container.stop();

              case 12:
                _context4.next = 14;
                return container.remove();

              case 14:
                (0, _utils.progressDone)();

              case 15:
                i += 1;
                _context4.next = 5;
                break;

              case 18:
                if (!containersOnly) {
                  _context4.next = 20;
                  break;
                }

                return _context4.abrupt("return");

              case 20:
                _context4.next = 22;
                return this.getImageInfos();

              case 22:
                _context4.t1 = function (info) {
                  return nameMatches.find(function (match) {
                    return DevDocker.imageHasMatchedName(info, match);
                  });
                };

                imageInfos = _context4.sent.filter(_context4.t1);
                _i = 0;

              case 25:
                if (!(_i < imageInfos.length)) {
                  _context4.next = 35;
                  break;
                }

                _info = imageInfos[_i];
                (0, _utils.progress)("Removing image [".concat(DevDocker.imageTitle(_info), "]"));
                image = this.client.getImage(_info.Id);
                _context4.next = 31;
                return image.remove();

              case 31:
                (0, _utils.progressDone)();

              case 32:
                _i += 1;
                _context4.next = 25;
                break;

              case 35:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function removeImages(_x, _x2) {
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

      function pull(_x3) {
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

      function findImageInfo(_x4) {
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

      function findContainerInfo(_x5) {
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
                if (!(downTo < ContainerStatus.running && DevDocker.isRunning(info))) {
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

      function shutdownContainer(_x6, _x7) {
        return _shutdownContainer.apply(this, arguments);
      }

      return shutdownContainer;
    }()
  }, {
    key: "ensureImage",
    value: function () {
      var _ensureImage = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee9(requiredImage) {
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this.findImageInfo(requiredImage);

              case 2:
                if (_context9.sent) {
                  _context9.next = 6;
                  break;
                }

                _context9.next = 5;
                return this.pull(requiredImage);

              case 5:
                this.dropCache();

              case 6:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function ensureImage(_x8) {
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
                return this.ensureImage(def.requiredImage);

              case 2:
                _context10.next = 4;
                return this.findContainerInfo(def.containerName);

              case 4:
                info = _context10.sent;

                if (!(upTo >= ContainerStatus.created && !info)) {
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
                if (!(upTo >= ContainerStatus.running && info && !DevDocker.isRunning(info))) {
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

      function startupContainer(_x9, _x10) {
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

      function shutdownContainers(_x11, _x12) {
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

      function startupContainers(_x13, _x14) {
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

      function ensureRunning(_x15) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9kb2NrZXIuanMiXSwibmFtZXMiOlsiQ29udGFpbmVyU3RhdHVzIiwibWlzc2luZyIsImNyZWF0ZWQiLCJydW5uaW5nIiwiRGV2RG9ja2VyIiwiY2xpZW50IiwiRG9ja2VyIiwib25TdGFydHVwSW1hZ2VzIiwib25CZWZvcmVQdWxsIiwiX29uU3RhcnR1cEltYWdlc1Bhc3NlZCIsIl9pbWFnZXMiLCJfY29udGFpbmVycyIsImxpc3RJbWFnZXMiLCJhbGwiLCJpbWFnZXMiLCJsaXN0Q29udGFpbmVycyIsInZlcnNpb24iLCJWZXJzaW9uIiwibmFtZU1hdGNoZXMiLCJjb250YWluZXJzT25seSIsImdldENvbnRhaW5lckluZm9zIiwiaW5mbyIsImZpbmQiLCJtYXRjaCIsImNvbnRhaW5lcnNJbWFnZU1hdGNoZWQiLCJjb250YWluZXJJbmZvcyIsImZpbHRlciIsImkiLCJsZW5ndGgiLCJjb250YWluZXJUaXRsZSIsImNvbnRhaW5lciIsImdldENvbnRhaW5lciIsIklkIiwiaXNSdW5uaW5nIiwic3RvcCIsInJlbW92ZSIsImdldEltYWdlSW5mb3MiLCJpbWFnZUhhc01hdGNoZWROYW1lIiwiaW1hZ2VJbmZvcyIsImltYWdlVGl0bGUiLCJpbWFnZSIsImdldEltYWdlIiwicmVwb1RhZyIsInRpdGxlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJwdWxsIiwiZXJyIiwic3RyZWFtIiwibGFzdFJlcG9ydFRpbWUiLCJEYXRlIiwibm93IiwibW9kZW0iLCJmb2xsb3dQcm9ncmVzcyIsIm9uRmluaXNoZWQiLCJvblByb2dyZXNzIiwib3V0cHV0IiwiZXZlbnQiLCJwcm9ncmVzcyIsIm5hbWUiLCJ4IiwiaGFzTmFtZSIsImRlZiIsImRvd25UbyIsImZpbmRDb250YWluZXJJbmZvIiwiY29udGFpbmVyTmFtZSIsImRyb3BDYWNoZSIsInJlcXVpcmVkSW1hZ2UiLCJmaW5kSW1hZ2VJbmZvIiwidXBUbyIsImVuc3VyZUltYWdlIiwiY3JlYXRlQ29udGFpbmVyIiwic3RhcnQiLCJkZWZzIiwic2h1dGRvd25Db250YWluZXIiLCJzdGFydHVwQ29udGFpbmVyIiwibmFtZVRvRmluZCIsInRvTG93ZXJDYXNlIiwiTmFtZXMiLCJuIiwiaW1hZ2VOYW1lcyIsIm1hcCIsInN0YXJ0c1dpdGgiLCJzdWJzdHIiLCJqb2luIiwiaW1hZ2VOYW1lIiwibWF0Y2hQYXJ0cyIsInNwbGl0IiwiaW1hZ2VQYXJ0cyIsIlJlcG9UYWdzIiwiUmVwb0RpZ2VzdHMiLCJkaWdlc3QiLCJpbWFnZU5hbWVNYXRjaGVkIiwiU3RhdGUiLCJJbWFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZUE7O0FBRUE7O0FBakJBOzs7Ozs7Ozs7Ozs7OztBQTZITyxJQUFNQSxlQUFlLEdBQUc7QUFDM0JDLEVBQUFBLE9BQU8sRUFBRSxDQURrQjtBQUUzQkMsRUFBQUEsT0FBTyxFQUFFLENBRmtCO0FBRzNCQyxFQUFBQSxPQUFPLEVBQUU7QUFIa0IsQ0FBeEI7OztJQWdCREMsUzs7O0FBUUYsdUJBQWM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNWLFNBQUtDLE1BQUwsR0FBYyxJQUFJQyxxQkFBSixFQUFkO0FBQ0EsU0FBS0MsZUFBTCxHQUF1QixJQUF2QjtBQUNBLFNBQUtDLFlBQUwsR0FBb0IsSUFBcEI7QUFDQSxTQUFLQyxzQkFBTCxHQUE4QixLQUE5QjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxJQUFmO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQixJQUFuQjtBQUNIOzs7O2dDQUVXO0FBQ1IsV0FBS0QsT0FBTCxHQUFlLElBQWY7QUFDQSxXQUFLQyxXQUFMLEdBQW1CLElBQW5CO0FBQ0g7Ozs7Ozs7Ozs7Ozs7b0JBR1EsS0FBS0QsTzs7Ozs7O3VCQUNlLEtBQUtMLE1BQUwsQ0FBWU8sVUFBWixDQUF1QjtBQUFDQyxrQkFBQUEsR0FBRyxFQUFFO0FBQU4saUJBQXZCLEM7OztBQUFmQyxnQkFBQUEsTztBQUNOLHFCQUFLSixPQUFMLEdB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ZUFBTzBELFNBQVMsS0FBSy9ELEtBQXJCO0FBQ0g7O0FBQ0QsVUFBTWtFLFVBQVUsR0FBR0gsU0FBUyxDQUFDRSxLQUFWLENBQWdCLEdBQWhCLENBQW5CO0FBQ0EsYUFBT0MsVUFBVSxDQUFDLENBQUQsQ0FBVixLQUFrQkYsVUFBVSxDQUFDLENBQUQsQ0FBbkM7QUFDSDs7OytCQUVpQmxFLEksRUFBNEI7QUFDMUMsMkRBQ1FBLElBQUksQ0FBQ3FFLFFBQUwsSUFBaUIsRUFEekIsdUNBRU8sQ0FBQ3JFLElBQUksQ0FBQ3NFLFdBQUwsSUFBb0IsRUFBckIsRUFBeUJULEdBQXpCLENBQTZCLFVBQUNVLE1BQUQsRUFBWTtBQUN4QyxlQUFPQSxNQUFNLENBQUNKLEtBQVAsQ0FBYSxHQUFiLEVBQWtCSCxJQUFsQixDQUF1QixHQUF2QixDQUFQO0FBQ0gsT0FGRSxDQUZQO0FBTUg7Ozt3Q0FFMEJoRSxJLEVBQWtCRSxLLEVBQXdCO0FBQUE7O0FBQ2pFLGFBQU8sQ0FBQyxDQUFDbkIsU0FBUyxDQUFDNkUsVUFBVixDQUFxQjVELElBQXJCLEVBQTJCQyxJQUEzQixDQUFnQyxVQUFBc0MsSUFBSTtBQUFBLGVBQUksS0FBSSxDQUFDaUMsZ0JBQUwsQ0FBc0JqQyxJQUF0QixFQUE0QnJDLEtBQTVCLENBQUo7QUFBQSxPQUFwQyxDQUFUO0FBQ0g7Ozs4QkFFZ0JGLEksRUFBZ0M7QUFDN0MsYUFBTyxDQUFDLENBQUNBLElBQUYsSUFBVUEsSUFBSSxDQUFDeUUsS0FBTCxDQUFXaEIsV0FBWCxPQUE2QixTQUE5QztBQUNIOzs7MkNBRTZCekQsSSxFQUFzQkUsSyxFQUF3QjtBQUN4RSxhQUFPLEtBQUtzRSxnQkFBTCxDQUFzQnhFLElBQUksQ0FBQzBFLEtBQTNCLEVBQWtDeEUsS0FBbEMsQ0FBUDtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuLy8gQGZsb3dcbmltcG9ydCBEb2NrZXIgZnJvbSAnZG9ja2Vyb2RlJztcblxuaW1wb3J0IHtwcm9ncmVzcywgcHJvZ3Jlc3NEb25lLCBwcm9ncmVzc0xpbmUsIHZlcnNpb25Ub051bWJlcn0gZnJvbSBcIi4vdXRpbHNcIjtcblxuZXhwb3J0IHR5cGUgREltYWdlSW5mbyA9IHtcbiAgICBJZDogc3RyaW5nLFxuICAgIFJlcG9UYWdzOiBzdHJpbmdbXSxcbiAgICBSZXBvRGlnZXN0czogc3RyaW5nW10sXG59XG5cbmV4cG9ydCB0eXBlIERNb3VudCA9IHtcbiAgICBEZXN0aW5hdGlvbjogc3RyaW5nLFxuICAgIFNvdXJjZTogc3RyaW5nLFxuICAgIFR5cGU6ICdiaW5kJyB8ICd2b2x1bWUnIHwgJ3RtcGZzJyxcbn1cblxuZXhwb3J0IHR5cGUgRENvbnRhaW5lckluZm8gPSB7XG4gICAgSWQ6IHN0cmluZyxcbiAgICBOYW1lczogc3RyaW5nW10sXG4gICAgSW1hZ2U6IHN0cmluZyxcbiAgICBJbWFnZUlEOiBzdHJpbmcsXG4gICAgU3RhdGU6IHN0cmluZyxcbiAgICBNb3VudHM6IERNb3VudFtdLFxufVxuXG5leHBvcnQgdHlwZSBEQ29udGFpbmVyRXhlY09wdGlvbnMgPSB7XG4gICAgQXR0YWNoU3RkaW4/OiBib29sZWFuLFxuICAgIEF0dGFjaFN0ZG91dD86IGJvb2xlYW4sXG4gICAgQXR0YWNoU3RkZXJyPzogYm9vbGVhbixcbiAgICBEZXRhY2hLZXlzPzogc3RyaW5nLFxuICAgIFR0eT86IGJvb2xlYW4sXG4gICAgRW52Pzogc3RyaW5nLFxuICAgIENtZD86IHN0cmluZ1tdLFxuICAgIFByaXZpbGVnZWQ/OiBib29sZWFuLFxuICAgIFVzZXI/OiBzdHJpbmcsXG4gICAgV29ya2luZ0Rpcj86IHN0cmluZyxcbn1cblxuZXhwb3J0IHR5cGUgRG9ja2VyTW9kZW0gPSB7XG4gICAgZm9sbG93UHJvZ3Jlc3MoXG4gICAgICAgIHN0cmVhbTogYW55LFxuICAgICAgICBvbkZpbmlzaGVkOiAoZXJyOiBhbnksIG91dHB1dDogYW55KSA9PiB2b2lkLFxuICAgICAgICBvblByb2dyZXNzOiAoZXZlbnQ6IGFueSkgPT4gdm9pZCxcbiAgICApOiB2b2lkLFxuXG4gICAgZGVtdXhTdHJlYW0oXG4gICAgICAgIHN0cmVhbTogYW55LFxuICAgICAgICBzdGRvdXQ6IGFueSxcbiAgICAgICAgc3RkZXJyOiBhbnksXG4gICAgKTogdm9pZCxcbn1cblxuZXhwb3J0IHR5cGUgRG9ja2VyQ29udGFpbmVyID0ge1xuICAgIGlkOiBzdHJpbmcsXG4gICAgbW9kZW06IERvY2tlck1vZGVtLFxuICAgIHN0YXJ0KCk6IFByb21pc2U8dm9pZD4sXG4gICAgZXhlYyhvcHRpb25zOiBEQ29udGFpbmVyRXhlY09wdGlvbnMsIGNhbGxiYWNrOiBhbnkpOiB2b2lkLFxuICAgIHN0b3AoKTogUHJvbWlzZTx2b2lkPixcbiAgICByZW1vdmUoKTogUHJvbWlzZTx2b2lkPixcbn1cblxuZXhwb3J0IHR5cGUgRG9ja2VySW1hZ2UgPSB7XG4gICAgcmVtb3ZlKCk6IFByb21pc2U8dm9pZD4sXG59XG5cbmV4cG9ydCB0eXBlIERQb3J0QmluZGluZ3MgPSB7XG4gICAgW3N0cmluZ106IHsgSG9zdElwOiBzdHJpbmcsIEhvc3RQb3J0OiBzdHJpbmcgfVtdXG59O1xuXG5leHBvcnQgdHlwZSBEQ3JlYXRlQ29udGFpbmVyT3B0aW9ucyA9IHtcbiAgICBuYW1lPzogc3RyaW5nLFxuICAgIEltYWdlOiBzdHJpbmcsXG4gICAgSW50ZXJhY3RpdmU/OiBib29sZWFuLFxuICAgIFR0eT86IGJvb2xlYW4sXG4gICAgVXNlcj86IHN0cmluZyxcbiAgICBFbnRyeXBvaW50Pzogc3RyaW5nW10sXG4gICAgRW52OiBzdHJpbmdbXSxcbiAgICBIb3N0Q29uZmlnPzoge1xuICAgICAgICBNb3VudHM/OiBETW91bnRbXSxcbiAgICB9LFxuICAgIEV4cG9zZWRQb3J0cz86IHtcbiAgICAgICAgW3N0cmluZ106IHt9LFxuICAgIH0sXG4gICAgSG9zdENvbmZpZz86IHtcbiAgICAgICAgUG9ydEJpbmRpbmdzPzogRFBvcnRCaW5kaW5ncyxcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIERWZXJzaW9uID0ge1xuICAgIFZlcnNpb246IHN0cmluZyxcbn1cblxuZXhwb3J0IHR5cGUgRG9ja2VyQ2xpZW50ID0ge1xuICAgIHZlcnNpb24oKTogUHJvbWlzZTxEVmVyc2lvbj4sXG5cbiAgICBsaXN0Q29udGFpbmVycyhvcHRpb25zPzogeyBhbGw/OiB0cnVlIH0pOiBQcm9taXNlPERDb250YWluZXJJbmZvW10+LFxuXG4gICAgbGlzdEltYWdlcyhvcHRpb25zPzogeyBhbGw/OiB0cnVlIH0pOiBQcm9taXNlPERJbWFnZUluZm9bXT4sXG5cbiAgICBnZXRDb250YWluZXIoaWQ6IHN0cmluZyk6IERvY2tlckNvbnRhaW5lcixcblxuICAgIGdldEltYWdlKG5hbWU6IHN0cmluZyk6IERvY2tlckltYWdlLFxuXG4gICAgY3JlYXRlQ29udGFpbmVyKG9wdGlvbnM6IERDcmVhdGVDb250YWluZXJPcHRpb25zKTogUHJvbWlzZTxEb2NrZXJDb250YWluZXI+LFxuXG4gICAgcHVsbChyZXBvVGFnOiBzdHJpbmcsIGF1dGg6IGFueSwgKGVycjogYW55LCBzdHJlYW06IGFueSkgPT4gdm9pZCk6IHZvaWQsXG5cbiAgICBtb2RlbTogRG9ja2VyTW9kZW0sXG59XG5cbmV4cG9ydCBjb25zdCBDb250YWluZXJTdGF0dXMgPSB7XG4gICAgbWlzc2luZzogMCxcbiAgICBjcmVhdGVkOiAxLFxuICAgIHJ1bm5pbmc6IDIsXG59O1xuXG5leHBvcnQgdHlwZSBDb250YWluZXJTdGF0dXNUeXBlID0gMCB8IDEgfCAyO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbnRhaW5lckRlZiB7XG4gICAgcmVxdWlyZWRJbWFnZTogc3RyaW5nLFxuICAgIGNvbnRhaW5lck5hbWU6IHN0cmluZyxcblxuICAgIGNyZWF0ZUNvbnRhaW5lcihkb2NrZXI6IERldkRvY2tlcik6IFByb21pc2U8RG9ja2VyQ29udGFpbmVyPlxufVxuXG5cbmNsYXNzIERldkRvY2tlciB7XG4gICAgY2xpZW50OiBEb2NrZXJDbGllbnQ7XG4gICAgX2ltYWdlczogPyhESW1hZ2VJbmZvW10pO1xuICAgIF9jb250YWluZXJzOiA/KERDb250YWluZXJJbmZvW10pO1xuICAgIF9vblN0YXJ0dXBJbWFnZXNQYXNzZWQ6IGJvb2xlYW47XG4gICAgb25TdGFydHVwSW1hZ2VzOiA/KChpbWFnZXM6IERJbWFnZUluZm9bXSkgPT4gdm9pZCk7XG4gICAgb25CZWZvcmVQdWxsOiA/KChyZXBvVGFnOiBzdHJpbmcpID0+IFByb21pc2U8dm9pZD4pO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2xpZW50ID0gbmV3IERvY2tlcigpO1xuICAgICAgICB0aGlzLm9uU3RhcnR1cEltYWdlcyA9IG51bGw7XG4gICAgICAgIHRoaXMub25CZWZvcmVQdWxsID0gbnVsbDtcbiAgICAgICAgdGhpcy5fb25TdGFydHVwSW1hZ2VzUGFzc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2ltYWdlcyA9IG51bGw7XG4gICAgICAgIHRoaXMuX2NvbnRhaW5lcnMgPSBudWxsO1xuICAgIH1cblxuICAgIGRyb3BDYWNoZSgpIHtcbiAgICAgICAgdGhpcy5faW1hZ2VzID0gbnVsbDtcbiAgICAgICAgdGhpcy5fY29udGFpbmVycyA9IG51bGw7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0SW1hZ2VJbmZvcygpOiBQcm9taXNlPERJbWFnZUluZm9bXT4ge1xuICAgICAgICBpZiAoIXRoaXMuX2ltYWdlcykge1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VzID0gYXdhaXQgdGhpcy5jbGllbnQubGlzdEltYWdlcyh7YWxsOiB0cnVlfSk7XG4gICAgICAgICAgICB0aGlzLl9pbWFnZXMgPSBpbWFnZXM7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX29uU3RhcnR1cEltYWdlc1Bhc3NlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX29uU3RhcnR1cEltYWdlc1Bhc3NlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub25TdGFydHVwSW1hZ2VzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25TdGFydHVwSW1hZ2VzKGltYWdlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5faW1hZ2VzID0gaW1hZ2VzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9pbWFnZXMgfHwgW107XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0Q29udGFpbmVySW5mb3MoKTogUHJvbWlzZTxEQ29udGFpbmVySW5mb1tdPiB7XG4gICAgICAgIGlmICghdGhpcy5fY29udGFpbmVycykge1xuICAgICAgICAgICAgdGhpcy5fY29udGFpbmVycyA9IGF3YWl0IHRoaXMuY2xpZW50Lmxpc3RDb250YWluZXJzKHthbGw6IHRydWV9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fY29udGFpbmVycyB8fCBbXTtcbiAgICB9XG5cbiAgICBhc3luYyBudW1lcmljVmVyc2lvbigpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgICAgICBjb25zdCB2ZXJzaW9uOiBEVmVyc2lvbiA9IGF3YWl0IHRoaXMuY2xpZW50LnZlcnNpb24oKTtcbiAgICAgICAgcmV0dXJuIHZlcnNpb25Ub051bWJlcih2ZXJzaW9uLlZlcnNpb24pO1xuICAgIH1cblxuICAgIGFzeW5jIHJlbW92ZUltYWdlcyhuYW1lTWF0Y2hlczogc3RyaW5nW10sIGNvbnRhaW5lcnNPbmx5OiBib29sZWFuKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIC8vIFN0b3AgYW5kIHJlbW92ZSBjb250YWluZXJzIHRoYXQgYmVsb25ncyB0byBpbWFnZXNcbiAgICAgICAgY29uc3QgY29udGFpbmVySW5mb3MgPSAoYXdhaXQgdGhpcy5nZXRDb250YWluZXJJbmZvcygpKS5maWx0ZXIoKGluZm8pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBuYW1lTWF0Y2hlcy5maW5kKG1hdGNoID0+IERldkRvY2tlci5jb250YWluZXJzSW1hZ2VNYXRjaGVkKGluZm8sIG1hdGNoKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbnRhaW5lckluZm9zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCBpbmZvID0gY29udGFpbmVySW5mb3NbaV07XG4gICAgICAgICAgICBwcm9ncmVzcyhgUmVtb3ZpbmcgY29udGFpbmVyIFske0RldkRvY2tlci5jb250YWluZXJUaXRsZShpbmZvKX1dYCk7XG4gICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmNsaWVudC5nZXRDb250YWluZXIoaW5mby5JZCk7XG4gICAgICAgICAgICBpZiAoRGV2RG9ja2VyLmlzUnVubmluZyhpbmZvKSkge1xuICAgICAgICAgICAgICAgIGF3YWl0IGNvbnRhaW5lci5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhd2FpdCBjb250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgICAgICBwcm9ncmVzc0RvbmUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZihjb250YWluZXJzT25seSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJlbW92ZSBpbWFnZXNcbiAgICAgICAgY29uc3QgaW1hZ2VJbmZvcyA9IChhd2FpdCB0aGlzLmdldEltYWdlSW5mb3MoKSkuZmlsdGVyKChpbmZvKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbmFtZU1hdGNoZXMuZmluZChtYXRjaCA9PiBEZXZEb2NrZXIuaW1hZ2VIYXNNYXRjaGVkTmFtZShpbmZvLCBtYXRjaCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWFnZUluZm9zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCBpbmZvID0gaW1hZ2VJbmZvc1tpXTtcbiAgICAgICAgICAgIHByb2dyZXNzKGBSZW1vdmluZyBpbWFnZSBbJHtEZXZEb2NrZXIuaW1hZ2VUaXRsZShpbmZvKX1dYCk7XG4gICAgICAgICAgICBjb25zdCBpbWFnZSA9IHRoaXMuY2xpZW50LmdldEltYWdlKGluZm8uSWQpO1xuICAgICAgICAgICAgYXdhaXQgaW1hZ2UucmVtb3ZlKCk7XG4gICAgICAgICAgICBwcm9ncmVzc0RvbmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIHB1bGwocmVwb1RhZzogc3RyaW5nKTogUHJvbWlzZTxEb2NrZXJJbWFnZT4ge1xuICAgICAgICBpZiAodGhpcy5vbkJlZm9yZVB1bGwpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMub25CZWZvcmVQdWxsKHJlcG9UYWcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNsaWVudCA9IHRoaXMuY2xpZW50O1xuICAgICAgICBjb25zdCB0aXRsZSA9IGBQdWxsaW5nIFske3JlcG9UYWd9XWA7XG4gICAgICAgIHByb2dyZXNzKHRpdGxlKTtcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjbGllbnQucHVsbChyZXBvVGFnLCB7fSwgZnVuY3Rpb24gKGVyciwgc3RyZWFtKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzdHJlYW0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGxhc3RSZXBvcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICBjbGllbnQubW9kZW0uZm9sbG93UHJvZ3Jlc3Moc3RyZWFtLCBvbkZpbmlzaGVkLCBvblByb2dyZXNzKTtcblxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIG9uRmluaXNoZWQoZXJyLCBvdXRwdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShvdXRwdXQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIG9uUHJvZ3Jlc3MoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NMaW5lKGAke3RpdGxlfS4uLiAke2V2ZW50LnByb2dyZXNzIHx8ICcnfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcHJvZ3Jlc3ModGl0bGUpO1xuICAgICAgICBwcm9ncmVzc0RvbmUoKTtcbiAgICAgICAgcmV0dXJuIGltYWdlO1xuICAgIH1cblxuICAgIGFzeW5jIGZpbmRJbWFnZUluZm8obmFtZTogc3RyaW5nKTogUHJvbWlzZTw/REltYWdlSW5mbz4ge1xuICAgICAgICByZXR1cm4gKGF3YWl0IHRoaXMuZ2V0SW1hZ2VJbmZvcygpKS5maW5kKHggPT4gRGV2RG9ja2VyLmltYWdlSGFzTWF0Y2hlZE5hbWUoeCwgbmFtZSkpIHx8IG51bGw7XG4gICAgfVxuXG4gICAgYXN5bmMgZmluZENvbnRhaW5lckluZm8obmFtZTogc3RyaW5nKTogUHJvbWlzZTw/RENvbnRhaW5lckluZm8+IHtcbiAgICAgICAgcmV0dXJuIChhd2FpdCB0aGlzLmdldENvbnRhaW5lckluZm9zKCkpLmZpbmQoeCA9PiBEZXZEb2NrZXIuaGFzTmFtZSh4LCBuYW1lKSkgfHwgbnVsbDtcbiAgICB9XG5cbiAgICBhc3luYyBzaHV0ZG93bkNvbnRhaW5lcihkZWY6IENvbnRhaW5lckRlZiwgZG93blRvOiBDb250YWluZXJTdGF0dXNUeXBlKSB7XG4gICAgICAgIGNvbnN0IGluZm8gPSBhd2FpdCB0aGlzLmZpbmRDb250YWluZXJJbmZvKGRlZi5jb250YWluZXJOYW1lKTtcbiAgICAgICAgaWYgKCFpbmZvKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRvd25UbyA8IENvbnRhaW5lclN0YXR1cy5ydW5uaW5nICYmIERldkRvY2tlci5pc1J1bm5pbmcoaW5mbykpIHtcbiAgICAgICAgICAgIHByb2dyZXNzKGBTdG9wcGluZyBbJHtkZWYuY29udGFpbmVyTmFtZX1dYCk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmNsaWVudC5nZXRDb250YWluZXIoaW5mby5JZCkuc3RvcCgpO1xuICAgICAgICAgICAgcHJvZ3Jlc3NEb25lKCk7XG4gICAgICAgICAgICB0aGlzLmRyb3BDYWNoZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkb3duVG8gPCBDb250YWluZXJTdGF0dXMuY3JlYXRlZCkge1xuICAgICAgICAgICAgcHJvZ3Jlc3MoYFJlbW92aW5nIFske2RlZi5jb250YWluZXJOYW1lfV1gKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY2xpZW50LmdldENvbnRhaW5lcihpbmZvLklkKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIHByb2dyZXNzRG9uZSgpO1xuICAgICAgICAgICAgdGhpcy5kcm9wQ2FjaGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGVuc3VyZUltYWdlKHJlcXVpcmVkSW1hZ2U6IHN0cmluZykge1xuICAgICAgICBpZiAoIShhd2FpdCB0aGlzLmZpbmRJbWFnZUluZm8ocmVxdWlyZWRJbWFnZSkpKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnB1bGwocmVxdWlyZWRJbWFnZSk7XG4gICAgICAgICAgICB0aGlzLmRyb3BDYWNoZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgc3RhcnR1cENvbnRhaW5lcihkZWY6IENvbnRhaW5lckRlZiwgdXBUbzogQ29udGFpbmVyU3RhdHVzVHlwZSkge1xuICAgICAgICBhd2FpdCB0aGlzLmVuc3VyZUltYWdlKGRlZi5yZXF1aXJlZEltYWdlKTtcbiAgICAgICAgbGV0IGluZm86ID9EQ29udGFpbmVySW5mbyA9IGF3YWl0IHRoaXMuZmluZENvbnRhaW5lckluZm8oZGVmLmNvbnRhaW5lck5hbWUpO1xuICAgICAgICBpZiAodXBUbyA+PSBDb250YWluZXJTdGF0dXMuY3JlYXRlZCAmJiAhaW5mbykge1xuICAgICAgICAgICAgcHJvZ3Jlc3MoYENyZWF0aW5nICR7ZGVmLmNvbnRhaW5lck5hbWV9YCk7XG4gICAgICAgICAgICBhd2FpdCBkZWYuY3JlYXRlQ29udGFpbmVyKHRoaXMpO1xuICAgICAgICAgICAgcHJvZ3Jlc3NEb25lKCk7XG4gICAgICAgICAgICB0aGlzLmRyb3BDYWNoZSgpO1xuICAgICAgICAgICAgaW5mbyA9IGF3YWl0IHRoaXMuZmluZENvbnRhaW5lckluZm8oZGVmLmNvbnRhaW5lck5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cFRvID49IENvbnRhaW5lclN0YXR1cy5ydW5uaW5nICYmIGluZm8gJiYgIURldkRvY2tlci5pc1J1bm5pbmcoaW5mbykpIHtcbiAgICAgICAgICAgIHByb2dyZXNzKGBTdGFydGluZyAke2RlZi5jb250YWluZXJOYW1lfWApO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5jbGllbnQuZ2V0Q29udGFpbmVyKGluZm8uSWQpLnN0YXJ0KCk7XG4gICAgICAgICAgICBwcm9ncmVzc0RvbmUoKTtcbiAgICAgICAgICAgIHRoaXMuZHJvcENhY2hlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBzaHV0ZG93bkNvbnRhaW5lcnMoZGVmczogJFJlYWRPbmx5QXJyYXk8Q29udGFpbmVyRGVmPiwgZG93blRvOiBDb250YWluZXJTdGF0dXNUeXBlKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVmcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5zaHV0ZG93bkNvbnRhaW5lcihkZWZzW2ldLCBkb3duVG8pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgc3RhcnR1cENvbnRhaW5lcnMoZGVmczogJFJlYWRPbmx5QXJyYXk8Q29udGFpbmVyRGVmPiwgdXBUbzogQ29udGFpbmVyU3RhdHVzVHlwZSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlZnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuc3RhcnR1cENvbnRhaW5lcihkZWZzW2ldLCB1cFRvKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGVuc3VyZVJ1bm5pbmcoZGVmOiBDb250YWluZXJEZWYpOiBQcm9taXNlPERvY2tlckNvbnRhaW5lcj4ge1xuICAgICAgICBhd2FpdCB0aGlzLnN0YXJ0dXBDb250YWluZXIoZGVmLCBDb250YWluZXJTdGF0dXMucnVubmluZyk7XG4gICAgICAgIGNvbnN0IGluZm8gPSBhd2FpdCB0aGlzLmZpbmRDb250YWluZXJJbmZvKGRlZi5jb250YWluZXJOYW1lKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xpZW50LmdldENvbnRhaW5lcigoaW5mbyAmJiBpbmZvLklkKSB8fCBkZWYuY29udGFpbmVyTmFtZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGhhc05hbWUoY29udGFpbmVyOiBEQ29udGFpbmVySW5mbywgbmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IG5hbWVUb0ZpbmQgPSBgLyR7bmFtZX1gLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHJldHVybiAhIShjb250YWluZXIuTmFtZXMgfHwgW10pLmZpbmQobiA9PiBuLnRvTG93ZXJDYXNlKCkgPT09IG5hbWVUb0ZpbmQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpbWFnZVRpdGxlKGluZm86IERJbWFnZUluZm8pOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gRGV2RG9ja2VyLmltYWdlTmFtZXMoaW5mbylbMF0gfHwgaW5mby5JZDtcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGFpbmVyVGl0bGUoaW5mbzogRENvbnRhaW5lckluZm8pOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gaW5mby5OYW1lcy5tYXAobmFtZSA9PiBuYW1lLnN0YXJ0c1dpdGgoJy8nKSA/IG5hbWUuc3Vic3RyKDEpIDogbmFtZSkuam9pbignOycpO1xuICAgIH1cblxuICAgIC8vIGlmIG1hdGNoIHNwZWNpZmllZCB3aXRoIHRhZyBjb21wYXJlIGV4YWN0bHlcbiAgICAvLyBpZiBtYXRjaCBzcGVjaWZpZWQgd2l0aG91dCB0YWcgY29tcGFyZSB1bnRhZ2dlZCBuYW1lc1xuICAgIHN0YXRpYyBpbWFnZU5hbWVNYXRjaGVkKGltYWdlTmFtZTogc3RyaW5nLCBtYXRjaDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGltYWdlTmFtZSA9IGltYWdlTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBtYXRjaCA9IG1hdGNoLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IG1hdGNoUGFydHMgPSBtYXRjaC5zcGxpdCgnOicpO1xuICAgICAgICBpZiAobWF0Y2hQYXJ0cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICByZXR1cm4gaW1hZ2VOYW1lID09PSBtYXRjaDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpbWFnZVBhcnRzID0gaW1hZ2VOYW1lLnNwbGl0KCc6Jyk7XG4gICAgICAgIHJldHVybiBpbWFnZVBhcnRzWzBdID09PSBtYXRjaFBhcnRzWzBdO1xuICAgIH1cblxuICAgIHN0YXRpYyBpbWFnZU5hbWVzKGluZm86IERJbWFnZUluZm8pOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAuLi4oaW5mby5SZXBvVGFncyB8fCBbXSksXG4gICAgICAgICAgICAuLi4oaW5mby5SZXBvRGlnZXN0cyB8fCBbXSkubWFwKChkaWdlc3QpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlnZXN0LnNwbGl0KCdAJykuam9pbignOicpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgc3RhdGljIGltYWdlSGFzTWF0Y2hlZE5hbWUoaW5mbzogREltYWdlSW5mbywgbWF0Y2g6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISFEZXZEb2NrZXIuaW1hZ2VOYW1lcyhpbmZvKS5maW5kKG5hbWUgPT4gdGhpcy5pbWFnZU5hbWVNYXRjaGVkKG5hbWUsIG1hdGNoKSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzUnVubmluZyhpbmZvOiA/RENvbnRhaW5lckluZm8pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhaW5mbyAmJiBpbmZvLlN0YXRlLnRvTG93ZXJDYXNlKCkgPT09ICdydW5uaW5nJztcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGFpbmVyc0ltYWdlTWF0Y2hlZChpbmZvOiBEQ29udGFpbmVySW5mbywgbWF0Y2g6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pbWFnZU5hbWVNYXRjaGVkKGluZm8uSW1hZ2UsIG1hdGNoKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IHtcbiAgICBEZXZEb2NrZXIsXG59XG4iXX0=