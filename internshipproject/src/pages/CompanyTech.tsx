import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import variables from "../styles/variables";
import styled from "styled-components";
import NavbarBlock from "../components/Nav/NavBlock";
import Company from "./Introduce/Company/Company";
import Tech from "./Introduce/Tech/Tech";

function CompanyTech() {
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
            세계 최초의 하드웨어 기반 인슈어테크 (INSURE-TECH) 플랫폼
          </div>
        </S.NoticeMainImageMessage>
      </S.NoticeMainImage>
      <Tabs
        defaultActiveKey="Tech"
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
        <Tab eventKey="Company" title="Company">
          <Company />
        </Tab>
        <Tab eventKey="Tech" title="Tech">
          <Tech />
        </Tab>
      </Tabs>
    </>
  );
}

export default CompanyTech;

const S = {
  NoticeMainImage: styled.div`
    position: relative;
    width: 100%;
    height: 300px;
    background-image: url("http://www.star-pickers.com/html/img/sub_visual04.png");
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
