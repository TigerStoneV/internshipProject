import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link, useSearchParams } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import styled from "styled-components/macro";
import variables from "../../styles/variables";
export interface News {
  id: string;
  title: string;
  content: string;
  view_count: string;
  image_url: string;
  created_at: string;
}
interface Search {
  searchParams: Params;
}
interface Params {
  get: string;
}
const News = () => {
  const [newsData, setNewsData] = useState<News[]>([]);
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
        {newsData.map((data) => (
          <div key={data.id}>
            <S.NewsList>
              <S.Box>
                <S.Link to={`/news/${data.id}`}>
                  <S.image src={data.image_url} />
                  <S.MessageBox>
                    <S.Title>{data.title}</S.Title>
                    <S.MessageBottom>
                      <S.Content>{data.created_at.slice(0, 10)}</S.Content>
                      <S.Content>{data.view_count}</S.Content>
                    </S.MessageBottom>
                  </S.MessageBox>
                </S.Link>
              </S.Box>
            </S.NewsList>
          </div>
        ))}
      </S.CenterColumn>
      <S.BottomBox>
        <S.BoxSize></S.BoxSize>
        <S.BoxSize>
          <S.ViewMore>ViewMore(Scroll)</S.ViewMore>
        </S.BoxSize>
        <S.BoxSize>
          <S.Write onClick={handleShow}>글쓰기</S.Write>
          <Modal
            size="lg"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <S.ModalTitle>Create New</S.ModalTitle>
            </Modal.Header>
            <S.InputTitle placeholder="제목을 입력하세요." />
            <S.Input type="text" placeholder="내용을 입력하세요." />
            <S.InputImage
              placeholder="write your image"
              type="file"
              accept="image/*"
            />
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>
                등록
              </Button>
            </Modal.Footer>
          </Modal>
        </S.BoxSize>
      </S.BottomBox>
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

  Box: styled.div`
    ${variables.flex("column", "center", "center")}
    width: 80%;
    transition: 0.8s;

    &:hover {
      border: 1px solid #212121;
    }
  `,

  CenterColumn: styled.div`
    ${variables.flex("row", "center", "flex-start")}
    flex-wrap: wrap;
    height: 100%;
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
    height: 350px;
  `,

  NewsList: styled.div`
    ${variables.flex("column", "center", "center")}
    width: 380px;
    height: 400px;
    margin-bottom: 20px;
    cursor: pointer;
  `,

  MessageBox: styled.div`
    ${variables.flex("column", "space-between", "center")}
    width:70%;
  `,

  Number: styled.div`
    text-align: center;
    height: 100%;
    width: 5%;
    font-size: 30px;
    color: gray;
  `,

  Title: styled.div`
    font-size: 20px;
    font-weight: 500;
    line-height: 1.5;
    color: #1a1a1a;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: keep-all;
    margin-top: 10px;
  `,

  Content: styled.div`
    font-size: 15px;
    margin: 10px;
    color: gray;
  `,

  image: styled.img`
    width: 320px;
    height: 304px;
    border-radius: 5px;
  `,

  MessageBottom: styled.div`
    ${variables.flex()}
  `,

  Link: styled(Link)`
    ${variables.flex("column", "center", "center")}
    text-decoration: none;
    color: black;
  `,

  BottomBox: styled.div`
    ${variables.flex("row", "space-evenly", "center")}
    margin : 20px 0 20px;
  `,

  Write: styled.button`
    width: 80px;
    height: 40px;
    margin-top: 10px;
    border-radius: 5px;
    background-color: white;
  `,

  ViewMore: styled.div`
    border: 1px solid black;
    padding: 10px;
    border-radius: 10px;
    margin-top: 20px;
  `,

  BoxSize: styled.div`
    ${variables.flex()}
    width: 33%;
  `,

  Input: styled.input`
    height: 450px;
    width: 100%;
    border: 1px solid lightgray;
  `,

  InputImage: styled.input`
    ${variables.flex()}
    height: 50px;
    border: none;
    margin-top: 10px;
  `,

  InputTitle: styled.input`
    height: 50px;
    margin: 20px 0 20px;
    border: none;
  `,

  ModalTitle: styled.div`
    font-size: 15px;
    color: gray;
  `,
};
