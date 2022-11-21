import React, { useState, useEffect } from "react";
import "./feed.css";
import { Row, Col, Input, Button } from "reactstrap";
import axios from "axios";
import Share from "./Share";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUser,
  followUser,
  unfollowUser,
} from "../../../redux/slices/userSlice";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const user = useSelector((state) => state.users.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser({ userId: "6372f732a27bb21c667a8a43" }));
    //6372f72ba27bb21c667a8a3f
  }, [dispatch]);

  return (
    <div className="pb-5 m-0 px-2 px-md-5 bg-color-white pt-3">
      <Share />
      {posts?.length > 0 &&
        posts?.map((post, index) => <Post key={index} post={post} />)}
      <Row className="p-3 text-success mt-5">USER: {user?.username}</Row>
      <Row className="p-3 text-success mt-5">
        Followings: {user?.followings}
      </Row>
      <Button
        color="primary"
        onClick={() =>
          dispatch(
            followUser({
              userId: "6372f732a27bb21c667a8a43",
              followingId: "6372f72ba27bb21c667a8a3f",
            })
          )
        }
      >
        Follow
      </Button>
      <Button
        color="danger"
        onClick={() =>
          dispatch(
            unfollowUser({
              userId: "6372f732a27bb21c667a8a43",
              followingId: "6372f72ba27bb21c667a8a3f",
            })
          )
        }
      >
        Unfollow
      </Button>
    </div>
  );
};

export default Feed;
