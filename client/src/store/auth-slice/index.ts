import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User, RegisterUserPayload, FormData } from "@/types";
import axios from "axios";
import { apiEndpoints } from "@/utils/api";

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

const { register, login } = apiEndpoints;



export const registerUser = createAsyncThunk<
  User | null,
  RegisterUserPayload
  
>(
  "/auth/register",

  async (formData: FormData) => {
    const response = await axios.post(register, formData, {
      withCredentials: true,
    });

    return response.data;
  }
);

export const loginUser = createAsyncThunk<User | null, RegisterUserPayload>(
  "/auth/login",

  async (formData: FormData) => {
    const response = await axios.post(login, formData, {
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
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<User | null>) => {
          state.isLoading = false;
          state.user = null;
          state.isAuthenticated = false;
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<User | null>) => {
          state.isLoading = false;
          // Handle the case when the user is registered successfully
          if (action.payload && action.payload.success) {
            state.user = action.payload; // Assuming user is part of the payload
            state.isAuthenticated = true;
          } else {
            state.user = null;
            state.isAuthenticated = false;
          }
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
