const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Post = require('./models/post');

const app = express();

dotenv.config();

const url = process.env.MONGODB_URL;

mongoose.connect(url).then(() => {
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
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    message: "Post added successfully"
  })
});

app.use('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 'asdfasdf',
      title: 'First server-side post',
      content: 'This is coming from the server'
    },
    {
      id: 'as2343dfasdf',
      title: 'Second server-side post',
      content: 'This is coming from the server!!!'
    },
  ]
  res.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts
  })
});

module.exports = app;

