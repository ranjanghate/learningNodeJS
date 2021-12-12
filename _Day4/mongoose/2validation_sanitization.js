// validation means checking the data before entering in database
// sanitization is formating data before pushing it into database (ex:- removing extraspaces from user name)

const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect( 'mongodb://127.0.0.1:27017/task-manager', {});

// adding validation and sanitization on User model

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true // sanitization
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if(!validator.isEmail(value)){
        throw new Error('Email is invalid');
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if( value < 0) {
          throw new Error('Age cannot be negative');
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if(value.toLowerCase().includes('password')) {
        throw new Error('Password cannot be "password"')
      }
    }
  }
});

const newUser = new User({ name: 'user1', email: 'user1@gmail.com', password: 'user@123'});

newUser.save().then(() => {
  console.log(newUser);
}).catch((error) => {
  console.log('Error!', error.errors);
});


const Task = mongoose.model('Task', {
  description: {
    type: String,
    trim: true,
    required: true
  },
  completed: {
    type: Boolean,
    defaul: false
  }
});


newTask = new Task({ description: 'Lunch'});

newTask.save().then(()=> {
  console.log(newTask);
}).catch((error) => {
  console.log(error);
});
