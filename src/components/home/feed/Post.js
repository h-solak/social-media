import React, { useState } from "react";
import "./feed.css";
import { Row, Col, Input, Button } from "reactstrap";
import { HiHeart } from "react-icons/hi";
import {
  MdThumbUpAlt,
  MdThumbUpOffAlt,
  MdOutlineThumbsUpDown,
  MdLocationPin,
  MdEmojiEmotions,
  MdInsertComment,
  MdOutlineComment,
  MdMoreVert,
  MdBookmark,
  MdBookmarkBorder,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import darkToast from "../../../helpers/darkToast";
import { format } from "timeago.js";

const Post = () => {
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const [isLiked, setIsLiked] = useState(false); //for testing
  const [isCommentLiked, setIsCommentLiked] = useState(false); //for testing
  const [isCommentsOpen, setIsCommentsOpen] = useState(false); //for testing
  const [isBookmarked, setIsBookmarked] = useState(false); //for testing
  const comments = [
    "Ahh... Sainz, you should drive it on the track, get out of the sand 😳 ",
    "We will comeback stronger! 💪💪💪",
    "No way, you will ALWAYS suck... F*ck you Binotto! And also f*ck you too Max. Should have given the position to Perez WHILE YOU CAN!",
  ];
  return (
    <div
      className="share w-100 mt-5 bg-white shadow"
      style={{ borderRadius: "12px 12px 12px 12px" }}
    >
      <div className="flex-between p-2 px-3">
        <div className="flex-align-center gap-1">
          <img
            src={process.env.REACT_APP_PUBLIC_FOLDER + "/svg/noavatar.svg"}
            alt="user profile"
            width={45}
            height={45}
            className="rounded-circle"
          />
          <div className="d-flex align-items-start flex-column px-2">
            <span className="fs-7 fw-600 default">Charles Leclerc</span>
            <span className="fs-8 text-secondary default">5 hours ago</span>
          </div>
        </div>
        <button className="post-more-btn p-1 rounded-circle flex-center">
          <MdMoreVert className="fs-4" />
        </button>
      </div>
      <img
        src="https://cdn-1.motorsport.com/images/amp/6VRJjgw6/s1000/charles-leclerc-ferrari-f1-75-.jpg"
        className="w-100 rounded-0"
        alt="Post"
      />
      <Row className="m-0 p-0 mt-1">
        <Col md="12" className="px-4 flex-between py-1">
          <div className="flex-align-center gap-1">
            <MdThumbUpAlt className="fs-6 text-primary" />
            <span className="fs-7">37</span>
          </div>
          <span
            className="fs-7 hvr-underline pointer"
            onClick={() => setIsCommentsOpen(!isCommentsOpen)}
          >
            4 comments
          </span>
        </Col>
        <Col md="12" className="border-top mt-2">
          <div className="flex-align-center justify-content-between px-2 pt-2 pb-2 w-100">
            <div className="flex-align-center gap-2">
              <button
                className="flex-align-center gap-2 p-2 post-option pointer rounded-2"
                onClick={() => setIsLiked(!isLiked)}
              >
                {isLiked ? (
                  <MdThumbUpAlt className="fs-5 text text-primary" />
                ) : (
                  <MdThumbUpOffAlt className="fs-5 text" />
                )}
                Like
              </button>
              <button
                className="flex-align-center gap-2 p-2 post-option pointer rounded-2"
                onClick={() => setIsCommentsOpen(!isCommentsOpen)}
              >
                {isCommentsOpen ? (
                  <MdInsertComment className="fs-5" />
                ) : (
                  <MdOutlineComment className="fs-5" />
                )}
                Comment
              </button>
            </div>
            <button
              className="bookmark"
              onClick={() => {
                if (!isBookmarked) {
                  darkToast(
                    <span
                      className="pointer"
                      onClick={() => navigate("/bookmarks")}
                    >
                      Saved to Bookmarks
                    </span>,
                    <img
                      src={`${process.env.REACT_APP_PUBLIC_FOLDER}/svg/icons/bookmark.svg`}
                      alt="Icon"
                      width={20}
                      height={20}
                      className="rounded-circle"
                    />,
                    "bottom-center"
                  );
                } else {
                  darkToast(
                    <span
                      className="pointer"
                      onClick={() => navigate("/bookmarks")}
                    >
                      "Removed from Bookmarks"
                    </span>,

                    <img
                      src={`${process.env.REACT_APP_PUBLIC_FOLDER}/svg/icons/bookmark.svg`}
                      alt="Icon"
                      width={20}
                      height={20}
                      className="rounded-circle"
                    />,
                    "bottom-center"
                  );
                }
                setIsBookmarked(!isBookmarked);
              }}
            >
              {!isBookmarked ? (
                <MdBookmarkBorder className="fs-4" />
              ) : (
                <MdBookmark className="fs-4" />
              )}
            </button>
          </div>
        </Col>
        {comments?.length > 0 && isCommentsOpen ? (
          <Row className="m-0 px-0 border-top py-2">
            {comments?.map((comment, index) => (
              <Col md="12" className="p-2 px-4 d-flex align-items-start gap-0">
                <div className="flex-align-center gap-2">
                  <img
                    src={
                      "https://i.pinimg.com/736x/b1/e6/7a/b1e67ab0d2ff569d6c43449556699394.jpg"
                    }
                    alt="comment profile"
                    width={40}
                    height={40}
                    className="rounded-circle"
                  />
                </div>
                <div className="d-flex align-items-start flex-column px-2">
                  <div className="fs-7 d-flex align-items-start flex-column gap-0">
                    <span className="fw-600 fs-7 pointer">ChecoPerez</span>
                    <span className="fs-7" style={{ marginTop: "-1px" }}>
                      {comment}
                    </span>
                  </div>
                  <div className="flex-align-center">
                    <button
                      className={`fs-8 p-0 fw-600 hvr-underline ${
                        isCommentLiked ? "text-primary" : "text-secondary"
                      }`}
                      onClick={() => setIsCommentLiked(!isCommentLiked)}
                    >
                      like
                    </button>
                    <button className="fs-8 text-secondary px-2 fw-600 hvr-underline">
                      reply
                    </button>
                    <span className="fs-8 text-secondary px-1 fw-500">7m</span>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        ) : null}
      </Row>
    </div>
  );
};

export default Post;
