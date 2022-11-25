import React, { useState } from "react";
import "./rightbar.css";
import { Row, Col, Input } from "reactstrap";
import { GiCat } from "react-icons/gi";
import { FaRegUserCircle, FaSearch, FaUserFriends } from "react-icons/fa";
import { MdNotifications, MdChat } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Rightbar = () => {
  const navigate = useNavigate();
  const onlineFriends = [
    "Hasan Solak",
    "Charles LökLök",
    "Serhio Periz",
    "Meks Ferstapen",
    "Lan Strol",
  ];
  return (
    <div
      className="rightbar m-0 px-2 pt-3"
      style={{ position: "sticky", top: "60px" }}
    >
      {onlineFriends?.length > 0 ? (
        <>
          <div
            className="text-secondary pt-3 fs-7"
            style={{ padding: "8px 20px" }}
          >
            Suggestions For You
          </div>
          {onlineFriends?.map((friend, index) => (
            <div
              key={index}
              className="w-100 p-0 rightbar-friend-col rounded-2"
            >
              <div className="rightbar-friend">
                <div>
                  <img
                    src={
                      process.env.REACT_APP_PUBLIC_FOLDER + "/svg/noavatar.svg"
                    }
                    alt="user profile"
                    width={38}
                    height={38}
                    className="rounded-circle me-2 object-fit-cover"
                  />
                </div>
                <p className="m-0 fs-7 text-start me-1">
                  <span onClick={() => navigate("b")}>{friend}</span>{" "}
                </p>
                <button
                  className="display-sm-md color-bronze fs-8 hvr-underline fw-600"
                  onClick={() => navigate("a")}
                >
                  follow
                </button>
              </div>
            </div>
          ))}
          <a className="rightbar-friend fs-7">
            <span>See More...</span>
          </a>
        </>
      ) : null}
    </div>
  );
};

export default Rightbar;
