import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getChat } from "../../redux/slices/chatSlice";
const ChatUser = ({ chat }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  return (
    <button
      className="w-100 chat-user pointer py-3 border-bottom"
      onClick={() =>
        dispatch(
          getChat({
            username1: user.username,
            username2: chat.usernames.filter((item) => item !== user.username),
          })
        )
      }
    >
      <div className="d-flex align-items-start justify-content-between w-100 h-100 px-3 ">
        <div className="d-flex align-items-center gap-2">
          <img
            src={`${process.env.REACT_APP_PUBLIC_FOLDER}/avatars/cat${chat.crrAvatar}.svg`}
            alt="user profile"
            width={50}
            height={50}
            className="pointer"
          />
          <div className="d-flex flex-column text-start">
            <span className="fw-bold fs-7">
              {chat.usernames.filter((item) => item !== user.username)}
            </span>
            <span
              className="text-secondary fs-7"
              style={{ wordBreak: "break-all" }}
            >
              {chat.lastMessage
                ? `${
                    chat?.lastMessage?.text.length > 15
                      ? chat?.lastMessage?.text?.slice(0, 15)
                      : chat?.lastMessage?.text
                  }${chat?.lastMessage?.text.length > 15 ? "..." : ""}`
                : chat.usernames[0] === user.username
                ? "You created the chat"
                : "They created the chat"}
            </span>
          </div>
        </div>
        <span className="text-secondary fs-9">
          {moment(chat.updatedAt).format("dddd, hh:hh A")}
        </span>
      </div>
    </button>
  );
};

export default ChatUser;
