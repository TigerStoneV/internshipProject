import React, { useEffect } from "react";
import NavbarBlock from "../../components/Nav/NavBlock";
import AOS from "aos";
import "aos/dist/aos.css";
import styled from "styled-components/macro";
import variables from "../../styles/variables";

const RiderLog = () => {
  useEffect(() => {
    AOS.init();
  });

  return (
    <>
      <S.MainImage>
        <NavbarBlock />
        <S.MainImageMessage>
          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-duration="1000"
          >
            이륜차에 <b>안전을 장착하다</b>
          </div>
        </S.MainImageMessage>
      </S.MainImage>
      <S.ProblemMessageBox>
        <div data-aos="fade-up" data-aos-offset="300" data-aos-duration="1000">
          <S.Problem>PROBLEM</S.Problem>
        </div>
        <div data-aos="fade-up" data-aos-offset="300" data-aos-duration="1000">
          <S.LogoCenter>
            <S.ProblemMessage>
              통계청 발표 배달업계 시장 성장률
            </S.ProblemMessage>
            <S.ProblemMessageDetailBox>
              <S.ProblemMessageDetail>
                2019년
                <S.ProblemMessageDetailPoint>
                  84.6%,
                </S.ProblemMessageDetailPoint>
                2020년
                <S.ProblemMessageDetailPoint>93%</S.ProblemMessageDetailPoint>
                <S.ProblemMessageDetailPointGray>
                  (예상) ※ 실제 배달업계의 예상치는 휠씬 웃돌아
                </S.ProblemMessageDetailPointGray>
              </S.ProblemMessageDetail>
            </S.ProblemMessageDetailBox>
          </S.LogoCenter>
        </div>

        <S.RiderSizeBox>
          <S.RiderSizeData src="http://www.star-pickers.com/html/img/insights_graph_01.png" />
          <S.RiderSizeData src="http://www.star-pickers.com/html/img/insights_graph_02.png" />
        </S.RiderSizeBox>
        <S.RiderSizeBackground>
          <S.RiderSizeBackgroundCenter>
            <S.RiderSizeBackgroundImage src="http://www.star-pickers.com/html/img/insights_vector.png" />
            <S.RiderSizeBackgroundMessageBox>
              <div
                data-aos="fade-up"
                data-aos-offset="350"
                data-aos-duration="1000"
              >
                <S.RiderSizeBackgroundMessage>
                  <b>◦ 경기불황과 극심한 취업난 속</b> 배달음식 시장이
                  급성장하면서 <b>도로 위 사고 위험에 노출</b>
                </S.RiderSizeBackgroundMessage>
                <S.RiderSizeBackgroundMessage>
                  ◦ 실제로 정체 교통사고 건수와 사망자 수는 꾸준히 감소하나
                  <b>오토바이 사고에 따른 인명피해는 오히려 증가.</b>
                </S.RiderSizeBackgroundMessage>
                <S.RiderSizeBackgroundMessage>
                  ◦ 일부 대형 배달업체를 제외하고는
                  <b>
                    사고 위험에 무방비로 노출될 수밖에 없는 젊은 라이더들...
                  </b>
                </S.RiderSizeBackgroundMessage>
              </div>
            </S.RiderSizeBackgroundMessageBox>
          </S.RiderSizeBackgroundCenter>
        </S.RiderSizeBackground>
        <div data-aos="fade-up" data-aos-offset="400" data-aos-duration="1000">
          <S.GrapeMessageBox>
            <S.GrapeMessage>이륜차의 난폭운행으로 인한</S.GrapeMessage>
            <S.GrapeMessagePoint>시민의 불편과 높은 사고율</S.GrapeMessagePoint>
            <S.ProblemMessageDetailPointGray>
              이륜차의 배달과정에서의 교통사고는 해마다 증가추세,시민들의
              이륜차에 대한 인식도 갈수록 나빠지는 상황
            </S.ProblemMessageDetailPointGray>
          </S.GrapeMessageBox>
        </div>
        <S.GrapeBackgroungImage>
          <div
            data-aos="fade-up"
            data-aos-offset="400"
            data-aos-duration="1000"
          >
            <S.GrapeImage src="http://www.star-pickers.com/html/img/insights_graph_03.png" />
          </div>
        </S.GrapeBackgroungImage>
        <S.ProtectMessageBox>
          <div
            data-aos="fade-up"
            data-aos-offset="400"
            data-aos-duration="1000"
          >
            <S.ProtectMessage>
              " 성숙한 공동체 의식의 이륜차 운전 문화 조성
              <b>시민, 협력사, 보험사 모두 Win-Win</b>
            </S.ProtectMessage>
          </div>
        </S.ProtectMessageBox>
      </S.ProblemMessageBox>
      <S.Center>
        <S.IconBox>
          <S.ProtectOne />
          <S.ProtectTwo />
          <S.ProtectThree />
          <S.ProtectFour />
        </S.IconBox>
        <S.IconBox>
          <S.ProtectMiniMessage>모빌리티 시장의 급성장</S.ProtectMiniMessage>
          <S.ProtectMiniMessage>높은 사고 심도</S.ProtectMiniMessage>
          <S.ProtectMiniMessage>규제, 보험 사각지대</S.ProtectMiniMessage>
          <S.ProtectMiniMessage>시민 안전 위협</S.ProtectMiniMessage>
        </S.IconBox>
      </S.Center>
      <S.SolutionBox>
        <S.GrapeMessageSize>
          <p>SOLUTION</p>
        </S.GrapeMessageSize>
        <S.GrapeMessageSize>
          <div
            data-aos="fade-up"
            data-aos-offset="400"
            data-aos-duration="1000"
          >
            <h1>라이더로그는?</h1>
          </div>
        </S.GrapeMessageSize>
        <S.SolutionMessageBox>
          <S.GrapeMessage>라이더로그는 (주)별따러가자가 개발한</S.GrapeMessage>
          <S.GrapeMessagePoint>
            <div
              data-aos="fade-up"
              data-aos-offset="500"
              data-aos-duration="1000"
            >
              센서 시반 소형 모빌리티 관제 솔루션
            </div>
          </S.GrapeMessagePoint>
          <S.GrapeMessage>입니다.</S.GrapeMessage>
          <S.ProblemMessageDetailPointGray>
            카메라가 아닌, 센서 기반의 운행기록 확인 솔루션으로, GPS, CCTV로 알
            수 없던 소형모빌리티의 세세한 움직임을 기록/저장합니다.
          </S.ProblemMessageDetailPointGray>
        </S.SolutionMessageBox>
      </S.SolutionBox>
      <S.SolutionBackground>
        <S.SolutionImage src="http://www.star-pickers.com/html/img/insights_flow.png" />
        <S.Table>
          <tbody>
            <tr>
              <th>자료명</th>
              <td>가속도 센서 데이터</td>
              <td>자이로스코프 데이터</td>
              <td>자세 데이터</td>
              <td>시간 데이터</td>
            </tr>
            <tr>
              <th>자료크기</th>
              <td>12 Bytes / per</td>
              <td>12 Bytes / per</td>
              <td>4 Bytes / per</td>
              <td>12 Bytes / per</td>
            </tr>
            <tr>
              <th>자료형</th>
              <td>정수형</td>
              <td>정수형</td>
              <td>Float (단정밀도)</td>
              <td>정수형</td>
            </tr>
          </tbody>
        </S.Table>
      </S.SolutionBackground>
      <S.Center>
        <S.IconBox>
          <S.SolutionIconBox>
            <S.SolutionOne />
            9축 IMU 센서
          </S.SolutionIconBox>
          <S.SolutionIconBox>
            <S.SolutionTwo />
            실시간 연동
          </S.SolutionIconBox>
          <S.SolutionIconBox>
            <S.SolutionThree />
            독립적인 동작
          </S.SolutionIconBox>
        </S.IconBox>
        <S.IconBox>
          <S.SolutionMessageDetail>
            <div
              data-aos="fade-up"
              data-aos-offset="400"
              data-aos-duration="1000"
            >
              가속도 센서, 자이로스코프 센서, 지자기 센서로 이루어진 센서를
              이용하여 주행기록 및 주행 분석을 시간으로 수행합니다
            </div>
          </S.SolutionMessageDetail>
          <S.SolutionMessageDetail>
            <div
              data-aos="fade-up"
              data-aos-offset="400"
              data-aos-duration="1000"
            >
              주행기록장치와 스마트폰이 결합하거나 단독으로(LTE-M 적용 시)
              서버와 통신하여 데이터를 기록하고 관리할 수 있습니다
            </div>
          </S.SolutionMessageDetail>
          <S.SolutionMessageDetail>
            <div
              data-aos="fade-up"
              data-aos-offset="400"
              data-aos-duration="1000"
            >
              스마트폰과 연결하여 사용하면 좋지만 스마트폰과 연동을 하지
              않더라도 내장된 메모리에 1초당 1000회 속도로 데이터를 저장할 수
              있습니다.
            </div>
          </S.SolutionMessageDetail>
        </S.IconBox>
      </S.Center>
      <S.LogBackground>
        <div data-aos="fade-up" data-aos-offset="400" data-aos-duration="1000">
          <S.LogImage src="http://www.star-pickers.com/html/img/insights_graph_04.png" />
        </div>
      </S.LogBackground>
      <S.Center>
        <S.RecordTitle>세세한 운행 기록 관리</S.RecordTitle>
        <div data-aos="fade-up" data-aos-offset="400" data-aos-duration="1000">
          <S.RecordDetailTitle>
            불법/난폭 운전 판단 알고리즘 : 인도, 횡단보도, 난폭주행 등. 사고
            모니터링 및 판단 알고리즘 : 사고 유무, 격중 판단
          </S.RecordDetailTitle>
        </div>
        <S.RecordImage src="http://www.star-pickers.com/html/img/insights_img_01.png" />
      </S.Center>
      <S.Center>
        <S.MapTitle>
          <div
            data-aos="fade-up"
            data-aos-offset="400"
            data-aos-duration="1000"
          >
            안전운행 유도, 정확한 운행 이력 DATA의 지속적 확보
          </div>
        </S.MapTitle>
      </S.Center>
      <S.MapBackground>
        <div data-aos="fade-up" data-aos-offset="400" data-aos-duration="1000">
          <S.MapImage src="http://www.star-pickers.com/html/img/insights_img_02.png" />
        </div>
      </S.MapBackground>
    </>
  );
};

export default RiderLog;

const S = {
  MainImage: styled.div`
    position: relative;
    width: 100%;
    height: 300px;
    background-image: url("http://www.star-pickers.com/html/img/sub_visual01.png");
  `,

  MainImageMessage: styled.div`
    position: absolute;
    color: #fff;
    font-size: 50px;
    text-align: center;
    top: 50%;
    width: 100%;
    font-weight: 300;
    letter-spacing: -2px;
  `,

  ProblemMessageBox: styled.div`
    ${variables.flex("column", "center", "center")}
    width: 100%;
  `,

  Problem: styled.div`
    font-size: 50px;
    font-weight: bold;
    padding: 80px 0 70px;
  `,

  ProblemMessage: styled.div`
    font-size: 35px;
    font-weight: 500;
  `,

  ProblemMessageDetailBox: styled.div`
    ${variables.flex()};
    width: 1200px;
  `,

  ProblemMessageDetail: styled.div`
    ${variables.flex()};
    font-size: 18px;
  `,

  ProblemMessageDetailPoint: styled.div`
    color: orange;
    margin: 0 5px 0 5px;
  `,

  ProblemMessageDetailPointGray: styled.div`
    color: gray;
    margin: 0 5px 0 5px;
  `,

  RiderSizeBox: styled.div`
    ${variables.flex()};
    max-width: 1424px;
    width: 100%;
    margin: 30px;
  `,

  RiderSizeData: styled.img`
    width: 49%;
  `,

  RiderSizeBackground: styled.div`
    ${variables.flex("column", "center", "center")}
    position: relative;
    width: 100%;
    height: 550px;
    padding: 80px 0;
    margin: 40px 0;
    background-image: linear-gradient(90deg, #f27e11 0%, #f2ac4d 100%);
  `,

  RiderSizeBackgroundCenter: styled.div`
    ${variables.flex("row", "space-between", "center")}
    position: absolute;
    width: 1300px;
    height: 100%;
  `,

  RiderSizeBackgroundImage: styled.img`
    position: relative;
    width: 500px;
  `,

  RiderSizeBackgroundMessageBox: styled.div`
    ${variables.flex("column", "center", "center")}
    position: relative;
    width: 700px;
  `,

  RiderSizeBackgroundMessage: styled.div`
    color: white;
    font-size: 30px;
    font-weight: 300;
    margin-top: 10px;
  `,

  GrapeMessageBox: styled.div`
    ${variables.flex()}
    flex-wrap: wrap;
    width: 1200px;
    margin: 30px;
  `,

  GrapeMessage: styled.div`
    font-size: 40px;
  `,

  GrapeMessageSize: styled.div`
    font-size: 70px;
  `,

  GraGrapeMessage: styled.div`
    font-size: 30px;
  `,

  GrapeMessagePoint: styled.div`
    font-size: 40px;
    margin-left: 10px;
    color: orange;
  `,

  GrapeBackgroungImage: styled.div`
    position: relative;
    background-image: url("http://www.star-pickers.com/html/img/insights_bg_01.png");
    width: 100%;
    height: 600px;
  `,

  GrapeImage: styled.img`
    position: absolute;
    width: 600px;
    top: 30px;
    left: 50%;
  `,

  ProtectMessageBox: styled.div`
    background-image: url("http://www.star-pickers.com/html/img/vision_bg_03.png");
    position: relative;
    width: 100%;
    height: 400px;
    margin-top: 100px;
  `,

  ProtectMessage: styled.div`
    position: absolute;
    width: 40%;
    font-size: 50px;
    color: white;
    top: 120px;
    left: 55%;

    @media (max-width: 1440px) {
      font-size: 30px;
      left: 75%;
      width: 20%;
    }
  `,

  LogoCenter: styled.div`
    ${variables.flex("column", "center", "center")}
  `,

  Center: styled.div`
    ${variables.flex("column", "center", "center")}
    margin: 80px;
  `,

  IconBox: styled.div`
    ${variables.flex("row", "space-evenly", "center")};
    width: 80%;
  `,

  ProtectOne: styled.div`
    background-image: url("http://www.star-pickers.com/html/img/vision_icons_03.png");
    background-position: 0 0;
    width: 155px;
    height: 179px;
  `,

  ProtectTwo: styled.div`
    background-image: url("http://www.star-pickers.com/html/img/vision_icons_03.png");
    background-position: -155px 0;
    width: 155px;
    height: 179px;
  `,

  ProtectThree: styled.div`
    background-image: url("http://www.star-pickers.com/html/img/vision_icons_03.png");
    background-position: -310px 0;
    width: 155px;
    height: 179px;
  `,

  ProtectFour: styled.div`
    background-image: url("http://www.star-pickers.com/html/img/vision_icons_03.png");
    background-position: -465px 0;
    width: 155px;
    height: 179px;
  `,

  ProtectMiniMessage: styled.div`
    width: 155px;
    text-align: center;
  `,

  SolutionBox: styled.div`
    ${variables.flex("column", "center", "center")}
  `,

  SolutionMessageBox: styled.div`
    ${variables.flex()}
    flex-wrap:wrap;
    width: 1400px;
    font-size: 20px;
  `,

  SolutionMessagePoint: styled.div`
    font-size: 60px;
    color: orange;
  `,

  SolutionBackground: styled.div`
    position: relative;
    background-color: #f7f7f7;
    width: 100%;
    height: 700px;
    margin: 50px 0 50px;
  `,

  SolutionImage: styled.img`
    position: absolute;
    width: 1200px;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,

  Table: styled.table`
    position: absolute;
    width: 1200px;
    top: 80%;
    left: 49%;
    transform: translate(-50%, -50%);
    text-align: center;
  `,

  SolutionOne: styled.div`
    background-image: url("http://www.star-pickers.com/html/img/insights_icons_01.png");
    background-position: 0 0;
    width: 106px;
    height: 115px;
  `,

  SolutionTwo: styled.div`
    background-image: url("http://www.star-pickers.com/html/img/insights_icons_01.png");
    background-position: -106px 0;
    width: 106px;
    height: 115px;
  `,

  SolutionThree: styled.div`
    background-image: url("http://www.star-pickers.com/html/img/insights_icons_01.png");
    background-position: -213px 0;
    width: 106px;
    height: 115px;
  `,

  SolutionIconBox: styled.div`
    ${variables.flex("column", "space-evenly", "center")}
    width: 200px;
    height: 270px;
    border: 1px solid #333;
    border-top: 10px solid #f5821f;
    position: relative;
    text-align: center;
  `,

  SolutionMessageDetail: styled.div`
    ${variables.flex()};
    width: 255px;
    font-size: 18px;
    margin-top: 20px;
  `,

  LogBackground: styled.div`
    position: relative;
    background-image: url("http://www.star-pickers.com/html/img/insights_bg_02.png");
    width: 100%;
    height: 500px;
  `,

  LogImage: styled.img`
    position: absolute;
    width: 600px;
    top: 50px;
    left: 55%;
  `,

  RecordTitle: styled.div`
    font-size: 70px;
    font-weight: 500;
  `,

  RecordDetailTitle: styled.div`
    width: 470px;
    font-size: 20px;
    margin: 10px;
    text-align: center;
  `,

  RecordImage: styled.img`
    width: 90%;
    height: 400px;
    margin: 50px;
  `,

  MapTitle: styled.div`
    font-size: 70px;
    font-weight: 500;

    @media (max-width: 1440px) {
      font-size: 50px;
    }
  `,

  MapBackground: styled.div`
    position: relative;
    background-image: url("http://www.star-pickers.com/html/img/insights_map.png");
    width: 100%;
    height: 600px;
    margin: 50px 0 50px;
  `,

  MapImage: styled.img`
    position: absolute;
    width: 500px;
    top: 50px;
    left: 65%;
  `,
};
