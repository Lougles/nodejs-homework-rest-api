const nodemailer = require("nodemailer");
require('dotenv').config()

const msg = {
  from: 'louglescom@gmail.com',
  to: 'chelidze.v.a@gmail.com',
  subject: 'Nodemailer Testing',
  text: 'Testing out first send'
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

 