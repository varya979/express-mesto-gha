const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { incorrectRouter } = require('./errors/incorrect-router');
const { login, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* В схеме карточки есть поле owner для хранения её автора.
Но в запросе клиент передаёт только имя карточки и ссылку на картинку.
В следующей теме вы узнаете, как решить эту проблему, а пока реализуйте временное решение.
Создайте мидлвэр: */
app.use((req, res, next) => {
  req.user = {
    _id: '6479e9da03f346cad51669ac', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/', userRouter);
app.use('/', cardRouter);

app.use('*', incorrectRouter);

app.listen(PORT, console.log('сервер работает как нужно'));
