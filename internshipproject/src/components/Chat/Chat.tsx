import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import variables from "../../styles/variables";
import "./chatting.css";
import $ from "jquery";
import io from "socket.io-client";
const Chatting = () => {
  const ref = useRef();
  //모달 실행/취소
  const [modal, setModal] = useState<boolean>(false);

  const modalClose = () => {
    setModal(true);
  };

  const socket = io(); //io라이브러리 사용

  $("#message-form").submit(function (event) {
    event.preventDefault();
    socket.emit("new message", {
      message: $("#message").val(),
    });

    $("#message").val(""); // Clear text area
  });
  // $("#message-form").submit(function (event) {
  //   event.preventDefault();
  //   //입력

  //   $("#message").val(""); // Clear text area //초기화
  // });

  socket.on("new message", function (data: any) {
    //대화내용 출력
    $("#messages").append("</b>: " + data.message + "</i></li>");
  });
  const [message, setMessage] = useState<string>("");
  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const send = () => {
    socket.emit("new message", {
      message: $("#message").val(), //인풋 값 입력 및 전송
    });
  };
  return (
    <>
      <S.Chatting>
        <S.CloseBox>
          <S.User>Chat</S.User>
          <S.Close onClick={modalClose}>✕</S.Close>
        </S.CloseBox>
        <S.Content>
          <div id="chat-area">
            <div id="message-area">
              <div id="display-message-area">
                <ul id="messages"></ul>
              </div>

              <div id="message-form-area">
                <form id="message-form">
                  <S.Center>
                    <input
                      id="message"
                      type="text"
                      placeholder="Type your message..."
                      onChange={handleInputValue}
                    />
                    <div id="message-submit" onClick={send}>
                      send
                    </div>
                  </S.Center>
                </form>
              </div>
            </div>
          </div>
        </S.Content>
      </S.Chatting>
    </>
  );
};

export default Chatting;

const S = {
  Form: styled.form``,

  Center: styled.div`
    ${variables.flex()}
  `,
  Chatting: styled.div`
    position: fixed;
    ${variables.flex("column", "center", "center")}
    top: 8%;
    left: 70%;
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
