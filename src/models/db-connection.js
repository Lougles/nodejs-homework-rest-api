const mongoose = require('mongoose');
require('dotenv').config()
const URL = process.env.URL;
const db = '/db-contacts'


const connection = async() => {
  return mongoose.connect(URL+db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

module.exports = { 
  connection
}