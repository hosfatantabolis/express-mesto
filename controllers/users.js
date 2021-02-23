const User = require('../models/user');
const { NotFound } = require('../utils/errors');

const {
  USER_NOT_FOUND,
  NO_USERS,
} = require('../utils/error_messages');

const getUsers = (req, res, next) => {
  User.find()
    .then((data) => {
      if (!data) {
        throw new NotFound(NO_USERS);
      }
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFound(USER_NOT_FOUND);
      }
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

const getMe = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .then((user) => {
      if (!user) {
        throw new NotFound(USER_NOT_FOUND);
      }
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

const updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFound(USER_NOT_FOUND);
      }
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFound(USER_NOT_FOUND);
      }
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
  getMe,
};
