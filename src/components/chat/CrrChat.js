import React, { useState } from "react";
import { MdMoreHoriz, MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import {
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { closeCrrChat } from "../../redux/slices/chatSlice";
import ChatBottomBar from "./ChatBottomBar";
import MessageList from "./MessageList";
const Chat = () => {
  const dispatch = useDispatch();
  const { crrChat } = useSelector((state) => state.chats);
  const user = useSelector((state) => state.auth.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
        <Dropdown
          isOpen={dropdownOpen}
          toggle={() => setDropdownOpen(!dropdownOpen)}
          // onMouseOver={() => setDropdownOpen(true)}
          // onMouseLeave={() => setDropdownOpen(false)}
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="border-0"
        >
          <DropdownToggle className="p-0 bg-transparent border-0">
            <MdMoreHoriz className="fs-4 text-dark" />
          </DropdownToggle>
          <DropdownMenu className="">
            <DropdownItem
              className="d-flex align-items-center gap-2 fw-600 fs-7"
              onClick={() => dispatch(closeCrrChat())}
            >
              <span
                className="m-0 flex-center bg-color-bronze rounded-circle"
                style={{ padding: "2px" }}
              >
                <MdOutlineClose className="fs-6 color-white" />
              </span>{" "}
              Close Chat
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
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
