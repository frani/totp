# Time based One Time Password

Simple TOTP, one function to call and generate OTP token.

This is a no-depenencies package

# Install

if you are using Yarn:

```sh
yarn add @frani/totp
```

if you are using NPM:

```sh
npm i @frani/totp
```

# Usage

to generate:

```js
const totp = require("@frani/totp");

const token = totp.generate({
  secret: "123", // optional - default is 'secret'
  timeStep: 30, // optional - default is 30 seconds
  digits: 6, // optional - default is 6
});
console.log(token); // 480143
```

in case you want to compare, simple regenerate and check with '===', example:

```js
const totp = require("@frani/totp");

const CODE = "123123";

const token = totp.generate({
  secret: "123", // optional - default is 'secret'
  timeStep: 30, // optional - default is 30 seconds
  digits: 6, // optional - default is 6
});
console.log(token); // 480143

if (CODE === token) return true; // is false
```
