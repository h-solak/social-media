import { useEffect } from "react";
import "./profile.css";
import { Row, Col } from "reactstrap";
import Sidebar from "../../components/home/sidebar/Sidebar";
import Profile from "./Profile";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile } from "../../redux/slices/userSlice";
import { getProfilePosts } from "../../redux/slices/postSlice";
import { useParams } from "react-router-dom";
import MobileBottombar from "../../components/home/mobileBottombar";
const IndexProfile = () => {
  const dispatch = useDispatch();
  const crrProfileUsername = useParams();
  const { user } = useSelector((state) => state.auth);
  const { crrProfile, profileIsLoading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchProfile(crrProfileUsername));
    window.scrollTo({ top: 0 });
  }, [crrProfileUsername]);

  return (
    <Col
      sm="12"
      className="Profile-container p-0 m-0"
      style={{ minHeight: "150vh" }}
    >
      <Row className="m-0 p-0 justify-content-start h-100">
        {/* Bottombar for mobile */}
        <MobileBottombar />
        <Col sm="0" md="3" className="d-none d-md-block p-0">
          <Sidebar />
        </Col>
        <Col sm="12" md="9" className="p-0">
          <Profile
            user={user}
            crrProfile={crrProfile}
            isOtherProfile={crrProfileUsername?.username !== user?.username}
            profileIsLoading={profileIsLoading}
          />
        </Col>
      </Row>
    </Col>
  );
};

export default IndexProfile;
