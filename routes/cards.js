const cardRouter = require('express').Router();
const { postCardValidator, deleteCardValidator, likeAndDislikeCardValidator } = require('../middlewares/validators');
const {
  getCards,
  postCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.post('/', postCardValidator, postCard);
cardRouter.delete('/:id', deleteCardValidator, deleteCard);
cardRouter.put('/:id/likes', likeAndDislikeCardValidator, likeCard);
cardRouter.delete('/:id/likes', likeAndDislikeCardValidator, dislikeCard);

module.exports = cardRouter;
