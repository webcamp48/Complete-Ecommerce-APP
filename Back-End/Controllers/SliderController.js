const Slider = require("./../Models/SliderModel");
const fs = require("fs");


// add Slider API
const addSlider = async (req, res) => {
    try {
        const sliderImage = req.file ? req.file.filename : null;
        const {mainHeading, subHeading, urlText, buttonURL} = req.body;
        console.log(req.body);
        console.log("sliderImage", sliderImage);
        

        

        const newSlider = await Slider.create({
            mainHeading,
            subHeading, 
            urlText, 
            buttonURL, 
            sliderImage
        });
        await newSlider.save();

        res.status(200).json({success : true, message : "Slider content created successfully!", newSlider});
    } catch (error) {
        console.log(error);
        res.status(500).json({success : false, message : "Failed to create slider content"});
    }
}

// fetch Slider API
const fetchSlider = async (req, res) => {
    try {
        const fetchSlider = await Slider.find();
        if(!fetchSlider){
            res.status(404).json({success : false, message : "No slider content found!"})
        }
        res.status(200).json({success : true, message : "Slider Content Fetched Successfully!" ,fetchSlider});
    } catch (error) {
        console.log(error);
        res.status(500).json({success : false, message : "Failed to fetch slider content"})
    }
}

// fetch Slider by id API
const fetchSliderById = async (req, res) => {
    try {
        const  id = req.params.id;
        const fetchSliderById = await Slider.findById(id);
        if(!fetchSliderById){
            res.status(404).json({success : false, message : "No slider content found with this Id"});
        }
        res.status(200).json({success : true, message : "Slider Content Fetched Successfully",fetchSliderById})

    } catch (error) {
        console.log(error);
        res.status(500).json({success : false, message : "Failed to Fetch this Slider"})
    }
}

// update Slider API
const updateSlider = async (req, res) => {
    try {
        const id = req.params.id;
        const sliderImage = req.file ? req.file.filename : null;
        const {mainHeading, subHeading, urlText, buttonURL} = req.body;

        const updateSlider = await Slider.findById(id);
        if(!updateSlider){
            res.status(404).json({success : false, message : "Slider content not found!"})
        }

        updateSlider.mainHeading = mainHeading || updateSlider.mainHeading;
        updateSlider.subHeading = subHeading || updateSlider.subHeading;
        updateSlider.urlText = urlText || updateSlider.urlText;
        updateSlider.buttonURL = buttonURL || updateSlider.buttonURL;

        if(sliderImage){
            const oldImagePath = `./uploads/sliders/${updateSlider.sliderImage}`;
            if(fs.existsSync(oldImagePath)){
                fs.unlink(oldImagePath, (err)=>{
                    if (err) {
                        console.error('Failed to delete old image:', err);
                    } else {
                        console.log('Old image deleted successfully');
                    }
                })
            }else{
                console.log('Old image not found', oldImagePath);
            }
            // save new updated image
            updateSlider.sliderImage = sliderImage 
        }

        await updateSlider.save();
        res.status(200).json({updateSlider, success : true, message : "Slider content updated successfully!"})
    } catch (error) {
        console.log(error);
        res.status(500).json({success : false, message : "Failed to update slider content", error : error.message})
        
    }
}

// delete Slider API
const deleteSlider = async (req, res) => {
    try {
        const {id} = req.params;
        const deleteSlider = await Slider.findById(id);
        if(!deleteSlider){
            res.status(404).json({success : false, message : "Slider content not found!"})
        }
        // delete image if exists
        const imagePath = `./uploads/sliders/${deleteSlider.sliderImage}`
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
        // remove slider base on id
        await deleteSlider.deleteOne({_id : id});
        res.status(200).json({success : true, message : "Slider content deleted successfully!", deleteSlider})

    } catch (error) {
        console.log(error);
        res.status(500).json({success : false, message : "Failed to delete slider content"})
    }
}


module.exports = {
    addSlider,
    fetchSlider,
    updateSlider,
    deleteSlider,
    fetchSliderById
}