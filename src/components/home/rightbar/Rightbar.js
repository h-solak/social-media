import React, { useState } from "react";
import "./rightbar.css";
import { Row, Col, Input } from "reactstrap";
import { GiCat } from "react-icons/gi";
import { FaRegUserCircle, FaSearch, FaUserFriends } from "react-icons/fa";
import { MdNotifications, MdChat } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Rightbar = () => {
  const onlineFriends = [
    "Hasan Solak",
    "Charles LökLök",
    "Serhio Periz",
    "Meks Ferstapen",
    "Lan Strol",
    "Tırın Tırın Tırınının",
    "Can Afacan Şaklaban",
    "Hehehe",
    "Br",
    "Sji",
    "Sji",
    "Sji",
    "Sji",
  ];
  return (
    <div
      className="rightbar m-0 px-2 pt-3"
      style={{ position: "sticky", top: "60px" }}
    >
      {onlineFriends?.length > 0 ? (
        <>
          <div className="text-secondary pt-3" style={{ padding: "8px 20px" }}>
            Online Friends
          </div>
          {onlineFriends?.map((friend, index) => (
            <button
              key={index}
              className="w-100 p-0 rightbar-friend-col rounded-2"
            >
              <div className="rightbar-friend">
                <div>
                  <img
                    src={
                      index % 2 === 0
                        ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_EDUQgxKx6lHhz0OoU2LGsO-6Lg_YyjyU7Q&usqp=CAU"
                        : "https://i.pinimg.com/736x/9f/55/39/9f5539be3ffa77b7a7bc09c4bfcccd8d.jpg"
                    }
                    alt="User Profile"
                    width={38}
                    height={38}
                    className="online-friend-pic rounded-circle"
                  />
                  <div
                    className="friend-online-status"
                    style={{ backgroundColor: "rgb(63, 252, 63)" }}
                  ></div>
                </div>
                <span className="text-start">{friend}</span>
              </div>
            </button>
          ))}
          <a className="rightbar-friend">
            <span>See More...</span>
          </a>
        </>
      ) : null}
    </div>
  );
};

export default Rightbar;
