import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/authSlice";
import statReducer from "./statSlice/statSlice";
import userReducer from "./userSlice/userSlice";
import ministryReducer from "./ministrySlice/ministrySlice";
import messageReducer from "./messageSlice/messageSlice";
import appReducer from "./appSlice/appSlice";
import notifReducer from "./notifSlice/notifSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    stat: statReducer,
    user: userReducer,
    ministry: ministryReducer,
    message: messageReducer,
    app: appReducer,
    notif: notifReducer,
  },
});

export default store;
