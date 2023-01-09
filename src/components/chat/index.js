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
  useEffect(() => {
    console.log(crrChat);
  }, [crrChat]);

  return (
    <>
      {/* <Col className="p-0 d-none d-md-block" sm="0" md="2">
        <Sidebar />
      </Col> */}
      <Col className="p-0" sm="4" md="4">
        <UserList tab={tab} setTab={setTab} />
      </Col>

      {crrChat?._id ? (
        <Col className="m-0 p-0" sm="8" md="8">
          <CrrChat />
        </Col>
      ) : (
        <Col
          className="m-0 p-0 d-flex align-items-center justify-content-center"
          sm="8"
          md="8"
        >
          <div className="d-flex justify-content-center flex-column">
            <img
              src={`${process.env.REACT_APP_PUBLIC_FOLDER}/svg/littersand.svg`}
              alt="user profile"
              height={125}
              className="pointer"
            />
            <span>We got your cat, go socialize now.</span>
          </div>
        </Col>
      )}
    </>
  );
};

export default Index;
