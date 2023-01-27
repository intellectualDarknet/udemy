const Jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  photo: {
    type: String
  },
  password: {
    type: String,
    required: [true, 'Please provide your password'],
    minlength: 8,
    // The password will not return in Schema.find() methods (when we read from DB)!
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // this only works for create, save! not findOneAndUpdate!
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!'
    }
  }
});

// works between getting the data and saving it to DB!
//encryption === hash
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  // Encrypt password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete password field
  this.passwordConfirm = undefined;
  next();
});

// adding method to all instances(documents) from db
userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  // this.password is unawailable bcause of select: false

  // return true or false
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createToken = function() {
  // this.password is unawailable bcause of select: false
  const value = this._id;
  return Jwt.sign({ value }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

module.exports = mongoose.model('User', userSchema);