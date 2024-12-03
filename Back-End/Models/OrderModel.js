const { default: mongoose } = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "LoginSignUp",
        required: true
    },
    products : [{
        productId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Product",
            required: true,
           
        },
        quantity : {type : Number, required : true, min : 1},
        size : {type : String, required : true},
        color : {type : String, required : true},
        // price : {type : Number, required : true}
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    shippingAddress: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        mobile: { type: String, required: true },
        postalCode: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        address: { type: String, required: true }
    },
    paymentMethod : {
        type : String,
        enum : ['cash', 'stripe', 'paypal'],
        required : true
    },
    paymentStatus : {
        type : String,
        enum : ['pending', 'success', 'failed'],
        default : 'pending'
    },
    orderStatus : {
        type : String,
        enum : ['pending', 'shipped', 'delivered', 'canceled'],
        default : 'pending'
    },

}, {timestamps : true});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;




