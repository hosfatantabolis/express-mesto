const invalidRouter = require('express').Router();

const invalidURL = { message: 'Запрашиваемый ресурс не найден' };
invalidRouter.get('/', (req, res) => res.status(404).send(invalidURL));
module.exports = invalidRouter;
