const { NOT_FOUND_CODE } = require('../utils/constants');

const incorrectRouter = (req, res) => {
  res.status(NOT_FOUND_CODE).send({ message: 'Указанный путь не существует' });
};

module.exports = { incorrectRouter };
