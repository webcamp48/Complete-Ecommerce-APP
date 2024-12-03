const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;


const client = new twilio(accountSid, authToken);

const sendMobileSMS = async (to, body) =>{
    try {
        const message =await client.messages.create({
            from: twilioPhoneNumber,
            to: to,
            body: body
        });
        console.log("Message send Successfully", message);
        return message;
    } catch (error) {
        console.error('Error sending SMS:', error);
        throw error;
    }
}

module.exports = sendMobileSMS;