const jwt = require('jsonwebtoken')
const {UserModel} = require('../models/userModel')
const {validateRegistration} = require('../helpers/joiUserValidation')

const authMiddleware = async(req, res, next) => {
  try {
    const {authorization} = req.headers;
    if(!authorization) next(Error('There is no token here'))
    const [, token] = req.headers.authorization?.split(' ');
    if(!token) next(Error('There is no token here'))
    const user = jwt.decode(token, process.env.JWT)
    const findUser = await UserModel.findById(user._id);
    if(!findUser) next(Error('User not found'));
    if(findUser.token !== token) next(Error('Invalid user token!'));
    req.token = token;
    req.user = findUser;
    next();
  } catch (err) {
    next(err);
  }
}

const registrationMiddleware = (req,res,next) => {
  const temp = validateRegistration.validate(req.body);
  if (temp.error) {
    next(Error(temp.error));
  }
  next();
}

module.exports = {
  authMiddleware,
  registrationMiddleware
}