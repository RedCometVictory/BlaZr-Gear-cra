import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import imageService from "./imageService";

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
      toast.error("Failed to retrieve images.", {theme: "colored", toastId: "ImageToastId"});
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
      toast.error("Failed to list image details.", {theme: "colored", toastId: "ImageToastId"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteImage = createAsyncThunk(
  'image/delete',
  async ({image_id, navigate}, thunkAPI) => {
    try {
      return await imageService.deleteImage(image_id, navigate);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to delete image.", {theme: "colored", toastId: "ImageToastId"});
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
      .addCase(getAllImages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload.images;
        state.pages = action.payload.pages;
        state.page = action.payload.page;
      })
      .addCase(getAllImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getImageDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getImageDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.image = action.payload;
      })
      .addCase(getImageDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.loading = true;
        toast.success("Deleted image.", {theme: "colored", toastId: "deleteImageToastId"});
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export const { reset } = imageSlice.actions;
export default imageSlice.reducer;