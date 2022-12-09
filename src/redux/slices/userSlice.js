import axios from "axios";
import { lazy } from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import darkToast from "../../helpers/darkToast";
import errorToast from "../../helpers/errorToast";
import { TiUserAdd, TiUserDelete } from "react-icons/ti";

/* USER THAT LOGGED IN */
export const fetchProfile = createAsyncThunk(
  "users/fetchProfile",
  async (data) => {
    try {
      const config = {
        headers: {
          Authorization: `SociableCat ${localStorage.getItem(
            "sociableCat_userToken"
          )}`,
        },
      };
      const res = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/users/${data?.userId}`,
        config
      );
      return res.data.data;
    } catch (err) {
      // custom error
    }
  }
);

export const followUser = createAsyncThunk("users/followUser", async (data) => {
  const config = {
    headers: {
      Authorization: `SociableCat ${localStorage.getItem(
        "sociableCat_userToken"
      )}`,
    },
  };

  const res = await axios
    .put(
      `${process.env.REACT_APP_API_ENDPOINT}/users/follow/${data?.followingId}`,
      {
        userId: data?.userId,
      },
      config
    )
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
    const config = {
      headers: {
        Authorization: `SociableCat ${localStorage.getItem(
          "sociableCat_userToken"
        )}`,
      },
    };
    const res = await axios
      .put(
        `${process.env.REACT_APP_API_ENDPOINT}/users/unfollow/${data?.followingId}`,
        {
          userId: data?.userId,
        },
        config
      )
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
  name: "users",
  initialState: {
    user: {},
    crrProfile: {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.crrProfile = action.payload;
    });
  },
});

// export const { fetchUser } = userSlice.actions;

export default userSlice.reducer;
