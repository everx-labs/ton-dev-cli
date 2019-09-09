"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _config = _interopRequireDefault(require("./config"));

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
              docker.pull(repoTag, _config["default"].auth, function (err, stream) {
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

function imageHasRepoTag(info, tag) {
  return !!(info.RepoTags || []).find(function (n) {
    return n.toLowerCase() === tag.toLowerCase();
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
  return info.Image.toLowerCase() === image.toLowerCase();
}

function isTonDevContainer(info) {
  return containerBelongsToImage(info, _config["default"].localNode.image) || containerBelongsToImage(info, _config["default"].compilers.image);
}

function isTonDevImage(info) {
  return imageHasRepoTag(info, _config["default"].localNode.image) || imageHasRepoTag(info, _config["default"].compilers.image);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb2NrZXIuanMiXSwibmFtZXMiOlsiZG9ja2VyIiwiRG9ja2VyIiwibnVtZXJpY1ZlcnNpb24iLCJ2ZXJzaW9uIiwiVmVyc2lvbiIsImxpc3RBbGxDb250YWluZXJzIiwibGlzdENvbnRhaW5lcnMiLCJhbGwiLCJsaXN0QWxsSW1hZ2VzIiwibGlzdEltYWdlcyIsImdldENvbnRhaW5lciIsImlkIiwiZ2V0SW1hZ2UiLCJuYW1lIiwiY3JlYXRlQ29udGFpbmVyIiwib3B0aW9ucyIsInB1bGxJbWFnZSIsInJlcG9UYWciLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInB1bGwiLCJjb25maWciLCJhdXRoIiwiZXJyIiwic3RyZWFtIiwibGFzdFJlcG9ydFRpbWUiLCJEYXRlIiwibm93IiwibW9kZW0iLCJmb2xsb3dQcm9ncmVzcyIsIm9uRmluaXNoZWQiLCJvblByb2dyZXNzIiwib3V0cHV0IiwiZXZlbnQiLCJpc1RpbWVUb1JlcG9ydCIsInByb2Nlc3MiLCJzdGRvdXQiLCJ3cml0ZSIsImhhc05hbWUiLCJjb250YWluZXIiLCJuYW1lVG9GaW5kIiwidG9Mb3dlckNhc2UiLCJOYW1lcyIsImZpbmQiLCJuIiwiaW1hZ2VIYXNSZXBvVGFnIiwiaW5mbyIsInRhZyIsIlJlcG9UYWdzIiwiZmluZENvbnRhaW5lckluZm8iLCJjb250YWluZXJzIiwieCIsImZpbmRJbWFnZUluZm8iLCJpbWFnZXMiLCJpc1J1bm5pbmciLCJTdGF0ZSIsImNvbnRhaW5lckJlbG9uZ3NUb0ltYWdlIiwiaW1hZ2UiLCJJbWFnZSIsImlzVG9uRGV2Q29udGFpbmVyIiwibG9jYWxOb2RlIiwiY29tcGlsZXJzIiwiaXNUb25EZXZJbWFnZSIsImxpc3RUb25EZXZDb250YWluZXJzIiwiZmlsdGVyIiwibGlzdFRvbkRldkltYWdlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQWVBOztBQUNBOztBQUVBOztBQWxCQTs7Ozs7Ozs7Ozs7Ozs7QUFvQkEsSUFBTUEsTUFBTSxHQUFHLElBQUlDLHFCQUFKLEVBQWY7O1NBc0VlQyxjOzs7Ozs7OytCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQ29DRixNQUFNLENBQUNHLE9BQVAsRUFEcEM7O0FBQUE7QUFDVUEsWUFBQUEsT0FEVjtBQUFBLDZDQUVXLDRCQUFnQkEsT0FBTyxDQUFDQyxPQUF4QixDQUZYOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7U0FLZUMsaUI7Ozs7Ozs7K0JBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDhDQUNXTCxNQUFNLENBQUNNLGNBQVAsQ0FBc0I7QUFBRUMsY0FBQUEsR0FBRyxFQUFFO0FBQVAsYUFBdEIsQ0FEWDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O1NBSWVDLGE7Ozs7Ozs7K0JBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDhDQUNXUixNQUFNLENBQUNTLFVBQVAsQ0FBa0I7QUFBRUYsY0FBQUEsR0FBRyxFQUFFO0FBQVAsYUFBbEIsQ0FEWDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O0FBSUEsU0FBU0csWUFBVCxDQUFzQkMsRUFBdEIsRUFBOEM7QUFDMUMsU0FBT1gsTUFBTSxDQUFDVSxZQUFQLENBQW9CQyxFQUFwQixDQUFQO0FBQ0g7O0FBRUQsU0FBU0MsUUFBVCxDQUFrQkMsSUFBbEIsRUFBd0M7QUFDcEMsU0FBT2IsTUFBTSxDQUFDWSxRQUFQLENBQWdCQyxJQUFoQixDQUFQO0FBQ0g7O1NBRWNDLGU7Ozs7Ozs7K0JBQWYsa0JBQStCQyxPQUEvQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsOENBQ1dmLE1BQU0sQ0FBQ2MsZUFBUCxDQUF1QkMsT0FBdkIsQ0FEWDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O1NBSWVDLFM7Ozs7Ozs7K0JBQWYsa0JBQXlCQyxPQUF6QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsOENBQ1csSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNwQ3BCLGNBQUFBLE1BQU0sQ0FBQ3FCLElBQVAsQ0FBWUosT0FBWixFQUFxQkssbUJBQU9DLElBQTVCLEVBQWtDLFVBQVVDLEdBQVYsRUFBZUMsTUFBZixFQUF1QjtBQUNyRCxvQkFBSSxDQUFDQSxNQUFMLEVBQWE7QUFDVEwsa0JBQUFBLE1BQU0sQ0FBQ0ksR0FBRCxDQUFOO0FBQ0E7QUFDSDs7QUFDRCxvQkFBSUUsY0FBYyxHQUFHQyxJQUFJLENBQUNDLEdBQUwsRUFBckI7QUFDQTVCLGdCQUFBQSxNQUFNLENBQUM2QixLQUFQLENBQWFDLGNBQWIsQ0FBNEJMLE1BQTVCLEVBQW9DTSxVQUFwQyxFQUFnREMsVUFBaEQ7O0FBRUEseUJBQVNELFVBQVQsQ0FBb0JQLEdBQXBCLEVBQXlCUyxNQUF6QixFQUFpQztBQUM3QmQsa0JBQUFBLE9BQU8sQ0FBQ2MsTUFBRCxDQUFQO0FBQ0g7O0FBRUQseUJBQVNELFVBQVQsQ0FBb0JFLEtBQXBCLEVBQTJCO0FBQ3ZCLHNCQUFNQyxjQUFjLEdBQUdSLElBQUksQ0FBQ0MsR0FBTCxLQUFhRixjQUFjLEdBQUcsSUFBckQ7O0FBQ0Esc0JBQUlTLGNBQUosRUFBb0I7QUFDaEJULG9CQUFBQSxjQUFjLEdBQUdDLElBQUksQ0FBQ0MsR0FBTCxFQUFqQjtBQUNBUSxvQkFBQUEsT0FBTyxDQUFDQyxNQUFSLENBQWVDLEtBQWYsQ0FBcUIsR0FBckI7QUFDSDtBQUNKO0FBQ0osZUFuQkQ7QUFxQkgsYUF0Qk0sQ0FEWDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O0FBMEJBLFNBQVNDLE9BQVQsQ0FBaUJDLFNBQWpCLEVBQTRDM0IsSUFBNUMsRUFBbUU7QUFDL0QsTUFBTTRCLFVBQVUsR0FBRyxXQUFJNUIsSUFBSixFQUFXNkIsV0FBWCxFQUFuQjtBQUNBLFNBQU8sQ0FBQyxDQUFDLENBQUNGLFNBQVMsQ0FBQ0csS0FBVixJQUFtQixFQUFwQixFQUF3QkMsSUFBeEIsQ0FBNkIsVUFBQUMsQ0FBQztBQUFBLFdBQUlBLENBQUMsQ0FBQ0gsV0FBRixPQUFvQkQsVUFBeEI7QUFBQSxHQUE5QixDQUFUO0FBQ0g7O0FBRUQsU0FBU0ssZUFBVCxDQUF5QkMsSUFBekIsRUFBMkNDLEdBQTNDLEVBQWlFO0FBQzdELFNBQU8sQ0FBQyxDQUFDLENBQUNELElBQUksQ0FBQ0UsUUFBTCxJQUFpQixFQUFsQixFQUFzQkwsSUFBdEIsQ0FBMkIsVUFBQUMsQ0FBQztBQUFBLFdBQUlBLENBQUMsQ0FBQ0gsV0FBRixPQUFvQk0sR0FBRyxDQUFDTixXQUFKLEVBQXhCO0FBQUEsR0FBNUIsQ0FBVDtBQUNIOztBQUVELFNBQVNRLGlCQUFULENBQTJCQyxVQUEzQixFQUF5RHRDLElBQXpELEVBQXdGO0FBQ3BGLFNBQU9zQyxVQUFVLENBQUNQLElBQVgsQ0FBZ0IsVUFBQVEsQ0FBQztBQUFBLFdBQUliLE9BQU8sQ0FBQ2EsQ0FBRCxFQUFJdkMsSUFBSixDQUFYO0FBQUEsR0FBakIsQ0FBUDtBQUNIOztBQUVELFNBQVN3QyxhQUFULENBQXVCQyxNQUF2QixFQUE2Q3pDLElBQTdDLEVBQXdFO0FBQ3BFLFNBQU95QyxNQUFNLENBQUNWLElBQVAsQ0FBWSxVQUFBUSxDQUFDO0FBQUEsV0FBSU4sZUFBZSxDQUFDTSxDQUFELEVBQUl2QyxJQUFKLENBQW5CO0FBQUEsR0FBYixDQUFQO0FBQ0g7O0FBRUQsU0FBUzBDLFNBQVQsQ0FBbUJSLElBQW5CLEVBQW1EO0FBQy9DLFNBQU8sQ0FBQyxDQUFDQSxJQUFGLElBQVVBLElBQUksQ0FBQ1MsS0FBTCxDQUFXZCxXQUFYLE9BQTZCLFNBQTlDO0FBQ0g7O0FBRUQsU0FBU2UsdUJBQVQsQ0FBaUNWLElBQWpDLEVBQXVEVyxLQUF2RCxFQUErRTtBQUMzRSxTQUFPWCxJQUFJLENBQUNZLEtBQUwsQ0FBV2pCLFdBQVgsT0FBNkJnQixLQUFLLENBQUNoQixXQUFOLEVBQXBDO0FBQ0g7O0FBRUQsU0FBU2tCLGlCQUFULENBQTJCYixJQUEzQixFQUEwRDtBQUN0RCxTQUFPVSx1QkFBdUIsQ0FBQ1YsSUFBRCxFQUFPekIsbUJBQU91QyxTQUFQLENBQWlCSCxLQUF4QixDQUF2QixJQUNBRCx1QkFBdUIsQ0FBQ1YsSUFBRCxFQUFPekIsbUJBQU93QyxTQUFQLENBQWlCSixLQUF4QixDQUQ5QjtBQUVIOztBQUVELFNBQVNLLGFBQVQsQ0FBdUJoQixJQUF2QixFQUFrRDtBQUM5QyxTQUFPRCxlQUFlLENBQUNDLElBQUQsRUFBT3pCLG1CQUFPdUMsU0FBUCxDQUFpQkgsS0FBeEIsQ0FBZixJQUNBWixlQUFlLENBQUNDLElBQUQsRUFBT3pCLG1CQUFPd0MsU0FBUCxDQUFpQkosS0FBeEIsQ0FEdEI7QUFFSDs7U0FFY00sb0I7Ozs7Ozs7K0JBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQ2tCM0QsaUJBQWlCLEVBRG5DOztBQUFBO0FBQUEsMkJBQzhDdUQsaUJBRDlDO0FBQUEsNkRBQ3VDSyxNQUR2Qzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O1NBSWVDLGdCOzs7Ozs7OytCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNrQjFELGFBQWEsRUFEL0I7O0FBQUE7QUFBQSwyQkFDMEN1RCxhQUQxQztBQUFBLDZEQUNtQ0UsTUFEbkM7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztlQUllO0FBQ1gvRCxFQUFBQSxjQUFjLEVBQWRBLGNBRFc7QUFFWFksRUFBQUEsZUFBZSxFQUFmQSxlQUZXO0FBR1hKLEVBQUFBLFlBQVksRUFBWkEsWUFIVztBQUlYNkMsRUFBQUEsU0FBUyxFQUFUQSxTQUpXO0FBS1hsRCxFQUFBQSxpQkFBaUIsRUFBakJBLGlCQUxXO0FBTVhHLEVBQUFBLGFBQWEsRUFBYkEsYUFOVztBQU9YSSxFQUFBQSxRQUFRLEVBQVJBLFFBUFc7QUFRWEksRUFBQUEsU0FBUyxFQUFUQSxTQVJXO0FBU1hrQyxFQUFBQSxpQkFBaUIsRUFBakJBLGlCQVRXO0FBVVhHLEVBQUFBLGFBQWEsRUFBYkEsYUFWVztBQVdYYSxFQUFBQSxnQkFBZ0IsRUFBaEJBLGdCQVhXO0FBWVhGLEVBQUFBLG9CQUFvQixFQUFwQkE7QUFaVyxDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuLy8gQGZsb3dcbmltcG9ydCBjb25maWcgZnJvbSBcIi4vY29uZmlnXCI7XG5pbXBvcnQgRG9ja2VyIGZyb20gJ2RvY2tlcm9kZSc7XG5cbmltcG9ydCB7IHZlcnNpb25Ub051bWJlciB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmNvbnN0IGRvY2tlciA9IG5ldyBEb2NrZXIoKTtcblxuZXhwb3J0IHR5cGUgREltYWdlSW5mbyA9IHtcbiAgICBJZDogc3RyaW5nLFxuICAgIFJlcG9UYWdzOiBzdHJpbmdbXSxcbn1cblxuZXhwb3J0IHR5cGUgRENvbnRhaW5lckluZm8gPSB7XG4gICAgSWQ6IHN0cmluZyxcbiAgICBOYW1lczogc3RyaW5nW10sXG4gICAgSW1hZ2U6IHN0cmluZyxcbiAgICBJbWFnZUlEOiBzdHJpbmcsXG4gICAgU3RhdGU6IHN0cmluZyxcbn1cblxuZXhwb3J0IHR5cGUgRENvbnRhaW5lckV4ZWNPcHRpb25zID0ge1xuICAgIEF0dGFjaFN0ZGluPzogYm9vbGVhbixcbiAgICBBdHRhY2hTdGRvdXQ/OiBib29sZWFuLFxuICAgIEF0dGFjaFN0ZGVycj86IGJvb2xlYW4sXG4gICAgRGV0YWNoS2V5cz86IHN0cmluZyxcbiAgICBUdHk/OiBib29sZWFuLFxuICAgIEVudj86IHN0cmluZyxcbiAgICBDbWQ/OiBzdHJpbmdbXSxcbiAgICBQcml2aWxlZ2VkPzogYm9vbGVhbixcbiAgICBVc2VyPzogc3RyaW5nLFxuICAgIFdvcmtpbmdEaXI/OiBzdHJpbmcsXG59XG5cbmV4cG9ydCB0eXBlIERDb250YWluZXIgPSB7XG4gICAgbW9kZW06IGFueSxcbiAgICBzdGFydCgpOiBQcm9taXNlPHZvaWQ+LFxuICAgIGV4ZWMob3B0aW9uczogRENvbnRhaW5lckV4ZWNPcHRpb25zLCBjYWxsYmFjazogYW55KTogdm9pZCxcbiAgICBzdG9wKCk6IFByb21pc2U8dm9pZD4sXG4gICAgcmVtb3ZlKCk6IFByb21pc2U8dm9pZD4sXG59XG5cbmV4cG9ydCB0eXBlIERJbWFnZSA9IHtcbiAgICByZW1vdmUoKTogUHJvbWlzZTx2b2lkPixcbn1cblxuZXhwb3J0IHR5cGUgRE1vdW50ID0ge1xuICAgIFRhcmdldDogc3RyaW5nLFxuICAgIFNvdXJjZTogc3RyaW5nLFxuICAgIFR5cGU6ICdiaW5kJyB8ICd2b2x1bWUnIHwgJ3RtcGZzJyxcbn1cblxuZXhwb3J0IHR5cGUgRENyZWF0ZUNvbnRhaW5lck9wdGlvbnMgPSB7XG4gICAgbmFtZT86IHN0cmluZyxcbiAgICBJbWFnZTogc3RyaW5nLFxuICAgIEludGVyYWN0aXZlPzogYm9vbGVhbixcbiAgICBUdHk/OiBib29sZWFuLFxuICAgIFVzZXI/OiBzdHJpbmcsXG4gICAgRW50cnlwb2ludD86IHN0cmluZ1tdLFxuICAgIEhvc3RDb25maWc/OiB7XG4gICAgICAgIE1vdW50cz86IERNb3VudFtdLFxuICAgIH0sXG4gICAgRXhwb3NlZFBvcnRzPzoge1xuICAgICAgICBbc3RyaW5nXToge31cbiAgICB9LFxuICAgIEhvc3RDb25maWc/OiB7XG4gICAgICAgIFBvcnRCaW5kaW5ncz86IHtcbiAgICAgICAgICAgIFtzdHJpbmddOiB7IEhvc3RJcDogc3RyaW5nLCBIb3N0UG9ydDogc3RyaW5nIH1bXVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBEVmVyc2lvbiA9IHtcbiAgICBWZXJzaW9uOiBzdHJpbmcsXG59XG5cbmFzeW5jIGZ1bmN0aW9uIG51bWVyaWNWZXJzaW9uKCkge1xuICAgIGNvbnN0IHZlcnNpb246IERWZXJzaW9uID0gYXdhaXQgZG9ja2VyLnZlcnNpb24oKTtcbiAgICByZXR1cm4gdmVyc2lvblRvTnVtYmVyKHZlcnNpb24uVmVyc2lvbik7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGxpc3RBbGxDb250YWluZXJzKCk6IFByb21pc2U8RENvbnRhaW5lckluZm9bXT4ge1xuICAgIHJldHVybiBkb2NrZXIubGlzdENvbnRhaW5lcnMoeyBhbGw6IHRydWUgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGxpc3RBbGxJbWFnZXMoKTogUHJvbWlzZTxESW1hZ2VJbmZvW10+IHtcbiAgICByZXR1cm4gZG9ja2VyLmxpc3RJbWFnZXMoeyBhbGw6IHRydWUgfSk7XG59XG5cbmZ1bmN0aW9uIGdldENvbnRhaW5lcihpZDogc3RyaW5nKTogRENvbnRhaW5lciB7XG4gICAgcmV0dXJuIGRvY2tlci5nZXRDb250YWluZXIoaWQpO1xufVxuXG5mdW5jdGlvbiBnZXRJbWFnZShuYW1lOiBzdHJpbmcpOiBESW1hZ2Uge1xuICAgIHJldHVybiBkb2NrZXIuZ2V0SW1hZ2UobmFtZSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lcihvcHRpb25zOiBEQ3JlYXRlQ29udGFpbmVyT3B0aW9ucyk6IFByb21pc2U8RENvbnRhaW5lcj4ge1xuICAgIHJldHVybiBkb2NrZXIuY3JlYXRlQ29udGFpbmVyKG9wdGlvbnMpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBwdWxsSW1hZ2UocmVwb1RhZzogc3RyaW5nKTogUHJvbWlzZTxESW1hZ2U+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBkb2NrZXIucHVsbChyZXBvVGFnLCBjb25maWcuYXV0aCwgZnVuY3Rpb24gKGVyciwgc3RyZWFtKSB7XG4gICAgICAgICAgICBpZiAoIXN0cmVhbSkge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBsYXN0UmVwb3J0VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgICBkb2NrZXIubW9kZW0uZm9sbG93UHJvZ3Jlc3Moc3RyZWFtLCBvbkZpbmlzaGVkLCBvblByb2dyZXNzKTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gb25GaW5pc2hlZChlcnIsIG91dHB1dCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUob3V0cHV0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gb25Qcm9ncmVzcyhldmVudCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzVGltZVRvUmVwb3J0ID0gRGF0ZS5ub3coKSA+IGxhc3RSZXBvcnRUaW1lICsgMTAwMDtcbiAgICAgICAgICAgICAgICBpZiAoaXNUaW1lVG9SZXBvcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFJlcG9ydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZSgnLicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9KVxufVxuXG5mdW5jdGlvbiBoYXNOYW1lKGNvbnRhaW5lcjogRENvbnRhaW5lckluZm8sIG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IG5hbWVUb0ZpbmQgPSBgLyR7bmFtZX1gLnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuICEhKGNvbnRhaW5lci5OYW1lcyB8fCBbXSkuZmluZChuID0+IG4udG9Mb3dlckNhc2UoKSA9PT0gbmFtZVRvRmluZCk7XG59XG5cbmZ1bmN0aW9uIGltYWdlSGFzUmVwb1RhZyhpbmZvOiBESW1hZ2VJbmZvLCB0YWc6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIShpbmZvLlJlcG9UYWdzIHx8IFtdKS5maW5kKG4gPT4gbi50b0xvd2VyQ2FzZSgpID09PSB0YWcudG9Mb3dlckNhc2UoKSk7XG59XG5cbmZ1bmN0aW9uIGZpbmRDb250YWluZXJJbmZvKGNvbnRhaW5lcnM6IERDb250YWluZXJJbmZvW10sIG5hbWU6IHN0cmluZyk6ID9EQ29udGFpbmVySW5mbyB7XG4gICAgcmV0dXJuIGNvbnRhaW5lcnMuZmluZCh4ID0+IGhhc05hbWUoeCwgbmFtZSkpO1xufVxuXG5mdW5jdGlvbiBmaW5kSW1hZ2VJbmZvKGltYWdlczogREltYWdlSW5mb1tdLCBuYW1lOiBzdHJpbmcpOiA/REltYWdlSW5mbyB7XG4gICAgcmV0dXJuIGltYWdlcy5maW5kKHggPT4gaW1hZ2VIYXNSZXBvVGFnKHgsIG5hbWUpKTtcbn1cblxuZnVuY3Rpb24gaXNSdW5uaW5nKGluZm86ID9EQ29udGFpbmVySW5mbyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIWluZm8gJiYgaW5mby5TdGF0ZS50b0xvd2VyQ2FzZSgpID09PSAncnVubmluZyc7XG59XG5cbmZ1bmN0aW9uIGNvbnRhaW5lckJlbG9uZ3NUb0ltYWdlKGluZm86IERDb250YWluZXJJbmZvLCBpbWFnZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGluZm8uSW1hZ2UudG9Mb3dlckNhc2UoKSA9PT0gaW1hZ2UudG9Mb3dlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gaXNUb25EZXZDb250YWluZXIoaW5mbzogRENvbnRhaW5lckluZm8pOiBib29sZWFuIHtcbiAgICByZXR1cm4gY29udGFpbmVyQmVsb25nc1RvSW1hZ2UoaW5mbywgY29uZmlnLmxvY2FsTm9kZS5pbWFnZSlcbiAgICAgICAgfHwgY29udGFpbmVyQmVsb25nc1RvSW1hZ2UoaW5mbywgY29uZmlnLmNvbXBpbGVycy5pbWFnZSk7XG59XG5cbmZ1bmN0aW9uIGlzVG9uRGV2SW1hZ2UoaW5mbzogREltYWdlSW5mbyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpbWFnZUhhc1JlcG9UYWcoaW5mbywgY29uZmlnLmxvY2FsTm9kZS5pbWFnZSlcbiAgICAgICAgfHwgaW1hZ2VIYXNSZXBvVGFnKGluZm8sIGNvbmZpZy5jb21waWxlcnMuaW1hZ2UpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBsaXN0VG9uRGV2Q29udGFpbmVycygpOiBQcm9taXNlPERDb250YWluZXJJbmZvW10+IHtcbiAgICByZXR1cm4gKGF3YWl0IGxpc3RBbGxDb250YWluZXJzKCkpLmZpbHRlcihpc1RvbkRldkNvbnRhaW5lcik7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGxpc3RUb25EZXZJbWFnZXMoKTogUHJvbWlzZTxESW1hZ2VJbmZvW10+IHtcbiAgICByZXR1cm4gKGF3YWl0IGxpc3RBbGxJbWFnZXMoKSkuZmlsdGVyKGlzVG9uRGV2SW1hZ2UpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgbnVtZXJpY1ZlcnNpb24sXG4gICAgY3JlYXRlQ29udGFpbmVyLFxuICAgIGdldENvbnRhaW5lcixcbiAgICBpc1J1bm5pbmcsXG4gICAgbGlzdEFsbENvbnRhaW5lcnMsXG4gICAgbGlzdEFsbEltYWdlcyxcbiAgICBnZXRJbWFnZSxcbiAgICBwdWxsSW1hZ2UsXG4gICAgZmluZENvbnRhaW5lckluZm8sXG4gICAgZmluZEltYWdlSW5mbyxcbiAgICBsaXN0VG9uRGV2SW1hZ2VzLFxuICAgIGxpc3RUb25EZXZDb250YWluZXJzLFxufVxuIl19