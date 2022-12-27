import React, { useState, useEffect } from "react";
import "./feed.css";
import { Row, Col, Input, Button } from "reactstrap";
import axios from "axios";
import Share from "./Share";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePosts } from "../../../redux/slices/postSlice";
import { BsArrowUp } from "react-icons/bs";
import PostLoader from "../../loaders/PostLoader";
const Feed = () => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState(["a"]);

  const user = useSelector((state) => state.auth.user);
  const { timelinePosts, timelineIsLoading } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    dispatch(getTimelinePosts({ userId: user?._id }));
  }, [dispatch]);

  return (
    <div className="w-100 flex-center pb-5 m-0 bg-color-white pt-1">
      <div className="w-75-100 mt-2">
        <Row>
          <Share />
          {!timelineIsLoading ? (
            <>
              {timelinePosts?.length > 0
                ? timelinePosts?.map((post, index) => (
                    <Post key={index} postContent={post} />
                  ))
                : null}
            </>
          ) : (
            <>
              <PostLoader />
              <PostLoader />
              <PostLoader />
            </>
          )}

          {timelinePosts?.length > 3 ? (
            <p
              className="b-0 text-center text-secondary fs-7 default"
              style={{ marginTop: "100px" }}
            >
              Looks like there is nothing else to see. <br />
              <button
                className="color-bronze hvr-underline"
                onClick={() => {
                  dispatch(getTimelinePosts({ userId: user?._id }));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Refresh the timeline
              </button>
              or just
              <br />
              <button
                className="color-bronze hvr-underline"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                go back to top
              </button>
            </p>
          ) : (
            <>
              {!timelinePosts ||
                (timelinePosts?.length === 0 && (
                  <img
                    src={
                      process.env.REACT_APP_PUBLIC_FOLDER +
                      "/svg/notfoundcatfood.svg"
                    }
                    alt="Logo"
                    height="100"
                    style={{ marginTop: "75px" }}
                  />
                ))}
              <p
                className="b-0 text-center text-secondary fs-7 default"
                style={
                  !timelinePosts || timelinePosts?.length === 0
                    ? { marginTop: "0px" }
                    : { marginTop: "100px" }
                }
              >
                Looks like there is nothing{" "}
                {!timelinePosts || timelinePosts?.length === 0 ? null : "else"}
                to see. <br />
                <button
                  className="color-bronze hvr-underline"
                  onClick={() => {
                    dispatch(getTimelinePosts({ userId: user?._id }));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Refresh the timeline
                </button>
              </p>
            </>
          )}
        </Row>
      </div>
    </div>
  );
};

export default Feed;
