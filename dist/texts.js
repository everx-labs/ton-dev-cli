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
    return "Source file [".concat(name.sol, "] not found.");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90ZXh0cy5qcyJdLCJuYW1lcyI6WyJ0ZXh0cyIsImFncmVlbWVudENvbmZpcm1hdGlvbiIsImFncmVlbWVudFJlamVjdGVkIiwiYWdyZWVtZW50QWNjZXB0ZWQiLCJkb2NrZXJWZXJzaW9uUmVxdWlyZWQiLCJub1RvbkRldkltYWdlcyIsIm5vVG9uRGV2Q29udGFpbmVycyIsImRvbmUiLCJuZXRzSGVhZGVyIiwiY29tcGlsZXJIZWFkZXIiLCJhdmFpbGFibGVWZXJzaW9ucyIsImNvbnRhaW5lckRvZXNOb3RFeGlzdHMiLCJuYW1lIiwiaW1hZ2VEb2VzTm90RXhpc3RzIiwiY29udGFpbmVyQ2FuTm90QmVDcmVhdGVkIiwiY29udGFpbmVySGF2ZUJlZW5SZW1vdmVkIiwiaWQiLCJpbWFnZUhhdmVCZWVuUmVtb3ZlZCIsInNvdXJjZUZpbGVOb3RGb3VuZCIsInNvbCIsInVzYWdlSGVhZGVyIiwidmVyc2lvbiIsImludmFsaWRPcHRpb24iLCJhcmciLCJ1c2FnZSIsInRvbkRldkltYWdlcyIsInRvbkRldkNvbnRhaW5lcnMiLCJuZXRIZWFkZXIiLCJ1c2VkVmVyc2lvbiIsIm5ldEhvc3RQb3J0IiwicG9ydCIsIm5ldEFyYW5nb0hvc3RQb3J0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFNQSxLQUFLLEdBQUc7QUFDVkMsRUFBQUEscUJBQXFCLCtJQURYO0FBSVZDLEVBQUFBLGlCQUFpQixFQUFFLHdDQUpUO0FBS1ZDLEVBQUFBLGlCQUFpQixFQUFFLG9DQUxUO0FBTVZDLEVBQUFBLHFCQUFxQixFQUFFLDZCQU5iO0FBT1ZDLEVBQUFBLGNBQWMsRUFBRSw2QkFQTjtBQVFWQyxFQUFBQSxrQkFBa0IsRUFBRSxpQ0FSVjtBQVNWQyxFQUFBQSxJQUFJLEVBQUUsUUFUSTtBQVVWQyxFQUFBQSxVQUFVLEVBQUUsYUFWRjtBQVdWQyxFQUFBQSxjQUFjLEVBQUUsWUFYTjtBQVlWQyxFQUFBQSxpQkFBaUIsRUFBRSxxQkFaVDtBQWFWQyxFQUFBQSxzQkFiVSxrQ0FhYUMsSUFiYixFQWFtQjtBQUN6QixnQ0FBcUJBLElBQXJCO0FBQ0gsR0FmUztBQWdCVkMsRUFBQUEsa0JBaEJVLDhCQWdCU0QsSUFoQlQsRUFnQmU7QUFDckIsNEJBQWlCQSxJQUFqQjtBQUNILEdBbEJTO0FBbUJWRSxFQUFBQSx3QkFuQlUsb0NBbUJlRixJQW5CZixFQW1CcUI7QUFDM0IsZ0NBQXFCQSxJQUFyQjtBQUNILEdBckJTO0FBc0JWRyxFQUFBQSx3QkF0QlUsb0NBc0JlQyxFQXRCZixFQXNCbUI7QUFDekIsZ0NBQXFCQSxFQUFyQjtBQUNILEdBeEJTO0FBeUJWQyxFQUFBQSxvQkF6QlUsZ0NBeUJXRCxFQXpCWCxFQXlCZTtBQUNyQiw0QkFBaUJBLEVBQWpCO0FBQ0gsR0EzQlM7QUE0QlZFLEVBQUFBLGtCQTVCVSw4QkE0QlNOLElBNUJULEVBNEJlO0FBQ3JCLGtDQUF1QkEsSUFBSSxDQUFDTyxHQUE1QjtBQUNILEdBOUJTO0FBK0JWQyxFQUFBQSxXQS9CVSx1QkErQkVDLE9BL0JGLEVBK0JXO0FBQ2pCLHdDQUE2QkEsT0FBN0I7QUFDSCxHQWpDUztBQWtDVkMsRUFBQUEsYUFsQ1UseUJBa0NJQyxHQWxDSixFQWtDUztBQUNmLHFDQUEwQkEsR0FBMUI7QUFDSCxHQXBDUztBQXFDVkMsRUFBQUEsS0FBSyxnaENBckNLO0FBMkRWQyxFQUFBQSxZQTNEVSwwQkEyREs7QUFDWDtBQUNILEdBN0RTO0FBOERWQyxFQUFBQSxnQkE5RFUsOEJBOERTO0FBQ2Y7QUFDSCxHQWhFUztBQWlFVkMsRUFBQUEsU0FqRVUscUJBaUVBZixJQWpFQSxFQWlFTTtBQUNaLHFCQUFVQSxJQUFWO0FBQ0gsR0FuRVM7QUFvRVZnQixFQUFBQSxXQXBFVSx1QkFvRUVQLE9BcEVGLEVBb0VXO0FBQ2pCLG9DQUF5QkEsT0FBekI7QUFDSCxHQXRFUztBQXVFVlEsRUFBQUEsV0F2RVUsdUJBdUVFQyxJQXZFRixFQXVFUTtBQUNkLDJDQUFnQ0EsSUFBaEM7QUFDSCxHQXpFUztBQTBFVkMsRUFBQUEsaUJBMUVVLDZCQTBFUUQsSUExRVIsRUEwRWM7QUFDcEIsd0RBQTZDQSxJQUE3QztBQUNIO0FBNUVTLENBQWQiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB0ZXh0cyA9IHtcbiAgICBhZ3JlZW1lbnRDb25maXJtYXRpb246IGBcblRoaXMgQWdyZWVtZW50IHRha2VzIGVmZmVjdCB3aGVuIHlvdSBpbnB1dCBhIOKAnFlFU+KAnSBhbmQgcHJlc3MgRW50ZXIgXG5vciwgaWYgZWFybGllciwgd2hlbiB5b3UgdXNlIGFueSBvZiB0aGUgVE9OIERFViBTb2Z0d2FyZTogYCxcbiAgICBhZ3JlZW1lbnRSZWplY3RlZDogJ1xcblxcbkxpY2Vuc2UgdGVybXMgd2VyZSBub3QgYWNjZXB0ZWQuXFxuJyxcbiAgICBhZ3JlZW1lbnRBY2NlcHRlZDogJ1xcblxcbkxpY2Vuc2UgdGVybXMgd2VyZSBhY2NlcHRlZC5cXG4nLFxuICAgIGRvY2tlclZlcnNpb25SZXF1aXJlZDogXCJEb2NrZXIgdmVyc2lvbiByZXF1aXJlZCBeMTdcIixcbiAgICBub1RvbkRldkltYWdlczogJ1RoZXJlIGFyZSBubyBUT04gRGV2IEltYWdlcycsXG4gICAgbm9Ub25EZXZDb250YWluZXJzOiAnVGhlcmUgYXJlIG5vIFRPTiBEZXYgQ29udGFpbmVycycsXG4gICAgZG9uZTogJyBEb25lLicsXG4gICAgbmV0c0hlYWRlcjogJ0xvY2FsIG5ldHM6JyxcbiAgICBjb21waWxlckhlYWRlcjogJ0NvbXBpbGVyczonLFxuICAgIGF2YWlsYWJsZVZlcnNpb25zOiAnQXZhaWxhYmxlIHZlcnNpb25zOicsXG4gICAgY29udGFpbmVyRG9lc05vdEV4aXN0cyhuYW1lKSB7XG4gICAgICAgIHJldHVybiBgQ29udGFpbmVyIFske25hbWV9XSBkb2VzIG5vdCBleGlzdHMuIENyZWF0aW5nLi4uYDtcbiAgICB9LFxuICAgIGltYWdlRG9lc05vdEV4aXN0cyhuYW1lKSB7XG4gICAgICAgIHJldHVybiBgSW1hZ2UgWyR7bmFtZX1dIGlzIG1pc3NpbmcuIFB1bGxpbmcgKHBsZWFzZSB3YWl0KS4uLmA7XG4gICAgfSxcbiAgICBjb250YWluZXJDYW5Ob3RCZUNyZWF0ZWQobmFtZSkge1xuICAgICAgICByZXR1cm4gYENvbnRhaW5lciBbJHtuYW1lfV0gY2FuIG5vdCBiZSBjcmVhdGVkYDtcbiAgICB9LFxuICAgIGNvbnRhaW5lckhhdmVCZWVuUmVtb3ZlZChpZCkge1xuICAgICAgICByZXR1cm4gYENvbnRhaW5lciBbJHtpZH0gaGF2ZSBiZWVuIHJlbW92ZWQuYDtcbiAgICB9LFxuICAgIGltYWdlSGF2ZUJlZW5SZW1vdmVkKGlkKSB7XG4gICAgICAgIHJldHVybiBgSW1hZ2UgWyR7aWR9IGhhdmUgYmVlbiByZW1vdmVkLmA7XG4gICAgfSxcbiAgICBzb3VyY2VGaWxlTm90Rm91bmQobmFtZSkge1xuICAgICAgICByZXR1cm4gYFNvdXJjZSBmaWxlIFske25hbWUuc29sfV0gbm90IGZvdW5kLmA7XG4gICAgfSxcbiAgICB1c2FnZUhlYWRlcih2ZXJzaW9uKSB7XG4gICAgICAgIHJldHVybiBgVE9OIExhYnMgRGV2IFRvb2xzICR7dmVyc2lvbn1gO1xuICAgIH0sXG4gICAgaW52YWxpZE9wdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIGBJbnZhbGlkIG9wdGlvbjogJHthcmd9YDtcbiAgICB9LFxuICAgIHVzYWdlOiBgdXNhZ2U6IHRvbmRldiBjb21tYW5kIHsgYXJndW1lbnQgLi4uIH1cblxuT3B0aW9uczpcbiAgLXAsIC0tcG9ydCA8bnVtYmVyPiAgIFNldCBsb2NhbCBwb3J0IG51bWJlciBmb3IgbG9jYWwgbmV0XG4gIC1uLCAtLW5ldCA8bmFtZT4gICAgICBTZXQgbG9jYWwgbmV0IG5hbWUgdG8gd2hpY2ggY29tbWFuZCBhcHBsaWVkLCBjYW4gYmUgc3BlY2lmaWVkIG11bHRpcGxlIHRpbWVzXG4gIC1pLCAtLWltYWdlcyAgICAgICAgICBBcHBseSBjb21tYW5kIG9ubHkgdG8gZG9ja2VyIGltYWdlc1xuICAtYywgLS1jb250YWluZXJzICAgICAgQXBwbHkgY29tbWFuZCBvbmx5IHRvIGRvY2tlciBjb250YWluZXJzXG4gIC1qcywgLS1KYXZhU2NyaXB0ICAgICBHZW5lcmF0ZSBhZGRpdGlvbmFsIEphdmFTY3JpcHQgY29kZVxuICBcbiAgIFxuQ29tbWFuZHM6XG4gIHNvbCA8ZmlsZXM+ICAgQnVpbGQgVE9OIGNvbnRyYWN0IGZyb20gc29saWRpdHkgc291cmNlIGNvZGVcbiAgc3RhcnQgICAgICAgICBTdGFydCBsb2NhbCBuZXQgKGlmIG5ldCBuYW1lIGRvZXMgbm90IHNwZWNpZmllZCB0aGUgYWxsIG5ldHMgd2lsbCBiZSBzdGFydGVkKVxuICBzdG9wICAgICAgICAgIFN0b3AgY29tcGlsZXJzIGFuZCBhbGwgbmV0cyAgICBcbiAgaW5mbyAgICAgICAgICBTaG93IGN1cnJlbnQgc3RhdHVzIG9mIGNvbXBpbGVycyBhbmQgbmV0c1xuICBzZXR1cCAgICAgICAgIExvb2tpbmcgZm9yIGEgcmVxdWlyZWQgcHJlcmVxdWlzaXRlcyBhbmQgc2V0dXAgcmVxdWlyZWQgYWRkaXRpb25hbCBjb21wb25lbnRzXG4gIGNsZWFuICAgICAgICAgUmVtb3ZlIGFsbCBUT04gRGV2IGRvY2tlciBjb250YWluZXJzIGFuZCBpbWFnZXNcbiAgdXNlIDx2ZXJzaW9uPiBTZWxlY3QgdmVyc2lvbiBmb3IgY29tcGlsZXJzIGFuZCBuZXRzIFxuICAgICAgICBcbkNvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAoaHR0cHM6Ly93d3cudG9uLmRldi9saWNlbnNlcylcbmAsXG4gICAgdG9uRGV2SW1hZ2VzKCkge1xuICAgICAgICByZXR1cm4gYEltYWdlczpgO1xuICAgIH0sXG4gICAgdG9uRGV2Q29udGFpbmVycygpIHtcbiAgICAgICAgcmV0dXJuIGBDb250YWluZXJzOmA7XG4gICAgfSxcbiAgICBuZXRIZWFkZXIobmFtZSkge1xuICAgICAgICByZXR1cm4gYCR7bmFtZX0gbmV0OmA7XG4gICAgfSxcbiAgICB1c2VkVmVyc2lvbih2ZXJzaW9uKSB7XG4gICAgICAgIHJldHVybiBgICBVc2UgdmVyc2lvbjogJHt2ZXJzaW9ufWA7XG4gICAgfSxcbiAgICBuZXRIb3N0UG9ydChwb3J0KSB7XG4gICAgICAgIHJldHVybiBgICBCb3VuZCB0byBob3N0IHBvcnQ6ICR7cG9ydH1gO1xuICAgIH0sXG4gICAgbmV0QXJhbmdvSG9zdFBvcnQocG9ydCkge1xuICAgICAgICByZXR1cm4gYCAgQXJhbmdvIERCIGlzIGJvdW5kIHRvIGhvc3QgcG9ydDogJHtwb3J0fWA7XG4gICAgfSxcbn07XG5cbmV4cG9ydCB7IHRleHRzIH07XG4iXX0=