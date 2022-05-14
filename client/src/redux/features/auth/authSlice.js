import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import authService from "./authService";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: localStorage.getItem("__userInfo") ? true : false,
  loading: false,
  userInfo: localStorage.getItem("__userInfo") ? JSON.parse(localStorage.getItem("__userInfo")) : {},
  error: null,
  allowReset: false
};

export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, thunkAPI) => {
    try {
      return await authService.loadUser(thunkAPI);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to retrieve user info.", {theme: "colored"});
      toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (formRegData, thunkAPI) => {
    try {
      return await authService.registerUser(formRegData, thunkAPI);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to register.", {theme: "colored"});
      toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (formData, thunkAPI) => {
    try {
      return await authService.loginUser(formData, thunkAPI);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to login. Incorrect email or password.", {theme: "colored"});
      toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async ({navigate, history}, thunkAPI) => {
    try {
      return await authService.logout(navigate, history, thunkAPI);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'auth/delete',
  async (navigate, thunkAPI) => {
    try {
      return await authService.deleteUser(navigate);
      /* // TODO:
        dispatch({type: CART_CLEAR_ITEMS});
        dispatch({type: USER_DETAILS_RESET});
        dispatch({type: AUTH_USER_DELETE_REQUEST});
      */
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to delete account.", {theme: "colored"});
      toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, thunkAPI) => {
    try {
      return await authService.forgotPassword(email);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to send reset link. Check email address and try again.", {theme: "colored"});
      toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const verifyPassword = createAsyncThunk(
  'auth/verifyPassword',
  async ({token, email}, thunkAPI) => {
    try {
      return await authService.verifyPassword(token, email);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Reset link invalid. Please try password reset again.", {theme: "colored"});
      toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({token, email, passwords, navigate}, thunkAPI) => {
    try {
      return await authService.resetPassword(token, email, passwords, navigate);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to reset password. Please try password reset again.", {theme: "colored"});
      toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  'auth/refreshAccessToken',
  async (newAccessToken, thunkAPI) => {
    try {
      let tokenExample = thunkAPI.getState().auth.token;
      return await authService.refreshAccessToken(newAccessToken, tokenExample);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to refresh token.", {theme: "colored"});
      toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authReset: (state, action) => {
      state = initialState;
      // [...state.alert, action.payload]
    },
    clearAuth: (state) => {
      localStorage.removeItem('token')
      // localStorage.removeItem('__userInfo')
      state.token = null
      state.isAuthenticated = false
      state.loading = false
      state.userInfo = null
    }
  },
  extraReducers: (builder) => {
    builder
      .add(loadUser.pending, (state) => {
        state.loading = true;
      })
      .add(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.userInfo = action.payload.userInfo;
      })
      .add(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.userInfo = null;
        // state.error = action.payload;
        state.error = true;
      })
      .add(registerUser.pending, (state) => {
        state.loading = true;
      })
      .add(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.userInfo = action.payload.userInfo;
        toast.success("Successfully registered. Welcome.", {theme: "colored"});
      })
      .add(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.userInfo = null;
        state.error = true;
      })
      .add(loginUser.pending, (state) => {
        state.loading = true;
      })
      .add(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.userInfo = action.payload.userInfo;
        toast.success("Welcome!", {theme: "colored"});
      })
      .add(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.userInfo = null;
        state.error = true;
      })
      .add(logout.pending, (state) => {
        state.loading = true;
      })
      .add(logout.fulfilled, (state, action) => {
        state.token = null;
        state.loading = false;
        state.isAuthenticated = false;
        toast.success("Logout successful.", {theme: "colored"});
        state.userInfo = null;
      })
      .add(logout.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.userInfo = null;
        state.error = true;
      })
      .add(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .add(deleteUser.fulfilled, (state, action) => {
        state.token = null;
        state.loading = false;
        state.isAuthenticated = false;
        state.userInfo = null;
        toast.success("Your account has been deleted.", {theme: "colored"});
      })
      .add(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.userInfo = null;
        state.error = true;
      })
      .add(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .add(forgotPassword.fulfilled, (state, action) => {
        state.status = action.payload;
        state.loading = false;
        state.allowReset = false;
        // state.userInfo = null;
        toast.success("Password reset link sent to your email.", {theme: "colored"});
      })
      .add(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.allowReset = false;
        state.error = action.payload;
      })
      .add(verifyPassword.pending, (state) => {
        state.loading = true;
      })
      .add(verifyPassword.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.loading = false;
        state.allowReset = true;
        // state.userInfo = null;
        toast.success("Reset link valid.", {theme: "colored"});
      })
      .add(verifyPassword.rejected, (state, action) => {
        state.loading = false;
        state.allowReset = false;
        state.error = action.payload;
      })
      .add(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .add(resetPassword.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.loading = false;
        state.allowReset = false;
        // state.userInfo = null;
        toast.success("Password reset. Please login using new password.", {theme: "colored"});
      })
      .add(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.allowReset = false;
        state.error = action.payload;
      })
      .add(refreshAccessToken.pending, (state) => {
        state.loading = true;
      })
      .add(refreshAccessToken.fulfilled, (state, action) => {
        state.token = action.payload;
        state.loading = false;
      })
      .add(refreshAccessToken.rejected, (state, action) => {
        state.loading = false;
        state.allowReset = false;
        state.error = action.payload;
      })
  }
});

export const { authReset, clearAuth } = authSlice.actions;
export default authSlice.reducer;