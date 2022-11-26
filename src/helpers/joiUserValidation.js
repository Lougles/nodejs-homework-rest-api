const Joi = require('joi');

const authValidation = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().min(6).max(16).required(),
})

const subscribe = ['starter', 'pro', 'business'];
const subscriptionContact = Joi.object({
  subscription: Joi.string().valid(...subscribe).required(),
})

const verify = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
})

module.exports = {
  authValidation,
  subscriptionContact,
  verify
}