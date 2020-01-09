"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.infoCommand = infoCommand;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _compilers = require("../compilers/compilers");

var _dev = require("../dev");

var _networks = require("../networks/networks");

var _texts = require("../utils/texts");

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
function infoCommand(_x, _x2) {
  return _infoCommand.apply(this, arguments);
}

function _infoCommand() {
  _infoCommand = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(dev, options) {
    var listTags, _listTags, showAvailableVersions, _showAvailableVersions, mapContainerName, showContainerInfo, _showContainerInfo, i, network;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _showContainerInfo = function _ref7() {
              _showContainerInfo = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee3(name) {
                var info;
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return dev.docker.findContainerInfo(name);

                      case 2:
                        info = _context3.sent;

                        if (info) {
                          console.log("  Docker image: ".concat(info.Image));
                          console.log("  Docker container: ".concat(info.Names.map(mapContainerName).join(', '), " ").concat(info.State));
                        } else {
                          console.log("  Docker container missing: ".concat(name));
                        }

                      case 4:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));
              return _showContainerInfo.apply(this, arguments);
            };

            showContainerInfo = function _ref6(_x5) {
              return _showContainerInfo.apply(this, arguments);
            };

            mapContainerName = function _ref5(name) {
              return name.startsWith('/') ? name.substr(1) : name;
            };

            _showAvailableVersions = function _ref4() {
              _showAvailableVersions = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee2(imagePrefix) {
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.t0 = console;
                        _context2.t1 = "  ".concat(imagePrefix, ": ");
                        _context2.next = 4;
                        return listTags(imagePrefix);

                      case 4:
                        _context2.t2 = _context2.sent.join(', ');
                        _context2.t3 = _context2.t1.concat.call(_context2.t1, _context2.t2);

                        _context2.t0.log.call(_context2.t0, _context2.t3);

                      case 7:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));
              return _showAvailableVersions.apply(this, arguments);
            };

            showAvailableVersions = function _ref3(_x4) {
              return _showAvailableVersions.apply(this, arguments);
            };

            _listTags = function _ref2() {
              _listTags = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee(image) {
                var url, tags;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        url = "https://registry.hub.docker.com/v2/repositories/".concat(image, "/tags/");
                        _context.next = 3;
                        return (0, _utils.httpsGetJson)(url);

                      case 3:
                        tags = _context.sent;
                        return _context.abrupt("return", tags.results.map(function (x) {
                          return x.name;
                        }).sort());

                      case 5:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));
              return _listTags.apply(this, arguments);
            };

            listTags = function _ref(_x3) {
              return _listTags.apply(this, arguments);
            };

            console.log(_texts.texts.usageHeader(_utils.version));
            i = 0;

          case 9:
            if (!(i < dev.networks.length)) {
              _context4.next = 22;
              break;
            }

            network = dev.networks[i];
            console.log();
            console.log(_texts.texts.netHeader(network.name));
            console.log();
            console.log(_texts.texts.usedVersion(network.version));
            console.log(_texts.texts.netHostPort(network.hostPort));

            if (network.arangoHostPort !== '') {
              console.log(_texts.texts.netArangoHostPort(network.arangoHostPort));
            }

            _context4.next = 19;
            return showContainerInfo(network.containerName);

          case 19:
            i += 1;
            _context4.next = 9;
            break;

          case 22:
            console.log();
            console.log(_texts.texts.compilerHeader);
            console.log();
            console.log(_texts.texts.usedVersion(dev.compilers.version));
            _context4.next = 28;
            return showContainerInfo(dev.compilers.containerName);

          case 28:
            if (!options.available) {
              _context4.next = 36;
              break;
            }

            console.log();
            console.log(_texts.texts.availableVersions);
            console.log();
            _context4.next = 34;
            return showAvailableVersions(_compilers.Compilers.imagePrefix);

          case 34:
            _context4.next = 36;
            return showAvailableVersions(_networks.Network.imagePrefix);

          case 36:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _infoCommand.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvaW5mby5qcyJdLCJuYW1lcyI6WyJpbmZvQ29tbWFuZCIsImRldiIsIm9wdGlvbnMiLCJsaXN0VGFncyIsInNob3dBdmFpbGFibGVWZXJzaW9ucyIsIm1hcENvbnRhaW5lck5hbWUiLCJzaG93Q29udGFpbmVySW5mbyIsIm5hbWUiLCJkb2NrZXIiLCJmaW5kQ29udGFpbmVySW5mbyIsImluZm8iLCJjb25zb2xlIiwibG9nIiwiSW1hZ2UiLCJOYW1lcyIsIm1hcCIsImpvaW4iLCJTdGF0ZSIsInN0YXJ0c1dpdGgiLCJzdWJzdHIiLCJpbWFnZVByZWZpeCIsImltYWdlIiwidXJsIiwidGFncyIsInJlc3VsdHMiLCJ4Iiwic29ydCIsInRleHRzIiwidXNhZ2VIZWFkZXIiLCJ2ZXJzaW9uIiwiaSIsIm5ldHdvcmtzIiwibGVuZ3RoIiwibmV0d29yayIsIm5ldEhlYWRlciIsInVzZWRWZXJzaW9uIiwibmV0SG9zdFBvcnQiLCJob3N0UG9ydCIsImFyYW5nb0hvc3RQb3J0IiwibmV0QXJhbmdvSG9zdFBvcnQiLCJjb250YWluZXJOYW1lIiwiY29tcGlsZXJIZWFkZXIiLCJjb21waWxlcnMiLCJhdmFpbGFibGUiLCJhdmFpbGFibGVWZXJzaW9ucyIsIkNvbXBpbGVycyIsIk5ldHdvcmsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFpQkE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBdEJBOzs7Ozs7Ozs7Ozs7OztTQXlCc0JBLFc7Ozs7Ozs7K0JBQWYsa0JBQTJCQyxHQUEzQixFQUFxQ0MsT0FBckM7QUFBQSxRQUNZQyxRQURaLGFBT1lDLHFCQVBaLDBCQVdNQyxnQkFYTixFQWVZQyxpQkFmWjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDJDQWVILGtCQUFpQ0MsSUFBakM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwrQkFDd0NOLEdBQUcsQ0FBQ08sTUFBSixDQUFXQyxpQkFBWCxD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QUFoQyxDQUFaO0FBQ0g7O0FBcENGO0FBQUEsbUJBcUNPaEMsaUJBQWlCLENBQUMyQixPQUFPLENBQUNPLGFBQVQsQ0FyQ3hCOztBQUFBO0FBMkJzQ1YsWUFBQUEsQ0FBQyxJQUFJLENBM0IzQztBQUFBO0FBQUE7O0FBQUE7QUF1Q0huQixZQUFBQSxPQUFPLENBQUNDLEdBQVI7QUFDQUQsWUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVllLGFBQU1jLGNBQWxCO0FBQ0E5QixZQUFBQSxPQUFPLENBQUNDLEdBQVI7QUFDQUQsWUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVllLGFBQU1RLFdBQU4sQ0FBa0JsQyxHQUFHLENBQUN5QyxTQUFKLENBQWNiLE9BQWhDLENBQVo7QUExQ0c7QUFBQSxtQkEyQ0d2QixpQkFBaUIsQ0FBQ0wsR0FBRyxDQUFDeUMsU0FBSixDQUFjRixhQUFmLENBM0NwQjs7QUFBQTtBQUFBLGlCQThDQ3RDLE9BQU8sQ0FBQ3lDLFNBOUNUO0FBQUE7QUFBQTtBQUFBOztBQStDQ2hDLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUjtBQUNBRCxZQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWWUsYUFBTWlCLGlCQUFsQjtBQUNBakMsWUFBQUEsT0FBTyxDQUFDQyxHQUFSO0FBakREO0FBQUEsbUJBa0RPUixxQkFBcUIsQ0FBQ3lDLHFCQUFVekIsV0FBWCxDQWxENUI7O0FBQUE7QUFBQTtBQUFBLG1CQW1ET2hCLHFCQUFxQixDQUFDMEMsa0JBQVExQixXQUFULENBbkQ1Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuLy8gQGZsb3dcblxuXG5pbXBvcnQgeyBDb21waWxlcnMgfSBmcm9tIFwiLi4vY29tcGlsZXJzL2NvbXBpbGVyc1wiO1xuaW1wb3J0IHsgRGV2IH0gZnJvbSBcIi4uL2RldlwiO1xuaW1wb3J0IHsgTmV0d29yayB9IGZyb20gXCIuLi9uZXR3b3Jrcy9uZXR3b3Jrc1wiO1xuaW1wb3J0IHR5cGUgeyBEQ29udGFpbmVySW5mbyB9IGZyb20gXCIuLi91dGlscy9kb2NrZXJcIjtcbmltcG9ydCB7IHRleHRzIH0gZnJvbSBcIi4uL3V0aWxzL3RleHRzXCI7XG5pbXBvcnQgeyBodHRwc0dldEpzb24sIHZlcnNpb24gfSBmcm9tIFwiLi4vdXRpbHMvdXRpbHNcIjtcbmltcG9ydCB0eXBlIHsgSW5mb09wdGlvbnMgfSBmcm9tIFwiLi9vcHRpb25zXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbmZvQ29tbWFuZChkZXY6IERldiwgb3B0aW9uczogSW5mb09wdGlvbnMpIHtcbiAgICBhc3luYyBmdW5jdGlvbiBsaXN0VGFncyhpbWFnZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAgICAgICBjb25zdCB1cmwgPSBgaHR0cHM6Ly9yZWdpc3RyeS5odWIuZG9ja2VyLmNvbS92Mi9yZXBvc2l0b3JpZXMvJHtpbWFnZX0vdGFncy9gO1xuICAgICAgICBjb25zdCB0YWdzID0gYXdhaXQgaHR0cHNHZXRKc29uKHVybCk7XG4gICAgICAgIHJldHVybiB0YWdzLnJlc3VsdHMubWFwKHggPT4geC5uYW1lKS5zb3J0KCk7XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gc2hvd0F2YWlsYWJsZVZlcnNpb25zKGltYWdlUHJlZml4OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc29sZS5sb2coYCAgJHtpbWFnZVByZWZpeH06ICR7KGF3YWl0IGxpc3RUYWdzKGltYWdlUHJlZml4KSkuam9pbignLCAnKX1gKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXBDb250YWluZXJOYW1lKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBuYW1lLnN0YXJ0c1dpdGgoJy8nKSA/IG5hbWUuc3Vic3RyKDEpIDogbmFtZTtcbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBzaG93Q29udGFpbmVySW5mbyhuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgaW5mbzogP0RDb250YWluZXJJbmZvID0gYXdhaXQgZGV2LmRvY2tlci5maW5kQ29udGFpbmVySW5mbyhuYW1lKTtcbiAgICAgICAgaWYgKGluZm8pIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAgIERvY2tlciBpbWFnZTogJHtpbmZvLkltYWdlfWApO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCAgRG9ja2VyIGNvbnRhaW5lcjogJHtpbmZvLk5hbWVzLm1hcChtYXBDb250YWluZXJOYW1lKS5qb2luKCcsICcpfSAke2luZm8uU3RhdGV9YCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgICBEb2NrZXIgY29udGFpbmVyIG1pc3Npbmc6ICR7bmFtZX1gKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKHRleHRzLnVzYWdlSGVhZGVyKHZlcnNpb24pKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGV2Lm5ldHdvcmtzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IG5ldHdvcmsgPSBkZXYubmV0d29ya3NbaV07XG4gICAgICAgIGNvbnNvbGUubG9nKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRleHRzLm5ldEhlYWRlcihuZXR3b3JrLm5hbWUpKTtcbiAgICAgICAgY29uc29sZS5sb2coKTtcbiAgICAgICAgY29uc29sZS5sb2codGV4dHMudXNlZFZlcnNpb24obmV0d29yay52ZXJzaW9uKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRleHRzLm5ldEhvc3RQb3J0KG5ldHdvcmsuaG9zdFBvcnQpKTtcbiAgICAgICAgaWYgKG5ldHdvcmsuYXJhbmdvSG9zdFBvcnQgIT09ICcnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0ZXh0cy5uZXRBcmFuZ29Ib3N0UG9ydChuZXR3b3JrLmFyYW5nb0hvc3RQb3J0KSk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgc2hvd0NvbnRhaW5lckluZm8obmV0d29yay5jb250YWluZXJOYW1lKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coKTtcbiAgICBjb25zb2xlLmxvZyh0ZXh0cy5jb21waWxlckhlYWRlcik7XG4gICAgY29uc29sZS5sb2coKTtcbiAgICBjb25zb2xlLmxvZyh0ZXh0cy51c2VkVmVyc2lvbihkZXYuY29tcGlsZXJzLnZlcnNpb24pKTtcbiAgICBhd2FpdCBzaG93Q29udGFpbmVySW5mbyhkZXYuY29tcGlsZXJzLmNvbnRhaW5lck5hbWUpO1xuXG5cbiAgICBpZiAob3B0aW9ucy5hdmFpbGFibGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coKTtcbiAgICAgICAgY29uc29sZS5sb2codGV4dHMuYXZhaWxhYmxlVmVyc2lvbnMpO1xuICAgICAgICBjb25zb2xlLmxvZygpO1xuICAgICAgICBhd2FpdCBzaG93QXZhaWxhYmxlVmVyc2lvbnMoQ29tcGlsZXJzLmltYWdlUHJlZml4KTtcbiAgICAgICAgYXdhaXQgc2hvd0F2YWlsYWJsZVZlcnNpb25zKE5ldHdvcmsuaW1hZ2VQcmVmaXgpO1xuICAgIH1cbn1cbiJdfQ==