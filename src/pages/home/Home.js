import { useEffect } from "react";
import "./home.css";
import { Row, Col } from "reactstrap";
import RightBar from "../../components/home/rightbar/Rightbar";
import Feed from "../../components/home/feed";
import Sidebar from "../../components/home/sidebar/Sidebar";
const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  return (
    <Col xs="12" sm="12" className="home-container p-0 m-0">
      <Row className="m-0 p-0 justify-content-start h-100">
        <Col xs="0" sm="3" md="3" className="d-none d-sm-block p-0">
          <Sidebar />
        </Col>
        <Col xs="12" sm="9" md="6" className="p-0">
          <Feed />
        </Col>
        <Col sm="0" md="3" className="d-none d-md-block p-0">
          <RightBar />
        </Col>
      </Row>
    </Col>
  );
};

export default Home;
