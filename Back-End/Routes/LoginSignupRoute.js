const express = require("express");
const { Login, SignUp, verifyMobileOTP, verifyEmailOTP, fetchUserProfileById, updateUserProfile, resetPassword, getAllUsers, deleteUser } = require("../Controllers/LoginSignupController");
const multer = require("multer");
const authRouter = express.Router();


const userProfileStorage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, './uploads/userProfiles')
    },
    filename : (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname}`;
        return cb(null, filename);
    }
});

const uploadUserProfile = multer({storage : userProfileStorage});


authRouter.post("/signup" ,SignUp);
authRouter.post("/login", Login);
authRouter.post("/verifyMobileOTP", verifyMobileOTP);
authRouter.post("/verifyEmailOTP", verifyEmailOTP);
authRouter.post("/resetPassword", resetPassword);


authRouter.get("/fetchUserProfile/:userId", fetchUserProfileById);
authRouter.post("/updateUserProfile/:userId", uploadUserProfile.single('profileImage'), updateUserProfile);

// get all register user API Route
authRouter.get("/getAllUsers", getAllUsers);
authRouter.delete("/deleteUser/:id", deleteUser);


module.exports = authRouter;
