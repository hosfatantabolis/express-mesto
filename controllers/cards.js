const Card = require('../models/card');
const {
  VALIDATION_ERROR,
  SERVER_ERROR,
  CARD_NOT_FOUND,
} = require('../utils/error_messages');

const getCards = (req, res) => {
  Card.find()
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send(SERVER_ERROR);
    });
};

const postCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send(VALIDATION_ERROR);
      } else {
        res.status(500).send(SERVER_ERROR);
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (!card) {
        res.status(404).send(CARD_NOT_FOUND);
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).send(CARD_NOT_FOUND);
      } else {
        res.status(500).send(SERVER_ERROR);
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((data) => {
      if (!data) {
        res.status(404).send(CARD_NOT_FOUND);
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).send(CARD_NOT_FOUND);
      } else {
        res.status(500).send(SERVER_ERROR);
      }
    });
};
const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((data) => {
      if (!data) {
        res.status(404).send(CARD_NOT_FOUND);
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).send(CARD_NOT_FOUND);
      } else {
        res.status(500).send(SERVER_ERROR);
      }
    });
};

module.exports = {
  getCards,
  postCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
