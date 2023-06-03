const Card = require('../models/card');

const {
  ERROR_CODE,
  NOT_FOUND_CODE,
  SERVER_ERROR_CODE,
  SERVER_ERROR_MESSAGE,
  RESOURCE_CREATED,
  UNAUTHORIZED_ERROR_CODE,
} = require('../utils/constants');

const { BadRequestError } = require('../errors/bad-request-error');
const { NotFoundError } = require('../errors/not-found-error');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    res.status(SERVER_ERROR_CODE).send({ message: SERVER_ERROR_MESSAGE }); // 500
  }
};

const createCard = async (req, res) => {
  try {
    const { _id } = req.user;
    const { name, link } = req.body;
    // если не заполнено одно из полей - выбрасываем ошибку оператором throw
    if (!name || !link) {
      throw new BadRequestError();
    }
    const card = await Card.create({ name, link, owner: _id });
    res.status(RESOURCE_CREATED).send(card); // 201
  } catch (err) {
    if (err instanceof BadRequestError || err.name === 'ValidationError') {
      res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при создании карточки' }); // 400
    } else {
      res.status(SERVER_ERROR_CODE).send({ message: SERVER_ERROR_MESSAGE }); // 500
    }
  }
};

const deleteCardById = (req, res) => {
  Card.findById(req.params.cardId)
    // если база возвращает пустой объект, то код дальше не выполняется, а переходит в catch
    .orFail(new NotFoundError())
    .then((card) => {
      // если поле id пользователя совпадает с полем владельца карточки - карточку удаляем
      if (String(req.user._id) === String(card.owner)) {
        Card.findByIdAndRemove(req.params.cardId)
          .then((deletedCard) => res.send(deletedCard));
      } else {
        res.status(UNAUTHORIZED_ERROR_CODE).send({ message: 'Нет пользовательских прав на удаление' }); // 401
      }
    })
    .catch((err) => {
    // instanceof определяет является ли ошибка экземпляром класса NotFoundError:
      if (err instanceof NotFoundError) {
      // и если является (true) - выполняется код:
        res.status(NOT_FOUND_CODE).send({ message: err.message }); // 404
      } else if (err.name === 'CastError') {
        const Error = new BadRequestError('Переданы некорректные данные при удалении карточки');
        res.status(ERROR_CODE).send({ message: Error.message }); // 400
      } else {
        res.status(SERVER_ERROR_CODE).send({ message: SERVER_ERROR_MESSAGE }); // 500
      }
    });
};

const likeCard = async (req, res) => {
  try {
    const { _id } = req.user;
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: _id } }, // добавить _id в массив, если его там нет
      { new: true },
    )
      .orFail(new NotFoundError('Передан несуществующий id карточки'));
    res.send({ likes: card.likes });
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(NOT_FOUND_CODE).send({ message: err.message }); // 404
      /* Если передать некорректный _id - до поиска по базе дело не доходит,
      ошибка вылетает на этапе приведения/превращения (casting) текстового
      представления (которое видим мы) в Mongo.objectId, и тип ошибки
      будет говорить о неудаче преобразования (Cast Error). */
    } else if (err.name === 'CastError') {
      const Error = new BadRequestError('Переданы некорректные данные для постановки лайка');
      res.status(ERROR_CODE).send({ message: Error.message }); // 400
    } else {
      res.status(SERVER_ERROR_CODE).send({ message: SERVER_ERROR_MESSAGE }); // 500
    }
  }
};

const dislikeCard = async (req, res) => {
  try {
    const { _id } = req.user;
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: _id } }, // убрать _id из массива
      { new: true },
    )
      .orFail(new NotFoundError('Передан несуществующий id карточки'));
    res.send({ likes: card.likes });
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(NOT_FOUND_CODE).send({ message: err.message }); // 404
    } else if (err.name === 'CastError') {
      const Error = new BadRequestError('Переданы некорректные данные для снятия лайка');
      res.status(ERROR_CODE).send({ message: Error.message }); // 400
    } else {
      res.status(SERVER_ERROR_CODE).send({ message: SERVER_ERROR_MESSAGE }); // 500
    }
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
