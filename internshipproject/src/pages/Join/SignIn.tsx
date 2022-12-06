import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import User from "./User";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import NavbarBlock from "../../components/Nav/NavBlock";
import AOS from "aos";
import "aos/dist/aos.css";
import styled from "styled-components/macro";
import variables from "../../styles/variables";
import UserClient from "./UserClient";
import UserAdmin from "./UserAdmin";

const LOGIN_TEXT = {
  title: "개인 로그인",
  linkText: "계정이 없으신가요? 회원가입",
  url: "/signup",
};

const SIGNUP_TEXT = {
  title: "개인 회원가입",
  linkText: "이미 가입하셨나요? 로그인",
  url: "/join",
};

const LOGIN_TEXT_CLIENT = {
  title: "기업 로그인",
  linkText: "계정이 없으신가요? 회원가입",
  url: "/signup",
};

const SIGNUP_TEXT_CLIENT = {
  title: "기업 회원가입",
  linkText: "이미 가입하셨나요? 로그인",
  url: "/join",
};
const LOGIN_TEXT_ADMIN = {
  title: "관리자 로그인",
  linkText: "계정이 없으신가요? 회원가입",
  url: "/signup",
};

const SignIn = () => {
  useEffect(() => {
    AOS.init();
  });

  //로그인 메뉴탭
  const location = useLocation();
  const currentURL = location.pathname;
  const isSelecLogin = currentURL === "/join" && true;
  const isSelecLoginClient = currentURL === "/join" && true;
  const isSelecLoginAdmin = currentURL === "/join" && true;

  const [show, setShow] = useState<boolean>(false);
  const [showClient, setShowClient] = useState<boolean>(false);
  const [showAdmin, setShowAdmin] = useState<boolean>(false);

  const [token, setToken] = useState<string>("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseClient = () => setShowClient(false);
  const handleShowClient = () => setShowClient(true);
  const handleCloseAdmin = () => setShowAdmin(false);
  const handleShowAdmin = () => setShowAdmin(true);

  //카카오 로그인
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    fetch(`http://127.0.0.1:3000/user/riderKakaoRegister`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authorizationCode: code,
      }),
    })
      .then((response) => {
        if (response.ok === true) {
          return response.json();
        }
        throw new Error("통신실패!");
      })
      .then((data) => {
        if (data) {
          localStorage.setItem("token", data.accessToken);
          alert(data.message);
        } else {
          alert("카카오 계정을 확인해주세요.");
        }
      });
  }, []);
  //로그아웃
  const navigate = useNavigate();

  const logout = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      navigate("/");
      alert("로그아웃 되셨습니다.");
    } else {
      alert("로그인 먼저 해주세요.");
    }
  };
  return (
    <>
      <S.JoinMainImage>
        <NavbarBlock />
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
              <S.JoinClickBox onClick={handleShowClient}>기업용</S.JoinClickBox>
              <S.JoinClickBox onClick={handleShowAdmin}>관리자</S.JoinClickBox>
            </S.JoinCenter>
            <S.Center>
              <S.logoutClickBox onClick={logout}>로그아웃</S.logoutClickBox>
            </S.Center>
          </S.JoinBox>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header
              closeButton
              //  onClick={CloseClick}
            ></Modal.Header>
            <S.CenterHeight>
              <User text={isSelecLogin ? LOGIN_TEXT : SIGNUP_TEXT} />
            </S.CenterHeight>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            show={showClient}
            onHide={handleCloseClient}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton></Modal.Header>
            <S.CenterHeight>
              <UserClient
                text={
                  isSelecLoginClient ? LOGIN_TEXT_CLIENT : SIGNUP_TEXT_CLIENT
                }
              />
            </S.CenterHeight>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseClient}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            show={showAdmin}
            onHide={handleCloseAdmin}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton></Modal.Header>
            <S.CenterHeight>
              <UserAdmin
                text={isSelecLoginAdmin ? LOGIN_TEXT_ADMIN : LOGIN_TEXT_ADMIN}
              />
            </S.CenterHeight>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAdmin}>
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
    height: 300px;
    background-image: url("/images/hand.jpg");
    background-position: 0px -480px;
    background-size: 100%;
    object-fit: cover;
  `,

  JoinMainImageMessage: styled.div`
    position: absolute;
    color: #fffcf6;
    font-size: 50px;
    text-align: center;
    top: 50%;
    width: 100%;
    font-weight: 300;
    letter-spacing: -2px;
  `,

  CenterColumn: styled.div`
    ${variables.flex("column", "center", "center")}
    margin-top: 30px;
  `,

  JoinBanner: styled.div`
    font-size: 50px;
    font-weight: 600;
  `,

  LoginBox: styled.div`
    ${variables.flex("column", "center", "center")}
    height: 550px;
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

  logoutClickBox: styled.div`
    ${variables.flex()}
    width: 200px;
    height: 30px;
    background-color: rgb(245, 245, 245);
    border-radius: 30px;
    font-size: 20px;
    transition: 0.4s;
    margin-bottom: 60px;
    cursor: pointer;

    &:hover {
      background-color: red;
      color: white;
    }
  `,
};
