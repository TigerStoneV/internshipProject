import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import News from "./News/News";
import Notice from "./Notice/Notice";
import variables from "../styles/variables";
import styled from "styled-components";
import NavbarBlock from "../components/Nav/NavBlock";

function NewsNotice() {
  return (
    <>
      <S.NoticeMainImage>
        <NavbarBlock />
        <S.NoticeMainImageMessage>
          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-duration="1000"
          >
            별따러가자 소식
          </div>
        </S.NoticeMainImageMessage>
      </S.NoticeMainImage>
      <Tabs
        defaultActiveKey="News"
        id="fill-tab-example"
        className="mb-3"
        fill
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          fontSize: "30px",
        }}
      >
        <Tab eventKey="News" title="News">
          <News />
        </Tab>
        <Tab eventKey="Notice" title="Notice">
          <Notice />
        </Tab>
      </Tabs>
    </>
  );
}

export default NewsNotice;

const S = {
  NoticeMainImage: styled.div`
    position: relative;
    width: 100%;
    height: 300px;
    background-image: url("http://www.star-pickers.com/html/img/sub_visual02.png");
    margin-bottom: 30px;
  `,

  NoticeMainImageMessage: styled.div`
    position: absolute;
    color: #fff;
    font-size: 50px;
    text-align: center;
    top: 50%;
    width: 100%;
    font-weight: 100;
    letter-spacing: -2px;
  `,

  Center: styled.div`
    ${variables.flex()}
    margin: 20px;
  `,

  NewsNotice: styled.div`
    font-size: 50px;
    font-weight: 600;
  `,
};
