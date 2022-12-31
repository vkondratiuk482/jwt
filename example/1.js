'use strict';

const { Jwt } = require('../src/jwt.js');
const { HS256Strategy} = require('../src/strategies/hs256.js');

const jwt = new Jwt(new HS256Strategy({
  secret: 'JWT_SECRET',
  ttl: 100000,
}));
const token = jwt.generate({ id: '123' });
const invalid_header = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVDEifQ.eyJpZCI6IjEyMyJ9.6UgQKiKBs4205qS7ZDXNtciCQXqsVuCwqmITDnHpwck';
const invalid_signature = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEyMyJ9.GTnN3wAmn5R1lZM6VEAqgTedHeJtPm67i-fOD3hNRG0';

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
  console.log('1111', err);
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

