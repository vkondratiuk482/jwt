'use strict';

const { Base64UrlConverter } = require('../common/base-64-url-converter.js');
const { AbstractClassError } = require('../errors/abstract-class-error.js');
const { AbstractMethodError } = require('../errors/abstract-method-error.js');
const { JwtExpiredError } = require('../errors/jwt-expired-error.js');
const { InvalidHeaderError } = require('../errors/invalid-header-error.js');

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
    this.#ttl = options.ttl;
    this.#b64uHeader= Base64UrlConverter.toString(options.header);
  }

  sign() {
    throw new AbstractMethodError();
  }

  validateSignature() {
    throw new AbstractMethodError();
  }

  generate(payload, options = {}) {
    const exp = Date.now() + (options.ttl || this.#ttl);
    const patched = Object.assign(payload, { exp }); const b64uPayload = Base64UrlConverter.toString(patched);
    const unsigned = `${this.#b64uHeader}.${b64uPayload}`;
    const signature = this.sign(unsigned);
    const jwt = `${unsigned}.${signature}`;
    return jwt;
  }

  verify(token) {
    const [b64uHeader, b64uPayload, signature] = token.split('.');
    const payload = Base64UrlConverter.toJSON(b64uPayload);
    const unsigned = `${b64uHeader}.${b64uPayload}`;
    this.validateHeader(b64uHeader); 
    this.validatePayload(payload);
    this.validateSignature(unsigned, signature);
    return payload;
  }

  validateHeader(b64uHeader) {
    const validated = b64uHeader === this.#b64uHeader;
    if (!validated) {
      throw new InvalidHeaderError();
    }
    return validated;
  }

  validatePayload(payload) {
    const expired = Date.now() > payload.exp;
    if (expired) {
      throw new JwtExpiredError();
    }
    return true;
  }
}

module.exports = { BaseStrategy };
