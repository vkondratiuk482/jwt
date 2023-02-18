'use strict';

const { JSONWebToken } = require('./lib/jsonwebtoken.js');
const { HS256Strategy } = require('./lib/strategies/hs256.js');
const { RS256Strategy } = require('./lib/strategies/rs256.js');
const { JwtExpiredError } = require('./lib/errors/jwt-expired-error.js');
const { InvalidHeaderError } = require('./lib/errors/invalid-header-error.js');
const {
  InvalidSignatureError,
} = require('./lib/errors/invalid-signature-error.js');

const strategy = new HS256Strategy({
  ttl: 10000,
  secret: 'YOUR_SECRET',
});

const jwt = new JSONWebToken(strategy);
const payload = { id: 1 };

const token = jwt.generate(payload, { ttl: 20000, secret: 'NEW_SECRET' });

try {
  const decoded = jwt.verify(token);
} catch (err) {
  // err instanceof InvalidSignatureError
}

module.exports.JSONWebToken = JSONWebToken;
module.exports.HS256Strategy = HS256Strategy;
module.exports.RS256Strategy = RS256Strategy;
module.exports.JwtExpiredError = JwtExpiredError;
module.exports.InvalidHeaderError = InvalidHeaderError;
module.exports.InvalidSignatureError = InvalidSignatureError;
