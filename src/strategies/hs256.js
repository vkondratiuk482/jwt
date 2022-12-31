'use strict';

const crypto = require('node:crypto');
const { BaseStrategy } = require('./base-strategy.js');

/**
 * Strategy for HS256 symmetric hashing algorithm
 */ 
class HS256Strategy extends BaseStrategy {
  #secret;
  
  constructor(options) {
    const typ = 'JWT', alg = 'HS256';

    super({ typ, alg, ttl: options.ttl });

    this.#secret = options.secret;
  }

  sign(unsigned) {
    const signed = crypto.createHmac('sha256', this.#secret)
      .update(unsigned)
      .digest();

    const b64uSigned = signed.toString('base64url');

    return b64uSigned;
  }
}

module.exports = { HS256Strategy };
