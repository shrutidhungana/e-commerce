import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "@/types";
import axios from "axios";
import { apiEndpoints } from "@/utils/api";

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

const { register } = apiEndpoints;

type RegisterUserPayload = {
  // Define the shape of your form data here
  userName?: string;
  email: string;
  password: string;
}

export const registerUser = createAsyncThunk<User | null, RegisterUserPayload>(
  "/auth/register",

  async (formData: any) => {
    const response = await axios.post(register, formData, {
      withCredentials: true,
    });

    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User | null>) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
