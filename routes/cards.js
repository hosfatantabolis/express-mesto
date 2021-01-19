const cardRouter = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');

const filepath = path.resolve(__dirname, '../data/cards.json');

fsPromises
  .readFile(filepath, { encoding: 'utf8' })
  .then((data) => {
    cardRouter.get('/', (req, res) => res.status(200).send(JSON.parse(data)));
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = cardRouter;
