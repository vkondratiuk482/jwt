# @mokuteki/jwt
Zero dependency typescript friendly Node.js library designed to hash/decode JSON Web Tokens using symmetric/asymmetric algorithms

## Installation
```bash
npm i @mokuteki/jwt
```

## Quick start 

* Pick one hashing strategy out of existing ones
* Pass the strategy to JSONWebToken constructor
* Use created instance to generate/verify JWTs

## HS256 Strategy

```javascript
const { JSONWebToken, HS256Strategy } = require('@mokuteki/jwt');

const strategy = new HS256Strategy({
  ttl: 10000,
  secret: 'YOUR_SECRET',
});

const jwt = new JSONWebToken(strategy);
const payload = { id: 1 };

const token = jwt.generate(payload);
const decoded = jwt.verify(token);

console.log(decoded); // { id: 1 }
```

## RS256 Strategy

```javascript
const { JSONWebToken, RS256Strategy } = require('@mokuteki/jwt');

const strategy = new RS256Strategy({
  ttl: 10000,
  publicKey: 'YOUR_PUBLIC_KEY',
  privateKey: 'YOUR_PRIVATE_KEY',
});

const jwt = new JSONWebToken(strategy);
const payload = { id: 1 };

const token = jwt.generate(payload);
const decoded = jwt.verify(token);

console.log(decoded); // { id: 1 }
```

## Override predefined options

```javascript
const { JSONWebToken, HS256Strategy } = require('@mokuteki/jwt');

const strategy = new HS256Strategy({
  ttl: 10000,
  secret: 'YOUR_SECRET',
});

const jwt = new JSONWebToken(strategy);
const payload = { id: 1 };

/**
 * Override JWT ttl option
 */
const token = jwt.generate(payload, { ttl: 1000 });

setTimeout(() => {
  try {
    const decoded = jwt.verify(token);
  } catch (err) {
    // err instanceof JwtExpiredError
  }
}, 2000);
```

## License
Licensed under [MIT](https://github.com/mokuteki225/jwt/blob/master/LICENSE.md)
