import React, { useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
// import { useSelector } from "react-redux";
const UserLayout = ({ children }) => {
  // const user = useSelector((state) => state.users.user);
  // useEffect(() => {
  //   if(!user){
  //     logOut();
  //   }
  // },[])
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default UserLayout;
