require('dotenv').config();
const { connectDb } = require('./db/index');
const { app } = require('./app');

const port = process.env.PORT;

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is listening on port: ${port}`);
    });
  })
  .catch((err) => {
    console.error(`error while connection with database: ${err}`);
  });
