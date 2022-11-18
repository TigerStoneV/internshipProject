import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import styled from "styled-components/macro";
import variables from "../../styles/variables";

const NavbarStar = () => {
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
              <S.Link to="/riderlog" onClick={goTop}>
                RIDER LOG
              </S.Link>
              <S.Link to="/company" onClick={goTop}>
                COMPANY
              </S.Link>
              <S.Link to="/team" onClick={goTop}>
                TEAM
              </S.Link>
              <S.Link to="/tech" onClick={goTop}>
                TECH
              </S.Link>
              <S.Link to="/news" onClick={goTop}>
                NEWS
              </S.Link>
              <S.Link to="/notice" onClick={goTop}>
                NOTICE
              </S.Link>
              <S.Link to="/contact" onClick={goTop}>
                CONTACT
              </S.Link>
              <S.Link to="/join" onClick={goTop}>
                JOIN
              </S.Link>
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
  Modal: styled.div`
    width: 1000px;
  `,
};
