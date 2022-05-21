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

let chargeCardToastId = "chargeCardToastId";
let refundCardToastId = "refundCardToastId";

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
      toast.error("Failed to set card.", {theme: "colored", toastId: "setCardToastId"});
      // toast.error(message, {theme: "colored"});
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
      toast.error("Failed to list card(s) of user account.", {theme: "colored", toastId: "addCardToastId"});
      // toast.error(message, {theme: "colored"});
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
      toast.error("Failed to charge card.", {theme: "colored", toastId: chargeCardToastId});
      // toast.error(message, {theme: "colored"});
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
      toast.error("Failed to charge card.", {theme: "colored", toastId: chargeCardToastId});
      // toast.error(message, {theme: "colored"});
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
      toast.error("Failed to charge card.", {theme: "colored", toastId: chargeCardToastId});
      // toast.error(message, {theme: "colored"});
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
      toast.error("Failed to get charge. Contact customer support recommended.", {theme: "colored", toastId: "getChargeCardToastId"});
      // toast.error(message, {theme: "colored"});
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
      toast.error("Failed to refund card. Contact customer support recommended.", {theme: "colored", toastId: refundCardToastId});
      // toast.error(message, {theme: "colored"});
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
      toast.error("Failed to remove card / payment method.", {theme: "colored", toastId: "deleteCardToastId"});
      // toast.error(message, {theme: "colored"});
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
      .addCase(setCard.pending, (state) => {
        state.loading = true;
      })
      .addCase(setCard.fulfilled, (state, action) => {
        state.loading = false;
        state.cardToUse = action.payload;
        toast.success("Card set.", {theme: "colored", toastId: "setCardToastId"});
      })
      .addCase(setCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addCardToUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCardToUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.cards = action.payload.cards;
        toast.success("Cards added.", {theme: "colored", toastId: "cardsAddedToastId"});
      })
      .addCase(addCardToUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(singleCharge.pending, (state) => {
        state.loading = true;
      })
      .addCase(singleCharge.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.clientSecret = action.payload;
        toast.success("Charge successful.", {theme: "colored", toastId: "chargeSuccessfulToastId"});
      })
      .addCase(singleCharge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(saveCardAndCharge.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveCardAndCharge.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.clientSecret = action.payload;
      })
      .addCase(saveCardAndCharge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(singleChargeCard.pending, (state) => {
        state.loading = true;
      })
      .addCase(singleChargeCard.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.clientSecret = action.payload;
        toast.success("Charge successful.", {theme: "colored", toastId: "chargeSuccessfulToastId"});
      })
      .addCase(singleChargeCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getStripeCharge.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStripeCharge.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.clientSecret = action.payload;
        toast.success("Refund successful.", {theme: "colored", toastId: "refundSuccessfulToastId"});
      })
      .addCase(getStripeCharge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(refundCharge.pending, (state) => {
        state.loading = true;
      })
      .addCase(refundCharge.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.clientSecret = action.payload;
        toast.success("Refund successful.", {theme: "colored", toastId: "refundSuccessfulToastId"});
      })
      .addCase(refundCharge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCard.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.loading = false;
        state.cards.data = action.payload;
      })
      .addCase(deleteCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export const { stripeReset } = stripeSlice.actions;
export default stripeSlice.reducer;