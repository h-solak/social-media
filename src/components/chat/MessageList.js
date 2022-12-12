import React, { useEffect, useRef } from "react";
import Message from "./Message";
const MessageList = () => {
  const messagesarr = [
    1, 2, 3, 4, 4, 4, 5, 6, 7, 8, 9, 9, 9, 9, 10, 11, 12, 13, 14, 15, 16,
  ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
    //{ behavior: "smooth" } unnecessary?
  }, []);

  const bottomRef = useRef(null);

  return (
    <div className="chat-message-list bg-white p-4 pt-3">
      {messagesarr?.map((message, index) =>
        message % 2 == 0 ? (
          <Message key={index} isMyMessage={false} />
        ) : (
          <Message key={index} isMyMessage={true} />
        )
      )}

      <div ref={bottomRef}></div>
    </div>
  );
};

export default MessageList;
