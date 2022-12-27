import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import darkToast from "../../helpers/darkToast";
import errorToast from "../../helpers/errorToast";

//this is better initialization bc if the client has closed the window, they might still be signed in if the jwt is not expired
// const userToken = localStorage.getItem("sociableCat_userToken")
//   ? localStorage.getItem("sociableCat_userToken")
//   : null;

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (data) => {
    const res = await axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/auth/register`, {
        username: data.username,
        email: data.email,
        password: data.password,
      })
      .catch((err) => {
        if (err.response) {
          //server responded with a status code
          console.log(err.response);
          if (err.response.data.keyValue.email) {
            errorToast("This email is already in use");
          } else if (err.response.data.keyValue.username) {
            errorToast("This username is taken");
          } else {
            errorToast("Something went wrong!");
          }
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
    .post(
      `${process.env.REACT_APP_API_ENDPOINT}/auth/login`,
      {
        email: data.email,
        password: data.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
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

  return {
    user: res.data.data,
    userToken: res.data.jwtToken,
  };
});

export const logOut = createAsyncThunk("auth/logout", async () => {
  // document.cookie = `token=0`;
  return;
});

/* ---Slice-- */

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    isRegistered: "",
    userToken: "",
    isLoading: false,
  },
  reducers: {
    resetUser(state, action) {
      return (state.user = {});
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isRegistered = action.payload;
      state.isLoading = false;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(resetRegistered.fulfilled, (state, action) => {
      state.isRegistered = action.payload;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.userToken = action.payload.userToken;
      localStorage.setItem("sociableCat_userToken", action.payload.userToken);
      // document.cookie = `token=${action.payload.userToken}`;
      state.isLoading = false;
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(logOut.fulfilled, (state, action) => {
      localStorage.setItem("sociableCat_userToken", "");
      state.userToken = "";
      state.user = {};
    });
  },
});
// export const {resetUser} = authSlice.actions
export default authSlice.reducer;
