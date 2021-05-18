const env = require("dotenv");
const mysql = require("mysql");

env.config({
  path: "./config/config.env"
})

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})

module.exports = conn;