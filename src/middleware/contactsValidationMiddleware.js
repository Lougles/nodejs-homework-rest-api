const {validationError} = require('../utils/errors');
const {contactSchema} = require('../utils/contactsValidation')



const addContactValidation = (req, res, next) => {
  const result = contactSchema.validate(req.body);
  if(result.error){
    next(new validationError(result.error))
  }
  next()
}

module.exports = {
  addContactValidation
}