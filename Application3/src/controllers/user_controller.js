const express = require('express');
const User = require('../model/user.js');
const { sendWelcomeEmail, sendDeleteEmail } = require('../mailers/account.js');

const router = new express.Router();
const auth = require('../middleware/authentication_middleware.js');

// Get method to list a particular user
router.get('/user/:id', auth, async (req, res) => {
  const _id = req.params.id; // argument passed in must be a string of 12 bytes or a string of 24 hex characters
  // otherwise findById fails

  try {
    // const user = await User.findById(_id); // a mongo query is not failed when we dont find something
    // if(!user) {
    //   return res.status(404).send('No user found');
    // }
    res.send(req.user);
  } catch(e) {
    res.status(500).send();
  }
})

// Post method to create user
router.post('/user', async (req, res) => { 
  
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    sendWelcomeEmail(user.email, user.name);

    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// Update a User
router.patch('/user/me', auth, async (req, res) => {
  const allowedAttributes = ['name', 'email', 'password', 'age'];
  const paramsAttributes = Object.keys(req.body);
  const isValidOperation = paramsAttributes.every((arr) => allowedAttributes.includes(arr));

  if(!isValidOperation) {
    return res.status(400).send('error: Invalid Operation');
  }

  try {
    // const user = await User.findByIdAndUpdate(req.params.id , req.body, { new: true, runValidators: true });
    // findByIdAndUpdate skips all the validations (thats why we used runValidators) and middleware and updates directly data into DB
    const user = req.user;
    paramsAttributes.forEach( (attr) => user[attr] = req.body[attr]);
    await user.save();

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Delete a User

router.delete('/user/me', auth, async (req, res) => {
  try {
    await req.user.remove();
    sendDeleteEmail(req.user.email, req.user.name);
    res.status(200).send(`User ${req.user._id} Deleted`);
  } catch (e) {
    return res.status(500).send(e)
  }
});

module.exports = router;
