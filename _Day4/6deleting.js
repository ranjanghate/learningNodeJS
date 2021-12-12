const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-app';

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
  if(error) {
    return console.log('Failed to connect to database');
  }

  const db = client.db(databaseName);

  const User = db.collection('users');
  const Task = db.collection('tasks');

  User.deleteMany({ age: '22' }).then((result) => {
    console.log(result.deletedCount);
  }).catch((error) => {
    console.log(error);
  });

  Task.deleteOne( {description: 'Lunch'}).then((result) => {
    console.log(result.deletedCount);
  }).catch((error) => {
    console.log(error);
  });
});
