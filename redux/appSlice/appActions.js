import request from "../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addApplication = createAsyncThunk(
  "applications/add-application",
  async (applicationData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("focal-user")).token
          }`,
        },
      };

      const { data } = await request.post(
        "/apps",
        applicationData,
        config
      );
      console.log("Application ajoutée :", data);
      return data;
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getApplications = createAsyncThunk(
  "applications/get-all",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("focal-user")).token
          }`,
        },
      };

      const { data } = await request.get("/apps", config);
      console.log("Applications récupérées :", data);
      return data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération :",
        error.response.data.message
      );
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateApplication = createAsyncThunk(
  "applications/update-application",
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
        `/apps/${id}`,
        updates,
        config
      );
      console.log("Application mise à jour :", data);
      return data;
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour :",
        error.response.data.message
      );
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const deleteApplication = createAsyncThunk(
  "applications/delete-application",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("focal-user")).token
          }`,
        },
      };

      const { data } = await request.delete(`/apps/${id}`, config);
      console.log("Application supprimée :", data);
      return data;
    } catch (error) {
      console.error(
        "Erreur lors de la suppression :",
        error.response.data.message
      );
      return rejectWithValue(error.response.data.message);
    }
  }
);
