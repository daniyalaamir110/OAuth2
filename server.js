const env = require("dotenv");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const conn = require("./config/conn.mysql");
const authRouter = require("./routes/auth.route");

env.config({
  path: "./config/config.env"
});

require("./config/passport")(passport);

conn.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("Database connected");
  }
});

const server = express();
const port = process.env.PORT;

server.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: false,
}))

server.use(passport.initialize());
server.use(passport.session());

server.use("/auth", authRouter);

server.listen(port, () => {
  console.log(`Server started\nRoot Url: http://localhost:${port}`)
});