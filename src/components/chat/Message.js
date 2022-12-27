import React from "react";
import moment from "moment";
const Message = ({ isMyMessage, text, time }) => {
  return isMyMessage ? (
    <div className="m-0 d-flex justify-content-end py-1 mb-1">
      <span className="text-secondary fs-9 d-flex align-items-end pb-1 me-1">
        {moment(time).format("LT")}
      </span>
      <p
        className="m-0 bg-color-green text-white px-4 text-start py-2"
        style={{
          borderRadius: "12px 0px 12px 12px",
          wordBreak: "break-all",
        }}
      >
        {text}
      </p>
    </div>
  ) : (
    <div className="m-0 d-flex justify-content-start py-1 mb-1">
      <p
        className="m-0 px-4 text-start py-2"
        style={{
          borderRadius: "0px 12px 12px 12px",
          wordBreak: "break-all",
          background: "rgba(0,0,0,0.1)",
        }}
      >
        {text}
      </p>
      <span className="text-secondary fs-9 d-flex align-items-end py-1 ms-1">
        {moment(time).format("LT")}
      </span>
    </div>
  );
};

export default Message;
