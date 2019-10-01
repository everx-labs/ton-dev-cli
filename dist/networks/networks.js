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
  }, {
    key: "setOptions",
    value: function setOptions(options) {
      var config = this.getConfig();

      if (options.port) {
        config.hostPort = options.port;
      }

      if (options.dbPort) {
        if (options.dbPort === 'bind') {
          config.arangoHostPort = Network.defaultArangoPort;
        } else if (options.dbPort === 'unbind') {
          config.arangoHostPort = '';
        } else {
          config.arangoHostPort = options.dbPort || '';
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
  arangoHostPort: ''
}));
(0, _defineProperty2["default"])(Network, "defaultArangoPort", '8529');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9uZXR3b3Jrcy9uZXR3b3Jrcy5qcyJdLCJuYW1lcyI6WyJOZXR3b3JrIiwiY29uZmlnIiwic2V0Q29uZmlnIiwibmFtZSIsInZlcnNpb24iLCJob3N0UG9ydCIsImFyYW5nb0hvc3RQb3J0IiwicmVxdWlyZWRJbWFnZSIsImltYWdlUHJlZml4Iiwic3VmZml4IiwiZGVmYXVsdE5hbWUiLCJjb250YWluZXJOYW1lIiwiY29udGFpbmVyUHJlZml4IiwidXNlcklkZW50aWZpZXIiLCJkb2NrZXIiLCJwb3J0cyIsIkhvc3RJcCIsIkhvc3RQb3J0IiwiY2xpZW50IiwiY3JlYXRlQ29udGFpbmVyIiwiaW50ZXJhY3RpdmUiLCJJbWFnZSIsIkVudiIsIkhvc3RDb25maWciLCJQb3J0QmluZGluZ3MiLCJvcHRpb25zIiwiZ2V0Q29uZmlnIiwicG9ydCIsImRiUG9ydCIsImRlZmF1bHRBcmFuZ29Qb3J0IiwiT2JqZWN0IiwiZnJlZXplIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JBOztBQUNBOztBQW5CQTs7Ozs7Ozs7Ozs7Ozs7SUFpQ01BLE87OztBQW1CRixtQkFBWUMsTUFBWixFQUFtQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQy9CLFNBQUtDLFNBQUwsQ0FBZUQsTUFBZjtBQUNIOzs7OzhCQUVTQSxNLEVBQXVCO0FBQzdCLFdBQUtFLElBQUwsR0FBWUYsTUFBTSxDQUFDRSxJQUFuQjtBQUNBLFdBQUtDLE9BQUwsR0FBZUgsTUFBTSxDQUFDRyxPQUF0QjtBQUNBLFdBQUtDLFFBQUwsR0FBZ0JKLE1BQU0sQ0FBQ0ksUUFBUCxJQUFtQixFQUFuQztBQUNBLFdBQUtDLGNBQUwsR0FBc0JMLE1BQU0sQ0FBQ0ssY0FBUCxJQUF5QixFQUEvQztBQUNBLFdBQUtDLGFBQUwsYUFBd0JQLE9BQU8sQ0FBQ1EsV0FBaEMsY0FBK0NQLE1BQU0sQ0FBQ0csT0FBdEQ7QUFDQSxVQUFNSyxNQUFNLEdBQUdSLE1BQU0sQ0FBQ0UsSUFBUCxLQUFnQkgsT0FBTyxDQUFDVSxXQUF4QixjQUEwQ1QsTUFBTSxDQUFDRSxJQUFqRCxJQUEwRCxFQUF6RTtBQUNBLFdBQUtRLGFBQUwsYUFBd0JYLE9BQU8sQ0FBQ1ksZUFBaEMsY0FBbURDLHFCQUFuRCxTQUFvRUosTUFBcEU7QUFDSDs7O2dDQUUwQjtBQUN2QixhQUFPO0FBQ0hOLFFBQUFBLElBQUksRUFBRSxLQUFLQSxJQURSO0FBRUhDLFFBQUFBLE9BQU8sRUFBRSxLQUFLQSxPQUZYO0FBR0hDLFFBQUFBLFFBQVEsRUFBRSxLQUFLQSxRQUhaO0FBSUhDLFFBQUFBLGNBQWMsRUFBRSxLQUFLQTtBQUpsQixPQUFQO0FBTUg7Ozs7OztvREFFcUJRLE07Ozs7OztBQUNaQyxnQkFBQUEsSyxHQUF1QjtBQUN6Qiw0QkFBVSxDQUNOO0FBQ0lDLG9CQUFBQSxNQUFNLEVBQUUsRUFEWjtBQUVJQyxvQkFBQUEsUUFBUSxZQUFLLEtBQUtaLFFBQVY7QUFGWixtQkFETTtBQURlLGlCOztBQVE3QixvQkFBSSxLQUFLQyxjQUFMLEtBQXdCLEVBQTVCLEVBQWdDO0FBQzVCUyxrQkFBQUEsS0FBSyxDQUFDLFVBQUQsQ0FBTCxHQUFvQixDQUNoQjtBQUNJQyxvQkFBQUEsTUFBTSxFQUFFLEVBRFo7QUFFSUMsb0JBQUFBLFFBQVEsRUFBRSxLQUFLWDtBQUZuQixtQkFEZ0IsQ0FBcEI7QUFNSDs7aURBQ01RLE1BQU0sQ0FBQ0ksTUFBUCxDQUFjQyxlQUFkLENBQThCO0FBQ2pDaEIsa0JBQUFBLElBQUksRUFBRSxLQUFLUSxhQURzQjtBQUVqQ1Msa0JBQUFBLFdBQVcsRUFBRSxJQUZvQjtBQUdqQ0Msa0JBQUFBLEtBQUssRUFBRSxLQUFLZCxhQUhxQjtBQUlqQ2Usa0JBQUFBLEdBQUcsRUFBRSxDQUFDLG9CQUFELENBSjRCO0FBS2pDQyxrQkFBQUEsVUFBVSxFQUFFO0FBQ1JDLG9CQUFBQSxZQUFZLEVBQUVUO0FBRE47QUFMcUIsaUJBQTlCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7OzsrQkFXQVUsTyxFQUE0QjtBQUNuQyxVQUFNeEIsTUFBTSxHQUFHLEtBQUt5QixTQUFMLEVBQWY7O0FBQ0EsVUFBSUQsT0FBTyxDQUFDRSxJQUFaLEVBQWtCO0FBQ2QxQixRQUFBQSxNQUFNLENBQUNJLFFBQVAsR0FBa0JvQixPQUFPLENBQUNFLElBQTFCO0FBQ0g7O0FBQ0QsVUFBSUYsT0FBTyxDQUFDRyxNQUFaLEVBQW9CO0FBQ2hCLFlBQUlILE9BQU8sQ0FBQ0csTUFBUixLQUFtQixNQUF2QixFQUErQjtBQUMzQjNCLFVBQUFBLE1BQU0sQ0FBQ0ssY0FBUCxHQUF3Qk4sT0FBTyxDQUFDNkIsaUJBQWhDO0FBQ0gsU0FGRCxNQUVPLElBQUlKLE9BQU8sQ0FBQ0csTUFBUixLQUFtQixRQUF2QixFQUFpQztBQUNwQzNCLFVBQUFBLE1BQU0sQ0FBQ0ssY0FBUCxHQUF3QixFQUF4QjtBQUNILFNBRk0sTUFFQTtBQUNITCxVQUFBQSxNQUFNLENBQUNLLGNBQVAsR0FBd0JtQixPQUFPLENBQUNHLE1BQVIsSUFBa0IsRUFBMUM7QUFDSDtBQUNKOztBQUNELFdBQUsxQixTQUFMLENBQWVELE1BQWY7QUFDSDs7Ozs7O2lDQXJGQ0QsTyxpQkFDbUIsb0I7aUNBRG5CQSxPLHFCQUV1QixvQjtpQ0FGdkJBLE8saUJBR21CLFM7aUNBSG5CQSxPLG1CQUlvQzhCLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjO0FBQ2hENUIsRUFBQUEsSUFBSSxFQUFFLFNBRDBDO0FBRWhEQyxFQUFBQSxPQUFPLEVBQUUsUUFGdUM7QUFHaERDLEVBQUFBLFFBQVEsRUFBRSxJQUhzQztBQUloREMsRUFBQUEsY0FBYyxFQUFFO0FBSmdDLENBQWQsQztpQ0FKcENOLE8sdUJBVXlCLE0iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG4gKiB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbiAqIExpY2Vuc2UgYXQ6IGh0dHBzOi8vd3d3LnRvbi5kZXYvbGljZW5zZXNcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIFRPTiBERVYgc29mdHdhcmUgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG5cbi8vIEBmbG93XG5cbmltcG9ydCB0eXBlIHsgQ29udGFpbmVyRGVmLCBEb2NrZXJDb250YWluZXIsIERQb3J0QmluZGluZ3MgfSBmcm9tIFwiLi4vdXRpbHMvZG9ja2VyXCI7XG5pbXBvcnQgeyBEZXZEb2NrZXIgfSBmcm9tIFwiLi4vdXRpbHMvZG9ja2VyXCI7XG5pbXBvcnQgeyB1c2VySWRlbnRpZmllciB9IGZyb20gXCIuLi91dGlscy91dGlsc1wiO1xuXG5leHBvcnQgdHlwZSBOZXR3b3JrQ29uZmlnID0ge1xuICAgIG5hbWU6IHN0cmluZyxcbiAgICB2ZXJzaW9uOiBzdHJpbmcsXG4gICAgaG9zdFBvcnQ6IHN0cmluZyxcbiAgICBhcmFuZ29Ib3N0UG9ydDogc3RyaW5nLFxufTtcblxuZXhwb3J0IHR5cGUgU2V0TmV0d29ya09wdGlvbnMgPSB7XG4gICAgcG9ydD86IHN0cmluZyxcbiAgICBkYlBvcnQ/OiBzdHJpbmcsXG59XG5cbmNsYXNzIE5ldHdvcmsgaW1wbGVtZW50cyBDb250YWluZXJEZWYge1xuICAgIHN0YXRpYyBpbWFnZVByZWZpeCA9ICd0b25sYWJzL2xvY2FsLW5vZGUnO1xuICAgIHN0YXRpYyBjb250YWluZXJQcmVmaXggPSAndG9ubGFicy1sb2NhbC1ub2RlJztcbiAgICBzdGF0aWMgZGVmYXVsdE5hbWUgPSAnZGVmYXVsdCc7XG4gICAgc3RhdGljIGRlZmF1bHRDb25maWc6IE5ldHdvcmtDb25maWcgPSBPYmplY3QuZnJlZXplKHtcbiAgICAgICAgbmFtZTogJ2RlZmF1bHQnLFxuICAgICAgICB2ZXJzaW9uOiAnbGF0ZXN0JyxcbiAgICAgICAgaG9zdFBvcnQ6ICc4MCcsXG4gICAgICAgIGFyYW5nb0hvc3RQb3J0OiAnJyxcbiAgICB9KTtcbiAgICBzdGF0aWMgZGVmYXVsdEFyYW5nb1BvcnQgPSAnODUyOSc7XG5cbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgdmVyc2lvbjogc3RyaW5nO1xuICAgIGhvc3RQb3J0OiBzdHJpbmc7XG4gICAgYXJhbmdvSG9zdFBvcnQ6IHN0cmluZztcbiAgICByZXF1aXJlZEltYWdlOiBzdHJpbmc7XG4gICAgY29udGFpbmVyTmFtZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoY29uZmlnOiBOZXR3b3JrQ29uZmlnKSB7XG4gICAgICAgIHRoaXMuc2V0Q29uZmlnKGNvbmZpZyk7XG4gICAgfVxuXG4gICAgc2V0Q29uZmlnKGNvbmZpZzogTmV0d29ya0NvbmZpZykge1xuICAgICAgICB0aGlzLm5hbWUgPSBjb25maWcubmFtZTtcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gY29uZmlnLnZlcnNpb247XG4gICAgICAgIHRoaXMuaG9zdFBvcnQgPSBjb25maWcuaG9zdFBvcnQgfHwgJyc7XG4gICAgICAgIHRoaXMuYXJhbmdvSG9zdFBvcnQgPSBjb25maWcuYXJhbmdvSG9zdFBvcnQgfHwgJyc7XG4gICAgICAgIHRoaXMucmVxdWlyZWRJbWFnZSA9IGAke05ldHdvcmsuaW1hZ2VQcmVmaXh9OiR7Y29uZmlnLnZlcnNpb259YDtcbiAgICAgICAgY29uc3Qgc3VmZml4ID0gY29uZmlnLm5hbWUgIT09IE5ldHdvcmsuZGVmYXVsdE5hbWUgPyBgLSR7Y29uZmlnLm5hbWV9YCA6ICcnO1xuICAgICAgICB0aGlzLmNvbnRhaW5lck5hbWUgPSBgJHtOZXR3b3JrLmNvbnRhaW5lclByZWZpeH0tJHt1c2VySWRlbnRpZmllcn0ke3N1ZmZpeH1gO1xuICAgIH1cblxuICAgIGdldENvbmZpZygpOiBOZXR3b3JrQ29uZmlnIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgICAgICAgIHZlcnNpb246IHRoaXMudmVyc2lvbixcbiAgICAgICAgICAgIGhvc3RQb3J0OiB0aGlzLmhvc3RQb3J0LFxuICAgICAgICAgICAgYXJhbmdvSG9zdFBvcnQ6IHRoaXMuYXJhbmdvSG9zdFBvcnRcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGNyZWF0ZUNvbnRhaW5lcihkb2NrZXI6IERldkRvY2tlcik6IFByb21pc2U8RG9ja2VyQ29udGFpbmVyPiB7XG4gICAgICAgIGNvbnN0IHBvcnRzOiBEUG9ydEJpbmRpbmdzID0ge1xuICAgICAgICAgICAgJzgwL3RjcCc6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIEhvc3RJcDogJycsXG4gICAgICAgICAgICAgICAgICAgIEhvc3RQb3J0OiBgJHt0aGlzLmhvc3RQb3J0fWAsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLmFyYW5nb0hvc3RQb3J0ICE9PSAnJykge1xuICAgICAgICAgICAgcG9ydHNbJzg1MjkvdGNwJ10gPSBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBIb3N0SXA6ICcnLFxuICAgICAgICAgICAgICAgICAgICBIb3N0UG9ydDogdGhpcy5hcmFuZ29Ib3N0UG9ydCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkb2NrZXIuY2xpZW50LmNyZWF0ZUNvbnRhaW5lcih7XG4gICAgICAgICAgICBuYW1lOiB0aGlzLmNvbnRhaW5lck5hbWUsXG4gICAgICAgICAgICBpbnRlcmFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgIEltYWdlOiB0aGlzLnJlcXVpcmVkSW1hZ2UsXG4gICAgICAgICAgICBFbnY6IFsnVVNFUl9BR1JFRU1FTlQ9eWVzJ10sXG4gICAgICAgICAgICBIb3N0Q29uZmlnOiB7XG4gICAgICAgICAgICAgICAgUG9ydEJpbmRpbmdzOiBwb3J0cyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldE9wdGlvbnMob3B0aW9uczogU2V0TmV0d29ya09wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgY29uZmlnID0gdGhpcy5nZXRDb25maWcoKTtcbiAgICAgICAgaWYgKG9wdGlvbnMucG9ydCkge1xuICAgICAgICAgICAgY29uZmlnLmhvc3RQb3J0ID0gb3B0aW9ucy5wb3J0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmRiUG9ydCkge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZGJQb3J0ID09PSAnYmluZCcpIHtcbiAgICAgICAgICAgICAgICBjb25maWcuYXJhbmdvSG9zdFBvcnQgPSBOZXR3b3JrLmRlZmF1bHRBcmFuZ29Qb3J0O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmRiUG9ydCA9PT0gJ3VuYmluZCcpIHtcbiAgICAgICAgICAgICAgICBjb25maWcuYXJhbmdvSG9zdFBvcnQgPSAnJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLmFyYW5nb0hvc3RQb3J0ID0gb3B0aW9ucy5kYlBvcnQgfHwgJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRDb25maWcoY29uZmlnKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IHtcbiAgICBOZXR3b3JrXG59XG4iXX0=