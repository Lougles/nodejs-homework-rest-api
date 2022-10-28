const Joi = require('joi');


const contactSchema = Joi.object({
  name: Joi.string()
  .alphanum()
  .min(3)
  .max(10)
  .required(),
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  .required(),
  phone: Joi.string()
  .length(10).pattern(/^[0-9]+$/)
  .required(),
  favorite: Joi.boolean()
})

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().
  required(),
})

module.exports = {
  contactSchema,
  favoriteSchema
}