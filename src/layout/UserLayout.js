import React, { useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
const UserLayout = ({ children }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (!user?._id) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <>
      {user?._id && (
        <>
          <Navbar />
          {children}
        </>
      )}
    </>
  );
};

export default UserLayout;
