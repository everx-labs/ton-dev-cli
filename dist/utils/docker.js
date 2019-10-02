"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DevDocker = exports.ContainerStatus = void 0;

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
    key: "getImages",
    value: function () {
      var _getImages = (0, _asyncToGenerator2["default"])(
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

      function getImages() {
        return _getImages.apply(this, arguments);
      }

      return getImages;
    }()
  }, {
    key: "getContainers",
    value: function () {
      var _getContainers = (0, _asyncToGenerator2["default"])(
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

      function getContainers() {
        return _getContainers.apply(this, arguments);
      }

      return getContainers;
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
    key: "pull",
    value: function () {
      var _pull = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(repoTag) {
        var client;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!this.onBeforePull) {
                  _context4.next = 3;
                  break;
                }

                _context4.next = 3;
                return this.onBeforePull(repoTag);

              case 3:
                client = this.client;
                return _context4.abrupt("return", new Promise(function (resolve, reject) {
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

                    function onProgress(_event) {
                      var isTimeToReport = Date.now() > lastReportTime + 1000;

                      if (isTimeToReport) {
                        lastReportTime = Date.now();
                        process.stdout.write('.');
                      }
                    }
                  });
                }));

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function pull(_x) {
        return _pull.apply(this, arguments);
      }

      return pull;
    }()
  }, {
    key: "findImageInfo",
    value: function () {
      var _findImageInfo = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(name) {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.getImages();

              case 2:
                _context5.t1 = function (x) {
                  return DevDocker.imageHasRepoTag(x, name);
                };

                _context5.t0 = _context5.sent.find(_context5.t1);

                if (_context5.t0) {
                  _context5.next = 6;
                  break;
                }

                _context5.t0 = null;

              case 6:
                return _context5.abrupt("return", _context5.t0);

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function findImageInfo(_x2) {
        return _findImageInfo.apply(this, arguments);
      }

      return findImageInfo;
    }()
  }, {
    key: "findContainerInfo",
    value: function () {
      var _findContainerInfo = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6(name) {
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.getContainers();

              case 2:
                _context6.t1 = function (x) {
                  return DevDocker.hasName(x, name);
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

      function findContainerInfo(_x3) {
        return _findContainerInfo.apply(this, arguments);
      }

      return findContainerInfo;
    }()
  }, {
    key: "shutdownContainer",
    value: function () {
      var _shutdownContainer = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee7(def, downTo) {
        var info;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.findContainerInfo(def.containerName);

              case 2:
                info = _context7.sent;

                if (info) {
                  _context7.next = 5;
                  break;
                }

                return _context7.abrupt("return");

              case 5:
                if (!(DevDocker.isRunning(info) && downTo < ContainerStatus.running)) {
                  _context7.next = 11;
                  break;
                }

                (0, _utils.progress)("Stopping ".concat(def.containerName));
                _context7.next = 9;
                return this.client.getContainer(info.Id).stop();

              case 9:
                (0, _utils.progressDone)();
                this.dropCache();

              case 11:
                if (!(downTo < ContainerStatus.created)) {
                  _context7.next = 17;
                  break;
                }

                (0, _utils.progress)("Removing ".concat(def.containerName));
                _context7.next = 15;
                return this.client.getContainer(info.Id).remove();

              case 15:
                (0, _utils.progressDone)();
                this.dropCache();

              case 17:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function shutdownContainer(_x4, _x5) {
        return _shutdownContainer.apply(this, arguments);
      }

      return shutdownContainer;
    }()
  }, {
    key: "ensureImage",
    value: function () {
      var _ensureImage = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee8(def) {
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.findImageInfo(def.requiredImage);

              case 2:
                if (_context8.sent) {
                  _context8.next = 8;
                  break;
                }

                (0, _utils.progress)("Pulling ".concat(def.containerName));
                _context8.next = 6;
                return this.pull(def.requiredImage);

              case 6:
                (0, _utils.progressDone)();
                this.dropCache();

              case 8:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function ensureImage(_x6) {
        return _ensureImage.apply(this, arguments);
      }

      return ensureImage;
    }()
  }, {
    key: "startupContainer",
    value: function () {
      var _startupContainer = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee9(def, upTo) {
        var info;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this.ensureImage(def);

              case 2:
                _context9.next = 4;
                return this.findContainerInfo(def.containerName);

              case 4:
                info = _context9.sent;

                if (!(!info && upTo >= ContainerStatus.created)) {
                  _context9.next = 14;
                  break;
                }

                (0, _utils.progress)("Creating ".concat(def.containerName));
                _context9.next = 9;
                return def.createContainer(this);

              case 9:
                (0, _utils.progressDone)();
                this.dropCache();
                _context9.next = 13;
                return this.findContainerInfo(def.containerName);

              case 13:
                info = _context9.sent;

              case 14:
                if (!(info && !DevDocker.isRunning(info) && upTo >= ContainerStatus.running)) {
                  _context9.next = 20;
                  break;
                }

                (0, _utils.progress)("Starting ".concat(def.containerName));
                _context9.next = 18;
                return this.client.getContainer(info.Id).start();

              case 18:
                (0, _utils.progressDone)();
                this.dropCache();

              case 20:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function startupContainer(_x7, _x8) {
        return _startupContainer.apply(this, arguments);
      }

      return startupContainer;
    }()
  }, {
    key: "shutdownContainers",
    value: function () {
      var _shutdownContainers = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee10(defs, downTo) {
        var i;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                i = 0;

              case 1:
                if (!(i < defs.length)) {
                  _context10.next = 7;
                  break;
                }

                _context10.next = 4;
                return this.shutdownContainer(defs[i], downTo);

              case 4:
                i += 1;
                _context10.next = 1;
                break;

              case 7:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function shutdownContainers(_x9, _x10) {
        return _shutdownContainers.apply(this, arguments);
      }

      return shutdownContainers;
    }()
  }, {
    key: "startupContainers",
    value: function () {
      var _startupContainers = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee11(defs, upTo) {
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
                return this.startupContainer(defs[i], upTo);

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

      function startupContainers(_x11, _x12) {
        return _startupContainers.apply(this, arguments);
      }

      return startupContainers;
    }()
  }, {
    key: "ensureRunning",
    value: function () {
      var _ensureRunning = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee12(def) {
        var info;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return this.startupContainer(def, ContainerStatus.running);

              case 2:
                _context12.next = 4;
                return this.findContainerInfo(def.containerName);

              case 4:
                info = _context12.sent;
                return _context12.abrupt("return", this.client.getContainer(info && info.Id || def.containerName));

              case 6:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function ensureRunning(_x13) {
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
    key: "imageMatched",
    value: function imageMatched(image, tag) {
      image = image.toLowerCase();
      tag = tag.toLowerCase();
      var tagParts = tag.split(':');

      if (tagParts.length > 1) {
        return image === tag;
      }

      var imageParts = image.split(':');
      return imageParts[0] === tagParts[0];
    }
  }, {
    key: "imageHasRepoTag",
    value: function imageHasRepoTag(info, tag) {
      var _this = this;

      return !!(info.RepoTags || []).find(function (n) {
        return _this.imageMatched(n, tag);
      });
    }
  }, {
    key: "isRunning",
    value: function isRunning(info) {
      return !!info && info.State.toLowerCase() === 'running';
    }
  }, {
    key: "containerBelongsToImage",
    value: function containerBelongsToImage(info, image) {
      return this.imageMatched(info.Image, image);
    }
  }]);
  return DevDocker;
}();

exports.DevDocker = DevDocker;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9kb2NrZXIuanMiXSwibmFtZXMiOlsiQ29udGFpbmVyU3RhdHVzIiwibWlzc2luZyIsImNyZWF0ZWQiLCJydW5uaW5nIiwiRGV2RG9ja2VyIiwiY2xpZW50IiwiRG9ja2VyIiwib25TdGFydHVwSW1hZ2VzIiwib25CZWZvcmVQdWxsIiwiX29uU3RhcnR1cEltYWdlc1Bhc3NlZCIsIl9pbWFnZXMiLCJfY29udGFpbmVycyIsImxpc3RJbWFnZXMiLCJhbGwiLCJpbWFnZXMiLCJsaXN0Q29udGFpbmVycyIsInZlcnNpb24iLCJWZXJzaW9uIiwicmVwb1RhZyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicHVsbCIsImVyciIsInN0cmVhbSIsImxhc3RSZXBvcnRUaW1lIiwiRGF0ZSIsIm5vdyIsIm1vZGVtIiwiZm9sbG93UHJvZ3Jlc3MiLCJvbkZpbmlzaGVkIiwib25Qcm9ncmVzcyIsIm91dHB1dCIsIl9ldmVudCIsImlzVGltZVRvUmVwb3J0IiwicHJvY2VzcyIsInN0ZG91dCIsIndyaXRlIiwibmFtZSIsImdldEltYWdlcyIsIngiLCJpbWFnZUhhc1JlcG9UYWciLCJmaW5kIiwiZ2V0Q29udGFpbmVycyIsImhhc05hbWUiLCJkZWYiLCJkb3duVG8iLCJmaW5kQ29udGFpbmVySW5mbyIsImNvbnRhaW5lck5hbWUiLCJpbmZvIiwiaXNSdW5uaW5nIiwiZ2V0Q29udGFpbmVyIiwiSWQiLCJzdG9wIiwiZHJvcENhY2hlIiwicmVtb3ZlIiwiZmluZEltYWdlSW5mbyIsInJlcXVpcmVkSW1hZ2UiLCJ1cFRvIiwiZW5zdXJlSW1hZ2UiLCJjcmVhdGVDb250YWluZXIiLCJzdGFydCIsImRlZnMiLCJpIiwibGVuZ3RoIiwic2h1dGRvd25Db250YWluZXIiLCJzdGFydHVwQ29udGFpbmVyIiwiY29udGFpbmVyIiwibmFtZVRvRmluZCIsInRvTG93ZXJDYXNlIiwiTmFtZXMiLCJuIiwiaW1hZ2UiLCJ0YWciLCJ0YWdQYXJ0cyIsInNw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TixFQUFSO0FBQ0FJLE1BQUFBLEdBQUcsR0FBR0EsR0FBRyxDQUFDSixXQUFKLEVBQU47QUFDQSxVQUFNSyxRQUFRLEdBQUdELEdBQUcsQ0FBQ0UsS0FBSixDQUFVLEdBQVYsQ0FBakI7O0FBQ0EsVUFBSUQsUUFBUSxDQUFDVixNQUFULEdBQWtCLENBQXRCLEVBQXlCO0FBQ3JCLGVBQU9RLEtBQUssS0FBS0MsR0FBakI7QUFDSDs7QUFDRCxVQUFNRyxVQUFVLEdBQUdKLEtBQUssQ0FBQ0csS0FBTixDQUFZLEdBQVosQ0FBbkI7QUFDQSxhQUFPQyxVQUFVLENBQUMsQ0FBRCxDQUFWLEtBQWtCRixRQUFRLENBQUMsQ0FBRCxDQUFqQztBQUNIOzs7b0NBRXNCekIsSSxFQUFrQndCLEcsRUFBc0I7QUFBQTs7QUFDM0QsYUFBTyxDQUFDLENBQUMsQ0FBQ3hCLElBQUksQ0FBQzRCLFFBQUwsSUFBaUIsRUFBbEIsRUFBc0JuQyxJQUF0QixDQUEyQixVQUFBNkIsQ0FBQztBQUFBLGVBQUksS0FBSSxDQUFDTyxZQUFMLENBQWtCUCxDQUFsQixFQUFxQkUsR0FBckIsQ0FBSjtBQUFBLE9BQTVCLENBQVQ7QUFDSDs7OzhCQUVnQnhCLEksRUFBZ0M7QUFDN0MsYUFBTyxDQUFDLENBQUNBLElBQUYsSUFBVUEsSUFBSSxDQUFDOEIsS0FBTCxDQUFXVixXQUFYLE9BQTZCLFNBQTlDO0FBQ0g7Ozs0Q0FFOEJwQixJLEVBQXNCdUIsSyxFQUF3QjtBQUN6RSxhQUFPLEtBQUtNLFlBQUwsQ0FBa0I3QixJQUFJLENBQUMrQixLQUF2QixFQUE4QlIsS0FBOUIsQ0FBUDtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuLy8gQGZsb3dcbmltcG9ydCBEb2NrZXIgZnJvbSAnZG9ja2Vyb2RlJztcblxuaW1wb3J0IHsgcHJvZ3Jlc3MsIHByb2dyZXNzRG9uZSwgdmVyc2lvblRvTnVtYmVyIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuZXhwb3J0IHR5cGUgREltYWdlSW5mbyA9IHtcbiAgICBJZDogc3RyaW5nLFxuICAgIFJlcG9UYWdzOiBzdHJpbmdbXSxcbn1cblxuZXhwb3J0IHR5cGUgRENvbnRhaW5lckluZm8gPSB7XG4gICAgSWQ6IHN0cmluZyxcbiAgICBOYW1lczogc3RyaW5nW10sXG4gICAgSW1hZ2U6IHN0cmluZyxcbiAgICBJbWFnZUlEOiBzdHJpbmcsXG4gICAgU3RhdGU6IHN0cmluZyxcbn1cblxuZXhwb3J0IHR5cGUgRENvbnRhaW5lckV4ZWNPcHRpb25zID0ge1xuICAgIEF0dGFjaFN0ZGluPzogYm9vbGVhbixcbiAgICBBdHRhY2hTdGRvdXQ/OiBib29sZWFuLFxuICAgIEF0dGFjaFN0ZGVycj86IGJvb2xlYW4sXG4gICAgRGV0YWNoS2V5cz86IHN0cmluZyxcbiAgICBUdHk/OiBib29sZWFuLFxuICAgIEVudj86IHN0cmluZyxcbiAgICBDbWQ/OiBzdHJpbmdbXSxcbiAgICBQcml2aWxlZ2VkPzogYm9vbGVhbixcbiAgICBVc2VyPzogc3RyaW5nLFxuICAgIFdvcmtpbmdEaXI/OiBzdHJpbmcsXG59XG5cbmV4cG9ydCB0eXBlIERvY2tlck1vZGVtID0ge1xuICAgIGZvbGxvd1Byb2dyZXNzKFxuICAgICAgICBzdHJlYW06IGFueSxcbiAgICAgICAgb25GaW5pc2hlZDogKGVycjogYW55LCBvdXRwdXQ6IGFueSkgPT4gdm9pZCxcbiAgICAgICAgb25Qcm9ncmVzczogKGV2ZW50OiBhbnkpID0+IHZvaWRcbiAgICApOiB2b2lkLFxuXG4gICAgZGVtdXhTdHJlYW0oXG4gICAgICAgIHN0cmVhbTogYW55LFxuICAgICAgICBzdGRvdXQ6IGFueSxcbiAgICAgICAgc3RkZXJyOiBhbnlcbiAgICApOiB2b2lkLFxufVxuXG5leHBvcnQgdHlwZSBEb2NrZXJDb250YWluZXIgPSB7XG4gICAgaWQ6IHN0cmluZyxcbiAgICBtb2RlbTogRG9ja2VyTW9kZW0sXG4gICAgc3RhcnQoKTogUHJvbWlzZTx2b2lkPixcbiAgICBleGVjKG9wdGlvbnM6IERDb250YWluZXJFeGVjT3B0aW9ucywgY2FsbGJhY2s6IGFueSk6IHZvaWQsXG4gICAgc3RvcCgpOiBQcm9taXNlPHZvaWQ+LFxuICAgIHJlbW92ZSgpOiBQcm9taXNlPHZvaWQ+LFxufVxuXG5leHBvcnQgdHlwZSBEb2NrZXJJbWFnZSA9IHtcbiAgICByZW1vdmUoKTogUHJvbWlzZTx2b2lkPixcbn1cblxuZXhwb3J0IHR5cGUgRE1vdW50ID0ge1xuICAgIFRhcmdldDogc3RyaW5nLFxuICAgIFNvdXJjZTogc3RyaW5nLFxuICAgIFR5cGU6ICdiaW5kJyB8ICd2b2x1bWUnIHwgJ3RtcGZzJyxcbn1cblxuZXhwb3J0IHR5cGUgRFBvcnRCaW5kaW5ncyA9IHtcbiAgICBbc3RyaW5nXTogeyBIb3N0SXA6IHN0cmluZywgSG9zdFBvcnQ6IHN0cmluZyB9W11cbn07XG5cbmV4cG9ydCB0eXBlIERDcmVhdGVDb250YWluZXJPcHRpb25zID0ge1xuICAgIG5hbWU/OiBzdHJpbmcsXG4gICAgSW1hZ2U6IHN0cmluZyxcbiAgICBJbnRlcmFjdGl2ZT86IGJvb2xlYW4sXG4gICAgVHR5PzogYm9vbGVhbixcbiAgICBVc2VyPzogc3RyaW5nLFxuICAgIEVudHJ5cG9pbnQ/OiBzdHJpbmdbXSxcbiAgICBFbnY6IHN0cmluZ1tdLFxuICAgIEhvc3RDb25maWc/OiB7XG4gICAgICAgIE1vdW50cz86IERNb3VudFtdLFxuICAgIH0sXG4gICAgRXhwb3NlZFBvcnRzPzoge1xuICAgICAgICBbc3RyaW5nXToge30sXG4gICAgfSxcbiAgICBIb3N0Q29uZmlnPzoge1xuICAgICAgICBQb3J0QmluZGluZ3M/OiBEUG9ydEJpbmRpbmdzLFxuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgRFZlcnNpb24gPSB7XG4gICAgVmVyc2lvbjogc3RyaW5nLFxufVxuXG5leHBvcnQgdHlwZSBEb2NrZXJDbGllbnQgPSB7XG4gICAgdmVyc2lvbigpOiBQcm9taXNlPERWZXJzaW9uPixcblxuICAgIGxpc3RDb250YWluZXJzKG9wdGlvbnM/OiB7IGFsbD86IHRydWUgfSk6IFByb21pc2U8RENvbnRhaW5lckluZm9bXT4sXG5cbiAgICBsaXN0SW1hZ2VzKG9wdGlvbnM/OiB7IGFsbD86IHRydWUgfSk6IFByb21pc2U8REltYWdlSW5mb1tdPixcblxuICAgIGdldENvbnRhaW5lcihpZDogc3RyaW5nKTogRG9ja2VyQ29udGFpbmVyLFxuXG4gICAgZ2V0SW1hZ2UobmFtZTogc3RyaW5nKTogRG9ja2VySW1hZ2UsXG5cbiAgICBjcmVhdGVDb250YWluZXIob3B0aW9uczogRENyZWF0ZUNvbnRhaW5lck9wdGlvbnMpOiBQcm9taXNlPERvY2tlckNvbnRhaW5lcj4sXG5cbiAgICBwdWxsKHJlcG9UYWc6IHN0cmluZywgYXV0aDogYW55LCAoZXJyOiBhbnksIHN0cmVhbTogYW55KSA9PiB2b2lkKTogdm9pZCxcblxuICAgIG1vZGVtOiBEb2NrZXJNb2RlbSxcbn1cblxuZXhwb3J0IGNvbnN0IENvbnRhaW5lclN0YXR1cyA9IHtcbiAgICBtaXNzaW5nOiAwLFxuICAgIGNyZWF0ZWQ6IDEsXG4gICAgcnVubmluZzogMixcbn07XG5cbmV4cG9ydCB0eXBlIENvbnRhaW5lclN0YXR1c1R5cGUgPSAwIHwgMSB8IDI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29udGFpbmVyRGVmIHtcbiAgICByZXF1aXJlZEltYWdlOiBzdHJpbmcsXG4gICAgY29udGFpbmVyTmFtZTogc3RyaW5nLFxuICAgIGNyZWF0ZUNvbnRhaW5lcihkb2NrZXI6IERldkRvY2tlcik6IFByb21pc2U8RG9ja2VyQ29udGFpbmVyPlxufVxuXG5cbmNsYXNzIERldkRvY2tlciB7XG4gICAgY2xpZW50OiBEb2NrZXJDbGllbnQ7XG4gICAgX2ltYWdlczogPyhESW1hZ2VJbmZvW10pO1xuICAgIF9jb250YWluZXJzOiA/KERDb250YWluZXJJbmZvW10pO1xuICAgIF9vblN0YXJ0dXBJbWFnZXNQYXNzZWQ6IGJvb2xlYW47XG4gICAgb25TdGFydHVwSW1hZ2VzOiA/KChpbWFnZXM6IERJbWFnZUluZm9bXSkgPT4gdm9pZCk7XG4gICAgb25CZWZvcmVQdWxsOiA/KChyZXBvVGFnOiBzdHJpbmcpID0+IFByb21pc2U8dm9pZD4pO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2xpZW50ID0gbmV3IERvY2tlcigpO1xuICAgICAgICB0aGlzLm9uU3RhcnR1cEltYWdlcyA9IG51bGw7XG4gICAgICAgIHRoaXMub25CZWZvcmVQdWxsID0gbnVsbDtcbiAgICAgICAgdGhpcy5fb25TdGFydHVwSW1hZ2VzUGFzc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2ltYWdlcyA9IG51bGw7XG4gICAgICAgIHRoaXMuX2NvbnRhaW5lcnMgPSBudWxsO1xuICAgIH1cblxuICAgIGRyb3BDYWNoZSgpIHtcbiAgICAgICAgdGhpcy5faW1hZ2VzID0gbnVsbDtcbiAgICAgICAgdGhpcy5fY29udGFpbmVycyA9IG51bGw7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0SW1hZ2VzKCk6IFByb21pc2U8REltYWdlSW5mb1tdPiB7XG4gICAgICAgIGlmICghdGhpcy5faW1hZ2VzKSB7XG4gICAgICAgICAgICBjb25zdCBpbWFnZXMgPSBhd2FpdCB0aGlzLmNsaWVudC5saXN0SW1hZ2VzKHsgYWxsOiB0cnVlIH0pO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2VzID0gaW1hZ2VzO1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9vblN0YXJ0dXBJbWFnZXNQYXNzZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vblN0YXJ0dXBJbWFnZXNQYXNzZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9uU3RhcnR1cEltYWdlcykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uU3RhcnR1cEltYWdlcyhpbWFnZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2ltYWdlcyA9IGltYWdlcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5faW1hZ2VzIHx8IFtdO1xuICAgIH1cblxuICAgIGFzeW5jIGdldENvbnRhaW5lcnMoKTogUHJvbWlzZTxEQ29udGFpbmVySW5mb1tdPiB7XG4gICAgICAgIGlmICghdGhpcy5fY29udGFpbmVycykge1xuICAgICAgICAgICAgdGhpcy5fY29udGFpbmVycyA9IGF3YWl0IHRoaXMuY2xpZW50Lmxpc3RDb250YWluZXJzKHsgYWxsOiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250YWluZXJzIHx8IFtdO1xuICAgIH1cblxuICAgIGFzeW5jIG51bWVyaWNWZXJzaW9uKCk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgICAgIGNvbnN0IHZlcnNpb246IERWZXJzaW9uID0gYXdhaXQgdGhpcy5jbGllbnQudmVyc2lvbigpO1xuICAgICAgICByZXR1cm4gdmVyc2lvblRvTnVtYmVyKHZlcnNpb24uVmVyc2lvbik7XG4gICAgfVxuXG4gICAgYXN5bmMgcHVsbChyZXBvVGFnOiBzdHJpbmcpOiBQcm9taXNlPERvY2tlckltYWdlPiB7XG4gICAgICAgIGlmICh0aGlzLm9uQmVmb3JlUHVsbCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5vbkJlZm9yZVB1bGwocmVwb1RhZyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2xpZW50ID0gdGhpcy5jbGllbnQ7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjbGllbnQucHVsbChyZXBvVGFnLCB7fSwgZnVuY3Rpb24gKGVyciwgc3RyZWFtKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzdHJlYW0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGxhc3RSZXBvcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICBjbGllbnQubW9kZW0uZm9sbG93UHJvZ3Jlc3Moc3RyZWFtLCBvbkZpbmlzaGVkLCBvblByb2dyZXNzKTtcblxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIG9uRmluaXNoZWQoZXJyLCBvdXRwdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShvdXRwdXQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIG9uUHJvZ3Jlc3MoX2V2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzVGltZVRvUmVwb3J0ID0gRGF0ZS5ub3coKSA+IGxhc3RSZXBvcnRUaW1lICsgMTAwMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzVGltZVRvUmVwb3J0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0UmVwb3J0VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZSgnLicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBhc3luYyBmaW5kSW1hZ2VJbmZvKG5hbWU6IHN0cmluZyk6IFByb21pc2U8P0RJbWFnZUluZm8+IHtcbiAgICAgICAgcmV0dXJuIChhd2FpdCB0aGlzLmdldEltYWdlcygpKS5maW5kKHggPT4gRGV2RG9ja2VyLmltYWdlSGFzUmVwb1RhZyh4LCBuYW1lKSkgfHwgbnVsbDtcbiAgICB9XG5cbiAgICBhc3luYyBmaW5kQ29udGFpbmVySW5mbyhuYW1lOiBzdHJpbmcpOiBQcm9taXNlPD9EQ29udGFpbmVySW5mbz4ge1xuICAgICAgICByZXR1cm4gKGF3YWl0IHRoaXMuZ2V0Q29udGFpbmVycygpKS5maW5kKHggPT4gRGV2RG9ja2VyLmhhc05hbWUoeCwgbmFtZSkpIHx8IG51bGw7XG4gICAgfVxuXG4gICAgYXN5bmMgc2h1dGRvd25Db250YWluZXIoZGVmOiBDb250YWluZXJEZWYsIGRvd25UbzogQ29udGFpbmVyU3RhdHVzVHlwZSkge1xuICAgICAgICBjb25zdCBpbmZvID0gYXdhaXQgdGhpcy5maW5kQ29udGFpbmVySW5mbyhkZWYuY29udGFpbmVyTmFtZSk7XG4gICAgICAgIGlmICghaW5mbykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChEZXZEb2NrZXIuaXNSdW5uaW5nKGluZm8pICYmIGRvd25UbyA8IENvbnRhaW5lclN0YXR1cy5ydW5uaW5nKSB7XG4gICAgICAgICAgICBwcm9ncmVzcyhgU3RvcHBpbmcgJHtkZWYuY29udGFpbmVyTmFtZX1gKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY2xpZW50LmdldENvbnRhaW5lcihpbmZvLklkKS5zdG9wKCk7XG4gICAgICAgICAgICBwcm9ncmVzc0RvbmUoKTtcbiAgICAgICAgICAgIHRoaXMuZHJvcENhY2hlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRvd25UbyA8IENvbnRhaW5lclN0YXR1cy5jcmVhdGVkKSB7XG4gICAgICAgICAgICBwcm9ncmVzcyhgUmVtb3ZpbmcgJHtkZWYuY29udGFpbmVyTmFtZX1gKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY2xpZW50LmdldENvbnRhaW5lcihpbmZvLklkKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIHByb2dyZXNzRG9uZSgpO1xuICAgICAgICAgICAgdGhpcy5kcm9wQ2FjaGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGVuc3VyZUltYWdlKGRlZjogQ29udGFpbmVyRGVmKSB7XG4gICAgICAgIGlmICghKGF3YWl0IHRoaXMuZmluZEltYWdlSW5mbyhkZWYucmVxdWlyZWRJbWFnZSkpKSB7XG4gICAgICAgICAgICBwcm9ncmVzcyhgUHVsbGluZyAke2RlZi5jb250YWluZXJOYW1lfWApO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wdWxsKGRlZi5yZXF1aXJlZEltYWdlKTtcbiAgICAgICAgICAgIHByb2dyZXNzRG9uZSgpO1xuICAgICAgICAgICAgdGhpcy5kcm9wQ2FjaGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIHN0YXJ0dXBDb250YWluZXIoZGVmOiBDb250YWluZXJEZWYsIHVwVG86IENvbnRhaW5lclN0YXR1c1R5cGUpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5lbnN1cmVJbWFnZShkZWYpO1xuICAgICAgICBsZXQgaW5mbzogP0RDb250YWluZXJJbmZvID0gYXdhaXQgdGhpcy5maW5kQ29udGFpbmVySW5mbyhkZWYuY29udGFpbmVyTmFtZSk7XG4gICAgICAgIGlmICghaW5mbyAmJiB1cFRvID49IENvbnRhaW5lclN0YXR1cy5jcmVhdGVkKSB7XG4gICAgICAgICAgICBwcm9ncmVzcyhgQ3JlYXRpbmcgJHtkZWYuY29udGFpbmVyTmFtZX1gKTtcbiAgICAgICAgICAgIGF3YWl0IGRlZi5jcmVhdGVDb250YWluZXIodGhpcyk7XG4gICAgICAgICAgICBwcm9ncmVzc0RvbmUoKTtcbiAgICAgICAgICAgIHRoaXMuZHJvcENhY2hlKCk7XG4gICAgICAgICAgICBpbmZvID0gYXdhaXQgdGhpcy5maW5kQ29udGFpbmVySW5mbyhkZWYuY29udGFpbmVyTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZm8gJiYgIURldkRvY2tlci5pc1J1bm5pbmcoaW5mbykgJiYgdXBUbyA+PSBDb250YWluZXJTdGF0dXMucnVubmluZykge1xuICAgICAgICAgICAgcHJvZ3Jlc3MoYFN0YXJ0aW5nICR7ZGVmLmNvbnRhaW5lck5hbWV9YCk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmNsaWVudC5nZXRDb250YWluZXIoaW5mby5JZCkuc3RhcnQoKTtcbiAgICAgICAgICAgIHByb2dyZXNzRG9uZSgpO1xuICAgICAgICAgICAgdGhpcy5kcm9wQ2FjaGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIHNodXRkb3duQ29udGFpbmVycyhkZWZzOiAkUmVhZE9ubHlBcnJheTxDb250YWluZXJEZWY+LCBkb3duVG86IENvbnRhaW5lclN0YXR1c1R5cGUpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZWZzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnNodXRkb3duQ29udGFpbmVyKGRlZnNbaV0sIGRvd25Ubyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBzdGFydHVwQ29udGFpbmVycyhkZWZzOiAkUmVhZE9ubHlBcnJheTxDb250YWluZXJEZWY+LCB1cFRvOiBDb250YWluZXJTdGF0dXNUeXBlKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVmcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5zdGFydHVwQ29udGFpbmVyKGRlZnNbaV0sIHVwVG8pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgZW5zdXJlUnVubmluZyhkZWY6IENvbnRhaW5lckRlZik6IFByb21pc2U8RG9ja2VyQ29udGFpbmVyPiB7XG4gICAgICAgIGF3YWl0IHRoaXMuc3RhcnR1cENvbnRhaW5lcihkZWYsIENvbnRhaW5lclN0YXR1cy5ydW5uaW5nKTtcbiAgICAgICAgY29uc3QgaW5mbyA9IGF3YWl0IHRoaXMuZmluZENvbnRhaW5lckluZm8oZGVmLmNvbnRhaW5lck5hbWUpO1xuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnQuZ2V0Q29udGFpbmVyKChpbmZvICYmIGluZm8uSWQpIHx8IGRlZi5jb250YWluZXJOYW1lKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaGFzTmFtZShjb250YWluZXI6IERDb250YWluZXJJbmZvLCBuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgbmFtZVRvRmluZCA9IGAvJHtuYW1lfWAudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgcmV0dXJuICEhKGNvbnRhaW5lci5OYW1lcyB8fCBbXSkuZmluZChuID0+IG4udG9Mb3dlckNhc2UoKSA9PT0gbmFtZVRvRmluZCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGltYWdlTWF0Y2hlZChpbWFnZTogc3RyaW5nLCB0YWc6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBpbWFnZSA9IGltYWdlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHRhZyA9IHRhZy50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCB0YWdQYXJ0cyA9IHRhZy5zcGxpdCgnOicpO1xuICAgICAgICBpZiAodGFnUGFydHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgcmV0dXJuIGltYWdlID09PSB0YWc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaW1hZ2VQYXJ0cyA9IGltYWdlLnNwbGl0KCc6Jyk7XG4gICAgICAgIHJldHVybiBpbWFnZVBhcnRzWzBdID09PSB0YWdQYXJ0c1swXTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaW1hZ2VIYXNSZXBvVGFnKGluZm86IERJbWFnZUluZm8sIHRhZzogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIShpbmZvLlJlcG9UYWdzIHx8IFtdKS5maW5kKG4gPT4gdGhpcy5pbWFnZU1hdGNoZWQobiwgdGFnKSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGlzUnVubmluZyhpbmZvOiA/RENvbnRhaW5lckluZm8pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhaW5mbyAmJiBpbmZvLlN0YXRlLnRvTG93ZXJDYXNlKCkgPT09ICdydW5uaW5nJztcbiAgICB9XG5cbiAgICBzdGF0aWMgY29udGFpbmVyQmVsb25nc1RvSW1hZ2UoaW5mbzogRENvbnRhaW5lckluZm8sIGltYWdlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VNYXRjaGVkKGluZm8uSW1hZ2UsIGltYWdlKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IHtcbiAgICBEZXZEb2NrZXJcbn1cbiJdfQ==