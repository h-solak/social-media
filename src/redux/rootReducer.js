import { combineReducers } from "redux";

import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import postReducer from "./slices/postSlice";

const rootReducer = combineReducers({
  users: userReducer,
  auth: authReducer,
  post: postReducer,
});

export default rootReducer;
