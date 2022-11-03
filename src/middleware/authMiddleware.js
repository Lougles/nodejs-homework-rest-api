const jwt = require('jsonwebtoken')
const {UserModel} = require('../models/userModel')

const authMiddleware = async(req, res, next) => {
  try {
    const {authorization} = req.headers;
    if(!authorization) next('There is no token here')
    const [, token] = req.headers.authorization.split(' ');
    if(!token) next('There is no token here')
    const user = jwt.decode(token, process.env.JWT)
    const findUser = await UserModel.findById(user._id);
    if(!findUser) next(Error('qwerty'));
    if(findUser.token !== token) next(Error('Invalid user token!'));
    req.token = token;
    req.user = findUser;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  authMiddleware
}