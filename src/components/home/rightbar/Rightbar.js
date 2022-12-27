import React, { useState, useEffect } from "react";
import "./rightbar.css";
import { Row, Col, Input } from "reactstrap";
import { GiCat } from "react-icons/gi";
import { FaRegUserCircle, FaSearch, FaUserFriends } from "react-icons/fa";
import { MdNotifications, MdChat } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { followUser, getSuggestedUsers } from "../../../redux/slices/userSlice";
import SuggestionsLoader from "../../loaders/SuggestionsLoader";

const Rightbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { suggestedUsers, suggestedUsersIsLoading } = useSelector(
    (state) => state.users
  );
  const onlineFriends = [
    "Hasan Solak",
    "Charles LökLök",
    "Serhio Periz",
    "Meks Ferstapen",
    "Lan Strol",
  ];
  useEffect(() => {
    dispatch(
      getSuggestedUsers({
        userId: user._id,
      })
    );
  }, []);
  return (
    <div
      className="rightbar m-0 px-2 pt-1"
      style={{ position: "sticky", top: "60px" }}
    >
      {suggestedUsers?.length > 0 ? (
        <>
          <div
            className="text-secondary pt-3 fs-7"
            style={{ padding: "8px 20px" }}
          >
            Suggestions For You
          </div>
          {!suggestedUsersIsLoading ? (
            suggestedUsers?.map((friend, index) => (
              <div
                key={index}
                className="w-100 p-0 rightbar-friend-col rounded-2"
              >
                <div className="rightbar-friend">
                  <div>
                    <img
                      src={`${process.env.REACT_APP_PUBLIC_FOLDER}/avatars/cat${friend?.crrAvatar}.svg`}
                      alt="user profile"
                      width={38}
                      height={38}
                      className="me-2 object-fit-cover"
                      onClick={() => navigate(`/profile/${friend?.username}`)}
                    />
                  </div>
                  <p className="m-0 fs-7 text-start me-1">
                    <span
                      onClick={() => navigate(`/profile/${friend?.username}`)}
                    >
                      {friend?.username || "User"}
                    </span>{" "}
                  </p>
                  <button
                    className="bg-color-bronze color-white rounded-1 fs-9 fw-600 px-2 ms-1 default-hvr"
                    onClick={() =>
                      dispatch(
                        followUser({
                          followingId: friend?.userId,
                          userId: user?._id,
                        })
                      )
                    }
                  >
                    follow
                  </button>
                </div>
              </div>
            ))
          ) : (
            <SuggestionsLoader />
          )}
          {/* <a className="rightbar-friend fs-7">
            <span>See More...</span>
          </a> */}
        </>
      ) : null}
    </div>
  );
};

export default Rightbar;
