'use strict';

const crypto = require('node:crypto');

class HS256Strategy {
  #secret;
  #base64UrlHeader;
  
  constructor(secret) {
    this.#secret = secret;
    this.#base64UrlHeader = this.#objectToBase64Url({ typ: 'JWT', alg: 'HS256' });
  }

  generate(payload) {
    const base64UrlPayload = this.#objectToBase64Url(payload);
    const unsigned = `${this.#base64UrlHeader}.${base64UrlPayload}`;
    const signed = `${unsigned}.${this.#sign(unsigned)}`;
    return signed;
  }

  verify() {}

  #sign(unsigned) {
    const signed = crypto.createHmac('sha256', this.#secret)
      .update(unsigned)
      .digest();
    return signed.toString('base64url');
  }

  #objectToBase64Url(data) {
    /* JSON.stringify is definitely unoptimal and will be removed in future */
    const serialized = Buffer.from(JSON.stringify(data));
    return serialized.toString('base64url');
  }
}

module.exports = { HS256Strategy };
