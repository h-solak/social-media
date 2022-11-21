import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import registerReducer from "./slices/auth/registerSlice";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    users: userReducer,
    register: registerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
