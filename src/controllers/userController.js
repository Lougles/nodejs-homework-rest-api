const {
  verificationTokenService,
  verifyService,
  registrationService,
  loginService,
  logoutService,
  currentService,
  updateSubscriptionService,
  updateAvatarService
} = require('../services/userService')

const verificationTokenController = async(req, res) => {
  const {status, message} = await  verificationTokenService(req.params.verificationToken)
  res.status(status).json(message);
}

const verifyController = async(req, res) => {
  const {status, message} = await  verifyService(req.body.email)
  res.status(status).json(message);
}

const registrationController = async(req, res ) => {
  const {status, message} = await  registrationService(req.body.email, req.body.password)
  res.status(status).json(message);
}

const loginController = async(req, res ) => {
  const {status, message} = await  loginService(req.body.email, req.body.password)
  res.status(status).json(message);
}

const logoutController = async(req, res ) => {
  const {status, message} = await  logoutService(req.user)
  res.status(status).json(message);
}

const currentController = async(req, res) => {
  const {status, message} = await  currentService(req.user)
  res.status(status).json(message);
}

const updateSubscriptionController = async (req, res, next) => {
  const {status, message} = await updateSubscriptionService(req.body.subscription, req.user);
  res.status(status).json(message);
}

const updateAvatarController = async (req, res, next) => {
  const {status, message} = await updateAvatarService(req.file, req.user);
  res.status(status).json(message);
}

module.exports = {
  verificationTokenController,
  verifyController,
  registrationController,
  loginController,
  logoutController,
  currentController,
  updateSubscriptionController,
  updateAvatarController
}