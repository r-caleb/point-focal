import { createSlice } from "@reduxjs/toolkit";
import {
  changePassword,
  editProfil,
  customerLogout,
  addProfil,
  getUsers,
  getUsersById,
  deleteUser,
  editUserByAdmin,
  getAdmin,
} from "./userActions";

const initialState = {
  token: null,
  loading: false,
  userUpdate: null,
  pictureInfo: null,
  allUsers: null,
  delInfos: null,
  admin: null,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetMessage: (state) => {
      if (state.userUpdate) {
        state.userUpdate = null;
      }
      if (state.delInfos) {
        state.delInfos = null;
      }
    },
  },
  extraReducers: (builder) => {
    //all users
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.allUsers = payload;
      state.success = true;
    });
    builder.addCase(getUsers.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    //get admin
    builder.addCase(getAdmin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAdmin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.admin = payload;
      state.success = true;
    });
    builder.addCase(getAdmin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // users by Id
    builder.addCase(getUsersById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUsersById.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userUpdate = payload;
      state.success = true;
    });
    builder.addCase(getUsersById.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // delete user
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.delInfos = payload;
      state.success = true;
    });
    builder.addCase(deleteUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    //changePass user
    builder.addCase(changePassword.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(changePassword.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userUpdate = payload;
      state.success = true;
    });
    builder.addCase(changePassword.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    });
    //edit user
    builder.addCase(editProfil.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(editProfil.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userUpdate = payload;
      state.success = true;
    });
    builder.addCase(editProfil.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    //edit user by Admin
    builder.addCase(editUserByAdmin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(editUserByAdmin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userUpdate = payload;
      state.success = true;
    });
    builder.addCase(editUserByAdmin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    //edit picture
    builder.addCase(addProfil.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(addProfil.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.pictureInfo = payload;
      state.success = true;
    });
    builder.addCase(addProfil.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    //logout user
    builder.addCase(customerLogout.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(customerLogout.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.token = null;
    });
    builder.addCase(customerLogout.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});
export const { resetMessage } = userSlice.actions;

export default userSlice.reducer;
