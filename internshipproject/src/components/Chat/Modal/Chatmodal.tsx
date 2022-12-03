import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Chatting from "../Chat";
import ChatBot from "../ChatBot";

const ChatModal = () => {
  //모달 실행/취소
  // const modal = useSelector((state) => state);
  // const dispatch = useDispatch();
  const [modal, setModal] = useState<boolean>(false);

  const modalOpen = () => {
    // dispatch({ type: "모달 실행", modal: true });
    if (!modal) {
      setModal(true);
    } else {
      setModal(false);
    }
  };
  return (
    <>
      {modal === true && <ChatBot />}
      <S.Fix onClick={modalOpen}>💬</S.Fix>
    </>
  );
};

export default ChatModal;

const S = {
  Fix: styled.div`
    position: fixed;
    top: 85%;
    left: 93%;
    background: rgb(8, 65, 190);
    background: linear-gradient(
      110deg,
      rgba(8, 65, 190, 1) 0%,
      rgba(39, 142, 203, 1) 64%,
      rgba(69, 175, 216, 1) 81%,
      rgba(255, 248, 248, 0.9402354691876751) 100%
    );
    font-size: 30px;
    border-radius: 50%;
    padding: 10px 18px;
    z-index: 100;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      transform: scale(1.2);
    }
  `,
};
