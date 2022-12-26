const { Jwt } = require('../src/jwt.js');
const { HS256Strategy} = require('../src/strategies/hs256.js');

const jwt = new Jwt(new HS256Strategy('JWT_SECRET'));
console.log(jwt.generate({ id: '123' }));

