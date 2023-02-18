'use strict';

const { JSONWebToken } = require('./lib/jsonwebtoken.js');
const { HS256Strategy } = require('./lib/strategies/hs256.js');
const { RS256Strategy } = require('./lib/strategies/rs256.js');
const { JwtExpiredError } = require('./lib/errors/jwt-expired-error.js');
const { InvalidHeaderError } = require('./lib/errors/invalid-header-error.js');
const {
  InvalidSignatureError,
} = require('./lib/errors/invalid-signature-error.js');

module.exports.JSONWebToken = JSONWebToken;
module.exports.HS256Strategy = HS256Strategy;
module.exports.RS256Strategy = RS256Strategy;
module.exports.JwtExpiredError = JwtExpiredError;
module.exports.InvalidHeaderError = InvalidHeaderError;
module.exports.InvalidSignatureError = InvalidSignatureError;
