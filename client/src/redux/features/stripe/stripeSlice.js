import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import stripeService from "./stripeService";
import { refundOrder } from "../order/orderSlice";

const initialState = {
  intent: null,
  cards: [],
  cardToUse: {},
  clientSecret: null,
  success: false,
  loading: true,
  error: []
};

export const setCard = createAsyncThunk(
  'stripe/setCard',
  async (card, thunkAPI) => {
    try {
      return await stripeService.setCard(card);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to set card.", {theme: "colored"});
      toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addCardToUser = createAsyncThunk(
  'stripe/addCard/toUser',
  async (stripeId, thunkAPI) => {
    try {
      return await stripeService.addCardToUser(stripeId);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to list card(s) of user account.", {theme: "colored"});
      toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const singleCharge = createAsyncThunk(
  'stripe/charge/single',
  async ({total, description, cart}, thunkAPI) => {
    try {
      return await stripeService.singleCharge(total, description, cart);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to charge card.", {theme: "colored"});
      toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const saveCardAndCharge = createAsyncThunk(
  'stripe/charge/saveCard',
  async ({total, description, cart}, thunkAPI) => {
    try {
      return await stripeService.saveCardAndCharge(total, description, cart);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to charge card.", {theme: "colored"});
      toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const singleChargeCard = createAsyncThunk(
  'stripe/charge/single/card',
  async ({card, total, description, cart}, thunkAPI) => {
    try {
      return await stripeService.singleChargeCard(card, total, description, cart);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to charge card.", {theme: "colored"});
      toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getStripeCharge = createAsyncThunk(
  'stripe/charge/get',
  async (chargeId, thunkAPI) => {
    try {
      return await stripeService.getStripeCharge(chargeId);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to refund card. Contact customer support recommended.", {theme: "colored"});
      toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const refundCharge = createAsyncThunk(
  'stripe/charge/refund',
  async ({orderId, userId, stripePaymentId, amount}, thunkAPI) => {
    try {
      thunkAPI.dispatch(refundOrder(orderId));
      return await stripeService.refundCharge(orderId, userId, stripePaymentId, amount, thunkAPI);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to refund card. Contact customer support recommended.", {theme: "colored"});
      toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteCard = createAsyncThunk(
  'stripe/delete/card',
  async (cardId, thunkAPI) => {
    try {
      let currCards = thunkAPI.getState().stripe.cards;
      return await stripeService.deleteCard(cardId, currCards);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to remove card / payment method.", {theme: "colored"});
      toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const stripeSlice = createSlice({
  name: 'stripe',
  initialState,
  reducers: {
    stripeReset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .add(setCard.pending, (state) => {
        state.loading = true;
      })
      .add(setCard.fulfilled, (state, action) => {
        state.loading = false;
        state.cardToUse = action.payload;
        toast.success("Card set.", {theme: "colored"});
      })
      .add(setCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .add(addCardToUser.pending, (state) => {
        state.loading = true;
      })
      .add(addCardToUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.cards = action.payload.cards;
        toast.success("Cards added.", {theme: "colored"});
      })
      .add(addCardToUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .add(singleCharge.pending, (state) => {
        state.loading = true;
      })
      .add(singleCharge.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.clientSecret = action.payload;
        toast.success("Charge successful.", {theme: "colored"});
      })
      .add(singleCharge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .add(saveCardAndCharge.pending, (state) => {
        state.loading = true;
      })
      .add(saveCardAndCharge.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.clientSecret = action.payload;
      })
      .add(saveCardAndCharge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .add(singleChargeCard.pending, (state) => {
        state.loading = true;
      })
      .add(singleChargeCard.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.clientSecret = action.payload;
        toast.success("Charge successful.", {theme: "colored"});
      })
      .add(singleChargeCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .add(getStripeCharge.pending, (state) => {
        state.loading = true;
      })
      .add(getStripeCharge.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.clientSecret = action.payload;
        toast.success("Refund successful.", {theme: "colored"});
      })
      .add(getStripeCharge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .add(refundCharge.pending, (state) => {
        state.loading = true;
      })
      .add(refundCharge.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.clientSecret = action.payload;
        toast.success("Refund successful.", {theme: "colored"});
      })
      .add(refundCharge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .add(deleteCard.pending, (state) => {
        state.loading = true;
      })
      .add(deleteCard.fulfilled, (state, action) => {
        state.loading = false;
        state.cards.data = action.payload;
      })
      .add(deleteCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export const { stripeReset } = stripeSlice.actions;
export default stripeSlice.reducer;