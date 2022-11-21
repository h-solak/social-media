import React, { useState } from "react";
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

const Sidebar = () => {
  const navigate = useNavigate();
  const friends = [
    "Hasan Solak",
    "Charles LökLök",
    "Serhio Periz",
    "Meks Ferstapen",
    "Lan Strol",
    "Tırın Tırın Tırınının",
    "Can Afacan Şaklaban",
  ];
  return (
    <div
      className="m-0 border-end pt-3 sidebar flex-column"
      style={{ position: "sticky", top: "60px" }}
    >
      <button className="w-100 p-0 sidebar-col" onClick={() => navigate("/")}>
        <div className="sidebar-item">
          <FaCat className="fs-4" />
          <span>Feed</span>
        </div>
      </button>
      <button className="w-100 p-0 sidebar-col">
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
        onClick={() => navigate("/profile")}
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
                    index % 2 === 0
                      ? "https://64.media.tumblr.com/b20bb85bb940bed0622a0ddba3a9a58d/de443792292e6eb6-cf/s1280x1920/77ec6205df077c9d335afe1920fe81639720c877.jpg"
                      : "https://images.news18.com/ibnlive/uploads/2021/12/lewis-hamilton-formula-1.jpg"
                  }
                  alt="User Profile"
                  width={38}
                  height={38}
                  className="rounded-circle"
                />
                <span>{friend}</span>
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
