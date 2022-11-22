import React, { useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import NavbarBlock from "../../../components/Nav/NavBlock";
import AOS from "aos";
import "aos/dist/aos.css";
import styled from "styled-components";
import variables from "../../../styles/variables";
const Contact = () => {
  useEffect(() => {
    AOS.init();
  });
  return (
    <>
      <S.ContactMainImage>
        <NavbarBlock />
        <S.ContactMainImageMessage>
          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-duration="1000"
          >
            찾아오시는 길
          </div>
        </S.ContactMainImageMessage>
      </S.ContactMainImage>
      <S.Center>
        <S.Contact>
          <div
            data-aos="fade-up"
            data-aos-offset="300"
            data-aos-duration="1000"
          >
            CONTACT
          </div>
        </S.Contact>
      </S.Center>
      <S.Center>
        <Map
          center={{
            lat: 37.5234,
            lng: 126.9234,
          }}
          style={{
            width: "100%",
            height: "450px",
          }}
          level={4}
        >
          <MapMarker
            position={{
              lat: 37.5234,
              lng: 126.9234,
            }}
          >
            <S.Text>서울핀테크랩</S.Text>
          </MapMarker>
        </Map>
      </S.Center>
      <S.Center>
        <S.MessageBox>
          <S.MessageBoxLeft>
            <S.IconOne />
            <S.Message>찾아오시는 길 : </S.Message>
            <S.MessagePoint>
              서울특별시 영등포구 의사당대로 83, 서울핀테크랩 5층 105호
            </S.MessagePoint>
          </S.MessageBoxLeft>
          <S.MessageBoxRight>
            <S.IconTwo /> <S.Message>전화번호 : </S.Message>
            <S.MessagePoint>070-4415-2662</S.MessagePoint>
            <S.IconThree /> <S.Message>이메일 : </S.Message>
            <S.MessagePoint>support@star-pickers.com</S.MessagePoint>
          </S.MessageBoxRight>
        </S.MessageBox>
      </S.Center>
    </>
  );
};

export default Contact;
const S = {
  ContactMainImage: styled.div`
    position: relative;
    width: 100%;
    height: 300px;
    background-image: url("http://www.star-pickers.com/html/img/sub_visual07.png");
  `,

  ContactMainImageMessage: styled.div`
    position: absolute;
    color: #fff;
    font-size: 50px;
    text-align: center;
    top: 50%;
    width: 100%;
    font-weight: 300;
    letter-spacing: -2px;
  `,

  VisionMessageBox: styled.div`
    position: absolute;
    top: 20%;
    left: 60%;
  `,

  Center: styled.div`
    ${variables.flex()}
    margin: 40px;
  `,

  Contact: styled.div`
    font-size: 50px;
    font-weight: 600;
  `,

  Text: styled.div`
    ${variables.flex()};
    margin: 10px 30px;
  `,

  MessageBox: styled.div`
    ${variables.flex()}
    width: 80%;
    height: 100%;
    border-top: 2px solid black;
  `,

  MessageBoxLeft: styled.div`
    ${variables.flex()}
    width:700px;
  `,

  MessageBoxRight: styled.div`
    ${variables.flex()}
    width: 500px;
  `,

  IconOne: styled.div`
    background-image: url("http://www.star-pickers.com/html/img/map_icons.png");
    background-position: 0 0;
    width: 30px;
    height: 32px;
    margin: 10px;
  `,

  IconTwo: styled.div`
    background-image: url("http://www.star-pickers.com/html/img/map_icons.png");
    background-position: -30px 0;
    width: 30px;
    height: 32px;
    margin: 10px;
  `,

  IconThree: styled.div`
    background-image: url("http://www.star-pickers.com/html/img/map_icons.png");
    background-position: -60px 0;
    width: 30px;
    height: 32px;
    margin: 10px;
  `,

  Message: styled.div`
    font-size: 15px;
    font-weight: 400;

    @media (max-width: 1440px) {
      font-size: 13px;
    }
  `,

  MessagePoint: styled.div`
    font-size: 15px;
    font-weight: 300;
    color: gray;

    @media (max-width: 1440px) {
      font-size: 13px;
    }
  `,
};
