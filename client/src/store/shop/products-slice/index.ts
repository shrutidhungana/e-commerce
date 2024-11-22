import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiEndpoints } from "@/utils/api";
import axios from "axios";
import { ShopState, Product, FetchProductsParams } from "@/types";

const initialState: ShopState = {
  isLoading: false,
  productList: [],
  productDetails: null,
};

const { shopProducts, shopProductDetails } = apiEndpoints;

export const fetchAllFilteredProducts = createAsyncThunk<
  { data: Array<Product> },
  FetchProductsParams
>("/products/fetchAllProducts", async ({ filterParams, sortParams }) => {
  

  const query = new URLSearchParams({
    ...filterParams,
    sortBy: sortParams,
  });

  const result = await axios.get(`${shopProducts}?${query}`);
  return result?.data;
});

export const fetchProductDetails = createAsyncThunk<{ data: Product }, string>(
  "/products/fetchProductDetails",
  async (id) => {
    const result = await axios.get(`${shopProductDetails?.replace(":id", id)}`);
    
    return result?.data;
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
  },
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
      })
      .addCase(fetchProductDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(
        fetchProductDetails.fulfilled,
        (state, action: PayloadAction<{ data: Product }>) => {
          state.isLoading = false;
          state.productDetails = action.payload.data;
        }
      )
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export const { setProductDetails } = shoppingProductSlice.actions;

export default shoppingProductSlice.reducer;