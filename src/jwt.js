class Jwt {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  generate(payload) {
    return this.strategy.generate(payload);
  }

  verify(token) {
    return this.strategy.verify(token);
  }
}

module.exports = { Jwt };
