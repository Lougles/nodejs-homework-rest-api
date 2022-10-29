const mongoose = require('mongoose');
require('dotenv').config()



const connection = async() => {
  return mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}


module.exports = {
  connection
}