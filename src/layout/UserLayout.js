import React, { useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../redux/slices/authSlice";
import { resetStore } from "../redux/store";
const UserLayout = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.auth);
  // const localToken = localStorage.getItem("sociableCat_userToken");

  useEffect(() => {
    /* DOESNT navigate to login page if the session is timed out  */
    setTimeout(() => {
      if (!userToken || !localStorage.getItem("sociableCat_userToken")) {
        dispatch(logOut());
        navigate("/login");
      }
    }, 100);
  }, [userToken, navigate, dispatch]);

  return (
    <>
      {userToken !== "" ? (
        <>
          <Navbar />
          {children}
        </>
      ) : null}
    </>
  );
};

export default UserLayout;
