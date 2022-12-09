import axios from "axios";
import { lazy } from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import darkToast from "../../helpers/darkToast";
import errorToast from "../../helpers/errorToast";
import { TiTick } from "react-icons/ti";
import { useDispatch } from "react-redux";

const config = {
  headers: {
    Authorization: `SociableCat ${localStorage.getItem(
      "sociableCat_userToken"
    )}`,
  },
};

export const sharePost = createAsyncThunk("posts/sharePost", async (data) => {
  const res = await axios
    .post(
      `${process.env.REACT_APP_API_ENDPOINT}/posts`,
      {
        userId: data?.userId,
        desc: data?.desc,
        img: data?.img,
      },
      config
    )
    .catch((err) => {
      if (err.response) {
        //server responded with a status code
        errorToast(
          err.response.data?.errTitle ||
            err.response.data.desc ||
            "Something went wrong!"
        );
        if (err.response.data?.errTitle === "Unauthorized") {
          return "Unauthorized";
        }
      } else if (err.request) {
        //no response receieved
        errorToast("Something went wrong!");
        return "";
      } else {
        //Something happened in setting up the request that triggered an Error
        errorToast("Something went wrong!");
      }
    });
  darkToast(res.data.desc, <TiTick className="color-success fs-5" />);
  return res.data;
});

export const resetPostIsShared = createAsyncThunk(
  "posts/resetPostIsShared",
  async () => {
    return null;
  }
);

export const deletePost = createAsyncThunk("posts/deletePost", async (data) => {
  const res = await axios
    .delete(
      `${process.env.REACT_APP_API_ENDPOINT}/posts/${data?.postId}`,
      {
        data: {
          userId: data?.userId,
        },
      },
      config
    )
    .catch((err) => {
      if (err.response) {
        //server responded with a status code
        errorToast(
          err.response.data?.errTitle ||
            err.response.data.desc ||
            "Something went wrong!"
        );
        if (err.response.data?.errTitle === "Unauthorized") {
          return "Unauthorized";
        }
      } else if (err.request) {
        //no response receieved
        errorToast("Something went wrong!");
        return "";
      } else {
        //Something happened in setting up the request that triggered an Error
        errorToast("Something went wrong!");
      }
    });
  darkToast(res.data.desc, <TiTick className="color-success fs-5" />);
});

export const getTimelinePosts = createAsyncThunk(
  "posts/getTimelinePosts",
  async (data) => {
    const res = await axios
      .get(
        `${process.env.REACT_APP_API_ENDPOINT}/posts/timeline/${data?.userId}`,
        config
      )
      .catch((err) => {
        if (err.response) {
          //server responded with a status code
          if (err.response.data?.errTitle === "Unauthorized") {
            errorToast(err.response.data?.errTitle || "Something went wrong!");
          } else {
            errorToast(err.response.data.desc || "Something went wrong!");
          }
        } else if (err.request) {
          //no response receieved
          errorToast("Something went wrong!");
        } else {
          //Something happened in setting up the request that triggered an Error
          errorToast("Something went wrong!");
        }
      });
    return res.data.posts;
  }
);

/* ---Slice-- */

export const postSlice = createSlice({
  name: "post",
  initialState: {
    timelinePosts: {},
    postIsShared: false,
    loading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getTimelinePosts.fulfilled, (state, action) => {
      state.timelinePosts = action.payload;
      state.loading = false;
    });
    builder.addCase(getTimelinePosts.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(sharePost.fulfilled, (state) => {
      state.postIsShared = true;
    });
    builder.addCase(resetPostIsShared.fulfilled, (state) => {
      state.postIsShared = false;
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

// export const { fetchUser } = userSlice.actions;

export default postSlice.reducer;
