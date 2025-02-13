const express = require("express");
const { saveMessage, getMessages } = require("../Controllers/ChatController");
const chatRouter = express.Router();

chatRouter.post("/saveMessage", saveMessage );
chatRouter.post("/getMessages", getMessages);

module.exports = chatRouter;