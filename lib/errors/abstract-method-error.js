'use strict';

class AbstractMethodError extends Error {
  name = 'AbstractMethod';

  message = 'You have to extend the class and implement this method in order to use it';
}

module.exports = { AbstractMethodError };
