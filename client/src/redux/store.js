import { configureStore } from "@reduxjs/toolkit";
import setAuthToken from "../utils/setAuthToken";

// import alertReducer from "/features/alert";
import authReducer from "./features/auth/authSlice";
import cartReducer from "./features/cart/cartSlice";
import imageReducer from "./features/image/imageSlice";
import orderReducer from "./features/order/orderSlice";
import productReducer from "./features/product/productSlice";
import slideReducer from "./features/slide/slideSlice";
import stripeReducer from "./features/stripe/stripeSlice";
import userReducer from "./features/user/userSlice";

// export default store = configureStore({
// export const store = configureStore({
const store = configureStore({
  reducer: {
    // alert: alertReducer,
    auth: authReducer,
    cart: cartReducer,
    image: imageReducer,
    order: orderReducer,
    product: productReducer,
    slide: slideReducer,
    stripe: stripeReducer,
    user: userReducer
  }
});
let currentState = store.getState();

store.subscribe(() => {
  let previousState = currentState;
  currentState = store.getState(); // from rootReducer
  if (previousState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token;
    setAuthToken(token);
  }
});
export default store;
// configureStore().
/*
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import setAuthToken from '../utils/setAuthToken';
import rootReducer from './reducers/rootReducer';

const initialState = {};
const middleware = [thunk];

const store = createStore(
  rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware))
);

// subscription listener stores user token into LS
let currentState = store.getState();

store.subscribe(() => {
  let previousState = currentState;
  currentState = store.getState(); // from rootReducer
  if (previousState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token;
    setAuthToken(token);
  }
});
export default store;
*/