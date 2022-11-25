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
  const dispatch = useDispatch();
  const [posts, setPosts] = useState(["a"]);

  const user = {};
  // const user = useSelector((state) => state.users.user);

  // useEffect(() => {
  //   dispatch(fetchUser({ userId: "638022ddbb473c7563616674" }));
  //   //6372f72ba27bb21c667a8a3f
  // }, [dispatch]);

  return (
    <div className="w-100 flex-center pb-5 m-0 bg-color-white pt-3">
      <div className="w-75-100">
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
                userId: "638022ddbb473c7563616674",
                followingId: "6372f732a27bb21c667a8a43",
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
                userId: "638022ddbb473c7563616674",
                followingId: "6372f732a27bb21c667a8a43",
              })
            )
          }
        >
          Unfollow
        </Button>
      </div>
    </div>
  );
};

export default Feed;
