import request from "../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const editProfil = createAsyncThunk(
  "users/edit-profile",
  async (
    {
      email,
      firstname,
      lastname,
      middlename,
      gender,
      fonction,
      administration,
      address,
      phoneNumber,
      domain,
    },
    { rejectWithValue }
  ) => {
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
        "users/edit-profile",
        {
          email,
          firstname,
          lastname,
          middlename,
          gender,
          fonction,
          administration,
          address,
          phoneNumber,
          domain,
        },
        config
      );
      return data;
    } catch (error) {
      // return custom error message from API if any
      console.log("err", error.response.data.message);

      return rejectWithValue(error.response.data.message);
    }
  }
);

export const editUserByAdmin = createAsyncThunk(
  "users/admin_edit-user",
  async (
    {
      id, // ID de l'utilisateur à modifier
      email,
      firstname,
      lastname,
      middlename,
      gender,
      fonction,
      administration,
      address,
      phoneNumber,
      role,
      ministryName,
    },
    { rejectWithValue }
  ) => {
    try {
      const token = JSON.parse(localStorage.getItem("focal-user"))?.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await request.put(
        `/users/edit-profile/${id}`, // <-- ID dans l'URL
        {
          email,
          firstname,
          lastname,
          middlename,
          gender,
          fonction,
          administration,
          address,
          phoneNumber,
          role,
          ministryName,
        },
        config
      );

      return data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Une erreur est survenue lors de la modification de l'utilisateur.";
      console.log("Erreur admin edit:", message);
      return rejectWithValue(message);
    }
  }
);

export const addProfil = createAsyncThunk(
  "users/edit-picture",
  async ({ picture }, { rejectWithValue }) => {
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
      const { data } = await request.put(
        `users/update-picture`,
        {
          picture,
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
export const changePassword = createAsyncThunk(
  "users/changePassword",
  async (
    { oldPassword, newPassword, confirmNewPassword },
    { rejectWithValue }
  ) => {
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
      const { data } = await request.put(
        `users/change-password/`,
        {
          oldPassword,
          newPassword,
          confirmNewPassword,
        },
        config
      );
      console.log(data);
      return data;
    } catch (error) {
      // return user error message from API if any
      console.log("err", error.response.data.message);

      return rejectWithValue(error.response.data.message);
    }
  }
);
export const customerLogout = createAsyncThunk("users/logout", async () => {
  try {
    // configure header's Content-Type as JSON

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("falanga-user")).token
        }`,
      },
    };
    const { data } = await request.post(`customer/logout/`, {}, config);
    localStorage.removeItem("falanga-user");
    console.log(data);
    return data;
  } catch (error) {
    // return custom error message from API if any
    console.log("err", error.response.data.message);

    return rejectWithValue(error.response.data.message);
  }
});

//get all users
export const getUsers = createAsyncThunk(
  "users/get_all",
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
      const { data } = await request(`users/`, config);
      console.log("dd", data);
      return data;
    } catch (error) {
      // return custom error message from API if any
      console.log("err", error.response.data.message);

      return rejectWithValue(error.response.data.message);
    }
  }
);

//get admin

export const getAdmin = createAsyncThunk(
  "users/get_admin",
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

      const { data } = await request(`users/admin`, config);
      return data.admin; // ou return data selon ton backend
    } catch (error) {
      console.log("err", error.response?.data?.message || error.message);
      return rejectWithValue(
        error.response?.data?.message || "Échec de la récupération de l'admin"
      );
    }
  }
);

//get user by is
export const getUsersById = createAsyncThunk(
  "users/get_byId",
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
      const { data } = await request(`users/${id}`, config);
      console.log("dd", data);
      return data;
    } catch (error) {
      // return custom error message from API if any
      console.log("err", error.response.data.message);

      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/delete-user",
  async (userId, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("focal-user")).token
          }`,
        },
        data: { id: userId },
      };

      const { data } = await request.delete(`users/delete`, config);
      console.log("Utilisateur supprimé :", data);
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
