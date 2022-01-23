const express = require('express');
const User = require('../model/user.js');
const router = new express.Router();
const auth = require('../middleware/authentication_middleware.js');

router.post('/user/login', async(req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();

    res.status(200).send({ user, token });
  } catch (e) {
    res.status(400).send('Invalid Login Credentials');
  }
})

router.post('/user/logout', auth, async(req, res) => {
  try {
    await req.user.removeExpiredToken(req.token);
    res.status(200).send('Logout successfully');
  } catch(e) {
    req.status(500);
  }
});


router.post('/user/logout_all', auth, async(req, res) => {
  try {
    const user = req.user;

    user.tokens = [];
    await user.save();

    res.status(200).send('Logout all sessions successfully');
  } catch(e) {
    req.status(500);
  }
});

router.get('/user/me', auth, async (req, res) => {
  res.status(200).send(req.user);
})

module.exports = router;
