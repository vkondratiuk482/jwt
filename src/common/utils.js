class Utils {
  static convertObjectToBase64Url(data) {
    /* JSON.stringify is definitely unoptimal and will be removed in future */
    const serialized = Buffer.from(JSON.stringify(data));
    return serialized.toString('base64url');
  }

  static convertBase64UrlToObject(b64uData) {
    const data = Buffer.from(b64uData, 'ascii').toString('ascii');
    /* Figure out why doesn't it work */
    return JSON.parse(JSON.stringify(data));
  }
}

module.exports = { Utils };
