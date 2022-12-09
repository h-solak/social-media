import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import Share from "../../components/home/feed/Share";
import Post from "../../components/home/feed/Post";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile } from "../../redux/slices/userSlice";
import { getProfilePosts } from "../../redux/slices/postSlice";
import { useParams } from "react-router-dom";
import { MdPhotoCamera, MdLocationCity, MdHome } from "react-icons/md";
import { RiHomeHeartFill } from "react-icons/ri";
import { FaBirthdayCake } from "react-icons/fa";
const Profile = ({ crrProfile, user }) => {
  const dispatch = useDispatch();
  const crrProfileId = useParams();

  const friends = [
    "User",
    "User",
    "User",
    "User",
    "User",
    "User",
    "User",
    "User",
    "User",
  ];
  //max 9 tane arkadaş listelenecek, tamamını görmek için see all diyince modal açılacak

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
          }}
        >
          <img
            src={
              crrProfile?.coverPicture ||
              process.env.REACT_APP_PUBLIC_FOLDER + "/svg/noavatar.svg"
            }
            alt="user profile"
            width={150}
            height={150}
            className="rounded-circle pointer changeable-profile-pic"
            style={{ border: "3px solid #ecf0f1" }}
          />
          <button
            className="change-profile-pic text-end align-items-center justify-content-end"
            style={{
              bottom: "0px",
              left: "0px",
              zIndex: "9999",
              width: "150px",
            }}
          >
            <div className="cam-icon-wrapper p-2 rounded-circle border flex-center">
              <MdPhotoCamera className="fs-4" />
            </div>
          </button>
        </div>
        <span className="fw-bold fs-5 default">
          {crrProfile?.username || "Cat in Disguise"}
        </span>
        <span className="fs-6 text-secondary flex-center gap-1 default pb-2">
          {crrProfile?.desc || "Hi, there! I am using SociableCat."}
        </span>
        <div className="flex-center gap-3 py-2 border-top border-bottom">
          <div className="flex-center flex-column gap-0 user-profile-stats">
            <span className="fw-bold">{crrProfile?.posts?.length || "0"}</span>
            <span className="fs-7">Posts</span>
          </div>
          <div className="flex-center flex-column gap-0 user-profile-stats">
            <span className="fw-bold">
              {crrProfile?.followers?.length || "0"}
            </span>
            <span className="fs-7">Followers</span>
          </div>
          <div className="flex-center flex-column gap-0 user-profile-stats">
            <span className="fw-bold">
              {crrProfile?.followings?.length || "0"}
            </span>
            <span className="fs-7">Following</span>
          </div>
        </div>
      </div>
      <Row className="m-0 p-0 mt-3">
        {/* On smaller screen it has to be on the top, in large screens it is on the right */}
        {/* <Col sm="12" md="0">
          İnfo
        </Col> */}
        <Col sm="12" md="8" className="p-0 mb-5 px-5">
          <Row className="m-0 p-0">
            {crrProfileId === user._id ? (
              <Col sm="12" className="p-0">
                <Share />
              </Col>
            ) : null}
            {crrProfile?.posts?.map((post, index) => (
              <Col sm="12" className="p-0">
                <Post key={index} postContent={post} />
              </Col>
            ))}
          </Row>
        </Col>
        <Col
          sm="12"
          md="4"
          className="profile-rightbar pt-3 px-2"
          style={{ position: "sticky", top: "60px" }}
        >
          <Row className="m-0 p-0">
            <Col sm="12" className="fw-600">
              About
            </Col>
            <Col sm="12" className="flex-align-center gap-2 mt-2">
              <MdLocationCity className="fs-5" />
              <span>Istanbul</span>
            </Col>
            {/* <p className="flex-align-center gap-2">
            <MdHome className="fs-5" />
            <span>Adana</span>
          </p> */}
            <Col sm="12" className="flex-align-center gap-2 mt-2">
              <RiHomeHeartFill className="fs-5" />
              <span>Single</span>
            </Col>
            <Col sm="12" className="flex-align-center gap-2 mt-2">
              <FaBirthdayCake className="" />
              <span>01.09.2001</span>
            </Col>
            <Col sm="12" className="text-secondary fs-7 mt-2">
              Member since 19.11.2022
            </Col>
            <Col sm="12" className="mt-3 pt-3 border-top fw-600 flex-between">
              <p className="m-0 flex-align-center gap-1">
                <span>Friends</span>{" "}
                <span className="fs-8 text-secondary">(31)</span>
              </p>
              <button className="fs-7 hvr-underline fw-600">See All</button>
            </Col>
            {friends?.length > 0 ? (
              <Row className="m-0 p-0">
                {friends?.map((friend, index) => (
                  <Col
                    key={index}
                    xs="0"
                    md="4"
                    className="p-0 mt-2 d-flex align-items-start flex-column"
                  >
                    <img
                      src={
                        process.env.REACT_APP_PUBLIC_FOLDER +
                        "/svg/noavatar.svg"
                      }
                      alt="user profile"
                      width={100}
                      height={100}
                      className="rounded-2 object-fit-cover"
                    />
                    <span
                      className="fs-8 text-start w-100"
                      style={{ maxWidth: "100px" }}
                    >
                      {friend}
                    </span>
                  </Col>
                ))}
              </Row>
            ) : (
              <Col md="12" className="fs-7 text-secondary pt-3">
                No friends found to list
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
