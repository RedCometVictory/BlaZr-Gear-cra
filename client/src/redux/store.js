import { configureStore } from "@reduxjs/toolkit";
import setAuthToken from "../utils/setAuthToken";
import alertReducer from "/features/alert";
import authReducer from "/features/auth";
import cartReducer from "/features/cart";
import imageReducer from "/features/image";
import orderReducer from "/features/order";
import productReducer from "/features/product";
import slideReducer from "/features/slide";
import stripeReducer from "/features/stripe";
import userReducer from "/features/user";

const store = configureStore({
// export const store = configureStore({
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