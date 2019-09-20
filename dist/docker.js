"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _config = require("./config");

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
var docker = new _dockerode["default"]();

function numericVersion() {
  return _numericVersion.apply(this, arguments);
}

function _numericVersion() {
  _numericVersion = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var version;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return docker.version();

          case 2:
            version = _context.sent;
            return _context.abrupt("return", (0, _utils.versionToNumber)(version.Version));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _numericVersion.apply(this, arguments);
}

function listAllContainers() {
  return _listAllContainers.apply(this, arguments);
}

function _listAllContainers() {
  _listAllContainers = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", docker.listContainers({
              all: true
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _listAllContainers.apply(this, arguments);
}

function listAllImages() {
  return _listAllImages.apply(this, arguments);
}

function _listAllImages() {
  _listAllImages = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3() {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", docker.listImages({
              all: true
            }));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _listAllImages.apply(this, arguments);
}

function getContainer(id) {
  return docker.getContainer(id);
}

function getImage(name) {
  return docker.getImage(name);
}

function createContainer(_x) {
  return _createContainer.apply(this, arguments);
}

function _createContainer() {
  _createContainer = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(options) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", docker.createContainer(options));

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _createContainer.apply(this, arguments);
}

function pullImage(_x2) {
  return _pullImage.apply(this, arguments);
}

function _pullImage() {
  _pullImage = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(repoTag) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", new Promise(function (resolve, reject) {
              docker.pull(repoTag, _config.config.auth, function (err, stream) {
                if (!stream) {
                  reject(err);
                  return;
                }

                var lastReportTime = Date.now();
                docker.modem.followProgress(stream, onFinished, onProgress);

                function onFinished(err, output) {
                  resolve(output);
                }

                function onProgress(event) {
                  var isTimeToReport = Date.now() > lastReportTime + 1000;

                  if (isTimeToReport) {
                    lastReportTime = Date.now();
                    process.stdout.write('.');
                  }
                }
              });
            }));

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _pullImage.apply(this, arguments);
}

function hasName(container, name) {
  var nameToFind = "/".concat(name).toLowerCase();
  return !!(container.Names || []).find(function (n) {
    return n.toLowerCase() === nameToFind;
  });
}

function imageMatched(image, tag) {
  image = image.toLowerCase();
  tag = tag.toLowerCase();
  var tagParts = tag.split(':');

  if (tagParts.length > 1) {
    return image === tag;
  }

  var imageParts = image.split(':');
  return imageParts[0] === tagParts[0];
}

function imageHasRepoTag(info, tag) {
  return !!(info.RepoTags || []).find(function (n) {
    return imageMatched(n, tag);
  });
}

function findContainerInfo(containers, name) {
  return containers.find(function (x) {
    return hasName(x, name);
  });
}

function findImageInfo(images, name) {
  return images.find(function (x) {
    return imageHasRepoTag(x, name);
  });
}

function isRunning(info) {
  return !!info && info.State.toLowerCase() === 'running';
}

function containerBelongsToImage(info, image) {
  return imageMatched(info.Image, image);
}

function isTonDevContainer(info) {
  return containerBelongsToImage(info, _config.defaultValues.net.image) || containerBelongsToImage(info, _config.defaultValues.compilers.image);
}

function isTonDevImage(info) {
  return imageHasRepoTag(info, _config.defaultValues.net.image) || imageHasRepoTag(info, _config.defaultValues.compilers.image);
}

function listTonDevContainers() {
  return _listTonDevContainers.apply(this, arguments);
}

function _listTonDevContainers() {
  _listTonDevContainers = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6() {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return listAllContainers();

          case 2:
            _context6.t0 = isTonDevContainer;
            return _context6.abrupt("return", _context6.sent.filter(_context6.t0));

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _listTonDevContainers.apply(this, arguments);
}

function listTonDevImages() {
  return _listTonDevImages.apply(this, arguments);
}

function _listTonDevImages() {
  _listTonDevImages = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7() {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return listAllImages();

          case 2:
            _context7.t0 = isTonDevImage;
            return _context7.abrupt("return", _context7.sent.filter(_context7.t0));

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _listTonDevImages.apply(this, arguments);
}

var _default = {
  numericVersion: numericVersion,
  createContainer: createContainer,
  getContainer: getContainer,
  isRunning: isRunning,
  listAllContainers: listAllContainers,
  listAllImages: listAllImages,
  getImage: getImage,
  pullImage: pullImage,
  findContainerInfo: findContainerInfo,
  findImageInfo: findImageInfo,
  listTonDevImages: listTonDevImages,
  listTonDevContainers: listTonDevContainers
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb2NrZXIuanMiXSwibmFtZXMiOlsiZG9ja2VyIiwiRG9ja2VyIiwibnVtZXJpY1ZlcnNpb24iLCJ2ZXJzaW9uIiwiVmVyc2lvbiIsImxpc3RBbGxDb250YWluZXJzIiwibGlzdENvbnRhaW5lcnMiLCJhbGwiLCJsaXN0QWxsSW1hZ2VzIiwibGlzdEltYWdlcyIsImdldENvbnRhaW5lciIsImlkIiwiZ2V0SW1hZ2UiLCJuYW1lIiwiY3JlYXRlQ29udGFpbmVyIiwib3B0aW9ucyIsInB1bGxJbWFnZSIsInJlcG9UYWciLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInB1bGwiLCJjb25maWciLCJhdXRoIiwiZXJyIiwic3RyZWFtIiwibGFzdFJlcG9ydFRpbWUiLCJEYXRlIiwibm93IiwibW9kZW0iLCJmb2xsb3dQcm9ncmVzcyIsIm9uRmluaXNoZWQiLCJvblByb2dyZXNzIiwib3V0cHV0IiwiZXZlbnQiLCJpc1RpbWVUb1JlcG9ydCIsInByb2Nlc3MiLCJzdGRvdXQiLCJ3cml0ZSIsImhhc05hbWUiLCJjb250YWluZXIiLCJuYW1lVG9GaW5kIiwidG9Mb3dlckNhc2UiLCJOYW1lcyIsImZpbmQiLCJuIiwiaW1hZ2VNYXRjaGVkIiwiaW1hZ2UiLCJ0YWciLCJ0YWdQYXJ0cyIsInNwbGl0IiwibGVuZ3RoIiwiaW1hZ2VQYXJ0cyIsImltYWdlSGFzUmVwb1RhZyIsImluZm8iLCJSZXBvVGFncyIsImZpbmRDb250YWluZXJJbmZvIiwiY29udGFpbmVycyIsIngiLCJmaW5kSW1hZ2VJbmZvIiwiaW1hZ2VzIiwiaXNSdW5uaW5nIiwiU3RhdGUiLCJjb250YWluZXJCZWxvbmdzVG9JbWFnZSIsIkltYWdlIiwiaXNUb25EZXZDb250YWluZXIiLCJkZWZhdWx0VmFsdWVzIiwibmV0IiwiY29tcGlsZXJzIiwiaXNUb25EZXZJbWFnZSIsImxpc3RUb25EZXZDb250YWluZXJzIiwiZmlsdGVyIiwibGlzdFRvbkRldkltYWdlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQWVBOztBQUNBOztBQUVBOztBQWxCQTs7Ozs7Ozs7Ozs7Ozs7QUFvQkEsSUFBTUEsTUFBTSxHQUFHLElBQUlDLHFCQUFKLEVBQWY7O1NBeUVlQyxjOzs7Ozs7OytCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQ29DRixNQUFNLENBQUNHLE9BQVAsRUFEcEM7O0FBQUE7QUFDVUEsWUFBQUEsT0FEVjtBQUFBLDZDQUVXLDRCQUFnQkEsT0FBTyxDQUFDQyxPQUF4QixDQUZYOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7U0FLZUMsaUI7Ozs7Ozs7K0JBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDhDQUNXTCxNQUFNLENBQUNNLGNBQVAsQ0FBc0I7QUFBRUMsY0FBQUEsR0FBRyxFQUFFO0FBQVAsYUFBdEIsQ0FEWDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O1NBSWVDLGE7Ozs7Ozs7K0JBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDhDQUNXUixNQUFNLENBQUNTLFVBQVAsQ0FBa0I7QUFBRUYsY0FBQUEsR0FBRyxFQUFFO0FBQVAsYUFBbEIsQ0FEWDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O0FBSUEsU0FBU0csWUFBVCxDQUFzQkMsRUFBdEIsRUFBOEM7QUFDMUMsU0FBT1gsTUFBTSxDQUFDVSxZQUFQLENBQW9CQyxFQUFwQixDQUFQO0FBQ0g7O0FBRUQsU0FBU0MsUUFBVCxDQUFrQkMsSUFBbEIsRUFBd0M7QUFDcEMsU0FBT2IsTUFBTSxDQUFDWSxRQUFQLENBQWdCQyxJQUFoQixDQUFQO0FBQ0g7O1NBRWNDLGU7Ozs7Ozs7K0JBQWYsa0JBQStCQyxPQUEvQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsOENBQ1dmLE1BQU0sQ0FBQ2MsZUFBUCxDQUF1QkMsT0FBdkIsQ0FEWDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O1NBSWVDLFM7Ozs7Ozs7K0JBQWYsa0JBQXlCQyxPQUF6QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsOENBQ1csSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNwQ3BCLGNBQUFBLE1BQU0sQ0FBQ3FCLElBQVAsQ0FBWUosT0FBWixFQUFxQkssZUFBT0MsSUFBNUIsRUFBa0MsVUFBVUMsR0FBVixFQUFlQyxNQUFmLEVBQXVCO0FBQ3JELG9CQUFJLENBQUNBLE1BQUwsRUFBYTtBQUNUTCxrQkFBQUEsTUFBTSxDQUFDSSxHQUFELENBQU47QUFDQTtBQUNIOztBQUNELG9CQUFJRSxjQUFjLEdBQUdDLElBQUksQ0FBQ0MsR0FBTCxFQUFyQjtBQUNBNUIsZ0JBQUFBLE1BQU0sQ0FBQzZCLEtBQVAsQ0FBYUMsY0FBYixDQUE0QkwsTUFBNUIsRUFBb0NNLFVBQXBDLEVBQWdEQyxVQUFoRDs7QUFFQSx5QkFBU0QsVUFBVCxDQUFvQlAsR0FBcEIsRUFBeUJTLE1BQXpCLEVBQWlDO0FBQzdCZCxrQkFBQUEsT0FBTyxDQUFDYyxNQUFELENBQVA7QUFDSDs7QUFFRCx5QkFBU0QsVUFBVCxDQUFvQkUsS0FBcEIsRUFBMkI7QUFDdkIsc0JBQU1DLGNBQWMsR0FBR1IsSUFBSSxDQUFDQyxHQUFMLEtBQWFGLGNBQWMsR0FBRyxJQUFyRDs7QUFDQSxzQkFBSVMsY0FBSixFQUFvQjtBQUNoQlQsb0JBQUFBLGNBQWMsR0FBR0MsSUFBSSxDQUFDQyxHQUFMLEVBQWpCO0FBQ0FRLG9CQUFBQSxPQUFPLENBQUNDLE1BQVIsQ0FBZUMsS0FBZixDQUFxQixHQUFyQjtBQUNIO0FBQ0o7QUFDSixlQW5CRDtBQXFCSCxhQXRCTSxDQURYOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7QUEwQkEsU0FBU0MsT0FBVCxDQUFpQkMsU0FBakIsRUFBNEMzQixJQUE1QyxFQUFtRTtBQUMvRCxNQUFNNEIsVUFBVSxHQUFHLFdBQUk1QixJQUFKLEVBQVc2QixXQUFYLEVBQW5CO0FBQ0EsU0FBTyxDQUFDLENBQUMsQ0FBQ0YsU0FBUyxDQUFDRyxLQUFWLElBQW1CLEVBQXBCLEVBQXdCQyxJQUF4QixDQUE2QixVQUFBQyxDQUFDO0FBQUEsV0FBSUEsQ0FBQyxDQUFDSCxXQUFGLE9BQW9CRCxVQUF4QjtBQUFBLEdBQTlCLENBQVQ7QUFDSDs7QUFFRCxTQUFTSyxZQUFULENBQXNCQyxLQUF0QixFQUFxQ0MsR0FBckMsRUFBMkQ7QUFDdkRELEVBQUFBLEtBQUssR0FBR0EsS0FBSyxDQUFDTCxXQUFOLEVBQVI7QUFDQU0sRUFBQUEsR0FBRyxHQUFHQSxHQUFHLENBQUNOLFdBQUosRUFBTjtBQUNBLE1BQU1PLFFBQVEsR0FBR0QsR0FBRyxDQUFDRSxLQUFKLENBQVUsR0FBVixDQUFqQjs7QUFDQSxNQUFJRCxRQUFRLENBQUNFLE1BQVQsR0FBa0IsQ0FBdEIsRUFBeUI7QUFDckIsV0FBT0osS0FBSyxLQUFLQyxHQUFqQjtBQUNIOztBQUNELE1BQU1JLFVBQVUsR0FBR0wsS0FBSyxDQUFDRyxLQUFOLENBQVksR0FBWixDQUFuQjtBQUNBLFNBQU9FLFVBQVUsQ0FBQyxDQUFELENBQVYsS0FBa0JILFFBQVEsQ0FBQyxDQUFELENBQWpDO0FBQ0g7O0FBRUQsU0FBU0ksZUFBVCxDQUF5QkMsSUFBekIsRUFBMkNOLEdBQTNDLEVBQWlFO0FBQzdELFNBQU8sQ0FBQyxDQUFDLENBQUNNLElBQUksQ0FBQ0MsUUFBTCxJQUFpQixFQUFsQixFQUFzQlgsSUFBdEIsQ0FBMkIsVUFBQUMsQ0FBQztBQUFBLFdBQUlDLFlBQVksQ0FBQ0QsQ0FBRCxFQUFJRyxHQUFKLENBQWhCO0FBQUEsR0FBNUIsQ0FBVDtBQUNIOztBQUVELFNBQVNRLGlCQUFULENBQTJCQyxVQUEzQixFQUF5RDVDLElBQXpELEVBQXdGO0FBQ3BGLFNBQU80QyxVQUFVLENBQUNiLElBQVgsQ0FBZ0IsVUFBQWMsQ0FBQztBQUFBLFdBQUluQixPQUFPLENBQUNtQixDQUFELEVBQUk3QyxJQUFKLENBQVg7QUFBQSxHQUFqQixDQUFQO0FBQ0g7O0FBRUQsU0FBUzhDLGFBQVQsQ0FBdUJDLE1BQXZCLEVBQTZDL0MsSUFBN0MsRUFBd0U7QUFDcEUsU0FBTytDLE1BQU0sQ0FBQ2hCLElBQVAsQ0FBWSxVQUFBYyxDQUFDO0FBQUEsV0FBSUwsZUFBZSxDQUFDSyxDQUFELEVBQUk3QyxJQUFKLENBQW5CO0FBQUEsR0FBYixDQUFQO0FBQ0g7O0FBRUQsU0FBU2dELFNBQVQsQ0FBbUJQLElBQW5CLEVBQW1EO0FBQy9DLFNBQU8sQ0FBQyxDQUFDQSxJQUFGLElBQVVBLElBQUksQ0FBQ1EsS0FBTCxDQUFXcEIsV0FBWCxPQUE2QixTQUE5QztBQUNIOztBQUVELFNBQVNxQix1QkFBVCxDQUFpQ1QsSUFBakMsRUFBdURQLEtBQXZELEVBQStFO0FBQzNFLFNBQU9ELFlBQVksQ0FBQ1EsSUFBSSxDQUFDVSxLQUFOLEVBQWFqQixLQUFiLENBQW5CO0FBQ0g7O0FBRUQsU0FBU2tCLGlCQUFULENBQTJCWCxJQUEzQixFQUEwRDtBQUN0RCxTQUFPUyx1QkFBdUIsQ0FBQ1QsSUFBRCxFQUFPWSxzQkFBY0MsR0FBZCxDQUFrQnBCLEtBQXpCLENBQXZCLElBQ0FnQix1QkFBdUIsQ0FBQ1QsSUFBRCxFQUFPWSxzQkFBY0UsU0FBZCxDQUF3QnJCLEtBQS9CLENBRDlCO0FBRUg7O0FBRUQsU0FBU3NCLGFBQVQsQ0FBdUJmLElBQXZCLEVBQWtEO0FBQzlDLFNBQU9ELGVBQWUsQ0FBQ0MsSUFBRCxFQUFPWSxzQkFBY0MsR0FBZCxDQUFrQnBCLEtBQXpCLENBQWYsSUFDQU0sZUFBZSxDQUFDQyxJQUFELEVBQU9ZLHNCQUFjRSxTQUFkLENBQXdCckIsS0FBL0IsQ0FEdEI7QUFFSDs7U0FFY3VCLG9COzs7Ozs7OytCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNrQmpFLGlCQUFpQixFQURuQzs7QUFBQTtBQUFBLDJCQUM4QzRELGlCQUQ5QztBQUFBLDZEQUN1Q00sTUFEdkM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztTQUllQyxnQjs7Ozs7OzsrQkFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFDa0JoRSxhQUFhLEVBRC9COztBQUFBO0FBQUEsMkJBQzBDNkQsYUFEMUM7QUFBQSw2REFDbUNFLE1BRG5DOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7ZUFJZTtBQUNYckUsRUFBQUEsY0FBYyxFQUFkQSxjQURXO0FBRVhZLEVBQUFBLGVBQWUsRUFBZkEsZUFGVztBQUdYSixFQUFBQSxZQUFZLEVBQVpBLFlBSFc7QUFJWG1ELEVBQUFBLFNBQVMsRUFBVEEsU0FKVztBQUtYeEQsRUFBQUEsaUJBQWlCLEVBQWpCQSxpQkFMVztBQU1YRyxFQUFBQSxhQUFhLEVBQWJBLGFBTlc7QUFPWEksRUFBQUEsUUFBUSxFQUFSQSxRQVBXO0FBUVhJLEVBQUFBLFNBQVMsRUFBVEEsU0FSVztBQVNYd0MsRUFBQUEsaUJBQWlCLEVBQWpCQSxpQkFUVztBQVVYRyxFQUFBQSxhQUFhLEVBQWJBLGFBVlc7QUFXWGEsRUFBQUEsZ0JBQWdCLEVBQWhCQSxnQkFYVztBQVlYRixFQUFBQSxvQkFBb0IsRUFBcEJBO0FBWlcsQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOC0yMDE5IFRPTiBERVYgU09MVVRJT05TIExURC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgU09GVFdBUkUgRVZBTFVBVElPTiBMaWNlbnNlICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbiAqIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxuICogTGljZW5zZSBhdDogaHR0cHM6Ly93d3cudG9uLmRldi9saWNlbnNlc1xuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgVE9OIERFViBzb2Z0d2FyZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cbi8vIEBmbG93XG5pbXBvcnQgeyBjb25maWcsIGRlZmF1bHRWYWx1ZXMgfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCBEb2NrZXIgZnJvbSAnZG9ja2Vyb2RlJztcblxuaW1wb3J0IHsgdmVyc2lvblRvTnVtYmVyIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuY29uc3QgZG9ja2VyID0gbmV3IERvY2tlcigpO1xuXG5leHBvcnQgdHlwZSBESW1hZ2VJbmZvID0ge1xuICAgIElkOiBzdHJpbmcsXG4gICAgUmVwb1RhZ3M6IHN0cmluZ1tdLFxufVxuXG5leHBvcnQgdHlwZSBEQ29udGFpbmVySW5mbyA9IHtcbiAgICBJZDogc3RyaW5nLFxuICAgIE5hbWVzOiBzdHJpbmdbXSxcbiAgICBJbWFnZTogc3RyaW5nLFxuICAgIEltYWdlSUQ6IHN0cmluZyxcbiAgICBTdGF0ZTogc3RyaW5nLFxufVxuXG5leHBvcnQgdHlwZSBEQ29udGFpbmVyRXhlY09wdGlvbnMgPSB7XG4gICAgQXR0YWNoU3RkaW4/OiBib29sZWFuLFxuICAgIEF0dGFjaFN0ZG91dD86IGJvb2xlYW4sXG4gICAgQXR0YWNoU3RkZXJyPzogYm9vbGVhbixcbiAgICBEZXRhY2hLZXlzPzogc3RyaW5nLFxuICAgIFR0eT86IGJvb2xlYW4sXG4gICAgRW52Pzogc3RyaW5nLFxuICAgIENtZD86IHN0cmluZ1tdLFxuICAgIFByaXZpbGVnZWQ/OiBib29sZWFuLFxuICAgIFVzZXI/OiBzdHJpbmcsXG4gICAgV29ya2luZ0Rpcj86IHN0cmluZyxcbn1cblxuZXhwb3J0IHR5cGUgRENvbnRhaW5lciA9IHtcbiAgICBtb2RlbTogYW55LFxuICAgIHN0YXJ0KCk6IFByb21pc2U8dm9pZD4sXG4gICAgZXhlYyhvcHRpb25zOiBEQ29udGFpbmVyRXhlY09wdGlvbnMsIGNhbGxiYWNrOiBhbnkpOiB2b2lkLFxuICAgIHN0b3AoKTogUHJvbWlzZTx2b2lkPixcbiAgICByZW1vdmUoKTogUHJvbWlzZTx2b2lkPixcbn1cblxuZXhwb3J0IHR5cGUgREltYWdlID0ge1xuICAgIHJlbW92ZSgpOiBQcm9taXNlPHZvaWQ+LFxufVxuXG5leHBvcnQgdHlwZSBETW91bnQgPSB7XG4gICAgVGFyZ2V0OiBzdHJpbmcsXG4gICAgU291cmNlOiBzdHJpbmcsXG4gICAgVHlwZTogJ2JpbmQnIHwgJ3ZvbHVtZScgfCAndG1wZnMnLFxufVxuXG5leHBvcnQgdHlwZSBEUG9ydEJpbmRpbmdzID0ge1xuICAgIFtzdHJpbmddOiB7IEhvc3RJcDogc3RyaW5nLCBIb3N0UG9ydDogc3RyaW5nIH1bXVxufTtcblxuZXhwb3J0IHR5cGUgRENyZWF0ZUNvbnRhaW5lck9wdGlvbnMgPSB7XG4gICAgbmFtZT86IHN0cmluZyxcbiAgICBJbWFnZTogc3RyaW5nLFxuICAgIEludGVyYWN0aXZlPzogYm9vbGVhbixcbiAgICBUdHk/OiBib29sZWFuLFxuICAgIFVzZXI/OiBzdHJpbmcsXG4gICAgRW50cnlwb2ludD86IHN0cmluZ1tdLFxuICAgIEVudjogc3RyaW5nW10sXG4gICAgSG9zdENvbmZpZz86IHtcbiAgICAgICAgTW91bnRzPzogRE1vdW50W10sXG4gICAgfSxcbiAgICBFeHBvc2VkUG9ydHM/OiB7XG4gICAgICAgIFtzdHJpbmddOiB7fSxcbiAgICB9LFxuICAgIEhvc3RDb25maWc/OiB7XG4gICAgICAgIFBvcnRCaW5kaW5ncz86IERQb3J0QmluZGluZ3MsXG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBEVmVyc2lvbiA9IHtcbiAgICBWZXJzaW9uOiBzdHJpbmcsXG59XG5cbmFzeW5jIGZ1bmN0aW9uIG51bWVyaWNWZXJzaW9uKCkge1xuICAgIGNvbnN0IHZlcnNpb246IERWZXJzaW9uID0gYXdhaXQgZG9ja2VyLnZlcnNpb24oKTtcbiAgICByZXR1cm4gdmVyc2lvblRvTnVtYmVyKHZlcnNpb24uVmVyc2lvbik7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGxpc3RBbGxDb250YWluZXJzKCk6IFByb21pc2U8RENvbnRhaW5lckluZm9bXT4ge1xuICAgIHJldHVybiBkb2NrZXIubGlzdENvbnRhaW5lcnMoeyBhbGw6IHRydWUgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGxpc3RBbGxJbWFnZXMoKTogUHJvbWlzZTxESW1hZ2VJbmZvW10+IHtcbiAgICByZXR1cm4gZG9ja2VyLmxpc3RJbWFnZXMoeyBhbGw6IHRydWUgfSk7XG59XG5cbmZ1bmN0aW9uIGdldENvbnRhaW5lcihpZDogc3RyaW5nKTogRENvbnRhaW5lciB7XG4gICAgcmV0dXJuIGRvY2tlci5nZXRDb250YWluZXIoaWQpO1xufVxuXG5mdW5jdGlvbiBnZXRJbWFnZShuYW1lOiBzdHJpbmcpOiBESW1hZ2Uge1xuICAgIHJldHVybiBkb2NrZXIuZ2V0SW1hZ2UobmFtZSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lcihvcHRpb25zOiBEQ3JlYXRlQ29udGFpbmVyT3B0aW9ucyk6IFByb21pc2U8RENvbnRhaW5lcj4ge1xuICAgIHJldHVybiBkb2NrZXIuY3JlYXRlQ29udGFpbmVyKG9wdGlvbnMpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBwdWxsSW1hZ2UocmVwb1RhZzogc3RyaW5nKTogUHJvbWlzZTxESW1hZ2U+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBkb2NrZXIucHVsbChyZXBvVGFnLCBjb25maWcuYXV0aCwgZnVuY3Rpb24gKGVyciwgc3RyZWFtKSB7XG4gICAgICAgICAgICBpZiAoIXN0cmVhbSkge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBsYXN0UmVwb3J0VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgICBkb2NrZXIubW9kZW0uZm9sbG93UHJvZ3Jlc3Moc3RyZWFtLCBvbkZpbmlzaGVkLCBvblByb2dyZXNzKTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gb25GaW5pc2hlZChlcnIsIG91dHB1dCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUob3V0cHV0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gb25Qcm9ncmVzcyhldmVudCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzVGltZVRvUmVwb3J0ID0gRGF0ZS5ub3coKSA+IGxhc3RSZXBvcnRUaW1lICsgMTAwMDtcbiAgICAgICAgICAgICAgICBpZiAoaXNUaW1lVG9SZXBvcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFJlcG9ydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZSgnLicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9KVxufVxuXG5mdW5jdGlvbiBoYXNOYW1lKGNvbnRhaW5lcjogRENvbnRhaW5lckluZm8sIG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IG5hbWVUb0ZpbmQgPSBgLyR7bmFtZX1gLnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuICEhKGNvbnRhaW5lci5OYW1lcyB8fCBbXSkuZmluZChuID0+IG4udG9Mb3dlckNhc2UoKSA9PT0gbmFtZVRvRmluZCk7XG59XG5cbmZ1bmN0aW9uIGltYWdlTWF0Y2hlZChpbWFnZTogc3RyaW5nLCB0YWc6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGltYWdlID0gaW1hZ2UudG9Mb3dlckNhc2UoKTtcbiAgICB0YWcgPSB0YWcudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCB0YWdQYXJ0cyA9IHRhZy5zcGxpdCgnOicpO1xuICAgIGlmICh0YWdQYXJ0cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIHJldHVybiBpbWFnZSA9PT0gdGFnO1xuICAgIH1cbiAgICBjb25zdCBpbWFnZVBhcnRzID0gaW1hZ2Uuc3BsaXQoJzonKTtcbiAgICByZXR1cm4gaW1hZ2VQYXJ0c1swXSA9PT0gdGFnUGFydHNbMF07XG59XG5cbmZ1bmN0aW9uIGltYWdlSGFzUmVwb1RhZyhpbmZvOiBESW1hZ2VJbmZvLCB0YWc6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIShpbmZvLlJlcG9UYWdzIHx8IFtdKS5maW5kKG4gPT4gaW1hZ2VNYXRjaGVkKG4sIHRhZykpO1xufVxuXG5mdW5jdGlvbiBmaW5kQ29udGFpbmVySW5mbyhjb250YWluZXJzOiBEQ29udGFpbmVySW5mb1tdLCBuYW1lOiBzdHJpbmcpOiA/RENvbnRhaW5lckluZm8ge1xuICAgIHJldHVybiBjb250YWluZXJzLmZpbmQoeCA9PiBoYXNOYW1lKHgsIG5hbWUpKTtcbn1cblxuZnVuY3Rpb24gZmluZEltYWdlSW5mbyhpbWFnZXM6IERJbWFnZUluZm9bXSwgbmFtZTogc3RyaW5nKTogP0RJbWFnZUluZm8ge1xuICAgIHJldHVybiBpbWFnZXMuZmluZCh4ID0+IGltYWdlSGFzUmVwb1RhZyh4LCBuYW1lKSk7XG59XG5cbmZ1bmN0aW9uIGlzUnVubmluZyhpbmZvOiA/RENvbnRhaW5lckluZm8pOiBib29sZWFuIHtcbiAgICByZXR1cm4gISFpbmZvICYmIGluZm8uU3RhdGUudG9Mb3dlckNhc2UoKSA9PT0gJ3J1bm5pbmcnO1xufVxuXG5mdW5jdGlvbiBjb250YWluZXJCZWxvbmdzVG9JbWFnZShpbmZvOiBEQ29udGFpbmVySW5mbywgaW1hZ2U6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpbWFnZU1hdGNoZWQoaW5mby5JbWFnZSwgaW1hZ2UpO1xufVxuXG5mdW5jdGlvbiBpc1RvbkRldkNvbnRhaW5lcihpbmZvOiBEQ29udGFpbmVySW5mbyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBjb250YWluZXJCZWxvbmdzVG9JbWFnZShpbmZvLCBkZWZhdWx0VmFsdWVzLm5ldC5pbWFnZSlcbiAgICAgICAgfHwgY29udGFpbmVyQmVsb25nc1RvSW1hZ2UoaW5mbywgZGVmYXVsdFZhbHVlcy5jb21waWxlcnMuaW1hZ2UpO1xufVxuXG5mdW5jdGlvbiBpc1RvbkRldkltYWdlKGluZm86IERJbWFnZUluZm8pOiBib29sZWFuIHtcbiAgICByZXR1cm4gaW1hZ2VIYXNSZXBvVGFnKGluZm8sIGRlZmF1bHRWYWx1ZXMubmV0LmltYWdlKVxuICAgICAgICB8fCBpbWFnZUhhc1JlcG9UYWcoaW5mbywgZGVmYXVsdFZhbHVlcy5jb21waWxlcnMuaW1hZ2UpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBsaXN0VG9uRGV2Q29udGFpbmVycygpOiBQcm9taXNlPERDb250YWluZXJJbmZvW10+IHtcbiAgICByZXR1cm4gKGF3YWl0IGxpc3RBbGxDb250YWluZXJzKCkpLmZpbHRlcihpc1RvbkRldkNvbnRhaW5lcik7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGxpc3RUb25EZXZJbWFnZXMoKTogUHJvbWlzZTxESW1hZ2VJbmZvW10+IHtcbiAgICByZXR1cm4gKGF3YWl0IGxpc3RBbGxJbWFnZXMoKSkuZmlsdGVyKGlzVG9uRGV2SW1hZ2UpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgbnVtZXJpY1ZlcnNpb24sXG4gICAgY3JlYXRlQ29udGFpbmVyLFxuICAgIGdldENvbnRhaW5lcixcbiAgICBpc1J1bm5pbmcsXG4gICAgbGlzdEFsbENvbnRhaW5lcnMsXG4gICAgbGlzdEFsbEltYWdlcyxcbiAgICBnZXRJbWFnZSxcbiAgICBwdWxsSW1hZ2UsXG4gICAgZmluZENvbnRhaW5lckluZm8sXG4gICAgZmluZEltYWdlSW5mbyxcbiAgICBsaXN0VG9uRGV2SW1hZ2VzLFxuICAgIGxpc3RUb25EZXZDb250YWluZXJzLFxufVxuIl19