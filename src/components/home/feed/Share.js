import React, { useState, useEffect } from "react";
import "./feed.css";
import {
  Row,
  Col,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { GiCat } from "react-icons/gi";
import { FaPaw, FaSearch } from "react-icons/fa";
import {
  MdPhotoLibrary,
  MdLibraryMusic,
  MdEmojiEmotions,
  MdSearch,
} from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getTimelinePosts,
  resetPostIsShared,
  sharePost,
} from "../../../redux/slices/postSlice";
import { fetchProfile } from "../../../redux/slices/userSlice";
import axios from "axios";
const Share = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const { postIsShared, postIsSharing } = useSelector((state) => state.post);
  const [isFocused, setIsFocused] = useState(false);
  const [postText, setPostText] = useState("");
  const [moodPicker, setMoodPicker] = useState(false);
  // const [musicModal, setMusicModal] = useState(false);
  // const [trackSearchText, setTrackSearchText] = useState("");
  // const [selectedTrackId, setSelectedTrackId] = useState("");

  // const selectTrack = () => {
  //   const options = {
  //     method: "GET",
  //     url: "https://spotify-scraper.p.rapidapi.com/v1/track/download/soundcloud",
  //     params: { track: trackSearchText },
  //     headers: {
  //       "X-RapidAPI-Key": "e2e8732dcbmsh9fb102907cdb62ep17ad14jsn46f746729c89",
  //       "X-RapidAPI-Host": "spotify-scraper.p.rapidapi.com",
  //     },
  //   };

  //   axios
  //     .request(options)
  //     .then(function (response) {
  //       console.log(response.data);
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  // };

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
            !isFocused
              ? `What is on your mind, ${user?.username}?`
              : "Tail us about it..."
          }
          className="mt-2 border-0 w-100 px-0 ps-2 border-bottom"
          style={{ resize: "none" }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />
      </div>
      {/* <iframe
        className="p-0 ps-5 pe-4 mt-2"
        style={{ borderRadius: "12px" }}
        src={`https://open.spotify.com/embed/track/${"2Zw3HNjaNV42LnQ2uY5JQs"}?utm_source=generator`}
        width="100%"
        height="80"
        loading="lazy"
      ></iframe> */}
      <Row className="m-0 p-0">
        <Col md="12" className="p-0">
          <div className="flex-align-center justify-content-between px-0 ps-md-5 pe-md-4 pt-2 pb-2 w-100">
            <div className="flex-align-center" style={{ position: "relative" }}>
              <button className="share-option-btn d-flex align-items-center justify-content-center gap-1 p-2 pointer rounded-2">
                <MdPhotoLibrary className="fs-4" />
                <span className="display-sm-md fs-7">Photo</span>
              </button>
              <button
                id="moodPickBtn"
                className="share-option-btn d-flex align-items-center justify-content-center gap-1 p-2 pointer rounded-2"
                // onClick={() => setMoodPicker(!moodPicker)}
              >
                <MdEmojiEmotions className="fs-4" />
                <span className="display-sm-md fs-7">Mood</span>
              </button>
              {/* {moodPicker && (
                <div className="mood-picker d-flex gap-2 flex-column pt-2 pb-0">
                  <span className="text-white text-center">I feel...</span>
                  <button className="mood m-0 d-flex align-items-center gap-2 text-white px-5 py-1">
                    <span className="fs-5">&#128562;</span> shocked ah{" "}
                  </button>
                  <button className="mood m-0 d-flex align-items-center gap-2 text-white px-5 py-1">
                    <span className="fs-5">&#129324;</span> angwy{" "}
                  </button>
                  <button className="mood m-0 d-flex align-items-center gap-2 text-white px-5 py-1">
                    <span className="fs-5">&#129313;</span> clownish{" "}
                  </button>
                  <button className="mood m-0 d-flex align-items-center gap-2 text-white px-5 py-1">
                    <span className="fs-5">&#128563;</span> flushed{" "}
                  </button>
                </div>
              )} */}
              <button
                className="share-option-btn d-flex align-items-center justify-content-center gap-1 p-2 pointer rounded-2"
                // onClick={() => setMusicModal(true)}
              >
                <MdLibraryMusic className="fs-4" />
                <span className="display-sm-md fs-7">Music</span>
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
      {/* <Modal
        isOpen={musicModal}
        toggle={() => setMusicModal(!musicModal)}
        style={{ zIndex: "9999" }}
        centered
      >
        <ModalHeader
          toggle={() => setMusicModal(!musicModal)}
          className="pb-2 color-bronze"
        >
          <span className="fw-600">Select Music</span>
        </ModalHeader>
        <ModalBody className="py-5">
          <span className="fs-7 text-secondary">Find your song</span>
          <div className="d-flex align-items-center">
            <input
              className="border py-1 px-2 w-100"
              placeholder="Chances - The Strokes"
              value={trackSearchText}
              onChange={(e) => setTrackSearchText(e.target.value)}
              style={{ borderRadius: "8px 0px 0px 8px" }}
            />
            <button
              className="m-0 bg-color-bronze color-white py-1 px-3"
              style={{ borderRadius: " 0px 8px 8px 0px" }}
              onClick={selectTrack}
            >
              <FaSearch />
            </button>
          </div>
        </ModalBody>
      </Modal> */}
    </div>
  );
};

export default Share;
