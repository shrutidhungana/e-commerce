import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiEndpoints } from "@/utils/api";
import axios from "axios";
import { CartState, Cart, CartPayload, DeleteCartPayload } from "@/types";

const initialState: CartState = {
  cartItems: [],
  isLoading: false,
};

const { addToCart, cartItems, updateCartItemQuantity, deleteCartItem } =
  apiEndpoints;

export const addProductToCart = createAsyncThunk<
  { data: Array<Cart> },
  CartPayload
>("cart/addToCart", async ({ userId, productId, quantity }) => {
  const response = await axios.post(addToCart, {
    userId,
    productId,
    quantity,
  });
  return response.data;
});

export const fetchCartItems = createAsyncThunk<{ data: Array<Cart> }, string>(
  "cart/fetchCartItems",
  async (userId) => {
    const response = await axios.get(
      `${cartItems?.replace(":userId", userId)}`
    );
    return response.data;
  }
);

export const updateCartQuantity = createAsyncThunk<
  { data: Array<Cart> },
  CartPayload
>("cart/updateCartQuantity", async ({ userId, productId, quantity }) => {
  const response = await axios.put(updateCartItemQuantity, {
    userId,
    productId,
    quantity,
  });
  return response.data;
});

export const deleteItemInCart = createAsyncThunk<
  { data: Array<Cart> },
  DeleteCartPayload
>("cart/deleteCartItem", async ({ userId, productId }) => {
  const response = await axios.delete(
    `${deleteCartItem
      ?.replace(":userId", userId)
      ?.replace(":productId", productId)}`
  );
  return response.data;
});

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProductToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        addProductToCart.fulfilled,
        (state, action: PayloadAction<{ data: Array<Cart> }>) => {
          state.isLoading = false;
          state.cartItems = action.payload.data;
        }
      )
      .addCase(addProductToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchCartItems.fulfilled,
        (state, action: PayloadAction<{ data: Array<Cart> }>) => {
          state.isLoading = false;
          state.cartItems = action.payload.data;
        }
      )
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateCartQuantity.fulfilled,
        (state, action: PayloadAction<{ data: Array<Cart> }>) => {
          state.isLoading = false;
          state.cartItems = action.payload.data;
        }
      )
      .addCase(updateCartQuantity.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteItemInCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        deleteItemInCart.fulfilled,
        (state, action: PayloadAction<{ data: Array<Cart> }>) => {
          state.isLoading = false;
          // state.cartItems = action.payload.data;
          const data = Array.isArray(action.payload.data)
            ? action.payload.data
            : [action.payload.data];
          state.cartItems = data;
        }
      )
      .addCase(deleteItemInCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

export default shoppingCartSlice.reducer;
