'use strict';

const { Jwt } = require('../src/jwt.js');
const { HS256Strategy} = require('../src/strategies/hs256.js');

const jwt = new Jwt(new HS256Strategy({
  secret: 'JWT_SECRET',
  ttl: 100000,
}));
const token = jwt.generate({ id: '123' });
const invalid_header = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVDEifQ.eyJpZCI6IjEyMyIsImV4cCI6IjExNjcyNjc2NzQxNjM0In0.67iDd-sQQ-vIV6xJNxd7jfw49COMVpTdlsDO1B7D4l0';
const invalid_signature = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsImV4cCI6IjExNjcyNjc2NzQxNjM0In0.II6vtdyDd7qHnnWAmLCrYA99GgGLjru1tyXwbpKAkKI';

try {
  console.log(jwt.verify(token)); // true 
} catch (err) {
  console.log(err);
}

try {
  console.log(jwt.verify(invalid_header)); // false
} catch (err) {
  console.log(err);
}

try {
  console.log(jwt.verify(invalid_signature)); // false
} catch (err) {
  console.log(err);
}

const expired_token = jwt.generate({ id: '123' }, { ttl: 2000 })

try {
  console.log(jwt.verify(expired_token)); // true 
} catch (err) {
  console.log(err);
}

try {
  setTimeout(() => {
    console.log(jwt.verify(expired_token)); // false 
  }, 3000);
} catch (err) {
  console.log(err);
}

