const mongoose = require("mongoose");

const SliderSchema = new mongoose.Schema({
    mainHeading : {type : String, required : true, trim : true},
    subHeading : {type : String , required : true, trim : true},
    urlText : {type : String, required : true , trim : true},
    buttonURL : {type : String, required : false , trim : true},
    sliderImage : {type: String, required: true, trim : true},
});
const Slider = mongoose.model("Slider", SliderSchema);
module.exports = Slider;
