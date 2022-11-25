import { useEffect } from "react";
import "./profile.css";
import { Row, Col } from "reactstrap";
import Sidebar from "../../components/home/sidebar/Sidebar";
import Profile from "./Profile";
const IndexProfile = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <Col sm="12" className="Profile-container p-0 m-0">
      <Row className="m-0 p-0 justify-content-start h-100">
        <Col sm="0" md="3" className="d-none d-md-block p-0">
          <Sidebar />
        </Col>
        <Col sm="12" md="9" className="p-0">
          <Profile />
        </Col>
      </Row>
    </Col>
  );
};

export default IndexProfile;
