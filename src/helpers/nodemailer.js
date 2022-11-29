const nodemailer = require("nodemailer");
require('dotenv').config()


const sendMail = async(email, hash) => {
  const msg = {
    from: 'louglescom@gmail.com',
    to: email,
    subject: 'Registration confirmation',
    text: `To confirm your registration click to link http://localhost:4040/api/users/verify/${hash}`
  }
  nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'louglescom@gmail.com',
      pass: process.env.GOOGLE_PASSWORD
    },
    port: 465,
    host: 'smtp.gmail.com'
  })
  .sendMail(msg, (err) => {
    if(err){
      return console.log('Error', err)
    }
  })
  return `Verification email sent`
}

 module.exports = {
  sendMail
 }