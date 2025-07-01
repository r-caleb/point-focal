import { createSlice } from "@reduxjs/toolkit";
import { stats } from "./statActions";

const initialState = {
  loading: false,
  stat: null,
  error: null,
  success: false,
};

const statSlice = createSlice({
  name: "stat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // stats
    builder.addCase(stats.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(stats.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.stat = payload;
      state.success = true;
    });
    builder.addCase(stats.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    });
  },
});

export default statSlice.reducer;
