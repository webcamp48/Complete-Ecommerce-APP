const express = require("express");
const { userContactUs, fetchContactUs, deleteContactUs } = require("../Controllers/ContactUsController");
const contactUsRouter = express.Router();

contactUsRouter.post("/userContactUs", userContactUs);
contactUsRouter.get("/fetchContactUs", fetchContactUs);
contactUsRouter.delete("/deleteContactUs/:id", deleteContactUs);

module.exports = contactUsRouter;