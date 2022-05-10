import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import stripeService from "./stripeService";

const initialState = {
  intent: null,
  cards: [],
  cardToUse: {},
  clientSecret: null,
  success: false,
  loading: true,
  errors: []
};

export const getAllSlides = createAsyncThunk(
  'slide/getAll',
  async (_, thunkAPI) => {
    try {
      return await slideService.getAllSlides();
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

export const getSlideDetails = createAsyncThunk(
  'slide/get/details',
  async (slide_id, thunkAPI) => {
    try {
      return await slideService.getSlideDetails(slide_id);
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

export const createSlide = createAsyncThunk(
  'slide/create',
  async ({slideForm, history}, thunkAPI) => {
    try {
      return await slideService.createSlide(slideForm, history);
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

export const updateSlide = createAsyncThunk(
  'slide/update',
  async ({slide_id, slideForm, history}, thunkAPI) => {
    try {
      return await slideService.updateSlide(slide_id, slideForm, history);
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

export const deleteSlide = createAsyncThunk(
  'slide/delete',
  async ({slide_id, history}, thunkAPI) => {
    try {
      return await slideService.deleteSlide(slide_id, history);
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

export const stripeSlice = createSlice({
  name: 'stripe',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .add(getAllSlides.pending, (state) => {
        state.loading = true;
      })
      .add(getAllSlides.fulfilled, (state, action) => {
        state.loading = false;
        state.slides = action.payload;
      })
      .add(getAllSlides.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      // .add(getSlideDetails.pending, (state) => {
      //   state.loading = true;
      // })
      // .add(getSlideDetails.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.slide = action.payload;
      // })
      // .add(getSlideDetails.rejected, (state, action) => {
      //   state.loading = false;
      //   // state.cartItems = null;
      //   state.error = action.payload;
      // })
      // .add(createSlide.pending, (state) => {
      //   state.loading = true;
      // })
      // .add(createSlide.fulfilled, (state, action) => {
      //   state.loading = false;
      // })
      // .add(createSlide.rejected, (state, action) => {
      //   state.loading = false;
      //   // state.cartItems = null;
      //   state.error = action.payload;
      // })
      // .add(updateSlide.pending, (state) => {
      //   state.loading = true;
      // })
      // .add(updateSlide.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.slide = action.payload;
      // })
      // .add(updateSlide.rejected, (state, action) => {
      //   state.loading = false;
      //   // state.cartItems = null;
      //   state.error = action.payload;
      // })
      // .add(deleteSlide.pending, (state) => {
      //   state.loading = true;
      // })
      // .add(deleteSlide.fulfilled, (state, action) => {
      //   state.loading = false;
      // })
      // .add(deleteSlide.rejected, (state, action) => {
      //   state.loading = false;
      //   // state.cartItems = null;
      //   state.error = action.payload;
      // })
  }
});

export const { reset } = slideSlice.actions;
export default slideSlice.reducer;