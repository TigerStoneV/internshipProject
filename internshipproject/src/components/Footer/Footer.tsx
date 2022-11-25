import React from "react";
import FooterOffCanvas from "./FooterOffcanvas";
import styled from "styled-components/macro";
import variables from "../../styles/variables";

const Footer = () => {
  return (
    <>
      <S.FooterBox>
        <S.FooterCenter>
          <S.FooterLogoBox>
            <S.FooterLogo
              src="http://www.star-pickers.com/html/img/logo_gray.png"
              alt="별따러가자 로고"
            />
            <S.FooterLogo
              src="http://www.star-pickers.com/html/img/logo_riderlog.png"
              alt="라이더로그 로고"
            />
          </S.FooterLogoBox>
          <S.FooterMessageBox>
            <S.FooterMessage>서비스용 개인 정보처리 방침</S.FooterMessage>
            <S.FooterMessage>위치기반 서비스 이용 약관</S.FooterMessage>
          </S.FooterMessageBox>
          <S.ButtonBox>
            {["bottom"].map((placement, idx) => (
              <FooterOffCanvas
                key={idx}
                placement={placement}
                name={placement}
              />
            ))}
          </S.ButtonBox>
        </S.FooterCenter>
      </S.FooterBox>
    </>
  );
};

export default Footer;

const S = {
  FooterBox: styled.div`
    ${variables.flex()}
    width: 100%;
    height: 100px;
    background-color: #212121;
  `,

  FooterCenter: styled.div`
    ${variables.flex()}
    width: 1400px;
    height: 100%;
  `,

  FooterLogoBox: styled.div`
    ${variables.flex()}
    width: 30%;
  `,

  FooterLogo: styled.img`
    width: 140px;
    height: 55px;
    margin: 0 40px 0 20px;
  `,

  FooterMessageBox: styled.div`
    width: 700px;
  `,

  FooterMessage: styled.div`
    color: rgb(250, 250, 250);
    font-size: 12px;
  `,

  ButtonBox: styled.div`
    ${variables.flex()}
    width:200px;
  `,
};
