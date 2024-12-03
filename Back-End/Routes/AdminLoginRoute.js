const express = require("express");
const adminRouter = express.Router();
const { AdminLogin } = require("../Controllers/AdminLoginController")


adminRouter.post("/adminLogin", AdminLogin);

module.exports = adminRouter;