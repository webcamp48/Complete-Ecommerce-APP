const { default: mongoose } = require("mongoose");

const CartSchema = new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId, ref : 'LoginSignUp', required : true},
    cartItems : [
        {
            productId : {type : mongoose.Schema.Types.ObjectId, ref : 'Product', required : true},
            quantity : {type : Number, default : 1},
            size : {type : String, required : false, trim : true},
            color : {type : String, required : false, trim : true},
        }
    ]
}, {timestamps : true});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;