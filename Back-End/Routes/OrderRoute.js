const express = require("express");
const orderRouter = express.Router();
const orderController = require("./../Controllers/OrderController");
const verifyToken = require("../Middlewares/verifyTokenMiddleware");

orderRouter.get("/getAllOrders", orderController.getAllOrders);
orderRouter.post('/createOrder', verifyToken ,orderController.createOrder); 
orderRouter.get("/getOrderByUserId/:userId", verifyToken ,orderController.getOrderByUserId); 

orderRouter.put("/updateOrderStatus/:orderId", orderController.updateOrderStatus)
orderRouter.put("/updatePaymentStatus/:orderId", orderController.updatePaymentStatus)
orderRouter.delete("/deleteOrder/:orderId", orderController.deleteOrder)
orderRouter.post("/verifyOrder", orderController.verifyOrder)

module.exports = orderRouter;