const jwt = require('jsonwebtoken')
const {UserModel} = require('../models/userModel')
const {validateRegistration} = require('../helpers/joiUserValidation')

const authMiddleware = async(req, res, next) => {
  try {
    const {authorization} = req.headers;
    if(!authorization) return res.status(401).json({message: 'Unauthorized'})
    const [, token] = req.headers.authorization?.split(' ');
    if(!token) return res.status(401).json({message: 'Unauthorized'})
    const user = jwt.decode(token, process.env.JWT)
    if(!user) return res.status(404).json('User not found')
    const findUser = await UserModel.findById(user._id);
    if(findUser.token !== token) return res.status(404).json({message: `User not found`})
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