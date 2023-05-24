// подключаем mongoose
const mongoose = require('mongoose');

//  задаем схему для карточки через Mongoose
const cardSchema = new mongoose.Schema({
  name: { // имя карточки:
    type: String, // это строка
    required: true, // это обязательное поле
    minlength: 2, // минимальная длина — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  link: { // ссылка на картинку:
    type: String, // это строка
    required: true, // это обязательное поле
  },
  owner: { // ссылка на модель автора карточки:
    /* Лучшая ссылка из одного документа на другой — идентификатор.
    Mongo автоматически создаёт поле `_id` — уникальный идентификатор
    для каждого документа. Этот идентификатор позволяет связать один документ с другим.
    Чтобы сделать это на уровне схемы, полю следует установить специальный тип —
    `mongoose.Schema.Types.ObjectId` и свойство `ref`. */
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{ // список лайкнувших пост пользователей
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: { // дата создания
    type: Date,
    default: 'Date.now',
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model('card', cardSchema);
