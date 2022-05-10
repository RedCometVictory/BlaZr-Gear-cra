import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import alertService from "./alertService";

// const setAlert = (msg, alertType, timeout = 6000) => {
//   const id = uuidv4();
  
// };
// const alertService = {
//   setAlert,
//   removeAlert
// }
// export default alertService;
const initialState = [];

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action) => {
      // [...state.alert, action.payload]
    },
    removeAlert: (state, action) => {
      state.filter(alert => alert.id !== action.payload)
    }
  }
});
// export const setAlert = createAsyncThunk();
// export const removeAlert = createAsyncThunk();

export const { reset } = alertSlice.actions;
export default alertSlice.reducer;