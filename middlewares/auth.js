const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // // тут будет вся авторизация:
  // // достаём авторизационный заголовок "authorization"
  // const { authorization } = req.headers;

  // // убеждаемся, что заголовок есть или начинается с Bearer: (Bearer - это схема аутентификации
  // // — она  сообщает серверу, что проверять наличие прав у пользователя нужно по токену)
  // if (!authorization || !authorization.startsWith('Bearer ')) {
  //   return res
  //     .status(401)
  //     .send({ message: 'Необходима авторизация' });
  // }

  // // извлечём токен:
  // // вызовем метод replace, чтобы выкинуть из заголовка приставку 'Bearer '
  // // Таким образом, в переменную token запишется только JWT.
  // const token = authorization.replace('Bearer ', '');

  const token = req.cookies.jwt; // достаём токен из кук с помощью куки-парсера в app.js

  let payload;

  try {
    // попытаемся верифицировать токен (прислал именно тот токен, который был выдан ему ранее):
    payload = jwt.verify(token, 'token-jwt'); // два параметра: токен и секретный ключ.
    // Метод jwt.verify вернёт пейлоуд токена, если тот прошёл проверку
  } catch (err) {
    // отправим ошибку, если не получилось
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
