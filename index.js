/*!
 * totp <https://github.com/frani/totp>
 *
 * Copyright (c) 2023-present, frani.
 * Released under the MIT License.
 */

"use strict";

const crypto = require("crypto");

/**
 * Generate TOTP Token
 * @param {string} [secret='secret'] default value is secret
 * @param {number} [timeStep=30] in seconds - default value is 30
 * @param {number} [digits=6] default value is 6
 * @returns a string with TOTP Token
 */
const generate = ({ secret = "secret", timeStep = 30, digits = 6 }) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const counter = Math.floor(timestamp / timeStep);
  const counterBuffer = Buffer.alloc(8);
  counterBuffer.writeBigInt64BE(BigInt(counter), 0);

  const hmac = crypto.createHmac("sha1", secret);
  hmac.update(counterBuffer);
  const hash = hmac.digest();

  const offset = hash[hash.length - 1] & 0x0f;
  const code =
    ((hash[offset] & 0x7f) << 24) |
    ((hash[offset + 1] & 0xff) << 16) |
    ((hash[offset + 2] & 0xff) << 8) |
    (hash[offset + 3] & 0xff);

  const token = code % Math.pow(10, digits);
  return token.toString().padStart(digits, "0");
};

module.exports = { generate };
