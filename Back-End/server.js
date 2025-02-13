const express = require("express");
require('dotenv').config();
const http = require("http");
const cors = require('cors');
const path = require("path");
const connectDB = require("./Config/db");
const productRouter = require("./Routes/ProductRoute");
const authRouter = require("./Routes/LoginSignupRoute");
const adminRouter = require("./Routes/AdminLoginRoute");
const cartRouter = require("./Routes/CartRoute");
const orderRouter = require("./Routes/OrderRoute");
const contactUsRouter = require("./Routes/ContactUsRoute");
const sliderRouter = require("./Routes/SliderRoute");
const chatRouter = require("./Routes/ChatMessageRoute");
const setupSocketIO = require("./socket/socketSetup");

const app = express();
const port = process.env.PORT || 3001;


// Connect to MongoDB
connectDB();




// MiddleWare
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || https://complete-ecommerce-app-front-end.onrender.com, 
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}));

// api endpoints
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use('/api/cart', cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/contact", contactUsRouter);
app.use("/api/slider", sliderRouter);
app.use("/api/chats", chatRouter);
app.use('/images/products', express.static(path.join(__dirname, 'uploads/products')));
app.use('/images/sliders', express.static(path.join(__dirname, 'uploads/sliders')));
app.use('/images/userProfiles', express.static(path.join(__dirname, 'uploads/userProfiles')));



// for admin panel
app.use("/api/admin", adminRouter);


// Create HTTP server
const server = http.createServer(app);

// Setup Socket.IO
setupSocketIO(server);

app.get("/", (req,res)=>{
    res.send("Server is running");
});

// Start server
server.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})
