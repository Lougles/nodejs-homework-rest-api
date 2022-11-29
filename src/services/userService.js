const {User} = require('../models/userModel')
const bcrypt = require('bcrypt')
const {avatarManipulate} = require('../helpers/avatarJimpManipulation')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const {sendMail} = require('../helpers/nodemailer')
const { v4: uuidv4 } = require('uuid');


const verificationTokenService = async(verificationToken) => {
  try {
    const user = await User.findOne({verificationToken})
    if(!user) return {status: 404, message: {"message": "User not found"}}
    user.verificationToken = ' ';
    user.verify = true;
    await user.save()
    return {status: 200, message: {"message": 'Verification successful'}}
  } catch (e) {
    return {status: 400, message: {"message": e.message}}
  }
}

const verifyService = async(email) => {
  try {
    const user = await User.findOne({email, verify: false})
    if(!user) return {status: 404, message: {"message": "User not found"}}
    await sendMail(user.email, user.verificationToken)
    return {status: 200, message: {"message": 'Email re-sent'}}
  } catch (e) {
    return {status: 400, message: {"message": e.message}}
  }
}

const registrationService = async(email, password) => {
  try {
    const user = new User({email, password})
    const verifyToken = email + uuidv4()
    user.verificationToken = verifyToken
    user.save();
    await sendMail(email, verifyToken)
    return {status: 201, message: {'user': user} }
  } catch (e) {
    return {status: 400, message: {"message": e.message}}
  }
}

const loginService = async(email, password) => {
  try {
    const user = await User.findOne({email, verify: true});
    if(!user) return {status: 404, message: {'message': `User is not found`}}
    if(!await bcrypt.compare(password, user.password)) return {status: 400, message: {'message': `Wrong password`}} 
    const token = jwt.sign({
      _id: user._id,
      createdAt: user.createdAt,
    }, process.env.JWT);
    user.token = token;
    await user.save();
    return {status: 200, message: {"token": token}}
  } catch (e) {
    return {status: 400, message: {"message": e.message}}
  }
}

const logoutService = async (user) => {
  try {
    user.token = ''
    await user.save();
    return {status: 204, message: {'message':  'No content'}}
  } catch (e) {
    return {status: 400, message: {"message": e.message}}
  }
}

const currentService = async (user) => {
  try {
    return {status: 200, message: {"email": user.email, "subscription": user.subscription}}
  } catch (e) {
    return {status: 400, message: {"message": e.message}}
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
  verificationTokenService,
  verifyService,
  registrationService,
  loginService,
  logoutService,
  currentService,
  updateSubscriptionService,
  updateAvatarService
}