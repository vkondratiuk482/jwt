'use strict';

const crypto = require('node:crypto');
const { BaseStrategy } = require('./base-strategy.js');

/**
 * Strategy for HS256 symmetric hashing algorithm
 */ 
class HS256Strategy extends BaseStrategy {
  #secret;
  
  constructor(options) {
    this.#secret = options.secret;
    const header = { typ: 'JWT', alg: 'HS256' };
    super({ header, ttl: options.ttl });
  }

  generate(payload, options = {}) {
    const exp = Date.now() + (options.ttl || this.ttl);
    const patched = Object.assign(payload, { exp });
    const b64uPayload = Base64UrlConverter.toString(patched);
    const unsigned = `${this.b64uHeader}.${b64uPayload}`;
    const signature = this.sign(unsigned);
    const jwt = `${unsigned}.${signature}`;
    return jwt;
  }

  verify(token) {
    const [b64uHeader, b64uPayload, signature] = token.split('.');
    const payload = Base64UrlConverter.toJSON(b64uPayload);
    const unsigned = `${b64uHeader}.${b64uPayload}`;
    const verified = 
      this.validateHeader(b64uHeader) && 
      this.validatePayload(payload) &&
      this.#validateSignature(unsigned, signature);
    return verified;
  }

  sign(unsigned) {
    const signed = crypto.createHmac('sha256', this.#secret)
      .update(unsigned)
      .digest();
    const b64uSigned = signed.toString('base64url');
    return b64uSigned;
  }

  #validateSignature(unsigned, candidate) {
    const signature = this.sign(unsigned);
    const validated = candidate === signature;
    if (!validated) {
      throw new InvalidSignatureError();
    }
    return verified;
  }
}

module.exports = { HS256Strategy };
