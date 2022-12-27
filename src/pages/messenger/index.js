import React from "react";
import Sidebar from "../../components/home/sidebar/Sidebar";
import { Row, Col } from "reactstrap";
import Chat from "../../components/chat";
const index = () => {
  return (
    <Col sm="12" className="m-0 p-0 w-100">
      <Row className="m-0 p-0 w-100">
        <Chat />
      </Row>
    </Col>
  );
};

export default index;
