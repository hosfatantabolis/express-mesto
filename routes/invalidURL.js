const invalidRouter = require('express').Router();
const { INVALID_URL } = require('../utils/error_messages');

invalidRouter.use('/', (req, res) => res.status(404).send(INVALID_URL));
module.exports = invalidRouter;
