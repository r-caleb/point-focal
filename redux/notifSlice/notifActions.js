import request from "../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserNotifications = createAsyncThunk(
  "notifications/get",
  async (userId, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("focal-user")).token
          }`,
        },
      };

      const { data } = await request.get(`notifs/${userId}`, config);

      return data; // renvoie la liste des notifications
    } catch (error) {
      console.error(
        "Erreur notifications:",
        error.response?.data?.message || error.message
      );
      return rejectWithValue(
        error.response?.data?.message ||
          "Erreur lors de la récupération des notifications"
      );
    }
  }
);
