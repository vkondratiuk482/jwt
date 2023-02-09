'use strict';

class AbstractClassError extends Error {
  name = 'AbstractClass';

  message = 'You can not instantiate abstract classes';
}

module.exports = { AbstractClassError };
