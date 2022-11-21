import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import darkToast from "../../../helpers/darkToast";
import errorToast from "../../../helpers/errorToast";

/* USER THAT LOGGED IN */
export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (data) => {
    const res = await axios
      .post(`http://localhost:8800/api/auth/register`, {
        username: data.username,
        email: data.email,
        password: data.password,
      })
      .catch((err) => {
        if (err.response) {
          //server responded with a status code
          errorToast(
            err.response.data.desc || "Something went wrong!",
            "bottom-center"
          );
        } else if (err.request) {
          //no response receieved
          errorToast("Something went wrong!");
        } else {
          //Something happened in setting up the request that triggered an Error
          errorToast("Something went wrong!");
        }
      });
    console.log(res.data);
    darkToast(res.data.desc, "");
    return res.data.data;
  }
);

/* ---Slice-- */

export const registerSlice = createSlice({
  name: "register",
  initialState: {
    isRegistered: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isRegistered = action.payload;
    });
  },
});

export default registerSlice.reducer;
