// подключаем mongoose
const mongoose = require('mongoose');

//  задаем схему для пользователя через Mongoose
const userSchema = new mongoose.Schema({
  name: { // имя пользователя:
    type: String,
    required: true, // это обязательное поле
    minlength: 2,
    maxlength: 30,
  },
  about: { // информация о пользователе
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: { // аватар
    type: String,
    required: true,
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
