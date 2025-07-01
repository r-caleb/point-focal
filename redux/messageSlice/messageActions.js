import request from "../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const sendMessage = createAsyncThunk(
  "message/send",
  async (formData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("focal-user")).token
          }`,
        },
      };

      const { data } = await request.post(`message/send`, formData, config);

      return data;
    } catch (error) {
      console.log("err", error.response?.data?.message || error.message);
      return rejectWithValue(error.response?.data?.message || "Erreur");
    }
  }
);

//get all messages
export const getMessages = createAsyncThunk(
  "messages/",
  async (_, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("focal-user")).token
          }`,
        },
      };
      const { data } = await request(`message/received/grouped`, config);
      console.log("dd", data);
      return data;
    } catch (error) {
      // return custom error message from API if any
      console.log("err", error.response.data.message);

      return rejectWithValue(error.response.data.message);
    }
  }
);

//get all one person messages
export const getAllOnePersonMessages = createAsyncThunk(
  "messages/otherUser",
  async ({ id }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("focal-user")).token
          }`,
        },
      };
      const { data } = await request(`message/${id}`, config);
      console.log("dd", data);
      return data;
    } catch (error) {
      // return custom error message from API if any
      console.log("err", error.response.data.message);

      return rejectWithValue(error.response.data.message);
    }
  }
);

// delete a message
export const deleteMessage = createAsyncThunk(
  "message/delete",
  async ({ messageId }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("focal-user")).token
          }`,
        },
      };
      const { data } = await request.delete(`message/${messageId}`, config);
      console.log("deleted", data);

      return { messageId, message: data.message }; // messageId will help update the UI
    } catch (error) {
      console.log("err", error.response?.data?.message || error.message);
      return rejectWithValue(
        error.response?.data?.message || "Erreur lors de la suppression"
      );
    }
  }
);
