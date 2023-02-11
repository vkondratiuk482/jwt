'use strict';

const crypto = require('node:crypto');

const generateHS256Fixtures = () => ({
  secret: crypto.randomBytes(16).toString(),
  payload: {
    id: crypto.randomUUID(),
  },
  invalid_header:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVDEifQ.eyJpZCI6IjEyMyIsImV4cCI6IjExNjcyNjc2NzQxNjM0In0.67iDd-sQQ-vIV6xJNxd7jfw49COMVpTdlsDO1B7D4l0',
  invalid_signature:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.8zKJVblXgHueU7P8Ov1II4zZvIqLJwd4z4Ha9YeQnzg',
});

const generateRS256Fixtures = () => ({
  secret: crypto.randomBytes(16).toString(),
  payload: {
    id: crypto.randomUUID(),
  },
  keys: crypto.generateKeyPairSync('rsa', {
    modulusLength: 1024,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  }),
  invalid_header:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVDEifQ.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.JRSYJmMxPIAwj42oqibGxrC_ITdTl7bPfZO78dOVMegvpzNinppPaxTweKx957wnCY554-mHzfqG8OF7Ygghi4LIAzK-uNfqE3Iec8Yc7W_CVhY04zwr8sJU3TCok9euyBYD6-M6V4qoSa67Jpg0TT3k33XOYIHt1BmA9oYHHeqXCLwqvLNAgWOD_sizOLqQcoDtPqKeXrm0WQXl8lXRmoD6UUr9fNmbnOTDEvGqpCu0F131iSn6_6R2qy3R2QiphcTJT5R_FAGm3WcaeXUR-UAvi8PGkfKClChZxUH0-t3d3alJuqg61uVNaIm4GnK4VAe0wZi4pE-zNClxfLerjQ',
  invalid_signature:
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.Eci61G6w4zh_u9oOCk_v1M_sKcgk0svOmW4ZsL-rt4ojGUH2QY110bQTYNwbEVlowW7phCg7vluX_MCKVwJkxJT6tMk2Ij3Plad96Jf2G2mMsKbxkC-prvjvQkBFYWrYnKWClPBRCyIcG0dVfBvqZ8Mro3t5bX59IKwQ3WZ7AtGBYz5BSiBlrKkp6J1UmP_bFV3eEzIHEFgzRa3pbr4ol4TK6SnAoF88rLr2NhEz9vpdHglUMlOBQiqcZwqrI-Z4XDyDzvnrpujIToiepq9bCimPgVkP54VoZzy-mMSGbthYpLqsL_4MQXaI1Uf_wKFAUuAtzVn4-ebgsKOpvKNzVA',
});

module.exports = { generateHS256Fixtures, generateRS256Fixtures };
