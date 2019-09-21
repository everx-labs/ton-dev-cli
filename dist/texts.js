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
  netsHeader: 'Local nets:',
  compilerHeader: 'Compilers:',
  availableVersions: 'Available versions:',
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
    return "Source file [".concat(name, "] not found.");
  },
  usageHeader: function usageHeader(version) {
    return "TON Labs Dev Tools ".concat(version);
  },
  invalidOption: function invalidOption(arg) {
    return "Invalid option: ".concat(arg);
  },
  usage: "usage: tondev command { argument ... }\n\nOptions:\n  -p, --port <number>   Set local port number for local net\n  -n, --net <name>      Set local net name to which command applied, can be specified multiple times\n  -i, --images          Apply command only to docker images\n  -c, --containers      Apply command only to docker containers\n  -js, --JavaScript     Generate additional JavaScript code\n  \n   \nCommands:\n  sol <files>   Build TON contract from solidity source code\n  start         Start local net (if net name does not specified the all nets will be started)\n  stop          Stop compilers and all nets    \n  info          Show current status of compilers and nets\n  setup         Looking for a required prerequisites and setup required additional components\n  clean         Remove all TON Dev docker containers and images\n  use <version> Select version for compilers and nets \n        \nCopyright 2018-2019 TON DEV SOLUTIONS LTD.\nLicensed under the SOFTWARE EVALUATION License (https://www.ton.dev/licenses)\n",
  tonDevImages: function tonDevImages() {
    return "Images:";
  },
  tonDevContainers: function tonDevContainers() {
    return "Containers:";
  },
  netHeader: function netHeader(name) {
    return "".concat(name, " net:");
  },
  usedVersion: function usedVersion(version) {
    return "  Use version: ".concat(version);
  },
  netHostPort: function netHostPort(port) {
    return "  Bound to host port: ".concat(port);
  },
  netArangoHostPort: function netArangoHostPort(port) {
    return "  Arango DB is bound to host port: ".concat(port);
  }
};
exports.texts = texts;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90ZXh0cy5qcyJdLCJuYW1lcyI6WyJ0ZXh0cyIsImFncmVlbWVudENvbmZpcm1hdGlvbiIsImFncmVlbWVudFJlamVjdGVkIiwiYWdyZWVtZW50QWNjZXB0ZWQiLCJkb2NrZXJWZXJzaW9uUmVxdWlyZWQiLCJub1RvbkRldkltYWdlcyIsIm5vVG9uRGV2Q29udGFpbmVycyIsImRvbmUiLCJuZXRzSGVhZGVyIiwiY29tcGlsZXJIZWFkZXIiLCJhdmFpbGFibGVWZXJzaW9ucyIsImNvbnRhaW5lckRvZXNOb3RFeGlzdHMiLCJuYW1lIiwiaW1hZ2VEb2VzTm90RXhpc3RzIiwiY29udGFpbmVyQ2FuTm90QmVDcmVhdGVkIiwiY29udGFpbmVySGF2ZUJlZW5SZW1vdmVkIiwiaWQiLCJpbWFnZUhhdmVCZWVuUmVtb3ZlZCIsInNvdXJjZUZpbGVOb3RGb3VuZCIsInVzYWdlSGVhZGVyIiwidmVyc2lvbiIsImludmFsaWRPcHRpb24iLCJhcmciLCJ1c2FnZSIsInRvbkRldkltYWdlcyIsInRvbkRldkNvbnRhaW5lcnMiLCJuZXRIZWFkZXIiLCJ1c2VkVmVyc2lvbiIsIm5ldEhvc3RQb3J0IiwicG9ydCIsIm5ldEFyYW5nb0hvc3RQb3J0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFNQSxLQUFLLEdBQUc7QUFDVkMsRUFBQUEscUJBQXFCLCtJQURYO0FBSVZDLEVBQUFBLGlCQUFpQixFQUFFLHdDQUpUO0FBS1ZDLEVBQUFBLGlCQUFpQixFQUFFLG9DQUxUO0FBTVZDLEVBQUFBLHFCQUFxQixFQUFFLDZCQU5iO0FBT1ZDLEVBQUFBLGNBQWMsRUFBRSw2QkFQTjtBQVFWQyxFQUFBQSxrQkFBa0IsRUFBRSxpQ0FSVjtBQVNWQyxFQUFBQSxJQUFJLEVBQUUsUUFUSTtBQVVWQyxFQUFBQSxVQUFVLEVBQUUsYUFWRjtBQVdWQyxFQUFBQSxjQUFjLEVBQUUsWUFYTjtBQVlWQyxFQUFBQSxpQkFBaUIsRUFBRSxxQkFaVDtBQWFWQyxFQUFBQSxzQkFiVSxrQ0FhYUMsSUFiYixFQWFtQjtBQUN6QixnQ0FBcUJBLElBQXJCO0FBQ0gsR0FmUztBQWdCVkMsRUFBQUEsa0JBaEJVLDhCQWdCU0QsSUFoQlQsRUFnQmU7QUFDckIsNEJBQWlCQSxJQUFqQjtBQUNILEdBbEJTO0FBbUJWRSxFQUFBQSx3QkFuQlUsb0NBbUJlRixJQW5CZixFQW1CcUI7QUFDM0IsZ0NBQXFCQSxJQUFyQjtBQUNILEdBckJTO0FBc0JWRyxFQUFBQSx3QkF0QlUsb0NBc0JlQyxFQXRCZixFQXNCbUI7QUFDekIsZ0NBQXFCQSxFQUFyQjtBQUNILEdBeEJTO0FBeUJWQyxFQUFBQSxvQkF6QlUsZ0NBeUJXRCxFQXpCWCxFQXlCZTtBQUNyQiw0QkFBaUJBLEVBQWpCO0FBQ0gsR0EzQlM7QUE0QlZFLEVBQUFBLGtCQTVCVSw4QkE0QlNOLElBNUJULEVBNEJlO0FBQ3JCLGtDQUF1QkEsSUFBdkI7QUFDSCxHQTlCUztBQStCVk8sRUFBQUEsV0EvQlUsdUJBK0JFQyxPQS9CRixFQStCVztBQUNqQix3Q0FBNkJBLE9BQTdCO0FBQ0gsR0FqQ1M7QUFrQ1ZDLEVBQUFBLGFBbENVLHlCQWtDSUMsR0FsQ0osRUFrQ1M7QUFDZixxQ0FBMEJBLEdBQTFCO0FBQ0gsR0FwQ1M7QUFxQ1ZDLEVBQUFBLEtBQUssZ2hDQXJDSztBQTJEVkMsRUFBQUEsWUEzRFUsMEJBMkRLO0FBQ1g7QUFDSCxHQTdEUztBQThEVkMsRUFBQUEsZ0JBOURVLDhCQThEUztBQUNmO0FBQ0gsR0FoRVM7QUFpRVZDLEVBQUFBLFNBakVVLHFCQWlFQWQsSUFqRUEsRUFpRU07QUFDWixxQkFBVUEsSUFBVjtBQUNILEdBbkVTO0FBb0VWZSxFQUFBQSxXQXBFVSx1QkFvRUVQLE9BcEVGLEVBb0VXO0FBQ2pCLG9DQUF5QkEsT0FBekI7QUFDSCxHQXRFUztBQXVFVlEsRUFBQUEsV0F2RVUsdUJBdUVFQyxJQXZFRixFQXVFUTtBQUNkLDJDQUFnQ0EsSUFBaEM7QUFDSCxHQXpFUztBQTBFVkMsRUFBQUEsaUJBMUVVLDZCQTBFUUQsSUExRVIsRUEwRWM7QUFDcEIsd0RBQTZDQSxJQUE3QztBQUNIO0FBNUVTLENBQWQiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB0ZXh0cyA9IHtcbiAgICBhZ3JlZW1lbnRDb25maXJtYXRpb246IGBcblRoaXMgQWdyZWVtZW50IHRha2VzIGVmZmVjdCB3aGVuIHlvdSBpbnB1dCBhIOKAnFlFU+KAnSBhbmQgcHJlc3MgRW50ZXIgXG5vciwgaWYgZWFybGllciwgd2hlbiB5b3UgdXNlIGFueSBvZiB0aGUgVE9OIERFViBTb2Z0d2FyZTogYCxcbiAgICBhZ3JlZW1lbnRSZWplY3RlZDogJ1xcblxcbkxpY2Vuc2UgdGVybXMgd2VyZSBub3QgYWNjZXB0ZWQuXFxuJyxcbiAgICBhZ3JlZW1lbnRBY2NlcHRlZDogJ1xcblxcbkxpY2Vuc2UgdGVybXMgd2VyZSBhY2NlcHRlZC5cXG4nLFxuICAgIGRvY2tlclZlcnNpb25SZXF1aXJlZDogXCJEb2NrZXIgdmVyc2lvbiByZXF1aXJlZCBeMTdcIixcbiAgICBub1RvbkRldkltYWdlczogJ1RoZXJlIGFyZSBubyBUT04gRGV2IEltYWdlcycsXG4gICAgbm9Ub25EZXZDb250YWluZXJzOiAnVGhlcmUgYXJlIG5vIFRPTiBEZXYgQ29udGFpbmVycycsXG4gICAgZG9uZTogJyBEb25lLicsXG4gICAgbmV0c0hlYWRlcjogJ0xvY2FsIG5ldHM6JyxcbiAgICBjb21waWxlckhlYWRlcjogJ0NvbXBpbGVyczonLFxuICAgIGF2YWlsYWJsZVZlcnNpb25zOiAnQXZhaWxhYmxlIHZlcnNpb25zOicsXG4gICAgY29udGFpbmVyRG9lc05vdEV4aXN0cyhuYW1lKSB7XG4gICAgICAgIHJldHVybiBgQ29udGFpbmVyIFske25hbWV9XSBkb2VzIG5vdCBleGlzdHMuIENyZWF0aW5nLi4uYDtcbiAgICB9LFxuICAgIGltYWdlRG9lc05vdEV4aXN0cyhuYW1lKSB7XG4gICAgICAgIHJldHVybiBgSW1hZ2UgWyR7bmFtZX1dIGlzIG1pc3NpbmcuIFB1bGxpbmcgKHBsZWFzZSB3YWl0KS4uLmA7XG4gICAgfSxcbiAgICBjb250YWluZXJDYW5Ob3RCZUNyZWF0ZWQobmFtZSkge1xuICAgICAgICByZXR1cm4gYENvbnRhaW5lciBbJHtuYW1lfV0gY2FuIG5vdCBiZSBjcmVhdGVkYDtcbiAgICB9LFxuICAgIGNvbnRhaW5lckhhdmVCZWVuUmVtb3ZlZChpZCkge1xuICAgICAgICByZXR1cm4gYENvbnRhaW5lciBbJHtpZH0gaGF2ZSBiZWVuIHJlbW92ZWQuYDtcbiAgICB9LFxuICAgIGltYWdlSGF2ZUJlZW5SZW1vdmVkKGlkKSB7XG4gICAgICAgIHJldHVybiBgSW1hZ2UgWyR7aWR9IGhhdmUgYmVlbiByZW1vdmVkLmA7XG4gICAgfSxcbiAgICBzb3VyY2VGaWxlTm90Rm91bmQobmFtZSkge1xuICAgICAgICByZXR1cm4gYFNvdXJjZSBmaWxlIFske25hbWV9XSBub3QgZm91bmQuYDtcbiAgICB9LFxuICAgIHVzYWdlSGVhZGVyKHZlcnNpb24pIHtcbiAgICAgICAgcmV0dXJuIGBUT04gTGFicyBEZXYgVG9vbHMgJHt2ZXJzaW9ufWA7XG4gICAgfSxcbiAgICBpbnZhbGlkT3B0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gYEludmFsaWQgb3B0aW9uOiAke2FyZ31gO1xuICAgIH0sXG4gICAgdXNhZ2U6IGB1c2FnZTogdG9uZGV2IGNvbW1hbmQgeyBhcmd1bWVudCAuLi4gfVxuXG5PcHRpb25zOlxuICAtcCwgLS1wb3J0IDxudW1iZXI+ICAgU2V0IGxvY2FsIHBvcnQgbnVtYmVyIGZvciBsb2NhbCBuZXRcbiAgLW4sIC0tbmV0IDxuYW1lPiAgICAgIFNldCBsb2NhbCBuZXQgbmFtZSB0byB3aGljaCBjb21tYW5kIGFwcGxpZWQsIGNhbiBiZSBzcGVjaWZpZWQgbXVsdGlwbGUgdGltZXNcbiAgLWksIC0taW1hZ2VzICAgICAgICAgIEFwcGx5IGNvbW1hbmQgb25seSB0byBkb2NrZXIgaW1hZ2VzXG4gIC1jLCAtLWNvbnRhaW5lcnMgICAgICBBcHBseSBjb21tYW5kIG9ubHkgdG8gZG9ja2VyIGNvbnRhaW5lcnNcbiAgLWpzLCAtLUphdmFTY3JpcHQgICAgIEdlbmVyYXRlIGFkZGl0aW9uYWwgSmF2YVNjcmlwdCBjb2RlXG4gIFxuICAgXG5Db21tYW5kczpcbiAgc29sIDxmaWxlcz4gICBCdWlsZCBUT04gY29udHJhY3QgZnJvbSBzb2xpZGl0eSBzb3VyY2UgY29kZVxuICBzdGFydCAgICAgICAgIFN0YXJ0IGxvY2FsIG5ldCAoaWYgbmV0IG5hbWUgZG9lcyBub3Qgc3BlY2lmaWVkIHRoZSBhbGwgbmV0cyB3aWxsIGJlIHN0YXJ0ZWQpXG4gIHN0b3AgICAgICAgICAgU3RvcCBjb21waWxlcnMgYW5kIGFsbCBuZXRzICAgIFxuICBpbmZvICAgICAgICAgIFNob3cgY3VycmVudCBzdGF0dXMgb2YgY29tcGlsZXJzIGFuZCBuZXRzXG4gIHNldHVwICAgICAgICAgTG9va2luZyBmb3IgYSByZXF1aXJlZCBwcmVyZXF1aXNpdGVzIGFuZCBzZXR1cCByZXF1aXJlZCBhZGRpdGlvbmFsIGNvbXBvbmVudHNcbiAgY2xlYW4gICAgICAgICBSZW1vdmUgYWxsIFRPTiBEZXYgZG9ja2VyIGNvbnRhaW5lcnMgYW5kIGltYWdlc1xuICB1c2UgPHZlcnNpb24+IFNlbGVjdCB2ZXJzaW9uIGZvciBjb21waWxlcnMgYW5kIG5ldHMgXG4gICAgICAgIFxuQ29weXJpZ2h0IDIwMTgtMjAxOSBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG5MaWNlbnNlZCB1bmRlciB0aGUgU09GVFdBUkUgRVZBTFVBVElPTiBMaWNlbnNlIChodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzKVxuYCxcbiAgICB0b25EZXZJbWFnZXMoKSB7XG4gICAgICAgIHJldHVybiBgSW1hZ2VzOmA7XG4gICAgfSxcbiAgICB0b25EZXZDb250YWluZXJzKCkge1xuICAgICAgICByZXR1cm4gYENvbnRhaW5lcnM6YDtcbiAgICB9LFxuICAgIG5ldEhlYWRlcihuYW1lKSB7XG4gICAgICAgIHJldHVybiBgJHtuYW1lfSBuZXQ6YDtcbiAgICB9LFxuICAgIHVzZWRWZXJzaW9uKHZlcnNpb24pIHtcbiAgICAgICAgcmV0dXJuIGAgIFVzZSB2ZXJzaW9uOiAke3ZlcnNpb259YDtcbiAgICB9LFxuICAgIG5ldEhvc3RQb3J0KHBvcnQpIHtcbiAgICAgICAgcmV0dXJuIGAgIEJvdW5kIHRvIGhvc3QgcG9ydDogJHtwb3J0fWA7XG4gICAgfSxcbiAgICBuZXRBcmFuZ29Ib3N0UG9ydChwb3J0KSB7XG4gICAgICAgIHJldHVybiBgICBBcmFuZ28gREIgaXMgYm91bmQgdG8gaG9zdCBwb3J0OiAke3BvcnR9YDtcbiAgICB9LFxufTtcblxuZXhwb3J0IHsgdGV4dHMgfTtcbiJdfQ==