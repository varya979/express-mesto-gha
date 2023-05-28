const ERROR_CODE = 400; // Ошибка на стороне клиента (п.: запрос был неправильно сформирован).
const NOT_FOUND_CODE = 404; // Ресурс не найден (п.: пользователя с запрошенным id не существует)
const SERVER_ERROR_CODE = 500; // Общий статус для ошибок на стороне сервера. Это не ошибка клиента.

const SERVER_ERROR_MESSAGE = 'Ошибка на сервере';

module.exports = {
  ERROR_CODE,
  NOT_FOUND_CODE,
  SERVER_ERROR_CODE,
  SERVER_ERROR_MESSAGE,
};
