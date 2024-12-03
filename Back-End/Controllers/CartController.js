const Cart = require("../Models/CartModel");
const Product = require("../Models/ProductModel");


// add to cart API
const addToCart = async (req, res) => {
    const { userId, productId, quantity, size, color } = req.body;

    console.log("cart data", req.body);

    try {

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.stoke < quantity) {
            return res.status(400).json({ message: "Insufficient stock available" });
        }


        // Find the cart for the user
        let cart = await Cart.findOne({ userId });

        if (cart) {
            // If cart exists for the user, update or add the product
            const itemIndex = cart.cartItems.findIndex(item => 
                item.productId.toString() === productId &&
                item.size === size &&
                item.color === color
            );

            if (itemIndex > -1) {
                // If product with same size and color already exists, update quantity
                cart.cartItems[itemIndex].quantity += quantity;
            } else {
                // If product with same size and color doesn't exist, add it
                cart.cartItems.push({ productId, quantity, size, color });
            }

            await cart.save();
        } else {
            // If no cart exists, create a new cart with the product
            cart = await Cart.create({
                userId,
                cartItems: [{ productId, quantity, size, color }]
            });
        }

        product.stoke -= quantity;
        await product.save();
        return res.status(201).json({ message: "Cart created successfully", cart: cart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Failed to add item to cart' });
    }
};

// fetchCart
const fetchCart = async (req, res)=>{
    const userId = req.params.userId;
    try {
        let cart = await Cart.findOne({userId}).populate('cartItems.productId');
        if(!cart){
            cart =  new Cart({ userId, cartItems: [] });
            await cart.save();
            return res.status(200).json({success : false, message : 'Cart not found', cart});
        }
        return res.status(200).json({success : true, cart, message : 'Cart fetched successfully'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success : false, message : 'Failed to fetch cart'})
        
    }
}

// Remove item from cart
const removeItemFromCart = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        let cart = await Cart.findOne({userId});
        if(!cart){
            return res.status(404).json({success : false, message : 'Cart not found'});
        }
        cart.cartItems = cart.cartItems.filter((item) => {
            return item.productId.toString() !== productId; 
        });
        await cart.save();
        return res.status(200).json({success : true, message : 'Item removed from cart successfully'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success : false, message : 'Failed to remove item from cart'})
    }
}

module.exports = {
    addToCart,
    fetchCart,
    removeItemFromCart,
}
