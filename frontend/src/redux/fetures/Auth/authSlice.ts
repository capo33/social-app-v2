import { NavigateFunction } from "react-router-dom";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { initialState } from "../state";
import authServices from "./authServices";
import { IAuth, IForgotPassword } from "../../../interfaces/AuthInterface";

// *************************** Auth *************************** //
// register
export const register = createAsyncThunk(
  "auth/register",
  async ({ formData, toast, navigate }: IAuth, { rejectWithValue }) => {
    try {
      const response = await authServices.register(formData);
      navigate("/");
      toast.success(response?.message);
      if (response) {
      }

      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// login
export const login = createAsyncThunk(
  "auth/login",
  async ({ formData, toast, navigate }: IAuth, { rejectWithValue }) => {
    try {
      const response = await authServices.login(formData);
      navigate("/");
      toast.success(response?.message);
      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// logout
export const logout = createAsyncThunk("auth/logout", async () => {
  authServices.logout();
});

interface IResetPassword {
  toast: any;
  formData: IForgotPassword;
  navigate: NavigateFunction;
}

// forgot password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (
    { formData, toast, navigate }: IResetPassword,
    { rejectWithValue }
  ) => {
    try {
      const response = await authServices.forgotPassword(formData);
      toast.success(response?.message);
      navigate("/login");
      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(error.response?.data?.msg);
      return rejectWithValue(message);
    }
  }
);
  
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // Register a user
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload as string;
    });

    // Login a user
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = payload;
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Logout a user
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = null;
    });
    builder.addCase(logout.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Forgot password
    builder.addCase(forgotPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.isError = true;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = action.payload as string;
    });
  },
});

export const { clearState } = authSlice.actions;

export default authSlice.reducer;
