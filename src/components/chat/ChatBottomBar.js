import React from "react";
import { MdEmojiEmotions, MdSend, MdInsertPhoto } from "react-icons/md";

import { Row, Col } from "reactstrap";

const ChatBottomBar = () => {
  return (
    <div className="chat-bottombar d-flex align-items-center justify-content-between gap-3 px-4">
      <div className="flex-center gap-2">
        <button className="p-0">
          <MdEmojiEmotions className="fs-4" />
        </button>
        <button className="p-0">
          <MdInsertPhoto className="fs-4" />
        </button>
      </div>
      <input
        type="text"
        placeholder="Type a message, heh?"
        className="px-2 rounded-3 border-0 w-100"
        style={{ height: "40px" }}
      />
      <button className="p-0">
        <MdSend className="fs-4" />
      </button>
    </div>
  );
};

export default ChatBottomBar;
