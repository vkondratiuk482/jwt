'use strict';

const { TypeValidator } = require('../common/type-validator.js');

/**
 * Strategy for HS256 symmetric hashing algorithm
 */ 
class RS256Strategy {
  #publicKey;
  #privateKey;

  constructor(options) {
    const typ = 'JWT', alg = 'RS256';

    TypeValidator.validateJwtOptions(options);
 
    super({ typ, alg, ttl: options.ttl });

    this.#publicKey = options.publicKey;
    this.#privateKey = options.privateKey;
  }

  sign(unsigned) {
    throw new Error('Not implemented');
  } 
}
