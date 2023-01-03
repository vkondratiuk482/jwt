'use strict';

const { Base64UrlConverter } = require('../common/base-64-url-converter.js');
const { JwtExpiredError } = require('../errors/jwt-expired-error.js');
const { AbstractClassError } = require('../errors/abstract-class-error.js');
const { AbstractMethodError } = require('../errors/abstract-method-error.js');
const { InvalidHeaderError } = require('../errors/invalid-header-error.js');
const { InvalidSignatureError } = require('../errors/invalid-signature-error.js');

/**
 * Abstract base strategy 
 */
class BaseStrategy {
  #ttl;
  #b64uHeader;

  constructor(options) {
    if (this.constructor === BaseStrategy) {
      throw new AbstractClassError();
    }

    const { alg, typ, ttl } = options;

    this.#ttl = ttl;
    this.#b64uHeader= Base64UrlConverter.toString({ alg, typ });
  }

  generate(payload, options = {}) {
    const exp = Date.now() + (options.ttl || this.#ttl);

    const patched = Object.assign(payload, { exp });

    const b64uPayload = Base64UrlConverter.toString(patched);

    const unsigned = `${this.#b64uHeader}.${b64uPayload}`;
    const signature = this.sign(unsigned);

    const jwt = `${unsigned}.${signature}`;

    return jwt;
  }

  verify(token) {
    const [b64uHeader, b64uPayload, candidateSignature] = token.split('.');

    const payload = Base64UrlConverter.toJSON(b64uPayload);
   
    const unsigned = `${b64uHeader}.${b64uPayload}`;
    const signature = this.sign(unsigned);

    const verified = 
      this.#verifyHeader(b64uHeader) && 
      this.#verifyPayload(payload) &&
      this.#verifySignature(candidateSignature, signature);

    return verified;
  }

  #verifyHeader(b64uHeader) {
    const verified = b64uHeader === this.#b64uHeader;

    if (!verified) {
      throw new InvalidHeaderError();
    }

    return verified;
  }

  #verifyPayload(payload) {
    const verified = this.#verifyExpiration(payload.exp);

    return verified;
  }

  #verifySignature(candidate, signature) {
    const verified = candidate === signature;

    if (!verified) {
      throw new InvalidSignatureError();
    }

    return verified;
  }

  #verifyExpiration(exp) {
    const verified = Date.now() <= exp;

    if (!verified) {
      throw new JwtExpiredError();
    }

    return verified;
  }

  sign() {
    throw new AbstractMethodError(); 
  }
}

module.exports = { BaseStrategy };
