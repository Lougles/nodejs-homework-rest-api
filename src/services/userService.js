const {User} = require('../models/userModel')
const bcrypt = require('bcrypt')
const {avatarManipulate} = require('../helpers/avatarJimpManipulation')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const registrationService = async(email, password) => {
  try {
    return {status: 201, message: await new User({email, password}).save() }
  } catch (err) {
    return {status: 400, message: err.message}
  }
}

const loginService = async(email, password) => {
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

const logoutService = async (user) => {
  try {
    user.token = ''
    await user.save();
    return {status: 204, message: 'No content'}
  } catch (err) {
    return {status: 400, message: err.message}
  }
}

const currentService = async (user) => {
  try {
    return {status: 200, message: {"email": user.email, "subscription": user.subscription}}
  } catch (err) {
    return {status: 400, message: err.message}
  }
}

const updateSubscriptionService = async(subscription, user) => {
  try {
    user.subscription = subscription;
    await user.save();
    return {status: 200, message: {message: `${user.email} your subscription has been updated to ${user.subscription}!`, subscription: user.subscription}}
  } catch (e) {
    return {status: 400, message: {"message": e.message}}
  }
}

const updateAvatarService = async(avatar, user) => {
  try {
    const newPath = await avatarManipulate(avatar, user)
    user.avatarURL = newPath;
    await user.save();
    return {status: 200, message: {message: `${user.email} your avatar has been updated!`, avatar: user.avatarURL}}
  } catch (e) {
    return {status: 400, message: {"message": e.message}}
  }
}

module.exports = {
  registrationService,
  loginService,
  logoutService,
  currentService,
  updateSubscriptionService,
  updateAvatarService
}