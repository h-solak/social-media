import axios from "axios";
import { lazy } from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import darkToast from "../../helpers/darkToast";
import errorToast from "../../helpers/errorToast";
import { TiTick } from "react-icons/ti";

export const sharePost = createAsyncThunk("posts/sharePost", async (data) => {
  const res = await axios
    .post(
      `${process.env.REACT_APP_API_ENDPOINT}/posts`,
      {
        userId: data?.userId,
        desc: data?.desc,
        img: data?.img,
      },
      {
        headers: {
          Authorization: `SociableCat ${localStorage.getItem(
            "sociableCat_userToken"
          )}`,
        },
      }
    )
    .catch((err) => {
      if (err.response) {
        //server responded with a status code
        errorToast(
          err.response.data?.errTitle ||
            err.response.data.desc ||
            "Your post couldn't be shared!",
          "top-center"
        );
        if (err.response.data?.errTitle === "Invalid Token") {
          return "Invalid Token";
        }
      } else if (err.request) {
        //no response receieved
        errorToast("Your post couldn't be shared!", "top-center");
        return "";
      } else {
        //Something happened in setting up the request that triggered an Error
        errorToast("Your post couldn't be shared!", "top-center");
      }
    });
  darkToast(res?.data?.desc, <TiTick className="color-success fs-5" />);
  return res?.data;
});

export const resetPostIsShared = createAsyncThunk(
  "posts/resetPostIsShared",
  async () => {
    return null;
  }
);

export const likePost = createAsyncThunk("posts/likePost", async (data) => {
  const res = await axios
    .put(
      `${process.env.REACT_APP_API_ENDPOINT}/posts/${data?.postId}/like`,
      {
        username: data?.username,
      },
      {
        headers: {
          Authorization: `SociableCat ${localStorage.getItem(
            "sociableCat_userToken"
          )}`,
        },
      }
    )
    .catch((err) => {
      if (err.response) {
        //server responded with a status code
        errorToast(
          err.response.data?.errTitle ||
            err.response.data.desc ||
            `Something went wrong!`
        );
        if (err.response.data?.errTitle === "Invalid Token") {
          return "Invalid Token";
        }
      } else if (err.request) {
        //no response receieved
        errorToast(`Something went wrong!`);
        return "";
      } else {
        //Something happened in setting up the request that triggered an Error
        errorToast(`Something went wrong!`);
      }
    });
  // darkToast(res.data.desc, <TiTick className="color-success fs-5" />);
  return {
    postId: res?.data?.postId,
    newLikes: res?.data?.newLikes,
  };
});

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (data, { rejectWithValue }) => {
    const res = await axios
      .delete(
        `${process.env.REACT_APP_API_ENDPOINT}/posts/${data?.postId}`,
        {
          data: {
            userId: data?.userId,
          },
        },
        {
          headers: {
            Authorization: `SociableCat ${localStorage.getItem(
              "sociableCat_userToken"
            )}`,
          },
        }
      )
      .catch((err) => {
        if (err.response) {
          //server responded with a status code
          return errorToast(
            err.response.data?.errTitle ||
              err.response.data.desc ||
              "Post couldn't be deleted."
          );
        } else if (err.request) {
          //no response receieved
          return errorToast("Post couldn't be deleted.");
        } else {
          //Something happened in setting up the request that triggered an Error
          return errorToast("Post couldn't be deleted.");
        }
      });
    return darkToast(
      res?.data?.desc,
      <TiTick className="color-success fs-5" />
    );
  }
);

export const getTimelinePosts = createAsyncThunk(
  "posts/getTimelinePosts",
  async (data) => {
    const res = await axios
      .get(
        `${process.env.REACT_APP_API_ENDPOINT}/posts/timeline/${data?.userId}`,
        {
          headers: {
            Authorization: `SociableCat ${localStorage.getItem(
              "sociableCat_userToken"
            )}`,
          },
        }
      )
      .catch((err) => {
        if (err.response) {
          //server responded with a status code
          errorToast(
            err.response.data?.errTitle ||
              err.response.data.desc ||
              "Couldn't reach timeline posts."
          );
          if (err.response.data?.errTitle === "Invalid Token") {
            return err.response.data?.errTitle;
          }
          return err.response.data?.errTitle;
        } else if (err.request) {
          //no response receieved
          errorToast("Couldn't reach timeline posts.");
        } else {
          //Something happened in setting up the request that triggered an Error
          errorToast("Couldn't reach timeline posts.");
        }
      });
    return {
      data: res?.data?.posts,
      error: res === "Invalid Token" ? res : null,
    };
  }
);

// export const resetPostAuth = createAsyncThunk(
//   "posts/resetPostAuth",
//   async () => {
//     return false;
//   }
// );

/* ---Slice-- */

export const postSlice = createSlice({
  name: "post",
  initialState: {
    timelinePosts: {},
    timelineIsLoading: false,
    postIsShared: false,
    postIsSharing: false,
    postAuthError: false,
  },
  reducers: {
    updateTimelinePosts(state, action) {
      switch (action.payload.action) {
        case "like":
          const index1 = state.timelinePosts.findIndex(
            (post) => post._id === action.payload.postId
          );
          if (!state.timelinePosts[index1]?.likes.includes) {
            state.timelinePosts[index1].likes.append(action.payload.username);
          }
        case "unlike":
          const index2 = state.timelinePosts.findIndex(
            (post) => post._id === action.payload.postId
          );
          if (!state.timelinePosts[index2]?.likes.includes) {
            state.timelinePosts.filter((item, index) => index !== index2);
          }
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getTimelinePosts.fulfilled, (state, action) => {
      state.timelinePosts = action.payload?.data;
      state.timelineIsLoading = false;
      if (action.payload?.error === "Invalid Token") {
        state.postAuthError = true;
      }
    });
    builder.addCase(getTimelinePosts.pending, (state) => {
      state.timelineIsLoading = true;
    });
    builder.addCase(getTimelinePosts.rejected, (state) => {
      state.timelineIsLoading = false;
    });
    builder.addCase(sharePost.fulfilled, (state, action) => {
      state.postIsSharing = false;
      state.postIsShared = true;
    });
    builder.addCase(sharePost.pending, (state) => {
      state.postIsSharing = true;
    });
    builder.addCase(sharePost.rejected, (state) => {
      state.postIsSharing = false;
    });
    builder.addCase(resetPostIsShared.fulfilled, (state) => {
      state.postIsShared = false;
    });
    builder.addCase(likePost.fulfilled, (state, action) => {
      const posts = state.timelinePosts;
      const newPosts = posts.map((item) => {
        //updated timeline posts after liking
        if (item._id === action.payload.postId) {
          return { ...item, likes: action.payload.newLikes };
        } else {
          return item;
        }
      });
      state.timelinePosts = newPosts;
      // state. = false;
    });
  },
});

export const { updateTimelinePosts } = postSlice.actions;

export default postSlice.reducer;
