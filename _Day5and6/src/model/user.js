const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const Task = require('./task.js');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
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
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne( { email })
  if (!user) {
    throw new Error('Unable to Login');
  }

  const valid = await bcrypt.compare(password, user.password);

  if(!valid) {
    throw new Error('Invalid Password');
  }

  return user;
}

userSchema.methods.generateAuthToken = async function() {
  const token = jsonwebtoken.sign( { _id: this._id.toString() }, 'nodeapplication');
  this.tokens = this.tokens.concat({ token });
  await this.save();

  return token;
}

userSchema.methods.removeExpiredToken = async function(expired_token) {
  this.tokens = this.tokens.filter( (token) => {
    return token.token !== expired_token;
  });
  this.save();
}

userSchema.methods.toJSON = function() { // overwritting the toJSON method to hide private data
  const userObject = this.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
}

// this is a middleware which is simillar to rails callbacks
userSchema.pre('save', async function (next) {
  // console.log('save middleware is called');
  if(this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
})

// to remove all tasks when user is deleted
userSchema.pre('remove', async function (next) {
  await Task.deleteMany( { user_id: this.id });
  next();
});

// a virtual is a property that is not stored in MongoDB. Virtuals are typically used for computed properties on documents.
userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id', // local field represent _id in user model
  foreignField: 'user_id' // foreignField represents to user id stored in task model
});

const User = mongoose.model('User', userSchema);

module.exports = User;
