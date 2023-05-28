const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { incorrectRouter } = require('./errors/incorrect-router');

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
    _id: '6470f6057a1475c05a4b5821', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use('/', userRouter);
app.use('/', cardRouter);

app.use('*', incorrectRouter);

app.listen(PORT);
