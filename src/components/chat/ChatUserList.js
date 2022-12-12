import React from "react";
import { Row, Col } from "reactstrap";
import ChatUser from "./ChatUser";
import "./messenger.css";
import { IoSettingsSharp } from "react-icons/io5";

const ChatUserList = () => {
  const users = [1, 2, 3, 4, 5, 5, 5, 5, 5];
  return (
    <div className="chat-user-list m-0 p-0 w-100 d-flex flex-column pt-2 bg-white">
      <div className="d-flex flex-column">
        <div className="d-flex align-items-center justify-content-between px-4 mb-2">
          <span className="fs-5 fw-bold ">Messenger</span>
          <button className="p-0">
            <IoSettingsSharp style={{ fontSize: "18px" }} />
          </button>
        </div>
        {users?.map((user, index) => (
          <ChatUser key={index} />
        ))}
      </div>
    </div>
  );
};

export default ChatUserList;
