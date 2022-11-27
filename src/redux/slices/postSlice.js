import axios from "axios";
import { lazy } from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import darkToast from "../../helpers/darkToast";
import errorToast from "../../helpers/errorToast";
import { TiTick } from "react-icons/ti";

export const sharePost = createAsyncThunk("posts/sharePost", async (data) => {
  const res = await axios
    .post(`http://localhost:8800/api/posts`, {
      userId: data?.userId,
      desc: data?.desc,
      img: data?.img,
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
  darkToast(res.data.desc, <TiTick className="color-success fs-5" />);
  return res.data;
});

export const getTimelinePosts = createAsyncThunk(
  "posts/getTimelinePosts",
  async (data) => {
    const res = await axios
      .get(`http://localhost:8800/api/posts/timeline/${data?.userId}`)
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
    return res.data.posts;
  }
);

/* ---Slice-- */

export const postSlice = createSlice({
  name: "post",
  initialState: {
    timelinePosts: {},
  },
  extraReducers: (builder) => {
    builder.addCase(getTimelinePosts.fulfilled, (state, action) => {
      state.timelinePosts = action.payload;
    });
  },
});

// export const { fetchUser } = userSlice.actions;

export default postSlice.reducer;
