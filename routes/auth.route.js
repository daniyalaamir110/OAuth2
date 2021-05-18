const express = require("express");
const {
  authGoogle,
  authGoogleFailure,
  authGoogleCallback
} = require("../controller/auth.controller");

const authRouter = express.Router();

authRouter.get("/google", authGoogle);
authRouter.get("/google/callback", authGoogleFailure, authGoogleCallback);

module.exports = authRouter;