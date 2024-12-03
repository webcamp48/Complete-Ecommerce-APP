const bcrypt = require("bcrypt"); 
const fs = require("fs");
const LoginSignUp = require("../Models/LoginSignupModel");
const { createToken } = require("../Utils/token");
const sendEmailOTP = require("../Services/email/otpService");
const mobileOTP = require("../Services/mobile/mobileOtpService");


// SignUp API ENDPOINT
const SignUp = async (req, res) =>{
    const {fullName, email, phone, password} = req.body;
    try {
        const existingUser = await LoginSignUp.findOne({email});
        if(existingUser){
            return res.status(400).json({success : false, message : "User Already Exists."})
        }

        // convert password to hashedpassword
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // send 6 digit otp to user phone number
        const otp = await mobileOTP(phone)
        console.log("mobile otp : ", otp);

        // Set OTP expiry time (e.g., 15 minutes from now)
        const otpExpiry = Date.now() + 15 * 60 * 1000;


        // save data in db
        const userSave = new LoginSignUp({
            fullName,
            email,
            phone,
            password : hashedPassword,
            otpPhone : otp,
            otpVerified: false,
            otpExpiry,
        });
        await userSave.save();

        return res.status(200).json({success : true, message : "User Created Successfully And OTP Sent to Your Mobile Number."});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success : false, message : "Internal Server Error."});
    }

}


// login API ENDPOINT
const Login = async (req, res)=>{
    const {email, password} = req.body;
    
    try {
        const user = await LoginSignUp.findOne({email});
        if(!user){
            return res.status(400).json({success : false, message : "User Does't Exists."})
        }

        // password match
        const passwordMatched = await bcrypt.compare(password, user.password);
        if(!passwordMatched){
            return res.status(400).json({success : false, message : "Invalid Password."})
        }
        // create token
        const token = createToken(user._id);

        // send 6 digit otp to user email
       const otp = await sendEmailOTP(email);

        const otpExpiry = Date.now() + 15 * 60 * 1000;

    // otp save in datbase
       await LoginSignUp.findOneAndUpdate(
        { email: email },
        { $set: { otpEmail: otp, otpExpiry: otpExpiry, otpVerified :false } }
       );
       
        return res.status(200).json({success : true, user, message :"User Login Successfully and OTP sent via Your Email", token})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success : false, message : "Internal Server Error."})
    }
}


// verifyMobileOTP
const verifyMobileOTP = async (req, res) =>{
    const {otp} = req.body;

    if (!otp) {
        return res.status(400).json({ message: 'OTP are required' });
    }
    
    try {
        const user = await LoginSignUp.findOne({otpPhone : otp});
        if(!user){
            return res.status(400).json({success : false, message : "Invalid OTP."})
        }

        
        // Check if OTP has expired
        if (Date.now() > user.otpExpiry) {
            return res.status(400).json({ success: false, message: "OTP has expired." });
            }
        // Validate OTP
        if(otp !== user.otpPhone){
            return res.status(400).json({success : false, message : "Invalid OTP"});
        }

        // Update OTP verified status
        user.otpVerified = true;
        user.otpPhone = null;
        user.otpExpiry = null;
        await user.save();
        return res.status(200).json({success : true, message : "Mobile OTP Verified Successfully. Now You Can Login!"})    
    } catch (error) {
        console.error(error);
        return res.status(500).json({success : false, message : "Internal Server Error"});
        
    }
}


//API For verify email otp
const verifyEmailOTP = async (req, res) =>{
    const {otp} = req.body;

    if (!otp) {
        return res.status(400).json({ message: 'OTP are required' });
    }
    try {
        const user = await LoginSignUp.findOne({otpEmail:otp});
        if(!user){
            return res.status(400).json({success : false, message : "Invalid OTP."})
        }

        if(user.otpEmail !== otp){
            return res.status(400).json({success : false, message : "Invalid OTP."})
        }
        // Check if OTP has expired
        if (Date.now() > user.otpExpiry) {
            return res.status(400).json({ success: false, message: "OTP has expired." });
        }
        // Update OTP verified status
        user.otpVerified = true;
        user.otpEmail = null;
        user.otpExpiry = null;
        await user.save();

        return res.status(200).json({success : true, message : "Email OTP Verified Successfully"});

    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message : "Internal Server Error"})
    }
}



// Fetch User Profile by ID
const fetchUserProfileById = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await LoginSignUp.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Send profile data
        return res.status(200).json({ success: true, message: "User profile fetched successfully", user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
    try {
        const { userId } = req.params; 
        const profile_img = req.file ? req.file.filename : null;
        const { fullName, phone, address, hobbies } = req.body;

        // Find the user in LoginSignUp model
        const user = await LoginSignUp.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Update user fields
        user.fullName = fullName || user.fullName;
        user.phone = phone || user.phone;
        await user.save();

        const profileData = {
            fullName: user.fullName,
            phone: user.phone,
            address: address || user.address,
            hobbies: Array.isArray(hobbies) ? hobbies : [hobbies],
            profileImage: profile_img || user.profileImage
        };

        // If new image uploaded, delete old one
        if (profile_img && user.profileImage) {
            const oldImagePath = `./uploads/userProfiles/${user.profileImage}`;
            if (fs.existsSync(oldImagePath)) {
                fs.unlink(oldImagePath, err => {
                    if (err) console.error('Failed to delete old image:', err);
                });
            }
        }

        // Update user with new profile data
        const updatedUser = await LoginSignUp.findByIdAndUpdate(userId, profileData, { new: true });

        return res.status(200).json({ success: true, message: 'Profile updated successfully', updatedUser });
    } catch (error) {
        console.error('Error updating profile:', error);
        return res.status(500).json({ success: false, message: 'Error updating profile' });
    }
};


// reset Password API
const resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await LoginSignUp.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'Email does not exist. Try again.' });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate OTP and expiry time
        const otp = await sendEmailOTP(email);
        const otpExpiry = Date.now() + 15 * 60 * 1000; 

        // otp save in datbase
        await LoginSignUp.findOneAndUpdate(
            { email: email },
            { $set: { otpEmail: otp, otpExpiry: otpExpiry, otpVerified :false } }
        );
       
        await LoginSignUp.findByIdAndUpdate(user._id, { password: hashedPassword });

        return res.status(200).json({ success: true, message: 'Password reset successfully. OTP sent to your email.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error resetting password.' });
    }
};


// getAllUsers for chat app and Show in Admin side
const getAllUsers = async (req, res) => {
    try {
        const users = await LoginSignUp.find({}, '_id fullName email phone address profileImage');
        if(!users){
            return res.status(404).json({ success: false, message: 'No users found.'})
        }
        return res.status(200).json({ success: true, users });
    } catch (error) {
        console.log(error);
        res.status(500).json({success : false, message : "Failed To Fetch All User"});
    }
}

// delete User from admin side
const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await LoginSignUp.findById(id)
        if(!user){
            return res.status(404).json({ success: false, message: 'User not found.'})
        }
        // Remove the image file from filesystem
        const imagePath = `./uploads/userProfiles/${user.profileImage}`
        if (fs.existsSync(imagePath)) {
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Failed to delete image:', err);
                }else{
                    console.log('Image deleted successfully');
                }
            })
        }else{
            console.warn('Image does not exist:', imagePath);
        }
        await user.deleteOne({ _id: id });
        return res.status(200).json({ success: true, message: 'User deleted successfully.'});

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error deleting user.'})
    }
}



module.exports = {
    SignUp,
    Login,
    verifyMobileOTP,
    verifyEmailOTP,
    fetchUserProfileById,
    updateUserProfile,
    resetPassword,
    getAllUsers,
    deleteUser,
}