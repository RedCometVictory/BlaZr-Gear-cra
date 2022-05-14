import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import userService from "./userService";

const initialState = {
  users: null,
  userById: null,
  loading: true,
  error: []
}

export const getUserProfile = createAsyncThunk(
  'user/profile/get',
  async (_, thunkAPI) => {
    try {
      return await userService.getUserProfile();
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to get user profile.", {theme: "colored"});
      toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUserProfileAdmin = createAsyncThunk(
  'user/profile/admin/get',
  async (user_id, thunkAPI) => {
    try {
      return await userService.getUserProfileAdmin(user_id);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to get user profile.", {theme: "colored"});
      toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUsersAdmin = createAsyncThunk(
  'user/getAll/Admin',
  async (_, thunkAPI) => {
    try {
      return await userService.getUsersAdmin();
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to list users.", {theme: "colored"});
      toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  'user/info/update',
  async (userForm, thunkAPI) => {
    try {
      return await userService.updateUserInfo(userForm);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to update user information.", {theme: "colored"});
      toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createUserProfile = createAsyncThunk(
  'user/profile/create',
  async (profileForm, thunkAPI) => {
    try {
      return await userService.createUserProfile(profileForm);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to create user profile.", {theme: "colored"});
      toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/profile/update',
  async (profileForm, thunkAPI) => {
    try {
      return await userService.updateUserProfile(profileForm);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Failed to update user profile.", {theme: "colored"});
      toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateUserAdmin = createAsyncThunk(
  'user/update/admin',
  async ({user_id, userForm}, thunkAPI) => {
    try {
      return await userService.updateUserAdmin(user_id, userForm);
    } catch (err) {
      const message =
        (err.response &&
          err.response.data &&
          err.response.data.message) ||
        err.message ||
        err.toString()
      toast.error("Admin failed to update user profile.", {theme: "colored"});
      toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userReset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .add(getUserProfile.pending, (state) => {
        state.loading = true;
      })
      .add(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userById = action.payload;
      })
      .add(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .add(getUserProfileAdmin.pending, (state) => {
        state.loading = true;
      })
      .add(getUserProfileAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.userById = action.payload;
      })
      .add(getUserProfileAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .add(getUsersAdmin.pending, (state) => {
        state.loading = true;
      })
      .add(getUsersAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .add(getUsersAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .add(updateUserInfo.pending, (state) => {
        state.loading = true;
      })
      .add(updateUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userById = action.payload;
        toast.success("User information updated!", {theme: "colored"});
      })
      .add(updateUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .add(createUserProfile.pending, (state) => {
        state.loading = true;
      })
      .add(createUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userById = action.payload;
        toast.success("Profile created.", {theme: "colored"});
      })
      .add(createUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .add(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .add(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userById = action.payload;
        toast.success("Profile updated.", {theme: "colored"});
      })
      .add(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .add(updateUserAdmin.pending, (state) => {
        state.loading = true;
      })
      .add(updateUserAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userById = action.payload;
      })
      .add(updateUserAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export const { userReset } = userSlice.actions;
export default userSlice.reducer;