import React, { useEffect, useState } from "react";
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

interface Member {
  id: number;
  name: string;
}

const RiderPageClient = () => {
  const [selected, setSelected] = useState<string>("별");
  const [one, setOne] = useState<number>(0);
  const [two, setTwo] = useState<number>(0);
  const [three, setThree] = useState<number>(0);
  const [four, setFour] = useState<number>(0);
  const [five, setFive] = useState<number>(0);
  const [member, setMember] = useState<Member[]>([]);
  useEffect(() => {
    async function fetchData() {
      const respons = await fetch("Data/RiderLog.json");
      const result = await respons.json();
      setMember(result);
    }
    fetchData();
  }, []);

  useEffect(() => {
    setOne(Math.random() * 10);
    setTwo(Math.random() * 10);
    setThree(Math.random() * 10);
    setFour(Math.random() * 10);
    setFive(Math.random() * 10);
  }, [selected]);

  const data = {
    labels: ["과속", "급감속", "급가속", "급출발", "급회전"],
    datasets: [
      {
        label: "Rider Data",
        data: [one, two, three, four, five],
        backgroundColor: "rgba(45, 99, 225, 0.385)",
        borderColor: "#31447c",
        borderWidth: 1,
      },
    ],
  };

  return (
    <S.BackGround>
      <NavbarBlock />
      <S.Center>
        <S.Select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSelected(e.target.value)
          }
        >
          {/* <option value="select" hidden>
            라이더 선택
          </option> */}
          {member.map((data) => (
            <option value={data.name}>{data.name}</option>
          ))}
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

export default RiderPageClient;

const S = {
  BackGround: styled.div`
    width: 100%;
    height: 88vh;
    background-color: #a8b0b4;
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
