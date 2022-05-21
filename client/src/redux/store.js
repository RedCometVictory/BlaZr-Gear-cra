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
  console.log("STATE")
  console.log(currentState)
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


/*
//Get All Products
export const getProducts = createAsyncThunk('products/get-all', async(_,thunkAPI) => {
    try {
        //const {keyword, pageNumber} = params
        //return await productService.getProducts(keyword, pageNumber)
        return await productService.getProducts()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Get a Single Product
export const getProductDetails = createAsyncThunk('product/get', async(id, thunkAPI) => {
    try {
        return await productService.getProductDetails(id)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
*/