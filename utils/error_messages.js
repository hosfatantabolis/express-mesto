const VALIDATION_ERROR = { message: 'Введены некорректные данные' };
const USER_NOT_FOUND = { message: 'Пользователь не найден' };
const CARD_NOT_FOUND = { message: 'Карточка с таким ID не найдена' };
const SERVER_ERROR = { message: 'Ошибка на сервере. Код: 500' };
const INVALID_URL = { message: 'Запрашиваемый ресурс не найден' };

module.exports = {
  VALIDATION_ERROR,
  USER_NOT_FOUND,
  SERVER_ERROR,
  CARD_NOT_FOUND,
  INVALID_URL,
};
