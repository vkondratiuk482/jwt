'use strict';

const crypto = require('node:crypto');

/**
 * Strategy for RS256 asymmetric hashing algorithm
 */ 
class RS256Strategy {
  #publicKey;
  #privateKey;

  constructor(options) {
    this.#publicKey = options.publicKey;
    this.#privateKey = options.privateKey;
    const header = { typ: 'JWT', alg: 'RS256' };
    super({ header, ttl: options.ttl });
  }

  sign(unsigned) {
    const signed = crypto.createSign('RSA-SHA256')
      .update(unsigned)
      .sign(this.#privateKey);
    const b64USigned = signed.toString('base64url');
    return b64USigned;
  } 
}
