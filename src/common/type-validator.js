'use strict';

class TypeValidator {
  static validateJwtOptions(options) {
    if (!Number.isInteger(options.ttl) || options.ttl <= 0) {
      throw new TypeError('JWT ttl has to be an integer more than 0');
    }

    return ;
  }
}

module.exports = { TypeValidator };
