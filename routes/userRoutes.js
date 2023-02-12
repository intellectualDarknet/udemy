const express = require('express');
const UserController = require('./../controllers/userController');
const AuthController = require('./../controllers/authController');

const router = express.Router();



router.post('/signup', AuthController.signUp);
router.post('/login', AuthController.login);

router.post('/forgotPassword', AuthController.forgotPassword);
router.patch('/resetPassword/:token', AuthController.resetPassword);

// if we want to add protect to all methods 
// it works like a middleware
// for all the code below!
router.use(AuthController.protect)

router.patch(
  '/updateMyPassword',
  AuthController.updatePassword
);

router.get('/me', UserController.getMe, UserController.getUser)
router.patch('/updateMe', UserController.updateMe);
// user will became unaccessible but it is still
// okay to use delete method
router.delete('/deleteMe', UserController.deleteMe);

router.use(AuthController.restrictTo('admin'))

router
  .route('/')
  .get(UserController.getAllUsers)
  .post(UserController.createUser)

router
  .route('/:id')
  .get(UserController.getUser)
  .patch(AuthController.restrictTo('user'),UserController.updateMe)
  .delete(AuthController.restrictTo('admin'), UserController.deleteUser);

module.exports = router;
