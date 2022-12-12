import React from "react";
import {
  MdMoreHoriz,
  MdPhotoLibrary,
  MdLocationPin,
  MdEmojiEmotions,
} from "react-icons/md";

import { Row, Col } from "reactstrap";
import ChatBottomBar from "./ChatBottomBar";
import MessageList from "./MessageList";
const Chat = () => {
  return (
    <div className="chat-container w-100 d-flex flex-column">
      <div className="chat-topbar flex-between w-100 px-4">
        <div className="flex-align-center gap-2">
          <img
            src={process.env.REACT_APP_PUBLIC_FOLDER + "/svg/noavatar.svg"}
            alt="user profile"
            width={45}
            height={45}
            className="online-friend-pic rounded-circle object-fit-cover"
          />
          <span className="fw-600">Hasan Solak</span>
        </div>
        <button className="p-0">
          <MdMoreHoriz className="fs-4" />
        </button>
      </div>
      <MessageList />
      <ChatBottomBar />
    </div>
  );
};

export default Chat;
