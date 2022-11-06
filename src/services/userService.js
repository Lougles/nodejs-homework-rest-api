const {User} = require('../models/userModel')


const registration = async(email, password) => {
  try {
    return {status: 200, message: await new User({email, password}).save() }
  } catch (err) {
    return {status: 400, message: err.message}
  }
}

const login = async(email, password) => {
  try {
    
  } catch (err) {
    return {status: 400, message: err.message}
  }
}

module.exports = {
  registration,
  login
}