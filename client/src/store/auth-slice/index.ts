import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User, RegisterUserPayload, FormData, } from "@/types";
import axios from "axios";
import { apiEndpoints } from "@/utils/api";

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  token: null,
};

const { register, login, logout, auth } = apiEndpoints;

export const registerUser = createAsyncThunk<User | null, RegisterUserPayload>(
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

export const logoutUser = createAsyncThunk<User | null>(
  "/auth/logout",

  async () => {
    const response = await axios.post(
      logout,
      {},
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

// export const checkAuth = createAsyncThunk<User | null>(
//   "/auth/checkauth",

//   async () => {
//     const response = await axios.get<User>(auth, {
//       withCredentials: true,
//       headers: {
//         "Cache-Control":
//           "no-store, no-cache, must-revalidate, proxy-revalidate",
//       },
//     });
    
//     return response.data;
//   }
// );

export const checkAuth = createAsyncThunk<User | null>(
  "/auth/checkauth",

  async (token) => {
    const response = await axios.get<User>(auth, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });

    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
    resetTokenAndCredentials: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
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
            state.user = action.payload;
            state.token = action.payload.token;
            sessionStorage.setItem(
              "token",
              JSON.stringify(action.payload.token)
            ); // Assuming user is part of the payload
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
        state.token = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        checkAuth.fulfilled,
        (state, action: PayloadAction<User | null>) => {
          state.isLoading = false;

          // Check if action.payload is not null
          if (action.payload) {
            state.user = action.payload;

            state.isAuthenticated = true;
          } else {
            // Handle the case where action.payload is null
            state.user = null;
            state.isAuthenticated = false;
          }
        }
      )
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser, resetTokenAndCredentials } = authSlice.actions;
export default authSlice.reducer;
