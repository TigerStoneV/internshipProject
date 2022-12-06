import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styled from "styled-components";
import variables from "../../styles/variables";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import NavbarBlock from "../../components/Nav/NavBlock";
interface News {
  id: number;
  title: string;
  content: string;
  viewCount: string;
  imageUrl: string;
  adminName: string;
}

const NewsPage = () => {
  const [newsPageData, setNewsPageData] = useState<News | null>(null);
  const location = useNavigate();
  const [searchParams, setSearchPhams] = useSearchParams();
  const params = useParams();
  const id = params.id;

  const goMain = () => {
    location("/newsnotice");
  };

  useEffect(() => {
    AOS.init();
  });

  useEffect(() => {
    fetch(`http://127.0.0.1:3000/post/news/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setNewsPageData(res.data[0]);
      });
  }, []);

  return (
    <>
      <S.NewsMainImage>
        <NavbarBlock />
        <S.NewsMainImageMessage>
          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-duration="1000"
          >
            별따러가자 소식
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
            NEWS
          </div>
        </S.News>
      </S.Center>
      <S.CenterColumn>
        <S.NewsBox>
          <S.NewsListBox>
            {newsPageData && (
              <>
                <S.Title>{newsPageData.title}</S.Title>
                <S.NewsPageList>
                  <S.image src={newsPageData.imageUrl} />
                  <S.Message>{newsPageData.content}</S.Message>
                </S.NewsPageList>
                <S.Center>
                  <S.GoList onClick={goMain}>목록</S.GoList>
                </S.Center>
              </>
            )}
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
    height: 300px;
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
    margin: 40px;
  `,

  CenterColumn: styled.div`
    ${variables.flex("column", "center", "center")}
    margin: 30px;
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
    border-top: 2px solid black;
  `,

  NewsPageList: styled.div`
    ${variables.flex()}
    width: 100%;
    height: 100%;
    border-bottom: 1px solid #d0d0d0;
    padding: 30px 0 30px;
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
    cursor: pointer;
  `,

  image: styled.img`
    width: 320px;
    height: 304px;
    border-radius: 5px;
    margin-right: 30px;
  `,

  Message: styled.div`
    font-size: 20px;
  `,
};
