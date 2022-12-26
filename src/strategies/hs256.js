'use strict';

const crypto = require('node:crypto');
const { Utils } = require('../common/utils.js');

const typ = 'JWT', alg = 'HS256';

/**
 * Strategy for HS256 symmetric hashing algorithm
 */
class HS256Strategy {
  #secret;
  #b64uHeader;

  constructor(secret) {
    this.#secret = secret;
    this.#b64uHeader = Utils.convertObjectToBase64Url({ typ, alg });
  }

  generate(payload, options) {
    const patched = Object.assign(payload, options);
    const b64uPayload = Utils.convertObjectToBase64Url(patched);
    const unsigned = `${this.#b64uHeader}.${b64uPayload}`;
    const signature = this.#sign(unsigned);
    const jwt = `${unsigned}.${signature}`;
    return jwt;
  }

  verify() {}

  #sign(unsigned) {
    const signed = crypto.createHmac('sha256', this.#secret)
      .update(unsigned)
      .digest();
    return signed.toString('base64url');
  }
}

module.exports = { HS256Strategy };
