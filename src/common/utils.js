class Utils {
  static convertObjectToBase64Url(data) {
    /* JSON.stringify is definitely unoptimal and will be removed in future */
    const serialized = Buffer.from(JSON.stringify(data));
    return serialized.toString('base64url');
  }
}

module.exports = { Utils };
