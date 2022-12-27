import React, { useState, useEffect } from "react";
import "./sidebar.css";
import { Row, Col, Input } from "reactstrap";
import { GiCat } from "react-icons/gi";
import { FaCat, FaSearch, FaUserFriends } from "react-icons/fa";
import {
  MdNotifications,
  MdChat,
  MdBookmark,
  MdGroups,
  MdPerson,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const friends = [
    "Eheheh",
    "Eheheh",
    "Eheheh",
    "Eheheh",
    "Eheheh",
    "Eheheh",
    "Eheheh",
    "Eheheh",
  ];
  return (
    <div
      className="m-0 border-end pt-1 sidebar flex-column"
      style={{ position: "sticky", top: "60px" }}
    >
      <button
        className="w-100 p-0 sidebar-col"
        onClick={() => {
          navigate("/");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <div className="sidebar-item">
          <FaCat className="fs-4" />
          <span>Feed</span>
        </div>
      </button>
      <button
        className="w-100 p-0 sidebar-col"
        onClick={() => {
          navigate("/messenger");
        }}
      >
        <div className="sidebar-item">
          <MdChat className="fs-4" />
          <span>Chats</span>
        </div>
      </button>
      <button className="w-100 p-0 sidebar-col">
        <div className="sidebar-item">
          <MdGroups className="fs-4" />
          <span>Groups</span>
        </div>
      </button>
      <button className="w-100 p-0 sidebar-col">
        <div className="sidebar-item">
          <MdBookmark className="fs-4" />
          <span>Bookmarks</span>
        </div>
      </button>
      <button
        className="w-100 p-0 mb-3 sidebar-col"
        onClick={() => {
          navigate("/profile/" + user?.username);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <div className="sidebar-item">
          <MdPerson className="fs-4" />
          <span>Your Profile</span>
        </div>
      </button>
      {friends?.length > 0 ? (
        <>
          <div
            className="text-secondary pt-3 border-top"
            style={{ padding: "8px 20px" }}
          >
            Friends
          </div>
          {friends?.map((friend, index) => (
            <button key={index} className="w-100 p-0 sidebar-friend-col">
              <div className="sidebar-friend">
                <img
                  src={
                    process.env.REACT_APP_PUBLIC_FOLDER + "/svg/noavatar.svg"
                  }
                  alt="user profile"
                  width={38}
                  height={38}
                  className="online-friend-pic rounded-circle object-fit-cover"
                />
                {index < 3 && (
                  <div
                    className="friend-online-status"
                    style={{ backgroundColor: "rgb(63, 252, 63)" }}
                  ></div>
                )}
                <span className="fw-600 fs-7">{friend}</span>
              </div>
            </button>
          ))}
          <button className="sidebar-more-opt hvr-underline">
            <span>See More...</span>
          </button>
        </>
      ) : null}
    </div>
  );
};

export default Sidebar;
