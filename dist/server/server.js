"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.web = web;
exports.TONDevWebConsole = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _dev = require("../dev");

var _utils = require("../utils/utils");

var _handlebars = _interopRequireDefault(require("handlebars"));

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
var express = require('express');

var cors = require('cors');

var path = require('path');

var fs = require('fs');

function applyTemplate(name, context) {
  var templatePath = path.resolve(__dirname, '..', '..', 'src', 'server', 'templates', "".concat(name, ".hbs"));
  var templateText = fs.readFileSync(templatePath, {
    encoding: 'utf8'
  });

  var template = _handlebars["default"].compile(templateText, {
    noEscape: true
  });

  return template(context);
}

var TONDevWebConsole =
/*#__PURE__*/
function () {
  function TONDevWebConsole(dev, options) {
    (0, _classCallCheck2["default"])(this, TONDevWebConsole);
    (0, _defineProperty2["default"])(this, "dev", void 0);
    (0, _defineProperty2["default"])(this, "options", void 0);
    this.dev = dev;
    this.options = options;
  }

  (0, _createClass2["default"])(TONDevWebConsole, [{
    key: "start",
    value: function start() {
      var _this = this;

      var app = express();
      app.use(express.json());
      app.use(cors());
      app.get('/', this.main.bind(this));
      app.listen({
        port: this.options.port
      }, function () {
        var uri = "http://localhost:".concat(_this.options.port);
        console.debug("TON Dev Web Console started on ".concat(uri));
      });
    }
  }, {
    key: "main",
    value: function () {
      var _main = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return res.send(applyTemplate('main', this.dev));

              case 3:
                res.end();
                _context.next = 11;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                console.log('[Web Console] request failed', _context.t0);
                _context.next = 11;
                return res.json({
                  jsonrpc: '2.0',
                  id: id,
                  error: {
                    code: Number.parseInt(_context.t0 && _context.t0.code) || 1,
                    message: _context.t0.message || _context.t0.toString(),
                    data: _context.t0
                  }
                });

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 6]]);
      }));

      function main(_x, _x2) {
        return _main.apply(this, arguments);
      }

      return main;
    }()
  }]);
  return TONDevWebConsole;
}();

exports.TONDevWebConsole = TONDevWebConsole;

function web(_x3, _x4) {
  return _web.apply(this, arguments);
}

function _web() {
  _web = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(dev, options) {
    var server;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            server = new TONDevWebConsole(dev, options);
            server.start();
            return _context2.abrupt("return", (0, _utils.inputLine)());

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _web.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2ZXIvc2VydmVyLmpzIl0sIm5hbWVzIjpbImV4cHJlc3MiLCJyZXF1aXJlIiwiY29ycyIsInBhdGgiLCJmcyIsImFwcGx5VGVtcGxhdGUiLCJuYW1lIiwiY29udGV4dCIsInRlbXBsYXRlUGF0aCIsInJlc29sdmUiLCJfX2Rpcm5hbWUiLCJ0ZW1wbGF0ZVRleHQiLCJyZWFkRmlsZVN5bmMiLCJlbmNvZGluZyIsInRlbXBsYXRlIiwiSGFuZGxlYmFycyIsImNvbXBpbGUiLCJub0VzY2FwZSIsIlRPTkRldldlYkNvbnNvbGUiLCJkZXYiLCJvcHRpb25zIiwiYXBwIiwidXNlIiwianNvbiIsImdldCIsIm1haW4iLCJiaW5kIiwibGlzdGVuIiwicG9ydCIsInVyaSIsImNvbnNvbGUiLCJkZWJ1ZyIsInJlcSIsInJlcyIsInNlbmQiLCJlbmQiLCJsb2ciLCJqc29ucnBjIiwiaWQiLCJlcnJvciIsImNvZGUiLCJOdW1iZXIiLCJwYXJzZUludCIsIm1lc3NhZ2UiLCJ0b1N0cmluZyIsImRhdGEiLCJ3ZWIiLCJzZXJ2ZXIiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkE7O0FBQ0E7O0FBSUE7O0FBdkJBOzs7Ozs7Ozs7Ozs7OztBQXFCQSxJQUFNQSxPQUFPLEdBQUdDLE9BQU8sQ0FBQyxTQUFELENBQXZCOztBQUNBLElBQU1DLElBQUksR0FBR0QsT0FBTyxDQUFDLE1BQUQsQ0FBcEI7O0FBR0EsSUFBTUUsSUFBSSxHQUFHRixPQUFPLENBQUMsTUFBRCxDQUFwQjs7QUFDQSxJQUFNRyxFQUFFLEdBQUdILE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQUVBLFNBQVNJLGFBQVQsQ0FBdUJDLElBQXZCLEVBQXFDQyxPQUFyQyxFQUFvRTtBQUNoRSxNQUFNQyxZQUFZLEdBQUdMLElBQUksQ0FBQ00sT0FBTCxDQUFhQyxTQUFiLEVBQXdCLElBQXhCLEVBQThCLElBQTlCLEVBQW9DLEtBQXBDLEVBQTJDLFFBQTNDLEVBQXFELFdBQXJELFlBQXFFSixJQUFyRSxVQUFyQjtBQUNBLE1BQU1LLFlBQVksR0FBR1AsRUFBRSxDQUFDUSxZQUFILENBQWdCSixZQUFoQixFQUE4QjtBQUFFSyxJQUFBQSxRQUFRLEVBQUU7QUFBWixHQUE5QixDQUFyQjs7QUFDQSxNQUFNQyxRQUFRLEdBQUdDLHVCQUFXQyxPQUFYLENBQW1CTCxZQUFuQixFQUFpQztBQUM5Q00sSUFBQUEsUUFBUSxFQUFFO0FBRG9DLEdBQWpDLENBQWpCOztBQUdBLFNBQU9ILFFBQVEsQ0FBQ1AsT0FBRCxDQUFmO0FBQ0g7O0lBRVlXLGdCOzs7QUFJVCw0QkFBWUMsR0FBWixFQUFzQkMsT0FBdEIsRUFBMkM7QUFBQTtBQUFBO0FBQUE7QUFDdkMsU0FBS0QsR0FBTCxHQUFXQSxHQUFYO0FBQ0EsU0FBS0MsT0FBTCxHQUFlQSxPQUFmO0FBQ0g7Ozs7NEJBRU87QUFBQTs7QUFDSixVQUFNQyxHQUFHLEdBQUdyQixPQUFPLEVBQW5CO0FBQ0FxQixNQUFBQSxHQUFHLENBQUNDLEdBQUosQ0FBUXRCLE9BQU8sQ0FBQ3VCLElBQVIsRUFBUjtBQUNBRixNQUFBQSxHQUFHLENBQUNDLEdBQUosQ0FBUXBCLElBQUksRUFBWjtBQUNBbUIsTUFBQUEsR0FBRyxDQUFDRyxHQUFKLENBQVEsR0FBUixFQUFhLEtBQUtDLElBQUwsQ0FBVUMsSUFBVixDQUFlLElBQWYsQ0FBYjtBQUNBTCxNQUFBQSxHQUFHLENBQUNNLE1BQUosQ0FBVztBQUFFQyxRQUFBQSxJQUFJLEVBQUUsS0FBS1IsT0FBTCxDQUFhUTtBQUFyQixPQUFYLEVBQXdDLFlBQU07QUFDMUMsWUFBTUMsR0FBRyw4QkFBdUIsS0FBSSxDQUFDVCxPQUFMLENBQWFRLElBQXBDLENBQVQ7QUFDQUUsUUFBQUEsT0FBTyxDQUFDQyxLQUFSLDBDQUFnREYsR0FBaEQ7QUFDSCxPQUhEO0FBSUg7Ozs7OztvREFFVUcsRyxFQUFVQyxHOzs7Ozs7O3VCQUVQQSxHQUFHLENBQUNDLElBQUosQ0FBUzdCLGFBQWEsQ0FBQyxNQUFELEVBQVMsS0FBS2MsR0FBZCxDQUF0QixDOzs7QUFDTmMsZ0JBQUFBLEdBQUcsQ0FBQ0UsR0FBSjs7Ozs7OztBQUVBTCxnQkFBQUEsT0FBTyxDQUFDTSxHQUFSLENBQVksOEJBQVo7O3VCQUNNSCxHQUFHLENBQUNWLElBQUosQ0FBUztBQUNYYyxrQkFBQUEsT0FBTyxFQUFFLEtBREU7QUFFWEMsa0JBQUFBLEVBQUUsRUFBRkEsRUFGVztBQUdYQyxrQkFBQUEsS0FBSyxFQUFFO0FBQ0hDLG9CQUFBQSxJQUFJLEVBQUVDLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQixlQUFTLFlBQU1GLElBQS9CLEtBQXdDLENBRDNDO0FBRUhHLG9CQUFBQSxPQUFPLEVBQUUsWUFBTUEsT0FBTixJQUFpQixZQUFNQyxRQUFOLEVBRnZCO0FBR0hDLG9CQUFBQSxJQUFJO0FBSEQ7QUFISSxpQkFBVCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBYUlDLEc7Ozs7Ozs7K0JBQWYsa0JBQW1CM0IsR0FBbkIsRUFBNkJDLE9BQTdCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNHMkIsWUFBQUEsTUFESCxHQUNZLElBQUk3QixnQkFBSixDQUFxQkMsR0FBckIsRUFBMEJDLE9BQTFCLENBRFo7QUFFSDJCLFlBQUFBLE1BQU0sQ0FBQ0MsS0FBUDtBQUZHLDhDQUdJLHVCQUhKOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG4gKiB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbiAqIExpY2Vuc2UgYXQ6IGh0dHBzOi8vd3d3LnRvbi5kZXYvbGljZW5zZXNcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIFRPTiBERVYgc29mdHdhcmUgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG5cbi8vIEBmbG93XG5cbmltcG9ydCB0eXBlIHsgV2ViT3B0aW9ucyB9IGZyb20gXCIuLi9jbGkvb3B0aW9uc1wiO1xuaW1wb3J0IHsgRGV2IH0gZnJvbSBcIi4uL2RldlwiO1xuaW1wb3J0IHsgaW5wdXRMaW5lIH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxzXCI7XG5cbmNvbnN0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XG5jb25zdCBjb3JzID0gcmVxdWlyZSgnY29ycycpO1xuaW1wb3J0IEhhbmRsZWJhcnMgZnJvbSAnaGFuZGxlYmFycyc7XG5cbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5cbmZ1bmN0aW9uIGFwcGx5VGVtcGxhdGUobmFtZTogc3RyaW5nLCBjb250ZXh0OiBhbnkpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IHRlbXBsYXRlUGF0aCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLicsICcuLicsICdzcmMnLCAnc2VydmVyJywgJ3RlbXBsYXRlcycsIGAke25hbWV9Lmhic2ApO1xuICAgIGNvbnN0IHRlbXBsYXRlVGV4dCA9IGZzLnJlYWRGaWxlU3luYyh0ZW1wbGF0ZVBhdGgsIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KTtcbiAgICBjb25zdCB0ZW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZSh0ZW1wbGF0ZVRleHQsIHtcbiAgICAgICAgbm9Fc2NhcGU6IHRydWUsXG4gICAgfSk7XG4gICAgcmV0dXJuIHRlbXBsYXRlKGNvbnRleHQpO1xufVxuXG5leHBvcnQgY2xhc3MgVE9ORGV2V2ViQ29uc29sZSB7XG4gICAgZGV2OiBEZXY7XG4gICAgb3B0aW9uczogV2ViT3B0aW9ucztcblxuICAgIGNvbnN0cnVjdG9yKGRldjogRGV2LCBvcHRpb25zOiBXZWJPcHRpb25zKSB7XG4gICAgICAgIHRoaXMuZGV2ID0gZGV2O1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICBjb25zdCBhcHAgPSBleHByZXNzKCk7XG4gICAgICAgIGFwcC51c2UoZXhwcmVzcy5qc29uKCkpO1xuICAgICAgICBhcHAudXNlKGNvcnMoKSk7XG4gICAgICAgIGFwcC5nZXQoJy8nLCB0aGlzLm1haW4uYmluZCh0aGlzKSk7XG4gICAgICAgIGFwcC5saXN0ZW4oeyBwb3J0OiB0aGlzLm9wdGlvbnMucG9ydCB9LCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB1cmkgPSBgaHR0cDovL2xvY2FsaG9zdDoke3RoaXMub3B0aW9ucy5wb3J0fWA7XG4gICAgICAgICAgICBjb25zb2xlLmRlYnVnKGBUT04gRGV2IFdlYiBDb25zb2xlIHN0YXJ0ZWQgb24gJHt1cml9YCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFzeW5jIG1haW4ocmVxOiBhbnksIHJlczogYW55KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCByZXMuc2VuZChhcHBseVRlbXBsYXRlKCdtYWluJywgdGhpcy5kZXYpKTtcbiAgICAgICAgICAgIHJlcy5lbmQoKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbV2ViIENvbnNvbGVdIHJlcXVlc3QgZmFpbGVkJywgZXJyb3IpO1xuICAgICAgICAgICAgYXdhaXQgcmVzLmpzb24oe1xuICAgICAgICAgICAgICAgIGpzb25ycGM6ICcyLjAnLFxuICAgICAgICAgICAgICAgIGlkLFxuICAgICAgICAgICAgICAgIGVycm9yOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvZGU6IE51bWJlci5wYXJzZUludChlcnJvciAmJiBlcnJvci5jb2RlKSB8fCAxLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIHx8IGVycm9yLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGVycm9yXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB3ZWIoZGV2OiBEZXYsIG9wdGlvbnM6IFdlYk9wdGlvbnMpIHtcbiAgICBjb25zdCBzZXJ2ZXIgPSBuZXcgVE9ORGV2V2ViQ29uc29sZShkZXYsIG9wdGlvbnMpO1xuICAgIHNlcnZlci5zdGFydCgpO1xuICAgIHJldHVybiBpbnB1dExpbmUoKTtcbn1cbiJdfQ==