import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import CrrChat from "./CrrChat";
import UserList from "./UserList";
import Sidebar from "../home/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getChatList, getChatSuggestions } from "../../redux/slices/chatSlice";
const Index = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(0);
  const user = useSelector((state) => state.auth.user);
  const { crrChat } = useSelector((state) => state.chats);
  useEffect(() => {
    dispatch(
      getChatSuggestions({
        userId: user?._id,
      })
    );
    dispatch(
      getChatList({
        userId: user?._id,
      })
    );
  }, []);

  return (
    <>
      {/* <Col className="p-0 d-none d-md-block" sm="0" md="2">
        <Sidebar />
      </Col> */}
      <Col className="p-0" sm="4" md="4">
        <UserList tab={tab} setTab={setTab} />
      </Col>
      <Col className="m-0 p-0" sm="8" md="8">
        {crrChat && <CrrChat />}
      </Col>
    </>
  );
};

export default Index;
