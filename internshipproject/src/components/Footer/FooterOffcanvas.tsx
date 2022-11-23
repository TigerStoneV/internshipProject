import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import styled from "styled-components/macro";
import variables from "../../styles/variables";

function FooterOffCanvas({ ...props }) {
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        className="me-2"
        style={{ backgroundColor: "gray", border: "none" }}
      >
        Click Info
      </Button>
      <Offcanvas
        show={show}
        onHide={handleClose}
        {...props}
        style={{ height: "150px", backgroundColor: "#212121" }}
      >
        <S.FooterExitBtn>
          <Offcanvas.Header closeButton></Offcanvas.Header>
        </S.FooterExitBtn>
        <S.FooterAllBox>
          <S.FooterOffBox>
            <S.FooterMessage>(주)별따러가자</S.FooterMessage>
            <S.FooterMessage>대표이사:박추진</S.FooterMessage>
            <S.FooterMessage>
              본사: 서울특별시 영등포구 의사당대로 83,
            </S.FooterMessage>
            <S.FooterMessage>서울 핀테크랩 4층 110호</S.FooterMessage>
            <S.FooterMessage>전화번호: 070-4415-2662</S.FooterMessage>
            <S.FooterMessage>이메일:support@star-pickers.com</S.FooterMessage>
          </S.FooterOffBox>
          <S.FooterMessage>
            coptright© STAR-PICKERS All rights reserved.
          </S.FooterMessage>
        </S.FooterAllBox>
      </Offcanvas>
    </>
  );
}

export default FooterOffCanvas;

const S = {
  FooterAllBox: styled.div`
    ${variables.flex()}
    flex-wrap:wrap;
    margin-top: 50px;
  `,

  FooterOffBox: styled.div`
    ${variables.flex("row", "center", "center")}
    width: 100%;
  `,

  FooterMessage: styled.div`
    margin: 5px 10px;
    color: rgb(250, 250, 250);
  `,

  FooterExitBtn: styled.div`
    position: absolute;
    right: 5%;
  `,
};
