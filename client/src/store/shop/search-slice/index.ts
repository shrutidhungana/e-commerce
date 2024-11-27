import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { apiEndpoints } from "../../../utils/api";
import { InitialSearchState, Search } from "../../../types";

const initialState: InitialSearchState = {
  isLoading: false,
  searchResults: [],
};

const { SearchItems } = apiEndpoints;

export const getSearchResults = createAsyncThunk<
  { data: Array<Search> },
  string
>("/order/getSearchResults", async (keyword) => {
  const response = await axios.get(
    `${SearchItems?.replace(":keyword", keyword)}`
  );
  return response.data;
});

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResults.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getSearchResults.fulfilled,
        (state, action: PayloadAction<{ data: Array<Search> }>) => {
          state.isLoading = false;
          state.searchResults = action.payload.data;
        }
      )
      .addCase(getSearchResults.rejected, (state) => {
        state.isLoading = false;
        state.searchResults = [];
      });
  },
});

export default searchSlice.reducer;
