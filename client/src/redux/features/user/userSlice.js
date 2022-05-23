import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import userService from "./userService";

const initialState = {
  users: null,
  userById: null,
  loading: true,
  error: []
}

// * works
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
      toast.error("Failed to get user profile.", {theme: "colored", toastId: "getUserToastId"});
      // toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// * works
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
      toast.error("Failed to get user profile.", {theme: "colored", toastId: "getUserToastId"});
      // toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// * works
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
      toast.error("Failed to list users.", {theme: "colored", toastId: "getUsersToastId"});
      // toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// * works
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
      toast.error("Failed to update user information.", {theme: "colored", toastId: "updateUserToastId"});
      // toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// * works
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
      toast.error("Failed to create user profile.", {theme: "colored", toastId: "createUserToastId"});
      // toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// * works
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
      toast.error("Failed to update user profile.", {theme: "colored", toastId: "updateUserToastId"});
      // toast.error(message, {theme: "colored"});
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// * works
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
      toast.error("Admin failed to update user profile.", {theme: "colored", toastId: "updateUserToastId"});
      // toast.error(message, {theme: "colored"});
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
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userById = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserProfileAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserProfileAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.userById = action.payload;
      })
      .addCase(getUserProfileAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUsersAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsersAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsersAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userById = action.payload;
        toast.success("User information updated!", {theme: "colored", toastId: "updateUserInfoToastId"});
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userById = action.payload;
        toast.success("Profile created.", {theme: "colored", toastId: "profileCreatedToastId"});
      })
      .addCase(createUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userById = action.payload;
        toast.success("Profile updated.", {theme: "colored", toastId: "profileUpdatedToastId"});
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userById = action.payload;
      })
      .addCase(updateUserAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export const { userReset } = userSlice.actions;
export default userSlice.reducer;