import React, { useState } from "react";
import "./feed.css";
import { Row, Col, Input, Button } from "reactstrap";
import { GiCat } from "react-icons/gi";
import { FaRegUserCircle, FaSearch, FaUserFriends } from "react-icons/fa";
import { MdPhotoLibrary, MdLocationPin, MdEmojiEmotions } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sharePost } from "../../../redux/slices/postSlice";

const Share = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
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
  return (
    <div className="share w-100 mt-3 px-2 bg-white shadow rounded-3">
      <div className="d-flex align-items-bottom w-100 pt-2 pb-2">
        <img
          src={process.env.REACT_APP_PUBLIC_FOLDER + "/svg/noavatar.svg"}
          alt="user profile"
          width={50}
          height={50}
          className="rounded-circle"
        />
        <textarea
          name="post-text"
          rows="3"
          placeholder={
            !isFocused ? "So, what is on your mind?" : "Tell us about it..."
          }
          className="mt-2 border-0 w-100 px-3 border-bottom"
          style={{ resize: "none" }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />
      </div>
      <Row className="m-0 p-0">
        <Col md="12">
          <div className="flex-align-center justify-content-between px-0 px-md-2 pt-2 pb-2 w-100">
            <div className="flex-align-center">
              <div className="d-flex align-items-center justify-content-center gap-1 p-2 share-option pointer rounded-2">
                <MdPhotoLibrary className="fs-3" />
                <span className="display-sm-md">Photo</span>
              </div>
              <div className="d-flex align-items-center justify-content-center gap-1 p-2 share-option pointer rounded-2">
                <MdLocationPin className="fs-3" />
                <span className="display-sm-md">Location</span>
              </div>
              <div className="d-flex align-items-center justify-content-center gap-1 p-2 share-option pointer rounded-2">
                <MdEmojiEmotions className="fs-3" />
                <span className="display-sm-md">Feelings</span>
              </div>
            </div>
            <button
              className="share-btn px-3 p-1 border-0 color-white rounded-2 bg-color-green"
              onClick={handleSharePost}
            >
              Share
            </button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Share;
