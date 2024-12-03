const { mongoose} = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title : {type: String, required: true, trim : true},
    description : {type:String,required:true, trim : true},
    old_price : {type :Number, required : true, trim: true},
    new_price : {type :Number, required : true, trim: true},
    image : {type: String, required: true, trim : true},
    size : {type : String, required : true, trim : true},
    color : {type : String, required : true, trim : true},
    stoke : {type : Number,  default : 0, trim : true},
    category : {type : String, required : true, trim : true},

    // for product  filter
    quantitySold : {type : Number, trim : true, default : 0},  // for best selling

}, {timestamps : true});

const Product =  mongoose.model("Product", ProductSchema);

module.exports = Product;

