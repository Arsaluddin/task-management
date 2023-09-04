// server/config/db.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

mongoose.connect(process.env.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error(`MongoDB Connection Error: ${error}`);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});
