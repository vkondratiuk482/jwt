'use strict';

class JwtExpiredError extends Error {
  name = 'JwtExpired';

  message = 'Jwt token has already expired';
}

module.exports = { JwtExpiredError };
