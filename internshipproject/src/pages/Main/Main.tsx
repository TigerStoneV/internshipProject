import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Animator,
  ScrollContainer,
  ScrollPage,
  batch,
  Fade,
  MoveOut,
  Sticky,
} from "react-scroll-motion";
import styled from "styled-components/macro";
import variables from "../../styles/variables";
import { Carousel } from "react-bootstrap";
import NavbarStar from "../../components/Nav/Nav";

const Main = () => {
  useEffect(() => {
    AOS.init();
  });
  return (
    <>
      <NavbarStar />
      <ScrollContainer>
        <S.MainBackground>
          <ScrollPage page={1}>
            <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -200))}>
              <S.MainCenter>
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
              </S.MainCenter>
            </Animator>
          </ScrollPage>
          <S.MessageCenter>
            <div
              data-aos="fade-left"
              data-aos-offset="600"
              data-aos-duration="700"
            >
              <S.MessageBox>
                <S.Message>안전운행 유도 </S.Message>
                <S.Message>정확한 운행 이력 DATA의 지속적 확보</S.Message>
              </S.MessageBox>
            </div>
          </S.MessageCenter>
        </S.MainBackground>
      </ScrollContainer>
      <S.MainBackgroundTwo>
        <div data-aos="fade-up" data-aos-offset="700" data-aos-duration="2000">
          <S.MainPhone src="http://www.star-pickers.com/html/img/section02_img01.png" />
        </div>
        <S.MainTextTwo>
          <div
            data-aos="fade-up"
            data-aos-offset="500"
            data-aos-duration="1000"
          >
            <S.MainTop>
              <S.MainBackgroundTextFirst>세계 최초의</S.MainBackgroundTextFirst>
              <S.MainBackgroundTextStar>
                H/W기반 인슈테이크 플렛폼을 서비스합니다.
              </S.MainBackgroundTextStar>
            </S.MainTop>
          </div>
          <S.Center>
            <div
              data-aos="fade-up"
              data-aos-offset="400"
              data-aos-duration="1500"
            >
              <S.MainBackgroundTextEffect>
                동기부여 및 필요성 인식을 바탕으로 이륜차의 안전운전 유도
              </S.MainBackgroundTextEffect>
            </div>
            <div
              data-aos="fade-up"
              data-aos-offset="400"
              data-aos-duration="2000"
            >
              <S.MainBackgroundTextEffect>
                실시간 운행 모니터링으로 라이더의 상태 파악
              </S.MainBackgroundTextEffect>
            </div>
            <div
              data-aos="fade-up"
              data-aos-offset="400"
              data-aos-duration="2500"
            >
              <S.MainBackgroundTextEffect>
                사고시 즉각 대처 및 기록 확인
              </S.MainBackgroundTextEffect>
            </div>
          </S.Center>
        </S.MainTextTwo>
        <div data-aos="fade-right" data-aos-offset="2100">
          <S.BottomMessageBox>
            <S.Message>" 소형 모빌리티의 관제 및 운행기록을 </S.Message>
            <S.Message>제공합니다. "</S.Message>
          </S.BottomMessageBox>
        </div>
      </S.MainBackgroundTwo>

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
    </>
  );
};
export default Main;

const S = {
  MainAll: styled.div`
    ${variables.flex("column", "center", "center")};
  `,

  MainCenter: styled.div`
    width: 1200px;
  `,

  Center: styled.div`
    ${variables.flex("column", "center", "center")};
    margin: 100px;
  `,

  MainBackground: styled.div`
    position: relative;
    background-image: url("http://www.star-pickers.com/html/img/section01_bg01.png");
    width: 100%;
    height: 200vh;
  `,

  MainBackgroundTwo: styled.div`
    position: relative;
    background-image: url("http://www.star-pickers.com/html/img/section02_bg01.png");
    width: 100%;
    height: 250vh;
  `,

  MainText: styled.div`
    ${variables.flex("column", "center", "center")}
    position: absolute;
    top: 250px;
    left: 38%;
    height: 100%;
    width: 800px;
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
    z-index: 100;
    left: -300px;
    top: -300px;
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
    ${variables.flex("column", "center", "center")}
    width:100%;
  `,

  MessageBox: styled.div`
    ${variables.flex("column", "center", "center")}
    height:100vh;
  `,

  Message: styled.div`
    transform: translate(0, -40px);
    font-size: 60px;
    color: rgb(250, 250, 250);
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
    z-index: 100;
    top: 50px;
    left: 200px;
    margin-top: 0;
    width: 50%;
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
    font-size: 80px;
    color: rgb(250, 250, 250);
    width: 700px;
  `,

  MainTop: styled.div`
    position: relative;
  `,

  MainBackgroundTextStar: styled.div`
    font-size: 50px;
    width: 1000px;
    margin-left: 70px;
    color: #ffee00;
    width: 900px;
    margin-bottom: 0;
  `,

  MainBackgroundTextEffect: styled.div`
    font-size: 40px;
    width: 1000px;
    color: rgb(250, 250, 250);
    margin: 30px 0 30px;
  `,

  MainTextTwo: styled.div`
    ${variables.flex("column", "center", "center")}
    position: absolute;
    left: 35%;
    height: 100%;
    width: 800px;
  `,

  BottomMessageBox: styled.div`
    ${variables.flex("column", "center", "center")}
    position:absolute;
    left: 50%;
    top: 1400px;
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
