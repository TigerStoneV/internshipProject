import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components/macro";
import variables from "../../styles/variables";

const NavbarStar = () => {
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const location = useNavigate();
  const goMain = () => {
    if (!window.scrollY) return;
    // 현재 위치가 이미 최상단일 경우 return

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Navbar
        bg="none"
        variant="light"
        style={{
          position: "fixed",
          left: "50%",
          transform: "translate(-50%)",
          zIndex: "999",
        }}
      >
        <S.NavCenter>
          <S.LogoBox>
            <S.Logo
              src="http://www.star-pickers.com/html/img/logo.png"
              onClick={goMain}
            />
          </S.LogoBox>
          <S.Container>
            <S.Nav className="me-auto">
              <S.Link to="/riderlog">RIDER LOG</S.Link>
              <S.Link to="/company">COMPANY</S.Link>
              <S.Link to="/team">TEAM</S.Link>
              <S.Link to="/tech">TECH</S.Link>
              <S.Link to="/news">NEWS</S.Link>
              <S.Link to="/notice">NOTICE</S.Link>
              <S.Link to="/contact">CONTACT</S.Link>
              <Button
                variant="primary"
                onClick={handleShow}
                style={{
                  fontSize: " 23px",
                  fontWeight: "semi-bold",
                  background: "none",
                  border: "none",
                }}
              >
                Join
              </Button>
              <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary">Understood</Button>
                </Modal.Footer>
              </Modal>
            </S.Nav>
          </S.Container>
          <S.RiderLogo src="http://www.star-pickers.com/html/img/link_riderlog_pc.png" />
        </S.NavCenter>
      </Navbar>
    </>
  );
};
export default NavbarStar;

const S = {
  NavCenter: styled.div`
    ${variables.flex()}
    width: 1400px;
  `,

  LogoBox: styled.div`
    width: 300px;
  `,

  Logo: styled.img`
    width: 121px;
    height: 61px;
    cursor: pointer;
  `,

  Container: styled.div`
    width: 100%;
  `,

  Nav: styled.div`
    ${variables.flex("row", "space-evenly", "center")}
  `,

  Link: styled(Link)`
    color: rgb(250, 250, 250);
    font-size: 20px;
    font-weight: semi-bold;
    text-decoration-line: none;

    &:hover {
      color: #ffee00;
    }
  `,

  RiderLogo: styled.img`
    width: 160px;
    height: 41px;
  `,
};
