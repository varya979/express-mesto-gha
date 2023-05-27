// Команда npm run start запускает сервер на localhost:3000 ;
// Команда npm run dev запускает сервер на localhost:3000 с hot reload;
// При запуске команды npm run lint выполняется проверка проекта,
// в результате работы которой должны отсутствовать ошибки линтинга

// подключаем экспресс
const express = require('express');
// подключаемся mongoose
const mongoose = require('mongoose');

// импортируем мидлвэр body-parser
const bodyParser = require('body-parser');

const userRouter = require('./routes/users'); // импортируем роутер

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

// создаем приложение методом express
const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', userRouter); // запускаем

app.listen(PORT, () => {
// Если всё работает, консоль покажет, какой порт приложение слушает
  console.log('Подключились к 3000 порту');
});
