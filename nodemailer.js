const nodemailer = require("nodemailer");
require('dotenv').config()


const sendMail = async(email, subject, text, hash) => {
  const msg = {
    from: 'louglescom@gmail.com',
    to: email,
    subject: subject,
    text: `${text}/${hash}`
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
    return console.log("Email sent")
  })
}


sendMail('chelidze.v.a@icloud.com', 'Registration confirmation', 'To finish registration move to http:4040/api/contacts/user/verify', 'qwertyu')


 module.exports = {
  sendMail
 }