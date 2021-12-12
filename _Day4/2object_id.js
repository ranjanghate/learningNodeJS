const { MongoClient, ObjectID} = require('mongodb');

const id = new ObjectID(); // ObjectID is a constructor function

console.log(id); // return a string of object ID which has size of 24
// new ObjectId("61b0f20d0f4a80138036366d")

console.log(id.id); // return a string of object ID which has size of 12 and equal to half the size of string type id
// <Buffer 61 b0 f2 0d 0f 4a 80 13 80 36 36 6d>

// OBJECT ID is originally stored in Binary format

console.log(id.getTimestamp()); // Returns the timestamp portion of the object as a Date.

// Returns a new ObjectId value. The 12-byte ObjectId value consists of:

// a 4-byte timestamp value, representing the ObjectId's creation, measured in seconds since the Unix epoch
// a 5-byte random value generated once per process. This random value is unique to the machine and process.
// a 3-byte incrementing counter, initialized to a random value

// These IDs can be generated on the server, but as seen in
// the snippet above, they can be generated on the client as well.

const connectionURL = 'mongodb://127.0.0.1:27017'; // url to mongoDB server
const databaseName = 'task-app';

MongoClient.connect( connectionURL, { useNewUrlParser: true }, (error, client) => {
  if(error) {
    console.log("Failed to connect");
  }
  const db = client.db(databaseName);

  const User = db.collection('users');
  User.insertOne({
    _id: id,
    name: 'Ramesh',
    age: '25'
  }, (error, result) => {
    if(error) {
      console.log('Failed to Add user', error);
    }
    console.log(result);
  });
});

// Document cannot have same Object ID (E11000 duplicate key error collection)
