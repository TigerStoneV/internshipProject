import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AOS from "aos";
import User from "./User";
import "aos/dist/aos.css";
import styled from "styled-components/macro";
import variables from "../../styles/variables";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const LOGIN_TEXT = {
  title: "로그인",
  linkText: "계정이 없으신가요? 회원가입",
  url: "/signup",
};

const SIGNUP_TEXT = {
  title: "회원가입",
  linkText: "이미 가입하셨나요? 로그인",
  url: "/login",
};
const SignIn = () => {
  useEffect(() => {
    AOS.init();
  });
  const location = useLocation();
  const currentURL = location.pathname;
  const isSelecLogin = currentURL === "/login" && true;

  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const location = useNavigate();
  return (
    <>
      <S.JoinMainImage>
        <S.JoinMainImageMessage>
          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-duration="1000"
          >
            별따러가자 일원이 되기
          </div>
        </S.JoinMainImageMessage>
      </S.JoinMainImage>
      <S.CenterColumn>
        <S.JoinBanner>
          <div
            data-aos="fade-up"
            data-aos-offset="300"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            JOIN
          </div>
        </S.JoinBanner>
      </S.CenterColumn>
      <S.LoginBox>
        <S.Center>
          <S.JoinBox>
            <S.JoinCenter>
              <S.JoinClickBox onClick={handleShow}>개인용</S.JoinClickBox>
              <S.JoinClickBox>기업용</S.JoinClickBox>
            </S.JoinCenter>
          </S.JoinBox>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton></Modal.Header>
            <S.CenterHeight>
              <User text={isSelecLogin ? LOGIN_TEXT : SIGNUP_TEXT} />
            </S.CenterHeight>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </S.Center>
      </S.LoginBox>
    </>
  );
};
export default SignIn;
const S = {
  JoinMainImage: styled.div`
    position: relative;
    width: 100%;
    height: 250px;
    background-image: url("http://www.star-pickers.com/html/img/sub_visual02.png");
  `,
  JoinMainImageMessage: styled.div`
    position: absolute;
    color: #fff;
    font-size: 50px;
    text-align: center;
    top: 50%;
    width: 100%;
    font-weight: 400;
    letter-spacing: -2px;
  `,
  CenterColumn: styled.div`
    ${variables.flex("column", "center", "center")}
    margin-top: 80px;
  `,
  JoinBanner: styled.div`
    font-size: 50px;
    font-weight: 600;
  `,
  LoginBox: styled.div`
    ${variables.flex("column", "center", "center")}
    height: 600px;
    width: 100%;
  `,

  Center: styled.div`
    ${variables.flex("column", "center", "center")}
    margin: 20px;
  `,
  CenterHeight: styled.div`
    ${variables.flex("column", "center", "center")}
    margin: 20px;
    height: 600px;
  `,
  JoinBox: styled.div`
    border: 1px solid lightgray;
    border-radius: 30px;
    width: 100%;
    height: 400px;
  `,
  JoinCenter: styled.div`
    ${variables.flex("row", "space-evenly", "center")}
    width: 1000px;
    height: 100%;
  `,
  JoinClickBox: styled.div`
    ${variables.flex()}
    width: 300px;
    height: 250px;
    background-color: rgb(245, 245, 245);
    border-radius: 30px;
    font-size: 30px;
    transition: 0.8s;
    cursor: pointer;

    &:hover {
      background-color: orange;
      color: white;
    }
  `,
  Modal: styled.div`
    width: 1000px;
  `,
};
