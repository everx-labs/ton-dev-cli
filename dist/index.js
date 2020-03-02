#!/usr/bin/env node

/*
 * Copyright 2018-2020 TON DEV SOLUTIONS LTD.
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
"use strict";

var _cli = require("./cli/cli");

var _dev = require("./dev");

async function main() {
  const dev = new _dev.Dev();
  await (0, _cli.handleCommandLine)(dev, process.argv);
}

(async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    if (error.message) {
      console.error(`\n${error.message}`);
    } else {
      console.error(`\n${error}`);
    }

    process.exit(1);
  }
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJtYWluIiwiZGV2IiwiRGV2IiwicHJvY2VzcyIsImFyZ3YiLCJleGl0IiwiZXJyb3IiLCJtZXNzYWdlIiwiY29uc29sZSJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlQTs7QUFDQTs7QUFHQSxlQUFlQSxJQUFmLEdBQXNCO0FBQ2xCLFFBQU1DLEdBQUcsR0FBRyxJQUFJQyxRQUFKLEVBQVo7QUFDQSxRQUFNLDRCQUFrQkQsR0FBbEIsRUFBdUJFLE9BQU8sQ0FBQ0MsSUFBL0IsQ0FBTjtBQUNIOztBQUVELENBQUMsWUFBWTtBQUNULE1BQUk7QUFDQSxVQUFNSixJQUFJLEVBQVY7QUFDQUcsSUFBQUEsT0FBTyxDQUFDRSxJQUFSLENBQWEsQ0FBYjtBQUNILEdBSEQsQ0FHRSxPQUFPQyxLQUFQLEVBQWM7QUFDWixRQUFJQSxLQUFLLENBQUNDLE9BQVYsRUFBbUI7QUFDZkMsTUFBQUEsT0FBTyxDQUFDRixLQUFSLENBQWUsS0FBSUEsS0FBSyxDQUFDQyxPQUFRLEVBQWpDO0FBQ0gsS0FGRCxNQUVPO0FBQ0hDLE1BQUFBLE9BQU8sQ0FBQ0YsS0FBUixDQUFlLEtBQUlBLEtBQU0sRUFBekI7QUFDSDs7QUFDREgsSUFBQUEsT0FBTyxDQUFDRSxJQUFSLENBQWEsQ0FBYjtBQUNIO0FBQ0osQ0FaRCIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcblxuXG4vKlxuICogQ29weXJpZ2h0IDIwMTgtMjAyMCBUT04gREVWIFNPTFVUSU9OUyBMVEQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIFNPRlRXQVJFIEVWQUxVQVRJT04gTGljZW5zZSAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG4gKiB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcbiAqIExpY2Vuc2UgYXQ6IGh0dHBzOi8vd3d3LnRvbi5kZXYvbGljZW5zZXNcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIFRPTiBERVYgc29mdHdhcmUgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICovXG5cbmltcG9ydCB7IGhhbmRsZUNvbW1hbmRMaW5lIH0gZnJvbSBcIi4vY2xpL2NsaVwiO1xuaW1wb3J0IHsgRGV2IH0gZnJvbSBcIi4vZGV2XCI7XG5cblxuYXN5bmMgZnVuY3Rpb24gbWFpbigpIHtcbiAgICBjb25zdCBkZXYgPSBuZXcgRGV2KCk7XG4gICAgYXdhaXQgaGFuZGxlQ29tbWFuZExpbmUoZGV2LCBwcm9jZXNzLmFyZ3YpO1xufVxuXG4oYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IG1haW4oKTtcbiAgICAgICAgcHJvY2Vzcy5leGl0KDApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvci5tZXNzYWdlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBcXG4ke2Vycm9yLm1lc3NhZ2V9YCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBcXG4ke2Vycm9yfWApO1xuICAgICAgICB9XG4gICAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICB9XG59KSgpO1xuIl19