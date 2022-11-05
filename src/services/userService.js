const {UserModel} = require('../models/userModel')
require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registration = async(email, password) => {
  try {
    const check = await UserModel.findOne({email});
    if(check) return {status: 400, message: {"message": "Email in use"}}
    const user = new UserModel({email, password});
    await user.save();
    return {status: 201, message: {"message": "Registration is successful", user}}
  } catch (err) {
    return {status: 400, message: {"message": err.message}}
  }
}

const login = async(email, password) => {
  try {
    const user = await UserModel.findOne({email})
    if(!user) return {status: 404, message: {"message": `${email} not found!`}}
    if(!await bcrypt.compare(password, user.password)) return {status: 401, message: {"message": `Wrong password`}}
    const token = jwt.sign({
      _id: user._id,
      createdAt: user.createdAt,
    }, process.env.JWT, {expiresIn: "1h"});
    user.token = token;
    await user.save();
    return {status: 200, message: {"token": token}}
  } catch (err) {
    return {status: 400, message: {"message": err.message}}
  }
}

const logout = async(token) => {
  try {
    token = '';
    return {status: 200, message: {"message": "Logout Success", token}}
  } catch (err) {
    return {status: 400, message: {"message": err.message}}
  }
}

module.exports = {
  registration,
  login,
  logout
}