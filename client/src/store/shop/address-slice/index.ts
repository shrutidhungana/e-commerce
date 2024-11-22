import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiEndpoints } from "../../../utils/api";
import axios from "axios";
import {
  AddressState,
  InitialAddressFormData,
  AddressPayload,
  Address,
    EditAddressPayload,
  DeleteAddressPayload
} from "../../../types";

const initialState: AddressState = {
  isLoading: false,
  addressList: [],
};

const { addAddress, listAddress, updateAddress, removeAddress } = apiEndpoints;

export const addNewAddress = createAsyncThunk<Address, AddressPayload>(
  "/addresses/addNewAddress",
  async (formData: InitialAddressFormData) => {
    const response = await axios.post(addAddress, formData);
    return response?.data;
  }
);

export const fetchAllAddresses = createAsyncThunk<
  { data: Array<Address> },
  string
>("/addresses/fetchAllAddresses", async (userId) => {
  const response = await axios.get(
    `${listAddress?.replace(":userId", userId)}`
  );
  return response.data;
});

export const editAddress = createAsyncThunk<Address, EditAddressPayload>(
  "/addresses/editaAddress",
  async ({ userId, addressId, formData }) => {
    const response = await axios.put(
      `${updateAddress
        ?.replace(":userId", userId)
        ?.replace(":addressId", addressId)}`,
      formData
    );
    return response.data;
  }
);

export const deleteAddress = createAsyncThunk<Address, DeleteAddressPayload>(
    "/addresses/deleteAddress",
    async ({ userId, addressId, }) => {
    const response = await axios.put(
      `${removeAddress
        ?.replace(":userId", userId)
        ?.replace(":addressId", addressId)}`,
      
    );
    return response.data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(addNewAddress.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(addNewAddress.fulfilled, (state) => {
            state.isLoading = false;
          })
          .addCase(addNewAddress.rejected, (state) => {
            state.isLoading = false;
          })
          .addCase(fetchAllAddresses.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(
            fetchAllAddresses.fulfilled,
            (state, action: PayloadAction<{ data: Array<Address> }>) => {
              state.isLoading = false;
              state.addressList = action.payload.data;
            }
          )
          .addCase(fetchAllAddresses.rejected, (state) => {
            state.isLoading = false;
            state.addressList = [];
          });
  }
});

export default addressSlice.reducer;
