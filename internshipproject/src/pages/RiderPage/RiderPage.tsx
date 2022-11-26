import React, { useState } from "react";
import NavbarBlock from "../../components/Nav/NavBlock";
import styled from "styled-components";
import variables from "../../styles/variables";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);
const RiderPage = () => {
  const [Selected, setSelected] = useState<string>("별");

  const data = {
    labels: ["과속", "급감속", "급가속", "급출발", "급회전"],
    datasets: [
      {
        label: "Rider Data",
        data: [8, 9, 4, 5, 7],
        backgroundColor: "rgba(213, 205, 58, 0.385)",
        borderColor: "#8f8f76",
        borderWidth: 1,
      },
    ],
  };
  return (
    <S.BackGround>
      <NavbarBlock />
      <S.Center>
        <S.Select>
          <option
            value=""
            hidden
            // onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            //   setSelected(e)
            // }
          >
            라이더 선택
          </option>
          <option value="1">정관훈</option>
          <option value="2">정도영</option>
          <option value="3">김희연</option>
          <option value="4">별</option>
          <option value="5">별</option>
          <option value="6">별</option>
          <option value="7">별</option>
          <option value="8">별</option>
        </S.Select>
        <S.Box>
          <S.ContentBox>
            <Radar data={data} />
          </S.ContentBox>
          <S.ContentBox>
            <S.Message>이번 달 우수 </S.Message>
            <S.Message> 라이더는 "홍길동" 입니다.</S.Message>
          </S.ContentBox>
        </S.Box>
      </S.Center>
    </S.BackGround>
  );
};

export default RiderPage;

const S = {
  BackGround: styled.div`
    width: 100%;
    height: 88vh;
    background-color: #cfd6d9;
  `,

  Center: styled.div`
    ${variables.flex("column", "center", "center")}
    margin:10px 150px 0 150px;
  `,
  SearchBox: styled.section`
    width: 20%;
    height: 50px;
  `,
  Select: styled.select`
    width: 30%;
    height: 35px;
    background: white;
    color: gray;
    padding-left: 5px;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    margin-left: 10px;

    option {
      color: black;
      background: white;
      display: flex;
      white-space: pre;
      min-height: 20px;
      padding: 0px 2px 1px;
    }
  `,
  Box: styled.div`
    ${variables.flex()}
    width: 100%;
    height: 68vh;
    margin-top: 15px;
  `,

  ContentBox: styled.div`
    ${variables.flex("column", "center", "center")}
    width: 48%;
    height: 100%;
    background-color: #fff;
    margin-left: 15px;
    border-radius: 10px;
  `,

  Message: styled.div`
    font-size: 30px;
    font-weight: semi-bold;
  `,
};
