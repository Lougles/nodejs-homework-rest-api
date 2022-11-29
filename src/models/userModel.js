const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const gravatar = require('gravatar')

const Auth = mongoose.Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  token: {
    type: String,
  },
  avatarURL: {
    type: String,
    default: gravatar.profile_url(this.email)
  },
  verify: {
    type: Boolean,
    default: false
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  }
})

Auth.pre('save', async function() {
  if (this.isNew){
    this.password = await bcrypt.hash(this.password, 10);
  }
})

const User = mongoose.model('users', Auth)

module.exports = {
  User
}