import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import postReducer from "./slices/postSlice";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    users: userReducer,
    auth: authReducer,
    post: postReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
