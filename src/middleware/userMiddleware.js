const {authValidation} = require('../helpers/joiUserValidation');

const authFieldValidation = (req, res, next) => {
  const result = authValidation.validate(req.body)
  if(result.error) next(result.error)
  next()
}

module.exports = {
  authFieldValidation
}