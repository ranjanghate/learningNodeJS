const express = require('express');
const auth = require('../middleware/authentication_middleware.js');
const Task = require('../model/task.js');
const router = new express.Router();

// Get method to list all tasks
router.get('/tasks', auth, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.completed) {
    match['completed'] = req.query.completed.trim() === 'true';
  }

  if(req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sort[parts[0].trim()] = parts[1].trim() === 'desc' ? -1 : 1;
  }

  try {
    // const tasks = await req.user.populate('tasks');
    // we need a populate() method to fill the field with that document.
    const tasks = await req.user.populate( {
      path: 'tasks',
      match: match,
      options: {
        limit: req.query.limit,
        skip: req.query.skip,
        sort: sort
      }
    } );

    res.status(201).send(req.user.tasks);
  } catch (e) {
    res.status(401).send(e);
  }
})

// Get method to list particular task
router.get('/task/:id', auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id , user_id: req.user._id });
    if(!task) {
      return res.status(404).send('Task not found');
    }
    res.status(200).send(task);
  } catch (e) {
    res.status(500).send();
  }
})

// Post method to create task
router.post('/task', auth, async (req, res) => {

  try {
    const task = new Task( { ...req.body, user_id: req.user._id } );
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Update a Task

router.patch('/task/:id', auth, async (req, res) => {
  const allowedAttributes = ['description', 'status'];
  const paramsAttributes = Object.keys(req.body);

  const isValidOperation = paramsAttributes.every((arr) => allowedAttributes.includes(arr));

  if(!isValidOperation) {
    return res.status(400).send('error: Invalid Operation');
  }

  try {
    const task = await Task.findOne({ _id: req.params.id, user_id: req.user._id });
    if (!task) {
      return res.status(400).send('Task Not Found');
    }
    paramsAttributes.forEach( (param) => { task[param] = req.body[param] });
    task.save();
    res.status(200).send(task);
  } catch (e) {
    return res.status(500).send(e)
  }
});

// Delete a Task
router.delete('/task/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user_id: req.user._id });
    if(!task) {
      return res.status(404).send('Task not found');
    }
    res.status(200).send(`Task ${req.params.id} Deleted`);
  } catch (e) {
    return res.status(500).send(e)
  }
});

module.exports = router;