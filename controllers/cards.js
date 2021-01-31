const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Ошибка на сервере. Код: 500' });
    });
};

const postCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Ошибка на сервере. Код: 500' });
    });
};

const deleteCard = (req, res) => {
  console.log(req.params.id);
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send({ message: 'Карточка с таким ID не найдена' });
    });
};

module.exports = { getCards, postCard, deleteCard };
