// IMPORT GLOBALS
const process = require('node:process');

// CREATE EXPRESS APP
const express = require('express');

const app = express();

// IMPORT USEFUL MIDDLEWARES
require('dotenv').config(); // Access ENV variables from .env file
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');

// IMPORT ROUTES
const routes = require('./routes/app.routes');

// CONSUME USEFUL MIDDLEWARES
app.use(express.json());
app.use(logger('dev'));
app.use(cors());

// CONSUME ROUTES YOU HAVE IMPORTED
app.use('/', routes);

// DEFINE HOSTNAME & PORT
const port = process.env.PORT || 3000;

// SERVE REACT APP AS STATIC FOLDER FOR PRODUCTION
app.use(express.static('../client/dist'));

// CONNECT TO DATABASE IF YOU NEED DATABASE INTERACTIONS
mongoose.set('strictQuery', false);
async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  }
  catch (err) {
    console.warn(`Error connecting to MongoDB: ${err}. Retrying in 10 sec...`);
  }
}

connectToMongoDB().then(() => {
  // START LISTENING TO REQUESTS W/ EXPRESS SERVER APP AFTER CONNECTING TO MONGODB
  app.listen(port, () => {
    console.warn(`Server running http://localhost:${port}/`); // or 127.0.0.1:3000
  });
});

mongoose.connection.on('error', () => setTimeout(connectToMongoDB, 10000));
mongoose.connection.on('disconnected', () => setTimeout(connectToMongoDB, 10000));
mongoose.connection.on('connected', () => console.warn('Connected to MongoDB.'));
