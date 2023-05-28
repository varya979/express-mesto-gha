const { ERROR_CODE } = require('../utils/constants');

const incorrectRouter = (req, res) => {
  res.status(ERROR_CODE).send({ message: 'Указанный путь не существует'});
};

module.exports = { incorrectRouter };
