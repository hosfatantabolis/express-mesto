const usersRouter = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');

const badResponse = { message: 'Нет пользователя с таким id' };
const filepath = path.resolve(__dirname, '../data/users.json');

fsPromises
  .readFile(filepath, { encoding: 'utf8' })
  .then((data) => {
    usersRouter.get('/', (req, res) => res.status(200).send(data));
    usersRouter.get('/:id', (req, res) => {
      const user = JSON.parse(data).find((item) => item._id === req.params.id);
      if (!user) {
        res.status(404).send(badResponse);
      } else {
        res.status(200).send(user);
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = usersRouter;
