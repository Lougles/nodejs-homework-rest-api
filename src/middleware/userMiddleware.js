const {authValidation, subscriptionContact} = require('../helpers/joiUserValidation');

const authFieldValidation = (req, res, next) => {
  const result = authValidation.validate(req.body)
  if(result.error) next(result.error)
  next()
}

const subscriptionMiddleware = (req, res, next) => {
  const result = subscriptionContact.validate(req.body);
  if(result.error) next(result.error)
  next()
}

module.exports = {
  authFieldValidation,
  subscriptionMiddleware
}