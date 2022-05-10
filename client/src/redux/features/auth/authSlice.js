import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// const setAlert = (msg, alertType, timeout = 6000) => {
//   const id = uuidv4();
  
// };
// const alertService = {
//   setAlert,
//   removeAlert
// }
// export default alertService;
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
      return await authService.loadUser();
      // TODO: CLIENT SIED---if (result.userInfo.stripe_cust_id) {
      //   await dispatch(addCardToUser(result.userInfo.stripe_cust_id));
      // }
      // TODO: dispatch(setAlert('Failed to retrieve user info.', 'danger'))
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

export const registerUser = createAsyncThunk(
  'auth/register',
  async (formRegData, thunkAPI) => {
    try {
      return await authService.registerUser(formRegData);
      // TODO: dispatch(loadUser());
      // TODO: dispatch(setAlert('Successfully registered. Welcome.', 'success'));
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

export const loginUser = createAsyncThunk(
  'auth/login',
  async (formData, thunkAPI) => {
    try {
      return await authService.loginUser(formData);
      // TODO: dispatch(loadUser());
      // TODO: dispatch(setAlert('Welcome!', 'success'));
    } catch (err) {
      // TODO: dispatch(setAlert('Failed to login. Incorrect email or password.', 'danger'));
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

export const logout = createAsyncThunk(
  'auth/logout',
  async (history, thunkAPI) => {
    try {
      return await authService.logout(history);
      /* //TODO
        dispatch({type: CART_CLEAR_ITEMS});
        dispatch({type: CLEAR_CARD_INFO});
        dispatch({type: USER_DETAILS_RESET});
        dispatch({type: AUTH_USER_LOGOUT});
        dispatch({type: ORDER_CLEAR_INFO});
        dispatch(setAlert('Logout successful.', 'success'));
      */
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

export const deleteUser = createAsyncThunk(
  'auth/delete',
  async (history, thunkAPI) => {
    try {
      return await authService.deleteUser(history);
      /* // TODO: dispatch(setAlert('Your user account has been deleted.', 'success'));
        dispatch({type: CART_CLEAR_ITEMS});
        dispatch({type: USER_DETAILS_RESET});
        dispatch({type: AUTH_USER_DELETE_REQUEST});
      */
     // TODO: dispatch(setAlert("Failed to delete account.", "danger"));
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
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({token, email, passwords, history}, thunkAPI) => {
    try {
      return await authService.resetPassword(token, email, passwords, history);
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
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    reset: (state, action) => {
      state = initialState;
      // [...state.alert, action.payload]
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

export const { reset } = alertSlice.actions;
export default alertSlice.reducer;