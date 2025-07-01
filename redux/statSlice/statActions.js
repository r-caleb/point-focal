import request from "../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const stats = createAsyncThunk(
  "users/stats/roles",
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
      const { data } = await request(`users/stats/roles`, config);
      console.log("dd", data);
      return data.statistics;
    } catch (error) {
      // return custom error message from API if any
      console.log("err", error.response.data.message);

      return rejectWithValue(error.response.data.message);
    }
  }
);
