const express = require('express');
const path = require('path');
const cardRouter = require('./routes/cards.js');
const usersRouter = require('./routes/users.js');
const invalidRouter = require('./routes/invalidURL.js');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/cards', cardRouter);
app.use('/users', usersRouter);
app.use('/*', invalidRouter);
app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
