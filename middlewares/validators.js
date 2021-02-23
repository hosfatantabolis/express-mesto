const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const signupValidator = celebrate({
  body: {
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Минимально 2 символа',
      'string.max': 'Максимум 30 символов',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.min': 'Минимально 2 символа',
      'string.max': 'Максимум 30 символов',
    }),
    avatar: Joi.string().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.message('Некорректная ссылка');
    }),
    email: Joi.string().required().custom((value, helper) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helper.message('Некорректный E-mail');
    }).messages({
      'string.empty': 'E-mail - это обязательное поле',
    }),
    password: Joi.string().required().min(6).messages({
      'string.min': 'Минимально 6 символов',
      'string.empty': 'Пароль - это обязательное поле',
    }),
  },
});

const loginValidator = celebrate({
  body: {
    email: Joi.string().required().custom((value, helper) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helper.message('Некорректный E-mail');
    }).messages({
      'string.empty': 'E-mail - это обязательное поле',
    }),
    password: Joi.string().required().min(6).messages({
      'string.min': 'Минимально 6 символов',
      'string.empty': 'Пароль - это обязательное поле',
    }),
  },
});

const postCardValidator = celebrate({
  body: {
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Минимально 2 символа',
      'string.max': 'Максимум 30 символов',
    }),
    link: Joi.string().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.message('Некорректная ссылка');
    }),
  },
  headers: Joi.object().keys({
    authorization: Joi.string().required().messages({
      'any.required': 'Необходима авторизация',
    }),
  }).unknown(true),
});

const deleteCardValidator = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required().messages({
      'any.required': 'Необходима авторизация',
    }),
  }).unknown(true),
  params: {
    id: Joi.string().required().messages({
      'any.required': 'Не передан ID карточки',
    }),
  },
});

const likeAndDislikeCardValidator = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required().messages({
      'any.required': 'Необходима авторизация',
    }),
  }).unknown(true),
  params: {
    id: Joi.string().required().messages({
      'any.required': 'Не передан ID карточки',
    }),
  },
});

const getUsersValidator = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required().messages({
      'any.required': 'Необходима авторизация',
    }),
  }).unknown(true),
});

const getUsersByIdValidator = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required().messages({
      'any.required': 'Необходима авторизация',
    }),
  }).unknown(true),
  params: {
    id: Joi.string().required().messages({
      'any.required': 'Не передан ID пользователя',
    }),
  },
});

const getMeValidator = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required().messages({
      'any.required': 'Необходима авторизация',
    }),
  }).unknown(true),
});

const updateUserInfoValidator = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required().messages({
      'any.required': 'Необходима авторизация',
    }),
  }).unknown(true),
  body: {
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Минимально 2 символа',
      'string.max': 'Максимум 30 символов',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.min': 'Минимально 2 символа',
      'string.max': 'Максимум 30 символов',
    }),
  },
});

const updateAvatarValidator = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required().messages({
      'any.required': 'Необходима авторизация',
    }),
  }).unknown(true),
  body: {
    avatar: Joi.string().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.message('Некорректная ссылка');
    }),
  },
});

module.exports = {
  signupValidator,
  loginValidator,
  postCardValidator,
  deleteCardValidator,
  likeAndDislikeCardValidator,
  getUsersValidator,
  getUsersByIdValidator,
  getMeValidator,
  updateUserInfoValidator,
  updateAvatarValidator,
};
