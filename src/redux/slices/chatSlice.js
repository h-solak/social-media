import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import darkToast from "../../helpers/darkToast";
import errorToast from "../../helpers/errorToast";

export const getChatList = createAsyncThunk(
  "chat/getChatList",
  async (data) => {
    const res = await axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/chats/${data?.userId}`, {
        headers: {
          Authorization: `SociableCat ${localStorage.getItem(
            "sociableCat_userToken"
          )}`,
        },
      })
      .catch((err) => {
        if (err.response) {
          errorToast(
            err.response.data.desc || "Something went wrong!",
            "top-center"
          );
        } else if (err.request) {
          errorToast("Something went wrong!", "top-center");
        } else {
          errorToast("Something went wrong!", "top-center");
        }
      });
    return res?.data?.chats;
  }
);

//get a spesific dm chat
export const getChat = createAsyncThunk("chat/getChat", async (data) => {
  const res = await axios
    .get(
      `${process.env.REACT_APP_API_ENDPOINT}/chats/dm/${data?.username2}/${data?.username1}`,
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
        errorToast(
          err.response.data.desc || "Something went wrong!",
          "top-center"
        );
      } else if (err.request) {
        errorToast("Something went wrong!", "top-center");
      } else {
        errorToast("Something went wrong!", "top-center");
      }
    });
  return res?.data?.chat;
});

export const getChatSuggestions = createAsyncThunk(
  "chat/chatSuggestions",
  async (data) => {
    const res = await axios
      .get(
        `${process.env.REACT_APP_API_ENDPOINT}/chats/suggestions/${data?.userId}`,
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
          errorToast(
            err.response.data.desc || "Something went wrong!",
            "top-center"
          );
        } else if (err.request) {
          errorToast("Something went wrong!", "top-center");
        } else {
          errorToast("Something went wrong!", "top-center");
        }
      });
    return res?.data?.data;
  }
);

//send message
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (data) => {
    const res = await axios
      .put(
        `${process.env.REACT_APP_API_ENDPOINT}/chats/${data?.chatId}`,
        {
          messageText: data?.messageText,
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
          errorToast(
            err.response.data.desc || "Something went wrong!",
            "top-center"
          );
        } else if (err.request) {
          errorToast("Something went wrong!", "top-center");
        } else {
          errorToast("Something went wrong!", "top-center");
        }
      });
    return true;
  }
);

export const chatSlice = createSlice({
  name: "chats",
  initialState: {
    chatList: {},
    chatSuggestions: {},
    crrChat: {},
    messageIsSending: false,
    messageIsSent: false,
  },
  // reducers: {
  //   resetUser(state, action) {
  //     return (state.user = {});
  //   },
  // },
  extraReducers: (builder) => {
    builder.addCase(getChatList.fulfilled, (state, action) => {
      state.chatList = action.payload;
    });
    builder.addCase(getChat.fulfilled, (state, action) => {
      state.crrChat = action.payload;
    });
    builder.addCase(getChatSuggestions.fulfilled, (state, action) => {
      state.chatSuggestions = action.payload;
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.messageIsSending = false;
      state.messageIsSent = true;
    });
    builder.addCase(sendMessage.pending, (state, action) => {
      state.messageIsSending = true;
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      state.messageIsSending = false;
    });
  },
});
export default chatSlice.reducer;
