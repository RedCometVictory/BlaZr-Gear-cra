import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "/features/alert";
import authReducer from "/features/auth";
import cartReducer from "/features/cart";
import imageReducer from "/features/image";
import orderReducer from "/features/order";
import productReducer from "/features/product";
import slideReducer from "/features/slide";
import stripeReducer from "/features/stripe";
import userReducer from "/features/user";

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    auth: authReducer,
    cart: cartReducer,
    image: imageReducer,
    order: orderReducer,
    product: productReducer,
    slide: slideReducer,
    stripe: stripeReducer,
    user: userReducer
  }
})