import { combineReducers } from "redux";

import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import postReducer from "./slices/postSlice";
import chatReducer from "./slices/chatSlice";

const rootReducer = combineReducers({
  users: userReducer,
  auth: authReducer,
  post: postReducer,
  chats: chatReducer,
});

export default rootReducer;
