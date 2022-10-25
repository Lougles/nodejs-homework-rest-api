const app = require('./app');
require('dotenv').config()
const mongoose = require('mongoose');
// mongoose.connect(process.env.URL);


app.listen(3000, async () => {
  try {
    await mongoose.connect(process.env.URL);
    console.log("Server running. Use our API on port: 3000")
  } catch (e) {
    console.log(e.message);
  }
})
