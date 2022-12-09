import React, { useState } from "react";
import "./feed.css";
import {
  Row,
  Col,
  Input,
  Button,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { HiHeart } from "react-icons/hi";
import {
  MdThumbUpAlt,
  MdThumbUpOffAlt,
  MdOutlineThumbsUpDown,
  MdLocationPin,
  MdEmojiEmotions,
  MdInsertComment,
  MdOutlineComment,
  MdMoreHoriz,
  MdBookmark,
  MdBookmarkBorder,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import darkToast from "../../../helpers/darkToast";
import { format } from "timeago.js";
import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "../../../redux/slices/postSlice";

const Post = ({ postContent }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isFocused, setIsFocused] = useState(false);
  const [isLiked, setIsLiked] = useState(false); //for testing
  const [isCommentLiked, setIsCommentLiked] = useState(false); //for testing
  const [isCommentsOpen, setIsCommentsOpen] = useState(false); //for testing
  const [isBookmarked, setIsBookmarked] = useState(false); //for testing
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
      <div className="w-100 pt-2 px-3 d-flex align-items-start flex-column">
        <div className="w-100 flex-between">
          <div className="flex-align-center gap-1">
            <img
              src={process.env.REACT_APP_PUBLIC_FOLDER + "/svg/noavatar.svg"}
              alt="user profile"
              width={45}
              height={45}
              className="fs-8 rounded-circle pointer"
              onClick={() => navigate("/profile/" + postContent?.userId)}
            />
            <div className="d-flex align-items-start flex-column px-2">
              <p className="m-0 fs-7 fw-600 default">
                {postContent?.username || "User"}
                {user?._id !== postContent?.userId && (
                  <button className="fs-8 fw-bold text-secondary hvr-underline">
                    following
                  </button>
                )}
              </p>
              <span className="fs-8 text-secondary default">
                {format(postContent?.createdAt, "en_US")}
              </span>
            </div>
          </div>
          {/* <button className="post-more-btn p-1 rounded-circle flex-center">
            
          </button> */}
          <Dropdown
            isOpen={dropdownOpen}
            toggle={() => setDropdownOpen(!dropdownOpen)}
            // onMouseOver={() => setDropdownOpen(true)}
            // onMouseLeave={() => setDropdownOpen(false)}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="border-0"
          >
            <DropdownToggle className="p-0 bg-transparent border-0">
              <MdMoreHoriz className="fs-4 text-dark" />
            </DropdownToggle>
            <DropdownMenu className="">
              <DropdownItem
                className="d-flex align-items-center gap-2"
                onClick={() => navigate("/profile/" + postContent?.userId)}
              >
                {/* <IoPerson className="" style={{ fontSize: "18px" }} /> */}
                <span className="fs-7">
                  {" "}
                  {postContent?.userId !== user._id
                    ? "Visit Profile"
                    : "Your Profile"}
                </span>
              </DropdownItem>

              {postContent?.userId === user._id ? (
                <DropdownItem
                  className="d-flex align-items-center gap-2"
                  onClick={() => {
                    dispatch(
                      deletePost({
                        postId: postContent?._id,
                        userId: user._id,
                      })
                    );
                  }}
                >
                  {/* <IoLogOut className="" style={{ fontSize: "18px" }} /> */}
                  <span className="fs-7">Delete</span>
                </DropdownItem>
              ) : null}
            </DropdownMenu>
          </Dropdown>
        </div>
        <p className="m-0 w-100 mt-2" style={{ wordWrap: "break-word" }}>
          {postContent?.desc}
        </p>
      </div>

      {/* For Testing */}
      {postContent?.img !== "" ? (
        <img
          src="https://images.pexels.com/photos/4509131/pexels-photo-4509131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className="pt-2 w-100 rounded-0"
          alt="Post"
        />
      ) : null}

      <Row className="m-0 p-0">
        <Col md="12" className="mt-0">
          <div className="flex-align-center justify-content-between pt-2 pb-2 w-100">
            <div className="flex-align-center gap-2">
              <button
                className="flex-align-center gap-2 py-2 post-option pointer rounded-2"
                onClick={() => setIsLiked(!isLiked)}
              >
                {isLiked ? (
                  <MdThumbUpAlt className="fs-5 text text-primary" />
                ) : (
                  <MdThumbUpOffAlt className="fs-5 text" />
                )}
                <span className="fs-7">{postContent?.likes?.length}</span>
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
                <span className="fs-7">{postContent?.comments?.length}</span>
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
              <Col
                key={index}
                md="12"
                className="p-2 px-3 d-flex align-items-start gap-0"
              >
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
