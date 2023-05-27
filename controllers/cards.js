const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

/* В файле app.js создан мидлвэр:
 app.use((req, res, next) => {
   req.user = {
     _id: '5d8b8592978f8bd833ca8133' // вставьте сюда _id пользователя из mongoDB Compass
   };

   next();
 });
Он добавляет в каждый запрос объект user.
Берем из него _id пользователя в контроллере создания карточки.
Это временное решение. Мы захардкодили идентификатор пользователя, поэтому
кто бы ни создал карточку, в базе у неё будет один и тот же автор. Ничего
страшного — исправим это в следующем спринте. */
const createCard = (req, res) => {
  const { _id } = req.user;
  const { name, link } = req.body;
  Card.create({ name, link, owner: _id })
    // вернём записанные в базу данные
    .then((card) => res.send({ data: card }))
    // данные не записались, вернём ошибку
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const deleteCardById = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then(() => res.send({ message: `Карточка с id: '${cardId}' удалена` }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const likeCard = (req, res) => {
  const { _id } = req.user;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: _id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then(() => res.send({ message: `Карточке с id: '${cardId}' добавлен лайк` }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const dislikeCard = (req, res) => {
  const { _id } = req.user;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: _id } }, // убрать _id из массива
    { new: true },
  )
    .then(() => res.send({ message: `У карточки с id: '${cardId}' удален лайк` }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
