require('./src/db/mongoose.js'); // connecting to mongo database
const User = require('./src/model/user.js');
const Task = require('./src/model/task.js');

const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a+b);
    }, 2000)
  });
};

// add(1, 2).then((sum) => {
//   console.log(sum);
// }).catch((e) => {
//   console.log(e);
// });

// chaining add promise

add(1, 2).then((sum) => {
  console.log(sum);
  add(sum, 2).then((sum2) => {
    console.log(sum2);
  }).catch((e) => {
    console.log(e);
  });  
}).catch((e) => {
  console.log(e);
});


add(1, 2).then((sum) => {
  console.log(sum);
  return add(sum, 5);
}).then((sum2) => {
  console.log(sum2);
}).catch((e) => {
  console.log(e);
});



User.findByIdAndUpdate('61b8fcb02880f142e815b29f', { age: 1 }).then((user) => {
  console.log(user);
  return User.countDocuments({ age: 1});
}).then((result) => {
  console.log(result);
}).catch((error) => {
  console.log(error);
});


Task.findByIdAndRemove('61b8fff847e03287c5e9a4e1').then(() => {
  return Task.countDocuments({completed: false});
}).then((result) => {
  console.log(result);
}).catch((e) => {
  console.log(error);
});
