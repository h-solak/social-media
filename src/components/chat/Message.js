import React from "react";

const Message = ({ isMyMessage }) => {
  return isMyMessage ? (
    <div className="m-0 d-flex justify-content-end py-1 mb-2">
      <span className="text-secondary fs-9 d-flex align-items-end pb-1 me-1">
        06:48 AM
      </span>
      <p
        className="m-0 bg-color-green text-white px-4 text-start py-2"
        style={{
          borderRadius: "12px 0px 12px 12px",
          wordWrap: "break-word",
        }}
      >
        My Message
      </p>
    </div>
  ) : (
    <div className="m-0 d-flex justify-content-start py-1 mb-2">
      <p
        className="m-0 px-4 text-start py-2"
        style={{
          borderRadius: "0px 12px 12px 12px",
          wordWrap: "break-word",
          background: "rgba(0,0,0,0.1)",
        }}
      >
        Other Message
      </p>
      <span className="text-secondary fs-9 d-flex align-items-end py-1 ms-1">
        04:30 PM
      </span>
    </div>
  );
};

export default Message;
