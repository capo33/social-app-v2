import { NavigateFunction } from "react-router-dom";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import userServices from "./userService";
import { initialState } from "../state";
import { IUpdateUser } from "../../../interfaces/UserInterface";

// Get user profile
export const userProfile = createAsyncThunk(
  "auth/userProfile",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await userServices.getUserProfile(token);

      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

// Update user profile
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (
    {
      formData,
      token,
      toast,
      navigate,
    }: {
      formData: IUpdateUser;
      token: string;
      toast: any;
      navigate: NavigateFunction;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await userServices.updateUserProfile(formData, token);
      toast(response.message, { type: "success" });
      navigate("/profile");
      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

// Get user profile by id
export const userProfileById = createAsyncThunk(
  "auth/userProfileById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await userServices.getUserProfileById(id);
      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

// Follow user

export const followUser = createAsyncThunk(
  "auth/followUser",
  async (
    {
      followId,
      userId,
      token,
    }: { followId: string; userId: string; token: string },

    thunkAPI
  ) => {
    try {
      const response = await userServices.followUser(followId, userId, token);
      thunkAPI.dispatch(userProfile(token));
      thunkAPI.dispatch(userProfileById(followId));
      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Unfollow user

export const unfollowUser = createAsyncThunk(
  "auth/unfollowUser",
  async (
    {
      followId,
      userId,
      token,
    }: { followId: string; userId: string; token: string },
    thunkAPI
  ) => {
    try {
      const response = await userServices.unfollowUser(followId, userId, token);
      thunkAPI.dispatch(userProfile(token));
      thunkAPI.dispatch(userProfileById(followId));

      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get notifications
export const getNotifications = createAsyncThunk(
  "auth/getNotifications",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await userServices.getNotifications(token);
      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get user profile
    builder.addCase(userProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userProfile.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = payload;
    });
    builder.addCase(userProfile.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Update user profile
    builder.addCase(updateUserProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = payload;
    });
    builder.addCase(updateUserProfile.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Get user profile by id
    builder.addCase(userProfileById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userProfileById.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.guest = payload;
    });
    builder.addCase(userProfileById.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Follow user
    builder.addCase(followUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(followUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = payload;
    });
    builder.addCase(followUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Unfollow user
    builder.addCase(unfollowUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(unfollowUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = payload;
    });
    builder.addCase(unfollowUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Get notifications
    builder.addCase(getNotifications.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getNotifications.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user?.seenNotifications?.push(payload);
    });
  },
});

export default userSlice.reducer;
