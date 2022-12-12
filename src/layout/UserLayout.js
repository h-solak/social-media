import React, { useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const UserLayout = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.auth);
  const postError = useSelector((state) => state.post.isUnauthorized);

  useEffect(() => {
    /* DOESNT navigate to login page if the session is timed out  */
    if (userToken.length < 15 || postError === "Unauthorized") {
      navigate("/login");
    }
  }, [userToken, postError, navigate, dispatch]);

  return (
    <>
      {userToken.length > 15 && (
        <>
          <Navbar />
          {children}
        </>
      )}
    </>
  );
};

export default UserLayout;
