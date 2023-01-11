import React from "react";
import "./mobilebottombar.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Index = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  /*
  https://www.svgrepo.com/svg/239159/chat-conversation
  https://www.svgrepo.com/svg/473957/home-line
  https://www.svgrepo.com/svg/471863/search-md
  https://www.svgrepo.com/svg/174451/cat
  */
  return (
    <div className="d-block d-sm-none mobile-bottombar w-100 d-flex align-items-center">
      <div className="w-100 d-flex align-items-center justify-content-around">
        <button className="m-0 flex-center" onClick={() => navigate("/")}>
          <img
            src={process.env.REACT_APP_PUBLIC_FOLDER + "/svg/icons/home.svg"}
            alt="Logo"
            height="26"
          />
        </button>
        <button className="m-0 flex-center" onClick={() => navigate("/")}>
          <img
            src={process.env.REACT_APP_PUBLIC_FOLDER + "/svg/icons/search.svg"}
            alt="Logo"
            height="26"
          />
        </button>

        <button
          className="m-0 flex-center"
          onClick={() => navigate("/messenger")}
        >
          <img
            src={process.env.REACT_APP_PUBLIC_FOLDER + "/svg/icons/chat.svg"}
            alt="Logo"
            height="24"
          />
        </button>
        <button
          className="m-0 flex-center"
          onClick={() => navigate(`/profile/${user.username}`)}
        >
          <img
            src={
              process.env.REACT_APP_PUBLIC_FOLDER + "/svg/icons/cat-profile.svg"
            }
            alt="Logo"
            height="26"
          />
        </button>
      </div>
    </div>
  );
};

export default Index;
