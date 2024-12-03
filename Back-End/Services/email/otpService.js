const generateOtp = require("../../Utils/generateOtp");
const sendEmail = require("./emailService");

const sendEmailOTP =async (email) =>{

   const otp = await generateOtp();
   subject = 'Registration OTP';
   body = `Your OTP is ${otp}`;

   try {
    await sendEmail(email, subject, body);
    console.log('OTP sent to', email);
   } catch (error) {
    console.log('Error sending OTP:', error);
   }
   return otp;
}

module.exports = sendEmailOTP;