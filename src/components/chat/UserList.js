import React from "react";
import { Row, Col } from "reactstrap";
import ChatUser from "./ChatUser";
import "./messenger.css";
import { IoChatbubblesSharp, IoPeople } from "react-icons/io5";
import { MdEmojiPeople, MdLock } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getChat } from "../../redux/slices/chatSlice";

const ChatUserList = ({ tab, setTab }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { chatList, chatSuggestions } = useSelector((state) => state.chats);
  const { user } = useSelector((state) => state.auth);
  const users = [1, 2, 3];
  return (
    <div className="chat-user-list-container m-0 p-0 w-100 d-flex flex-column bg-white">
      <div className="d-flex flex-column">
        <div
          className="d-flex align-items-center justify-content-between px-4"
          style={{ height: "60px", backgroundColor: "#e1e1e1" }}
        >
          <span className="fs-5 fw-bold">Messenger</span>
          {/* <button className="p-0">
            <IoSettingsSharp style={{ fontSize: "18px" }} />
          </button> */}
          <div className="d-flex align-items-center gap-3">
            {/*  */}
            <button
              className={`p-0 ${tab === 0 ? "text-dark" : "text-secondary"}`}
              onClick={() => setTab(0)}
            >
              <IoChatbubblesSharp className="fs-4" />
            </button>
            <button
              className={`p-0 ${tab === 1 ? "text-dark" : "text-secondary"}`}
              onClick={() => setTab(1)}
            >
              <IoPeople className="fs-3" />
            </button>
          </div>
        </div>
        <div className="scrollable chat-user-list">
          {tab === 0 ? (
            <>
              {chatList?.length >= 1
                ? chatList?.map((chat, index) => (
                    <ChatUser key={index} chat={chat} />
                  ))
                : null}
              <div className="flex-center border-bottom">
                <button
                  className="w-100 py-4 p-0 color-bronze default-hvr"
                  onClick={() => setTab(1)}
                >
                  <MdEmojiPeople className="fs-5 me-1" />
                  <span className="fs-8 fw-600">
                    Choose people you follow and send a message
                  </span>
                </button>
              </div>
              <p className="m-0 mt-5 py-5 fs-9 px-4 text-center text-secondary">
                <MdLock className="fs-7" />{" "}
                <span>Your messages are secured... Kinda *-*</span>
              </p>
            </>
          ) : (
            <div className="">
              <div className="w-100 text-center text-secondary fs-8 px-4 py-4 border-bottom">
                Send a message to people you follow
              </div>
              {chatSuggestions?.length === 0 ? (
                <div className="w-100 text-center d-flex flex-column mt-5">
                  <span className="text-secondary fs-7">
                    Looks like you don't follow anyone
                  </span>
                  <button
                    className="color-bronze fs-7"
                    onClick={() => navigate("/")}
                  >
                    Go back to feed?
                  </button>
                </div>
              ) : (
                chatSuggestions?.map((data, index) => (
                  <button
                    className="dark-hvr w-100 d-flex align-items-center gap-2 py-2 border-top px-4 pointer"
                    onClick={() => {
                      dispatch(
                        getChat({
                          username1: user?.username,
                          username2: data?.username,
                        })
                      );
                      setTab(0);
                    }}
                    key={index}
                  >
                    <img
                      src={`${process.env.REACT_APP_PUBLIC_FOLDER}/avatars/cat${data?.crrAvatar}.svg`}
                      alt="user profile"
                      width={45}
                      height={45}
                      className="pointer"
                    />
                    <span className="fs-7">{data?.username}</span>
                    {/* <span>profile desc??</span> */}
                    {/* <button className="fs-7 bg-color-bronze text-white rounded-1">
                      message
                    </button> */}
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatUserList;
