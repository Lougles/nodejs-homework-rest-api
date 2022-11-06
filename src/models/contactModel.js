const mongoose = require('mongoose');

const Contact = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact']
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'users',
  }
})

const ContactModel = mongoose.model('Contact', Contact)

module.exports = {
  ContactModel
}