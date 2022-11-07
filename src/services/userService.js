const {User} = require('../models/userModel')
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')


const registration = async(email, password) => {
  try {
    return {status: 200, message: await new User({email, password}).save() }
  } catch (err) {
    return {status: 400, message: err.message}
  }
}

const login = async(email, password) => {
  try {
    const user = await User.findOne({email});
    if(!user) return {status: 404, message: `User is not found`}
    if(!await bcrypt.compare(password, user.password)) return {status: 400, message: `Wrong password`} 
    const token = jwt.sign({
      _id: user._id,
      createdAt: user.createdAt,
    }, process.env.JWT);
    user.token = token;
    await user.save();
    return {status: 200, message: {"token": token}}
  } catch (err) {
    return {status: 400, message: err.message}
  }
}

module.exports = {
  registration,
  login
}