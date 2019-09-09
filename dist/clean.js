"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clean = clean;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _docker = _interopRequireDefault(require("./docker"));

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
function cleanContainer(_x) {
  return _cleanContainer.apply(this, arguments);
}

function _cleanContainer() {
  _cleanContainer = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(info) {
    var container;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            container = _docker["default"].getContainer(info.Id);

            if (!_docker["default"].isRunning(info)) {
              _context.next = 4;
              break;
            }

            _context.next = 4;
            return container.stop();

          case 4:
            _context.next = 6;
            return container.remove();

          case 6:
            console.log("Container [".concat(info.Id, " have been removed."));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _cleanContainer.apply(this, arguments);
}

function cleanImage(_x2) {
  return _cleanImage.apply(this, arguments);
}

function _cleanImage() {
  _cleanImage = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(info) {
    var image;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            image = _docker["default"].getImage(info.Id);
            _context2.next = 3;
            return image.remove();

          case 3:
            console.log("Image [".concat(info.Id, " have been removed."));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _cleanImage.apply(this, arguments);
}

function clean() {
  return _clean.apply(this, arguments);
}

function _clean() {
  _clean = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3() {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = Promise;
            _context3.next = 3;
            return _docker["default"].listTonDevContainers();

          case 3:
            _context3.t1 = cleanContainer;
            _context3.t2 = _context3.sent.map(_context3.t1);
            _context3.next = 7;
            return _context3.t0.all.call(_context3.t0, _context3.t2);

          case 7:
            _context3.t3 = Promise;
            _context3.next = 10;
            return _docker["default"].listTonDevImages();

          case 10:
            _context3.t4 = cleanImage;
            _context3.t5 = _context3.sent.map(_context3.t4);
            _context3.next = 14;
            return _context3.t3.all.call(_context3.t3, _context3.t5);

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _clean.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbGVhbi5qcyJdLCJuYW1lcyI6WyJjbGVhbkNvbnRhaW5lciIsImluZm8iLCJjb250YWluZXIiLCJkb2NrZXIiLCJnZXRDb250YWluZXIiLCJJZCIsImlzUnVubmluZyIsInN0b3AiLCJyZW1vdmUiLCJjb25zb2xlIiwibG9nIiwiY2xlYW5JbWFnZSIsImltYWdlIiwiZ2V0SW1hZ2UiLCJjbGVhbiIsIlByb21pc2UiLCJsaXN0VG9uRGV2Q29udGFpbmVycyIsIm1hcCIsImFsbCIsImxpc3RUb25EZXZJbWFnZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFpQkE7O0FBakJBOzs7Ozs7Ozs7Ozs7OztTQW1CZUEsYzs7Ozs7OzsrQkFBZixpQkFBOEJDLElBQTlCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNVQyxZQUFBQSxTQURWLEdBQ3NCQyxtQkFBT0MsWUFBUCxDQUFvQkgsSUFBSSxDQUFDSSxFQUF6QixDQUR0Qjs7QUFBQSxpQkFFUUYsbUJBQU9HLFNBQVAsQ0FBaUJMLElBQWpCLENBRlI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxtQkFHY0MsU0FBUyxDQUFDSyxJQUFWLEVBSGQ7O0FBQUE7QUFBQTtBQUFBLG1CQUtVTCxTQUFTLENBQUNNLE1BQVYsRUFMVjs7QUFBQTtBQU1JQyxZQUFBQSxPQUFPLENBQUNDLEdBQVIsc0JBQTBCVCxJQUFJLENBQUNJLEVBQS9COztBQU5KO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7U0FTZU0sVTs7Ozs7OzsrQkFBZixrQkFBMEJWLElBQTFCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNVVyxZQUFBQSxLQURWLEdBQ2tCVCxtQkFBT1UsUUFBUCxDQUFnQlosSUFBSSxDQUFDSSxFQUFyQixDQURsQjtBQUFBO0FBQUEsbUJBRVVPLEtBQUssQ0FBQ0osTUFBTixFQUZWOztBQUFBO0FBR0lDLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUixrQkFBc0JULElBQUksQ0FBQ0ksRUFBM0I7O0FBSEo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztTQU1lUyxLOzs7Ozs7OytCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwyQkFDVUMsT0FEVjtBQUFBO0FBQUEsbUJBQzZCWixtQkFBT2Esb0JBQVAsRUFEN0I7O0FBQUE7QUFBQSwyQkFDZ0VoQixjQURoRTtBQUFBLDBDQUM0RGlCLEdBRDVEO0FBQUE7QUFBQSxnQ0FDa0JDLEdBRGxCOztBQUFBO0FBQUEsMkJBRVVILE9BRlY7QUFBQTtBQUFBLG1CQUU2QlosbUJBQU9nQixnQkFBUCxFQUY3Qjs7QUFBQTtBQUFBLDJCQUU0RFIsVUFGNUQ7QUFBQSwwQ0FFd0RNLEdBRnhEO0FBQUE7QUFBQSxnQ0FFa0JDLEdBRmxCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG4gKiB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbiAqIExpY2Vuc2UgYXQ6IGh0dHBzOi8vd3d3LnRvbi5kZXYvbGljZW5zZXNcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIFRPTiBERVYgc29mdHdhcmUgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG4vLyBAZmxvd1xuXG5pbXBvcnQgdHlwZSB7IERDb250YWluZXJJbmZvLCBESW1hZ2VJbmZvIH0gZnJvbSBcIi4vZG9ja2VyXCI7XG5pbXBvcnQgZG9ja2VyIGZyb20gXCIuL2RvY2tlclwiO1xuXG5hc3luYyBmdW5jdGlvbiBjbGVhbkNvbnRhaW5lcihpbmZvOiBEQ29udGFpbmVySW5mbyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY2tlci5nZXRDb250YWluZXIoaW5mby5JZCk7XG4gICAgaWYgKGRvY2tlci5pc1J1bm5pbmcoaW5mbykpIHtcbiAgICAgICAgYXdhaXQgY29udGFpbmVyLnN0b3AoKTtcbiAgICB9XG4gICAgYXdhaXQgY29udGFpbmVyLnJlbW92ZSgpO1xuICAgIGNvbnNvbGUubG9nKGBDb250YWluZXIgWyR7aW5mby5JZH0gaGF2ZSBiZWVuIHJlbW92ZWQuYClcbn1cblxuYXN5bmMgZnVuY3Rpb24gY2xlYW5JbWFnZShpbmZvOiBESW1hZ2VJbmZvKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgaW1hZ2UgPSBkb2NrZXIuZ2V0SW1hZ2UoaW5mby5JZCk7XG4gICAgYXdhaXQgaW1hZ2UucmVtb3ZlKCk7XG4gICAgY29uc29sZS5sb2coYEltYWdlIFske2luZm8uSWR9IGhhdmUgYmVlbiByZW1vdmVkLmApXG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNsZWFuKCkge1xuICAgIGF3YWl0IFByb21pc2UuYWxsKChhd2FpdCBkb2NrZXIubGlzdFRvbkRldkNvbnRhaW5lcnMoKSkubWFwKGNsZWFuQ29udGFpbmVyKSk7XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoKGF3YWl0IGRvY2tlci5saXN0VG9uRGV2SW1hZ2VzKCkpLm1hcChjbGVhbkltYWdlKSk7XG59XG5cbmV4cG9ydCB7Y2xlYW59O1xuIl19