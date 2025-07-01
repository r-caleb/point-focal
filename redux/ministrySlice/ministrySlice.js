import { createSlice } from "@reduxjs/toolkit";
import {
  changePassword,
  editProfil,
  customerLogout,
  addMnistry,
  getMinistries,
  updateMinistry,
  deleteMinistry,
} from "./ministryActions";

const initialState = {
  token: null,
  loading: false,
  ministryInfo: null,
  allMinistries: null,
  error: null,
  success: false,
};

const ministrySlice = createSlice({
  name: "ministry",
  initialState,
  reducers: {
    resetMessage: (state) => {
      if (state.ministryInfo) {
        state.ministryInfo = null;
      }
    },
  },
  extraReducers: (builder) => {
    //all ministries
    builder.addCase(getMinistries.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getMinistries.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.allMinistries = payload;
      state.success = true;
    });
    builder.addCase(getMinistries.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    //add Ministry
    builder.addCase(addMnistry.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(addMnistry.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.ministryInfo = payload;
      state.success = true;
    });
    builder.addCase(addMnistry.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    //edit Ministry
    builder.addCase(updateMinistry.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(updateMinistry.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.ministryInfo = payload;
      state.success = true;
    });
    builder.addCase(updateMinistry.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    //delete Ministry
    builder.addCase(deleteMinistry.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(deleteMinistry.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.ministryInfo = payload;
      state.success = true;
    });
    builder.addCase(deleteMinistry.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});
export const { resetMessage } = ministrySlice.actions;
export default ministrySlice.reducer;
