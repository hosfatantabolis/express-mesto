const cardRouter = require('express').Router();
const cards = require('../data/cards.json');

cardRouter.get('/cards', (req, res) => {
  res.status(200, cards);
});

module.exports = cardRouter;
