import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Section, SectionsContainer } from "react-fullpage";
import styled from "styled-components/macro";
import variables from "../../styles/variables";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import Footer from "../../components/Footer/Footer";

const MainPage = () => {
  let options = {
    anchors: [
      "sectionOne",
      "sectionTwo",
      "sectionThree",
      "sectionFour",
      "sectionFive",
    ],
  };

  useEffect(() => {
    AOS.init();
  });
  const goTop = () => {
    if (!window.scrollY) return;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <S.All>
        <SectionsContainer {...options}>
          <Section>
            <S.VideoAllBox>
              <S.VideoBox autoPlay muted loop width="1920" height="1080">
                <S.FirstVideo src="/Video/city.mp4" type="video/webm" />
              </S.VideoBox>
            </S.VideoAllBox>
            <S.MessageBox>
              <S.Message>
                <div
                  data-aos="fade-up"
                  data-aos-offset="400"
                  data-aos-duration="1100"
                >
                  <S.MessagePoint>기술로 안전에 기여하다.</S.MessagePoint>
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-offset="300"
                  data-aos-duration="1800"
                >
                  <S.Message>RiderLog</S.Message>
                </div>
              </S.Message>
            </S.MessageBox>
          </Section>
          <Section>
            <S.Image>
              <S.TextCenter>
                <S.Box>
                  <S.RiderImage />
                  <S.Des>
                    <S.MiddleDesMessage>
                      안전운행 유도, 정확한 운행 이력 DATA의 지속적 확보
                    </S.MiddleDesMessage>
                    <S.GrapeBox>
                      <S.GrapeBoxLine>
                        <S.MiddleGrapeMessage>라이더</S.MiddleGrapeMessage>
                        <S.MiddleGrapeCount>
                          <CountUp start={0} end={100} duration={7} />
                        </S.MiddleGrapeCount>
                      </S.GrapeBoxLine>
                      <S.GrapeBoxLine>
                        <S.MiddleGrapeMessage>기지국</S.MiddleGrapeMessage>
                        <S.MiddleGrapeCount>
                          <CountUp start={0} end={51} duration={8} />
                        </S.MiddleGrapeCount>
                      </S.GrapeBoxLine>
                      <S.GrapeBoxLine>
                        <S.MiddleGrapeMessage>이용 회사</S.MiddleGrapeMessage>
                        <S.MiddleGrapeCount>
                          <CountUp start={0} end={33} duration={9} />
                        </S.MiddleGrapeCount>
                      </S.GrapeBoxLine>
                    </S.GrapeBox>
                  </S.Des>
                </S.Box>
              </S.TextCenter>
            </S.Image>
          </Section>
          <Section>
            <Carousel variant="white">
              <Carousel.Item interval={2000}>
                <img
                  className="d-block w-100"
                  src="http://www.star-pickers.com/html/img/section03_bg01.png"
                  alt="First slide"
                  style={{ height: "100vh", opacity: "0.7" }}
                />
                <Carousel.Caption>
                  <S.CarouselMessage>도전과 열정으로 뭉친</S.CarouselMessage>
                  <S.CarouselMessagePoint>
                    별따러가자의 팀원들을
                  </S.CarouselMessagePoint>
                  <S.CarouselMessage>소개합니다.</S.CarouselMessage>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={2000}>
                <img
                  className="d-block w-100"
                  src="http://www.star-pickers.com/html/img/team_member_01.png"
                  alt="Second slide"
                  style={{ height: "100vh", opacity: "0.7" }}
                />
                <Carousel.Caption>
                  <S.TeamInfo>
                    <S.Middle>CEO</S.Middle>
                    <S.Name>박추진/대표</S.Name>
                    <S.Middle>∙ 연세대학교 공학박사</S.Middle>
                    <S.Middle>∙ 엘지디스플레이(주)</S.Middle>
                    <S.Small> - 연구소</S.Small>
                    <S.Small> - 대형 투명 OLED 양산 (신뢰성)</S.Small>
                    <S.Small> - 사내벤처 팀장</S.Small>
                  </S.TeamInfo>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={2000}>
                <img
                  className="d-block w-100"
                  src="http://www.star-pickers.com/html/img/team_member_02.png"
                  alt="Third slide"
                  style={{ height: "100vh", opacity: "0.7" }}
                />
                <Carousel.Caption>
                  <S.TeamInfo>
                    <S.Middle>COO</S.Middle>
                    <S.Name>김경목/이사</S.Name>
                    <S.Middle>∙ 카이스트 공학박사</S.Middle>
                    <S.Middle>∙ 엘지디스플레이(주)</S.Middle>
                    <S.Small> - 연구소</S.Small>
                    <S.Small> - 대형 투명 OLED 양산 (불량분석)</S.Small>
                    <S.Small> - 사내벤처 총무</S.Small>
                  </S.TeamInfo>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={2000}>
                <img
                  className="d-block w-100"
                  src="http://www.star-pickers.com/html/img/team_member_03.png"
                  alt="forth slide"
                  style={{ height: "100vh", opacity: "0.7" }}
                />
                <Carousel.Caption>
                  <S.TeamInfo>
                    <S.Middle>CTO</S.Middle>
                    <S.Name>정성욱/이사</S.Name>
                    <S.Middle>∙ 서울대학교 공학석사</S.Middle>
                    <S.Middle>
                      ∙ 전)서울대학교 공기연소추진연구실(APCL) 전임 연구원
                    </S.Middle>
                  </S.TeamInfo>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={2000}>
                <img
                  className="d-block w-100"
                  src="http://www.star-pickers.com/html/img/team_member_04.png"
                  alt="five slide"
                  style={{ height: "100vh", opacity: "0.7" }}
                />
                <Carousel.Caption>
                  <S.TeamInfo>
                    <S.Middle>대리</S.Middle>
                    <S.Name>이시몽/대리</S.Name>
                    <S.Middle>∙ 칭화대학교</S.Middle>
                    <S.Small>일본어과</S.Small>
                  </S.TeamInfo>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={2000}>
                <img
                  className="d-block w-100"
                  src="http://www.star-pickers.com/html/img/team_member_05.png"
                  alt="six slide"
                  style={{ height: "100vh" }}
                />
                <Carousel.Caption>
                  <S.TeamInfo>
                    <S.Middle>연구원</S.Middle>
                    <S.Name>권윤재/연구원</S.Name>
                    <S.Middle>∙ 숭실대학교</S.Middle>
                    <S.Small>정보통계 보험 수리학과</S.Small>
                  </S.TeamInfo>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Section>
          <Section>
            <S.MenuBox>
              <S.MenuListBoxRiderlog>
                <S.IconCenter>
                  <S.IconBox>
                    <S.Link to="/riderlog" onClick={goTop}>
                      <S.Icon src="/images/motorcycle.png" />
                      <S.IconText>RiderLog</S.IconText>
                    </S.Link>
                  </S.IconBox>
                </S.IconCenter>
              </S.MenuListBoxRiderlog>
              <S.MenuListBoxTech>
                <S.IconCenter>
                  <S.IconBox>
                    <S.Link to="/companytech" onClick={goTop}>
                      <S.Icon src="/images/cpu.png" />
                      <S.IconText>Company/Tech</S.IconText>
                    </S.Link>
                  </S.IconBox>
                </S.IconCenter>
              </S.MenuListBoxTech>
              <S.MenuListBoxNews>
                <S.IconCenter>
                  <S.IconBox>
                    <S.Link to="/newsnotice" onClick={goTop}>
                      <S.Icon src="/images/newspaper.png" />
                      <S.IconText>News/Notice</S.IconText>
                    </S.Link>
                  </S.IconBox>
                </S.IconCenter>
              </S.MenuListBoxNews>
              <S.MenuListBoxContact>
                <S.IconCenter>
                  <S.IconBox>
                    <S.Link to="/contact" onClick={goTop}>
                      <S.Icon src="/images/map.png" />
                      <S.IconText>Contact</S.IconText>
                    </S.Link>
                  </S.IconBox>
                </S.IconCenter>
              </S.MenuListBoxContact>
              <S.MenuListBoxJoin>
                <S.IconCenter>
                  <S.IconBox>
                    <S.Link to="/join" onClick={goTop}>
                      <S.Icon src="/images/hand-shake.png" />
                      <S.IconText>Join</S.IconText>
                    </S.Link>
                  </S.IconBox>
                </S.IconCenter>
              </S.MenuListBoxJoin>
            </S.MenuBox>
          </Section>
          <Section>
            <S.ImageRiderLogTab>
              <S.Center>
                <S.RiderCenter>
                  <S.RiderBox>
                    <S.RiderMessagePoint>
                      Better Life With RIDERLOG
                    </S.RiderMessagePoint>
                    <S.RiderMessage>
                      보다 안전한, 상상만 해도 행복한 세상을 만들어가는
                      별따러가자, 지금 만나보세요.
                    </S.RiderMessage>
                  </S.RiderBox>
                  <S.HiddenBox />
                </S.RiderCenter>
                <S.RiderColorBox>
                  <S.PointBox>
                    <S.Link to="/riderpageclient">
                      <S.RiderMessageTitle>라이더로그</S.RiderMessageTitle>
                      <S.RiderMessageDes>
                        라이더로그를 통하여 안전에 기여하세요.
                      </S.RiderMessageDes>
                      <S.RiderLogo src="http://www.star-pickers.com/html/img/link_riderlog_pc.png" />
                    </S.Link>
                  </S.PointBox>
                </S.RiderColorBox>
              </S.Center>
            </S.ImageRiderLogTab>
            <Footer />
          </Section>
        </SectionsContainer>
      </S.All>
    </>
  );
};

export default MainPage;

const S = {
  All: styled.div`
    background-color: black;
    z-index: 999;
  `,

  HiddenBox: styled.div`
    height: 200px;
  `,

  VideoAllBox: styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  `,

  VideoBox: styled.video`
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    object-fit: cover;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,

  MessageBox: styled.div`
    top: -1480px;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: fixed;
  `,

  MessagePoint: styled.div`
    width: 100%;
    margin: 0 0 auto 30px;
    padding: 0 30px;
    color: #fff;
    font-size: 70px;
    z-index: 999;
  `,

  Message: styled.div`
    width: 100%;
    margin: 0 auto;
    padding: 0 30px;
    color: #fff;
    font-size: 110px;
    z-index: 999;
  `,

  FirstVideo: styled.source``,
  Link: styled(Link)`
    ${variables.flex("column", "center", "center")}
    text-decoration-line: none;
    width: 100%;
    height: 100%;
  `,

  Image: styled.div`
    position: relative;
    background-image: url("http://www.star-pickers.com/html/img/section01_bg02.png");
    width: 100%;
    height: 100%;
  `,

  Des: styled.div`
    margin-left: 200px;
  `,

  MiddleMessage: styled.div`
    margin: 0 auto;
    padding: 0 30px;
    color: #fff;
    font-size: 50px;
    z-index: 999;
  `,

  Box: styled.div`
    height: 500px;
  `,

  TextCenter: styled.div`
    ${variables.flex("column", "center", "")}
    height:100%;
  `,

  Center: styled.div`
    ${variables.flex()}
    height:100%;
    width: 100%;
  `,

  IconCenter: styled.div`
    ${variables.flex()}
    height:63%;
    width: 100%;
  `,

  MiddleDesMessage: styled.div`
    margin: 0 auto;
    padding: 0 30px;
    color: #fff;
    font-size: 30px;
    z-index: 999;
    margin-bottom: 30px;
  `,

  MiddleGrapeMessage: styled.div`
    margin: 0 auto;
    padding: 0 30px;
    color: #fff;
    font-size: 20px;
    z-index: 999;
    text-align: center;
  `,

  MiddleGrapeCount: styled.div`
    margin-top: 50px;
    padding: 0 30px;
    color: #fff;
    font-size: 50px;
    z-index: 999;
    text-align: center;
  `,

  GrapeBox: styled.div`
    ${variables.flex("row")}
    width: 800px;
    height: 150px;
  `,

  GrapeBoxLine: styled.div`
    border-left: 1px solid white;
    border-right: 1px solid white;
    width: 180px;
  `,

  RiderImage: styled.div`
    background-image: url("http://www.star-pickers.com/html/img/section01_img01.png");
    width: 483px;
    height: 331px;
    z-index: 999;
    background-position: -5146px 0px;
    object-fit: cover;
  `,

  CarouselMessage: styled.div`
    color: white;
    font-size: 25px;
    z-index: 999;
  `,

  CarouselMessagePoint: styled.div`
    color: #ffee00;
    font-size: 20px;
    z-index: 999;
  `,

  TeamInfo: styled.div`
    height: 200px;
    z-index: 999;
    transform: translate(-400px, -100px);
  `,

  Middle: styled.div`
    font-size: 25px;
    margin-top: 5px;
    z-index: 999;
    color: #ffffff;
    @media (max-width: 1440px) {
      font-size: 20px;
    }
  `,

  Small: styled.div`
    font-size: 25px;
    color: #ffffff;

    z-index: 999;
    @media (max-width: 1440px) {
      font-size: 20px;
    }
  `,

  Name: styled.div`
    font-size: 50px;
    z-index: 999;
    color: white;

    @media (max-width: 1440px) {
      font-size: 40px;
    }
  `,

  MenuBox: styled.div`
    ${variables.flex()}
    width: 100%;
    height: 100%;
  `,

  MenuListBoxNews: styled.div`
    height: 100%;
    width: 100%;
    background-image: url("https://images.unsplash.com/photo-1560837131-7c9a3329a6cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80");
    background-repeat: no-repeat;
    background-position: bottom;
    opacity: 0.3;

    &:hover {
      opacity: 1;
    }
  `,

  MenuListBoxTech: styled.div`
    height: 100%;
    width: 100%;
    background-image: url("https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80");
    background-repeat: no-repeat;
    background-position: bottom;
    opacity: 0.3;

    &:hover {
      opacity: 1;
    }
  `,

  MenuListBoxRiderlog: styled.div`
    height: 100%;
    width: 100%;
    background-image: url("https://images.unsplash.com/photo-1526367790999-0150786686a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80");
    background-repeat: no-repeat;
    background-position: bottom;
    opacity: 0.3;

    &:hover {
      opacity: 1;
    }
  `,

  MenuListBoxContact: styled.div`
    height: 100%;
    width: 100%;
    background-image: url("https://images.unsplash.com/photo-1580715911453-d6d9cffd5771?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1107&q=80");
    background-repeat: no-repeat;
    background-position: bottom;
    opacity: 0.3;

    &:hover {
      opacity: 1;
    }
  `,

  MenuListBoxJoin: styled.div`
    height: 100%;
    width: 100%;
    background-image: url("https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dGVhbXxlbnwwfDF8MHx8&auto=format&fit=crop&w=800&q=60");
    background-repeat: no-repeat;
    background-position: bottom;
    opacity: 0.3;

    &:hover {
      opacity: 1;
    }
  `,

  IconBox: styled.div`
    ${variables.flex("column", "center", "center")}
    width: 160px;
    height: 160px;
    border-radius: 20px;
    cursor: pointer;
    transition: 0.5s;
    &:hover {
      transform: scale(1.4);
    }
  `,

  Icon: styled.img`
    width: 80%;
    height: 80%;
  `,

  IconText: styled.div`
    color: white;
    font-size: 25px;
  `,

  ImageRiderLogTab: styled.div`
    position: relative;
    background-image: url("/images/riderlogback.jpg");
    width: 100%;
    height: 88%;
    background-size: cover;
  `,

  RiderMessagePoint: styled.div`
    width: 100%;
    margin: 0 0 auto 30px;
    padding: 0 30px;
    color: #fff;
    font-size: 55px;
    z-index: 999;
  `,

  RiderMessage: styled.div`
    width: 100%;
    margin: 0 auto;
    padding: 0 30px;
    color: #fff;
    font-size: 30px;
    z-index: 999;
  `,

  RiderCenter: styled.div`
    ${variables.flex("column", "center", "flex-start")}
    height: 700px;
  `,

  RiderBox: styled.div`
    height: 200px;
    width: 820px;
  `,

  PointBox: styled.div`
    ${variables.flex("column", "center", "center")}
    height:70%;
  `,

  RiderLogo: styled.img`
    width: 180px;
    height: 50px;
  `,

  RiderMessageTitle: styled.div`
    font-size: 30px;
    color: #fff;
  `,

  RiderMessageDes: styled.div`
    font-size: 15px;
    color: #fff;
    margin: 20px 0 20px;
  `,

  RiderColorBox: styled.div`
    ${variables.flex()}
    width: 300px;
    height: 350px;
    opacity: 0.8;
    transition: 0.5s;
    border-radius: 3px;
    cursor: pointer;
    animation: motion 0.3s linear 0s infinite alternate;

    @keyframes motion {
      0% {
        margin-top: 0px;
      }
      100% {
        margin-top: 10px;
      }
    }

    &:hover {
      opacity: 1;
      transform: scale(1.05);
    }
  `,
};
