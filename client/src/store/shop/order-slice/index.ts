import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { apiEndpoints } from "@/utils/api";
import {
  InitialOrderState,
  Capture,
  OrderPayload,
  CapturePaymentParams,
  Order,
} from "@/types";

const initialState: InitialOrderState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
};

const { createOrder, captureAPayment, OrderDetails, OrderList } = apiEndpoints;

export const createNewOrder = createAsyncThunk<InitialOrderState, OrderPayload>(
  "/order/createNewOrder",
  async (orderData) => {
    const response = await axios.post(createOrder, orderData);
    return response.data;
  }
);

export const capturePayment = createAsyncThunk<Capture, CapturePaymentParams>(
  "/order/capturePayment",
  async ({ paymentId, payerId, orderId }) => {
    const response = await axios.post(captureAPayment, {
      paymentId,
      payerId,
      orderId,
    });
    return response.data;
  }
);

export const getAllOrdersByUserId = createAsyncThunk<
  { data: Array<Order> },
  string
>("/order/getAllOrdersByUserId", async (userId) => {
  const response = await axios.get(`${OrderList?.replace(":userId", userId)}`);
  return response?.data;
});

export const getOrderDetails = createAsyncThunk<{ data: Order }, string>(
  "/order/getOrderDetails",
  async (id) => {
    const response = await axios.get(`${OrderDetails?.replace(":id", id)}`);
    return response.data;
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
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
      })
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllOrdersByUserId.fulfilled,
        (state, action: PayloadAction<{ data: Array<Order> }>) => {
          state.isLoading = false;
          state.orderList = action.payload.data;
        }
      )
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getOrderDetails.fulfilled,
        (state, action: PayloadAction<{ data: Order }>) => {
          state.isLoading = false;
          state.orderDetails = action.payload.data;
        }
      )
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});


export const { resetOrderDetails } = shoppingOrderSlice.actions;

export default shoppingOrderSlice.reducer;
