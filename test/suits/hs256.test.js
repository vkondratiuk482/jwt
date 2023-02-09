const assert = require('node:assert');
const { describe, it } = require('node:test');

const fixtures = require('../fixtures.js');
const {
  JSONWebToken,
  HS256Strategy,
  JwtExpiredError,
  InvalidHeaderError,
  InvalidSignatureError,
} = require('../../jwt.js');

const hs256Fixtures = fixtures.generateHS256Fixtures();

describe('HS256Strategy', () => {
  it('Successfully create and verify token', () => {
    const jwt = new JSONWebToken(new HS256Strategy({
      ttl: 10000,
      secret: hs256Fixtures.secret,
    }));

    const token = jwt.generate(hs256Fixtures.payload);
    const decoded = jwt.verify(token);

    assert.deepStrictEqual(decoded, hs256Fixtures.payload);
  });

  it('Invalid ttl type', () => {
    const handler = () => {
      new HS256Strategy({
        ttl: 'ttl',
        secret: hs256Fixtures.secret,
      });
    };

    assert.throws(handler, TypeError);
  });

  it('Invalid ttl value', () => {
    const handler = () => {
      new HS256Strategy({
        ttl: -1,
        secret: hs256Fixtures.secret,
      });
    };

    assert.throws(handler, TypeError);
  });

  it('InvalidHeaderError', () => {
    const handler = () => {
      const jwt = new JSONWebToken(new HS256Strategy({
        ttl: 10000,
        secret: hs256Fixtures.secret,
      }));

      jwt.verify(hs256Fixtures.invalid_header);
    };

    assert.throws(handler, InvalidHeaderError);
  });

  it('InvalidSignatureError', () => {
    const handler = () => {
      const jwt = new JSONWebToken(new HS256Strategy({
        ttl: 10000,
        secret: hs256Fixtures.secret,
      }));

      jwt.verify(hs256Fixtures.invalid_signature);
    };

    assert.throws(handler, InvalidSignatureError);
  });

  it('JwtExpiredError with options passed in constructor', (done) => {
    const jwt = new JSONWebToken(new HS256Strategy({
      ttl: 1000,
      secret: hs256Fixtures.secret,
    }));

    const token = jwt.generate(hs256Fixtures.payload);
    const decoded = jwt.verify(token);

    assert.deepStrictEqual(decoded, hs256Fixtures.payload);

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
    const jwt = new JSONWebToken(new HS256Strategy({
      ttl: 1000,
      secret: hs256Fixtures.secret,
    }));

    const token = jwt.generate(hs256Fixtures.payload, { ttl: 3000 });
    const decoded = jwt.verify(token);

    assert.deepStrictEqual(decoded, hs256Fixtures.payload);

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
