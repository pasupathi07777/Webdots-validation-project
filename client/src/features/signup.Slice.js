import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

const initialState = {
  signupLoading: false,
};

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('auth/signup', credentials);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data || err.message);
    }
  }
);

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder

      // login
      .addCase(signupUser.pending, (state) => {
        state.signupLoading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.signupLoading = false;
        toast.success(action.payload.message);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.signupLoading = false;
        toast.error(action.payload.message);
      });




  },
});

export const {  } = signupSlice.actions;
export const signupState = state => state.signupReducer;
export default signupSlice.reducer;
