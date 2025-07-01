import request from "../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addMnistry = createAsyncThunk(
  "ministry/add-ministry",
  async ({ name, smallName }, { rejectWithValue }) => {
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
      const { data } = await request.post(
        `/add-ministry`,
        {
          name,
          smallName,
        },
        config
      );
      console.log(data);
      return data;
    } catch (error) {
      // return custom error message from API if any
      console.log("err", error.response.data.message);

      return rejectWithValue(error.response.data.message);
    }
  }
);

//get all ministries
export const getMinistries = createAsyncThunk(
  "ministry/get_ministries/",
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
      const { data } = await request(`ministries/`, config);
      console.log("dd", data);
      return data;
    } catch (error) {
      // return custom error message from API if any
      console.log("err", error.response.data.message);

      return rejectWithValue(error.response.data.message);
    }
  }
);

//edit ministry
export const updateMinistry = createAsyncThunk(
  "ministry/update",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("focal-user")).token
          }`,
        },
      };

      const { data } = await request.put(
        `/edit-ministry/${id}`,
        updates,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Une erreur est survenue"
      );
    }
  }
);

//delete Ministry
export const deleteMinistry = createAsyncThunk(
  "ministry/delete",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("focal-user")).token
          }`,
        },
      };

      const { data } = await request.delete(`/delete-ministry/${id}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Une erreur est survenue"
      );
    }
  }
);
