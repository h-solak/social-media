import React from "react";
import "./notfound.css";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="notfound-container flex-center flex-column gap-4">
      <img
        src={process.env.PUBLIC_URL + "/assets/svg/takenundraw.svg"}
        alt="Not Found"
        width="300"
      />
      <div className="flex-center flex-column">
        <span>Sorry, I couldn't find the page you are looking for :(</span>
        <span
          className="color-bronze hvr-underline pointer"
          onClick={() => navigate("/")}
        >
          Go Back To SociableCat
        </span>
      </div>
    </div>
  );
};

export default NotFound;
