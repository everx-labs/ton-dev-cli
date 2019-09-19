"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.texts = void 0;
var texts = {
  agreementConfirmation: "\nThis Agreement takes effect when you input a \u201CYES\u201D and press Enter \nor, if earlier, when you use any of the TON DEV Software: ",
  agreementRejected: '\n\nLicense terms were not accepted.\n',
  agreementAccepted: '\n\nLicense terms were accepted.\n',
  dockerVersionRequired: "Docker version required ^17",
  noTonDevImages: 'There are no TON Dev Images',
  noTonDevContainers: 'There are no TON Dev Containers',
  done: ' Done.',
  availableVersions: function availableVersions(imageFamily, versions) {
    return "Available versions [".concat(imageFamily, "]: ").concat(versions);
  },
  containerDoesNotExists: function containerDoesNotExists(name) {
    return "Container [".concat(name, "] does not exists. Creating...");
  },
  imageDoesNotExists: function imageDoesNotExists(name) {
    return "Image [".concat(name, "] is missing. Pulling (please wait)...");
  },
  containerCanNotBeCreated: function containerCanNotBeCreated(name) {
    return "Container [".concat(name, "] can not be created");
  },
  containerHaveBeenRemoved: function containerHaveBeenRemoved(id) {
    return "Container [".concat(id, " have been removed.");
  },
  imageHaveBeenRemoved: function imageHaveBeenRemoved(id) {
    return "Image [".concat(id, " have been removed.");
  },
  sourceFileNotFound: function sourceFileNotFound(name) {
    return "Source file [".concat(name.sol, "] not found.");
  },
  usageHeader: function usageHeader(version) {
    return "TON Labs Dev Tools ".concat(version);
  },
  invalidOption: function invalidOption(arg) {
    return "Invalid option: ".concat(arg);
  },
  usage: "Use: tondev command { argument ... }\n\nCommands:\n\nsetup [ -p <number> ]\n    Looking for a required prerequisites and setup required TON Labs Dev Tools.\n    Options:\n    --port <number> or -p <number>\n        Set local port number for local node. Default is 80.       \n    \nstart\n    Start local node.\n     \nstop\n    Stop all TON Dev docker containers.\n     \nclean [ -i ] [-c]\n    Remove all TON Dev docker containers and images.\n    Options (-i and -c are mutually exclusive):\n    --images or -i\n        Remove only images.\n    --containers or -c\n        Remove only containers.\n    \ninfo\n    Show current status of TON Dev images and containers.\n\nuse <version>\n    Select version for local-node and compilers. \n        \nsol <solidity-file-without-extension> [ -js ]\n    Build TON contract from solidity source code.\n    Options:\n    --javascript or -js\n        Generate JavaScript file with contract package (imageBase64 and ABI).\n        \n\nCopyright 2018-2019 TON DEV SOLUTIONS LTD.\nLicensed under the SOFTWARE EVALUATION License (https://www.ton.dev/licenses)\n",
  tonDevImages: function tonDevImages() {
    return "Images:";
  },
  tonDevContainers: function tonDevContainers() {
    return "Containers:";
  },
  usedVersion: function usedVersion(version) {
    return "Used version: ".concat(version);
  },
  localNodeBoundToPort: function localNodeBoundToPort(port) {
    return "Local Node is bound to port: ".concat(port);
  },
  localNodeArangoBoundToPort: function localNodeArangoBoundToPort(port) {
    return "Local Node Arango DB is bound to port: ".concat(port);
  }
};
exports.texts = texts;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90ZXh0cy5qcyJdLCJuYW1lcyI6WyJ0ZXh0cyIsImFncmVlbWVudENvbmZpcm1hdGlvbiIsImFncmVlbWVudFJlamVjdGVkIiwiYWdyZWVtZW50QWNjZXB0ZWQiLCJkb2NrZXJWZXJzaW9uUmVxdWlyZWQiLCJub1RvbkRldkltYWdlcyIsIm5vVG9uRGV2Q29udGFpbmVycyIsImRvbmUiLCJhdmFpbGFibGVWZXJzaW9ucyIsImltYWdlRmFtaWx5IiwidmVyc2lvbnMiLCJjb250YWluZXJEb2VzTm90RXhpc3RzIiwibmFtZSIsImltYWdlRG9lc05vdEV4aXN0cyIsImNvbnRhaW5lckNhbk5vdEJlQ3JlYXRlZCIsImNvbnRhaW5lckhhdmVCZWVuUmVtb3ZlZCIsImlkIiwiaW1hZ2VIYXZlQmVlblJlbW92ZWQiLCJzb3VyY2VGaWxlTm90Rm91bmQiLCJzb2wiLCJ1c2FnZUhlYWRlciIsInZlcnNpb24iLCJpbnZhbGlkT3B0aW9uIiwiYXJnIiwidXNhZ2UiLCJ0b25EZXZJbWFnZXMiLCJ0b25EZXZDb250YWluZXJzIiwidXNlZFZlcnNpb24iLCJsb2NhbE5vZGVCb3VuZFRvUG9ydCIsInBvcnQiLCJsb2NhbE5vZGVBcmFuZ29Cb3VuZFRvUG9ydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBTUEsS0FBSyxHQUFHO0FBQ1ZDLEVBQUFBLHFCQUFxQiwrSUFEWDtBQUlWQyxFQUFBQSxpQkFBaUIsRUFBRSx3Q0FKVDtBQUtWQyxFQUFBQSxpQkFBaUIsRUFBRSxvQ0FMVDtBQU1WQyxFQUFBQSxxQkFBcUIsRUFBRSw2QkFOYjtBQU9WQyxFQUFBQSxjQUFjLEVBQUUsNkJBUE47QUFRVkMsRUFBQUEsa0JBQWtCLEVBQUUsaUNBUlY7QUFTVkMsRUFBQUEsSUFBSSxFQUFFLFFBVEk7QUFVVkMsRUFBQUEsaUJBVlUsNkJBVVFDLFdBVlIsRUFVcUJDLFFBVnJCLEVBVStCO0FBQ3JDLHlDQUE4QkQsV0FBOUIsZ0JBQStDQyxRQUEvQztBQUNILEdBWlM7QUFhVkMsRUFBQUEsc0JBYlUsa0NBYWFDLElBYmIsRUFhbUI7QUFDekIsZ0NBQXFCQSxJQUFyQjtBQUNILEdBZlM7QUFnQlZDLEVBQUFBLGtCQWhCVSw4QkFnQlNELElBaEJULEVBZ0JlO0FBQ3JCLDRCQUFpQkEsSUFBakI7QUFDSCxHQWxCUztBQW1CVkUsRUFBQUEsd0JBbkJVLG9DQW1CZUYsSUFuQmYsRUFtQnFCO0FBQzNCLGdDQUFxQkEsSUFBckI7QUFDSCxHQXJCUztBQXNCVkcsRUFBQUEsd0JBdEJVLG9DQXNCZUMsRUF0QmYsRUFzQm1CO0FBQ3pCLGdDQUFxQkEsRUFBckI7QUFDSCxHQXhCUztBQXlCVkMsRUFBQUEsb0JBekJVLGdDQXlCV0QsRUF6QlgsRUF5QmU7QUFDckIsNEJBQWlCQSxFQUFqQjtBQUNILEdBM0JTO0FBNEJWRSxFQUFBQSxrQkE1QlUsOEJBNEJTTixJQTVCVCxFQTRCZTtBQUNyQixrQ0FBdUJBLElBQUksQ0FBQ08sR0FBNUI7QUFDSCxHQTlCUztBQStCVkMsRUFBQUEsV0EvQlUsdUJBK0JFQyxPQS9CRixFQStCVztBQUNqQix3Q0FBNkJBLE9BQTdCO0FBQ0gsR0FqQ1M7QUFrQ1ZDLEVBQUFBLGFBbENVLHlCQWtDSUMsR0FsQ0osRUFrQ1M7QUFDZixxQ0FBMEJBLEdBQTFCO0FBQ0gsR0FwQ1M7QUFxQ1ZDLEVBQUFBLEtBQUssaWxDQXJDSztBQTZFVkMsRUFBQUEsWUE3RVUsMEJBNkVLO0FBQ1g7QUFDSCxHQS9FUztBQWdGVkMsRUFBQUEsZ0JBaEZVLDhCQWdGUztBQUNmO0FBQ0gsR0FsRlM7QUFtRlZDLEVBQUFBLFdBbkZVLHVCQW1GRU4sT0FuRkYsRUFtRlc7QUFDakIsbUNBQXdCQSxPQUF4QjtBQUNILEdBckZTO0FBc0ZWTyxFQUFBQSxvQkF0RlUsZ0NBc0ZXQyxJQXRGWCxFQXNGaUI7QUFDdkIsa0RBQXVDQSxJQUF2QztBQUNILEdBeEZTO0FBeUZWQyxFQUFBQSwwQkF6RlUsc0NBeUZpQkQsSUF6RmpCLEVBeUZ1QjtBQUM3Qiw0REFBaURBLElBQWpEO0FBQ0g7QUEzRlMsQ0FBZCIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHRleHRzID0ge1xuICAgIGFncmVlbWVudENvbmZpcm1hdGlvbjogYFxuVGhpcyBBZ3JlZW1lbnQgdGFrZXMgZWZmZWN0IHdoZW4geW91IGlucHV0IGEg4oCcWUVT4oCdIGFuZCBwcmVzcyBFbnRlciBcbm9yLCBpZiBlYXJsaWVyLCB3aGVuIHlvdSB1c2UgYW55IG9mIHRoZSBUT04gREVWIFNvZnR3YXJlOiBgLFxuICAgIGFncmVlbWVudFJlamVjdGVkOiAnXFxuXFxuTGljZW5zZSB0ZXJtcyB3ZXJlIG5vdCBhY2NlcHRlZC5cXG4nLFxuICAgIGFncmVlbWVudEFjY2VwdGVkOiAnXFxuXFxuTGljZW5zZSB0ZXJtcyB3ZXJlIGFjY2VwdGVkLlxcbicsXG4gICAgZG9ja2VyVmVyc2lvblJlcXVpcmVkOiBcIkRvY2tlciB2ZXJzaW9uIHJlcXVpcmVkIF4xN1wiLFxuICAgIG5vVG9uRGV2SW1hZ2VzOiAnVGhlcmUgYXJlIG5vIFRPTiBEZXYgSW1hZ2VzJyxcbiAgICBub1RvbkRldkNvbnRhaW5lcnM6ICdUaGVyZSBhcmUgbm8gVE9OIERldiBDb250YWluZXJzJyxcbiAgICBkb25lOiAnIERvbmUuJyxcbiAgICBhdmFpbGFibGVWZXJzaW9ucyhpbWFnZUZhbWlseSwgdmVyc2lvbnMpIHtcbiAgICAgICAgcmV0dXJuIGBBdmFpbGFibGUgdmVyc2lvbnMgWyR7aW1hZ2VGYW1pbHl9XTogJHt2ZXJzaW9uc31gO1xuICAgIH0sXG4gICAgY29udGFpbmVyRG9lc05vdEV4aXN0cyhuYW1lKSB7XG4gICAgICAgIHJldHVybiBgQ29udGFpbmVyIFske25hbWV9XSBkb2VzIG5vdCBleGlzdHMuIENyZWF0aW5nLi4uYDtcbiAgICB9LFxuICAgIGltYWdlRG9lc05vdEV4aXN0cyhuYW1lKSB7XG4gICAgICAgIHJldHVybiBgSW1hZ2UgWyR7bmFtZX1dIGlzIG1pc3NpbmcuIFB1bGxpbmcgKHBsZWFzZSB3YWl0KS4uLmA7XG4gICAgfSxcbiAgICBjb250YWluZXJDYW5Ob3RCZUNyZWF0ZWQobmFtZSkge1xuICAgICAgICByZXR1cm4gYENvbnRhaW5lciBbJHtuYW1lfV0gY2FuIG5vdCBiZSBjcmVhdGVkYDtcbiAgICB9LFxuICAgIGNvbnRhaW5lckhhdmVCZWVuUmVtb3ZlZChpZCkge1xuICAgICAgICByZXR1cm4gYENvbnRhaW5lciBbJHtpZH0gaGF2ZSBiZWVuIHJlbW92ZWQuYDtcbiAgICB9LFxuICAgIGltYWdlSGF2ZUJlZW5SZW1vdmVkKGlkKSB7XG4gICAgICAgIHJldHVybiBgSW1hZ2UgWyR7aWR9IGhhdmUgYmVlbiByZW1vdmVkLmA7XG4gICAgfSxcbiAgICBzb3VyY2VGaWxlTm90Rm91bmQobmFtZSkge1xuICAgICAgICByZXR1cm4gYFNvdXJjZSBmaWxlIFske25hbWUuc29sfV0gbm90IGZvdW5kLmA7XG4gICAgfSxcbiAgICB1c2FnZUhlYWRlcih2ZXJzaW9uKSB7XG4gICAgICAgIHJldHVybiBgVE9OIExhYnMgRGV2IFRvb2xzICR7dmVyc2lvbn1gO1xuICAgIH0sXG4gICAgaW52YWxpZE9wdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIGBJbnZhbGlkIG9wdGlvbjogJHthcmd9YDtcbiAgICB9LFxuICAgIHVzYWdlOiBgVXNlOiB0b25kZXYgY29tbWFuZCB7IGFyZ3VtZW50IC4uLiB9XG5cbkNvbW1hbmRzOlxuXG5zZXR1cCBbIC1wIDxudW1iZXI+IF1cbiAgICBMb29raW5nIGZvciBhIHJlcXVpcmVkIHByZXJlcXVpc2l0ZXMgYW5kIHNldHVwIHJlcXVpcmVkIFRPTiBMYWJzIERldiBUb29scy5cbiAgICBPcHRpb25zOlxuICAgIC0tcG9ydCA8bnVtYmVyPiBvciAtcCA8bnVtYmVyPlxuICAgICAgICBTZXQgbG9jYWwgcG9ydCBudW1iZXIgZm9yIGxvY2FsIG5vZGUuIERlZmF1bHQgaXMgODAuICAgICAgIFxuICAgIFxuc3RhcnRcbiAgICBTdGFydCBsb2NhbCBub2RlLlxuICAgICBcbnN0b3BcbiAgICBTdG9wIGFsbCBUT04gRGV2IGRvY2tlciBjb250YWluZXJzLlxuICAgICBcbmNsZWFuIFsgLWkgXSBbLWNdXG4gICAgUmVtb3ZlIGFsbCBUT04gRGV2IGRvY2tlciBjb250YWluZXJzIGFuZCBpbWFnZXMuXG4gICAgT3B0aW9ucyAoLWkgYW5kIC1jIGFyZSBtdXR1YWxseSBleGNsdXNpdmUpOlxuICAgIC0taW1hZ2VzIG9yIC1pXG4gICAgICAgIFJlbW92ZSBvbmx5IGltYWdlcy5cbiAgICAtLWNvbnRhaW5lcnMgb3IgLWNcbiAgICAgICAgUmVtb3ZlIG9ubHkgY29udGFpbmVycy5cbiAgICBcbmluZm9cbiAgICBTaG93IGN1cnJlbnQgc3RhdHVzIG9mIFRPTiBEZXYgaW1hZ2VzIGFuZCBjb250YWluZXJzLlxuXG51c2UgPHZlcnNpb24+XG4gICAgU2VsZWN0IHZlcnNpb24gZm9yIGxvY2FsLW5vZGUgYW5kIGNvbXBpbGVycy4gXG4gICAgICAgIFxuc29sIDxzb2xpZGl0eS1maWxlLXdpdGhvdXQtZXh0ZW5zaW9uPiBbIC1qcyBdXG4gICAgQnVpbGQgVE9OIGNvbnRyYWN0IGZyb20gc29saWRpdHkgc291cmNlIGNvZGUuXG4gICAgT3B0aW9uczpcbiAgICAtLWphdmFzY3JpcHQgb3IgLWpzXG4gICAgICAgIEdlbmVyYXRlIEphdmFTY3JpcHQgZmlsZSB3aXRoIGNvbnRyYWN0IHBhY2thZ2UgKGltYWdlQmFzZTY0IGFuZCBBQkkpLlxuICAgICAgICBcblxuQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG5MaWNlbnNlZCB1bmRlciB0aGUgU09GVFdBUkUgRVZBTFVBVElPTiBMaWNlbnNlIChodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzKVxuYCxcbiAgICB0b25EZXZJbWFnZXMoKSB7XG4gICAgICAgIHJldHVybiBgSW1hZ2VzOmA7XG4gICAgfSxcbiAgICB0b25EZXZDb250YWluZXJzKCkge1xuICAgICAgICByZXR1cm4gYENvbnRhaW5lcnM6YDtcbiAgICB9LFxuICAgIHVzZWRWZXJzaW9uKHZlcnNpb24pIHtcbiAgICAgICAgcmV0dXJuIGBVc2VkIHZlcnNpb246ICR7dmVyc2lvbn1gO1xuICAgIH0sXG4gICAgbG9jYWxOb2RlQm91bmRUb1BvcnQocG9ydCkge1xuICAgICAgICByZXR1cm4gYExvY2FsIE5vZGUgaXMgYm91bmQgdG8gcG9ydDogJHtwb3J0fWA7XG4gICAgfSxcbiAgICBsb2NhbE5vZGVBcmFuZ29Cb3VuZFRvUG9ydChwb3J0KSB7XG4gICAgICAgIHJldHVybiBgTG9jYWwgTm9kZSBBcmFuZ28gREIgaXMgYm91bmQgdG8gcG9ydDogJHtwb3J0fWA7XG4gICAgfVxufTtcblxuZXhwb3J0IHsgdGV4dHMgfTtcbiJdfQ==