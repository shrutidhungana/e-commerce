import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { apiEndpoints } from "../../utils/api";
import { Image, FeatureImageState } from "../../types";

const initialState: FeatureImageState = {
  isLoading: false,
  featureImageList: [],
};

const { AddFeatureImage, GetFeatureImage } = apiEndpoints;

export const getFeatureImages = createAsyncThunk<{ data: Array<Image> }, void>(
  "/order/getFeatureImages",
  async () => {
    const response = await axios.get(GetFeatureImage);
    return response?.data;
  }
);

export const addFeatureImage = createAsyncThunk<
  { data: Array<Image> },
  string
>("/order/addFeatureImage", async (image) => {
  const response = await axios.post(AddFeatureImage, { image });
  return response.data;
});

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
    extraReducers: (builder) => {
       builder
         .addCase(getFeatureImages.pending, (state) => {
           state.isLoading = true;
         })
         .addCase(
           getFeatureImages.fulfilled,
           (state, action: PayloadAction<{ data: Array<Image> }>) => {
             state.isLoading = false;
             state.featureImageList = action.payload.data;
           }
         )
         .addCase(getFeatureImages.rejected, (state) => {
           state.isLoading = false;
           state.featureImageList = [];
         });
  },
});

export default commonSlice.reducer;
