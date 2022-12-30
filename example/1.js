const { Jwt } = require('../src/jwt.js');
const { HS256Strategy} = require('../src/strategies/hs256.js');

const jwt = new Jwt(new HS256Strategy({
  secret: 'JWT_SECRET',
  ttl: 100000,
}));
const token = jwt.generate({ id: '123' });
const invalid_header = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVDEifQ.eyJpZCI6IjEyMyJ9.6UgQKiKBs4205qS7ZDXNtciCQXqsVuCwqmITDnHpwck';
const invalid_signature = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyJ9.PA31p8mNGLtkClbdbUM0QL7HuYX7XZuoZTlW1o5ELXY';

console.log(jwt.verify(token)); // true 
console.log(jwt.verify(invalid_header)); // false
console.log(jwt.verify(invalid_signature)); // false

const expired_token = jwt.generate({ id: '123' }, { ttl: 2000 })
console.log(jwt.verify(expired_token)); // true 
setTimeout(() => {
  console.log(jwt.verify(expired_token)); // false 
}, 3000);

