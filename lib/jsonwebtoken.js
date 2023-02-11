'use strict';

class JSONWebToken {
  #strategy;

  constructor(strategy) {
    this.#strategy = strategy;
  }

  setStrategy(strategy) {
    this.#strategy = strategy;
  }

  generate(payload, options) {
    return this.#strategy.generate(payload, options);
  }

  verify(token) {
    return this.#strategy.verify(token);
  }
}

module.exports = { JSONWebToken };
