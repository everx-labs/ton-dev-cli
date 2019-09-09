"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clean = clean;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _docker = _interopRequireDefault(require("./docker"));

var _config = _interopRequireDefault(require("./config"));

/*
 * Copyright 2018-2019 TON DEV SOLUTIONS LTD.
 *
 * Licensed under the SOFTWARE EVALUATION License (the "License"); you may not use
 * this file except in compliance with the License.  You may obtain a copy of the
 * License at:
 *
 * http://www.ton.dev/licenses
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

function containerBelongsToImage(info, image) {
  return info.Image.toLowerCase() === image.toLowerCase();
}

function imageHasRepoTag(info, tag) {
  return !!(info.RepoTags || []).find(function (n) {
    return n.toLowerCase() === tag.toLowerCase();
  });
}

function isTonDevContainer(info) {
  return containerBelongsToImage(info, _config["default"].localNode.image) || containerBelongsToImage(info, _config["default"].compilers.image);
}

function isTonDevImage(info) {
  return imageHasRepoTag(info, _config["default"].localNode.image) || imageHasRepoTag(info, _config["default"].compilers.image);
}

function clean() {
  return _clean.apply(this, arguments);
}

function _clean() {
  _clean = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3() {
    var containerCleaners, imageCleaners;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _docker["default"].listAllContainers();

          case 2:
            _context3.t0 = function (info) {
              return isTonDevContainer(info);
            };

            _context3.t1 = cleanContainer;
            containerCleaners = _context3.sent.filter(_context3.t0).map(_context3.t1);
            _context3.next = 7;
            return Promise.all(containerCleaners);

          case 7:
            _context3.next = 9;
            return _docker["default"].listAllImages();

          case 9:
            _context3.t2 = function (info) {
              return isTonDevImage(info);
            };

            _context3.t3 = cleanImage;
            imageCleaners = _context3.sent.filter(_context3.t2).map(_context3.t3);
            _context3.next = 14;
            return Promise.all(imageCleaners);

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _clean.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbGVhbi5qcyJdLCJuYW1lcyI6WyJjbGVhbkNvbnRhaW5lciIsImluZm8iLCJjb250YWluZXIiLCJkb2NrZXIiLCJnZXRDb250YWluZXIiLCJJZCIsImlzUnVubmluZyIsInN0b3AiLCJyZW1vdmUiLCJjb25zb2xlIiwibG9nIiwiY2xlYW5JbWFnZSIsImltYWdlIiwiZ2V0SW1hZ2UiLCJjb250YWluZXJCZWxvbmdzVG9JbWFnZSIsIkltYWdlIiwidG9Mb3dlckNhc2UiLCJpbWFnZUhhc1JlcG9UYWciLCJ0YWciLCJSZXBvVGFncyIsImZpbmQiLCJuIiwiaXNUb25EZXZDb250YWluZXIiLCJjb25maWciLCJsb2NhbE5vZGUiLCJjb21waWxlcnMiLCJpc1RvbkRldkltYWdlIiwiY2xlYW4iLCJsaXN0QWxsQ29udGFpbmVycyIsImNvbnRhaW5lckNsZWFuZXJzIiwiZmlsdGVyIiwibWFwIiwiUHJvbWlzZSIsImFsbCIsImxpc3RBbGxJbWFnZXMiLCJpbWFnZUNsZWFuZXJzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBbUJBOztBQUNBOztBQXBCQTs7Ozs7Ozs7Ozs7Ozs7OztTQXNCZUEsYzs7Ozs7OzsrQkFBZixpQkFBOEJDLElBQTlCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNVQyxZQUFBQSxTQURWLEdBQ3NCQyxtQkFBT0MsWUFBUCxDQUFvQkgsSUFBSSxDQUFDSSxFQUF6QixDQUR0Qjs7QUFBQSxpQkFFUUYsbUJBQU9HLFNBQVAsQ0FBaUJMLElBQWpCLENBRlI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxtQkFHY0MsU0FBUyxDQUFDSyxJQUFWLEVBSGQ7O0FBQUE7QUFBQTtBQUFBLG1CQUtVTCxTQUFTLENBQUNNLE1BQVYsRUFMVjs7QUFBQTtBQU1JQyxZQUFBQSxPQUFPLENBQUNDLEdBQVIsc0JBQTBCVCxJQUFJLENBQUNJLEVBQS9COztBQU5KO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7U0FTZU0sVTs7Ozs7OzsrQkFBZixrQkFBMEJWLElBQTFCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNVVyxZQUFBQSxLQURWLEdBQ2tCVCxtQkFBT1UsUUFBUCxDQUFnQlosSUFBSSxDQUFDSSxFQUFyQixDQURsQjtBQUFBO0FBQUEsbUJBRVVPLEtBQUssQ0FBQ0osTUFBTixFQUZWOztBQUFBO0FBR0lDLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUixrQkFBc0JULElBQUksQ0FBQ0ksRUFBM0I7O0FBSEo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztBQU1BLFNBQVNTLHVCQUFULENBQWlDYixJQUFqQyxFQUF1RFcsS0FBdkQsRUFBK0U7QUFDM0UsU0FBT1gsSUFBSSxDQUFDYyxLQUFMLENBQVdDLFdBQVgsT0FBNkJKLEtBQUssQ0FBQ0ksV0FBTixFQUFwQztBQUNIOztBQUVELFNBQVNDLGVBQVQsQ0FBeUJoQixJQUF6QixFQUEyQ2lCLEdBQTNDLEVBQWlFO0FBQzdELFNBQU8sQ0FBQyxDQUFDLENBQUNqQixJQUFJLENBQUNrQixRQUFMLElBQWlCLEVBQWxCLEVBQXNCQyxJQUF0QixDQUEyQixVQUFBQyxDQUFDO0FBQUEsV0FBSUEsQ0FBQyxDQUFDTCxXQUFGLE9BQW9CRSxHQUFHLENBQUNGLFdBQUosRUFBeEI7QUFBQSxHQUE1QixDQUFUO0FBQ0g7O0FBRUQsU0FBU00saUJBQVQsQ0FBMkJyQixJQUEzQixFQUEwRDtBQUN0RCxTQUFPYSx1QkFBdUIsQ0FBQ2IsSUFBRCxFQUFPc0IsbUJBQU9DLFNBQVAsQ0FBaUJaLEtBQXhCLENBQXZCLElBQ0FFLHVCQUF1QixDQUFDYixJQUFELEVBQU9zQixtQkFBT0UsU0FBUCxDQUFpQmIsS0FBeEIsQ0FEOUI7QUFFSDs7QUFFRCxTQUFTYyxhQUFULENBQXVCekIsSUFBdkIsRUFBa0Q7QUFDOUMsU0FBT2dCLGVBQWUsQ0FBQ2hCLElBQUQsRUFBT3NCLG1CQUFPQyxTQUFQLENBQWlCWixLQUF4QixDQUFmLElBQ0FLLGVBQWUsQ0FBQ2hCLElBQUQsRUFBT3NCLG1CQUFPRSxTQUFQLENBQWlCYixLQUF4QixDQUR0QjtBQUVIOztTQUVjZSxLOzs7Ozs7OytCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQ3FDeEIsbUJBQU95QixpQkFBUCxFQURyQzs7QUFBQTtBQUFBLDJCQUVnQixVQUFBM0IsSUFBSTtBQUFBLHFCQUFJcUIsaUJBQWlCLENBQUNyQixJQUFELENBQXJCO0FBQUEsYUFGcEI7O0FBQUEsMkJBR2FELGNBSGI7QUFDVTZCLFlBQUFBLGlCQURWLGtCQUVTQyxNQUZULGVBR1NDLEdBSFQ7QUFBQTtBQUFBLG1CQUlVQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUosaUJBQVosQ0FKVjs7QUFBQTtBQUFBO0FBQUEsbUJBS2lDMUIsbUJBQU8rQixhQUFQLEVBTGpDOztBQUFBO0FBQUEsMkJBTWdCLFVBQUFqQyxJQUFJO0FBQUEscUJBQUl5QixhQUFhLENBQUN6QixJQUFELENBQWpCO0FBQUEsYUFOcEI7O0FBQUEsMkJBT2FVLFVBUGI7QUFLVXdCLFlBQUFBLGFBTFYsa0JBTVNMLE1BTlQsZUFPU0MsR0FQVDtBQUFBO0FBQUEsbUJBUVVDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRSxhQUFaLENBUlY7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOC0yMDE5IFRPTiBERVYgU09MVVRJT05TIExURC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgU09GVFdBUkUgRVZBTFVBVElPTiBMaWNlbnNlICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbiAqIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxuICogTGljZW5zZSBhdDpcbiAqXG4gKiBodHRwOi8vd3d3LnRvbi5kZXYvbGljZW5zZXNcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIFRPTiBERVYgc29mdHdhcmUgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG4vLyBAZmxvd1xuXG5pbXBvcnQgdHlwZSB7IERDb250YWluZXJJbmZvLCBESW1hZ2VJbmZvIH0gZnJvbSBcIi4vZG9ja2VyXCI7XG5pbXBvcnQgZG9ja2VyIGZyb20gXCIuL2RvY2tlclwiO1xuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi9jb25maWdcIjtcblxuYXN5bmMgZnVuY3Rpb24gY2xlYW5Db250YWluZXIoaW5mbzogRENvbnRhaW5lckluZm8pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2NrZXIuZ2V0Q29udGFpbmVyKGluZm8uSWQpO1xuICAgIGlmIChkb2NrZXIuaXNSdW5uaW5nKGluZm8pKSB7XG4gICAgICAgIGF3YWl0IGNvbnRhaW5lci5zdG9wKCk7XG4gICAgfVxuICAgIGF3YWl0IGNvbnRhaW5lci5yZW1vdmUoKTtcbiAgICBjb25zb2xlLmxvZyhgQ29udGFpbmVyIFske2luZm8uSWR9IGhhdmUgYmVlbiByZW1vdmVkLmApXG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNsZWFuSW1hZ2UoaW5mbzogREltYWdlSW5mbyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGltYWdlID0gZG9ja2VyLmdldEltYWdlKGluZm8uSWQpO1xuICAgIGF3YWl0IGltYWdlLnJlbW92ZSgpO1xuICAgIGNvbnNvbGUubG9nKGBJbWFnZSBbJHtpbmZvLklkfSBoYXZlIGJlZW4gcmVtb3ZlZC5gKVxufVxuXG5mdW5jdGlvbiBjb250YWluZXJCZWxvbmdzVG9JbWFnZShpbmZvOiBEQ29udGFpbmVySW5mbywgaW1hZ2U6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpbmZvLkltYWdlLnRvTG93ZXJDYXNlKCkgPT09IGltYWdlLnRvTG93ZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIGltYWdlSGFzUmVwb1RhZyhpbmZvOiBESW1hZ2VJbmZvLCB0YWc6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIShpbmZvLlJlcG9UYWdzIHx8IFtdKS5maW5kKG4gPT4gbi50b0xvd2VyQ2FzZSgpID09PSB0YWcudG9Mb3dlckNhc2UoKSk7XG59XG5cbmZ1bmN0aW9uIGlzVG9uRGV2Q29udGFpbmVyKGluZm86IERDb250YWluZXJJbmZvKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGNvbnRhaW5lckJlbG9uZ3NUb0ltYWdlKGluZm8sIGNvbmZpZy5sb2NhbE5vZGUuaW1hZ2UpXG4gICAgICAgIHx8IGNvbnRhaW5lckJlbG9uZ3NUb0ltYWdlKGluZm8sIGNvbmZpZy5jb21waWxlcnMuaW1hZ2UpO1xufVxuXG5mdW5jdGlvbiBpc1RvbkRldkltYWdlKGluZm86IERJbWFnZUluZm8pOiBib29sZWFuIHtcbiAgICByZXR1cm4gaW1hZ2VIYXNSZXBvVGFnKGluZm8sIGNvbmZpZy5sb2NhbE5vZGUuaW1hZ2UpXG4gICAgICAgIHx8IGltYWdlSGFzUmVwb1RhZyhpbmZvLCBjb25maWcuY29tcGlsZXJzLmltYWdlKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY2xlYW4oKSB7XG4gICAgY29uc3QgY29udGFpbmVyQ2xlYW5lcnMgPSAoYXdhaXQgZG9ja2VyLmxpc3RBbGxDb250YWluZXJzKCkpXG4gICAgICAgIC5maWx0ZXIoaW5mbyA9PiBpc1RvbkRldkNvbnRhaW5lcihpbmZvKSlcbiAgICAgICAgLm1hcChjbGVhbkNvbnRhaW5lcik7XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoY29udGFpbmVyQ2xlYW5lcnMpO1xuICAgIGNvbnN0IGltYWdlQ2xlYW5lcnMgPSAoYXdhaXQgZG9ja2VyLmxpc3RBbGxJbWFnZXMoKSlcbiAgICAgICAgLmZpbHRlcihpbmZvID0+IGlzVG9uRGV2SW1hZ2UoaW5mbykpXG4gICAgICAgIC5tYXAoY2xlYW5JbWFnZSk7XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoaW1hZ2VDbGVhbmVycyk7XG59XG5cbmV4cG9ydCB7Y2xlYW59O1xuIl19