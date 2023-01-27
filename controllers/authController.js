const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');
// there are 2 authentification for on the server side and client side

class AuthController {
  signUp = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm
    });

    const token = '';
    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser
      }
    });
  });

  login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // checking if the email and password exists!

    // return to finish function immediately!
    // fixes the error Cannot set headers after they are sent to the client
    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400));
    }

    // checking if the user exists and the password is correct

    // В схеме мы автоматом опускаем пароль добавим его в user c помощью
    // select("+field") + cпециально для таких полей
    const user = await User.findOne({ email }).select('+password');

    // together email and password because we wont give the information
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('incorrect password or email'), 401);
    }

    // добавим token
    // Золотое правило что можем сделать в модели делаем в модели а не в контроллере
    // создаем токен по id 2 переменная секрет 3 обьект где указываем дату окончания
    const token = user.createToken();
    res.status(200).json({
      status: 'success',
      token
    });
  });

  protect = catchAsync(async (req, res, next) => {
    // 1) Getting token and check it!

    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access', 401)
      );
    }
    console.log(token);
    // 2) Verification
    // 3) Check if userStillExists
    // 4) Check if user changed password after the token was issued
    next();
  });
}

module.exports = new AuthController();