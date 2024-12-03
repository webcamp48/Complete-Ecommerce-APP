const mongoose = require("mongoose");

const LoginSignUpSchema = new mongoose.Schema({
    fullName : {type : String, required : true, trim : true},
    email : {type : String, required : true , unique : true, trim: true, lowercase : true},
    phone : {type : String , required : true},
    password : {type : String, required : true, trim : true},
    otpEmail : {type : String, required : false},
    otpPhone : {type : String, required : false},
    otpVerified: { type: Boolean, default: false },
    otpExpiry: { type: Date, required: false },
    address: { type: String, required: false, trim: true },
    hobbies: [ 
        { 
            type: String, 
            trim: true,
            required: false
        } 
    ],
    profileImage: { 
        type: String, 
        required: false 
    },

},{timestamps : true})

const LoginSignUp = new mongoose.model("LoginSignUp", LoginSignUpSchema);

module.exports = LoginSignUp;