const JWT = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

const createToken = (payLoad )=>{
    return JWT.sign({id: payLoad}, secretKey, { expiresIn: '1h' })
}

module.exports = {
    createToken
}