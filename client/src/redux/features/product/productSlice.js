import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

const initialState = {
  productIds: [],
  productById: null,
  products: [],
  topProducts: [],
  categories: [],
  page: null,
  pages: null,
  loading: true,
  errors: []
}

export const getAllProductIds = createAsyncThunk(
  'product/getAll/byId',
  async (_, thunkAPI) => {
    try {
      return await productService.getAllProductIds();
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

export const listAllCategories = createAsyncThunk(
  'product/list/category/all',
  async (_, thunkAPI) => {
    try {
      return await productService.listAllCategories();
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

export const listAllProducts = createAsyncThunk(
  'product/getAll',
  async ({keyword = '', category = '', pageNumber, itemsPerPage}, thunkAPI) => {
    try {
      return await productService.listAllProducts(keyword, category, pageNumber, itemsPerPage);
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

export const listTopProducts = createAsyncThunk(
  'product/list/all',
  async (_, thunkAPI) => {
    try {
      return await productService.listTopProducts();
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

export const listProductDetails = createAsyncThunk(
  'product/list/details',
  async (prod_id, thunkAPI) => {
    try {
      return await productService.listProductDetails(prod_id);
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

export const createProduct = createAsyncThunk(
  'product/create',
  async ({productForm, history}, thunkAPI) => {
    try {
      return await productService.createProduct(productForm, history);
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

export const createProductReview = createAsyncThunk(
  'product/review/create',
  async ({prod_id, reviewForm}, thunkAPI) => {
    try {
      let currProductByIdReviews = thunkAPI.getState().product.productById;
      return await productService.createProductReview(prod_id, reviewForm, currProductByIdReviews);
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

export const updateProductReview = createAsyncThunk(
  'product/review/update',
  async ({prod_id, review_id, reviewForm}, thunkAPI) => {
    try {
      let currProductByIdReviews = thunkAPI.getState().product.productById;
      return await productService.updateProductReview(prod_id, review_id, reviewForm, currProductByIdReviews);
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

export const deleteProductReview = createAsyncThunk(
  'product/review/delete',
  async ({prod_id, review_id}, thunkAPI) => {
    try {
      let currProductByIdReviews = thunkAPI.getState().product.productById;
      return await productService.deleteProductReview(prod_id, review_id, currProductByIdReviews);
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

export const updateProduct = createAsyncThunk(
  'product/update',
  async ({prod_id, productForm}, thunkAPI) => {
    try {
      let currProductById = thunkAPI.getState().product.productById;
      return await productService.updateProduct(prod_id, productForm, currProductById);
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

export const deleteProduct = createAsyncThunk(
  'product/delete',
  async ({prod_id, history}, thunkAPI) => {
    try {
      return await productService.deleteProduct(prod_id, history);
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

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .add(getAllProductIds.pending, (state) => {
        state.loading = true;
      })
      .add(getAllProductIds.fulfilled, (state, action) => {
        state.loading = false;
        state.productIds = action.payload;
      })
      .add(getAllProductIds.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .add(listAllCategories.pending, (state) => {
        state.loading = true;
      })
      .add(listAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .add(listAllCategories.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .add(listAllProducts.pending, (state) => {
        state.loading = true;
      })
      .add(listAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.pages = action.payload.pages;
        state.page = action.payload.page;
      })
      .add(listAllProducts.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .add(listTopProducts.pending, (state) => {
        state.loading = true;
      })
      .add(listTopProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.topProducts = action.payload;
      })
      .add(listTopProducts.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .add(listProductDetails.pending, (state) => {
        state.loading = true;
      })
      .add(listProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productById = action.payload;
      })
      .add(listProductDetails.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .add(createProduct.pending, (state) => {
        state.loading = true;
      })
      .add(createProduct.fulfilled, (state, action) => {
        state.loading = false;
      })
      .add(createProduct.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .add(createProductReview.pending, (state) => {
        state.loading = true;
      })
      .add(createProductReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.productById = action.payload;
      })
      .add(createProductReview.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .add(updateProductReview.pending, (state) => {
        state.loading = true;
      })
      .add(updateProductReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.productById = action.payload;
      })
      .add(updateProductReview.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .add(deleteProductReview.pending, (state) => {
        state.loading = true;
      })
      .add(deleteProductReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.productById = action.payload;
      })
      .add(deleteProductReview.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .add(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .add(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.productById = action.payload;
      })
      .add(updateProduct.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
      .add(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .add(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
      })
      .add(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        // state.cartItems = null;
        state.error = action.payload;
      })
  }
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;