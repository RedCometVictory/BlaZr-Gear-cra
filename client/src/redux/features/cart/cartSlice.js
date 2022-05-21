import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import cartService from "./cartService";

const initialState = {
  cartItems: localStorage.getItem('__cart') ? JSON.parse(localStorage.getItem('__cart')) : [],
  paymentMethod: localStorage.getItem('__paymentMethod') ? JSON.parse(localStorage.getItem('__paymentMethod')) : null,
  shippingAddress: localStorage.getItem('__shippingAddress') ? JSON.parse(localStorage.getItem('__shippingAddress')): {},
  total: 0,
  loading: true,
  error: []
};

let getCartToastId = "getCartToastId";
let resetCartToastId = "resetCartToastId";
let addCartToastId = "addCartToastId";
let removeCartToastId = "removeCartToastId";

// * works
export const getCart = createAsyncThunk(
  'cart/get/all',
  async (_, thunkAPI) => {
    try {
      return await cartService.getCart();
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to get cart.", {theme: "colored", toastId: getCartToastId});
      // toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// * works
export const getCartGuest = createAsyncThunk(
  'cart/get/all/guest',
  async (_, thunkAPI) => {
    try {
      let currentCart = thunkAPI.getState().cart.cartItems;
      return await cartService.getCartGuest(currentCart);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to get guest cart.", {theme: "colored", toastId: getCartToastId});
      // toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// * works
export const resetCartOnProductDelete = createAsyncThunk(
  'cart/resetCart/productDelete',
  async (match, thunkAPI) => {
    try {
      console.log("match")
      console.log(match)
      return await cartService.resetCartOnProductDelete(match);
    } catch (err) {
      // TODO: dispatch(setAlert('Failed to login. Incorrect email or password.', 'danger'));
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to reset guest cart.", {theme: "colored", toastId: resetCartToastId});
      // toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// * works
export const addItemToCart = createAsyncThunk(
  'cart/item/add',
  async ({prod_id, qty}, thunkAPI) => {
    try {
      let currCartItems = thunkAPI.getState().cart.cartItems;
      return await cartService.addItemToCart(prod_id, qty, currCartItems);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to add to cart.", {theme: "colored", toastId: addCartToastId});
      // toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// * works
export const addItemToCartGuest = createAsyncThunk(
  'cart/item/add/guest',
  async ({prod_id, qty}, thunkAPI) => {
    try {
      let currCartItems = thunkAPI.getState().cart.cartItems;
      return await cartService.addItemToCartGuest(prod_id, qty, currCartItems);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to add to cart.", {theme: "colored", toastId: addCartToastId});
      // toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// * works
export const updateItemInCart = createAsyncThunk(
  'cart/item/update',
  async ({prod_id, cartQty}, thunkAPI) => {
    try {
      let currCartItems = thunkAPI.getState().cart.cartItems;
      return await cartService.updateItemInCart(prod_id, cartQty, currCartItems);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to add to cart.", {theme: "colored", toastId: addCartToastId});
      // toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// * works
export const removeFromCart = createAsyncThunk(
  'cart/item/remove',
  async (_, thunkAPI) => {
    try {
      let currCartItems = thunkAPI.getState().cart.cartItems;
      return await cartService.removeFromCart(currCartItems);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to remove item from cart.", {theme: "colored", toastId: removeCartToastId});
      // toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// * works
export const removeFromCartGuest = createAsyncThunk(
  'cart/item/remove/guest',
  async (prod_id, thunkAPI) => {
    try {
      let currCartItems = thunkAPI.getState().cart.cartItems;
      return await cartService.removeFromCartGuest(prod_id, currCartItems);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
        toast.error("Failed to remove item from cart.", {theme: "colored", toastId: removeCartToastId});
      // toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// * works
export const shippingAddressForCart = createAsyncThunk(
  'cart/shippingAddress/add',
  async (shippingAddress, thunkAPI) => {
    try {
      return await cartService.shippingAddressForCart(shippingAddress);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to set shipping address for cart.", {theme: "colored", toastId: "shippingCartToastId"});
      // toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// * works
export const paymentMethodForCart = createAsyncThunk(
  'cart/paymentMethod/add',
  async (formData, thunkAPI) => {
    try {
      return await cartService.paymentMethodForCart(formData);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to set payment method from cart.", {theme: "colored", toastId: "paymentMethodCartToastId"});
      // toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartReset: (state) => initialState,
    clearCart: (state) => {
      // localStorage.removeItem('__cart')
      // localStorage.removeItem('__shippingAddress')
      // localStorage.removeItem('__paymentMethod')
      state.cartItems = []
      state.shippingAddress = {}
      state.paymentMethod = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .addCase(getCartGuest.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartGuest.fulfilled, (state, action) => {
        state.loading = false;
        // state.cartItems = action.payload;
      })
      .addCase(getCartGuest.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .addCase(resetCartOnProductDelete.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetCartOnProductDelete.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(resetCartOnProductDelete.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .addCase(addItemToCartGuest.pending, (state) => {
        state.loading = false;
      //   state.loading = true;
      })
      .addCase(addItemToCartGuest.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(addItemToCartGuest.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .addCase(updateItemInCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateItemInCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(updateItemInCart.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .addCase(removeFromCartGuest.pending, (state) => {
        state.loading = false;
        // state.loading = true;
      })
      .addCase(removeFromCartGuest.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(removeFromCartGuest.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .addCase(shippingAddressForCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(shippingAddressForCart.fulfilled, (state, action) => {
        state.loading = false;
        state.shippingAddress = action.payload;
      })
      .addCase(shippingAddressForCart.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .addCase(paymentMethodForCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(paymentMethodForCart.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentMethod = action.payload;
      })
      .addCase(paymentMethodForCart.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
  }
});

export const { cartReset, clearCart } = cartSlice.actions;
export default cartSlice.reducer;