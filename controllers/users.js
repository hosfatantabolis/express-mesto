const User = require('../models/user');

const {
  VALIDATION_ERROR,
  SERVER_ERROR,
  USER_NOT_FOUND,
} = require('../utils/error_messages');

const getUsers = (req, res) => {
  User.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err.name);
      res.status(500).send(SERVER_ERROR);
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'CastError') {
        res.status(404).send(USER_NOT_FOUND);
      } else {
        res.status(500).send(SERVER_ERROR);
      }
    });
};

const postUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send(VALIDATION_ERROR);
      } else {
        res.status(500).send(SERVER_ERROR);
      }
      console.log(err.name);
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
    },
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send(VALIDATION_ERROR);
      }
      if (err.name === 'CastError') {
        res.status(404).send(USER_NOT_FOUND);
      } else {
        res.status(500).send(SERVER_ERROR);
      }
      console.log(err.name);
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
    },
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send(VALIDATION_ERROR);
      }
      if (err.name === 'CastError') {
        res.status(404).send(USER_NOT_FOUND);
      } else {
        res.status(500).send(SERVER_ERROR);
      }
      console.log(err.name);
    });
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  updateUserInfo,
  updateUserAvatar,
};
