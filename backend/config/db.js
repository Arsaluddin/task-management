// server/config/db.js

const mongoose = require('mongoose');

mongoose.connect(mongoURI, {
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
