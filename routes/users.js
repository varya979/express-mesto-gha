const userRouter = require('express').Router();
const {
  // createUser,
  getUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
  getMyUsersInfo,
} = require('../controllers/users');

userRouter.get('/users', getUsers);
userRouter.get('/users/me', getMyUsersInfo); // ставить строго до роута /users/:userId - иначе 400
userRouter.get('/users/:userId', getUserById);
// userRouter.post('/users', createUser);
userRouter.patch('/users/me', updateUserProfile);
userRouter.patch('/users/me/avatar', updateUserAvatar);

module.exports = userRouter;
