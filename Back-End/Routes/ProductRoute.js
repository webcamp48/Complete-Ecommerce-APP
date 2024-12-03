const multer = require("multer");
const express = require("express");
const { addProduct, removeProduct, fetchAllProduct, getProductById, updateProduct, bestSellingProducts, newCollectionProducts, relatedProducts, searchProduct } = require("../Controllers/ProductController");

// product Router
const productRouter = express.Router();

// Product Image Upload
const productStorage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null,'./uploads/products')
    },
    filename : (req,file,callback) =>{

        const filename = `${Date.now()}-${file.originalname}`;

        return  callback(null, filename);
    }
});

const uploadProduct = multer({storage : productStorage});


// Product Router
productRouter.post("/addProduct", uploadProduct.single("image") , addProduct);
productRouter.get("/fetchAllProduct", fetchAllProduct);
productRouter.get('/getProductById/:id', getProductById)
productRouter.put("/updateProduct/:id", uploadProduct.single("image"), updateProduct);
productRouter.delete("/removeProduct", removeProduct);

productRouter.get("/newCollectionProducts", newCollectionProducts);
productRouter.get("/relatedProducts/:category", relatedProducts);
productRouter.get("/bestSellingProducts", bestSellingProducts);
productRouter.get("/searchproducts", searchProduct);

module.exports = productRouter;