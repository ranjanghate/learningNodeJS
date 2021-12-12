const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';

const databaseName = 'task-app';
MongoClient.connect( connectionURL, { useNewUrlParser: true }, (error, client) => {
  if(error) {
    return console.log('Failed to connect');
  }

  const db = client.db(databaseName); // selecting database()
  const User = db.collection('users'); // selecting table(collection)

  // findOne takes two arguments 1st in key value pair which we are looking for and 2 is a callback function
  // callback function takes two argumenst 1st is error and 2nd is object(document) which returns from User collection
  User.findOne({ name: 'ramesh' }, (error, user) => {
    if(error) {
      return console.log('Unable to fetch data from user');
    }
    console.log(user);
  });

  // findOne using ObjectID
  // _id is not a string it is a binary data therefore we have to use ObjectID function
  User.findOne( { _id: new ObjectID('61b07957d4ae650430dcbd43') }, (error, user) => {
    if(error) {
      return console.log('Unable to fetch data from user');
    }
    console.log(user);
  });

  // find returns reference to multiple documents knowns as cursor
  // we can convert cursor to array of documents using array method

  User.find({}).toArray((error, users) => {
    console.log(users);
  });

  // cursor can be used to count no of documnets fetched from particualr query

  User.find({}).count((error, count) => {
    console.log(count);
  });
});
