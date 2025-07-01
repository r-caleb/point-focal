import { createSlice } from "@reduxjs/toolkit";
import { getMe, registerUser, userLogin } from "./authActions";

const initialState = {
  token:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("focal-user"))
        ? JSON.parse(localStorage.getItem("focal-user")).token
        : null
      : null,
  loading: false,
  userInfo: null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("focal-user");
      state.loading = false;
      state.userInfo = null;
      state.newUser = null;
      state.error = null;
    },
    resetInfos: (state) => {
      if (state.newUser) {
        state.newUser = null;
      }
    },
  },
  extraReducers: (builder) => {
    //login user
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.token = payload.token;
    });
    builder.addCase(userLogin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    //get me
    builder.addCase(getMe.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getMe.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.token = payload.token;
    });
    builder.addCase(getMe.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // register user
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.newUser = payload;
      state.success = true; // registration successful
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export default authSlice.reducer;

export const { logout, resetInfos } = authSlice.actions;
