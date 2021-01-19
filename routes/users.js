const usersRouter = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');

const badResponse = { message: 'Нет пользователя с таким id' };
const filepath = path.resolve(__dirname, '..', 'data', 'users.json');

usersRouter.get('/', (req, res) => {
  fsPromises
    .readFile(filepath, { encoding: 'utf8' })
    .then((data) => {
      res.send(JSON.parse(data));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Ошибка на сервере. Код: 500' });
    });
});

usersRouter.get('/:id', (req, res) => {
  fsPromises
    .readFile(filepath, { encoding: 'utf8' })
    .then((data) => {
      const user = JSON.parse(data).find((item) => item._id === req.params.id);
      if (!user) {
        res.status(404).send(badResponse);
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Ошибка на сервере. Код: 500' });
    });
});

module.exports = usersRouter;
