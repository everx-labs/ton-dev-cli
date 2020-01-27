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
                  id: 1,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2ZXIvc2VydmVyLmpzIl0sIm5hbWVzIjpbImV4cHJlc3MiLCJyZXF1aXJlIiwiY29ycyIsInBhdGgiLCJmcyIsImFwcGx5VGVtcGxhdGUiLCJuYW1lIiwiY29udGV4dCIsInRlbXBsYXRlUGF0aCIsInJlc29sdmUiLCJfX2Rpcm5hbWUiLCJ0ZW1wbGF0ZVRleHQiLCJyZWFkRmlsZVN5bmMiLCJlbmNvZGluZyIsInRlbXBsYXRlIiwiSGFuZGxlYmFycyIsImNvbXBpbGUiLCJub0VzY2FwZSIsIlRPTkRldldlYkNvbnNvbGUiLCJkZXYiLCJvcHRpb25zIiwiYXBwIiwidXNlIiwianNvbiIsImdldCIsIm1haW4iLCJiaW5kIiwibGlzdGVuIiwicG9ydCIsInVyaSIsImNvbnNvbGUiLCJkZWJ1ZyIsInJlcSIsInJlcyIsInNlbmQiLCJlbmQiLCJsb2ciLCJqc29ucnBjIiwiaWQiLCJlcnJvciIsImNvZGUiLCJOdW1iZXIiLCJwYXJzZUludCIsIm1lc3NhZ2UiLCJ0b1N0cmluZyIsImRhdGEiLCJ3ZWIiLCJzZXJ2ZXIiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkE7O0FBQ0E7O0FBSUE7O0FBdkJBOzs7Ozs7Ozs7Ozs7OztBQXFCQSxJQUFNQSxPQUFPLEdBQUdDLE9BQU8sQ0FBQyxTQUFELENBQXZCOztBQUNBLElBQU1DLElBQUksR0FBR0QsT0FBTyxDQUFDLE1BQUQsQ0FBcEI7O0FBR0EsSUFBTUUsSUFBSSxHQUFHRixPQUFPLENBQUMsTUFBRCxDQUFwQjs7QUFDQSxJQUFNRyxFQUFFLEdBQUdILE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQUVBLFNBQVNJLGFBQVQsQ0FBdUJDLElBQXZCLEVBQXFDQyxPQUFyQyxFQUFvRTtBQUNoRSxNQUFNQyxZQUFZLEdBQUdMLElBQUksQ0FBQ00sT0FBTCxDQUFhQyxTQUFiLEVBQXdCLElBQXhCLEVBQThCLElBQTlCLEVBQW9DLEtBQXBDLEVBQTJDLFFBQTNDLEVBQXFELFdBQXJELFlBQXFFSixJQUFyRSxVQUFyQjtBQUNBLE1BQU1LLFlBQVksR0FBR1AsRUFBRSxDQUFDUSxZQUFILENBQWdCSixZQUFoQixFQUE4QjtBQUFFSyxJQUFBQSxRQUFRLEVBQUU7QUFBWixHQUE5QixDQUFyQjs7QUFDQSxNQUFNQyxRQUFRLEdBQUdDLHVCQUFXQyxPQUFYLENBQW1CTCxZQUFuQixFQUFpQztBQUM5Q00sSUFBQUEsUUFBUSxFQUFFO0FBRG9DLEdBQWpDLENBQWpCOztBQUdBLFNBQU9ILFFBQVEsQ0FBQ1AsT0FBRCxDQUFmO0FBQ0g7O0lBRVlXLGdCOzs7QUFJVCw0QkFBWUMsR0FBWixFQUFzQkMsT0FBdEIsRUFBMkM7QUFBQTtBQUFBO0FBQUE7QUFDdkMsU0FBS0QsR0FBTCxHQUFXQSxHQUFYO0FBQ0EsU0FBS0MsT0FBTCxHQUFlQSxPQUFmO0FBQ0g7Ozs7NEJBRU87QUFBQTs7QUFDSixVQUFNQyxHQUFHLEdBQUdyQixPQUFPLEVBQW5CO0FBQ0FxQixNQUFBQSxHQUFHLENBQUNDLEdBQUosQ0FBUXRCLE9BQU8sQ0FBQ3VCLElBQVIsRUFBUjtBQUNBRixNQUFBQSxHQUFHLENBQUNDLEdBQUosQ0FBUXBCLElBQUksRUFBWjtBQUNBbUIsTUFBQUEsR0FBRyxDQUFDRyxHQUFKLENBQVEsR0FBUixFQUFhLEtBQUtDLElBQUwsQ0FBVUMsSUFBVixDQUFlLElBQWYsQ0FBYjtBQUNBTCxNQUFBQSxHQUFHLENBQUNNLE1BQUosQ0FBVztBQUFFQyxRQUFBQSxJQUFJLEVBQUUsS0FBS1IsT0FBTCxDQUFhUTtBQUFyQixPQUFYLEVBQXdDLFlBQU07QUFDMUMsWUFBTUMsR0FBRyw4QkFBdUIsS0FBSSxDQUFDVCxPQUFMLENBQWFRLElBQXBDLENBQVQ7QUFDQUUsUUFBQUEsT0FBTyxDQUFDQyxLQUFSLDBDQUFnREYsR0FBaEQ7QUFDSCxPQUhEO0FBSUg7Ozs7OztvREFFVUcsRyxFQUFVQyxHOzs7Ozs7O3VCQUVQQSxHQUFHLENBQUNDLElBQUosQ0FBUzdCLGFBQWEsQ0FBQyxNQUFELEVBQVMsS0FBS2MsR0FBZCxDQUF0QixDOzs7QUFDTmMsZ0JBQUFBLEdBQUcsQ0FBQ0UsR0FBSjs7Ozs7OztBQUVBTCxnQkFBQUEsT0FBTyxDQUFDTSxHQUFSLENBQVksOEJBQVo7O3VCQUNNSCxHQUFHLENBQUNWLElBQUosQ0FBUztBQUNYYyxrQkFBQUEsT0FBTyxFQUFFLEtBREU7QUFFWEMsa0JBQUFBLEVBQUUsRUFBRSxDQUZPO0FBR1hDLGtCQUFBQSxLQUFLLEVBQUU7QUFDSEMsb0JBQUFBLElBQUksRUFBRUMsTUFBTSxDQUFDQyxRQUFQLENBQWdCLGVBQVMsWUFBTUYsSUFBL0IsS0FBd0MsQ0FEM0M7QUFFSEcsb0JBQUFBLE9BQU8sRUFBRSxZQUFNQSxPQUFOLElBQWlCLFlBQU1DLFFBQU4sRUFGdkI7QUFHSEMsb0JBQUFBLElBQUk7QUFIRDtBQUhJLGlCQUFULEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FhSUMsRzs7Ozs7OzsrQkFBZixrQkFBbUIzQixHQUFuQixFQUE2QkMsT0FBN0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0cyQixZQUFBQSxNQURILEdBQ1ksSUFBSTdCLGdCQUFKLENBQXFCQyxHQUFyQixFQUEwQkMsT0FBMUIsQ0FEWjtBQUVIMkIsWUFBQUEsTUFBTSxDQUFDQyxLQUFQO0FBRkcsOENBR0ksdUJBSEo7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOC0yMDIwIFRPTiBERVYgU09MVVRJT05TIExURC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgU09GVFdBUkUgRVZBTFVBVElPTiBMaWNlbnNlICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbiAqIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxuICogTGljZW5zZSBhdDogaHR0cHM6Ly93d3cudG9uLmRldi9saWNlbnNlc1xuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgVE9OIERFViBzb2Z0d2FyZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cblxuLy8gQGZsb3dcblxuaW1wb3J0IHR5cGUgeyBXZWJPcHRpb25zIH0gZnJvbSBcIi4uL2NsaS9vcHRpb25zXCI7XG5pbXBvcnQgeyBEZXYgfSBmcm9tIFwiLi4vZGV2XCI7XG5pbXBvcnQgeyBpbnB1dExpbmUgfSBmcm9tIFwiLi4vdXRpbHMvdXRpbHNcIjtcblxuY29uc3QgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcbmNvbnN0IGNvcnMgPSByZXF1aXJlKCdjb3JzJyk7XG5pbXBvcnQgSGFuZGxlYmFycyBmcm9tICdoYW5kbGViYXJzJztcblxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcblxuZnVuY3Rpb24gYXBwbHlUZW1wbGF0ZShuYW1lOiBzdHJpbmcsIGNvbnRleHQ6IGFueSk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgdGVtcGxhdGVQYXRoID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uJywgJy4uJywgJ3NyYycsICdzZXJ2ZXInLCAndGVtcGxhdGVzJywgYCR7bmFtZX0uaGJzYCk7XG4gICAgY29uc3QgdGVtcGxhdGVUZXh0ID0gZnMucmVhZEZpbGVTeW5jKHRlbXBsYXRlUGF0aCwgeyBlbmNvZGluZzogJ3V0ZjgnIH0pO1xuICAgIGNvbnN0IHRlbXBsYXRlID0gSGFuZGxlYmFycy5jb21waWxlKHRlbXBsYXRlVGV4dCwge1xuICAgICAgICBub0VzY2FwZTogdHJ1ZSxcbiAgICB9KTtcbiAgICByZXR1cm4gdGVtcGxhdGUoY29udGV4dCk7XG59XG5cbmV4cG9ydCBjbGFzcyBUT05EZXZXZWJDb25zb2xlIHtcbiAgICBkZXY6IERldjtcbiAgICBvcHRpb25zOiBXZWJPcHRpb25zO1xuXG4gICAgY29uc3RydWN0b3IoZGV2OiBEZXYsIG9wdGlvbnM6IFdlYk9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5kZXYgPSBkZXY7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIGNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbiAgICAgICAgYXBwLnVzZShleHByZXNzLmpzb24oKSk7XG4gICAgICAgIGFwcC51c2UoY29ycygpKTtcbiAgICAgICAgYXBwLmdldCgnLycsIHRoaXMubWFpbi5iaW5kKHRoaXMpKTtcbiAgICAgICAgYXBwLmxpc3Rlbih7IHBvcnQ6IHRoaXMub3B0aW9ucy5wb3J0IH0sICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHVyaSA9IGBodHRwOi8vbG9jYWxob3N0OiR7dGhpcy5vcHRpb25zLnBvcnR9YDtcbiAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoYFRPTiBEZXYgV2ViIENvbnNvbGUgc3RhcnRlZCBvbiAke3VyaX1gKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgbWFpbihyZXE6IGFueSwgcmVzOiBhbnkpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHJlcy5zZW5kKGFwcGx5VGVtcGxhdGUoJ21haW4nLCB0aGlzLmRldikpO1xuICAgICAgICAgICAgcmVzLmVuZCgpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1tXZWIgQ29uc29sZV0gcmVxdWVzdCBmYWlsZWQnLCBlcnJvcik7XG4gICAgICAgICAgICBhd2FpdCByZXMuanNvbih7XG4gICAgICAgICAgICAgICAganNvbnJwYzogJzIuMCcsXG4gICAgICAgICAgICAgICAgaWQ6IDEsXG4gICAgICAgICAgICAgICAgZXJyb3I6IHtcbiAgICAgICAgICAgICAgICAgICAgY29kZTogTnVtYmVyLnBhcnNlSW50KGVycm9yICYmIGVycm9yLmNvZGUpIHx8IDEsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZXJyb3JcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHdlYihkZXY6IERldiwgb3B0aW9uczogV2ViT3B0aW9ucykge1xuICAgIGNvbnN0IHNlcnZlciA9IG5ldyBUT05EZXZXZWJDb25zb2xlKGRldiwgb3B0aW9ucyk7XG4gICAgc2VydmVyLnN0YXJ0KCk7XG4gICAgcmV0dXJuIGlucHV0TGluZSgpO1xufVxuIl19