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
                if (this.findImageInfo(def.requiredImage)) {
                  _context8.next = 6;
                  break;
                }

                (0, _utils.progress)("Pulling ".concat(def.containerName));
                _context8.next = 4;
                return this.pull(def.requiredImage);

              case 4:
                (0, _utils.progressDone)();
                this.dropCache();

              case 6:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9kb2NrZXIuanMiXSwibmFtZXMiOlsiQ29udGFpbmVyU3RhdHVzIiwibWlzc2luZyIsImNyZWF0ZWQiLCJydW5uaW5nIiwiRGV2RG9ja2VyIiwiY2xpZW50IiwiRG9ja2VyIiwib25TdGFydHVwSW1hZ2VzIiwib25CZWZvcmVQdWxsIiwiX29uU3RhcnR1cEltYWdlc1Bhc3NlZCIsIl9pbWFnZXMiLCJfY29udGFpbmVycyIsImxpc3RJbWFnZXMiLCJhbGwiLCJpbWFnZXMiLCJsaXN0Q29udGFpbmVycyIsInZlcnNpb24iLCJWZXJzaW9uIiwicmVwb1RhZyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicHVsbCIsImVyciIsInN0cmVhbSIsImxhc3RSZXBvcnRUaW1lIiwiRGF0ZSIsIm5vdyIsIm1vZGVtIiwiZm9sbG93UHJvZ3Jlc3MiLCJvbkZpbmlzaGVkIiwib25Qcm9ncmVzcyIsIm91dHB1dCIsIl9ldmVudCIsImlzVGltZVRvUmVwb3J0IiwicHJvY2VzcyIsInN0ZG91dCIsIndyaXRlIiwibmFtZSIsImdldEltYWdlcyIsIngiLCJpbWFnZUhhc1JlcG9UYWciLCJmaW5kIiwiZ2V0Q29udGFpbmVycyIsImhhc05hbWUiLCJkZWYiLCJkb3duVG8iLCJmaW5kQ29udGFpbmVySW5mbyIsImNvbnRhaW5lck5hbWUiLCJpbmZvIiwiaXNSdW5uaW5nIiwiZ2V0Q29udGFpbmVyIiwiSWQiLCJzdG9wIiwiZHJvcENhY2hlIiwicmVtb3ZlIiwiZmluZEltYWdlSW5mbyIsInJlcXVpcmVkSW1hZ2UiLCJ1cFRvIiwiZW5zdXJlSW1hZ2UiLCJjcmVhdGVDb250YWluZXIiLCJzdGFydCIsImRlZnMiLCJpIiwibGVuZ3RoIiwic2h1dGRvd25Db250YWluZXIiLCJzdGFydHVwQ29udGFpbmVyIiwiY29udGFpbmVyIiwibmFtZVRvRmluZCIsInRvTG93ZXJDYXNlIiwiTmFtZXMiLCJuIiwiaW1hZ2UiLCJ0YWciLCJ0YWdQYXJ0cyIsInNw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QVI7QUFDQUksTUFBQUEsR0FBRyxHQUFHQSxHQUFHLENBQUNKLFdBQUosRUFBTjtBQUNBLFVBQU1LLFFBQVEsR0FBR0QsR0FBRyxDQUFDRSxLQUFKLENBQVUsR0FBVixDQUFqQjs7QUFDQSxVQUFJRCxRQUFRLENBQUNWLE1BQVQsR0FBa0IsQ0FBdEIsRUFBeUI7QUFDckIsZUFBT1EsS0FBSyxLQUFLQyxHQUFqQjtBQUNIOztBQUNELFVBQU1HLFVBQVUsR0FBR0osS0FBSyxDQUFDRyxLQUFOLENBQVksR0FBWixDQUFuQjtBQUNBLGFBQU9DLFVBQVUsQ0FBQyxDQUFELENBQVYsS0FBa0JGLFFBQVEsQ0FBQyxDQUFELENBQWpDO0FBQ0g7OztvQ0FFc0J6QixJLEVBQWtCd0IsRyxFQUFzQjtBQUFBOztBQUMzRCxhQUFPLENBQUMsQ0FBQyxDQUFDeEIsSUFBSSxDQUFDNEIsUUFBTCxJQUFpQixFQUFsQixFQUFzQm5DLElBQXRCLENBQTJCLFVBQUE2QixDQUFDO0FBQUEsZUFBSSxLQUFJLENBQUNPLFlBQUwsQ0FBa0JQLENBQWxCLEVBQXFCRSxHQUFyQixDQUFKO0FBQUEsT0FBNUIsQ0FBVDtBQUNIOzs7OEJBRWdCeEIsSSxFQUFnQztBQUM3QyxhQUFPLENBQUMsQ0FBQ0EsSUFBRixJQUFVQSxJQUFJLENBQUM4QixLQUFMLENBQVdWLFdBQVgsT0FBNkIsU0FBOUM7QUFDSDs7OzRDQUU4QnBCLEksRUFBc0J1QixLLEVBQXdCO0FBQ3pFLGFBQU8sS0FBS00sWUFBTCxDQUFrQjdCLElBQUksQ0FBQytCLEtBQXZCLEVBQThCUixLQUE5QixDQUFQO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG4gKiB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbiAqIExpY2Vuc2UgYXQ6IGh0dHBzOi8vd3d3LnRvbi5kZXYvbGljZW5zZXNcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIFRPTiBERVYgc29mdHdhcmUgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG4vLyBAZmxvd1xuaW1wb3J0IERvY2tlciBmcm9tICdkb2NrZXJvZGUnO1xuXG5pbXBvcnQgeyBwcm9ncmVzcywgcHJvZ3Jlc3NEb25lLCB2ZXJzaW9uVG9OdW1iZXIgfSBmcm9tIFwiLi91dGlsc1wiO1xuXG5leHBvcnQgdHlwZSBESW1hZ2VJbmZvID0ge1xuICAgIElkOiBzdHJpbmcsXG4gICAgUmVwb1RhZ3M6IHN0cmluZ1tdLFxufVxuXG5leHBvcnQgdHlwZSBEQ29udGFpbmVySW5mbyA9IHtcbiAgICBJZDogc3RyaW5nLFxuICAgIE5hbWVzOiBzdHJpbmdbXSxcbiAgICBJbWFnZTogc3RyaW5nLFxuICAgIEltYWdlSUQ6IHN0cmluZyxcbiAgICBTdGF0ZTogc3RyaW5nLFxufVxuXG5leHBvcnQgdHlwZSBEQ29udGFpbmVyRXhlY09wdGlvbnMgPSB7XG4gICAgQXR0YWNoU3RkaW4/OiBib29sZWFuLFxuICAgIEF0dGFjaFN0ZG91dD86IGJvb2xlYW4sXG4gICAgQXR0YWNoU3RkZXJyPzogYm9vbGVhbixcbiAgICBEZXRhY2hLZXlzPzogc3RyaW5nLFxuICAgIFR0eT86IGJvb2xlYW4sXG4gICAgRW52Pzogc3RyaW5nLFxuICAgIENtZD86IHN0cmluZ1tdLFxuICAgIFByaXZpbGVnZWQ/OiBib29sZWFuLFxuICAgIFVzZXI/OiBzdHJpbmcsXG4gICAgV29ya2luZ0Rpcj86IHN0cmluZyxcbn1cblxuZXhwb3J0IHR5cGUgRG9ja2VyTW9kZW0gPSB7XG4gICAgZm9sbG93UHJvZ3Jlc3MoXG4gICAgICAgIHN0cmVhbTogYW55LFxuICAgICAgICBvbkZpbmlzaGVkOiAoZXJyOiBhbnksIG91dHB1dDogYW55KSA9PiB2b2lkLFxuICAgICAgICBvblByb2dyZXNzOiAoZXZlbnQ6IGFueSkgPT4gdm9pZFxuICAgICk6IHZvaWQsXG5cbiAgICBkZW11eFN0cmVhbShcbiAgICAgICAgc3RyZWFtOiBhbnksXG4gICAgICAgIHN0ZG91dDogYW55LFxuICAgICAgICBzdGRlcnI6IGFueVxuICAgICk6IHZvaWQsXG59XG5cbmV4cG9ydCB0eXBlIERvY2tlckNvbnRhaW5lciA9IHtcbiAgICBpZDogc3RyaW5nLFxuICAgIG1vZGVtOiBEb2NrZXJNb2RlbSxcbiAgICBzdGFydCgpOiBQcm9taXNlPHZvaWQ+LFxuICAgIGV4ZWMob3B0aW9uczogRENvbnRhaW5lckV4ZWNPcHRpb25zLCBjYWxsYmFjazogYW55KTogdm9pZCxcbiAgICBzdG9wKCk6IFByb21pc2U8dm9pZD4sXG4gICAgcmVtb3ZlKCk6IFByb21pc2U8dm9pZD4sXG59XG5cbmV4cG9ydCB0eXBlIERvY2tlckltYWdlID0ge1xuICAgIHJlbW92ZSgpOiBQcm9taXNlPHZvaWQ+LFxufVxuXG5leHBvcnQgdHlwZSBETW91bnQgPSB7XG4gICAgVGFyZ2V0OiBzdHJpbmcsXG4gICAgU291cmNlOiBzdHJpbmcsXG4gICAgVHlwZTogJ2JpbmQnIHwgJ3ZvbHVtZScgfCAndG1wZnMnLFxufVxuXG5leHBvcnQgdHlwZSBEUG9ydEJpbmRpbmdzID0ge1xuICAgIFtzdHJpbmddOiB7IEhvc3RJcDogc3RyaW5nLCBIb3N0UG9ydDogc3RyaW5nIH1bXVxufTtcblxuZXhwb3J0IHR5cGUgRENyZWF0ZUNvbnRhaW5lck9wdGlvbnMgPSB7XG4gICAgbmFtZT86IHN0cmluZyxcbiAgICBJbWFnZTogc3RyaW5nLFxuICAgIEludGVyYWN0aXZlPzogYm9vbGVhbixcbiAgICBUdHk/OiBib29sZWFuLFxuICAgIFVzZXI/OiBzdHJpbmcsXG4gICAgRW50cnlwb2ludD86IHN0cmluZ1tdLFxuICAgIEVudjogc3RyaW5nW10sXG4gICAgSG9zdENvbmZpZz86IHtcbiAgICAgICAgTW91bnRzPzogRE1vdW50W10sXG4gICAgfSxcbiAgICBFeHBvc2VkUG9ydHM/OiB7XG4gICAgICAgIFtzdHJpbmddOiB7fSxcbiAgICB9LFxuICAgIEhvc3RDb25maWc/OiB7XG4gICAgICAgIFBvcnRCaW5kaW5ncz86IERQb3J0QmluZGluZ3MsXG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBEVmVyc2lvbiA9IHtcbiAgICBWZXJzaW9uOiBzdHJpbmcsXG59XG5cbmV4cG9ydCB0eXBlIERvY2tlckNsaWVudCA9IHtcbiAgICB2ZXJzaW9uKCk6IFByb21pc2U8RFZlcnNpb24+LFxuXG4gICAgbGlzdENvbnRhaW5lcnMob3B0aW9ucz86IHsgYWxsPzogdHJ1ZSB9KTogUHJvbWlzZTxEQ29udGFpbmVySW5mb1tdPixcblxuICAgIGxpc3RJbWFnZXMob3B0aW9ucz86IHsgYWxsPzogdHJ1ZSB9KTogUHJvbWlzZTxESW1hZ2VJbmZvW10+LFxuXG4gICAgZ2V0Q29udGFpbmVyKGlkOiBzdHJpbmcpOiBEb2NrZXJDb250YWluZXIsXG5cbiAgICBnZXRJbWFnZShuYW1lOiBzdHJpbmcpOiBEb2NrZXJJbWFnZSxcblxuICAgIGNyZWF0ZUNvbnRhaW5lcihvcHRpb25zOiBEQ3JlYXRlQ29udGFpbmVyT3B0aW9ucyk6IFByb21pc2U8RG9ja2VyQ29udGFpbmVyPixcblxuICAgIHB1bGwocmVwb1RhZzogc3RyaW5nLCBhdXRoOiBhbnksIChlcnI6IGFueSwgc3RyZWFtOiBhbnkpID0+IHZvaWQpOiB2b2lkLFxuXG4gICAgbW9kZW06IERvY2tlck1vZGVtLFxufVxuXG5leHBvcnQgY29uc3QgQ29udGFpbmVyU3RhdHVzID0ge1xuICAgIG1pc3Npbmc6IDAsXG4gICAgY3JlYXRlZDogMSxcbiAgICBydW5uaW5nOiAyLFxufTtcblxuZXhwb3J0IHR5cGUgQ29udGFpbmVyU3RhdHVzVHlwZSA9IDAgfCAxIHwgMjtcblxuZXhwb3J0IHR5cGUgQ29udGFpbmVyRGVmID0ge1xuICAgIHJlcXVpcmVkSW1hZ2U6IHN0cmluZyxcbiAgICBjb250YWluZXJOYW1lOiBzdHJpbmcsXG4gICAgY3JlYXRlQ29udGFpbmVyKGRvY2tlcjogRGV2RG9ja2VyKTogUHJvbWlzZTxEb2NrZXJDb250YWluZXI+XG59XG5cblxuY2xhc3MgRGV2RG9ja2VyIHtcbiAgICBjbGllbnQ6IERvY2tlckNsaWVudDtcbiAgICBfaW1hZ2VzOiA/KERJbWFnZUluZm9bXSk7XG4gICAgX2NvbnRhaW5lcnM6ID8oRENvbnRhaW5lckluZm9bXSk7XG4gICAgX29uU3RhcnR1cEltYWdlc1Bhc3NlZDogYm9vbGVhbjtcbiAgICBvblN0YXJ0dXBJbWFnZXM6ID8oKGltYWdlczogREltYWdlSW5mb1tdKSA9PiB2b2lkKTtcbiAgICBvbkJlZm9yZVB1bGw6ID8oKHJlcG9UYWc6IHN0cmluZykgPT4gUHJvbWlzZTx2b2lkPik7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jbGllbnQgPSBuZXcgRG9ja2VyKCk7XG4gICAgICAgIHRoaXMub25TdGFydHVwSW1hZ2VzID0gbnVsbDtcbiAgICAgICAgdGhpcy5vbkJlZm9yZVB1bGwgPSBudWxsO1xuICAgICAgICB0aGlzLl9vblN0YXJ0dXBJbWFnZXNQYXNzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faW1hZ2VzID0gbnVsbDtcbiAgICAgICAgdGhpcy5fY29udGFpbmVycyA9IG51bGw7XG4gICAgfVxuXG4gICAgZHJvcENhY2hlKCkge1xuICAgICAgICB0aGlzLl9pbWFnZXMgPSBudWxsO1xuICAgICAgICB0aGlzLl9jb250YWluZXJzID0gbnVsbDtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRJbWFnZXMoKTogUHJvbWlzZTxESW1hZ2VJbmZvW10+IHtcbiAgICAgICAgaWYgKCF0aGlzLl9pbWFnZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGltYWdlcyA9IGF3YWl0IHRoaXMuY2xpZW50Lmxpc3RJbWFnZXMoeyBhbGw6IHRydWUgfSk7XG4gICAgICAgICAgICB0aGlzLl9pbWFnZXMgPSBpbWFnZXM7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX29uU3RhcnR1cEltYWdlc1Bhc3NlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX29uU3RhcnR1cEltYWdlc1Bhc3NlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub25TdGFydHVwSW1hZ2VzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25TdGFydHVwSW1hZ2VzKGltYWdlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5faW1hZ2VzID0gaW1hZ2VzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9pbWFnZXMgfHwgW107XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0Q29udGFpbmVycygpOiBQcm9taXNlPERDb250YWluZXJJbmZvW10+IHtcbiAgICAgICAgaWYgKCF0aGlzLl9jb250YWluZXJzKSB7XG4gICAgICAgICAgICB0aGlzLl9jb250YWluZXJzID0gYXdhaXQgdGhpcy5jbGllbnQubGlzdENvbnRhaW5lcnMoeyBhbGw6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRhaW5lcnMgfHwgW107XG4gICAgfVxuXG4gICAgYXN5bmMgbnVtZXJpY1ZlcnNpb24oKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICAgICAgY29uc3QgdmVyc2lvbjogRFZlcnNpb24gPSBhd2FpdCB0aGlzLmNsaWVudC52ZXJzaW9uKCk7XG4gICAgICAgIHJldHVybiB2ZXJzaW9uVG9OdW1iZXIodmVyc2lvbi5WZXJzaW9uKTtcbiAgICB9XG5cbiAgICBhc3luYyBwdWxsKHJlcG9UYWc6IHN0cmluZyk6IFByb21pc2U8RG9ja2VySW1hZ2U+IHtcbiAgICAgICAgaWYgKHRoaXMub25CZWZvcmVQdWxsKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLm9uQmVmb3JlUHVsbChyZXBvVGFnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjbGllbnQgPSB0aGlzLmNsaWVudDtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNsaWVudC5wdWxsKHJlcG9UYWcsIHt9LCBmdW5jdGlvbiAoZXJyLCBzdHJlYW0pIHtcbiAgICAgICAgICAgICAgICBpZiAoIXN0cmVhbSkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgbGFzdFJlcG9ydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgIGNsaWVudC5tb2RlbS5mb2xsb3dQcm9ncmVzcyhzdHJlYW0sIG9uRmluaXNoZWQsIG9uUHJvZ3Jlc3MpO1xuXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gb25GaW5pc2hlZChlcnIsIG91dHB1dCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG91dHB1dCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gb25Qcm9ncmVzcyhfZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNUaW1lVG9SZXBvcnQgPSBEYXRlLm5vdygpID4gbGFzdFJlcG9ydFRpbWUgKyAxMDAwO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNUaW1lVG9SZXBvcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RSZXBvcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKCcuJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGFzeW5jIGZpbmRJbWFnZUluZm8obmFtZTogc3RyaW5nKTogUHJvbWlzZTw/REltYWdlSW5mbz4ge1xuICAgICAgICByZXR1cm4gKGF3YWl0IHRoaXMuZ2V0SW1hZ2VzKCkpLmZpbmQoeCA9PiBEZXZEb2NrZXIuaW1hZ2VIYXNSZXBvVGFnKHgsIG5hbWUpKSB8fCBudWxsO1xuICAgIH1cblxuICAgIGFzeW5jIGZpbmRDb250YWluZXJJbmZvKG5hbWU6IHN0cmluZyk6IFByb21pc2U8P0RDb250YWluZXJJbmZvPiB7XG4gICAgICAgIHJldHVybiAoYXdhaXQgdGhpcy5nZXRDb250YWluZXJzKCkpLmZpbmQoeCA9PiBEZXZEb2NrZXIuaGFzTmFtZSh4LCBuYW1lKSkgfHwgbnVsbDtcbiAgICB9XG5cbiAgICBhc3luYyBzaHV0ZG93bkNvbnRhaW5lcihkZWY6IENvbnRhaW5lckRlZiwgZG93blRvOiBDb250YWluZXJTdGF0dXNUeXBlKSB7XG4gICAgICAgIGNvbnN0IGluZm8gPSBhd2FpdCB0aGlzLmZpbmRDb250YWluZXJJbmZvKGRlZi5jb250YWluZXJOYW1lKTtcbiAgICAgICAgaWYgKCFpbmZvKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKERldkRvY2tlci5pc1J1bm5pbmcoaW5mbykgJiYgZG93blRvIDwgQ29udGFpbmVyU3RhdHVzLnJ1bm5pbmcpIHtcbiAgICAgICAgICAgIHByb2dyZXNzKGBTdG9wcGluZyAke2RlZi5jb250YWluZXJOYW1lfWApO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5jbGllbnQuZ2V0Q29udGFpbmVyKGluZm8uSWQpLnN0b3AoKTtcbiAgICAgICAgICAgIHByb2dyZXNzRG9uZSgpO1xuICAgICAgICAgICAgdGhpcy5kcm9wQ2FjaGUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZG93blRvIDwgQ29udGFpbmVyU3RhdHVzLmNyZWF0ZWQpIHtcbiAgICAgICAgICAgIHByb2dyZXNzKGBSZW1vdmluZyAke2RlZi5jb250YWluZXJOYW1lfWApO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5jbGllbnQuZ2V0Q29udGFpbmVyKGluZm8uSWQpLnJlbW92ZSgpO1xuICAgICAgICAgICAgcHJvZ3Jlc3NEb25lKCk7XG4gICAgICAgICAgICB0aGlzLmRyb3BDYWNoZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgZW5zdXJlSW1hZ2UoZGVmOiBDb250YWluZXJEZWYpIHtcbiAgICAgICAgaWYgKCF0aGlzLmZpbmRJbWFnZUluZm8oZGVmLnJlcXVpcmVkSW1hZ2UpKSB7XG4gICAgICAgICAgICBwcm9ncmVzcyhgUHVsbGluZyAke2RlZi5jb250YWluZXJOYW1lfWApO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wdWxsKGRlZi5yZXF1aXJlZEltYWdlKTtcbiAgICAgICAgICAgIHByb2dyZXNzRG9uZSgpO1xuICAgICAgICAgICAgdGhpcy5kcm9wQ2FjaGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIHN0YXJ0dXBDb250YWluZXIoZGVmOiBDb250YWluZXJEZWYsIHVwVG86IENvbnRhaW5lclN0YXR1c1R5cGUpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5lbnN1cmVJbWFnZShkZWYpO1xuICAgICAgICBsZXQgaW5mbzogP0RDb250YWluZXJJbmZvID0gYXdhaXQgdGhpcy5maW5kQ29udGFpbmVySW5mbyhkZWYuY29udGFpbmVyTmFtZSk7XG4gICAgICAgIGlmICghaW5mbyAmJiB1cFRvID49IENvbnRhaW5lclN0YXR1cy5jcmVhdGVkKSB7XG4gICAgICAgICAgICBwcm9ncmVzcyhgQ3JlYXRpbmcgJHtkZWYuY29udGFpbmVyTmFtZX1gKTtcbiAgICAgICAgICAgIGF3YWl0IGRlZi5jcmVhdGVDb250YWluZXIodGhpcyk7XG4gICAgICAgICAgICBwcm9ncmVzc0RvbmUoKTtcbiAgICAgICAgICAgIHRoaXMuZHJvcENhY2hlKCk7XG4gICAgICAgICAgICBpbmZvID0gYXdhaXQgdGhpcy5maW5kQ29udGFpbmVySW5mbyhkZWYuY29udGFpbmVyTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZm8gJiYgIURldkRvY2tlci5pc1J1bm5pbmcoaW5mbykgJiYgdXBUbyA+PSBDb250YWluZXJTdGF0dXMucnVubmluZykge1xuICAgICAgICAgICAgcHJvZ3Jlc3MoYFN0YXJ0aW5nICR7ZGVmLmNvbnRhaW5lck5hbWV9YCk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmNsaWVudC5nZXRDb250YWluZXIoaW5mby5JZCkuc3RhcnQoKTtcbiAgICAgICAgICAgIHByb2dyZXNzRG9uZSgpO1xuICAgICAgICAgICAgdGhpcy5kcm9wQ2FjaGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIHNodXRkb3duQ29udGFpbmVycyhkZWZzOiBDb250YWluZXJEZWZbXSwgZG93blRvOiBDb250YWluZXJTdGF0dXNUeXBlKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVmcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5zaHV0ZG93bkNvbnRhaW5lcihkZWZzW2ldLCBkb3duVG8pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgc3RhcnR1cENvbnRhaW5lcnMoZGVmczogQ29udGFpbmVyRGVmW10sIHVwVG86IENvbnRhaW5lclN0YXR1c1R5cGUpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZWZzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnN0YXJ0dXBDb250YWluZXIoZGVmc1tpXSwgdXBUbyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBlbnN1cmVSdW5uaW5nKGRlZjogQ29udGFpbmVyRGVmKTogUHJvbWlzZTxEb2NrZXJDb250YWluZXI+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5zdGFydHVwQ29udGFpbmVyKGRlZiwgQ29udGFpbmVyU3RhdHVzLnJ1bm5pbmcpO1xuICAgICAgICBjb25zdCBpbmZvID0gYXdhaXQgdGhpcy5maW5kQ29udGFpbmVySW5mbyhkZWYuY29udGFpbmVyTmFtZSk7XG4gICAgICAgIHJldHVybiB0aGlzLmNsaWVudC5nZXRDb250YWluZXIoKGluZm8gJiYgaW5mby5JZCkgfHwgZGVmLmNvbnRhaW5lck5hbWUpO1xuICAgIH1cblxuICAgIHN0YXRpYyBoYXNOYW1lKGNvbnRhaW5lcjogRENvbnRhaW5lckluZm8sIG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBuYW1lVG9GaW5kID0gYC8ke25hbWV9YC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICByZXR1cm4gISEoY29udGFpbmVyLk5hbWVzIHx8IFtdKS5maW5kKG4gPT4gbi50b0xvd2VyQ2FzZSgpID09PSBuYW1lVG9GaW5kKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaW1hZ2VNYXRjaGVkKGltYWdlOiBzdHJpbmcsIHRhZzogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGltYWdlID0gaW1hZ2UudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdGFnID0gdGFnLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IHRhZ1BhcnRzID0gdGFnLnNwbGl0KCc6Jyk7XG4gICAgICAgIGlmICh0YWdQYXJ0cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICByZXR1cm4gaW1hZ2UgPT09IHRhZztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpbWFnZVBhcnRzID0gaW1hZ2Uuc3BsaXQoJzonKTtcbiAgICAgICAgcmV0dXJuIGltYWdlUGFydHNbMF0gPT09IHRhZ1BhcnRzWzBdO1xuICAgIH1cblxuICAgIHN0YXRpYyBpbWFnZUhhc1JlcG9UYWcoaW5mbzogREltYWdlSW5mbywgdGFnOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhKGluZm8uUmVwb1RhZ3MgfHwgW10pLmZpbmQobiA9PiB0aGlzLmltYWdlTWF0Y2hlZChuLCB0YWcpKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNSdW5uaW5nKGluZm86ID9EQ29udGFpbmVySW5mbyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISFpbmZvICYmIGluZm8uU3RhdGUudG9Mb3dlckNhc2UoKSA9PT0gJ3J1bm5pbmcnO1xuICAgIH1cblxuICAgIHN0YXRpYyBjb250YWluZXJCZWxvbmdzVG9JbWFnZShpbmZvOiBEQ29udGFpbmVySW5mbywgaW1hZ2U6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pbWFnZU1hdGNoZWQoaW5mby5JbWFnZSwgaW1hZ2UpO1xuICAgIH1cbn1cblxuXG5leHBvcnQge1xuICAgIERldkRvY2tlclxufVxuIl19