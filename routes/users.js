const usersRouter = require('express').Router();
const users = require('../data/users.json');

const badResponse = { message: 'Нет пользователя с таким id' };
usersRouter.get('/', (req, res) => res.status(200).send(users));
usersRouter.get('/:id', (req, res) => {
  const user = users.find((item) => item._id === req.params.id);
  if (!user) {
    res.status(404).send(badResponse);
  } else {
    console.log(user);
    res.status(200).send(user);
  }
});

module.exports = usersRouter;
