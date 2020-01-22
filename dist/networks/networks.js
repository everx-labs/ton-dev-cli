"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Network = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _docker = require("../utils/docker");

var _utils = require("../utils/utils");

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
var Network =
/*#__PURE__*/
function () {
  function Network(config) {
    (0, _classCallCheck2["default"])(this, Network);
    (0, _defineProperty2["default"])(this, "name", void 0);
    (0, _defineProperty2["default"])(this, "version", void 0);
    (0, _defineProperty2["default"])(this, "hostPort", void 0);
    (0, _defineProperty2["default"])(this, "arangoHostPort", void 0);
    (0, _defineProperty2["default"])(this, "requiredImage", void 0);
    (0, _defineProperty2["default"])(this, "containerName", void 0);
    this.setConfig(config);
  }

  (0, _createClass2["default"])(Network, [{
    key: "setConfig",
    value: function setConfig(config) {
      this.name = config.name;
      this.version = config.version;
      this.hostPort = config.hostPort || '';
      this.arangoHostPort = config.arangoHostPort || '';
      this.requiredImage = "".concat(Network.imagePrefix, ":").concat(config.version);
      var suffix = config.name !== Network.defaultName ? "-".concat(config.name) : '';
      this.containerName = "".concat(Network.containerPrefix, "-").concat(_utils.userIdentifier).concat(suffix);
    }
  }, {
    key: "getConfig",
    value: function getConfig() {
      return {
        name: this.name,
        version: this.version,
        hostPort: this.hostPort,
        arangoHostPort: this.arangoHostPort
      };
    }
  }, {
    key: "createContainer",
    value: function () {
      var _createContainer = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(docker) {
        var ports;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                ports = {
                  '80/tcp': [{
                    HostIp: '',
                    HostPort: "".concat(this.hostPort)
                  }]
                };

                if (this.arangoHostPort !== '') {
                  ports['8529/tcp'] = [{
                    HostIp: '',
                    HostPort: this.arangoHostPort
                  }];
                }

                return _context.abrupt("return", docker.client.createContainer({
                  name: this.containerName,
                  interactive: true,
                  Image: this.requiredImage,
                  Env: ['USER_AGREEMENT=yes'],
                  HostConfig: {
                    PortBindings: ports
                  }
                }));

              case 3:
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
  return Network;
}();

exports.Network = Network;
(0, _defineProperty2["default"])(Network, "imagePrefix", 'tonlabs/local-node');
(0, _defineProperty2["default"])(Network, "containerPrefix", 'tonlabs-local-node');
(0, _defineProperty2["default"])(Network, "defaultName", 'default');
(0, _defineProperty2["default"])(Network, "defaultConfig", Object.freeze({
  name: 'default',
  version: 'latest',
  hostPort: '80',
  arangoHostPort: ''
}));
(0, _defineProperty2["default"])(Network, "defaultArangoPort", '8529');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9uZXR3b3Jrcy9uZXR3b3Jrcy5qcyJdLCJuYW1lcyI6WyJOZXR3b3JrIiwiY29uZmlnIiwic2V0Q29uZmlnIiwibmFtZSIsInZlcnNpb24iLCJob3N0UG9ydCIsImFyYW5nb0hvc3RQb3J0IiwicmVxdWlyZWRJbWFnZSIsImltYWdlUHJlZml4Iiwic3VmZml4IiwiZGVmYXVsdE5hbWUiLCJjb250YWluZXJOYW1lIiwiY29udGFpbmVyUHJlZml4IiwidXNlcklkZW50aWZpZXIiLCJkb2NrZXIiLCJwb3J0cyIsIkhvc3RJcCIsIkhvc3RQb3J0IiwiY2xpZW50IiwiY3JlYXRlQ29udGFpbmVyIiwiaW50ZXJhY3RpdmUiLCJJbWFnZSIsIkVudiIsIkhvc3RDb25maWciLCJQb3J0QmluZGluZ3MiLCJPYmplY3QiLCJmcmVlemUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkE7O0FBQ0E7O0FBbkJBOzs7Ozs7Ozs7Ozs7OztJQTRCTUEsTzs7O0FBbUJGLG1CQUFZQyxNQUFaLEVBQW1DO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDL0IsU0FBS0MsU0FBTCxDQUFlRCxNQUFmO0FBQ0g7Ozs7OEJBRVNBLE0sRUFBdUI7QUFDN0IsV0FBS0UsSUFBTCxHQUFZRixNQUFNLENBQUNFLElBQW5CO0FBQ0EsV0FBS0MsT0FBTCxHQUFlSCxNQUFNLENBQUNHLE9BQXRCO0FBQ0EsV0FBS0MsUUFBTCxHQUFnQkosTUFBTSxDQUFDSSxRQUFQLElBQW1CLEVBQW5DO0FBQ0EsV0FBS0MsY0FBTCxHQUFzQkwsTUFBTSxDQUFDSyxjQUFQLElBQXlCLEVBQS9DO0FBQ0EsV0FBS0MsYUFBTCxhQUF3QlAsT0FBTyxDQUFDUSxXQUFoQyxjQUErQ1AsTUFBTSxDQUFDRyxPQUF0RDtBQUNBLFVBQU1LLE1BQU0sR0FBR1IsTUFBTSxDQUFDRSxJQUFQLEtBQWdCSCxPQUFPLENBQUNVLFdBQXhCLGNBQTBDVCxNQUFNLENBQUNFLElBQWpELElBQTBELEVBQXpFO0FBQ0EsV0FBS1EsYUFBTCxhQUF3QlgsT0FBTyxDQUFDWSxlQUFoQyxjQUFtREMscUJBQW5ELFNBQW9FSixNQUFwRTtBQUNIOzs7Z0NBRTBCO0FBQ3ZCLGFBQU87QUFDSE4sUUFBQUEsSUFBSSxFQUFFLEtBQUtBLElBRFI7QUFFSEMsUUFBQUEsT0FBTyxFQUFFLEtBQUtBLE9BRlg7QUFHSEMsUUFBQUEsUUFBUSxFQUFFLEtBQUtBLFFBSFo7QUFJSEMsUUFBQUEsY0FBYyxFQUFFLEtBQUtBO0FBSmxCLE9BQVA7QUFNSDs7Ozs7O29EQUVxQlEsTTs7Ozs7O0FBQ1pDLGdCQUFBQSxLLEdBQXVCO0FBQ3pCLDRCQUFVLENBQ047QUFDSUMsb0JBQUFBLE1BQU0sRUFBRSxFQURaO0FBRUlDLG9CQUFBQSxRQUFRLFlBQUssS0FBS1osUUFBVjtBQUZaLG1CQURNO0FBRGUsaUI7O0FBUTdCLG9CQUFJLEtBQUtDLGNBQUwsS0FBd0IsRUFBNUIsRUFBZ0M7QUFDNUJTLGtCQUFBQSxLQUFLLENBQUMsVUFBRCxDQUFMLEdBQW9CLENBQ2hCO0FBQ0lDLG9CQUFBQSxNQUFNLEVBQUUsRUFEWjtBQUVJQyxvQkFBQUEsUUFBUSxFQUFFLEtBQUtYO0FBRm5CLG1CQURnQixDQUFwQjtBQU1IOztpREFDTVEsTUFBTSxDQUFDSSxNQUFQLENBQWNDLGVBQWQsQ0FBOEI7QUFDakNoQixrQkFBQUEsSUFBSSxFQUFFLEtBQUtRLGFBRHNCO0FBRWpDUyxrQkFBQUEsV0FBVyxFQUFFLElBRm9CO0FBR2pDQyxrQkFBQUEsS0FBSyxFQUFFLEtBQUtkLGFBSHFCO0FBSWpDZSxrQkFBQUEsR0FBRyxFQUFFLENBQUMsb0JBQUQsQ0FKNEI7QUFLakNDLGtCQUFBQSxVQUFVLEVBQUU7QUFDUkMsb0JBQUFBLFlBQVksRUFBRVQ7QUFETjtBQUxxQixpQkFBOUIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lDQTNEVGYsTyxpQkFDbUIsb0I7aUNBRG5CQSxPLHFCQUV1QixvQjtpQ0FGdkJBLE8saUJBR21CLFM7aUNBSG5CQSxPLG1CQUlvQ3lCLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjO0FBQ2hEdkIsRUFBQUEsSUFBSSxFQUFFLFNBRDBDO0FBRWhEQyxFQUFBQSxPQUFPLEVBQUUsUUFGdUM7QUFHaERDLEVBQUFBLFFBQVEsRUFBRSxJQUhzQztBQUloREMsRUFBQUEsY0FBYyxFQUFFO0FBSmdDLENBQWQsQztpQ0FKcENOLE8sdUJBVXlCLE0iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG4gKiB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbiAqIExpY2Vuc2UgYXQ6IGh0dHBzOi8vd3d3LnRvbi5kZXYvbGljZW5zZXNcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIFRPTiBERVYgc29mdHdhcmUgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG5cbi8vIEBmbG93XG5cbmltcG9ydCB0eXBlIHsgQ29udGFpbmVyRGVmLCBEb2NrZXJDb250YWluZXIsIERQb3J0QmluZGluZ3MgfSBmcm9tIFwiLi4vdXRpbHMvZG9ja2VyXCI7XG5pbXBvcnQgeyBEZXZEb2NrZXIgfSBmcm9tIFwiLi4vdXRpbHMvZG9ja2VyXCI7XG5pbXBvcnQgeyB1c2VySWRlbnRpZmllciB9IGZyb20gXCIuLi91dGlscy91dGlsc1wiO1xuXG5leHBvcnQgdHlwZSBOZXR3b3JrQ29uZmlnID0ge1xuICAgIG5hbWU6IHN0cmluZyxcbiAgICB2ZXJzaW9uOiBzdHJpbmcsXG4gICAgaG9zdFBvcnQ6IHN0cmluZyxcbiAgICBhcmFuZ29Ib3N0UG9ydDogc3RyaW5nLFxufTtcblxuY2xhc3MgTmV0d29yayBpbXBsZW1lbnRzIENvbnRhaW5lckRlZiB7XG4gICAgc3RhdGljIGltYWdlUHJlZml4ID0gJ3RvbmxhYnMvbG9jYWwtbm9kZSc7XG4gICAgc3RhdGljIGNvbnRhaW5lclByZWZpeCA9ICd0b25sYWJzLWxvY2FsLW5vZGUnO1xuICAgIHN0YXRpYyBkZWZhdWx0TmFtZSA9ICdkZWZhdWx0JztcbiAgICBzdGF0aWMgZGVmYXVsdENvbmZpZzogTmV0d29ya0NvbmZpZyA9IE9iamVjdC5mcmVlemUoe1xuICAgICAgICBuYW1lOiAnZGVmYXVsdCcsXG4gICAgICAgIHZlcnNpb246ICdsYXRlc3QnLFxuICAgICAgICBob3N0UG9ydDogJzgwJyxcbiAgICAgICAgYXJhbmdvSG9zdFBvcnQ6ICcnLFxuICAgIH0pO1xuICAgIHN0YXRpYyBkZWZhdWx0QXJhbmdvUG9ydCA9ICc4NTI5JztcblxuICAgIG5hbWU6IHN0cmluZztcbiAgICB2ZXJzaW9uOiBzdHJpbmc7XG4gICAgaG9zdFBvcnQ6IHN0cmluZztcbiAgICBhcmFuZ29Ib3N0UG9ydDogc3RyaW5nO1xuICAgIHJlcXVpcmVkSW1hZ2U6IHN0cmluZztcbiAgICBjb250YWluZXJOYW1lOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6IE5ldHdvcmtDb25maWcpIHtcbiAgICAgICAgdGhpcy5zZXRDb25maWcoY29uZmlnKTtcbiAgICB9XG5cbiAgICBzZXRDb25maWcoY29uZmlnOiBOZXR3b3JrQ29uZmlnKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IGNvbmZpZy5uYW1lO1xuICAgICAgICB0aGlzLnZlcnNpb24gPSBjb25maWcudmVyc2lvbjtcbiAgICAgICAgdGhpcy5ob3N0UG9ydCA9IGNvbmZpZy5ob3N0UG9ydCB8fCAnJztcbiAgICAgICAgdGhpcy5hcmFuZ29Ib3N0UG9ydCA9IGNvbmZpZy5hcmFuZ29Ib3N0UG9ydCB8fCAnJztcbiAgICAgICAgdGhpcy5yZXF1aXJlZEltYWdlID0gYCR7TmV0d29yay5pbWFnZVByZWZpeH06JHtjb25maWcudmVyc2lvbn1gO1xuICAgICAgICBjb25zdCBzdWZmaXggPSBjb25maWcubmFtZSAhPT0gTmV0d29yay5kZWZhdWx0TmFtZSA/IGAtJHtjb25maWcubmFtZX1gIDogJyc7XG4gICAgICAgIHRoaXMuY29udGFpbmVyTmFtZSA9IGAke05ldHdvcmsuY29udGFpbmVyUHJlZml4fS0ke3VzZXJJZGVudGlmaWVyfSR7c3VmZml4fWA7XG4gICAgfVxuXG4gICAgZ2V0Q29uZmlnKCk6IE5ldHdvcmtDb25maWcge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgICAgICAgdmVyc2lvbjogdGhpcy52ZXJzaW9uLFxuICAgICAgICAgICAgaG9zdFBvcnQ6IHRoaXMuaG9zdFBvcnQsXG4gICAgICAgICAgICBhcmFuZ29Ib3N0UG9ydDogdGhpcy5hcmFuZ29Ib3N0UG9ydFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgY3JlYXRlQ29udGFpbmVyKGRvY2tlcjogRGV2RG9ja2VyKTogUHJvbWlzZTxEb2NrZXJDb250YWluZXI+IHtcbiAgICAgICAgY29uc3QgcG9ydHM6IERQb3J0QmluZGluZ3MgPSB7XG4gICAgICAgICAgICAnODAvdGNwJzogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgSG9zdElwOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgSG9zdFBvcnQ6IGAke3RoaXMuaG9zdFBvcnR9YCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMuYXJhbmdvSG9zdFBvcnQgIT09ICcnKSB7XG4gICAgICAgICAgICBwb3J0c1snODUyOS90Y3AnXSA9IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIEhvc3RJcDogJycsXG4gICAgICAgICAgICAgICAgICAgIEhvc3RQb3J0OiB0aGlzLmFyYW5nb0hvc3RQb3J0LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRvY2tlci5jbGllbnQuY3JlYXRlQ29udGFpbmVyKHtcbiAgICAgICAgICAgIG5hbWU6IHRoaXMuY29udGFpbmVyTmFtZSxcbiAgICAgICAgICAgIGludGVyYWN0aXZlOiB0cnVlLFxuICAgICAgICAgICAgSW1hZ2U6IHRoaXMucmVxdWlyZWRJbWFnZSxcbiAgICAgICAgICAgIEVudjogWydVU0VSX0FHUkVFTUVOVD15ZXMnXSxcbiAgICAgICAgICAgIEhvc3RDb25maWc6IHtcbiAgICAgICAgICAgICAgICBQb3J0QmluZGluZ3M6IHBvcnRzLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCB7XG4gICAgTmV0d29ya1xufVxuIl19