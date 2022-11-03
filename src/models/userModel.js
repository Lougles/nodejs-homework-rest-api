const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const User = mongoose.Schema({
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
    type: String
  }
})

User.pre('save', async function() {
  if(this.isNew){
    this.password = await bcrypt.hash(this.password, 10)
  }
})

const UserModel = mongoose.model('Users', User);


module.exports = {
  UserModel
}
