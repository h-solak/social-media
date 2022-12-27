import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import Share from "../../components/home/feed/Share";
import Post from "../../components/home/feed/Post";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProfile,
  followUser,
  unfollowUser,
} from "../../redux/slices/userSlice";
import { getProfilePosts } from "../../redux/slices/postSlice";
import { useNavigate, useParams } from "react-router-dom";
import { MdEdit, MdLocationCity, MdHome } from "react-icons/md";
import { RiHomeHeartFill } from "react-icons/ri";
import { FaBirthdayCake } from "react-icons/fa";
import ChangeAvatar from "../../components/profile/ChangeAvatar";
import moment from "moment";
import PostLoader from "../../components/loaders/PostLoader";

const Profile = ({ crrProfile, user, isOtherProfile, profileIsLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username } = useParams();
  const [avatarModal, setAvatarModal] = useState(false);
  const [pickedAvatar, setPickedAvatar] = useState(0);
  return (
    <div className="w-100">
      <div className="profile-top flex-center flex-column">
        <img
          src="https://images.pexels.com/photos/3078831/pexels-photo-3078831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="cover"
          className="w-100 pointer object-fit-cover"
          style={{
            maxHeight: "25vh",
            backgroundPosition: "center",
            backgroundSize: "contains",
          }}
        />

        <div
          style={{
            position: "relative",
            marginTop: "-100px",
            borderRadius: "12px 12px 0px 0px",
          }}
        >
          <img
            src={
              crrProfile
                ? `${process.env.REACT_APP_PUBLIC_FOLDER}/avatars/cat${crrProfile?.crrAvatar}.svg`
                : `${process.env.REACT_APP_PUBLIC_FOLDER}/avatars/unknowncat.svg`
            }
            alt="user profile"
            width={150}
            height={150}
            className="pointer changeable-profile-pic"
          />
          {!isOtherProfile && crrProfile?.username ? (
            <button
              className="change-profile-pic text-end align-items-center justify-content-end"
              style={{
                bottom: "0px",
                left: "0px",
                zIndex: "999",
                width: "150px",
              }}
              onClick={() => setAvatarModal(true)}
            >
              <div className="cam-icon-wrapper p-2 rounded-circle bg-white flex-center">
                <MdEdit className="fs-4" />
              </div>
            </button>
          ) : null}
        </div>
        <span className="fw-bold fs-6 default">
          {crrProfile?.username ? (
            `@${crrProfile?.username}`
          ) : (
            <p className="m-0 fw-bold fs-7 text-secondary">
              ? <span className="fs-4">ฅ^•ﻌ•^ฅ</span> ?
            </p>
          )}
        </span>
        {crrProfile && (
          <>
            <span className="fs-7 text-secondary flex-center gap-1 default pb-2">
              {crrProfile?.desc || "Hi, there! I am using SociableCat."}
            </span>
            {isOtherProfile && (
              <div className="mb-3 flex-center gap-2">
                {crrProfile?.followers?.includes(user?._id) ? (
                  <button
                    className="bg-color-bronze text-white rounded-3 px-2 py-1 fs-7 fw-600"
                    style={{ width: "100px" }}
                    onClick={() =>
                      dispatch(
                        unfollowUser({
                          followingId: crrProfile?._id,
                          userId: user?._id,
                        })
                      )
                    }
                    title="Unfollow"
                  >
                    Following
                  </button>
                ) : (
                  <button
                    className="bg-color-bronze text-white rounded-3 px-2 py-1 fs-7 fw-600"
                    style={{ width: "100px" }}
                    onClick={() =>
                      dispatch(
                        followUser({
                          followingId: crrProfile?._id,
                          userId: user?._id,
                        })
                      )
                    }
                  >
                    Follow
                  </button>
                )}
                <button
                  className=" text-white rounded-3 px-2 py-1 fs-7 fw-600"
                  style={{ width: "100px", background: "rgba(0,0,0,0.3)" }}
                >
                  Message
                </button>
              </div>
            )}
          </>
        )}
        {crrProfile && (
          <div className="d-flex align-items-center gap-3 py-2 border-top border-bottom">
            <div className="user-profile-stats flex-center flex-column gap-0 pointer">
              <span className="fw-bold fs-7">
                {crrProfile?.posts?.length || "0"}
              </span>
              <span className="fs-8">Posts</span>
            </div>
            <div className="user-profile-stats flex-center flex-column gap-0 pointer">
              <span className="fw-bold fs-7">
                {crrProfile?.followers?.length || "0"}
              </span>
              <span className="fs-8">Followers</span>
            </div>
            <div className="user-profile-stats flex-center flex-column gap-0 pointer">
              <span className="fw-bold fs-7">
                {crrProfile?.followings?.length || "0"}
              </span>
              <span className="fs-8">Followings</span>
            </div>
          </div>
        )}
      </div>
      {crrProfile && (
        <Row className="m-0 p-0 mt-5">
          {/* On smaller screen it has to be on the top, in large screens it is on the right */}
          {/* <Col sm="12" md="0">
        İnfo
      </Col> */}
          <Col sm="12" md="8" className="pt-3 p-0 mb-5 px-4 px-sm-5">
            <Row className="m-0 p-0">
              {!isOtherProfile ? (
                <Col sm="12" className="p-0">
                  <Share />
                </Col>
              ) : null}
              {!profileIsLoading ? (
                crrProfile?.posts?.map((post, index) => (
                  <Col sm="12" className="p-0" key={index}>
                    <Post postContent={post} />
                  </Col>
                ))
              ) : (
                <PostLoader />
              )}
            </Row>
          </Col>
          <Col
            sm="12"
            md="4"
            className="profile-rightbar pt-3 px-2"
            style={{ position: "sticky", top: "60px" }}
          >
            <Row className="m-0 p-0">
              <Col sm="12" className="fw-600 fs-7">
                About
              </Col>
              <Col sm="12" className="flex-align-center gap-2 mt-2">
                <MdLocationCity className="fs-5" />
                <span className="fs-7">Istanbul</span>
              </Col>
              {/* <p className="flex-align-center gap-2">
          <MdHome className="fs-5" />
          <span>Adana</span>
        </p> */}
              <Col sm="12" className="flex-align-center gap-2 mt-2">
                <RiHomeHeartFill className="fs-5" />
                <span className="fs-7">Single</span>
              </Col>
              <Col sm="12" className="flex-align-center gap-2 mt-2">
                <FaBirthdayCake className="" />
                <span className="fs-7">01.09.2001</span>
              </Col>
              <Col sm="12" className="text-secondary fs-7 mt-2">
                Joined {moment(crrProfile?.createdAt).fromNow()}
              </Col>
            </Row>
          </Col>
        </Row>
      )}
      {!crrProfile && (
        <Row className="m-0 p-0 mt-5 pt-5 justify-content-center text-center">
          <div className="flex-center flex-column gap-1">
            <img
              src={
                process.env.REACT_APP_PUBLIC_FOLDER + "/svg/scratchingrope.svg"
              }
              alt="user profile"
              width={75}
              height={75}
              className="rounded-2"
            />
            <p className="text-secondary mt-2">
              There is no cat named <span className="fw-bold">{username}</span>{" "}
              <br />
              <button
                className="color-bronze hvr-underline"
                onClick={() => navigate("/profile/" + user?.username)}
              >
                Go Back
              </button>
            </p>
          </div>
        </Row>
      )}
      <ChangeAvatar
        avatarModal={avatarModal}
        setAvatarModal={setAvatarModal}
        user={user}
        pickedAvatar={pickedAvatar}
        setPickedAvatar={setPickedAvatar}
      />
    </div>
  );
};

export default Profile;
