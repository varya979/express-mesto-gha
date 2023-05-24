// Команда npm run start запускает сервер на localhost:3000 ;
// Команда npm run dev запускает сервер на localhost:3000 с hot reload;
// При запуске команды npm run lint выполняется проверка проекта,
// в результате работы которой должны отсутствовать ошибки линтинга

// подключаем экспресс
const express = require('express');
// подключаем mongoose
const mongoose = require('mongoose');

// создаем приложение методом express
const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(3000, () => console.log('привет'));
