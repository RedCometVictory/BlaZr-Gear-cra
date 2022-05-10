import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";

const initialState = {
  order: {},
  orders: [],
  page: null,
  pages: null,
  loading: true,
  errors: []
};

export const createOrder = createAsyncThunk(
  'order/create',
  async (orderFormData, thunkAPI) => {
    try {
      return await orderService.createOrder(orderFormData);
      // TODO: clear cart upon order creating and remove __cart from LS:localStorage.removeItem('__cart');
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

export const getAllUserOrders = createAsyncThunk(
  'order/get/all/user',
  async ({pageNumber, itemsPerPage}, thunkAPI) => {
    try {
      return await orderService.getAllUserOrders(pageNumber, itemsPerPage);
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

export const getAllAdminOrders = createAsyncThunk(
  'order/get/all/admin',
  async ({pageNumber, itemsPerPage}, thunkAPI) => {
    try {
      return await orderService.getAllAdminOrders(pageNumber, itemsPerPage);
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

export const getOrderDetails = createAsyncThunk(
  'order/get/detail',
  async (order_id, thunkAPI) => {
    try {
      return await orderService.getOrderDetails(order_id);
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

export const getOrderDetailAdmin = createAsyncThunk(
  'order/get/detail/admin',
  async (order_id, thunkAPI) => {
    try {
      return await orderService.getOrderDetailAdmin(order_id);
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

export const payOrder = createAsyncThunk(
  'image/get/detail',
  async ({order_id, paymentResult}, thunkAPI) => {
    try {
      return await orderService.getImageDetails(order_id, paymentResult);
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

export const updateOrderStatusToShipped = createAsyncThunk(
  'order/updateStatus/shipped',
  async (order_id, thunkAPI) => {
    try {
      return await orderService.updateOrderStatusToShipped(order_id);
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

export const deliverOrder = createAsyncThunk(
  'order/deliver',
  async (order_id, thunkAPI) => {
    try {
      return await orderService.deliverOrder(order_id);
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

export const refundOrder = createAsyncThunk(
  'order/refund',
  async (order_id, thunkAPI) => {
    try {
      return await orderService.refundOrder(order_id);
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

export const refundPayPalOrder = createAsyncThunk(
  'order/refund/paypal',
  async ({orderId, userId, paypalPaymentId, paypalCaptureId, amount}, thunkAPI) => {
    try {
      const chargeData = { orderId, userId, paypalPaymentId, paypalCaptureId, amount };
      return await orderService.refundPayPalOrder(orderId, chargeData);
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

export const deleteOrder = createAsyncThunk(
  'image/delete',
  async ({order_id, history}, thunkAPI) => {
    try {
      return await orderService.deleteImage(order_id, history);
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

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .add(createOrder.pending, (state) => {
        state.loading = true;
      })
      .add(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.order = action.payload;
      })
      .add(createOrder.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .add(getAllUserOrders.pending, (state) => {
        state.loading = true;
      })
      .add(getAllUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orderItems;
        state.pages = action.payload.pages;
        state.page = action.payload.page;
      })
      .add(getAllUserOrders.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .add(getAllAdminOrders.pending, (state) => {
        state.loading = true;
      })
      .add(getAllAdminOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orderItems;
        state.pages = action.payload.pages;
        state.page = action.payload.page;
      })
      .add(getAllAdminOrders.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .add(getOrderDetails.pending, (state) => {
        state.loading = true;
      })
      .add(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.userOrder;
      })
      .add(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .add(getOrderDetailAdmin.pending, (state) => {
        state.loading = true;
      })
      .add(getOrderDetailAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.userOrder;
      })
      .add(getOrderDetailAdmin.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .add(payOrder.pending, (state) => {
        state.loading = true;
      })
      .add(payOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.order = {
          orderInfo: action.payload.orderInfo,
          orderItems: [...state.order.orderItems],
          userInfo: {...state.order.userInfo}
        };
      })
      .add(payOrder.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .add(updateOrderStatusToShipped.pending, (state) => {
        state.loading = true;
      })
      .add(updateOrderStatusToShipped.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.order = {
          orderInfo: action.payload.orderInfo,
          orderItems: [...state.order.orderItems],
          userInfo: {...state.order.userInfo}
        };
      })
      .add(updateOrderStatusToShipped.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .add(deliverOrder.pending, (state) => {
        state.loading = true;
      })
      .add(deliverOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.order = {
          orderInfo: action.payload.orderInfo,
          orderItems: [...state.order.orderItems],
          userInfo: {...state.order.userInfo}
        };
      })
      .add(deliverOrder.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .add(refundOrder.pending, (state) => {
        state.loading = true;
      })
      .add(refundOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.order = {
          orderInfo: action.payload.orderInfo,
          orderItems: [...state.order.orderItems],
          userInfo: {...state.order.userInfo}
        };
      })
      .add(refundOrder.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .add(refundPayPalOrder.pending, (state) => {
        state.loading = true;
      })
      .add(refundPayPalOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.order = {
          orderInfo: action.payload.orderInfo,
          orderItems: [...state.order.orderItems],
          userInfo: {...state.order.userInfo}
        };
      })
      .add(refundPayPalOrder.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .add(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .add(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
      })
      .add(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
  }
});

export const { reset } = orderSlice.actions;
export default orderSlice.reducer;