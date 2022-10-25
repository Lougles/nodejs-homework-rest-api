const app = require('./app');
require('dotenv').config()
const {connection} = require('./src/db/connect');

const PORT = process.env.PORT || 8080

const start = async() => {
  try {
    await connection();
    app.listen(PORT, (err) => err ? console.log(err) : console.log(`Database connection successful on Port: ${PORT}`))
  } catch (e) {
    console.error(`Failed to start app with error:  ${e.message}`)
    process.exit(1);
  }
}

start();

