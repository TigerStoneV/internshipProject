import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import styled from "styled-components";
import variables from "../../styles/variables";
export interface News {
  id: number;
  title: string;
  content: string;
  img: string;
  date: number;
  view: number;
}
interface Search {
  searchParams: Params;
}
interface Params {
  get: string;
}
const News = () => {
  const [newsData, setNewsData] = useState<News[]>([]);
  // const [searchParams, setSearchPhams] = useSearchParams();
  // const limit = searchParams.get("limit");
  // const offset = searchParams.get("offset");

  // const goPage = (pageNumber: number): void => {
  // searchParams.set("limit", String(10));
  // searchParams.set("offset", (pageNumber - 1) * 10);
  // setSearchPhams(searchParams);
  // };

  let active = 2;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }
  useEffect(() => {
    AOS.init();
  });

  useEffect(() => {
    async function fetchData() {
      const respons = await fetch("Data/NewsData.json");
      const result = await respons.json();
      setNewsData(result);
    }
    fetchData();
  }, []);

  return (
    <>
      <S.CenterColumn>
        <S.NewsListBox>
          {newsData.map((data) => (
            <div key={data.id}>
              <S.NewsList>
                <S.Number>{data.id}</S.Number>
                <S.Link to={`/news/${data.id}`}>
                  <S.image src={data.img} />
                </S.Link>
                <S.MessageBox>
                  <S.Link to={`/news/${data.id}`}>
                    <S.Title>{data.title}</S.Title>
                  </S.Link>
                  <S.MessageBottom>
                    <S.Content>{data.view}</S.Content>
                    <S.Content>{data.date}</S.Content>
                  </S.MessageBottom>
                </S.MessageBox>
              </S.NewsList>
            </div>
          ))}
        </S.NewsListBox>
        <S.Center>
          <Pagination>{items}</Pagination>
        </S.Center>
      </S.CenterColumn>
    </>
  );
};

export default News;

const S = {
  NewsMainImage: styled.div`
    position: relative;
    width: 100%;
    height: 400px;
    background-image: url("http://www.star-pickers.com/html/img/sub_visual02.png");
  `,

  NewsMainImageMessage: styled.div`
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
  `,

  CenterColumn: styled.div`
    ${variables.flex("column", "center", "center")}
  `,

  News: styled.div`
    font-size: 50px;
    font-weight: 600;
  `,

  NewsBox: styled.div`
    ${variables.flex("column", "center", "center")}
    width: 100%;
    height: 100%;
  `,

  NewsListBox: styled.div`
    width: 80%;
    height: 100%;
    margin-top: 30px;
    border-top: 2px solid black;
  `,

  NewsList: styled.div`
    ${variables.flex()}
    width: 100%;
    height: 100%;
    border-bottom: 1px solid #d0d0d0;
  `,

  MessageBox: styled.div`
    ${variables.flex("column", "space-between", "center")}
    width:70%;
    height: 130px;
  `,

  Number: styled.div`
    text-align: center;
    height: 100%;
    width: 5%;
    font-size: 30px;
    color: gray;
  `,

  Title: styled.div`
    text-align: center;
    font-size: 30px;
    width: 100%;
    height: 50px;
  `,

  Content: styled.div`
    width: 50px;
    height: 20px;
    font-size: 20px;
  `,

  image: styled.img`
    width: 100%;
    height: 100%;
  `,

  MessageBottom: styled.div`
    ${variables.flex("row", "center", "center")}
  `,

  Link: styled(Link)`
    text-decoration: none;
    color: black;
  `,
};
