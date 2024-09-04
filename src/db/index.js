const mongoose = require('mongoose');

async function connectDb() {
  try {
    const connectionObj = await mongoose.connect(
      `${process.env.MONGODB_URL}/${process.env.DB_NAME}`
    );
    // console.log(`connection obj of database`);
    // console.log(connectionObj);
    // console.log(`database is connected: ${connectionObj.connection.host}`);
  } catch (err) {
    console.error('error while connection with database: ', err);
    throw err;
  }
}

module.exports = {
  connectDb,
};
