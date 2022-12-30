'use strict';

const crypto = require('node:crypto');
const { Utils } = require('../common/utils.js');

const typ = 'JWT', alg = 'HS256';

/**
 * Strategy for HS256 symmetric hashing algorithm
 */ class HS256Strategy {
  #ttl;
  #secret;
  #b64uHeader;

  constructor(options) {
    const { secret, ttl } = options;
    this.#ttl = ttl;
    this.#secret = secret;
    this.#b64uHeader = Utils.convertObjectToBase64Url({ typ, alg });
  }

  generate(payload, options = {}) {
    const exp = Date.now() + (options.ttl || this.#ttl);
    const patched = {
      ...payload,
      exp,
    };
    const b64uPayload = Utils.convertObjectToBase64Url(patched);
    const unsigned = `${this.#b64uHeader}.${b64uPayload}`;
    const signature = this.#sign(unsigned);
    const jwt = `${unsigned}.${signature}`;
    return jwt;
  }

  verify(token) {
    const [b64uHeader, b64uPayload, candidateSignature] = token.split('.');
    if (b64uHeader !== this.#b64uHeader) {
      return false;
    }
    const expired = this.#verifyExpiration(b64uPayload);
    const unsigned = `${b64uHeader}.${b64uPayload}`;
    const signature = this.#sign(unsigned);
    const verified = !expired && (candidateSignature === signature);
    return verified;
  }

  #verifyExpiration(b64uPayload) {
    const payload = Utils.convertBase64UrlToObject(b64uPayload);
    if (!payload.exp) {
      return false;
    }
    const expired = payload.exp < Date.now();
    return expired;
  }

  /* 
   * Create abstract strategy class and move all of the methods above there 
   * In this case when we create a new strategy we will only have to implement
   * #sign method
   */

  #sign(unsigned) {
    const signed = crypto.createHmac('sha256', this.#secret)
      .update(unsigned)
      .digest();
    const b64uSigned = signed.toString('base64url');
    return b64uSigned;
  }
}

module.exports = { HS256Strategy };
