'use strict';

class InvalidHeaderError extends Error {
  name = 'InvalidHeader';

  message = 'Jwt invalid headers';
}

module.exports = { InvalidHeaderError };
