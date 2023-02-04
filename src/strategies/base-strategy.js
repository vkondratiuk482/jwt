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

  get ttl() {
    return this.#ttl;
  }

  get b64uHeader() {
    return this.#b64uHeader;
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

  sign() {
    throw new AbstractMethodError(); 
  }

  verify() {
    throw new AbstractMethodError(); 
  }

  decode() {
    throw new AbstractMethodError(); 
  }
}

module.exports = { BaseStrategy };
