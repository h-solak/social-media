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
      const res = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/users/${data?.username}`,
        {
          headers: {
            Authorization: `SociableCat ${localStorage.getItem(
              "sociableCat_userToken"
            )}`,
          },
        }
      );
      return {
        data: res.data.data,
        error: res === "Invalid Token" ? res : null,
      };
    } catch (err) {
      // custom error
    }
  }
);

export const getSuggestedUsers = createAsyncThunk(
  "users/getSuggestedUsers",
  async (data) => {
    const config = {
      headers: {
        Authorization: `SociableCat ${localStorage.getItem(
          "sociableCat_userToken"
        )}`,
      },
    };
    const res = await axios
      .get(
        `${process.env.REACT_APP_API_ENDPOINT}/users/timeline/suggestions/${data?.userId}`,
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
    return res?.data?.suggestedUsers;
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
    return res?.data?.unfollowedUser;
  }
);

export const changeAvatar = createAsyncThunk(
  "users/changeAvatar",
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
        `${process.env.REACT_APP_API_ENDPOINT}/users/avatar/${data?.userId}`,
        {
          avatarId: data?.avatarId,
        },
        config
      )
      .catch((err) => {
        if (err.response) {
          //server responded with a status code
          errorToast(
            err.response.data?.errTitle ||
              err.response.data.desc ||
              "Couldn't change your avatar."
          );
          return err.response.data?.errTitle;
        } else if (err.request) {
          //no response receieved
          errorToast("Couldn't change your avatar.");
          return "";
        } else {
          //Something happened in setting up the request that triggered an Error
          errorToast("Couldn't change your avatar.");
          return "";
        }
      });
    darkToast(res.data.desc);
    return data?.avatarId;
  }
);

/* ---Slice-- */

export const userSlice = createSlice({
  name: "users",
  initialState: {
    crrProfile: {},
    profileIsLoading: false,
    suggestedUsers: {},
    suggestedUsersIsLoading: false,
    userUnfollowed: "",
    usersAuthError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.crrProfile = action.payload?.data;
      state.profileIsLoading = false;
      if (action.payload?.error === "Invalid Token") {
        state.usersAuthError = true;
      }
    });
    builder.addCase(fetchProfile.pending, (state) => {
      state.profileIsLoading = true;
    });
    builder.addCase(fetchProfile.rejected, (state) => {
      state.profileIsLoading = false;
    });
    builder.addCase(getSuggestedUsers.fulfilled, (state, action) => {
      state.suggestedUsers = action.payload;
      state.suggestedUsersIsLoading = false;
    });
    builder.addCase(getSuggestedUsers.pending, (state) => {
      state.suggestedUsersIsLoading = true;
    });
    builder.addCase(getSuggestedUsers.rejected, (state) => {
      state.suggestedUsersIsLoading = false;
    });
    builder.addCase(changeAvatar.fulfilled, (state, action) => {
      state.crrProfile.crrAvatar = action.payload;
    });
    builder.addCase(unfollowUser.fulfilled, (state, action) => {
      state.userUnfollowed = action.payload;
    });
  },
});

export default userSlice.reducer;
