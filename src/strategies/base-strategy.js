'use strict';

const { Utils } = require('../common/utils');
const { JwtExpiredError } = require('../errors/jwt-expired-error');
const { AbstractClassError } = require('../errors/abstract-class-error');
const { AbstractMethodError } = require('../errors/abstract-method-error');
const {InvalidHeaderError} = require('../errors/invalid-header-error');

class BaseStrategy {
  #ttl;
  #b64uHeader;

  constructor(options) {
    if (this.constructor === BaseStrategy) {
      throw new AbstractClassError();
    }

    const { alg, typ, ttl } = options;

    this.#ttl = ttl;
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
    const signature = this.sign(unsigned);

    const jwt = `${unsigned}.${signature}`;

    return jwt;
  }

  verify(token) {
    const [b64uHeader, b64uPayload, candidateSignature] = token.split('.');

    console.log(b64uHeader, this.#b64uHeader);
    if (b64uHeader !== this.#b64uHeader) {
      throw new InvalidHeaderError();
    }

    const payload = Utils.convertBase64UrlToObject(b64uPayload);
    
    const expired = this.#verifyExpiration(payload.exp);

    if (expired) {
      throw new JwtExpiredError();
    }

    const unsigned = `${b64uHeader}.${b64uPayload}`;
    const signature = this.sign(unsigned);

    const verified = candidateSignature === signature;

    return verified;
  }

  #verifyExpiration(exp) {
    const expired = exp < Date.now();

    return expired;
  }

  sign() {
    throw new AbstractMethodError(); 
  }
}

module.exports = { BaseStrategy };
