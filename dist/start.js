"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = start;
exports.stop = stop;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _setup = require("./setup");

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
function start() {
  return _start.apply(this, arguments);
}

function _start() {
  _start = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", (0, _setup.ensureStartedLocalNode)());

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _start.apply(this, arguments);
}

function stopContainer(_x) {
  return _stopContainer.apply(this, arguments);
}

function _stopContainer() {
  _stopContainer = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(info) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", _docker["default"].getContainer(info.Id).stop());

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _stopContainer.apply(this, arguments);
}

function stop() {
  return _stop.apply(this, arguments);
}

function _stop() {
  _stop = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3() {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = console;
            _context3.next = 3;
            return _docker["default"].listTonDevContainers();

          case 3:
            _context3.t1 = _context3.sent;

            _context3.t0.log.call(_context3.t0, '>>>', _context3.t1);

            _context3.t2 = Promise;
            _context3.next = 8;
            return _docker["default"].listTonDevContainers();

          case 8:
            _context3.t3 = stopContainer;
            _context3.t4 = _context3.sent.forEach(_context3.t3);
            return _context3.abrupt("return", _context3.t2.all.call(_context3.t2, _context3.t4));

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _stop.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zdGFydC5qcyJdLCJuYW1lcyI6WyJzdGFydCIsInN0b3BDb250YWluZXIiLCJpbmZvIiwiZG9ja2VyIiwiZ2V0Q29udGFpbmVyIiwiSWQiLCJzdG9wIiwiY29uc29sZSIsImxpc3RUb25EZXZDb250YWluZXJzIiwibG9nIiwiUHJvbWlzZSIsImZvckVhY2giLCJhbGwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBaUJBOztBQUNBOztBQWxCQTs7Ozs7Ozs7Ozs7Ozs7U0FvQmVBLEs7Ozs7Ozs7K0JBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDZDQUNXLG9DQURYOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7U0FJZUMsYTs7Ozs7OzsrQkFBZixrQkFBNkJDLElBQTdCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw4Q0FDV0MsbUJBQU9DLFlBQVAsQ0FBb0JGLElBQUksQ0FBQ0csRUFBekIsRUFBNkJDLElBQTdCLEVBRFg7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztTQUllQSxJOzs7Ozs7OytCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwyQkFDSUMsT0FESjtBQUFBO0FBQUEsbUJBQzhCSixtQkFBT0ssb0JBQVAsRUFEOUI7O0FBQUE7QUFBQTs7QUFBQSx5QkFDWUMsR0FEWixvQkFDZ0IsS0FEaEI7O0FBQUEsMkJBRVdDLE9BRlg7QUFBQTtBQUFBLG1CQUU4QlAsbUJBQU9LLG9CQUFQLEVBRjlCOztBQUFBO0FBQUEsMkJBRXFFUCxhQUZyRTtBQUFBLDBDQUU2RFUsT0FGN0Q7QUFBQSwyREFFbUJDLEdBRm5COztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG4gKiB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbiAqIExpY2Vuc2UgYXQ6IGh0dHBzOi8vd3d3LnRvbi5kZXYvbGljZW5zZXNcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIFRPTiBERVYgc29mdHdhcmUgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG4vLyBAZmxvd1xuXG5pbXBvcnQgdHlwZSB7RENvbnRhaW5lckluZm99IGZyb20gJy4vZG9ja2VyJztcbmltcG9ydCB7IGVuc3VyZVN0YXJ0ZWRMb2NhbE5vZGUgfSBmcm9tIFwiLi9zZXR1cFwiO1xuaW1wb3J0IGRvY2tlciBmcm9tIFwiLi9kb2NrZXJcIjtcblxuYXN5bmMgZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgcmV0dXJuIGVuc3VyZVN0YXJ0ZWRMb2NhbE5vZGUoKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc3RvcENvbnRhaW5lcihpbmZvOiBEQ29udGFpbmVySW5mbykge1xuICAgIHJldHVybiBkb2NrZXIuZ2V0Q29udGFpbmVyKGluZm8uSWQpLnN0b3AoKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc3RvcCgpIHtcbiAgICBjb25zb2xlLmxvZygnPj4+JywgKGF3YWl0IGRvY2tlci5saXN0VG9uRGV2Q29udGFpbmVycygpKSlcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoKGF3YWl0IGRvY2tlci5saXN0VG9uRGV2Q29udGFpbmVycygpKS5mb3JFYWNoKHN0b3BDb250YWluZXIpKTtcbn1cblxuZXhwb3J0IHtzdGFydCwgc3RvcH07XG4iXX0=