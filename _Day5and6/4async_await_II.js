require('./src/db/mongoose.js'); // connecting to mongo database
const User = require('./src/model/task.js');
const Task = require('./src/model/task.js');

const updateAgeandCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments( { age });
  return count;
}

updateAgeandCount('61b8f6968e9b18e1b9d9b595', 25).then((count) => console.log(count)).catch((e) => console.log(e));


const deleteTaskandCount = async (id) => {
  await Task.deleteOne({ id });
  const count = await Task.countDocuments({ completed: false });
  return count;
}

deleteTaskandCount('61e83d585384af156184393b').then((count) => console.log(count)).catch((e) => console.log(e));
