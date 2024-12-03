import { configureStore } from "@reduxjs/toolkit";
import SignUpSlice from './features/AuthSlice/SignUpSlice';
import LoginSlice from "./features/AuthSlice/LoginSlice";
import ProductSlice from "./features/Products/ProductSlice";
import CartSlice from "./features/CartSlice/CartSlice";
import OrderSlice from "./features/Order/OrderSlice";
import UserProfileSlice from "./features/UserProfileSlice/UserProfileSlice";
import SliderHomeSlice from "./features/SliderHomeSlice/SliderHomeSlice";
import ChatSlice from "./features/ChatSlice/ChatSlice";


export const store = configureStore({
    reducer : {
        signup : SignUpSlice,
        login : LoginSlice,
        products : ProductSlice,
        cart : CartSlice,
        order : OrderSlice,
        profile : UserProfileSlice,
        sliderHome: SliderHomeSlice,
        chat : ChatSlice,
    },
})