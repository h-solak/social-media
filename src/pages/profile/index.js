import { useEffect } from "react";
import "./profile.css";
import { Row, Col } from "reactstrap";
import Sidebar from "../../components/home/sidebar/Sidebar";
import Profile from "./Profile";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile } from "../../redux/slices/userSlice";
import { getProfilePosts } from "../../redux/slices/postSlice";
import { useParams } from "react-router-dom";
const IndexProfile = () => {
  const dispatch = useDispatch();
  const crrProfileId = useParams();
  const { user } = useSelector((state) => state.auth);
  const { crrProfile } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchProfile(crrProfileId));
    window.scrollTo({ top: 0 });
  }, [crrProfileId]);

  return (
    <Col sm="12" className="Profile-container p-0 m-0" style={{minHeight: "150vh"}}>
      <Row className="m-0 p-0 justify-content-start h-100">
        <Col sm="0" md="3" className="d-none d-md-block p-0">
          <Sidebar />
        </Col>
        <Col sm="12" md="9" className="p-0">
          <Profile user={user} crrProfile={crrProfile} isOtherProfile={crrProfileId.userId !== user._id} />
        </Col>
      </Row>
    </Col>
  );
};

export default IndexProfile;
