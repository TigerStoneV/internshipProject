import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styled from "styled-components";
import variables from "../../../styles/variables";

const Company = () => {
  useEffect(() => {
    AOS.init();
  });
  return (
    <>
      <S.Center>
        <S.Vision>
          <div
            data-aos="fade-up"
            data-aos-offset="300"
            data-aos-duration="1000"
          >
            VISION
          </div>
        </S.Vision>
      </S.Center>
      <S.VisionMainImage>
        <S.VisionMessageBox>
          <div
            data-aos="fade-up"
            data-aos-offset="250"
            data-aos-duration="1000"
          >
            <S.VisionMainImageMessage>차별화된</S.VisionMainImageMessage>
            <S.VisionMainImageMessage>
              기술력과 뛰어난 인력으로
            </S.VisionMainImageMessage>
            <S.VisionMainImageMessage>
              모빌리티 안전 사각지대를 해소하겠습니다
            </S.VisionMainImageMessage>
          </div>
        </S.VisionMessageBox>
      </S.VisionMainImage>
      <S.Center>
        <S.IconBox>
          <S.IconOne />
          <S.IconText>
            동기부여 및 필요성 인식을 바탕으로 이륜차의 안전운전 유도
          </S.IconText>
        </S.IconBox>
        <S.IconBox>
          <S.IconTwo />
          <S.IconText>실시간 운행 모니터링으로 라이더의 상태 파악</S.IconText>
        </S.IconBox>
        <S.IconBox>
          <S.IconThree />
          <S.IconText>사고시 즉각 대처 및 기록 확인</S.IconText>
        </S.IconBox>
        <S.IconBox>
          <S.IconFour />
          <S.IconText>보험료 할인을 통한 보험사각지대 해소</S.IconText>
        </S.IconBox>
      </S.Center>
      <S.RiderMainImage>
        <S.RiderMessageBox>
          <div
            data-aos="fade-up"
            data-aos-offset="300"
            data-aos-duration="1000"
          >
            <S.RiderMainImageMessage>
              안전한 운행 동기 부여로 이륜차 운전자의
            </S.RiderMainImageMessage>
            <S.RiderMainImageMessage>잠재적 위험 해소</S.RiderMainImageMessage>
          </div>
        </S.RiderMessageBox>
      </S.RiderMainImage>
      <S.Center>
        <S.RiderIconBox>
          <S.RiderIconOne />
          <S.IconText>
            동기부여 및 필요성 인식을 바탕으로 이륜차의 안전운전 유도
          </S.IconText>
        </S.RiderIconBox>
        <S.RiderIconBox>
          <S.RiderIconTwo />
          <S.IconText>실시간 운행 모니터링으로 라이더의 상태 파악</S.IconText>
        </S.RiderIconBox>
        <S.RiderIconBox>
          <S.RiderIconThree />
          <S.IconText>사고시 즉각 대처 및 기록 확인</S.IconText>
        </S.RiderIconBox>
      </S.Center>
      <S.Center>
        <div data-aos="fade-up" data-aos-offset="300" data-aos-duration="1000">
          <S.Vision>RODEMAP</S.Vision>
        </div>
      </S.Center>
      <div data-aos="fade-up" data-aos-offset="300" data-aos-duration="1000">
        <S.RodemapImage src="http://www.star-pickers.com/html/img/vision_roadmap.png" />
      </div>
    </>
  );
};

export default Company;

const S = {
  CompanyMainImage: styled.div`
    position: relative;
    width: 100%;
    height: 400px;
    background-image: url("http://www.star-pickers.com/html/img/sub_visual02.png");
  `,

  CompnayMainImageMessage: styled.div`
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
    margin: 30px;
  `,

  Vision: styled.div`
    font-size: 50px;
    font-weight: 600;
  `,

  VisionMainImage: styled.div`
    position: relative;
    width: 100%;
    height: 300px;
    background-image: url("http://www.star-pickers.com/html/img/vision_bg_01.png");
  `,

  VisionMainImageMessage: styled.div`
    color: #fff;
    font-size: 40px;
    text-align: center;
    width: 100%;
    font-weight: 400;
    letter-spacing: -2px;

    @media (max-width: 1440px) {
      width: 66%;
      font-size: 30px;
      transform: translate(200px);
    }
  `,

  IconOne: styled.div`
    background-image: url("http://www.star-pickers.com/html/img/vision_icons_01.png");
    background-position: 0 0;
    width: 99px;
    height: 80px;
    margin-bottom: 20px;
  `,

  IconTwo: styled.div`
    background-image: url("http://www.star-pickers.com/html/img/vision_icons_01.png");
    background-position: -99px 0;
    width: 99px;
    height: 80px;
    margin-bottom: 20px;
  `,

  IconThree: styled.div`
    background-image: url("http://www.star-pickers.com/html/img/vision_icons_01.png");
    background-position: -198px 0;
    width: 99px;
    height: 80px;
    margin-bottom: 20px;
  `,

  IconFour: styled.div`
    background-image: url("http://www.star-pickers.com/html/img/vision_icons_01.png");
    background-position: -297px 0;
    width: 99px;
    height: 80px;
    margin-bottom: 20px;
  `,

  IconBox: styled.div`
    ${variables.flex("column", "center", "center")}
    width: 270px;
    height: 270px;
    border: 1px solid #333;
    border-top: 5px solid #f5821f;
    text-align: center;
    margin: 30px;
  `,

  IconText: styled.div`
    width: 170px;
    margin-top: 20px;
  `,

  RiderMainImage: styled.div`
    position: relative;
    width: 100%;
    height: 300px;
    background-image: url("http://www.star-pickers.com/html/img/vision_bg_02.png");
    margin: 30px 0 50px;
  `,

  RiderMainImageMessage: styled.div`
    color: #fff;
    font-size: 40px;
    text-align: center;
    width: 100%;
    font-weight: 400;
    letter-spacing: -2px;
  `,

  RiderMessageBox: styled.div`
    position: absolute;
    top: 30%;
    left: 10%;
  `,

  RiderIconOne: styled.div`
    background-image: url("http://www.star-pickers.com/html/img/vision_icons_02.png");
    background-position: 0 0;
    width: 140px;
    height: 140px;
    margin: 0 20px 0 20px;
  `,

  RiderIconTwo: styled.div`
    background-image: url("http://www.star-pickers.com/html/img/vision_icons_02.png");
    background-position: -140px 0;
    width: 140px;
    height: 140px;
    margin: 0 20px 0 20px;
  `,

  RiderIconThree: styled.div`
    background-image: url("http://www.star-pickers.com/html/img/vision_icons_02.png");
    background-position: -280px 0;
    width: 140px;
    height: 140px;
    margin: 0 20px 0 20px;
  `,

  RiderIconBox: styled.div`
    ${variables.flex()}
    width: 400px;
    text-align: center;
    margin: 50px;
  `,

  RodemapImage: styled.img`
    width: 100%;
    height: 700px;
    margin: 30px 0 50px;
  `,
};
