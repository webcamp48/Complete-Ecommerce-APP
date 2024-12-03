const nodemailer = require('nodemailer');

// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.Email_USER, 
        pass: process.env.PASSWORD_USER, 
    }
});

const sendEmail = async (to, subject, body) => {
    try {
        const mailOptions = {
            from: process.env.Email_USER, 
            to,
            subject, 
            text: body
        };

        // Send email
        await transporter.sendMail(mailOptions);

        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email', error);
        throw error;
    }
};

module.exports = sendEmail;
