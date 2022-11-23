import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styled from "styled-components";
import variables from "../../styles/variables";
import { useNavigate } from "react-router-dom";

export interface News {
  id: number;
  title: string;
  content: string;
  img: string;
  date: number;
  view: number;
}
const DATA = [
  {
    id: 1,
    title: "별따러가자 홈페이지가 오픈되었습니다.",
    content: "content1",
    date: 2022,
    view: 10,
    img: "http://www.star-pickers.com/html/img/no-image.png",
  },
];

const NewsPage = () => {
  const [newsPageData, setNewsPageData] = useState<News[]>([]);
  const location = useNavigate();

  const goMain = () => {
    location("/news");
  };

  useEffect(() => {
    AOS.init();
  });
  // useEffect(() => {
  //   async function fetchPageData() {
  //     const respons = await fetch("Data/NewsData.json");
  //     const result = await respons.json();
  //     console.log(result);
  //   }
  //   fetchPageData();
  // }, []);
  return (
    <>
      <S.NewsMainImage>
        <S.NewsMainImageMessage>
          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-duration="1000"
          >
            별따러가자 공지사항
          </div>
        </S.NewsMainImageMessage>
      </S.NewsMainImage>
      <S.Center>
        <S.News>
          <div
            data-aos="fade-up"
            data-aos-offset="300"
            data-aos-duration="1000"
            data-aos-delay="300"
          >
            Notice
          </div>
        </S.News>
      </S.Center>
      <S.CenterColumn>
        <S.NewsBox>
          <S.NewsListBox>
            <S.Title>{DATA[0].title}</S.Title>
            <S.NewsPageList></S.NewsPageList>
            <S.Center>
              <S.GoList onClick={goMain}>목록</S.GoList>
            </S.Center>
          </S.NewsListBox>
        </S.NewsBox>
      </S.CenterColumn>
    </>
  );
};

export default NewsPage;

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
    margin: 80px;
  `,

  CenterColumn: styled.div`
    ${variables.flex("column", "center", "center")}
    margin: 80px;
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

  NewsPageList: styled.div`
    ${variables.flex()}
    width: 100%;
    height: 100%;
    border-bottom: 1px solid #d0d0d0;
    padding: 100px 0 100px;
  `,

  Title: styled.div`
    font-size: 40px;
    padding: 30px 40px;
    background: #f5f6f7;
    border-top: 1px solid #333;
    border-bottom: 1px solid #cccccc;
    position: relative;
    width: 100%;
  `,

  GoList: styled.div`
    ${variables.flex("column", "center", "center")}
    padding:20px 50px;
    width: 150px;
    border: 1px solid black;
  `,
};
