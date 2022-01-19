const express = require('express');

const Task = require('../model/task.js');

const router = new express.Router();

// Get method to list all tasks
router.get('/tasks', async (req, res) => {
  
  try {
    const tasks = await Task.find({});
    res.status(201).send(tasks);
  } catch (e) {
    res.status(401).send(e);
  }
})

// Get method to list particular task
router.get('/task/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    if(!task) {
      return res.status(404).send('Task not found');
    }
    res.status(200).send(task);
  } catch (e) {
    res.status(500).send();
  }
})

// Post method to create task
router.post('/task', async (req, res) => {
  
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Update a Task

router.patch('/task/:id', async (req, res) => {
  const allowedAttributes = ['description', 'status'];
  const paramsAttributes = Object.keys(req.body);

  const isValidOperation = paramsAttributes.every((arr) => allowedAttributes.includes(arr));

  if(!isValidOperation) {
    return res.status(400).send('error: Invalid Operation');
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true});
    if (!task) {
      return res.status(400).send('Task Not Found');
    }
    res.status(200).send(task);
  } catch (e) {
    return res.status(500).send(e)
  }
});

// Delete a Task
router.delete('/task/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if(!task) {
      return res.status(404).send('Task not found');
    }
    res.status(200).send(`Task ${req.params.id} Deleted`);
  } catch (e) {
    return res.status(500).send(e)
  }
});

module.exports = router;