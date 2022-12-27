import React from "react";
import "./loaders.css";

const SuggestionsLoader = () => {
  return (
    <>
      {[1, 2, 3, 4, 5].map((item, index) => (
        <div
          key={index}
          className="w-100 px-3 d-flex align-items-center gap-2 mt-1 mb-4"
        >
          <span
            className="loader-bg rounded-circle blink-1500ms"
            style={{ height: "38px", width: "38px" }}
          ></span>
          <span
            className="loader-bg rounded-3 blink-1500ms"
            style={{ height: "12px", width: "120px" }}
          ></span>
        </div>
      ))}
    </>
  );
};

export default SuggestionsLoader;
