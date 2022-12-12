import React from "react";

const ChatUser = () => {
  return (
    <div className="USERCOMPONENT wrapper chat-user py-1 pointer flex-center">
      <div className="d-flex align-items-start justify-content-between mt-3 w-100 h-100 bg- px-3 ">
        <div className="d-flex align-items-start gap-2">
          <img
            src={process.env.REACT_APP_PUBLIC_FOLDER + "/svg/noavatar.svg"}
            alt="user profile"
            width={50}
            height={50}
            className="online-friend-pic rounded-circle object-fit-cover"
          />
          <div className="d-flex flex-column">
            <span className="fw-bold fs-7">britisheep</span>
            <span className="text-secondary fs-7">Max 20 characters...</span>
          </div>
        </div>
        <span className="text-secondary fs-8">12:49 AM</span>
      </div>
    </div>
  );
};

export default ChatUser;
