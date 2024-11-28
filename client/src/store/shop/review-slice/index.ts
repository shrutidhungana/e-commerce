import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { apiEndpoints } from "../../../utils/api";
import {
  InitialReviewState,
  Reviews as ReviewType,
  Capture,
} from "../../../types";

const initialState: InitialReviewState = {
  isLoading: false,
  reviews: [] 
};

const { AddReview, Reviews } = apiEndpoints;

export const addReview = createAsyncThunk<{ data: Array<ReviewType> }, Capture>(
  "/order/addReview",
  async (formdata) => {
    const response = await axios.post(AddReview, formdata);
    return response.data;
  }
);

export const getReviews = createAsyncThunk<{ data: Array<ReviewType> }, string>(
  "/order/getReviews",
  async (id) => {
    const response = await axios.get(`${Reviews?.replace(":id", id)}`);
    return response.data;
  }
);

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getReviews.fulfilled,
        (state, action: PayloadAction<{ data: Array<ReviewType> }>) => {
          state.isLoading = false;
          state.reviews = action.payload.data;
        }
      )
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default reviewSlice.reducer;
