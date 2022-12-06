import React, { useRef, useState } from "react";
import styled from "styled-components";
import variables from "../../styles/variables";
import "./chatting.css";
import $ from "jquery";
import io from "socket.io-client";
const ChatBot = () => {
  const socket = io().connect();
  const [text, setText] = useState("");
  const input = (e) => {
    setText(e.target.value);
  };
  const send = (event) => {
    //확인용(통신x)
    if (text.length > 0) {
      $("#messages").append("<li>user : " + text + "</li>");
      setText("");

      // 예제
      event.preventDefault();
      socket.emit("new message", {
        message: text,
      });
      setText("");

      //도영님
      $("#message-form").submit(function (event) {
        event.preventDefault();
        socket.emit("new message", {
          message: text,
        });
        $("#message").val(""); // Clear text area
      });
    }
  };
  //예제
  socket.on("new message", function (data) {
    $("#messages").append("<li>user : " + data + "</li>");
  });

  //도영님
  let username = $("#user-name").val();
  $("#chat-area").show();
  socket.emit("has connected", username);

  socket.on("new message", function (data) {
    $("#messages").append("<li>user : " + data + "</li>");
  });
  return (
    <>
      <div id="chat-area">
        <div id="chat-header">Chatting</div>
        <div id="message-area">
          <div id="display-message-area">
            <ul id="messages"></ul>
          </div>

          <div id="message-form-area">
            <form id="message-form">
              <input
                id="message"
                type="text"
                placeholder="Type your message..."
                autocomplete="off"
                onChange={input}
              />
              <input id="message-submit" type="submit" onClick={send} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;

const S = {
  Form: styled.form``,

  Center: styled.div`
    ${variables.flex()}
  `,
  Chatting: styled.div`
    position: fixed;
    ${variables.flex("column", "center", "center")}
    top: 8%;
    left: 50%;
    width: 400px;
    height: 600px;
    z-index: 999;
    background-color: rgb(250, 250, 250);
    border: 0.5px solid #212121;
    border-radius: 10px;
  `,

  CloseBox: styled.div`
    ${variables.flex("row", "space-between", "center")}
    width: 100%;
    height: 50px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background: rgb(8, 65, 190);
    background: linear-gradient(
      110deg,
      rgba(8, 65, 190, 1) 0%,
      rgba(39, 142, 203, 1) 64%,
      rgba(69, 175, 216, 1) 81%,
      rgba(255, 248, 248, 0.9402354691876751) 100%
    );
  `,

  Close: styled.div`
    ${variables.flex()}
    width: 40px;
    font-size: 20px;
    margin-right: 4px;
    color: #212121;
    cursor: pointer;
  `,

  Content: styled.div`
    height: 570px;
    width: 100%;
  `,

  User: styled.div`
    margin-left: 15px;
    color: #fff;
    font-size: 20px;
  `,
};
