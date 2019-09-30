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
        config.hostPort = port;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9uZXR3b3Jrcy9uZXR3b3Jrcy5qcyJdLCJuYW1lcyI6WyJOZXR3b3JrIiwiY29uZmlnIiwic2V0Q29uZmlnIiwibmFtZSIsInZlcnNpb24iLCJob3N0UG9ydCIsImFyYW5nb0hvc3RQb3J0IiwicmVxdWlyZWRJbWFnZSIsImltYWdlUHJlZml4Iiwic3VmZml4IiwiZGVmYXVsdE5hbWUiLCJjb250YWluZXJOYW1lIiwiY29udGFpbmVyUHJlZml4IiwidXNlcklkZW50aWZpZXIiLCJkb2NrZXIiLCJwb3J0cyIsIkhvc3RJcCIsIkhvc3RQb3J0IiwiY2xpZW50IiwiY3JlYXRlQ29udGFpbmVyIiwiaW50ZXJhY3RpdmUiLCJJbWFnZSIsIkVudiIsIkhvc3RDb25maWciLCJQb3J0QmluZGluZ3MiLCJvcHRpb25zIiwiZ2V0Q29uZmlnIiwicG9ydCIsImFyYW5nb1BvcnQiLCJkZWZhdWx0QXJhbmdvUG9ydCIsIk9iamVjdCIsImZyZWV6ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCQTs7QUFDQTs7QUFuQkE7Ozs7Ozs7Ozs7Ozs7O0lBaUNNQSxPOzs7QUFtQkYsbUJBQVlDLE1BQVosRUFBbUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUMvQixTQUFLQyxTQUFMLENBQWVELE1BQWY7QUFDSDs7Ozs4QkFFU0EsTSxFQUF1QjtBQUM3QixXQUFLRSxJQUFMLEdBQVlGLE1BQU0sQ0FBQ0UsSUFBbkI7QUFDQSxXQUFLQyxPQUFMLEdBQWVILE1BQU0sQ0FBQ0csT0FBdEI7QUFDQSxXQUFLQyxRQUFMLEdBQWdCSixNQUFNLENBQUNJLFFBQXZCO0FBQ0EsV0FBS0MsY0FBTCxHQUFzQkwsTUFBTSxDQUFDSyxjQUE3QjtBQUNBLFdBQUtDLGFBQUwsYUFBd0JQLE9BQU8sQ0FBQ1EsV0FBaEMsY0FBK0NQLE1BQU0sQ0FBQ0csT0FBdEQ7QUFDQSxVQUFNSyxNQUFNLEdBQUdSLE1BQU0sQ0FBQ0UsSUFBUCxLQUFnQkgsT0FBTyxDQUFDVSxXQUF4QixjQUEwQ1QsTUFBTSxDQUFDRSxJQUFqRCxJQUEwRCxFQUF6RTtBQUNBLFdBQUtRLGFBQUwsYUFBd0JYLE9BQU8sQ0FBQ1ksZUFBaEMsY0FBbURDLHFCQUFuRCxTQUFvRUosTUFBcEU7QUFDSDs7O2dDQUUwQjtBQUN2QixhQUFPO0FBQ0hOLFFBQUFBLElBQUksRUFBRSxLQUFLQSxJQURSO0FBRUhDLFFBQUFBLE9BQU8sRUFBRSxLQUFLQSxPQUZYO0FBR0hDLFFBQUFBLFFBQVEsRUFBRSxLQUFLQSxRQUhaO0FBSUhDLFFBQUFBLGNBQWMsRUFBRSxLQUFLQTtBQUpsQixPQUFQO0FBTUg7Ozs7OztvREFFcUJRLE07Ozs7OztBQUNaQyxnQkFBQUEsSyxHQUF1QjtBQUN6Qiw0QkFBVSxDQUNOO0FBQ0lDLG9CQUFBQSxNQUFNLEVBQUUsRUFEWjtBQUVJQyxvQkFBQUEsUUFBUSxZQUFLLEtBQUtaLFFBQVY7QUFGWixtQkFETTtBQURlLGlCOztBQVE3QixvQkFBSSxLQUFLQyxjQUFMLElBQXVCLEtBQUtBLGNBQUwsS0FBd0IsRUFBbkQsRUFBdUQ7QUFDbkRTLGtCQUFBQSxLQUFLLENBQUMsVUFBRCxDQUFMLEdBQW9CLENBQ2hCO0FBQ0lDLG9CQUFBQSxNQUFNLEVBQUUsRUFEWjtBQUVJQyxvQkFBQUEsUUFBUSxFQUFFLEtBQUtYO0FBRm5CLG1CQURnQixDQUFwQjtBQU1IOztpREFDTVEsTUFBTSxDQUFDSSxNQUFQLENBQWNDLGVBQWQsQ0FBOEI7QUFDakNoQixrQkFBQUEsSUFBSSxFQUFFLEtBQUtRLGFBRHNCO0FBRWpDUyxrQkFBQUEsV0FBVyxFQUFFLElBRm9CO0FBR2pDQyxrQkFBQUEsS0FBSyxFQUFFLEtBQUtkLGFBSHFCO0FBSWpDZSxrQkFBQUEsR0FBRyxFQUFFLENBQUMsb0JBQUQsQ0FKNEI7QUFLakNDLGtCQUFBQSxVQUFVLEVBQUU7QUFDUkMsb0JBQUFBLFlBQVksRUFBRVQ7QUFETjtBQUxxQixpQkFBOUIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OytCQVdBVSxPLEVBQTRCO0FBQ25DLFVBQU14QixNQUFNLEdBQUcsS0FBS3lCLFNBQUwsRUFBZjs7QUFDQSxVQUFJRCxPQUFPLENBQUNFLElBQVosRUFBa0I7QUFDZDFCLFFBQUFBLE1BQU0sQ0FBQ0ksUUFBUCxHQUFrQnNCLElBQWxCO0FBQ0g7O0FBQ0QsVUFBSUYsT0FBTyxDQUFDRyxVQUFaLEVBQXdCO0FBQ3BCLFlBQUlILE9BQU8sQ0FBQ0csVUFBUixLQUF1QixNQUEzQixFQUFtQztBQUMvQjNCLFVBQUFBLE1BQU0sQ0FBQ0ssY0FBUCxHQUF3Qk4sT0FBTyxDQUFDNkIsaUJBQWhDO0FBQ0gsU0FGRCxNQUVPLElBQUlKLE9BQU8sQ0FBQ0csVUFBUixLQUF1QixRQUEzQixFQUFxQztBQUN4QzNCLFVBQUFBLE1BQU0sQ0FBQ0ssY0FBUCxHQUF3QixJQUF4QjtBQUNILFNBRk0sTUFFQTtBQUNITCxVQUFBQSxNQUFNLENBQUNLLGNBQVAsR0FBd0JtQixPQUFPLENBQUNHLFVBQWhDO0FBQ0g7QUFDSjs7QUFDRCxXQUFLMUIsU0FBTCxDQUFlRCxNQUFmO0FBQ0g7Ozs7OztpQ0FyRkNELE8saUJBQ21CLG9CO2lDQURuQkEsTyxxQkFFdUIsb0I7aUNBRnZCQSxPLGlCQUdtQixTO2lDQUhuQkEsTyxtQkFJb0M4QixNQUFNLENBQUNDLE1BQVAsQ0FBYztBQUNoRDVCLEVBQUFBLElBQUksRUFBRSxTQUQwQztBQUVoREMsRUFBQUEsT0FBTyxFQUFFLFFBRnVDO0FBR2hEQyxFQUFBQSxRQUFRLEVBQUUsSUFIc0M7QUFJaERDLEVBQUFBLGNBQWMsRUFBRTtBQUpnQyxDQUFkLEM7aUNBSnBDTixPIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuXG4vLyBAZmxvd1xuXG5pbXBvcnQgdHlwZSB7IERvY2tlckNvbnRhaW5lciwgRFBvcnRCaW5kaW5ncyB9IGZyb20gXCIuLi91dGlscy9kb2NrZXJcIjtcbmltcG9ydCB7IERldkRvY2tlciB9IGZyb20gXCIuLi91dGlscy9kb2NrZXJcIjtcbmltcG9ydCB7IHVzZXJJZGVudGlmaWVyIH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxzXCI7XG5cbmV4cG9ydCB0eXBlIE5ldHdvcmtDb25maWcgPSB7XG4gICAgbmFtZTogc3RyaW5nLFxuICAgIHZlcnNpb246IHN0cmluZyxcbiAgICBob3N0UG9ydDogc3RyaW5nLFxuICAgIGFyYW5nb0hvc3RQb3J0OiA/c3RyaW5nLFxufTtcblxuZXhwb3J0IHR5cGUgU2V0TmV0d29ya09wdGlvbnMgPSB7XG4gICAgcG9ydD86IHN0cmluZyxcbiAgICBhcmFuZ29Qb3J0Pzogc3RyaW5nLFxufVxuXG5jbGFzcyBOZXR3b3JrIHtcbiAgICBzdGF0aWMgaW1hZ2VQcmVmaXggPSAndG9ubGFicy9sb2NhbC1ub2RlJztcbiAgICBzdGF0aWMgY29udGFpbmVyUHJlZml4ID0gJ3RvbmxhYnMtbG9jYWwtbm9kZSc7XG4gICAgc3RhdGljIGRlZmF1bHROYW1lID0gJ2RlZmF1bHQnO1xuICAgIHN0YXRpYyBkZWZhdWx0Q29uZmlnOiBOZXR3b3JrQ29uZmlnID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgICAgIG5hbWU6ICdkZWZhdWx0JyxcbiAgICAgICAgdmVyc2lvbjogJ2xhdGVzdCcsXG4gICAgICAgIGhvc3RQb3J0OiAnODAnLFxuICAgICAgICBhcmFuZ29Ib3N0UG9ydDogbnVsbCxcbiAgICB9KTtcbiAgICBzdGF0aWMgZGVmYXVsdEFyYW5nb1BvcnQ6ICc4NTI5JztcblxuICAgIG5hbWU6IHN0cmluZztcbiAgICB2ZXJzaW9uOiBzdHJpbmc7XG4gICAgaG9zdFBvcnQ6IHN0cmluZztcbiAgICBhcmFuZ29Ib3N0UG9ydDogP3N0cmluZztcbiAgICByZXF1aXJlZEltYWdlOiBzdHJpbmc7XG4gICAgY29udGFpbmVyTmFtZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoY29uZmlnOiBOZXR3b3JrQ29uZmlnKSB7XG4gICAgICAgIHRoaXMuc2V0Q29uZmlnKGNvbmZpZyk7XG4gICAgfVxuXG4gICAgc2V0Q29uZmlnKGNvbmZpZzogTmV0d29ya0NvbmZpZykge1xuICAgICAgICB0aGlzLm5hbWUgPSBjb25maWcubmFtZTtcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gY29uZmlnLnZlcnNpb247XG4gICAgICAgIHRoaXMuaG9zdFBvcnQgPSBjb25maWcuaG9zdFBvcnQ7XG4gICAgICAgIHRoaXMuYXJhbmdvSG9zdFBvcnQgPSBjb25maWcuYXJhbmdvSG9zdFBvcnQ7XG4gICAgICAgIHRoaXMucmVxdWlyZWRJbWFnZSA9IGAke05ldHdvcmsuaW1hZ2VQcmVmaXh9OiR7Y29uZmlnLnZlcnNpb259YDtcbiAgICAgICAgY29uc3Qgc3VmZml4ID0gY29uZmlnLm5hbWUgIT09IE5ldHdvcmsuZGVmYXVsdE5hbWUgPyBgLSR7Y29uZmlnLm5hbWV9YCA6ICcnO1xuICAgICAgICB0aGlzLmNvbnRhaW5lck5hbWUgPSBgJHtOZXR3b3JrLmNvbnRhaW5lclByZWZpeH0tJHt1c2VySWRlbnRpZmllcn0ke3N1ZmZpeH1gO1xuICAgIH1cblxuICAgIGdldENvbmZpZygpOiBOZXR3b3JrQ29uZmlnIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgICAgICAgIHZlcnNpb246IHRoaXMudmVyc2lvbixcbiAgICAgICAgICAgIGhvc3RQb3J0OiB0aGlzLmhvc3RQb3J0LFxuICAgICAgICAgICAgYXJhbmdvSG9zdFBvcnQ6IHRoaXMuYXJhbmdvSG9zdFBvcnRcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGNyZWF0ZUNvbnRhaW5lcihkb2NrZXI6IERldkRvY2tlcik6IFByb21pc2U8RG9ja2VyQ29udGFpbmVyPiB7XG4gICAgICAgIGNvbnN0IHBvcnRzOiBEUG9ydEJpbmRpbmdzID0ge1xuICAgICAgICAgICAgJzgwL3RjcCc6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIEhvc3RJcDogJycsXG4gICAgICAgICAgICAgICAgICAgIEhvc3RQb3J0OiBgJHt0aGlzLmhvc3RQb3J0fWAsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLmFyYW5nb0hvc3RQb3J0ICYmIHRoaXMuYXJhbmdvSG9zdFBvcnQgIT09ICcnKSB7XG4gICAgICAgICAgICBwb3J0c1snODUyOS90Y3AnXSA9IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIEhvc3RJcDogJycsXG4gICAgICAgICAgICAgICAgICAgIEhvc3RQb3J0OiB0aGlzLmFyYW5nb0hvc3RQb3J0LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRvY2tlci5jbGllbnQuY3JlYXRlQ29udGFpbmVyKHtcbiAgICAgICAgICAgIG5hbWU6IHRoaXMuY29udGFpbmVyTmFtZSxcbiAgICAgICAgICAgIGludGVyYWN0aXZlOiB0cnVlLFxuICAgICAgICAgICAgSW1hZ2U6IHRoaXMucmVxdWlyZWRJbWFnZSxcbiAgICAgICAgICAgIEVudjogWydVU0VSX0FHUkVFTUVOVD15ZXMnXSxcbiAgICAgICAgICAgIEhvc3RDb25maWc6IHtcbiAgICAgICAgICAgICAgICBQb3J0QmluZGluZ3M6IHBvcnRzLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0T3B0aW9ucyhvcHRpb25zOiBTZXROZXR3b3JrT3B0aW9ucykge1xuICAgICAgICBjb25zdCBjb25maWcgPSB0aGlzLmdldENvbmZpZygpO1xuICAgICAgICBpZiAob3B0aW9ucy5wb3J0KSB7XG4gICAgICAgICAgICBjb25maWcuaG9zdFBvcnQgPSBwb3J0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmFyYW5nb1BvcnQpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmFyYW5nb1BvcnQgPT09ICdiaW5kJykge1xuICAgICAgICAgICAgICAgIGNvbmZpZy5hcmFuZ29Ib3N0UG9ydCA9IE5ldHdvcmsuZGVmYXVsdEFyYW5nb1BvcnQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnMuYXJhbmdvUG9ydCA9PT0gJ3VuYmluZCcpIHtcbiAgICAgICAgICAgICAgICBjb25maWcuYXJhbmdvSG9zdFBvcnQgPSBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25maWcuYXJhbmdvSG9zdFBvcnQgPSBvcHRpb25zLmFyYW5nb1BvcnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRDb25maWcoY29uZmlnKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IHtcbiAgICBOZXR3b3JrXG59XG4iXX0=