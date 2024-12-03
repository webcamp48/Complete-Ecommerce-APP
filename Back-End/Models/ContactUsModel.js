const mongoose = require("mongoose");

const ContactUsSchema = new mongoose.Schema({
    firstName : {type : String, required : true, trim : true},
    lastName : {type : String, required : true, trim : true},
    email : {type : String, required : true, trim : true, lowercase : true},
    phone : {type : String, required : true, trim : true},
    message : {type : String, required : true, trim : true},
});
const ContactUs = mongoose.model("ContactUs", ContactUsSchema);
module.exports = ContactUs;