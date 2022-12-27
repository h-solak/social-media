import React from "react";
import "./loaders.css";

const PostLoader = () => {
  return (
    <div
      className="share w-100 mb-5 bg-white shadow"
      style={{ borderRadius: "12px 12px 12px 12px" }}
    >
      <div className="w-100 pt-3 pb-4 px-3 d-flex align-items-start flex-column">
        <div className="w-100 flex-between">
          <div className="flex-align-center gap-1">
            <span
              className="loader-bg rounded-circle blink-1500ms"
              style={{ height: "45px", width: "45px" }}
            ></span>
            <div className="d-flex align-items-start flex-column px-2">
              <span
                className="loader-bg rounded-3 blink-1500ms"
                style={{ height: "12px", width: "120px" }}
              ></span>
              <span
                className="loader-bg rounded-3 mt-1 blink-1500ms"
                style={{ height: "12px", width: "50px" }}
              ></span>
            </div>
          </div>
        </div>
        <span
          className="loader-bg rounded-3 mt-3 blink-1500ms"
          style={{ height: "12px", width: "350px" }}
        ></span>
        <span
          className="loader-bg rounded-3 mt-3 blink-1500ms"
          style={{ height: "12px", width: "350px" }}
        ></span>
      </div>
    </div>
  );
};

export default PostLoader;
