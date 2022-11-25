import axios from "axios";
import { lazy } from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import darkToast from "../../helpers/darkToast";
import errorToast from "../../helpers/errorToast";
import { TiUserAdd, TiUserDelete } from "react-icons/ti";

/* USER THAT LOGGED IN */
// export const fetchUser = createAsyncThunk("users/fetchUser", async (data) => {
//   try {
//     const res = await axios.get(
//       `http://localhost:8800/api/users/${data?.userId}`
//     );
//     return res.data.data;
//   } catch (err) {
//     // custom error
//   }
// });

/* USER THAT LOGGED IN */
export const fetchProfile = createAsyncThunk(
  "users/fetchProfile",
  async (data) => {
    try {
      const res = await axios.get(
        `http://localhost:8800/api/users/${data?.userId}`
      );
      return res.data.data;
    } catch (err) {
      // custom error
    }
  }
);

export const followUser = createAsyncThunk("users/followUser", async (data) => {
  const res = await axios
    .put(`http://localhost:8800/api/users/follow/${data?.followingId}`, {
      userId: data?.userId,
    })
    .catch((err) => {
      if (err.response) {
        //server responded with a status code
        errorToast(err.response.data.desc || "Something went wrong!");
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
          errorToast(err.response.data.desc || "Something went wrong!");
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
    crrProfile: {},
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
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.crrProfile = action.payload;
    });
    // builder.addCase(followUser.fulfilled, (state, action) => {});
    // builder.addCase(unfollowUser.fulfilled, (state, action) => {});
  },
});

// export const { fetchUser } = userSlice.actions;

export default userSlice.reducer;
