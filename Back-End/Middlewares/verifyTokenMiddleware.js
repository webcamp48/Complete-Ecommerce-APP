const secretKey = process.env.JWT_SECRET;
const JWT = require('jsonwebtoken');

const verifyToken = (req, res, next)=>{
    // Get token from client-side
    const {token} = req.headers;
    
    if(!token){
        return res.status(401).json({success : false, message : "No authorization, Login Again."})
    }

    try {
        const token_decode = JWT.verify(token, secretKey);
        req.body.userId = token_decode.id;
        console.log("token verify");
        
        next();
    } catch (error) {
        return res.status(401).json({success : false, message : "Invalid Token.Login Again"})
    }
}

module.exports = verifyToken;