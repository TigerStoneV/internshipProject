import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styled from "styled-components";
import variables from "../../styles/variables";
import { Carousel } from "react-bootstrap";
const Main = () => {
  useEffect(() => {
    AOS.init();
  });
  return (
    <S.MainAll>
      <S.MainBackground>
        <S.MainFinger src="http://www.star-pickers.com/html/img/section01_img01.png" />
        <S.MainText>
          <S.MainBackgroundText>
            <div data-aos="fade-top" data-aos-duration="1000">
              센서 기반 소형 모빌리티 관제 솔루션
            </div>
          </S.MainBackgroundText>
          <S.MainBackgroundTextRiderLog>
            <div data-aos="fade-left" data-aos-duration="1000">
              라이더 로그(RIDER LOG)
            </div>
          </S.MainBackgroundTextRiderLog>
        </S.MainText>
      </S.MainBackground>
      <S.MainMessageBackground />
      <S.MessageCenter>
        <div data-aos="fade-left" data-aos-duration="2000">
          <S.MessageBox>
            <S.Message>안전운행 유도 </S.Message>
            <S.Message>정확한 운행 이력 DATA의 지속적 확보</S.Message>
          </S.MessageBox>
        </div>
      </S.MessageCenter>
      <S.MainBackgroundTwo>
        <S.MainPhone src="http://www.star-pickers.com/html/img/section02_img01.png" />
        <S.MainTextTwo>
          <S.MainBackgroundTextFirst>
            <div data-aos="fade-top" data-aos-duration="1000">
              세계 최초의
            </div>
          </S.MainBackgroundTextFirst>
          <S.MainBackgroundTextStar>
            <div data-aos="fade-left" data-aos-duration="1000">
              H/W기반 인슈테이크 플렛폼을 서비스합니다.
            </div>
          </S.MainBackgroundTextStar>
        </S.MainTextTwo>
      </S.MainBackgroundTwo>
      <S.MainMessageBackground />
      <S.MessageCenter>
        <div
          data-aos="fade-left"
          data-aos-offset="2500"
          data-aos-duration="2000"
        >
          <S.BottomMessageBox>
            <S.Message>소형 모빌리티의 관제 및 운행기록을 </S.Message>
            <S.Message>제공합니다.</S.Message>
          </S.BottomMessageBox>
        </div>
      </S.MessageCenter>
      <Carousel variant="white">
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src="http://www.star-pickers.com/html/img/section03_bg01.png"
            alt="First slide"
          />
          <Carousel.Caption>
            <S.CarouselMessage>도전과 열정으로 뭉친</S.CarouselMessage>
            <S.CarouselMessagePoint>
              <div data-aos="fade-left" data-aos-duration="500">
                별따러가자의 팀원들을
              </div>
            </S.CarouselMessagePoint>
            <S.CarouselMessage>소개합니다.</S.CarouselMessage>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src="http://www.star-pickers.com/html/img/section03_bg03.png"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src="http://www.star-pickers.com/html/img/section03_bg04.png"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src="http://www.star-pickers.com/html/img/section03_bg05.png"
            alt="forth slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src="http://www.star-pickers.com/html/img/section03_bg06.png"
            alt="five slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src="http://www.star-pickers.com/html/img/section03_bg07.png"
            alt="six slide"
          />
        </Carousel.Item>
      </Carousel>
    </S.MainAll>
  );
};

export default Main;

const S = {
  MainAll: styled.div`
    ${variables.flex("column", "center", "center")};
  `,

  MainBackground: styled.div`
    position: relative;
    background-image: url("http://www.star-pickers.com/html/img/section01_bg01.png");
    width: 100%;
    height: 100vh;
  `,
  MainBackgroundTwo: styled.div`
    position: relative;
    background-image: url("http://www.star-pickers.com/html/img/section02_bg01.png");
    width: 100%;
    height: 100vh;
  `,
  MainText: styled.div`
    ${variables.flex("column", "center", "center")}
    position: absolute;
    top: 270px;
    left: 38%;
    height: 100%;
  `,
  MainBackgroundText: styled.div`
    font-size: 50px;
    color: rgb(250, 250, 250);
  `,
  MainBackgroundTextRiderLog: styled.div`
    font-size: 80px;
    color: #ffee00;
  `,

  MainFinger: styled.img`
    position: absolute;
    width: 80%;
    left: 0;
    top: 110px;
    z-index: 100;
    margin-top: 0;
    animation: motion 0.4s linear 0s infinite alternate;

    @keyframes motion {
      0% {
        margin-top: 0px;
      }
      100% {
        margin-top: 10px;
      }
    }
  `,

  MainMessageBackground: styled.div`
    position: relative;
    width: 90%;
    height: 100vh;
    background-color: rgb(250, 250, 250);
  `,
  MessageCenter: styled.div`
    position: absolute;
    width: 1200px;
    height: 100vh;
    top: 100vh;
  `,
  MessageBox: styled.div`
    ${variables.flex("column", "center", "center")}
    height:100vh;
  `,
  Message: styled.div`
    transform: translate(0, -40px);
    font-size: 60px;
  `,
  TopEfftect: styled.img`
    position: fixed;
    top: -500px;
    left: -300px;
    width: 400px;
    height: 400px;
    z-index: 999px;
  `,
  MainPhone: styled.img`
    position: absolute;
    width: 50%;
    left: 0;
    top: 110px;
    z-index: 100;
    margin-top: 0;
    animation: motion 0.4s linear 0s infinite alternate;

    @keyframes motion {
      0% {
        margin-top: 0px;
      }
      100% {
        margin-top: 10px;
      }
    }
  `,
  MainBackgroundTextFirst: styled.div`
    font-size: 50px;
    color: rgb(250, 250, 250);
  `,

  MainBackgroundTextStar: styled.div`
    font-size: 40px;
    color: #ffee00;
    margin-bottom: 0;
  `,
  MainTextTwo: styled.div`
    ${variables.flex("column", "center", "center")}
    position: absolute;
    top: 250px;
    left: 35%;
    height: 100%;
  `,
  BottomMessageBox: styled.div`
    ${variables.flex("column", "center", "center")}
    position:absolute;
    left: 50%;
    top: 1600px;
    height: 100vh;
    width: 1200px;
    transform: translate(-50%);
  `,
  CarouselMessage: styled.div`
    color: white;
    font-size: 50px;
    z-index: 999;
  `,
  CarouselMessagePoint: styled.div`
    color: #ffee00;
    font-size: 40px;
    z-index: 999;
  `,
};
