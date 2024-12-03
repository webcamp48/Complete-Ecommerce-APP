const crypto = require('crypto-js');

const SECRET_KEY = process.env.USERCHATS_SECRET_KEY;


// Encrypt message
const encryptMessage = (message) => {
    return crypto.AES.encrypt(message, SECRET_KEY).toString();
}


//  Decrypt message
const decryptMessage = (encryptedMessage) => {
    const bytes = crypto.AES.decrypt(encryptedMessage, SECRET_KEY);
    return bytes.toString(crypto.enc.Utf8);
}

module.exports = {
    encryptMessage,
    decryptMessage
}