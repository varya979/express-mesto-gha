const incorrectRouter = (req, res) => {
  res.statusCode(404).send({ message: 'Указанный путь не существует' });
};

module.exports = incorrectRouter;
