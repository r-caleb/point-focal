import { createSlice } from "@reduxjs/toolkit";
import { getUserNotifications } from "./notifActions";

const initialState = {
  token: null,
  loading: false,
  notifStatus: null,
  allNotifs: null,
  notifDelInfo: null,
  error: null,
  success: false,
};

const notifSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //all notifs
    builder.addCase(getUserNotifications.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUserNotifications.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.allNotifs = payload;
      state.success = true;
    });
    builder.addCase(getUserNotifications.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export default notifSlice.reducer;
