import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import darkToast from "../../helpers/darkToast";
import errorToast from "../../helpers/errorToast";

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
    darkToast(res.data.desc, "", "top-center");
    return res.data.data;
  }
);
export const resetRegistered = createAsyncThunk(
  "register/resetRegistered",
  async () => {
    return false;
  }
);

export const loginUser = createAsyncThunk("login/loginUser", async (data) => {
  const res = await axios
    .post(`http://localhost:8800/api/auth/login`, {
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
  return res.data.data;
});

export const logOutTemp = createAsyncThunk("logout/logout", async () => {
  return {};
});

/* ---Slice-- */

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    isRegistered: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isRegistered = action.payload;
    });
    builder.addCase(resetRegistered.fulfilled, (state, action) => {
      state.isRegistered = action.payload;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(logOutTemp.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export default authSlice.reducer;
