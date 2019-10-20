"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Compilers = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _docker = require("../utils/docker");

var _utils = require("../utils/utils");

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
var Compilers =
/*#__PURE__*/
function () {
  function Compilers(config) {
    (0, _classCallCheck2["default"])(this, Compilers);
    (0, _defineProperty2["default"])(this, "version", void 0);
    (0, _defineProperty2["default"])(this, "requiredImage", void 0);
    (0, _defineProperty2["default"])(this, "containerName", void 0);
    (0, _defineProperty2["default"])(this, "mountDestination", void 0);
    this.setConfig(config);
  }

  (0, _createClass2["default"])(Compilers, [{
    key: "setConfig",
    value: function setConfig(config) {
      this.version = config.version;
      this.requiredImage = "".concat(Compilers.imagePrefix, ":").concat(config.version);
      this.containerName = "".concat(Compilers.containerPrefix, "-").concat(_utils.userIdentifier);
      this.mountDestination = '/projects';
    }
  }, {
    key: "getConfig",
    value: function getConfig() {
      return {
        version: this.version
      };
    }
  }, {
    key: "createContainer",
    value: function () {
      var _createContainer = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(docker) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                throw new Error('Internal error: invalid call to Compilers.createContainer');

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createContainer(_x) {
        return _createContainer.apply(this, arguments);
      }

      return createContainer;
    }()
  }, {
    key: "createContainerMountedTo",
    value: function () {
      var _createContainerMountedTo = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(hostPath, docker) {
        var existing, name, index;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return docker.ensureImage(this.requiredImage);

              case 2:
                _context2.next = 4;
                return docker.getContainerInfos();

              case 4:
                existing = _context2.sent;
                name = '';
                index = 0;

                do {
                  name = "".concat(this.containerName).concat(index > 0 ? "-".concat(index) : '');
                  index += 1;
                } while (existing.find(function (x) {
                  return _docker.DevDocker.hasName(x, name);
                }));

                docker.dropCache();
                return _context2.abrupt("return", docker.client.createContainer({
                  name: name,
                  interactive: true,
                  Image: this.requiredImage,
                  Tty: true,
                  Env: ['USER_AGREEMENT=yes'],
                  HostConfig: {
                    Mounts: [{
                      Type: 'bind',
                      Source: hostPath,
                      Target: this.mountDestination
                    }]
                  }
                }));

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function createContainerMountedTo(_x2, _x3) {
        return _createContainerMountedTo.apply(this, arguments);
      }

      return createContainerMountedTo;
    }()
  }]);
  return Compilers;
}();

exports.Compilers = Compilers;
(0, _defineProperty2["default"])(Compilers, "imagePrefix", 'tonlabs/compilers');
(0, _defineProperty2["default"])(Compilers, "containerPrefix", 'tonlabs-compilers');
(0, _defineProperty2["default"])(Compilers, "defaultConfig", Object.freeze({
  version: 'latest'
}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21waWxlcnMvY29tcGlsZXJzLmpzIl0sIm5hbWVzIjpbIkNvbXBpbGVycyIsImNvbmZpZyIsInNldENvbmZpZyIsInZlcnNpb24iLCJyZXF1aXJlZEltYWdlIiwiaW1hZ2VQcmVmaXgiLCJjb250YWluZXJOYW1lIiwiY29udGFpbmVyUHJlZml4IiwidXNlcklkZW50aWZpZXIiLCJtb3VudERlc3RpbmF0aW9uIiwiZG9ja2VyIiwiRXJyb3IiLCJob3N0UGF0aCIsImVuc3VyZUltYWdlIiwiZ2V0Q29udGFpbmVySW5mb3MiLCJleGlzdGluZyIsIm5hbWUiLCJpbmRleCIsImZpbmQiLCJ4IiwiRGV2RG9ja2VyIiwiaGFzTmFtZSIsImRyb3BDYWNoZSIsImNsaWVudCIsImNyZWF0ZUNvbnRhaW5lciIsImludGVyYWN0aXZlIiwiSW1hZ2UiLCJUdHkiLCJFbnYiLCJIb3N0Q29uZmlnIiwiTW91bnRzIiwiVHlwZSIsIlNvdXJjZSIsIlRhcmdldCIsIk9iamVjdCIsImZyZWV6ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQTs7QUFDQTs7QUFqQkE7Ozs7Ozs7Ozs7Ozs7O0lBd0JhQSxTOzs7QUFZVCxxQkFBWUMsTUFBWixFQUFxQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDakMsU0FBS0MsU0FBTCxDQUFlRCxNQUFmO0FBQ0g7Ozs7OEJBRVNBLE0sRUFBeUI7QUFDL0IsV0FBS0UsT0FBTCxHQUFlRixNQUFNLENBQUNFLE9BQXRCO0FBQ0EsV0FBS0MsYUFBTCxhQUF3QkosU0FBUyxDQUFDSyxXQUFsQyxjQUFpREosTUFBTSxDQUFDRSxPQUF4RDtBQUNBLFdBQUtHLGFBQUwsYUFBd0JOLFNBQVMsQ0FBQ08sZUFBbEMsY0FBcURDLHFCQUFyRDtBQUNBLFdBQUtDLGdCQUFMLEdBQXdCLFdBQXhCO0FBQ0g7OztnQ0FFNEI7QUFDekIsYUFBTztBQUNITixRQUFBQSxPQUFPLEVBQUUsS0FBS0E7QUFEWCxPQUFQO0FBR0g7Ozs7OztvREFFcUJPLE07Ozs7O3NCQUNaLElBQUlDLEtBQUosQ0FBVSwyREFBVixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cURBR3FCQyxRLEVBQWtCRixNOzs7Ozs7O3VCQUN2Q0EsTUFBTSxDQUFDRyxXQUFQLENBQW1CLEtBQUtULGFBQXhCLEM7Ozs7dUJBQ2lCTSxNQUFNLENBQUNJLGlCQUFQLEU7OztBQUFqQkMsZ0JBQUFBLFE7QUFDRkMsZ0JBQUFBLEksR0FBTyxFO0FBQ1BDLGdCQUFBQSxLLEdBQVEsQzs7QUFDWixtQkFBRztBQUNDRCxrQkFBQUEsSUFBSSxhQUFNLEtBQUtWLGFBQVgsU0FBMkJXLEtBQUssR0FBRyxDQUFSLGNBQWdCQSxLQUFoQixJQUEwQixFQUFyRCxDQUFKO0FBQ0FBLGtCQUFBQSxLQUFLLElBQUksQ0FBVDtBQUNILGlCQUhELFFBR1NGLFFBQVEsQ0FBQ0csSUFBVCxDQUFjLFVBQUFDLENBQUM7QUFBQSx5QkFBSUMsa0JBQVVDLE9BQVYsQ0FBa0JGLENBQWxCLEVBQXFCSCxJQUFyQixDQUFKO0FBQUEsaUJBQWYsQ0FIVDs7QUFJQU4sZ0JBQUFBLE1BQU0sQ0FBQ1ksU0FBUDtrREFDT1osTUFBTSxDQUFDYSxNQUFQLENBQWNDLGVBQWQsQ0FBOEI7QUFDakNSLGtCQUFBQSxJQUFJLEVBQUpBLElBRGlDO0FBRWpDUyxrQkFBQUEsV0FBVyxFQUFFLElBRm9CO0FBR2pDQyxrQkFBQUEsS0FBSyxFQUFFLEtBQUt0QixhQUhxQjtBQUlqQ3VCLGtCQUFBQSxHQUFHLEVBQUUsSUFKNEI7QUFLakNDLGtCQUFBQSxHQUFHLEVBQUUsQ0FBQyxvQkFBRCxDQUw0QjtBQU1qQ0Msa0JBQUFBLFVBQVUsRUFBRTtBQUNSQyxvQkFBQUEsTUFBTSxFQUFFLENBQ0o7QUFDSUMsc0JBQUFBLElBQUksRUFBRSxNQURWO0FBRUlDLHNCQUFBQSxNQUFNLEVBQUVwQixRQUZaO0FBR0lxQixzQkFBQUEsTUFBTSxFQUFFLEtBQUt4QjtBQUhqQixxQkFESTtBQURBO0FBTnFCLGlCQUE5QixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7aUNBM0NGVCxTLGlCQUNZLG1CO2lDQURaQSxTLHFCQUVnQixtQjtpQ0FGaEJBLFMsbUJBRytCa0MsTUFBTSxDQUFDQyxNQUFQLENBQWM7QUFDbERoQyxFQUFBQSxPQUFPLEVBQUU7QUFEeUMsQ0FBZCxDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuLy8gQGZsb3dcbmltcG9ydCB0eXBlIHsgQ29udGFpbmVyRGVmLCBEb2NrZXJDb250YWluZXIgfSBmcm9tIFwiLi4vdXRpbHMvZG9ja2VyXCI7XG5pbXBvcnQgeyBEZXZEb2NrZXIgfSBmcm9tIFwiLi4vdXRpbHMvZG9ja2VyXCI7XG5pbXBvcnQgeyB1c2VySWRlbnRpZmllciB9IGZyb20gXCIuLi91dGlscy91dGlsc1wiO1xuXG5leHBvcnQgdHlwZSBDb21waWxlcnNDb25maWcgPSB7XG4gICAgdmVyc2lvbjogc3RyaW5nLFxufVxuXG5cbmV4cG9ydCBjbGFzcyBDb21waWxlcnMgaW1wbGVtZW50cyBDb250YWluZXJEZWYge1xuICAgIHN0YXRpYyBpbWFnZVByZWZpeCA9ICd0b25sYWJzL2NvbXBpbGVycyc7XG4gICAgc3RhdGljIGNvbnRhaW5lclByZWZpeCA9ICd0b25sYWJzLWNvbXBpbGVycyc7XG4gICAgc3RhdGljIGRlZmF1bHRDb25maWc6IENvbXBpbGVyc0NvbmZpZyA9IE9iamVjdC5mcmVlemUoe1xuICAgICAgICB2ZXJzaW9uOiAnbGF0ZXN0J1xuICAgIH0pO1xuXG4gICAgdmVyc2lvbjogc3RyaW5nO1xuICAgIHJlcXVpcmVkSW1hZ2U6IHN0cmluZztcbiAgICBjb250YWluZXJOYW1lOiBzdHJpbmc7XG4gICAgbW91bnREZXN0aW5hdGlvbjogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoY29uZmlnOiBDb21waWxlcnNDb25maWcpIHtcbiAgICAgICAgdGhpcy5zZXRDb25maWcoY29uZmlnKTtcbiAgICB9XG5cbiAgICBzZXRDb25maWcoY29uZmlnOiBDb21waWxlcnNDb25maWcpIHtcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gY29uZmlnLnZlcnNpb247XG4gICAgICAgIHRoaXMucmVxdWlyZWRJbWFnZSA9IGAke0NvbXBpbGVycy5pbWFnZVByZWZpeH06JHtjb25maWcudmVyc2lvbn1gO1xuICAgICAgICB0aGlzLmNvbnRhaW5lck5hbWUgPSBgJHtDb21waWxlcnMuY29udGFpbmVyUHJlZml4fS0ke3VzZXJJZGVudGlmaWVyfWA7XG4gICAgICAgIHRoaXMubW91bnREZXN0aW5hdGlvbiA9ICcvcHJvamVjdHMnO1xuICAgIH1cblxuICAgIGdldENvbmZpZygpOiBDb21waWxlcnNDb25maWcge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmVyc2lvbjogdGhpcy52ZXJzaW9uLFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgY3JlYXRlQ29udGFpbmVyKGRvY2tlcjogRGV2RG9ja2VyKTogUHJvbWlzZTxEb2NrZXJDb250YWluZXI+IHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnRlcm5hbCBlcnJvcjogaW52YWxpZCBjYWxsIHRvIENvbXBpbGVycy5jcmVhdGVDb250YWluZXInKTtcbiAgICB9XG5cbiAgICBhc3luYyBjcmVhdGVDb250YWluZXJNb3VudGVkVG8oaG9zdFBhdGg6IHN0cmluZywgZG9ja2VyOiBEZXZEb2NrZXIpOiBQcm9taXNlPERvY2tlckNvbnRhaW5lcj4ge1xuICAgICAgICBhd2FpdCBkb2NrZXIuZW5zdXJlSW1hZ2UodGhpcy5yZXF1aXJlZEltYWdlKTtcbiAgICAgICAgY29uc3QgZXhpc3RpbmcgPSBhd2FpdCBkb2NrZXIuZ2V0Q29udGFpbmVySW5mb3MoKTtcbiAgICAgICAgbGV0IG5hbWUgPSAnJztcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgbmFtZSA9IGAke3RoaXMuY29udGFpbmVyTmFtZX0ke2luZGV4ID4gMCA/IGAtJHtpbmRleH1gIDogJyd9YDtcbiAgICAgICAgICAgIGluZGV4ICs9IDE7XG4gICAgICAgIH0gd2hpbGUgKGV4aXN0aW5nLmZpbmQoeCA9PiBEZXZEb2NrZXIuaGFzTmFtZSh4LCBuYW1lKSkpO1xuICAgICAgICBkb2NrZXIuZHJvcENhY2hlKCk7XG4gICAgICAgIHJldHVybiBkb2NrZXIuY2xpZW50LmNyZWF0ZUNvbnRhaW5lcih7XG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgaW50ZXJhY3RpdmU6IHRydWUsXG4gICAgICAgICAgICBJbWFnZTogdGhpcy5yZXF1aXJlZEltYWdlLFxuICAgICAgICAgICAgVHR5OiB0cnVlLFxuICAgICAgICAgICAgRW52OiBbJ1VTRVJfQUdSRUVNRU5UPXllcyddLFxuICAgICAgICAgICAgSG9zdENvbmZpZzoge1xuICAgICAgICAgICAgICAgIE1vdW50czogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBUeXBlOiAnYmluZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBTb3VyY2U6IGhvc3RQYXRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgVGFyZ2V0OiB0aGlzLm1vdW50RGVzdGluYXRpb24sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==