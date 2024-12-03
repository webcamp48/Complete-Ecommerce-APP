const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); 


const AdminLoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
});

// Pre-save hook to hash the password
AdminLoginSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const AdminLoginModel = mongoose.model("AdminLogin", AdminLoginSchema);

module.exports = AdminLoginModel;
