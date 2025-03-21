import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";
import { getToken } from "../utils/token";

const initialState = {
  usersLoading: false,
  deleteUserLoading:false,
  allDeleteUserIds:[],
  allUsers: [],
};

export const getUsers = createAsyncThunk(
  "get/users",
  async (_, { rejectWithValue }) => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("Token is empty. Please log in again.");
      }
      const response = await axiosInstance.get("users/getAllUsers", {
        params: { token },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data || err.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "delete/user",
  async (id, { rejectWithValue,dispatch}) => {

    try {
      const token = await getToken();
      if (!token) {
        throw new Error("Token is empty. Please log in again.");
      }
      dispatch(addDeleteId(id))
      const response = await axiosInstance.delete(`users/delete-user/${id}`, {
        params: { token },
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data || err.message);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addDeleteId:(state,action)=>{
      state.allDeleteUserIds=[...state.allDeleteUserIds,action.payload]

    }
  },
  extraReducers: (builder) => {
    builder

      // login
      .addCase(getUsers.pending, (state) => {
        state.usersLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.allUsers = action.payload.users;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.usersLoading = false;
      })

      // delete user
      .addCase(deleteUser.pending, (state) => {
        state.deleteUserLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.deleteUserLoading = false;
        state.allDeleteUserIds=state.allDeleteUserIds.filter((id)=>id!==action.payload)
        state.allUsers=state.allUsers.filter((user)=>user._id!==action.payload)
        toast.success("Delete User Successfully");
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.deleteUserLoading = false;
        state.allDeleteUserIds=state.allDeleteUserIds.filter((id)=>id!==action.payload)
        toast.success("Delete User Failed");
      });
  },
});

export const {addDeleteId} = usersSlice.actions;
export const usersState = (state) => state.usersReducer;
export default usersSlice.reducer;
