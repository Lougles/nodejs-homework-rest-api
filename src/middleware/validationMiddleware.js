const {validationError} = require('../utils/errors');
const {contactSchema, favoriteSchema} = require('../utils/schemaValidation')



const addContactValidationMiddleware = (req, res, next) => {
  const result = contactSchema.validate(req.body);
  if(result.error){
    next(result.error)
  }
  next()
}

const updateFavoriteValidationMiddleware = (req, res, next) => {
  const result = favoriteSchema.validate(req.body);
  result.error ? next(new validationError(result.error)) : next()
}
module.exports = {
  addContactValidationMiddleware,
  updateFavoriteValidationMiddleware
}