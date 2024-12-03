const Order = require("../Models/OrderModel");
const { createStripeSession } = require("../Services/payement/stripePayment");
const Cart = require("./../Models/CartModel");


// createOrder
const createOrder = async (req, res) => {
    const {userId, paymentMethod, totalAmount,shippingAddress} = req.body;
    
    try {
        const cart = await Cart.findOne({userId}).populate('cartItems.productId');
        if(!cart) {
            return res.status(404).json({message: 'Cart not found for this user'});
        }

    // Create a new order
        const order = new Order({
            userId,
            paymentMethod,
            totalAmount,
            shippingAddress: {
                firstName: shippingAddress.firstName,
                lastName: shippingAddress.lastName,
                mobile: shippingAddress.mobile,
                postalCode: shippingAddress.postalCode,
                city: shippingAddress.city,
                country: shippingAddress.country,
                address: shippingAddress.address
            },
            products: cart.cartItems.map(item => ({
                productId: item.productId._id,
                quantity: item.quantity,
                size: item.size,
                color: item.color,
            })),
        })


        // Create a Stripe session for payment if the payment method is 'stripe'
        if (paymentMethod === 'stripe') {
            const { success, sessionUrl, message } = await createStripeSession(
            order.products, totalAmount, order._id
            );
    
            if (!success) {
                return res.status(500).json({ success: false, message : "Order Not Created Successfully!" });
            }

            // Save order only after successful Stripe session creation
            await order.save();
            await Cart.findByIdAndDelete(cart._id);
    
            // Return Stripe session URL to frontend
            return res.status(200).json({ success: true, sessionUrl, message: 'Order created and Stripe session started' });
        }

        // If not Stripe, save order immediately
        await order.save();
        console.log("order", order);

        // delete cart item after user place order
        await Cart.findByIdAndDelete(cart._id);
        return res.status(200).json({success : true, order, message: 'Order created successfully'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success : false, message: 'Error creating order'});
    }
}

// Get all orders
 const getAllOrders = async (req, res) => {
    try {
        const allOrders = await Order.find().populate('userId').populate('products.productId');
        return res.status(200).json({success : true, allOrders});
    } catch (error) {
        console.log(error);
        console.log("error.message", error.message);
        return res.status(500).json({success : false, message: 'Error fetching orders'});
    }
 }

// Get orders by user ID
const getOrderByUserId = async (req, res) => {
    try {
        const {userId} = req.params;
        const orderById = await Order.find({userId}).populate('products.productId')
        if(!orderById){
            return res.status(404).json({message: 'Order not found for this user'});
        }
       return res.status(200).json({success : true, orderById});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success : false, message: 'Error fetching order by user'})
    }
}


// Update order status
const updateOrderStatus = async (req, res) => {
    const orderId = req.params.orderId;
    const {orderStatus} = req.body;

    try {
        const updateOrderStatus = await Order.findByIdAndUpdate(orderId, {orderStatus}, {new : true});
        if(!updateOrderStatus){
            return res.status(404).json({message: 'Order not found for this user'});
        }
        return res.status(200).json({success : true, updateOrderStatus, message : "Order status update Successfully!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success : false, message: 'Failed to update order status'});
    }
}

// Update payment status
const updatePaymentStatus = async (req, res) => {
    const orderId  = req.params.orderId ;
    const {paymentStatus} = req.body;
    try {
        const updatePaymentStatus = await Order.findByIdAndUpdate(orderId , {paymentStatus}, {new : true})
        if(!updatePaymentStatus){
            return res.status(404).json({message: 'Order not found for this user'});
        }
        return res.status(200).json({success : true, updatePaymentStatus, message : "Payment status update Successfully!"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success : false, message: 'Failed to update payment status'})
    }
}

// Delete an order
const deleteOrder = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const orderDelete = await Order.findByIdAndDelete(orderId)
        if(!orderDelete){
            return res.status(404).json({message: 'Order not found for this user'});
        }
        return res.status(200).json({orderDelete, success : true, message : "Order deleted Successfully!"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success : false, message: 'Failed to delete order'})
    }
}



const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body; 

    try {
        if (success === 'true') {
            // Update the order to mark payment as successful
            await Order.findByIdAndUpdate(orderId, { paymentStatus: 'success' });
            res.json({ success: true, message: "Payment verified successfully And Order Create!" });
        } else {
            // Delete the order if the payment was not successful
            await Order.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Order cancelled due to payment failure" });
        }
    } catch (error) {
        console.error("Failed to verify order:", error);
        return res.status(500).json({ success: false, message: "Failed to verify order" });
    }
};


module.exports = {
    createOrder,
    getAllOrders,
    getOrderByUserId,
    updateOrderStatus,
    updatePaymentStatus,
    deleteOrder,
    verifyOrder
}