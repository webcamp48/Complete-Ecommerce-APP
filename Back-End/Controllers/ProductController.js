const Product = require("../Models/ProductModel");
const fs = require("fs");



// add Product API ENDPOINT
const addProduct = async (req, res)=>{
    const img_filename = req.file ? req.file.filename : null;
    const {title, description, old_price, new_price, size, color, stoke, category} = req.body;

    try {
        const products = new Product({
            title,
            description,
            old_price,
            new_price,
            image : img_filename,
            size,
            color,
            stoke,
            category,
        });
        await products.save();
        return res.status(200).json({success: true, message : "Product Added Successfully"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message : "Failed to Add Product"})
    }
}


// fetch all Product API EndPoint
const fetchAllProduct = async (req, res) => {
    try {
        const productsData = await Product.find({});
        if(!productsData){
            return res.status(404).json({success: false, message : "No Product Found"});
        }
        return res.status(200).json({success : true, productsData, message : " Product Fetched Successfully!"})
    } catch (error) {
        console.error(error);
        return res.status(500).json({success : false, message : "Failed to Fetch Product"})
    }
}

// getProductById 
const getProductById = async (req, res) => {
    const {id} = req.params;
    try {
        const singleProduct = await Product.findById(id);
        if(!singleProduct){
            return res.status(404).json({success : false, message : "Product Not Found!"})
        }
        return res.status(200).json({success : true, singleProduct, message : "Product"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success : false, message : "Failed to Fetch Product"})
    }
}


// updateProduct
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const img_filename = req.file ? req.file.filename : null;
    const { title, description, old_price, new_price, size, color, stoke, category } = req.body;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product Not Found!" });
        }

        // Update the product fields
        product.title = title || product.title;
        product.description = description || product.description;
        product.old_price = old_price || product.old_price;
        product.new_price = new_price || product.new_price;
        product.size = size || product.size;
        product.color = color || product.color;
        product.stoke = stoke || product.stoke;
        product.category = category || product.category;

        if (img_filename) {
            const oldImagePath = `./uploads/products/${product.image}`;

            if (fs.existsSync(oldImagePath)) {
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.error('Failed to delete old image:', err);
                    } else {
                        console.log('Old image deleted successfully');
                    }
                });
            } else {
                console.warn('Old image does not exist:', oldImagePath);
            }

            // Save new image
            product.image = img_filename;
        }

        await product.save();
        return res.status(200).json({ success: true, message: "Product Updated Successfully!" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Failed to Update Product" });
    }
};

// remove Product API ENDPOINT
const removeProduct = async (req, res) => {
    const { id } = req.body;
    try {
        const deleteProduct = await Product.findById(id);
        if (!deleteProduct) {
            return res.status(404).json({ success: false, message: "Product Not Found!" });
        }

        // Remove the image file from filesystem
        const imagePath = `./uploads/products/${deleteProduct.image}`
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

        // Remove the product from the database
        await deleteProduct.deleteOne({ _id: id });

        return res.status(200).json({ success: true, message: "Product Removed Successfully!" });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Failed to Remove Product" });
    }
}



// new Collection Products  API
const newCollectionProducts  = async (req, res) => {
    try {
        //Fetch products sorted by date in descending order
        const latestProduct = await Product.find().sort({createdAt : -1}).limit(10);
        if(!latestProduct.length){
            return res.status(404).json({ success: false, message: "No latest products found"})
        }
        return res.status(200).json({success : true, latestProduct})

    } catch (error) {
        console.log(error);
        return res.status(500).json({success : false , message : "Failed to Fetch Latest Product"});
    }
}


// related Product API
const relatedProducts = async (req, res) => {
    const category = req.params.category;
    try {
        const relatedProduct = await Product.find({category});

        if(relatedProduct.length === 0){
            return res.status(404).json({ success: false, message: "No related products found"})
        }
        return res.status(200).json({success : true, relatedProduct})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success : false , message : "Failed to Fetch Related"})
    }
}

// Best Selling Products
const bestSellingProducts = async (req, res) => {
    try {
        //Fetch products sorted by quantitySold in descending order
        const bestSellingProduct = await Product.find().sort({quantitySold : -1}).limit(10);
        if(!bestSellingProduct.length){
            return res.status(404).json({ success: false, message: "No best selling products"})
        }
        return res.status(200).json({success : true, bestSellingProduct})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success : false , message : "Failed to Fetch Best"});
    }
}


// Creating API for searching Products by title
const searchProduct = async (req, res) => {
    const searchQuery = req.query.search || "";
    try {
        if(!searchQuery){
            return res.status(404).json({ success: false, message: "No search query provided"})
        }

        const searchProduct = await Product.find({
            title : {$regex : searchQuery, $options : "i"}
        })

        if (!searchProduct.length) {
            return res.status(404).json({ success: false, message: "No Products Found with this title" });
        }
        
        return res.status(200).json({ success: true, searchProduct, message: "Products Fetched Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Failed to Search Products"})
    }
}



module.exports = {
    addProduct,
    fetchAllProduct,
    getProductById,
    updateProduct,
    removeProduct,

    newCollectionProducts,
    relatedProducts,
    bestSellingProducts,
    searchProduct
}