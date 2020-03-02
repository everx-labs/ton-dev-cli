"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.texts = void 0;
const texts = {
  agreementConfirmation: `
This Agreement takes effect when you input a “YES” and press Enter 
or, if earlier, when you use any of the TON DEV Software: `,
  agreementRejected: '\n\nLicense terms were not accepted.\n',
  agreementAccepted: '\n\nLicense terms were accepted.\n',
  dockerVersionRequired: "Docker version required ^17",
  noTonDevImages: 'There are no TON Dev Images',
  noTonDevContainers: 'There are no TON Dev Containers',
  done: ' Done.',
  netsHeader: 'Local nets:',
  compilerHeader: 'Compilers:',
  availableVersions: 'Available versions:',

  containerDoesNotExists(name) {
    return `Container [${name}] does not exists. Creating...`;
  },

  imageDoesNotExists(name) {
    return `Image [${name}] is missing. Pulling (please wait)...`;
  },

  containerCanNotBeCreated(name) {
    return `Container [${name}] can not be created`;
  },

  containerHaveBeenRemoved(id) {
    return `Container [${id} have been removed.`;
  },

  imageHaveBeenRemoved(id) {
    return `Image [${id} have been removed.`;
  },

  sourceFileNotFound(name) {
    return `Source file [${name}] not found.`;
  },

  usageHeader(version) {
    return `TON Labs Dev Tools ${version}`;
  },

  invalidOption(arg) {
    return `Invalid option: ${arg}`;
  },

  usage: `usage: tondev command { argument ... }

Options:
  -p, --port <number>   Set local port number for local net
  -n, --net <name>      Set local net name to which command applied, can be specified multiple times
  -i, --images          Apply command only to docker images
  -c, --containers      Apply command only to docker containers
  -js, --JavaScript     Generate additional JavaScript code
  
   
Commands:
  sol <files>   Build TON contract from solidity source code
  start         Start local net (if net name does not specified the all nets will be started)
  stop          Stop compilers and all nets    
  info          Show current status of compilers and nets
  setup         Looking for a required prerequisites and setup required additional components
  clean         Remove all TON Dev docker containers and images
  use <version> Select version for compilers and nets 
        
Copyright 2018-2020 TON DEV SOLUTIONS LTD.
Licensed under the SOFTWARE EVALUATION License (https://www.ton.dev/licenses)
`,

  tonDevImages() {
    return `Images:`;
  },

  tonDevContainers() {
    return `Containers:`;
  },

  netHeader(name) {
    return `${name} network/blockchain:`;
  },

  usedVersion(version) {
    return `  Used version: ${version}`;
  },

  netHostPort(port) {
    return `  Bound to host port: ${port}`;
  },

  netArangoHostPort(port) {
    return `  Arango DB is bound to host port: ${port}`;
  }

};
exports.texts = texts;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy90ZXh0cy5qcyJdLCJuYW1lcyI6WyJ0ZXh0cyIsImFncmVlbWVudENvbmZpcm1hdGlvbiIsImFncmVlbWVudFJlamVjdGVkIiwiYWdyZWVtZW50QWNjZXB0ZWQiLCJkb2NrZXJWZXJzaW9uUmVxdWlyZWQiLCJub1RvbkRldkltYWdlcyIsIm5vVG9uRGV2Q29udGFpbmVycyIsImRvbmUiLCJuZXRzSGVhZGVyIiwiY29tcGlsZXJIZWFkZXIiLCJhdmFpbGFibGVWZXJzaW9ucyIsImNvbnRhaW5lckRvZXNOb3RFeGlzdHMiLCJuYW1lIiwiaW1hZ2VEb2VzTm90RXhpc3RzIiwiY29udGFpbmVyQ2FuTm90QmVDcmVhdGVkIiwiY29udGFpbmVySGF2ZUJlZW5SZW1vdmVkIiwiaWQiLCJpbWFnZUhhdmVCZWVuUmVtb3ZlZCIsInNvdXJjZUZpbGVOb3RGb3VuZCIsInVzYWdlSGVhZGVyIiwidmVyc2lvbiIsImludmFsaWRPcHRpb24iLCJhcmciLCJ1c2FnZSIsInRvbkRldkltYWdlcyIsInRvbkRldkNvbnRhaW5lcnMiLCJuZXRIZWFkZXIiLCJ1c2VkVmVyc2lvbiIsIm5ldEhvc3RQb3J0IiwicG9ydCIsIm5ldEFyYW5nb0hvc3RQb3J0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxNQUFNQSxLQUFLLEdBQUc7QUFDVkMsRUFBQUEscUJBQXFCLEVBQUc7OzJEQURkO0FBSVZDLEVBQUFBLGlCQUFpQixFQUFFLHdDQUpUO0FBS1ZDLEVBQUFBLGlCQUFpQixFQUFFLG9DQUxUO0FBTVZDLEVBQUFBLHFCQUFxQixFQUFFLDZCQU5iO0FBT1ZDLEVBQUFBLGNBQWMsRUFBRSw2QkFQTjtBQVFWQyxFQUFBQSxrQkFBa0IsRUFBRSxpQ0FSVjtBQVNWQyxFQUFBQSxJQUFJLEVBQUUsUUFUSTtBQVVWQyxFQUFBQSxVQUFVLEVBQUUsYUFWRjtBQVdWQyxFQUFBQSxjQUFjLEVBQUUsWUFYTjtBQVlWQyxFQUFBQSxpQkFBaUIsRUFBRSxxQkFaVDs7QUFhVkMsRUFBQUEsc0JBQXNCLENBQUNDLElBQUQsRUFBTztBQUN6QixXQUFRLGNBQWFBLElBQUssZ0NBQTFCO0FBQ0gsR0FmUzs7QUFnQlZDLEVBQUFBLGtCQUFrQixDQUFDRCxJQUFELEVBQU87QUFDckIsV0FBUSxVQUFTQSxJQUFLLHdDQUF0QjtBQUNILEdBbEJTOztBQW1CVkUsRUFBQUEsd0JBQXdCLENBQUNGLElBQUQsRUFBTztBQUMzQixXQUFRLGNBQWFBLElBQUssc0JBQTFCO0FBQ0gsR0FyQlM7O0FBc0JWRyxFQUFBQSx3QkFBd0IsQ0FBQ0MsRUFBRCxFQUFLO0FBQ3pCLFdBQVEsY0FBYUEsRUFBRyxxQkFBeEI7QUFDSCxHQXhCUzs7QUF5QlZDLEVBQUFBLG9CQUFvQixDQUFDRCxFQUFELEVBQUs7QUFDckIsV0FBUSxVQUFTQSxFQUFHLHFCQUFwQjtBQUNILEdBM0JTOztBQTRCVkUsRUFBQUEsa0JBQWtCLENBQUNOLElBQUQsRUFBTztBQUNyQixXQUFRLGdCQUFlQSxJQUFLLGNBQTVCO0FBQ0gsR0E5QlM7O0FBK0JWTyxFQUFBQSxXQUFXLENBQUNDLE9BQUQsRUFBVTtBQUNqQixXQUFRLHNCQUFxQkEsT0FBUSxFQUFyQztBQUNILEdBakNTOztBQWtDVkMsRUFBQUEsYUFBYSxDQUFDQyxHQUFELEVBQU07QUFDZixXQUFRLG1CQUFrQkEsR0FBSSxFQUE5QjtBQUNILEdBcENTOztBQXFDVkMsRUFBQUEsS0FBSyxFQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FyQ0U7O0FBMkRWQyxFQUFBQSxZQUFZLEdBQUc7QUFDWCxXQUFRLFNBQVI7QUFDSCxHQTdEUzs7QUE4RFZDLEVBQUFBLGdCQUFnQixHQUFHO0FBQ2YsV0FBUSxhQUFSO0FBQ0gsR0FoRVM7O0FBaUVWQyxFQUFBQSxTQUFTLENBQUNkLElBQUQsRUFBTztBQUNaLFdBQVEsR0FBRUEsSUFBSyxzQkFBZjtBQUNILEdBbkVTOztBQW9FVmUsRUFBQUEsV0FBVyxDQUFDUCxPQUFELEVBQVU7QUFDakIsV0FBUSxtQkFBa0JBLE9BQVEsRUFBbEM7QUFDSCxHQXRFUzs7QUF1RVZRLEVBQUFBLFdBQVcsQ0FBQ0MsSUFBRCxFQUFPO0FBQ2QsV0FBUSx5QkFBd0JBLElBQUssRUFBckM7QUFDSCxHQXpFUzs7QUEwRVZDLEVBQUFBLGlCQUFpQixDQUFDRCxJQUFELEVBQU87QUFDcEIsV0FBUSxzQ0FBcUNBLElBQUssRUFBbEQ7QUFDSDs7QUE1RVMsQ0FBZCIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHRleHRzID0ge1xuICAgIGFncmVlbWVudENvbmZpcm1hdGlvbjogYFxuVGhpcyBBZ3JlZW1lbnQgdGFrZXMgZWZmZWN0IHdoZW4geW91IGlucHV0IGEg4oCcWUVT4oCdIGFuZCBwcmVzcyBFbnRlciBcbm9yLCBpZiBlYXJsaWVyLCB3aGVuIHlvdSB1c2UgYW55IG9mIHRoZSBUT04gREVWIFNvZnR3YXJlOiBgLFxuICAgIGFncmVlbWVudFJlamVjdGVkOiAnXFxuXFxuTGljZW5zZSB0ZXJtcyB3ZXJlIG5vdCBhY2NlcHRlZC5cXG4nLFxuICAgIGFncmVlbWVudEFjY2VwdGVkOiAnXFxuXFxuTGljZW5zZSB0ZXJtcyB3ZXJlIGFjY2VwdGVkLlxcbicsXG4gICAgZG9ja2VyVmVyc2lvblJlcXVpcmVkOiBcIkRvY2tlciB2ZXJzaW9uIHJlcXVpcmVkIF4xN1wiLFxuICAgIG5vVG9uRGV2SW1hZ2VzOiAnVGhlcmUgYXJlIG5vIFRPTiBEZXYgSW1hZ2VzJyxcbiAgICBub1RvbkRldkNvbnRhaW5lcnM6ICdUaGVyZSBhcmUgbm8gVE9OIERldiBDb250YWluZXJzJyxcbiAgICBkb25lOiAnIERvbmUuJyxcbiAgICBuZXRzSGVhZGVyOiAnTG9jYWwgbmV0czonLFxuICAgIGNvbXBpbGVySGVhZGVyOiAnQ29tcGlsZXJzOicsXG4gICAgYXZhaWxhYmxlVmVyc2lvbnM6ICdBdmFpbGFibGUgdmVyc2lvbnM6JyxcbiAgICBjb250YWluZXJEb2VzTm90RXhpc3RzKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGBDb250YWluZXIgWyR7bmFtZX1dIGRvZXMgbm90IGV4aXN0cy4gQ3JlYXRpbmcuLi5gO1xuICAgIH0sXG4gICAgaW1hZ2VEb2VzTm90RXhpc3RzKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGBJbWFnZSBbJHtuYW1lfV0gaXMgbWlzc2luZy4gUHVsbGluZyAocGxlYXNlIHdhaXQpLi4uYDtcbiAgICB9LFxuICAgIGNvbnRhaW5lckNhbk5vdEJlQ3JlYXRlZChuYW1lKSB7XG4gICAgICAgIHJldHVybiBgQ29udGFpbmVyIFske25hbWV9XSBjYW4gbm90IGJlIGNyZWF0ZWRgO1xuICAgIH0sXG4gICAgY29udGFpbmVySGF2ZUJlZW5SZW1vdmVkKGlkKSB7XG4gICAgICAgIHJldHVybiBgQ29udGFpbmVyIFske2lkfSBoYXZlIGJlZW4gcmVtb3ZlZC5gO1xuICAgIH0sXG4gICAgaW1hZ2VIYXZlQmVlblJlbW92ZWQoaWQpIHtcbiAgICAgICAgcmV0dXJuIGBJbWFnZSBbJHtpZH0gaGF2ZSBiZWVuIHJlbW92ZWQuYDtcbiAgICB9LFxuICAgIHNvdXJjZUZpbGVOb3RGb3VuZChuYW1lKSB7XG4gICAgICAgIHJldHVybiBgU291cmNlIGZpbGUgWyR7bmFtZX1dIG5vdCBmb3VuZC5gO1xuICAgIH0sXG4gICAgdXNhZ2VIZWFkZXIodmVyc2lvbikge1xuICAgICAgICByZXR1cm4gYFRPTiBMYWJzIERldiBUb29scyAke3ZlcnNpb259YDtcbiAgICB9LFxuICAgIGludmFsaWRPcHRpb24oYXJnKSB7XG4gICAgICAgIHJldHVybiBgSW52YWxpZCBvcHRpb246ICR7YXJnfWA7XG4gICAgfSxcbiAgICB1c2FnZTogYHVzYWdlOiB0b25kZXYgY29tbWFuZCB7IGFyZ3VtZW50IC4uLiB9XG5cbk9wdGlvbnM6XG4gIC1wLCAtLXBvcnQgPG51bWJlcj4gICBTZXQgbG9jYWwgcG9ydCBudW1iZXIgZm9yIGxvY2FsIG5ldFxuICAtbiwgLS1uZXQgPG5hbWU+ICAgICAgU2V0IGxvY2FsIG5ldCBuYW1lIHRvIHdoaWNoIGNvbW1hbmQgYXBwbGllZCwgY2FuIGJlIHNwZWNpZmllZCBtdWx0aXBsZSB0aW1lc1xuICAtaSwgLS1pbWFnZXMgICAgICAgICAgQXBwbHkgY29tbWFuZCBvbmx5IHRvIGRvY2tlciBpbWFnZXNcbiAgLWMsIC0tY29udGFpbmVycyAgICAgIEFwcGx5IGNvbW1hbmQgb25seSB0byBkb2NrZXIgY29udGFpbmVyc1xuICAtanMsIC0tSmF2YVNjcmlwdCAgICAgR2VuZXJhdGUgYWRkaXRpb25hbCBKYXZhU2NyaXB0IGNvZGVcbiAgXG4gICBcbkNvbW1hbmRzOlxuICBzb2wgPGZpbGVzPiAgIEJ1aWxkIFRPTiBjb250cmFjdCBmcm9tIHNvbGlkaXR5IHNvdXJjZSBjb2RlXG4gIHN0YXJ0ICAgICAgICAgU3RhcnQgbG9jYWwgbmV0IChpZiBuZXQgbmFtZSBkb2VzIG5vdCBzcGVjaWZpZWQgdGhlIGFsbCBuZXRzIHdpbGwgYmUgc3RhcnRlZClcbiAgc3RvcCAgICAgICAgICBTdG9wIGNvbXBpbGVycyBhbmQgYWxsIG5ldHMgICAgXG4gIGluZm8gICAgICAgICAgU2hvdyBjdXJyZW50IHN0YXR1cyBvZiBjb21waWxlcnMgYW5kIG5ldHNcbiAgc2V0dXAgICAgICAgICBMb29raW5nIGZvciBhIHJlcXVpcmVkIHByZXJlcXVpc2l0ZXMgYW5kIHNldHVwIHJlcXVpcmVkIGFkZGl0aW9uYWwgY29tcG9uZW50c1xuICBjbGVhbiAgICAgICAgIFJlbW92ZSBhbGwgVE9OIERldiBkb2NrZXIgY29udGFpbmVycyBhbmQgaW1hZ2VzXG4gIHVzZSA8dmVyc2lvbj4gU2VsZWN0IHZlcnNpb24gZm9yIGNvbXBpbGVycyBhbmQgbmV0cyBcbiAgICAgICAgXG5Db3B5cmlnaHQgMjAxOC0yMDIwIFRPTiBERVYgU09MVVRJT05TIExURC5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKGh0dHBzOi8vd3d3LnRvbi5kZXYvbGljZW5zZXMpXG5gLFxuICAgIHRvbkRldkltYWdlcygpIHtcbiAgICAgICAgcmV0dXJuIGBJbWFnZXM6YDtcbiAgICB9LFxuICAgIHRvbkRldkNvbnRhaW5lcnMoKSB7XG4gICAgICAgIHJldHVybiBgQ29udGFpbmVyczpgO1xuICAgIH0sXG4gICAgbmV0SGVhZGVyKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGAke25hbWV9IG5ldHdvcmsvYmxvY2tjaGFpbjpgO1xuICAgIH0sXG4gICAgdXNlZFZlcnNpb24odmVyc2lvbikge1xuICAgICAgICByZXR1cm4gYCAgVXNlZCB2ZXJzaW9uOiAke3ZlcnNpb259YDtcbiAgICB9LFxuICAgIG5ldEhvc3RQb3J0KHBvcnQpIHtcbiAgICAgICAgcmV0dXJuIGAgIEJvdW5kIHRvIGhvc3QgcG9ydDogJHtwb3J0fWA7XG4gICAgfSxcbiAgICBuZXRBcmFuZ29Ib3N0UG9ydChwb3J0KSB7XG4gICAgICAgIHJldHVybiBgICBBcmFuZ28gREIgaXMgYm91bmQgdG8gaG9zdCBwb3J0OiAke3BvcnR9YDtcbiAgICB9LFxufTtcblxuZXhwb3J0IHsgdGV4dHMgfTtcbiJdfQ==