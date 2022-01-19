const express = require('express');

const User = require('../model/user.js');

const router = new express.Router();

// Get method to list all users
router.get('/users', async (req, res) => {
  
  try {
    const users = await User.find();
    res.status(201).send(users);
  } catch(e) {
    res.status(401).send(e);
  }
})

// Get method to list a particular user
router.get('/user/:id', async (req, res) => {
  const _id = req.params.id; // argument passed in must be a string of 12 bytes or a string of 24 hex characters
  // otherwise findById fails

  try {
    const user = await User.findById(_id); // a mongo query is not failed when we dont find something
    if(!user) {
      return res.status(404).send('No user found');
    }
    res.send(user);
  } catch(e) {
    res.status(500).send();
  }
})

// Post method to create user
router.post('/user', async (req, res) => { 
  
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Update a User
router.patch('/user/:id', async (req, res) => {
  const allowedAttributes = ['name', 'email', 'password', 'age'];
  const paramsAttributes = Object.keys(req.body);
  const isValidOperation = paramsAttributes.every((arr) => allowedAttributes.includes(arr));

  if(!isValidOperation) {
    return res.status(400).send('error: Invalid Operation');
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id , req.body, { new: true, runValidators: true });

    if(!user) {
      return res.status(404).send('User Not Found');
    } 
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Delete a User

router.delete('/user/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).send(`User ${req.params.id} Deleted`);
  } catch (e) {
    return res.status(500).send(e)
  }
});

module.exports = router;
