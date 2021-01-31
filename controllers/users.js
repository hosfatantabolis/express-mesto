const User = require('../models/user');

const badResponse = { message: 'Нет пользователя с таким id' };
const serverError = { message: 'Ошибка на сервере. Код: 500' };

const getUsers = (req, res) => {
  User.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(serverError);
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send(badResponse);
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(serverError);
    });
};

const postUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(serverError);
    });
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      // eslint-disable-next-line comma-dangle
    }
  )
    .then((user) => {
      console.log(user);
      if (!user) {
        res.status(404).send(badResponse);
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      res.status(500).send(serverError);
      console.log(err);
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      // eslint-disable-next-line comma-dangle
    }
  )
    .then((user) => {
      console.log(user);
      if (!user) {
        res.status(404).send(badResponse);
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      res.status(500).send(serverError);
      console.log(err);
    });
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  updateUserInfo,
  updateUserAvatar,
};
