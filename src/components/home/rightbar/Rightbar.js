import React, { useState, useEffect } from "react";
import "./rightbar.css";
import { Row, Col, Input } from "reactstrap";
import { GiCat } from "react-icons/gi";
import {
  FaQuestion,
  FaRegUserCircle,
  FaSearch,
  FaUserFriends,
} from "react-icons/fa";
import { MdNotifications, MdChat } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { followUser, getSuggestedUsers } from "../../../redux/slices/userSlice";
import SuggestionsLoader from "../../loaders/SuggestionsLoader";
import axios from "axios";

const Rightbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { suggestedUsers, suggestedUsersIsLoading } = useSelector(
    (state) => state.users
  );
  const [factIsLoading, setFactIsLoading] = useState(false);
  // const [catPic, setCatPic] = useState();
  const [catFact, setCatFact] = useState({});
  const onlineFriends = [
    "Hasan Solak",
    "Charles LökLök",
    "Serhio Periz",
    "Meks Ferstapen",
    "Lan Strol",
  ];
  useEffect(() => {
    setFactIsLoading(true);
    dispatch(
      getSuggestedUsers({
        userId: user._id,
      })
    );
    axios
      .get("https://catfact.ninja/fact?maxLength='30'")
      .then((res) => setCatFact(res.data))
      .finally(() => setFactIsLoading(false));
    // axios
    //   .get("https://api.thecatapi.com/v1/images/search")
    //   .then((res) => setCatPic(res.data[0].url))
    //   .finally(() => setTimeout(() => setFactIsLoading(false), 2000));
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
        </>
      ) : null}
      {!factIsLoading ? (
        <div
          className={`${
            suggestedUsers?.length > 0 ? "mt-4" : "mt-0"
          } d-flex justify-content-center flex-column w-75`}
          style={{ padding: "8px 20px" }}
        >
          {!suggestedUsers?.length > 0 ? (
            <span className="fs-8 fw-600 text-secondary">Did you know?</span>
          ) : null}
          <div
            className="d-flex align-items-center flex-column text-center rounded-3 py-2 px-1"
            style={{ border: "2px solid rgba(0,0,0,0.1)" }}
          >
            <img
              src={`${process.env.REACT_APP_PUBLIC_FOLDER}/svg/boxcat.svg`}
              alt="user profile"
              width={90}
            />
            <p className="m-0 fs-8">
              <span className="fs-7 fw-bold">Random Cat Fact</span>
              <br />
              {catFact.fact}
            </p>
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default Rightbar;
