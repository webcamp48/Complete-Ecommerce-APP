const AdminLoginModel = require("../Models/AdminLoginModel");
const bcrypt = require("bcrypt"); 
const { createToken } = require("../Utils/token");

// AdminLogin
const AdminLogin = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await AdminLoginModel.findOne({email});
        if(!user){
            return res.status(404).json({message:"Admin not found"});
        }
    
        const isMatchPassword = await bcrypt.compare(password, user.password);
        if(!isMatchPassword){
            return res.status(404).json({success : false, message : "Incorrect Password!"})
        }
        // Generate JWT token for admin 
        const token = createToken(user._id);
        return res.status(200).json({success : true, token, message : "Admin Login Successfully!"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success : false , message : "Admin Login Failed!"});
    }
}

module.exports = {
    AdminLogin
};