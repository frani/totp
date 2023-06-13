"use strict";

require("mocha");
const assert = require("assert");
const totp = require("./");

describe("totp generate token", function () {
  it("should return true if call generate with same values:", function () {
    assert(totp.generate({}) === totp.generate({}));
    assert(totp.generate({}) === totp.generate({ secret: "secret" }));
    assert(
      totp.generate({ secret: "123" }) === totp.generate({ secret: "123" })
    );
    assert(
      totp.generate({ secret: "123", digits: 10 }) ===
        totp.generate({ secret: "123", digits: 10 })
    );
    assert(
      totp.generate({ secret: "123", digits: 10, timeStep: 1 }) ===
        totp.generate({ secret: "123", digits: 10, timeStep: 1 })
    );
  });

  it("should return false if call generate with diff values:", function () {
    assert(totp.generate({}) !== totp.generate({ secret: "123" }));
    assert(
      totp.generate({}) !== totp.generate({ secret: "0000", timeStep: 100 })
    );
    assert(totp.generate({}) !== totp.generate({ secret: "xasd", digits: 7 }));
  });
});
