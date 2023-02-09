'use strict';

class InvalidSignatureError extends Error {
  name = 'InvalidSignatureError';

  message = 'Jwt invalid signature';
}

module.exports = { InvalidSignatureError };
