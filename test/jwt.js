const assert = require('node:assert');
const { describe, it } = require('node:test');
const { Jwt } = require('../src/jwt.js');
const { HS256Strategy } = require('../src/strategies/hs256.js');
const { RS256Strategy } = require('../src/strategies/rs256.js');
const { InvalidHeaderError } = require('../src/errors/invalid-header-error.js');


describe('HS256Strategy', () => {
  it('TypeError', () => {
    assert.throws(() => {
      const ttl = 'ttl';
      const secret = 'ANY_SECRET';

      const jwt = new Jwt(new HS256Strategy({
        ttl,
        secret,
      }));
    }, TypeError);

    assert.throws(() => {
      const ttl = -1;
      const secret = 'ANY_SECRET';

      const jwt = new Jwt(new HS256Strategy({
        ttl,
        secret,
      }));
    }, TypeError);
  });

  it('InvalidHeaderError', () => {
    assert.throws(() => {
      const ttl = 10000;
      const secret = 'ANY_SECRET';

      const jwt = new Jwt(new HS256Strategy({
        ttl,
        secret,
      }));

      const invalidHeaderJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVDEifQ.eyJpZCI6IjEyMyIsImV4cCI6IjExNjcyNjc2NzQxNjM0In0.67iDd-sQQ-vIV6xJNxd7jfw49COMVpTdlsDO1B7D4l0';

      jwt.verify(invalidHeaderJwt);
    }, InvalidHeaderError);
  });
});
