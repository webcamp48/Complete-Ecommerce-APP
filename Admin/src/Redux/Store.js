import { configureStore } from "@reduxjs/toolkit";
import FetchProductSlice from "./Slice/FetchProductSlice";
import GetProductByIdSlice from "./Slice/GetProductByIdSlice";
import OrderSlice from "./features/Order/OrderSlice";
import ContactUsSlice from "./features/ContactUs/ContactUsSlice";
import SliderSlice from "./features/Slider/SliderSlice";
import UserMangeSlice from './features/UserManagement/UserMangeSlice';
import adminAuthSlice from './features/AdminLogin/AdminSlice';


export const store = configureStore({
    reducer:{
        products: FetchProductSlice,
        getProductById: GetProductByIdSlice,
        order : OrderSlice,
        contact : ContactUsSlice,
        slider : SliderSlice,
        userManage : UserMangeSlice,
        adminAuth : adminAuthSlice,
    }
});