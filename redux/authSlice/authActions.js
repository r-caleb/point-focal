import request from "../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await request.post(
        `auth/login/`,
        {
          username,
          password,
        },
        config
      );
      console.log(data);
      typeof window !== "undefined" &&
        localStorage.setItem("focal-user", JSON.stringify(data));
      return data;
    } catch (error) {
      // return custom error message from API if any
      console.log("err", error.response.data.message);

      return rejectWithValue(error.response.data.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    {
      email,
      firstname,
      middlename,
      lastname,
      gender,
      fonction,
      administration,
      phoneNumber,
      address,
      role,
      domain,
      ministry,
      password,
    },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await request.post(
        "auth/register/",
        {
          email,
          firstname,
          middlename,
          lastname,
          gender,
          fonction,
          administration,
          phoneNumber,
          address,
          role,
          domain,
          ministry,
          password,
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

//get me
//get all users
export const getMe = createAsyncThunk("me/", async (_, { rejectWithValue }) => {
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
    const { data } = await request(`auth/me`, config);
    console.log("getMe", data);
    return data;
  } catch (error) {
    // return custom error message from API if any
    console.log("err", error.response.data.message);

    return rejectWithValue(error.response.data.message);
  }
});
