const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient; // this variable is use to establish connection with database

const connectionURL = 'mongodb://127.0.0.1:27017'; // url to mongoDB server
const databaseName = 'task-app';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Failed to connect to database');
  }
  console.log('Connected Successfully');

  const db = client.db(databaseName); // create new database if not exists and return reference to that database

  const User = db.collection('users'); // reference to User collection
  User.insertOne({ // insertOne is async
    name: 'ramesh',
    age: '22'
  }, (error, result) => {
    if(error) {
      return console.log('Failed to Add user');
    }
    console.log(result.ops);  // array of documents
  });

  User.insertMany([{
    name: 'Gunther',
    age: '21'
  }, {
    name: 'Pather',
    age: '22'
  }], (error, result) => {
    if(error) {
      return console.log('Failed to Add users');
    }
    console.log(result.ops);
  });

  const Task = db.collection('tasks');

  Task.insertMany([{
    description: 'Breakfast',
    completed: true
  }, {
    description: 'Lunch',
    completed: true
  }, {
    description: 'Dinner',
    completed: false
  }], (error, result) => {
    if(error) {
      return console.log('Failed to Add Tasks');
    }
    console.log(result);
  })
});
