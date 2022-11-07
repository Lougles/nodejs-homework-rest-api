const {
  registration,
  login
} = require('../services/userService')


const registrationController = async(req, res ) => {
  const {status, message} = await  registration(req.body.email, req.body.password)
  res.status(status).json(message);
}

const loginController = async(req, res ) => {
  const {status, message} = await  login(req.body.email, req.body.password)
  res.status(status).json(message);
}

module.exports = {
  registrationController,
  loginController
}