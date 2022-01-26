const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    require: true,
    trim: true,
    minlength: 8
  },
  completed: {
    type: Boolean,
    defaul: false
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId, // Type is objectID
    required: true
  }}, {
    timestamps: true
  });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
