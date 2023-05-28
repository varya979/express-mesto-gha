// 400

const { ERROR_CODE } = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = ERROR_CODE;
  }
}

module.exports = { BadRequestError };
