const Card = require('../models/card');
const { Unauthorized, NotFound } = require('../utils/errors');
const {
  NOT_ALLOWED,
  CARD_NOT_FOUND,
  CARDS_NOT_FOUND,
} = require('../utils/error_messages');

const getCards = (req, res, next) => {
  Card.find()
    .then((data) => {
      if (!data) {
        throw new NotFound(CARDS_NOT_FOUND);
      }
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
};

const postCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.id).then((card) => {
    if (!card) {
      throw new NotFound(CARD_NOT_FOUND);
    }
    if (String(card.owner) !== String(req.user._id)) {
      throw new Unauthorized(NOT_ALLOWED);
    }
    Card.findByIdAndRemove(req.params.id)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        next(err);
      });
  }).catch((err) => {
    next(err);
  });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((data) => {
      if (!data) {
        throw new NotFound(CARD_NOT_FOUND);
      }
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
};
const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((data) => {
      if (!data) {
        throw new NotFound(CARD_NOT_FOUND);
      }
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getCards,
  postCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
