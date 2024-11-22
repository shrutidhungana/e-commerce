import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiEndpoints } from "@/utils/api";
import axios from "axios";
import { AddressState } from "@/types";

const initialState = {
  isLoading: false,
  addressList: [],
};

const { addAddress, listAddress, editAddress, deleteAddress } = apiEndpoints;
