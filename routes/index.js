const router = require('express').Router();

const cardRouter = require('./cards.js');
const usersRouter = require('./users.js');
const authRouter = require('./auth.js');
const invalidRouter = require('./invalidURL.js');
const auth = require('../middlewares/auth.js');

router.use('/', authRouter);
router.use(auth);
router.use('/cards', cardRouter);
router.use('/users', usersRouter);
router.use('/*', invalidRouter);

module.exports = router;
