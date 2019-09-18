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
  availableVersions: function availableVersions(versions) {
    return "Available versions: ".concat(versions);
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
  }
};
exports.texts = texts;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90ZXh0cy5qcyJdLCJuYW1lcyI6WyJ0ZXh0cyIsImFncmVlbWVudENvbmZpcm1hdGlvbiIsImFncmVlbWVudFJlamVjdGVkIiwiYWdyZWVtZW50QWNjZXB0ZWQiLCJkb2NrZXJWZXJzaW9uUmVxdWlyZWQiLCJub1RvbkRldkltYWdlcyIsIm5vVG9uRGV2Q29udGFpbmVycyIsImRvbmUiLCJhdmFpbGFibGVWZXJzaW9ucyIsInZlcnNpb25zIiwiY29udGFpbmVyRG9lc05vdEV4aXN0cyIsIm5hbWUiLCJpbWFnZURvZXNOb3RFeGlzdHMiLCJjb250YWluZXJDYW5Ob3RCZUNyZWF0ZWQiLCJjb250YWluZXJIYXZlQmVlblJlbW92ZWQiLCJpZCIsImltYWdlSGF2ZUJlZW5SZW1vdmVkIiwic291cmNlRmlsZU5vdEZvdW5kIiwic29sIiwidXNhZ2VIZWFkZXIiLCJ2ZXJzaW9uIiwiaW52YWxpZE9wdGlvbiIsImFyZyIsInVzYWdlIiwidG9uRGV2SW1hZ2VzIiwidG9uRGV2Q29udGFpbmVycyIsInVzZWRWZXJzaW9uIiwibG9jYWxOb2RlQm91bmRUb1BvcnQiLCJwb3J0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFNQSxLQUFLLEdBQUc7QUFDVkMsRUFBQUEscUJBQXFCLCtJQURYO0FBSVZDLEVBQUFBLGlCQUFpQixFQUFFLHdDQUpUO0FBS1ZDLEVBQUFBLGlCQUFpQixFQUFFLG9DQUxUO0FBTVZDLEVBQUFBLHFCQUFxQixFQUFFLDZCQU5iO0FBT1ZDLEVBQUFBLGNBQWMsRUFBRSw2QkFQTjtBQVFWQyxFQUFBQSxrQkFBa0IsRUFBRSxpQ0FSVjtBQVNWQyxFQUFBQSxJQUFJLEVBQUUsUUFUSTtBQVVWQyxFQUFBQSxpQkFWVSw2QkFVUUMsUUFWUixFQVVrQjtBQUN4Qix5Q0FBOEJBLFFBQTlCO0FBQ0gsR0FaUztBQWFWQyxFQUFBQSxzQkFiVSxrQ0FhYUMsSUFiYixFQWFtQjtBQUN6QixnQ0FBcUJBLElBQXJCO0FBQ0gsR0FmUztBQWdCVkMsRUFBQUEsa0JBaEJVLDhCQWdCU0QsSUFoQlQsRUFnQmU7QUFDckIsNEJBQWlCQSxJQUFqQjtBQUNILEdBbEJTO0FBbUJWRSxFQUFBQSx3QkFuQlUsb0NBbUJlRixJQW5CZixFQW1CcUI7QUFDM0IsZ0NBQXFCQSxJQUFyQjtBQUNILEdBckJTO0FBc0JWRyxFQUFBQSx3QkF0QlUsb0NBc0JlQyxFQXRCZixFQXNCbUI7QUFDekIsZ0NBQXFCQSxFQUFyQjtBQUNILEdBeEJTO0FBeUJWQyxFQUFBQSxvQkF6QlUsZ0NBeUJXRCxFQXpCWCxFQXlCZTtBQUNyQiw0QkFBaUJBLEVBQWpCO0FBQ0gsR0EzQlM7QUE0QlZFLEVBQUFBLGtCQTVCVSw4QkE0QlNOLElBNUJULEVBNEJlO0FBQ3JCLGtDQUF1QkEsSUFBSSxDQUFDTyxHQUE1QjtBQUNILEdBOUJTO0FBK0JWQyxFQUFBQSxXQS9CVSx1QkErQkVDLE9BL0JGLEVBK0JXO0FBQ2pCLHdDQUE2QkEsT0FBN0I7QUFDSCxHQWpDUztBQWtDVkMsRUFBQUEsYUFsQ1UseUJBa0NJQyxHQWxDSixFQWtDUztBQUNmLHFDQUEwQkEsR0FBMUI7QUFDSCxHQXBDUztBQXFDVkMsRUFBQUEsS0FBSyxpbENBckNLO0FBNkVWQyxFQUFBQSxZQTdFVSwwQkE2RUs7QUFDWDtBQUNILEdBL0VTO0FBZ0ZWQyxFQUFBQSxnQkFoRlUsOEJBZ0ZTO0FBQ2Y7QUFDSCxHQWxGUztBQW1GVkMsRUFBQUEsV0FuRlUsdUJBbUZFTixPQW5GRixFQW1GVztBQUNqQixtQ0FBd0JBLE9BQXhCO0FBQ0gsR0FyRlM7QUFzRlZPLEVBQUFBLG9CQXRGVSxnQ0FzRldDLElBdEZYLEVBc0ZpQjtBQUN2QixrREFBdUNBLElBQXZDO0FBQ0g7QUF4RlMsQ0FBZCIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHRleHRzID0ge1xuICAgIGFncmVlbWVudENvbmZpcm1hdGlvbjogYFxuVGhpcyBBZ3JlZW1lbnQgdGFrZXMgZWZmZWN0IHdoZW4geW91IGlucHV0IGEg4oCcWUVT4oCdIGFuZCBwcmVzcyBFbnRlciBcbm9yLCBpZiBlYXJsaWVyLCB3aGVuIHlvdSB1c2UgYW55IG9mIHRoZSBUT04gREVWIFNvZnR3YXJlOiBgLFxuICAgIGFncmVlbWVudFJlamVjdGVkOiAnXFxuXFxuTGljZW5zZSB0ZXJtcyB3ZXJlIG5vdCBhY2NlcHRlZC5cXG4nLFxuICAgIGFncmVlbWVudEFjY2VwdGVkOiAnXFxuXFxuTGljZW5zZSB0ZXJtcyB3ZXJlIGFjY2VwdGVkLlxcbicsXG4gICAgZG9ja2VyVmVyc2lvblJlcXVpcmVkOiBcIkRvY2tlciB2ZXJzaW9uIHJlcXVpcmVkIF4xN1wiLFxuICAgIG5vVG9uRGV2SW1hZ2VzOiAnVGhlcmUgYXJlIG5vIFRPTiBEZXYgSW1hZ2VzJyxcbiAgICBub1RvbkRldkNvbnRhaW5lcnM6ICdUaGVyZSBhcmUgbm8gVE9OIERldiBDb250YWluZXJzJyxcbiAgICBkb25lOiAnIERvbmUuJyxcbiAgICBhdmFpbGFibGVWZXJzaW9ucyh2ZXJzaW9ucykge1xuICAgICAgICByZXR1cm4gYEF2YWlsYWJsZSB2ZXJzaW9uczogJHt2ZXJzaW9uc31gO1xuICAgIH0sXG4gICAgY29udGFpbmVyRG9lc05vdEV4aXN0cyhuYW1lKSB7XG4gICAgICAgIHJldHVybiBgQ29udGFpbmVyIFske25hbWV9XSBkb2VzIG5vdCBleGlzdHMuIENyZWF0aW5nLi4uYDtcbiAgICB9LFxuICAgIGltYWdlRG9lc05vdEV4aXN0cyhuYW1lKSB7XG4gICAgICAgIHJldHVybiBgSW1hZ2UgWyR7bmFtZX1dIGlzIG1pc3NpbmcuIFB1bGxpbmcgKHBsZWFzZSB3YWl0KS4uLmA7XG4gICAgfSxcbiAgICBjb250YWluZXJDYW5Ob3RCZUNyZWF0ZWQobmFtZSkge1xuICAgICAgICByZXR1cm4gYENvbnRhaW5lciBbJHtuYW1lfV0gY2FuIG5vdCBiZSBjcmVhdGVkYDtcbiAgICB9LFxuICAgIGNvbnRhaW5lckhhdmVCZWVuUmVtb3ZlZChpZCkge1xuICAgICAgICByZXR1cm4gYENvbnRhaW5lciBbJHtpZH0gaGF2ZSBiZWVuIHJlbW92ZWQuYDtcbiAgICB9LFxuICAgIGltYWdlSGF2ZUJlZW5SZW1vdmVkKGlkKSB7XG4gICAgICAgIHJldHVybiBgSW1hZ2UgWyR7aWR9IGhhdmUgYmVlbiByZW1vdmVkLmA7XG4gICAgfSxcbiAgICBzb3VyY2VGaWxlTm90Rm91bmQobmFtZSkge1xuICAgICAgICByZXR1cm4gYFNvdXJjZSBmaWxlIFske25hbWUuc29sfV0gbm90IGZvdW5kLmA7XG4gICAgfSxcbiAgICB1c2FnZUhlYWRlcih2ZXJzaW9uKSB7XG4gICAgICAgIHJldHVybiBgVE9OIExhYnMgRGV2IFRvb2xzICR7dmVyc2lvbn1gO1xuICAgIH0sXG4gICAgaW52YWxpZE9wdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIGBJbnZhbGlkIG9wdGlvbjogJHthcmd9YDtcbiAgICB9LFxuICAgIHVzYWdlOiBgVXNlOiB0b25kZXYgY29tbWFuZCB7IGFyZ3VtZW50IC4uLiB9XG5cbkNvbW1hbmRzOlxuXG5zZXR1cCBbIC1wIDxudW1iZXI+IF1cbiAgICBMb29raW5nIGZvciBhIHJlcXVpcmVkIHByZXJlcXVpc2l0ZXMgYW5kIHNldHVwIHJlcXVpcmVkIFRPTiBMYWJzIERldiBUb29scy5cbiAgICBPcHRpb25zOlxuICAgIC0tcG9ydCA8bnVtYmVyPiBvciAtcCA8bnVtYmVyPlxuICAgICAgICBTZXQgbG9jYWwgcG9ydCBudW1iZXIgZm9yIGxvY2FsIG5vZGUuIERlZmF1bHQgaXMgODAuICAgICAgIFxuICAgIFxuc3RhcnRcbiAgICBTdGFydCBsb2NhbCBub2RlLlxuICAgICBcbnN0b3BcbiAgICBTdG9wIGFsbCBUT04gRGV2IGRvY2tlciBjb250YWluZXJzLlxuICAgICBcbmNsZWFuIFsgLWkgXSBbLWNdXG4gICAgUmVtb3ZlIGFsbCBUT04gRGV2IGRvY2tlciBjb250YWluZXJzIGFuZCBpbWFnZXMuXG4gICAgT3B0aW9ucyAoLWkgYW5kIC1jIGFyZSBtdXR1YWxseSBleGNsdXNpdmUpOlxuICAgIC0taW1hZ2VzIG9yIC1pXG4gICAgICAgIFJlbW92ZSBvbmx5IGltYWdlcy5cbiAgICAtLWNvbnRhaW5lcnMgb3IgLWNcbiAgICAgICAgUmVtb3ZlIG9ubHkgY29udGFpbmVycy5cbiAgICBcbmluZm9cbiAgICBTaG93IGN1cnJlbnQgc3RhdHVzIG9mIFRPTiBEZXYgaW1hZ2VzIGFuZCBjb250YWluZXJzLlxuXG51c2UgPHZlcnNpb24+XG4gICAgU2VsZWN0IHZlcnNpb24gZm9yIGxvY2FsLW5vZGUgYW5kIGNvbXBpbGVycy4gXG4gICAgICAgIFxuc29sIDxzb2xpZGl0eS1maWxlLXdpdGhvdXQtZXh0ZW5zaW9uPiBbIC1qcyBdXG4gICAgQnVpbGQgVE9OIGNvbnRyYWN0IGZyb20gc29saWRpdHkgc291cmNlIGNvZGUuXG4gICAgT3B0aW9uczpcbiAgICAtLWphdmFzY3JpcHQgb3IgLWpzXG4gICAgICAgIEdlbmVyYXRlIEphdmFTY3JpcHQgZmlsZSB3aXRoIGNvbnRyYWN0IHBhY2thZ2UgKGltYWdlQmFzZTY0IGFuZCBBQkkpLlxuICAgICAgICBcblxuQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG5MaWNlbnNlZCB1bmRlciB0aGUgU09GVFdBUkUgRVZBTFVBVElPTiBMaWNlbnNlIChodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzKVxuYCxcbiAgICB0b25EZXZJbWFnZXMoKSB7XG4gICAgICAgIHJldHVybiBgSW1hZ2VzOmA7XG4gICAgfSxcbiAgICB0b25EZXZDb250YWluZXJzKCkge1xuICAgICAgICByZXR1cm4gYENvbnRhaW5lcnM6YDtcbiAgICB9LFxuICAgIHVzZWRWZXJzaW9uKHZlcnNpb24pIHtcbiAgICAgICAgcmV0dXJuIGBVc2VkIHZlcnNpb246ICR7dmVyc2lvbn1gO1xuICAgIH0sXG4gICAgbG9jYWxOb2RlQm91bmRUb1BvcnQocG9ydCkge1xuICAgICAgICByZXR1cm4gYExvY2FsIE5vZGUgaXMgYm91bmQgdG8gcG9ydDogJHtwb3J0fWA7XG4gICAgfVxufTtcblxuZXhwb3J0IHsgdGV4dHMgfTtcbiJdfQ==