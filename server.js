const env = require('dotenv');
const express = require('express');

env.config({
  path: './config/config.env'
});

const server = express();
const port = process.env.PORT;

server.listen(port, () => {
  console.log(`Server started\nRoot Url: http://localhost:${port}`)
});