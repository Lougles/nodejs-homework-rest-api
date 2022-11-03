const {
  registration,
  login
} = require('../services/userService')


const registrationController = async(req, res, next) => {
  const {status, message} = await registration(req.params.email, req.params.password)
  res.status(status).json(message);
}

const loginController = async(req, res, next) => {
  const {status, message} = await login(req.params.email, req.params.password)
  res.status(status).json(message);
}

module.exports = {
  registrationController,
  loginController
}