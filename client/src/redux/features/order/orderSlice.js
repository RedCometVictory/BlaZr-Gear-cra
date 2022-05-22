import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import orderService from "./orderService";

const initialState = {
  order: {},
  orders: [],
  page: null,
  pages: null,
  loading: true,
  error: []
};

// * works
export const createOrder = createAsyncThunk(
  'order/create',
  async (orderFormData, thunkAPI) => {
    try {
      return await orderService.createOrder(orderFormData, thunkAPI);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to create order.", {theme: "colored", toastId: "createOrderToastId"});
      // toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// * works
export const getAllUserOrders = createAsyncThunk(
  'order/get/all/user',
  async ({pageNumber, itemsPerPage}, thunkAPI) => {
    try {
      console.log("ORDER SLICE")
      console.log("getAllUserOrders")
      return await orderService.getAllUserOrders(pageNumber, itemsPerPage);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to list orders.", {theme: "colored", toastId: "getAllOrdersToastId"});
      // toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// * works
export const getAllAdminOrders = createAsyncThunk(
  'order/get/all/admin',
  async ({pageNumber, itemsPerPage}, thunkAPI) => {
    try {
      console.log("ORDER SLICE")
      console.log("getAllAdminOrders")
      return await orderService.getAllAdminOrders(pageNumber, itemsPerPage);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to list orders.", {theme: "colored", toastId: "getAllOrdersToastId"});
      // toast.error(message, {theme: "colored"});
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
      toast.error("Failed to list order.", {theme: "colored", toastId: "getOrderToastId"});
      // toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// * works
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
      toast.error("Failed to list order.", {theme: "colored", toastId: "getOrderToastId"});
      // toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const payOrder = createAsyncThunk(
  'order/pay',
  async ({order_id, paymentResult}, thunkAPI) => {
    try {
      console.log("ORDER SLICE")
      console.log("pay order")
      return await orderService.getImageDetails(order_id, paymentResult);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to pay order.", {theme: "colored", toastId: "payOrderToastId"});
      // toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// *works
export const updateOrderStatusToShipped = createAsyncThunk(
  'order/updateStatus/shipped',
  async (order_id, thunkAPI) => {
    try {
      console.log("ORDER SLICE")
      console.log("UpdateOrderStatus to shipped")
      return await orderService.updateOrderStatusToShipped(order_id);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to change shipping status of order.", {theme: "colored", toastId: "updateShippingOrderToastId"});
      // toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// * works
export const deliverOrder = createAsyncThunk(
  'order/deliver',
  async (order_id, thunkAPI) => {
    try {
      console.log("ORDER SLICE")
      console.log("deliverOrder")
      return await orderService.deliverOrder(order_id);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to change delivery status of order.", {theme: "colored", toastId: "deliverOrderToastId"});
      // toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const refundOrder = createAsyncThunk(
  'order/refund',
  async (orderId, thunkAPI) => {
    try {
      console.log("ORDER SLICE")
      console.log("refundOrder")
      console.log(orderId)
      return await orderService.refundOrder(orderId);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to set order status to refund.", {theme: "colored", toastId: "refundOrderToastId"});
      // toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const refundPayPalOrder = createAsyncThunk(
  'order/refund/paypal',
  async ({orderId, userId, paypalPaymentId, paypalCaptureId, amount}, thunkAPI) => {
    try {
      console.log("ORDER SLICE")
      console.log("refundPayPalOrder")
      const chargeData = { orderId, userId, paypalPaymentId, paypalCaptureId, amount };
      console.log("chargeData")
      console.log(chargeData)
      return await orderService.refundPayPalOrder(orderId, chargeData);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to change order status to refund.", {theme: "colored", toastId: "refundOrderToastId"});
      // toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// * works
export const deleteOrder = createAsyncThunk(
  'order/delete',
  async ({order_id, navigate}, thunkAPI) => {
    try {
      console.log("delete order - SLICE")
      console.log(order_id)
      return await orderService.deleteOrder(order_id, navigate);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to delete order.", {theme: "colored", toastId: "deleteOrderToastId"});
      // toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    orderReset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .addCase(getAllUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orderItems;
        state.pages = action.payload.pages;
        state.page = action.payload.page;
      })
      .addCase(getAllUserOrders.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .addCase(getAllAdminOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllAdminOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orderItems;
        state.pages = action.payload.pages;
        state.page = action.payload.page;
      })
      .addCase(getAllAdminOrders.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.userOrder;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .addCase(getOrderDetailAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderDetailAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.userOrder;
      })
      .addCase(getOrderDetailAdmin.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .addCase(payOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(payOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.order.orderInfo = action.payload.orderInfo;
        // state.order = {
        //   orderInfo: action.payload.orderInfo,
        //   orderItems: [...state.order.orderItems],
        //   userInfo: {...state.order.userInfo}
        // };
      })
      .addCase(payOrder.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .addCase(updateOrderStatusToShipped.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrderStatusToShipped.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.order.orderInfo = action.payload.orderInfo;
        // state.order = {
        //   orderInfo: action.payload.orderInfo,
        //   orderItems: [...state.order.orderItems],
        //   userInfo: {...state.order.userInfo}
        // };
        toast.success("Order has been shipped.", {theme: "colored", toastId: "orderShippedToastId"});
      })
      .addCase(updateOrderStatusToShipped.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .addCase(deliverOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deliverOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.order.orderInfo = action.payload.orderInfo;
        // state.order = {
        //   orderInfo: action.payload.orderInfo,
        //   orderItems: [...state.order.orderItems],
        //   userInfo: {...state.order.userInfo}
        // };
        // toast.success("Order delivered.", {theme: "colored"});
      })
      .addCase(deliverOrder.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .addCase(refundOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(refundOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.order.orderInfo = action.payload.orderInfo;
        // state.order = {
        //   orderInfo: action.payload.orderInfo,
        //   orderItems: [...state.order.orderItems],
        //   userInfo: {...state.order.userInfo}
        // };
        toast.success("Order refunded.", {theme: "colored", toastId: "refundOrderToastId"});
      })
      .addCase(refundOrder.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .addCase(refundPayPalOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(refundPayPalOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.order.orderInfo = action.payload.orderInfo;
        // state.order = {
        //   orderInfo: action.payload.orderInfo,
        //   orderItems: [...state.order.orderItems],
        //   userInfo: {...state.order.userInfo}
        // };
        toast.success("Order refunded.", {theme: "colored", toastId: "refundOrderToastId"});
      })
      .addCase(refundPayPalOrder.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = true;
        toast.success("Order deleted.", {theme: "colored", toastId: "deleteOrderToastId"});
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
  }
});

export const { orderReset } = orderSlice.actions;
export default orderSlice.reducer;