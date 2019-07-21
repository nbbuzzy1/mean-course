const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const postsRoutes = require('./routes/posts');

const app = express();

dotenv.config();

const url = process.env.MONGODB_URL;

mongoose.connect(url, { useNewUrlParser: true }).then(() => {
  console.log('connected to database')
}).catch(() => {
  console.log('connection failed')
});

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;

