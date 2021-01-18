const cardRouter = require('express').Router();
const cards = require('../data/cards.json');

cardRouter.get('/', (req, res) => res.status(200).send(cards));

module.exports = cardRouter;
