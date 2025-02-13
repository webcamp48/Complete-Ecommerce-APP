require("dotenv").config();
const mongoose = require("mongoose");


const connectDB = async ()=>{
    try {
        const dbURL = process.env.DB_URL;
        await mongoose.connect(dbURL);
        console.log("Connected to MongoDB.");
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
        process.exit(1);
    }
}

module.exports = connectDB;