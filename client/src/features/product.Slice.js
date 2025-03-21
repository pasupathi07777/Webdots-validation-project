import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";
import { getToken } from "../utils/token";

const initialState = {
  getProductLoading: false,
  postProductLoading: false,
  updateProductLoading: false,
  deleteProductLoading: false,
  updataProductIds: [],
  deleteProductIds: [],
  products: [],
};

export const getProduct = createAsyncThunk(
  "product/get",
  async (_, { rejectWithValue }) => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("Token is empty. Please log in again.");
      }
      const response = await axiosInstance.get(`product/get-product`, {
        params: { token },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data || err.message);
    }
  }
);

export const postProduct = createAsyncThunk(
  "product/post",
  async (credentials, { rejectWithValue }) => {
    try {
      const token = await localStorage.getItem("token");
      if (!token) {
        throw new Error("Token is empty. Please log in again.");
      }
      const response = await axiosInstance.post(
        "product/add-product",
        credentials,
        {
          params: { token },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updataProduct = createAsyncThunk(
  "product/updata",
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      const token = await localStorage.getItem("token");
      if (!token) {
        throw new Error("Token is empty. Please log in again.");
      }
      dispatch(addUpdataProductId(credentials._id));
      const response = await axiosInstance.put(
        `product/edit-product/${credentials._id}`,
        credentials,
        {
          params: { token },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteaProduct = createAsyncThunk(
  "product/delete",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const token = await localStorage.getItem("token");
      if (!token) {
        throw new Error("Token is empty. Please log in again.");
      }
      dispatch(addDeleteProductId(id));
      const response = await axiosInstance.delete(
        `product/delete-product/${id}`,
        {
          params: { token },
        }
      );
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addUpdataProductId: (state, action) => {
      state.updataProductIds = [...state.updataProductIds, action.payload];
    },
    addDeleteProductId: (state, action) => {
      state.deleteProductIds = [...state.deleteProductIds, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getProduct.pending, (state) => {
        state.getProductLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.getProductLoading = false;
        const { products } = action.payload;
        state.products = products;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.getProductLoading = false;
      })

      // post product
      .addCase(postProduct.pending, (state) => {
        state.postProductLoading = true;
      })
      .addCase(postProduct.fulfilled, (state, action) => {
        state.postProductLoading = false;
        const { product,message} = action.payload;  
        state.products = [product,...state.products];
        toast.success(message)
      })
      .addCase(postProduct.rejected, (state, action) => {
        state.postProductLoading = false;
        toast.error(action.payload.message)
      })

      // update product
      .addCase(updataProduct.pending, (state) => {
        state.updateProductLoading = true;
      })
      .addCase(updataProduct.fulfilled, (state, action) => {
        state.updateProductLoading = false;
        const { product } = action.payload;
        state.products = state.products.map((pro) => {
          if (product._id === pro._id) {
            return product;
          }
          return pro;
        });
        state.updataProductIds=state.updataProductIds.filter((pro)=>pro!==product._id)
        toast.success("Update Product Successfully");
      })
      .addCase(updataProduct.rejected, (state, action) => {
        state.updateProductLoading = false;
        toast.error("Updata Product Failed");
      })

      // delete product
      .addCase(deleteaProduct.pending, (state) => {
        state.deleteProductLoading = true;
      })
      .addCase(deleteaProduct.fulfilled, (state, action) => {
        state.deleteProductLoading = false;
        state.products = state.products.filter(
          (pro) => pro._id !== action.payload
        );
        state.deleteProductIds=state.deleteProductIds.filter((pro)=>pro._id!==action.payload)
        toast.success("Delete Product Successfully");
      })
      .addCase(deleteaProduct.rejected, (state, action) => {
        state.deleteProductLoading = false;
        toast.error("Delete Product Failed");
      });
  },
});

export const { addUpdataProductId, addDeleteProductId } = productsSlice.actions;
export const productsStates = (state) => state.productReducer;
export default productsSlice.reducer;
