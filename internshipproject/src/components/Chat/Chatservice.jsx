import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect();
socket.emit("init", "접속했습니다.");

function Chatservice() {
  const [chatList, setChatList] = useState([]);
  const [chat, setChat] = useState({
    nickname: "",
    message: "",
  });

  useEffect(() => {
    socket.on("receive message", (message) => {
      setChatList((chatList) => chatList.concat(message));
    });
  }, []);
  useEffect(() => {
    return () => {
      socket.close();
    };
  }, []);
  return (
    <div className="App">
      <ChatList chatList={chatList} />
      <ChatInput chat={chat} setChat={setChat} />
    </div>
  );
}

export default Chatservice;

function ChatList({ chatList }) {
  return (
    <div className="chat-list-wrapper">
      <section className="chat-box">
        {chatList &&
          chatList.map((chat, index) => (
            <p key={index} className="chat">
              {chat.nickname}: {chat.message}
            </p>
          ))}
      </section>
    </div>
  );
}

function ChatInput({ chat, setChat }) {
  const changeInput = (e) => {
    const { name, value } = e.target;
    setChat((chat) => {
      return { ...chat, [name]: value };
    });
  };
  const postChat = () => {
    socket.emit("send message", {
      nickname: chat.nickname,
      message: chat.message,
    });
  };

  return (
    <div className="chat-input-wrapper">
      <input name="nickname" value={chat.nickname} onChange={changeInput} />
      <input name="message" value={chat.message} onChange={changeInput} />
      <button onClick={postChat}>전송</button>
    </div>
  );
}
