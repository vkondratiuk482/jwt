const assert = require('node:assert');
const { describe, it } = require('node:test');
const { Jwt } = require('../lib/jwt.js');
const { HS256Strategy } = require('../lib/strategies/hs256.js');
const { RS256Strategy } = require('../lib/strategies/rs256.js');
const { InvalidHeaderError } = require('../lib/errors/invalid-header-error.js');
const { InvalidSignatureError } = require('../lib/errors/invalid-signature-error.js');
const { JwtExpiredError } = require('../lib/errors/jwt-expired-error.js');

const secret = 'ANY_SECRET';
const payload = { id: 1 };
const invalid_header_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVDEifQ.eyJpZCI6IjEyMyIsImV4cCI6IjExNjcyNjc2NzQxNjM0In0.67iDd-sQQ-vIV6xJNxd7jfw49COMVpTdlsDO1B7D4l0';
const invalid_signature_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsImV4cCI6IjExNjcyNjc2NzQxNjM0In0.7s0MhJSiWSsyOsNRiWjgJTLk9Y_Fz6tY4FcwFpDkfQY';

describe('HS256Strategy', () => {
  it('Successfully create and verify token', () => {
    const jwt = new Jwt(new HS256Strategy({
      secret,
      ttl: 10000,
    }));

    const token = jwt.generate(payload);
    const decoded = jwt.verify(token);

    assert.deepStrictEqual(decoded, payload);
  });

  it('Invalid ttl type', () => {
    const handler = () => {
      new HS256Strategy({
        secret,
        ttl: 'ttl',
      });
    };

    assert.throws(handler, TypeError);
  });

  it('Invalid ttl value', () => {
    const handler = () => {
      new HS256Strategy({
        secret,
        ttl: -1,
      });
    };

    assert.throws(handler, TypeError);
  });

  it('InvalidHeaderError', () => {
    const handler = () => {
      const jwt = new Jwt(new HS256Strategy({
        secret,
        ttl: 10000,
      }));

      jwt.verify(invalid_header_token);
    };

    assert.throws(handler, InvalidHeaderError);
  });

  it('InvalidSignatureError', () => {
    const handler = () => {
      const jwt = new Jwt(new HS256Strategy({
        secret,
        ttl: 10000,
      }));

      jwt.verify(invalid_signature_token);
    };

    assert.throws(handler, InvalidSignatureError);
  });

  it('JwtExpiredError with options passed in constructor', (done) => {
    const jwt = new Jwt(new HS256Strategy({
      secret,
      ttl: 1000,
    }));

    const token = jwt.generate(payload);
    const decoded = jwt.verify(token);

    assert.deepStrictEqual(decoded, payload);

    setTimeout(() => {
      try {
        jwt.verify(token)
      } catch (err) {
        assert(err instanceof JwtExpiredError);
        done();
      }
    }, 2000);
  });

  it('Prevent JwtExpiredError by overriding options in "generate" method', (done) => {
    const jwt = new Jwt(new HS256Strategy({
      secret,
      ttl: 1000,
    }));

    const token = jwt.generate(payload, { ttl: 3000 });
    const decoded = jwt.verify(token);

    assert.deepStrictEqual(decoded, payload);

    setTimeout(() => {
      try {
        jwt.verify(token)
        done();
      } catch (err) {
        // won't happen
      }
    }, 2000);
  });
});
