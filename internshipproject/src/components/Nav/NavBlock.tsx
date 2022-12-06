import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import styled from "styled-components/macro";
import variables from "../../styles/variables";

const NavbarBlock = () => {
  const location = useNavigate();
  const goMain = () => {
    location("/");
    goTop();
  };

  const goTop = () => {
    if (!window.scrollY) return;

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
          display: "absolute",
          zIndex: "500",
        }}
      >
        <S.NavCenter>
          <S.Center>
            <S.LogoBox>
              <S.Logo
                src="http://www.star-pickers.com/html/img/logo.png"
                onClick={goMain}
              />
            </S.LogoBox>
            <S.Container>
              <S.Nav className="me-auto">
                <S.Link to="/riderlog" onClick={goTop}>
                  RIDER LOG
                </S.Link>
                <S.Link to="/companytech" onClick={goTop}>
                  COMPANY / TECH
                </S.Link>
                <S.Link to="/newsnotice" onClick={goTop}>
                  NEWS / NOTICE
                </S.Link>
                <S.Link to="/contact" onClick={goTop}>
                  CONTACT
                </S.Link>
                <S.Link to="/question" onClick={goTop}>
                  QUESTION
                </S.Link>
                <S.Link to="/join" onClick={goTop}>
                  JOIN
                </S.Link>
              </S.Nav>
            </S.Container>
            <S.Link to="/riderpageclient">
              <S.RiderLogo src="http://www.star-pickers.com/html/img/link_riderlog_pc.png" />
            </S.Link>
          </S.Center>
        </S.NavCenter>
      </Navbar>
    </>
  );
};
export default NavbarBlock;

const S = {
  NavCenter: styled.div`
    ${variables.flex()}
    width: 100%;
  `,

  Center: styled.div`
    ${variables.flex()}
    width: 74%;
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
    width: 95%;
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

  Modal: styled.div`
    width: 1000px;
  `,
};
