const app = require('./app');
require('dotenv').config();
const { connection } = require('./src/models/db-connection');



const PORT = process.env.PORT || 8080;

const start = async() => {
  try {
    await connection();
    app.listen(PORT, (err) => {
      if(err) console.log('err', err.message)
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  } catch (e) {
    console.log(e.message);
    process.exit(1)
  }
}
start();

