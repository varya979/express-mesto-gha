const BAD_REQUEST_ERROR_CODE = 400; /* Ошибка на стороне клиента (запрос был неправильно
  сформирован): ValidationError, CastError */
const UNAUTHORIZED_ERROR_CODE = 401; /* Отсутствие токена (JWT), некорректный токен (JWT),
невалидный пароль - Unauthorized */
const FORBIDDEN_ERROR_CODE = 403; /* Обновление чужого профиля, чужого аватара, удаление чужой
карточки - Authorized but Forbidden */
const NOT_FOUND_CODE = 404; /* Пользователь, карточка по данному корректному ID не найдены
(поиск пользователя по іd, простановка/снятие лайка, удаление
карточки, изменение профиля/аватара несуществующего пользователя) */
const CONFLICT_ERROR_CODE = 409; /* зарегистрировать вторую учетную
запись на тот же email - Conflict */

const SERVER_ERROR_CODE = 500; // Общий статус для ошибок на стороне сервера
const SERVER_ERROR_MESSAGE = 'Ошибка на стороне сервера';

module.exports = {
  BAD_REQUEST_ERROR_CODE,
  NOT_FOUND_CODE,
  SERVER_ERROR_CODE,
  SERVER_ERROR_MESSAGE,
  CONFLICT_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
  FORBIDDEN_ERROR_CODE,
};
