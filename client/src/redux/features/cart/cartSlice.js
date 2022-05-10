import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartService";

// const setAlert = (msg, alertType, timeout = 6000) => {
//   const id = uuidv4();
  
// };
// const alertService = {
//   setAlert,
//   removeAlert
// }
// export default alertService;
const initialState = {
  cartItems: localStorage.getItem('__cart') ? JSON.parse(localStorage.getItem('__cart')) : [],
  paymentMethod: localStorage.getItem('__paymentMethod') ? JSON.parse(localStorage.getItem('__paymentMethod')) : null,
  shippingAddress: localStorage.getItem('__shippingAddress') ? JSON.parse(localStorage.getItem('__shippingAddress')): {},
  total: 0,
  loading: true,
  error: []
};

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
      return thunkAPI.rejectWithValue(message);
    }
  }
);

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
      return thunkAPI.rejectWithValue(message);
    }
  }
);

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
      return thunkAPI.rejectWithValue(message);
    }
  }
);

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
      return thunkAPI.rejectWithValue(message);
    }
  }
);

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
      return thunkAPI.rejectWithValue(message);
    }
  }
);

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
      return thunkAPI.rejectWithValue(message);
    }
  }
);

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
      return thunkAPI.rejectWithValue(message);
    }
  }
);

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
      return thunkAPI.rejectWithValue(message);
    }
  }
);

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
      return thunkAPI.rejectWithValue(message);
    }
  }
);

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
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    reset: (state) => initialState,
    clearCart: (state) => {
      localStorage.removeItem('__cart')
      localStorage.removeItem('__shippingAddress')
      localStorage.removeItem('__paymentMethod')
      state.cart = []
      state.shippingAddress = ''
      state.paymentMethod = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .add(getCart.pending, (state) => {
        state.loading = true;
      })
      .add(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .add(getCart.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .add(getCartGuest.pending, (state) => {
        state.loading = true;
      })
      .add(getCartGuest.fulfilled, (state, action) => {
        state.loading = false;
        // state.cartItems = action.payload;
      })
      .add(getCartGuest.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .add(resetCartOnProductDelete.pending, (state) => {
        state.loading = true;
      })
      .add(resetCartOnProductDelete.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .add(resetCartOnProductDelete.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .add(addItemToCart.pending, (state) => {
        state.loading = true;
      })
      .add(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .add(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .add(addItemToCartGuest.pending, (state) => {
        state.loading = true;
      })
      .add(addItemToCartGuest.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .add(addItemToCartGuest.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .add(updateItemInCart.pending, (state) => {
        state.loading = true;
      })
      .add(updateItemInCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .add(updateItemInCart.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .add(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .add(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .add(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .add(removeFromCartGuest.pending, (state) => {
        state.loading = true;
      })
      .add(removeFromCartGuest.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .add(removeFromCartGuest.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .add(shippingAddressForCart.pending, (state) => {
        state.loading = true;
      })
      .add(shippingAddressForCart.fulfilled, (state, action) => {
        state.loading = false;
        state.shippingAddress = action.payload;
      })
      .add(shippingAddressForCart.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .add(paymentMethodForCart.pending, (state) => {
        state.loading = true;
      })
      .add(paymentMethodForCart.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentMethod = action.payload;
      })
      .add(paymentMethodForCart.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
  }
});

export const { reset, clearCart } = cartSlice.actions;
export default cartSlice.reducer;