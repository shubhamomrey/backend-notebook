const mongoose = require('mongoose');

const mongoURL = "mongodb://127.0.0.1:27017/notebook";
// const mongoURL = "mongodb://127.0.0.1:27017/";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectToMongo;
