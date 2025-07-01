import { createSlice } from "@reduxjs/toolkit";
import {
  addApplication,
  getApplications,
  updateApplication,
  deleteApplication,
} from "./appActions";

const initialState = {
  token: null,
  loading: false,
  appInfo: null,
  allApps: null,
  error: null,
  success: false,
};

const appSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    resetMessage: (state) => {
      if (state.appInfo) {
        state.appInfo = null;
      }
    },
  },
  extraReducers: (builder) => {
    //all apps
    builder.addCase(getApplications.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getApplications.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.allApps = payload;
      state.success = true;
    });
    builder.addCase(getApplications.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    //add Apps
    builder.addCase(addApplication.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(addApplication.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.appInfo = payload;
      state.success = true;
    });
    builder.addCase(addApplication.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    //Edit Apps
    builder.addCase(updateApplication.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(updateApplication.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.appInfo = payload;
      state.success = true;
    });
    builder.addCase(updateApplication.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    //Delete Apps
    builder.addCase(deleteApplication.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(deleteApplication.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.appInfo = payload;
      state.success = true;
    });
    builder.addCase(deleteApplication.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { resetMessage } = appSlice.actions;
export default appSlice.reducer;
