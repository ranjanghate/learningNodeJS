const express = require('express');
const User = require('../model/user.js');
const multer = require('multer');
const sharp = require('sharp');

const router = new express.Router();
const auth = require('../middleware/authentication_middleware.js');

const avatar = multer({
  // dest: '', to store the file in file system
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) { // internally called by multer
    // cb is callback function which we call 
    // cb(new Error('Invalid File format')  if some error occurs or if program runs successfully
    // cb(undefined, true) if upload is successful
    // cb(undefined, false) if we want to reject the upload

    if(file.originalname.match(/\.(jpg|png|jpeg)$/)) {
      return cb(undefined, true);
    }
    return cb(new Error('Please Upload file in JPG, JPEG or PNG format'));
  }
})

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

// Upload Profile Image
// avatar.single('profile_pic') this is middleware provide by the multer it validates a file and store that into filesystem
// if destination is added otherwise you can access that file object in post method callback as req.file

router.post('/user/me/avatar', [auth, avatar.single('profile_pic')], async (req, res) => {
  const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
  req.user.avatar = buffer;
  await req.user.save();
  res.status(200).send();
}, (error, req, res, next) => { // error handler function
  res.status(400).send( { error: error.message } );
});

// Delete profile image
router.delete('/user/me/delete_avatar', auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.status(200).send( { message: 'deleted the user profile pic' } );
});


// Serve the profile image

router.get('/user/:id/avatar', async (req, res) => {
  try { const user = await User.findById(req.params.id);
    if(!user || !user.avatar) {
      res.status(400).send( { error: 'No profile pic is set'} );
    }
    res.set('Content-Type', 'image/png');
    res.send(user.avatar);
  } catch (e) {
    res.status(200).send('Error Occured');
  }
});

module.exports = router;
