const express = require('express');
const UserController = require('./../controllers/userController');
const AuthController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', AuthController.signUp);
router.post('/login', AuthController.login);

router
  .route('/')
  .get(AuthController.protect, UserController.getAllUsers)
  .post(UserController.createUser);

router
  .route('/:id')
  .get(UserController.getUser)
  .patch(UserController.updateUser)
  .delete(UserController.deleteUser);

module.exports = router;