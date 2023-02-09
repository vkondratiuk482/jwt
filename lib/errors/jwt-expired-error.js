'use strict';

class JwtExpiredError extends Error {
  name = 'JwtExpired';

  message = 'Jwt has already expired';
}

module.exports = { JwtExpiredError };
