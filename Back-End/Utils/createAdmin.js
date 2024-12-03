const mongoose = require('mongoose');
const AdminLoginModel = require('../Models/AdminLoginModel'); 

const createAdmin = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/ecommerce-app', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const admin = new AdminLoginModel({
            email: 'admin@example.com',
            password: 'adminpassword',
        });

        await admin.save();
        console.log('Admin account created successfully!');
        mongoose.disconnect();
    } catch (error) {
        console.error('Error creating admin:', error);
    }
};

createAdmin();


// for create new admin login then first run command node utils/createAdmin.js
