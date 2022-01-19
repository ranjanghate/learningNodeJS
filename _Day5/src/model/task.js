const mongoose = require('mongoose');

const Task = mongoose.model('Task', {
  description: {
    type: String,
    require: true,
    trim: true,
    minlength: 8
  },
  completed: {
    type: Boolean,
    defaul: false
  }
});

module.exports = Task;
