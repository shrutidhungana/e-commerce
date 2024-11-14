import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiEndpoints } from "@/utils/api";
import axios from "axios";
import { ShopState, Product } from "@/types";

const initialState: ShopState = {
  isLoading: false,
  productList: [],
  productDetails: null,
};

const { shopProducts } = apiEndpoints;

export const fetchAllFilteredProducts = createAsyncThunk<
  { data: Array<Product> },
  void
>("/products/fetchAllProducts", async () => {
  const result = await axios.get(shopProducts);
  return result?.data;
});

const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchAllFilteredProducts.fulfilled,
        (state, action: PayloadAction<{ data: Array<Product> }>) => {
          state.isLoading = false;
          state.productList = action.payload.data;
        }
      )
      .addCase(fetchAllFilteredProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default shoppingProductSlice.reducer;