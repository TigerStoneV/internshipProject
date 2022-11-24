import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import AOS from "aos";
import "aos/dist/aos.css";
import styled from "styled-components/macro";
import variables from "../../../styles/variables";
const Tech = () => {
  useEffect(() => {
    AOS.init();
  });
  interface Icon {
    id: number;
    title: string;
    detail: string;
    url: string;
    color: string;
  }

  return (
    <>
      <S.Center>
        <S.TechBanner>
          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            Tech
          </div>
        </S.TechBanner>
      </S.Center>
      <S.IconCenter>
        {ITEM_BOX.map((data) => (
          <div
            key={data.id}
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-duration="1000"
          >
            <div
              style={{
                width: "335px",
                height: "350px",
                backgroundColor: `${data.color}`,
                margin: "30px",
                borderRadius: "13px",
              }}
            >
              <S.TechIconBox>
                <S.TechIconTextBox>
                  <S.IconText>{data.title}</S.IconText>
                  <S.IconText>{data.detail}</S.IconText>
                </S.TechIconTextBox>
                <div
                  style={{
                    width: "160px",
                    height: "140px",
                    backgroundImage: `url(${data.url})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    marginTop: "20px",
                  }}
                ></div>
              </S.TechIconBox>
            </div>
          </div>
        ))}
      </S.IconCenter>

      <S.TableCenter>
        <div data-aos="fade-up" data-aos-offset="200" data-aos-duration="1000">
          <S.TableMessage>
            ❖ 적용범위 : 이륜차, 자전거, 킥보드, 세그웨이 등 신규 소형 모빌리티
          </S.TableMessage>
          <S.TableMessagePoint>
            현재 신규개발 보드(6축-9축 호환 및 스마트폰 조작기능, 카메라
            호환기능 탑재) 생산 중에 있음
          </S.TableMessagePoint>
          <Table striped>
            <thead>
              <tr>
                <th>주행도로</th>
                <td>인도, 횡단보도, 차도 주행 등 확인가능</td>
                <th>역주행(개발 중)</th>
                <td>중앙선을 넘어서 주행하는지 검출</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>충격이력</th>
                <td>충격량, 충격력, 충격방향</td>
                <th>GPS 정보</th>
                <td>기본정보, 스마트폰을 통해 검출</td>
              </tr>
              <tr>
                <th>급감속 및 감속</th>
                <td>GPS로는 알 수 없는 짧은 범위의 급감가속</td>
                <th>정밀 속도(개발 중)</th>
                <td>센서 값으로 보정한 차량의 정밀한 속도</td>
              </tr>
              <tr>
                <th>롤링,칼치기</th>
                <td>이륜차의 난폭운행 중 하나</td>
                <th>넘어짐</th>
                <td>
                  이륜차의 넘어짐(충격 후 넘어짐 등을 통해 사고 도출 가능)
                </td>
              </tr>
              <tr>
                <th>신호위반(개발 중)</th>
                <td>신호를 위반하여 주행하는지 검출</td>
                <th>기타</th>
                <td>
                  위 정보들을 조합하여, 사고기록, 사고 자동 출동, 누적 배달거리
                  등 다양한 주행의 결론을 얻을 수 있음
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </S.TableCenter>
      <S.CenterColumn>
        <S.IconBoxMessage>
          ⦿ 라이더로그를 통해 얻을 수 있는 정보
        </S.IconBoxMessage>
        <S.IconBoxMessagePoint>
          GPS 좌표/속도 및 보다 향상된 정밀속도, 정밀 급/가감속 및 주행이력
        </S.IconBoxMessagePoint>
        <S.Center>
          <S.IconBox>
            <div
              data-aos="fade-up"
              data-aos-offset="100"
              data-aos-duration="1000"
              data-aos-delay="100"
            >
              <S.IconOne />
            </div>
            <S.IconRoundText>CCTV</S.IconRoundText>
          </S.IconBox>
          <S.IconBox>
            <div
              data-aos="fade-up"
              data-aos-offset="100"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <S.IconTwo />
            </div>
            <S.IconRoundText>즐겨찾기</S.IconRoundText>
          </S.IconBox>
          <S.IconBox>
            <div
              data-aos="fade-up"
              data-aos-offset="100"
              data-aos-duration="1000"
              data-aos-delay="300"
            >
              <S.IconThree />
            </div>
            <S.IconRoundText>고속도로/국도 교통지도</S.IconRoundText>
          </S.IconBox>
          <S.IconBox>
            <div
              data-aos="fade-up"
              data-aos-offset="100"
              data-aos-duration="1000"
              data-aos-delay="400"
            >
              <S.IconFour />
            </div>
            <S.IconRoundText>소통정보</S.IconRoundText>
          </S.IconBox>
          <S.IconBox>
            <div
              data-aos="fade-up"
              data-aos-offset="100"
              data-aos-duration="1000"
              data-aos-delay="500"
            >
              <S.IconFive />
            </div>
            <S.IconRoundText>VMS 정보</S.IconRoundText>
          </S.IconBox>
          <S.IconBox>
            <div
              data-aos="fade-up"
              data-aos-offset="100"
              data-aos-duration="1000"
              data-aos-delay="600"
            >
              <S.IconSix />
            </div>
            <S.IconRoundText>도시간 소요시간</S.IconRoundText>
          </S.IconBox>
          <S.IconBox>
            <div
              data-aos="fade-up"
              data-aos-offset="100"
              data-aos-duration="1000"
              data-aos-delay="700"
            >
              <S.IconSeven />
            </div>
            <S.IconRoundText>공사사고 정보</S.IconRoundText>
          </S.IconBox>
        </S.Center>
        <S.IconBoxMessage>⦿ 파손관리</S.IconBoxMessage>
        <S.IconBoxMessagePoint>
          넘어짐,충격량/방향 이력확인
        </S.IconBoxMessagePoint>
        <S.IconBoxMessage>⦿ 불법관리</S.IconBoxMessage>
        <S.IconBoxMessagePoint>
          인도/ 횡단보도 침범(주행도로 확인), 곡예운전, 신호위반, 역주행(개발중)
        </S.IconBoxMessagePoint>
        <S.IconBoxMessage>⦿ 사고관리</S.IconBoxMessage>
        <S.IconBoxMessagePoint>
          사고 기록 및 사고유형, 충격세기 파악
        </S.IconBoxMessagePoint>
        <S.IconBoxMessage>⦿ 옵션제공: 라이더 로그 제공</S.IconBoxMessage>
        <S.IconBoxMessagePoint>
          배달대행용 스마트폰 조작기: 전방주시로 운행 중 안전성 향상
        </S.IconBoxMessagePoint>
      </S.CenterColumn>
      <S.PhotoBox>
        <div data-aos="fade-up" data-aos-offset="200" data-aos-duration="1000">
          <S.Photo src="http://www.star-pickers.com/html/img/tech_img_option.png" />
        </div>
      </S.PhotoBox>
      <S.CenterColumn>
        <S.IconBoxMessage>
          ⦿ 소형 모빌리티의 관제 및 운행기록 제공
        </S.IconBoxMessage>
        <S.IconBoxMessagePoint>
          ∙ 공유 마이크로 모빌리티/배달이륜차의 사고/위법행위 관제.
        </S.IconBoxMessagePoint>
        <S.IconBoxMessagePoint>
          ∙ 사고/보험분쟁, 단체보험할인 등의 객관적 데이터 확보.
        </S.IconBoxMessagePoint>
        <S.IconBoxMessagePoint>
          ∙ 웹을 통한 실시간 모니터링.
        </S.IconBoxMessagePoint>
        <S.IconBoxMessagePoint>
          ∙ 판단 근거마련 후 이용자 평가제공
        </S.IconBoxMessagePoint>
      </S.CenterColumn>
      <S.Center>
        <S.BottomBox>
          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-duration="1000"
          >
            <S.BottomImage src="http://www.star-pickers.com/html/img/tech_riderlog_left.png" />
            <S.BottomImage src="http://www.star-pickers.com/html/img/tech_riderlog_right.png" />
          </div>
        </S.BottomBox>
      </S.Center>
    </>
  );
};

export default Tech;

const S = {
  TechMainImage: styled.div`
    position: relative;
    width: 100%;
    height: 400px;
    background-image: url("http://www.star-pickers.com/html/img/sub_visual04.png");
  `,

  TechMainImageMessage: styled.div`
    position: absolute;
    color: #fff;
    font-size: 50px;
    text-align: center;
    top: 50%;
    width: 100%;
    font-weight: 400;
    letter-spacing: -2px;
  `,

  Center: styled.div`
    ${variables.flex()}
    margin: 30px 0 30px;
  `,

  CenterColumn: styled.div`
    ${variables.flex("column", "center", "")}
    margin: 100px 180px 0 180px;
  `,

  TableCenter: styled.div`
    ${variables.flex("column", "center", "center")}
    margin: auto;
    width: 100%;
    text-align: center;
  `,

  IconCenter: styled.div`
    ${variables.flex()}
    flex-wrap:wrap;
  `,

  TechBanner: styled.div`
    font-size: 50px;
    font-weight: 600;
  `,

  TechIconBox: styled.div`
    ${variables.flex("column", "space-evenly", "center")}
    height: 350px;
  `,

  TechIconTextBox: styled.div`
    ${variables.flex("column", "center", "center")}
    width:230px;
  `,

  Image: styled.img<String>`
    width: 100px;
    height: 100px;
  `,

  IconText: styled.div`
    font-size: 20px;
    color: white;
    margin-top: 5px;
  `,

  IconRoundText: styled.div`
    font-size: 15px;
    width: 80%;
    margin-top: 5px;
    text-align: center;
  `,

  IconOne: styled.div`
    background-image: url("http://www.star-pickers.com/html/img/tech_basic_icon.png");
    background-position: 0 0;
    width: 74px;
    height: 80px;
    margin-bottom: 10px;
  `,

  IconTwo: styled.div`
    background-image: url("http://www.star-pickers.com/html/img/tech_basic_icon.png");
    background-position: -74px 0;
    width: 74px;
    height: 80px;
    margin-bottom: 10px;
  `,

  IconThree: styled.div`
    background-image: url("http://www.star-pickers.com/html/img/tech_basic_icon.png");
    background-position: -148px 0;
    width: 74px;
    height: 80px;
    margin-bottom: 10px;
  `,

  IconFour: styled.div`
    background-image: url("http://www.star-pickers.com/html/img/tech_basic_icon.png");
    background-position: -222px 0;
    width: 74px;
    height: 80px;
    margin-bottom: 10px;
  `,

  IconFive: styled.div`
    background-image: url("http://www.star-pickers.com/html/img/tech_basic_icon.png");
    background-position: -296px 0;
    width: 74px;
    height: 80px;
    margin-bottom: 10px;
  `,

  IconSix: styled.div`
    background-image: url("http://www.star-pickers.com/html/img/tech_basic_icon.png");
    background-position: -369px 0;
    width: 74px;
    height: 80px;
    margin-bottom: 10px;
  `,

  IconSeven: styled.div`
    background-image: url("http://www.star-pickers.com/html/img/tech_basic_icon.png");
    background-position: -444px 0;
    width: 74px;
    height: 80px;
    margin-bottom: 10px;
  `,

  TableMessage: styled.div`
    font-size: 35px;
    font-weight: 400;
  `,

  TableMessagePoint: styled.div`
    font-size: 20px;
    font-weight: 400;
    color: gray;
    margin-bottom: 20px;
  `,

  IconBox: styled.div`
    ${variables.flex("column", "center", "center")}
    border : 3px solid orange;
    border-radius: 50%;
    width: 200px;
    height: 180px;
    margin: 10px;
  `,

  IconBoxMessage: styled.div`
    font-size: 30px;
    font-weight: 400;
  `,

  IconBoxMessagePoint: styled.div`
    font-size: 20px;
    font-weight: 400;
    color: gray;
    margin-bottom: 20px;
    margin: 5px 0 10px 15px;
  `,

  PhotoBox: styled.div`
    position: relative;
    background: #f7f7f7;
    padding: 60px 2%;
    text-align: center;
    margin-top: 30px;
  `,

  Photo: styled.img`
    width: 70%;
    height: 500px;
  `,

  BottomBox: styled.div`
    ${variables.flex()};
    width: 100%;
    margin-bottom: 100px;
  `,

  BottomImage: styled.img`
    width: 40%;
    height: 400px;
    margin-left: 30px;
  `,
};

const ITEM_BOX = [
  {
    id: 1,
    title: "경쟁사 전무",
    detail: "세계 최초의 H/W기반 인슈어테크 플렛폼",
    url: "http://www.star-pickers.com/html/img/tech_img_01.png",
    color: "#f29115",
  },
  {
    id: 2,
    title: "작고 저렴한 H/W",
    detail: "Dashcam(카메라 블랙박스)에 비해 매우 작고, 저렴함",
    url: "http://www.star-pickers.com/html/img/tech_img_02.png",
    color: "#f2c115",
  },
  {
    id: 3,
    title: "높은 정확도",
    detail:
      "GPS론 알 수 없는 세세한 움직임 기록 가능 (from VR기술, GPS해상도 15m)",
    url: "http://www.star-pickers.com/html/img/tech_img_03.png",
    color: "#a8ce34",
  },
  {
    id: 4,
    title: "비카메라방식",
    detail: "사각지대 없음, 조명 불필요",
    url: "http://www.star-pickers.com/html/img/tech_img_04.png",
    color: "#00c590",
  },
  {
    id: 5,
    title: "동시 처리",
    detail: "AI알고리즘에 의한 실시간 수만대 분석/기록(사고 후 분쟁 근거)",
    url: "http://www.star-pickers.com/html/img/tech_img_05.png",
    color: "#00c590",
  },
  {
    id: 6,
    title: "실시간 공유",
    detail: "개별 관찰이 가능",
    url: "http://www.star-pickers.com/html/img/tech_img_06.png",
    color: "#a8ce34",
  },
  {
    id: 7,
    title: "높은 보험성",
    detail: "높은 보험 할인율",
    url: "http://www.star-pickers.com/html/img/tech_img_07.png",
    color: "#f2c115",
  },
  {
    id: 8,
    title: "실질적 할인",
    detail: "p2p보험, 시간제 보험이 해결할 수 없는 근본 문제 해결",
    url: "http://www.star-pickers.com/html/img/tech_img_08.png",
    color: "#f29115",
  },
];
