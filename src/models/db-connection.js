const mongoose = require('mongoose');
require('dotenv').config()
const db = '/db-contacts'
const URL = process.env.URL + db;


const connection = async() => {
  return mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

module.exports = { 
  connection
}