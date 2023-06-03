const incorrectRouter = (req, res) => {
  res.status(404).send({ message: 'Указанный путь не существует' });
};

module.exports = incorrectRouter;
