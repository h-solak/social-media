import React, { useState, useEffect } from "react";
import "./rightbar.css";
import { Row, Col, Input, Tooltip } from "reactstrap";
import { GiCat } from "react-icons/gi";
import {
  FaQuestion,
  FaRegUserCircle,
  FaSearch,
  FaUserFriends,
} from "react-icons/fa";
import { BiShuffle } from "react-icons/bi";
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
  const [shuffleTooltip, setShuffleTooltip] = useState(false);
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

  const shuffleCatFact = (isFirst) => {
    if (!isFirst) {
      //don't show the animation effect on page start
      setFactIsLoading(true);
    }
    axios
      .get("https://catfact.ninja/fact?maxLength='30'")
      .then((res) => setCatFact(res.data))
      .finally(() =>
        setTimeout(() => setFactIsLoading(false), 500)
      ); /* Delayed for animation */
  };
  useEffect(() => {
    dispatch(
      getSuggestedUsers({
        userId: user._id,
      })
    );
    shuffleCatFact(true);

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
            suggestedUsers?.map((sugUser, index) => (
              <div
                key={index}
                className="w-75-to-100 p-0 rightbar-friend-col rounded-2"
              >
                <div className="rightbar-friend">
                  <div className="d-flex align-items-center gap-sm-0 gap-md-1">
                    <img
                      src={`${process.env.REACT_APP_PUBLIC_FOLDER}/avatars/cat${sugUser?.crrAvatar}.svg`}
                      alt="user profile"
                      width={34}
                      height={34}
                      className="me-2 object-fit-cover"
                      onClick={() => navigate(`/profile/${sugUser?.username}`)}
                    />
                    <span
                      className="fs-8 fw-600"
                      onClick={() => navigate(`/profile/${sugUser?.username}`)}
                    >
                      {sugUser?.username || "User"}
                    </span>
                  </div>

                  <button
                    className="bg-color-bronze color-white rounded-1 fs-9 fw-600 px-2 default-hvr ms-2"
                    onClick={() =>
                      dispatch(
                        followUser({
                          followingId: sugUser?.userId,
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
      <div
        className={`${
          suggestedUsers?.length > 0 ? "mt-4" : "mt-0"
        } w-100 d-flex align-items-start justify-content-center flex-column pb-4`}
        style={{ padding: "8px 20px" }}
      >
        {!suggestedUsers?.length > 0 ? (
          <span className="fs-8 fw-600 text-secondary">Did you know?</span>
        ) : null}
        <div
          className="w-75-to-100 cat-fact-container d-flex align-items-center flex-column rounded-3 py-2 px-1"
          style={{
            border: "2px solid rgba(0,0,0,0.1)",
            position: "relative",
          }}
        >
          <img
            className={`${factIsLoading ? "bounce pointer" : "pointer"}`}
            src={`${process.env.REACT_APP_PUBLIC_FOLDER}/svg/boxcat.svg`}
            alt="user profile"
            width={90}
            onClick={() => shuffleCatFact()}
          />
          <button
            id="shuffle-btn"
            className="fact-shuffle m-1"
            onClick={() => shuffleCatFact()}
            style={{ position: "absolute", top: "0", right: "0" }}
          >
            <BiShuffle />
          </button>
          <span className="fs-7 fw-bold">Random Cat Fact</span>
          <p className="m-0 fs-8 px-2" style={{ textAlign: "justify" }}>
            &nbsp;{catFact.fact}
          </p>
        </div>
      </div>
      <Tooltip
        className=""
        isOpen={shuffleTooltip}
        target="shuffle-btn"
        toggle={() => setShuffleTooltip(!shuffleTooltip)}
      >
        <span className="fs-8">Shuffle</span>
      </Tooltip>
    </div>
  );
};

export default Rightbar;
