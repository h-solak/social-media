import React, { useState, useEffect } from "react";
import { MdEmojiEmotions, MdSend, MdInsertPhoto } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Row, Col } from "reactstrap";
import { sendMessage } from "../../redux/slices/chatSlice";

const ChatBottomBar = ({ chatId, username1 }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { crrChat, messageIsSent } = useSelector((state) => state.chats);
  const [messageText, setMessageText] = useState("");
  useEffect(() => {
    if (messageIsSent) {
      setMessageText("");
    }
  }, [crrChat.messages]);
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
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        className="px-2 rounded-3 border-0 w-100"
        style={{ height: "40px" }}
      />
      <button
        className="p-0"
        onClick={() => {
          if (messageText !== "") {
            dispatch(
              sendMessage({
                username: username1,
                messageText: messageText.trim(),
                chatId: chatId,
              })
            );
          }
        }}
      >
        <MdSend className="fs-4" />
      </button>
    </div>
  );
};

export default ChatBottomBar;
