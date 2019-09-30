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
      this.hostPort = config.hostPort;
      this.arangoHostPort = config.arangoHostPort;
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

                if (this.arangoHostPort && this.arangoHostPort !== '') {
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
  }, {
    key: "setOptions",
    value: function setOptions(options) {
      var config = this.getConfig();

      if (options.port) {
        config.hostPort = options.port;
      }

      if (options.arangoPort) {
        if (options.arangoPort === 'bind') {
          config.arangoHostPort = Network.defaultArangoPort;
        } else if (options.arangoPort === 'unbind') {
          config.arangoHostPort = null;
        } else {
          config.arangoHostPort = options.arangoPort;
        }
      }

      this.setConfig(config);
    }
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
  arangoHostPort: null
}));
(0, _defineProperty2["default"])(Network, "defaultArangoPort", void 0);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9uZXR3b3Jrcy9uZXR3b3Jrcy5qcyJdLCJuYW1lcyI6WyJOZXR3b3JrIiwiY29uZmlnIiwic2V0Q29uZmlnIiwibmFtZSIsInZlcnNpb24iLCJob3N0UG9ydCIsImFyYW5nb0hvc3RQb3J0IiwicmVxdWlyZWRJbWFnZSIsImltYWdlUHJlZml4Iiwic3VmZml4IiwiZGVmYXVsdE5hbWUiLCJjb250YWluZXJOYW1lIiwiY29udGFpbmVyUHJlZml4IiwidXNlcklkZW50aWZpZXIiLCJkb2NrZXIiLCJwb3J0cyIsIkhvc3RJcCIsIkhvc3RQb3J0IiwiY2xpZW50IiwiY3JlYXRlQ29udGFpbmVyIiwiaW50ZXJhY3RpdmUiLCJJbWFnZSIsIkVudiIsIkhvc3RDb25maWciLCJQb3J0QmluZGluZ3MiLCJvcHRpb25zIiwiZ2V0Q29uZmlnIiwicG9ydCIsImFyYW5nb1BvcnQiLCJkZWZhdWx0QXJhbmdvUG9ydCIsIk9iamVjdCIsImZyZWV6ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCQTs7QUFDQTs7QUFuQkE7Ozs7Ozs7Ozs7Ozs7O0lBaUNNQSxPOzs7QUFtQkYsbUJBQVlDLE1BQVosRUFBbUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUMvQixTQUFLQyxTQUFMLENBQWVELE1BQWY7QUFDSDs7Ozs4QkFFU0EsTSxFQUF1QjtBQUM3QixXQUFLRSxJQUFMLEdBQVlGLE1BQU0sQ0FBQ0UsSUFBbkI7QUFDQSxXQUFLQyxPQUFMLEdBQWVILE1BQU0sQ0FBQ0csT0FBdEI7QUFDQSxXQUFLQyxRQUFMLEdBQWdCSixNQUFNLENBQUNJLFFBQXZCO0FBQ0EsV0FBS0MsY0FBTCxHQUFzQkwsTUFBTSxDQUFDSyxjQUE3QjtBQUNBLFdBQUtDLGFBQUwsYUFBd0JQLE9BQU8sQ0FBQ1EsV0FBaEMsY0FBK0NQLE1BQU0sQ0FBQ0csT0FBdEQ7QUFDQSxVQUFNSyxNQUFNLEdBQUdSLE1BQU0sQ0FBQ0UsSUFBUCxLQUFnQkgsT0FBTyxDQUFDVSxXQUF4QixjQUEwQ1QsTUFBTSxDQUFDRSxJQUFqRCxJQUEwRCxFQUF6RTtBQUNBLFdBQUtRLGFBQUwsYUFBd0JYLE9BQU8sQ0FBQ1ksZUFBaEMsY0FBbURDLHFCQUFuRCxTQUFvRUosTUFBcEU7QUFDSDs7O2dDQUUwQjtBQUN2QixhQUFPO0FBQ0hOLFFBQUFBLElBQUksRUFBRSxLQUFLQSxJQURSO0FBRUhDLFFBQUFBLE9BQU8sRUFBRSxLQUFLQSxPQUZYO0FBR0hDLFFBQUFBLFFBQVEsRUFBRSxLQUFLQSxRQUhaO0FBSUhDLFFBQUFBLGNBQWMsRUFBRSxLQUFLQTtBQUpsQixPQUFQO0FBTUg7Ozs7OztvREFFcUJRLE07Ozs7OztBQUNaQyxnQkFBQUEsSyxHQUF1QjtBQUN6Qiw0QkFBVSxDQUNOO0FBQ0lDLG9CQUFBQSxNQUFNLEVBQUUsRUFEWjtBQUVJQyxvQkFBQUEsUUFBUSxZQUFLLEtBQUtaLFFBQVY7QUFGWixtQkFETTtBQURlLGlCOztBQVE3QixvQkFBSSxLQUFLQyxjQUFMLElBQXVCLEtBQUtBLGNBQUwsS0FBd0IsRUFBbkQsRUFBdUQ7QUFDbkRTLGtCQUFBQSxLQUFLLENBQUMsVUFBRCxDQUFMLEdBQW9CLENBQ2hCO0FBQ0lDLG9CQUFBQSxNQUFNLEVBQUUsRUFEWjtBQUVJQyxvQkFBQUEsUUFBUSxFQUFFLEtBQUtYO0FBRm5CLG1CQURnQixDQUFwQjtBQU1IOztpREFDTVEsTUFBTSxDQUFDSSxNQUFQLENBQWNDLGVBQWQsQ0FBOEI7QUFDakNoQixrQkFBQUEsSUFBSSxFQUFFLEtBQUtRLGFBRHNCO0FBRWpDUyxrQkFBQUEsV0FBVyxFQUFFLElBRm9CO0FBR2pDQyxrQkFBQUEsS0FBSyxFQUFFLEtBQUtkLGFBSHFCO0FBSWpDZSxrQkFBQUEsR0FBRyxFQUFFLENBQUMsb0JBQUQsQ0FKNEI7QUFLakNDLGtCQUFBQSxVQUFVLEVBQUU7QUFDUkMsb0JBQUFBLFlBQVksRUFBRVQ7QUFETjtBQUxxQixpQkFBOUIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OytCQVdBVSxPLEVBQTRCO0FBQ25DLFVBQU14QixNQUFNLEdBQUcsS0FBS3lCLFNBQUwsRUFBZjs7QUFDQSxVQUFJRCxPQUFPLENBQUNFLElBQVosRUFBa0I7QUFDZDFCLFFBQUFBLE1BQU0sQ0FBQ0ksUUFBUCxHQUFrQm9CLE9BQU8sQ0FBQ0UsSUFBMUI7QUFDSDs7QUFDRCxVQUFJRixPQUFPLENBQUNHLFVBQVosRUFBd0I7QUFDcEIsWUFBSUgsT0FBTyxDQUFDRyxVQUFSLEtBQXVCLE1BQTNCLEVBQW1DO0FBQy9CM0IsVUFBQUEsTUFBTSxDQUFDSyxjQUFQLEdBQXdCTixPQUFPLENBQUM2QixpQkFBaEM7QUFDSCxTQUZELE1BRU8sSUFBSUosT0FBTyxDQUFDRyxVQUFSLEtBQXVCLFFBQTNCLEVBQXFDO0FBQ3hDM0IsVUFBQUEsTUFBTSxDQUFDSyxjQUFQLEdBQXdCLElBQXhCO0FBQ0gsU0FGTSxNQUVBO0FBQ0hMLFVBQUFBLE1BQU0sQ0FBQ0ssY0FBUCxHQUF3Qm1CLE9BQU8sQ0FBQ0csVUFBaEM7QUFDSDtBQUNKOztBQUNELFdBQUsxQixTQUFMLENBQWVELE1BQWY7QUFDSDs7Ozs7O2lDQXJGQ0QsTyxpQkFDbUIsb0I7aUNBRG5CQSxPLHFCQUV1QixvQjtpQ0FGdkJBLE8saUJBR21CLFM7aUNBSG5CQSxPLG1CQUlvQzhCLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjO0FBQ2hENUIsRUFBQUEsSUFBSSxFQUFFLFNBRDBDO0FBRWhEQyxFQUFBQSxPQUFPLEVBQUUsUUFGdUM7QUFHaERDLEVBQUFBLFFBQVEsRUFBRSxJQUhzQztBQUloREMsRUFBQUEsY0FBYyxFQUFFO0FBSmdDLENBQWQsQztpQ0FKcENOLE8iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG4gKiB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbiAqIExpY2Vuc2UgYXQ6IGh0dHBzOi8vd3d3LnRvbi5kZXYvbGljZW5zZXNcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIFRPTiBERVYgc29mdHdhcmUgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG5cbi8vIEBmbG93XG5cbmltcG9ydCB0eXBlIHsgQ29udGFpbmVyRGVmLCBEb2NrZXJDb250YWluZXIsIERQb3J0QmluZGluZ3MgfSBmcm9tIFwiLi4vdXRpbHMvZG9ja2VyXCI7XG5pbXBvcnQgeyBEZXZEb2NrZXIgfSBmcm9tIFwiLi4vdXRpbHMvZG9ja2VyXCI7XG5pbXBvcnQgeyB1c2VySWRlbnRpZmllciB9IGZyb20gXCIuLi91dGlscy91dGlsc1wiO1xuXG5leHBvcnQgdHlwZSBOZXR3b3JrQ29uZmlnID0ge1xuICAgIG5hbWU6IHN0cmluZyxcbiAgICB2ZXJzaW9uOiBzdHJpbmcsXG4gICAgaG9zdFBvcnQ6IHN0cmluZyxcbiAgICBhcmFuZ29Ib3N0UG9ydDogP3N0cmluZyxcbn07XG5cbmV4cG9ydCB0eXBlIFNldE5ldHdvcmtPcHRpb25zID0ge1xuICAgIHBvcnQ/OiBzdHJpbmcsXG4gICAgYXJhbmdvUG9ydD86IHN0cmluZyxcbn1cblxuY2xhc3MgTmV0d29yayBpbXBsZW1lbnRzIENvbnRhaW5lckRlZiB7XG4gICAgc3RhdGljIGltYWdlUHJlZml4ID0gJ3RvbmxhYnMvbG9jYWwtbm9kZSc7XG4gICAgc3RhdGljIGNvbnRhaW5lclByZWZpeCA9ICd0b25sYWJzLWxvY2FsLW5vZGUnO1xuICAgIHN0YXRpYyBkZWZhdWx0TmFtZSA9ICdkZWZhdWx0JztcbiAgICBzdGF0aWMgZGVmYXVsdENvbmZpZzogTmV0d29ya0NvbmZpZyA9IE9iamVjdC5mcmVlemUoe1xuICAgICAgICBuYW1lOiAnZGVmYXVsdCcsXG4gICAgICAgIHZlcnNpb246ICdsYXRlc3QnLFxuICAgICAgICBob3N0UG9ydDogJzgwJyxcbiAgICAgICAgYXJhbmdvSG9zdFBvcnQ6IG51bGwsXG4gICAgfSk7XG4gICAgc3RhdGljIGRlZmF1bHRBcmFuZ29Qb3J0OiAnODUyOSc7XG5cbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgdmVyc2lvbjogc3RyaW5nO1xuICAgIGhvc3RQb3J0OiBzdHJpbmc7XG4gICAgYXJhbmdvSG9zdFBvcnQ6ID9zdHJpbmc7XG4gICAgcmVxdWlyZWRJbWFnZTogc3RyaW5nO1xuICAgIGNvbnRhaW5lck5hbWU6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZzogTmV0d29ya0NvbmZpZykge1xuICAgICAgICB0aGlzLnNldENvbmZpZyhjb25maWcpO1xuICAgIH1cblxuICAgIHNldENvbmZpZyhjb25maWc6IE5ldHdvcmtDb25maWcpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gY29uZmlnLm5hbWU7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IGNvbmZpZy52ZXJzaW9uO1xuICAgICAgICB0aGlzLmhvc3RQb3J0ID0gY29uZmlnLmhvc3RQb3J0O1xuICAgICAgICB0aGlzLmFyYW5nb0hvc3RQb3J0ID0gY29uZmlnLmFyYW5nb0hvc3RQb3J0O1xuICAgICAgICB0aGlzLnJlcXVpcmVkSW1hZ2UgPSBgJHtOZXR3b3JrLmltYWdlUHJlZml4fToke2NvbmZpZy52ZXJzaW9ufWA7XG4gICAgICAgIGNvbnN0IHN1ZmZpeCA9IGNvbmZpZy5uYW1lICE9PSBOZXR3b3JrLmRlZmF1bHROYW1lID8gYC0ke2NvbmZpZy5uYW1lfWAgOiAnJztcbiAgICAgICAgdGhpcy5jb250YWluZXJOYW1lID0gYCR7TmV0d29yay5jb250YWluZXJQcmVmaXh9LSR7dXNlcklkZW50aWZpZXJ9JHtzdWZmaXh9YDtcbiAgICB9XG5cbiAgICBnZXRDb25maWcoKTogTmV0d29ya0NvbmZpZyB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICB2ZXJzaW9uOiB0aGlzLnZlcnNpb24sXG4gICAgICAgICAgICBob3N0UG9ydDogdGhpcy5ob3N0UG9ydCxcbiAgICAgICAgICAgIGFyYW5nb0hvc3RQb3J0OiB0aGlzLmFyYW5nb0hvc3RQb3J0XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBjcmVhdGVDb250YWluZXIoZG9ja2VyOiBEZXZEb2NrZXIpOiBQcm9taXNlPERvY2tlckNvbnRhaW5lcj4ge1xuICAgICAgICBjb25zdCBwb3J0czogRFBvcnRCaW5kaW5ncyA9IHtcbiAgICAgICAgICAgICc4MC90Y3AnOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBIb3N0SXA6ICcnLFxuICAgICAgICAgICAgICAgICAgICBIb3N0UG9ydDogYCR7dGhpcy5ob3N0UG9ydH1gLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5hcmFuZ29Ib3N0UG9ydCAmJiB0aGlzLmFyYW5nb0hvc3RQb3J0ICE9PSAnJykge1xuICAgICAgICAgICAgcG9ydHNbJzg1MjkvdGNwJ10gPSBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBIb3N0SXA6ICcnLFxuICAgICAgICAgICAgICAgICAgICBIb3N0UG9ydDogdGhpcy5hcmFuZ29Ib3N0UG9ydCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkb2NrZXIuY2xpZW50LmNyZWF0ZUNvbnRhaW5lcih7XG4gICAgICAgICAgICBuYW1lOiB0aGlzLmNvbnRhaW5lck5hbWUsXG4gICAgICAgICAgICBpbnRlcmFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgIEltYWdlOiB0aGlzLnJlcXVpcmVkSW1hZ2UsXG4gICAgICAgICAgICBFbnY6IFsnVVNFUl9BR1JFRU1FTlQ9eWVzJ10sXG4gICAgICAgICAgICBIb3N0Q29uZmlnOiB7XG4gICAgICAgICAgICAgICAgUG9ydEJpbmRpbmdzOiBwb3J0cyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldE9wdGlvbnMob3B0aW9uczogU2V0TmV0d29ya09wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgY29uZmlnID0gdGhpcy5nZXRDb25maWcoKTtcbiAgICAgICAgaWYgKG9wdGlvbnMucG9ydCkge1xuICAgICAgICAgICAgY29uZmlnLmhvc3RQb3J0ID0gb3B0aW9ucy5wb3J0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmFyYW5nb1BvcnQpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmFyYW5nb1BvcnQgPT09ICdiaW5kJykge1xuICAgICAgICAgICAgICAgIGNvbmZpZy5hcmFuZ29Ib3N0UG9ydCA9IE5ldHdvcmsuZGVmYXVsdEFyYW5nb1BvcnQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMuYXJhbmdvUG9ydCA9PT0gJ3VuYmluZCcpIHtcbiAgICAgICAgICAgICAgICBjb25maWcuYXJhbmdvSG9zdFBvcnQgPSBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25maWcuYXJhbmdvSG9zdFBvcnQgPSBvcHRpb25zLmFyYW5nb1BvcnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRDb25maWcoY29uZmlnKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IHtcbiAgICBOZXR3b3JrXG59XG4iXX0=