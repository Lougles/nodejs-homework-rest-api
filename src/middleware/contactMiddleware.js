const {validationContact, favoriteContact} = require('../helpers/joiContactValidation');

const addContactMiddleware = (req, res, next) => {
  const result = validationContact.validate(req.body);
  if(result.error) next(result.error)
  next()
}

const favoriteMiddleware = (req, res, next) => {
  const result = favoriteContact.validate(req.body);
  if(result.error) next(result.error)
  next()
}

module.exports = {
  addContactMiddleware,
  favoriteMiddleware
}