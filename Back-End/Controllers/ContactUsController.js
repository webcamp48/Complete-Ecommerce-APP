const ContactUs = require("../Models/ContactUsModel");

const userContactUs = async (req, res) => {
    try {
        const {firstName, lastName, email, phone, message} = req.body;
        await ContactUs.create({
            firstName : firstName,
            lastName : lastName,
            email : email,
            phone : phone,
            message : message
        });
        res.status(200).json({success: true, message: "Your message has been sent to the Admin Panel. The admin will contact you shortly."});
    } catch (error) {
        console.log(error);
        res.status(500).json({success : false, message : "Your message has not been sent to the Admin.Try Again"})
    }
}

// fetch Contact Us Message for Admin Panel
const fetchContactUs = async (req, res) => {
    try {
        const fetchContact = await ContactUs.find({});
        if(fetchContact.length === 0){
            res.status(404).json({success: true, message: "No messages found."});
        }
        res.status(200).json({success: true, message:"Customer Message Fetch Successfully!", fetchContact});
    } catch (error) {
        console.log(error);
        res.status(500).json({success : false, message : "Failed to Fetch Customer Contact Us Message"});        
    }
}


// delete contact us message API
const deleteContactUs = async (req, res) => {
    try {
        const {id} = req.params;
        const deleteContactUs = await ContactUs.findByIdAndDelete(id);
        if(!deleteContactUs){
            res.status(404).json({success: false, message: "Contact Us Message Not Found"})
        }
        res.status(200).json({success : true, message : "Customer Message Delete Successfully!"});
    } catch (error) {
        console.log(error);
        res.status(500).json({success : false, message : "Failed to Delete Customer Contact"})
    }
}

module.exports = {
    userContactUs,
    fetchContactUs,
    deleteContactUs,
}