'use strict';

class Utils {
  static convertObjectToBase64Url(data) {
    const serialized = Buffer.from(JSON.stringify(data));

    return serialized.toString('base64url');
  }

  static convertBase64UrlToObject(b64uData) {
    const data = Buffer.from(b64uData, 'base64url').toString();

    return JSON.parse(data);
  }
}

module.exports = { Utils };
