import { combineReducers } from "redux";

import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import postReducer from "./slices/postSlice";
import chatReducer from "./slices/chatSlice";

const combinedReducer = combineReducers({
  users: userReducer,
  auth: authReducer,
  post: postReducer,
  chats: chatReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    state = undefined; //reset all
    localStorage.setItem("sociableCat_userToken", "");
  }
  return combinedReducer(state, action);
};

export default rootReducer;
