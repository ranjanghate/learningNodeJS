const jsonwebtoken = require('jsonwebtoken');
const User = require('../model/user.js');

const auth = async(req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jsonwebtoken.verify(token, 'nodeapplication'); // it will return a user ID which was coded with token
    const user = await User.findOne( { _id: decoded._id, 'tokens.token': token });

    if(!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send( { error: 'Failed to authenticate' } )
  }
}

module.exports = auth;
