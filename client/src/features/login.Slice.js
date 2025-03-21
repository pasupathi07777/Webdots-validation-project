import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

const initialState = {
  loginLoading: false,
  verifyUserLoading:false,
  user: null,
  loginStatus:false
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`auth/login`, credentials);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data || err.message);
    }
  }
);



export const authUser = createAsyncThunk(
  'auth/token',
  async (_, { rejectWithValue }) => {
    try {
      const token = await localStorage.getItem('token');
      if (!token) {
        throw new Error('Token is empty. Please log in again.');
      }
      const response = await axiosInstance.get('auth/verify-token', {
        params: { token },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);



export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {

    logOut: (state,action)=>{
       localStorage.removeItem('token');
      state.user=null
      state.loginStatus=false
      

    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        const { user, token } = action.payload;
        state.user = user;
        localStorage.setItem("token", token);
        toast.success(action.payload.message);
        state.loginStatus=true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        toast.error(action.payload.message);
      })

      // auth token
      .addCase(authUser.pending, (state) => {
        state.verifyUserLoading = true;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.verifyUserLoading = false;
        const { user } = action.payload;
        state.user = user;
        state.loginStatus=true
      })
      .addCase(authUser.rejected, (state, action) => {
        state.verifyUserLoading = false;
      })
  },
});

export const { logOut } = loginSlice.actions;
export const loginState = (state) => state.loginReducer;
export default loginSlice.reducer;
