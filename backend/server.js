// server/app.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const db = require('./config/db');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Define your API routes here (e.g., CRUD operations for tasks)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
