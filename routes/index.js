const router = require('express').Router();

const cardRouter = require('./cards.js');
const usersRouter = require('./users.js');
const invalidRouter = require('./invalidURL.js');

router.use('/cards', cardRouter);
router.use('/users', usersRouter);
router.use('/*', invalidRouter);

module.exports = router;
