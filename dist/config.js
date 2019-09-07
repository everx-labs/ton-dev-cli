"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var path = require('path');

var os = require('os');

var config = {
  localNode: {
    // image: 'tonlabs/local-node:0.11.0',
    image: 'tonlabs/startup-edition-node:release-candidate',
    container: 'tonlabs-local-node'
  },
  compilerKit: {
    // image: 'tonlabs/compiler-kit:0.11.0',
    image: 'tonlabs/compiler-kit:v0.10.0',
    container: 'tonlabs-compiler-kit',
    mountSource: path.join(os.homedir(), '.tonlabs', 'compiler-kit', 'projects'),
    mountDestination: '/projects'
  }
};
var _default = config;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25maWcuanMiXSwibmFtZXMiOlsicGF0aCIsInJlcXVpcmUiLCJvcyIsImNvbmZpZyIsImxvY2FsTm9kZSIsImltYWdlIiwiY29udGFpbmVyIiwiY29tcGlsZXJLaXQiLCJtb3VudFNvdXJjZSIsImpvaW4iLCJob21lZGlyIiwibW91bnREZXN0aW5hdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQU1BLElBQUksR0FBR0MsT0FBTyxDQUFDLE1BQUQsQ0FBcEI7O0FBQ0EsSUFBTUMsRUFBRSxHQUFHRCxPQUFPLENBQUMsSUFBRCxDQUFsQjs7QUFFQSxJQUFNRSxNQUFNLEdBQUc7QUFDWEMsRUFBQUEsU0FBUyxFQUFFO0FBQ1A7QUFDQUMsSUFBQUEsS0FBSyxFQUFFLGdEQUZBO0FBR1BDLElBQUFBLFNBQVMsRUFBRTtBQUhKLEdBREE7QUFNWEMsRUFBQUEsV0FBVyxFQUFFO0FBQ1Q7QUFDQUYsSUFBQUEsS0FBSyxFQUFFLDhCQUZFO0FBR1RDLElBQUFBLFNBQVMsRUFBRSxzQkFIRjtBQUlURSxJQUFBQSxXQUFXLEVBQUVSLElBQUksQ0FBQ1MsSUFBTCxDQUFVUCxFQUFFLENBQUNRLE9BQUgsRUFBVixFQUF3QixVQUF4QixFQUFvQyxjQUFwQyxFQUFvRCxVQUFwRCxDQUpKO0FBS1RDLElBQUFBLGdCQUFnQixFQUFFO0FBTFQ7QUFORixDQUFmO2VBZ0JlUixNIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IG9zID0gcmVxdWlyZSgnb3MnKTtcblxuY29uc3QgY29uZmlnID0ge1xuICAgIGxvY2FsTm9kZToge1xuICAgICAgICAvLyBpbWFnZTogJ3RvbmxhYnMvbG9jYWwtbm9kZTowLjExLjAnLFxuICAgICAgICBpbWFnZTogJ3RvbmxhYnMvc3RhcnR1cC1lZGl0aW9uLW5vZGU6cmVsZWFzZS1jYW5kaWRhdGUnLFxuICAgICAgICBjb250YWluZXI6ICd0b25sYWJzLWxvY2FsLW5vZGUnLFxuICAgIH0sXG4gICAgY29tcGlsZXJLaXQ6IHtcbiAgICAgICAgLy8gaW1hZ2U6ICd0b25sYWJzL2NvbXBpbGVyLWtpdDowLjExLjAnLFxuICAgICAgICBpbWFnZTogJ3RvbmxhYnMvY29tcGlsZXIta2l0OnYwLjEwLjAnLFxuICAgICAgICBjb250YWluZXI6ICd0b25sYWJzLWNvbXBpbGVyLWtpdCcsXG4gICAgICAgIG1vdW50U291cmNlOiBwYXRoLmpvaW4ob3MuaG9tZWRpcigpLCAnLnRvbmxhYnMnLCAnY29tcGlsZXIta2l0JywgJ3Byb2plY3RzJyksXG4gICAgICAgIG1vdW50RGVzdGluYXRpb246ICcvcHJvamVjdHMnLFxuXG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cbiJdfQ==