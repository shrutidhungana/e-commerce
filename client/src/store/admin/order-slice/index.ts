import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { apiEndpoints } from "@/utils/api";
import { AdminOrderState, Order, Capture, UpdateOrderPayload } from "@/types";

const initialState: AdminOrderState = {
  orderList: [],
  orderDetails: null,
  isLoading: false,
};

const { AdminOrdersList, AdminOrderDetails, UpdateAOrderStatus } = apiEndpoints;

export const getAllOrdersForAdmin = createAsyncThunk<
  { data: Array<Order> },
  void
>("/order/getAllOrdersForAdmin", async () => {
  const response = await axios.get(AdminOrdersList);
  return response.data;
});

export const getOrderDetailsForAdmin = createAsyncThunk<
  { data: Order },
  string
>("/order/getOrderDetailsForAdmin", async (id) => {
  const response = await axios.get(`${AdminOrderDetails?.replace(":id", id)}`);
  return response.data;
});

export const updateOrderStatus = createAsyncThunk<Capture, UpdateOrderPayload>(
  "/order/updateOrderStatus",
  async ({ id, orderStatus }) => {
    // Convert id to a string safely
    const idStr =
      typeof id === "string" || typeof id === "number"
        ? String(id) // If id is string or number, convert to string
        : JSON.stringify(id); // Otherwise, convert to string using JSON.stringify (for Date, Address, Cart[] etc.)

    const response = await axios.put(
      `${UpdateAOrderStatus?.replace(":id", idStr)}`,
      { orderStatus }
    );
    return response.data;
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {
     resetOrderDetails: (state) => {
     

      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllOrdersForAdmin.fulfilled,
        (state, action: PayloadAction<{ data: Array<Order> }>) => {
          state.isLoading = false;
          state.orderList = action.payload.data;
        }
      )
      .addCase(getAllOrdersForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getOrderDetailsForAdmin.fulfilled,
        (state, action: PayloadAction<{ data: Order }>) => {
          state.isLoading = false;
          state.orderDetails = action.payload.data;
        }
      )
      .addCase(getOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
