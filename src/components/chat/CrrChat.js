import React from "react";
import {
  MdMoreHoriz,
  MdPhotoLibrary,
  MdLocationPin,
  MdEmojiEmotions,
} from "react-icons/md";
import { useSelector } from "react-redux";

import { Row, Col } from "reactstrap";
import ChatBottomBar from "./ChatBottomBar";
import MessageList from "./MessageList";
const Chat = () => {
  const { crrChat } = useSelector((state) => state.chats);
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="chat-container w-100 d-flex flex-column">
      <div className="chat-topbar flex-between w-100 px-4">
        <div className="flex-align-center gap-2">
          <img
            src={`${process.env.REACT_APP_PUBLIC_FOLDER}/avatars/cat${crrChat?.crrAvatar}.svg`}
            alt="user profile"
            width={45}
            height={45}
            className="pointer"
          />
          <span className="fw-600">
            {crrChat.usernames?.filter((item) => item !== user.username)}
          </span>
        </div>
        <button className="p-0">
          <MdMoreHoriz className="fs-4" />
        </button>
      </div>
      <MessageList messages={crrChat.messages} username1={user?.username} />
      <ChatBottomBar
        chatId={crrChat?._id}
        username1={user?.username}
        username2={crrChat?.usernames?.filter((item) => item !== user.username)}
      />
    </div>
  );
};

export default Chat;
