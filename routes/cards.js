const cardRouter = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');

const filepath = path.join(__dirname, '..', 'data', 'cards.json');

cardRouter.get('/', (req, res) => {
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

module.exports = cardRouter;
