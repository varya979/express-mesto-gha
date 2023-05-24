// подключаем mongoose
const mongoose = require('mongoose');

//  задаем схему для пользователя через Mongoose
const userSchema = new mongoose.Schema({
  name: { // имя пользователя:
    type: String, // это строка
    required: true, // это обязательное поле
    minlength: 2, // минимальная длина — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  about: { // информация о пользователе
    type: String, // это строка
    required: true, // это обязательное поле
    minlength: 2, // минимальная длина — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  avatar: { // аватар
    type: String, // это строка
    required: true, // это обязательное поле
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
