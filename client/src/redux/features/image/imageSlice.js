import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import imageService from "./imageService";

// const setAlert = (msg, alertType, timeout = 6000) => {
//   const id = uuidv4();
  
// };
// const alertService = {
//   setAlert,
//   removeAlert
// }
// export default alertService;
const initialState = {
  images: [],
  image: {},
  page: null,
  pages: null,
  loading: true,
  error: [],
};

export const getAllImages = createAsyncThunk(
  'image/get/all',
  async ({pageNumber, itemsPerPage}, thunkAPI) => {
    try {
      return await imageService.getAllImages(pageNumber, itemsPerPage);
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

export const getImageDetails = createAsyncThunk(
  'image/get/detail',
  async (image_id, thunkAPI) => {
    try {
      return await imageService.getImageDetails(image_id);
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

export const deleteImage = createAsyncThunk(
  'image/delete',
  async ({image_id, history}, thunkAPI) => {
    try {
      return await imageService.deleteImage(image_id, history);
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

export const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .add(getAllImages.pending, (state) => {
        state.loading = true;
      })
      .add(getAllImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload.images;
        state.pages = action.payload.pages;
        state.page = action.payload.page;
      })
      .add(getAllImages.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .add(getImageDetails.pending, (state) => {
        state.loading = true;
      })
      .add(getImageDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.image = action.payload;
      })
      .add(getImageDetails.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .add(deleteImage.pending, (state) => {
        state.loading = true;
      })
      .add(deleteImage.fulfilled, (state, action) => {
        state.loading = false;
      })
      .add(deleteImage.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
  }
});

export const { reset } = imageSlice.actions;
export default imageSlice.reducer;