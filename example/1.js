const { Jwt } = require('../src/Jwt.js');
const { HS256Strategy} = require('../src/strategies/HS256Strategy.js');

const jwt = new Jwt(new HS256Strategy('JWT_SECRET'));
console.log(jwt.generate({ id: '123' }));

