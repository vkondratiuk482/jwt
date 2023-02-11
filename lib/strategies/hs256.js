'use strict';

const crypto = require('node:crypto');
const { BaseStrategy } = require('./base-strategy.js');
const {
  InvalidSignatureError,
} = require('../errors/invalid-signature-error.js');

/**
 * Strategy for HS256 symmetric hashing algorithm
 */
class HS256Strategy extends BaseStrategy {
  #secret;

  constructor(options) {
    const header = { alg: 'HS256', typ: 'JWT' };
    super({ header, ttl: options.ttl });
    this.#secret = options.secret;
  }

  sign(unsigned) {
    const b64uSigned = crypto
      .createHmac('sha256', this.#secret)
      .update(unsigned)
      .digest('base64url');
    return b64uSigned;
  }

  validateSignature(unsigned, candidate) {
    const signature = this.sign(unsigned);
    const validated = candidate === signature;
    if (!validated) {
      throw new InvalidSignatureError();
    }
    return validated;
  }
}

module.exports = { HS256Strategy };
