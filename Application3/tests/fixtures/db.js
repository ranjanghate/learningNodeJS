const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/model/user');
const Task = require('../../src/model/task');

userId = new mongoose.Types.ObjectId();

userOne = {
  _id: userId,
  name: 'sample_user',
  email: 'sample_user@yopmail.com',
  password: 'User@123',
  age: '23',
  tokens: [{
    token: jwt.sign( { _id: userId }, process.env.JWT_SECRET )
  }]
}

user2Id = new mongoose.Types.ObjectId();
userTwo = {
  _id: user2Id,
  name: 'sample_user2',
  email: 'sample_user2@yopmail.com',
  password: 'User@123',
  age: '23',
  tokens: [{
    token: jwt.sign( { _id: user2Id }, process.env.JWT_SECRET )
  }]
}

taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: 'First Task',
  user_id: userId 
}

taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: 'Second Task',
  user_id: userId 
}

taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: 'Third Task',
  user_id: user2Id 
}

const setupDatabase = async () => {
  await User.deleteMany(); // Delete all user records from test db before each test case
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
}

module.exports = {
  userId,
  userOne,
  setupDatabase
}