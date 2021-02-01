const invalidRouter = require('express').Router();
const { INVALID_URL } = require('../utils/error_messages');

invalidRouter.get('/', (req, res) => res.status(404).send(INVALID_URL));
module.exports = invalidRouter;
