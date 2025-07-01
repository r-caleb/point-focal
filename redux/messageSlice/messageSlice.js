import { createSlice } from "@reduxjs/toolkit";
import {
  addMnistry,
  getMessages,
  getAllOnePersonMessages,
  sendMessage,
  deleteMessage,
} from "./messageActions";

const initialState = {
  token: null,
  loading: false,
  messageInfo: null,
  allMessages: null,
  messageSent: null,
  messageDelInfo: null,
  error: null,
  success: false,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //all messages
    builder.addCase(getMessages.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getMessages.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.allMessages = payload;
      state.success = true;
    });
    builder.addCase(getMessages.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    //all one messages
    builder.addCase(getAllOnePersonMessages.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllOnePersonMessages.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.messageInfo = payload;
      state.success = true;
    });
    builder.addCase(getAllOnePersonMessages.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    //sent message
    builder.addCase(sendMessage.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(sendMessage.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.messageSent = payload;
      state.success = true;
    });
    builder.addCase(sendMessage.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    //delete message
    builder.addCase(deleteMessage.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(deleteMessage.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.messageDelInfo = payload;
      state.success = true;
    });
    builder.addCase(deleteMessage.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export default messageSlice.reducer;
