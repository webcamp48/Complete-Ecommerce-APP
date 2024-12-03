const express = require("express");
const { fetchSlider, addSlider, updateSlider, deleteSlider, fetchSliderById,  } = require("../Controllers/SliderController");
const multer = require("multer");
const sliderRouter = express.Router();


// upload slider image in slider folder
const SliderStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './uploads/sliders');
    },
    filename : (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname}`
       return cb(null, fileName)
    }
})
const uploadSlider = multer({storage : SliderStorage});


sliderRouter.get("/fetchSlider", fetchSlider);
sliderRouter.get("/fetchSliderById/:id", fetchSliderById);
sliderRouter.post("/addSlider",uploadSlider.single('sliderImage'),  addSlider);
sliderRouter.put("/updateSlider/:id", uploadSlider.single('sliderImage'), updateSlider);
sliderRouter.delete("/deleteSlider/:id", deleteSlider)

module.exports = sliderRouter;