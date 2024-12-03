const crypto = require("crypto");

const generateOtp = ()=>{

    const otp =  crypto.randomInt(100000, 999999).toString();
    console.log("generate otp :", otp);
    return otp;
}

module.exports = generateOtp;