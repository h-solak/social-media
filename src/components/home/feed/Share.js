import React, { useState, useEffect } from "react";
import "./feed.css";
import { Row, Col, Input, Button } from "reactstrap";
import { GiCat } from "react-icons/gi";
import { FaPaw } from "react-icons/fa";
import { MdPhotoLibrary, MdLocationPin, MdEmojiEmotions } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getTimelinePosts,
  resetPostIsShared,
  sharePost,
} from "../../../redux/slices/postSlice";
import { fetchProfile } from "../../../redux/slices/userSlice";

const Share = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const { postIsShared, postIsSharing } = useSelector((state) => state.post);
  const [isFocused, setIsFocused] = useState(false);
  const [postText, setPostText] = useState("");

  const handleSharePost = () => {
    if (postText !== "") {
      dispatch(
        sharePost({
          userId: user?._id,
          desc: postText,
          img: "",
        })
      );
    }
  };

  useEffect(() => {
    if (postIsShared) {
      setPostText("");
      dispatch(resetPostIsShared());
      if (username) {
        //if the user is on the profile page
        dispatch(fetchProfile({ username: user?.username }));
      } else {
        dispatch(getTimelinePosts({ userId: user?._id }));
      }
    }
  }, [postIsShared]);

  return (
    <div
      className={`share w-100 mb-5 px-2 bg-white shadow rounded-3 ${
        postIsSharing ? "blink-1500ms" : ""
      }`}
    >
      <div className="d-flex align-items-bottom w-100 pt-2 pb-2 pe-4">
        <img
          src={`${process.env.REACT_APP_PUBLIC_FOLDER}/avatars/cat${user?.crrAvatar}.svg`}
          alt="user profile"
          width={50}
          height={50}
          className="pointer"
          onClick={() => navigate("/profile/" + user?.username)}
        />
        <textarea
          name="post-text"
          rows="3"
          placeholder={
            !isFocused ? "So, what is on your mind?" : "Tell us about it..."
          }
          className="mt-2 border-0 w-100 px-0 ps-2 border-bottom"
          style={{ resize: "none" }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />
      </div>
      <Row className="m-0 p-0">
        <Col md="12">
          <div className="flex-align-center justify-content-between px-0 px-md-2 ps-md-4 pt-2 pb-2 w-100">
            <div className="flex-align-center">
              <button className="share-option-btn d-flex align-items-center justify-content-center gap-1 p-2 pointer rounded-2">
                <MdPhotoLibrary className="fs-4" />
                <span className="display-sm-md fs-7">Photo</span>
              </button>
              <button className="share-option-btn d-flex align-items-center justify-content-center gap-1 p-2 pointer rounded-2">
                <MdLocationPin className="fs-4" />
                <span className="display-sm-md fs-7">Location</span>
              </button>
              <button className="share-option-btn d-flex align-items-center justify-content-center gap-1 p-2 pointer rounded-2">
                <MdEmojiEmotions className="fs-4" />
                <span className="display-sm-md fs-7">Feelings</span>
              </button>
            </div>
            {postText.length > 0 ? (
              <>
                {postIsSharing ? (
                  <div
                    className="p-2 flex-center"
                    style={{
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <FaPaw className="fs-5 rotate-infinite" />
                  </div>
                ) : (
                  <button
                    className="share-btn px-4 p-1 border-0 fs-7 color-white rounded-2 bg-color-green flex-center fw-600"
                    onClick={handleSharePost}
                  >
                    Share
                  </button>
                )}
              </>
            ) : (
              <>
                {postIsSharing ? (
                  <FaPaw className="rotate-infinite" />
                ) : (
                  <button
                    className="share-btn px-3 p-1 border-0 fs-7 color-white rounded-2 bg-color-green flex-center fw-600"
                    disabled
                  >
                    Share
                  </button>
                )}
              </>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Share;
