"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LLVMC = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _clientCode = require("./client-code");

var _compilers = require("./compilers");

var _job = require("./job");

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
var LLVMC =
/*#__PURE__*/
function () {
  function LLVMC() {
    (0, _classCallCheck2["default"])(this, LLVMC);
  }

  (0, _createClass2["default"])(LLVMC, null, [{
    key: "build",
    value: function () {
      var _build = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(compilers, options) {
        var job;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                job = _job.CompilersJob.create(compilers, {
                  keepContent: false
                });
                _context.next = 3;
                return _clientCode.ClientCode.generate(job, options.clientCode);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function build(_x, _x2) {
        return _build.apply(this, arguments);
      }

      return build;
    }()
  }]);
  return LLVMC;
}();

exports.LLVMC = LLVMC;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21waWxlcnMvbGx2bS1jLmpzIl0sIm5hbWVzIjpbIkxMVk1DIiwiY29tcGlsZXJzIiwib3B0aW9ucyIsImpvYiIsIkNvbXBpbGVyc0pvYiIsImNyZWF0ZSIsImtlZXBDb250ZW50IiwiQ2xpZW50Q29kZSIsImdlbmVyYXRlIiwiY2xpZW50Q29kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlQTs7QUFFQTs7QUFDQTs7QUFsQkE7Ozs7Ozs7Ozs7Ozs7O0lBMkJhQSxLOzs7Ozs7Ozs7Ozs7b0RBQ1VDLFMsRUFBc0JDLE87Ozs7OztBQUMvQkMsZ0JBQUFBLEcsR0FBTUMsa0JBQWFDLE1BQWIsQ0FBb0JKLFNBQXBCLEVBQStCO0FBQ3ZDSyxrQkFBQUEsV0FBVyxFQUFFO0FBRDBCLGlCQUEvQixDOzt1QkFJTkMsdUJBQVdDLFFBQVgsQ0FBb0JMLEdBQXBCLEVBQXlCRCxPQUFPLENBQUNPLFVBQWpDLEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG4gKiB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbiAqIExpY2Vuc2UgYXQ6IGh0dHBzOi8vd3d3LnRvbi5kZXYvbGljZW5zZXNcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIFRPTiBERVYgc29mdHdhcmUgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG5cbmltcG9ydCB7IENsaWVudENvZGUgfSBmcm9tIFwiLi9jbGllbnQtY29kZVwiO1xuaW1wb3J0IHR5cGUgeyBDbGllbnRDb2RlR2VuZXJhdGlvbk9wdGlvbnMsIENsaWVudENvZGVMYW5ndWFnZVR5cGUgfSBmcm9tIFwiLi9jbGllbnQtY29kZVwiO1xuaW1wb3J0IHsgQ29tcGlsZXJzIH0gZnJvbSBcIi4vY29tcGlsZXJzXCI7XG5pbXBvcnQgeyBDb21waWxlcnNKb2IgfSBmcm9tIFwiLi9qb2JcIjtcblxuZXhwb3J0IHR5cGUgQnVpbGRPcHRpb25zID0ge1xuICAgIGZpbGVzOiBzdHJpbmdbXSxcbiAgICBjbGllbnRDb2RlOiB7XG4gICAgICAgIFtDbGllbnRDb2RlTGFuZ3VhZ2VUeXBlXTogQ2xpZW50Q29kZUdlbmVyYXRpb25PcHRpb25zLFxuICAgIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBMTFZNQyB7XG4gICAgc3RhdGljIGFzeW5jIGJ1aWxkKGNvbXBpbGVyczogQ29tcGlsZXJzLCBvcHRpb25zOiBCdWlsZE9wdGlvbnMpIHtcbiAgICAgICAgY29uc3Qgam9iID0gQ29tcGlsZXJzSm9iLmNyZWF0ZShjb21waWxlcnMsIHtcbiAgICAgICAgICAgIGtlZXBDb250ZW50OiBmYWxzZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYXdhaXQgQ2xpZW50Q29kZS5nZW5lcmF0ZShqb2IsIG9wdGlvbnMuY2xpZW50Q29kZSk7XG4gICAgfVxufVxuIl19