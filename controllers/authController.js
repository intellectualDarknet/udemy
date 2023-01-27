const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

class AuthController {
  signUp = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser
      }
    });
  });
}

module.exports = new AuthController();
