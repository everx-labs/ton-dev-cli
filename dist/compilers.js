"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _docker = _interopRequireDefault(require("./docker"));

var _config = _interopRequireDefault(require("./config"));

var _utils = require("./utils");

var fs = require('fs');

var path = require('path');

var config = _config["default"].compilerKit;

function create(_x) {
  return _create.apply(this, arguments);
}

function _create() {
  _create = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(options) {
    var keepContent, container, project, projectHostPath, hostPath, run, _run;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _run = function _ref3() {
              _run = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee() {
                var _len2,
                    args,
                    _key2,
                    _args = arguments;

                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        for (_len2 = _args.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                          args[_key2] = _args[_key2];
                        }

                        return _context.abrupt("return", _docker["default"].exec.apply(_docker["default"], [container.Id, "".concat(config.mountDestination, "/").concat(project)].concat(args)));

                      case 2:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));
              return _run.apply(this, arguments);
            };

            run = function _ref2() {
              return _run.apply(this, arguments);
            };

            hostPath = function _ref() {
              for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++) {
                items[_key] = arguments[_key];
              }

              return path.join.apply(path, [projectHostPath].concat(items));
            };

            keepContent = options && options.keepContent || false;
            _context2.next = 6;
            return _docker["default"].findContainers();

          case 6:
            container = _context2.sent.compilerKit;

            if (container) {
              _context2.next = 9;
              break;
            }

            throw "Docker container [".concat(config.container, "] does not found");

          case 9:
            if (!container.stopped) {
              _context2.next = 12;
              break;
            }

            _context2.next = 12;
            return _docker["default"].start(container.Id);

          case 12:
            project = process.cwd().split(path.delimiter).map(function (x) {
              return x.split(path.sep).join('_');
            }).join('_');
            projectHostPath = "".concat(config.mountSource, "/").concat(project);

            if (keepContent) {
              fs.mkdirSync(projectHostPath);
            } else {
              (0, _utils.ensureCleanDirectory)(projectHostPath);
            }

            return _context2.abrupt("return", {
              hostPath: hostPath,
              run: run
            });

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _create.apply(this, arguments);
}

var _default = {
  create: create
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21waWxlcnMuanMiXSwibmFtZXMiOlsiZnMiLCJyZXF1aXJlIiwicGF0aCIsImNvbmZpZyIsInJvb3RDb25maWciLCJjb21waWxlcktpdCIsImNyZWF0ZSIsIm9wdGlvbnMiLCJob3N0UGF0aCIsInJ1biIsImFyZ3MiLCJkb2NrZXIiLCJleGVjIiwiY29udGFpbmVyIiwiSWQiLCJtb3VudERlc3RpbmF0aW9uIiwicHJvamVjdCIsIml0ZW1zIiwiam9pbiIsInByb2plY3RIb3N0UGF0aCIsImtlZXBDb250ZW50IiwiZmluZENvbnRhaW5lcnMiLCJzdG9wcGVkIiwic3RhcnQiLCJwcm9jZXNzIiwiY3dkIiwic3BsaXQiLCJkZWxpbWl0ZXIiLCJtYXAiLCJ4Iiwic2VwIiwibW91bnRTb3VyY2UiLCJta2RpclN5bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7QUFKQSxJQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQUNBLElBQU1DLElBQUksR0FBR0QsT0FBTyxDQUFDLE1BQUQsQ0FBcEI7O0FBS0EsSUFBTUUsTUFBTSxHQUFHQyxtQkFBV0MsV0FBMUI7O1NBRWVDLE07Ozs7Ozs7K0JBQWYsa0JBQXNCQyxPQUF0QjtBQUFBLDBEQWtCYUMsUUFsQmIsRUFzQm1CQyxHQXRCbkI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwyQ0FzQkk7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1EQUFzQkMsSUFBdEI7QUFBc0JBLDBCQUFBQSxJQUF0QjtBQUFBOztBQUFBLHlEQUNXQyxtQkFBT0MsSUFBUCw0QkFBWUMsU0FBUyxDQUFDQyxFQUF0QixZQUE2QlgsTUFBTSxDQUFDWSxnQkFBcEMsY0FBd0RDLE9BQXhELFVBQXNFTixJQUF0RSxFQURYOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBdEJKO0FBQUE7QUFBQTs7QUFzQm1CRCxZQUFBQSxHQXRCbkI7QUFBQTtBQUFBOztBQWtCYUQsWUFBQUEsUUFsQmIsbUJBa0JnQztBQUFBLGdEQUFQUyxLQUFPO0FBQVBBLGdCQUFBQSxLQUFPO0FBQUE7O0FBQ3hCLHFCQUFPZixJQUFJLENBQUNnQixJQUFMLE9BQUFoQixJQUFJLEdBQU1pQixlQUFOLFNBQTBCRixLQUExQixFQUFYO0FBQ0gsYUFwQkw7O0FBQ1VHLFlBQUFBLFdBRFYsR0FDd0JiLE9BQU8sSUFBSUEsT0FBTyxDQUFDYSxXQUFuQixJQUFrQyxLQUQxRDtBQUFBO0FBQUEsbUJBRTZCVCxtQkFBT1UsY0FBUCxFQUY3Qjs7QUFBQTtBQUVVUixZQUFBQSxTQUZWLGtCQUVzRFIsV0FGdEQ7O0FBQUEsZ0JBR1NRLFNBSFQ7QUFBQTtBQUFBO0FBQUE7O0FBQUEsOENBSW1DVixNQUFNLENBQUNVLFNBSjFDOztBQUFBO0FBQUEsaUJBTVFBLFNBQVMsQ0FBQ1MsT0FObEI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxtQkFPY1gsbUJBQU9ZLEtBQVAsQ0FBYVYsU0FBUyxDQUFDQyxFQUF2QixDQVBkOztBQUFBO0FBU1VFLFlBQUFBLE9BVFYsR0FTb0JRLE9BQU8sQ0FBQ0MsR0FBUixHQUFjQyxLQUFkLENBQW9CeEIsSUFBSSxDQUFDeUIsU0FBekIsRUFBb0NDLEdBQXBDLENBQXdDLFVBQUFDLENBQUM7QUFBQSxxQkFBSUEsQ0FBQyxDQUFDSCxLQUFGLENBQVF4QixJQUFJLENBQUM0QixHQUFiLEVBQWtCWixJQUFsQixDQUF1QixHQUF2QixDQUFKO0FBQUEsYUFBekMsRUFBMEVBLElBQTFFLENBQStFLEdBQS9FLENBVHBCO0FBVVVDLFlBQUFBLGVBVlYsYUFVK0JoQixNQUFNLENBQUM0QixXQVZ0QyxjQVVxRGYsT0FWckQ7O0FBWUksZ0JBQUlJLFdBQUosRUFBaUI7QUFDYnBCLGNBQUFBLEVBQUUsQ0FBQ2dDLFNBQUgsQ0FBYWIsZUFBYjtBQUNILGFBRkQsTUFFTztBQUNILCtDQUFxQkEsZUFBckI7QUFDSDs7QUFoQkwsOENBMEJXO0FBQ0hYLGNBQUFBLFFBQVEsRUFBUkEsUUFERztBQUVIQyxjQUFBQSxHQUFHLEVBQUhBO0FBRkcsYUExQlg7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztlQStCZTtBQUNYSCxFQUFBQSxNQUFNLEVBQU5BO0FBRFcsQyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5pbXBvcnQgZG9ja2VyIGZyb20gXCIuL2RvY2tlclwiO1xuaW1wb3J0IHJvb3RDb25maWcgZnJvbSBcIi4vY29uZmlnXCI7XG5pbXBvcnQgeyBlbnN1cmVDbGVhbkRpcmVjdG9yeSB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmNvbnN0IGNvbmZpZyA9IHJvb3RDb25maWcuY29tcGlsZXJLaXQ7XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZShvcHRpb25zKSB7XG4gICAgY29uc3Qga2VlcENvbnRlbnQgPSBvcHRpb25zICYmIG9wdGlvbnMua2VlcENvbnRlbnQgfHwgZmFsc2U7XG4gICAgY29uc3QgY29udGFpbmVyID0gKGF3YWl0IGRvY2tlci5maW5kQ29udGFpbmVycygpKS5jb21waWxlcktpdDtcbiAgICBpZiAoIWNvbnRhaW5lcikge1xuICAgICAgICB0aHJvdyBgRG9ja2VyIGNvbnRhaW5lciBbJHtjb25maWcuY29udGFpbmVyfV0gZG9lcyBub3QgZm91bmRgO1xuICAgIH1cbiAgICBpZiAoY29udGFpbmVyLnN0b3BwZWQpIHtcbiAgICAgICAgYXdhaXQgZG9ja2VyLnN0YXJ0KGNvbnRhaW5lci5JZCk7XG4gICAgfVxuICAgIGNvbnN0IHByb2plY3QgPSBwcm9jZXNzLmN3ZCgpLnNwbGl0KHBhdGguZGVsaW1pdGVyKS5tYXAoeCA9PiB4LnNwbGl0KHBhdGguc2VwKS5qb2luKCdfJykpLmpvaW4oJ18nKTtcbiAgICBjb25zdCBwcm9qZWN0SG9zdFBhdGggPSBgJHtjb25maWcubW91bnRTb3VyY2V9LyR7cHJvamVjdH1gO1xuXG4gICAgaWYgKGtlZXBDb250ZW50KSB7XG4gICAgICAgIGZzLm1rZGlyU3luYyhwcm9qZWN0SG9zdFBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGVuc3VyZUNsZWFuRGlyZWN0b3J5KHByb2plY3RIb3N0UGF0aCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaG9zdFBhdGgoLi4uaXRlbXMpIHtcbiAgICAgICAgcmV0dXJuIHBhdGguam9pbihwcm9qZWN0SG9zdFBhdGgsIC4uLml0ZW1zKTtcbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBydW4oLi4uYXJncykge1xuICAgICAgICByZXR1cm4gZG9ja2VyLmV4ZWMoY29udGFpbmVyLklkLCBgJHtjb25maWcubW91bnREZXN0aW5hdGlvbn0vJHtwcm9qZWN0fWAsIC4uLmFyZ3MpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGhvc3RQYXRoLFxuICAgICAgICBydW5cbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCB7XG4gICAgY3JlYXRlLFxufVxuIl19