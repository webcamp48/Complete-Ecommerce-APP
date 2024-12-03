const express = require("express");
const { addToCart, fetchCart, removeItemFromCart } = require("../Controllers/CartController");
const verifyToken = require("../Middlewares/verifyTokenMiddleware");
const cartRouter = express.Router();

cartRouter.post("/addCart" ,verifyToken ,addToCart);
cartRouter.get('/fetchCart/:userId',verifyToken ,fetchCart);
cartRouter.delete("/removeCart",verifyToken ,removeItemFromCart);

module.exports = cartRouter;