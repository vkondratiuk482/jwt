const assert = require('node:assert');
const { describe, it } = require('node:test');

const fixtures = require('../fixtures.js');
const {
  JSONWebToken,
  RS256Strategy,
  JwtExpiredError,
  InvalidHeaderError,
  InvalidSignatureError,
} = require('../../jwt.js');

const rs256Fixtures = fixtures.generateRS256Fixtures();

describe('RS256Strategy', () => {
  it('Successfully create and verify token', () => {
    const jwt = new JSONWebToken(
      new RS256Strategy({
        ttl: 10000,
        publicKey: rs256Fixtures.keys.publicKey,
        privateKey: rs256Fixtures.keys.privateKey,
      }),
    );

    const token = jwt.generate(rs256Fixtures.payload);
    const decoded = jwt.verify(token);

    assert.deepStrictEqual(decoded, rs256Fixtures.payload);
  });

  it('Invalid ttl type', () => {
    const handler = () => {
      new RS256Strategy({
        ttl: 'ttl',
        publicKey: rs256Fixtures.keys.publicKey,
        privateKey: rs256Fixtures.keys.privateKey,
      });
    };

    assert.throws(handler, TypeError);
  });

  it('Invalid ttl value', () => {
    const handler = () => {
      new RS256Strategy({
        ttl: -1,
        publicKey: rs256Fixtures.keys.publicKey,
        privateKey: rs256Fixtures.keys.privateKey,
      });
    };

    assert.throws(handler, TypeError);
  });

  it('InvalidHeaderError', () => {
    const handler = () => {
      const jwt = new JSONWebToken(
        new RS256Strategy({
          ttl: 10000,
          publicKey: rs256Fixtures.keys.publicKey,
          privateKey: rs256Fixtures.keys.privateKey,
        }),
      );

      jwt.verify(rs256Fixtures.invalid_header);
    };

    assert.throws(handler, InvalidHeaderError);
  });

  it('InvalidSignatureError', () => {
    const handler = () => {
      const jwt = new JSONWebToken(
        new RS256Strategy({
          ttl: 10000,
          publicKey: rs256Fixtures.keys.publicKey,
          privateKey: rs256Fixtures.keys.privateKey,
        }),
      );

      jwt.verify(rs256Fixtures.invalid_signature);
    };

    assert.throws(handler, InvalidSignatureError);
  });

  it('JwtExpiredError with options passed in constructor', (done) => {
    const jwt = new JSONWebToken(
      new RS256Strategy({
        ttl: 1000,
        publicKey: rs256Fixtures.keys.publicKey,
        privateKey: rs256Fixtures.keys.privateKey,
      }),
    );

    const token = jwt.generate(rs256Fixtures.payload);
    const decoded = jwt.verify(token);

    assert.deepStrictEqual(decoded, rs256Fixtures.payload);

    setTimeout(() => {
      try {
        jwt.verify(token);
      } catch (err) {
        assert(err instanceof JwtExpiredError);
        done();
      }
    }, 2000);
  });

  it('Prevent JwtExpiredError by overriding options in "generate" method', (done) => {
    const jwt = new JSONWebToken(
      new RS256Strategy({
        ttl: 1000,
        publicKey: rs256Fixtures.keys.publicKey,
        privateKey: rs256Fixtures.keys.privateKey,
      }),
    );

    const token = jwt.generate(rs256Fixtures.payload, { ttl: 3000 });
    const decoded = jwt.verify(token);

    assert.deepStrictEqual(decoded, rs256Fixtures.payload);

    setTimeout(() => {
      try {
        jwt.verify(token);
        done();
      } catch (err) {
        // won't happen
      }
    }, 2000);
  });
});
