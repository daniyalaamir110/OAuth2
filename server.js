const env = require('dotenv');
const express = require('express');
const conn = require('./config/conn.mysql')

env.config({
  path: './config/config.env'
});

conn.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("Database connected");
  }
});

const server = express();
const port = process.env.PORT;

server.listen(port, () => {
  console.log(`Server started\nRoot Url: http://localhost:${port}`)
});