import React, { useState, useEffect } from "react";
import "./feed.css";
import { Row, Col, Input, Button } from "reactstrap";
import axios from "axios";
import Share from "./Share";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePosts } from "../../../redux/slices/postSlice";
const Feed = () => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState(["a"]);

  const user = useSelector((state) => state.auth.user);
  const timelinePosts = useSelector((state) => state.post.timelinePosts);

  useEffect(() => {
    dispatch(getTimelinePosts({ userId: user?._id }));
  }, [dispatch]);

  return (
    <div className="w-100 flex-center pb-5 m-0 bg-color-white pt-3">
      <div className="w-75-100">
        <Share />
        {timelinePosts?.length > 0 &&
          timelinePosts?.map((post, index) => (
            <Post key={index} postContent={post} />
          ))}
        <Row className="p-3 text-success mt-5">USER: {user?.username}</Row>
        <Row className="p-3 text-success mt-5">
          Followings: {user?.followings}
        </Row>
      </div>
    </div>
  );
};

export default Feed;
