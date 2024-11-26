import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { apiEndpoints } from "@/utils/api";
import { InitialOrderState, Order, OrderPayload } from "@/types";

const initialState: InitialOrderState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
};

const { createOrder, captureOrder, getOrderDetails, getOrderList } =
  apiEndpoints;

export const createNewOrder = createAsyncThunk<
  InitialOrderState,
  OrderPayload
>("/order/createNewOrder", async (orderData) => {
  const response = await axios.post(createOrder, orderData);
  return response.data;
});

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(createNewOrder.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(
            createNewOrder.fulfilled,
            (state, action: PayloadAction<InitialOrderState>) => {
              state.isLoading = false;
              state.approvalURL = action.payload.approvalURL;
              state.orderId = action.payload.orderId;
              sessionStorage.setItem(
                "currentOrderId",
                JSON.stringify(action.payload.orderId)
              );
            }
          )
          .addCase(createNewOrder.rejected, (state) => {
            state.isLoading = false;
            state.approvalURL = null;
            state.orderId = null;
          });
  },
});

export default shoppingOrderSlice.reducer;