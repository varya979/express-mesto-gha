const RESOURCE_CREATED = 201; // Ресурс был создан на сервере (п.: при создании нового поста)
const ERROR_CODE = 400; // Ошибка на стороне клиента (п.: запрос был неправильно сформирован)
const UNAUTHORIZED_ERROR_CODE = 401; // Отсутствие токена, некорректный токен, невалидный пароль
const NOT_FOUND_CODE = 404; // Ресурс не найден (п.: пользователя с запрошенным id не существует)
const SERVER_ERROR_CODE = 500; // Общий статус для ошибок на стороне сервера. Это не ошибка клиента
const CONFLICT_ERROR_CODE = 409; //  Указывает на конфликт запроса с текущим состоянием сервера

const SERVER_ERROR_MESSAGE = 'Ошибка на сервере';

module.exports = {
  ERROR_CODE,
  NOT_FOUND_CODE,
  SERVER_ERROR_CODE,
  SERVER_ERROR_MESSAGE,
  RESOURCE_CREATED,
  CONFLICT_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
};
