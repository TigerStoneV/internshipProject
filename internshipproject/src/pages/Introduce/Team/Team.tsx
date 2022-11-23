import React, { useEffect } from "react";
import NavbarBlock from "../../../components/Nav/NavBlock";
import AOS from "aos";
import "aos/dist/aos.css";
import styled from "styled-components/macro";
import { Carousel } from "react-bootstrap";
import variables from "../../../styles/variables";

const Team = () => {
  useEffect(() => {
    AOS.init();
  });
  return (
    <>
      <S.TeamMainImage>
        <NavbarBlock />
        <S.TeamMainImageMessage>
          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-duration="1000"
          >
            꿈을 따는 청춘들의 열정 <b>"별따러가자"</b>
          </div>
        </S.TeamMainImageMessage>
      </S.TeamMainImage>
      <S.Center>
        <S.Team>
          <div
            data-aos="fade-up"
            data-aos-offset="300"
            data-aos-duration="1000"
          >
            Team
          </div>
        </S.Team>
      </S.Center>
      <Carousel slide={false}>
        <Carousel.Item>
          <S.CarouselBox>
            <S.CarouselImage
              src="http://www.star-pickers.com/html/img/team_member_01.png"
              alt="First slide"
            />
            <S.CarouselBackground>
              <S.CarouselMessageBox>
                <S.CarouselMessage>
                  기술로 창조하는 휴먼태크, 인간애를 중심으로 기술을 만듭니다.
                </S.CarouselMessage>
              </S.CarouselMessageBox>
            </S.CarouselBackground>
          </S.CarouselBox>
        </Carousel.Item>
        <Carousel.Item>
          <S.CarouselBox>
            <S.CarouselImage
              src="http://www.star-pickers.com/html/img/team_member_02.png"
              alt="Second slide"
            />
            <S.CarouselBackground>
              <S.CarouselMessageBox>
                <S.CarouselMessage>
                  고객과 같이 성장하는 회사를 만듭니다.
                </S.CarouselMessage>
              </S.CarouselMessageBox>
            </S.CarouselBackground>
          </S.CarouselBox>
        </Carousel.Item>
        <Carousel.Item>
          <S.CarouselBox>
            <S.CarouselImage
              src="http://www.star-pickers.com/html/img/team_member_03.png"
              alt="Third slide"
            />
            <S.CarouselBackground>
              <S.CarouselMessageBox>
                <S.CarouselMessage>
                  모두를 위한 기술을 위해 불철주야 노력하고 있습니다.
                </S.CarouselMessage>
              </S.CarouselMessageBox>
            </S.CarouselBackground>
          </S.CarouselBox>
        </Carousel.Item>
        <Carousel.Item>
          <S.CarouselBox>
            <S.CarouselImage
              src="http://www.star-pickers.com/upload/member/team_member_04%20[1].png"
              alt="Forth slide"
            />
            <S.CarouselBackground>
              <S.CarouselMessageBox>
                <S.CarouselMessage>
                  동북아를 잇는 가교가 되고 싶은 연구원
                </S.CarouselMessage>
              </S.CarouselMessageBox>
            </S.CarouselBackground>
          </S.CarouselBox>
        </Carousel.Item>
        <Carousel.Item>
          <S.CarouselBox>
            <S.CarouselImage
              src="http://www.star-pickers.com/upload/member/team_member_05%20[4].png"
              alt="Fifth slide"
            />
            <S.CarouselBackground>
              <S.CarouselMessageBox>
                <S.CarouselMessage>
                  데이터를 통해, 우리의 사회의 사각지대를 보살피겠습니다.
                </S.CarouselMessage>
              </S.CarouselMessageBox>
            </S.CarouselBackground>
          </S.CarouselBox>
        </Carousel.Item>
      </Carousel>
      <S.TeamAllBox>
        <S.TeamBox>
          <S.TeamPhoto
            src="http://www.star-pickers.com/upload/member/team_member_01%20[1].png"
            alt="image"
          />
          <S.TeamInfo>
            <div
              data-aos="fade-up"
              data-aos-offset="300"
              data-aos-duration="1000"
            >
              <S.Middle>CEO</S.Middle>
              <S.Name>박추진/대표</S.Name>
              <S.Middle>∙ 연세대학교 공학박사</S.Middle>
              <S.Middle>∙ 엘지디스플레이(주)</S.Middle>
              <S.Small> - 연구소</S.Small>
              <S.Small> - 대형 투명 OLED 양산 (신뢰성)</S.Small>
              <S.Small> - 사내벤처 팀장</S.Small>
            </div>
          </S.TeamInfo>
        </S.TeamBox>
        <S.TeamBox>
          <S.TeamPhoto
            src="http://www.star-pickers.com/upload/member/team_member_02%20[1].png"
            alt="image"
          />
          <S.TeamInfo>
            <S.TeamInfo>
              <div
                data-aos="fade-up"
                data-aos-offset="300"
                data-aos-duration="1000"
                data-aos-delay="50"
              >
                <S.Middle>COO</S.Middle>
                <S.Name>김경목/이사</S.Name>
                <S.Middle>∙ 카이스트 공학박사</S.Middle>
                <S.Middle>∙ 엘지디스플레이(주)</S.Middle>
                <S.Small> - 연구소</S.Small>
                <S.Small> - 대형 투명 OLED 양산 (불량분석)</S.Small>
                <S.Small> - 사내벤처 총무</S.Small>
              </div>
            </S.TeamInfo>
          </S.TeamInfo>
        </S.TeamBox>
        <S.TeamBox>
          <S.TeamPhoto
            src="http://www.star-pickers.com/upload/member/team_member_03.png"
            alt="image"
          />
          <S.TeamInfo>
            <S.TeamInfo>
              <S.TeamInfo>
                <div
                  data-aos="fade-up"
                  data-aos-offset="300"
                  data-aos-duration="1000"
                  data-aos-delay="100"
                >
                  <S.Middle>CTO</S.Middle>
                  <S.Name>정성욱/이사</S.Name>
                  <S.Middle>∙ 서울대학교 공학석사</S.Middle>
                  <S.Middle>
                    ∙ 전)서울대학교 공기연소추진연구실(APCL) 전임 연구원
                  </S.Middle>
                </div>
              </S.TeamInfo>
            </S.TeamInfo>
          </S.TeamInfo>
        </S.TeamBox>
        <S.TeamBox>
          <S.TeamPhoto src="" />
          <S.TeamInfo>
            <S.TeamInfo>
              <S.TeamInfo>
                <div
                  data-aos="fade-up"
                  data-aos-offset="300"
                  data-aos-duration="1000"
                  data-aos-delay="150"
                >
                  <S.Middle>연구실장</S.Middle>
                  <S.Name>윤찬호/실장</S.Name>
                  <S.Middle>∙ 성균관대 전자공학과</S.Middle>
                  <S.Middle>∙ 삼성전자</S.Middle>
                  <S.Small> - 네트워크 사업부 프로젝트 리더</S.Small>
                  <S.Small> - 장영실상 2회 등</S.Small>
                  <S.Small>
                    - CDMA, IMT-2000, WiBro 등 세계최초 상용제품 개발
                  </S.Small>
                  <S.Small> - WCDMA, LTE 등 기타 무선기술 개발</S.Small>
                </div>
              </S.TeamInfo>
            </S.TeamInfo>
          </S.TeamInfo>
        </S.TeamBox>
        <S.TeamBox>
          <S.TeamPhoto
            src="http://www.star-pickers.com/upload/member/team_member_04%20[1].png"
            alt="image"
          />
          <S.TeamInfo>
            <S.TeamInfo>
              <S.TeamInfo>
                <div
                  data-aos="fade-up"
                  data-aos-offset="300"
                  data-aos-duration="1000"
                  data-aos-delay="500"
                >
                  <S.Middle>대리</S.Middle>
                  <S.Name>이시몽/대리</S.Name>
                  <S.Middle>∙ 칭화대학교</S.Middle>
                  <S.Small>일본어과</S.Small>
                </div>
              </S.TeamInfo>
            </S.TeamInfo>
          </S.TeamInfo>
        </S.TeamBox>
        <S.TeamBox>
          <S.TeamPhoto
            src="http://www.star-pickers.com/upload/member/team_member_05%20[4].png"
            alt="image"
          />
          <S.TeamInfo>
            <S.TeamInfo>
              <S.TeamInfo>
                <div
                  data-aos="fade-up"
                  data-aos-offset="300"
                  data-aos-duration="1000"
                  data-aos-delay="600"
                >
                  <S.Middle>연구원</S.Middle>
                  <S.Name>권윤재/연구원</S.Name>
                  <S.Middle>∙ 숭실대학교</S.Middle>
                  <S.Small>정보통계 보험 수리학과</S.Small>
                </div>
              </S.TeamInfo>
            </S.TeamInfo>
          </S.TeamInfo>
        </S.TeamBox>
      </S.TeamAllBox>
    </>
  );
};

export default Team;
const S = {
  TeamMainImage: styled.div`
    position: relative;
    width: 100%;
    height: 400px;
    background-image: url("http://www.star-pickers.com/html/img/sub_visual02.png");
  `,

  TeamMainImageMessage: styled.div`
    position: absolute;
    color: #fff;
    font-size: 50px;
    text-align: center;
    top: 50%;
    width: 100%;
    font-weight: 300;
    letter-spacing: -2px;
  `,

  Center: styled.div`
    ${variables.flex()}
    margin: 80px;
  `,

  Team: styled.div`
    font-size: 50px;
    font-weight: 600;
  `,

  CarouselBox: styled.div`
    ${variables.flex()}
    width:100%;
    height: 400px;
  `,

  CarouselImage: styled.img`
    width: 50%;
    object-fit: cover;
    transform: translate(1px);
  `,

  CarouselMessageBox: styled.div`
    position: absolute;
    ${variables.flex("column", "center", "center")}
    width: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,

  CarouselMessage: styled.div`
    font-size: 40px;
    text-align: center;
    color: rgb(250, 250, 250);
  `,

  CarouselBackground: styled.div`
    position: relative;
    background-image: url("http://www.star-pickers.com/html/img/team_gradient_bg.png");
    width: 50%;
    height: 98%;
  `,

  TeamAllBox: styled.div`
    ${variables.flex()}
    flex-wrap:wrap;
    width: 100%;
    height: 100%;
    margin: 110px 0 260px;
  `,

  TeamBox: styled.div`
    ${variables.flex("column", "center", "center")}
    width: 25%;
    margin: 40px;
    height: 603px;
    background-color: #f6f6f6;
    border: 1px solid #e3e3e3;
  `,

  TeamPhoto: styled.img`
    width: 100%;
    height: 300px;
  `,

  TeamInfo: styled.div`
    width: 80%;
    height: 300px;
    margin-top: 10px;
  `,

  Middle: styled.div`
    font-size: 20px;
    margin-top: 5px;

    @media (max-width: 1440px) {
      font-size: 15px;
    }
  `,

  Small: styled.div`
    font-size: 15px;
    color: gray;
    transform: translate(20px);
    margin-top: 5px;

    @media (max-width: 1440px) {
      font-size: 10px;
    }
  `,

  Name: styled.div`
    font-size: 35px;

    @media (max-width: 1440px) {
      font-size: 25px;
    }
  `,
};
