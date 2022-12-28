const { Jwt } = require('../src/jwt.js');
const { HS256Strategy} = require('../src/strategies/hs256.js');

const jwt = new Jwt(new HS256Strategy('JWT_SECRET'));
const token = jwt.generate({ id: '123' });
const invalid_header = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVDEifQ.eyJpZCI6IjEyMyJ9.6UgQKiKBs4205qS7ZDXNtciCQXqsVuCwqmITDnHpwck';
const invalid_signature = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyJ9.PA31p8mNGLtkClbdbUM0QL7HuYX7XZuoZTlW1o5ELXY';

console.log(jwt.verify(token));
console.log(jwt.verify(invalid_header));
console.log(jwt.verify(invalid_signature));

