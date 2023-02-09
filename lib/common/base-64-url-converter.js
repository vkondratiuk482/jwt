'use strict';

class Base64UrlConverter {
  static toString(data) {
    const serialized = Buffer.from(JSON.stringify(data));
    return serialized.toString('base64url');
  }

  static toJSON(b64uData) {
    const data = Buffer.from(b64uData, 'base64url').toString();
    return JSON.parse(data);
  }
}

module.exports = { Base64UrlConverter };
