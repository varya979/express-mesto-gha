const User = require('../models/user');

const {
  ERROR_CODE,
  NOT_FOUND_CODE,
  SERVER_ERROR_CODE,
  SERVER_ERROR_MESSAGE,
} = require('../utils/constants');

const { BadRequestError } = require('../errors/bad-request-error');
const { NotFoundError } = require('../errors/not-found-error');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send({ data: users });
  } catch (err) {
    res.status(SERVER_ERROR_CODE).send({ message: SERVER_ERROR_MESSAGE });
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId)
      // .orFail - если база возвращает пустой объект, то выполнение кода дальше не выполняется,
      // а переходит в catch
      .orFail(new NotFoundError('Пользователь по указанному id не найден'));
    res.send({ data: user });
  } catch (err) {
    // instanceof определяет является ли ошибка экземпляром класса NotFoundError:
    if (err instanceof NotFoundError) {
      // и если является (true) - выполняется код:
      res.status(NOT_FOUND_CODE).send({ message: err.message }); // 404
      // если ошибка им не является, выполняется:
    } else if (err.name === 'CastError') {
      const Error = new BadRequestError('Передан некорректный id пользователя');
      res.status(ERROR_CODE).send({ message: Error.message }); // 400
    } else {
      res.status(SERVER_ERROR_CODE).send({ message: SERVER_ERROR_MESSAGE }); // 500
    }
  }
};

const createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    // если не заполнено одно из полей - выбрасываем ошибку оператором throw
    if (!name || !about || !avatar) {
      throw new BadRequestError();
    }
    const user = await User.create({ name, about, avatar });
    res.send({ data: user });
  } catch (err) {
    if (err instanceof BadRequestError || err.name === 'ValidationError') {
      res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при создании пользователя' }); // 400
    } else {
      res.status(SERVER_ERROR_CODE).send({ message: SERVER_ERROR_MESSAGE }); // 500
    }
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { _id } = req.user;
    const { name, about } = req.body;
    if (!name || !about) {
      throw new BadRequestError('Переданы некорректные данные при обновлении профиля');
    }
    const user = await User.findByIdAndUpdate(
      _id,
      { name, about },
      { new: true, runValidators: true }, // получим обновлённую и валидную запись
    )
      .orFail(new NotFoundError('Пользователь c указанным id не найден'));
    res.send({ data: user });
  } catch (err) {
    if (err instanceof BadRequestError) {
      res.status(ERROR_CODE).send({ message: err.message }); // 400
    } else if (err instanceof NotFoundError) {
      res.status(NOT_FOUND_CODE).send({ message: err.message }); // 404
    } else {
      res.status(SERVER_ERROR_CODE).send({ message: SERVER_ERROR_MESSAGE }); // 500
    }
  }
};

const updateUserAvatar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { avatar } = req.body;
    if (!avatar) {
      throw new BadRequestError('Переданы некорректные данные при обновлении аватара');
    }
    const user = await User.findByIdAndUpdate(
      _id,
      { avatar },
      { new: true, runValidators: true },
    )
      .orFail(new NotFoundError('Пользователь c указанным id не найден'));
    res.send({ data: user });
  } catch (err) {
    if (err instanceof BadRequestError) {
      res.status(ERROR_CODE).send({ message: err.message }); // 400
    } else if (err instanceof NotFoundError) {
      res.status(NOT_FOUND_CODE).send({ message: err.message }); // 404
    } else {
      res.status(SERVER_ERROR_CODE).send({ message: SERVER_ERROR_MESSAGE }); // 500
    }
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};
