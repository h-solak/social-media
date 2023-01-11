import React, { useEffect, useRef } from "react";
import Message from "./Message";
const MessageList = ({ messages, username1 }) => {
  useEffect(() => {
    bottomRef.current?.scrollIntoView();
    /* Auto scroll to the bottom of the chat when the chat is opened & new message has arrived */
  }, [messages]);

  const bottomRef = useRef(null);

  return (
    <div className="chat-message-list bg-white p-4 pt-3">
      {messages?.length > 0 ? (
        messages?.map((message, index) =>
          message.username === username1 ? (
            <Message
              key={index}
              text={message.text}
              time={message.time}
              isMyMessage={true}
            />
          ) : (
            <Message
              key={index}
              text={message.text}
              time={message.time}
              isMyMessage={false}
            />
          )
        )
      ) : (
        <div className="h-100 flex-center">No Messages</div>
      )}
      <div ref={bottomRef}></div>
    </div>
  );
};

export default MessageList;
