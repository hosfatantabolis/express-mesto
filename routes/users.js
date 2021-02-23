const usersRouter = require('express').Router();
const {
  getUsersValidator,
  getUsersByIdValidator,
  updateUserInfoValidator,
  getMeValidator,
  updateAvatarValidator,
} = require('../middlewares/validators');
const {
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
  getMe,
} = require('../controllers/users');

usersRouter.get('/', getUsersValidator, getUsers);
usersRouter.get('/me', getMeValidator, getMe);
usersRouter.get('/:id', getUsersByIdValidator, getUserById);
usersRouter.patch('/me', updateUserInfoValidator, updateUserInfo);
usersRouter.patch('/me/avatar', updateAvatarValidator, updateUserAvatar);

module.exports = usersRouter;
