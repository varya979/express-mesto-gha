const userRouter = require('express').Router();
const User = require('../models/user');

userRouter.get('/users', (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
});

userRouter.get('/users/:userId', (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
});

userRouter.post('/users', (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    // вернём записанные в базу данные
    .then((user) => res.send({ data: user }))
    // данные не записались, вернём ошибку
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
});

// const { getUsers, getUser, createUser } = require('../controllers/users');

// userRouter.get('/users', getUsers);
// userRouter.get('/users/:userId', getUser);
// userRouter.post('/users', createUser);

module.exports = userRouter; // экспортировали роутер
