const Joi = require('joi');

const validateRegistration = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2, tlds: {
      allow: ['com', 'net']
    }
  }).required(),
  password: Joi.string().min(6).max(16).required(),
})

module.exports = {
  validateRegistration
}