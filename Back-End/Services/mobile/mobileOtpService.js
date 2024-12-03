const generateOtp = require("../../Utils/generateOtp");
const sendMobileSMS = require("./mobileService");

const mobileOTP = async (phone)=>{
    const otp =  await generateOtp();
    const message = `Your OTP is ${otp}`;

    try {
        await sendMobileSMS(phone, message);
        console.log("Otp send to successfully to your mobile : ", phone)

    } catch (error) {
        console.log('Error sending OTP:', error);
    }
    return otp;
}

module.exports = mobileOTP;