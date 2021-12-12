const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-app';

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
  if(error) {
    return console.log('Failed to connect');
  } 
  const db = client.db(databaseName);
  const User = db.collection('users');
  const Task = db.collection('tasks');

  // if you dont provide a callback updateOne will return a Promise
  const updatePromise = User.updateOne( { 
    _id: new ObjectID('61b07957d4ae650430dcbd43') // filter
    }, {
      $set: {
        name: 'Lalu'
      }
    }
  );

  updatePromise.then((result) => {
    console.log(result);
  }).catch((error) => {
    console.log(error);
  });

  Task.updateMany( { 
      completed: true
    }, {
      $set: {
        completed: false
      }
    }
  ).then((result) => {
    console.log(result.modifiedCount);
  }).catch((error) => {
    console.log(error);
  });
});
