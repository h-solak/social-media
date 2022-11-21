import axios from "axios";
import { lazy } from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import darkToast from "../../helpers/darkToast";
import errorToast from "../../helpers/errorToast";
import { TiUserAdd, TiUserDelete } from "react-icons/ti";

/* USER THAT LOGGED IN */
export const fetchUser = createAsyncThunk("users/fetchUser", async (data) => {
  try {
    const res = await axios.get(
      `http://localhost:8800/api/users/${data?.userId}`
    );
    console.log(res.data);
    return res.data.data;
  } catch (err) {
    // custom error
    console.log(err.response.data);
  }
});

export const followUser = createAsyncThunk("users/followUser", async (data) => {
  const res = await axios
    .put(`http://localhost:8800/api/users/follow/${data?.followingId}`, {
      userId: data?.userId,
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
  darkToast(res.data.desc, <TiUserAdd className="color-white fs-5" />);
  return res.data;
});

export const unfollowUser = createAsyncThunk(
  "users/unfollowUser",
  async (data) => {
    const res = await axios
      .put(`http://localhost:8800/api/users/unfollow/${data?.followingId}`, {
        userId: data?.userId,
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
    darkToast(res.data.desc, <TiUserDelete className="color-white fs-5" />);
    return res.data;
  }
);

/* ---Slice-- */

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    loading: false,
    error: "",
    choosenUserInfo: {},
    followError: "",
  },
  // reducers: {
  //   getUser: (state, action) => {
  //     state.user = fetchUser(action.payload);
  //   },
  //   getAnotherUsersInfo: (state, action) => {
  //     state.choosenUserInfo = fetchAnotherUsersInfo(action.payload);
  //   },
  // },
  extraReducers: (builder) => {
    // builder.addCase(fetchUser.pending, (state) => {
    //   state.loading = true;
    // });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      // state.loading = false;
      // state.error = "";
    });
    // builder.addCase(fetchUser.rejected, (state, action) => {
    //   state.loading = false;
    //   state.user = [];
    //   state.error = action.error.message;
    // });

    builder.addCase(followUser.fulfilled, (state, action) => {});
    builder.addCase(unfollowUser.fulfilled, (state, action) => {});
  },
});

// export const { fetchUser } = userSlice.actions;

export default userSlice.reducer;
