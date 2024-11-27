import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiEndpoints } from "@/utils/api";

const initialState = {
  orderList: [],
  orderDetails: null,
};

const { AdminOrdersList, AdminOrderDetails, UpdateOrderStatus } = apiEndpoints;


const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
    initialState,
  reducers:{}
});


export default adminOrderSlice.reducer;
