const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    require: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if(!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    }
  },
  password: {
    type: String,
    require: true,
    minlength: true,
    trim: true,
    validate(value) {
      if(!validator.isStrongPassword(value)){
        throw new Error('Weak Password');
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if(value < 0 ) {
        throw new Error('Age cannot be negative');
      }
    }
  }
});

module.exports = User;
