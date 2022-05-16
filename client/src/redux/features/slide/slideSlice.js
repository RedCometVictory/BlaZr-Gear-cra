import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import slideService from "./slideService";

const initialState = {
  slides: [],
  slide: {},
  loading: true,
  error: [],
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
      toast.error("Failed to retrieve slideshow.", {theme: "colored"});
      // toast.error(message, {theme: "colored"});
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
      toast.error("Failed to list slide details.", {theme: "colored"});
      // toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createSlide = createAsyncThunk(
  'slide/create',
  async ({slideForm, navigate}, thunkAPI) => {
    try {
      return await slideService.createSlide(slideForm, navigate);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to create slide.", {theme: "colored"});
      // toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateSlide = createAsyncThunk(
  'slide/update',
  async ({slide_id, slideForm, navigate}, thunkAPI) => {
    try {
      return await slideService.updateSlide(slide_id, slideForm, navigate);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to update slide.", {theme: "colored"});
      // toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteSlide = createAsyncThunk(
  'slide/delete',
  async ({slide_id, navigate}, thunkAPI) => {
    try {
      return await slideService.deleteSlide(slide_id, navigate);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to delete slide.", {theme: "colored"});
      // toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const slideSlice = createSlice({
  name: 'slide',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSlides.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSlides.fulfilled, (state, action) => {
        state.loading = false;
        state.slides = action.payload;
      })
      .addCase(getAllSlides.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .addCase(getSlideDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSlideDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.slide = action.payload;
      })
      .addCase(getSlideDetails.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .addCase(createSlide.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSlide.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Created slide.", {theme: "colored"});
      })
      .addCase(createSlide.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .addCase(updateSlide.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSlide.fulfilled, (state, action) => {
        state.loading = false;
        state.slide = action.payload;
        toast.success("Updated slide.", {theme: "colored"});
      })
      .addCase(updateSlide.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .addCase(deleteSlide.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSlide.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Deleted slide.", {theme: "colored"});
      })
      .addCase(deleteSlide.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
  }
});

export const { reset } = slideSlice.actions;
export default slideSlice.reducer;