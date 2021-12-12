// mongoose uses the mongo db module behind the scenes

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager', {});
// useNewUrlParser, useUnifiedTopology, useFindAndModify, and useCreateIndex are no longer supported options.
// Mongoose 6 always behaves as if useNewUrlParser, useUnifiedTopology, and useCreateIndex are true, and useFindAndModify is false.

const User = mongoose.model('User', {
  name: {
    type: String
  },
  age: {
    type: Number
  }
});
// String and Number are constructor function
// User variable is a constructor function for User model

const newUser = new User({ name: 'raman', age: 25});

newUser.save().then(() => {
  console.log(newUser);
}).catch((error) => {
  console.log('Error!', error);
});
