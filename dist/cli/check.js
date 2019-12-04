"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveGiverParameters = resolveGiverParameters;
exports.checkNetwork = checkNetwork;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

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
var os = require('os');

var fs = require('fs');

var path = require('path');

var giverAddress = '0:5b168970a9c63dd5c42a6afbcf706ef652476bb8960a22e1d8a2ad148e60c0ea';
var giverKeys = {
  secret: '2245e4f44af8af6bbd15c4a53eb67a8f211d541ddc7c197f74d7830dba6d27fe',
  "public": 'd542f44146f169c6726c8cf70e4cbb3d33d8d842a4afd799ac122c5808d81ba3'
};
var giverPackage = {
  abi: {
    "ABI version": 1,
    "functions": [{
      "name": "constructor",
      "inputs": [],
      "outputs": []
    }, {
      "name": "sendTransaction",
      "inputs": [{
        "name": "dest",
        "type": "address"
      }, {
        "name": "value",
        "type": "uint128"
      }, {
        "name": "bounce",
        "type": "bool"
      }],
      "outputs": []
    }],
    "events": [],
    "data": [{
      "key": 100,
      "name": "owner",
      "type": "uint256"
    }]
  },
  imageBase64: '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'
};

function resolveGiverParameters(_x) {
  return _resolveGiverParameters.apply(this, arguments);
}

function _resolveGiverParameters() {
  _resolveGiverParameters = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(client) {
    var keysPath;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {
              keysPath = path.resolve(os.homedir(), 'giverKeys.json');
              giverKeys = JSON.parse(fs.readFileSync(keysPath, 'utf8'));
            } catch (error) {}

            _context.next = 3;
            return client.contracts.createDeployMessage({
              "package": giverPackage,
              constructorParams: {},
              keyPair: giverKeys
            });

          case 3:
            giverAddress = _context.sent.address;

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _resolveGiverParameters.apply(this, arguments);
}

function checkGiver(_x2) {
  return _checkGiver.apply(this, arguments);
}

function _checkGiver() {
  _checkGiver = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(client) {
    var givers, giverBalance;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return client.queries.accounts.query({
              id: {
                eq: giverAddress
              }
            }, 'balance code');

          case 2:
            givers = _context2.sent;

            if (!(givers.length < 1)) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", 'no giver');

          case 5:
            //$FlowFixMe
            giverBalance = BigInt(givers[0].balance);

            if (!(giverBalance === BigInt(0))) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", 'giver balance empty');

          case 10:
            if (!(giverBalance < BigInt(1000000000))) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt("return", "giver balance too low: ".concat(giverBalance));

          case 12:
            if (givers[0].code) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt("return", "giver code missing");

          case 14:
            return _context2.abrupt("return", '');

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _checkGiver.apply(this, arguments);
}

function checkSendGrams(_x3) {
  return _checkSendGrams.apply(this, arguments);
}

function _checkSendGrams() {
  _checkSendGrams = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(client) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return client.contracts.run({
              address: giverAddress,
              functionName: 'sendTransaction',
              abi: giverPackage.abi,
              input: {
                dest: '0:adb63a228837e478c7edf5fe3f0b5d12183e1f22246b67712b99ec538d6c5357',
                value: 1000000,
                bounce: false
              },
              keyPair: giverKeys
            });

          case 2:
            return _context3.abrupt("return", '');

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _checkSendGrams.apply(this, arguments);
}

function checkNetwork(_x4) {
  return _checkNetwork.apply(this, arguments);
}

function _checkNetwork() {
  _checkNetwork = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(client) {
    var result, start;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return resolveGiverParameters(client);

          case 2:
            start = Date.now();
            _context4.prev = 3;
            _context4.next = 6;
            return checkGiver(client);

          case 6:
            _context4.t1 = _context4.sent;

            if (_context4.t1) {
              _context4.next = 11;
              break;
            }

            _context4.next = 10;
            return checkSendGrams(client);

          case 10:
            _context4.t1 = _context4.sent;

          case 11:
            _context4.t0 = _context4.t1;

            if (_context4.t0) {
              _context4.next = 14;
              break;
            }

            _context4.t0 = '';

          case 14:
            result = _context4.t0;
            _context4.next = 20;
            break;

          case 17:
            _context4.prev = 17;
            _context4.t2 = _context4["catch"](3);
            result = _context4.t2 && _context4.t2.message ? _context4.t2.message : (_context4.t2 || '').toString();

          case 20:
            return _context4.abrupt("return", "".concat((Date.now() - start) / 1000, "sec \u2026 ").concat(result || '✓'));

          case 21:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 17]]);
  }));
  return _checkNetwork.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGkvY2hlY2suanMiXSwibmFtZXMiOlsib3MiLCJyZXF1aXJlIiwiZnMiLCJwYXRoIiwiZ2l2ZXJBZGRyZXNzIiwiZ2l2ZXJLZXlzIiwic2VjcmV0IiwiZ2l2ZXJQYWNrYWdlIiwiYWJpIiwiaW1hZ2VCYXNlNjQiLCJyZXNvbHZlR2l2ZXJQYXJhbWV0ZXJzIiwiY2xpZW50Iiwia2V5c1BhdGgiLCJyZXNvbHZlIiwiaG9tZWRpciIsIkpTT04iLCJwYXJzZSIsInJlYWRGaWxlU3luYyIsImVycm9yIiwiY29udHJhY3RzIiwiY3JlYXRlRGVwbG95TWVzc2FnZSIsImNvbnN0cnVjdG9yUGFyYW1zIiwia2V5UGFpciIsImFkZHJlc3MiLCJjaGVja0dpdmVyIiwicXVlcmllcyIsImFjY291bnRzIiwicXVlcnkiLCJpZCIsImVxIiwiZ2l2ZXJzIiwibGVuZ3RoIiwiZ2l2ZXJCYWxhbmNlIiwiQmlnSW50IiwiYmFsYW5jZSIsImNvZGUiLCJjaGVja1NlbmRHcmFtcyIsInJ1biIsImZ1bmN0aW9uTmFtZSIsImlucHV0IiwiZGVzdCIsInZhbHVlIiwiYm91bmNlIiwiY2hlY2tOZXR3b3JrIiwic3RhcnQiLCJEYXRlIiwibm93IiwicmVzdWx0IiwibWVzc2FnZSIsInRvU3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7OztBQWtCQSxJQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQUNBLElBQU1DLEVBQUUsR0FBR0QsT0FBTyxDQUFDLElBQUQsQ0FBbEI7O0FBQ0EsSUFBTUUsSUFBSSxHQUFHRixPQUFPLENBQUMsTUFBRCxDQUFwQjs7QUFFQSxJQUFJRyxZQUFZLEdBQUcsb0VBQW5CO0FBQ0EsSUFBSUMsU0FBUyxHQUFHO0FBQ1pDLEVBQUFBLE1BQU0sRUFBRSxrRUFESTtBQUVaLFlBQVE7QUFGSSxDQUFoQjtBQUlBLElBQU1DLFlBQVksR0FBRztBQUNqQkMsRUFBQUEsR0FBRyxFQUFF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SU9OUyBMVEQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG4gKiB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbiAqIExpY2Vuc2UgYXQ6IGh0dHBzOi8vd3d3LnRvbi5kZXYvbGljZW5zZXNcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIFRPTiBERVYgc29mdHdhcmUgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG5cbi8vIEBmbG93XG5cbmltcG9ydCB0eXBlIHsgVE9OQ2xpZW50IH0gZnJvbSBcInRvbi1jbGllbnQtanMvdHlwZXNcIjtcbmNvbnN0IG9zID0gcmVxdWlyZSgnb3MnKTtcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5cbmxldCBnaXZlckFkZHJlc3MgPSAnMDo1YjE2ODk3MGE5YzYzZGQ1YzQyYTZhZmJjZjcwNmVmNjUyNDc2YmI4OTYwYTIyZTFkOGEyYWQxNDhlNjBjMGVhJztcbmxldCBnaXZlcktleXMgPSB7XG4gICAgc2VjcmV0OiAnMjI0NWU0ZjQ0YWY4YWY2YmJkMTVjNGE1M2ViNjdhOGYyMTFkNTQxZGRjN2MxOTdmNzRkNzgzMGRiYTZkMjdmZScsXG4gICAgcHVibGljOiAnZDU0MmY0NDE0NmYxNjljNjcyNmM4Y2Y3MGU0Y2JiM2QzM2Q4ZDg0MmE0YWZkNzk5YWMxMjJjNTgwOGQ4MWJhMycsXG59O1xuY29uc3QgZ2l2ZXJQYWNrYWdlID0ge1xuICAgIGFiaToge1xuICAgICAgICBcIkFCSSB2ZXJzaW9uXCI6IDEsXG4gICAgICAgIFwiZnVuY3Rpb25zXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJjb25zdHJ1Y3RvclwiLFxuICAgICAgICAgICAgICAgIFwiaW5wdXRzXCI6IFtdLFxuICAgICAgICAgICAgICAgIFwib3V0cHV0c1wiOiBbXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJzZW5kVHJhbnNhY3Rpb25cIixcbiAgICAgICAgICAgICAgICBcImlucHV0c1wiOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgXCJuYW1lXCI6IFwiZGVzdFwiLCBcInR5cGVcIjogXCJhZGRyZXNzXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJ2YWx1ZVwiLCBcInR5cGVcIjogXCJ1aW50MTI4XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBcIm5hbWVcIjogXCJib3VuY2VcIiwgXCJ0eXBlXCI6IFwiYm9vbFwiIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIFwib3V0cHV0c1wiOiBbXVxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcImV2ZW50c1wiOiBbXSxcbiAgICAgICAgXCJkYXRhXCI6IFtcbiAgICAgICAgICAgIHsgXCJrZXlcIjogMTAwLCBcIm5hbWVcIjogXCJvd25lclwiLCBcInR5cGVcIjogXCJ1aW50MjU2XCIgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICBpbWFnZUJhc2U2NDogJ3RlNmNjZ0VDSlFFQUJkOEFBZ0UwQmdFQkFjQUNBZ1BQSUFVREFRSGVCQUFEMENBQVFkZ0FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQkFJby93QWd3QUgwcENCWWt2U2c0WXJ0VTFndzlLQVRCd0VLOUtRZzlLRUlBZ1BOUUJBSkFnSE9EUW9DQVNBTUN3QUhERGJNSUFBbkNGd3ZDTHdHYm13OHVCbUlpSWljZkFLWHdPQUNBU0FQRGdBMU8xSGJ4RnZFTWpMLzRCazdVZHZFb0JBOUVQdFJ3RnZVdTFYZ0FOVS92c0JaR1ZqYjJSbFgyRmtaSElnK2tBeStrSWdieEFnY3JvaGM3cXg4dUI5SVc4UmJ2TGdmY2gwendzQ0ltOFN6d29ISW04VEluSzZsaU52RXlMT01wOGhnUUVBSXRkSm9jOUFNaUFpempMaS92d0JaR1ZqYjJSbFgyRmtaSEl3SWNuUUpWVkJYd1hiTUlBSUJJQklSQUN1ay8zMkFzN0s2TDdFd3RqQzNNYkw4RTdlSWJaaEFBS1dsZjMyQXNMR3Z1amt3dHptek1ybGtPV2VnRVdlRkFEam5vSHdVWjRzU1o0c1IvUUU0NTZBNGZRRTRmUUZBSUdlZ2ZCSG5oWSs1WjZBUVpKRjlnSDkvZ0xDeHI3bzVNTGM1c3pLNUw3SzNNaStDd0FJQklCb1VBZUQvL3YwQmJXRnBibDlsZUhSbGNtNWhiQ0dPV2Y3OEFXZGxkRjl6Y21OZllXUmtjaURRSU5NQU1uQzlqaHIrL1FGblpYUmZjM0pqWDJGa1pISXdjTWpKMEZVUlh3TGJNT0FnY3RjaE1TRFRBREloK2tBei92MEJaMlYwWDNOeVkxOWhaR1J5TVNFaFZURmZCTnN3MkRFaEZRSDRqblgrL2dGblpYUmZiWE5uWDNCMVltdGxlU0RIQW80Vy92OEJaMlYwWDIxeloxOXdkV0pyWlhreGNESGJNT0RWSU1jQmpoZisvd0ZuWlhSZmJYTm5YM0IxWW10bGVUSndNVEhiTU9BZ2dRSUExeUhYQy84aStRRWlJdmtROHFqKy93Rm5aWFJmYlhOblgzQjFZbXRsZVRNZ0ExOEQyekRZSXNjQ3N4WUJ6SlFpMURFejNpUWlJbzQ0L3ZrQmMzUnZjbVZmYzJsbmJ3QWhiNHdpYjR3amI0enRSeUZ2ak8xRTBQUUZiNHdnN1ZmKy9RRnpkRzl5WlY5emFXZGZaVzVrWHdYWUlzY0JqaFArL0FGdGMyZGZhWE5mWlcxd2RIbGZCdHN3NENMVEh6UWowejgxSUJjQmRvNkEySTR2L3Y0QmJXRnBibDlsZUhSbGNtNWhiRElrSWxWeFh3anhRQUgrL2dGdFlXbHVYMlY0ZEdWeWJtRnNNMThJMnpEZ2dIenk4RjhJR0FIKy92c0JjbVZ3YkdGNVgzQnliM1J3Y0hEdFJOQWc5QVF5TkNDQkFJRFhSWm9nMHo4eU15RFRQekl5bG9JSUczZEFNdUlpSmJrbCtDT0JBK2lvSktDNXNJNHB5Q1FCOUFBbHp3cy9JczhMUHlIUEZpREo3VlQrL0FGeVpYQnNZWGxmY0hKdmRESi9CbDhHMnpEZy92d0JjbVZ3YkdGNVgzQnliM1F6Y0FWZkJSa0FCTnN3QWdFZ0hoc0NBbk1kSEFBUHREOXhBNWh0bUVBQXc3UWFadXoybzdlSXQ0aEFNbmFqdDRsQUlIb0hTZW4vNk1pNGNWMTVjREo4QUhnUWFiL3BBQmg0RVg5K0FMZzZ1YlE0TWpHYnVqZXhtbmFpYUhvQTVIYWp0NGtBK2dBUTU0c1FaUGFxZjM2QXVEcTV0RGd5TVp1Nk43R2FHQytCYlpoQUFnRklJaDhCQ2JpSkFDZFFJQUgrL3YwQlkyOXVjM1J5WDNCeWIzUmZNSEJ3Z2dnYmQwRHRSTkFnOUFReU5DQ0JBSURYUlk0VUlOSS9Nak1nMGo4eU1pQngxMFdVZ0h2eThON2V5Q1FCOUFBanp3cy9JczhMUDNIUFFTSFBGaURKN1ZUKy9RRmpiMjV6ZEhKZmNISnZkRjh4WHdYNEFERHdJZjc4QVhCMWMyaHdaR00zZEc5ak5PMUUwUFFCeUNFQVJPMUhieElCOUFBaHp4WWd5ZTFVL3YwQmNIVnphSEJrWXpkMGIyTTBNRjhDMnpBQjR0eisvUUZ0WVdsdVgybHVkR1Z5Ym1Gc0lZNVovdndCWjJWMFgzTnlZMTloWkdSeUlOQWcwd0F5Y0wyT0d2NzlBV2RsZEY5emNtTmZZV1JrY2pCd3lNblFWUkZmQXRzdzRDQnkxeUV4SU5NQU1pSDZRRFArL1FGblpYUmZjM0pqWDJGa1pISXhJU0ZWTVY4RTJ6RFlKQ0Z3SXdIcWpqaisrUUZ6ZEc5eVpWOXphV2R2QUNGdmpDSnZqQ052ak8xSElXK003VVRROUFWdmpDRHRWLzc5QVhOMGIzSmxYM05wWjE5bGJtUmZCZGdpeHdDT0hDRnd1bzRTSW9JUVhIN2lCMVZSWHdieFFBRmZCdHN3NEY4RzJ6RGcvdjRCYldGcGJsOXBiblJsY201aGJERWkweDgwSW5HNkpBQTJuaUNBSTFWaFh3ZnhRQUZmQjlzdzRDTWhWV0ZmQi9GQUFWOEgnLFxufTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlc29sdmVHaXZlclBhcmFtZXRlcnMoY2xpZW50OiBUT05DbGllbnQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgICBsZXQga2V5c1BhdGggPSBwYXRoLnJlc29sdmUob3MuaG9tZWRpcigpLCAnZ2l2ZXJLZXlzLmpzb24nKTtcbiAgICAgICAgZ2l2ZXJLZXlzID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoa2V5c1BhdGgsICd1dGY4JykpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgfVxuICAgIGdpdmVyQWRkcmVzcyA9IChhd2FpdCBjbGllbnQuY29udHJhY3RzLmNyZWF0ZURlcGxveU1lc3NhZ2Uoe1xuICAgICAgICBwYWNrYWdlOiBnaXZlclBhY2thZ2UsXG4gICAgICAgIGNvbnN0cnVjdG9yUGFyYW1zOiB7fSxcbiAgICAgICAga2V5UGFpcjogZ2l2ZXJLZXlzLFxuICAgIH0pKS5hZGRyZXNzO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjaGVja0dpdmVyKGNsaWVudDogVE9OQ2xpZW50KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBnaXZlcnMgPSBhd2FpdCBjbGllbnQucXVlcmllcy5hY2NvdW50cy5xdWVyeSh7IGlkOiB7IGVxOiBnaXZlckFkZHJlc3MgfSB9LCAnYmFsYW5jZSBjb2RlJyk7XG4gICAgaWYgKGdpdmVycy5sZW5ndGggPCAxKSB7XG4gICAgICAgIHJldHVybiAnbm8gZ2l2ZXInO1xuICAgIH1cbiAgICAvLyRGbG93Rml4TWVcbiAgICBjb25zdCBnaXZlckJhbGFuY2UgPSBCaWdJbnQoZ2l2ZXJzWzBdLmJhbGFuY2UpO1xuICAgIGlmIChnaXZlckJhbGFuY2UgPT09IEJpZ0ludCgwKSkge1xuICAgICAgICByZXR1cm4gJ2dpdmVyIGJhbGFuY2UgZW1wdHknO1xuICAgIH0gZWxzZSBpZiAoZ2l2ZXJCYWxhbmNlIDwgQmlnSW50KDFfMDAwXzAwMF8wMDApKSB7XG4gICAgICAgIHJldHVybiBgZ2l2ZXIgYmFsYW5jZSB0b28gbG93OiAke2dpdmVyQmFsYW5jZX1gO1xuICAgIH1cbiAgICBpZiAoIWdpdmVyc1swXS5jb2RlKSB7XG4gICAgICAgIHJldHVybiBgZ2l2ZXIgY29kZSBtaXNzaW5nYDtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjaGVja1NlbmRHcmFtcyhjbGllbnQ6IFRPTkNsaWVudCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgYXdhaXQgY2xpZW50LmNvbnRyYWN0cy5ydW4oe1xuICAgICAgICBhZGRyZXNzOiBnaXZlckFkZHJlc3MsXG4gICAgICAgIGZ1bmN0aW9uTmFtZTogJ3NlbmRUcmFuc2FjdGlvbicsXG4gICAgICAgIGFiaTogZ2l2ZXJQYWNrYWdlLmFiaSxcbiAgICAgICAgaW5wdXQ6IHtcbiAgICAgICAgICAgIGRlc3Q6ICcwOmFkYjYzYTIyODgzN2U0NzhjN2VkZjVmZTNmMGI1ZDEyMTgzZTFmMjIyNDZiNjc3MTJiOTllYzUzOGQ2YzUzNTcnLFxuICAgICAgICAgICAgdmFsdWU6IDFfMDAwXzAwMCxcbiAgICAgICAgICAgIGJvdW5jZTogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAga2V5UGFpcjogZ2l2ZXJLZXlzLFxuICAgIH0pO1xuICAgIHJldHVybiAnJztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoZWNrTmV0d29yayhjbGllbnQ6IFRPTkNsaWVudCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgYXdhaXQgcmVzb2x2ZUdpdmVyUGFyYW1ldGVycyhjbGllbnQpO1xuICAgIGxldCByZXN1bHQ7XG4gICAgY29uc3Qgc3RhcnQgPSBEYXRlLm5vdygpO1xuICAgIHRyeSB7XG4gICAgICAgIHJlc3VsdCA9IChhd2FpdCBjaGVja0dpdmVyKGNsaWVudCkpXG4gICAgICAgICAgICB8fCAoYXdhaXQgY2hlY2tTZW5kR3JhbXMoY2xpZW50KSlcbiAgICAgICAgICAgIHx8ICcnO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJlc3VsdCA9IChlcnJvciAmJiBlcnJvci5tZXNzYWdlKVxuICAgICAgICAgICAgPyBlcnJvci5tZXNzYWdlXG4gICAgICAgICAgICA6IChlcnJvciB8fCAnJykudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgcmV0dXJuIGAkeyhEYXRlLm5vdygpIC0gc3RhcnQpIC8gMV8wMDB9c2VjIOKApiAke3Jlc3VsdCB8fCAn4pyTJ31gO1xufVxuIl19