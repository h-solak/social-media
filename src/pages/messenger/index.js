import React from "react";
import Sidebar from "../../components/home/sidebar/Sidebar";
import { Row, Col } from "reactstrap";
import ChatUserList from "../../components/chat/ChatUserList";
import Chat from "../../components/chat/Chat";

const index = () => {
  return (
    <Col sm="12" className="m-0 p-0 w-100">
      <Row className="m-0 p-0 w-100">
        <Col className="p-0 d-none d-md-block" sm="0" md="3">
          <Sidebar />
        </Col>
        <Col className="p-0" sm="4" md="3">
          <ChatUserList />
        </Col>
        <Col className="m-0 p-0" sm="8" md="6">
          <Chat />
        </Col>
      </Row>
    </Col>
  );
};

export default index;
