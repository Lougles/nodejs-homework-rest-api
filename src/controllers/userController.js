const {
  registration,
  login,
  logout
} = require('../services/userService')

const registrationController = async(req, res) => {
  const {status, message} = await registration(req.body.email, req.body.password)
  res.status(status).json(message);
}

const loginController = async(req, res) => {
  const {status, message} = await login(req.body.email, req.body.password)
  res.status(status).json(message);
}

const logoutController = async(req, res) => {
  const {status, message} = await logout(req.user.token)
  res.status(status).json(message);
}

module.exports = {
  registrationController,
  loginController,
  logoutController
}