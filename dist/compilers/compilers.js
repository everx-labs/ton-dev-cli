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
var fs = require('fs');

var Compilers =
/*#__PURE__*/
function () {
  function Compilers(config) {
    (0, _classCallCheck2["default"])(this, Compilers);
    (0, _defineProperty2["default"])(this, "version", void 0);
    (0, _defineProperty2["default"])(this, "requiredImage", void 0);
    (0, _defineProperty2["default"])(this, "containerName", void 0);
    (0, _defineProperty2["default"])(this, "mountSource", void 0);
    (0, _defineProperty2["default"])(this, "mountDestination", void 0);
    this.setConfig(config);
  }

  (0, _createClass2["default"])(Compilers, [{
    key: "setConfig",
    value: function setConfig(config) {
      this.version = config.version;
      this.requiredImage = "".concat(Compilers.imagePrefix, ":").concat(config.version);
      this.containerName = "".concat(Compilers.containerPrefix, "-").concat(_utils.userIdentifier);
      this.mountSource = (0, _utils.tonlabsHomePath)('compilers', 'projects');
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
                if (!fs.existsSync(this.mountSource)) {
                  fs.mkdirSync(this.mountSource, {
                    recursive: true
                  });
                }

                return _context.abrupt("return", docker.client.createContainer({
                  name: this.containerName,
                  interactive: true,
                  Image: this.requiredImage,
                  Tty: true,
                  Env: ['USER_AGREEMENT=yes'],
                  HostConfig: {
                    Mounts: [{
                      Type: 'bind',
                      Source: this.mountSource,
                      Target: this.mountDestination
                    }]
                  }
                }));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createContainer(_x) {
        return _createContainer.apply(this, arguments);
      }

      return createContainer;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21waWxlcnMvY29tcGlsZXJzLmpzIl0sIm5hbWVzIjpbImZzIiwicmVxdWlyZSIsIkNvbXBpbGVycyIsImNvbmZpZyIsInNldENvbmZpZyIsInZlcnNpb24iLCJyZXF1aXJlZEltYWdlIiwiaW1hZ2VQcmVmaXgiLCJjb250YWluZXJOYW1lIiwiY29udGFpbmVyUHJlZml4IiwidXNlcklkZW50aWZpZXIiLCJtb3VudFNvdXJjZSIsIm1vdW50RGVzdGluYXRpb24iLCJkb2NrZXIiLCJleGlzdHNTeW5jIiwibWtkaXJTeW5jIiwicmVjdXJzaXZlIiwiY2xpZW50IiwiY3JlYXRlQ29udGFpbmVyIiwibmFtZSIsImludGVyYWN0aXZlIiwiSW1hZ2UiLCJUdHkiLCJFbnYiLCJIb3N0Q29uZmlnIiwiTW91bnRzIiwiVHlwZSIsIlNvdXJjZSIsIlRhcmdldCIsIk9iamVjdCIsImZyZWV6ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQTs7QUFDQTs7QUFsQkE7Ozs7Ozs7Ozs7Ozs7O0FBZUEsSUFBTUEsRUFBRSxHQUFHQyxPQUFPLENBQUMsSUFBRCxDQUFsQjs7SUFVYUMsUzs7O0FBYVQscUJBQVlDLE1BQVosRUFBcUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDakMsU0FBS0MsU0FBTCxDQUFlRCxNQUFmO0FBQ0g7Ozs7OEJBSVNBLE0sRUFBeUI7QUFDL0IsV0FBS0UsT0FBTCxHQUFlRixNQUFNLENBQUNFLE9BQXRCO0FBQ0EsV0FBS0MsYUFBTCxhQUF3QkosU0FBUyxDQUFDSyxXQUFsQyxjQUFpREosTUFBTSxDQUFDRSxPQUF4RDtBQUNBLFdBQUtHLGFBQUwsYUFBd0JOLFNBQVMsQ0FBQ08sZUFBbEMsY0FBcURDLHFCQUFyRDtBQUNBLFdBQUtDLFdBQUwsR0FBbUIsNEJBQWdCLFdBQWhCLEVBQTZCLFVBQTdCLENBQW5CO0FBQ0EsV0FBS0MsZ0JBQUwsR0FBd0IsV0FBeEI7QUFDSDs7O2dDQUU0QjtBQUN6QixhQUFPO0FBQ0hQLFFBQUFBLE9BQU8sRUFBRSxLQUFLQTtBQURYLE9BQVA7QUFHSDs7Ozs7O29EQUVxQlEsTTs7Ozs7QUFDbEIsb0JBQUksQ0FBQ2IsRUFBRSxDQUFDYyxVQUFILENBQWMsS0FBS0gsV0FBbkIsQ0FBTCxFQUFzQztBQUNsQ1gsa0JBQUFBLEVBQUUsQ0FBQ2UsU0FBSCxDQUFhLEtBQUtKLFdBQWxCLEVBQWdDO0FBQUVLLG9CQUFBQSxTQUFTLEVBQUU7QUFBYixtQkFBaEM7QUFDSDs7aURBQ01ILE1BQU0sQ0FBQ0ksTUFBUCxDQUFjQyxlQUFkLENBQThCO0FBQ2pDQyxrQkFBQUEsSUFBSSxFQUFFLEtBQUtYLGFBRHNCO0FBRWpDWSxrQkFBQUEsV0FBVyxFQUFFLElBRm9CO0FBR2pDQyxrQkFBQUEsS0FBSyxFQUFFLEtBQUtmLGFBSHFCO0FBSWpDZ0Isa0JBQUFBLEdBQUcsRUFBRSxJQUo0QjtBQUtqQ0Msa0JBQUFBLEdBQUcsRUFBRSxDQUFDLG9CQUFELENBTDRCO0FBTWpDQyxrQkFBQUEsVUFBVSxFQUFFO0FBQ1JDLG9CQUFBQSxNQUFNLEVBQUUsQ0FDSjtBQUNJQyxzQkFBQUEsSUFBSSxFQUFFLE1BRFY7QUFFSUMsc0JBQUFBLE1BQU0sRUFBRSxLQUFLaEIsV0FGakI7QUFHSWlCLHNCQUFBQSxNQUFNLEVBQUUsS0FBS2hCO0FBSGpCLHFCQURJO0FBREE7QUFOcUIsaUJBQTlCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQ0FyQ0ZWLFMsaUJBQ1ksbUI7aUNBRFpBLFMscUJBRWdCLG1CO2lDQUZoQkEsUyxtQkFHK0IyQixNQUFNLENBQUNDLE1BQVAsQ0FBYztBQUNsRHpCLEVBQUFBLE9BQU8sRUFBRTtBQUR5QyxDQUFkLEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG4gKiB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbiAqIExpY2Vuc2UgYXQ6IGh0dHBzOi8vd3d3LnRvbi5kZXYvbGljZW5zZXNcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIFRPTiBERVYgc29mdHdhcmUgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG4vLyBAZmxvd1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuaW1wb3J0IHR5cGUgeyBEb2NrZXJDb250YWluZXIgfSBmcm9tIFwiLi4vdXRpbHMvZG9ja2VyXCI7XG5pbXBvcnQgeyBEZXZEb2NrZXIgfSBmcm9tIFwiLi4vdXRpbHMvZG9ja2VyXCI7XG5pbXBvcnQgeyB0b25sYWJzSG9tZVBhdGgsIHVzZXJJZGVudGlmaWVyIH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxzXCI7XG5cbmV4cG9ydCB0eXBlIENvbXBpbGVyc0NvbmZpZyA9IHtcbiAgICB2ZXJzaW9uOiBzdHJpbmdcbn1cblxuXG5leHBvcnQgY2xhc3MgQ29tcGlsZXJzIHtcbiAgICBzdGF0aWMgaW1hZ2VQcmVmaXggPSAndG9ubGFicy9jb21waWxlcnMnO1xuICAgIHN0YXRpYyBjb250YWluZXJQcmVmaXggPSAndG9ubGFicy1jb21waWxlcnMnO1xuICAgIHN0YXRpYyBkZWZhdWx0Q29uZmlnOiBDb21waWxlcnNDb25maWcgPSBPYmplY3QuZnJlZXplKHtcbiAgICAgICAgdmVyc2lvbjogJ2xhdGVzdCdcbiAgICB9KTtcblxuICAgIHZlcnNpb246IHN0cmluZztcbiAgICByZXF1aXJlZEltYWdlOiBzdHJpbmc7XG4gICAgY29udGFpbmVyTmFtZTogc3RyaW5nO1xuICAgIG1vdW50U291cmNlOiBzdHJpbmc7XG4gICAgbW91bnREZXN0aW5hdGlvbjogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoY29uZmlnOiBDb21waWxlcnNDb25maWcpIHtcbiAgICAgICAgdGhpcy5zZXRDb25maWcoY29uZmlnKTtcbiAgICB9XG5cblxuXG4gICAgc2V0Q29uZmlnKGNvbmZpZzogQ29tcGlsZXJzQ29uZmlnKSB7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IGNvbmZpZy52ZXJzaW9uO1xuICAgICAgICB0aGlzLnJlcXVpcmVkSW1hZ2UgPSBgJHtDb21waWxlcnMuaW1hZ2VQcmVmaXh9OiR7Y29uZmlnLnZlcnNpb259YDtcbiAgICAgICAgdGhpcy5jb250YWluZXJOYW1lID0gYCR7Q29tcGlsZXJzLmNvbnRhaW5lclByZWZpeH0tJHt1c2VySWRlbnRpZmllcn1gO1xuICAgICAgICB0aGlzLm1vdW50U291cmNlID0gdG9ubGFic0hvbWVQYXRoKCdjb21waWxlcnMnLCAncHJvamVjdHMnKTtcbiAgICAgICAgdGhpcy5tb3VudERlc3RpbmF0aW9uID0gJy9wcm9qZWN0cyc7XG4gICAgfVxuXG4gICAgZ2V0Q29uZmlnKCk6IENvbXBpbGVyc0NvbmZpZyB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2ZXJzaW9uOiB0aGlzLnZlcnNpb25cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGNyZWF0ZUNvbnRhaW5lcihkb2NrZXI6IERldkRvY2tlcik6IFByb21pc2U8RG9ja2VyQ29udGFpbmVyPiB7XG4gICAgICAgIGlmICghZnMuZXhpc3RzU3luYyh0aGlzLm1vdW50U291cmNlKSkge1xuICAgICAgICAgICAgZnMubWtkaXJTeW5jKHRoaXMubW91bnRTb3VyY2UsICh7IHJlY3Vyc2l2ZTogdHJ1ZSB9OiBhbnkpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZG9ja2VyLmNsaWVudC5jcmVhdGVDb250YWluZXIoe1xuICAgICAgICAgICAgbmFtZTogdGhpcy5jb250YWluZXJOYW1lLFxuICAgICAgICAgICAgaW50ZXJhY3RpdmU6IHRydWUsXG4gICAgICAgICAgICBJbWFnZTogdGhpcy5yZXF1aXJlZEltYWdlLFxuICAgICAgICAgICAgVHR5OiB0cnVlLFxuICAgICAgICAgICAgRW52OiBbJ1VTRVJfQUdSRUVNRU5UPXllcyddLFxuICAgICAgICAgICAgSG9zdENvbmZpZzoge1xuICAgICAgICAgICAgICAgIE1vdW50czogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBUeXBlOiAnYmluZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBTb3VyY2U6IHRoaXMubW91bnRTb3VyY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBUYXJnZXQ6IHRoaXMubW91bnREZXN0aW5hdGlvbixcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19